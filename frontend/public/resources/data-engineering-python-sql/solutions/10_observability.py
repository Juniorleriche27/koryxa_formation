import json,logging
def log_run(batch_id,rows,duration):
    logging.info(json.dumps({"event":"batch_completed","batch_id":batch_id,"rows_loaded":rows,"duration_seconds":duration}))
