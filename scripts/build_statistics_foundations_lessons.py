from pathlib import Path
import json

lessons = [
(0,0,'population-echantillon-variables','Population, échantillon et types de variables','Poser correctement une question statistique avant tout calcul.',45,
 ['Distinguer population et échantillon','Identifier variables qualitatives et quantitatives','Définir l’unité statistique'],
 ['La population est l’ensemble visé par la décision.','L’échantillon est la partie réellement observée.','Le type de variable détermine les méthodes et graphiques adaptés.'],
 "À partir d’un fichier de ventes, identifier la population cible, l’unité statistique, les variables et leur type avec pandas.dtypes et nunique().",
 ['Confondre une ligne avec une variable.','Généraliser à toute la population sans vérifier la représentativité.'],
 'Pourquoi le type d’une variable influence-t-il le choix d’une méthode statistique ?'),
(0,1,'biais-causalite-question-statistique','Biais, confusion et causalité','Transformer une question métier en question statistique testable.',45,
 ['Reconnaître les principaux biais','Distinguer association et causalité','Formuler une hypothèse mesurable'],
 ['Un biais de sélection modifie systématiquement les observations recueillies.','Une variable confondante peut expliquer une association apparente.','Une corrélation seule ne prouve pas un effet causal.'],
 "Analyser une hausse de ventes après campagne et lister les explications alternatives : saison, région, promotion, changement de prix.",
 ['Présenter une association comme une preuve de causalité.','Définir l’indicateur après avoir vu le résultat.'],
 'Quelle information supplémentaire est nécessaire pour défendre une conclusion causale ?'),
(1,0,'tendance-centrale-position','Mesures de tendance centrale et de position','Résumer une distribution avec des indicateurs robustes.',55,
 ['Calculer moyenne, médiane et mode','Interpréter quartiles et percentiles','Choisir un indicateur adapté à la distribution'],
 ['La moyenne utilise toutes les valeurs mais réagit aux extrêmes.','La médiane partage les observations en deux groupes.','Les quantiles situent une valeur dans la distribution.'],
 "Avec pandas, calculer mean(), median(), mode() et quantile([0.25,0.5,0.75]) sur le panier client, puis comparer les résultats.",
 ['Utiliser la moyenne sur une distribution fortement asymétrique sans commentaire.','Comparer des moyennes issues d’unités différentes.'],
 'Dans quel cas la médiane décrit-elle mieux un niveau typique que la moyenne ?'),
(1,1,'dispersion-asymetrie-statistiques-groupees','Dispersion, asymétrie et statistiques groupées','Mesurer l’hétérogénéité et comparer des groupes.',60,
 ['Calculer variance, écart-type et IQR','Interpréter l’asymétrie','Produire une synthèse par groupe'],
 ['L’écart-type mesure la dispersion autour de la moyenne.','L’IQR est robuste aux valeurs extrêmes.','Une comparaison par groupe doit garder les mêmes unités et définitions.'],
 "Utiliser groupby().agg() pour comparer effectif, moyenne, médiane, écart-type et IQR du chiffre d’affaires par région.",
 ['Comparer uniquement les moyennes sans examiner la dispersion.','Utiliser ddof incohérent entre plusieurs calculs.'],
 'Pourquoi deux groupes ayant la même moyenne peuvent-ils exiger des décisions différentes ?'),
(2,0,'histogramme-boxplot-densite','Histogrammes, boxplots et densité','Visualiser correctement la forme d’une distribution.',55,
 ['Choisir un graphique selon la question','Lire concentration et asymétrie','Comparer plusieurs distributions'],
 ['L’histogramme montre la fréquence par intervalle.','Le boxplot résume médiane, quartiles et valeurs éloignées.','La densité est une estimation lissée sensible au paramètre de lissage.'],
 "Tracer avec matplotlib un histogramme et un boxplot du montant des ventes, puis comparer les distributions par canal.",
 ['Choisir des classes d’histogramme qui cachent la structure.','Interpréter la hauteur d’une densité comme un nombre de lignes.'],
 'Quel graphique utiliseriez-vous pour comparer rapidement les dispersions de quatre régions ?'),
(2,1,'valeurs-atypiques-transformations','Valeurs atypiques et transformations','Détecter les observations influentes sans les supprimer automatiquement.',55,
 ['Détecter des valeurs atypiques avec IQR','Évaluer leur origine métier','Appliquer une transformation logarithmique'],
 ['Une valeur atypique peut être une erreur ou une observation légitime.','La règle 1,5 × IQR est un signal, pas une décision automatique.','La transformation logarithmique réduit souvent l’asymétrie positive.'],
 "Calculer les bornes IQR, isoler les ventes extrêmes, vérifier leur contexte puis comparer la distribution avant et après np.log1p().",
 ['Supprimer toute valeur extrême sans enquête.','Appliquer log à des valeurs négatives sans adaptation.'],
 'Quelles vérifications métier faut-il mener avant d’exclure une valeur atypique ?'),
(3,0,'probabilites-conditionnelles-independance','Probabilités conditionnelles et indépendance','Quantifier un risque en tenant compte du contexte.',60,
 ['Calculer une probabilité simple','Calculer une probabilité conditionnelle','Tester conceptuellement l’indépendance'],
 ['P(A|B) mesure la probabilité de A sachant B.','Deux événements indépendants vérifient P(A∩B)=P(A)P(B).','Une fréquence observée estime une probabilité sous certaines conditions.'],
 "Estimer avec pandas la probabilité de retour produit, puis P(retour | canal='En ligne') et comparer aux autres canaux.",
 ['Confondre P(A|B) et P(B|A).','Ignorer les faibles effectifs dans certains groupes.'],
 'Comment vérifier empiriquement si deux événements semblent indépendants ?'),
(3,1,'lois-binomiale-normale-esperance','Variables aléatoires et lois usuelles','Modéliser des phénomènes métier avec des distributions adaptées.',65,
 ['Calculer espérance et variance','Reconnaître une situation binomiale','Utiliser la loi normale avec prudence'],
 ['Une variable binomiale compte des succès sur n essais indépendants.','La loi normale décrit des phénomènes continus symétriques dans de nombreux contextes.','L’espérance représente une moyenne théorique à long terme.'],
 "Avec scipy.stats, calculer la probabilité d’au moins 8 conversions sur 20 avec binom, puis standardiser une variable approximativement normale.",
 ['Utiliser la loi normale pour une variable très asymétrique.','Supposer l’indépendance des essais sans justification.'],
 'Quelles conditions doivent être raisonnables avant d’utiliser une loi binomiale ?'),
(4,0,'echantillonnage-erreur-standard','Échantillonnage et erreur standard','Comprendre comment un échantillon varie d’un tirage à l’autre.',55,
 ['Comparer plusieurs stratégies d’échantillonnage','Calculer une erreur standard','Relier taille d’échantillon et précision'],
 ['Un échantillonnage aléatoire réduit certains biais de sélection.','L’erreur standard mesure la variabilité d’un estimateur.','La précision augmente en général avec la racine carrée de la taille.'],
 "Tirer plusieurs échantillons avec DataFrame.sample(random_state=...), calculer leurs moyennes et observer la dispersion des estimateurs.",
 ['Confondre écart-type des données et erreur standard de la moyenne.','Réutiliser un échantillon de convenance comme s’il était aléatoire.'],
 'Pourquoi doubler la taille d’un échantillon ne divise-t-il pas toujours l’erreur standard par deux ?'),
(4,1,'bootstrap-intervalle-confiance','Bootstrap et intervalles de confiance','Estimer l’incertitude d’un indicateur par simulation.',65,
 ['Construire un bootstrap reproductible','Calculer un intervalle percentile','Interpréter correctement un intervalle de confiance'],
 ['Le bootstrap rééchantillonne avec remise les observations disponibles.','Un intervalle percentile utilise les quantiles des estimateurs simulés.','Un intervalle de confiance décrit une procédure, pas une probabilité fixe du paramètre observé.'],
 "Générer 5 000 réplications bootstrap de la médiane du panier avec numpy.random.default_rng, puis extraire les percentiles 2,5 et 97,5.",
 ['Oublier la graine aléatoire dans un notebook reproductible.','Présenter l’intervalle comme contenant 95 % des observations individuelles.'],
 'Que signifie concrètement un intervalle de confiance à 95 % dans une procédure répétée ?'),
(5,0,'hypotheses-pvalue-erreurs','Hypothèses, p-value et risques d’erreur','Structurer un test statistique sans surinterpréter le résultat.',65,
 ['Formuler H0 et H1','Interpréter une p-value','Distinguer erreurs de type I et II'],
 ['H0 représente le modèle de référence testé.','La p-value est calculée sous l’hypothèse nulle.','Le seuil alpha contrôle le risque de faux positif sous les conditions du test.'],
 "Tester avec scipy.stats.ttest_1samp si le panier moyen diffère d’un objectif, puis documenter H0, H1, alpha, statistique, p-value et décision.",
 ['Dire que la p-value est la probabilité que H0 soit vraie.','Changer le seuil après avoir vu le résultat.'],
 'Que mesure réellement une p-value ?'),
(5,1,'choisir-test-puissance-taille-effet','Choisir un test, mesurer l’effet et la puissance','Prendre une décision statistique et métier cohérente.',70,
 ['Choisir un test selon le plan d’étude','Calculer une taille d’effet','Comprendre la puissance statistique'],
 ['Le choix du test dépend du type de variable, des groupes et des hypothèses.','Une taille d’effet mesure l’importance pratique de la différence.','La puissance est la probabilité de détecter un effet réel donné.'],
 "Comparer deux variantes de campagne avec ttest_ind ou Mann-Whitney selon les diagnostics, puis calculer Cohen d et discuter la puissance.",
 ['Confondre significativité et importance métier.','Multiplier les tests sans correction ni plan préalable.'],
 'Pourquoi faut-il rapporter une taille d’effet avec la p-value ?'),
]

def esc(s): return s.replace("'", "''")
def j(v): return json.dumps(v, ensure_ascii=False).replace("'", "''")
rows=[]
for mo,lo,slug,title,summary,minutes,objectives,concepts,demo,errors,prompt in lessons:
    content=(f"# {title}\n\n## Objectif\n\n{summary}\n\n## Concepts essentiels\n\n"+
             "\n".join(f"- {x}" for x in concepts)+
             f"\n\n## Mise en pratique Python\n\n{demo}\n\n## Méthode de contrôle\n\n1. Vérifier les types et les valeurs manquantes.\n2. Fixer une graine aléatoire lorsque le calcul est simulé.\n3. Contrôler les hypothèses de la méthode.\n4. Rapporter l’indicateur, son incertitude et sa limite d’interprétation.\n\n## Erreurs à éviter\n\n"+
             "\n".join(f"- {x}" for x in errors)+
             "\n\n## Résumé opérationnel\n\nUn résultat statistique sérieux associe une question claire, une méthode justifiée, un calcul reproductible et une conclusion proportionnée aux données.")
    rows.append(f"    ({mo},{lo},'{slug}','{esc(title)}','{esc(summary)}','lesson',{minutes},'{j(objectives)}'::jsonb,$lesson${content}$lesson$,'{esc(prompt)}')")

sql="""-- KORYXA FORMATION — STATISTIQUES & DATA SCIENCE AVEC PYTHON — CHANTIER 2
-- Fondamentaux statistiques : 12 leçons sur les modules 0 à 5. Toutes restent non publiées.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
    VALUES
""" + ",\n".join(rows) + """
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python'
      AND m.order_index BETWEEN 0 AND 5
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,'["KORYXA Statistiques & Data Science", "Python", "pandas", "NumPy", "SciPy"]'::jsonb,
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
DECLARE lesson_count INT; module_coverage INT; published_count INT;
BEGIN
    SELECT COUNT(*), COUNT(DISTINCT m.id), COUNT(*) FILTER (WHERE l.is_published)
    INTO lesson_count, module_coverage, published_count
    FROM public.lessons l
    JOIN public.modules m ON m.id=l.module_id
    JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='statistics-data-science-python'
      AND m.order_index BETWEEN 0 AND 5;
    IF lesson_count<>12 OR module_coverage<>6 OR published_count<>0 THEN
        RAISE EXCEPTION 'Fondamentaux statistiques incomplets: leçons %, modules couverts %, publiées %', lesson_count, module_coverage, published_count;
    END IF;
END $$;
"""
Path('supabase/migrations/20260806_seed_statistics_data_science_foundations_lessons.sql').write_text(sql,encoding='utf-8')
print('generated', len(lessons), 'lessons')
