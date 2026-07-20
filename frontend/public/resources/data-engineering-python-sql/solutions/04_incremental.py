def next_window(last_success, overlap):
    return last_success-overlap

def deduplicate(rows):
    return {row["sale_id"]: row for row in sorted(rows,key=lambda r:r["sold_at"])}.values()
