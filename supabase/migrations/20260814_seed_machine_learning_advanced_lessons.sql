-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 3
-- Modules 6 à 11 : 12 leçons détaillées. Migration idempotente, non publiée.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
VALUES
(6,0,'diagnostiquer-classes-desequilibrees','Diagnostiquer les classes déséquilibrées','Mesurer le déséquilibre et choisir des métriques adaptées aux classes rares.','lesson',110,
'["Mesurer le taux de base", "Choisir précision, rappel et PR-AUC", "Évaluer les erreurs selon leur coût métier"]'::jsonb,$lesson$# Diagnostiquer les classes déséquilibrées

## Objectifs
- Mesurer le déséquilibre de la cible.
- Comprendre pourquoi l’accuracy peut être trompeuse.
- Relier précision, rappel et coût métier.

## Théorie
Une classe rare modifie fortement l’interprétation des métriques. Un modèle qui prédit toujours la classe majoritaire peut afficher une accuracy élevée tout en étant inutile. La courbe précision-rappel est souvent plus informative que ROC lorsque la classe positive est rare.

## Exemple Python
```python
from sklearn.metrics import classification_report, average_precision_score

rate = y_train.mean()
print("Taux positif:", rate)
print(classification_report(y_test, pred, digits=3))
print("PR-AUC:", average_precision_score(y_test, proba))
```

## Erreurs fréquentes
- Utiliser uniquement l’accuracy.
- Comparer des modèles sans rappeler le taux de base.
- Choisir une métrique après avoir vu le test final.

## Bonnes pratiques
1. Rapporter la distribution des classes.
2. Définir les coûts des faux positifs et faux négatifs.
3. Choisir la métrique avant l’entraînement.
4. Évaluer les métriques par sous-groupe.

## Question de validation
Pourquoi une accuracy de 95 % peut-elle être mauvaise sur une cible positive présente dans 5 % des cas ?$lesson$,
'Pourquoi une accuracy de 95 % peut-elle être mauvaise sur une cible positive présente dans 5 % des cas ?'),

(6,1,'ponderation-reechantillonnage-seuils','Pondération, rééchantillonnage et seuils','Comparer les stratégies de traitement du déséquilibre sans contaminer l’évaluation.','lesson',110,
'["Utiliser class_weight", "Appliquer le rééchantillonnage dans le pipeline", "Optimiser un seuil coût-sensible"]'::jsonb,$lesson$# Pondération, rééchantillonnage et seuils

## Objectifs
- Comparer pondération et rééchantillonnage.
- Éviter la fuite lors du suréchantillonnage.
- Choisir un seuil selon les coûts métier.

## Théorie
La pondération augmente le coût des erreurs sur la classe rare. Le suréchantillonnage modifie la distribution d’apprentissage et doit être appliqué uniquement aux folds d’entraînement. Le seuil de décision doit être choisi sur validation, jamais sur le test final.

## Exemple Python
```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score

model = LogisticRegression(class_weight="balanced", max_iter=1000)
model.fit(X_train, y_train)
proba = model.predict_proba(X_valid)[:, 1]
for threshold in [0.2, 0.35, 0.5]:
    pred = (proba >= threshold).astype(int)
    print(threshold, precision_score(y_valid, pred), recall_score(y_valid, pred))
```

## Erreurs fréquentes
- Suréchantillonner avant le split.
- Optimiser le seuil sur le jeu de test.
- Confondre amélioration du rappel et amélioration globale.

## Bonnes pratiques
- Comparer à une stratégie sans rééquilibrage.
- Conserver les probabilités originales.
- Mesurer l’impact sur précision, rappel et calibration.
- Documenter le coût opérationnel du seuil choisi.

## Question de validation
Pourquoi le suréchantillonnage doit-il être exécuté à l’intérieur de chaque fold d’entraînement ?$lesson$,
'Pourquoi le suréchantillonnage doit-il être exécuté à l’intérieur de chaque fold d’entraînement ?'),

(7,0,'pipeline-columntransformer','Pipeline et ColumnTransformer','Encapsuler prétraitement et modèle dans une chaîne reproductible.','lesson',115,
'["Construire un Pipeline", "Combiner transformations numériques et catégorielles", "Prévenir les fuites de prétraitement"]'::jsonb,$lesson$# Pipeline et ColumnTransformer

## Objectifs
- Construire un pipeline scikit-learn complet.
- Appliquer des transformations par type de colonne.
- Garantir que les transformations sont apprises uniquement sur le train.

## Théorie
Pipeline orchestre les transformations et le modèle. ColumnTransformer permet d’appliquer des chaînes différentes aux variables numériques et catégorielles. Cette architecture évite les écarts entre entraînement et prédiction.

## Exemple Python
```python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression

preprocess = ColumnTransformer([
    ("num", Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scale", StandardScaler()),
    ]), numeric_cols),
    ("cat", Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ]), categorical_cols),
])
model = Pipeline([
    ("preprocess", preprocess),
    ("classifier", LogisticRegression(max_iter=1200)),
])
```

## Erreurs fréquentes
- Prétraiter les données avant la validation croisée.
- Oublier les catégories inconnues.
- Dupliquer les transformations entre notebook et production.

## Bonnes pratiques
- Centraliser tout prétraitement dans le pipeline.
- Nommer clairement les étapes.
- Tester le pipeline sur une ligne nouvelle.
- Versionner colonnes et types attendus.

## Question de validation
Pourquoi Pipeline réduit-il le risque de différence entre entraînement et prédiction ?$lesson$,
'Pourquoi Pipeline réduit-il le risque de différence entre entraînement et prédiction ?'),

(7,1,'validation-croisee-sans-fuite','Validation croisée sans fuite','Choisir un schéma de validation cohérent avec la structure des données.','lesson',115,
'["Choisir KFold, StratifiedKFold ou GroupKFold", "Mesurer moyenne et dispersion", "Préserver groupes et temporalité"]'::jsonb,$lesson$# Validation croisée sans fuite

## Objectifs
- Choisir une stratégie de validation adaptée.
- Évaluer la variance des performances.
- Empêcher qu’un même groupe apparaisse dans train et validation.

## Théorie
StratifiedKFold conserve la proportion des classes. GroupKFold empêche la présence d’un même client ou site dans plusieurs folds. Pour des données temporelles, il faut respecter l’ordre chronologique.

## Exemple Python
```python
from sklearn.model_selection import StratifiedKFold, cross_validate

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_validate(
    model, X, y, cv=cv,
    scoring={"roc_auc": "roc_auc", "pr_auc": "average_precision"},
    return_train_score=True,
)
print(scores["test_pr_auc"].mean(), scores["test_pr_auc"].std())
```

## Erreurs fréquentes
- Mélanger les observations d’un même client entre folds.
- Rapporter uniquement la moyenne.
- Utiliser KFold aléatoire sur une série temporelle.

## Bonnes pratiques
- Identifier les dépendances entre observations.
- Rapporter moyenne, écart-type et minimum.
- Fixer la graine si le shuffle est permis.
- Conserver un test final indépendant.

## Question de validation
Quand faut-il préférer GroupKFold à StratifiedKFold ?$lesson$,
'Quand faut-il préférer GroupKFold à StratifiedKFold ?'),

(8,0,'grid-random-search','Grid Search et Random Search','Optimiser les hyperparamètres avec un budget maîtrisé.','lesson',115,
'["Définir un espace de recherche", "Comparer GridSearchCV et RandomizedSearchCV", "Éviter le surajustement à la validation"]'::jsonb,$lesson$# Grid Search et Random Search

## Objectifs
- Définir des hyperparamètres pertinents.
- Choisir entre recherche exhaustive et aléatoire.
- Intégrer l’optimisation au pipeline.

## Théorie
Grid Search explore toutes les combinaisons spécifiées. Random Search échantillonne un nombre fixé de combinaisons et est souvent plus efficace lorsque plusieurs paramètres sont peu influents. L’espace de recherche doit être construit avec des échelles cohérentes.

## Exemple Python
```python
from scipy.stats import loguniform
from sklearn.model_selection import RandomizedSearchCV

search = RandomizedSearchCV(
    model,
    param_distributions={
        "classifier__C": loguniform(1e-3, 1e2),
        "classifier__class_weight": [None, "balanced"],
    },
    n_iter=30,
    scoring="average_precision",
    cv=5,
    random_state=42,
    n_jobs=-1,
)
search.fit(X_train, y_train)
print(search.best_params_)
```

## Erreurs fréquentes
- Chercher des valeurs sans logique d’échelle.
- Utiliser le jeu de test dans la recherche.
- Multiplier les essais sans contrôler le biais de sélection.

## Bonnes pratiques
- Commencer par un espace large puis resserrer.
- Fixer un budget de calcul.
- Comparer au modèle par défaut.
- Conserver les résultats complets de recherche.

## Question de validation
Pourquoi Random Search peut-il être plus efficace que Grid Search ?$lesson$,
'Pourquoi Random Search peut-il être plus efficace que Grid Search ?'),

(8,1,'validation-imbriquee-budget-calcul','Validation imbriquée et budget de calcul','Estimer honnêtement la performance après optimisation.','lesson',115,
'["Comprendre la validation imbriquée", "Séparer sélection et estimation", "Comparer gain et coût de calcul"]'::jsonb,$lesson$# Validation imbriquée et budget de calcul

## Objectifs
- Distinguer boucle interne et boucle externe.
- Éviter une estimation optimiste après tuning.
- Documenter le coût de calcul.

## Théorie
La boucle interne sélectionne les hyperparamètres. La boucle externe estime la généralisation de toute la procédure de sélection. Cette méthode est plus coûteuse, mais utile lorsque les données sont limitées et le tuning important.

## Exemple Python
```python
from sklearn.model_selection import StratifiedKFold, cross_val_score

inner = StratifiedKFold(n_splits=4, shuffle=True, random_state=1)
outer = StratifiedKFold(n_splits=5, shuffle=True, random_state=2)
search.cv = inner
nested_scores = cross_val_score(search, X, y, cv=outer, scoring="average_precision")
print(nested_scores.mean(), nested_scores.std())
```

## Erreurs fréquentes
- Confondre meilleur score interne et performance finale.
- Réutiliser le même test pour plusieurs décisions.
- Ignorer le temps d’entraînement.

## Bonnes pratiques
- Réserver la validation imbriquée aux décisions à fort enjeu.
- Mesurer temps CPU et mémoire.
- Réduire l’espace de recherche avec expertise.
- Comparer le gain au coût opérationnel.

## Question de validation
Quel est le rôle de la boucle externe dans une validation imbriquée ?$lesson$,
'Quel est le rôle de la boucle externe dans une validation imbriquée ?'),

(9,0,'importance-globale-pdp','Importance globale et Partial Dependence','Expliquer les facteurs associés aux prédictions globales.','lesson',120,
'["Calculer une permutation importance", "Lire un PDP", "Identifier les limites avec variables corrélées"]'::jsonb,$lesson$# Importance globale et Partial Dependence

## Objectifs
- Mesurer l’importance par permutation.
- Visualiser l’effet moyen d’une variable.
- Distinguer importance prédictive et causalité.

## Théorie
La permutation importance mesure la baisse de performance lorsque les valeurs d’une variable sont mélangées. Les PDP montrent la prédiction moyenne lorsque la variable varie. Les variables corrélées peuvent rendre ces méthodes trompeuses.

## Exemple Python
```python
from sklearn.inspection import permutation_importance, PartialDependenceDisplay

result = permutation_importance(
    model, X_test, y_test,
    scoring="average_precision",
    n_repeats=20,
    random_state=42,
)
PartialDependenceDisplay.from_estimator(model, X_test, ["anciennete_mois"])
```

## Erreurs fréquentes
- Présenter une importance comme un effet causal.
- Calculer l’importance sur le train.
- Ignorer la corrélation entre variables.

## Bonnes pratiques
- Utiliser un jeu indépendant.
- Répéter les permutations.
- Comparer plusieurs méthodes d’explication.
- Ajouter le contexte métier.

## Question de validation
Pourquoi deux variables corrélées peuvent-elles sembler individuellement peu importantes ?$lesson$,
'Pourquoi deux variables corrélées peuvent-elles sembler individuellement peu importantes ?'),

(9,1,'shap-explications-locales','SHAP et explications locales','Expliquer une prédiction individuelle avec prudence.','lesson',120,
'["Lire une explication locale", "Comparer contribution et valeur de référence", "Présenter les limites des explications"]'::jsonb,$lesson$# SHAP et explications locales

## Objectifs
- Expliquer pourquoi une prédiction diffère de la moyenne.
- Identifier les contributions positives et négatives.
- Communiquer sans transformer l’explication en causalité.

## Théorie
SHAP attribue la différence entre la prédiction et une valeur de référence aux variables. L’explication dépend du modèle, du jeu de référence et des dépendances entre variables.

## Exemple Python
```python
import shap

explainer = shap.Explainer(trained_model, X_background)
values = explainer(X_explain.iloc[:5])
shap.plots.waterfall(values[0])
```

## Erreurs fréquentes
- Dire qu’une variable « cause » la décision.
- Utiliser un jeu de référence non représentatif.
- Afficher trop d’informations à un utilisateur métier.

## Bonnes pratiques
- Expliquer la valeur de référence.
- Présenter les contributions principales.
- Vérifier la stabilité de l’explication.
- Ajouter une revue humaine pour les décisions sensibles.

## Question de validation
Que représente la valeur de référence dans une explication SHAP ?$lesson$,
'Que représente la valeur de référence dans une explication SHAP ?'),

(10,0,'analyse-erreurs-sous-groupes','Analyse des erreurs par sous-groupe','Identifier les populations et situations où le modèle échoue.','lesson',115,
'["Segmenter les erreurs", "Comparer les métriques par sous-groupe", "Détecter les risques d’équité"]'::jsonb,$lesson$# Analyse des erreurs par sous-groupe

## Objectifs
- Dépasser le score global.
- Repérer les segments mal servis.
- Proposer des corrections ou limitations d’usage.

## Théorie
Un bon score moyen peut masquer des performances faibles pour certains groupes. L’analyse des erreurs doit considérer fréquence, gravité, contexte et conséquences opérationnelles.

## Exemple Python
```python
import pandas as pd
from sklearn.metrics import recall_score

results = X_test.copy()
results["y_true"] = y_test.to_numpy()
results["y_pred"] = pred
by_segment = results.groupby("type_contrat").apply(
    lambda g: recall_score(g["y_true"], g["y_pred"], zero_division=0)
)
print(by_segment)
```

## Erreurs fréquentes
- Rapporter seulement le score global.
- Comparer des groupes avec très peu d’observations.
- Masquer les performances faibles.

## Bonnes pratiques
- Rapporter effectifs et intervalles.
- Prioriser les erreurs coûteuses.
- Examiner les variables proxys.
- Définir des règles d’abstention si nécessaire.

## Question de validation
Pourquoi faut-il toujours afficher l’effectif d’un sous-groupe avec sa métrique ?$lesson$,
'Pourquoi faut-il toujours afficher l’effectif d’un sous-groupe avec sa métrique ?'),

(10,1,'calibration-stabilite-derives','Calibration, stabilité et dérives potentielles','Évaluer la fiabilité des probabilités et la robustesse hors échantillon.','lesson',115,
'["Mesurer la calibration", "Tester la stabilité temporelle", "Identifier les sources de dérive"]'::jsonb,$lesson$# Calibration, stabilité et dérives potentielles

## Objectifs
- Vérifier qu’une probabilité prédite correspond à une fréquence observée.
- Comparer les performances dans le temps.
- Définir des signaux de surveillance.

## Théorie
Un modèle discriminant peut être mal calibré. Une probabilité de 0,8 devrait correspondre à environ 80 % d’événements positifs dans des groupes comparables. Les dérives de données, de cible ou de relation peuvent dégrader la performance.

## Exemple Python
```python
from sklearn.calibration import CalibrationDisplay
from sklearn.metrics import brier_score_loss

CalibrationDisplay.from_predictions(y_test, proba, n_bins=10)
print("Brier:", brier_score_loss(y_test, proba))
```

## Erreurs fréquentes
- Confondre AUC et calibration.
- Tester uniquement sur une période stable.
- Déployer sans seuil d’alerte.

## Bonnes pratiques
- Évaluer par période.
- Surveiller distributions et taux cible.
- Définir une fréquence de réévaluation.
- Documenter la plage de validité.

## Question de validation
Pourquoi un modèle avec une bonne ROC-AUC peut-il malgré tout avoir de mauvaises probabilités ?$lesson$,
'Pourquoi un modèle avec une bonne ROC-AUC peut-il malgré tout avoir de mauvaises probabilités ?'),

(11,0,'selection-modele-multicritere','Sélection finale multicritère','Choisir un modèle selon performance, robustesse, coût et explicabilité.','lesson',100,
'["Comparer plusieurs modèles", "Construire une matrice de décision", "Justifier les compromis"]'::jsonb,$lesson$# Sélection finale multicritère

## Objectifs
- Comparer performance et dispersion.
- Intégrer coût d’inférence et maintenabilité.
- Choisir un modèle proportionné au besoin.

## Théorie
Le meilleur score n’est pas toujours le meilleur modèle. La sélection doit intégrer robustesse, calibration, temps d’inférence, explicabilité, coût et impact des erreurs.

## Exemple Python
```python
import pandas as pd

comparison = pd.DataFrame([
    {"model": "logistic", "pr_auc": 0.54, "latency_ms": 2, "explainability": 5},
    {"model": "forest", "pr_auc": 0.61, "latency_ms": 18, "explainability": 3},
    {"model": "boosting", "pr_auc": 0.64, "latency_ms": 10, "explainability": 3},
])
print(comparison.sort_values(["pr_auc", "latency_ms"], ascending=[False, True]))
```

## Erreurs fréquentes
- Choisir uniquement le meilleur score moyen.
- Ignorer le coût de maintenance.
- Survendre un gain minime.

## Bonnes pratiques
- Définir les critères avant la comparaison finale.
- Rapporter les intervalles et la variance.
- Conserver une solution de repli simple.
- Documenter les raisons du choix.

## Question de validation
Pourquoi un modèle légèrement moins performant peut-il être préférable en production ?$lesson$,
'Pourquoi un modèle légèrement moins performant peut-il être préférable en production ?'),

(11,1,'model-card-restitution-ethique','Model card, restitution et éthique','Documenter le modèle, ses limites et ses conditions d’usage.','lesson',100,
'["Rédiger une model card", "Présenter les limites", "Formuler des recommandations responsables"]'::jsonb,$lesson$# Model card, restitution et éthique

## Objectifs
- Documenter données, métriques et limites.
- Séparer prédiction, explication et causalité.
- Préparer une restitution métier actionnable.

## Théorie
Une model card décrit le but, les utilisateurs, les données, les performances, les sous-groupes, les limites et les usages interdits. Elle sert de contrat de compréhension entre équipe data et métier.

## Exemple Python
```python
model_card = {
    "purpose": "Prioriser les actions de rétention",
    "target": "churn dans les 30 jours",
    "metric": "PR-AUC et rappel au seuil métier",
    "limitations": [
        "non destiné aux décisions automatisées sensibles",
        "performances à surveiller par type de contrat",
        "réévaluation mensuelle requise",
    ],
}
```

## Erreurs fréquentes
- Masquer les limites.
- Présenter une prédiction comme une décision automatique.
- Oublier la population couverte.

## Bonnes pratiques
- Nommer les usages autorisés et interdits.
- Ajouter les métriques par sous-groupe.
- Définir une revue humaine.
- Prévoir le suivi et le retrait du modèle.

## Question de validation
Quelles informations minimales doivent apparaître dans une model card ?$lesson$,
'Quelles informations minimales doivent apparaître dans une model card ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'machine-learning-python'
      AND m.order_index BETWEEN 6 AND 11
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,
       '["KORYXA Machine Learning avec Python", "Python", "pandas", "NumPy", "scikit-learn", "SHAP"]'::jsonb,
       l.validation_prompt,FALSE
FROM lesson_seed l
JOIN target t ON t.order_index = l.module_order
ON CONFLICT (module_id,slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    order_index = EXCLUDED.order_index,
    lesson_type = EXCLUDED.lesson_type,
    estimated_minutes = EXCLUDED.estimated_minutes,
    objectives = EXCLUDED.objectives,
    content_md = EXCLUDED.content_md,
    source_refs = EXCLUDED.source_refs,
    validation_prompt = EXCLUDED.validation_prompt,
    is_published = FALSE;

DO $$
DECLARE lesson_count INT; module_coverage INT; published_count INT; duplicate_orders INT;
BEGIN
    SELECT COUNT(*), COUNT(DISTINCT m.id), COUNT(*) FILTER (WHERE l.is_published)
    INTO lesson_count, module_coverage, published_count
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'machine-learning-python' AND m.order_index BETWEEN 6 AND 11;

    SELECT COUNT(*) INTO duplicate_orders
    FROM (
        SELECT l.module_id,l.order_index
        FROM public.lessons l
        JOIN public.modules m ON m.id=l.module_id
        JOIN public.courses c ON c.id=m.course_id
        WHERE c.slug='machine-learning-python' AND m.order_index BETWEEN 6 AND 11
        GROUP BY l.module_id,l.order_index HAVING COUNT(*)>1
    ) d;

    IF lesson_count<>12 OR module_coverage<>6 OR published_count<>0 OR duplicate_orders<>0 THEN
        RAISE EXCEPTION 'Leçons Machine Learning avancées incomplètes: leçons %, modules %, publiées %, ordres dupliqués %', lesson_count,module_coverage,published_count,duplicate_orders;
    END IF;
END $$;
