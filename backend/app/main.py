from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.middleware.security import SecurityHeadersMiddleware, SensitiveRouteRateLimitMiddleware
from app.routers import auth, courses, exercises, integrations, lessons, modules, progress, projects, certificates, notebook, ai, validation, access, theory

app = FastAPI(title="KORYXA Formation API", version="1.0.0")

app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(SensitiveRouteRateLimitMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,         prefix="/auth",         tags=["Auth"])
app.include_router(courses.router,      prefix="/courses",      tags=["Courses"])
app.include_router(lessons.router,      prefix="/lessons",      tags=["Lessons"])
app.include_router(exercises.router,    prefix="/exercises",    tags=["Exercises"])
app.include_router(integrations.router, prefix="/integrations", tags=["Integrations"])
app.include_router(projects.router,     prefix="/projects",     tags=["Projects"])
app.include_router(theory.router,       prefix="/theory",       tags=["Theory"])
app.include_router(modules.router,      prefix="/modules",      tags=["Modules"])
app.include_router(progress.router,     prefix="/progress",     tags=["Progress"])
app.include_router(certificates.router, prefix="/certificates", tags=["Certificates"])
app.include_router(notebook.router,     prefix="/modules",      tags=["Notebook"])
app.include_router(ai.router,           prefix="/ai",           tags=["AI"])
app.include_router(validation.router,   prefix="/validation",   tags=["Validation"])
app.include_router(access.router)

@app.get("/")
def health_check():
    return {"status": "ok", "app": "KORYXA Formation API"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "koryxa-formation-api"}
