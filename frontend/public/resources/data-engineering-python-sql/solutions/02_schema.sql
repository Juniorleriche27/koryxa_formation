CREATE TABLE customers(customer_id BIGINT PRIMARY KEY,email TEXT NOT NULL UNIQUE,segment TEXT NOT NULL);
CREATE TABLE products(product_id BIGINT PRIMARY KEY,product_name TEXT NOT NULL,category TEXT NOT NULL,unit_price NUMERIC(12,2) NOT NULL CHECK(unit_price>=0));
CREATE TABLE sales(sale_id BIGINT PRIMARY KEY,customer_id BIGINT NOT NULL REFERENCES customers,product_id BIGINT NOT NULL REFERENCES products,quantity INT NOT NULL CHECK(quantity>0),amount NUMERIC(14,2) NOT NULL CHECK(amount>=0),sold_at TIMESTAMPTZ NOT NULL,batch_id TEXT NOT NULL);
