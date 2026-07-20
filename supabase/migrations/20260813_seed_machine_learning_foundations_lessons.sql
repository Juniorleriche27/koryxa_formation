-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 2
-- Modules 0 à 5 : 12 leçons détaillées. Migration idempotente, non publiée.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
VALUES
(0,0,'cadrer-probleme-machine-learning','Cadrer un problème de Machine Learning','Transformer un besoin métier en problème supervisé clair, mesurable et exploitable.','lesson',90,
'["Identifier cible, unité d’observation et horizon", "Distinguer classification et régression", "Définir une métrique alignée sur le métier"]'::jsonb,$lesson$# Cadrer un problème de Machine Learning

## Objectifs

- Transformer une question métier en problème de Machine Learning.
- Définir la **cible**, l’unité d’observation et l’horizon de prédiction.
- Choisir une métrique cohérente avec le coût réel des erreurs.

## Théorie

Un projet ML commence par une décision à améliorer, pas par un algorithme. Il faut préciser ce qui sera prédit, pour qui, à quel moment et avec quelles données disponibles à cet instant. Une cible mal définie ou construite avec des informations futures produit un modèle inutilisable.

## Exemple Python

```python
import pandas as pd

clients = pd.DataFrame({
    "client_id": [1, 2, 3],
    "anciennete_mois": [18, 3, 26],
    "tickets_90j": [0, 4, 1],
    "churn_30j": [0, 1, 0],
})

X = clients[["anciennete_mois", "tickets_90j"]]
y = clients["churn_30j"]
print(X.shape, y.mean())
```

## Erreurs fréquentes

- Prédire une variable qui n’est pas liée à une décision.
- Mélanger plusieurs unités d’observation.
- Utiliser des variables disponibles seulement après l’événement cible.

## Bonnes pratiques

1. Rédiger une phrase de cadrage : « prédire X pour Y à l’horizon Z ».
2. Définir la date de référence de chaque ligne.
3. Lister les coûts de faux positifs et faux négatifs.
4. Fixer une baseline avant tout modèle complexe.

## Question de validation

Pourquoi la date de disponibilité d’une variable est-elle aussi importante que sa corrélation avec la cible ?$lesson$,
'Pourquoi la date de disponibilité d’une variable est-elle aussi importante que sa corrélation avec la cible ?'),

(0,1,'baseline-protocole-experimental-fuite','Baseline, protocole expérimental et fuite de données','Construire une évaluation crédible avant d’optimiser les modèles.','lesson',90,
'["Créer une baseline simple", "Séparer train, validation et test", "Identifier les principales formes de data leakage"]'::jsonb,$lesson$# Baseline, protocole expérimental et fuite de données

## Objectifs

- Mesurer la valeur ajoutée réelle d’un modèle.
- Définir un protocole d’évaluation avant l’entraînement.
- Repérer les fuites directes, temporelles et liées au prétraitement.

## Théorie

Une baseline représente la performance minimale à dépasser. Pour une classification déséquilibrée, prédire toujours la classe majoritaire peut donner une accuracy trompeuse. Le jeu de test doit rester verrouillé jusqu’à la fin. Toute transformation apprise sur l’ensemble des données contamine l’évaluation.

## Exemple Python

```python
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import balanced_accuracy_score

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)
baseline = DummyClassifier(strategy="prior")
baseline.fit(X_train, y_train)
pred = baseline.predict(X_test)
print(balanced_accuracy_score(y_test, pred))
```

## Erreurs fréquentes

- Tester plusieurs fois sur le même jeu final.
- Calculer l’imputation avant le split.
- Choisir la métrique après avoir vu les résultats.

## Bonnes pratiques

- Verrouiller le test final.
- Versionner les splits et la graine aléatoire.
- Comparer systématiquement à une baseline naïve.
- Documenter les règles d’inclusion des observations.

## Question de validation

Pourquoi une accuracy élevée peut-elle être inutile sur un problème de churn très déséquilibré ?$lesson$,
'Pourquoi une accuracy élevée peut-elle être inutile sur un problème de churn très déséquilibré ?'),

(1,0,'valeurs-manquantes-outliers','Valeurs manquantes et valeurs atypiques','Préparer les données sans effacer les signaux utiles ni introduire de biais.','lesson',95,
'["Diagnostiquer les mécanismes de données manquantes", "Choisir une stratégie d’imputation", "Traiter les outliers selon leur origine"]'::jsonb,$lesson$# Valeurs manquantes et valeurs atypiques

## Objectifs

- Distinguer absence informative, erreur et donnée réellement indisponible.
- Imputer sans utiliser le jeu de test.
- Traiter les valeurs atypiques sans suppression automatique.

## Théorie

Une valeur manquante peut porter un signal métier. L’imputation médiane est robuste, mais elle ne remplace pas l’analyse du mécanisme d’absence. Les outliers peuvent être des erreurs, des événements rares légitimes ou des cas critiques.

## Exemple Python

```python
from sklearn.impute import SimpleImputer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import RobustScaler
from sklearn.linear_model import LogisticRegression

pipeline = make_pipeline(
    SimpleImputer(strategy="median", add_indicator=True),
    RobustScaler(),
    LogisticRegression(max_iter=1000),
)
```

## Erreurs fréquentes

- Remplacer toutes les valeurs manquantes par zéro.
- Supprimer les 1 % extrêmes sans justification.
- Ajuster l’imputation sur toutes les données.

## Bonnes pratiques

- Ajouter un indicateur d’absence lorsque pertinent.
- Comparer plusieurs stratégies en validation croisée.
- Tracer les distributions avant et après traitement.
- Conserver une piste d’audit des règles appliquées.

## Question de validation

Dans quel cas un indicateur de valeur manquante peut-il améliorer un modèle ?$lesson$,
'Dans quel cas un indicateur de valeur manquante peut-il améliorer un modèle ?'),

(1,1,'encodage-standardisation-columntransformer','Encodage, standardisation et ColumnTransformer','Appliquer des transformations adaptées à chaque type de variable.','lesson',95,
'["Encoder les variables catégorielles", "Standardiser lorsque le modèle le nécessite", "Assembler les transformations avec ColumnTransformer"]'::jsonb,$lesson$# Encodage, standardisation et ColumnTransformer

## Objectifs

- Choisir entre one-hot encoding, encodage ordinal et représentation numérique.
- Comprendre quels modèles sont sensibles à l’échelle.
- Construire un prétraitement mixte reproductible.

## Théorie

Les catégories nominales ne doivent pas recevoir un ordre artificiel. Le one-hot encoding convient souvent aux modèles linéaires et aux arbres. La standardisation est importante pour les modèles à distance ou régularisés, mais peu utile pour les arbres.

## Exemple Python

```python
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline

num = ["anciennete_mois", "montant_mensuel"]
cat = ["canal", "type_contrat"]

preprocessor = ColumnTransformer([
    ("num", Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ]), num),
    ("cat", Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ]), cat),
])
```

## Erreurs fréquentes

- Encoder une catégorie nominale avec des nombres ordonnés.
- Oublier `handle_unknown="ignore"`.
- Standardiser avant le split.

## Bonnes pratiques

- Définir explicitement les colonnes numériques et catégorielles.
- Encapsuler toutes les transformations dans le pipeline.
- Tester la robustesse aux catégories inconnues.
- Conserver les noms des variables transformées.

## Question de validation

Pourquoi un encodage entier de catégories nominales peut-il tromper certains modèles ?$lesson$,
'Pourquoi un encodage entier de catégories nominales peut-il tromper certains modèles ?'),

(2,0,'creer-variables-metier','Créer des variables métier utiles','Transformer les données brutes en signaux prédictifs compréhensibles.','lesson',95,
'["Créer des ratios, agrégats et fenêtres temporelles", "Respecter la date de référence", "Évaluer la valeur d’une variable"]'::jsonb,$lesson$# Créer des variables métier utiles

## Objectifs

- Construire des variables alignées sur le mécanisme métier.
- Créer des agrégats temporels sans fuite.
- Vérifier la stabilité et l’interprétabilité des variables.

## Théorie

Le feature engineering traduit la connaissance métier en représentation numérique. Pour le churn, la récence, la fréquence d’usage, la tendance récente et les incidents peuvent être plus utiles que les valeurs brutes.

## Exemple Python

```python
import pandas as pd

transactions = pd.DataFrame({
    "client_id": [1, 1, 2, 2],
    "date": pd.to_datetime(["2026-01-02", "2026-01-20", "2026-01-03", "2026-01-05"]),
    "montant": [40, 65, 20, 15],
})
reference = pd.Timestamp("2026-02-01")
features = transactions.groupby("client_id").agg(
    frequence=("montant", "size"),
    montant_total=("montant", "sum"),
    derniere_date=("date", "max"),
)
features["recence_jours"] = (reference - features["derniere_date"]).dt.days
```

## Erreurs fréquentes

- Calculer des agrégats avec des événements postérieurs à la prédiction.
- Créer des centaines de variables sans hypothèse.
- Utiliser des ratios instables avec dénominateur proche de zéro.

## Bonnes pratiques

- Associer chaque variable à une hypothèse métier.
- Définir une fenêtre d’observation fixe.
- Tester la stabilité temporelle.
- Éliminer les doublons conceptuels.

## Question de validation

Pourquoi une variable de récence doit-elle être calculée par rapport à une date de référence explicite ?$lesson$,
'Pourquoi une variable de récence doit-elle être calculée par rapport à une date de référence explicite ?'),

(2,1,'selection-variables-colinearite','Sélection de variables et colinéarité','Réduire le bruit tout en conservant les signaux utiles et interprétables.','lesson',95,
'["Détecter redondance et colinéarité", "Comparer sélection filtre et sélection intégrée", "Éviter la sélection sur le jeu de test"]'::jsonb,$lesson$# Sélection de variables et colinéarité

## Objectifs

- Identifier les variables redondantes.
- Utiliser régularisation et sélection univariée avec prudence.
- Mesurer la stabilité d’une sélection.

## Théorie

Une forte colinéarité rend les coefficients instables sans forcément réduire la performance prédictive. Les méthodes de sélection doivent être intégrées à la validation croisée. Une variable apparemment faible seule peut devenir utile en interaction.

## Exemple Python

```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression

model = make_pipeline(
    preprocessor,
    SelectKBest(score_func=mutual_info_classif, k=12),
    LogisticRegression(max_iter=1000),
)
```

## Erreurs fréquentes

- Sélectionner les variables sur tout le dataset.
- Supprimer automatiquement une variable corrélée sans contexte métier.
- Interpréter une importance comme une preuve causale.

## Bonnes pratiques

- Intégrer la sélection dans le pipeline.
- Comparer performance, stabilité et lisibilité.
- Contrôler les variables sensibles et leurs proxys.
- Documenter les variables exclues.

## Question de validation

Pourquoi la sélection de variables doit-elle être recalculée dans chaque fold de validation ?$lesson$,
'Pourquoi la sélection de variables doit-elle être recalculée dans chaque fold de validation ?'),

(3,0,'regression-lineaire-regularisee','Régression linéaire, Ridge et Lasso','Construire des modèles de régression robustes et interprétables.','lesson',100,
'["Ajuster une régression linéaire", "Utiliser Ridge et Lasso", "Interpréter l’effet de la régularisation"]'::jsonb,$lesson$# Régression linéaire, Ridge et Lasso

## Objectifs

- Utiliser une baseline linéaire.
- Comprendre la pénalisation L1 et L2.
- Comparer coefficients, performance et stabilité.

## Théorie

Ridge réduit les coefficients sans les annuler, tandis que Lasso peut effectuer une sélection. La régularisation nécessite généralement des variables mises à l’échelle. Le paramètre alpha contrôle le compromis biais-variance.

## Exemple Python

```python
from sklearn.linear_model import Ridge, Lasso
from sklearn.model_selection import cross_validate
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ridge = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
scores = cross_validate(
    ridge, X, y, cv=5,
    scoring={"mae": "neg_mean_absolute_error", "r2": "r2"},
)
print(-scores["test_mae"].mean(), scores["test_r2"].mean())
```

## Erreurs fréquentes

- Comparer des coefficients sans standardiser.
- Optimiser alpha sur le test final.
- Interpréter R² comme une mesure causale.

## Bonnes pratiques

- Comparer à `DummyRegressor`.
- Rapporter plusieurs métriques.
- Examiner les résidus.
- Contrôler la stabilité des coefficients.

## Question de validation

Quelle différence principale existe entre Ridge et Lasso ?$lesson$,
'Quelle différence principale existe entre Ridge et Lasso ?'),

(3,1,'metriques-diagnostics-regression','Métriques et diagnostics de régression','Choisir les métriques et analyser les erreurs de prédiction.','lesson',100,
'["Comparer MAE, RMSE et R²", "Analyser les résidus", "Évaluer les erreurs par segment"]'::jsonb,$lesson$# Métriques et diagnostics de régression

## Objectifs

- Choisir une métrique adaptée au coût métier.
- Détecter biais systématiques et hétéroscédasticité.
- Localiser les segments mal prédits.

## Théorie

La MAE est robuste et lisible dans l’unité cible. La RMSE pénalise davantage les grosses erreurs. R² compare le modèle à une prédiction moyenne, mais ne dit pas si l’erreur est acceptable métier.

## Exemple Python

```python
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

resultats = pd.DataFrame({"reel": y_test, "predit": pred})
resultats["residu"] = resultats["reel"] - resultats["predit"]
print("MAE", mean_absolute_error(y_test, pred))
print("RMSE", mean_squared_error(y_test, pred, squared=False))
print("R2", r2_score(y_test, pred))
```

## Erreurs fréquentes

- Choisir uniquement la métrique la plus flatteuse.
- Ignorer les erreurs extrêmes.
- Mélanger les unités ou horizons.

## Bonnes pratiques

- Définir une tolérance métier.
- Examiner quantiles et sous-groupes.
- Visualiser prédictions contre valeurs réelles.
- Comparer les erreurs train et validation.

## Question de validation

Dans quel cas la RMSE est-elle préférable à la MAE ?$lesson$,
'Dans quel cas la RMSE est-elle préférable à la MAE ?'),

(4,0,'regression-logistique-probabilites','Régression logistique et probabilités','Construire une baseline de classification probabiliste interprétable.','lesson',105,
'["Entraîner une régression logistique", "Interpréter probabilités et log-odds", "Régulariser les coefficients"]'::jsonb,$lesson$# Régression logistique et probabilités

## Objectifs

- Comprendre la sortie probabiliste d’un classifieur.
- Interpréter les coefficients avec prudence.
- Construire une baseline solide pour le churn.

## Théorie

La régression logistique modélise le logit de la probabilité. Les coefficients indiquent l’effet associé à une variation de variable, toutes choses égales par ailleurs. Ils ne prouvent pas la causalité.

## Exemple Python

```python
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

modele = Pipeline([
    ("preparation", preprocessor),
    ("classification", LogisticRegression(max_iter=1500, class_weight="balanced")),
])
modele.fit(X_train, y_train)
proba = modele.predict_proba(X_test)[:, 1]
```

## Erreurs fréquentes

- Interpréter une probabilité comme une certitude.
- Utiliser un seuil de 0,5 sans justification.
- Lire les coefficients après transformations sans retrouver les noms.

## Bonnes pratiques

- Calibrer et contrôler les probabilités.
- Comparer avec une baseline naïve.
- Standardiser les variables numériques.
- Rapporter les intervalles ou la stabilité.

## Question de validation

Pourquoi le seuil de 0,5 n’est-il pas automatiquement optimal ?$lesson$,
'Pourquoi le seuil de 0,5 n’est-il pas automatiquement optimal ?'),

(4,1,'matrice-confusion-seuils-metriques','Matrice de confusion, seuils et métriques','Choisir un seuil selon les conséquences réelles des erreurs.','lesson',105,
'["Interpréter précision, rappel et spécificité", "Tracer ROC et précision-rappel", "Optimiser un seuil coût-sensible"]'::jsonb,$lesson$# Matrice de confusion, seuils et métriques

## Objectifs

- Relier métriques et types d’erreurs.
- Comparer ROC-AUC et PR-AUC.
- Choisir un seuil selon les coûts métier.

## Théorie

Le rappel mesure la proportion de positifs détectés, la précision la proportion de prédictions positives correctes. Sur une cible rare, la courbe précision-rappel est souvent plus informative que ROC.

## Exemple Python

```python
import numpy as np
from sklearn.metrics import precision_score, recall_score, confusion_matrix

for seuil in [0.25, 0.40, 0.55]:
    pred = (proba >= seuil).astype(int)
    print(seuil, precision_score(y_test, pred), recall_score(y_test, pred))
    print(confusion_matrix(y_test, pred))
```

## Erreurs fréquentes

- Présenter uniquement l’accuracy.
- Choisir le seuil sur le test final.
- Oublier le taux de base de la classe positive.

## Bonnes pratiques

- Définir une fonction de coût métier.
- Choisir le seuil sur validation.
- Rapporter matrice de confusion et taux.
- Vérifier les métriques par sous-groupe.

## Question de validation

Pourquoi PR-AUC est-elle souvent plus utile que ROC-AUC lorsque la classe positive est rare ?$lesson$,
'Pourquoi PR-AUC est-elle souvent plus utile que ROC-AUC lorsque la classe positive est rare ?'),

(5,0,'arbres-decision-random-forest','Arbres de décision et Random Forest','Comprendre les arbres et réduire leur variance avec le bagging.','lesson',110,
'["Entraîner un arbre", "Contrôler profondeur et feuilles", "Utiliser Random Forest"]'::jsonb,$lesson$# Arbres de décision et Random Forest

## Objectifs

- Comprendre la logique de partitionnement.
- Régulariser un arbre.
- Utiliser une forêt aléatoire pour améliorer la généralisation.

## Théorie

Un arbre découpe l’espace des variables pour réduire l’impureté. Il est lisible mais instable. Random Forest entraîne de nombreux arbres sur des échantillons et sous-ensembles de variables, puis agrège leurs prédictions.

## Exemple Python

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline

foret = Pipeline([
    ("preparation", preprocessor),
    ("modele", RandomForestClassifier(
        n_estimators=300,
        max_depth=8,
        min_samples_leaf=10,
        class_weight="balanced",
        random_state=42,
    )),
])
foret.fit(X_train, y_train)
```

## Erreurs fréquentes

- Laisser un arbre croître sans contrainte.
- Utiliser l’importance native comme vérité causale.
- Comparer des modèles avec des splits différents.

## Bonnes pratiques

- Contrôler profondeur et taille minimale des feuilles.
- Utiliser une validation croisée.
- Fixer `random_state`.
- Comparer performance, temps et interprétabilité.

## Question de validation

Pourquoi une Random Forest généralise-t-elle souvent mieux qu’un arbre unique ?$lesson$,
'Pourquoi une Random Forest généralise-t-elle souvent mieux qu’un arbre unique ?'),

(5,1,'gradient-boosting-comparaison-ensembles','Gradient Boosting et comparaison des ensembles','Construire des modèles séquentiels puissants sans perdre le contrôle expérimental.','lesson',110,
'["Comprendre le principe du boosting", "Comparer bagging et boosting", "Contrôler le surapprentissage"]'::jsonb,$lesson$# Gradient Boosting et comparaison des ensembles

## Objectifs

- Comprendre l’apprentissage séquentiel des erreurs.
- Régler profondeur, learning rate et nombre d’arbres.
- Comparer les ensembles sur un protocole unique.

## Théorie

Le boosting ajoute des modèles faibles qui corrigent progressivement les erreurs précédentes. Un learning rate faible avec davantage d’arbres peut améliorer la généralisation, au prix d’un calcul plus long.

## Exemple Python

```python
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.pipeline import Pipeline

boosting = Pipeline([
    ("preparation", preprocessor),
    ("modele", HistGradientBoostingClassifier(
        learning_rate=0.06,
        max_depth=6,
        max_iter=250,
        random_state=42,
    )),
])
boosting.fit(X_train, y_train)
```

## Erreurs fréquentes

- Augmenter le nombre d’arbres sans validation.
- Comparer des modèles avec des prétraitements différents.
- Sélectionner uniquement sur le score moyen.

## Bonnes pratiques

- Comparer moyenne et dispersion des folds.
- Mesurer temps d’entraînement et d’inférence.
- Contrôler calibration et stabilité.
- Conserver une baseline simple.

## Question de validation

Quelle différence conceptuelle oppose bagging et boosting ?$lesson$,
'Quelle différence conceptuelle oppose bagging et boosting ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'machine-learning-python'
      AND m.order_index BETWEEN 0 AND 5
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,
       '["KORYXA Machine Learning avec Python", "Python", "pandas", "NumPy", "scikit-learn"]'::jsonb,
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
    WHERE c.slug = 'machine-learning-python' AND m.order_index BETWEEN 0 AND 5;

    SELECT COUNT(*) INTO duplicate_orders
    FROM (
        SELECT l.module_id,l.order_index
        FROM public.lessons l
        JOIN public.modules m ON m.id=l.module_id
        JOIN public.courses c ON c.id=m.course_id
        WHERE c.slug='machine-learning-python' AND m.order_index BETWEEN 0 AND 5
        GROUP BY l.module_id,l.order_index HAVING COUNT(*)>1
    ) d;

    IF lesson_count<>12 OR module_coverage<>6 OR published_count<>0 OR duplicate_orders<>0 THEN
        RAISE EXCEPTION 'Leçons Machine Learning fondations incomplètes: leçons %, modules %, publiées %, ordres dupliqués %', lesson_count,module_coverage,published_count,duplicate_orders;
    END IF;
END $$;
