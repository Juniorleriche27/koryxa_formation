from pathlib import Path
import json

assets = [
    {"name":"01_schema_postgresql.sql","path":"/resources/sql-data-analyst/01_schema_postgresql.sql","purpose":"Schéma relationnel pédagogique"},
    {"name":"02_chargement_donnees.sql","path":"/resources/sql-data-analyst/02_chargement_donnees.sql","purpose":"Chargement des CSV avec psql"},
    {"name":"03_requetes_depart.sql","path":"/resources/sql-data-analyst/03_requetes_depart.sql","purpose":"Requêtes d’exploration et vue enrichie"},
    {"name":"04_solutions_reference.sql","path":"/resources/sql-data-analyst/04_solutions_reference.sql","purpose":"Corrigés de référence séparés"},
]
exercises = [
(0,'explorer-base-postgresql','Explorer une base PostgreSQL','guided','Installez le schéma pédagogique, inspectez les cinq tables et exécutez vos premières requêtes SELECT.','Un schéma formation_sql créé, cinq tables visibles et une requête retournant dix clients.',['Commencez par 01_schema_postgresql.sql.','Utilisez information_schema.tables pour inspecter le schéma.'],'Exécuter le schéma, charger les données, définir search_path puis interroger clients avec SELECT et LIMIT.',45),
(1,'filtrer-trier-clients','Filtrer et trier les clients','guided','Produisez une liste des clients PME ou Grand compte, situés dans deux régions choisies, triée par segment puis nom.','Une extraction sans doublon avec colonnes explicites, filtres corrects et tri stable.',['Utilisez IN pour plusieurs valeurs.','Ajoutez des parenthèses lorsque AND et OR se combinent.'],'Sélectionner code_client, client, segment et code_region, filtrer avec IN puis trier avec ORDER BY segment, client.',45),
(2,'calculer-statut-marge','Créer des colonnes métier','guided','À partir des ventes et produits, calculez chiffre d’affaires, marge et une catégorie de rentabilité avec CASE.','Une requête détaillée avec CA, marge et statut Fort, Moyen ou Faible.',['Joignez ventes et produits sur code_produit.','Calculez d’abord la marge avant CASE.'],'Créer une CTE ou une sous-requête calculant montant et marge, puis appliquer CASE sur la marge.',55),
(3,'kpi-par-region','Calculer les KPI par région','challenge','Calculez chiffre d’affaires, marge, quantité, nombre de ventes et clients actifs par région, puis filtrez les régions au-dessus d’un seuil.','Une ligne par région avec cinq KPI fiables, triée par chiffre d’affaires décroissant.',['Le grain final est la région.','Utilisez COUNT(DISTINCT code_client).'],'Joindre les tables ou utiliser ventes_enrichies, GROUP BY region, calculer les agrégats et filtrer avec HAVING.',60),
(4,'controler-jointures','Relier les tables sans fausser les résultats','debug','Construisez la vue ventes enrichies et démontrez qu’aucune vente n’est perdue ou multipliée lors des jointures.','Une vue enrichie de 120 lignes et un rapport de contrôle des clés orphelines.',['Comparez COUNT(*) avant et après jointure.','Utilisez LEFT JOIN puis WHERE clé_droite IS NULL pour les orphelins.'],'Créer la vue avec les clés primaires/étrangères, comparer les comptes et exécuter des anti-jointures pour chaque référentiel.',65),
(5,'clients-au-dessus-moyenne','Analyser avec des sous-requêtes','challenge','Identifiez les clients dont le chiffre d’affaires dépasse la moyenne des clients et ceux n’ayant jamais acheté.','Deux résultats : clients au-dessus de la moyenne et clients sans vente.',['Agrégerez d’abord par client.','NOT EXISTS est robuste pour détecter les absences.'],'Créer une sous-requête agrégeant le CA client, comparer chaque CA à AVG, puis utiliser NOT EXISTS pour les clients sans vente.',60),
(6,'pipeline-cte-objectifs','Construire un pipeline avec des CTE','challenge','Comparez le chiffre d’affaires mensuel aux objectifs avec plusieurs CTE nommées.','Un tableau mois, CA, objectif, écart et taux d’atteinte.',['Une CTE pour le CA mensuel, une pour les objectifs.','Utilisez NULLIF pour la division.'],'Créer ca_mensuel et objectifs_mensuels, les joindre sur le mois puis calculer écart et taux avec NULLIF.',65),
(7,'classement-cumul-evolution','Créer classements et cumuls','challenge','Classez les produits dans chaque catégorie et calculez le cumul mensuel ainsi que l’évolution par rapport au mois précédent.','Un classement par catégorie et une série mensuelle avec cumul et variation.',['Utilisez DENSE_RANK avec PARTITION BY categorie.','Utilisez LAG sur les agrégats mensuels.'],'Agrégérer les ventes, appliquer DENSE_RANK, puis créer une CTE mensuelle avec SUM OVER et LAG.',75),
(8,'vues-reporting','Créer des vues analytiques','guided','Créez une vue détaillée et une vue matérialisée mensuelle prêtes pour le reporting.','Une vue ventes_enrichies et une synthese_mensuelle matérialisée avec index utile.',['Évitez SELECT * dans une vue durable.','Documentez la stratégie de REFRESH.'],'Créer les deux objets, ajouter un index sur mois/région et tester REFRESH MATERIALIZED VIEW.',65),
(9,'transaction-import-correction','Modifier les données en sécurité','debug','Dans une transaction, insérez un produit de test, modifiez son prix, contrôlez RETURNING puis annulez les changements.','Une séquence BEGIN/INSERT/UPDATE/DELETE/ROLLBACK sans impact persistant.',['Exécutez SELECT avant UPDATE ou DELETE.','Utilisez RETURNING pour vérifier.'],'BEGIN, INSERT, UPDATE ... RETURNING, DELETE ... RETURNING, contrôles SELECT, puis ROLLBACK.',55),
(10,'explain-index-role','Optimiser et sécuriser','challenge','Analysez une requête avec EXPLAIN ANALYZE, créez un index pertinent et un rôle lecture_reporting limité aux vues.','Un plan comparatif avant/après et un rôle ne disposant que de SELECT sur les vues.',['Indexez les colonnes réellement filtrées ou jointes.','GRANT USAGE sur le schéma peut être nécessaire.'],'Mesurer le plan, créer un index composite adapté, remesurer, créer le rôle et accorder USAGE puis SELECT uniquement.',75),
(11,'postgresql-vers-power-bi','Préparer PostgreSQL pour Power BI','challenge','Préparez une vue finale pour Power BI, vérifiez le grain, les totaux, les types, les droits et la procédure d’actualisation.','Une vue ventes_power_bi documentée, contrôlée et accessible au rôle de lecture.',['Exposez seulement les colonnes utiles.','Comparez les totaux SQL avec ceux du rapport.'],'Créer la vue finale, accorder SELECT au rôle, contrôler COUNT/SUM, connecter Power BI et documenter Import ou DirectQuery.',80),
]
resources = [
(0,'postgresql-tutorial-start','Tutoriel PostgreSQL','Tutoriel officiel pour débuter avec PostgreSQL.','https://www.postgresql.org/docs/current/tutorial-start.html'),
(1,'postgresql-select','SELECT','Documentation officielle de la commande SELECT.','https://www.postgresql.org/docs/current/sql-select.html'),
(2,'postgresql-functions','Fonctions et opérateurs','Référence officielle des fonctions et opérateurs PostgreSQL.','https://www.postgresql.org/docs/current/functions.html'),
(3,'postgresql-aggregate','Fonctions d’agrégation','Référence officielle COUNT, SUM, AVG, MIN et MAX.','https://www.postgresql.org/docs/current/functions-aggregate.html'),
(4,'postgresql-queries-table-expressions','Jointures et expressions de table','Documentation officielle sur FROM, JOIN, WHERE, GROUP BY et HAVING.','https://www.postgresql.org/docs/current/queries-table-expressions.html'),
(5,'postgresql-subqueries','Sous-requêtes','Documentation officielle sur les expressions de sous-requêtes.','https://www.postgresql.org/docs/current/functions-subquery.html'),
(6,'postgresql-with','CTE avec WITH','Documentation officielle sur les requêtes WITH et récursives.','https://www.postgresql.org/docs/current/queries-with.html'),
(7,'postgresql-window','Fonctions de fenêtre','Tutoriel officiel sur les fonctions de fenêtre.','https://www.postgresql.org/docs/current/tutorial-window.html'),
(8,'postgresql-create-view','CREATE VIEW','Référence officielle pour créer des vues.','https://www.postgresql.org/docs/current/sql-createview.html'),
(9,'postgresql-transactions','Transactions','Tutoriel officiel sur BEGIN, COMMIT et ROLLBACK.','https://www.postgresql.org/docs/current/tutorial-transactions.html'),
(10,'postgresql-explain','EXPLAIN et performance','Documentation officielle sur l’utilisation d’EXPLAIN.','https://www.postgresql.org/docs/current/using-explain.html'),
(11,'postgresql-privileges','Privilèges et rôles','Documentation officielle sur les privilèges PostgreSQL.','https://www.postgresql.org/docs/current/ddl-priv.html'),
]

def esc(s): return s.replace("'", "''")
def j(v): return json.dumps(v, ensure_ascii=False).replace("'", "''")
rows=[]
for mo,slug,title,etype,brief,expected,hints,solution,minutes in exercises:
    starter = assets if mo in (0,4,8,11) else [assets[2], assets[3]]
    rows.append(f"    ({mo},'{slug}','{esc(title)}','{etype}','{esc(brief)}','{j(starter)}'::jsonb,'{esc(expected)}','{j(hints)}'::jsonb,'{esc(solution)}',{minutes})")
resrows=[]
for mo,slug,title,summary,url in resources:
    content=f"# Ressource officielle PostgreSQL\\n\\n[{title}]({url})"
    resrows.append(f"    ({mo},'{slug}','{esc(title)}','{esc(summary)}','{esc(content)}',{mo})")

sql=f"""-- KORYXA FORMATION — SQL DATA ANALYST AVEC POSTGRESQL — CHANTIER 3
-- Datasets, scripts, exercices guidés et ressources officielles. Tout reste non publié.

WITH course_row AS (
    SELECT id FROM public.courses WHERE slug='sql-data-analyst'
), module_rows AS (
    SELECT m.id,m.order_index FROM public.modules m JOIN course_row c ON c.id=m.course_id
), exercise_seed(module_order,slug,title,exercise_type,brief_md,starter_files,expected_result_md,hints,solution_md,estimated_minutes) AS (
    VALUES
{',\n'.join(rows)}
)
INSERT INTO public.exercises(course_id,module_id,slug,title,exercise_type,brief_md,starter_files,expected_result_md,hints,solution_md,order_index,estimated_minutes,is_published)
SELECT c.id,m.id,e.slug,e.title,e.exercise_type,e.brief_md,e.starter_files,e.expected_result_md,e.hints,e.solution_md,0,e.estimated_minutes,FALSE
FROM course_row c JOIN module_rows m ON TRUE JOIN exercise_seed e ON e.module_order=m.order_index
ON CONFLICT(course_id,slug) DO UPDATE SET
 module_id=EXCLUDED.module_id,title=EXCLUDED.title,exercise_type=EXCLUDED.exercise_type,brief_md=EXCLUDED.brief_md,
 starter_files=EXCLUDED.starter_files,expected_result_md=EXCLUDED.expected_result_md,hints=EXCLUDED.hints,
 solution_md=EXCLUDED.solution_md,estimated_minutes=EXCLUDED.estimated_minutes,is_published=FALSE;

WITH c AS (SELECT id FROM public.courses WHERE slug='sql-data-analyst'),
resources(module_order,slug,title,summary,content_md,ord) AS (
    VALUES
{',\n'.join(resrows)}
)
INSERT INTO public.theory_resources(course_id,module_id,slug,title,summary,content_md,resource_type,order_index,is_published)
SELECT c.id,m.id,r.slug,r.title,r.summary,r.content_md,'reference',r.ord,FALSE
FROM c JOIN resources r ON TRUE JOIN public.modules m ON m.course_id=c.id AND m.order_index=r.module_order
ON CONFLICT(course_id,slug) DO UPDATE SET
 module_id=EXCLUDED.module_id,title=EXCLUDED.title,summary=EXCLUDED.summary,content_md=EXCLUDED.content_md,
 resource_type=EXCLUDED.resource_type,order_index=EXCLUDED.order_index,is_published=FALSE;

DO $$
DECLARE exercise_count INT; resource_count INT; module_exercises INT; published_count INT;
BEGIN
 SELECT COUNT(*),COUNT(DISTINCT e.module_id),COUNT(*) FILTER (WHERE e.is_published)
 INTO exercise_count,module_exercises,published_count
 FROM public.exercises e JOIN public.courses c ON c.id=e.course_id WHERE c.slug='sql-data-analyst';
 SELECT COUNT(*) INTO resource_count FROM public.theory_resources r JOIN public.courses c ON c.id=r.course_id WHERE c.slug='sql-data-analyst';
 IF exercise_count<>12 OR module_exercises<>12 OR resource_count<>12 OR published_count<>0 THEN
  RAISE EXCEPTION 'Chantier 3 SQL incomplet: exercices %, modules %, ressources %, publiés %',exercise_count,module_exercises,resource_count,published_count;
 END IF;
END $$;
"""
Path('supabase/migrations/20260801_seed_sql_data_analyst_exercises_resources.sql').write_text(sql,encoding='utf-8')
print('generated exercises=12 resources=12')
