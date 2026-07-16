from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: str = (
        "https://formation.koryxa.fr,"
        "http://localhost:3000"
    )
    COHERE_API_KEY: str = ""
    COHERE_MODEL: str = "command-r-08-2024"
    QDRANT_URL: str = ""
    QDRANT_API_KEY: str = ""
    QDRANT_COLLECTION: str = "koryxa_llm_rag"
    RAG_RUNTIME_MODE: str = "mock"
    CLOUD_PROBE_TIMEOUT_SECONDS: int = 5
    AI_RATE_LIMIT_REQUESTS: int = 20
    AI_RATE_LIMIT_WINDOW_SECONDS: int = 60
    MAX_UPLOAD_BYTES: int = 10_000_000
    SUPABASE_SERVICE_ROLE_KEY: str | None = None
    KORYXA_IDENTITY_BRIDGE_KEY: str = ""
    FORMATION_COOKIE_DOMAIN: str | None = None

    @field_validator("RAG_RUNTIME_MODE")
    @classmethod
    def validate_runtime_mode(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in {"mock", "local", "cloud"}:
            raise ValueError("RAG_RUNTIME_MODE must be mock, local or cloud")
        return normalized

    @field_validator("QDRANT_URL")
    @classmethod
    def validate_qdrant_url(cls, value: str) -> str:
        normalized = value.strip().rstrip("/")
        if normalized and not cls._is_valid_origin(normalized):
            raise ValueError("QDRANT_URL must start with http:// or https://")
        return normalized

    @field_validator("CORS_ORIGINS")
    @classmethod
    def validate_cors_origins(cls, value: str) -> str:
        origins = [
            origin.strip().rstrip("/")
            for origin in value.split(",")
            if origin.strip()
        ]
        invalid = [origin for origin in origins if not cls._is_valid_origin(origin)]
        if invalid:
            raise ValueError("CORS_ORIGINS must contain only http:// or https:// origins")
        return ",".join(origins)

    @property
    def allowed_cors_origins(self) -> list[str]:
        origins: list[str] = []
        if self._is_valid_origin(self.FRONTEND_URL):
            origins.append(self.FRONTEND_URL.strip().rstrip("/"))
        origins.extend(
            origin.strip().rstrip("/")
            for origin in self.CORS_ORIGINS.split(",")
            if self._is_valid_origin(origin)
        )

        seen: set[str] = set()
        return [origin for origin in origins if not (origin in seen or seen.add(origin))]

    @staticmethod
    def _is_valid_origin(origin: str) -> bool:
        value = origin.strip()
        return value.startswith("http://") or value.startswith("https://")

    class Config:
        env_file = ".env"


settings = Settings()
