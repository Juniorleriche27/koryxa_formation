import os
import sys
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "backend"))
os.environ.setdefault("SUPABASE_URL", "")
os.environ.setdefault("SUPABASE_KEY", "")
os.environ.setdefault("SUPABASE_JWT_SECRET", "")

from app.services import integrations


class IntegrationReadinessTests(unittest.TestCase):
    def test_snapshot_never_returns_secret_values(self):
        with (
            patch.object(integrations.settings, "SUPABASE_URL", "https://example.supabase.co"),
            patch.object(integrations.settings, "SUPABASE_KEY", "secret-supabase-value"),
            patch.object(integrations.settings, "QDRANT_URL", "https://example.qdrant.io"),
            patch.object(integrations.settings, "QDRANT_API_KEY", "secret-qdrant-value"),
            patch.object(integrations.settings, "QDRANT_COLLECTION", "koryxa_llm_rag"),
            patch.object(integrations.settings, "COHERE_API_KEY", "secret-cohere-value"),
            patch.object(integrations.settings, "COHERE_MODEL", "command-r"),
        ):
            snapshot = integrations.configuration_snapshot()
        rendered = str(snapshot)
        self.assertNotIn("secret-supabase-value", rendered)
        self.assertNotIn("secret-qdrant-value", rendered)
        self.assertNotIn("secret-cohere-value", rendered)
        self.assertTrue(all(item["configured"] for item in snapshot))

    def test_mock_mode_is_not_cloud_ready_without_network(self):
        configured = [
            {"name": "supabase", "configured": True, "detail": "ok"},
            {"name": "qdrant", "configured": True, "detail": "ok"},
            {"name": "cohere", "configured": True, "detail": "ok"},
        ]
        with (
            patch.object(integrations, "configuration_snapshot", return_value=configured),
            patch.object(integrations.settings, "RAG_RUNTIME_MODE", "mock"),
        ):
            report = integrations.cloud_readiness(probe=False)
        self.assertFalse(report["ready_for_cloud"])
        self.assertTrue(all(not item["probed"] for item in report["integrations"]))

    def test_cloud_mode_requires_all_integrations(self):
        configured = [
            {"name": "supabase", "configured": True, "detail": "ok"},
            {"name": "qdrant", "configured": False, "detail": "missing"},
            {"name": "cohere", "configured": True, "detail": "ok"},
        ]
        with (
            patch.object(integrations, "configuration_snapshot", return_value=configured),
            patch.object(integrations.settings, "RAG_RUNTIME_MODE", "cloud"),
        ):
            report = integrations.cloud_readiness(probe=False)
        self.assertFalse(report["ready_for_cloud"])
        qdrant = next(item for item in report["integrations"] if item["name"] == "qdrant")
        self.assertEqual(qdrant["state"], "not_configured")

    def test_probe_failures_are_sanitized(self):
        class Failure(Exception):
            pass

        with (
            patch.object(integrations.settings, "CLOUD_PROBE_TIMEOUT_SECONDS", 1),
            patch("urllib.request.urlopen", side_effect=Failure("token=should-never-leak")),
        ):
            result = integrations._http_probe("https://example.invalid")
        self.assertEqual(result.state, "unreachable")
        self.assertNotIn("token", result.detail)
        self.assertNotIn("should-never-leak", result.detail)


if __name__ == "__main__":
    unittest.main()
