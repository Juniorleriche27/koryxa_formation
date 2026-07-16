from typing import Literal

from pydantic import BaseModel, Field


IntegrationState = Literal["ready", "not_configured", "unreachable", "disabled"]


class IntegrationStatus(BaseModel):
    name: str
    state: IntegrationState
    configured: bool
    probed: bool = False
    detail: str
    latency_ms: int | None = None


class CloudReadinessResponse(BaseModel):
    runtime_mode: Literal["mock", "local", "cloud"]
    ready_for_cloud: bool
    integrations: list[IntegrationStatus] = Field(default_factory=list)
