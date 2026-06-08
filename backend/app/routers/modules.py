from fastapi import APIRouter
from app.database import supabase

router = APIRouter()

@router.get("/")
def get_modules():
    response = supabase.table("modules").select("*").eq("is_published", True).order("order_index").execute()
    return response.data

@router.get("/{module_id}")
def get_module(module_id: str):
    module = supabase.table("modules").select("*").eq("id", module_id).single().execute()
    resources = supabase.table("resources").select("*").eq("module_id", module_id).order("order_index").execute()
    return {**module.data, "resources": resources.data}
