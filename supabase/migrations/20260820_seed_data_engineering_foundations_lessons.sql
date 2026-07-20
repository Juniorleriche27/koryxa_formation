-- KORYXA FORMATION — DATA ENGINEERING AVEC PYTHON ET SQL — CHANTIER 2
-- Modules 0 à 5 : 12 leçons détaillées. Migration idempotente, non publiée.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
VALUES
(0,0,'role-architecture-data-engineer','Le rôle du Data Engineer et les architectures modernes','Comprendre les responsabilités du Data Engineer et situer chaque composant d’une plateforme de données.','lesson',90,
'["Identifier les responsabilités du Data Engineer", "Distinguer stockage, calcul et orchestration", "Lire une architecture data de bout en bout"]'::jsonb,$lesson$# Le rôle du Data Engineer et les architectures modernes

## Objectifs

- Comprendre le rôle du Data Engineer dans une équipe data.
- Identifier les couches ingestion, stockage, transformation, exposition et supervision.
- Relier chaque composant technique à un besoin métier.

## Théorie

Le Data Engineer construit les systèmes qui rendent les données disponibles, fiables et exploitables. Une architecture moderne sépare généralement les sources, la zone d’ingestion, le stockage brut, les transformations, les modèles analytiques et les outils de consommation. Cette séparation facilite la reprise, la gouvernance et l’évolution du système.

## Exemple Python

```python
pipeline = {
    "sources": ["api_ventes", "fichiers_csv"],
    "ingestion": "python",
    "storage": "postgresql",
    "transformation": "dbt",
    "orchestration": "airflow",
    "consumption": "dashboard_bi",
}
for layer, tool in pipeline.items():
    print(f"{layer}: {tool}")
```

## Exemple SQL

```sql
CREATE SCHEMA IF NOT EXISTS raw;
CREATE SCHEMA IF NOT EXISTS staging;
CREATE SCHEMA IF NOT EXISTS analytics;
```

## Erreurs fréquentes

- Choisir des outils avant de définir les besoins.
- Mélanger données brutes et données transformées.
- Oublier la supervision et les procédures de reprise.

## Bonnes pratiques

1. Partir des consommateurs et des SLA attendus.
2. Séparer clairement les couches de données.
3. Documenter les dépendances et propriétaires.
4. Prévoir l’idempotence et la reprise dès la conception.

## Question de validation

Pourquoi séparer les couches raw, staging et analytics ?$lesson$,
'Pourquoi séparer les couches raw, staging et analytics ?'),

(0,1,'batch-streaming-etl-elt','Batch, streaming, ETL et ELT','Comparer les grands modes de traitement et choisir une stratégie proportionnée au besoin.','lesson',90,
'["Distinguer batch et streaming", "Comparer ETL et ELT", "Choisir une architecture selon fréquence, volume et latence"]'::jsonb,$lesson$# Batch, streaming, ETL et ELT

## Objectifs

- Comprendre les différences entre traitement batch et traitement continu.
- Comparer ETL et ELT.
- Choisir une architecture adaptée au niveau de fraîcheur attendu.

## Théorie

Le batch traite des ensembles de données à intervalles planifiés. Le streaming traite des événements au fil de leur arrivée. ETL transforme avant le chargement, tandis qu’ELT charge les données brutes puis transforme dans le système cible. Le meilleur choix dépend du volume, de la latence, du coût et de la capacité d’exploitation.

## Exemple Python

```python
from pathlib import Path

for file in Path("incoming").glob("sales_*.csv"):
    print("Batch à traiter:", file.name)
```

## Exemple SQL

```sql
INSERT INTO staging.sales
SELECT *
FROM raw.sales
WHERE ingested_at > COALESCE(
  (SELECT MAX(processed_at) FROM control.pipeline_runs),
  TIMESTAMP '1970-01-01'
);
```

## Erreurs fréquentes

- Utiliser du streaming pour un besoin quotidien simple.
- Confondre faible latence et temps réel strict.
- Transformer sans conserver une copie brute.

## Bonnes pratiques

- Définir la fraîcheur réellement nécessaire.
- Mesurer le coût opérationnel de chaque option.
- Conserver les données brutes pour rejouer les traitements.
- Formaliser les SLA et les fenêtres de traitement.

## Question de validation

Dans quel cas un pipeline batch quotidien est-il préférable à une architecture streaming ?$lesson$,
'Dans quel cas un pipeline batch quotidien est-il préférable à une architecture streaming ?'),

(1,0,'lire-ecrire-csv-json-parquet','Lire et écrire CSV, JSON et Parquet avec Python','Construire une ingestion robuste pour plusieurs formats de données.','lesson',100,
'["Lire et valider plusieurs formats", "Choisir les types explicitement", "Écrire des fichiers Parquet reproductibles"]'::jsonb,$lesson$# Lire et écrire CSV, JSON et Parquet avec Python

## Objectifs

- Charger des fichiers CSV et JSON de manière contrôlée.
- Comprendre les avantages de Parquet.
- Valider types, colonnes et volumes avant chargement.

## Théorie

CSV est simple mais ne porte pas les types. JSON est flexible mais peut être verbeux. Parquet est colonnaire, compressé et adapté aux traitements analytiques. Une ingestion professionnelle ne se contente pas de lire un fichier : elle vérifie son schéma, son encodage, ses doublons et sa volumétrie.

## Exemple Python

```python
import pandas as pd

sales = pd.read_csv(
    "sales.csv",
    dtype={"sale_id": "Int64", "customer_id": "Int64"},
    parse_dates=["sold_at"],
)
required = {"sale_id", "customer_id", "amount", "sold_at"}
missing = required.difference(sales.columns)
if missing:
    raise ValueError(f"Colonnes manquantes: {sorted(missing)}")
sales.to_parquet("sales.parquet", index=False)
```

## Exemple SQL

```sql
CREATE TABLE raw.sales_import (
  sale_id BIGINT,
  customer_id BIGINT,
  amount NUMERIC(12,2),
  sold_at TIMESTAMPTZ,
  source_file TEXT NOT NULL
);
```

## Erreurs fréquentes

- Laisser pandas deviner tous les types.
- Ignorer l’encodage et le séparateur.
- Écraser un fichier sans conserver sa provenance.

## Bonnes pratiques

- Définir un schéma attendu.
- Ajouter le nom du fichier et la date d’ingestion.
- Vérifier nombre de lignes et unicité des clés.
- Préférer Parquet pour les volumes analytiques.

## Question de validation

Pourquoi Parquet est-il souvent préférable à CSV pour des traitements analytiques répétés ?$lesson$,
'Pourquoi Parquet est-il souvent préférable à CSV pour des traitements analytiques répétés ?'),

(1,1,'consommer-api-pagination-reprise','Consommer une API avec pagination et reprise','Construire un extracteur API fiable, observable et idempotent.','lesson',100,
'["Gérer pagination et erreurs HTTP", "Implémenter retries et temporisation", "Conserver un état de reprise"]'::jsonb,$lesson$# Consommer une API avec pagination et reprise

## Objectifs

- Consommer une API paginée.
- Gérer les erreurs temporaires.
- Reprendre une ingestion sans dupliquer les données.

## Théorie

Une API peut limiter le nombre de résultats, imposer un quota ou échouer temporairement. L’extracteur doit distinguer les erreurs permanentes des erreurs réessayables, conserver le curseur ou la page courante et enregistrer les données de manière idempotente.

## Exemple Python

```python
import time
import requests

url = "https://api.example.com/sales"
page = 1
rows = []
while True:
    response = requests.get(url, params={"page": page, "limit": 100}, timeout=20)
    response.raise_for_status()
    payload = response.json()
    rows.extend(payload["items"])
    if not payload.get("next_page"):
        break
    page = payload["next_page"]
    time.sleep(0.2)
```

## Exemple SQL

```sql
INSERT INTO raw.api_sales (sale_id, payload, ingested_at)
VALUES (:sale_id, :payload::jsonb, NOW())
ON CONFLICT (sale_id) DO UPDATE
SET payload = EXCLUDED.payload,
    ingested_at = EXCLUDED.ingested_at;
```

## Erreurs fréquentes

- Oublier le timeout HTTP.
- Relancer sans identifiant idempotent.
- Ignorer les quotas et codes 429.

## Bonnes pratiques

- Journaliser page, durée et nombre de lignes.
- Utiliser retries avec backoff.
- Stocker les réponses brutes avant transformation.
- Conserver le dernier curseur validé.

## Question de validation

Quel mécanisme évite les doublons lorsqu’une ingestion API est relancée ?$lesson$,
'Quel mécanisme évite les doublons lorsqu’une ingestion API est relancée ?'),

(2,0,'concevoir-schema-relationnel','Concevoir un schéma relationnel robuste','Définir tables, clés et contraintes pour garantir l’intégrité des données.','lesson',105,
'["Identifier entités et relations", "Définir clés primaires et étrangères", "Utiliser les contraintes métier"]'::jsonb,$lesson$# Concevoir un schéma relationnel robuste

## Objectifs

- Transformer un besoin métier en tables cohérentes.
- Utiliser clés primaires, étrangères et contraintes.
- Éviter les anomalies d’insertion, mise à jour et suppression.

## Théorie

La modélisation relationnelle sépare les entités stables et leurs relations. Une clé primaire identifie chaque ligne. Une clé étrangère garantit la cohérence entre tables. Les contraintes `NOT NULL`, `UNIQUE` et `CHECK` protègent les règles métier au plus près des données.

## Exemple SQL

```sql
CREATE TABLE customers (
  customer_id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE sales (
  sale_id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(customer_id),
  amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
  sold_at TIMESTAMPTZ NOT NULL
);
```

## Exemple Python

```python
record = {"customer_id": 42, "amount": 79.90, "sold_at": "2026-07-20T10:00:00Z"}
assert record["amount"] >= 0
```

## Erreurs fréquentes

- Utiliser un texte libre comme clé primaire.
- Oublier les contraintes et tout valider uniquement dans l’application.
- Dupliquer les mêmes informations dans plusieurs tables.

## Bonnes pratiques

- Choisir une granularité claire par table.
- Définir les contraintes métier dans PostgreSQL.
- Nommer les clés de manière cohérente.
- Documenter cardinalités et règles de suppression.

## Question de validation

Pourquoi une contrainte de clé étrangère est-elle utile dans un pipeline de données ?$lesson$,
'Pourquoi une contrainte de clé étrangère est-elle utile dans un pipeline de données ?'),

(2,1,'index-transactions-upsert-postgresql','Index, transactions et upsert dans PostgreSQL','Améliorer performance et fiabilité des chargements SQL.','lesson',105,
'["Choisir un index utile", "Utiliser les transactions", "Mettre en œuvre un upsert idempotent"]'::jsonb,$lesson$# Index, transactions et upsert dans PostgreSQL

## Objectifs

- Comprendre quand créer un index.
- Garantir l’atomicité d’un chargement.
- Utiliser `ON CONFLICT` pour rendre un chargement idempotent.

## Théorie

Un index accélère les lectures ciblées mais ralentit les écritures et consomme de l’espace. Une transaction regroupe plusieurs opérations : elles réussissent toutes ou sont annulées. L’upsert permet d’insérer une ligne nouvelle ou de mettre à jour une ligne existante selon une clé unique.

## Exemple SQL

```sql
CREATE INDEX IF NOT EXISTS idx_sales_sold_at
ON sales (sold_at);

BEGIN;
INSERT INTO sales (sale_id, customer_id, amount, sold_at)
VALUES (1001, 42, 79.90, NOW())
ON CONFLICT (sale_id) DO UPDATE
SET amount = EXCLUDED.amount,
    sold_at = EXCLUDED.sold_at;
COMMIT;
```

## Exemple Python

```python
with connection:
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM staging.sales WHERE batch_id = %s", (batch_id,))
        cursor.executemany(insert_sql, rows)
```

## Erreurs fréquentes

- Indexer toutes les colonnes.
- Faire plusieurs écritures liées sans transaction.
- Utiliser un upsert sans clé unique stable.

## Bonnes pratiques

- Mesurer avec `EXPLAIN ANALYZE`.
- Garder les transactions courtes.
- Créer des clés idempotentes déterministes.
- Journaliser les lignes insérées et mises à jour.

## Question de validation

Pourquoi un upsert nécessite-t-il une clé unique fiable ?$lesson$,
'Pourquoi un upsert nécessite-t-il une clé unique fiable ?'),

(3,0,'contrats-json-schema','Contrats de données et JSON Schema','Définir des attentes explicites entre producteurs et consommateurs de données.','lesson',100,
'["Décrire un schéma de données", "Valider les payloads entrants", "Versionner un contrat de données"]'::jsonb,$lesson$# Contrats de données et JSON Schema

## Objectifs

- Formaliser les champs, types et règles attendus.
- Valider les données avant leur chargement.
- Faire évoluer un contrat sans casser les consommateurs.

## Théorie

Un contrat de données décrit la structure, la sémantique, la fréquence et les garanties d’un dataset. JSON Schema permet de valider des payloads API. Un changement incompatible doit être versionné et communiqué.

## Exemple Python

```python
from jsonschema import validate

schema = {
    "type": "object",
    "required": ["sale_id", "amount", "sold_at"],
    "properties": {
        "sale_id": {"type": "integer"},
        "amount": {"type": "number", "minimum": 0},
        "sold_at": {"type": "string", "format": "date-time"},
    },
}
validate(instance=payload, schema=schema)
```

## Exemple SQL

```sql
ALTER TABLE raw.api_sales
ADD CONSTRAINT api_sales_payload_object
CHECK (jsonb_typeof(payload) = 'object');
```

## Erreurs fréquentes

- Changer un champ sans prévenir les consommateurs.
- Valider uniquement la présence, pas le type.
- Confondre schéma technique et définition métier.

## Bonnes pratiques

- Versionner le contrat.
- Nommer un propriétaire.
- Tester les changements en CI.
- Documenter les champs optionnels et dépréciés.

## Question de validation

Quelle différence existe entre un schéma technique et un contrat de données complet ?$lesson$,
'Quelle différence existe entre un schéma technique et un contrat de données complet ?'),

(3,1,'parquet-partitionnement-stockage-objet','Parquet, partitionnement et stockage objet','Organiser une zone de données brute efficace et rejouable.','lesson',100,
'["Choisir des partitions utiles", "Écrire des fichiers Parquet", "Organiser les chemins d’un stockage objet"]'::jsonb,$lesson$# Parquet, partitionnement et stockage objet

## Objectifs

- Comprendre le stockage colonnaire.
- Définir une stratégie de partitionnement.
- Organiser une zone raw immuable.

## Théorie

Parquet stocke les colonnes séparément, ce qui réduit les lectures lorsque seules quelques colonnes sont nécessaires. Le partitionnement permet d’éviter de scanner tous les fichiers. Une partition trop fine crée toutefois trop de petits fichiers.

## Exemple Python

```python
import pandas as pd

df["sale_date"] = pd.to_datetime(df["sold_at"]).dt.date
df.to_parquet(
    "lake/raw/sales",
    partition_cols=["sale_date"],
    index=False,
)
```

## Exemple SQL

```sql
CREATE TABLE raw.file_registry (
  object_key TEXT PRIMARY KEY,
  checksum TEXT NOT NULL,
  row_count BIGINT NOT NULL,
  loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Erreurs fréquentes

- Partitionner par identifiant unique.
- Modifier les fichiers bruts après ingestion.
- Créer des milliers de petits fichiers.

## Bonnes pratiques

- Partitionner selon les filtres fréquents.
- Conserver checksum et nombre de lignes.
- Rendre les objets raw immuables.
- Compacter les petits fichiers lorsque nécessaire.

## Question de validation

Pourquoi partitionner un dataset par identifiant client est-il généralement une mauvaise idée ?$lesson$,
'Pourquoi partitionner un dataset par identifiant client est-il généralement une mauvaise idée ?'),

(4,0,'pipeline-etl-python-sql','Construire un pipeline ETL avec Python et SQL','Assembler extraction, transformation et chargement avec contrôles explicites.','lesson',115,
'["Structurer un pipeline en étapes", "Séparer logique et configuration", "Journaliser les résultats de chaque étape"]'::jsonb,$lesson$# Construire un pipeline ETL avec Python et SQL

## Objectifs

- Découper le pipeline en fonctions testables.
- Charger les données dans une zone staging.
- Produire un résultat atomique et observable.

## Théorie

Un pipeline maintenable sépare extraction, validation, transformation et chargement. Chaque étape doit avoir des entrées, sorties et erreurs explicites. Le chargement en staging permet de contrôler les données avant de les fusionner dans les tables cibles.

## Exemple Python

```python
def extract(path):
    return pd.read_csv(path)

def transform(df):
    clean = df.drop_duplicates(subset=["sale_id"]).copy()
    clean["amount"] = clean["amount"].astype(float)
    return clean

def load(df, engine):
    df.to_sql("sales", engine, schema="staging", if_exists="append", index=False)
```

## Exemple SQL

```sql
INSERT INTO analytics.sales (sale_id, customer_id, amount, sold_at)
SELECT sale_id, customer_id, amount, sold_at
FROM staging.sales
ON CONFLICT (sale_id) DO UPDATE
SET amount = EXCLUDED.amount,
    sold_at = EXCLUDED.sold_at;
```

## Erreurs fréquentes

- Écrire tout le pipeline dans une seule fonction.
- Charger directement en production sans staging.
- Masquer les exceptions et continuer silencieusement.

## Bonnes pratiques

- Rendre chaque étape testable.
- Utiliser une transaction pour la fusion finale.
- Tracer les volumes avant et après transformation.
- Stocker un identifiant de batch.

## Question de validation

Quel avantage apporte une table staging avant le chargement final ?$lesson$,
'Quel avantage apporte une table staging avant le chargement final ?'),

(4,1,'chargement-incremental-watermark','Chargements incrémentaux, watermark et déduplication','Traiter uniquement les nouvelles données tout en garantissant la cohérence.','lesson',115,
'["Définir un watermark", "Dédupliquer avec une clé métier", "Rejouer un batch sans doublon"]'::jsonb,$lesson$# Chargements incrémentaux, watermark et déduplication

## Objectifs

- Charger uniquement les nouvelles données.
- Gérer les arrivées tardives.
- Garantir l’idempotence d’un batch.

## Théorie

Le watermark représente la dernière valeur complètement traitée, souvent un timestamp ou un identifiant croissant. Il doit être mis à jour uniquement après succès. Les arrivées tardives nécessitent parfois une fenêtre de recouvrement accompagnée d’une déduplication.

## Exemple Python

```python
from datetime import timedelta

last_success = read_watermark("sales")
start = last_success - timedelta(hours=2)
rows = fetch_sales(updated_since=start)
write_staging(rows, batch_id=batch_id)
merge_sales(batch_id)
mark_success("sales", max(row["updated_at"] for row in rows))
```

## Exemple SQL

```sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY sale_id ORDER BY updated_at DESC
  ) AS rn
  FROM staging.sales
  WHERE batch_id = :batch_id
)
DELETE FROM staging.sales
WHERE batch_id = :batch_id
  AND sale_id IN (SELECT sale_id FROM ranked WHERE rn > 1);
```

## Erreurs fréquentes

- Mettre à jour le watermark avant la fin du chargement.
- Supposer que les événements arrivent toujours dans l’ordre.
- Dédupliquer sans ordre de priorité explicite.

## Bonnes pratiques

- Conserver un journal des batches.
- Utiliser une fenêtre de recouvrement.
- Fusionner avec une clé stable.
- Tester la relance du même batch.

## Question de validation

Pourquoi faut-il mettre à jour le watermark uniquement après le succès complet du batch ?$lesson$,
'Pourquoi faut-il mettre à jour le watermark uniquement après le succès complet du batch ?'),

(5,0,'tests-qualite-donnees','Tests de qualité des données','Définir et automatiser les contrôles de schéma, unicité, complétude et cohérence.','lesson',110,
'["Définir des dimensions de qualité", "Écrire des tests SQL", "Bloquer ou isoler les données invalides"]'::jsonb,$lesson$# Tests de qualité des données

## Objectifs

- Tester unicité, complétude, validité et fraîcheur.
- Distinguer contrôles bloquants et avertissements.
- Mesurer la qualité dans le temps.

## Théorie

La qualité des données doit être mesurable. Un test d’unicité détecte les doublons, un test de complétude les valeurs manquantes, un test de validité les valeurs hors domaine et un test de fraîcheur les retards de mise à jour.

## Exemple SQL

```sql
-- Unicité
SELECT sale_id, COUNT(*)
FROM analytics.sales
GROUP BY sale_id
HAVING COUNT(*) > 1;

-- Validité
SELECT COUNT(*) AS invalid_rows
FROM analytics.sales
WHERE amount < 0 OR customer_id IS NULL;
```

## Exemple Python

```python
checks = {
    "rows_positive": len(df) > 0,
    "sale_id_unique": df["sale_id"].is_unique,
    "amount_non_negative": df["amount"].ge(0).all(),
}
failed = [name for name, ok in checks.items() if not ok]
if failed:
    raise ValueError(f"Contrôles échoués: {failed}")
```

## Erreurs fréquentes

- Tester uniquement après incident.
- Utiliser des seuils sans justification métier.
- Supprimer les lignes invalides sans traçabilité.

## Bonnes pratiques

- Exécuter les contrôles à chaque batch.
- Historiser les résultats.
- Associer chaque test à un propriétaire.
- Distinguer erreur bloquante et alerte.

## Question de validation

Quelle différence existe entre un test de validité et un test de complétude ?$lesson$,
'Quelle différence existe entre un test de validité et un test de complétude ?'),

(5,1,'quarantaine-anomalies-contrats','Quarantaine, anomalies et contrats de données','Traiter les données invalides sans interrompre inutilement toute la chaîne.','lesson',110,
'["Isoler les lignes invalides", "Tracer la raison du rejet", "Définir une procédure de correction et réintégration"]'::jsonb,$lesson$# Quarantaine, anomalies et contrats de données

## Objectifs

- Isoler les anomalies avec leur contexte.
- Permettre une correction puis une réintégration.
- Faire respecter les contrats entre producteurs et consommateurs.

## Théorie

Une table de quarantaine conserve les lignes rejetées, la règle violée, le batch et la date. Cette approche évite de perdre les données et facilite l’analyse. Certains contrôles doivent bloquer tout le batch, d’autres peuvent isoler uniquement les lignes concernées.

## Exemple SQL

```sql
INSERT INTO quality.sales_quarantine (
  batch_id, payload, error_code, rejected_at
)
SELECT
  batch_id,
  to_jsonb(s),
  CASE
    WHEN customer_id IS NULL THEN 'MISSING_CUSTOMER'
    WHEN amount < 0 THEN 'NEGATIVE_AMOUNT'
  END,
  NOW()
FROM staging.sales s
WHERE customer_id IS NULL OR amount < 0;
```

## Exemple Python

```python
valid = df[df["customer_id"].notna() & df["amount"].ge(0)]
invalid = df.drop(valid.index).copy()
invalid["batch_id"] = batch_id
invalid.to_parquet(f"quarantine/{batch_id}.parquet", index=False)
```

## Erreurs fréquentes

- Supprimer les anomalies silencieusement.
- Mélanger quarantaine et données valides.
- Réinjecter une ligne sans vérifier la correction.

## Bonnes pratiques

- Conserver la règle violée et le payload original.
- Définir un SLA de traitement des anomalies.
- Suivre le taux de rejet par source.
- Revalider avant réintégration.

## Question de validation

Pourquoi une zone de quarantaine est-elle préférable à la suppression silencieuse des lignes invalides ?$lesson$,
'Pourquoi une zone de quarantaine est-elle préférable à la suppression silencieuse des lignes invalides ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'data-engineering-python-sql'
      AND m.order_index BETWEEN 0 AND 5
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,
       '["KORYXA Data Engineering avec Python et SQL", "Python", "PostgreSQL", "pandas", "Parquet", "JSON Schema"]'::jsonb,
       l.validation_prompt,FALSE
FROM lesson_seed l
JOIN target t ON t.order_index = l.module_order
ON CONFLICT (module_id,slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    order_index = EXCLUDED.order_index,
    lesson_type = EXCLUDED.lesson_type,
    estimated_minutes = EXCLUDED.estimated_minutes,
    objectives = EXCLUDED.objectives,
    content_md = EXCLUDED.content_md,
    source_refs = EXCLUDED.source_refs,
    validation_prompt = EXCLUDED.validation_prompt,
    is_published = FALSE;

DO $$
DECLARE lesson_count INT; module_coverage INT; published_count INT; duplicate_orders INT;
BEGIN
    SELECT COUNT(*), COUNT(DISTINCT m.id), COUNT(*) FILTER (WHERE l.is_published)
    INTO lesson_count, module_coverage, published_count
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'data-engineering-python-sql' AND m.order_index BETWEEN 0 AND 5;

    SELECT COUNT(*) INTO duplicate_orders
    FROM (
        SELECT l.module_id,l.order_index
        FROM public.lessons l
        JOIN public.modules m ON m.id=l.module_id
        JOIN public.courses c ON c.id=m.course_id
        WHERE c.slug='data-engineering-python-sql' AND m.order_index BETWEEN 0 AND 5
        GROUP BY l.module_id,l.order_index HAVING COUNT(*)>1
    ) d;

    IF lesson_count<>12 OR module_coverage<>6 OR published_count<>0 OR duplicate_orders<>0 THEN
        RAISE EXCEPTION 'Leçons Data Engineering fondations incomplètes: leçons %, modules %, publiées %, ordres dupliqués %', lesson_count,module_coverage,published_count,duplicate_orders;
    END IF;
END $$;
