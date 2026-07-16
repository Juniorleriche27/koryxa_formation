-- ============================================================
-- KORYXA FORMATION — CHANTIER 2 — PARCOURS LLM RAG
-- Architecture pédagogique additive. Tous les modules restent
-- non publiés jusqu'à validation éditoriale et recette complète.
-- ============================================================

ALTER TABLE public.courses
    ADD COLUMN IF NOT EXISTS audience TEXT,
    ADD COLUMN IF NOT EXISTS prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS estimated_hours NUMERIC(6,1),
    ADD COLUMN IF NOT EXISTS final_project_title TEXT,
    ADD COLUMN IF NOT EXISTS final_project_description TEXT;

ALTER TABLE public.modules
    ADD COLUMN IF NOT EXISTS learning_objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS prerequisites JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS milestone TEXT,
    ADD COLUMN IF NOT EXISTS exercise_brief TEXT,
    ADD COLUMN IF NOT EXISTS estimated_hours NUMERIC(5,1),
    ADD COLUMN IF NOT EXISTS requires_quiz BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS quiz_pass_score INT NOT NULL DEFAULT 12,
    ADD COLUMN IF NOT EXISTS platform_points INT NOT NULL DEFAULT 40;

CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    order_index INT NOT NULL,
    lesson_type TEXT NOT NULL DEFAULT 'lesson' CHECK (lesson_type IN ('lesson','lab','checkpoint','project')),
    estimated_minutes INT NOT NULL DEFAULT 30 CHECK (estimated_minutes > 0),
    objectives JSONB NOT NULL DEFAULT '[]'::jsonb,
    content_md TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(module_id, slug),
    UNIQUE(module_id, order_index)
);

CREATE INDEX IF NOT EXISTS idx_lessons_module_order ON public.lessons(module_id, order_index);

CREATE OR REPLACE TRIGGER lessons_updated_at
    BEFORE UPDATE ON public.lessons
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Leçons publiées visibles" ON public.lessons;
CREATE POLICY "Leçons publiées visibles" ON public.lessons
    FOR SELECT USING (is_published = TRUE);
DROP POLICY IF EXISTS "Admin gère les leçons" ON public.lessons;
CREATE POLICY "Admin gère les leçons" ON public.lessons
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

UPDATE public.courses
SET
    title = 'LLM RAG Developer',
    short_title = 'LLM RAG',
    description = 'Construire une application capable de répondre à partir de documents avec embeddings, recherche vectorielle, citations et interface utilisateur.',
    audience = 'Débutants techniques, développeurs juniors, analystes et professionnels souhaitant construire un assistant documentaire fiable.',
    prerequisites = '["Bases Python", "Utilisation simple du terminal", "Notions de Git recommandées"]'::jsonb,
    skills = '["Comprendre les LLM et le RAG", "Préparer et découper des documents", "Créer des embeddings", "Utiliser Qdrant", "Construire un pipeline RAG", "Évaluer et sécuriser les réponses", "Créer une interface Streamlit"]'::jsonb,
    estimated_hours = 28,
    final_project_title = 'Assistant documentaire RAG avec sources',
    final_project_description = 'Une application complète qui ingère des documents, indexe leurs contenus, répond aux questions et affiche les passages sources utilisés.',
    is_published = FALSE
WHERE slug = 'llm-rag';

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag'
), curriculum(order_index,title,description,duration,estimated_hours,objectives,prerequisites,skills,milestone,exercise_brief,requires_quiz) AS (
    VALUES
    (0,'Comprendre les LLM et le RAG','Fondations : modèles de langage, limites, hallucinations, recherche augmentée et architecture générale.','1h30',1.5,
     '["Expliquer le rôle d’un LLM", "Décrire les étapes d’un pipeline RAG", "Identifier quand utiliser ou éviter le RAG"]'::jsonb,
     '[]'::jsonb,'["LLM", "RAG", "architecture"]'::jsonb,'Schéma complet du pipeline RAG','Analyser trois cas d’usage et décider si le RAG est adapté.',TRUE),
    (1,'Préparer l’environnement de développement','Python, VS Code, environnement virtuel, variables de configuration et structure professionnelle du projet.','2h00',2,
     '["Créer un environnement isolé", "Structurer les dossiers du projet", "Configurer le projet sans exposer de secrets"]'::jsonb,
     '["Module 0 validé"]'::jsonb,'["Python", "VS Code", "sécurité"]'::jsonb,'Projet exécutable localement','Initialiser le dépôt et vérifier une commande de diagnostic.',TRUE),
    (2,'Charger et normaliser les documents','Chargement de fichiers, extraction de texte, nettoyage, métadonnées et validation des entrées.','2h30',2.5,
     '["Charger plusieurs formats", "Nettoyer le texte", "Associer des métadonnées utiles"]'::jsonb,
     '["Module 1 validé"]'::jsonb,'["ingestion", "documents", "métadonnées"]'::jsonb,'Corpus propre et traçable','Construire un chargeur qui refuse les fichiers invalides et conserve la source.',TRUE),
    (3,'Découper les contenus en chunks','Stratégies de chunking, taille, chevauchement, structure sémantique et compromis qualité/coût.','2h30',2.5,
     '["Comparer plusieurs stratégies", "Choisir une taille adaptée", "Mesurer l’impact du chevauchement"]'::jsonb,
     '["Module 2 validé"]'::jsonb,'["chunking", "tokens", "qualité"]'::jsonb,'Jeu de chunks inspectable','Comparer deux configurations de chunking sur le même document.',TRUE),
    (4,'Créer des embeddings','Représentations vectorielles, similarité, modèle d’embedding, batchs et gestion des erreurs.','2h30',2.5,
     '["Expliquer un embedding", "Créer des vecteurs", "Gérer les batchs et erreurs API"]'::jsonb,
     '["Module 3 validé"]'::jsonb,'["embeddings", "similarité", "API"]'::jsonb,'Chunks vectorisés','Créer un script d’embedding reproductible avec reprise sur erreur.',TRUE),
    (5,'Indexer avec Qdrant','Collections, points, payloads, filtres, insertion, mise à jour et suppression.','3h00',3,
     '["Créer une collection", "Indexer les vecteurs", "Filtrer avec les métadonnées"]'::jsonb,
     '["Module 4 validé"]'::jsonb,'["Qdrant", "base vectorielle", "filtres"]'::jsonb,'Collection Qdrant exploitable','Indexer le corpus puis retrouver les documents d’une catégorie précise.',TRUE),
    (6,'Rechercher les passages pertinents','Recherche vectorielle, top-k, seuils, filtres, reranking et diagnostic des résultats.','3h00',3,
     '["Construire une requête", "Ajuster top-k et seuil", "Évaluer la pertinence des passages"]'::jsonb,
     '["Module 5 validé"]'::jsonb,'["retrieval", "ranking", "évaluation"]'::jsonb,'Moteur de recherche documenté','Comparer les résultats de cinq questions et justifier les réglages.',TRUE),
    (7,'Construire le prompt RAG','Assemblage du contexte, instructions, citations, refus hors contexte et protection contre les injections.','2h30',2.5,
     '["Composer un prompt robuste", "Forcer les citations", "Gérer les questions sans réponse"]'::jsonb,
     '["Module 6 validé"]'::jsonb,'["prompting", "citations", "sécurité"]'::jsonb,'Prompt RAG fiable','Créer un prompt qui cite les sources et refuse une demande non couverte.',TRUE),
    (8,'Générer et évaluer les réponses','Appel du LLM, traçabilité, qualité, fidélité au contexte, latence, coût et jeux de tests.','3h00',3,
     '["Générer une réponse sourcée", "Évaluer fidélité et pertinence", "Suivre coût et latence"]'::jsonb,
     '["Module 7 validé"]'::jsonb,'["génération", "évaluation", "observabilité"]'::jsonb,'Pipeline RAG évalué','Créer un jeu de dix questions avec résultats attendus et critères de réussite.',TRUE),
    (9,'Créer l’interface Streamlit','Interface de question-réponse, état de chargement, erreurs, historique et affichage des sources.','2h30',2.5,
     '["Construire une interface claire", "Afficher les sources", "Gérer chargement et erreurs"]'::jsonb,
     '["Module 8 validé"]'::jsonb,'["Streamlit", "UX", "intégration"]'::jsonb,'Prototype utilisable','Relier le pipeline à une interface testable par un autre utilisateur.',TRUE),
    (10,'Sécuriser, tester et préparer le déploiement','Secrets, validation des fichiers, tests, logs, quotas, configuration cloud et checklist de mise en ligne.','2h00',2,
     '["Protéger les secrets", "Tester les composants critiques", "Préparer une configuration de déploiement"]'::jsonb,
     '["Module 9 validé"]'::jsonb,'["tests", "sécurité", "déploiement"]'::jsonb,'Application prête pour recette','Exécuter la checklist qualité et corriger les défauts bloquants.',TRUE),
    (11,'Projet final — Assistant documentaire RAG','Assembler, documenter et présenter une application RAG complète avec sources, tests et démonstration.','3h00',3,
     '["Assembler le pipeline complet", "Documenter les choix", "Présenter les résultats et limites"]'::jsonb,
     '["Modules 0 à 10 validés"]'::jsonb,'["projet final", "portfolio", "présentation"]'::jsonb,'Projet portfolio terminé','Livrer le dépôt, une démonstration, un rapport d’évaluation et une présentation courte.',FALSE)
)
INSERT INTO public.modules (
    course_id,title,description,order_index,duration,is_published,
    learning_objectives,prerequisites,skills,milestone,exercise_brief,
    estimated_hours,requires_quiz,quiz_pass_score,platform_points
)
SELECT
    c.id, curriculum.title, curriculum.description, curriculum.order_index,
    curriculum.duration, FALSE, curriculum.objectives, curriculum.prerequisites,
    curriculum.skills, curriculum.milestone, curriculum.exercise_brief,
    curriculum.estimated_hours, curriculum.requires_quiz, 12, 40
FROM target_course c CROSS JOIN curriculum
ON CONFLICT (course_id, order_index) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    duration = EXCLUDED.duration,
    learning_objectives = EXCLUDED.learning_objectives,
    prerequisites = EXCLUDED.prerequisites,
    skills = EXCLUDED.skills,
    milestone = EXCLUDED.milestone,
    exercise_brief = EXCLUDED.exercise_brief,
    estimated_hours = EXCLUDED.estimated_hours,
    requires_quiz = EXCLUDED.requires_quiz,
    is_published = FALSE;

WITH lesson_seed(module_order,lesson_order,slug,title,summary,lesson_type,minutes) AS (
    VALUES
    (0,0,'notions-essentielles','LLM, contexte et hallucinations','Comprendre ce que produit un modèle de langage et ses limites.','lesson',25),
    (0,1,'architecture-rag','Anatomie d’un pipeline RAG','Relier ingestion, recherche et génération.','lesson',30),
    (0,2,'checkpoint-cas-usage','Checkpoint : choisir le bon cas d’usage','Décider quand le RAG est réellement pertinent.','checkpoint',25),
    (1,0,'setup-python','Environnement Python reproductible','Créer et vérifier l’environnement de travail.','lab',45),
    (1,1,'structure-projet','Structure professionnelle du projet','Organiser code, données, scripts et configuration.','lesson',35),
    (2,0,'chargement-documents','Chargement des documents','Importer des contenus de manière contrôlée.','lab',45),
    (2,1,'nettoyage-metadonnees','Nettoyage et métadonnées','Préparer des textes traçables pour l’indexation.','lesson',40),
    (3,0,'strategies-chunking','Stratégies de chunking','Comparer taille fixe, chevauchement et structure sémantique.','lesson',45),
    (3,1,'lab-chunking','Laboratoire de chunking','Mesurer l’effet des paramètres sur le corpus.','lab',50),
    (4,0,'comprendre-embeddings','Comprendre les embeddings','Relier texte, vecteurs et similarité.','lesson',40),
    (4,1,'pipeline-embeddings','Pipeline d’embeddings','Vectoriser le corpus avec gestion des erreurs.','lab',55),
    (5,0,'qdrant-collections','Collections et payloads Qdrant','Créer un stockage vectoriel maintenable.','lesson',45),
    (5,1,'indexation-qdrant','Indexer le corpus','Insérer, mettre à jour et filtrer les points.','lab',60),
    (6,0,'recherche-vectorielle','Recherche vectorielle','Construire une recherche top-k et filtrée.','lesson',45),
    (6,1,'evaluation-retrieval','Évaluer la recherche','Diagnostiquer pertinence, bruit et faux positifs.','lab',60),
    (7,0,'prompt-contextuel','Prompt contextuel et citations','Assembler un contexte fiable et imposer les sources.','lesson',45),
    (7,1,'securite-prompt','Refus et sécurité','Gérer hors contexte et injections documentaires.','lab',45),
    (8,0,'generation-reponse','Générer une réponse sourcée','Relier retrieval et modèle de génération.','lab',55),
    (8,1,'evaluation-rag','Évaluer le pipeline RAG','Tester fidélité, pertinence, coût et latence.','lesson',55),
    (9,0,'interface-streamlit','Interface Streamlit','Créer une expérience question-réponse claire.','lab',65),
    (9,1,'sources-erreurs','Sources, états et erreurs','Afficher la provenance et les états du système.','lesson',40),
    (10,0,'tests-securite','Tests et sécurité','Valider les composants et protéger les données.','lab',50),
    (10,1,'checklist-deploiement','Préparer le déploiement','Configurer, documenter et vérifier la mise en ligne.','checkpoint',40),
    (11,0,'brief-projet-final','Brief du projet final','Comprendre les livrables et critères de réussite.','project',30),
    (11,1,'construction-projet','Construction et recette','Assembler puis tester l’application complète.','project',120),
    (11,2,'presentation-projet','Présentation et rétrospective','Présenter les choix, résultats, limites et améliorations.','project',30)
), target AS (
    SELECT m.id AS module_id, m.order_index
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'llm-rag'
)
INSERT INTO public.lessons(module_id,slug,title,summary,order_index,lesson_type,estimated_minutes,objectives,is_published)
SELECT t.module_id,l.slug,l.title,l.summary,l.lesson_order,l.lesson_type,l.minutes,'[]'::jsonb,FALSE
FROM lesson_seed l JOIN target t ON t.order_index = l.module_order
ON CONFLICT (module_id, slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    order_index = EXCLUDED.order_index,
    lesson_type = EXCLUDED.lesson_type,
    estimated_minutes = EXCLUDED.estimated_minutes,
    is_published = FALSE;
