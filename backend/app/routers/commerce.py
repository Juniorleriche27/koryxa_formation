import hmac
from fastapi import APIRouter, Depends, Header, HTTPException, status
from app.config import settings
from app.middleware.auth import get_current_user
from app.schemas.commerce import CreateOrderSchema, SubmitPaymentSchema, ConfirmPaymentSchema, KoryxaPayWebhookSchema
from app.services.commerce_service import (
    confirm_payment_and_enroll,
    get_or_create_order,
    list_enrollments,
    list_orders,
    process_koryxa_pay_webhook,
    submit_payment,
)

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
