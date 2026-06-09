from fastapi import APIRouter, Depends, HTTPException
from app.schemas.progress import ProgressUpdate
from app.database import supabase
from app.middleware.auth import get_current_user
from datetime import datetime, timezone

router = APIRouter()

@router.get("/")
def get_my_progress(user=Depends(get_current_user)):
    response = supabase.table("progress").select("*").eq("user_id", user.id).execute()
    return response.data

@router.get("/completion")
def get_completion(user=Depends(get_current_user)):
    result = supabase.rpc("get_user_completion", {"p_user_id": user.id}).execute()
    return {"percentage": result.data}

@router.post("/")
def update_progress(data: ProgressUpdate, user=Depends(get_current_user)):
    if data.completed:
        raise HTTPException(
            status_code=400,
            detail="La validation d'un module passe désormais par le QCM de fin de module avec minimum 12/20.",
        )

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
