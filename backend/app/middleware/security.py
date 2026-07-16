import time
from collections import defaultdict, deque
from threading import Lock

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from app.config import settings


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Cache-Control"] = "no-store" if request.url.path.startswith(("/ai", "/integrations")) else response.headers.get("Cache-Control", "private, max-age=0")
        return response


class SensitiveRouteRateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        self._events: dict[str, deque[float]] = defaultdict(deque)
        self._lock = Lock()

    async def dispatch(self, request: Request, call_next):
        if not request.url.path.startswith(("/ai/", "/integrations/readiness")):
            return await call_next(request)

        forwarded = request.headers.get("x-forwarded-for", "")
        client_id = forwarded.split(",")[0].strip() or (request.client.host if request.client else "unknown")
        key = f"{client_id}:{request.url.path}"
        now = time.monotonic()
        window = settings.AI_RATE_LIMIT_WINDOW_SECONDS
        limit = settings.AI_RATE_LIMIT_REQUESTS

        with self._lock:
            queue = self._events[key]
            while queue and now - queue[0] > window:
                queue.popleft()
            if len(queue) >= limit:
                return JSONResponse(status_code=429, content={"detail": "Trop de requêtes. Réessayez dans quelques instants."})
            queue.append(now)

        return await call_next(request)
