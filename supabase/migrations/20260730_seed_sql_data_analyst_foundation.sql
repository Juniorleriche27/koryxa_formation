-- KORYXA FORMATION — SQL DATA ANALYST AVEC POSTGRESQL — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'sql-data-analyst',
    'SQL Data Analyst avec PostgreSQL',
    'SQL Data Analyst',
    'Parcours professionnel pour interroger, structurer et analyser des données avec SQL et PostgreSQL.',
    'Débutants, professionnels Excel ou Power BI, analystes, contrôleurs, commerciaux, financiers et responsables opérationnels souhaitant maîtriser les bases de données relationnelles.',
    '["Savoir utiliser un ordinateur", "Des bases en tableur sont utiles mais non obligatoires", "Aucune expérience préalable en programmation ou base de données requise"]'::jsonb,
    '["Comprendre les bases relationnelles", "Écrire des requêtes SELECT fiables", "Filtrer, trier et agréger les données", "Utiliser les jointures", "Créer des sous-requêtes et CTE", "Utiliser les fonctions de fenêtre", "Construire des vues analytiques", "Optimiser et sécuriser des requêtes", "Connecter PostgreSQL à Power BI"]'::jsonb,
    26,
    'Analyse commerciale d’une base PostgreSQL',
    'Un projet complet comprenant la conception d’une base relationnelle, l’import de données clients, produits et ventes, des requêtes analytiques, des vues, des fonctions de fenêtre, une connexion Power BI et des recommandations métier.',
    FALSE,
    4
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
    SELECT id FROM public.courses WHERE slug = 'sql-data-analyst'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Découvrir SQL et PostgreSQL','Rôle de SQL, bases relationnelles, tables, lignes, colonnes, clés et prise en main de PostgreSQL.','1h30',1.5,
     '["Comprendre le rôle de SQL", "Identifier les éléments d’une base relationnelle", "Exécuter une première requête"]'::jsonb,
     '[]'::jsonb,'["SQL", "PostgreSQL", "bases relationnelles"]'::jsonb,'Première requête SQL','Explorer une base commerciale et exécuter des requêtes simples.',TRUE),
    (1,'Sélectionner, filtrer et trier','SELECT, alias, DISTINCT, WHERE, opérateurs, BETWEEN, IN, LIKE, NULL et ORDER BY.','2h00',2,
     '["Sélectionner les colonnes utiles", "Filtrer avec précision", "Trier et dédupliquer les résultats"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["SELECT", "WHERE", "ORDER BY"]'::jsonb,'Extraction fiable','Produire une liste clients filtrée, triée et sans doublons.',TRUE),
    (2,'Calculer et transformer les valeurs','Expressions, opérateurs, CASE, COALESCE, CAST, fonctions texte, numériques et dates.','2h00',2,
     '["Créer des colonnes calculées", "Gérer les valeurs nulles", "Transformer textes, nombres et dates"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["CASE", "COALESCE", "CAST", "fonctions"]'::jsonb,'Colonnes métier','Calculer montants, marges, catégories et statuts à partir des données brutes.',TRUE),
    (3,'Agréger les données','COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING et agrégations conditionnelles.','2h00',2,
     '["Construire des indicateurs agrégés", "Regrouper par dimensions métier", "Filtrer les groupes avec HAVING"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["agrégations", "GROUP BY", "HAVING"]'::jsonb,'KPI SQL','Calculer chiffre d’affaires, marge, panier moyen et volumes par période.',TRUE),
    (4,'Relier les tables avec les jointures','INNER, LEFT, RIGHT et FULL JOIN, clés, cardinalité, doublons et contrôles de jointure.','2h30',2.5,
     '["Choisir la jointure adaptée", "Relier faits et dimensions", "Contrôler les pertes et duplications"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["JOIN", "clés", "cardinalité"]'::jsonb,'Analyse multi-tables','Relier ventes, clients, produits et régions sans fausser les résultats.',TRUE),
    (5,'Utiliser les sous-requêtes','Sous-requêtes scalaires, corrélées, IN, EXISTS et comparaison à des agrégats.','2h00',2,
     '["Écrire des sous-requêtes lisibles", "Utiliser EXISTS", "Comparer une ligne à un agrégat"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["sous-requêtes", "EXISTS", "corrélation"]'::jsonb,'Analyse contextuelle','Identifier les clients et produits au-dessus de leur moyenne de référence.',TRUE),
    (6,'Structurer les analyses avec les CTE','WITH, CTE multiples, récursivité introductive et décomposition des requêtes complexes.','2h00',2,
     '["Découper une analyse complexe", "Réutiliser des résultats intermédiaires", "Améliorer la lisibilité"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["CTE", "WITH", "lisibilité"]'::jsonb,'Pipeline analytique SQL','Construire une analyse en plusieurs étapes avec des CTE nommées.',TRUE),
    (7,'Analyser avec les fonctions de fenêtre','OVER, PARTITION BY, ORDER BY, ROW_NUMBER, RANK, LAG, LEAD et cumuls.','2h30',2.5,
     '["Classer les résultats", "Calculer des cumuls", "Comparer périodes et lignes voisines"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["window functions", "ranking", "LAG", "cumul"]'::jsonb,'Analyse avancée','Produire classement, cumul mensuel et évolution par rapport à la période précédente.',TRUE),
    (8,'Créer des vues analytiques','CREATE VIEW, vues matérialisées, dépendances, actualisation et exposition des données.','2h00',2,
     '["Créer une vue réutilisable", "Choisir entre vue et vue matérialisée", "Documenter les dépendances"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["VIEW", "materialized view", "réutilisation"]'::jsonb,'Couche analytique','Créer des vues prêtes pour le reporting et les outils BI.',TRUE),
    (9,'Modifier les données en sécurité','INSERT, UPDATE, DELETE, transactions, COMMIT, ROLLBACK, contraintes et contrôles.','2h00',2,
     '["Modifier les données avec prudence", "Utiliser une transaction", "Protéger l’intégrité des tables"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["transactions", "INSERT", "UPDATE", "DELETE"]'::jsonb,'Chargement contrôlé','Importer et corriger des données dans une transaction vérifiable.',TRUE),
    (10,'Optimiser et sécuriser les requêtes','EXPLAIN, index, plans d’exécution, permissions, rôles et bonnes pratiques de performance.','2h30',2.5,
     '["Lire un plan simple", "Choisir un index utile", "Appliquer le principe du moindre privilège"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["EXPLAIN", "index", "rôles", "performance"]'::jsonb,'Requête optimisée','Diagnostiquer une requête lente et proposer une amélioration mesurable.',TRUE),
    (11,'Connecter PostgreSQL à Power BI','Préparation des vues, connexion, requêtes natives, actualisation, qualité et remise du projet.','3h00',3,
     '["Préparer une couche SQL pour Power BI", "Connecter et actualiser les données", "Présenter des recommandations métier"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["PostgreSQL", "Power BI", "reporting", "documentation"]'::jsonb,'Projet final prêt','Connecter les vues PostgreSQL à Power BI et livrer une analyse commerciale complète.',TRUE)
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
DECLARE module_count INT; hour_total NUMERIC; published_count INT;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(m.estimated_hours),0), COUNT(*) FILTER (WHERE m.is_published)
    INTO module_count, hour_total, published_count
    FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst';
    IF module_count<>12 OR hour_total<>26 OR published_count<>0 THEN
        RAISE EXCEPTION 'Fondation SQL incomplète: modules %, heures %, publiés %', module_count, hour_total, published_count;
    END IF;
END $$;
