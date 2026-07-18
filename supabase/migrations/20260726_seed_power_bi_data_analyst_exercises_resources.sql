-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 3
-- Fichiers pratiques, exercices guidés et ressources Microsoft officielles.
-- Le cours et les contenus restent non publiés jusqu'au chantier de publication final.

WITH course_row AS (
    SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst'
), module_rows AS (
    SELECT m.id, m.order_index
    FROM public.modules m
    JOIN course_row c ON c.id = m.course_id
), exercise_seed(module_order,slug,title,exercise_type,brief_md,starter_files,expected_result_md,hints,solution_md,estimated_minutes) AS (
    VALUES
    (0,'premier-rapport-power-bi','Créer un premier rapport Power BI','guided',
     'Importez les référentiels Excel, explorez les vues Rapport, Données et Modèle, puis créez une première carte de chiffre d’affaires.',
     '[{"name":"01_sources_et_referentiels.xlsx","path":"/resources/power-bi-data-analyst/01_sources_et_referentiels.xlsx","purpose":"Sources produits, régions et clients"},{"name":"ventes_2026_01.csv","path":"/resources/power-bi-data-analyst/ventes_2026_01.csv","purpose":"Ventes de janvier"}]'::jsonb,
     'Un fichier Power BI avec les sources chargées, des types corrects et une carte affichant le chiffre d’affaires total.',
     '["Utilisez Obtenir les données puis Transformer les données.","Vérifiez les types avant de fermer Power Query."]'::jsonb,
     'Charger le fichier Excel et le CSV, contrôler les types, fermer et appliquer, puis créer une mesure CA Total et l’afficher dans une carte.',45),
    (1,'nettoyer-ventes-power-query','Nettoyer une table de ventes','guided',
     'Nettoyez les ventes de janvier dans Power Query : types, valeurs manquantes, doublons, erreurs et noms de colonnes.',
     '[{"name":"ventes_2026_01.csv","path":"/resources/power-bi-data-analyst/ventes_2026_01.csv","purpose":"Table de ventes à nettoyer"}]'::jsonb,
     'Une requête Ventes propre, typée, sans doublon sur id_vente et avec des étapes explicites.',
     '["Activez la qualité et le profil des colonnes.","Conservez une étape par transformation logique."]'::jsonb,
     'Promouvoir les en-têtes, définir les types, supprimer les doublons sur id_vente, contrôler les erreurs et renommer la requête FaitVentes.',50),
    (2,'consolider-fichiers-mensuels','Consolider quatre fichiers mensuels','challenge',
     'Combinez les quatre CSV de ventes, enrichissez-les avec les référentiels et créez les colonnes montant et marge.',
     '[{"name":"01_sources_et_referentiels.xlsx","path":"/resources/power-bi-data-analyst/01_sources_et_referentiels.xlsx","purpose":"Référentiels"},{"name":"ventes_2026_01.csv","path":"/resources/power-bi-data-analyst/ventes_2026_01.csv","purpose":"Janvier"},{"name":"ventes_2026_02.csv","path":"/resources/power-bi-data-analyst/ventes_2026_02.csv","purpose":"Février"},{"name":"ventes_2026_03.csv","path":"/resources/power-bi-data-analyst/ventes_2026_03.csv","purpose":"Mars"},{"name":"ventes_2026_04.csv","path":"/resources/power-bi-data-analyst/ventes_2026_04.csv","purpose":"Avril"}]'::jsonb,
     'Une requête consolidée actualisable contenant quatre mois et les libellés produits, clients et régions.',
     '["Utilisez le connecteur Dossier.","Contrôlez les lignes sans correspondance après chaque fusion."]'::jsonb,
     'Combiner les fichiers avec une fonction de transformation, fusionner Produits, Clients et Régions, développer les colonnes utiles puis contrôler montant et marge.',75),
    (3,'construire-modele-etoile-power-bi','Construire un modèle en étoile','challenge',
     'À partir du dictionnaire fourni, construisez FaitVentes, DimProduit, DimClient, DimRégion et DimDate avec des relations cohérentes.',
     '[{"name":"02_modele_donnees.xlsx","path":"/resources/power-bi-data-analyst/02_modele_donnees.xlsx","purpose":"Dictionnaire et relations attendues"},{"name":"01_sources_et_referentiels.xlsx","path":"/resources/power-bi-data-analyst/01_sources_et_referentiels.xlsx","purpose":"Dimensions"}]'::jsonb,
     'Un modèle en étoile sans relation ambiguë, avec filtres à sens unique des dimensions vers la table de faits.',
     '["Chaque dimension doit avoir une clé unique.","Évitez les relations plusieurs-à-plusieurs non justifiées."]'::jsonb,
     'Créer les dimensions, désactiver la date automatique, relier chaque clé en 1:* vers FaitVentes et vérifier le sens de filtre.',65),
    (4,'creer-table-calendrier','Créer et marquer une table calendrier','guided',
     'Créez une table calendrier continue avec année, trimestre, numéro de mois, libellé mois et tri chronologique.',
     '[{"name":"02_modele_donnees.xlsx","path":"/resources/power-bi-data-analyst/02_modele_donnees.xlsx","purpose":"Structure du modèle"}]'::jsonb,
     'Une DimDate continue, marquée comme table de dates et reliée à FaitVentes.',
     '["Utilisez CALENDAR ou CALENDARAUTO.","Triez le nom du mois par son numéro."]'::jsonb,
     'Créer DimDate avec CALENDAR, ajouter Année, Trimestre, MoisNo et Mois, trier Mois par MoisNo, marquer la table puis créer la relation.',50),
    (5,'creer-mesures-dax-base','Créer les premières mesures DAX','guided',
     'Créez les mesures CA Total, Quantité, Clients actifs, Marge et Taux de marge à partir du dictionnaire fourni.',
     '[{"name":"03_dax_kpi.xlsx","path":"/resources/power-bi-data-analyst/03_dax_kpi.xlsx","purpose":"Dictionnaire de mesures"}]'::jsonb,
     'Des mesures centralisées dans une table Mesures, correctement formatées et réutilisables.',
     '["Préférez les mesures aux colonnes calculées pour les agrégations.","Utilisez DIVIDE pour éviter les divisions par zéro."]'::jsonb,
     'Créer une table Mesures, écrire SUM, DISTINCTCOUNT et DIVIDE, puis appliquer les formats métier.',55),
    (6,'construire-kpi-objectifs','Construire des KPI métier avec objectifs','challenge',
     'Ajoutez panier moyen, objectif CA, écart et taux d’atteinte puis construisez une page de pilotage.',
     '[{"name":"03_dax_kpi.xlsx","path":"/resources/power-bi-data-analyst/03_dax_kpi.xlsx","purpose":"Mesures et objectifs"}]'::jsonb,
     'Une page KPI affichant résultat, objectif, écart et taux d’atteinte par mois.',
     '["Reliez la table Objectifs au mois de DimDate.","Centralisez les calculs dans des mesures."]'::jsonb,
     'Charger Objectifs, créer les relations nécessaires, écrire Panier moyen, Objectif CA, Écart objectif et Taux atteinte, puis les afficher dans des cartes.',65),
    (7,'analyser-evolution-temporelle','Analyser les évolutions temporelles','challenge',
     'Créez des mesures cumulées et comparatives, puis une courbe mensuelle avec évolution.',
     '[{"name":"03_dax_kpi.xlsx","path":"/resources/power-bi-data-analyst/03_dax_kpi.xlsx","purpose":"Exemples de mesures temporelles"}]'::jsonb,
     'Une analyse mensuelle avec CA, cumul, période précédente et variation en pourcentage.',
     '["La table calendrier doit être continue et marquée.","Utilisez CALCULATE avec les fonctions temporelles."]'::jsonb,
     'Créer CA mois précédent, CA cumul et Évolution CA avec CALCULATE, DATEADD ou SAMEPERIODLASTYEAR selon le périmètre, puis tester les filtres.',70),
    (8,'concevoir-page-analyse-interactive','Concevoir une page d’analyse interactive','guided',
     'Construisez une page Produits avec cartes, barres, matrice, segments et drill-down.',
     '[{"name":"04_cahier_dashboard.xlsx","path":"/resources/power-bi-data-analyst/04_cahier_dashboard.xlsx","purpose":"Cahier des pages et visuels"}]'::jsonb,
     'Une page lisible, sans surcharge, qui répond à trois questions métier et dont les interactions sont maîtrisées.',
     '["Utilisez les barres pour comparer.","Limitez les couleurs et testez chaque interaction."]'::jsonb,
     'Créer une hiérarchie Catégorie > Produit, ajouter cartes KPI, barres et matrice, configurer les segments et désactiver les interactions inutiles.',70),
    (9,'assembler-rapport-professionnel','Assembler un rapport professionnel','challenge',
     'Assemblez les pages Synthèse, Produits, Clients et Détails avec navigation, thème cohérent et disposition mobile.',
     '[{"name":"04_cahier_dashboard.xlsx","path":"/resources/power-bi-data-analyst/04_cahier_dashboard.xlsx","purpose":"Architecture du rapport"}]'::jsonb,
     'Un rapport multi-pages cohérent, navigable, responsive et prêt à être présenté.',
     '["Synchronisez uniquement les segments utiles.","Testez la vue mobile page par page."]'::jsonb,
     'Créer les quatre pages, appliquer un thème, ajouter boutons et signets, synchroniser les filtres utiles puis construire la disposition mobile.',90),
    (10,'publier-et-planifier-actualisation','Publier et documenter l’actualisation','guided',
     'Publiez le rapport dans un espace de travail de test et documentez partage, actualisation et responsabilités.',
     '[{"name":"04_cahier_dashboard.xlsx","path":"/resources/power-bi-data-analyst/04_cahier_dashboard.xlsx","purpose":"Checklist de publication"}]'::jsonb,
     'Un rapport publié dans un espace de test avec une procédure d’actualisation et de partage documentée.',
     '["N’utilisez pas Publier sur le web pour des données privées.","Activez les notifications d’échec d’actualisation."]'::jsonb,
     'Publier dans un workspace de test, vérifier le modèle sémantique, configurer les informations d’identification et l’actualisation, puis documenter les accès.',60),
    (11,'securiser-optimiser-auditer','Sécuriser, optimiser et auditer le rapport','debug',
     'Créez un rôle RLS par région, testez-le, contrôlez les performances et terminez la documentation du rapport.',
     '[{"name":"04_cahier_dashboard.xlsx","path":"/resources/power-bi-data-analyst/04_cahier_dashboard.xlsx","purpose":"Checklist qualité finale"}]'::jsonb,
     'Un rapport testé sous plusieurs rôles, sans visuel lent critique et accompagné d’une documentation exploitable.',
     '["Utilisez Afficher comme rôle avant publication.","Analysez les visuels avec Analyseur de performances."]'::jsonb,
     'Créer un rôle filtrant DimRégion, tester chaque profil, supprimer les colonnes inutiles, contrôler les visuels lents et compléter les sections sources, mesures et actualisation.',75)
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
    SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst'
), resources(module_order,slug,title,summary,content_md,ord) AS (
    VALUES
    (0,'microsoft-power-bi-desktop-start','Bien démarrer avec Power BI Desktop','Guide officiel Microsoft pour installer, ouvrir et prendre en main Power BI Desktop.','# Ressource officielle\n\n[Bien démarrer avec Power BI Desktop](https://learn.microsoft.com/fr-fr/power-bi/fundamentals/desktop-getting-started)',0),
    (1,'microsoft-power-query-clean-data','Nettoyer et transformer les données','Module Microsoft Learn consacré au nettoyage avec Power Query.','# Ressource officielle\n\n[Nettoyer, transformer et charger des données](https://learn.microsoft.com/fr-fr/training/modules/clean-data-power-bi/)',1),
    (2,'microsoft-power-query-overview','Documentation Power Query','Documentation officielle sur la connexion, la transformation et la combinaison des données.','# Ressource officielle\n\n[Consulter la documentation Power Query](https://learn.microsoft.com/fr-fr/power-query/)',2),
    (3,'microsoft-star-schema','Schéma en étoile dans Power BI','Guide officiel sur la modélisation dimensionnelle et les modèles en étoile.','# Ressource officielle\n\n[Comprendre le schéma en étoile](https://learn.microsoft.com/fr-fr/power-bi/guidance/star-schema)',3),
    (4,'microsoft-date-tables','Tables de dates dans Power BI','Guide officiel pour créer et utiliser une dimension Date.','# Ressource officielle\n\n[Conseils de conception pour les tables de dates](https://learn.microsoft.com/fr-fr/power-bi/guidance/model-date-tables)',4),
    (5,'microsoft-dax-basics','DAX dans Power BI','Documentation officielle Microsoft sur la création de calculs et mesures DAX.','# Ressource officielle\n\n[Documentation de transformation et modélisation](https://learn.microsoft.com/fr-fr/power-bi/transform-model/)',5),
    (6,'microsoft-model-relationships','Relations de modèle Power BI','Référence officielle sur les relations, cardinalités et propagation des filtres.','# Ressource officielle\n\n[Comprendre les relations de modèle](https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-relationships-understand)',6),
    (7,'microsoft-time-intelligence','Calculs temporels dans Power BI','Guide officiel sur les calculs basés sur le temps avec DAX.','# Ressource officielle\n\n[Implémenter des calculs basés sur le temps](https://learn.microsoft.com/fr-fr/power-bi/transform-model/desktop-time-intelligence)',7),
    (8,'microsoft-power-bi-visuals','Ajouter des visualisations','Guide officiel pour créer et configurer les visuels Power BI.','# Ressource officielle\n\n[Ajouter des visualisations à un rapport](https://learn.microsoft.com/fr-fr/power-bi/visuals/power-bi-report-add-visualizations)',8),
    (9,'microsoft-mobile-layout','Rapports Power BI optimisés mobile','Documentation officielle sur la disposition mobile des rapports.','# Ressource officielle\n\n[Créer une disposition mobile](https://learn.microsoft.com/fr-fr/power-bi/create-reports/power-bi-create-mobile-optimized-report-mobile-layout-view)',9),
    (10,'microsoft-refresh-power-bi','Actualisation des données Power BI','Référence officielle sur l’actualisation dans le service Power BI.','# Ressource officielle\n\n[Actualiser les données dans Power BI](https://learn.microsoft.com/fr-fr/power-bi/connect-data/refresh-data)',10),
    (11,'microsoft-power-bi-security-quality','Sécurité et qualité Power BI','Documentation officielle pour partager, sécuriser et contrôler les rapports.','# Ressource officielle\n\n[Partager et collaborer dans Power BI](https://learn.microsoft.com/fr-fr/power-bi/collaborate-share/service-share-dashboards)',11)
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
