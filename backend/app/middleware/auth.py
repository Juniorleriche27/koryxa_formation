from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database import get_service_supabase, supabase
from app.routers.access import ACCESS_COOKIE_NAME, verify_access_session
from app.services.koryxa_identity_service import profile_as_user

bearer = HTTPBearer(auto_error=False)


def _identity_user_from_request(request: Request):
    session = verify_access_session(request.cookies.get(ACCESS_COOKIE_NAME))
    if not session:
        return None

    identity_user_id = str(session.get("identity_user_id") or "").strip()
    profile_id = str(session.get("profile_id") or "").strip()
    if session.get("kind") == "identity" and not profile_id:
        profile_id = str(session.get("sub") or "").strip()
    if not profile_id or not identity_user_id:
        return None

    client = get_service_supabase()
    try:
        result = (
            client.table("profiles")
            .select("id,email,full_name,koryxa_identity_user_id")
            .eq("id", profile_id)
            .eq("koryxa_identity_user_id", identity_user_id)
            .limit(1)
            .execute()
        )
        profile = (result.data or [None])[0]
    except Exception:
        # Backward-compatible during the short deployment window before the additive migration is applied.
        result = client.table("profiles").select("id,email,full_name").eq("id", profile_id).limit(1).execute()
        profile = (result.data or [None])[0]

    return profile_as_user(profile) if profile else None


async def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
):
    identity_user = _identity_user_from_request(request)
    if identity_user:
        return identity_user

    if credentials:
        try:
            user = supabase.auth.get_user(credentials.credentials)
            if user.user:
                return user.user
        except Exception:
            pass

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session KORYXA Identity requise")
