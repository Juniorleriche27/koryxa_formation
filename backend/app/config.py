from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_JWT_SECRET: str
    FRONTEND_URL: str = "http://localhost:3000"
    CORS_ORIGINS: str = (
        "https://formation.koryxa.fr,"
        "https://formation.innovaplus.africa,"
        "https://koryxa-formation-jlr7.vercel.app,"
        "https://koryxa-formation.vercel.app,"
        "http://localhost:3000"
    )
    COHERE_API_KEY: str = ""
    COHERE_MODEL: str = "command-r-08-2024"

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
