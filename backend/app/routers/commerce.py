import hmac
from fastapi import APIRouter, Depends, Header, HTTPException, status
from app.config import settings
from app.middleware.auth import get_current_user
from app.database import get_service_supabase
from app.schemas.commerce import (
    CreateOrderSchema,
    SubmitPaymentSchema,
    ConfirmPaymentSchema,
    InitiateKoryxaPaySchema,
    KoryxaPayWebhookSchema,
)
from app.services.commerce_service import (
    CAREER_PACKS,
    confirm_payment_and_enroll,
    get_or_create_order,
    list_enrollments,
    list_orders,
    process_koryxa_pay_webhook,
    submit_payment,
)
from app.services.koryxa_pay_service import create_koryxa_pay_checkout

router = APIRouter()


def _require_internal_bridge(x_koryxa_bridge_key: str | None) -> None:
    expected = settings.KORYXA_IDENTITY_BRIDGE_KEY
    if not expected or not x_koryxa_bridge_key or not hmac.compare_digest(expected, x_koryxa_bridge_key):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Accès interne refusé")


@router.post("/orders")
def create_order(payload: CreateOrderSchema, user=Depends(get_current_user)):
    return get_or_create_order(user, payload.course_slug, payload.partner_code)


@router.get("/orders")
def get_orders(user=Depends(get_current_user)):
    return list_orders(user)


@router.post("/orders/{order_id}/payment")
def submit_order_payment(order_id: str, payload: SubmitPaymentSchema, user=Depends(get_current_user)):
    return submit_payment(user, order_id, payload.payment_method, payload.payment_reference)


@router.get("/enrollments")
def get_enrollments(user=Depends(get_current_user)):
    return list_enrollments(user)


@router.post("/internal/payments/confirm")
def confirm_payment(
    payload: ConfirmPaymentSchema,
    x_koryxa_bridge_key: str | None = Header(default=None),
):
    _require_internal_bridge(x_koryxa_bridge_key)
    return confirm_payment_and_enroll(payload.order_id, payload.status)


@router.post("/internal/webhook/koryxa-pay")
def koryxa_pay_webhook(
    payload: KoryxaPayWebhookSchema,
    x_koryxa_bridge_key: str | None = Header(default=None),
):
    _require_internal_bridge(x_koryxa_bridge_key)
    return process_koryxa_pay_webhook(payload)


@router.post("/koryxa-pay/initiate")
def initiate_koryxa_pay(payload: InitiateKoryxaPaySchema, user=Depends(get_current_user)):
    db = get_service_supabase()
    customer_id = str(user.id) or (user.email or "client")

    pack_prices = {
        "full-stack-data-analyst": 89000,
        "data-scientist-ai-engineer": 129000,
        "data-ultimate-all-access": 199000,
    }

    if payload.item_type == "pack":
        amount = pack_prices.get(payload.product_code, 89000)
    else:
        course_res = db.table("courses").select("price_amount").eq("slug", payload.product_code).limit(1).execute()
        if not course_res.data or course_res.data[0].get("price_amount") is None:
            amount = 29000
        else:
            amount = int(course_res.data[0]["price_amount"])

    idempotency_key = f"{payload.product_code}-{customer_id[:8]}-{int(amount)}"
    checkout_res = create_koryxa_pay_checkout(
        product_code=payload.product_code,
        customer_id=customer_id,
        amount=amount,
        currency="XOF",
        idempotency_key=idempotency_key,
    )
    return checkout_res
