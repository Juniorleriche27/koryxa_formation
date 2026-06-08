from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: str = ""
    COHERE_API_KEY: str = ""

    @field_validator("CORS_ORIGINS")
    @classmethod
    def validate_cors_origins(cls, value: str) -> str:
        if not value:
            return value

        origins = [origin.strip() for origin in value.split(",") if origin.strip()]
        invalid = [origin for origin in origins if not origin.startswith(("http://", "https://"))]
        if invalid:
            raise ValueError("CORS_ORIGINS must contain only http:// or https:// origins")

        return ",".join(origins)

    @property
    def allowed_cors_origins(self) -> list[str]:
        origins = [self.FRONTEND_URL.strip()] if self.FRONTEND_URL.strip() else []

        if self.CORS_ORIGINS.strip():
            origins.extend(origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip())

        seen: set[str] = set()
        return [origin for origin in origins if not (origin in seen or seen.add(origin))]

    class Config:
        env_file = ".env"


settings = Settings()
