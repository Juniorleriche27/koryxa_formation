from fastapi import APIRouter, Depends, HTTPException, status
from app.database import supabase
from app.middleware.auth import get_current_user
from app.routers.validation import compute_certification_status

router = APIRouter()


def build_certificate_payload(user_id: str, certification_status: dict):
    return {
        "user_id": user_id,
        "platform_score": certification_status.get("platform_score"),
        "project_score": certification_status.get("project_score"),
        "final_score": certification_status.get("final_score"),
        "eligibility_snapshot": certification_status,
    }


@router.get("/me")
def get_my_certificate(user=Depends(get_current_user)):
    response = supabase.table("certificates").select("*").eq("user_id", user.id).execute()
    certification_status = compute_certification_status(user)

    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "Certificat non disponible.",
                "certification_status": certification_status,
            },
        )

    return {
        **response.data[0],
        "certification_status": certification_status,
    }


@router.post("/issue")
def issue_my_certificate(user=Depends(get_current_user)):
    certification_status = compute_certification_status(user)

    if not certification_status.get("is_eligible"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "message": "Certificat non disponible.",
                "certification_status": certification_status,
            },
        )

    existing = supabase.table("certificates").select("*").eq("user_id", user.id).execute()
    if existing.data:
        return {
            **existing.data[0],
            "certification_status": certification_status,
        }

    payload = build_certificate_payload(user.id, certification_status)
    response = supabase.table("certificates").insert(payload).execute()
    certificate = (response.data or [None])[0]

    if not certificate:
        raise HTTPException(status_code=502, detail="Impossible de générer le certificat.")

    return {
        **certificate,
        "certification_status": certification_status,
    }
