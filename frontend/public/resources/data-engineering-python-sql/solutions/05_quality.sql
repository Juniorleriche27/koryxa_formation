SELECT sale_id,COUNT(*) FROM sales GROUP BY sale_id HAVING COUNT(*)>1;
SELECT COUNT(*) FROM sales WHERE customer_id IS NULL OR amount<0;
SELECT NOW()-MAX(sold_at) AS freshness FROM sales;
