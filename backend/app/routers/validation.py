from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field

from app.database import supabase
from app.middleware.auth import get_current_user
from app.services.courses import DEFAULT_COURSE_SLUG, get_course_id

router = APIRouter()

PLATFORM_REQUIRED_MODULES = 7  # Modules 0 à 6. Le module 7 est le projet final.
QUIZ_PASS_SCORE = 12
CERTIFICATE_MIN_DAYS = 21
PASSING_SCORE = 60


class QuizSubmitRequest(BaseModel):
    answers: dict[str, str] = Field(default_factory=dict)


class FinalProjectSubmitRequest(BaseModel):
    submission_url: str | None = None
    submission_notes: str | None = None


class FinalProjectGradeRequest(BaseModel):
    user_id: str
    course: str = DEFAULT_COURSE_SLUG
    score_points: float = Field(ge=0, le=60)
    status: str = Field(default="graded")
    feedback: str | None = None
    admin_notes: str | None = None


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_user_email(user: Any) -> str | None:
    return getattr(user, "email", None) or getattr(user, "user_metadata", {}).get("email")


def is_admin(user_id: str) -> bool:
    response = supabase.table("profiles").select("role").eq("id", user_id).limit(1).execute()
    profile = (response.data or [None])[0]
    return bool(profile and profile.get("role") == "admin")


def require_admin(user: Any) -> None:
    if not is_admin(user.id):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Accès admin requis.")


def fetch_modules(course: Optional[str] = None) -> list[dict[str, Any]]:
    response = (
        supabase.table("modules")
        .select("*")
        .eq("is_published", True)
        .eq("course_id", get_course_id(course or DEFAULT_COURSE_SLUG, published_only=False))
        .order("order_index")
        .execute()
    )
    return response.data or []


def fetch_module(module_id: str) -> dict[str, Any]:
    response = supabase.table("modules").select("*").eq("id", module_id).limit(1).execute()
    module = (response.data or [None])[0]
    if not module:
        raise HTTPException(status_code=404, detail="Module introuvable.")
    return module


def fetch_modules_by_module(module: dict[str, Any]) -> list[dict[str, Any]]:
    response = (
        supabase.table("modules")
        .select("*")
        .eq("is_published", True)
        .eq("course_id", module["course_id"])
        .order("order_index")
        .execute()
    )
    return response.data or []


def fetch_progress(user_id: str, modules: list[dict[str, Any]] | None = None) -> list[dict[str, Any]]:
    query = supabase.table("progress").select("*").eq("user_id", user_id)
    if modules is not None:
        module_ids = [str(module["id"]) for module in modules]
        if not module_ids:
            return []
        query = query.in_("module_id", module_ids)
    response = query.execute()
    return response.data or []


def progress_map(user_id: str, modules: list[dict[str, Any]] | None = None) -> dict[str, dict[str, Any]]:
    return {row["module_id"]: row for row in fetch_progress(user_id, modules)}


def is_progress_validated(row: dict[str, Any] | None) -> bool:
    if not row:
        return False
    return bool(row.get("completed") or row.get("status") == "validated")


def module_accessible(module: dict[str, Any], modules: list[dict[str, Any]], by_module: dict[str, dict[str, Any]]) -> bool:
    order_index = int(module.get("order_index", 0))
    if order_index == 0:
        return True
    previous = next((item for item in modules if int(item.get("order_index", -1)) == order_index - 1), None)
    if not previous:
        return False
    return is_progress_validated(by_module.get(previous["id"]))


def normalize_module_status(module: dict[str, Any], row: dict[str, Any] | None, accessible: bool) -> str:
    if is_progress_validated(row):
        return "validated"
    if not accessible:
        return "locked"
    if row and row.get("status") in {"in_progress", "quiz_failed"}:
        return row["status"]
    return "available"


def get_access_record_for_user(user: Any) -> dict[str, Any] | None:
    email = get_user_email(user)
    if not email:
        return None

    response = (
        supabase.table("formation_access_codes")
        .select("activated_at, access_until, certificate_eligible_from, partner_email, student_email, status")
        .or_(f"partner_email.eq.{email},student_email.eq.{email}")
        .order("activated_at", desc=True)
        .limit(1)
        .execute()
    )
    return (response.data or [None])[0]


def days_between(start_iso: str | None, end: datetime) -> int:
    if not start_iso:
        return 0
    try:
        start = datetime.fromisoformat(start_iso.replace("Z", "+00:00"))
    except ValueError:
        return 0
    if start.tzinfo is None:
        start = start.replace(tzinfo=timezone.utc)
    return max(0, (end - start).days)


def latest_final_project(user_id: str, course_id: str) -> dict[str, Any] | None:
    response = (
        supabase.table("final_projects")
        .select("*")
        .eq("user_id", user_id)
        .eq("course_id", course_id)
        .limit(1)
        .execute()
    )
    return (response.data or [None])[0]


def compute_certification_status(user: Any, course: Optional[str] = None) -> dict[str, Any]:
    selected_course = course or DEFAULT_COURSE_SLUG
    course_id = get_course_id(selected_course)
    modules = fetch_modules(selected_course)
    by_module = progress_map(user.id, modules)
    required_modules = [item for item in modules if int(item.get("order_index", 0)) <= 6]

    platform_score = 0.0
    modules_validated = 0
    missing_modules: list[str] = []

    for module in required_modules:
        row = by_module.get(module["id"])
        if is_progress_validated(row):
            modules_validated += 1
            platform_score += float(row.get("platform_points_awarded") or module.get("platform_points") or 0)
        else:
            missing_modules.append(module.get("title") or f"Module {module.get('order_index')}")

    final_project = latest_final_project(user.id, course_id)
    project_is_graded = bool(final_project and final_project.get("status") in {"graded", "validated"})
    project_score = float((final_project or {}).get("score_points") or 0) if project_is_graded else 0.0
    final_score = min(100.0, platform_score + project_score)

    access = get_access_record_for_user(user)
    activated_at = (access or {}).get("activated_at")
    access_until = (access or {}).get("access_until")
    eligible_from = (access or {}).get("certificate_eligible_from")

    now = datetime.now(timezone.utc)
    days_elapsed = days_between(activated_at, now)
    days_remaining = max(0, CERTIFICATE_MIN_DAYS - days_elapsed)

    blocking_reasons: list[str] = []
    if not activated_at:
        blocking_reasons.append("Aucun accès formation activé n'a été trouvé pour cet apprenant.")
    if days_remaining > 0:
        blocking_reasons.append(f"Il reste {days_remaining} jour(s) avant le délai minimum de 21 jours pour le certificat.")
    if missing_modules:
        blocking_reasons.append("Modules non validés : " + ", ".join(missing_modules))
    if not project_is_graded:
        blocking_reasons.append("Projet final non noté.")
    if final_score < PASSING_SCORE:
        blocking_reasons.append("Score final inférieur à 60/100.")

    is_eligible = not blocking_reasons

    snapshot = {
        "user_id": user.id,
        "course_id": course_id,
        "platform_score": round(platform_score, 2),
        "project_score": round(project_score, 2),
        "final_score": round(final_score, 2),
        "modules_validated": modules_validated,
        "modules_required": PLATFORM_REQUIRED_MODULES,
        "access_activated_at": activated_at,
        "access_until": access_until,
        "certificate_eligible_from": eligible_from,
        "is_eligible": is_eligible,
        "blocking_reasons": blocking_reasons,
    }

    try:
        supabase.table("certification_snapshots").insert(snapshot).execute()
    except Exception:
        # Le statut reste calculé même si l'historisation échoue.
        pass

    return {
        **snapshot,
        "days_elapsed_since_activation": days_elapsed,
        "days_remaining_for_certificate": days_remaining,
        "final_project": final_project,
    }


@router.get("/modules/status")
def get_modules_status(course: Optional[str] = None, user=Depends(get_current_user)):
    selected_course = course or DEFAULT_COURSE_SLUG
    modules = fetch_modules(selected_course)
    by_module = progress_map(user.id, modules)

    result = []
    for module in modules:
        accessible = module_accessible(module, modules, by_module)
        row = by_module.get(module["id"])
        result.append(
            {
                "module_id": module["id"],
                "order_index": module.get("order_index"),
                "title": module.get("title"),
                "duration": module.get("duration"),
                "estimated_hours": module.get("estimated_hours"),
                "platform_points": module.get("platform_points"),
                "requires_quiz": module.get("requires_quiz"),
                "quiz_pass_score": module.get("quiz_pass_score") or QUIZ_PASS_SCORE,
                "status": normalize_module_status(module, row, accessible),
                "is_accessible": accessible,
                "is_validated": is_progress_validated(row),
                "quiz_best_score": (row or {}).get("quiz_best_score"),
                "validated_at": (row or {}).get("validated_at") or (row or {}).get("completed_at"),
                "platform_points_awarded": (row or {}).get("platform_points_awarded") or 0,
            }
        )

    return {"modules": result}


@router.get("/quiz/{module_id}")
def get_module_quiz(module_id: str):
    module = fetch_module(module_id)
    response = (
        supabase.table("quiz_questions")
        .select("id, order_index, question, options, difficulty, skill, question_type, is_final_test")
        .eq("module_id", module_id)
        .eq("is_active", True)
        .order("order_index")
        .execute()
    )

    questions = response.data or []
    if not questions:
        raise HTTPException(status_code=404, detail="Aucun QCM préparé pour ce module.")

    return {
        "module_id": module_id,
        "pass_score": module.get("quiz_pass_score") or QUIZ_PASS_SCORE,
        "questions": questions,
    }


@router.post("/quiz/{module_id}/submit")
def submit_module_quiz(module_id: str, payload: QuizSubmitRequest, user=Depends(get_current_user)):
    module = fetch_module(module_id)
    if not bool(module.get("requires_quiz", True)):
        raise HTTPException(status_code=400, detail="Ce module ne demande pas de QCM de validation.")

    modules = fetch_modules_by_module(module)
    by_module = progress_map(user.id, modules)
    if not module_accessible(module, modules, by_module):
        raise HTTPException(status_code=403, detail="Module bloqué. Valide le module précédent avant de soumettre ce QCM.")

    response = (
        supabase.table("quiz_questions")
        .select("id, question, question_type, answer, skill, explanation")
        .eq("module_id", module_id)
        .eq("is_active", True)
        .execute()
    )
    questions = response.data or []
    if not questions:
        raise HTTPException(status_code=404, detail="Aucun QCM préparé pour ce module.")

    correct = 0
    review_sections: list[str] = []
    corrections: list[dict[str, Any]] = []
    normalized_answers = {str(key): value.strip().upper() for key, value in payload.answers.items()}

    for question in questions:
        qid = str(question["id"])
        selected_answer = normalized_answers.get(qid)
        is_correct = selected_answer == question["answer"]
        if is_correct:
            correct += 1
        else:
            skill = question.get("skill") or "partie du module"
            if skill not in review_sections:
                review_sections.append(skill)

        corrections.append(
            {
                "question_id": qid,
                "question": question.get("question"),
                "question_type": question.get("question_type") or "qcm",
                "selected_answer": selected_answer,
                "correct_answer": question["answer"],
                "is_correct": is_correct,
                "explanation": question.get("explanation"),
            }
        )

    total = len(questions)
    score = round((correct / total) * 20) if total else 0
    pass_score = int(module.get("quiz_pass_score") or QUIZ_PASS_SCORE)
    passed = score >= pass_score
    feedback = "QCM validé. Module suivant débloqué." if passed else "QCM non validé. Consulte les parties recommandées puis refais le QCM."

    attempt = {
        "user_id": user.id,
        "module_id": module_id,
        "score": score,
        "max_score": 20,
        "passed": passed,
        "answers": normalized_answers,
        "correct_count": correct,
        "total_questions": total,
        "review_sections": review_sections,
        "feedback": feedback,
    }
    supabase.table("quiz_attempts").insert(attempt).execute()

    existing = by_module.get(module_id) or {}
    already_validated = is_progress_validated(existing)
    module_validated = passed or already_validated
    best_score = max(score, int(existing.get("quiz_best_score") or 0))
    awarded = float(module.get("platform_points") or 0) if module_validated else float(existing.get("platform_points_awarded") or 0)

    progress_payload = {
        "user_id": user.id,
        "module_id": module_id,
        "completed": module_validated,
        "completed_at": utc_now_iso() if passed and not already_validated else existing.get("completed_at"),
        "status": "validated" if module_validated else "quiz_failed",
        "started_at": existing.get("started_at") or utc_now_iso(),
        "last_seen_at": utc_now_iso(),
        "validated_at": utc_now_iso() if passed and not already_validated else existing.get("validated_at"),
        "quiz_best_score": best_score,
        "platform_points_awarded": awarded,
        "validation_source": "quiz" if passed else existing.get("validation_source"),
    }
    supabase.table("progress").upsert(progress_payload, on_conflict="user_id,module_id").execute()

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
        "feedback": feedback,
        "corrections": corrections,
    }


@router.get("/certification/me")
def get_my_certification_status(course: Optional[str] = None, user=Depends(get_current_user)):
    return compute_certification_status(user, course)


@router.post("/final-project/submit")
def submit_final_project(payload: FinalProjectSubmitRequest, course: Optional[str] = None, user=Depends(get_current_user)):
    selected_course = course or DEFAULT_COURSE_SLUG
    course_id = get_course_id(selected_course)
    modules = fetch_modules(selected_course)
    by_module = progress_map(user.id, modules)
    module_six = next((item for item in modules if int(item.get("order_index", -1)) == 6), None)
    if module_six and not is_progress_validated(by_module.get(module_six["id"])):
        raise HTTPException(status_code=403, detail="Projet final bloqué. Valide d'abord les modules 0 à 6.")

    data = {
        "user_id": user.id,
        "course_id": course_id,
        "status": "submitted",
        "submission_url": payload.submission_url,
        "submission_notes": payload.submission_notes,
        "submitted_at": utc_now_iso(),
    }
    response = supabase.table("final_projects").upsert(data, on_conflict="user_id,course_id").execute()
    return response.data


@router.post("/admin/final-project/grade")
def grade_final_project(payload: FinalProjectGradeRequest, user=Depends(get_current_user)):
    require_admin(user)
    if payload.status not in {"graded", "validated", "needs_revision", "rejected"}:
        raise HTTPException(status_code=400, detail="Statut projet final invalide.")

    data = {
        "user_id": payload.user_id,
        "course_id": get_course_id(payload.course),
        "status": payload.status,
        "score_points": payload.score_points,
        "feedback": payload.feedback,
        "admin_notes": payload.admin_notes,
        "reviewed_by": user.id,
        "reviewed_at": utc_now_iso(),
        "graded_at": utc_now_iso() if payload.status in {"graded", "validated"} else None,
    }
    response = supabase.table("final_projects").upsert(data, on_conflict="user_id,course_id").execute()
    return response.data
