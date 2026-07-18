-- Requêtes de départ
SET search_path TO formation_sql, public;

-- Exploration
SELECT * FROM clients ORDER BY code_client LIMIT 10;

-- Vue enrichie
CREATE OR REPLACE VIEW ventes_enrichies AS
SELECT
  v.id_vente,
  v.date_vente,
  c.code_client,
  c.client,
  c.segment,
  r.region,
  p.code_produit,
  p.produit,
  p.categorie,
  v.quantite,
  p.prix_unitaire,
  p.cout_unitaire,
  v.quantite * p.prix_unitaire AS chiffre_affaires,
  v.quantite * (p.prix_unitaire - p.cout_unitaire) AS marge,
  v.canal
FROM ventes v
JOIN clients c USING (code_client)
JOIN regions r USING (code_region)
JOIN produits p USING (code_produit);

-- KPI mensuels
SELECT date_trunc('month', date_vente)::date AS mois,
       SUM(chiffre_affaires) AS ca,
       SUM(marge) AS marge,
       COUNT(DISTINCT code_client) AS clients_actifs
FROM ventes_enrichies
GROUP BY 1
ORDER BY 1;
