import os
import sys
import types
import unittest
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "backend"))

fake_database = types.ModuleType("app.database")
fake_database.get_service_supabase = lambda: None
fake_database.supabase = None
sys.modules.setdefault("app.database", fake_database)

from fastapi import HTTPException
from app.constants import MODULE_SCOPE_ERROR
from app.services import content, courses


class Result:
    def __init__(self, data):
        self.data = data


class FakeQuery:
    def __init__(self, data):
        self.data = data
        self.filters = []
        self.order_field = None
        self.single = False

    def select(self, _columns):
        return self

    def eq(self, key, value):
        self.filters.append((key, value))
        return self

    def order(self, field):
        self.order_field = field
        return self

    def limit(self, _value):
        return self

    def maybe_single(self):
        self.single = True
        return self

    def execute(self):
        return Result(self.data)


class FakeDB:
    def __init__(self, table_data):
        self.table_data = table_data
        self.queries = []

    def table(self, name):
        query = FakeQuery(self.table_data.get(name))
        self.queries.append((name, query))
        return query


class CourseServiceTests(unittest.TestCase):
    def test_default_slug_is_python_and_published(self):
        db = FakeDB({"courses": [{"id": "python-id", "slug": "python-data-analyst"}]})
        with patch.object(courses, "get_service_supabase", return_value=db):
            course = courses.get_course_by_slug()
        self.assertEqual(course["id"], "python-id")
        _, query = db.queries[0]
        self.assertIn(("slug", "python-data-analyst"), query.filters)
        self.assertIn(("is_published", True), query.filters)

    def test_unpublished_course_is_not_returned(self):
        db = FakeDB({"courses": None})
        with patch.object(courses, "get_service_supabase", return_value=db):
            with self.assertRaises(HTTPException) as raised:
                courses.get_course_by_slug("llm-rag")
        self.assertEqual(raised.exception.status_code, 404)


class ContentServiceTests(unittest.TestCase):
    def test_module_scope_requires_course_and_publication(self):
        db = FakeDB({"modules": {"id": "m1", "course_id": "c1", "is_published": True}})
        with patch.object(content, "service_db", return_value=db), patch.object(content, "get_course_id", return_value="c1"):
            module = content.ensure_published_module_in_course("python-data-analyst", "m1")
        self.assertEqual(module["id"], "m1")
        _, query = db.queries[0]
        self.assertIn(("id", "m1"), query.filters)
        self.assertIn(("course_id", "c1"), query.filters)
        self.assertIn(("is_published", True), query.filters)

    def test_wrong_course_is_hidden_as_not_found(self):
        db = FakeDB({"modules": None})
        with patch.object(content, "service_db", return_value=db), patch.object(content, "get_course_id", return_value="other"):
            with self.assertRaises(HTTPException) as raised:
                content.ensure_published_module_in_course("llm-rag", "python-module")
        self.assertEqual(raised.exception.status_code, 404)
        self.assertEqual(raised.exception.detail, MODULE_SCOPE_ERROR)

    def test_list_rows_always_filters_published(self):
        db = FakeDB({"lessons": [{"id": "l1"}]})
        with patch.object(content, "service_db", return_value=db):
            rows = content.list_published_rows("lessons", "id", module_id="m1")
        self.assertEqual(rows, [{"id": "l1"}])
        _, query = db.queries[0]
        self.assertIn(("is_published", True), query.filters)
        self.assertIn(("module_id", "m1"), query.filters)
        self.assertEqual(query.order_field, "order_index")

    def test_get_row_returns_structured_404(self):
        db = FakeDB({"exercises": None})
        with patch.object(content, "service_db", return_value=db):
            with self.assertRaises(HTTPException) as raised:
                content.get_published_row(
                    "exercises",
                    "id",
                    filters={"slug": "missing"},
                    not_found_message="Exercice introuvable.",
                )
        self.assertEqual(raised.exception.status_code, 404)
        self.assertEqual(raised.exception.detail, "Exercice introuvable.")


if __name__ == "__main__":
    unittest.main()
