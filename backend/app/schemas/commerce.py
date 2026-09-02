from decimal import Decimal
from typing import Literal
from pydantic import BaseModel, Field


PaymentMethod = Literal["tmoney", "moov_money", "wave", "card", "western_union", "ria", "moneygram", "bank_transfer", "other"]


class CreateOrderSchema(BaseModel):
    course_slug: str = Field(min_length=2, max_length=120)
    partner_code: str | None = Field(default=None, max_length=120)


class SubmitPaymentSchema(BaseModel):
    payment_method: PaymentMethod
    payment_reference: str = Field(min_length=3, max_length=180)


class ConfirmPaymentSchema(BaseModel):
    order_id: str
    status: Literal["paid", "failed"]


class KoryxaPayWebhookSchema(BaseModel):
    event: Literal["payment.success", "payment.failed", "order.created"]
    transaction_id: str = Field(min_length=3, max_length=180)
    learner_email: str = Field(min_length=3, max_length=255)
    clerk_user_id: str | None = Field(default=None, max_length=120)
    item_type: Literal["course", "pack"] = "course"
    item_slug: str = Field(min_length=2, max_length=120)
    amount: Decimal = Field(default=Decimal(0))
    currency: str = "XOF"
    payment_method: PaymentMethod = "other"
    payment_reference: str | None = None
    partner_code: str | None = None


class OrderResponse(BaseModel):
    id: str
    course_slug: str
    amount: Decimal
    currency: str
    status: str
    payment_method: str | None = None
    payment_reference: str | None = None
    partner_code: str | None = None
    paid_at: str | None = None


class EnrollmentResponse(BaseModel):
    id: str
    course_slug: str
    status: str
    access_source: str
    activated_at: str
    access_until: str | None = None
