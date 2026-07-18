from pathlib import Path

modules = [
    (0, "Fondamentaux", [
        ("qcm", "Quel mot-clé choisit les colonnes à retourner ?", ["SELECT", "FROM", "WHERE", "ORDER BY"], "A", "SELECT définit les colonnes du résultat."),
        ("true_false", "PostgreSQL est un système de gestion de base de données relationnelle.", ["Vrai", "Faux", "Seulement un langage", "Seulement un client SQL"], "A", "PostgreSQL est un SGBDR complet."),
        ("comprehension", "Quelle contrainte identifie de façon unique une ligne ?", ["PRIMARY KEY", "CHECK", "DEFAULT", "VIEW"], "A", "Une clé primaire identifie chaque ligne."),
        ("mini_challenge", "Quelle requête explore dix clients ?", ["SELECT * FROM clients LIMIT 10", "DELETE FROM clients", "DROP TABLE clients", "UPDATE clients"], "A", "LIMIT réduit le nombre de lignes affichées."),
    ]),
    (1, "Filtres et tris", [
        ("qcm", "Quel opérateur teste une liste de valeurs ?", ["IN", "LIKE", "BETWEEN", "IS NULL"], "A", "IN compare une valeur à une liste."),
        ("true_false", "DISTINCT peut masquer une mauvaise jointure et doit être utilisé avec prudence.", ["Vrai", "Faux", "Jamais", "Seulement avec COUNT"], "A", "DISTINCT ne corrige pas une cardinalité incorrecte."),
        ("comprehension", "Comment tester une valeur absente ?", ["IS NULL", "= NULL", "LIKE NULL", "IN NULL"], "A", "NULL se teste avec IS NULL."),
        ("mini_challenge", "Quel tri place le CA le plus élevé en premier ?", ["ORDER BY ca DESC", "ORDER BY ca ASC", "GROUP BY ca", "HAVING ca"], "A", "DESC trie du plus grand au plus petit."),
    ]),
    (2, "Expressions", [
        ("qcm", "Quelle expression gère une valeur de remplacement ?", ["COALESCE", "COUNT", "JOIN", "RANK"], "A", "COALESCE retourne la première valeur non nulle."),
        ("true_false", "CASE permet de traduire une règle métier en catégories.", ["Vrai", "Faux", "Seulement pour les dates", "Seulement dans UPDATE"], "A", "CASE crée des branches conditionnelles."),
        ("comprehension", "Quelle fonction tronque une date au mois ?", ["DATE_TRUNC", "TRIM", "ROUND", "CAST"], "A", "DATE_TRUNC permet de ramener une date à une granularité."),
        ("mini_challenge", "Quel calcul produit la marge unitaire ?", ["prix_unitaire - cout_unitaire", "prix_unitaire + cout_unitaire", "quantite / 0", "COUNT(*)"], "A", "La marge unitaire est le prix moins le coût."),
    ]),
    (3, "Agrégations", [
        ("qcm", "Quelle fonction compte les clients uniques ?", ["COUNT(DISTINCT code_client)", "SUM(code_client)", "AVG(code_client)", "MAX(code_client)"], "A", "COUNT DISTINCT compte les valeurs uniques."),
        ("true_false", "HAVING filtre les groupes après agrégation.", ["Vrai", "Faux", "Seulement avant GROUP BY", "Jamais"], "A", "HAVING agit après GROUP BY."),
        ("comprehension", "Quel élément définit le grain d’un résultat agrégé ?", ["GROUP BY", "ORDER BY", "LIMIT", "DISTINCT seulement"], "A", "GROUP BY fixe les dimensions du résultat."),
        ("mini_challenge", "Quelle fonction calcule le chiffre d’affaires total ?", ["SUM(chiffre_affaires)", "COUNT(chiffre_affaires)", "MIN(chiffre_affaires)", "LENGTH(chiffre_affaires)"], "A", "SUM additionne les montants."),
    ]),
    (4, "Jointures", [
        ("qcm", "Quelle jointure conserve toutes les lignes de gauche ?", ["LEFT JOIN", "INNER JOIN", "CROSS JOIN", "RIGHT JOIN"], "A", "LEFT JOIN conserve la table de gauche."),
        ("true_false", "Une clé non unique peut multiplier les lignes d’une jointure.", ["Vrai", "Faux", "Seulement avec NULL", "Seulement avec ORDER BY"], "A", "La cardinalité de la clé est déterminante."),
        ("comprehension", "Quel contrôle détecte une perte ou duplication ?", ["Comparer COUNT(*) avant et après", "Ajouter DISTINCT", "Masquer les lignes", "Changer le tri"], "A", "Comparer les volumes révèle les anomalies."),
        ("mini_challenge", "Comment trouver des produits orphelins ?", ["LEFT JOIN puis WHERE clé droite IS NULL", "INNER JOIN seulement", "ORDER BY produit", "SUM(prix)"], "A", "L’anti-jointure détecte les absences."),
    ]),
    (5, "Sous-requêtes", [
        ("qcm", "Quelle clause teste l’existence d’au moins une ligne ?", ["EXISTS", "BETWEEN", "ORDER BY", "CAST"], "A", "EXISTS renvoie vrai dès qu’une ligne correspond."),
        ("true_false", "Une sous-requête scalaire doit retourner une seule valeur.", ["Vrai", "Faux", "Toujours plusieurs lignes", "Seulement du texte"], "A", "Une expression scalaire attend une valeur."),
        ("comprehension", "Pourquoi NOT EXISTS est souvent préférable à NOT IN ?", ["Il gère mieux les NULL", "Il trie automatiquement", "Il crée un index", "Il agrège"], "A", "NOT IN peut être piégeux avec NULL."),
        ("mini_challenge", "Comment comparer le CA client à la moyenne ?", ["Sous-requête d’agrégation", "DELETE", "ALTER TABLE", "VACUUM"], "A", "Une sous-requête peut fournir la moyenne de référence."),
    ]),
    (6, "CTE", [
        ("qcm", "Quel mot-clé introduit une CTE ?", ["WITH", "WINDOW", "RETURNING", "GRANT"], "A", "WITH déclare une CTE."),
        ("true_false", "Les CTE peuvent dépendre de CTE précédentes.", ["Vrai", "Faux", "Seulement récursives", "Jamais"], "A", "Les CTE peuvent former un pipeline."),
        ("comprehension", "Pourquoi utiliser plusieurs CTE nommées ?", ["Décomposer une analyse complexe", "Masquer les erreurs", "Remplacer toutes les vues", "Éviter les jointures"], "A", "Elles améliorent lisibilité et testabilité."),
        ("mini_challenge", "Quel risque existe avec une CTE récursive ?", ["Absence de condition d’arrêt", "Trop de colonnes aliasées", "ORDER BY obligatoire", "Aucun"], "A", "Une récursion doit converger."),
    ]),
    (7, "Fenêtres", [
        ("qcm", "Quelle fonction retourne la valeur précédente ?", ["LAG", "LEAD", "RANK", "SUM"], "A", "LAG lit la ligne précédente dans la fenêtre."),
        ("true_false", "Une fonction de fenêtre conserve le détail des lignes.", ["Vrai", "Faux", "Seulement avec GROUP BY", "Jamais"], "A", "Elle n’effondre pas le grain comme GROUP BY."),
        ("comprehension", "Que fait PARTITION BY ?", ["Redémarre le calcul par groupe", "Supprime les doublons", "Crée une table", "Filtre les lignes"], "A", "PARTITION BY segmente la fenêtre."),
        ("mini_challenge", "Quelle expression calcule un cumul ?", ["SUM(ca) OVER (ORDER BY mois)", "SUM(ca) GROUP BY mois seulement", "COUNT(*) LIMIT 1", "MAX(ca) WHERE"], "A", "SUM OVER ordonné calcule un cumul."),
    ]),
    (8, "Vues", [
        ("qcm", "Quelle commande crée une vue ?", ["CREATE VIEW", "CREATE INDEX", "CREATE ROLE", "CREATE DATABASE"], "A", "CREATE VIEW encapsule une requête."),
        ("true_false", "Une vue matérialisée stocke son résultat.", ["Vrai", "Faux", "Seulement en mémoire", "Jamais"], "A", "Elle persiste le résultat jusqu’au rafraîchissement."),
        ("comprehension", "Quelle commande actualise une vue matérialisée ?", ["REFRESH MATERIALIZED VIEW", "ANALYZE VIEW", "UPDATE VIEW", "RESET VIEW"], "A", "REFRESH recalcule son contenu."),
        ("mini_challenge", "Pourquoi éviter SELECT * dans une vue durable ?", ["Le contrat de colonnes devient instable", "Cela empêche les filtres", "Cela supprime les index", "Cela interdit GROUP BY"], "A", "Une vue doit exposer explicitement ses colonnes."),
    ]),
    (9, "Transactions", [
        ("qcm", "Quelle commande annule une transaction non validée ?", ["ROLLBACK", "COMMIT", "GRANT", "EXPLAIN"], "A", "ROLLBACK annule les changements en attente."),
        ("true_false", "UPDATE et DELETE doivent être testés avec un SELECT équivalent.", ["Vrai", "Faux", "Seulement en production", "Jamais"], "A", "Cela vérifie le périmètre touché."),
        ("comprehension", "Que garantit l’atomicité ?", ["Tout ou rien", "Tri automatique", "Index automatique", "Aucune contrainte"], "A", "Une transaction atomique est indivisible."),
        ("mini_challenge", "Quelle clause montre les lignes modifiées ?", ["RETURNING", "HAVING", "WINDOW", "EXISTS"], "A", "RETURNING expose les lignes affectées."),
    ]),
    (10, "Performance et sécurité", [
        ("qcm", "Quelle commande montre le plan d’exécution ?", ["EXPLAIN", "VACUUM FULL", "GRANT", "COPY"], "A", "EXPLAIN décrit le plan choisi."),
        ("true_false", "Un index peut ralentir les écritures.", ["Vrai", "Faux", "Jamais", "Seulement sur les vues"], "A", "Chaque écriture doit maintenir les index."),
        ("comprehension", "Quel principe limite les droits au strict nécessaire ?", ["Moindre privilège", "Toutes permissions", "Compte partagé", "Accès public"], "A", "Le moindre privilège réduit le risque."),
        ("mini_challenge", "Quel droit suffit à un rôle de reporting sur une vue ?", ["SELECT", "DROP", "ALTER", "TRUNCATE"], "A", "Le reporting nécessite la lecture."),
    ]),
    (11, "PostgreSQL vers Power BI", [
        ("qcm", "Quel objet expose une couche stable à Power BI ?", ["Une vue analytique", "Une table temporaire locale", "Un commentaire", "Un rôle admin"], "A", "Une vue sert de contrat de données."),
        ("true_false", "Les totaux SQL et Power BI doivent être comparés avant remise.", ["Vrai", "Faux", "Seulement après publication", "Jamais"], "A", "La réconciliation valide la chaîne."),
        ("comprehension", "Quel mode charge les données dans le modèle Power BI ?", ["Import", "DirectQuery uniquement", "CSV virtuel", "RLS"], "A", "Import copie les données dans le modèle."),
        ("mini_challenge", "Que doit documenter la remise ?", ["Sources, vues, droits et actualisation", "Seulement les couleurs", "Seulement le logo", "Rien"], "A", "La documentation rend la solution maintenable."),
    ]),
]

final_questions = [
    ("Quelle clause filtre les lignes avant agrégation ?", ["WHERE", "HAVING", "ORDER BY", "LIMIT"]),
    ("Quelle clause filtre les groupes agrégés ?", ["HAVING", "WHERE", "FROM", "JOIN"]),
    ("Quelle jointure conserve toutes les lignes de gauche ?", ["LEFT JOIN", "INNER JOIN", "CROSS JOIN", "FULL JOIN uniquement"]),
    ("Quelle fonction compte les clients uniques ?", ["COUNT(DISTINCT code_client)", "SUM(code_client)", "AVG(code_client)", "MIN(code_client)"]),
    ("Quel mot-clé introduit une CTE ?", ["WITH", "OVER", "GRANT", "RETURNING"]),
    ("Quelle fonction récupère la valeur précédente ?", ["LAG", "RANK", "SUM", "CAST"]),
    ("Quelle commande crée une vue matérialisée ?", ["CREATE MATERIALIZED VIEW", "CREATE TEMP VIEW", "ALTER VIEW", "REFRESH VIEW"]),
    ("Quelle commande annule une transaction ?", ["ROLLBACK", "COMMIT", "ANALYZE", "VACUUM"]),
    ("Quel outil inspecte un plan d’exécution ?", ["EXPLAIN ANALYZE", "COUNT", "DISTINCT", "COALESCE"]),
    ("Quel droit minimal donne accès en lecture à une vue ?", ["SELECT", "DROP", "ALTER", "DELETE"]),
    ("Pourquoi préparer des vues pour Power BI ?", ["Stabiliser et sécuriser la couche de données", "Éviter les types", "Supprimer les clés", "Contourner les droits"]),
    ("Quel contrôle final est indispensable ?", ["Comparer les totaux SQL et Power BI", "Changer les couleurs", "Masquer les erreurs", "Supprimer les logs"]),
]

def esc(value: str) -> str:
    return value.replace("'", "''")

def options(values):
    labels = [f"{chr(65+i)}) {v}" for i, v in enumerate(values)]
    return "jsonb_build_array(" + ",".join(f"'{esc(v)}'" for v in labels) + ")"

parts = ["""-- KORYXA FORMATION — SQL DATA ANALYST AVEC POSTGRESQL — CHANTIER 4
-- Quiz, test final et projet final. Contenus non publiés.

ALTER TABLE public.quiz_questions
ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;
"""]

for module_order, skill, questions in modules:
    values = []
    for order_index, (qtype, question, answers, answer, explanation) in enumerate(questions, 1):
        difficulty = "avance" if qtype == "mini_challenge" else "intermediaire" if qtype == "comprehension" else "debutant"
        values.append(f"({order_index},'{qtype}','{esc(question)}',{options(answers)},'{answer}','{difficulty}','{esc(skill)}','{esc(explanation)}')")
    parts.append(f"""WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index={module_order}
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES {','.join(values)}
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,FALSE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=FALSE;
""")

final_values = []
for index, (question, answers) in enumerate(final_questions, 101):
    final_values.append(f"({index},'qcm','{esc(question)}',{options(answers)},'A','intermediaire','synthèse','La bonne réponse est {esc(answers[0])}.')")
parts.append(f"""WITH target_module AS (
    SELECT m.id FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='sql-data-analyst' AND m.order_index=11
), seed(order_index,question_type,question,options,answer,difficulty,skill,explanation) AS (
    VALUES {','.join(final_values)}
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT target_module.id,s.order_index,s.question_type,s.question,s.options,s.answer,s.difficulty,s.skill,s.explanation,FALSE,TRUE
FROM target_module CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
question_type=EXCLUDED.question_type,question=EXCLUDED.question,options=EXCLUDED.options,
answer=EXCLUDED.answer,difficulty=EXCLUDED.difficulty,skill=EXCLUDED.skill,
explanation=EXCLUDED.explanation,is_active=FALSE,is_final_test=TRUE;
""")

parts.append("""
WITH c AS (SELECT id FROM public.courses WHERE slug='sql-data-analyst')
INSERT INTO public.course_projects(
course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,minimum_version,
advanced_version,functional_criteria,technical_criteria,rubric,reference_solution_md,is_published)
SELECT c.id,
'analyse-commerciale-postgresql',
'Analyse commerciale d’une base PostgreSQL',
'Concevoir, charger, interroger et exposer une base PostgreSQL pour produire des indicateurs fiables et une restitution Power BI.',
'# Brief\n\nVous êtes Data Analyst. Une entreprise souhaite centraliser ses données clients, produits, régions, ventes et objectifs dans PostgreSQL. Vous devez créer le schéma, charger les données, contrôler leur qualité, produire des requêtes analytiques, créer des vues pour Power BI et formuler des recommandations métier.\n\n## Livrables\n- script de création du schéma ;\n- script de chargement ;\n- dictionnaire de données ;\n- requêtes d’analyse ;\n- vues et vue matérialisée ;\n- contrôles qualité ;\n- rôle de lecture ;\n- rapport Power BI ou dossier de restitution ;\n- trois recommandations métier.',
'# Politique des données\n\nUtiliser uniquement les fichiers pédagogiques fournis. Ne pas exposer de données personnelles inutiles. Les scripts doivent être rejouables et documentés.',
'[{"path":"/resources/sql-data-analyst/01_schema_postgresql.sql","purpose":"Schéma de départ"},{"path":"/resources/sql-data-analyst/02_chargement_donnees.sql","purpose":"Chargement des CSV"},{"path":"/resources/sql-data-analyst/03_requetes_depart.sql","purpose":"Requêtes de base"},{"path":"/resources/sql-data-analyst/clients.csv","purpose":"Clients"},{"path":"/resources/sql-data-analyst/produits.csv","purpose":"Produits"},{"path":"/resources/sql-data-analyst/regions.csv","purpose":"Régions"},{"path":"/resources/sql-data-analyst/ventes.csv","purpose":"Ventes"},{"path":"/resources/sql-data-analyst/objectifs.csv","purpose":"Objectifs"}]'::jsonb,
'["Créer les cinq tables avec clés et contraintes","Charger toutes les données","Créer la vue ventes_enrichies","Produire au moins dix requêtes analytiques","Créer une synthèse mensuelle","Créer un rôle lecture_reporting","Rédiger trois recommandations"]'::jsonb,
'["Ajouter une vue matérialisée indexée","Comparer plusieurs plans EXPLAIN ANALYZE","Créer des fonctions de fenêtre avancées","Automatiser des contrôles qualité","Connecter PostgreSQL à Power BI"]'::jsonb,
'["Les cinq tables sont chargées","Les 120 ventes sont conservées","Les KPI sont cohérents","Les analyses répondent aux questions métier","Les recommandations reposent sur les résultats"]'::jsonb,
'["Clés et contraintes correctes","Scripts rejouables","Jointures sans duplication","CTE et fenêtres lisibles","Vues documentées","Rôle de lecture limité","Performance contrôlée"]'::jsonb,
'[{"criterion":"Modélisation et intégrité","points":10},{"criterion":"Chargement et qualité des données","points":8},{"criterion":"Requêtes analytiques","points":12},{"criterion":"CTE, fenêtres et vues","points":10},{"criterion":"Performance et sécurité","points":10},{"criterion":"Restitution et recommandations","points":10}]'::jsonb,
'# Solution de référence\n\nLa solution attendue crée un schéma relationnel avec clés primaires et étrangères, charge les cinq CSV, construit une vue ventes_enrichies, produit des KPI mensuels et régionaux, utilise CTE et fonctions de fenêtre, prépare une vue matérialisée, crée un rôle de lecture et documente la connexion à Power BI.',
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
""")

output = Path('supabase/migrations/20260802_seed_sql_data_analyst_quizzes_project.sql')
output.write_text('\n'.join(parts), encoding='utf-8')
print(output)
