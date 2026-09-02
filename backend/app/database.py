from supabase import create_client, Client
from app.config import settings

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


_service_supabase: Client | None = None


def get_service_supabase() -> Client:
    global _service_supabase
    if _service_supabase is None:
        key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY
        _service_supabase = create_client(settings.SUPABASE_URL, key)
    return _service_supabase
