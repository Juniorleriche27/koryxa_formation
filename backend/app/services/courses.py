import logging

from fastapi import HTTPException

from app.constants import COURSE_NOT_FOUND, DEFAULT_COURSE_SLUG
from app.database import get_service_supabase

logger = logging.getLogger(__name__)


def get_course_by_slug(slug: str | None = None, *, published_only: bool = True) -> dict:
    selected_slug = slug or DEFAULT_COURSE_SLUG
    query = get_service_supabase().table("courses").select("*").eq("slug", selected_slug)
    if published_only:
        query = query.eq("is_published", True)
    response = query.limit(1).execute()
    rows = response.data or []
    if not rows:
        logger.info("course_not_found slug=%s published_only=%s", selected_slug, published_only)
        raise HTTPException(status_code=404, detail=COURSE_NOT_FOUND)
    return rows[0]


def get_course_id(slug: str | None = None, *, published_only: bool = True) -> str:
    return str(get_course_by_slug(slug, published_only=published_only)["id"])
