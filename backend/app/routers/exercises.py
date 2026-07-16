from fastapi import APIRouter, Depends

from app.constants import EXERCISE_NOT_FOUND
from app.middleware.auth import get_current_user
from app.schemas.content import ExerciseResponse
from app.services.content import ensure_published_module_in_course, get_published_row, list_published_rows
from app.services.courses import get_course_id

router = APIRouter()

PUBLIC_COLUMNS = (
    "id,course_id,module_id,lesson_id,slug,title,exercise_type,brief_md,"
    "starter_files,expected_result_md,hints,order_index,estimated_minutes,is_published"
)
SOLUTION_COLUMNS = PUBLIC_COLUMNS + ",solution_md"


@router.get("/{course_slug}/modules/{module_id}", response_model=list[ExerciseResponse])
def get_module_exercises(course_slug: str, module_id: str):
    ensure_published_module_in_course(course_slug, module_id)
    return list_published_rows("exercises", PUBLIC_COLUMNS, module_id=module_id)


@router.get("/{course_slug}/modules/{module_id}/{exercise_slug}", response_model=ExerciseResponse)
def get_exercise(course_slug: str, module_id: str, exercise_slug: str):
    ensure_published_module_in_course(course_slug, module_id)
    return get_published_row(
        "exercises",
        PUBLIC_COLUMNS,
        filters={"module_id": module_id, "slug": exercise_slug},
        not_found_message=EXERCISE_NOT_FOUND,
    )


@router.get("/{course_slug}/modules/{module_id}/{exercise_slug}/solution")
def get_exercise_solution(course_slug: str, module_id: str, exercise_slug: str, _user=Depends(get_current_user)):
    ensure_published_module_in_course(course_slug, module_id)
    return get_published_row(
        "exercises",
        SOLUTION_COLUMNS,
        filters={
            "course_id": get_course_id(course_slug),
            "module_id": module_id,
            "slug": exercise_slug,
        },
        not_found_message="Solution introuvable ou non publiée.",
    )
