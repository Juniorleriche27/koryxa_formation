-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 1
-- Fondation du parcours uniquement. Le cours et les modules restent non publiés.

INSERT INTO public.courses (
    slug, title, short_title, description, audience, prerequisites, skills,
    estimated_hours, final_project_title, final_project_description,
    is_published, order_index
)
VALUES (
    'machine-learning-python',
    'Machine Learning avec Python',
    'Machine Learning Python',
    'Parcours professionnel pour préparer les données, construire, comparer, interpréter et valider des modèles de Machine Learning avec Python et scikit-learn.',
    'Data analysts, profils statistiques, développeurs Python, professionnels BI et apprenants souhaitant passer de l’analyse descriptive à la modélisation prédictive fiable.',
    '["Maîtriser Python, pandas et NumPy", "Comprendre les statistiques descriptives et les probabilités", "Savoir manipuler des jeux de données tabulaires", "Avoir terminé Statistiques & Data Science avec Python ou posséder un niveau équivalent"]'::jsonb,
    '["Construire un workflow Machine Learning reproductible", "Préparer les données sans fuite", "Créer des variables pertinentes", "Entraîner des modèles de régression et de classification", "Utiliser arbres et méthodes d’ensemble", "Gérer les classes déséquilibrées", "Construire des pipelines scikit-learn", "Optimiser les hyperparamètres", "Interpréter les prédictions", "Analyser les erreurs et limites", "Sélectionner un modèle selon les coûts métier", "Présenter un modèle de manière responsable"]'::jsonb,
    60,
    'Prédiction du churn client avec Python',
    'Projet autonome estimé à 16 heures : préparation des données, feature engineering, comparaison de modèles, gestion du déséquilibre, optimisation, interprétation, analyse des erreurs et recommandations métier.',
    FALSE,
    6
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
    SELECT id FROM public.courses WHERE slug = 'machine-learning-python'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Workflow professionnel du Machine Learning','Problème métier, cible, données, baseline, protocole expérimental et risques de fuite.','3h00',3.0,
     '["Transformer un besoin métier en problème ML", "Définir une baseline", "Structurer un protocole expérimental"]'::jsonb,
     '["Python, pandas et statistiques de base"]'::jsonb,'["cadrage ML", "baseline", "data leakage"]'::jsonb,'Problème ML cadré','Définir une cible, une métrique et une baseline pour un cas de churn.',TRUE),
    (1,'Préparation des données pour le ML','Valeurs manquantes, variables catégorielles, outliers, découpage et transformations.','3h30',3.5,
     '["Préparer des données tabulaires", "Éviter les fuites", "Choisir les transformations adaptées"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["imputation", "encodage", "prétraitement"]'::jsonb,'Jeu de données prêt','Construire une préparation traçable pour un jeu de données client.',TRUE),
    (2,'Feature engineering','Création, sélection et transformation de variables numériques, catégorielles et temporelles.','3h30',3.5,
     '["Créer des variables utiles", "Réduire la redondance", "Documenter les choix de représentation"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["feature engineering", "sélection de variables", "transformation"]'::jsonb,'Variables enrichies','Créer un jeu de variables explicables pour la prédiction du churn.',TRUE),
    (3,'Régression supervisée','Régression linéaire, régularisation, arbres de régression et métriques.','3h30',3.5,
     '["Comparer plusieurs modèles de régression", "Choisir MAE, RMSE ou R2", "Diagnostiquer les erreurs"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["régression", "Ridge", "Lasso", "métriques"]'::jsonb,'Régression comparée','Comparer une baseline, une régression régularisée et un arbre.',TRUE),
    (4,'Classification supervisée','Régression logistique, arbres, probabilités, seuils et matrice de confusion.','4h00',4.0,
     '["Entraîner un classifieur", "Interpréter les probabilités", "Choisir un seuil métier"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["classification", "logistic regression", "seuil"]'::jsonb,'Classifieur initial','Construire un modèle de churn et justifier son seuil de décision.',TRUE),
    (5,'Arbres et méthodes d’ensemble','Decision Tree, Random Forest, Gradient Boosting et comparaison biais-variance.','4h00',4.0,
     '["Comprendre les arbres", "Utiliser bagging et boosting", "Comparer complexité et généralisation"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["Decision Tree", "Random Forest", "Gradient Boosting"]'::jsonb,'Ensembles comparés','Comparer plusieurs ensembles sur un protocole commun.',TRUE),
    (6,'Classes déséquilibrées et coûts métier','Stratification, pondération, rééchantillonnage, précision, rappel et PR-AUC.','4h00',4.0,
     '["Diagnostiquer un déséquilibre", "Choisir une métrique adaptée", "Intégrer les coûts d’erreur"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["class imbalance", "precision-recall", "class_weight"]'::jsonb,'Décision coût-sensible','Choisir un seuil de churn selon les coûts de faux positifs et faux négatifs.',TRUE),
    (7,'Pipelines et validation sans fuite','Pipeline, ColumnTransformer, validation croisée et transformations par fold.','4h00',4.0,
     '["Construire un pipeline complet", "Valider sans contamination", "Rendre les expériences reproductibles"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["Pipeline", "ColumnTransformer", "cross-validation"]'::jsonb,'Pipeline reproductible','Encapsuler préparation et modèle dans un pipeline scikit-learn.',TRUE),
    (8,'Optimisation des hyperparamètres','Grid search, random search, validation imbriquée et budget de calcul.','4h00',4.0,
     '["Définir un espace de recherche", "Optimiser sans surajuster", "Comparer coût et gain"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["GridSearchCV", "RandomizedSearchCV", "nested CV"]'::jsonb,'Modèle optimisé','Optimiser un modèle en conservant un jeu de test final verrouillé.',TRUE),
    (9,'Interprétabilité des modèles','Coefficients, permutation importance, PDP, SHAP et prudence causale.','4h00',4.0,
     '["Expliquer globalement un modèle", "Expliquer une prédiction", "Distinguer importance et causalité"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["permutation importance", "PDP", "SHAP"]'::jsonb,'Modèle expliqué','Produire une explication globale et locale d’un modèle de churn.',TRUE),
    (10,'Analyse des erreurs et robustesse','Segments d’erreur, calibration, stabilité, dérive potentielle et limites d’usage.','3h30',3.5,
     '["Analyser les erreurs par sous-groupe", "Évaluer la calibration", "Documenter les limites"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["error analysis", "calibration", "robustesse"]'::jsonb,'Risques documentés','Identifier les populations mal servies et proposer des garde-fous.',TRUE),
    (11,'Sélection finale et restitution métier','Comparaison finale, model card, recommandations, éthique et préparation du projet.','3h00',3.0,
     '["Sélectionner un modèle selon plusieurs critères", "Rédiger une model card", "Présenter une recommandation responsable"]'::jsonb,
     '["Module 10 validé"]'::jsonb,'["model selection", "model card", "éthique"]'::jsonb,'Projet final cadré','Livrer le dossier de décision du modèle de churn.',TRUE)
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
    WHERE c.slug='machine-learning-python';

    SELECT estimated_hours INTO course_hours
    FROM public.courses WHERE slug='machine-learning-python';

    IF module_count<>12 OR hour_total<>44 OR published_count<>0 OR course_hours<>60 THEN
        RAISE EXCEPTION 'Fondation Machine Learning incomplète: modules %, heures modules %, publiés %, heures cours %', module_count, hour_total, published_count, course_hours;
    END IF;
END $$;
