-- KORYXA FORMATION — DATA ENGINEERING AVEC PYTHON ET SQL — CHANTIER 3
-- Modules 6 à 11 : 12 leçons détaillées. Migration idempotente, non publiée.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
VALUES
(6,0,'schema-etoile-granularite','Schéma en étoile et granularité','Concevoir un modèle analytique centré sur les usages BI.','lesson',110,
'["Définir la granularité d’une table de faits", "Distinguer faits et dimensions", "Concevoir un schéma en étoile"]'::jsonb,$lesson$# Schéma en étoile et granularité

## Objectifs
- Définir le grain exact d’une table de faits.
- Séparer mesures, dimensions et clés techniques.
- Concevoir un modèle lisible pour la BI.

## Théorie
Une table de faits enregistre un événement mesurable à une granularité précise. Les dimensions décrivent le contexte. Une granularité ambiguë produit des agrégations fausses et des doublons difficiles à détecter.

## Exemple SQL
```sql
CREATE TABLE analytics.fact_sales (
  sale_key BIGSERIAL PRIMARY KEY,
  date_key INT NOT NULL,
  customer_key BIGINT NOT NULL,
  product_key BIGINT NOT NULL,
  quantity INT NOT NULL,
  revenue NUMERIC(14,2) NOT NULL
);
```

## Exemple Python
```python
assert sales.groupby(["sale_id"]).size().max() == 1
```

## Erreurs fréquentes
- Mélanger plusieurs grains dans une même table.
- Stocker des attributs descriptifs dans la table de faits.
- Oublier les clés de dimensions inconnues.

## Bonnes pratiques
- Écrire une phrase de granularité.
- Ajouter une ligne inconnue dans chaque dimension.
- Contrôler l’unicité du grain.
- Documenter les mesures additives et non additives.

## Question de validation
Pourquoi la granularité doit-elle être définie avant la création de la table de faits ?$lesson$,
'Pourquoi la granularité doit-elle être définie avant la création de la table de faits ?'),

(6,1,'dimensions-lentement-variables','Dimensions lentement variables','Conserver l’historique des attributs métier.','lesson',110,
'["Distinguer SCD Type 1 et Type 2", "Gérer les périodes de validité", "Rattacher un fait à la bonne version"]'::jsonb,$lesson$# Dimensions lentement variables

## Objectifs
- Comprendre SCD Type 1 et Type 2.
- Historiser les changements utiles.
- Garantir une seule version active.

## Théorie
Le Type 1 écrase l’ancienne valeur. Le Type 2 crée une nouvelle ligne avec dates de validité. Le choix dépend de la nécessité de reconstruire l’état historique.

## Exemple SQL
```sql
UPDATE analytics.dim_customer
SET valid_to = :changed_at, is_current = FALSE
WHERE customer_id = :customer_id AND is_current = TRUE;

INSERT INTO analytics.dim_customer(customer_id, segment, valid_from, valid_to, is_current)
VALUES (:customer_id, :segment, :changed_at, TIMESTAMP '9999-12-31', TRUE);
```

## Erreurs fréquentes
- Avoir plusieurs versions actives.
- Utiliser la date de chargement au lieu de la date métier.
- Historiser tous les champs sans besoin.

## Bonnes pratiques
- Définir les attributs historisés.
- Tester le chevauchement des périodes.
- Utiliser une clé substitut.
- Documenter la règle de rattachement temporel.

## Question de validation
Quand faut-il préférer une SCD Type 2 à une SCD Type 1 ?$lesson$,
'Quand faut-il préférer une SCD Type 2 à une SCD Type 1 ?'),

(7,0,'structure-projet-dbt','Structurer un projet dbt','Organiser sources, staging, intermediate et marts.','lesson',120,
'["Initialiser un projet dbt", "Structurer les couches de modèles", "Déclarer les sources"]'::jsonb,$lesson$# Structurer un projet dbt

## Objectifs
- Organiser un projet dbt maintenable.
- Déclarer les sources et leur fraîcheur.
- Séparer nettoyage, logique intermédiaire et marts.

## Théorie
La couche staging standardise les sources. La couche intermediate assemble la logique réutilisable. Les marts exposent les modèles métier. Cette séparation réduit le couplage et clarifie le lineage.

## Exemple YAML
```yaml
version: 2
sources:
  - name: raw
    schema: raw
    tables:
      - name: sales
        loaded_at_field: ingested_at
        freshness:
          warn_after: {count: 24, period: hour}
```

## Exemple SQL dbt
```sql
select
  cast(sale_id as bigint) as sale_id,
  cast(amount as numeric(12,2)) as amount,
  sold_at
from {{ source('raw', 'sales') }}
```

## Erreurs fréquentes
- Mettre toute la logique dans un seul modèle.
- Référencer directement des tables physiques.
- Mélanger noms techniques et métier.

## Bonnes pratiques
- Utiliser `source()` et `ref()`.
- Garder les modèles staging simples.
- Nommer les modèles par fonction.
- Documenter chaque colonne exposée.

## Question de validation
Pourquoi `ref()` est-il préférable à un nom de table écrit en dur ?$lesson$,
'Pourquoi `ref()` est-il préférable à un nom de table écrit en dur ?'),

(7,1,'tests-snapshots-documentation-dbt','Tests, snapshots et documentation dbt','Fiabiliser les transformations et documenter leur lineage.','lesson',120,
'["Écrire des tests génériques et singuliers", "Utiliser les snapshots", "Générer la documentation dbt"]'::jsonb,$lesson$# Tests, snapshots et documentation dbt

## Objectifs
- Automatiser les contrôles de qualité.
- Historiser les changements de sources.
- Exposer une documentation navigable.

## Théorie
Les tests dbt vérifient unicité, non-nullité, relations et valeurs acceptées. Les snapshots capturent les changements de lignes mutables. La documentation rend le lineage visible.

## Exemple YAML
```yaml
models:
  - name: dim_customer
    columns:
      - name: customer_key
        tests: [not_null, unique]
      - name: segment
        tests:
          - accepted_values:
              values: ['standard', 'premium']
```

## Exemple shell
```bash
dbt build --select +mart_sales
dbt docs generate
```

## Erreurs fréquentes
- Ne tester que les modèles finaux.
- Utiliser un snapshot sans clé unique stable.
- Ignorer les avertissements de fraîcheur.

## Bonnes pratiques
- Tester dès staging.
- Associer les tests aux contrats métier.
- Exécuter `dbt build` en CI.
- Publier la documentation avec chaque version.

## Question de validation
Quelle différence existe entre un test dbt et un snapshot dbt ?$lesson$,
'Quelle différence existe entre un test dbt et un snapshot dbt ?'),

(8,0,'concevoir-dag-airflow','Concevoir un DAG Airflow','Orchestrer des tâches claires, idempotentes et observables.','lesson',120,
'["Définir tâches et dépendances", "Configurer scheduling et retries", "Éviter la logique métier dans le DAG"]'::jsonb,$lesson$# Concevoir un DAG Airflow

## Objectifs
- Construire un DAG lisible.
- Configurer dépendances et retries.
- Passer les paramètres d’exécution proprement.

## Théorie
Un DAG décrit l’orchestration, pas toute la logique métier. Les tâches doivent être petites, idempotentes et rejouables. Les dépendances doivent représenter les vraies contraintes de données.

## Exemple Python
```python
from airflow.decorators import dag, task
from pendulum import datetime

@dag(schedule="0 5 * * *", start_date=datetime(2026, 1, 1, tz="UTC"), catchup=False)
def sales_pipeline():
    @task(retries=3)
    def ingest():
        return "batch_id"
    @task
    def transform(batch_id):
        return batch_id
    transform(ingest())

sales_pipeline()
```

## Erreurs fréquentes
- Mettre des appels lourds au niveau global du fichier DAG.
- Créer une tâche unique pour tout le pipeline.
- Dépendre de fichiers locaux non partagés.

## Bonnes pratiques
- Garder le parsing du DAG léger.
- Utiliser des connexions gérées.
- Définir retries et délais.
- Journaliser les identifiants de batch.

## Question de validation
Pourquoi faut-il éviter d’exécuter des appels réseau lors du parsing d’un DAG ?$lesson$,
'Pourquoi faut-il éviter d’exécuter des appels réseau lors du parsing d’un DAG ?'),

(8,1,'backfill-retries-capteurs','Backfill, retries et capteurs Airflow','Gérer les retards, dépendances externes et reprises.','lesson',120,
'["Configurer un backfill", "Différencier retry et rerun", "Utiliser les capteurs avec parcimonie"]'::jsonb,$lesson$# Backfill, retries et capteurs Airflow

## Objectifs
- Rejouer des périodes passées.
- Gérer les échecs transitoires.
- Attendre une donnée externe sans bloquer inutilement.

## Théorie
Le backfill rejoue des intervalles historiques. Un retry relance une tâche échouée dans la même exécution. Les sensors en mode reschedule libèrent le worker entre deux vérifications.

## Exemple Python
```python
from airflow.sensors.filesystem import FileSensor

wait_for_file = FileSensor(
    task_id="wait_for_sales",
    filepath="sales/{{ ds }}.csv",
    mode="reschedule",
    poke_interval=300,
    timeout=7200,
)
```

## Exemple shell
```bash
airflow dags backfill sales_pipeline -s 2026-07-01 -e 2026-07-07
```

## Erreurs fréquentes
- Lancer un backfill non idempotent.
- Utiliser un sensor en mode poke pendant des heures.
- Réessayer les erreurs permanentes.

## Bonnes pratiques
- Tester la relance d’un intervalle.
- Limiter retries et timeout.
- Séparer erreurs temporaires et permanentes.
- Contrôler la concurrence des backfills.

## Question de validation
Quelle condition rend un pipeline sûr pour un backfill ?$lesson$,
'Quelle condition rend un pipeline sûr pour un backfill ?'),

(9,0,'dockerfile-images-data','Dockerfile et images reproductibles','Construire des images légères, sûres et déterministes.','lesson',110,
'["Écrire un Dockerfile multi-étapes", "Épingler les dépendances", "Exécuter sans utilisateur root"]'::jsonb,$lesson$# Dockerfile et images reproductibles

## Objectifs
- Construire une image reproductible.
- Réduire taille et surface d’attaque.
- Séparer code, configuration et secrets.

## Théorie
Une image doit être immutable et reproductible. Les dépendances doivent être épinglées. Les secrets ne doivent jamais être copiés dans l’image.

## Exemple Dockerfile
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN useradd -m appuser
COPY src ./src
USER appuser
CMD ["python", "-m", "src.pipeline"]
```

## Erreurs fréquentes
- Copier `.env` dans l’image.
- Utiliser `latest` sans contrôle.
- Exécuter en root.

## Bonnes pratiques
- Ajouter `.dockerignore`.
- Utiliser une base minimale.
- Scanner l’image.
- Séparer build et runtime.

## Question de validation
Pourquoi ne faut-il jamais intégrer un fichier `.env` dans une image Docker ?$lesson$,
'Pourquoi ne faut-il jamais intégrer un fichier `.env` dans une image Docker ?'),

(9,1,'docker-compose-stack-data','Docker Compose pour une stack data','Assembler PostgreSQL, Airflow et services de transformation.','lesson',110,
'["Définir services et réseaux", "Gérer volumes persistants", "Utiliser healthchecks et dépendances"]'::jsonb,$lesson$# Docker Compose pour une stack data

## Objectifs
- Lancer une stack locale cohérente.
- Gérer volumes, réseaux et healthchecks.
- Éviter les dépendances fragiles au démarrage.

## Théorie
Compose décrit plusieurs services. `depends_on` ne garantit pas qu’un service soit prêt ; il faut un healthcheck ou une logique de retry côté client.

## Exemple YAML
```yaml
services:
  postgres:
    image: postgres:16
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

## Erreurs fréquentes
- Stocker les données dans le conteneur sans volume.
- Exposer tous les ports publiquement.
- Supposer qu’un conteneur démarré est prêt.

## Bonnes pratiques
- Utiliser des healthchecks.
- Limiter les ports exposés.
- Externaliser la configuration.
- Versionner le fichier Compose.

## Question de validation
Pourquoi `depends_on` ne suffit-il pas pour garantir que PostgreSQL accepte déjà les connexions ?$lesson$,
'Pourquoi `depends_on` ne suffit-il pas pour garantir que PostgreSQL accepte déjà les connexions ?'),

(10,0,'logs-metriques-alertes','Logs, métriques et alertes','Rendre un pipeline observable et exploitable.','lesson',110,
'["Produire des logs structurés", "Définir des métriques utiles", "Créer des alertes actionnables"]'::jsonb,$lesson$# Logs, métriques et alertes

## Objectifs
- Journaliser chaque exécution.
- Mesurer volumes, durée, erreurs et fraîcheur.
- Définir des alertes avec contexte.

## Théorie
Les logs expliquent un événement. Les métriques montrent une tendance. Une alerte doit signaler une condition nécessitant une action et inclure le pipeline, le batch et la cause probable.

## Exemple Python
```python
import json, logging
logging.info(json.dumps({
    "event": "batch_completed",
    "pipeline": "sales",
    "batch_id": batch_id,
    "rows_loaded": row_count,
    "duration_seconds": duration,
}))
```

## Exemple SQL
```sql
INSERT INTO control.pipeline_runs(
  pipeline_name, batch_id, status, rows_loaded, finished_at
) VALUES ('sales', :batch_id, 'success', :rows, NOW());
```

## Erreurs fréquentes
- Écrire des logs sans identifiant de batch.
- Alerter sur chaque anomalie mineure.
- Ne pas historiser les durées et volumes.

## Bonnes pratiques
- Utiliser des logs structurés.
- Corréler toutes les étapes par batch.
- Définir des seuils et propriétaires.
- Inclure un lien vers le runbook.

## Question de validation
Quelle différence existe entre une métrique et un log ?$lesson$,
'Quelle différence existe entre une métrique et un log ?'),

(10,1,'sla-fraicheur-runbooks','SLA, fraîcheur et runbooks','Définir les engagements de service et les procédures de reprise.','lesson',110,
'["Définir SLA et SLO", "Mesurer la fraîcheur", "Rédiger un runbook opérationnel"]'::jsonb,$lesson$# SLA, fraîcheur et runbooks

## Objectifs
- Traduire le besoin métier en objectifs mesurables.
- Détecter un retard de données.
- Formaliser une procédure d’incident.

## Théorie
Le SLA est un engagement. Le SLO est une cible interne mesurable. Un runbook décrit diagnostic, mitigation, reprise et escalade.

## Exemple SQL
```sql
SELECT NOW() - MAX(loaded_at) AS freshness_delay
FROM analytics.fact_sales;
```

## Exemple runbook
```text
1. Vérifier le dernier batch réussi.
2. Contrôler disponibilité de la source.
3. Identifier l’étape échouée.
4. Corriger puis relancer le batch idempotent.
5. Vérifier volumes et contrôles qualité.
```

## Erreurs fréquentes
- Définir un SLA sans moyen de mesure.
- Relancer sans comprendre l’échec.
- Ne pas tester les procédures de reprise.

## Bonnes pratiques
- Associer chaque SLA à une métrique.
- Tester les runbooks.
- Définir les responsabilités.
- Documenter les cas de non-rejeu.

## Question de validation
Pourquoi un SLA sans métrique de fraîcheur n’est-il pas exploitable ?$lesson$,
'Pourquoi un SLA sans métrique de fraîcheur n’est-il pas exploitable ?'),

(11,0,'ci-tests-securite-data','CI, tests et sécurité des pipelines','Industrialiser les contrôles avant déploiement.','lesson',105,
'["Construire une CI data", "Tester SQL, Python et dbt", "Protéger les configurations sensibles"]'::jsonb,$lesson$# CI, tests et sécurité des pipelines

## Objectifs
- Automatiser lint, tests et validations.
- Bloquer les régressions de schéma.
- Séparer secrets et code.

## Théorie
Une CI data doit vérifier le code Python, les requêtes SQL, les modèles dbt, les contrats et les migrations. Les secrets sont injectés par le gestionnaire de CI, jamais versionnés.

## Exemple YAML
```yaml
steps:
  - run: python -m pytest
  - run: sqlfluff lint models
  - run: dbt deps && dbt parse
  - run: dbt build --select state:modified+
```

## Erreurs fréquentes
- Exécuter uniquement les tests unitaires Python.
- Utiliser des données de production en CI.
- Stocker les secrets dans le repo.

## Bonnes pratiques
- Utiliser des datasets synthétiques.
- Tester les migrations sur une base éphémère.
- Activer la revue de code.
- Épingler les versions d’outils.

## Question de validation
Quels contrôles minimum une CI Data Engineering doit-elle exécuter ?$lesson$,
'Quels contrôles minimum une CI Data Engineering doit-elle exécuter ?'),

(11,1,'documentation-gouvernance-couts','Documentation, gouvernance et coûts','Préparer un système maintenable, compréhensible et proportionné.','lesson',105,
'["Documenter architecture et exploitation", "Attribuer propriétaires et responsabilités", "Suivre les coûts techniques"]'::jsonb,$lesson$# Documentation, gouvernance et coûts

## Objectifs
- Produire une documentation utile aux équipes.
- Définir propriétaires, lineage et classification.
- Évaluer les coûts de stockage et calcul.

## Théorie
La gouvernance relie données, définitions, propriétaires, accès et qualité. Une architecture performante mais incompréhensible ou trop coûteuse n’est pas durable.

## Exemple Python
```python
asset = {
    "name": "analytics.fact_sales",
    "owner": "data-platform",
    "classification": "internal",
    "sla_hours": 24,
    "retention_days": 730,
}
```

## Exemple SQL
```sql
COMMENT ON TABLE analytics.fact_sales IS
'Ventes au grain ligne de commande. Propriétaire: data-platform.';
```

## Erreurs fréquentes
- Documenter uniquement après livraison.
- Ne pas attribuer de propriétaire.
- Ignorer les coûts de scans et de rétention.

## Bonnes pratiques
- Documenter au fil du développement.
- Associer chaque dataset à un owner.
- Suivre les coûts par pipeline.
- Définir rétention et archivage.

## Question de validation
Pourquoi la propriété d’un dataset doit-elle être explicitement attribuée ?$lesson$,
'Pourquoi la propriété d’un dataset doit-elle être explicitement attribuée ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'data-engineering-python-sql'
      AND m.order_index BETWEEN 6 AND 11
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,
       '["KORYXA Data Engineering avec Python et SQL", "PostgreSQL", "dbt", "Apache Airflow", "Docker"]'::jsonb,
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
    WHERE c.slug = 'data-engineering-python-sql' AND m.order_index BETWEEN 6 AND 11;

    SELECT COUNT(*) INTO duplicate_orders
    FROM (
        SELECT l.module_id,l.order_index
        FROM public.lessons l
        JOIN public.modules m ON m.id=l.module_id
        JOIN public.courses c ON c.id=m.course_id
        WHERE c.slug='data-engineering-python-sql' AND m.order_index BETWEEN 6 AND 11
        GROUP BY l.module_id,l.order_index HAVING COUNT(*)>1
    ) d;

    IF lesson_count<>12 OR module_coverage<>6 OR published_count<>0 OR duplicate_orders<>0 THEN
        RAISE EXCEPTION 'Leçons Data Engineering avancées incomplètes: leçons %, modules %, publiées %, ordres dupliqués %', lesson_count,module_coverage,published_count,duplicate_orders;
    END IF;
END $$;
