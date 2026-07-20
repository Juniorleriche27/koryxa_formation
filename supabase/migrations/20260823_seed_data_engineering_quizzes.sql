-- KORYXA FORMATION — DATA ENGINEERING AVEC PYTHON ET SQL — CHANTIER 5
-- 48 quiz de modules et 12 questions finales. Tout reste inactif.

ALTER TABLE public.quiz_questions
ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=0
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quelle couche conserve les données brutes ?',jsonb_build_array('A) La zone raw','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Fondations du Data Engineering','La zone raw est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Mélanger raw et analytics.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Fondations du Data Engineering','Mélanger raw et analytics est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Fondations du Data Engineering ?',jsonb_build_array('A) Définir les couches avant de choisir les outils','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Fondations du Data Engineering','Il faut définir les couches avant de choisir les outils.'),(4,'mini_challenge','Quelle affirmation est correcte pour Fondations du Data Engineering ?',jsonb_build_array('A) ETL transforme avant chargement alors qu’ELT transforme après chargement','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Fondations du Data Engineering','ETL transforme avant chargement alors qu’ELT transforme après chargement.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=1
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel format est colonnaire ?',jsonb_build_array('A) Parquet','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Ingestion Python','Parquet est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Lire sans schéma explicite.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Ingestion Python','Lire sans schéma explicite est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Ingestion Python ?',jsonb_build_array('A) Valider schéma et volumes à l’ingestion','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Ingestion Python','Il faut valider schéma et volumes à l’ingestion.'),(4,'mini_challenge','Quelle affirmation est correcte pour Ingestion Python ?',jsonb_build_array('A) Un timeout HTTP évite qu’un appel reste bloqué','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Ingestion Python','Un timeout HTTP évite qu’un appel reste bloqué.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=2
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quelle contrainte garantit une relation entre tables ?',jsonb_build_array('A) Une clé étrangère','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','PostgreSQL','Une clé étrangère est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Indexer toutes les colonnes.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','PostgreSQL','Indexer toutes les colonnes est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en PostgreSQL ?',jsonb_build_array('A) Utiliser transactions et clés stables','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','PostgreSQL','Il faut utiliser transactions et clés stables.'),(4,'mini_challenge','Quelle affirmation est correcte pour PostgreSQL ?',jsonb_build_array('A) ON CONFLICT permet un upsert idempotent','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','PostgreSQL','ON CONFLICT permet un upsert idempotent.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=3
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel artefact formalise les champs attendus ?',jsonb_build_array('A) Un contrat de données','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Contrats et stockage','Un contrat de données est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Partitionner par identifiant unique.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Contrats et stockage','Partitionner par identifiant unique est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Contrats et stockage ?',jsonb_build_array('A) Versionner les contrats','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Contrats et stockage','Il faut versionner les contrats.'),(4,'mini_challenge','Quelle affirmation est correcte pour Contrats et stockage ?',jsonb_build_array('A) Parquet réduit les lectures analytiques','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Contrats et stockage','Parquet réduit les lectures analytiques.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=4
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel mécanisme mémorise le dernier point traité ?',jsonb_build_array('A) Un watermark','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','ETL et ELT','Un watermark est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Mettre à jour le watermark avant succès.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','ETL et ELT','Mettre à jour le watermark avant succès est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en ETL et ELT ?',jsonb_build_array('A) Rendre les batches rejouables','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','ETL et ELT','Il faut rendre les batches rejouables.'),(4,'mini_challenge','Quelle affirmation est correcte pour ETL et ELT ?',jsonb_build_array('A) Une fenêtre de recouvrement gère les arrivées tardives','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','ETL et ELT','Une fenêtre de recouvrement gère les arrivées tardives.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=5
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel test détecte les doublons ?',jsonb_build_array('A) Un test d’unicité','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Qualité des données','Un test d’unicité est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Supprimer les anomalies silencieusement.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Qualité des données','Supprimer les anomalies silencieusement est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Qualité des données ?',jsonb_build_array('A) Isoler les rejets en quarantaine','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Qualité des données','Il faut isoler les rejets en quarantaine.'),(4,'mini_challenge','Quelle affirmation est correcte pour Qualité des données ?',jsonb_build_array('A) La fraîcheur mesure le retard de mise à jour','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Qualité des données','La fraîcheur mesure le retard de mise à jour.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=6
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Que décrit la granularité ?',jsonb_build_array('A) Le niveau exact d’une ligne de faits','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Entrepôt analytique','Le niveau exact d’une ligne de faits est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Mélanger plusieurs grains.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Entrepôt analytique','Mélanger plusieurs grains est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Entrepôt analytique ?',jsonb_build_array('A) Définir le grain avant les mesures','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Entrepôt analytique','Il faut définir le grain avant les mesures.'),(4,'mini_challenge','Quelle affirmation est correcte pour Entrepôt analytique ?',jsonb_build_array('A) Une SCD Type 2 conserve l’historique','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Entrepôt analytique','Une SCD Type 2 conserve l’historique.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=7
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quelle fonction déclare une dépendance de modèle ?',jsonb_build_array('A) ref()','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','dbt','ref() est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Référencer les tables physiques en dur.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','dbt','Référencer les tables physiques en dur est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en dbt ?',jsonb_build_array('A) Séparer staging, intermediate et marts','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','dbt','Il faut séparer staging, intermediate et marts.'),(4,'mini_challenge','Quelle affirmation est correcte pour dbt ?',jsonb_build_array('A) dbt build exécute modèles et tests','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','dbt','dbt build exécute modèles et tests.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=8
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel objet décrit un workflow ?',jsonb_build_array('A) Un DAG','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Airflow','Un DAG est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Exécuter du réseau au parsing.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Airflow','Exécuter du réseau au parsing est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Airflow ?',jsonb_build_array('A) Créer des tâches idempotentes','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Airflow','Il faut créer des tâches idempotentes.'),(4,'mini_challenge','Quelle affirmation est correcte pour Airflow ?',jsonb_build_array('A) Le mode reschedule libère un worker de sensor','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Airflow','Le mode reschedule libère un worker de sensor.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=9
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel mécanisme persiste PostgreSQL ?',jsonb_build_array('A) Un volume Docker','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Docker','Un volume Docker est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Copier .env dans l’image.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Docker','Copier .env dans l’image est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Docker ?',jsonb_build_array('A) Utiliser healthchecks et versions épinglées','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Docker','Il faut utiliser healthchecks et versions épinglées.'),(4,'mini_challenge','Quelle affirmation est correcte pour Docker ?',jsonb_build_array('A) depends_on ne garantit pas que le service soit prêt','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Docker','depends_on ne garantit pas que le service soit prêt.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=10
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel identifiant relie les logs d’une exécution ?',jsonb_build_array('A) Le batch_id','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Observabilité','Le batch_id est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Alerter sans contexte.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Observabilité','Alerter sans contexte est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Observabilité ?',jsonb_build_array('A) Mesurer volume, durée, erreurs et fraîcheur','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Observabilité','Il faut mesurer volume, durée, erreurs et fraîcheur.'),(4,'mini_challenge','Quelle affirmation est correcte pour Observabilité ?',jsonb_build_array('A) Un runbook décrit diagnostic et reprise','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Observabilité','Un runbook décrit diagnostic et reprise.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (1,'qcm','Quel fichier ne doit jamais être versionné ?',jsonb_build_array('A) Un vrai fichier .env','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Industrialisation','Un vrai fichier .env est la réponse attendue.'),(2,'true_false','Cette pratique est correcte : Utiliser des données réelles en CI.',jsonb_build_array('A) Faux','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','debutant','Industrialisation','Utiliser des données réelles en CI est une mauvaise pratique.'),(3,'comprehension','Quelle bonne pratique faut-il appliquer en Industrialisation ?',jsonb_build_array('A) Tester Python, SQL, dbt et migrations','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','Industrialisation','Il faut tester python, sql, dbt et migrations.'),(4,'mini_challenge','Quelle affirmation est correcte pour Industrialisation ?',jsonb_build_array('A) Un owner doit être attribué à chaque dataset','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','avance','Industrialisation','Un owner doit être attribué à chaque dataset.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
 SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (VALUES (101,'qcm','Quelle couche doit rester immuable ?',jsonb_build_array('A) La zone raw','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','La zone raw est la réponse attendue.'),(102,'qcm','Quel format convient aux lectures analytiques colonnaires ?',jsonb_build_array('A) Parquet','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Parquet est la réponse attendue.'),(103,'qcm','Quelle clause PostgreSQL rend un chargement idempotent ?',jsonb_build_array('A) ON CONFLICT','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','ON CONFLICT est la réponse attendue.'),(104,'qcm','Quel document formalise les attentes entre producteur et consommateur ?',jsonb_build_array('A) Un contrat de données','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Un contrat de données est la réponse attendue.'),(105,'qcm','Quel mécanisme pilote un chargement incrémental ?',jsonb_build_array('A) Un watermark','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Un watermark est la réponse attendue.'),(106,'qcm','Quelle zone conserve les lignes rejetées ?',jsonb_build_array('A) La quarantaine','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','La quarantaine est la réponse attendue.'),(107,'qcm','Quel modèle analytique relie faits et dimensions ?',jsonb_build_array('A) Le schéma en étoile','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Le schéma en étoile est la réponse attendue.'),(108,'qcm','Quelle commande dbt exécute modèles et tests ?',jsonb_build_array('A) dbt build','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','dbt build est la réponse attendue.'),(109,'qcm','Quel composant Airflow organise les dépendances ?',jsonb_build_array('A) Un DAG','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Un DAG est la réponse attendue.'),(110,'qcm','Quel objet Docker persiste les données ?',jsonb_build_array('A) Un volume','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Un volume est la réponse attendue.'),(111,'qcm','Quelle métrique mesure le retard des données ?',jsonb_build_array('A) La fraîcheur','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','La fraîcheur est la réponse attendue.'),(112,'qcm','Quel contrôle protège les secrets ?',jsonb_build_array('A) Les injecter via un gestionnaire de secrets','B) Une règle sans rapport','C) Le jeu de test','D) Aucune validation'),'A','intermediaire','synthèse','Les injecter via un gestionnaire de secrets est la réponse attendue.'))
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,TRUE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
 question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
 answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
 explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=TRUE;


DO $$
DECLARE quiz_count INT; final_count INT; module_coverage INT; active_count INT; duplicate_orders INT; invalid_types INT;
BEGIN
 SELECT COUNT(*) FILTER (WHERE q.is_final_test=FALSE),
        COUNT(*) FILTER (WHERE q.is_final_test=TRUE),
        COUNT(DISTINCT m.id),
        COUNT(*) FILTER (WHERE q.is_active),
        COUNT(*) FILTER (WHERE q.question_type NOT IN ('qcm','true_false','comprehension','mini_challenge'))
 INTO quiz_count,final_count,module_coverage,active_count,invalid_types
 FROM public.quiz_questions q
 JOIN public.modules m ON m.id=q.module_id
 JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='data-engineering-python-sql';

 SELECT COUNT(*) INTO duplicate_orders FROM (
   SELECT q.module_id,q.order_index
   FROM public.quiz_questions q
   JOIN public.modules m ON m.id=q.module_id
   JOIN public.courses c ON c.id=m.course_id
   WHERE c.slug='data-engineering-python-sql'
   GROUP BY q.module_id,q.order_index HAVING COUNT(*)>1
 ) d;

 IF quiz_count<>48 OR final_count<>12 OR module_coverage<>12 OR active_count<>0 OR duplicate_orders<>0 OR invalid_types<>0 THEN
   RAISE EXCEPTION 'Chantier 5 Data Engineering incomplet: quiz %, final %, modules %, actifs %, doublons %, types invalides %',
   quiz_count,final_count,module_coverage,active_count,duplicate_orders,invalid_types;
 END IF;
END $$;
