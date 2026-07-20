-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 6
-- Projet final, barème et jalons. Projet et jalons restent non publiés.

WITH c AS (
    SELECT id FROM public.courses WHERE slug='machine-learning-python'
)
INSERT INTO public.course_projects(
    course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,
    minimum_version,advanced_version,functional_criteria,technical_criteria,
    rubric,reference_solution_md,is_published
)
SELECT
    c.id,
    'prediction-churn-client-python',
    'Prédiction du churn client avec Python',
    'Construire un système de Machine Learning reproductible pour identifier les clients à risque de churn, comparer plusieurs modèles et recommander une stratégie de rétention responsable.',
    $brief$# Brief du projet final

Vous intervenez comme Machine Learning Data Scientist pour une entreprise de services par abonnement. L’équipe rétention souhaite prioriser ses actions vers les clients les plus susceptibles de résilier dans les 30 prochains jours.

Votre mission consiste à construire une étude complète et reproductible à partir du dataset pédagogique fourni. Vous devez cadrer la cible, auditer les données, préparer les variables sans fuite, créer des features métier, comparer plusieurs modèles, gérer le déséquilibre des classes, optimiser le meilleur candidat, interpréter ses prédictions et produire des recommandations métier.

## Livrables obligatoires

- un notebook principal exécutable de bout en bout ;
- un rapport d’audit des données ;
- une baseline explicite ;
- un pipeline scikit-learn complet ;
- une comparaison d’au moins trois familles de modèles ;
- une analyse du déséquilibre des classes ;
- un choix de seuil justifié par les coûts métier ;
- une analyse d’interprétabilité globale et locale ;
- une analyse des erreurs par sous-groupe ;
- une model card ;
- une synthèse exécutive avec recommandations, limites et plan de suivi.

## Question métier

Quels clients doivent être priorisés pour une action de rétention afin de maximiser le nombre de churns évités tout en contrôlant le coût des sollicitations inutiles ?

## Contraintes

- le jeu de test final reste verrouillé jusqu’à la sélection finale ;
- aucune transformation ne doit être apprise hors pipeline ;
- les métriques doivent être justifiées au regard des coûts métier ;
- aucune conclusion causale ne doit être tirée d’un modèle prédictif ;
- toute recommandation doit inclure ses limites et conditions d’usage.$brief$,
    $policy$# Politique des données

Le projet utilise uniquement les données synthétiques fournies par KORYXA. Aucune donnée personnelle réelle ne doit être ajoutée.

## Règles

- conserver `client_id` uniquement comme identifiant, jamais comme variable prédictive ;
- documenter les valeurs manquantes, exclusions et transformations ;
- empêcher toute fuite temporelle ou information postérieure à la date de prédiction ;
- ne pas utiliser de variable sensible réelle ;
- vérifier les performances par type de contrat et canal ;
- signaler les proxys potentiels et les risques de discrimination ;
- rendre les résultats reproductibles avec une graine et des dépendances explicites.$policy$,
    '[{"path":"/resources/machine-learning-python/clients_churn.csv","purpose":"Dataset principal de classification churn"},{"path":"/resources/machine-learning-python/notebooks/00_workflow_ml.ipynb","purpose":"Notebook de cadrage"},{"path":"/resources/machine-learning-python/notebooks/07_pipeline_validation.ipynb","purpose":"Notebook pipeline et validation"},{"path":"/resources/machine-learning-python/notebooks/09_interpretabilite.ipynb","purpose":"Notebook interprétabilité"},{"path":"/resources/machine-learning-python/README.md","purpose":"Documentation des ressources"}]'::jsonb,
    '["Définir clairement cible, unité et horizon de prédiction","Créer un split stratifié reproductible","Comparer DummyClassifier, régression logistique et au moins un modèle d’ensemble","Construire un Pipeline avec ColumnTransformer","Évaluer avec PR-AUC, rappel, précision et matrice de confusion","Choisir un seuil sur validation","Produire une permutation importance","Rédiger une synthèse métier et une model card"]'::jsonb,
    '["Comparer Random Forest et Gradient Boosting avec optimisation d’hyperparamètres","Utiliser une validation imbriquée ou répétée","Évaluer calibration et Brier score","Produire des explications SHAP globales et locales","Tester la stabilité par sous-groupe et par bootstrap","Proposer une stratégie d’abstention pour les cas incertains","Créer un script d’inférence réutilisable","Ajouter un rapport automatisé des performances"]'::jsonb,
    '["La cible et l’horizon sont correctement définis","La baseline est explicite et battue ou ses limites sont expliquées","Le modèle final est sélectionné avec une logique multicritère","Le seuil de décision est relié à un coût métier","Les clients à risque sont profilés sans surinterprétation","Les recommandations sont actionnables et mesurables","Les limites et risques éthiques sont clairement formulés"]'::jsonb,
    '["Notebook exécutable depuis un kernel propre","Pipeline scikit-learn sans fuite","Prétraitements appris uniquement sur les folds d’entraînement","Jeu de test final verrouillé","Random states fixés","Métriques calculées correctement","Code structuré et fonctions réutilisables","Dépendances documentées","Analyse des erreurs par sous-groupe","Model card complète"]'::jsonb,
    '[{"criterion":"Cadrage et qualité des données","points":8},{"criterion":"Préparation et feature engineering","points":10},{"criterion":"Protocole expérimental et baselines","points":8},{"criterion":"Modélisation et optimisation","points":12},{"criterion":"Déséquilibre, seuils et métriques","points":8},{"criterion":"Interprétabilité et robustesse","points":8},{"criterion":"Communication, éthique et recommandations","points":6}]'::jsonb,
    $solution$# Solution de référence

La solution attendue charge le dataset synthétique, vérifie le grain client, sépare les identifiants, puis crée un split stratifié avec un jeu de test final verrouillé. Elle construit un `ColumnTransformer` pour les variables numériques et catégorielles, puis compare une baseline naïve, une régression logistique, une Random Forest et un Gradient Boosting dans des pipelines cohérents.

Le modèle est sélectionné avec la PR-AUC, le rappel au seuil métier, la précision, la calibration, la stabilité en validation croisée et le coût d’inférence. Le seuil est choisi sur validation selon une matrice de coûts explicite. La solution analyse ensuite les erreurs par type de contrat et canal, calcule la permutation importance, produit une explication locale et rédige une model card.

La conclusion distingue prédiction et causalité, présente les limites de généralisation et recommande un test contrôlé de campagne de rétention avant tout déploiement opérationnel.$solution$,
    FALSE
FROM c
ON CONFLICT(course_id,slug) DO UPDATE SET
    title=EXCLUDED.title,
    summary=EXCLUDED.summary,
    brief_md=EXCLUDED.brief_md,
    corpus_policy_md=EXCLUDED.corpus_policy_md,
    starter_assets=EXCLUDED.starter_assets,
    minimum_version=EXCLUDED.minimum_version,
    advanced_version=EXCLUDED.advanced_version,
    functional_criteria=EXCLUDED.functional_criteria,
    technical_criteria=EXCLUDED.technical_criteria,
    rubric=EXCLUDED.rubric,
    reference_solution_md=EXCLUDED.reference_solution_md,
    is_published=FALSE;

WITH p AS (
    SELECT cp.id AS project_id,cp.course_id
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='machine-learning-python'
      AND cp.slug='prediction-churn-client-python'
), seed(module_order,slug,title,description,deliverables,acceptance,ord) AS (
VALUES
(0,'cadrer-probleme','Cadrer le problème','Définir la cible, l’unité, l’horizon, les coûts d’erreur et la baseline.','["Note de cadrage","Dictionnaire de la cible","Plan d’évaluation"]'::jsonb,'["Cible non ambiguë","Horizon de 30 jours défini","Baseline et métriques préspécifiées"]'::jsonb,0),
(1,'auditer-preparer','Auditer et préparer les données','Contrôler types, valeurs manquantes, outliers et catégories.','["Rapport de qualité","Pipeline de préparation"]'::jsonb,'["Aucune fuite","Transformations justifiées","Identifiant exclu des features"]'::jsonb,1),
(2,'construire-features','Construire les variables','Créer des variables métier stables et documentées.','["Table de features","Documentation des variables"]'::jsonb,'["Fenêtres temporelles cohérentes","Variables reproductibles","Aucun événement futur utilisé"]'::jsonb,2),
(4,'etablir-baselines','Établir les baselines','Comparer DummyClassifier et régression logistique.','["Tableau de baselines","Courbes et matrice de confusion"]'::jsonb,'["Split stratifié","Métriques justifiées","Seuil initial documenté"]'::jsonb,3),
(5,'comparer-modeles','Comparer les modèles','Comparer arbres et méthodes d’ensemble sur un protocole commun.','["Benchmark des modèles","Analyse biais-variance"]'::jsonb,'["Même pipeline d’évaluation","Dispersion des scores rapportée","Choix provisoire justifié"]'::jsonb,4),
(6,'gerer-desequilibre','Gérer le déséquilibre et les seuils','Comparer pondération et seuils selon les coûts métier.','["Analyse précision-rappel","Matrice de coûts","Seuil retenu"]'::jsonb,'["Test final non utilisé","Coûts explicités","Impact opérationnel chiffré"]'::jsonb,5),
(8,'optimiser-selectionner','Optimiser et sélectionner','Optimiser le modèle candidat et verrouiller la sélection finale.','["Résultats du tuning","Matrice multicritère"]'::jsonb,'["Recherche dans le pipeline","Test final intact","Gain par rapport à la baseline mesuré"]'::jsonb,6),
(9,'interpreter-modele','Interpréter le modèle','Produire des explications globales et locales sans conclusion causale.','["Permutation importance","Explications locales","Lecture métier"]'::jsonb,'["Jeu indépendant utilisé","Corrélations discutées","Limites explicitées"]'::jsonb,7),
(10,'auditer-robustesse','Auditer la robustesse','Analyser calibration, erreurs, sous-groupes et dérive potentielle.','["Rapport de calibration","Analyse par sous-groupe","Plan de surveillance"]'::jsonb,'["Effectifs rapportés","Groupes faibles identifiés","Seuils d’alerte proposés"]'::jsonb,8),
(11,'restituer-projet','Restituer et recommander','Finaliser notebook, model card et synthèse exécutive.','["Notebook final","Model card","Synthèse exécutive"]'::jsonb,'["Exécution de bout en bout","Recommandations mesurables","Usages interdits documentés"]'::jsonb,9)
)
INSERT INTO public.course_project_milestones(
    project_id,module_id,slug,title,description,deliverables,
    acceptance_criteria,order_index,is_published
)
SELECT p.project_id,m.id,s.slug,s.title,s.description,s.deliverables,
       s.acceptance,s.ord,FALSE
FROM p
JOIN public.modules m ON m.course_id=p.course_id
JOIN seed s ON s.module_order=m.order_index
ON CONFLICT(project_id,slug) DO UPDATE SET
    module_id=EXCLUDED.module_id,
    title=EXCLUDED.title,
    description=EXCLUDED.description,
    deliverables=EXCLUDED.deliverables,
    acceptance_criteria=EXCLUDED.acceptance_criteria,
    order_index=EXCLUDED.order_index,
    is_published=FALSE;

DO $$
DECLARE project_count INT; milestone_count INT; rubric_total INT; published_projects INT; published_milestones INT;
BEGIN
    SELECT COUNT(*),COUNT(*) FILTER (WHERE cp.is_published)
    INTO project_count,published_projects
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='machine-learning-python';

    SELECT COUNT(*),COUNT(*) FILTER (WHERE pm.is_published)
    INTO milestone_count,published_milestones
    FROM public.course_project_milestones pm
    JOIN public.course_projects cp ON cp.id=pm.project_id
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='machine-learning-python';

    SELECT COALESCE(SUM((item->>'points')::INT),0)
    INTO rubric_total
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id,
    LATERAL jsonb_array_elements(cp.rubric) item
    WHERE c.slug='machine-learning-python';

    IF project_count<>1 OR milestone_count<>10 OR rubric_total<>60 OR published_projects<>0 OR published_milestones<>0 THEN
        RAISE EXCEPTION 'Chantier 6 Machine Learning incomplet: projets %, jalons %, barème %, projets publiés %, jalons publiés %',
            project_count,milestone_count,rubric_total,published_projects,published_milestones;
    END IF;
END $$;
