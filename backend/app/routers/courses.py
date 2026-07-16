from fastapi import APIRouter, HTTPException

from app.database import get_service_supabase

router = APIRouter()

COURSE_COLUMNS = "id,slug,title,short_title,description,is_published,order_index,created_at"


def service_db():
    return get_service_supabase()


@router.get("/")
def get_courses():
    response = (
        service_db()
        .table("courses")
        .select(COURSE_COLUMNS)
        .eq("is_published", True)
        .order("order_index")
        .execute()
    )
    return response.data or []


@router.get("/{slug}")
def get_course(slug: str):
    response = (
        service_db()
        .table("courses")
        .select(COURSE_COLUMNS)
        .eq("slug", slug)
        .eq("is_published", True)
        .maybe_single()
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=404, detail="Parcours introuvable ou non publié.")
    return response.data
