from fastapi import APIRouter

from app.constants import LESSON_NOT_FOUND
from app.schemas.content import LessonResponse
from app.services.content import ensure_published_module_in_course, get_published_row, list_published_rows

router = APIRouter()

LESSON_COLUMNS = (
    "id,module_id,slug,title,summary,order_index,lesson_type,"
    "estimated_minutes,objectives,content_md,source_refs,validation_prompt,is_published"
)


@router.get("/{course_slug}/modules/{module_id}", response_model=list[LessonResponse])
def get_module_lessons(course_slug: str, module_id: str):
    ensure_published_module_in_course(course_slug, module_id)
    return list_published_rows("lessons", LESSON_COLUMNS, module_id=module_id)


@router.get("/{course_slug}/modules/{module_id}/{lesson_slug}", response_model=LessonResponse)
def get_lesson(course_slug: str, module_id: str, lesson_slug: str):
    ensure_published_module_in_course(course_slug, module_id)
    return get_published_row(
        "lessons",
        LESSON_COLUMNS,
        filters={"module_id": module_id, "slug": lesson_slug},
        not_found_message=LESSON_NOT_FOUND,
    )
