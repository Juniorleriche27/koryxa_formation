from fastapi import APIRouter, HTTPException
from app.database import get_service_supabase

router = APIRouter()

MODULE_COLUMNS = "id,title,description,order_index,duration_minutes,is_published,created_at"
RESOURCE_COLUMNS = "id,module_id,title,type,content_url,content,order_index,created_at"


def service_db():
    return get_service_supabase()


@router.get("/")
def get_modules():
    response = (
        service_db()
        .table("modules")
        .select(MODULE_COLUMNS)
        .eq("is_published", True)
        .order("order_index")
        .execute()
    )
    return response.data or []


@router.get("/{module_id}")
def get_module(module_id: str):
    module = (
        service_db()
        .table("modules")
        .select(MODULE_COLUMNS)
        .eq("id", module_id)
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
