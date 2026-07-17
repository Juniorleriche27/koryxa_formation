from typing import Optional

from fastapi import APIRouter, HTTPException

from app.database import get_service_supabase
from app.services.courses import DEFAULT_COURSE_SLUG, get_course_id

router = APIRouter()

MODULE_COLUMNS = "id,course_id,title,description,order_index,duration,notebook_path,is_published,created_at"
RESOURCE_COLUMNS = "id,module_id,title,type,url,description,order_index,created_at"


def service_db():
    return get_service_supabase()


@router.get("/")
def get_modules(course: Optional[str] = None):
    selected_course = course or DEFAULT_COURSE_SLUG
    response = (
        service_db()
        .table("modules")
        .select(MODULE_COLUMNS)
        .eq("is_published", True)
        .eq("course_id", get_course_id(selected_course, published_only=False))
        .order("order_index")
        .execute()
    )
    return response.data or []


@router.get("/{module_id}")
def get_module(module_id: str, course: Optional[str] = None):
    selected_course = course or DEFAULT_COURSE_SLUG
    course_id = get_course_id(selected_course, published_only=False)
    module = (
        service_db()
        .table("modules")
        .select(MODULE_COLUMNS)
        .eq("id", module_id)
        .eq("course_id", course_id)
        .eq("is_published", True)
        .maybe_single()
        .execute()
    )

    if not module.data:
        raise HTTPException(status_code=404, detail="Module introuvable ou non publié.")

    resources = (
        service_db()
        .table("resources")
        .select(RESOURCE_COLUMNS)
        .eq("module_id", module_id)
        .order("order_index")
        .execute()
    )
    return {**module.data, "resources": resources.data or []}
