from pathlib import Path
import pandas as pd

df=pd.read_csv(Path(__file__).parents[1]/"sales.csv",parse_dates=["sold_at"])
required={"sale_id","customer_id","product_id","amount","sold_at"}
assert required.issubset(df.columns)
assert df["sale_id"].is_unique
df.to_parquet("sales.parquet",index=False)
