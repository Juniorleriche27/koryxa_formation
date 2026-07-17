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

    def test_llm_rag_entry_flow_keeps_course_context(self):
        landing = (ROOT / "frontend/app/formations/llm-rag/page.tsx").read_text()
        access = (ROOT / "frontend/app/access/page.tsx").read_text()
        access_api = (ROOT / "frontend/app/api/access/route.ts").read_text()
        middleware = (ROOT / "frontend/middleware.ts").read_text()
        config = (ROOT / "frontend/lib/courseConfig.ts").read_text()

        self.assertIn("courseRoutes.access(LLM_RAG_COURSE_SLUG)", landing)
        self.assertIn('searchParams.get("course")', access)
        self.assertIn("courseRoutes.dashboard(courseSlug)", access)
        self.assertIn("course: courseSlug", access)
        self.assertIn("grantMatchesCourse(requestedGrant, courseSlug)", access_api)
        self.assertIn("sessionPayload.course", middleware)
        self.assertIn("access: (slug: string", config)
        self.assertIn("dashboard: (slug: string", config)

    def test_llm_rag_learning_space_keeps_navigation_scoped(self):
        dashboard = (ROOT / "frontend/app/dashboard/page.tsx").read_text()
        modules_page = (ROOT / "frontend/app/modules/page.tsx").read_text()
        module_page = (ROOT / "frontend/app/modules/[id]/page.tsx").read_text()
        module_card = (ROOT / "frontend/components/modules/ModuleCard.tsx").read_text()
        modules_router = (ROOT / "backend/app/routers/modules.py").read_text()
        migration = (ROOT / "supabase/migrations/20260717_enable_llm_rag_learning_navigation.sql").read_text()

        self.assertIn("LearnerCourseContext", dashboard)
        self.assertIn("courseSlug={courseSlug}", dashboard)
        self.assertIn("courseRoutes.module(module.id, courseSlug)", module_card)
        self.assertIn("dedicatedLearnerLayout", modules_page)
        self.assertIn("getOne(id, requestedCourse)", module_page)
        self.assertIn("Module précédent", module_page)
        self.assertIn("Passer au module suivant", module_page)
        self.assertIn('get_course_id(selected_course, published_only=False)', modules_router)
        self.assertIn("SET is_published = true", migration)
        self.assertIn("slug = 'llm-rag'", migration)
        self.assertNotIn("UPDATE public.courses", migration)

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
