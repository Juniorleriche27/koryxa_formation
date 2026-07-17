from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException

from app.database import supabase
from app.middleware.auth import get_current_user
from app.schemas.progress import ProgressUpdate
from app.services.courses import DEFAULT_COURSE_SLUG, get_course_id

router = APIRouter()


def _course_module_ids(course: Optional[str]) -> list[str]:
    selected_course = course or DEFAULT_COURSE_SLUG
    response = (
        supabase.table("modules")
        .select("id")
        .eq("course_id", get_course_id(selected_course, published_only=False))
        .eq("is_published", True)
        .execute()
    )
    return [str(row["id"]) for row in (response.data or [])]


@router.get("/")
def get_my_progress(course: Optional[str] = None, user=Depends(get_current_user)):
    module_ids = _course_module_ids(course)
    if not module_ids:
        return []
    response = (
        supabase.table("progress")
        .select("*")
        .eq("user_id", user.id)
        .in_("module_id", module_ids)
        .execute()
    )
    return response.data or []


@router.get("/completion")
def get_completion(course: Optional[str] = None, user=Depends(get_current_user)):
    module_ids = _course_module_ids(course)
    if not module_ids:
        return {"percentage": 0.0}
    response = (
        supabase.table("progress")
        .select("module_id,completed,status")
        .eq("user_id", user.id)
        .in_("module_id", module_ids)
        .execute()
    )
    completed = sum(
        1
        for row in (response.data or [])
        if row.get("completed") or row.get("status") == "validated"
    )
    return {"percentage": round((completed / len(module_ids)) * 100, 1)}


@router.post("/")
def update_progress(data: ProgressUpdate, user=Depends(get_current_user)):
    if data.completed:
        raise HTTPException(
            status_code=400,
            detail="La validation d'un module passe désormais par le QCM de fin de module avec minimum 12/20.",
        )

    module = (
        supabase.table("modules")
        .select("id,is_published")
        .eq("id", data.module_id)
        .maybe_single()
        .execute()
    )
    if not module.data or not module.data.get("is_published"):
        raise HTTPException(status_code=404, detail="Module introuvable ou non publié.")

    now = datetime.now(timezone.utc).isoformat()
    payload = {
        "user_id": user.id,
        "module_id": data.module_id,
        "completed": False,
        "completed_at": None,
        "status": "in_progress",
        "started_at": now,
        "last_seen_at": now,
    }
    response = supabase.table("progress").upsert(payload, on_conflict="user_id,module_id").execute()
    return response.data
