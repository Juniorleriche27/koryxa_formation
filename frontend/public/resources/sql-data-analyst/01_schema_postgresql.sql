-- Schéma pédagogique SQL Data Analyst avec PostgreSQL
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
