from fastapi import APIRouter, Depends, HTTPException, status
from app.database import supabase
from app.middleware.auth import get_current_user
from app.routers.validation import compute_certification_status

router = APIRouter()

@router.get("/me")
def get_my_certificate(user=Depends(get_current_user)):
    response = supabase.table("certificates").select("*").eq("user_id", user.id).execute()
    if not response.data:
        certification_status = compute_certification_status(user)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Certificat non disponible.",
                "certification_status": certification_status,
            },
        )
    return response.data[0]
