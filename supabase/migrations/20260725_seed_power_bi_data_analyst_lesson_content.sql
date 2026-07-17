-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 2
-- Contenu pédagogique complet : 24 leçons, toutes non publiées.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
    VALUES
    (0,0,'ecosysteme-power-bi','Comprendre l’écosystème Power BI','Identifier le rôle de Desktop, Service, passerelle et application mobile.','lesson',45,'["Distinguer Power BI Desktop et Service","Comprendre le cycle d’un rapport"]'::jsonb,$lesson$# Comprendre l’écosystème Power BI

## Le rôle des composants

**Power BI Desktop** sert à connecter, transformer, modéliser et concevoir les rapports. **Power BI Service** permet de publier, partager, actualiser et administrer les contenus. La **passerelle de données** relie les sources locales au service cloud. Les applications mobiles permettent la consultation.

## Le cycle d’un projet

1. Identifier la question métier.
2. Se connecter aux sources.
3. Transformer avec Power Query.
4. Construire le modèle.
5. Créer les mesures DAX.
6. Concevoir le rapport.
7. Publier, sécuriser et actualiser.

## Démonstration guidée

Ouvrez Power BI Desktop et repérez les vues Rapport, Données et Modèle. Créez un fichier vide puis observez la différence entre le canevas, le volet Données et les propriétés du modèle.

## Point de contrôle

Un rapport n’est pas un simple ensemble de graphiques. Il repose sur un modèle, des mesures et des règles de sécurité.

## Résumé

Desktop construit. Service diffuse et gouverne. La qualité dépend du workflow complet.
$lesson$,'Expliquez la différence entre Power BI Desktop et Power BI Service.'),
    (0,1,'premier-import-rapport','Importer une première source et créer un rapport','Charger un fichier Excel puis construire un premier visuel contrôlé.','lesson',50,'["Importer une table","Créer une carte et un graphique","Vérifier les agrégations"]'::jsonb,$lesson$# Importer une première source

## Connexion

Utilisez **Accueil > Obtenir des données > Excel**. Sélectionnez uniquement les tables nécessaires. Préférez **Transformer les données** à un chargement immédiat lorsque la qualité n’est pas garantie.

## Premier rapport

Après chargement, ajoutez une carte pour le chiffre d’affaires et un graphique en barres par région. Vérifiez que Power BI utilise `Somme` et non `Nombre` pour les champs numériques.

## Démonstration guidée

Importez une table de ventes contenant Date, Région, Produit, Quantité et Montant. Créez une carte `Montant total`, puis une barre `Montant par Région`. Testez la sélection croisée.

## Erreur fréquente

Une colonne numérique stockée comme texte produit des agrégations incorrectes. Le type doit être corrigé dans Power Query.

## Résumé

Le premier visuel doit déjà être relié à une question métier et à des données correctement typées.
$lesson$,'Pourquoi faut-il vérifier l’agrégation utilisée par un visuel ?'),
    (1,0,'power-query-types-nettoyage','Définir les types et nettoyer les données','Créer une requête fiable avec types, filtres et étapes explicites.','lesson',55,'["Définir les types métiers","Traiter nulls et erreurs","Renommer les étapes"]'::jsonb,$lesson$# Définir les types et nettoyer

## Pourquoi les types comptent

Une date doit être de type Date, un montant de type Nombre décimal ou Devise, et une clé peut rester Texte même si elle contient des chiffres.

## Étapes recommandées

- promouvoir les en-têtes ;
- supprimer les colonnes inutiles ;
- définir les types ;
- filtrer les lignes vides ;
- remplacer ou isoler les erreurs ;
- normaliser les libellés.

## Démonstration guidée

Dans Power Query, importez une table de ventes. Corrigez Date, Quantité et Montant. Remplacez les valeurs nulles de Remise uniquement si la règle métier confirme qu’elles signifient zéro.

## Bon réflexe

Renommez `Type modifié` en `Types métiers validés`. Les noms d’étapes doivent expliquer l’intention.

## Résumé

Power Query doit produire une table propre, documentée et actualisable.
$lesson$,'Pourquoi une clé produit contenant seulement des chiffres peut-elle rester de type Texte ?'),
    (1,1,'power-query-erreurs-null','Traiter les valeurs nulles et les erreurs','Différencier absence légitime, donnée inconnue et erreur technique.','lesson',50,'["Diagnostiquer une erreur","Choisir entre supprimer, remplacer et signaler","Contrôler les lignes rejetées"]'::jsonb,$lesson$# Traiter nulls et erreurs

## Trois situations différentes

- **Null** : absence de valeur.
- **Erreur** : transformation impossible.
- **Valeur incorrecte** : donnée présente mais invalide.

## Méthode

Ne remplacez pas automatiquement tous les nulls par zéro. Une date de livraison vide peut signifier commande non livrée. Une remise vide peut, selon le métier, signifier aucune remise.

## Démonstration guidée

Filtrez les erreurs de conversion de date dans une requête dédiée `Erreurs_Date`. Corrigez la source ou appliquez une règle documentée. Conservez un compteur de lignes avant et après nettoyage.

## Contrôle

Le nombre de lignes supprimées ou corrigées doit être justifiable.

## Résumé

Le nettoyage professionnel rend les anomalies visibles au lieu de les cacher.
$lesson$,'Quelle différence existe entre une valeur null et une erreur Power Query ?'),
    (2,0,'combiner-fichiers-dossier','Combiner des fichiers mensuels','Utiliser le connecteur Dossier pour automatiser une consolidation.','lesson',60,'["Combiner des fichiers homogènes","Comprendre le fichier exemple","Préserver la traçabilité"]'::jsonb,$lesson$# Combiner des fichiers mensuels

## Le connecteur Dossier

Il permet d’appliquer les mêmes transformations à tous les fichiers ayant une structure identique.

## Workflow

1. Connecter le dossier.
2. Filtrer les fichiers utiles.
3. Utiliser **Combiner et transformer**.
4. Contrôler la fonction générée.
5. Conserver le nom du fichier source.

## Démonstration guidée

Consolidez quatre CSV mensuels. Gardez une colonne `FichierSource` pour pouvoir retracer l’origine d’une ligne. Vérifiez que les en-têtes ne sont pas répétés dans la table finale.

## Risque fréquent

Une modification de structure dans un seul fichier peut casser l’actualisation. Documentez le format attendu.

## Résumé

Le connecteur Dossier transforme un travail mensuel manuel en pipeline reproductible.
$lesson$,'Pourquoi conserver le nom du fichier source dans la table consolidée ?'),
    (2,1,'fusion-jointures','Fusionner des requêtes avec la bonne jointure','Enrichir une table de faits sans perdre silencieusement des lignes.','lesson',55,'["Choisir une jointure","Détecter les non-correspondances","Développer les colonnes utiles"]'::jsonb,$lesson$# Fusionner des requêtes

## Jointures principales

- **Gauche** : conserve toutes les lignes de la table principale.
- **Interne** : conserve seulement les correspondances.
- **Anti gauche** : identifie les lignes sans correspondance.

## Démonstration guidée

Fusionnez Ventes avec Produits sur CodeProduit en jointure gauche. Développez Produit et Catégorie. Créez ensuite une requête anti gauche pour lister les codes absents du référentiel.

## Contrôle

Comparez le nombre de lignes avant et après fusion. Une jointure ne doit pas supprimer de ventes sans décision explicite.

## Résumé

La jointure gauche protège la table principale. La requête anti gauche contrôle la qualité du référentiel.
$lesson$,'Quelle jointure faut-il utiliser pour conserver toutes les ventes ?'),
    (3,0,'faits-dimensions','Identifier faits et dimensions','Organiser les données autour des événements mesurables et axes d’analyse.','lesson',55,'["Identifier une table de faits","Créer des dimensions","Éviter une table plate géante"]'::jsonb,$lesson$# Identifier faits et dimensions

## Table de faits

Elle contient les événements mesurables : ventes, commandes, lignes de facture. Son grain doit être explicite, par exemple une ligne par produit vendu.

## Dimensions

Elles décrivent Date, Produit, Client, Région ou Commercial. Une dimension contient une ligne unique par clé.

## Démonstration guidée

À partir d’une table de ventes, séparez `DimProduit`, `DimClient`, `DimRégion` et `FaitVentes`. Vérifiez que chaque clé de dimension est unique.

## Résumé

Le modèle en étoile réduit les ambiguïtés, améliore les performances et simplifie DAX.
$lesson$,'Que signifie le grain d’une table de faits ?'),
    (3,1,'relations-cardinalite','Créer des relations fiables','Configurer cardinalité, direction de filtre et relations actives.','lesson',55,'["Créer une relation un-à-plusieurs","Choisir la direction du filtre","Détecter une ambiguïté"]'::jsonb,$lesson$# Relations, cardinalité et filtres

## Relation standard

Une dimension unique filtre plusieurs lignes de faits : `1:*`. La direction simple va de la dimension vers la table de faits.

## À éviter

Les relations bidirectionnelles généralisées peuvent créer des chemins ambigus. Elles doivent être justifiées par un besoin précis.

## Démonstration guidée

Reliez DimProduit[CodeProduit] à FaitVentes[CodeProduit]. Testez une carte CA filtrée par Catégorie. Si la clé de dimension contient des doublons, corrigez la dimension au lieu de forcer une relation plusieurs-à-plusieurs.

## Résumé

Une relation correcte traduit une règle métier et protège les calculs.
$lesson$,'Pourquoi la direction de filtre simple est-elle généralement préférable ?'),
    (4,0,'table-calendrier-dax','Créer une table calendrier','Construire une dimension Date continue et exploitable.','lesson',50,'["Créer une table CALENDAR","Ajouter année, trimestre et mois","Marquer la table de dates"]'::jsonb,$lesson$# Créer une table calendrier

## Exemple DAX

```DAX
DimDate =
ADDCOLUMNS(
    CALENDAR(DATE(2025,1,1), DATE(2027,12,31)),
    "Année", YEAR([Date]),
    "NumMois", MONTH([Date]),
    "Mois", FORMAT([Date], "MMMM"),
    "Trimestre", "T" & FORMAT([Date], "Q")
)
```

## Étapes

Triez `Mois` par `NumMois`, marquez la table comme table de dates puis reliez-la à FaitVentes[Date].

## Résumé

Une table calendrier continue est indispensable aux analyses temporelles fiables.
$lesson$,'Pourquoi faut-il trier le nom du mois par son numéro ?'),
    (4,1,'hierarchies-date','Construire des hiérarchies temporelles','Préparer année, trimestre, mois et semaine pour l’analyse.','lesson',45,'["Créer des colonnes temporelles","Construire une hiérarchie","Éviter les tris alphabétiques"]'::jsonb,$lesson$# Hiérarchies temporelles

## Colonnes utiles

Année, NumTrimestre, Trimestre, NumMois, Mois, AnnéeMois, Semaine et Jour.

## Démonstration guidée

Créez `AnnéeMois = FORMAT([Date], "YYYY-MM")`. Utilisez cette colonne dans une courbe mensuelle et testez le drill-down depuis Année vers Mois.

## Bon réflexe

Une hiérarchie doit répondre au niveau d’analyse attendu. N’ajoutez pas des colonnes inutiles.

## Résumé

Les colonnes temporelles facilitent le tri, le drill-down et la comparaison des périodes.
$lesson$,'Quel champ utiliser pour afficher les mois dans un ordre chronologique ?'),
    (5,0,'mesures-colonnes','Différencier mesures et colonnes calculées','Choisir le bon type de calcul dans le modèle.','lesson',55,'["Comprendre le contexte de ligne","Comprendre le contexte de filtre","Privilégier les mesures pour les agrégats"]'::jsonb,$lesson$# Mesures et colonnes calculées

## Colonne calculée

Elle produit une valeur pour chaque ligne et augmente la taille du modèle.

## Mesure

Elle est évaluée selon le contexte du visuel.

```DAX
CA Total = SUM(FaitVentes[ChiffreAffaires])
Clients = DISTINCTCOUNT(FaitVentes[ClientID])
```

## Démonstration guidée

Créez une mesure CA Total et placez-la dans une carte puis dans un tableau par Région. Observez que la même mesure s’adapte au contexte.

## Résumé

Les mesures centralisent la logique métier et évitent de multiplier les colonnes inutiles.
$lesson$,'Pourquoi une mesure CA Total change-t-elle selon la région affichée ?'),
    (5,1,'dax-divide-var','Utiliser DIVIDE et VAR','Écrire des mesures lisibles et robustes.','lesson',55,'["Protéger les divisions","Décomposer un calcul avec VAR","Retourner une expression finale"]'::jsonb,$lesson$# DIVIDE et variables DAX

## Division robuste

```DAX
Taux de marge = DIVIDE([Marge Totale], [CA Total], 0)
```

## Variables

```DAX
Panier moyen =
VAR CA = [CA Total]
VAR Ventes = [Nombre de ventes]
RETURN DIVIDE(CA, Ventes, 0)
```

## Démonstration guidée

Créez Panier moyen puis testez un filtre qui retourne zéro vente. La mesure ne doit pas générer d’erreur.

## Résumé

`VAR` améliore la lecture. `DIVIDE` sécurise les dénominateurs nuls.
$lesson$,'Quel avantage VAR apporte-t-il à une mesure DAX ?'),
    (6,0,'kpi-commerciaux','Construire les KPI commerciaux','Créer CA, marge, panier moyen, clients et taux de conversion.','lesson',60,'["Définir un KPI","Écrire des mesures cohérentes","Documenter les unités"]'::jsonb,$lesson$# Construire les KPI commerciaux

## Mesures de base

```DAX
CA Total = SUM(FaitVentes[CA])
Marge Totale = SUM(FaitVentes[Marge])
Nombre de ventes = COUNTROWS(FaitVentes)
Panier moyen = DIVIDE([CA Total], [Nombre de ventes])
```

## Taux de conversion

Le dénominateur doit correspondre aux opportunités réellement éligibles. Une formule exacte techniquement peut être fausse métier.

## Démonstration guidée

Créez une table de mesures et ajoutez une description à chaque mesure. Vérifiez les résultats sur quelques lignes à la main.

## Résumé

Un KPI fiable combine une définition métier, une mesure testée et un format cohérent.
$lesson$,'Pourquoi faut-il documenter le dénominateur d’un taux de conversion ?'),
    (6,1,'calculate-objectifs','Comparer résultats et objectifs avec CALCULATE','Modifier le contexte de filtre pour produire des écarts utiles.','lesson',60,'["Utiliser CALCULATE","Créer un écart à l’objectif","Construire un indicateur dynamique"]'::jsonb,$lesson$# CALCULATE et objectifs

## Exemple

```DAX
CA Produits Premium =
CALCULATE([CA Total], DimProduit[Gamme] = "Premium")
```

## Objectifs

Créez une table Objectifs reliée à Date et Région. Mesurez :

```DAX
Écart objectif = [CA Total] - [Objectif CA]
Taux atteinte = DIVIDE([CA Total], [Objectif CA])
```

## Démonstration guidée

Affichez Taux atteinte par Région avec un format conditionnel. Vérifiez que les objectifs suivent les filtres de période.

## Résumé

CALCULATE modifie le contexte de calcul. Les objectifs doivent partager les bonnes dimensions.
$lesson$,'Quel est le rôle principal de CALCULATE ?'),
    (7,0,'comparaisons-periodes','Comparer les périodes','Calculer mois précédent, année précédente et variations.','lesson',60,'["Utiliser DATEADD","Créer une variation absolue et relative","Vérifier le contexte de date"]'::jsonb,$lesson$# Comparer les périodes

## Mesures

```DAX
CA Mois précédent =
CALCULATE([CA Total], DATEADD(DimDate[Date], -1, MONTH))

Variation CA = [CA Total] - [CA Mois précédent]
Variation CA % = DIVIDE([Variation CA], [CA Mois précédent])
```

## Démonstration guidée

Créez une matrice par Mois avec CA, CA précédent et variation %. Testez les premiers mois où la période précédente peut être absente.

## Résumé

Les comparaisons temporelles exigent une table de dates continue et correctement reliée.
$lesson$,'Pourquoi DATEADD dépend-il d’une table calendrier continue ?'),
    (7,1,'cumuls-time-intelligence','Créer des cumuls et analyses YTD','Utiliser TOTALYTD et des filtres de dates contrôlés.','lesson',55,'["Créer un cumul annuel","Comparer YTD à N-1","Comprendre la période fiscale"]'::jsonb,$lesson$# Cumuls et Time Intelligence

## Cumul annuel

```DAX
CA YTD = TOTALYTD([CA Total], DimDate[Date])
CA YTD N-1 = CALCULATE([CA YTD], SAMEPERIODLASTYEAR(DimDate[Date]))
```

## Année fiscale

Si l’exercice ne commence pas en janvier, la logique doit être adaptée à la date de clôture.

## Démonstration guidée

Ajoutez CA mensuel et CA YTD sur une courbe. Expliquez la différence entre valeur du mois et cumul depuis le début de l’année.

## Résumé

Le cumul répond à une question différente du chiffre mensuel. Le rapport doit rendre cette différence explicite.
$lesson$,'Quelle différence existe entre CA mensuel et CA YTD ?'),
    (8,0,'choisir-visuels','Choisir les visualisations adaptées','Associer chaque question métier au bon visuel.','lesson',50,'["Choisir entre carte, barre, courbe et matrice","Éviter les visuels trompeurs","Limiter les couleurs"]'::jsonb,$lesson$# Choisir les visualisations

## Questions et visuels

- Valeur unique : carte KPI.
- Comparaison de catégories : barres.
- Évolution : courbe.
- Détail hiérarchique : matrice.
- Répartition géographique : carte seulement si la géographie est utile.

## Démonstration guidée

Comparez un camembert de dix produits à des barres horizontales triées. Identifiez lequel permet une lecture plus rapide.

## Résumé

Le bon visuel facilite une comparaison précise et évite le bruit décoratif.
$lesson$,'Quel visuel convient pour comparer dix produits ?'),
    (8,1,'interactions-drill-tooltip','Configurer interactions, drill-down et info-bulles','Créer une exploration guidée sans surcharger la page.','lesson',55,'["Configurer les interactions","Créer une hiérarchie de drill-down","Construire une page info-bulle"]'::jsonb,$lesson$# Interactions et exploration

## Interactions

Chaque visuel peut filtrer, mettre en surbrillance ou ne pas affecter un autre visuel. Configurez ces comportements intentionnellement.

## Drill-down

Une hiérarchie Année > Trimestre > Mois permet d’explorer sans multiplier les graphiques.

## Info-bulle

Une page info-bulle peut afficher marge, volume et évolution au survol d’un produit.

## Démonstration guidée

Créez une page info-bulle Produit et associez-la au graphique principal. Désactivez une interaction qui rend la page confuse.

## Résumé

L’interactivité doit aider à répondre à une question, pas créer des effets gratuits.
$lesson$,'Quand faut-il désactiver une interaction entre deux visuels ?'),
    (9,0,'architecture-rapport','Structurer un rapport multi-pages','Construire une navigation claire entre synthèse, analyse et détails.','lesson',55,'["Définir une architecture","Créer une navigation","Conserver des filtres cohérents"]'::jsonb,$lesson$# Architecture d’un rapport

## Structure recommandée

1. Synthèse exécutive.
2. Analyse des ventes.
3. Produits et clients.
4. Détails opérationnels.
5. Méthodologie et définitions.

## Navigation

Utilisez boutons, signets et navigateur de pages. Le nom des pages doit être explicite.

## Démonstration guidée

Créez trois pages et un menu commun. Synchronisez le segment Date uniquement là où il est utile.

## Résumé

Une architecture claire réduit la charge cognitive et rend le rapport utilisable sans formation longue.
$lesson$,'Pourquoi faut-il séparer synthèse exécutive et détail opérationnel ?'),
    (9,1,'mobile-accessibilite','Préparer l’affichage mobile et l’accessibilité','Adapter la lecture aux petits écrans et renforcer la compréhension.','lesson',50,'["Créer une disposition mobile","Vérifier contrastes et titres","Éviter l’information uniquement par couleur"]'::jsonb,$lesson$# Mobile et accessibilité

## Disposition mobile

Dans Power BI Desktop, utilisez la vue de disposition mobile pour réorganiser les visuels essentiels. Ne cherchez pas à reproduire toute la page desktop.

## Accessibilité

- titres explicites ;
- ordre de tabulation logique ;
- textes alternatifs ;
- contrastes suffisants ;
- information non dépendante uniquement de la couleur.

## Démonstration guidée

Créez une vue mobile avec quatre KPI, une tendance et un filtre principal. Testez l’ordre de tabulation.

## Résumé

La version mobile doit montrer l’essentiel, pas réduire mécaniquement le desktop.
$lesson$,'Pourquoi ne faut-il pas simplement compresser toute la page desktop sur mobile ?'),
    (10,0,'publication-workspaces','Publier dans Power BI Service','Comprendre espaces de travail, rapports, jeux de données et applications.','lesson',55,'["Publier un rapport","Choisir un espace de travail","Comprendre les objets du Service"]'::jsonb,$lesson$# Publication et espaces de travail

## Publication

Depuis Desktop, publiez vers un espace de travail adapté. Évitez d’utiliser systématiquement l’espace personnel pour un contenu d’équipe.

## Objets

Le rapport s’appuie sur un modèle sémantique. Une application Power BI peut diffuser un ensemble contrôlé de contenus.

## Démonstration guidée

Publiez un rapport de test, vérifiez le modèle associé puis organisez les permissions de l’espace de travail.

## Résumé

Le Service transforme un fichier local en produit analytique partagé et gouverné.
$lesson$,'Pourquoi un espace de travail d’équipe est-il préférable à Mon espace de travail ?'),
    (10,1,'actualisation-passerelle','Configurer actualisation et passerelle','Maintenir les données à jour et diagnostiquer les échecs.','lesson',55,'["Planifier une actualisation","Comprendre la passerelle","Lire l’historique des actualisations"]'::jsonb,$lesson$# Actualisation et passerelle

## Sources cloud et locales

Une source cloud peut souvent être actualisée directement. Une source locale nécessite généralement une passerelle configurée et disponible.

## Démonstration guidée

Après publication, configurez les informations d’identification, planifiez une actualisation puis consultez l’historique.

## Diagnostic

Un échec peut venir d’un chemin de fichier, d’identifiants expirés, d’une passerelle hors ligne ou d’un changement de schéma.

## Résumé

Une actualisation fiable fait partie du produit final et doit être documentée.
$lesson$,'Dans quel cas une passerelle est-elle généralement nécessaire ?'),
    (11,0,'rls-securite','Configurer la sécurité RLS','Limiter les données visibles selon le rôle de l’utilisateur.','lesson',55,'["Créer un rôle","Écrire un filtre RLS","Tester comme rôle"]'::jsonb,$lesson$# Sécurité au niveau des lignes

## Principe

La RLS filtre les lignes visibles selon un rôle. Exemple : un responsable régional ne voit que sa région.

## Exemple

Dans le rôle `ResponsableRegion`, filtrez `DimRegion[Region] = "Nord"`. Pour une sécurité dynamique, utilisez une table d’accès reliée à l’adresse utilisateur.

## Démonstration guidée

Créez deux rôles puis utilisez **Afficher comme** pour vérifier les résultats.

## Attention

La RLS ne remplace pas la gestion des permissions dans le Service. Les deux niveaux doivent être cohérents.

## Résumé

Une sécurité correcte se conçoit dans le modèle et se valide avec des scénarios réels.
$lesson$,'Pourquoi faut-il tester chaque rôle avec la fonction Afficher comme ?'),
    (11,1,'performance-qualite','Optimiser et auditer un rapport','Réduire le modèle, contrôler les mesures et documenter la production.','lesson',55,'["Réduire les colonnes inutiles","Vérifier les performances","Créer une documentation d’exploitation"]'::jsonb,$lesson$# Performance et contrôle qualité

## Optimisation

- supprimer les colonnes inutiles ;
- utiliser des types adaptés ;
- éviter les colonnes à forte cardinalité non nécessaires ;
- privilégier le modèle en étoile ;
- centraliser les mesures.

## Contrôle

Utilisez l’Analyseur de performances pour repérer les visuels lents. Vérifiez les mesures sur des cas connus et documentez sources, fréquence d’actualisation, propriétaires et limites.

## Démonstration guidée

Mesurez le temps d’un visuel complexe, retirez les champs inutiles puis comparez. Ajoutez une page Méthodologie au rapport.

## Résumé

Un rapport prêt pour production doit être rapide, testable, sécurisé et documenté.
$lesson$,'Quelles informations doivent figurer dans la documentation d’exploitation ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'power-bi-data-analyst'
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,'["KORYXA Power BI Data Analyst"]'::jsonb,l.validation_prompt,FALSE
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
