-- KORYXA FORMATION — EXCEL DATA ANALYST — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'excel-data-analyst',
    'Excel Data Analyst',
    'Excel Data',
    'Parcours professionnel pour nettoyer, analyser, automatiser et présenter des données avec Excel.',
    'Débutants, professionnels administratifs, commerciaux, financiers et futurs analystes souhaitant maîtriser Excel pour des usages métier.',
    '["Savoir utiliser un ordinateur", "Aucune expérience préalable en analyse de données requise"]'::jsonb,
    '["Structurer des données propres", "Écrire des formules fiables", "Utiliser les fonctions de recherche", "Construire des tableaux croisés dynamiques", "Transformer des données avec Power Query", "Créer un modèle de données", "Concevoir un dashboard professionnel"]'::jsonb,
    28,
    'Dashboard d’analyse commerciale avec Excel',
    'Un classeur complet intégrant import, nettoyage, modèle de données, KPI, tableaux croisés, dashboard interactif et recommandations métier.',
    FALSE,
    2
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
    SELECT id FROM public.courses WHERE slug = 'excel-data-analyst'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Prendre en main Excel','Interface, classeurs, feuilles, cellules, plages, types de données et références.','1h30',1.5,
     '["Naviguer dans un classeur", "Identifier les types de données", "Utiliser les références relatives et absolues"]'::jsonb,
     '[]'::jsonb,'["interface Excel", "références", "organisation"]'::jsonb,'Classeur propre et structuré','Créer un classeur organisé avec zones de saisie, calcul et synthèse.',TRUE),
    (1,'Calculs et formules essentielles','Opérateurs, SOMME, MOYENNE, MIN, MAX, SI, SIERREUR, ET, OU et pourcentages.','2h00',2,
     '["Écrire des formules fiables", "Combiner des conditions", "Gérer les erreurs de calcul"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["formules", "conditions", "pourcentages"]'::jsonb,'Feuille de calcul automatisée','Calculer marges, variations et statuts à partir de données commerciales.',TRUE),
    (2,'Organiser des données propres','Tableaux structurés, tri, filtres, doublons, validation et formats.','2h00',2,
     '["Transformer une plage en tableau", "Nettoyer les doublons", "Contrôler la qualité de saisie"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["tableaux structurés", "qualité", "validation"]'::jsonb,'Base propre et contrôlée','Nettoyer une base clients et mettre en place des contrôles de saisie.',TRUE),
    (3,'Fonctions de recherche','RECHERCHEX, RECHERCHEV, INDEX, EQUIV et recherches multicritères.','2h30',2.5,
     '["Retrouver une information dans une table", "Choisir la bonne fonction de recherche", "Gérer les valeurs absentes"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["RECHERCHEX", "INDEX", "EQUIV"]'::jsonb,'Référentiel connecté','Enrichir une table de ventes à partir de plusieurs référentiels.',TRUE),
    (4,'Manipuler le texte et les dates','Extraction, concaténation, nettoyage de texte et calculs de dates.','2h00',2,
     '["Extraire des segments de texte", "Nettoyer des libellés", "Calculer des délais et anciennetés"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["texte", "dates", "nettoyage"]'::jsonb,'Colonnes métier normalisées','Transformer des identifiants, noms et dates en colonnes exploitables.',TRUE),
    (5,'Analyse conditionnelle','SOMME.SI.ENS, NB.SI.ENS, MOYENNE.SI.ENS et indicateurs métiers.','2h00',2,
     '["Calculer des KPI par critère", "Segmenter une activité", "Construire des indicateurs robustes"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["SOMME.SI.ENS", "NB.SI.ENS", "KPI"]'::jsonb,'Tableau de KPI','Produire des indicateurs par région, produit et période.',TRUE),
    (6,'Tableaux croisés dynamiques','Création, regroupement, champs calculés, segments et chronologies.','2h30',2.5,
     '["Construire un tableau croisé", "Regrouper des dates", "Ajouter des filtres interactifs"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["TCD", "segments", "chronologies"]'::jsonb,'Analyse interactive','Créer une synthèse commerciale filtrable par période et catégorie.',TRUE),
    (7,'Graphiques et visualisation','Choix des graphiques, mise en forme, annotations et erreurs visuelles.','2h00',2,
     '["Choisir un graphique adapté", "Mettre en avant une conclusion", "Éviter les visualisations trompeuses"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["graphiques", "storytelling", "lisibilité"]'::jsonb,'Rapport visuel lisible','Transformer des KPI en graphiques clairs pour un décideur.',TRUE),
    (8,'Power Query','Import CSV et Excel, nettoyage, fusion, transformation et actualisation.','3h00',3,
     '["Importer plusieurs sources", "Automatiser le nettoyage", "Fusionner des fichiers"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["Power Query", "ETL", "actualisation"]'::jsonb,'Pipeline de préparation','Consolider automatiquement plusieurs fichiers mensuels.',TRUE),
    (9,'Modèle de données et Power Pivot','Relations, modèle en étoile, dimensions, mesures et introduction à DAX.','3h00',3,
     '["Créer des relations entre tables", "Construire un modèle en étoile", "Écrire des mesures simples"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["Power Pivot", "modèle en étoile", "DAX"]'::jsonb,'Modèle analytique','Relier ventes, produits, clients et calendrier dans un modèle cohérent.',TRUE),
    (10,'Dashboard professionnel','KPI, structure, filtres interactifs, design et lecture orientée décision.','3h00',3,
     '["Définir des KPI utiles", "Structurer un dashboard", "Guider la lecture d’un décideur"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["dashboard", "KPI", "design"]'::jsonb,'Dashboard métier','Assembler un tableau de bord commercial interactif.',TRUE),
    (11,'Automatisation et contrôle qualité','Formules dynamiques, plages nommées, protection, contrôles et introduction aux macros.','2h30',2.5,
     '["Sécuriser un classeur", "Détecter les erreurs", "Préparer un fichier partageable"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["automatisation", "contrôle qualité", "VBA"]'::jsonb,'Classeur final fiabilisé','Auditer, protéger et documenter le dashboard final.',TRUE)
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
