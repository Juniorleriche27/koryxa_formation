-- ============================================================
-- KORYXA FORMATION — CHANTIER 5 — EXERCICES PRATIQUES LLM RAG
-- Additif, idempotent, ciblé llm-rag, non publié.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    exercise_type TEXT NOT NULL CHECK (exercise_type IN ('guided','debug','challenge')),
    brief_md TEXT NOT NULL,
    starter_files JSONB NOT NULL DEFAULT '[]'::jsonb,
    expected_result_md TEXT NOT NULL,
    hints JSONB NOT NULL DEFAULT '[]'::jsonb,
    solution_md TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    estimated_minutes INT NOT NULL DEFAULT 30 CHECK (estimated_minutes > 0),
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(course_id, slug),
    UNIQUE(module_id, order_index)
);

CREATE INDEX IF NOT EXISTS idx_exercises_course ON public.exercises(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_exercises_module ON public.exercises(module_id, order_index);

CREATE OR REPLACE TRIGGER exercises_updated_at
    BEFORE UPDATE ON public.exercises
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Exercices publiés visibles" ON public.exercises;
CREATE POLICY "Exercices publiés visibles" ON public.exercises
    FOR SELECT USING (is_published = TRUE);
DROP POLICY IF EXISTS "Admin gère exercices" ON public.exercises;
CREATE POLICY "Admin gère exercices" ON public.exercises
    FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

WITH course_row AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag'
), module_rows AS (
    SELECT m.id, m.order_index
    FROM public.modules m
    JOIN course_row c ON c.id = m.course_id
), exercise_seed(module_order,slug,title,exercise_type,brief_md,starter_files,expected_result_md,hints,solution_md,estimated_minutes) AS (
    VALUES
    (0,'choisir-rag-ou-non','Choisir si le RAG est adapté','guided',
     'Analysez trois cas d’usage et justifiez pour chacun si une architecture RAG est pertinente.',
     '[{"path":"exercises/module-00/cases.md","purpose":"Cas à analyser"}]'::jsonb,
     'Une décision argumentée pour chaque cas, avec besoin de sources, fréquence de mise à jour et risque d’hallucination.',
     '["Cherchez si le corpus est privé ou évolutif.","Vérifiez si les réponses doivent être citées."]'::jsonb,
     'Le chatbot documentaire RH et la FAQ réglementaire justifient un RAG ; un générateur de slogans n’en a pas besoin.',35),
    (1,'reparer-configuration','Réparer une configuration locale cassée','debug',
     'Le projet ne démarre pas : environnement virtuel absent, dépendance manquante et variable non chargée. Diagnostiquez puis corrigez sans afficher de secret.',
     '[{"path":"exercises/module-01/broken_requirements.txt","purpose":"Dépendances incomplètes"},{"path":"exercises/module-01/config.py","purpose":"Configuration à corriger"}]'::jsonb,
     'Le diagnostic démarre, les dépendances sont isolées et la configuration signale proprement toute variable absente.',
     '["Commencez par python -m venv.","Utilisez un fichier .env.example sans valeur réelle."]'::jsonb,
     'Créer l’environnement, installer requirements.txt, charger les variables via la couche de configuration et retourner une erreur explicite si elles manquent.',45),
    (2,'chargeur-documents','Construire un chargeur traçable','guided',
     'Ajoutez un chargeur de fichiers texte qui valide l’extension, nettoie le contenu et conserve source, catégorie et identifiant.',
     '[{"path":"exercises/module-02/loader_starter.py","purpose":"Squelette du chargeur"},{"path":"exercises/module-02/sample.txt","purpose":"Document de test"}]'::jsonb,
     'Une structure normalisée contenant text et metadata, avec erreur claire pour les fichiers invalides.',
     '["Séparez validation, lecture et normalisation.","Ne supprimez pas la provenance du document."]'::jsonb,
     'Créer trois fonctions : validate_file, read_text et normalize_document ; retourner un dictionnaire avec text et metadata.',50),
    (3,'comparer-chunking','Comparer deux stratégies de chunking','challenge',
     'Exécutez deux configurations de chunking sur le même document et comparez nombre de chunks, longueur moyenne et lisibilité.',
     '[{"path":"exercises/module-03/chunking_lab.py","purpose":"Laboratoire de chunking"}]'::jsonb,
     'Un tableau comparatif et une recommandation argumentée. Le nombre de chunks doit être mesuré, jamais fixé à 2 ou 9.',
     '["Testez taille et overlap séparément.","Inspectez les frontières entre chunks."]'::jsonb,
     'Comparer par exemple 500/50 et 1000/150, calculer les métriques et justifier le meilleur compromis pour le corpus.',55),
    (4,'batch-embeddings','Fiabiliser un pipeline d’embeddings','debug',
     'Un traitement par lots perd la trace du chunk en erreur et tente d’envoyer un lot vide. Corrigez-le.',
     '[{"path":"exercises/module-04/embed_batch_broken.py","purpose":"Pipeline à déboguer"}]'::jsonb,
     'Aucun lot vide envoyé, erreurs associées à un chunk, reprise possible et aucun secret dans les logs.',
     '["Validez les entrées avant l’appel API.","Conservez un identifiant stable par chunk."]'::jsonb,
     'Filtrer les lots vides, journaliser chunk_id et type d’erreur, puis enregistrer les succès pour reprendre après interruption.',50),
    (5,'indexation-idempotente','Créer une indexation Qdrant idempotente','guided',
     'Indexez les chunks avec des identifiants stables et des payloads complets, puis rejouez l’opération sans créer de doublons.',
     '[{"path":"exercises/module-05/index_starter.py","purpose":"Squelette d’indexation"}]'::jsonb,
     'Le nombre de points reste stable après deux exécutions et les filtres par catégorie fonctionnent.',
     '["Utilisez upsert.","Dérivez l’identifiant du document et de la position du chunk."]'::jsonb,
     'Construire un UUID déterministe par chunk, appeler upsert et stocker text, source, catégorie et position dans le payload.',60),
    (6,'evaluer-retrieval','Évaluer le retrieval sur cinq questions','challenge',
     'Créez cinq questions avec passage attendu, lancez la recherche et mesurez le rang obtenu.',
     '[{"path":"exercises/module-06/eval_questions.json","purpose":"Jeu de questions"},{"path":"exercises/module-06/evaluate.py","purpose":"Script d’évaluation"}]'::jsonb,
     'Un rapport top-k indiquant réussite, rang, bruit éventuel et réglage recommandé.',
     '["Mesurez d’abord le retrieval sans LLM.","Distinguez corpus, chunking et seuil."]'::jsonb,
     'Calculer hit@k et rang moyen ; commenter chaque échec avant de modifier top-k ou le seuil.',60),
    (7,'securiser-prompt','Sécuriser un prompt RAG','debug',
     'Le prompt fourni obéit aux instructions contenues dans un document et répond hors contexte. Corrigez-le.',
     '[{"path":"exercises/module-07/prompt_broken.txt","purpose":"Prompt vulnérable"},{"path":"exercises/module-07/malicious_doc.txt","purpose":"Document de test"}]'::jsonb,
     'Le modèle traite les documents comme données, refuse hors contexte et conserve les citations.',
     '["Séparez instructions, contexte et question.","Ajoutez une règle de refus explicite."]'::jsonb,
     'Renforcer le prompt système, délimiter le contexte, ignorer toute instruction du corpus et imposer une réponse fondée sur les sources.',45),
    (8,'jeu-tests-rag','Construire un jeu de tests RAG','challenge',
     'Préparez dix questions : couvertes, ambiguës et hors corpus. Définissez les critères de fidélité, pertinence et citation.',
     '[{"path":"exercises/module-08/rag_eval_template.csv","purpose":"Grille d’évaluation"}]'::jsonb,
     'Une grille remplie avec seuil de réussite, coût moyen et latence observée.',
     '["Incluez des cas volontairement impossibles.","Vérifiez chaque affirmation contre le contexte."]'::jsonb,
     'Répartir les questions en trois catégories, noter fidélité/pertinence/citations et définir les défauts bloquants.',60),
    (9,'interface-sources','Ajouter sources et états à Streamlit','guided',
     'Reliez le pipeline à Streamlit avec chargement, erreur, réponse et panneau de sources.',
     '[{"path":"exercises/module-09/app_starter.py","purpose":"Interface Streamlit de départ"}]'::jsonb,
     'Une interface testable qui bloque les doubles envois, affiche les sources et masque les détails sensibles.',
     '["Utilisez st.session_state pour l’historique.","Séparez message utilisateur et log technique."]'::jsonb,
     'Créer un formulaire, afficher un spinner, rendre réponse et sources, puis traiter séparément erreurs de configuration et réseau.',65),
    (10,'recette-securite','Exécuter la recette sécurité','debug',
     'Le dépôt contient une mauvaise gestion des secrets, un type de fichier non filtré et des logs trop bavards. Identifiez et corrigez les risques.',
     '[{"path":"exercises/module-10/security_review.md","purpose":"Checklist de revue"}]'::jsonb,
     'Aucun secret versionné, entrées validées, logs nettoyés et checklist de déploiement complétée.',
     '["Inspectez .gitignore et .env.example.","Ne lisez pas le contenu d’un vrai .env."]'::jsonb,
     'Ajouter les exclusions, valider extensions et tailles, masquer les valeurs sensibles et documenter les contrôles avant déploiement.',50),
    (11,'projet-final-rag','Projet final — Assistant documentaire RAG','challenge',
     'Construisez une application RAG complète sur un corpus autorisé, avec ingestion, Qdrant, réponses sourcées, refus hors contexte, interface et tests.',
     '[{"path":"project/README.md","purpose":"Brief du projet"},{"path":"project/evaluation-grid.csv","purpose":"Grille de recette"}]'::jsonb,
     'Un dépôt exécutable, une démonstration, dix tests documentés, une note sur les limites et une présentation courte.',
     '["Validez chaque couche séparément avant l’intégration.","Le projet doit fonctionner sans explication orale."]'::jsonb,
     'La solution de référence assemble les composants du dépôt compagnon, centralise la configuration, affiche les sources et documente les limites.',180)
)
INSERT INTO public.exercises(
    course_id,module_id,slug,title,exercise_type,brief_md,starter_files,
    expected_result_md,hints,solution_md,order_index,estimated_minutes,is_published
)
SELECT
    c.id,m.id,e.slug,e.title,e.exercise_type,e.brief_md,e.starter_files,
    e.expected_result_md,e.hints,e.solution_md,0,e.estimated_minutes,FALSE
FROM course_row c
JOIN module_rows m ON TRUE
JOIN exercise_seed e ON e.module_order = m.order_index
ON CONFLICT(course_id,slug) DO UPDATE SET
    module_id=EXCLUDED.module_id,
    title=EXCLUDED.title,
    exercise_type=EXCLUDED.exercise_type,
    brief_md=EXCLUDED.brief_md,
    starter_files=EXCLUDED.starter_files,
    expected_result_md=EXCLUDED.expected_result_md,
    hints=EXCLUDED.hints,
    solution_md=EXCLUDED.solution_md,
    estimated_minutes=EXCLUDED.estimated_minutes,
    is_published=FALSE;

DO $$
DECLARE total_count INT; guided_count INT; debug_count INT; challenge_count INT;
BEGIN
    SELECT COUNT(*),
           COUNT(*) FILTER (WHERE exercise_type='guided'),
           COUNT(*) FILTER (WHERE exercise_type='debug'),
           COUNT(*) FILTER (WHERE exercise_type='challenge')
    INTO total_count,guided_count,debug_count,challenge_count
    FROM public.exercises e
    JOIN public.courses c ON c.id=e.course_id
    WHERE c.slug='llm-rag';
    IF total_count <> 12 OR guided_count < 3 OR debug_count < 3 OR challenge_count < 3 THEN
        RAISE EXCEPTION 'Chantier 5 incomplet: total %, guided %, debug %, challenge %', total_count,guided_count,debug_count,challenge_count;
    END IF;
END $$;
