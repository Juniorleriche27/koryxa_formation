import json
import logging
import time
import urllib.error
import urllib.request
from dataclasses import dataclass

from app.config import settings

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class SafeProbeResult:
    state: str
    detail: str
    latency_ms: int | None = None


def _configured(value: str | None) -> bool:
    return bool(value and value.strip())


def configuration_snapshot() -> list[dict]:
    return [
        {
            "name": "supabase",
            "configured": _configured(settings.SUPABASE_URL) and _configured(settings.SUPABASE_KEY),
            "detail": "URL et clé publique configurées." if _configured(settings.SUPABASE_URL) and _configured(settings.SUPABASE_KEY) else "Configuration Supabase incomplète.",
        },
        {
            "name": "qdrant",
            "configured": _configured(settings.QDRANT_URL) and _configured(settings.QDRANT_COLLECTION),
            "detail": "Endpoint et collection configurés." if _configured(settings.QDRANT_URL) and _configured(settings.QDRANT_COLLECTION) else "Configuration Qdrant incomplète.",
        },
        {
            "name": "cohere",
            "configured": _configured(settings.COHERE_API_KEY) and _configured(settings.COHERE_MODEL),
            "detail": "Clé et modèle configurés." if _configured(settings.COHERE_API_KEY) and _configured(settings.COHERE_MODEL) else "Configuration Cohere incomplète.",
        },
    ]


def _http_probe(url: str, headers: dict[str, str] | None = None) -> SafeProbeResult:
    started = time.perf_counter()
    request = urllib.request.Request(url, headers=headers or {}, method="GET")
    try:
        with urllib.request.urlopen(request, timeout=settings.CLOUD_PROBE_TIMEOUT_SECONDS) as response:
            response.read(256)
            latency = int((time.perf_counter() - started) * 1000)
            if 200 <= response.status < 500:
                return SafeProbeResult("ready", "Service joignable.", latency)
            return SafeProbeResult("unreachable", f"Réponse HTTP inattendue: {response.status}.", latency)
    except urllib.error.HTTPError as exc:
        latency = int((time.perf_counter() - started) * 1000)
        if exc.code in {401, 403, 404}:
            return SafeProbeResult("ready", "Service joignable et authentification prise en compte.", latency)
        logger.warning("cloud_probe_http_error service_url_host_only code=%s", exc.code)
        return SafeProbeResult("unreachable", f"Erreur HTTP {exc.code}.", latency)
    except Exception as exc:
        latency = int((time.perf_counter() - started) * 1000)
        logger.warning("cloud_probe_failed type=%s", type(exc).__name__)
        return SafeProbeResult("unreachable", "Service non joignable.", latency)


def probe_supabase() -> SafeProbeResult:
    if not (_configured(settings.SUPABASE_URL) and _configured(settings.SUPABASE_KEY)):
        return SafeProbeResult("not_configured", "Configuration Supabase incomplète.")
    return _http_probe(
        f"{settings.SUPABASE_URL.rstrip('/')}/rest/v1/",
        headers={"apikey": settings.SUPABASE_KEY, "Authorization": f"Bearer {settings.SUPABASE_KEY}"},
    )


def probe_qdrant() -> SafeProbeResult:
    if not (_configured(settings.QDRANT_URL) and _configured(settings.QDRANT_COLLECTION)):
        return SafeProbeResult("not_configured", "Configuration Qdrant incomplète.")
    headers = {"api-key": settings.QDRANT_API_KEY} if _configured(settings.QDRANT_API_KEY) else {}
    return _http_probe(f"{settings.QDRANT_URL.rstrip('/')}/collections/{settings.QDRANT_COLLECTION}", headers=headers)


def probe_cohere() -> SafeProbeResult:
    if not (_configured(settings.COHERE_API_KEY) and _configured(settings.COHERE_MODEL)):
        return SafeProbeResult("not_configured", "Configuration Cohere incomplète.")
    return _http_probe(
        "https://api.cohere.com/v1/models",
        headers={"Authorization": f"Bearer {settings.COHERE_API_KEY}", "Accept": "application/json"},
    )


def cloud_readiness(*, probe: bool = False) -> dict:
    configured = configuration_snapshot()
    probe_map = {
        "supabase": probe_supabase,
        "qdrant": probe_qdrant,
        "cohere": probe_cohere,
    }
    integrations = []
    for item in configured:
        if not item["configured"]:
            integrations.append({**item, "state": "not_configured", "probed": False, "latency_ms": None})
            continue
        if not probe:
            integrations.append({**item, "state": "ready", "probed": False, "latency_ms": None})
            continue
        result = probe_map[item["name"]]()
        integrations.append(
            {
                "name": item["name"],
                "configured": item["configured"],
                "state": result.state,
                "probed": True,
                "detail": result.detail,
                "latency_ms": result.latency_ms,
            }
        )

    ready_for_cloud = all(row["configured"] and row["state"] == "ready" for row in integrations)
    if settings.RAG_RUNTIME_MODE != "cloud":
        ready_for_cloud = False
    return {
        "runtime_mode": settings.RAG_RUNTIME_MODE,
        "ready_for_cloud": ready_for_cloud,
        "integrations": integrations,
    }


def safe_json_report(report: dict) -> str:
    return json.dumps(report, ensure_ascii=False, indent=2, sort_keys=True)
