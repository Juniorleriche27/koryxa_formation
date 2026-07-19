-- KORYXA FORMATION — STATISTIQUES & DATA SCIENCE AVEC PYTHON — CHANTIER 3
-- Modules avancés 6 à 11 : 12 leçons. Migration idempotente, contenu non publié.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
VALUES
(6,0,'comparer-deux-groupes-tests-parametriques-non-parametriques','Comparer deux groupes : t-test et Mann-Whitney','Choisir, exécuter et interpréter un test de comparaison entre deux groupes indépendants.','lesson',75,
'["Vérifier les hypothèses d’un t-test", "Utiliser Mann-Whitney lorsque le cadre paramétrique est fragile", "Rapporter différence, incertitude et taille d’effet"]'::jsonb,$lesson$# Comparer deux groupes : t-test et Mann-Whitney

## Objectifs

- Choisir entre un **t-test de Welch** et un test de **Mann-Whitney**.
- Vérifier indépendance, distribution, valeurs atypiques et homogénéité des variances.
- Compléter la p-value par un intervalle de confiance et une taille d’effet.

## Théorie

Le t-test compare des moyennes. La variante de Welch est généralement préférable lorsque les variances ou les tailles d’échantillon diffèrent. Mann-Whitney compare les rangs et teste une différence de distribution ; il ne doit pas être présenté automatiquement comme un test des médianes.

## Exemple Python

```python
import numpy as np
from scipy import stats

a = np.array([112, 125, 119, 131, 128, 117])
b = np.array([101, 109, 106, 114, 111, 105])

welch = stats.ttest_ind(a, b, equal_var=False)
mann_whitney = stats.mannwhitneyu(a, b, alternative="two-sided")

pooled_sd = np.sqrt(((a.var(ddof=1) + b.var(ddof=1)) / 2))
cohen_d = (a.mean() - b.mean()) / pooled_sd
print(welch, mann_whitney, cohen_d)
```

## Erreurs fréquentes

- Choisir le test uniquement à partir d’un test de normalité.
- Utiliser Mann-Whitney puis conclure sur les médianes sans vérifier la forme des distributions.
- Confondre significativité statistique et intérêt métier.

## Bonnes pratiques

1. Visualiser les distributions et les effectifs.
2. Privilégier Welch par défaut pour deux moyennes indépendantes.
3. Rapporter la différence estimée, son intervalle et une taille d’effet.
4. Documenter les exclusions et transformations.

## Question de validation

Pourquoi une p-value faible ne suffit-elle pas à conclure qu’une différence est importante pour le métier ?$lesson$,
'Pourquoi une p-value faible ne suffit-elle pas à conclure qu’une différence est importante pour le métier ?'),

(6,1,'anova-chi-deux-tailles-effet','ANOVA, chi-deux et tailles d’effet','Comparer plusieurs groupes et analyser l’association entre variables catégorielles.','lesson',80,
'["Appliquer une ANOVA et ses comparaisons post-hoc", "Tester une association avec le chi-deux", "Calculer eta carré et V de Cramér"]'::jsonb,$lesson$# ANOVA, chi-deux et tailles d’effet

## Objectifs

- Comparer plus de deux moyennes avec une ANOVA.
- Identifier les groupes différents avec un post-hoc contrôlé.
- Mesurer une association entre variables catégorielles avec le chi-deux.

## Théorie

L’ANOVA teste l’égalité globale des moyennes. Un résultat significatif n’indique pas quels groupes diffèrent : une analyse post-hoc est nécessaire. Le chi-deux compare effectifs observés et attendus dans un tableau de contingence. Les tailles d’effet, comme **eta carré** ou le **V de Cramér**, quantifient l’ampleur pratique.

## Exemple Python

```python
import pandas as pd
from scipy import stats

ventes = pd.DataFrame({
    "region": ["Nord"] * 4 + ["Sud"] * 4 + ["Ouest"] * 4,
    "ca": [120, 128, 125, 131, 102, 108, 105, 111, 139, 145, 141, 148],
})

groupes = [g["ca"].to_numpy() for _, g in ventes.groupby("region")]
f_stat, p_value = stats.f_oneway(*groupes)

contingence = pd.crosstab(
    pd.Series(["Nord", "Nord", "Sud", "Sud", "Ouest", "Ouest"]),
    pd.Series(["Oui", "Non", "Oui", "Oui", "Non", "Non"]),
)
chi2, p_chi2, ddl, attendus = stats.chi2_contingency(contingence)
print(f_stat, p_value, chi2, p_chi2)
```

## Erreurs fréquentes

- Enchaîner de nombreux t-tests sans correction.
- Oublier de vérifier les effectifs attendus du chi-deux.
- Présenter un test global comme preuve que tous les groupes diffèrent.

## Bonnes pratiques

- Utiliser Tukey ou une correction adaptée pour les comparaisons multiples.
- Examiner résidus, variance et valeurs atypiques.
- Rapporter une taille d’effet et des intervalles de confiance.
- Regrouper des catégories rares seulement avec justification métier.

## Question de validation

Que faut-il faire après une ANOVA significative pour savoir quels groupes diffèrent ?$lesson$,
'Que faut-il faire après une ANOVA significative pour savoir quels groupes diffèrent ?'),

(7,0,'correlation-pearson-spearman','Corrélation : Pearson, Spearman et lecture critique','Mesurer une association sans la confondre avec une relation causale.','lesson',75,
'["Choisir entre Pearson et Spearman", "Visualiser une relation avant de calculer un coefficient", "Interpréter force, direction et limites"]'::jsonb,$lesson$# Corrélation : Pearson, Spearman et lecture critique

## Objectifs

- Distinguer association linéaire et association monotone.
- Choisir entre Pearson et Spearman.
- Repérer non-linéarité, valeurs influentes et variables confondantes.

## Théorie

Pearson mesure la force d’une relation linéaire. Spearman calcule une corrélation sur les rangs et convient aux relations monotones ou aux données ordinales. Un coefficient proche de zéro peut masquer une relation non linéaire. Aucune corrélation ne démontre à elle seule une causalité.

## Exemple Python

```python
import pandas as pd
from scipy import stats

jeu = pd.DataFrame({
    "budget_pub": [10, 15, 20, 25, 35, 45],
    "ventes": [95, 103, 111, 120, 134, 149],
})

pearson = stats.pearsonr(jeu["budget_pub"], jeu["ventes"])
spearman = stats.spearmanr(jeu["budget_pub"], jeu["ventes"])
print(pearson, spearman)
```

## Erreurs fréquentes

- Calculer une matrice de corrélation sans graphique.
- Interpréter `r = 0` comme absence de toute relation.
- Sélectionner seulement les corrélations favorables après exploration massive.

## Bonnes pratiques

1. Tracer un nuage de points.
2. Vérifier les unités, la période et les valeurs manquantes.
3. Ajouter un intervalle de confiance lorsque possible.
4. Identifier les variables de confusion plausibles.

## Question de validation

Dans quel cas Spearman est-il plus informatif que Pearson ?$lesson$,
'Dans quel cas Spearman est-il plus informatif que Pearson ?'),

(7,1,'regression-lineaire-simple-multiple-diagnostics','Régression simple et multiple : diagnostics et interprétation','Construire un modèle explicatif contrôlé et interpréter ses coefficients.','lesson',90,
'["Ajuster une régression avec statsmodels", "Interpréter coefficients et intervalles", "Diagnostiquer résidus, colinéarité et influence"]'::jsonb,$lesson$# Régression simple et multiple : diagnostics et interprétation

## Objectifs

- Ajuster une régression simple puis multiple.
- Interpréter un coefficient toutes choses égales par ailleurs.
- Contrôler linéarité, résidus, hétéroscédasticité et colinéarité.

## Théorie

La régression linéaire estime l’effet moyen associé à une variation d’une variable explicative, sous les hypothèses du modèle. En multiple, chaque coefficient est conditionnel aux autres variables incluses. Le coefficient de détermination ne mesure ni causalité ni qualité hors échantillon.

## Exemple Python

```python
import pandas as pd
import statsmodels.formula.api as smf

jeu = pd.DataFrame({
    "ventes": [100, 115, 126, 140, 155, 171, 180, 195],
    "budget": [8, 11, 15, 18, 23, 27, 30, 35],
    "prix": [20, 20, 19, 19, 18, 18, 17, 17],
})

modele = smf.ols("ventes ~ budget + prix", data=jeu).fit(cov_type="HC3")
print(modele.summary())
```

## Erreurs fréquentes

- Interpréter un coefficient comme causal sans plan d’identification.
- Comparer des coefficients bruts exprimés dans des unités très différentes.
- Ignorer les résidus, points influents ou interactions plausibles.

## Bonnes pratiques

- Visualiser valeurs prédites et résidus.
- Utiliser des erreurs standards robustes si nécessaire.
- Contrôler la colinéarité et la stabilité des coefficients.
- Séparer objectif explicatif et objectif prédictif.

## Question de validation

Que signifie le coefficient de `budget` dans une régression multiple contenant aussi `prix` ?$lesson$,
'Que signifie le coefficient de budget dans une régression multiple contenant aussi prix ?'),

(8,0,'preparer-standardiser-segmentation-client','Préparer et standardiser les données de segmentation','Construire une matrice client fiable avant le clustering.','lesson',75,
'["Définir l’unité client", "Créer des variables RFM et comportementales", "Standardiser sans fuite ni domination d’échelle"]'::jsonb,$lesson$# Préparer et standardiser les données de segmentation

## Objectifs

- Construire une table avec une ligne par client.
- Traiter valeurs manquantes, asymétrie et variables redondantes.
- Standardiser les variables numériques avant KMeans.

## Théorie

Le clustering dépend directement de la représentation des clients. Une variable exprimée sur une grande échelle peut dominer la distance euclidienne. La standardisation centre et réduit les variables, mais ne corrige ni les mauvaises définitions métier ni les valeurs aberrantes.

## Exemple Python

```python
import pandas as pd
from sklearn.preprocessing import StandardScaler

clients = pd.DataFrame({
    "recence_jours": [5, 42, 11, 120, 18],
    "frequence": [18, 3, 10, 1, 7],
    "montant": [2400, 320, 1350, 80, 760],
})

X = clients[["recence_jours", "frequence", "montant"]].copy()
X["montant"] = X["montant"].clip(upper=X["montant"].quantile(0.99))
X_std = StandardScaler().fit_transform(X)
```

## Erreurs fréquentes

- Mélanger des lignes transactionnelles et des lignes clients.
- Inclure un identifiant numérique comme variable de distance.
- Standardiser avant la séparation d’un jeu de validation dans un pipeline prédictif.

## Bonnes pratiques

- Documenter la fenêtre temporelle d’observation.
- Tester plusieurs jeux de variables cohérents métier.
- Réduire la redondance entre variables fortement corrélées.
- Conserver les valeurs originales pour le profilage final.

## Question de validation

Pourquoi faut-il standardiser les variables avant d’utiliser KMeans ?$lesson$,
'Pourquoi faut-il standardiser les variables avant d’utiliser KMeans ?'),

(8,1,'kmeans-choix-k-profilage-segments','KMeans, choix de K et profilage des segments','Créer des segments stables, interprétables et activables.','lesson',90,
'["Entraîner KMeans de façon reproductible", "Comparer inertie et silhouette", "Profiler et nommer les segments sans caricature"]'::jsonb,$lesson$# KMeans, choix de K et profilage des segments

## Objectifs

- Ajuster KMeans avec plusieurs initialisations.
- Choisir un nombre de groupes à partir de plusieurs critères.
- Traduire les clusters en profils métier actionnables.

## Théorie

KMeans minimise la somme des distances quadratiques aux centroïdes. Il favorise des groupes compacts et approximativement sphériques. Le coude de l’inertie, la silhouette, la stabilité et l’utilité métier doivent être examinés ensemble.

## Exemple Python

```python
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

X = pd.DataFrame({
    "recence": [5, 8, 15, 70, 90, 110, 20, 25],
    "frequence": [20, 18, 12, 4, 2, 1, 9, 7],
    "montant": [2500, 2200, 1500, 450, 210, 80, 980, 760],
})
X_std = StandardScaler().fit_transform(X)

modele = KMeans(n_clusters=3, n_init=20, random_state=42)
labels = modele.fit_predict(X_std)
print("silhouette:", silhouette_score(X_std, labels))
print(X.assign(segment=labels).groupby("segment").median())
```

## Erreurs fréquentes

- Choisir K uniquement parce que la courbe du coude semble jolie.
- Nommer un segment avant d’examiner ses distributions.
- Déployer des segments instables ou trop petits.

## Bonnes pratiques

- Fixer `random_state` et augmenter `n_init`.
- Mesurer la stabilité sur plusieurs échantillons.
- Profiler avec médianes, quantiles, taille et valeur business.
- Réévaluer les segments à intervalles réguliers.

## Question de validation

Pourquoi la meilleure valeur de silhouette n’est-elle pas toujours le meilleur choix métier ?$lesson$,
'Pourquoi la meilleure valeur de silhouette n’est-elle pas toujours le meilleur choix métier ?'),

(9,0,'series-temporelles-tendance-saisonnalite','Séries temporelles : tendance, saisonnalité et préparation','Transformer des ventes datées en série exploitable pour la prévision.','lesson',80,
'["Créer une série temporelle régulière", "Identifier tendance et saisonnalité", "Éviter les agrégations et imputations trompeuses"]'::jsonb,$lesson$# Séries temporelles : tendance, saisonnalité et préparation

## Objectifs

- Indexer, agréger et régulariser une série de ventes.
- Distinguer tendance, saisonnalité, bruit et événements externes.
- Construire des variables temporelles sans fuite de données.

## Théorie

Une série temporelle est ordonnée : les observations ne sont pas interchangeables. La fréquence, les jours manquants, les promotions, ruptures de stock et changements de prix influencent l’interprétation. Une décomposition additive suppose des amplitudes saisonnières relativement stables.

## Exemple Python

```python
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

ventes = pd.DataFrame({
    "date": pd.date_range("2025-01-01", periods=120, freq="D"),
    "ca": [100 + i * 0.5 + (20 if i % 7 in (5, 6) else 0) for i in range(120)],
})
serie = ventes.set_index("date")["ca"].asfreq("D")
decomposition = seasonal_decompose(serie, model="additive", period=7)
print(decomposition.trend.dropna().tail())
```

## Erreurs fréquentes

- Mélanger plusieurs granularités temporelles.
- Remplir tous les jours manquants par zéro sans interprétation métier.
- Calculer une moyenne mobile centrée utilisant le futur.

## Bonnes pratiques

- Définir clairement fréquence et horizon de prévision.
- Conserver un calendrier des promotions et anomalies.
- Comparer série brute, tendance et saisonnalité.
- Vérifier les ruptures structurelles.

## Question de validation

Pourquoi un jour manquant ne doit-il pas toujours être remplacé par zéro ?$lesson$,
'Pourquoi un jour manquant ne doit-il pas toujours être remplacé par zéro ?'),

(9,1,'validation-temporelle-baselines-metriques-prevision','Validation temporelle, baselines et métriques de prévision','Évaluer honnêtement une prévision sans fuite du futur.','lesson',90,
'["Construire un découpage temporel", "Créer des baselines saisonnières", "Comparer MAE, RMSE et MAPE avec leurs limites"]'::jsonb,$lesson$# Validation temporelle, baselines et métriques de prévision

## Objectifs

- Respecter l’ordre du temps lors de l’évaluation.
- Construire une baseline naïve et une baseline saisonnière.
- Choisir une métrique adaptée au coût métier.

## Théorie

Le train/test aléatoire est inadapté à la plupart des prévisions. La validation glissante simule des décisions successives. La MAE est lisible dans l’unité cible ; la RMSE pénalise fortement les grosses erreurs ; la MAPE devient instable avec des valeurs proches de zéro.

## Exemple Python

```python
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error

serie = pd.Series([100, 105, 110, 98, 115, 120, 125, 108, 130, 135, 140, 122])
train, test = serie.iloc[:-3], serie.iloc[-3:]
pred_naive = np.repeat(train.iloc[-1], len(test))

mae = mean_absolute_error(test, pred_naive)
rmse = mean_squared_error(test, pred_naive, squared=False)
print({"MAE": mae, "RMSE": rmse})
```

## Erreurs fréquentes

- Mélanger le futur dans les variables de retard.
- Évaluer un modèle sophistiqué sans baseline.
- Comparer des métriques calculées sur des horizons différents.

## Bonnes pratiques

- Fixer horizon, cadence et période de test avant modélisation.
- Utiliser une validation walk-forward.
- Rapporter l’erreur par horizon, segment ou saison.
- Relier la métrique au coût de sur- ou sous-prévision.

## Question de validation

Pourquoi une séparation aléatoire train/test peut-elle surestimer les performances d’une prévision ?$lesson$,
'Pourquoi une séparation aléatoire train/test peut-elle surestimer les performances d’une prévision ?'),

(10,0,'train-test-cross-validation-metriques','Train/test, validation croisée et choix des métriques','Mesurer la capacité de généralisation d’un modèle.','lesson',80,
'["Construire un protocole d’évaluation", "Choisir une validation croisée adaptée", "Aligner la métrique sur le problème métier"]'::jsonb,$lesson$# Train/test, validation croisée et choix des métriques

## Objectifs

- Séparer apprentissage, sélection et évaluation finale.
- Utiliser la validation croisée sans fuite de données.
- Choisir une métrique cohérente avec la cible et les coûts.

## Théorie

Le jeu de test doit rester indépendant jusqu’à la décision finale. La validation croisée estime la variabilité de performance sur plusieurs partitions. Toutes les transformations apprises doivent être incluses dans un pipeline afin qu’elles soient recalculées dans chaque fold.

## Exemple Python

```python
from sklearn.datasets import load_diabetes
from sklearn.model_selection import KFold, cross_validate
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge

X, y = load_diabetes(return_X_y=True)
pipeline = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
cv = KFold(n_splits=5, shuffle=True, random_state=42)
resultats = cross_validate(
    pipeline, X, y, cv=cv,
    scoring={"mae": "neg_mean_absolute_error", "r2": "r2"},
)
print(-resultats["test_mae"].mean(), resultats["test_r2"].mean())
```

## Erreurs fréquentes

- Normaliser toutes les données avant la validation croisée.
- Ajuster les hyperparamètres sur le jeu de test.
- Choisir une métrique uniquement parce qu’elle est populaire.

## Bonnes pratiques

- Utiliser `Pipeline` pour encapsuler les transformations.
- Rapporter moyenne et dispersion des scores.
- Conserver un test final verrouillé.
- Comparer à une baseline simple.

## Question de validation

Pourquoi la standardisation doit-elle être effectuée à l’intérieur du pipeline de validation croisée ?$lesson$,
'Pourquoi la standardisation doit-elle être effectuée à l’intérieur du pipeline de validation croisée ?'),

(10,1,'overfitting-importance-variables-limites','Surapprentissage, importance des variables et limites','Diagnostiquer un modèle et expliquer ses limites sans surpromesse.','lesson',85,
'["Détecter biais et variance", "Comparer plusieurs méthodes d’importance", "Documenter incertitudes, dérive et limites d’usage"]'::jsonb,$lesson$# Surapprentissage, importance des variables et limites

## Objectifs

- Reconnaître le surapprentissage à partir des performances train/validation.
- Interpréter prudemment les importances de variables.
- Documenter les limites techniques, statistiques et métier.

## Théorie

Un modèle surappris mémorise des particularités du train qui ne se généralisent pas. Les importances natives peuvent être biaisées vers certaines variables. L’importance par permutation mesure la perte de performance après perturbation, mais reste sensible aux variables corrélées.

## Exemple Python

```python
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

X, y = load_diabetes(return_X_y=True, as_frame=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=42
)
modele = RandomForestRegressor(n_estimators=300, random_state=42)
modele.fit(X_train, y_train)
importance = permutation_importance(
    modele, X_test, y_test, n_repeats=20, random_state=42
)
print(modele.score(X_train, y_train), modele.score(X_test, y_test))
```

## Erreurs fréquentes

- Présenter importance et causalité comme équivalentes.
- Ignorer l’écart train/validation.
- Déployer un modèle sans plage de validité ni surveillance.

## Bonnes pratiques

- Comparer modèle simple et modèle complexe.
- Utiliser courbes d’apprentissage et validation répétée.
- Tester robustesse, sous-groupes et dérive temporelle.
- Écrire explicitement ce que le modèle ne permet pas de conclure.

## Question de validation

Pourquoi une variable très importante pour la prédiction n’est-elle pas nécessairement une cause du résultat ?$lesson$,
'Pourquoi une variable très importante pour la prédiction n’est-elle pas nécessairement une cause du résultat ?'),

(11,0,'storytelling-notebook-reproductible','Storytelling et notebook professionnel reproductible','Transformer une analyse en document clair, vérifiable et exécutable.','lesson',80,
'["Structurer un notebook orienté décision", "Rendre l’analyse reproductible", "Hiérarchiser messages, preuves et limites"]'::jsonb,$lesson$# Storytelling et notebook professionnel reproductible

## Objectifs

- Organiser une étude autour d’une question métier.
- Séparer données, méthode, résultats et recommandations.
- Rendre le notebook réexécutable de bout en bout.

## Théorie

Un bon notebook est un produit de communication et un artefact technique. Il doit raconter une progression logique : contexte, question, données, méthode, résultats, limites et décision. La reproductibilité exige versions, graine, dépendances, chemins relatifs et absence d’état caché.

## Exemple Python

```python
from pathlib import Path
import random
import numpy as np

SEED = 42
random.seed(SEED)
np.random.seed(SEED)

DATA_DIR = Path("data")
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

assert DATA_DIR.exists(), "Le dossier de données est introuvable"
```

## Erreurs fréquentes

- Laisser des cellules dépendre d’un ordre d’exécution implicite.
- Mélanger exploration brute et restitution finale.
- Afficher des tableaux ou graphiques sans message principal.

## Bonnes pratiques

- Utiliser un titre déclaratif par section.
- Exécuter le notebook depuis un kernel propre.
- Externaliser les fonctions répétées.
- Ajouter provenance, dictionnaire des variables et limites.

## Question de validation

Quels éléments permettent de vérifier qu’un notebook est réellement reproductible ?$lesson$,
'Quels éléments permettent de vérifier qu’un notebook est réellement reproductible ?'),

(11,1,'recommandations-ethique-restitution-metier','Recommandations, éthique et restitution métier','Livrer des conclusions actionnables, responsables et proportionnées aux preuves.','lesson',85,
'["Formuler une recommandation mesurable", "Présenter risques, biais et incertitudes", "Adapter la restitution à un public métier"]'::jsonb,$lesson$# Recommandations, éthique et restitution métier

## Objectifs

- Convertir un résultat analytique en recommandation opérationnelle.
- Présenter hypothèses, incertitudes et risques éthiques.
- Construire une restitution adaptée aux décideurs.

## Théorie

Une recommandation solide précise l’action, la cible, l’impact attendu, les conditions de succès et le mécanisme de suivi. L’éthique concerne la collecte, la représentativité, la confidentialité, l’équité et les effets de la décision. Une restitution honnête distingue faits, interprétations et décisions.

## Exemple Python

```python
rapport = {
    "decision": "Tester une relance dédiée au segment à forte valeur et faible récence",
    "population": "Clients actifs depuis moins de 12 mois",
    "indicateur": "Taux de réachat à 30 jours",
    "garde_fous": [
        "opt-out respecté",
        "aucune variable sensible utilisée",
        "suivi des écarts par sous-groupe",
    ],
    "seuil_decision": "+3 points avec intervalle compatible avec un effet positif",
}
```

## Erreurs fréquentes

- Promettre une précision ou un impact non démontré.
- Masquer les groupes mal représentés.
- Présenter une segmentation comme une identité permanente.

## Bonnes pratiques

- Donner une recommandation, une alternative et un plan de mesure.
- Séparer clairement prédiction, explication et causalité.
- Documenter consentement, minimisation et durée de conservation.
- Prévoir une revue humaine des décisions sensibles.

## Question de validation

Quelles informations doivent accompagner une recommandation data pour qu’un décideur puisse l’utiliser de façon responsable ?$lesson$,
'Quelles informations doivent accompagner une recommandation data pour qu’un décideur puisse l’utiliser de façon responsable ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python'
      AND m.order_index BETWEEN 6 AND 11
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,
       '["KORYXA Statistiques & Data Science", "Python", "pandas", "NumPy", "SciPy", "statsmodels", "scikit-learn"]'::jsonb,
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
DECLARE
    lesson_count INT;
    module_coverage INT;
    published_count INT;
    duplicate_orders INT;
BEGIN
    SELECT COUNT(*), COUNT(DISTINCT m.id), COUNT(*) FILTER (WHERE l.is_published)
    INTO lesson_count, module_coverage, published_count
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python'
      AND m.order_index BETWEEN 6 AND 11;

    SELECT COUNT(*)
    INTO duplicate_orders
    FROM (
        SELECT l.module_id, l.order_index
        FROM public.lessons l
        JOIN public.modules m ON m.id = l.module_id
        JOIN public.courses c ON c.id = m.course_id
        WHERE c.slug = 'statistics-data-science-python'
          AND m.order_index BETWEEN 6 AND 11
        GROUP BY l.module_id, l.order_index
        HAVING COUNT(*) > 1
    ) duplicates;

    IF lesson_count <> 12 OR module_coverage <> 6 OR published_count <> 0 OR duplicate_orders <> 0 THEN
        RAISE EXCEPTION 'Leçons avancées incomplètes: leçons %, modules %, publiées %, ordres dupliqués %',
            lesson_count, module_coverage, published_count, duplicate_orders;
    END IF;
END $$;
