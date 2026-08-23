from __future__ import annotations

import secrets
from types import SimpleNamespace
from typing import Any

from fastapi import HTTPException, status

from app.database import get_service_supabase


def _profile_by_identity_id(identity_user_id: str) -> dict[str, Any] | None:
    client = get_service_supabase()
    try:
        result = (
            client.table("profiles")
            .select("id,email,full_name,koryxa_identity_user_id,auth_provider")
            .eq("koryxa_identity_user_id", identity_user_id)
            .limit(1)
            .execute()
        )
        return (result.data or [None])[0]
    except Exception:
        # Backward-compatible during deployment before the additive migration is applied.
        return None


def _profile_by_email(email: str) -> dict[str, Any] | None:
    client = get_service_supabase()
    result = (
        client.table("profiles")
        .select("id,email,full_name")
        .eq("email", email)
        .limit(1)
        .execute()
    )
    return (result.data or [None])[0]


def _link_profile(profile_id: str, identity_user_id: str, name: str, email: str) -> dict[str, Any]:
    client = get_service_supabase()
    payload = {
        "full_name": name or "Apprenant KORYXA",
        "email": email,
        "koryxa_identity_user_id": identity_user_id,
        "auth_provider": "koryxa_identity",
    }
    try:
        result = client.table("profiles").update(payload).eq("id", profile_id).execute()
        return (result.data or [{"id": profile_id, **payload}])[0]
    except Exception:
        # Keep the identity flow functional if code deploys just before the additive migration.
        fallback = client.table("profiles").update({"full_name": payload["full_name"], "email": email}).eq("id", profile_id).execute()
        return (fallback.data or [{"id": profile_id, "full_name": payload["full_name"], "email": email}])[0]


def get_or_create_identity_profile(identity_user_id: str, email: str, name: str | None = None) -> dict[str, Any]:
    normalized_email = email.strip().lower()
    normalized_name = (name or "").strip() or normalized_email
    if not identity_user_id or not normalized_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Identité KORYXA incomplète")

    existing = _profile_by_identity_id(identity_user_id)
    if existing:
        return _link_profile(str(existing["id"]), identity_user_id, normalized_name, normalized_email)

    existing = _profile_by_email(normalized_email)
    if existing:
        return _link_profile(str(existing["id"]), identity_user_id, normalized_name, normalized_email)

    client = get_service_supabase()
    try:
        created = client.auth.admin.create_user(
            {
                "email": normalized_email,
                "password": secrets.token_urlsafe(48),
                "email_confirm": True,
                "user_metadata": {
                    "full_name": normalized_name,
                    "koryxa_identity_user_id": identity_user_id,
                    "auth_provider": "koryxa_identity",
                },
            }
        )
        user = created.user
    except Exception as exc:
        # A concurrent callback may have created the shadow user between lookup and insert.
        existing = _profile_by_email(normalized_email)
        if existing:
            return _link_profile(str(existing["id"]), identity_user_id, normalized_name, normalized_email)
        raise HTTPException(status_code=502, detail="Impossible de créer le profil apprenant KORYXA") from exc

    if not user:
        raise HTTPException(status_code=502, detail="Profil apprenant KORYXA non créé")

    profile = _profile_by_email(normalized_email)
    if not profile:
        # The trigger should create the profile. Keep a defensive fallback for environments where it is missing.
        inserted = client.table("profiles").insert(
            {"id": str(user.id), "email": normalized_email, "full_name": normalized_name}
        ).execute()
        profile = (inserted.data or [None])[0]
    if not profile:
        raise HTTPException(status_code=502, detail="Profil apprenant KORYXA introuvable")

    return _link_profile(str(profile["id"]), identity_user_id, normalized_name, normalized_email)


def profile_as_user(profile: dict[str, Any]):
    return SimpleNamespace(
        id=str(profile["id"]),
        email=profile.get("email") or "",
        user_metadata={"full_name": profile.get("full_name") or "Apprenant KORYXA"},
    )
