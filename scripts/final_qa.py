from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class QA:
    def __init__(self) -> None:
        self.results: list[dict[str, str | bool]] = []

    def check(self, category: str, name: str, condition: bool, detail: str) -> None:
        self.results.append({"category": category, "name": name, "passed": condition, "detail": detail})

    def require_text(self, category: str, name: str, path: str, fragments: list[str]) -> None:
        file_path = ROOT / path
        text = file_path.read_text() if file_path.exists() else ""
        missing = [fragment for fragment in fragments if fragment not in text]
        self.check(category, name, file_path.exists() and not missing, "ok" if not missing else f"missing: {missing}")

    def finish(self) -> None:
        failed = [item for item in self.results if not item["passed"]]
        summary = {
            "total": len(self.results),
            "passed": len(self.results) - len(failed),
            "failed": len(failed),
            "status": "PASS" if not failed else "FAIL",
        }
        report = {"summary": summary, "checks": self.results}
        output = ROOT / "qa-final-report.json"
        output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
        print(json.dumps(summary, ensure_ascii=False))
        print(f"qa report: {output.relative_to(ROOT)}")
        if failed:
            for item in failed:
                print(f"FAIL [{item['category']}] {item['name']}: {item['detail']}")
            raise SystemExit(1)


def main() -> None:
    qa = QA()

    qa.require_text("catalog", "Python remains published default", "frontend/lib/courseConfig.ts", [
        'DEFAULT_COURSE_SLUG = "python-data-analyst"',
        'published: true',
    ])
    qa.require_text("catalog", "LLM RAG remains unpublished", "frontend/lib/courseConfig.ts", [
        'LLM_RAG_COURSE_SLUG = "llm-rag"',
        'published: false',
    ])
    qa.require_text("catalog", "LLM RAG landing is preparation-only", "frontend/app/formations/llm-rag/page.tsx", [
        "Parcours en préparation",
    ])

    qa.require_text("access", "Course grants are scoped", "backend/app/routers/access.py", [
        '"course_id": course_id',
        'payload.get("course_slug") or DEFAULT_COURSE_SLUG',
        '.eq("is_published", True)',
    ])
    qa.require_text("access", "Published course list exposes access flag", "backend/app/routers/access.py", [
        '@router.get("/courses")',
        '"has_access": course.get("id") == grant.get("course_id")',
    ])

    qa.require_text("progress", "Progress is course-aware", "backend/app/routers/progress.py", [
        "get_course_id",
        "course_id",
    ])
    qa.require_text("quiz", "Quiz answers hidden before submit", "backend/app/routers/ai.py", [
        '.select("id, question, options, difficulty, skill, order_index")',
    ])
    qa.require_text("quiz", "Quiz corrections returned after submit", "backend/app/routers/validation.py", [
        '"correct_answer": question["answer"]',
        '"corrections": corrections',
    ])
    qa.require_text("project", "Project API hides reference solution", "backend/app/routers/projects.py", [
        "PUBLIC_PROJECT_COLUMNS",
        "rubric,is_published",
    ])
    qa.require_text("certificate", "Certificate frontend keeps course context", "frontend/app/certificate/page.tsx", [
        "getCertificationStatus(selectedCourse)",
        "getMy(selectedCourse)",
        "issue(courseSlug)",
    ])

    qa.require_text("security", "Security headers and rate limits active", "backend/app/main.py", [
        "SecurityHeadersMiddleware",
        "SensitiveRouteRateLimitMiddleware",
    ])
    qa.require_text("security", "Solutions require authentication", "backend/app/routers/exercises.py", [
        "Depends(get_current_user)",
    ])
    qa.require_text("security", "Notebook paths are confined", "backend/app/routers/notebook.py", [
        "os.path.realpath",
        "path.startswith(content_root + os.sep)",
    ])

    qa.require_text("ux", "Learner context is accessible", "frontend/components/learner/LearnerCourseContext.tsx", [
        'aria-label="Contexte du parcours"',
        'aria-current=',
        "focus-visible:ring-2",
        "flex-col",
        "lg:flex-row",
    ])
    qa.require_text("ux", "Module list has loading error empty states", "frontend/app/modules/page.tsx", [
        'aria-busy="true"',
        "Réessayer",
        "Aucun module disponible.",
    ])
    qa.require_text("ux", "Module page handles errors", "frontend/app/modules/[id]/page.tsx", [
        'role="alert"',
        "Retour au parcours",
        "Réessayer",
    ])

    migrations = sorted((ROOT / "supabase/migrations").glob("20260716_*llm_rag*.sql"))
    qa.check("database", "All LLM RAG migrations are present", len(migrations) >= 6, f"found {len(migrations)}")
    all_sql = "\n".join(path.read_text() for path in migrations)
    qa.check("database", "LLM RAG seeds remain unpublished", "llm-rag" in all_sql and "is_published" in all_sql and "FALSE" in all_sql, "seed publication guards")

    build_manifest = ROOT / "frontend/.next/routes-manifest.json"
    qa.check("build", "Next.js build manifest exists", build_manifest.exists(), str(build_manifest.relative_to(ROOT)))
    if build_manifest.exists():
        manifest = json.loads(build_manifest.read_text())
        routes = {route.get("page") or route.get("regex") for route in manifest.get("staticRoutes", []) + manifest.get("dynamicRoutes", [])}
        qa.check("build", "Core route manifest generated", len(routes) > 0, f"routes {len(routes)}")

    qa.require_text("documentation", "QA matrix documented", "docs/final-qa-matrix.md", [
        "Python Data Analyst",
        "LLM RAG",
        "PASS",
        "Chantier 16",
    ])

    qa.finish()


if __name__ == "__main__":
    main()
