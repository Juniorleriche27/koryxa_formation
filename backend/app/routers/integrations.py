from fastapi import APIRouter, Query

from app.schemas.integrations import CloudReadinessResponse
from app.services.integrations import cloud_readiness

router = APIRouter()


@router.get("/readiness", response_model=CloudReadinessResponse)
def get_cloud_readiness(probe: bool = Query(default=False)):
    return cloud_readiness(probe=probe)
