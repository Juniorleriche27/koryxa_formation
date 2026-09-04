import json
import logging
import urllib.error
import urllib.request
from decimal import Decimal
from fastapi import HTTPException, status
from app.config import settings

logger = logging.getLogger(__name__)


def create_koryxa_pay_checkout(
    product_code: str,
    customer_id: str,
    amount: int | float | Decimal,
    currency: str = "XOF",
    idempotency_key: str | None = None,
    provider: str | None = None,
    customer_name: str | None = None,
    customer_phone: str | None = None,
    metadata: dict | None = None,
) -> dict:
    """
    Initialise une session de paiement via l'API officielle KORYXA Pay :
    POST https://api-pay.koryxa.fr/v1/client/checkouts
    """
    base_url = settings.KORYXA_PAY_BASE_URL.rstrip("/")
    project_code = settings.KORYXA_PAY_PROJECT_CODE
    project_key = settings.KORYXA_PAY_PROJECT_KEY
    pay_provider = provider or settings.KORYXA_PAY_PROVIDER or "leekpay"

    if not project_key:
        logger.warning("KORYXA_PAY_PROJECT_KEY non configuré. Mode simulation KORYXA Pay.")
        return {
            "success": True,
            "simulated": True,
            "checkout_url": f"https://pay.koryxa.fr/pay/{product_code}?customer={customer_id}",
            "checkout_id": f"sim_{idempotency_key or 'check'}",
            "product_code": product_code,
            "amount_minor": int(amount),
            "currency": currency,
        }

    url = f"{base_url}/v1/client/checkouts"
    headers = {
        "Content-Type": "application/json",
        "X-Project-Code": project_code,
        "X-Project-Key": project_key,
    }

    payload = {
        "product_code": product_code,
        "customer_id": customer_id,
        "amount_minor": int(amount),
        "currency": currency,
        "provider": pay_provider,
        "idempotency_key": idempotency_key or f"{product_code}-{customer_id}-{int(amount)}",
        "provider_data": {
            "name": (customer_name or "").strip(),
            "phone": (customer_phone or "").strip(),
        },
        "metadata": metadata or {},
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data
    except urllib.error.HTTPError as exc:
        err_body = exc.read().decode("utf-8", errors="ignore")
        logger.error("Erreur KORYXA Pay (%s): %s", exc.code, err_body)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Erreur KORYXA Pay: {err_body or exc.reason}",
        ) from exc
    except Exception as exc:
        logger.error("Erreur de connexion KORYXA Pay: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Impossible de contacter la passerelle KORYXA Pay.",
        ) from exc


def get_koryxa_pay_payment(payment_id: str) -> dict:
    url = f"{settings.KORYXA_PAY_BASE_URL.rstrip('/')}/v1/client/payments/{payment_id}"
    req = urllib.request.Request(url, headers={
        "X-Project-Code": settings.KORYXA_PAY_PROJECT_CODE,
        "X-Project-Key": settings.KORYXA_PAY_PROJECT_KEY,
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Vérification KORYXA Pay impossible") from exc
