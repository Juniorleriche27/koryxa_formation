CREATE TABLE dim_customer(customer_key BIGSERIAL PRIMARY KEY,customer_id BIGINT NOT NULL,segment TEXT,valid_from TIMESTAMPTZ NOT NULL,valid_to TIMESTAMPTZ NOT NULL,is_current BOOLEAN NOT NULL);
CREATE TABLE fact_sales(sale_key BIGSERIAL PRIMARY KEY,date_key INT NOT NULL,customer_key BIGINT NOT NULL,product_key BIGINT NOT NULL,quantity INT NOT NULL,revenue NUMERIC(14,2) NOT NULL);
