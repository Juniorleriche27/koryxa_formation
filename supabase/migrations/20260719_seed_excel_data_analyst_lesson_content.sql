-- KORYXA FORMATION — EXCEL DATA ANALYST — CHANTIER 2
-- Contenu pédagogique complet : 24 leçons, toutes non publiées.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
    VALUES
    (0,0,'interface-classeur','Comprendre l’interface et structurer un classeur','Repérer les zones utiles d’Excel et organiser un classeur lisible.','lesson',35,'["Identifier les éléments de l’interface","Organiser feuilles et zones de travail"]'::jsonb,$lesson$# Comprendre l’interface et structurer un classeur

## Pourquoi cette étape compte

Un fichier Excel professionnel doit être compréhensible par une autre personne sans explication orale. La première compétence n’est donc pas la formule : c’est l’organisation.

## Les éléments essentiels

- **Classeur** : le fichier complet.
- **Feuille** : une page du classeur.
- **Cellule** : l’intersection d’une ligne et d’une colonne.
- **Plage** : un groupe de cellules, par exemple `A2:D20`.
- **Barre de formule** : affiche et permet de modifier le contenu réel de la cellule.
- **Zone Nom** : permet d’atteindre rapidement une cellule ou une plage.

## Démonstration guidée

Créez trois feuilles : `Données`, `Calculs` et `Synthèse`. Placez les données brutes uniquement dans `Données`, les calculs intermédiaires dans `Calculs` et les indicateurs finaux dans `Synthèse`.

Renommez les feuilles clairement, appliquez une couleur d’onglet sobre et figez la première ligne de la table principale.

## Bonnes pratiques

- Une ligne = une observation.
- Une colonne = une variable.
- Une seule ligne d’en-têtes.
- Aucun sous-total au milieu de la base.
- Pas de cellules fusionnées dans les données.

## Résumé

Une structure claire réduit les erreurs, facilite les filtres et prépare les analyses futures.
$lesson$,'Expliquez pourquoi il faut séparer données brutes, calculs et synthèse.'),
    (0,1,'types-references','Reconnaître les types de données et utiliser les références','Distinguer texte, nombre, date et formule puis maîtriser les références relatives et absolues.','lesson',45,'["Reconnaître les types de données","Utiliser A1 et $A$1 correctement"]'::jsonb,$lesson$# Types de données et références

## Les quatre contenus les plus fréquents

Excel manipule principalement du texte, des nombres, des dates et des formules. Une date est stockée comme un nombre : son affichage dépend du format appliqué.

## Références relatives

Dans `=B2*C2`, les références changent lorsque la formule est recopiée. C’est utile pour appliquer le même calcul à plusieurs lignes.

## Références absolues

Dans `=D2*$H$2`, la cellule `H2` reste fixe. Le symbole `$` verrouille la colonne et la ligne.

## Références mixtes

- `$A2` verrouille la colonne A.
- `A$2` verrouille la ligne 2.

## Démonstration guidée

Placez un taux de TVA en `H2`. Dans une table de ventes, calculez la TVA avec `=D2*$H$2`, puis recopiez la formule. Vérifiez que seule la référence au montant change.

## Erreur fréquente

Taper `10%` comme texte ou utiliser une cellule contenant des espaces invisibles peut fausser les calculs. Contrôlez le format et l’alignement par défaut.

## Résumé

Une formule fiable dépend autant du type des données que de la bonne référence.
$lesson$,'Quelle différence pratique y a-t-il entre B2 et $B$2 ?'),
    (1,0,'formules-calculs','Construire des calculs fiables','Utiliser opérateurs et fonctions de base pour produire des indicateurs.','lesson',45,'["Écrire une formule","Utiliser SOMME, MOYENNE, MIN et MAX"]'::jsonb,$lesson$# Construire des calculs fiables

## Une formule commence par `=`

Les opérateurs principaux sont `+`, `-`, `*`, `/` et `^`. Utilisez des parenthèses pour rendre l’ordre des calculs explicite.

## Fonctions essentielles

- `=SOMME(D2:D100)` additionne une plage.
- `=MOYENNE(D2:D100)` calcule la moyenne.
- `=MIN(D2:D100)` retourne la plus petite valeur.
- `=MAX(D2:D100)` retourne la plus grande valeur.

## Exemple métier

Pour calculer le chiffre d’affaires : `=Quantité*Prix_unitaire`. Pour calculer une marge : `=Chiffre_affaires-Coût`.

## Démonstration guidée

Ajoutez les colonnes `CA`, `Coût total` et `Marge`. Utilisez des références structurées si les données sont sous forme de tableau :

`=[@Quantité]*[@Prix_unitaire]`

## Contrôle

Comparez le total obtenu avec une somme manuelle sur quelques lignes. Une formule correcte doit rester lisible et vérifiable.

## Résumé

Une formule courte, nommée et contrôlée est préférable à une formule longue impossible à relire.
$lesson$,'Écrivez la formule qui calcule la marge à partir du chiffre d’affaires et du coût.'),
    (1,1,'conditions-erreurs','Utiliser SI, ET, OU et SIERREUR','Créer des règles métier et gérer les erreurs sans masquer les problèmes.','lesson',55,'["Écrire une condition SI","Combiner ET et OU","Utiliser SIERREUR avec discernement"]'::jsonb,$lesson$# Conditions et gestion des erreurs

## Fonction SI

`=SI(E2>=100000;"Objectif atteint";"À suivre")`

La fonction teste une condition et retourne un résultat différent selon qu’elle est vraie ou fausse.

## Combiner plusieurs règles

`=SI(ET(E2>=100000;F2>=20%);"Prioritaire";"Standard")`

`ET` exige que toutes les conditions soient vraies. `OU` exige qu’au moins une condition soit vraie.

## SIERREUR

`=SIERREUR(A2/B2;0)` évite l’affichage d’une erreur de division. Mais retourner zéro peut cacher une donnée manquante. Dans un rapport, il est souvent préférable d’afficher `"À vérifier"`.

## Démonstration guidée

Créez une colonne `Statut` selon trois niveaux : `Excellent`, `Correct`, `À surveiller`. Utilisez des `SI` imbriqués du seuil le plus élevé vers le plus faible.

## Résumé

Les fonctions conditionnelles traduisent une règle métier. Elles doivent être documentées et testées aux valeurs limites.
$lesson$,'Pourquoi SIERREUR ne doit-il pas être utilisé pour cacher systématiquement toutes les erreurs ?'),
    (2,0,'tableaux-structures','Transformer une plage en tableau structuré','Utiliser les tableaux Excel pour sécuriser filtres, formules et extensions.','lesson',45,'["Créer un tableau structuré","Utiliser les références structurées"]'::jsonb,$lesson$# Tableaux structurés

## Pourquoi utiliser un tableau

Un tableau Excel étend automatiquement les formules, conserve les filtres et facilite la lecture des colonnes par leur nom.

Sélectionnez la base puis utilisez **Ctrl+T**. Vérifiez l’option « Mon tableau comporte des en-têtes ».

## Références structurées

Dans un tableau nommé `Ventes`, vous pouvez écrire :

`=SOMME(Ventes[Chiffre_affaires])`

Dans une ligne du tableau :

`=[@Quantité]*[@Prix_unitaire]`

## Démonstration guidée

Convertissez une plage en tableau, nommez-le `tblVentes`, activez la ligne des totaux puis ajoutez trois nouvelles lignes. Vérifiez que les formules et formats se recopient automatiquement.

## Résumé

Le tableau structuré est la base d’un fichier Excel durable et actualisable.
$lesson$,'Quels avantages un tableau structuré apporte-t-il par rapport à une plage ordinaire ?'),
    (2,1,'nettoyage-validation','Nettoyer et contrôler la saisie','Supprimer doublons, normaliser les formats et créer des règles de validation.','lesson',50,'["Supprimer les doublons","Créer une liste de validation","Normaliser dates et nombres"]'::jsonb,$lesson$# Nettoyage et validation des données

## Contrôles de base

- Rechercher les cellules vides.
- Détecter les doublons sur une clé fiable.
- Uniformiser les dates.
- Vérifier que les nombres ne sont pas stockés comme texte.
- Normaliser les catégories.

## Suppression des doublons

Ne supprimez jamais des doublons sans identifier les colonnes qui définissent réellement l’unicité. Deux clients peuvent porter le même nom mais avoir des identifiants différents.

## Validation des données

Créez une liste autorisée pour `Région` ou `Statut`. La validation limite les variations comme `Nord`, `nord` et `NORD`.

## Démonstration guidée

Ajoutez une feuille `Référentiels`, créez une liste de régions puis utilisez-la dans la validation de la colonne `Région`.

## Résumé

Une analyse fiable commence par des entrées cohérentes et contrôlées.
$lesson$,'Sur quelles colonnes faut-il s’appuyer pour supprimer des doublons sans perdre de vrais enregistrements ?'),
    (3,0,'recherchex','Utiliser RECHERCHEX','Enrichir une table avec une valeur provenant d’un référentiel.','lesson',45,'["Comprendre valeur cherchée et valeur retournée","Gérer les absences"]'::jsonb,$lesson$# Utiliser RECHERCHEX

## Syntaxe

`=RECHERCHEX(valeur_cherchée;tableau_recherche;tableau_retour;[si_non_trouvé])`

## Exemple

Pour retrouver le prix d’un produit à partir de son code :

`=RECHERCHEX([@Code_produit];Produits[Code];Produits[Prix];"Code inconnu")`

## Avantages

RECHERCHEX peut chercher vers la gauche ou la droite et permet de définir directement le résultat en cas d’absence.

## Démonstration guidée

Reliez une table de ventes à un référentiel produits. Ajoutez le prix, la catégorie et le responsable commercial à l’aide de trois recherches.

## Contrôle

Filtrez les valeurs `Code inconnu`. Elles signalent généralement une incohérence entre les tables.

## Résumé

Une recherche réussie dépend d’une clé propre, stable et unique.
$lesson$,'Quels sont les quatre arguments principaux de RECHERCHEX ?'),
    (3,1,'index-equiv','Combiner INDEX et EQUIV','Réaliser des recherches flexibles et comprendre le principe position-retour.','lesson',50,'["Trouver une position avec EQUIV","Retourner une valeur avec INDEX"]'::jsonb,$lesson$# INDEX et EQUIV

## Principe

`EQUIV` trouve une position. `INDEX` retourne la valeur située à cette position.

`=INDEX(Produits[Prix];EQUIV(A2;Produits[Code];0))`

Le dernier argument `0` impose une correspondance exacte.

## Recherche sur deux dimensions

Vous pouvez utiliser un premier `EQUIV` pour la ligne et un second pour la colonne :

`=INDEX(B2:F20;EQUIV(H2;A2:A20;0);EQUIV(H3;B1:F1;0))`

## Démonstration guidée

Construisez un mini-formulaire dans lequel l’utilisateur choisit un produit et un mois, puis retourne le chiffre d’affaires correspondant.

## Résumé

INDEX/EQUIV reste utile pour comprendre la logique des recherches et construire des modèles compatibles avec d’anciennes versions.
$lesson$,'Quel rôle joue EQUIV dans une formule INDEX/EQUIV ?'),
    (4,0,'fonctions-texte','Nettoyer et recomposer du texte','Extraire, assembler et uniformiser des informations textuelles.','lesson',45,'["Utiliser GAUCHE, DROITE et STXT","Nettoyer les espaces","Concaténer des champs"]'::jsonb,$lesson$# Fonctions texte

## Extraire une partie

- `=GAUCHE(A2;3)` prend les trois premiers caractères.
- `=DROITE(A2;4)` prend les quatre derniers.
- `=STXT(A2;5;6)` extrait six caractères à partir de la position cinq.

## Nettoyer

`=SUPPRESPACE(A2)` retire les espaces inutiles. `=NETTOYER(A2)` supprime certains caractères non imprimables.

## Assembler

`=CONCAT(B2;" ";C2)` ou `=JOINDRE.TEXTE(" - ";VRAI;B2:D2)`.

## Démonstration guidée

À partir d’un identifiant `SN-2026-0045`, extrayez le pays, l’année et le numéro. Recomposez ensuite un libellé lisible.

## Résumé

Le nettoyage textuel transforme des libellés irréguliers en variables exploitables.
$lesson$,'Quelle différence existe entre CONCAT et JOINDRE.TEXTE ?'),
    (4,1,'dates-delais','Calculer avec les dates','Extraire année et mois puis mesurer délais, ancienneté et échéances.','lesson',50,'["Reconnaître une vraie date Excel","Calculer un délai","Créer des périodes"]'::jsonb,$lesson$# Calculer avec les dates

## Fonctions courantes

- `=ANNEE(A2)`
- `=MOIS(A2)`
- `=JOUR(A2)`
- `=AUJOURDHUI()`
- `=FIN.MOIS(A2;0)`

## Calcul d’un délai

La différence `=B2-A2` retourne un nombre de jours. Pour une ancienneté complète :

`=DATEDIF(A2;AUJOURDHUI();"y")`

## Démonstration guidée

Créez les colonnes `Mois`, `Trimestre`, `Délai de livraison` et `Retard`. Un retard est vrai lorsque la date réelle dépasse la date prévue.

## Attention

Une date saisie comme texte ne se comporte pas comme une date. Testez avec `=ESTNUM(A2)`.

## Résumé

Les dates permettent de construire des analyses temporelles à condition d’être stockées correctement.
$lesson$,'Comment vérifier qu’une date est réellement reconnue comme un nombre par Excel ?'),
    (5,0,'sommesiens','Calculer des indicateurs multicritères','Utiliser SOMME.SI.ENS, NB.SI.ENS et MOYENNE.SI.ENS.','lesson',50,'["Construire des critères","Calculer des KPI segmentés"]'::jsonb,$lesson$# Analyse conditionnelle multicritères

## SOMME.SI.ENS

`=SOMME.SI.ENS(Ventes[CA];Ventes[Région];H2;Ventes[Produit];H3)`

La première plage est celle à additionner. Les couples suivants associent une plage de critères à un critère.

## NB.SI.ENS

`=NB.SI.ENS(Ventes[Statut];"Gagné";Ventes[Région];H2)`

## MOYENNE.SI.ENS

`=MOYENNE.SI.ENS(Ventes[Marge];Ventes[Commercial];H2)`

## Démonstration guidée

Construisez une zone de sélection avec région, produit et période. Affichez automatiquement chiffre d’affaires, nombre de ventes et marge moyenne.

## Résumé

Les fonctions `.SI.ENS` produisent des KPI dynamiques sans tableau croisé.
$lesson$,'Dans SOMME.SI.ENS, pourquoi la plage à additionner doit-elle être placée en premier ?'),
    (5,1,'kpi-metier','Définir des KPI utiles','Passer de simples calculs à des indicateurs orientés décision.','lesson',45,'["Différencier mesure et KPI","Définir un objectif et un seuil"]'::jsonb,$lesson$# Définir des KPI utiles

## Mesure ou KPI ?

Un total est une mesure. Il devient un KPI lorsqu’il est associé à un objectif, une période et une interprétation.

## Exemples

- Chiffre d’affaires mensuel.
- Taux de conversion.
- Marge moyenne.
- Panier moyen.
- Part des ventes en retard.

## Formules

`Taux de conversion = Ventes gagnées / Opportunités`

`Panier moyen = Chiffre d’affaires / Nombre de ventes`

## Démonstration guidée

Choisissez trois KPI, définissez leur formule, leur objectif et une règle de couleur. Évitez les seuils arbitraires : ils doivent correspondre à une attente métier.

## Résumé

Un bon KPI aide à décider. Il ne se contente pas d’occuper une carte dans un dashboard.
$lesson$,'Quelles informations transforment une simple mesure en KPI ?'),
    (6,0,'tcd-construction','Construire un tableau croisé dynamique','Résumer rapidement une base structurée par axes d’analyse.','lesson',55,'["Créer un TCD","Organiser lignes, colonnes, valeurs et filtres"]'::jsonb,$lesson$# Construire un tableau croisé dynamique

## Préparation

La source doit être un tableau propre, sans lignes vides ni sous-totaux intégrés.

## Zones du TCD

- **Lignes** : catégories principales.
- **Colonnes** : comparaison secondaire.
- **Valeurs** : mesures agrégées.
- **Filtres** : sélection globale.

## Démonstration guidée

Placez `Région` en lignes, `Mois` en colonnes et `CA` en valeurs. Vérifiez que l’agrégation utilisée est `Somme` et non `Nombre`.

## Actualisation

Après ajout de données, utilisez **Actualiser**. Si la source est un tableau structuré, les nouvelles lignes sont incluses automatiquement.

## Résumé

Le TCD permet d’explorer rapidement une base sans multiplier les formules.
$lesson$,'Pourquoi un champ numérique peut-il parfois être agrégé par Nombre au lieu de Somme ?'),
    (6,1,'segments-chronologies','Rendre l’analyse interactive','Utiliser segments, chronologies et regroupements de dates.','lesson',45,'["Ajouter un segment","Connecter un filtre à plusieurs TCD","Regrouper les dates"]'::jsonb,$lesson$# Segments et chronologies

## Segments

Un segment est un filtre visuel. Il permet de sélectionner rapidement une ou plusieurs catégories.

## Chronologie

La chronologie est spécialisée pour les dates et permet de filtrer par année, trimestre, mois ou jour.

## Démonstration guidée

Ajoutez un segment `Région` et une chronologie `Date`. Connectez-les à deux tableaux croisés grâce aux connexions de rapport.

## Lisibilité

Gardez peu de segments visibles. Une interface surchargée augmente la charge cognitive.

## Résumé

Les segments rendent un rapport exploratoire, mais ils doivent servir une question claire.
$lesson$,'Comment connecter un segment à plusieurs tableaux croisés dynamiques ?'),
    (7,0,'choisir-graphique','Choisir le bon graphique','Associer une question métier au type de visualisation adapté.','lesson',45,'["Choisir entre barres, lignes et nuage de points","Éviter les graphiques trompeurs"]'::jsonb,$lesson$# Choisir le bon graphique

## Selon la question

- Comparer des catégories : barres horizontales ou colonnes.
- Montrer une évolution : courbe.
- Étudier une relation : nuage de points.
- Montrer une composition simple : barres empilées.

## À éviter

- Les effets 3D.
- Les axes tronqués pour des barres.
- Trop de couleurs.
- Les légendes éloignées lorsque les séries peuvent être étiquetées directement.

## Démonstration guidée

Créez deux graphiques à partir du même tableau : un graphique en secteurs et un graphique en barres. Comparez la facilité de lecture des écarts.

## Résumé

Le meilleur graphique est celui qui rend la comparaison évidente sans explication supplémentaire.
$lesson$,'Quel graphique choisir pour montrer une évolution mensuelle sur deux ans ?'),
    (7,1,'mise-en-forme-graphique','Présenter une visualisation professionnelle','Simplifier le style, hiérarchiser l’information et annoter une conclusion.','lesson',50,'["Réduire le bruit visuel","Créer un titre informatif","Mettre en avant une série"]'::jsonb,$lesson$# Mise en forme professionnelle

## Hiérarchie

Le titre doit transmettre une conclusion, par exemple : « Les ventes progressent depuis mars » plutôt que « Évolution des ventes ».

## Simplification

Supprimez les bordures inutiles, réduisez les quadrillages, utilisez une seule couleur d’accent et formatez les nombres avec leurs unités.

## Annotation

Ajoutez une étiquette sur le point important plutôt qu’un long paragraphe sous le graphique.

## Démonstration guidée

Transformez un graphique Excel par défaut en version professionnelle : fond blanc, quadrillage léger, titre déclaratif, étiquettes directes et source.

## Résumé

La mise en forme doit guider l’œil vers le message, pas attirer l’attention sur les effets graphiques.
$lesson$,'Pourquoi un titre déclaratif est-il plus utile qu’un simple nom de graphique ?'),
    (8,0,'power-query-import','Importer et transformer avec Power Query','Créer une requête reproductible à partir d’un fichier CSV ou Excel.','lesson',60,'["Importer une source","Modifier les types","Documenter les étapes"]'::jsonb,$lesson$# Importer avec Power Query

## Le rôle de Power Query

Power Query sépare la préparation des données de l’analyse. Chaque transformation devient une étape rejouable lors de l’actualisation.

## Étapes courantes

- Importer un CSV ou un classeur.
- Promouvoir les en-têtes.
- Modifier les types.
- Supprimer les colonnes inutiles.
- Filtrer les erreurs.
- Renommer les champs.

## Démonstration guidée

Importez un fichier de ventes, vérifiez chaque type puis ajoutez une colonne `Mois` à partir de la date.

## Bon réflexe

Renommez les étapes importantes. `Type modifié 3` n’explique rien ; `Types métiers validés` est plus utile.

## Résumé

Une requête Power Query est un processus documenté et actualisable.
$lesson$,'Pourquoi faut-il vérifier les types immédiatement après l’import ?'),
    (8,1,'power-query-fusion','Fusionner et consolider plusieurs fichiers','Combiner des fichiers mensuels et enrichir les données avec une jointure.','lesson',65,'["Combiner des fichiers","Fusionner deux requêtes","Comprendre les jointures"]'::jsonb,$lesson$# Combiner et fusionner des données

## Combiner des fichiers

Le connecteur Dossier permet d’appliquer la même transformation à tous les fichiers ayant une structure identique.

## Fusionner des requêtes

Une fusion relie deux tables selon une clé. La jointure gauche conserve toutes les lignes de la table principale et ajoute les correspondances trouvées.

## Démonstration guidée

Consolidez douze fichiers mensuels puis fusionnez le résultat avec un référentiel produits.

## Contrôles

Après la fusion, comptez les valeurs manquantes. Elles peuvent révéler des codes absents du référentiel.

## Résumé

Power Query automatise des tâches répétitives tout en conservant une trace des transformations.
$lesson$,'Quelle jointure utiliser pour conserver toutes les ventes même si certains produits sont absents du référentiel ?'),
    (9,0,'modele-etoile','Construire un modèle en étoile','Séparer table de faits et dimensions pour une analyse robuste.','lesson',55,'["Identifier faits et dimensions","Créer des relations cohérentes"]'::jsonb,$lesson$# Construire un modèle en étoile

## Table de faits

Elle contient les événements mesurables : ventes, commandes ou transactions. Elle porte les clés vers les dimensions.

## Tables de dimensions

Elles décrivent les axes d’analyse : date, produit, client, région ou commercial.

## Relations

La relation habituelle va d’une dimension unique vers plusieurs lignes de faits. Vérifiez que la clé de la dimension ne contient pas de doublons.

## Démonstration guidée

Créez un modèle avec `FaitVentes`, `DimProduit`, `DimClient` et `DimDate`. Reliez chaque dimension à la table de faits.

## Résumé

Le modèle en étoile simplifie les calculs et évite de répéter les descriptions dans la table de faits.
$lesson$,'Pourquoi la clé d’une table de dimension doit-elle être unique ?'),
    (9,1,'mesures-dax','Créer des mesures simples avec DAX','Différencier colonne calculée et mesure puis écrire des indicateurs réutilisables.','lesson',60,'["Créer une mesure","Comprendre le contexte de filtre"]'::jsonb,$lesson$# Introduction aux mesures DAX

## Mesure ou colonne ?

Une colonne calculée produit une valeur pour chaque ligne et occupe de la mémoire. Une mesure est calculée selon le contexte du rapport.

## Mesures de base

`CA Total := SUM(FaitVentes[ChiffreAffaires])`

`Marge Totale := SUM(FaitVentes[Marge])`

`Taux Marge := DIVIDE([Marge Totale];[CA Total])`

## Contexte de filtre

La même mesure change selon la région, le mois ou le produit sélectionné dans le rapport.

## Démonstration guidée

Créez les trois mesures ci-dessus puis affichez-les dans un tableau croisé connecté au modèle de données.

## Résumé

Les mesures centralisent la logique métier et produisent des résultats cohérents dans tout le rapport.
$lesson$,'Quelle différence fondamentale existe entre une colonne calculée et une mesure ?'),
    (10,0,'architecture-dashboard','Structurer un dashboard orienté décision','Définir une hiérarchie claire entre synthèse, tendances et détails.','lesson',55,'["Organiser un dashboard","Limiter les KPI","Créer une lecture logique"]'::jsonb,$lesson$# Architecture d’un dashboard

## Questions avant le design

- Qui utilise le dashboard ?
- Quelle décision doit-il prendre ?
- Quels indicateurs sont prioritaires ?
- Quelle période doit être visible ?

## Structure recommandée

1. Titre et période.
2. Trois à cinq KPI.
3. Une tendance principale.
4. Une comparaison par segment.
5. Un détail filtrable.

## Démonstration guidée

Dessinez d’abord le dashboard sur papier. Placez chaque bloc selon son importance avant d’ajouter les graphiques Excel.

## Résumé

Un dashboard est un outil de décision, pas une collection de graphiques.
$lesson$,'Quelle question doit guider le choix de chaque bloc du dashboard ?'),
    (10,1,'dashboard-interactif','Assembler un dashboard interactif','Connecter TCD, graphiques, segments et cartes KPI dans une page cohérente.','lesson',70,'["Créer des cartes KPI","Synchroniser les filtres","Tester l’interaction"]'::jsonb,$lesson$# Assembler le dashboard

## Cartes KPI

Utilisez des cellules liées aux mesures, avec format numérique cohérent et comparaison à l’objectif.

## Graphiques

Chaque graphique doit répondre à une question différente : évolution, répartition ou comparaison.

## Filtres

Connectez les segments à tous les tableaux croisés concernés. Vérifiez qu’une sélection met à jour l’ensemble du dashboard.

## Démonstration guidée

Assemblez quatre KPI, une courbe mensuelle, un classement des produits et une répartition régionale.

## Test utilisateur

Demandez à une personne de répondre à trois questions métier uniquement avec le dashboard. Notez ce qui n’est pas immédiatement compréhensible.

## Résumé

Un dashboard réussi reste lisible avant même que l’utilisateur touche aux filtres.
$lesson$,'Comment vérifier qu’un segment contrôle bien tous les éléments attendus ?'),
    (11,0,'controle-qualite','Auditer et sécuriser un classeur','Mettre en place contrôles, protection et documentation avant partage.','lesson',55,'["Créer des contrôles d’erreurs","Protéger les zones sensibles","Documenter le fichier"]'::jsonb,$lesson$# Contrôle qualité d’un classeur

## Vérifications essentielles

- Rechercher les erreurs `#N/A`, `#DIV/0!` et `#REF!`.
- Vérifier les totaux avec une méthode indépendante.
- Contrôler les formules incohérentes dans une colonne.
- Identifier les cellules contenant des constantes au milieu des formules.

## Protection

Déverrouillez les cellules de saisie puis protégez la feuille. La protection évite les modifications accidentelles ; elle ne remplace pas une vraie sécurité informatique.

## Documentation

Ajoutez une feuille `Lisez-moi` avec la source des données, la date d’actualisation, les étapes d’utilisation et les limites.

## Résumé

Un fichier professionnel doit être testable, compréhensible et difficile à casser accidentellement.
$lesson$,'Quels contrôles effectuer avant d’envoyer un classeur à un décideur ?'),
    (11,1,'automatisation-introduction','Automatiser sans fragiliser le fichier','Utiliser formules dynamiques, plages nommées et introduction raisonnée aux macros.','lesson',50,'["Identifier les tâches automatisables","Choisir entre formule, Power Query et macro"]'::jsonb,$lesson$# Automatiser sans fragiliser

## Choisir le bon outil

- Formule : calcul instantané dans la feuille.
- Power Query : import et transformation reproductibles.
- Tableau croisé : synthèse interactive.
- Macro : automatisation d’actions répétitives non couvertes simplement par les outils précédents.

## Formules dynamiques

Des fonctions comme `FILTRE`, `TRIER` et `UNIQUE` peuvent produire des listes actualisées automatiquement.

## Macros

Enregistrez une macro simple de mise en forme, inspectez les étapes puis exécutez-la sur une copie du fichier. N’activez jamais une macro provenant d’une source inconnue.

## Démonstration guidée

Créez une liste dynamique des clients actifs avec `FILTRE`, puis comparez cette solution à un filtre manuel.

## Résumé

L’automatisation doit réduire le travail répétitif sans rendre le classeur opaque ou dangereux.
$lesson$,'Quand faut-il préférer Power Query à une macro ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'excel-data-analyst'
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,'["KORYXA Excel Data Analyst"]'::jsonb,l.validation_prompt,FALSE
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
