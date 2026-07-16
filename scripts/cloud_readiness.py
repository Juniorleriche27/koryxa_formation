from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "backend"))

# Le diagnostic doit fonctionner même quand aucun environnement cloud n'est configuré.
os.environ.setdefault("SUPABASE_URL", "")
os.environ.setdefault("SUPABASE_KEY", "")
os.environ.setdefault("SUPABASE_JWT_SECRET", "")

from app.services.integrations import cloud_readiness, safe_json_report


def main() -> None:
    parser = argparse.ArgumentParser(description="Diagnostic cloud non sensible pour KORYXA Formation")
    parser.add_argument("--probe", action="store_true", help="Teste réellement la joignabilité des services configurés")
    args = parser.parse_args()

    report = cloud_readiness(probe=args.probe)
    print(safe_json_report(report))
    if args.probe and not report["ready_for_cloud"]:
        raise SystemExit(2)


if __name__ == "__main__":
    main()
