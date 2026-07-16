from fastapi import APIRouter

from app.constants import THEORY_RESOURCE_NOT_FOUND
from app.services.content import get_published_row, list_published_rows
from app.services.courses import get_course_id

router = APIRouter()

GLOSSARY_COLUMNS = "id,term,definition,example,order_index"
DIAGRAM_COLUMNS = "id,slug,title,description,diagram_type,nodes,edges,order_index,module_id"
RESOURCE_COLUMNS = "id,slug,title,summary,content_md,resource_type,order_index,module_id"


@router.get("/{course_slug}")
def get_theory_library(course_slug: str):
    course_id = get_course_id(course_slug)
    return {
        "glossary": list_published_rows("course_glossary", GLOSSARY_COLUMNS, course_id=course_id),
        "diagrams": list_published_rows("theory_diagrams", DIAGRAM_COLUMNS, course_id=course_id),
        "resources": list_published_rows("theory_resources", RESOURCE_COLUMNS, course_id=course_id),
    }


@router.get("/{course_slug}/resources/{resource_slug}")
def get_theory_resource(course_slug: str, resource_slug: str):
    return get_published_row(
        "theory_resources",
        RESOURCE_COLUMNS,
        filters={"course_id": get_course_id(course_slug), "slug": resource_slug},
        not_found_message=THEORY_RESOURCE_NOT_FOUND,
    )
