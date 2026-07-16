from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CourseResponse(BaseModel):
    id: str
    slug: str
    title: str
    short_title: Optional[str] = None
    description: Optional[str] = None
    is_published: bool
    order_index: int
    created_at: datetime
