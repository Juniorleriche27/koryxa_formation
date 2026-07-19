import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MIGRATION = ROOT / "supabase/migrations/20260811_recalibrate_statistics_data_science_duration.sql"


class StatisticsDurationRecalibrationTests(unittest.TestCase):
    def test_statistics_course_duration_matches_existing_content(self):
        migration = MIGRATION.read_text(encoding="utf-8")

        self.assertIn("STATISTIQUES & DATA SCIENCE AVEC PYTHON — RECALIBRAGE DURÉE", migration)
        self.assertIn("SET estimated_hours = 62", migration)
        self.assertIn("module_hours <> 42", migration)
        self.assertIn("lesson_count <> 24", migration)
        self.assertIn("lesson_minutes <> 1680", migration)
        self.assertIn("project_count <> 1", migration)
        self.assertIn("milestone_count <> 7", migration)
        self.assertIn("course_hours <> 62", migration)
        self.assertIn("project_description NOT LIKE '%20 heures%'", migration)

    def test_all_twelve_module_workloads_are_declared(self):
        migration = MIGRATION.read_text(encoding="utf-8")

        for order_index in range(12):
            self.assertIn(f"({order_index},", migration)

        self.assertIn("(9,  '4h30', 4.5)", migration)
        self.assertIn("(11, '4h00', 4.0)", migration)


if __name__ == "__main__":
    unittest.main()
