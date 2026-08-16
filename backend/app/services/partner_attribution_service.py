import json
from datetime import datetime, timezone
from urllib import request, error
from app.config import settings
from app.database import get_service_supabase


def sync_partner_sale(order: dict, course_slug: str, partner_product_slug: str | None) -> dict:
    partner_code = (order.get("partner_code") or "").strip()
    if not partner_code:
        return {"required": False, "synced": False}
    if not partner_product_slug:
        return {"required": False, "synced": False, "reason": "partner_product_not_configured"}

    db = get_service_supabase()
    attempted_at = datetime.now(timezone.utc).isoformat()
    base_url = settings.KORYXA_PARTNER_PORTAL_URL.rstrip("/")
    bridge_key = settings.KORYXA_IDENTITY_BRIDGE_KEY

    if not base_url or not bridge_key:
        db.table("formation_orders").update({
            "partner_attribution_status": "failed",
            "partner_attribution_attempted_at": attempted_at,
        }).eq("id", order["id"]).execute()
        return {"required": True, "synced": False, "reason": "partner_portal_not_configured"}

    payload = {
        "externalOrderId": order["id"],
        "codePartenaire": partner_code,
        "productSlug": partner_product_slug,
        "courseSlug": course_slug,
        "learnerEmail": order.get("learner_email"),
        "amount": float(order.get("amount") or 0),
        "currency": order.get("currency") or "XOF",
        "paymentReference": order.get("payment_reference"),
        "paidAt": order.get("paid_at") or attempted_at,
    }

    req = request.Request(
        f"{base_url}/api/internal/formation-sale",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {bridge_key}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=6) as response:
            body = json.loads(response.read().decode("utf-8") or "{}")
            if response.status < 200 or response.status >= 300 or not body.get("success"):
                raise RuntimeError(f"partner_portal_status_{response.status}")
        db.table("formation_orders").update({
            "partner_attribution_status": "synced",
            "partner_attribution_attempted_at": attempted_at,
        }).eq("id", order["id"]).execute()
        return {"required": True, "synced": True}
    except (error.URLError, TimeoutError, ValueError, RuntimeError):
        db.table("formation_orders").update({
            "partner_attribution_status": "failed",
            "partner_attribution_attempted_at": attempted_at,
        }).eq("id", order["id"]).execute()
        return {"required": True, "synced": False, "reason": "partner_portal_unavailable"}
