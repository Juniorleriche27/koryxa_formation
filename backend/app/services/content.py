import logging
from typing import Any

from fastapi import HTTPException

from app.constants import MODULE_SCOPE_ERROR
from app.database import get_service_supabase
from app.services.courses import get_course_id

logger = logging.getLogger(__name__)


def service_db():
    return get_service_supabase()


def ensure_published_module_in_course(course_slug: str, module_id: str) -> dict[str, Any]:
    course_id = get_course_id(course_slug, published_only=False)
    response = (
        service_db()
        .table("modules")
        .select("id,course_id,title,order_index,is_published")
        .eq("id", module_id)
        .eq("course_id", course_id)
        .eq("is_published", True)
        .maybe_single()
        .execute()
    )
    if not response.data:
        logger.info("module_scope_denied course=%s module=%s", course_slug, module_id)
        raise HTTPException(status_code=404, detail=MODULE_SCOPE_ERROR)
    return response.data


def list_published_rows(
    table: str,
    columns: str,
    *,
    course_id: str | None = None,
    module_id: str | None = None,
    project_id: str | None = None,
    order_by: str = "order_index",
) -> list[dict[str, Any]]:
    query = service_db().table(table).select(columns).eq("is_published", True)
    if course_id:
        query = query.eq("course_id", course_id)
    if module_id:
        query = query.eq("module_id", module_id)
    if project_id:
        query = query.eq("project_id", project_id)
    response = query.order(order_by).execute()
    return response.data or []


def get_published_row(
    table: str,
    columns: str,
    *,
    filters: dict[str, Any],
    not_found_message: str,
) -> dict[str, Any]:
    query = service_db().table(table).select(columns).eq("is_published", True)
    for key, value in filters.items():
        query = query.eq(key, value)
    response = query.maybe_single().execute()
    if not response.data:
        logger.info("published_row_not_found table=%s filters=%s", table, sorted(filters.keys()))
        raise HTTPException(status_code=404, detail=not_found_message)
    return response.data
