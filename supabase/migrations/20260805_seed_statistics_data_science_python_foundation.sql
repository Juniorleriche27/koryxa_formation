-- KORYXA FORMATION — STATISTIQUES & DATA SCIENCE AVEC PYTHON — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'statistics-data-science-python',
    'Statistiques & Data Science avec Python',
    'Statistiques & Data Science',
    'Parcours professionnel pour comprendre les méthodes statistiques, explorer les données, construire des modèles explicatifs et produire des recommandations métier avec Python.',
    'Data analysts, professionnels Excel, SQL, Power BI ou Python, contrôleurs, financiers, responsables commerciaux et profils métier souhaitant renforcer leur raisonnement statistique et passer vers la data science.',
    '["Maîtriser les bases de Python", "Savoir manipuler des tableaux de données avec pandas", "Comprendre les opérations mathématiques courantes", "Avoir terminé Python Data Analyst ou posséder un niveau équivalent"]'::jsonb,
    '["Produire une analyse statistique descriptive fiable", "Comprendre les probabilités et distributions", "Construire un échantillonnage et un intervalle de confiance", "Réaliser des tests d’hypothèses", "Analyser corrélation et causalité avec prudence", "Construire et interpréter une régression", "Segmenter des clients", "Prévoir une série temporelle", "Évaluer un modèle", "Communiquer des résultats métier reproductibles"]'::jsonb,
    62,
    'Prévision des ventes et segmentation des clients avec Python',
    'Projet autonome estimé à 20 heures : préparation et audit des données, analyse statistique, segmentation KMeans, prévision temporelle, évaluation des modèles, notebook reproductible et recommandations métier responsables.',
    FALSE,
    5
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
    SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Fondations du raisonnement statistique','Population, échantillon, variables, types de données, biais, causalité et démarche scientifique.','2h30',2.5,
     '["Distinguer population et échantillon", "Identifier les types de variables", "Reconnaître biais et confusion"]'::jsonb,
     '["Bases de Python et pandas"]'::jsonb,'["raisonnement statistique", "types de variables", "biais"]'::jsonb,'Question statistique cadrée','Transformer une problématique métier en question statistique testable.',TRUE),
    (1,'Statistiques descriptives avec Python','Mesures de tendance centrale, dispersion, position, forme et synthèse avec pandas et NumPy.','3h00',3.0,
     '["Calculer les statistiques descriptives", "Comparer moyenne et médiane", "Interpréter dispersion et asymétrie"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["pandas", "NumPy", "statistiques descriptives"]'::jsonb,'Portrait statistique','Créer une synthèse descriptive complète d’un jeu de données commercial.',TRUE),
    (2,'Visualiser les distributions','Histogrammes, boxplots, densité, valeurs atypiques, transformations et lecture critique des graphiques.','3h00',3.0,
     '["Choisir une visualisation adaptée", "Repérer les valeurs atypiques", "Interpréter une distribution"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["Matplotlib", "distributions", "outliers"]'::jsonb,'Distribution expliquée','Construire et commenter plusieurs visualisations d’une variable métier.',TRUE),
    (3,'Probabilités et variables aléatoires','Probabilités conditionnelles, indépendance, espérance, variance et lois usuelles.','3h00',3.0,
     '["Calculer une probabilité conditionnelle", "Comprendre indépendance et dépendance", "Reconnaître les lois usuelles"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["probabilités", "loi binomiale", "loi normale"]'::jsonb,'Risque quantifié','Modéliser une situation métier simple avec une loi de probabilité.',TRUE),
    (4,'Échantillonnage et estimation','Méthodes d’échantillonnage, erreur standard, bootstrap et intervalles de confiance.','3h00',3.0,
     '["Construire un échantillon cohérent", "Calculer une erreur standard", "Interpréter un intervalle de confiance"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["échantillonnage", "bootstrap", "intervalle de confiance"]'::jsonb,'Estimation défendable','Estimer un indicateur client avec intervalle de confiance et bootstrap.',TRUE),
    (5,'Tests d’hypothèses','Hypothèses nulle et alternative, p-value, erreurs de type I et II, puissance et choix du test.','3h30',3.5,
     '["Formuler des hypothèses", "Choisir un test adapté", "Interpréter une p-value sans surinterprétation"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["tests statistiques", "p-value", "puissance"]'::jsonb,'Décision statistique','Tester si une campagne ou un changement produit un effet mesurable.',TRUE),
    (6,'Comparer des groupes','Tests t, Mann-Whitney, ANOVA, chi-deux, tailles d’effet et comparaisons multiples.','3h30',3.5,
     '["Comparer deux ou plusieurs groupes", "Mesurer une taille d’effet", "Contrôler les comparaisons multiples"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["test t", "ANOVA", "chi-deux", "taille d’effet"]'::jsonb,'Groupes comparés','Comparer les performances de segments ou régions avec le bon test.',TRUE),
    (7,'Corrélation et régression linéaire','Covariance, Pearson, Spearman, régression simple et multiple, hypothèses et interprétation.','4h00',4.0,
     '["Mesurer une association", "Construire une régression linéaire", "Interpréter coefficients et diagnostics"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["corrélation", "régression", "statsmodels"]'::jsonb,'Facteurs explicatifs','Identifier les facteurs liés aux ventes et quantifier leur contribution.',TRUE),
    (8,'Segmentation des clients','Préparation des variables, standardisation, K-means, choix du nombre de groupes et profilage.','4h00',4.0,
     '["Préparer des variables de segmentation", "Appliquer K-means", "Profiler et nommer les segments"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["segmentation", "K-means", "scikit-learn"]'::jsonb,'Segments activables','Créer des segments clients compréhensibles et exploitables par le métier.',TRUE),
    (9,'Prévision des ventes','Séries temporelles, tendance, saisonnalité, validation temporelle, baseline et modèles de prévision.','4h30',4.5,
     '["Décomposer une série temporelle", "Créer une baseline", "Évaluer une prévision sans fuite de données"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["time series", "forecasting", "validation temporelle"]'::jsonb,'Prévision évaluée','Construire une prévision de ventes et mesurer son erreur.',TRUE),
    (10,'Évaluer et interpréter les modèles','Séparation train/test, validation croisée, métriques, surapprentissage, importance et limites.','4h00',4.0,
     '["Choisir une métrique adaptée", "Détecter le surapprentissage", "Interpréter les limites d’un modèle"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["évaluation", "cross-validation", "overfitting"]'::jsonb,'Modèle contrôlé','Comparer plusieurs modèles et justifier le choix final.',TRUE),
    (11,'Communiquer une étude data science','Reproductibilité, notebook professionnel, narration analytique, recommandations, éthique et remise du projet.','4h00',4.0,
     '["Structurer une étude reproductible", "Présenter les résultats à un public métier", "Documenter limites et risques"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["storytelling data", "reproductibilité", "éthique"]'::jsonb,'Projet final prêt','Livrer une étude complète de prévision des ventes et segmentation client.',TRUE)
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
    WHERE c.slug='statistics-data-science-python';
    IF module_count<>12 OR hour_total<>42 OR published_count<>0 THEN
        RAISE EXCEPTION 'Fondation Statistiques & Data Science incomplète: modules %, heures %, publiés %', module_count, hour_total, published_count;
    END IF;
END $$;
