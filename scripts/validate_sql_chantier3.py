from pathlib import Path
import csv
import re

root = Path('frontend/public/resources/sql-data-analyst')
assert len(list(root.iterdir())) == 10
assert len(list(root.glob('*.csv'))) == 5
assert len(list(root.glob('*.sql'))) == 4
with (root / 'ventes.csv').open(encoding='utf-8-sig') as handle:
    assert sum(1 for _ in csv.reader(handle, delimiter=';')) == 121
sql = Path('supabase/migrations/20260801_seed_sql_data_analyst_exercises_resources.sql').read_text()
exercise_block = sql.split('INSERT INTO public.exercises', 1)[0]
resource_block = sql.split('resources(module_order', 1)[1].split('INSERT INTO public.theory_resources', 1)[0]
assert len(re.findall(r"^    \(\d+,'", exercise_block, re.M)) == 12
assert len(re.findall(r"^    \(\d+,'", resource_block, re.M)) == 12
assert resource_block.count('https://www.postgresql.org/docs/current/') == 12
assert 'exercise_count<>12' in sql and 'resource_count<>12' in sql
print('VALIDATION_OK assets=10 csv=5 sql=4 ventes=120 exercises=12 resources=12')
