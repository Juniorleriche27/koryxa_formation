-- KORYXA FORMATION — DATA ENGINEERING AVEC PYTHON ET SQL — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'data-engineering-python-sql',
    'Data Engineering avec Python et SQL',
    'Data Engineering Python & SQL',
    'Parcours professionnel pour concevoir, construire, tester et superviser des pipelines de données avec Python, SQL, PostgreSQL, dbt, Airflow et Docker.',
    'Data analysts, développeurs Python, profils BI, administrateurs de données et professionnels souhaitant évoluer vers le métier de Data Engineer.',
    '["Maîtriser les bases de Python", "Savoir écrire des requêtes SQL", "Comprendre les tables, clés et jointures", "Être à l’aise avec la ligne de commande et Git"]'::jsonb,
    '["Concevoir une architecture de données", "Ingestérer des fichiers et APIs avec Python", "Modéliser des données analytiques", "Construire des pipelines ETL et ELT", "Écrire du SQL PostgreSQL robuste", "Mettre en place des contrôles de qualité", "Transformer les données avec dbt", "Orchestrer des workflows avec Airflow", "Conteneuriser les services avec Docker", "Superviser les pipelines et gérer les erreurs", "Documenter les contrats de données", "Livrer une plateforme analytique reproductible"]'::jsonb,
    64,
    'Plateforme analytique de ventes avec Python, SQL, dbt et Airflow',
    'Projet autonome estimé à 16 heures : ingestion de fichiers et API, stockage PostgreSQL, transformations dbt, orchestration Airflow, contrôles de qualité, observabilité et alimentation d’un modèle analytique de ventes.',
    FALSE,
    7
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_title = EXCLUDED.short_title,
    description = EXCLUDED.description,
    audience = EXCLUDED.audience,
    prerequisites = EXCLUDED.prerequisites,
    skills = EXCLUDED.skills,
    estimated_hours = EXCLUDED.estimated_hours,
    final_project_title = EXCLUDED.final_project_title,
    final_project_description = EXCLUDED.final_project_description,
    is_published = FALSE,
    order_index = EXCLUDED.order_index;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'data-engineering-python-sql'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Fondations du Data Engineering','Rôle du Data Engineer, architectures modernes, batch, streaming, ETL, ELT et cycle de vie des données.','3h00',3.0,
     '["Comprendre le rôle du Data Engineer", "Comparer ETL et ELT", "Lire une architecture de données"]'::jsonb,
     '["Python et SQL de base"]'::jsonb,'["architecture data", "ETL", "ELT", "batch"]'::jsonb,'Architecture cadrée','Dessiner une architecture simple pour un pipeline de ventes.',TRUE),
    (1,'Ingestion de données avec Python','Lecture de fichiers CSV, JSON et Parquet, appels API, pagination, reprise sur erreur et idempotence.','4h00',4.0,
     '["Ingestérer plusieurs formats", "Consommer une API paginée", "Rendre une ingestion idempotente"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["Python", "pandas", "API REST", "Parquet"]'::jsonb,'Ingestion fiable','Construire un extracteur Python pour fichiers et API.',TRUE),
    (2,'PostgreSQL et modélisation relationnelle','Schémas, contraintes, clés, index, transactions, normalisation et conception de tables robustes.','4h00',4.0,
     '["Concevoir un schéma relationnel", "Utiliser contraintes et index", "Garantir l’intégrité des données"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["PostgreSQL", "modélisation relationnelle", "index", "transactions"]'::jsonb,'Schéma opérationnel','Créer le modèle relationnel d’une plateforme de ventes.',TRUE),
    (3,'Formats, APIs et stockage objet','Contrats de données, schémas JSON, compression, partitionnement et stockage objet compatible S3.','4h00',4.0,
     '["Choisir un format de stockage", "Définir un contrat de données", "Organiser des données partitionnées"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["JSON Schema", "Parquet", "S3", "partitionnement"]'::jsonb,'Zone raw structurée','Organiser une zone raw versionnée et documentée.',TRUE),
    (4,'Pipelines ETL et ELT avec Python et SQL','Extraction, transformation, chargement, incrémental, upsert, watermark et gestion des doublons.','4h30',4.5,
     '["Construire un pipeline ETL", "Implémenter un chargement incrémental", "Gérer doublons et reprises"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["ETL", "ELT", "upsert", "watermark"]'::jsonb,'Pipeline incrémental','Charger les ventes sans doublon avec reprise après échec.',TRUE),
    (5,'Qualité, tests et contrats de données','Tests de schéma, unicité, fraîcheur, complétude, cohérence métier et gestion des anomalies.','4h00',4.0,
     '["Définir des règles de qualité", "Automatiser les contrôles", "Isoler et tracer les anomalies"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["data quality", "data contracts", "tests", "anomalies"]'::jsonb,'Qualité contrôlée','Créer une suite de contrôles pour les données de ventes.',TRUE),
    (6,'Entrepôts de données et modélisation analytique','Tables de faits, dimensions, schéma en étoile, dimensions lentement variables et granularité.','4h00',4.0,
     '["Concevoir un schéma en étoile", "Définir la granularité", "Gérer les dimensions historiques"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["data warehouse", "star schema", "SCD", "facts"]'::jsonb,'Mart analytique','Concevoir un datamart de ventes fiable.',TRUE),
    (7,'Transformations avec dbt','Modèles staging, intermediate et marts, tests, sources, snapshots, documentation et lineage.','4h30',4.5,
     '["Structurer un projet dbt", "Écrire modèles et tests", "Documenter le lineage"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["dbt", "models", "snapshots", "lineage"]'::jsonb,'Projet dbt opérationnel','Transformer les données raw en marts documentés avec dbt.',TRUE),
    (8,'Orchestration avec Apache Airflow','DAGs, tâches, dépendances, scheduling, retries, backfill, variables et connexions.','4h30',4.5,
     '["Concevoir un DAG", "Configurer retries et backfill", "Orchestrer plusieurs étapes"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["Airflow", "DAG", "scheduling", "backfill"]'::jsonb,'Workflow orchestré','Créer un DAG quotidien ingestion-transformation-contrôle.',TRUE),
    (9,'Docker et environnements reproductibles','Images, Dockerfile, Compose, réseaux, volumes, variables d’environnement et services PostgreSQL/Airflow.','4h00',4.0,
     '["Construire une image", "Assembler des services avec Compose", "Isoler les configurations"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["Docker", "Docker Compose", "volumes", "réseaux"]'::jsonb,'Stack locale reproductible','Lancer PostgreSQL, dbt et Airflow dans une stack locale.',TRUE),
    (10,'Observabilité, logs et fiabilité','Logs structurés, métriques, alertes, SLA, freshness, lineage, runbooks et reprise opérationnelle.','4h00',4.0,
     '["Instrumenter un pipeline", "Définir SLA et alertes", "Diagnostiquer un échec"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["observabilité", "logs", "SLA", "alerting"]'::jsonb,'Pipeline observable','Ajouter logs, métriques et procédure de reprise.',TRUE),
    (11,'Industrialisation et restitution','Organisation du repo, CI, sécurité, documentation, gouvernance, coûts et préparation du projet final.','3h30',3.5,
     '["Structurer un projet maintenable", "Préparer la CI", "Documenter architecture et exploitation"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["CI", "gouvernance", "documentation", "sécurité"]'::jsonb,'Projet final cadré','Préparer le dossier d’architecture et le plan de livraison.',TRUE)
)
INSERT INTO public.modules (
    course_id, title, description, duration, order_index, is_published,
    learning_objectives, prerequisites, skills, milestone, exercise_brief,
    estimated_hours, requires_quiz, quiz_pass_score, platform_points
)
SELECT c.id, curriculum.title, curriculum.description, curriculum.duration, curriculum.order_index, FALSE,
       curriculum.objectives, curriculum.prerequisites, curriculum.skills, curriculum.milestone,
       curriculum.exercise_brief, curriculum.estimated_hours, curriculum.requires_quiz, 12, 0
FROM target_course c CROSS JOIN curriculum
ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    duration = EXCLUDED.duration,
    is_published = FALSE,
    learning_objectives = EXCLUDED.learning_objectives,
    prerequisites = EXCLUDED.prerequisites,
    skills = EXCLUDED.skills,
    milestone = EXCLUDED.milestone,
    exercise_brief = EXCLUDED.exercise_brief,
    estimated_hours = EXCLUDED.estimated_hours,
    requires_quiz = EXCLUDED.requires_quiz,
    quiz_pass_score = EXCLUDED.quiz_pass_score,
    platform_points = EXCLUDED.platform_points;

DO $$
DECLARE module_count INT; hour_total NUMERIC; published_count INT; course_hours NUMERIC;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(m.estimated_hours),0), COUNT(*) FILTER (WHERE m.is_published)
    INTO module_count, hour_total, published_count
    FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='data-engineering-python-sql';

    SELECT estimated_hours INTO course_hours
    FROM public.courses WHERE slug='data-engineering-python-sql';

    IF module_count<>12 OR hour_total<>48 OR published_count<>0 OR course_hours<>64 THEN
        RAISE EXCEPTION 'Fondation Data Engineering incomplète: modules %, heures modules %, publiés %, heures cours %', module_count, hour_total, published_count, course_hours;
    END IF;
END $$;
