-- KORYXA FORMATION — EXCEL DATA ANALYST — CHANTIER 3
-- Fichiers pratiques, exercices guidés et ressources officielles.
-- Tous les contenus restent non publiés jusqu'au Chantier 6.

WITH course_row AS (
    SELECT id FROM public.courses WHERE slug = 'excel-data-analyst'
), module_rows AS (
    SELECT m.id, m.order_index
    FROM public.modules m
    JOIN course_row c ON c.id = m.course_id
), exercise_seed(module_order,slug,title,exercise_type,brief_md,starter_files,expected_result_md,hints,solution_md,estimated_minutes) AS (
    VALUES
    (0,'structurer-classeur-professionnel','Structurer un classeur professionnel','guided',
     'Téléchargez le classeur de départ. Réorganisez les feuilles et les zones de travail, vérifiez les types de données et expliquez les références relatives et absolues utilisées.',
     '[{"name":"01_fondamentaux_formules.xlsx","path":"/resources/excel-data-analyst/01_fondamentaux_formules.xlsx","purpose":"Classeur de départ avec ventes et paramètres"}]'::jsonb,
     'Un classeur lisible avec feuilles clairement nommées, tableau structuré, formats cohérents et références correctement verrouillées.',
     '["Séparez données, paramètres et synthèse.","Le taux de TVA doit rester fixe lorsque la formule est recopiée."]'::jsonb,
     'Créer une structure Données / Calculs / Synthèse, convertir la base en tableau, formater les dates et montants, puis utiliser une référence absolue pour le taux de TVA.',40),
    (1,'fiabiliser-formules-ventes','Fiabiliser les formules de ventes','debug',
     'Contrôlez les calculs du fichier fondamentaux, ajoutez TVA, marge, statut d’objectif et une gestion explicite des erreurs.',
     '[{"name":"01_fondamentaux_formules.xlsx","path":"/resources/excel-data-analyst/01_fondamentaux_formules.xlsx","purpose":"Base de calcul à compléter"}]'::jsonb,
     'Les calculs sont recopiables, les erreurs sont explicites et le statut dépend de l’objectif mensuel.',
     '["Utilisez SOMME pour le total.","Préférez À vérifier à un zéro silencieux lorsqu’une donnée manque."]'::jsonb,
     'Calculer CA brut = quantité × prix, CA net = CA brut × (1-remise), TVA avec une référence absolue, puis SI pour le statut et SIERREUR uniquement autour des divisions à risque.',50),
    (2,'nettoyer-base-clients','Nettoyer et contrôler une base','guided',
     'À partir du classeur de départ, identifiez doublons, cellules vides, catégories incohérentes et nombres stockés comme texte. Ajoutez des validations de données.',
     '[{"name":"01_fondamentaux_formules.xlsx","path":"/resources/excel-data-analyst/01_fondamentaux_formules.xlsx","purpose":"Base à auditer"}]'::jsonb,
     'Une table propre, sans doublon injustifié, avec formats normalisés et listes de validation pour les catégories.',
     '["Définissez d’abord la clé qui rend une ligne unique.","Placez les listes autorisées dans une feuille Référentiels."]'::jsonb,
     'Créer une feuille Référentiels, normaliser Région et Commercial, convertir les nombres texte, supprimer uniquement les doublons sur Référence et ajouter les validations.',45),
    (3,'enrichir-ventes-recherchex','Enrichir des ventes avec RECHERCHEX','challenge',
     'Complétez prix, catégorie et chiffre d’affaires à partir du référentiel produits. Signalez les codes absents au lieu de les masquer.',
     '[{"name":"02_recherches_et_kpi.xlsx","path":"/resources/excel-data-analyst/02_recherches_et_kpi.xlsx","purpose":"Ventes et référentiel produits"}]'::jsonb,
     'Toutes les lignes valides sont enrichies et le code P999 apparaît clairement comme anomalie.',
     '["Utilisez Code produit comme clé.","Le quatrième argument de RECHERCHEX peut afficher Code inconnu."]'::jsonb,
     'Utiliser RECHERCHEX sur la feuille Produits, afficher Code inconnu pour P999, calculer CA avec SIERREUR ciblé et filtrer les anomalies.',50),
    (4,'normaliser-textes-dates','Normaliser textes et dates','guided',
     'Créez des identifiants propres, extrayez mois et trimestre, calculez des délais et vérifiez que toutes les dates sont de vraies dates Excel.',
     '[{"name":"02_recherches_et_kpi.xlsx","path":"/resources/excel-data-analyst/02_recherches_et_kpi.xlsx","purpose":"Données de ventes à enrichir"}]'::jsonb,
     'Les colonnes texte sont homogènes et chaque ligne possède mois, trimestre et délai calculables.',
     '["SUPPRESPACE nettoie les espaces inutiles.","ESTNUM permet de contrôler qu’une date est reconnue."]'::jsonb,
     'Nettoyer les libellés avec SUPPRESPACE, construire un identifiant avec CONCAT, extraire ANNEE et MOIS, puis tester les dates avec ESTNUM.',45),
    (5,'construire-kpi-conditionnels','Construire des KPI multicritères','challenge',
     'Complétez la feuille KPI avec chiffre d’affaires, nombre de ventes, panier moyen et résultats filtrés par région.',
     '[{"name":"02_recherches_et_kpi.xlsx","path":"/resources/excel-data-analyst/02_recherches_et_kpi.xlsx","purpose":"Classeur KPI"}]'::jsonb,
     'Une synthèse dynamique qui se recalcule lorsque la région sélectionnée change.',
     '["Utilisez SOMME.SI.ENS et NB.SI.ENS.","Le panier moyen doit gérer le cas où aucune vente ne correspond."]'::jsonb,
     'Créer une cellule de sélection Région, utiliser SOMME.SI.ENS, NB.SI.ENS et SIERREUR pour produire CA, volume et panier moyen.',55),
    (6,'creer-tcd-interactif','Créer un tableau croisé dynamique interactif','guided',
     'Construisez un TCD par région et produit, regroupez les dates par mois et ajoutez un segment Commercial.',
     '[{"name":"03_tcd_et_visualisation.xlsx","path":"/resources/excel-data-analyst/03_tcd_et_visualisation.xlsx","purpose":"Source TCD et consignes"}]'::jsonb,
     'Un TCD actualisable, filtrable par commercial et période, avec sommes correctement agrégées.',
     '["Vérifiez que CA est agrégé par Somme.","Connectez les segments à tous les TCD concernés."]'::jsonb,
     'Créer le TCD depuis la table source, placer Région en lignes, Produit en colonnes, CA en valeurs, Date en filtre groupé et ajouter les segments.',60),
    (7,'transformer-graphique-defaut','Transformer un graphique Excel par défaut','challenge',
     'À partir du TCD, créez une courbe mensuelle et un classement en barres. Réduisez le bruit visuel et rédigez des titres déclaratifs.',
     '[{"name":"03_tcd_et_visualisation.xlsx","path":"/resources/excel-data-analyst/03_tcd_et_visualisation.xlsx","purpose":"Données et guide de visualisation"}]'::jsonb,
     'Deux graphiques lisibles, cohérents, sans 3D, avec unités, titre informatif et une couleur d’accent.',
     '["Une courbe montre l’évolution.","Les barres horizontales facilitent la comparaison de catégories."]'::jsonb,
     'Créer une courbe du CA mensuel et des barres par produit, supprimer bordures et quadrillages excessifs, puis ajouter titres déclaratifs et unités.',55),
    (8,'consolider-fichiers-power-query','Consolider quatre fichiers avec Power Query','guided',
     'Importez les quatre CSV mensuels depuis un dossier, définissez les types, combinez-les et fusionnez avec les référentiels du classeur.',
     '[{"name":"04_power_query_modele_dashboard.xlsx","path":"/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx","purpose":"Référentiels et instructions"},{"name":"ventes_2026_01.csv","path":"/resources/excel-data-analyst/ventes_2026_01.csv","purpose":"Ventes janvier"},{"name":"ventes_2026_02.csv","path":"/resources/excel-data-analyst/ventes_2026_02.csv","purpose":"Ventes février"},{"name":"ventes_2026_03.csv","path":"/resources/excel-data-analyst/ventes_2026_03.csv","purpose":"Ventes mars"},{"name":"ventes_2026_04.csv","path":"/resources/excel-data-analyst/ventes_2026_04.csv","purpose":"Ventes avril"}]'::jsonb,
     'Une requête actualisable contenant les quatre mois, les libellés produits et régions, CA et marge.',
     '["Utilisez le connecteur Dossier.","Contrôlez les lignes sans correspondance après chaque fusion."]'::jsonb,
     'Importer le dossier, transformer le fichier exemple, développer les tables, définir les types, fusionner les référentiels, calculer CA et Marge puis charger la requête.',75),
    (9,'construire-modele-etoile','Construire un modèle en étoile','challenge',
     'Chargez la requête dans le modèle de données, créez les dimensions Produit, Région et Date puis écrivez trois mesures DAX.',
     '[{"name":"04_power_query_modele_dashboard.xlsx","path":"/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx","purpose":"Classeur de modélisation"},{"name":"ventes_2026_01.csv","path":"/resources/excel-data-analyst/ventes_2026_01.csv","purpose":"Données mensuelles"}]'::jsonb,
     'Un modèle en étoile sans relation ambiguë, avec mesures CA Total, Marge Totale et Taux de marge.',
     '["La clé de chaque dimension doit être unique.","Utilisez DIVIDE pour le taux de marge."]'::jsonb,
     'Créer FaitVentes et les dimensions, relier chaque dimension en un-à-plusieurs puis ajouter SUM pour CA et Marge et DIVIDE pour le taux.',75),
    (10,'assembler-dashboard-commercial','Assembler un dashboard commercial','challenge',
     'Construisez une page de synthèse avec quatre KPI, une tendance mensuelle, un classement produits et des filtres interactifs.',
     '[{"name":"04_power_query_modele_dashboard.xlsx","path":"/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx","purpose":"Base du dashboard"},{"name":"03_tcd_et_visualisation.xlsx","path":"/resources/excel-data-analyst/03_tcd_et_visualisation.xlsx","purpose":"Exemple de source analytique"}]'::jsonb,
     'Un dashboard lisible en un écran, cohérent, interactif et orienté vers trois questions métier précises.',
     '["Limitez-vous à trois à cinq KPI.","Testez les filtres sur tous les graphiques."]'::jsonb,
     'Placer CA, Marge, Taux de marge et Nombre de ventes en haut, ajouter courbe mensuelle, barres produits, segments Région et Commercial, puis tester les interactions.',90),
    (11,'auditer-proteger-classeur','Auditer et protéger le classeur final','debug',
     'Contrôlez les erreurs, documentez les sources, protégez les zones sensibles et automatisez une tâche répétitive sans fragiliser le fichier.',
     '[{"name":"04_power_query_modele_dashboard.xlsx","path":"/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx","purpose":"Classeur final à fiabiliser"}]'::jsonb,
     'Un fichier sans erreur visible, avec feuille Lisez-moi, zones de saisie identifiées, protection et procédure d’actualisation.',
     '["Recherchez #N/A, #DIV/0! et #REF!.","Préférez Power Query à une macro pour les transformations de données."]'::jsonb,
     'Créer une feuille Lisez-moi, vérifier les formules, contrôler les totaux, déverrouiller uniquement les cellules de saisie, protéger les feuilles et documenter Actualiser tout.',60)
)
INSERT INTO public.exercises(
    course_id,module_id,slug,title,exercise_type,brief_md,starter_files,
    expected_result_md,hints,solution_md,order_index,estimated_minutes,is_published
)
SELECT c.id,m.id,e.slug,e.title,e.exercise_type,e.brief_md,e.starter_files,
       e.expected_result_md,e.hints,e.solution_md,0,e.estimated_minutes,FALSE
FROM course_row c
JOIN module_rows m ON TRUE
JOIN exercise_seed e ON e.module_order = m.order_index
ON CONFLICT(course_id,slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    exercise_type = EXCLUDED.exercise_type,
    brief_md = EXCLUDED.brief_md,
    starter_files = EXCLUDED.starter_files,
    expected_result_md = EXCLUDED.expected_result_md,
    hints = EXCLUDED.hints,
    solution_md = EXCLUDED.solution_md,
    estimated_minutes = EXCLUDED.estimated_minutes,
    is_published = FALSE;

WITH c AS (
    SELECT id FROM public.courses WHERE slug = 'excel-data-analyst'
), resources(module_order,slug,title,summary,content_md,ord) AS (
    VALUES
    (0,'microsoft-excel-help','Aide et apprentissage Excel','Portail officiel Microsoft pour retrouver les fonctionnalités et guides Excel.','# Ressource officielle\n\n[Consulter l’aide et l’apprentissage Excel](https://support.microsoft.com/fr-fr/excel)',0),
    (1,'microsoft-formules-fonctions','Vue d’ensemble des formules','Principes de base pour créer et recopier des formules Excel.','# Ressource officielle\n\n[Consulter la vue d’ensemble des formules](https://support.microsoft.com/fr-fr/office/vue-d-ensemble-des-formules-dans-excel-ecfdc708-9162-49e8-b993-c311f47ca173)',1),
    (2,'microsoft-tableaux-excel','Créer et mettre en forme un tableau','Guide officiel sur les tableaux structurés Excel.','# Ressource officielle\n\n[Créer et mettre en forme un tableau](https://support.microsoft.com/fr-fr/office/cr%C3%A9er-et-mettre-en-forme-un-tableau-2c7f83b6-5f23-4fa8-b3d3-30c0b36e7f09)',2),
    (3,'microsoft-recherchex','Fonction RECHERCHEX','Documentation officielle de la fonction RECHERCHEX.','# Ressource officielle\n\n[Consulter la fonction RECHERCHEX](https://support.microsoft.com/fr-fr/office/fonction-recherchex-b7fd680e-6d10-43e6-84f9-88eae8bf5929)',3),
    (4,'microsoft-fonctions-date','Fonctions de date et heure','Référence officielle des fonctions de date et heure Excel.','# Ressource officielle\n\n[Consulter les fonctions de date et heure](https://support.microsoft.com/fr-fr/office/fonctions-de-date-et-d-heure-r%C3%A9f%C3%A9rence-fd1b5961-c1ae-4677-be58-074152f97b81)',4),
    (5,'microsoft-somme-si-ens','Fonction SOMME.SI.ENS','Documentation officielle pour les calculs multicritères.','# Ressource officielle\n\n[Consulter SOMME.SI.ENS](https://support.microsoft.com/fr-fr/office/fonction-somme-si-ens-c9e748f5-7ea7-455d-9406-611cebce642b)',5),
    (6,'microsoft-tcd','Créer un tableau croisé dynamique','Guide officiel de création des tableaux croisés dynamiques.','# Ressource officielle\n\n[Créer un tableau croisé dynamique](https://support.microsoft.com/fr-fr/office/cr%C3%A9er-un-tableau-crois%C3%A9-dynamique-pour-analyser-des-donn%C3%A9es-de-feuille-de-calcul-a9a84538-bfe9-40a9-a8e9-f99134456576)',6),
    (7,'microsoft-graphiques','Créer un graphique','Documentation officielle pour choisir et créer un graphique Excel.','# Ressource officielle\n\n[Créer un graphique de bout en bout](https://support.microsoft.com/fr-fr/office/cr%C3%A9er-un-graphique-de-bout-en-bout-0baf399e-dd61-4e18-8a73-b3fd5d5680c2)',7),
    (8,'microsoft-power-query','À propos de Power Query','Présentation officielle de Power Query dans Excel.','# Ressource officielle\n\n[Consulter l’aide Power Query](https://support.microsoft.com/fr-fr/office/%C3%A0-propos-de-power-query-dans-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a)',8),
    (9,'microsoft-power-pivot','Power Pivot : analyse et modélisation','Présentation officielle de Power Pivot et du modèle de données.','# Ressource officielle\n\n[Consulter Power Pivot](https://support.microsoft.com/fr-fr/office/power-pivot-pr%C3%A9sentation-et-apprentissage-f9001958-7901-4caa-ad80-028a6d2432ed)',9),
    (10,'microsoft-segments','Utiliser des segments pour filtrer','Guide officiel pour les segments de tableaux et TCD.','# Ressource officielle\n\n[Utiliser des segments pour filtrer des données](https://support.microsoft.com/fr-fr/office/utiliser-des-segments-pour-filtrer-des-donn%C3%A9es-249f966b-a9d5-4b0f-b31a-12651785d29d)',10),
    (11,'microsoft-proteger-feuille','Protéger une feuille de calcul','Guide officiel sur la protection des cellules et feuilles.','# Ressource officielle\n\n[Protéger une feuille de calcul](https://support.microsoft.com/fr-fr/office/prot%C3%A9ger-une-feuille-de-calcul-3179efdb-1285-4d49-a9c3-f4ca36276de6)',11)
)
INSERT INTO public.theory_resources(
    course_id,module_id,slug,title,summary,content_md,resource_type,order_index,is_published
)
SELECT c.id,m.id,r.slug,r.title,r.summary,r.content_md,'reference',r.ord,FALSE
FROM c
JOIN resources r ON TRUE
JOIN public.modules m ON m.course_id = c.id AND m.order_index = r.module_order
ON CONFLICT(course_id,slug) DO UPDATE SET
    module_id = EXCLUDED.module_id,
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    content_md = EXCLUDED.content_md,
    resource_type = EXCLUDED.resource_type,
    order_index = EXCLUDED.order_index,
    is_published = FALSE;
