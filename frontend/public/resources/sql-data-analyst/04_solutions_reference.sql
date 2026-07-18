-- Corrigés de référence — à consulter après tentative
SET search_path TO formation_sql, public;

-- Module 1
SELECT code_client, client, segment FROM clients WHERE segment IN ('PME','Grand compte') ORDER BY client;
-- Module 3
SELECT region, SUM(chiffre_affaires) AS ca FROM ventes_enrichies GROUP BY region ORDER BY ca DESC;
-- Module 7
WITH mensuel AS (
  SELECT date_trunc('month', date_vente)::date AS mois, SUM(chiffre_affaires) AS ca
  FROM ventes_enrichies GROUP BY 1
)
SELECT mois, ca,
       SUM(ca) OVER (ORDER BY mois) AS cumul_ca,
       LAG(ca) OVER (ORDER BY mois) AS ca_precedent
FROM mensuel ORDER BY mois;
-- Module 8
CREATE MATERIALIZED VIEW IF NOT EXISTS synthese_mensuelle AS
SELECT date_trunc('month', date_vente)::date AS mois, region, SUM(chiffre_affaires) AS ca
FROM ventes_enrichies GROUP BY 1,2;
