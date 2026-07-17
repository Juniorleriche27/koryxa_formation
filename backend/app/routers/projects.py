from fastapi import APIRouter

from app.constants import PROJECT_NOT_FOUND
from app.schemas.content import CourseProjectResponse
from app.services.content import get_published_row, list_published_rows
from app.services.courses import get_course_id

router = APIRouter()

PUBLIC_PROJECT_COLUMNS = (
    "id,course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,"
    "minimum_version,advanced_version,functional_criteria,technical_criteria,rubric,is_published"
)
MILESTONE_COLUMNS = (
    "id,project_id,module_id,slug,title,description,deliverables,"
    "acceptance_criteria,order_index,is_published"
)


def _attach_milestones(project: dict) -> dict:
    milestones = list_published_rows(
        "course_project_milestones",
        MILESTONE_COLUMNS,
        project_id=project["id"],
    )
    return {**project, "milestones": milestones}


@router.get("/{course_slug}", response_model=list[CourseProjectResponse])
def get_course_projects(course_slug: str):
    course_id = get_course_id(course_slug, published_only=False)
    projects = list_published_rows(
        "course_projects",
        PUBLIC_PROJECT_COLUMNS,
        course_id=course_id,
        order_by="created_at",
    )
    return [_attach_milestones(project) for project in projects]


@router.get("/{course_slug}/{project_slug}", response_model=CourseProjectResponse)
def get_course_project(course_slug: str, project_slug: str):
    course_id = get_course_id(course_slug, published_only=False)
    project = get_published_row(
        "course_projects",
        PUBLIC_PROJECT_COLUMNS,
        filters={"course_id": course_id, "slug": project_slug},
        not_found_message=PROJECT_NOT_FOUND,
    )
    return _attach_milestones(project)
