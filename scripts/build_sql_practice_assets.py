from pathlib import Path
import csv
from datetime import date, timedelta

OUT = Path(__file__).resolve().parents[1] / "frontend/public/resources/sql-data-analyst"
OUT.mkdir(parents=True, exist_ok=True)

regions = [
    ["R01", "Dakar", "Awa Ndiaye"],
    ["R02", "Thiès", "Moussa Fall"],
    ["R03", "Saint-Louis", "Fatou Diop"],
    ["R04", "Kaolack", "Idrissa Ba"],
]
products = [
    ["P001", "Laptop Pro 14", "Informatique", 525000, 385000],
    ["P002", "Écran 27 pouces", "Informatique", 185000, 132000],
    ["P003", "Imprimante Laser", "Bureautique", 210000, 158000],
    ["P004", "Chaise Ergo", "Mobilier", 145000, 92000],
    ["P005", "Bureau Compact", "Mobilier", 175000, 118000],
    ["P006", "Casque USB", "Accessoires", 35000, 21000],
]
clients = [[f"C{i:03d}", f"Client {i:03d}", ["PME", "Grand compte", "Particulier"][i % 3], regions[i % 4][0], f"client{i:03d}@example.com"] for i in range(1, 41)]
objectifs = [[f"2026-{m:02d}-01", 9000000 + m * 250000] for m in range(1, 13)]

for name, headers, rows in [
    ("regions.csv", ["code_region", "region", "responsable"], regions),
    ("produits.csv", ["code_produit", "produit", "categorie", "prix_unitaire", "cout_unitaire"], products),
    ("clients.csv", ["code_client", "client", "segment", "code_region", "email"], clients),
    ("objectifs.csv", ["mois", "objectif_ca"], objectifs),
]:
    with (OUT / name).open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(headers)
        w.writerows(rows)

with (OUT / "ventes.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["id_vente", "date_vente", "code_produit", "code_client", "quantite", "canal"])
    start = date(2026, 1, 1)
    for i in range(1, 121):
        p = products[(i * 2) % len(products)][0]
        c = clients[(i * 3) % len(clients)][0]
        d = start + timedelta(days=i - 1)
        w.writerow([f"V{i:04d}", d.isoformat(), p, c, 1 + (i % 5), ["Boutique", "En ligne", "Partenaire"][i % 3]])

schema = """-- Schéma pédagogique SQL Data Analyst avec PostgreSQL
CREATE SCHEMA IF NOT EXISTS formation_sql;
SET search_path TO formation_sql, public;

CREATE TABLE IF NOT EXISTS regions (
  code_region text PRIMARY KEY,
  region text NOT NULL,
  responsable text NOT NULL
);
CREATE TABLE IF NOT EXISTS produits (
  code_produit text PRIMARY KEY,
  produit text NOT NULL,
  categorie text NOT NULL,
  prix_unitaire numeric(12,2) NOT NULL CHECK (prix_unitaire >= 0),
  cout_unitaire numeric(12,2) NOT NULL CHECK (cout_unitaire >= 0)
);
CREATE TABLE IF NOT EXISTS clients (
  code_client text PRIMARY KEY,
  client text NOT NULL,
  segment text NOT NULL,
  code_region text REFERENCES regions(code_region),
  email text
);
CREATE TABLE IF NOT EXISTS ventes (
  id_vente text PRIMARY KEY,
  date_vente date NOT NULL,
  code_produit text NOT NULL REFERENCES produits(code_produit),
  code_client text NOT NULL REFERENCES clients(code_client),
  quantite integer NOT NULL CHECK (quantite > 0),
  canal text NOT NULL
);
CREATE TABLE IF NOT EXISTS objectifs (
  mois date PRIMARY KEY,
  objectif_ca numeric(14,2) NOT NULL CHECK (objectif_ca >= 0)
);
"""
(OUT / "01_schema_postgresql.sql").write_text(schema, encoding="utf-8")

load = """-- Chargement avec psql depuis le dossier des ressources
SET search_path TO formation_sql, public;
\copy regions FROM 'regions.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy produits FROM 'produits.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy clients FROM 'clients.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy ventes FROM 'ventes.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
\copy objectifs FROM 'objectifs.csv' WITH (FORMAT csv, HEADER true, DELIMITER ';', ENCODING 'UTF8');
"""
(OUT / "02_chargement_donnees.sql").write_text(load, encoding="utf-8")

queries = """-- Requêtes de départ
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
"""
(OUT / "03_requetes_depart.sql").write_text(queries, encoding="utf-8")

solutions = """-- Corrigés de référence — à consulter après tentative
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
"""
(OUT / "04_solutions_reference.sql").write_text(solutions, encoding="utf-8")

readme = """# Kit pratique SQL Data Analyst

Ordre recommandé :
1. Exécuter `01_schema_postgresql.sql`.
2. Charger les cinq CSV avec `02_chargement_donnees.sql` depuis psql.
3. Explorer `03_requetes_depart.sql`.
4. Réaliser les exercices avant d’ouvrir `04_solutions_reference.sql`.

Le dataset contient 4 régions, 6 produits, 40 clients, 120 ventes et 12 objectifs mensuels.
"""
(OUT / "README.md").write_text(readme, encoding="utf-8")
print(f"Created {len(list(OUT.iterdir()))} assets in {OUT}")
