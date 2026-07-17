from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run(command: list[str], cwd: Path = ROOT) -> None:
    print(f"[quality] {' '.join(command)}")
    completed = subprocess.run(command, cwd=cwd, check=False)
    if completed.returncode != 0:
        raise SystemExit(completed.returncode)


def check_frontend_invariants() -> None:
    course_config = (ROOT / "frontend/lib/courseConfig.ts").read_text()
    modules_page = (ROOT / "frontend/app/modules/page.tsx").read_text()
    module_page = (ROOT / "frontend/app/modules/[id]/page.tsx").read_text()
    llm_page = (ROOT / "frontend/app/formations/llm-rag/page.tsx").read_text()

    checks = {
        "python fallback": 'DEFAULT_COURSE_SLUG = "python-data-analyst"' in course_config,
        "llm slug": 'LLM_RAG_COURSE_SLUG = "llm-rag"' in course_config,
        "module list uses route helper": "courseRoutes.module(module.id, courseSlug)" in modules_page,
        "module page keeps course context": "courseRoutes.modules(courseSlug)" in module_page,
        "llm landing is autonomous": "CourseHeader" in llm_page and "KORYXA FORMATION" in llm_page,
        "llm preparation badge removed": "Parcours en préparation" not in llm_page,
        "llm learner CTA exposed": "courseRoutes.access(LLM_RAG_COURSE_SLUG)" in llm_page,
    }
    failed = [name for name, ok in checks.items() if not ok]
    if failed:
        raise SystemExit(f"Frontend invariants failed: {failed}")
    print("[quality] frontend invariants: ok")


def main() -> None:
    parser = argparse.ArgumentParser(description="KORYXA Formation quality gate")
    parser.add_argument("--with-build", action="store_true", help="Run the production Next.js build")
    args = parser.parse_args()

    run([sys.executable, "-m", "compileall", "-q", "backend/app"])
    run([sys.executable, "-m", "unittest", "discover", "-s", "backend/tests", "-p", "test_*.py", "-v"])
    run([sys.executable, "scripts/verify_chantier_8.py"])
    run([sys.executable, "scripts/verify_documentation.py"])
    check_frontend_invariants()
    run(["git", "diff", "--check"])

    if args.with_build:
        run(["npm", "run", "build"], cwd=ROOT / "frontend")

    run([sys.executable, "scripts/final_qa.py"])
    print("[quality] all checks passed")


if __name__ == "__main__":
    main()
