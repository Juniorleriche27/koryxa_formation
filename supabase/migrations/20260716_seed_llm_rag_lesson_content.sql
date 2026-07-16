-- ============================================================
-- KORYXA FORMATION — CHANTIER 3 — CONTENUS LLM RAG
-- Contenus harmonisés issus du dépôt compagnon formation-llm-rag-vscode.
-- Les leçons restent non publiées. Seed idempotent.
-- ============================================================

ALTER TABLE public.lessons
    ADD COLUMN IF NOT EXISTS source_refs JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS validation_prompt TEXT;

UPDATE public.lessons l
SET content_md = $lesson$# Comprendre ce que produit réellement un LLM

## Objectif

Comprendre ce que produit réellement un LLM.

## Concepts essentiels

- Un LLM prédit des suites de tokens à partir d'un contexte.
- Il peut produire une réponse fluide mais fausse : c'est une hallucination.
- La fenêtre de contexte limite la quantité d'information directement fournie.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Comparez une réponse libre du modèle avec une réponse fondée sur un document court.

## Résumé

Un LLM ne consulte pas automatiquement vos documents.

## Validation

Expliquez en trois phrases pourquoi une réponse plausible n'est pas forcément fiable.
$lesson$,
    objectives = jsonb_build_array($lesson$Comprendre ce que produit réellement un LLM$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Expliquez en trois phrases pourquoi une réponse plausible n'est pas forcément fiable.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'notions-essentielles';

UPDATE public.lessons l
SET content_md = $lesson$# Relier les composants d'un pipeline RAG

## Objectif

Relier les composants d'un pipeline RAG.

## Concepts essentiels

- Le pipeline suit : documents → chunks → embeddings → base vectorielle → retrieval → prompt → réponse.
- La recherche et la génération sont deux responsabilités différentes.
- Les métadonnées assurent la traçabilité des sources.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Dessinez le flux complet et associez chaque étape au fichier du projet compagnon.

## Résumé

Le RAG enrichit le contexte du modèle avant la génération.

## Validation

Identifiez les sept étapes du pipeline dans le bon ordre.
$lesson$,
    objectives = jsonb_build_array($lesson$Relier les composants d'un pipeline RAG$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Identifiez les sept étapes du pipeline dans le bon ordre.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'architecture-rag';

UPDATE public.lessons l
SET content_md = $lesson$# Décider si un cas d'usage nécessite du RAG

## Objectif

Décider si un cas d'usage nécessite du RAG.

## Concepts essentiels

- Le RAG est pertinent pour un corpus privé, changeant ou devant être cité.
- Il n'est pas nécessaire pour une tâche purement créative ou une connaissance générale stable.
- La qualité du corpus conditionne la qualité finale.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Classez trois projets : assistant RH documentaire, générateur de slogans, FAQ réglementaire.

## Résumé

On choisit le RAG à partir du besoin de contexte, pas par effet de mode.

## Validation

Justifiez le choix du RAG pour un cas et son rejet pour un autre.
$lesson$,
    objectives = jsonb_build_array($lesson$Décider si un cas d'usage nécessite du RAG$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Justifiez le choix du RAG pour un cas et son rejet pour un autre.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'checkpoint-cas-usage';

UPDATE public.lessons l
SET content_md = $lesson$# Créer un environnement Python reproductible

## Objectif

Créer un environnement Python reproductible.

## Concepts essentiels

- Un environnement virtuel isole les dépendances.
- requirements.txt fixe les bibliothèques nécessaires.
- Les commandes de diagnostic doivent fonctionner avant le développement.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Créez l'environnement, installez les dépendances et lancez python main.py.

## Résumé

Un projet reproductible démarre avec un environnement propre.

## Validation

Montrez la commande qui active l'environnement et celle qui vérifie le projet.
$lesson$,
    objectives = jsonb_build_array($lesson$Créer un environnement Python reproductible$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Montrez la commande qui active l'environnement et celle qui vérifie le projet.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'setup-python';

UPDATE public.lessons l
SET content_md = $lesson$# Organiser un projet RAG maintenable

## Objectif

Organiser un projet RAG maintenable.

## Concepts essentiels

- src contient la logique métier ; scripts contient les commandes d'exécution.
- data sépare sources, fichiers transformés et sorties.
- La configuration est centralisée et les secrets restent dans un fichier local ignoré par Git.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Associez chaque fichier existant à ingestion, embeddings, stockage, recherche ou prompt.

## Résumé

Une structure claire facilite le débogage et l'apprentissage.

## Validation

Expliquez pourquoi app.py ne doit pas contenir toute la logique RAG.
$lesson$,
    objectives = jsonb_build_array($lesson$Organiser un projet RAG maintenable$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Expliquez pourquoi app.py ne doit pas contenir toute la logique RAG.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'structure-projet';

UPDATE public.lessons l
SET content_md = $lesson$# Importer des documents de manière contrôlée

## Objectif

Importer des documents de manière contrôlée.

## Concepts essentiels

- Le chargeur vérifie le type, l'existence et la lisibilité du fichier.
- Le texte extrait doit conserver l'origine du document.
- Une erreur de lecture doit être explicite et ne pas interrompre silencieusement tout le lot.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Ajoutez un second fichier texte puis vérifiez que sa source apparaît dans la sortie.

## Résumé

L'ingestion commence par des entrées fiables et traçables.

## Validation

Décrivez les contrôles minimaux avant d'accepter un fichier.
$lesson$,
    objectives = jsonb_build_array($lesson$Importer des documents de manière contrôlée$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Décrivez les contrôles minimaux avant d'accepter un fichier.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'chargement-documents';

UPDATE public.lessons l
SET content_md = $lesson$# Préparer un corpus propre et traçable

## Objectif

Préparer un corpus propre et traçable.

## Concepts essentiels

- Le nettoyage retire le bruit sans détruire la structure utile.
- Les métadonnées peuvent contenir source, page, catégorie et date.
- Chaque chunk doit pouvoir être relié au document d'origine.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Ajoutez une catégorie et un identifiant documentaire aux métadonnées.

## Résumé

Une réponse sourcée dépend de métadonnées conservées dès l'ingestion.

## Validation

Citez quatre métadonnées utiles pour afficher une source.
$lesson$,
    objectives = jsonb_build_array($lesson$Préparer un corpus propre et traçable$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Citez quatre métadonnées utiles pour afficher une source.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'nettoyage-metadonnees';

UPDATE public.lessons l
SET content_md = $lesson$# Choisir une stratégie de découpage

## Objectif

Choisir une stratégie de découpage.

## Concepts essentiels

- Des chunks trop petits perdent le contexte ; trop grands diluent la pertinence.
- Le chevauchement limite les ruptures entre segments.
- La structure sémantique est préférable quand les titres et paragraphes sont disponibles.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Préparez deux configurations : 500/50 et 1000/150 caractères.

## Résumé

Le chunking est un compromis entre contexte, précision et coût.

## Validation

Expliquez l'effet d'un chunk deux fois plus grand sur le retrieval.
$lesson$,
    objectives = jsonb_build_array($lesson$Choisir une stratégie de découpage$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Expliquez l'effet d'un chunk deux fois plus grand sur le retrieval.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'strategies-chunking';

UPDATE public.lessons l
SET content_md = $lesson$# Mesurer l'effet des paramètres de chunking

## Objectif

Mesurer l'effet des paramètres de chunking.

## Concepts essentiels

- Le nombre de chunks dépend du corpus et des paramètres.
- La documentation ne doit jamais figer un nombre devenu faux.
- On vérifie taille, chevauchement, source et lisibilité de chaque chunk.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Exécutez l'ingestion locale et comparez le nombre réel de chunks pour deux réglages.

## Résumé

Le résultat attendu est une propriété vérifiée, pas un nombre historique comme 2 chunks.

## Validation

Présentez la configuration retenue et une justification mesurable.
$lesson$,
    objectives = jsonb_build_array($lesson$Mesurer l'effet des paramètres de chunking$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Présentez la configuration retenue et une justification mesurable.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'lab-chunking';

UPDATE public.lessons l
SET content_md = $lesson$# Comprendre la représentation vectorielle

## Objectif

Comprendre la représentation vectorielle.

## Concepts essentiels

- Un embedding transforme un texte en vecteur numérique.
- Des textes proches sémantiquement ont des vecteurs proches selon une métrique.
- Le même modèle doit être utilisé pour les documents et les questions.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Expliquez pourquoi rechercher les mots exacts ne suffit pas toujours.

## Résumé

Les embeddings servent à comparer le sens, pas à générer la réponse.

## Validation

Distinguez embedding, base vectorielle et LLM.
$lesson$,
    objectives = jsonb_build_array($lesson$Comprendre la représentation vectorielle$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Distinguez embedding, base vectorielle et LLM.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'comprendre-embeddings';

UPDATE public.lessons l
SET content_md = $lesson$# Vectoriser le corpus de façon robuste

## Objectif

Vectoriser le corpus de façon robuste.

## Concepts essentiels

- Le traitement par lots limite les appels et facilite la reprise.
- Chaque vecteur reste lié au texte et aux métadonnées.
- Les erreurs API doivent être journalisées sans afficher de clé.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Ajoutez une validation qui refuse un lot vide et signale le chunk concerné en cas d'erreur.

## Résumé

Un pipeline d'embeddings fiable est idempotent et observable.

## Validation

Listez les informations utiles dans un log sans exposer de secret.
$lesson$,
    objectives = jsonb_build_array($lesson$Vectoriser le corpus de façon robuste$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Listez les informations utiles dans un log sans exposer de secret.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'pipeline-embeddings';

UPDATE public.lessons l
SET content_md = $lesson$# Concevoir une collection Qdrant

## Objectif

Concevoir une collection Qdrant.

## Concepts essentiels

- La dimension du vecteur doit correspondre au modèle d'embedding.
- La métrique de distance doit être choisie explicitement.
- Les payloads stockent le texte, la source et les filtres métier.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Définissez le schéma de payload de la collection formation_llm_rag.

## Résumé

Qdrant stocke et retrouve les vecteurs ; il ne rédige aucune réponse.

## Validation

Expliquez le rôle d'une collection, d'un point et d'un payload.
$lesson$,
    objectives = jsonb_build_array($lesson$Concevoir une collection Qdrant$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Expliquez le rôle d'une collection, d'un point et d'un payload.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'qdrant-collections';

UPDATE public.lessons l
SET content_md = $lesson$# Indexer et maintenir les points

## Objectif

Indexer et maintenir les points.

## Concepts essentiels

- Un identifiant stable permet de réindexer sans dupliquer.
- L'upsert remplace ou crée un point.
- Les filtres de métadonnées limitent la recherche à un sous-corpus.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Indexez le corpus puis filtrez les résultats sur une catégorie.

## Résumé

Une indexation propre peut être rejouée sans multiplier les doublons.

## Validation

Montrez comment vérifier le nombre réel de points stockés.
$lesson$,
    objectives = jsonb_build_array($lesson$Indexer et maintenir les points$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Montrez comment vérifier le nombre réel de points stockés.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'indexation-qdrant';

UPDATE public.lessons l
SET content_md = $lesson$# Construire une recherche pertinente

## Objectif

Construire une recherche pertinente.

## Concepts essentiels

- La question est vectorisée avec le même modèle que le corpus.
- top-k fixe le nombre maximal de passages retournés.
- Un seuil faible peut ramener du bruit ; un seuil trop élevé peut supprimer une réponse utile.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Posez la même question avec top-k 1, 3 et 5 et consignez les différences.

## Résumé

Le retrieval sélectionne le contexte ; il ne produit pas la réponse finale.

## Validation

Expliquez l'effet de top-k sur précision, contexte et coût.
$lesson$,
    objectives = jsonb_build_array($lesson$Construire une recherche pertinente$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Expliquez l'effet de top-k sur précision, contexte et coût.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'recherche-vectorielle';

UPDATE public.lessons l
SET content_md = $lesson$# Évaluer les passages retrouvés

## Objectif

Évaluer les passages retrouvés.

## Concepts essentiels

- Un jeu de questions connues permet une évaluation reproductible.
- On mesure si le bon passage apparaît dans les premiers résultats.
- Les échecs peuvent venir du corpus, du chunking, des embeddings ou des paramètres.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Créez cinq questions avec leur source attendue et notez le rang obtenu.

## Résumé

On améliore le RAG en diagnostiquant d'abord la recherche.

## Validation

Pour un échec, identifiez la couche responsable et proposez un réglage.
$lesson$,
    objectives = jsonb_build_array($lesson$Évaluer les passages retrouvés$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Pour un échec, identifiez la couche responsable et proposez un réglage.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'evaluation-retrieval';

UPDATE public.lessons l
SET content_md = $lesson$# Construire un prompt fondé sur les sources

## Objectif

Construire un prompt fondé sur les sources.

## Concepts essentiels

- Le prompt sépare clairement instructions, contexte et question.
- Il impose de répondre uniquement avec le contexte fourni.
- Chaque passage inclut une référence exploitable dans la réponse.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Adaptez le prompt du projet pour produire une section Sources.

## Résumé

Le prompt réduit l'hallucination mais ne corrige pas un mauvais retrieval.

## Validation

Écrivez les trois règles essentielles du prompt RAG.
$lesson$,
    objectives = jsonb_build_array($lesson$Construire un prompt fondé sur les sources$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Écrivez les trois règles essentielles du prompt RAG.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'prompt-contextuel';

UPDATE public.lessons l
SET content_md = $lesson$# Gérer le hors contexte et les injections

## Objectif

Gérer le hors contexte et les injections.

## Concepts essentiels

- Un document peut contenir des instructions malveillantes.
- Le contenu récupéré doit être traité comme une source, pas comme une instruction système.
- Quand le contexte ne suffit pas, l'assistant doit le dire clairement.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Ajoutez une consigne qui ignore les instructions contenues dans les documents.

## Résumé

Le modèle obéit à la politique de l'application, pas aux ordres du corpus.

## Validation

Donnez un exemple de refus correct pour une question non couverte.
$lesson$,
    objectives = jsonb_build_array($lesson$Gérer le hors contexte et les injections$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Donnez un exemple de refus correct pour une question non couverte.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'securite-prompt';

UPDATE public.lessons l
SET content_md = $lesson$# Relier retrieval et génération

## Objectif

Relier retrieval et génération.

## Concepts essentiels

- Qdrant fournit les passages ; Cohere ou un autre LLM rédige la réponse.
- La température basse favorise la stabilité sur une tâche factuelle.
- La réponse doit transporter les références issues du retrieval.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Exécutez une question de bout en bout et vérifiez chaque source affichée.

## Résumé

La génération finale doit rester fidèle au contexte retrouvé.

## Validation

Distinguez les paramètres qui influencent retrieval et génération.
$lesson$,
    objectives = jsonb_build_array($lesson$Relier retrieval et génération$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Distinguez les paramètres qui influencent retrieval et génération.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'generation-reponse';

UPDATE public.lessons l
SET content_md = $lesson$# Mesurer la qualité globale du RAG

## Objectif

Mesurer la qualité globale du RAG.

## Concepts essentiels

- La pertinence vérifie que la réponse traite la question.
- La fidélité vérifie que les affirmations sont appuyées par le contexte.
- Latence et coût font partie de la qualité produit.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Créez dix questions : répondues, ambiguës et hors corpus, puis notez les résultats.

## Résumé

Un RAG fiable est évalué avec un jeu de tests, pas seulement une démonstration réussie.

## Validation

Définissez un seuil de réussite pour fidélité et citations.
$lesson$,
    objectives = jsonb_build_array($lesson$Mesurer la qualité globale du RAG$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Définissez un seuil de réussite pour fidélité et citations.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'evaluation-rag';

UPDATE public.lessons l
SET content_md = $lesson$# Créer une interface utilisable

## Objectif

Créer une interface utilisable.

## Concepts essentiels

- L'interface sépare saisie, réponse, sources et réglages.
- Un historique aide l'utilisateur sans être réinjecté sans contrôle.
- Les états de chargement évitent les actions répétées.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Lancez python -m streamlit run app.py et testez trois questions.

## Résumé

Streamlit transforme le pipeline en produit démontrable.

## Validation

Listez les éléments nécessaires à une interface de chat claire.
$lesson$,
    objectives = jsonb_build_array($lesson$Créer une interface utilisable$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Listez les éléments nécessaires à une interface de chat claire.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'interface-streamlit';

UPDATE public.lessons l
SET content_md = $lesson$# Afficher la provenance et gérer les erreurs

## Objectif

Afficher la provenance et gérer les erreurs.

## Concepts essentiels

- Les sources doivent être lisibles et reliées aux passages.
- Une erreur Qdrant, Cohere ou fichier doit être distinguée.
- Le message utilisateur reste simple tandis que le log conserve le diagnostic technique.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Simulez une configuration manquante et vérifiez le message affiché.

## Résumé

Une bonne UX explique l'échec sans exposer les détails sensibles.

## Validation

Rédigez un message utilisateur et un log technique pour une clé absente.
$lesson$,
    objectives = jsonb_build_array($lesson$Afficher la provenance et gérer les erreurs$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Rédigez un message utilisateur et un log technique pour une clé absente.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'sources-erreurs';

UPDATE public.lessons l
SET content_md = $lesson$# Valider les composants critiques

## Objectif

Valider les composants critiques.

## Concepts essentiels

- Les tests unitaires couvrent nettoyage, chunking et prompt.
- Les tests d'intégration couvrent ingestion et recherche.
- Le fichier .env est ignoré et aucune clé n'apparaît dans les sorties.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Ajoutez au moins un test du chunking et un test de prompt hors contexte.

## Résumé

La sécurité commence par des secrets absents du code et des erreurs contrôlées.

## Validation

Citez les tests pouvant fonctionner sans service cloud.
$lesson$,
    objectives = jsonb_build_array($lesson$Valider les composants critiques$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Citez les tests pouvant fonctionner sans service cloud.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'tests-securite';

UPDATE public.lessons l
SET content_md = $lesson$# Préparer une mise en ligne reproductible

## Objectif

Préparer une mise en ligne reproductible.

## Concepts essentiels

- La configuration distingue local, test et production.
- Les dépendances et commandes de démarrage sont documentées.
- Une recette vérifie ingestion, recherche, génération, sources et erreurs.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Complétez une checklist avant déploiement sans effectuer le déploiement.

## Résumé

On ne déploie qu'après une recette de bout en bout.

## Validation

Énumérez les cinq contrôles bloquants avant mise en ligne.
$lesson$,
    objectives = jsonb_build_array($lesson$Préparer une mise en ligne reproductible$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Énumérez les cinq contrôles bloquants avant mise en ligne.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'checklist-deploiement';

UPDATE public.lessons l
SET content_md = $lesson$# Comprendre les livrables du projet final

## Objectif

Comprendre les livrables du projet final.

## Concepts essentiels

- Le projet doit utiliser un corpus réel et autorisé.
- Il doit montrer les sources, gérer le hors contexte et être documenté.
- L'évaluation porte sur fonctionnement, qualité, sécurité et présentation.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Choisissez le domaine, le corpus et dix questions de recette.

## Résumé

Le projet final démontre une compétence complète, pas un simple notebook.

## Validation

Présentez votre sujet, vos utilisateurs et la valeur attendue.
$lesson$,
    objectives = jsonb_build_array($lesson$Comprendre les livrables du projet final$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Présentez votre sujet, vos utilisateurs et la valeur attendue.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'brief-projet-final';

UPDATE public.lessons l
SET content_md = $lesson$# Assembler et recetter l'application complète

## Objectif

Assembler et recetter l'application complète.

## Concepts essentiels

- L'application relie ingestion, indexation, retrieval, génération et interface.
- Chaque étape possède un diagnostic vérifiable.
- La recette comprend questions normales, ambiguës et hors corpus.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Construisez le projet puis exécutez la grille de dix questions.

## Résumé

Une application terminée fonctionne de bout en bout et explique ses limites.

## Validation

Fournissez les résultats de recette et les anomalies restantes.
$lesson$,
    objectives = jsonb_build_array($lesson$Assembler et recetter l'application complète$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Fournissez les résultats de recette et les anomalies restantes.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'construction-projet';

UPDATE public.lessons l
SET content_md = $lesson$# Présenter les choix et les résultats

## Objectif

Présenter les choix et les résultats.

## Concepts essentiels

- La démonstration suit problème, architecture, résultat et limites.
- Les métriques rendent la qualité observable.
- La rétrospective distingue améliorations prioritaires et options futures.

## Démonstration guidée

Utilisez le dépôt compagnon `formation-llm-rag-vscode`. Repérez le fichier lié à cette étape, exécutez d'abord le mode local lorsque celui-ci existe, puis observez les entrées, sorties et métadonnées produites. Ne copiez jamais une clé API dans le code ou dans une capture d'écran.

## Exercice

Préparez une démonstration de cinq minutes et une page de synthèse.

## Résumé

Savoir expliquer le système fait partie de la compétence professionnelle.

## Validation

Présentez une limite réelle et le prochain changement qui la réduirait.
$lesson$,
    objectives = jsonb_build_array($lesson$Présenter les choix et les résultats$lesson$),
    source_refs = '["formation-llm-rag-vscode/cours", "formation-llm-rag-vscode/docs", "formation-llm-rag-vscode/src"]'::jsonb,
    validation_prompt = $lesson$Présentez une limite réelle et le prochain changement qui la réduirait.$lesson$,
    is_published = FALSE
FROM public.modules m
JOIN public.courses c ON c.id = m.course_id
WHERE l.module_id = m.id
  AND c.slug = 'llm-rag'
  AND l.slug = 'presentation-projet';

DO $$
DECLARE
    v_expected INT := 26;
    v_filled INT;
BEGIN
    SELECT COUNT(*) INTO v_filled
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag'
      AND COALESCE(length(l.content_md), 0) > 200
      AND l.is_published = FALSE;

    IF v_filled <> v_expected THEN
        RAISE EXCEPTION 'Chantier 3 incomplet : % leçons remplies sur % attendues', v_filled, v_expected;
    END IF;
END $$;
