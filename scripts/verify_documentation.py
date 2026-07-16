from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

required = [
    ROOT / "README.md",
    DOCS / "README.md",
    DOCS / "local-development.md",
    DOCS / "multi-course-architecture.md",
    DOCS / "api-reference.md",
    DOCS / "course-authoring.md",
    DOCS / "operations-and-release.md",
    DOCS / "cloud-readiness.md",
    DOCS / "security-policy.md",
    DOCS / "testing-strategy.md",
    DOCS / "learner-experience.md",
    DOCS / "koryxa-ecosystem-integration.md",
    DOCS / "incident-and-rollback.md",
    DOCS / "final-qa-matrix.md",
]

missing = [str(path.relative_to(ROOT)) for path in required if not path.exists()]
if missing:
    raise SystemExit(f"Documentation manquante: {missing}")

link_pattern = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
broken: list[str] = []
for markdown in [ROOT / "README.md", *DOCS.glob("*.md")]:
    text = markdown.read_text()
    for target in link_pattern.findall(text):
        if target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        relative = target.split("#", 1)[0]
        if not relative:
            continue
        resolved = (markdown.parent / relative).resolve()
        if not resolved.exists():
            broken.append(f"{markdown.relative_to(ROOT)} -> {target}")

if broken:
    raise SystemExit("Liens documentaires cassés: " + ", ".join(broken))

index = (DOCS / "README.md").read_text()
for path in required[2:]:
    if path.name not in index:
        raise SystemExit(f"Document absent de l'index: {path.name}")

sensitive_patterns = [
    re.compile(r"(?i)(api[_-]?key|token|password|secret)\s*[=:]\s*['\"][^'\"]{8,}['\"]"),
    re.compile(r"sk-[A-Za-z0-9]{16,}"),
]
for markdown in [ROOT / "README.md", *DOCS.glob("*.md")]:
    text = markdown.read_text()
    for pattern in sensitive_patterns:
        if pattern.search(text):
            raise SystemExit(f"Valeur sensible potentielle dans {markdown.relative_to(ROOT)}")

print(f"documentation verification: ok ({len(required)} documents requis)")
