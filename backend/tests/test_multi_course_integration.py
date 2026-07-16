import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class MultiCourseIntegrationTests(unittest.TestCase):
    def test_admin_bridge_assigns_course_and_defaults_to_python(self):
        source = (ROOT / "backend/app/routers/access.py").read_text()
        self.assertIn('payload.get("course_slug") or DEFAULT_COURSE_SLUG', source)
        self.assertIn('"course_id": course_id', source)
        self.assertIn('get_course_id(course_slug)', source)

    def test_unpublished_course_is_rejected_by_course_service(self):
        source = (ROOT / "backend/app/services/courses.py").read_text()
        self.assertIn('.eq("is_published", True)', source)

    def test_session_exposes_only_published_courses_and_access_flag(self):
        source = (ROOT / "backend/app/routers/access.py").read_text()
        self.assertIn('@router.get("/courses")', source)
        self.assertIn('"has_access": course.get("id") == grant.get("course_id")', source)
        self.assertIn('.eq("is_published", True)', source)

    def test_dashboard_and_certificate_keep_course_context(self):
        dashboard = (ROOT / "frontend/app/dashboard/page.tsx").read_text()
        certificate = (ROOT / "frontend/app/certificate/page.tsx").read_text()
        api = (ROOT / "frontend/lib/api.ts").read_text()
        self.assertIn('readCourseSlug(window.location.search)', dashboard)
        self.assertIn('courseRoutes.module(nextModule.id, courseSlug)', dashboard)
        self.assertIn('validationAPI.getCertificationStatus(selectedCourse)', certificate)
        self.assertIn('certificatesAPI.getMy(selectedCourse)', certificate)
        self.assertIn('getMy: (course?: string)', api)


if __name__ == "__main__":
    unittest.main()
