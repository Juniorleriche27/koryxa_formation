-- ============================================================
-- KORYXA FORMATION — CHANTIER 6 — QUIZ ET VALIDATIONS LLM RAG
-- Additif, idempotent, non publié, sans modification des quiz Python.
-- ============================================================

ALTER TABLE public.quiz_questions
    ADD COLUMN IF NOT EXISTS question_type TEXT NOT NULL DEFAULT 'qcm'
        CHECK (question_type IN ('qcm','true_false','comprehension','mini_challenge')),
    ADD COLUMN IF NOT EXISTS is_final_test BOOLEAN NOT NULL DEFAULT FALSE;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 0
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel enchaînement décrit correctement un pipeline RAG ?',jsonb_build_array('A) Question → LLM → document', 'B) Documents → chunks → embeddings → recherche → prompt → réponse', 'C) Qdrant → Streamlit → CSV', 'D) Prompt → indexation → document'),'B','architecture RAG','Le RAG prépare d’abord un corpus indexé, retrouve les passages pertinents, puis enrichit le prompt avant génération.'),
(2,'true_false','Un LLM consulte automatiquement les documents privés de l’entreprise.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement avec Streamlit', 'D) Seulement avec Python'),'B','limites LLM','Un LLM ne consulte pas spontanément un corpus privé ; il faut lui fournir un contexte ou utiliser un pipeline RAG.'),
(3,'comprehension','Quel signal justifie le mieux l’usage du RAG ?',jsonb_build_array('A) Le besoin de réponses créatives', 'B) Le besoin de réponses fondées sur un corpus privé et citées', 'C) Le besoin de changer la couleur de l’interface', 'D) Le besoin de réduire le nombre de fichiers'),'B','cas usage','Le RAG est surtout utile quand les réponses doivent s’appuyer sur des sources externes, privées ou évolutives.'),
(4,'mini_challenge','Une FAQ réglementaire change chaque mois. Quelle architecture choisir ?',jsonb_build_array('A) LLM seul sans contexte', 'B) RAG sur les textes réglementaires versionnés', 'C) Générateur aléatoire', 'D) Fichier statique sans recherche'),'B','décision architecture','Un corpus réglementaire évolutif et devant être cité correspond précisément à un cas RAG.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 1
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Pourquoi utiliser un environnement virtuel ?',jsonb_build_array('A) Pour accélérer Internet', 'B) Pour isoler les dépendances du projet', 'C) Pour stocker les documents', 'D) Pour remplacer Git'),'B','environnement','L’environnement virtuel empêche les conflits entre dépendances de plusieurs projets.'),
(2,'true_false','Une vraie clé API peut être placée dans .env.example.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement en test', 'D) Seulement sur GitHub privé'),'B','secrets','Le fichier .env.example décrit les variables attendues mais ne contient aucune valeur secrète.'),
(3,'comprehension','Où placer la logique d’embeddings ?',jsonb_build_array('A) Dans un service dédié sous src', 'B) Uniquement dans app.py', 'C) Dans README.md', 'D) Dans le fichier .env'),'A','architecture projet','La logique métier doit être isolée dans des modules testables et réutilisables.'),
(4,'mini_challenge','Le projet démarre sur un poste mais pas sur un autre. Première vérification ?',jsonb_build_array('A) La couleur du terminal', 'B) Les dépendances et la configuration reproductible', 'C) Le nombre de documents', 'D) Le nom du navigateur'),'B','reproductibilité','Une installation reproductible dépend d’un environnement, de versions et d’une configuration documentés.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 2
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quelle métadonnée est indispensable pour citer une réponse ?',jsonb_build_array('A) La couleur du document', 'B) La source du document', 'C) Le nom du développeur', 'D) Le nombre de dépendances'),'B','métadonnées','La source permet de relier un passage à son document d’origine.'),
(2,'true_false','Le nettoyage peut supprimer toute structure du document sans conséquence.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement en PDF', 'D) Seulement avec Qdrant'),'B','nettoyage','Supprimer titres, pages ou séparations utiles peut détériorer le chunking et les citations.'),
(3,'comprehension','Que doit faire un chargeur face à un fichier illisible ?',jsonb_build_array('A) L’ignorer silencieusement', 'B) Produire une erreur explicite et poursuivre selon la stratégie prévue', 'C) Inventer son contenu', 'D) Supprimer le corpus'),'B','gestion erreurs','Une ingestion fiable rend les erreurs visibles et traçables.'),
(4,'mini_challenge','Deux documents portent le même nom. Comment les distinguer ?',jsonb_build_array('A) Utiliser seulement le nom', 'B) Ajouter un identifiant stable et des métadonnées', 'C) Fusionner les textes', 'D) Supprimer l’un des deux'),'B','traçabilité','Un identifiant stable évite les collisions et conserve la provenance.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 3
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel risque présente un chunk trop petit ?',jsonb_build_array('A) Perte du contexte utile', 'B) Trop de contexte', 'C) Plus de métadonnées', 'D) Meilleure traçabilité automatique'),'A','chunking','Un chunk trop petit peut couper une idée et rendre le passage incomplet.'),
(2,'true_false','Le nombre de chunks doit toujours être exactement 9.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement avec Cohere', 'D) Seulement avec Qdrant Cloud'),'B','mesure','Le nombre dépend du corpus, de la taille, de l’overlap et de la stratégie.'),
(3,'comprehension','À quoi sert l’overlap ?',jsonb_build_array('A) À dupliquer tout le corpus', 'B) À limiter la perte d’information aux frontières', 'C) À réduire la dimension des embeddings', 'D) À remplacer les métadonnées'),'B','overlap','Le chevauchement conserve une partie du contexte entre deux segments voisins.'),
(4,'mini_challenge','Les réponses manquent souvent la phrase précédente. Quel réglage tester ?',jsonb_build_array('A) Réduire l’overlap à zéro', 'B) Augmenter modérément l’overlap', 'C) Supprimer les titres', 'D) Désactiver les embeddings'),'B','diagnostic chunking','Le problème de frontière peut être réduit avec un chevauchement contrôlé.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 4
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Que produit un modèle d’embedding ?',jsonb_build_array('A) Une réponse finale', 'B) Un vecteur numérique', 'C) Un fichier PDF', 'D) Une table SQL'),'B','embeddings','L’embedding représente le sens du texte sous forme de nombres.'),
(2,'true_false','On peut utiliser des modèles d’embedding différents pour les documents et les questions sans précaution.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Toujours avec Qdrant', 'D) Toujours avec Streamlit'),'B','cohérence modèle','Documents et questions doivent être projetés dans le même espace vectoriel.'),
(3,'comprehension','Pourquoi traiter les embeddings par lots ?',jsonb_build_array('A) Pour masquer les erreurs', 'B) Pour optimiser les appels et faciliter la reprise', 'C) Pour supprimer les métadonnées', 'D) Pour éviter Qdrant'),'B','batching','Les lots réduisent le nombre d’appels tout en permettant une gestion contrôlée.'),
(4,'mini_challenge','Un lot échoue au milieu du corpus. Que faut-il conserver ?',jsonb_build_array('A) Seulement le message utilisateur', 'B) Les identifiants des chunks réussis et en erreur', 'C) La clé API dans les logs', 'D) Aucun état'),'B','reprise erreur','Des identifiants stables permettent de reprendre sans retraiter ou dupliquer tout le corpus.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 5
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel élément Qdrant contient texte et métadonnées ?',jsonb_build_array('A) Le payload', 'B) La distance', 'C) Le port', 'D) Le token'),'A','Qdrant','Le payload accompagne le vecteur avec les informations métier et la source.'),
(2,'true_false','Un upsert avec identifiant stable peut éviter les doublons lors d’une réindexation.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement en local', 'D) Seulement avec CSV'),'A','idempotence','Un identifiant déterministe permet de remplacer le même point plutôt que d’en créer un nouveau.'),
(3,'comprehension','Pourquoi la dimension de collection doit-elle correspondre au modèle ?',jsonb_build_array('A) Pour que les vecteurs soient compatibles', 'B) Pour afficher Streamlit', 'C) Pour limiter les documents texte', 'D) Pour générer une réponse'),'A','dimension vecteur','Qdrant doit recevoir des vecteurs de la dimension déclarée par la collection.'),
(4,'mini_challenge','Vous devez rechercher uniquement les documents RH. Que faire ?',jsonb_build_array('A) Changer le LLM', 'B) Ajouter un filtre sur la métadonnée catégorie', 'C) Supprimer les autres documents', 'D) Réduire top-k à zéro'),'B','filtres','Les filtres de payload limitent le retrieval au sous-corpus souhaité.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 6
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Que contrôle top-k ?',jsonb_build_array('A) Le nombre maximal de passages retournés', 'B) La température du LLM', 'C) La taille du fichier .env', 'D) Le nombre de pages Streamlit'),'A','retrieval','top-k fixe combien de candidats sont transmis après recherche.'),
(2,'true_false','Un seuil trop élevé peut supprimer un passage pourtant utile.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement avec PDF', 'D) Seulement avec un LLM local'),'A','seuil','Un seuil strict augmente la précision mais peut réduire le rappel.'),
(3,'comprehension','Quel test isole le mieux la qualité du retrieval ?',jsonb_build_array('A) Évaluer les passages retrouvés avant d’appeler le LLM', 'B) Changer la couleur de l’interface', 'C) Mesurer uniquement le temps de génération', 'D) Lire seulement la réponse finale'),'A','évaluation retrieval','Il faut vérifier la recherche séparément pour identifier la couche responsable.'),
(4,'mini_challenge','Le bon passage apparaît en rang 5 mais top-k vaut 3. Action logique ?',jsonb_build_array('A) Supprimer le corpus', 'B) Étudier top-k et améliorer le ranking', 'C) Augmenter la température', 'D) Désactiver les sources'),'B','diagnostic retrieval','Le réglage top-k et le ranking expliquent que le passage utile ne soit pas transmis.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 7
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Comment le prompt doit-il traiter le contexte récupéré ?',jsonb_build_array('A) Comme des instructions prioritaires', 'B) Comme des données à utiliser selon le prompt système', 'C) Comme une clé API', 'D) Comme du code toujours exécutable'),'B','prompt sécurité','Le corpus est une source d’information, jamais une autorité supérieure au système.'),
(2,'true_false','Le prompt doit imposer un refus si le contexte ne permet pas de répondre.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement en production', 'D) Seulement pour les PDF'),'A','refus hors contexte','Le refus évite d’inventer une réponse quand les sources sont insuffisantes.'),
(3,'comprehension','Pourquoi délimiter clairement contexte et question ?',jsonb_build_array('A) Pour réduire les ambiguïtés et injections', 'B) Pour augmenter la dimension vectorielle', 'C) Pour créer une collection', 'D) Pour installer Streamlit'),'A','structure prompt','Des sections explicites renforcent le contrôle et la lisibilité du prompt.'),
(4,'mini_challenge','Un document contient “ignore les règles”. Que doit faire l’assistant ?',jsonb_build_array('A) Obéir au document', 'B) Ignorer cette instruction et traiter le texte comme une source', 'C) Révéler la configuration', 'D) Arrêter Qdrant'),'B','prompt injection','Les instructions du corpus ne doivent jamais remplacer la politique de l’application.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 8
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Que mesure la fidélité ?',jsonb_build_array('A) Si les affirmations sont appuyées par le contexte', 'B) La vitesse Internet', 'C) Le nombre de couleurs', 'D) La taille du dépôt Git'),'A','évaluation','La fidélité vérifie que la réponse reste fondée sur les sources récupérées.'),
(2,'true_false','Une démonstration réussie suffit pour valider un pipeline RAG.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement avec dix documents', 'D) Seulement en local'),'B','tests','Il faut un jeu de tests reproductible avec cas couverts, ambigus et hors corpus.'),
(3,'comprehension','Quels indicateurs produit faut-il aussi suivre ?',jsonb_build_array('A) Latence et coût', 'B) Couleur et police uniquement', 'C) Nombre de branches Git', 'D) Résolution écran'),'A','observabilité','Une bonne réponse trop lente ou trop coûteuse peut rester inutilisable.'),
(4,'mini_challenge','La réponse est correcte mais sans source. Le test doit-il passer ?',jsonb_build_array('A) Oui toujours', 'B) Non si les citations sont un critère obligatoire', 'C) Seulement sur mobile', 'D) Seulement avec un score élevé'),'B','citations','Pour un assistant documentaire, la traçabilité fait partie du résultat attendu.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 9
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel élément améliore la compréhension pendant une requête longue ?',jsonb_build_array('A) Un état de chargement', 'B) Un écran vide', 'C) Une exception brute', 'D) Un rechargement automatique sans message'),'A','UX','Un indicateur de chargement explique que la demande est en cours.'),
(2,'true_false','Les détails techniques sensibles doivent être affichés directement à l’utilisateur.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement pour Qdrant', 'D) Seulement sur desktop'),'B','erreurs','L’utilisateur reçoit un message clair ; les détails vont dans des logs sécurisés.'),
(3,'comprehension','Pourquoi afficher les sources près de la réponse ?',jsonb_build_array('A) Pour faciliter la vérification', 'B) Pour remplir l’écran', 'C) Pour remplacer le corpus', 'D) Pour cacher les erreurs'),'A','sources','Les sources permettent à l’utilisateur de contrôler la provenance des affirmations.'),
(4,'mini_challenge','Un double clic envoie deux fois la même question. Correction ?',jsonb_build_array('A) Désactiver temporairement l’action pendant le chargement', 'B) Doubler top-k', 'C) Supprimer l’historique', 'D) Relancer Qdrant'),'A','état interface','Le bouton ou formulaire doit être verrouillé durant le traitement.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 10
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel fichier peut documenter les variables sans secret ?',jsonb_build_array('A) .env.example', 'B) .env avec vraies valeurs', 'C) private.key', 'D) token.txt'),'A','secrets','Le fichier exemple décrit les noms attendus sans valeur sensible.'),
(2,'true_false','Les logs peuvent contenir les clés si le dépôt est privé.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement une fois', 'D) Seulement en test'),'B','logs','Un dépôt privé ne rend pas acceptable l’exposition de secrets dans les logs.'),
(3,'comprehension','Quel test peut fonctionner sans service cloud ?',jsonb_build_array('A) Test du chunking', 'B) Test réel de quota Cohere', 'C) Test réseau Qdrant Cloud', 'D) Test de facturation'),'A','tests locaux','Le nettoyage, le chunking et la construction du prompt sont testables localement.'),
(4,'mini_challenge','Avant déploiement, une clé apparaît dans un commit ancien. Action ?',jsonb_build_array('A) La laisser car elle est ancienne', 'B) La révoquer, nettoyer l’historique selon procédure et vérifier les accès', 'C) La déplacer dans README', 'D) La copier dans les logs'),'B','incident secret','Une clé exposée doit être considérée compromise et révoquée.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,FALSE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

WITH target_module AS (
    SELECT m.id
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag' AND m.order_index = 11
), seed(order_index,question_type,question,options,answer,skill,explanation) AS (VALUES
(1,'qcm','Quel livrable prouve le mieux que le projet fonctionne ?',jsonb_build_array('A) Une application exécutable avec tests et sources', 'B) Une capture seule', 'C) Un README vide', 'D) Un prompt sans corpus'),'A','projet final','Le projet doit fonctionner de bout en bout et être vérifiable.'),
(2,'true_false','Le projet final peut utiliser un corpus sans autorisation.',jsonb_build_array('A) Vrai', 'B) Faux', 'C) Seulement en démonstration', 'D) Seulement si le dépôt est privé'),'B','éthique données','Le corpus doit être légalement et éthiquement utilisable.'),
(3,'comprehension','Que doit contenir la recette finale ?',jsonb_build_array('A) Questions normales, ambiguës et hors corpus', 'B) Seulement la meilleure question', 'C) Uniquement des captures', 'D) Seulement le temps de démarrage'),'A','recette','La recette doit tester les situations réalistes et les limites.'),
(4,'mini_challenge','Le système répond hors contexte au lieu de refuser. Le projet est-il prêt ?',jsonb_build_array('A) Oui', 'B) Non, le comportement de refus est bloquant', 'C) Seulement pour une démo', 'D) Seulement sans citations'),'B','qualité finale','Un assistant documentaire doit savoir signaler l’absence d’information.')
)
INSERT INTO public.quiz_questions(module_id,order_index,question_type,question,options,answer,difficulty,skill,explanation,is_active,is_final_test)
SELECT tm.id,s.order_index,s.question_type,s.question,s.options,s.answer,
       CASE WHEN s.question_type='mini_challenge' THEN 'avance' WHEN s.question_type='comprehension' THEN 'intermediaire' ELSE 'debutant' END,
       s.skill,s.explanation,FALSE,TRUE
FROM target_module tm CROSS JOIN seed s
ON CONFLICT(module_id,order_index) DO UPDATE SET
    question_type=EXCLUDED.question_type,
    question=EXCLUDED.question,
    options=EXCLUDED.options,
    answer=EXCLUDED.answer,
    difficulty=EXCLUDED.difficulty,
    skill=EXCLUDED.skill,
    explanation=EXCLUDED.explanation,
    is_active=FALSE,
    is_final_test=EXCLUDED.is_final_test;

DO $$
DECLARE total_count INT; module_count INT; final_count INT;
BEGIN
    SELECT COUNT(*), COUNT(DISTINCT q.module_id), COUNT(*) FILTER (WHERE q.is_final_test)
    INTO total_count,module_count,final_count
    FROM public.quiz_questions q
    JOIN public.modules m ON m.id=q.module_id
    JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='llm-rag';
    IF total_count <> 48 OR module_count <> 12 OR final_count <> 4 THEN
        RAISE EXCEPTION 'Chantier 6 incomplet: questions %, modules %, test final %', total_count,module_count,final_count;
    END IF;
END $$;
