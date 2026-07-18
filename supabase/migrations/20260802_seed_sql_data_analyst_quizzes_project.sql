-- KORYXA FORMATION — SQL DATA ANALYST AVEC POSTGRESQL — CHANTIER 4
-- Quiz, test final et projet final. Contenus non publiés.

ALTER TABLE public.quiz_questions
ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=0
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quel mot-clé choisit les colonnes à retourner ?',jsonb_build_array('A) SELECT','B) FROM','C) WHERE','D) ORDER BY'),'A','debutant','Fondamentaux','SELECT définit les colonnes du résultat.'),(2,'true_false','PostgreSQL est un système de gestion de base de données relationnelle.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement un langage','D) Seulement un client SQL'),'A','debutant','Fondamentaux','PostgreSQL est un SGBDR complet.'),(3,'comprehension','Quelle contrainte identifie de façon unique une ligne ?',jsonb_build_array('A) PRIMARY KEY','B) CHECK','C) DEFAULT','D) VIEW'),'A','intermediaire','Fondamentaux','Une clé primaire identifie chaque ligne.'),(4,'mini_challenge','Quelle requête explore dix clients ?',jsonb_build_array('A) SELECT * FROM clients LIMIT 10','B) DELETE FROM clients','C) DROP TABLE clients','D) UPDATE clients'),'A','avance','Fondamentaux','LIMIT réduit le nombre de lignes affichées.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=1
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quel opérateur teste une liste de valeurs ?',jsonb_build_array('A) IN','B) LIKE','C) BETWEEN','D) IS NULL'),'A','debutant','Filtres et tris','IN compare une valeur à une liste.'),(2,'true_false','DISTINCT peut masquer une mauvaise jointure et doit être utilisé avec prudence.',jsonb_build_array('A) Vrai','B) Faux','C) Jamais','D) Seulement avec COUNT'),'A','debutant','Filtres et tris','DISTINCT ne corrige pas une cardinalité incorrecte.'),(3,'comprehension','Comment tester une valeur absente ?',jsonb_build_array('A) IS NULL','B) = NULL','C) LIKE NULL','D) IN NULL'),'A','intermediaire','Filtres et tris','NULL se teste avec IS NULL.'),(4,'mini_challenge','Quel tri place le CA le plus élevé en premier ?',jsonb_build_array('A) ORDER BY ca DESC','B) ORDER BY ca ASC','C) GROUP BY ca','D) HAVING ca'),'A','avance','Filtres et tris','DESC trie du plus grand au plus petit.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=2
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle expression gère une valeur de remplacement ?',jsonb_build_array('A) COALESCE','B) COUNT','C) JOIN','D) RANK'),'A','debutant','Expressions','COALESCE retourne la première valeur non nulle.'),(2,'true_false','CASE permet de traduire une règle métier en catégories.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement pour les dates','D) Seulement dans UPDATE'),'A','debutant','Expressions','CASE crée des branches conditionnelles.'),(3,'comprehension','Quelle fonction tronque une date au mois ?',jsonb_build_array('A) DATE_TRUNC','B) TRIM','C) ROUND','D) CAST'),'A','intermediaire','Expressions','DATE_TRUNC permet de ramener une date à une granularité.'),(4,'mini_challenge','Quel calcul produit la marge unitaire ?',jsonb_build_array('A) prix_unitaire - cout_unitaire','B) prix_unitaire + cout_unitaire','C) quantite / 0','D) COUNT(*)'),'A','avance','Expressions','La marge unitaire est le prix moins le coût.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=3
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle fonction compte les clients uniques ?',jsonb_build_array('A) COUNT(DISTINCT code_client)','B) SUM(code_client)','C) AVG(code_client)','D) MAX(code_client)'),'A','debutant','Agrégations','COUNT DISTINCT compte les valeurs uniques.'),(2,'true_false','HAVING filtre les groupes après agrégation.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement avant GROUP BY','D) Jamais'),'A','debutant','Agrégations','HAVING agit après GROUP BY.'),(3,'comprehension','Quel élément définit le grain d’un résultat agrégé ?',jsonb_build_array('A) GROUP BY','B) ORDER BY','C) LIMIT','D) DISTINCT seulement'),'A','intermediaire','Agrégations','GROUP BY fixe les dimensions du résultat.'),(4,'mini_challenge','Quelle fonction calcule le chiffre d’affaires total ?',jsonb_build_array('A) SUM(chiffre_affaires)','B) COUNT(chiffre_affaires)','C) MIN(chiffre_affaires)','D) LENGTH(chiffre_affaires)'),'A','avance','Agrégations','SUM additionne les montants.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=4
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle jointure conserve toutes les lignes de gauche ?',jsonb_build_array('A) LEFT JOIN','B) INNER JOIN','C) CROSS JOIN','D) RIGHT JOIN'),'A','debutant','Jointures','LEFT JOIN conserve la table de gauche.'),(2,'true_false','Une clé non unique peut multiplier les lignes d’une jointure.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement avec NULL','D) Seulement avec ORDER BY'),'A','debutant','Jointures','La cardinalité de la clé est déterminante.'),(3,'comprehension','Quel contrôle détecte une perte ou duplication ?',jsonb_build_array('A) Comparer COUNT(*) avant et après','B) Ajouter DISTINCT','C) Masquer les lignes','D) Changer le tri'),'A','intermediaire','Jointures','Comparer les volumes révèle les anomalies.'),(4,'mini_challenge','Comment trouver des produits orphelins ?',jsonb_build_array('A) LEFT JOIN puis WHERE clé droite IS NULL','B) INNER JOIN seulement','C) ORDER BY produit','D) SUM(prix)'),'A','avance','Jointures','L’anti-jointure détecte les absences.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=5
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle clause teste l’existence d’au moins une ligne ?',jsonb_build_array('A) EXISTS','B) BETWEEN','C) ORDER BY','D) CAST'),'A','debutant','Sous-requêtes','EXISTS renvoie vrai dès qu’une ligne correspond.'),(2,'true_false','Une sous-requête scalaire doit retourner une seule valeur.',jsonb_build_array('A) Vrai','B) Faux','C) Toujours plusieurs lignes','D) Seulement du texte'),'A','debutant','Sous-requêtes','Une expression scalaire attend une valeur.'),(3,'comprehension','Pourquoi NOT EXISTS est souvent préférable à NOT IN ?',jsonb_build_array('A) Il gère mieux les NULL','B) Il trie automatiquement','C) Il crée un index','D) Il agrège'),'A','intermediaire','Sous-requêtes','NOT IN peut être piégeux avec NULL.'),(4,'mini_challenge','Comment comparer le CA client à la moyenne ?',jsonb_build_array('A) Sous-requête d’agrégation','B) DELETE','C) ALTER TABLE','D) VACUUM'),'A','avance','Sous-requêtes','Une sous-requête peut fournir la moyenne de référence.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=6
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quel mot-clé introduit une CTE ?',jsonb_build_array('A) WITH','B) WINDOW','C) RETURNING','D) GRANT'),'A','debutant','CTE','WITH déclare une CTE.'),(2,'true_false','Les CTE peuvent dépendre de CTE précédentes.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement récursives','D) Jamais'),'A','debutant','CTE','Les CTE peuvent former un pipeline.'),(3,'comprehension','Pourquoi utiliser plusieurs CTE nommées ?',jsonb_build_array('A) Décomposer une analyse complexe','B) Masquer les erreurs','C) Remplacer toutes les vues','D) Éviter les jointures'),'A','intermediaire','CTE','Elles améliorent lisibilité et testabilité.'),(4,'mini_challenge','Quel risque existe avec une CTE récursive ?',jsonb_build_array('A) Absence de condition d’arrêt','B) Trop de colonnes aliasées','C) ORDER BY obligatoire','D) Aucun'),'A','avance','CTE','Une récursion doit converger.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=7
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle fonction retourne la valeur précédente ?',jsonb_build_array('A) LAG','B) LEAD','C) RANK','D) SUM'),'A','debutant','Fenêtres','LAG lit la ligne précédente dans la fenêtre.'),(2,'true_false','Une fonction de fenêtre conserve le détail des lignes.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement avec GROUP BY','D) Jamais'),'A','debutant','Fenêtres','Elle n’effondre pas le grain comme GROUP BY.'),(3,'comprehension','Que fait PARTITION BY ?',jsonb_build_array('A) Redémarre le calcul par groupe','B) Supprime les doublons','C) Crée une table','D) Filtre les lignes'),'A','intermediaire','Fenêtres','PARTITION BY segmente la fenêtre.'),(4,'mini_challenge','Quelle expression calcule un cumul ?',jsonb_build_array('A) SUM(ca) OVER (ORDER BY mois)','B) SUM(ca) GROUP BY mois seulement','C) COUNT(*) LIMIT 1','D) MAX(ca) WHERE'),'A','avance','Fenêtres','SUM OVER ordonné calcule un cumul.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=8
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle commande crée une vue ?',jsonb_build_array('A) CREATE VIEW','B) CREATE INDEX','C) CREATE ROLE','D) CREATE DATABASE'),'A','debutant','Vues','CREATE VIEW encapsule une requête.'),(2,'true_false','Une vue matérialisée stocke son résultat.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en mémoire','D) Jamais'),'A','debutant','Vues','Elle persiste le résultat jusqu’au rafraîchissement.'),(3,'comprehension','Quelle commande actualise une vue matérialisée ?',jsonb_build_array('A) REFRESH MATERIALIZED VIEW','B) ANALYZE VIEW','C) UPDATE VIEW','D) RESET VIEW'),'A','intermediaire','Vues','REFRESH recalcule son contenu.'),(4,'mini_challenge','Pourquoi éviter SELECT * dans une vue durable ?',jsonb_build_array('A) Le contrat de colonnes devient instable','B) Cela empêche les filtres','C) Cela supprime les index','D) Cela interdit GROUP BY'),'A','avance','Vues','Une vue doit exposer explicitement ses colonnes.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=9
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle commande annule une transaction non validée ?',jsonb_build_array('A) ROLLBACK','B) COMMIT','C) GRANT','D) EXPLAIN'),'A','debutant','Transactions','ROLLBACK annule les changements en attente.'),(2,'true_false','UPDATE et DELETE doivent être testés avec un SELECT équivalent.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement en production','D) Jamais'),'A','debutant','Transactions','Cela vérifie le périmètre touché.'),(3,'comprehension','Que garantit l’atomicité ?',jsonb_build_array('A) Tout ou rien','B) Tri automatique','C) Index automatique','D) Aucune contrainte'),'A','intermediaire','Transactions','Une transaction atomique est indivisible.'),(4,'mini_challenge','Quelle clause montre les lignes modifiées ?',jsonb_build_array('A) RETURNING','B) HAVING','C) WINDOW','D) EXISTS'),'A','avance','Transactions','RETURNING expose les lignes affectées.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=10
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quelle commande montre le plan d’exécution ?',jsonb_build_array('A) EXPLAIN','B) VACUUM FULL','C) GRANT','D) COPY'),'A','debutant','Performance et sécurité','EXPLAIN décrit le plan choisi.'),(2,'true_false','Un index peut ralentir les écritures.',jsonb_build_array('A) Vrai','B) Faux','C) Jamais','D) Seulement sur les vues'),'A','debutant','Performance et sécurité','Chaque écriture doit maintenir les index.'),(3,'comprehension','Quel principe limite les droits au strict nécessaire ?',jsonb_build_array('A) Moindre privilège','B) Toutes permissions','C) Compte partagé','D) Accès public'),'A','intermediaire','Performance et sécurité','Le moindre privilège réduit le risque.'),(4,'mini_challenge','Quel droit suffit à un rôle de reporting sur une vue ?',jsonb_build_array('A) SELECT','B) DROP','C) ALTER','D) TRUNCATE'),'A','avance','Performance et sécurité','Le reporting nécessite la lecture.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (1,'qcm','Quel objet expose une couche stable à Power BI ?',jsonb_build_array('A) Une vue analytique','B) Une table temporaire locale','C) Un commentaire','D) Un rôle admin'),'A','debutant','PostgreSQL vers Power BI','Une vue sert de contrat de données.'),(2,'true_false','Les totaux SQL et Power BI doivent être comparés avant remise.',jsonb_build_array('A) Vrai','B) Faux','C) Seulement après publication','D) Jamais'),'A','debutant','PostgreSQL vers Power BI','La réconciliation valide la chaîne.'),(3,'comprehension','Quel mode charge les données dans le modèle Power BI ?',jsonb_build_array('A) Import','B) DirectQuery uniquement','C) CSV virtuel','D) RLS'),'A','intermediaire','PostgreSQL vers Power BI','Import copie les données dans le modèle.'),(4,'mini_challenge','Que doit documenter la remise ?',jsonb_build_array('A) Sources, vues, droits et actualisation','B) Seulement les couleurs','C) Seulement le logo','D) Rien'),'A','avance','PostgreSQL vers Power BI','La documentation rend la solution maintenable.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;

WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES (101,'qcm','Quelle clause filtre les lignes avant agrégation ?',jsonb_build_array('A) WHERE','B) HAVING','C) ORDER BY','D) LIMIT'),'A','intermediaire','synthèse','La bonne réponse est WHERE.'),(102,'qcm','Quelle clause filtre les groupes agrégés ?',jsonb_build_array('A) HAVING','B) WHERE','C) FROM','D) JOIN'),'A','intermediaire','synthèse','La bonne réponse est HAVING.'),(103,'qcm','Quelle jointure conserve toutes les lignes de gauche ?',jsonb_build_array('A) LEFT JOIN','B) INNER JOIN','C) CROSS JOIN','D) FULL JOIN uniquement'),'A','intermediaire','synthèse','La bonne réponse est LEFT JOIN.'),(104,'qcm','Quelle fonction compte les clients uniques ?',jsonb_build_array('A) COUNT(DISTINCT code_client)','B) SUM(code_client)','C) AVG(code_client)','D) MIN(code_client)'),'A','intermediaire','synthèse','La bonne réponse est COUNT(DISTINCT code_client).'),(105,'qcm','Quel mot-clé introduit une CTE ?',jsonb_build_array('A) WITH','B) OVER','C) GRANT','D) RETURNING'),'A','intermediaire','synthèse','La bonne réponse est WITH.'),(106,'qcm','Quelle fonction récupère la valeur précédente ?',jsonb_build_array('A) LAG','B) RANK','C) SUM','D) CAST'),'A','intermediaire','synthèse','La bonne réponse est LAG.'),(107,'qcm','Quelle commande crée une vue matérialisée ?',jsonb_build_array('A) CREATE MATERIALIZED VIEW','B) CREATE TEMP VIEW','C) ALTER VIEW','D) REFRESH VIEW'),'A','intermediaire','synthèse','La bonne réponse est CREATE MATERIALIZED VIEW.'),(108,'qcm','Quelle commande annule une transaction ?',jsonb_build_array('A) ROLLBACK','B) COMMIT','C) ANALYZE','D) VACUUM'),'A','intermediaire','synthèse','La bonne réponse est ROLLBACK.'),(109,'qcm','Quel outil inspecte un plan d’exécution ?',jsonb_build_array('A) EXPLAIN ANALYZE','B) COUNT','C) DISTINCT','D) COALESCE'),'A','intermediaire','synthèse','La bonne réponse est EXPLAIN ANALYZE.'),(110,'qcm','Quel droit minimal donne accès en lecture à une vue ?',jsonb_build_array('A) SELECT','B) DROP','C) ALTER','D) DELETE'),'A','intermediaire','synthèse','La bonne réponse est SELECT.'),(111,'qcm','Pourquoi préparer des vues pour Power BI ?',jsonb_build_array('A) Stabiliser et sécuriser la couche de données','B) Éviter les types','C) Supprimer les clés','D) Contourner les droits'),'A','intermediaire','synthèse','La bonne réponse est Stabiliser et sécuriser la couche de données.'),(112,'qcm','Quel contrôle final est indispensable ?',jsonb_build_array('A) Comparer les totaux SQL et Power BI','B) Changer les couleurs','C) Masquer les erreurs','D) Supprimer les logs'),'A','intermediaire','synthèse','La bonne réponse est Comparer les totaux SQL et Power BI.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,TRUE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=TRUE;


WITH c AS (SELECT id FROM public.courses WHERE slug='sql-data-analyst')
INSERT INTO public.course_projects(
course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,minimum_version,
advanced_version,functional_criteria,technical_criteria,rubric,reference_solution_md,is_published)
SELECT c.id,
'analyse-commerciale-postgresql',
'Analyse commerciale d’une base PostgreSQL',
'Concevoir, charger, interroger et exposer une base PostgreSQL pour produire des indicateurs fiables et une restitution Power BI.',
'# Brief

Vous êtes Data Analyst. Une entreprise souhaite centraliser ses données clients, produits, régions, ventes et objectifs dans PostgreSQL. Vous devez créer le schéma, charger les données, contrôler leur qualité, produire des requêtes analytiques, créer des vues pour Power BI et formuler des recommandations métier.

## Livrables
- script de création du schéma ;
- script de chargement ;
- dictionnaire de données ;
- requêtes d’analyse ;
- vues et vue matérialisée ;
- contrôles qualité ;
- rôle de lecture ;
- rapport Power BI ou dossier de restitution ;
- trois recommandations métier.',
'# Politique des données

Utiliser uniquement les fichiers pédagogiques fournis. Ne pas exposer de données personnelles inutiles. Les scripts doivent être rejouables et documentés.',
'[{"path":"/resources/sql-data-analyst/01_schema_postgresql.sql","purpose":"Schéma de départ"},{"path":"/resources/sql-data-analyst/02_chargement_donnees.sql","purpose":"Chargement des CSV"},{"path":"/resources/sql-data-analyst/03_requetes_depart.sql","purpose":"Requêtes de base"},{"path":"/resources/sql-data-analyst/clients.csv","purpose":"Clients"},{"path":"/resources/sql-data-analyst/produits.csv","purpose":"Produits"},{"path":"/resources/sql-data-analyst/regions.csv","purpose":"Régions"},{"path":"/resources/sql-data-analyst/ventes.csv","purpose":"Ventes"},{"path":"/resources/sql-data-analyst/objectifs.csv","purpose":"Objectifs"}]'::jsonb,
'["Créer les cinq tables avec clés et contraintes","Charger toutes les données","Créer la vue ventes_enrichies","Produire au moins dix requêtes analytiques","Créer une synthèse mensuelle","Créer un rôle lecture_reporting","Rédiger trois recommandations"]'::jsonb,
'["Ajouter une vue matérialisée indexée","Comparer plusieurs plans EXPLAIN ANALYZE","Créer des fonctions de fenêtre avancées","Automatiser des contrôles qualité","Connecter PostgreSQL à Power BI"]'::jsonb,
'["Les cinq tables sont chargées","Les 120 ventes sont conservées","Les KPI sont cohérents","Les analyses répondent aux questions métier","Les recommandations reposent sur les résultats"]'::jsonb,
'["Clés et contraintes correctes","Scripts rejouables","Jointures sans duplication","CTE et fenêtres lisibles","Vues documentées","Rôle de lecture limité","Performance contrôlée"]'::jsonb,
'[{"criterion":"Modélisation et intégrité","points":10},{"criterion":"Chargement et qualité des données","points":8},{"criterion":"Requêtes analytiques","points":12},{"criterion":"CTE, fenêtres et vues","points":10},{"criterion":"Performance et sécurité","points":10},{"criterion":"Restitution et recommandations","points":10}]'::jsonb,
'# Solution de référence

La solution attendue crée un schéma relationnel avec clés primaires et étrangères, charge les cinq CSV, construit une vue ventes_enrichies, produit des KPI mensuels et régionaux, utilise CTE et fonctions de fenêtre, prépare une vue matérialisée, crée un rôle de lecture et documente la connexion à Power BI.',
FALSE
FROM c
ON CONFLICT(course_id,slug) DO UPDATE SET
 title=EXCLUDED.title,summary=EXCLUDED.summary,brief_md=EXCLUDED.brief_md,
 corpus_policy_md=EXCLUDED.corpus_policy_md,starter_assets=EXCLUDED.starter_assets,
 minimum_version=EXCLUDED.minimum_version,advanced_version=EXCLUDED.advanced_version,
 functional_criteria=EXCLUDED.functional_criteria,technical_criteria=EXCLUDED.technical_criteria,
 rubric=EXCLUDED.rubric,reference_solution_md=EXCLUDED.reference_solution_md,is_published=FALSE;

WITH p AS (
    SELECT cp.id AS project_id,cp.course_id FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='sql-data-analyst' AND cp.slug='analyse-commerciale-postgresql'
), seed(module_order,slug,title,description,deliverables,acceptance,ord) AS (VALUES
(0,'concevoir-schema','Concevoir le schéma','Définir tables, clés, types et contraintes.','["Schéma SQL","Dictionnaire de données"]'::jsonb,'["5 tables","PK/FK correctes","Contraintes documentées"]'::jsonb,0),
(2,'charger-nettoyer','Charger et nettoyer','Importer les CSV et traiter les anomalies.','["Script de chargement","Rapport de qualité"]'::jsonb,'["Toutes les lignes chargées","Types contrôlés","Anomalies documentées"]'::jsonb,1),
(4,'construire-vue-detaillee','Construire la vue détaillée','Relier ventes, clients, produits et régions.','["Vue ventes_enrichies","Contrôles de cardinalité"]'::jsonb,'["120 ventes conservées","Aucune clé orpheline","Pas de duplication"]'::jsonb,2),
(6,'requeter-kpi','Produire les KPI','Créer les requêtes métier avec agrégations et CTE.','["10 requêtes analytiques","Commentaires SQL"]'::jsonb,'["CA, marge, volume et clients actifs","Grains documentés"]'::jsonb,3),
(7,'analyser-evolutions','Analyser les évolutions','Utiliser classement, cumul, LAG et comparaison aux objectifs.','["Classements","Cumul mensuel","Évolution et objectifs"]'::jsonb,'["Fenêtres correctes","Résultats vérifiés"]'::jsonb,4),
(10,'optimiser-securiser','Optimiser et sécuriser','Créer index utile et rôle de lecture.','["Plans EXPLAIN","Index","Rôle lecture_reporting"]'::jsonb,'["Comparatif avant/après","Droits minimaux"]'::jsonb,5),
(11,'restituer-power-bi','Restituer dans Power BI','Connecter la vue finale, contrôler les totaux et présenter les recommandations.','["Rapport ou dossier de restitution","Guide d’actualisation","3 recommandations"]'::jsonb,'["Totaux SQL et Power BI alignés","Documentation complète","Recommandations argumentées"]'::jsonb,6)
)
INSERT INTO public.course_project_milestones(
project_id,module_id,slug,title,description,deliverables,acceptance_criteria,order_index,is_published)
SELECT p.project_id,m.id,s.slug,s.title,s.description,s.deliverables,s.acceptance,s.ord,FALSE
FROM p JOIN public.modules m ON m.course_id=p.course_id
JOIN seed s ON s.module_order=m.order_index
ON CONFLICT(project_id,slug) DO UPDATE SET
 module_id=EXCLUDED.module_id,title=EXCLUDED.title,description=EXCLUDED.description,
 deliverables=EXCLUDED.deliverables,acceptance_criteria=EXCLUDED.acceptance_criteria,
 order_index=EXCLUDED.order_index,is_published=FALSE;

DO $$
DECLARE quiz_count INT; final_count INT; project_count INT; milestone_count INT; rubric_total INT;
BEGIN
 SELECT COUNT(*) INTO quiz_count FROM public.quiz_questions q
 JOIN public.modules m ON m.id=q.module_id JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='sql-data-analyst' AND q.is_final_test=FALSE;
 SELECT COUNT(*) INTO final_count FROM public.quiz_questions q
 JOIN public.modules m ON m.id=q.module_id JOIN public.courses c ON c.id=m.course_id
 WHERE c.slug='sql-data-analyst' AND q.is_final_test=TRUE;
 SELECT COUNT(*) INTO project_count FROM public.course_projects cp
 JOIN public.courses c ON c.id=cp.course_id WHERE c.slug='sql-data-analyst';
 SELECT COUNT(*) INTO milestone_count FROM public.course_project_milestones pm
 JOIN public.course_projects cp ON cp.id=pm.project_id JOIN public.courses c ON c.id=cp.course_id
 WHERE c.slug='sql-data-analyst';
 SELECT COALESCE(SUM((item->>'points')::INT),0) INTO rubric_total
 FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id,
 LATERAL jsonb_array_elements(cp.rubric) item WHERE c.slug='sql-data-analyst';
 IF quiz_count<>48 OR final_count<>12 OR project_count<>1 OR milestone_count<>7 OR rubric_total<>60 THEN
  RAISE EXCEPTION 'Chantier 4 SQL incomplet: quiz %, final %, projets %, jalons %, barème %',quiz_count,final_count,project_count,milestone_count,rubric_total;
 END IF;
END $$;
