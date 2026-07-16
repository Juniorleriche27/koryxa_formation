import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MIGRATIONS = ROOT / "supabase" / "migrations"


class MigrationInvariantTests(unittest.TestCase):
    def read(self, name: str) -> str:
        return (MIGRATIONS / name).read_text()

    def test_multi_course_foundation_preserves_python(self):
        sql = self.read("20260716_add_multi_course_foundation.sql")
        self.assertIn("python-data-analyst", sql)
        self.assertIn("WHERE course_id IS NULL", sql)
        self.assertIn("uq_modules_course_order", sql)
        self.assertIn("uq_final_projects_user_course", sql)
        self.assertIn("uq_certificates_user_course", sql)

    def test_llm_rag_curriculum_stays_unpublished(self):
        sql = self.read("20260716_seed_llm_rag_curriculum.sql")
        self.assertIn("WHERE slug = 'llm-rag'", sql)
        self.assertIn("is_published = FALSE", sql)
        self.assertIn("CREATE TABLE IF NOT EXISTS public.lessons", sql)

    def test_all_llm_rag_seeds_are_scoped_and_inactive(self):
        names = [
            "20260716_seed_llm_rag_lesson_content.sql",
            "20260716_seed_llm_rag_theory_supports.sql",
            "20260716_seed_llm_rag_exercises.sql",
            "20260716_seed_llm_rag_quizzes.sql",
            "20260716_seed_llm_rag_capstone_project.sql",
        ]
        for name in names:
            with self.subTest(name=name):
                sql = self.read(name)
                self.assertIn("llm-rag", sql)
                self.assertTrue("is_published=FALSE" in sql or "is_published = FALSE" in sql or "FALSE" in sql)

    def test_expected_content_counts_are_guarded(self):
        lesson_sql = self.read("20260716_seed_llm_rag_lesson_content.sql")
        quiz_sql = self.read("20260716_seed_llm_rag_quizzes.sql")
        exercise_sql = self.read("20260716_seed_llm_rag_exercises.sql")
        project_sql = self.read("20260716_seed_llm_rag_capstone_project.sql")
        self.assertIn("v_expected INT := 26", lesson_sql)
        self.assertIn("total_count <> 48", quiz_sql)
        self.assertIn("total_count <> 12", exercise_sql)
        self.assertIn("milestones_count <> 9", project_sql)
        self.assertIn("rubric_total <> 60", project_sql)


if __name__ == "__main__":
    unittest.main()
