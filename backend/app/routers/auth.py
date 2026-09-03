from fastapi import APIRouter, Depends, HTTPException, status

from app.database import supabase
from app.middleware.auth import get_current_user
from app.schemas.user import LoginSchema, RegisterSchema

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterSchema):
    try:
        response = supabase.auth.sign_up(
            {
                "email": data.email,
                "password": data.password,
                "options": {"data": {"full_name": data.full_name}},
            }
        )
        return {
            "message": "Inscription réussie. Vérifie ton email.",
            "user_id": response.user.id,
        }
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc


@router.post("/login")
def login(data: LoginSchema):
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": data.email, "password": data.password}
        )
        return {
            "access_token": response.session.access_token,
            "token_type": "bearer",
        }
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        ) from exc


@router.get("/me")
def me(current_user=Depends(get_current_user)):
    metadata = getattr(current_user, "user_metadata", None) or {}
    email = str(getattr(current_user, "email", "") or "")
    full_name = str(
        metadata.get("full_name")
        or metadata.get("name")
        or email.split("@", 1)[0]
        or "Apprenant KORYXA"
    )
    avatar_url = metadata.get("avatar_url") or metadata.get("picture")

    return {
        "id": str(getattr(current_user, "id", "")),
        "email": email,
        "full_name": full_name,
        "avatar_url": avatar_url,
    }


@router.post("/logout")
def logout():
    supabase.auth.sign_out()
    return {"message": "Déconnexion réussie"}
