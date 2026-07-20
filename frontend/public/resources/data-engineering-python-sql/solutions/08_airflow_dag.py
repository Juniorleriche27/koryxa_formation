from airflow.decorators import dag, task
from pendulum import datetime
@dag(schedule="0 5 * * *",start_date=datetime(2026,1,1,tz="UTC"),catchup=False)
def sales_pipeline():
    @task(retries=3)
    def ingest(): return "batch_id"
    @task
    def transform(batch_id): return batch_id
    @task
    def quality(batch_id): return True
    quality(transform(ingest()))
sales_pipeline()
