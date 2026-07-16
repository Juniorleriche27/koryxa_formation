from typing import Any, Literal, Optional

from pydantic import BaseModel, Field


class ApiError(BaseModel):
    code: str
    message: str
    context: dict[str, Any] = Field(default_factory=dict)


class LessonResponse(BaseModel):
    id: str
    module_id: str
    slug: str
    title: str
    summary: str
    order_index: int
    lesson_type: Literal["lesson", "lab", "checkpoint", "project"]
    estimated_minutes: int
    objectives: list[str] = Field(default_factory=list)
    content_md: Optional[str] = None
    source_refs: list[str] = Field(default_factory=list)
    validation_prompt: Optional[str] = None
    is_published: bool


class ExerciseResponse(BaseModel):
    id: str
    course_id: str
    module_id: str
    lesson_id: Optional[str] = None
    slug: str
    title: str
    exercise_type: Literal["guided", "debug", "challenge"]
    brief_md: str
    starter_files: list[dict[str, Any]] = Field(default_factory=list)
    expected_result_md: str
    hints: list[str] = Field(default_factory=list)
    order_index: int
    estimated_minutes: int
    is_published: bool


class ProjectMilestoneResponse(BaseModel):
    id: str
    project_id: str
    module_id: str
    slug: str
    title: str
    description: str
    deliverables: list[str] = Field(default_factory=list)
    acceptance_criteria: list[str] = Field(default_factory=list)
    order_index: int
    is_published: bool


class CourseProjectResponse(BaseModel):
    id: str
    course_id: str
    slug: str
    title: str
    summary: str
    brief_md: str
    corpus_policy_md: str
    starter_assets: list[dict[str, Any]] = Field(default_factory=list)
    minimum_version: list[str] = Field(default_factory=list)
    advanced_version: list[str] = Field(default_factory=list)
    functional_criteria: list[str] = Field(default_factory=list)
    technical_criteria: list[str] = Field(default_factory=list)
    rubric: list[dict[str, Any]] = Field(default_factory=list)
    is_published: bool
    milestones: list[ProjectMilestoneResponse] = Field(default_factory=list)
