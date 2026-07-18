-- KORYXA FORMATION — SQL DATA ANALYST AVEC POSTGRESQL — CHANTIER 2
-- Contenu pédagogique complet : 24 leçons, toutes non publiées.

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes,objectives,content_md,validation_prompt) AS (
    VALUES
    (0,0,'sql-postgresql-fondamentaux','Comprendre SQL et PostgreSQL','Situer SQL, PostgreSQL, une base, une table, une ligne et une colonne.','lesson',40,'["Définir SQL et PostgreSQL", "Identifier les objets principaux d’une base", "Lire une table relationnelle"]'::jsonb,$lesson$# Comprendre SQL et PostgreSQL

## Objectif

Situer SQL, PostgreSQL, une base, une table, une ligne et une colonne.

## Concepts essentiels

- SQL est un langage déclaratif pour interroger et modifier les données.
- PostgreSQL est un système de gestion de base de données relationnelle.
- Une table représente une entité ou un événement avec des colonnes typées.

## Exemple PostgreSQL

Observer les tables clients, produits et ventes, puis écrire SELECT * FROM clients LIMIT 5;

## Erreurs à éviter

- Confondre SQL avec un tableur.
- Modifier les données avant d’avoir compris le schéma.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quelle différence existe entre SQL et PostgreSQL ?'),
    (0,1,'premiere-requete-select','Écrire une première requête SELECT','Sélectionner des colonnes, utiliser des alias et limiter le résultat.','lesson',45,'["Écrire SELECT et FROM", "Créer des alias lisibles", "Limiter les lignes retournées"]'::jsonb,$lesson$# Écrire une première requête SELECT

## Objectif

Sélectionner des colonnes, utiliser des alias et limiter le résultat.

## Concepts essentiels

- SELECT choisit les colonnes à retourner.
- FROM indique la table source.
- LIMIT réduit le volume affiché pendant l’exploration.

## Exemple PostgreSQL

Exécuter SELECT nom, segment AS categorie_client FROM clients ORDER BY nom LIMIT 10;

## Erreurs à éviter

- Utiliser SELECT * dans les livrables finaux.
- Donner des alias ambigus ou incohérents.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi faut-il sélectionner explicitement les colonnes utiles ?'),
    (1,0,'filtrer-avec-where','Filtrer avec WHERE','Construire des conditions fiables avec les opérateurs SQL.','lesson',50,'["Utiliser les opérateurs de comparaison", "Combiner AND, OR et NOT", "Employer IN, BETWEEN et LIKE"]'::jsonb,$lesson$# Filtrer avec WHERE

## Objectif

Construire des conditions fiables avec les opérateurs SQL.

## Concepts essentiels

- WHERE filtre les lignes avant agrégation.
- Les parenthèses rendent les conditions complexes explicites.
- LIKE et ILIKE servent aux recherches textuelles.

## Exemple PostgreSQL

Lister les clients actifs de Dakar dont le chiffre d’affaires dépasse 500000 FCFA.

## Erreurs à éviter

- Mélanger AND et OR sans parenthèses.
- Comparer une valeur NULL avec =.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Comment SQL évalue-t-il une condition combinant AND et OR ?'),
    (1,1,'trier-dedoublonner-null','Trier, dédupliquer et gérer NULL','Utiliser ORDER BY, DISTINCT et les prédicats NULL.','lesson',45,'["Trier sur plusieurs colonnes", "Dédupliquer un résultat", "Tester IS NULL et IS NOT NULL"]'::jsonb,$lesson$# Trier, dédupliquer et gérer NULL

## Objectif

Utiliser ORDER BY, DISTINCT et les prédicats NULL.

## Concepts essentiels

- ORDER BY peut combiner ordre croissant et décroissant.
- DISTINCT agit sur l’ensemble des colonnes sélectionnées.
- NULL représente une valeur absente ou inconnue.

## Exemple PostgreSQL

Extraire les villes distinctes, les trier, puis repérer les clients sans téléphone.

## Erreurs à éviter

- Remplacer NULL par une chaîne vide sans règle métier.
- Utiliser DISTINCT pour masquer une mauvaise jointure.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi DISTINCT ne doit-il pas servir à corriger une jointure incorrecte ?'),
    (2,0,'expressions-case-coalesce','Créer des expressions avec CASE et COALESCE','Transformer les valeurs en colonnes métier exploitables.','lesson',50,'["Créer une expression calculée", "Catégoriser avec CASE", "Gérer les valeurs absentes avec COALESCE"]'::jsonb,$lesson$# Créer des expressions avec CASE et COALESCE

## Objectif

Transformer les valeurs en colonnes métier exploitables.

## Concepts essentiels

- CASE traduit des règles métier en SQL.
- COALESCE retourne la première valeur non nulle.
- Les alias décrivent le sens du calcul produit.

## Exemple PostgreSQL

Créer un statut de commande selon le montant et remplacer les régions absentes par Non renseignée.

## Erreurs à éviter

- Coder des seuils sans les documenter.
- Transformer toute valeur absente en zéro.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Dans quel cas COALESCE est-il préférable à CASE ?'),
    (2,1,'fonctions-textes-dates-types','Transformer textes, dates et types','Utiliser les fonctions PostgreSQL pour nettoyer et enrichir.','lesson',55,'["Nettoyer du texte", "Extraire des composantes de date", "Convertir les types avec CAST"]'::jsonb,$lesson$# Transformer textes, dates et types

## Objectif

Utiliser les fonctions PostgreSQL pour nettoyer et enrichir.

## Concepts essentiels

- TRIM, LOWER et UPPER normalisent le texte.
- DATE_TRUNC et EXTRACT structurent l’analyse temporelle.
- CAST rend les conversions explicites et contrôlables.

## Exemple PostgreSQL

Normaliser les emails, calculer le mois de vente et convertir une colonne texte en date.

## Erreurs à éviter

- Appliquer une conversion sans vérifier les formats.
- Utiliser FORMAT pour un calcul qui exige un vrai type date.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi conserver un vrai type date plutôt qu’un texte formaté ?'),
    (3,0,'agregations-sql','Calculer des agrégats','Construire des indicateurs avec COUNT, SUM, AVG, MIN et MAX.','lesson',50,'["Compter des lignes et valeurs uniques", "Calculer sommes et moyennes", "Comprendre le comportement avec NULL"]'::jsonb,$lesson$# Calculer des agrégats

## Objectif

Construire des indicateurs avec COUNT, SUM, AVG, MIN et MAX.

## Concepts essentiels

- COUNT(*) compte les lignes.
- COUNT(colonne) ignore les valeurs NULL.
- SUM et AVG nécessitent des types numériques cohérents.

## Exemple PostgreSQL

Calculer le nombre de ventes, le chiffre d’affaires, la marge moyenne et le nombre de clients uniques.

## Erreurs à éviter

- Confondre COUNT(*) et COUNT(colonne).
- Moyenner des moyennes sans pondération.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quelle différence existe entre COUNT(*) et COUNT(colonne) ?'),
    (3,1,'group-by-having','Regrouper avec GROUP BY et HAVING','Produire des KPI par dimension et filtrer les groupes.','lesson',55,'["Regrouper par une ou plusieurs dimensions", "Filtrer après agrégation", "Créer des agrégations conditionnelles"]'::jsonb,$lesson$# Regrouper avec GROUP BY et HAVING

## Objectif

Produire des KPI par dimension et filtrer les groupes.

## Concepts essentiels

- GROUP BY définit le grain du résultat.
- HAVING filtre les groupes après calcul.
- FILTER ou CASE permettent des agrégations conditionnelles.

## Exemple PostgreSQL

Calculer le CA par région et ne conserver que les régions dépassant l’objectif.

## Erreurs à éviter

- Sélectionner une colonne non agrégée absente du GROUP BY.
- Utiliser WHERE pour filtrer un agrégat.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi HAVING intervient-il après GROUP BY ?'),
    (4,0,'inner-left-join','Maîtriser INNER JOIN et LEFT JOIN','Relier des tables avec les bonnes clés.','lesson',60,'["Écrire une jointure explicite", "Choisir INNER ou LEFT JOIN", "Qualifier les colonnes"]'::jsonb,$lesson$# Maîtriser INNER JOIN et LEFT JOIN

## Objectif

Relier des tables avec les bonnes clés.

## Concepts essentiels

- INNER JOIN conserve les correspondances.
- LEFT JOIN conserve toutes les lignes de gauche.
- La condition ON doit utiliser des clés compatibles.

## Exemple PostgreSQL

Relier ventes, produits et clients pour afficher le détail enrichi des transactions.

## Erreurs à éviter

- Joindre sur un libellé instable.
- Oublier les alias de table dans une requête multi-tables.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quand faut-il préférer LEFT JOIN à INNER JOIN ?'),
    (4,1,'controler-jointures-cardinalite','Contrôler cardinalité et qualité des jointures','Détecter pertes, doublons et clés non uniques.','lesson',60,'["Mesurer le nombre de lignes avant et après", "Détecter les clés orphelines", "Identifier une relation plusieurs-à-plusieurs"]'::jsonb,$lesson$# Contrôler cardinalité et qualité des jointures

## Objectif

Détecter pertes, doublons et clés non uniques.

## Concepts essentiels

- Une jointure peut multiplier les lignes si la clé de droite n’est pas unique.
- Une anti-jointure détecte les références absentes.
- Le grain doit rester stable après enrichissement.

## Exemple PostgreSQL

Comparer COUNT(*) avant et après jointure, puis lister les codes produits sans correspondance.

## Erreurs à éviter

- Ajouter DISTINCT après une multiplication de lignes.
- Supposer qu’une clé est unique sans la vérifier.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quel contrôle simple révèle une multiplication inattendue des lignes ?'),
    (5,0,'sous-requetes-scalaires-in','Utiliser les sous-requêtes scalaires et IN','Comparer une valeur à un résultat intermédiaire.','lesson',50,'["Écrire une sous-requête scalaire", "Filtrer avec IN", "Comparer à une moyenne globale"]'::jsonb,$lesson$# Utiliser les sous-requêtes scalaires et IN

## Objectif

Comparer une valeur à un résultat intermédiaire.

## Concepts essentiels

- Une sous-requête scalaire doit retourner une seule valeur.
- IN compare à un ensemble de valeurs.
- Le résultat intermédiaire reste encapsulé dans la requête.

## Exemple PostgreSQL

Identifier les ventes supérieures au montant moyen et les clients appartenant aux régions prioritaires.

## Erreurs à éviter

- Retourner plusieurs lignes dans une sous-requête scalaire.
- Utiliser IN avec un ensemble contenant des NULL sans contrôle.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quelle contrainte s’applique à une sous-requête scalaire ?'),
    (5,1,'exists-sous-requetes-correlees','Utiliser EXISTS et les sous-requêtes corrélées','Tester l’existence d’événements liés à chaque ligne.','lesson',55,'["Comprendre une corrélation", "Utiliser EXISTS et NOT EXISTS", "Éviter les scans inutiles"]'::jsonb,$lesson$# Utiliser EXISTS et les sous-requêtes corrélées

## Objectif

Tester l’existence d’événements liés à chaque ligne.

## Concepts essentiels

- EXISTS teste si au moins une ligne correspond.
- La sous-requête corrélée référence la ligne courante.
- NOT EXISTS est robuste pour détecter les absences.

## Exemple PostgreSQL

Lister les clients ayant au moins une vente et ceux n’ayant jamais acheté.

## Erreurs à éviter

- Sélectionner des colonnes inutiles dans EXISTS.
- Confondre NOT IN et NOT EXISTS en présence de NULL.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi NOT EXISTS est-il souvent plus sûr que NOT IN ?'),
    (6,0,'cte-with','Structurer une requête avec WITH','Découper une analyse en étapes lisibles.','lesson',50,'["Créer une CTE", "Nommer les étapes métier", "Réutiliser un résultat intermédiaire"]'::jsonb,$lesson$# Structurer une requête avec WITH

## Objectif

Découper une analyse en étapes lisibles.

## Concepts essentiels

- WITH déclare des résultats intermédiaires nommés.
- Chaque CTE doit avoir une responsabilité claire.
- La requête finale assemble les étapes.

## Exemple PostgreSQL

Créer des CTE ventes_mensuelles et objectifs, puis calculer le taux d’atteinte.

## Erreurs à éviter

- Créer une CTE pour chaque ligne sans bénéfice.
- Utiliser des noms techniques incompréhensibles.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quel avantage principal apporte une CTE à une analyse complexe ?'),
    (6,1,'cte-multiples-recursives','Enchaîner plusieurs CTE et découvrir la récursivité','Construire un pipeline SQL et comprendre WITH RECURSIVE.','lesson',55,'["Chaîner plusieurs CTE", "Contrôler chaque étape", "Comprendre le cas d’usage récursif"]'::jsonb,$lesson$# Enchaîner plusieurs CTE et découvrir la récursivité

## Objectif

Construire un pipeline SQL et comprendre WITH RECURSIVE.

## Concepts essentiels

- Les CTE peuvent dépendre des précédentes.
- WITH RECURSIVE traite des structures hiérarchiques ou séries.
- Chaque étape doit être testable séparément.

## Exemple PostgreSQL

Construire un pipeline ventes nettes, classement clients et synthèse finale ; générer ensuite une petite série de dates récursive.

## Erreurs à éviter

- Créer une récursion sans condition d’arrêt.
- Masquer une logique simple derrière trop de niveaux.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quel élément empêche une CTE récursive de boucler indéfiniment ?'),
    (7,0,'window-ranking','Classer avec les fonctions de fenêtre','Utiliser OVER, PARTITION BY, ROW_NUMBER, RANK et DENSE_RANK.','lesson',60,'["Comprendre la fenêtre analytique", "Classer dans chaque groupe", "Choisir la bonne fonction de rang"]'::jsonb,$lesson$# Classer avec les fonctions de fenêtre

## Objectif

Utiliser OVER, PARTITION BY, ROW_NUMBER, RANK et DENSE_RANK.

## Concepts essentiels

- Une fonction de fenêtre conserve le détail des lignes.
- PARTITION BY redémarre le calcul par groupe.
- RANK crée des trous après égalité, DENSE_RANK non.

## Exemple PostgreSQL

Classer les produits par chiffre d’affaires dans chaque catégorie.

## Erreurs à éviter

- Remplacer GROUP BY par une fenêtre sans comprendre le grain.
- Oublier ORDER BY dans une fonction de classement.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quelle différence existe entre RANK et DENSE_RANK ?'),
    (7,1,'window-lag-cumul','Calculer cumuls et évolutions avec LAG','Comparer les périodes sans perdre le détail.','lesson',60,'["Créer un cumul", "Accéder à la ligne précédente", "Calculer une variation temporelle"]'::jsonb,$lesson$# Calculer cumuls et évolutions avec LAG

## Objectif

Comparer les périodes sans perdre le détail.

## Concepts essentiels

- SUM(...) OVER calcule un cumul selon l’ordre.
- LAG retourne la valeur précédente.
- Le tri de la fenêtre définit la chronologie.

## Exemple PostgreSQL

Calculer le CA mensuel, le cumul annuel et l’évolution par rapport au mois précédent.

## Erreurs à éviter

- Oublier le partitionnement par année.
- Calculer un pourcentage sans gérer la division par zéro.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quel rôle joue ORDER BY dans un cumul de fenêtre ?'),
    (8,0,'creer-vues','Créer des vues analytiques','Exposer une requête stable comme interface de données.','lesson',50,'["Créer et remplacer une vue", "Choisir les colonnes exposées", "Documenter le contrat de la vue"]'::jsonb,$lesson$# Créer des vues analytiques

## Objectif

Exposer une requête stable comme interface de données.

## Concepts essentiels

- CREATE VIEW encapsule une requête réutilisable.
- Une vue ne stocke pas les résultats par défaut.
- Les noms et types exposés forment un contrat.

## Exemple PostgreSQL

Créer vue_ventes_enrichies avec les dimensions et mesures nécessaires au reporting.

## Erreurs à éviter

- Exposer des colonnes sensibles.
- Utiliser SELECT * dans une vue durable.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi une vue doit-elle exposer explicitement ses colonnes ?'),
    (8,1,'vues-materialisees','Utiliser les vues matérialisées','Choisir entre fraîcheur et performance.','lesson',55,'["Créer une vue matérialisée", "Actualiser les résultats", "Comprendre les compromis"]'::jsonb,$lesson$# Utiliser les vues matérialisées

## Objectif

Choisir entre fraîcheur et performance.

## Concepts essentiels

- Une vue matérialisée stocke le résultat.
- REFRESH MATERIALIZED VIEW met à jour les données.
- Un index peut accélérer les consultations.

## Exemple PostgreSQL

Créer une synthèse mensuelle matérialisée, l’indexer et mesurer son temps de lecture.

## Erreurs à éviter

- Oublier la stratégie d’actualisation.
- Utiliser une vue matérialisée pour des données devant être instantanées.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quel compromis principal accompagne une vue matérialisée ?'),
    (9,0,'insert-update-delete','Modifier les données avec INSERT, UPDATE et DELETE','Écrire des opérations ciblées et vérifiables.','lesson',55,'["Insérer des lignes", "Mettre à jour avec WHERE", "Supprimer avec contrôle"]'::jsonb,$lesson$# Modifier les données avec INSERT, UPDATE et DELETE

## Objectif

Écrire des opérations ciblées et vérifiables.

## Concepts essentiels

- INSERT ajoute des lignes conformes aux contraintes.
- UPDATE et DELETE doivent être précédés d’un SELECT équivalent.
- RETURNING montre les lignes modifiées.

## Exemple PostgreSQL

Insérer un produit, corriger son prix avec UPDATE RETURNING, puis supprimer une ligne de test.

## Erreurs à éviter

- Exécuter UPDATE ou DELETE sans WHERE.
- Ignorer les contraintes et erreurs retournées.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quelle vérification précède un UPDATE ou DELETE sensible ?'),
    (9,1,'transactions-contraintes','Sécuriser avec transactions et contraintes','Garantir l’intégrité pendant les modifications.','lesson',55,'["Utiliser BEGIN, COMMIT et ROLLBACK", "Comprendre PK, FK, UNIQUE et CHECK", "Tester une opération avant validation"]'::jsonb,$lesson$# Sécuriser avec transactions et contraintes

## Objectif

Garantir l’intégrité pendant les modifications.

## Concepts essentiels

- Une transaction regroupe plusieurs opérations atomiques.
- ROLLBACK annule les changements non validés.
- Les contraintes protègent les règles structurelles.

## Exemple PostgreSQL

Importer plusieurs lignes dans une transaction, provoquer une erreur contrôlée, puis annuler avec ROLLBACK.

## Erreurs à éviter

- Valider avant les contrôles.
- Désactiver les contraintes pour accélérer un import non maîtrisé.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Que garantit une transaction atomique ?'),
    (10,0,'explain-index','Lire EXPLAIN et utiliser les index','Diagnostiquer une requête et choisir un index utile.','lesson',65,'["Lire un plan simple", "Identifier un scan séquentiel", "Créer et évaluer un index"]'::jsonb,$lesson$# Lire EXPLAIN et utiliser les index

## Objectif

Diagnostiquer une requête et choisir un index utile.

## Concepts essentiels

- EXPLAIN montre la stratégie du planificateur.
- EXPLAIN ANALYZE exécute la requête et mesure.
- Un index aide surtout les filtres et jointures sélectifs.

## Exemple PostgreSQL

Analyser une requête filtrant date et client, créer un index adapté, puis comparer les plans.

## Erreurs à éviter

- Créer un index sur chaque colonne.
- Utiliser EXPLAIN ANALYZE sur une modification sans transaction.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi un index peut-il ralentir les écritures ?'),
    (10,1,'roles-permissions','Gérer rôles et permissions','Appliquer le principe du moindre privilège.','lesson',50,'["Créer un rôle", "Accorder SELECT sur des vues", "Révoquer les droits inutiles"]'::jsonb,$lesson$# Gérer rôles et permissions

## Objectif

Appliquer le principe du moindre privilège.

## Concepts essentiels

- GRANT accorde des permissions ciblées.
- REVOKE retire des privilèges.
- Les utilisateurs BI ne doivent pas modifier les tables sources.

## Exemple PostgreSQL

Créer un rôle lecture_reporting et lui accorder uniquement SELECT sur les vues analytiques.

## Erreurs à éviter

- Accorder tous les droits au rôle applicatif.
- Partager un compte administrateur entre utilisateurs.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Que signifie le principe du moindre privilège ?'),
    (11,0,'preparer-postgresql-power-bi','Préparer PostgreSQL pour Power BI','Construire une couche analytique stable et documentée.','lesson',60,'["Préparer des vues BI", "Limiter les colonnes et lignes", "Documenter les types et clés"]'::jsonb,$lesson$# Préparer PostgreSQL pour Power BI

## Objectif

Construire une couche analytique stable et documentée.

## Concepts essentiels

- Power BI doit consommer des vues orientées analyse.
- Les types PostgreSQL doivent être compatibles et explicites.
- La requête source doit rester contrôlable et performante.

## Exemple PostgreSQL

Créer une vue ventes_power_bi avec dates, dimensions, CA et marge, puis vérifier son grain.

## Erreurs à éviter

- Connecter Power BI directement à toutes les tables brutes.
- Exposer des identifiants ou données personnelles inutiles.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Pourquoi préparer des vues dédiées avant la connexion Power BI ?'),
    (11,1,'connecter-actualiser-documenter','Connecter, actualiser et remettre l’analyse','Finaliser la chaîne PostgreSQL vers Power BI.','lesson',65,'["Configurer la connexion", "Choisir Import ou DirectQuery", "Documenter actualisation et contrôles"]'::jsonb,$lesson$# Connecter, actualiser et remettre l’analyse

## Objectif

Finaliser la chaîne PostgreSQL vers Power BI.

## Concepts essentiels

- Le mode Import optimise souvent l’expérience analytique.
- DirectQuery interroge la source à chaque interaction.
- La documentation couvre source, vues, droits et actualisation.

## Exemple PostgreSQL

Connecter Power BI à la vue analytique, contrôler les totaux, définir l’actualisation et rédiger trois recommandations métier.

## Erreurs à éviter

- Publier sans tester les droits du rôle lecture.
- Oublier de comparer les totaux SQL et Power BI.

## Résumé opérationnel

Écrivez la requête, vérifiez le nombre de lignes, contrôlez un échantillon et documentez le grain du résultat.$lesson$,'Quels contrôles doivent précéder la remise du projet final ?')
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'sql-data-analyst'
)
INSERT INTO public.lessons(
    module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,
    objectives,content_md,source_refs,validation_prompt,is_published
)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,
       l.objectives,l.content_md,'["KORYXA SQL Data Analyst", "PostgreSQL"]'::jsonb,l.validation_prompt,FALSE
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
    WHERE c.slug='sql-data-analyst';
    IF lesson_count<>24 OR module_coverage<>12 OR published_count<>0 THEN
        RAISE EXCEPTION 'Contenu SQL incomplet: leçons %, modules couverts %, publiées %', lesson_count, module_coverage, published_count;
    END IF;
END $$;
