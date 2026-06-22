from __future__ import annotations

import base64
import hashlib
import hmac
import json
from datetime import datetime, timedelta, timezone
from typing import Any
from urllib.parse import quote

from fastapi import APIRouter, HTTPException, Query, Request, Response, status
from fastapi.responses import JSONResponse, RedirectResponse
from pydantic import BaseModel, Field

from app.config import settings
from app.database import get_service_supabase

router = APIRouter(prefix="/access", tags=["Formation Access"])

ACCESS_COOKIE_NAME = "koryxa_formation_access"
PROJECT_SLUG = "koryxa-formation"
CERTIFICATE_MIN_DAYS = 21
QUIZ_PASS_SCORE = 12
PASSING_SCORE = 60
SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 90


class QuizSubmitRequest(BaseModel):
    answers: dict[str, str] = Field(default_factory=dict)


class FinalProjectSubmitRequest(BaseModel):
    submission_url: str | None = None
    submission_notes: str | None = None


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_now_iso() -> str:
    return utc_now().isoformat()


def normalize_redirect(value: str | None) -> str:
    if not value or not value.startswith("/") or value.startswith("//"):
        return "/dashboard"
    if value in {"/access", "/login", "/register"}:
        return "/dashboard"
    return value


def frontend_url(path: str = "/") -> str:
    return f"{settings.FRONTEND_URL.rstrip('/')}{normalize_redirect(path)}"


def b64url_decode(value: str) -> bytes:
    padding = "=" * ((4 - len(value) % 4) % 4)
    return base64.urlsafe_b64decode((value + padding).encode())


def b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")


def sign(value: str, secret: str) -> str:
    return b64url_encode(hmac.new(secret.encode(), value.encode(), hashlib.sha256).digest())


def timing_safe_equal(left: str, right: str) -> bool:
    return hmac.compare_digest(left.encode(), right.encode())


def verify_admin_bridge(ctx: str | None, sig: str | None) -> dict[str, Any]:
    secret = settings.KORYXA_ADMIN_FORMATION_BRIDGE_SECRET.strip()
    if not secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Bridge secret missing")
    if not ctx or not sig:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bridge payload missing")
    expected = sign(ctx, secret)
    if not timing_safe_equal(expected, sig):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid bridge signature")

    try:
        payload = json.loads(b64url_decode(ctx).decode())
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid bridge payload") from exc

    now = int(utc_now().timestamp())
    if payload.get("v") != 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid bridge version")
    if payload.get("project") != PROJECT_SLUG:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid bridge project")
    if not payload.get("clerk_user_id"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bridge user missing")
    if int(payload.get("exp") or 0) < now:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bridge payload expired")
    if int(payload.get("iat") or 0) > now + 60:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bridge payload not yet valid")
    return payload


def create_access_session(access_id: str, name: str | None, email: str | None) -> str:
    secret = settings.KORYXA_FORMATION_ACCESS_SECRET.strip()
    if not secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Access session secret missing")
    now = int(utc_now().timestamp())
    payload = {
        "sub": access_id,
        "name": name,
        "email": email,
        "iat": now,
        "exp": now + SESSION_MAX_AGE_SECONDS,
    }
    encoded = b64url_encode(json.dumps(payload, separators=(",", ":")).encode())
    return f"v1.{encoded}.{sign(encoded, secret)}"


def verify_access_session(value: str | None) -> dict[str, Any] | None:
    secret = settings.KORYXA_FORMATION_ACCESS_SECRET.strip()
    if not secret or not value:
        return None
    parts = value.split(".")
    if len(parts) != 3 or parts[0] != "v1":
        return None
    expected = sign(parts[1], secret)
    if not timing_safe_equal(expected, parts[2]):
        return None
    try:
        payload = json.loads(b64url_decode(parts[1]).decode())
    except Exception:
        return None
    if int(payload.get("exp") or 0) <= int(utc_now().timestamp()):
        return None
    return payload


def set_access_cookie(response: Response, value: str) -> None:
    response.set_cookie(
        ACCESS_COOKIE_NAME,
        value,
        max_age=SESSION_MAX_AGE_SECONDS,
        httponly=True,
        secure=settings.FRONTEND_URL.startswith("https://"),
        samesite="lax",
        path="/",
        domain=settings.FORMATION_COOKIE_DOMAIN,
    )


def clear_access_cookie(response: Response) -> None:
    response.delete_cookie(
        ACCESS_COOKIE_NAME,
        path="/",
        domain=settings.FORMATION_COOKIE_DOMAIN,
    )


def service_client():
    return get_service_supabase()


def access_token_for(value: str) -> str:
    return hashlib.sha256(value.strip().encode()).hexdigest()


def add_months(date: datetime, months: int) -> datetime:
    return date + timedelta(days=30 * months)


def find_admin_grant(clerk_user_id: str) -> dict[str, Any] | None:
    response = (
        service_client()
        .table("formation_access_codes")
        .select("*")
        .eq("koryxa_admin_user_id", clerk_user_id)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    return (response.data or [None])[0]


def find_grant_by_id(access_id: str) -> dict[str, Any] | None:
    response = service_client().table("formation_access_codes").select("*").eq("id", access_id).limit(1).execute()
    return (response.data or [None])[0]


def grant_is_active(grant: dict[str, Any] | None) -> bool:
    if not grant:
        return False
    if grant.get("status") in {"revoked", "expired"}:
        return False
    expires_at = grant.get("access_until") or grant.get("expires_at")
    if expires_at:
        try:
            parsed = datetime.fromisoformat(str(expires_at).replace("Z", "+00:00"))
            if parsed < utc_now():
                return False
        except ValueError:
            return False
    return True


def create_or_update_admin_grant(payload: dict[str, Any]) -> dict[str, Any]:
    now = utc_now()
    access_until = add_months(now, 2).isoformat()
    eligible_from = (now + timedelta(days=CERTIFICATE_MIN_DAYS)).isoformat()
    clerk_user_id = str(payload["clerk_user_id"])
    email = str(payload.get("email") or "").strip().lower() or None
    name = str(payload.get("name") or "").strip() or email or clerk_user_id
    role_key = payload.get("role_key")
    existing = find_admin_grant(clerk_user_id)
    client = service_client()

    common = {
        "student_name": name,
        "student_email": email,
        "status": "used" if not existing or existing.get("status") != "revoked" else "revoked",
        "used_count": max(int((existing or {}).get("used_count") or 0), 1),
        "first_used_at": (existing or {}).get("first_used_at") or now.isoformat(),
        "last_used_at": now.isoformat(),
        "activated_at": (existing or {}).get("activated_at") or now.isoformat(),
        "access_until": (existing or {}).get("access_until") or access_until,
        "expires_at": (existing or {}).get("expires_at") or access_until,
        "koryxa_admin_email": email,
        "koryxa_admin_name": name,
        "auth_provider": "koryxa_admin",
        "last_admin_sync_at": now.isoformat(),
        "notes": f"Accès synchronisé depuis KORYXA Admin{f' ({role_key})' if role_key else ''}",
    }

    if existing:
        if not existing.get("activated_at"):
            common["certificate_eligible_from"] = eligible_from
        response = client.table("formation_access_codes").update(common).eq("id", existing["id"]).execute()
        return (response.data or [existing])[0]

    data = {
        **common,
        "code_hash": access_token_for(f"KORYXA-ADMIN:{clerk_user_id}"),
        "label": "KORYXA Admin · Formation IA",
        "max_uses": 1,
        "certificate_eligible_from": eligible_from,
        "created_by_admin_email": email,
        "koryxa_admin_user_id": clerk_user_id,
    }
    response = client.table("formation_access_codes").insert(data).execute()
    return response.data[0]


def get_session_grant(request: Request) -> dict[str, Any]:
    session = verify_access_session(request.cookies.get(ACCESS_COOKIE_NAME))
    if not session or session.get("sub") == "legacy-access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session formation requise")
    grant = find_grant_by_id(str(session["sub"]))
    if not grant_is_active(grant):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session formation invalide")
    return grant


@router.get("/koryxa-admin/callback")
def koryxa_admin_callback(ctx: str | None = Query(default=None), sig: str | None = Query(default=None)):
    try:
        payload = verify_admin_bridge(ctx, sig)
        grant = create_or_update_admin_grant(payload)
        if not grant_is_active(grant):
            raise HTTPException(status_code=403, detail="Accès formation inactif")
        session = create_access_session(grant["id"], grant.get("student_name"), grant.get("student_email"))
        response = RedirectResponse(frontend_url(payload.get("redirect")), status_code=status.HTTP_307_TEMPORARY_REDIRECT)
        set_access_cookie(response, session)
        return response
    except HTTPException as exc:
        return RedirectResponse(f"{settings.FRONTEND_URL.rstrip()}/access?reason={quote(str(exc.detail))}", status_code=status.HTTP_307_TEMPORARY_REDIRECT)


@router.get("/session")
def session_status(request: Request):
    grant = get_session_grant(request)
    return {
        "ok": True,
        "access_id": grant["id"],
        "name": grant.get("student_name") or grant.get("koryxa_admin_name"),
        "email": grant.get("student_email") or grant.get("koryxa_admin_email"),
        "access_until": grant.get("access_until") or grant.get("expires_at"),
    }


@router.post("/logout")
def logout():
    response = JSONResponse({"ok": True})
    clear_access_cookie(response)
    return response


def fetch_modules() -> list[dict[str, Any]]:
    response = service_client().table("modules").select("*").eq("is_published", True).order("order_index").execute()
    return response.data or []


def fetch_module(module_id: str) -> dict[str, Any]:
    response = service_client().table("modules").select("*").eq("id", module_id).limit(1).execute()
    module = (response.data or [None])[0]
    if not module:
        raise HTTPException(status_code=404, detail="Module introuvable")
    return module


def fetch_progress(access_id: str) -> list[dict[str, Any]]:
    response = service_client().table("formation_module_progress").select("*").eq("access_code_id", access_id).execute()
    return response.data or []


def is_validated(row: dict[str, Any] | None) -> bool:
    return bool(row and (row.get("completed") or row.get("status") == "validated"))


def ensure_module_accessible(access_id: str, module: dict[str, Any]) -> None:
    modules = fetch_modules()
    progress = {row["module_id"]: row for row in fetch_progress(access_id)}
    previous = next((item for item in modules if int(item.get("order_index", -1)) == int(module.get("order_index", 0)) - 1), None)
    if module.get("order_index") == 0:
        return
    if not previous or not is_validated(progress.get(previous["id"])):
        raise HTTPException(status_code=403, detail="Module bloqué. Valide le module précédent avant de continuer.")


@router.get("/validation/modules/status")
def modules_status(request: Request):
    grant = get_session_grant(request)
    modules = fetch_modules()
    progress = {row["module_id"]: row for row in fetch_progress(grant["id"])}
    result = []
    for module in modules:
        previous = next((item for item in modules if int(item.get("order_index", -1)) == int(module.get("order_index", 0)) - 1), None)
        previous_validated = int(module.get("order_index", 0)) == 0 or is_validated(progress.get(previous["id"])) if previous else int(module.get("order_index", 0)) == 0
        row = progress.get(module["id"])
        validated = is_validated(row)
        status_value = "validated" if validated else "locked" if not previous_validated else row.get("status") if row and row.get("status") in {"quiz_failed", "in_progress"} else "available"
        result.append({
            "module_id": module["id"],
            "order_index": module.get("order_index"),
            "title": module.get("title"),
            "duration": module.get("duration"),
            "estimated_hours": module.get("estimated_hours"),
            "platform_points": module.get("platform_points"),
            "requires_quiz": module.get("requires_quiz"),
            "quiz_pass_score": module.get("quiz_pass_score") or QUIZ_PASS_SCORE,
            "status": status_value,
            "is_accessible": previous_validated,
            "is_validated": validated,
            "quiz_best_score": (row or {}).get("quiz_best_score"),
            "validated_at": (row or {}).get("validated_at") or (row or {}).get("completed_at"),
            "platform_points_awarded": (row or {}).get("platform_points_awarded") or 0,
        })
    return {"modules": result}


@router.get("/validation/quiz/{module_id}")
def quiz(module_id: str, request: Request):
    grant = get_session_grant(request)
    module = fetch_module(module_id)
    ensure_module_accessible(grant["id"], module)
    response = (
        service_client()
        .table("quiz_questions")
        .select("id,order_index,question,options,difficulty,skill")
        .eq("module_id", module_id)
        .eq("is_active", True)
        .order("order_index")
        .execute()
    )
    questions = response.data or []
    if not questions:
        raise HTTPException(status_code=404, detail="Aucun QCM préparé pour ce module")
    return {"module_id": module_id, "pass_score": module.get("quiz_pass_score") or QUIZ_PASS_SCORE, "questions": questions}


@router.post("/validation/quiz/{module_id}/submit")
def submit_quiz(module_id: str, payload: QuizSubmitRequest, request: Request):
    grant = get_session_grant(request)
    access_id = grant["id"]
    module = fetch_module(module_id)
    ensure_module_accessible(access_id, module)
    questions_response = service_client().table("quiz_questions").select("id,answer,skill,explanation").eq("module_id", module_id).eq("is_active", True).execute()
    questions = questions_response.data or []
    if not questions:
        raise HTTPException(status_code=404, detail="Aucun QCM préparé pour ce module")
    normalized = {str(key): str(value).strip().upper() for key, value in payload.answers.items()}
    correct = 0
    review_sections: list[str] = []
    explanations: list[str] = []
    for question in questions:
        if normalized.get(str(question["id"])) == question.get("answer"):
            correct += 1
        else:
            skill = question.get("skill") or "partie du module"
            if skill not in review_sections:
                review_sections.append(skill)
            if question.get("explanation"):
                explanations.append(question["explanation"])
    total = len(questions)
    score = round((correct / total) * 20) if total else 0
    pass_score = int(module.get("quiz_pass_score") or QUIZ_PASS_SCORE)
    passed = score >= pass_score
    now = utc_now_iso()
    client = service_client()
    client.table("formation_quiz_attempts").insert({
        "access_code_id": access_id,
        "module_id": module_id,
        "score": score,
        "max_score": 20,
        "passed": passed,
        "answers": normalized,
        "correct_count": correct,
        "total_questions": total,
        "review_sections": review_sections,
        "feedback": "QCM validé. Module suivant débloqué." if passed else "QCM non validé. Consulte les parties recommandées puis refais le QCM.",
    }).execute()
    existing_response = client.table("formation_module_progress").select("*").eq("access_code_id", access_id).eq("module_id", module_id).limit(1).execute()
    existing = (existing_response.data or [None])[0] or {}
    already_validated = is_validated(existing)
    module_validated = passed or already_validated
    progress = {
        "access_code_id": access_id,
        "module_id": module_id,
        "completed": module_validated,
        "completed_at": now if passed and not already_validated else existing.get("completed_at"),
        "status": "validated" if module_validated else "quiz_failed",
        "started_at": existing.get("started_at") or now,
        "last_seen_at": now,
        "validated_at": now if passed and not already_validated else existing.get("validated_at"),
        "quiz_best_score": max(score, int(existing.get("quiz_best_score") or 0)),
        "platform_points_awarded": float(module.get("platform_points") or 0) if module_validated else float(existing.get("platform_points_awarded") or 0),
        "validation_source": "quiz" if passed else existing.get("validation_source"),
    }
    client.table("formation_module_progress").upsert(progress, on_conflict="access_code_id,module_id").execute()
    return {
        "module_id": module_id,
        "score": score,
        "max_score": 20,
        "pass_score": pass_score,
        "passed": passed,
        "module_validated": module_validated,
        "correct_count": correct,
        "total_questions": total,
        "review_sections": review_sections,
        "feedback": "QCM validé. Module suivant débloqué." if passed else "QCM non validé. Consulte les parties recommandées puis refais le QCM.",
        "explanations": explanations[:5],
    }


def compute_certification(access_id: str) -> dict[str, Any]:
    client = service_client()
    grant = find_grant_by_id(access_id)
    modules = fetch_modules()
    progress = fetch_progress(access_id)
    progress_by_module = {row["module_id"]: row for row in progress}
    required_modules = [module for module in modules if int(module.get("order_index", 0)) <= 6]
    modules_validated = 0
    platform_score = 0.0
    missing_modules: list[str] = []
    for module in required_modules:
        row = progress_by_module.get(module["id"])
        if is_validated(row):
            modules_validated += 1
            platform_score += float((row or {}).get("platform_points_awarded") or module.get("platform_points") or 0)
        else:
            missing_modules.append(f"Module {module.get('order_index')}")
    project_response = client.table("formation_final_projects").select("*").eq("access_code_id", access_id).limit(1).execute()
    project = (project_response.data or [None])[0]
    project_is_graded = bool(project and project.get("status") in {"graded", "validated"})
    project_score = float((project or {}).get("score_points") or 0) if project_is_graded else 0.0
    final_score = min(100.0, platform_score + project_score)
    activated_at = (grant or {}).get("activated_at")
    days_elapsed = 0
    if activated_at:
        try:
            start = datetime.fromisoformat(str(activated_at).replace("Z", "+00:00"))
            days_elapsed = max(0, (utc_now() - start).days)
        except ValueError:
            days_elapsed = 0
    days_remaining = max(0, CERTIFICATE_MIN_DAYS - days_elapsed)
    blocking: list[str] = []
    if not activated_at:
        blocking.append("Aucun accès formation activé n'a été trouvé.")
    if days_remaining > 0:
        blocking.append(f"Il reste {days_remaining} jour(s) avant le délai minimum de 21 jours pour le certificat.")
    if missing_modules:
        blocking.append("Modules non validés : " + ", ".join(missing_modules))
    if not project_is_graded:
        blocking.append("Projet final non noté.")
    if final_score < PASSING_SCORE:
        blocking.append("Score final inférieur à 60/100.")
    return {
        "user_id": access_id,
        "platform_score": platform_score,
        "project_score": project_score,
        "final_score": final_score,
        "modules_validated": modules_validated,
        "modules_required": 7,
        "access_activated_at": activated_at,
        "access_until": (grant or {}).get("access_until"),
        "certificate_eligible_from": (grant or {}).get("certificate_eligible_from"),
        "is_eligible": not blocking,
        "blocking_reasons": blocking,
        "days_elapsed_since_activation": days_elapsed,
        "days_remaining_for_certificate": days_remaining,
        "final_project": project,
    }


@router.get("/validation/certification/me")
def certification_status(request: Request):
    grant = get_session_grant(request)
    return compute_certification(grant["id"])


@router.post("/validation/final-project/submit")
def submit_final_project(payload: FinalProjectSubmitRequest, request: Request):
    grant = get_session_grant(request)
    access_id = grant["id"]
    modules = fetch_modules()
    progress = {row["module_id"]: row for row in fetch_progress(access_id)}
    required_modules = [module for module in modules if int(module.get("order_index", 0)) <= 6]
    if not all(is_validated(progress.get(module["id"])) for module in required_modules):
        raise HTTPException(status_code=403, detail="Projet final bloqué. Valide d'abord les modules 0 à 6.")
    response = service_client().table("formation_final_projects").upsert({
        "access_code_id": access_id,
        "status": "submitted",
        "submission_url": payload.submission_url,
        "submission_notes": payload.submission_notes,
        "submitted_at": utc_now_iso(),
    }, on_conflict="access_code_id").execute()
    return (response.data or [None])[0]


@router.get("/certificates/me")
def my_certificate(request: Request):
    grant = get_session_grant(request)
    response = service_client().table("formation_certificates").select("*").eq("access_code_id", grant["id"]).limit(1).execute()
    certificate = (response.data or [None])[0]
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificat non disponible")
    return certificate


@router.post("/certificates/issue")
def issue_certificate(request: Request):
    grant = get_session_grant(request)
    status_payload = compute_certification(grant["id"])
    if not status_payload.get("is_eligible"):
        raise HTTPException(status_code=403, detail={"message": "Certificat non disponible", "certification_status": status_payload})
    client = service_client()
    existing_response = client.table("formation_certificates").select("*").eq("access_code_id", grant["id"]).limit(1).execute()
    existing = (existing_response.data or [None])[0]
    if existing:
        return {**existing, "certification_status": status_payload}
    response = client.table("formation_certificates").insert({
        "access_code_id": grant["id"],
        "platform_score": status_payload["platform_score"],
        "project_score": status_payload["project_score"],
        "final_score": status_payload["final_score"],
        "eligibility_snapshot": status_payload,
    }).execute()
    certificate = response.data[0]
    return {**certificate, "certification_status": status_payload}
