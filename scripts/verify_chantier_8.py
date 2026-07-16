from pathlib import Path
import py_compile

ROOT = Path(__file__).resolve().parents[1]

required_files = [
    ROOT / "backend/app/constants.py",
    ROOT / "backend/app/services/content.py",
    ROOT / "backend/app/schemas/content.py",
    ROOT / "frontend/lib/courseConfig.ts",
    ROOT / "frontend/components/marketing/llm-rag/index.ts",
    ROOT / "docs/multi-course-architecture.md",
]

missing = [str(path.relative_to(ROOT)) for path in required_files if not path.exists()]
if missing:
    raise SystemExit(f"Fichiers manquants: {missing}")

for path in (ROOT / "backend/app").rglob("*.py"):
    py_compile.compile(str(path), doraise=True)

course_service = (ROOT / "backend/app/services/courses.py").read_text()
course_config = (ROOT / "frontend/lib/courseConfig.ts").read_text()
architecture = (ROOT / "docs/multi-course-architecture.md").read_text()

checks = {
    "python_backend_fallback": 'DEFAULT_COURSE_SLUG = "python-data-analyst"' in (ROOT / "backend/app/constants.py").read_text(),
    "python_frontend_fallback": 'DEFAULT_COURSE_SLUG = "python-data-analyst"' in course_config,
    "llm_rag_constant": 'LLM_RAG_COURSE_SLUG = "llm-rag"' in course_config,
    "published_filter": '.eq("is_published", True)' in (ROOT / "backend/app/services/content.py").read_text(),
    "course_scope_guard": "ensure_published_module_in_course" in (ROOT / "backend/app/services/content.py").read_text(),
    "course_error_logging": "course_not_found" in course_service,
    "publication_documented": "is_published = false" in architecture,
}

failed = [name for name, ok in checks.items() if not ok]
if failed:
    raise SystemExit(f"Vérifications échouées: {failed}")

print("chantier 8 verification: ok")
