-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'power-bi-data-analyst',
    'Power BI Data Analyst',
    'Power BI Data',
    'Parcours professionnel pour préparer, modéliser, analyser et publier des données avec Power BI.',
    'Débutants, professionnels Excel, analystes, contrôleurs, commerciaux, financiers et responsables opérationnels souhaitant construire des rapports décisionnels fiables.',
    '["Savoir utiliser un ordinateur", "Des bases en Excel sont utiles mais non obligatoires", "Aucune expérience préalable avec Power BI requise"]'::jsonb,
    '["Préparer des données avec Power Query", "Construire un modèle en étoile", "Créer une table calendrier", "Écrire des mesures DAX", "Concevoir des rapports interactifs", "Publier dans Power BI Service", "Configurer la sécurité RLS", "Optimiser et documenter un rapport"]'::jsonb,
    32,
    'Dashboard de pilotage commercial avec Power BI',
    'Un rapport Power BI complet intégrant plusieurs sources, Power Query, modèle en étoile, mesures DAX, visualisations interactives, sécurité RLS, publication et recommandations métier.',
    FALSE,
    3
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
    SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Découvrir Power BI','Power BI Desktop, Power BI Service, interface, vues, rapports, modèles et premier import.','2h00',2,
     '["Comprendre l’écosystème Power BI", "Naviguer dans Power BI Desktop", "Importer une première source"]'::jsonb,
     '[]'::jsonb,'["Power BI Desktop", "Power BI Service", "workflow"]'::jsonb,'Premier rapport Power BI','Importer un fichier Excel et identifier les principales vues de Power BI Desktop.',TRUE),
    (1,'Préparer les données avec Power Query','Connexion à Excel et CSV, types, nettoyage, filtres, valeurs nulles et erreurs.','2h30',2.5,
     '["Connecter plusieurs sources", "Définir les types", "Nettoyer les valeurs manquantes et erreurs"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["Power Query", "nettoyage", "types"]'::jsonb,'Requête propre et documentée','Importer et nettoyer une table de ventes avec des étapes reproductibles.',TRUE),
    (2,'Transformer et consolider plusieurs sources','Ajout, fusion, jointures, combinaison de fichiers et colonnes conditionnelles.','3h00',3,
     '["Combiner plusieurs fichiers", "Choisir une jointure adaptée", "Créer des transformations reproductibles"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["fusion", "jointures", "consolidation"]'::jsonb,'Pipeline multi-sources','Consolider plusieurs fichiers mensuels et enrichir les données avec des référentiels.',TRUE),
    (3,'Construire un modèle de données','Table de faits, dimensions, modèle en étoile, relations, cardinalité et filtres.','3h00',3,
     '["Identifier faits et dimensions", "Créer des relations cohérentes", "Éviter les ambiguïtés de modèle"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["modèle en étoile", "relations", "cardinalité"]'::jsonb,'Modèle analytique fiable','Construire un modèle avec ventes, produits, clients, régions et commerciaux.',TRUE),
    (4,'Créer une table calendrier','Dimension Date, année, trimestre, mois, semaine, tri et relations temporelles.','2h00',2,
     '["Créer une table calendrier", "Définir les colonnes temporelles", "Relier correctement les dates"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["table calendrier", "dates", "tri"]'::jsonb,'Dimension Date complète','Créer et relier une table calendrier exploitable pour les analyses temporelles.',TRUE),
    (5,'Introduction à DAX','Colonnes calculées, mesures, SUM, COUNTROWS, DISTINCTCOUNT, DIVIDE, VAR et contextes.','3h00',3,
     '["Différencier colonne et mesure", "Écrire des mesures simples", "Comprendre les contextes de filtre et de ligne"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["DAX", "mesures", "contextes"]'::jsonb,'Premières mesures DAX','Créer des mesures de volume, chiffre d’affaires, marge et clients distincts.',TRUE),
    (6,'DAX pour les KPI métier','CA, marge, panier moyen, taux de conversion, objectifs, écarts et mesures dynamiques.','3h00',3,
     '["Construire des KPI fiables", "Comparer résultats et objectifs", "Centraliser la logique métier"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["KPI", "CALCULATE", "objectifs"]'::jsonb,'Dictionnaire de KPI','Créer un ensemble de mesures cohérentes pour le pilotage commercial.',TRUE),
    (7,'Analyse temporelle avec DAX','Cumul, période précédente, évolution, année précédente, CALCULATE et Time Intelligence.','3h00',3,
     '["Comparer plusieurs périodes", "Créer des cumuls", "Analyser les évolutions temporelles"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["Time Intelligence", "comparaisons", "cumul"]'::jsonb,'Analyse temporelle complète','Construire des mesures mensuelles, cumulées et comparatives.',TRUE),
    (8,'Concevoir des visualisations efficaces','Cartes KPI, barres, courbes, matrices, segments, drill-down, info-bulles et choix du visuel.','3h00',3,
     '["Choisir le bon visuel", "Créer une hiérarchie de lecture", "Configurer les interactions"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["visualisation", "segments", "drill-down"]'::jsonb,'Page d’analyse interactive','Créer une page répondant clairement à des questions métier prioritaires.',TRUE),
    (9,'Construire un rapport professionnel','Architecture, navigation, filtres synchronisés, interactions, thèmes et affichage mobile.','3h00',3,
     '["Structurer plusieurs pages", "Créer une navigation claire", "Préparer l’affichage mobile"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["rapport", "navigation", "mobile"]'::jsonb,'Rapport multi-pages','Assembler une expérience cohérente avec synthèse, analyse et détails.',TRUE),
    (10,'Power BI Service et collaboration','Publication, espaces de travail, partage, actualisation, passerelle, abonnements et alertes.','2h30',2.5,
     '["Publier un rapport", "Configurer un espace de travail", "Planifier l’actualisation et le partage"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["Power BI Service", "publication", "actualisation"]'::jsonb,'Rapport publié et partagé','Publier le rapport et documenter sa procédure d’actualisation.',TRUE),
    (11,'Sécurité, performance et qualité','RLS, rôles, optimisation, réduction du volume, contrôle, documentation et préparation production.','2h00',2,
     '["Configurer la sécurité RLS", "Optimiser le modèle", "Auditer et documenter un rapport"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["RLS", "performance", "qualité"]'::jsonb,'Rapport prêt pour production','Sécuriser, tester et documenter le rapport final.',TRUE)
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
