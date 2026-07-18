from pathlib import Path
from zipfile import ZipFile
import re

root = Path("frontend/public/resources/power-bi-data-analyst")
assert len(list(root.glob("*"))) == 8
assert len(list(root.glob("*.xlsx"))) == 4
assert len(list(root.glob("*.csv"))) == 4
for path in root.glob("*.xlsx"):
    with ZipFile(path) as archive:
        assert archive.testzip() is None

sql = Path("supabase/migrations/20260726_seed_power_bi_data_analyst_exercises_resources.sql").read_text()
exercise_block = sql.split("INSERT INTO public.exercises", 1)[0]
resource_block = sql.split("resources(module_order", 1)[1].split("INSERT INTO public.theory_resources", 1)[0]
assert len(re.findall(r"^    \(\d+,'", exercise_block, re.M)) == 12
assert len(re.findall(r"^    \(\d+,'", resource_block, re.M)) == 12
assert resource_block.count("https://learn.microsoft.com") == 12
print("VALIDATION_OK exercises=12 resources=12 files=8 xlsx=4 csv=4")
