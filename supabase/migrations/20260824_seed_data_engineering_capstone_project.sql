-- KORYXA FORMATION — DATA ENGINEERING AVEC PYTHON ET SQL — CHANTIER 6
-- Projet final, barème et jalons. Projet et jalons restent non publiés.

WITH c AS (
    SELECT id FROM public.courses WHERE slug='data-engineering-python-sql'
)
INSERT INTO public.course_projects(
    course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,
    minimum_version,advanced_version,functional_criteria,technical_criteria,
    rubric,reference_solution_md,is_published
)
SELECT
    c.id,
    'plateforme-analytique-ventes-python-sql-dbt-airflow',
    'Plateforme analytique de ventes avec Python, SQL, dbt et Airflow',
    'Construire une plateforme de données reproductible qui ingère des ventes, les stocke dans PostgreSQL, les transforme avec dbt, les orchestre avec Airflow et les expose sous forme de marts analytiques fiables.',
    $brief$# Brief du projet final

Vous intervenez comme Data Engineer pour une entreprise multi-canal. Les données clients, produits et ventes arrivent sous forme de fichiers CSV et de réponses API paginées. Les équipes BI ont besoin d’un modèle analytique fiable, documenté et actualisé quotidiennement.

Votre mission consiste à construire une plateforme complète : ingestion Python, zone raw, schéma PostgreSQL, chargements incrémentaux, transformations dbt, orchestration Airflow, contrôles de qualité, logs, alertes et documentation d’exploitation.

## Livrables obligatoires

- un dépôt structuré avec code Python, SQL, dbt, Airflow et Docker ;
- une ingestion idempotente des fichiers et de l’API ;
- une zone raw et une zone staging ;
- un modèle relationnel PostgreSQL avec contraintes ;
- un chargement incrémental avec watermark et déduplication ;
- un projet dbt avec sources, staging, marts, tests et documentation ;
- un DAG Airflow quotidien avec retries et backfill ;
- une stack Docker Compose locale ;
- des contrôles de qualité et une quarantaine ;
- des logs structurés, métriques de fraîcheur et runbook ;
- une documentation d’architecture et d’exploitation.

## Résultat métier attendu

Les équipes BI doivent pouvoir interroger un datamart de ventes au grain ligne de vente, avec dimensions client, produit et date, sans doublon et avec une fraîcheur quotidienne mesurable.

## Contraintes

- toutes les étapes doivent être rejouables sans doublon ;
- les secrets ne doivent jamais être versionnés ;
- les données brutes doivent rester traçables ;
- les transformations doivent être testées ;
- les anomalies doivent être isolées et expliquées ;
- les procédures de reprise doivent être documentées.$brief$,
    $policy$# Politique des données

Le projet utilise uniquement les datasets synthétiques fournis par KORYXA. Aucune donnée personnelle réelle ne doit être ajoutée.

## Règles

- conserver la provenance, le batch et la date d’ingestion ;
- ne jamais écraser silencieusement les données raw ;
- utiliser des clés stables pour les upserts ;
- documenter les schémas et contrats ;
- isoler les lignes invalides dans une quarantaine ;
- masquer ou exclure toute donnée sensible éventuelle ;
- ne jamais inclure de vrai fichier `.env` ou de secret dans le dépôt ;
- limiter les accès PostgreSQL au strict nécessaire.$policy$,
    '[{"path":"/resources/data-engineering-python-sql/customers.csv","purpose":"Dataset clients synthétique"},{"path":"/resources/data-engineering-python-sql/products.csv","purpose":"Dataset produits synthétique"},{"path":"/resources/data-engineering-python-sql/sales.csv","purpose":"Dataset ventes synthétique"},{"path":"/resources/data-engineering-python-sql/api_sales_pages.json","purpose":"Simulation API paginée"},{"path":"/resources/data-engineering-python-sql/starter/08_airflow_dag.py","purpose":"DAG Airflow de départ"},{"path":"/resources/data-engineering-python-sql/starter/09_docker-compose.yml","purpose":"Stack Docker de départ"}]'::jsonb,
    '["Ingestérer les quatre sources fournies","Créer raw, staging et analytics dans PostgreSQL","Implémenter un chargement incrémental idempotent","Construire un schéma en étoile ventes","Créer un projet dbt avec tests","Orchestrer le pipeline avec Airflow","Lancer la stack avec Docker Compose","Produire des logs structurés et un runbook"]'::jsonb,
    '["Ajouter une SCD Type 2 pour les clients","Gérer les arrivées tardives avec fenêtre de recouvrement","Ajouter snapshots et freshness dbt","Implémenter une quarantaine et une réintégration","Ajouter métriques et alertes automatisées","Créer un backfill contrôlé","Tester les migrations sur une base éphémère","Ajouter une CI complète Python, SQL et dbt"]'::jsonb,
    '["Les sources sont ingérées sans doublon","Le datamart répond aux besoins BI","Les dimensions et faits respectent leur granularité","Les anomalies sont visibles et traçables","Le pipeline peut être relancé après échec","La fraîcheur est mesurable","La documentation permet une reprise par une autre équipe"]'::jsonb,
    '["Code Python structuré et testé","Contraintes PostgreSQL explicites","Upserts et transactions correctement utilisés","Projet dbt valide et documenté","DAG Airflow idempotent","Docker Compose avec volumes et healthchecks","Aucun secret versionné","Logs corrélés par batch_id","Runbook et SLA documentés"]'::jsonb,
    '[{"criterion":"Architecture et contrats de données","points":8},{"criterion":"Ingestion et idempotence","points":10},{"criterion":"PostgreSQL et modélisation","points":10},{"criterion":"Transformations dbt et qualité","points":10},{"criterion":"Orchestration Airflow","points":8},{"criterion":"Docker, observabilité et reprise","points":8},{"criterion":"Documentation, sécurité et restitution","points":6}]'::jsonb,
    $solution$# Solution de référence

La solution attendue organise le dépôt en dossiers `src`, `sql`, `dbt`, `airflow`, `tests` et `docs`. Les extracteurs Python chargent les fichiers et les pages API dans une zone raw en conservant checksum, source et batch_id. Un registre de fichiers empêche les doublons.

PostgreSQL contient les schémas raw, staging, analytics, quality et control. Le chargement incrémental utilise un watermark mis à jour uniquement après succès, une fenêtre de recouvrement et des upserts transactionnels.

Le projet dbt transforme les sources en staging puis en dimensions et table de faits. Les tests vérifient unicité, non-nullité, relations, valeurs acceptées et fraîcheur. Airflow orchestre ingestion, chargement, dbt build et contrôles qualité avec retries, logs et possibilité de backfill.

Docker Compose lance PostgreSQL et les services nécessaires avec volumes et healthchecks. La solution finale fournit une CI, un runbook, une documentation d’architecture et une preuve de relance idempotente du même batch.$solution$,
    FALSE
FROM c
ON CONFLICT(course_id,slug) DO UPDATE SET
    title=EXCLUDED.title, summary=EXCLUDED.summary, brief_md=EXCLUDED.brief_md,
    corpus_policy_md=EXCLUDED.corpus_policy_md, starter_assets=EXCLUDED.starter_assets,
    minimum_version=EXCLUDED.minimum_version, advanced_version=EXCLUDED.advanced_version,
    functional_criteria=EXCLUDED.functional_criteria, technical_criteria=EXCLUDED.technical_criteria,
    rubric=EXCLUDED.rubric, reference_solution_md=EXCLUDED.reference_solution_md,
    is_published=FALSE;

WITH p AS (
    SELECT cp.id AS project_id,cp.course_id
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='data-engineering-python-sql'
      AND cp.slug='plateforme-analytique-ventes-python-sql-dbt-airflow'
), seed(module_order,slug,title,description,deliverables,acceptance,ord) AS (
VALUES
(0,'architecture-cadrage','Cadrer l’architecture','Définir sources, couches, SLA, contrats et responsabilités.','["Schéma d’architecture","Contrats de données","SLA"]'::jsonb,'["Couches clairement séparées","Propriétaires identifiés","Exigences de fraîcheur mesurables"]'::jsonb,0),
(1,'ingestion-sources','Construire les ingestions','Ingestérer CSV et API avec provenance, retries et idempotence.','["Extracteurs Python","Registre de fichiers","Zone raw"]'::jsonb,'["Relance sans doublon","Timeouts et erreurs gérés","Provenance conservée"]'::jsonb,1),
(2,'schema-postgresql','Créer le socle PostgreSQL','Déployer schémas, tables, contraintes, index et transactions.','["Migrations SQL","Modèle relationnel"]'::jsonb,'["Clés et contraintes valides","Migrations rejouables","Transactions utilisées"]'::jsonb,2),
(4,'incremental-etl','Implémenter l’incrémental','Construire watermark, overlap, staging et fusion finale.','["Pipeline incrémental","Journal de batches"]'::jsonb,'["Watermark après succès","Déduplication fiable","Arrivées tardives gérées"]'::jsonb,3),
(5,'qualite-quarantaine','Mettre en place la qualité','Créer contrôles, quarantaine et procédure de réintégration.','["Tests qualité","Table de quarantaine"]'::jsonb,'["Règles explicites","Rejets traçables","Réintégration contrôlée"]'::jsonb,4),
(6,'modele-analytique','Construire le datamart','Créer dimensions et table de faits au bon grain.','["Schéma en étoile","Dictionnaire des mesures"]'::jsonb,'["Grain documenté","Intégrité référentielle","Agrégations correctes"]'::jsonb,5),
(7,'transformations-dbt','Industrialiser avec dbt','Créer sources, modèles, tests, snapshots et documentation.','["Projet dbt","Documentation lineage"]'::jsonb,'["dbt build réussi","Tests passants","Lineage complet"]'::jsonb,6),
(8,'orchestration-airflow','Orchestrer le pipeline','Créer un DAG quotidien avec retries et backfill.','["DAG Airflow","Plan de backfill"]'::jsonb,'["Tâches idempotentes","Dépendances correctes","Backfill démontré"]'::jsonb,7),
(9,'stack-docker','Conteneuriser la plateforme','Assembler PostgreSQL et services avec Docker Compose.','["Dockerfile","docker-compose.yml"]'::jsonb,'["Volumes persistants","Healthchecks présents","Aucun secret inclus"]'::jsonb,8),
(10,'observabilite-reprise','Ajouter observabilité et reprise','Instrumenter logs, métriques, alertes et runbook.','["Logs structurés","Dashboard de métriques","Runbook"]'::jsonb,'["batch_id corrélé","SLA mesuré","Procédure testée"]'::jsonb,9),
(11,'ci-documentation','Finaliser CI et documentation','Automatiser les contrôles et livrer le dossier d’exploitation.','["Workflow CI","Documentation finale","Démonstration"]'::jsonb,'["Tests automatisés","Architecture reproductible","Livrables complets"]'::jsonb,10)
)
INSERT INTO public.course_project_milestones(
    project_id,module_id,slug,title,description,deliverables,acceptance_criteria,order_index,is_published
)
SELECT p.project_id,m.id,s.slug,s.title,s.description,s.deliverables,s.acceptance,s.ord,FALSE
FROM p
JOIN public.modules m ON m.course_id=p.course_id
JOIN seed s ON s.module_order=m.order_index
ON CONFLICT(project_id,slug) DO UPDATE SET
    module_id=EXCLUDED.module_id,title=EXCLUDED.title,description=EXCLUDED.description,
    deliverables=EXCLUDED.deliverables,acceptance_criteria=EXCLUDED.acceptance_criteria,
    order_index=EXCLUDED.order_index,is_published=FALSE;

DO $$
DECLARE project_count INT; milestone_count INT; rubric_total INT; published_projects INT; published_milestones INT;
BEGIN
    SELECT COUNT(*),COUNT(*) FILTER (WHERE cp.is_published)
    INTO project_count,published_projects
    FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='data-engineering-python-sql';

    SELECT COUNT(*),COUNT(*) FILTER (WHERE pm.is_published)
    INTO milestone_count,published_milestones
    FROM public.course_project_milestones pm
    JOIN public.course_projects cp ON cp.id=pm.project_id
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='data-engineering-python-sql';

    SELECT COALESCE(SUM((item->>'points')::INT),0)
    INTO rubric_total
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id,
    LATERAL jsonb_array_elements(cp.rubric) item
    WHERE c.slug='data-engineering-python-sql';

    IF project_count<>1 OR milestone_count<>11 OR rubric_total<>60 OR published_projects<>0 OR published_milestones<>0 THEN
        RAISE EXCEPTION 'Chantier 6 Data Engineering incomplet: projets %, jalons %, barème %, projets publiés %, jalons publiés %',
            project_count,milestone_count,rubric_total,published_projects,published_milestones;
    END IF;
END $$;
