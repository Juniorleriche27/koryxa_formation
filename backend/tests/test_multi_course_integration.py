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

    def test_llm_rag_final_release_is_course_scoped(self):
        validation = (ROOT / "backend/app/routers/validation.py").read_text()
        certificates = (ROOT / "backend/app/routers/certificates.py").read_text()
        progress = (ROOT / "backend/app/routers/progress.py").read_text()
        certificate_page = (ROOT / "frontend/app/certificate/page.tsx").read_text()
        learning_content = (ROOT / "frontend/components/modules/LlmRagLearningContent.tsx").read_text()
        release = (ROOT / "supabase/migrations/20260717_finalize_llm_rag_release.sql").read_text()

        self.assertIn("required_modules = [item for item in modules if bool(item.get(\"requires_quiz\", True))]", validation)
        self.assertIn("get_access_record_for_user(user, course_id)", validation)
        self.assertIn("published_only=False", certificates)
        self.assertIn("published_only=False", progress)
        self.assertIn("Certification {courseMeta.title}", certificate_page)
        self.assertIn("submitFinalProject", learning_content)
        self.assertIn("SET is_published = true", release)
        self.assertIn("WHERE slug = 'llm-rag'", release)

    def test_excel_data_analyst_foundation_is_unpublished_and_complete(self):
        migration = (ROOT / "supabase/migrations/20260719_seed_excel_data_analyst_foundation.sql").read_text()
        course_config = (ROOT / "frontend/lib/courseConfig.ts").read_text()
        constants = (ROOT / "backend/app/constants.py").read_text()

        self.assertIn("EXCEL_DATA_ANALYST_COURSE_SLUG", course_config)
        self.assertIn('EXCEL_DATA_ANALYST_COURSE_SLUG = "excel-data-analyst"', constants)
        self.assertIn("'excel-data-analyst'", migration)
        self.assertIn("'Excel Data Analyst'", migration)
        self.assertIn("is_published = FALSE", migration)
        self.assertEqual(migration.count("TRUE)"), 12)
        self.assertIn("'Power Query'", migration)
        self.assertIn("'Modèle de données et Power Pivot'", migration)
        self.assertIn("'Dashboard professionnel'", migration)

    def test_excel_data_analyst_lesson_content_is_complete_and_unpublished(self):
        migration = (ROOT / "supabase/migrations/20260719_seed_excel_data_analyst_lesson_content.sql").read_text()

        self.assertIn("excel-data-analyst", migration)
        self.assertIn("24 leçons", migration)
        self.assertEqual(migration.count("$lesson$# "), 24)
        self.assertIn("Construire un tableau croisé dynamique", migration)
        self.assertIn("Importer et transformer avec Power Query", migration)
        self.assertIn("Créer des mesures simples avec DAX", migration)
        self.assertIn("Assembler un dashboard interactif", migration)
        self.assertIn("is_published = FALSE", migration)

    def test_excel_data_analyst_exercises_resources_and_files_are_complete(self):
        migration = (ROOT / "supabase/migrations/20260720_seed_excel_data_analyst_exercises_resources.sql").read_text()
        resources = ROOT / "frontend/public/resources/excel-data-analyst"

        self.assertIn("EXCEL DATA ANALYST — CHANTIER 3", migration)
        self.assertGreaterEqual(migration.count("is_published = FALSE"), 2)
        self.assertIn("consolider-fichiers-power-query", migration)
        self.assertIn("assembler-dashboard-commercial", migration)
        self.assertIn("microsoft-recherchex", migration)
        self.assertIn("microsoft-power-query", migration)
        self.assertIn("microsoft-power-pivot", migration)
        self.assertEqual(len(list(resources.glob("*.xlsx"))), 4)
        self.assertEqual(len(list(resources.glob("*.csv"))), 4)
        self.assertTrue((resources / "01_fondamentaux_formules.xlsx").stat().st_size > 3000)
        self.assertTrue((resources / "04_power_query_modele_dashboard.xlsx").stat().st_size > 3000)

    def test_excel_data_analyst_quizzes_final_test_and_project_are_complete(self):
        migration = (ROOT / "supabase/migrations/20260721_seed_excel_data_analyst_quizzes_project.sql").read_text()

        self.assertIn("EXCEL DATA ANALYST — CHANTIER 4", migration)
        self.assertIn("quiz_count<>48", migration)
        self.assertIn("final_count<>12", migration)
        self.assertIn("milestone_count<>7", migration)
        self.assertIn("rubric_total<>60", migration)
        self.assertIn("dashboard-analyse-commerciale", migration)
        self.assertIn("pipeline-power-query", migration)
        self.assertIn("recette-remise", migration)
        self.assertIn("is_published=FALSE", migration)

    def test_excel_data_analyst_landing_and_learning_navigation_exist(self):
        landing = (ROOT / "frontend/app/formations/excel-data-analyst/page.tsx").read_text()
        catalog = (ROOT / "frontend/app/formations/page.tsx").read_text()
        module_page = (ROOT / "frontend/app/modules/[id]/page.tsx").read_text()
        navigation = (ROOT / "supabase/migrations/20260722_enable_excel_data_analyst_learning_navigation.sql").read_text()

        self.assertIn("Excel Data Analyst", landing)
        self.assertIn("39 000 FCFA", landing)
        self.assertIn("Power Query", landing)
        self.assertIn("Dashboard commercial actualisable", landing)
        self.assertIn('/formations/excel-data-analyst', catalog)
        self.assertIn("ExcelLearningContent", module_page)
        self.assertIn("UPDATE public.modules", navigation)
        self.assertIn("SET is_published = FALSE", navigation)

    def test_excel_data_analyst_final_release_is_complete(self):
        migration = (ROOT / "supabase/migrations/20260723_finalize_excel_data_analyst_release.sql").read_text()
        certificate = (ROOT / "frontend/app/certificate/page.tsx").read_text()
        config = (ROOT / "frontend/lib/courseConfig.ts").read_text()
        catalog = (ROOT / "frontend/app/formations/page.tsx").read_text()

        self.assertIn("Publication Excel incomplète", migration)
        self.assertIn("module_count<>12", migration)
        self.assertIn("lesson_count<>24", migration)
        self.assertIn("exercise_count<>12", migration)
        self.assertIn("quiz_count<>60", migration)
        self.assertIn("total_points<>40", migration)
        self.assertIn("Analyse de données avec Excel", certificate)
        self.assertIn('"excel-data-analyst"', config)
        self.assertIn("published: true", config)
        self.assertIn("Parcours disponible", catalog)

    def test_power_bi_data_analyst_foundation_is_unpublished_and_complete(self):
        migration = (ROOT / "supabase/migrations/20260724_seed_power_bi_data_analyst_foundation.sql").read_text()
        course_config = (ROOT / "frontend/lib/courseConfig.ts").read_text()
        constants = (ROOT / "backend/app/constants.py").read_text()

        self.assertIn("POWER_BI_DATA_ANALYST_COURSE_SLUG", course_config)
        self.assertIn('POWER_BI_DATA_ANALYST_COURSE_SLUG = "power-bi-data-analyst"', constants)
        self.assertIn("'power-bi-data-analyst'", migration)
        self.assertIn("'Power BI Data Analyst'", migration)
        self.assertIn("is_published = FALSE", migration)
        self.assertEqual(migration.count("TRUE)"), 12)
        self.assertIn("'Préparer les données avec Power Query'", migration)
        self.assertIn("'Introduction à DAX'", migration)
        self.assertIn("'Power BI Service et collaboration'", migration)
        self.assertIn("'Sécurité, performance et qualité'", migration)

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
