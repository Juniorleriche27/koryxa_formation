-- ============================================================
-- KORYXA FORMATION — CHANTIER 7 — PROJET FIL ROUGE / FINAL
-- Additif, idempotent, ciblé llm-rag, non publié.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.course_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    brief_md TEXT NOT NULL,
    corpus_policy_md TEXT NOT NULL,
    starter_assets JSONB NOT NULL DEFAULT '[]'::jsonb,
    minimum_version JSONB NOT NULL DEFAULT '[]'::jsonb,
    advanced_version JSONB NOT NULL DEFAULT '[]'::jsonb,
    functional_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    technical_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    rubric JSONB NOT NULL DEFAULT '[]'::jsonb,
    reference_solution_md TEXT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(course_id, slug)
);

CREATE TABLE IF NOT EXISTS public.course_project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.course_projects(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    acceptance_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INT NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(project_id, slug),
    UNIQUE(project_id, order_index)
);

CREATE INDEX IF NOT EXISTS idx_course_projects_course ON public.course_projects(course_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project ON public.course_project_milestones(project_id, order_index);

CREATE OR REPLACE TRIGGER course_projects_updated_at BEFORE UPDATE ON public.course_projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE OR REPLACE TRIGGER course_project_milestones_updated_at BEFORE UPDATE ON public.course_project_milestones FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.course_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_project_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Projets publiés visibles" ON public.course_projects;
CREATE POLICY "Projets publiés visibles" ON public.course_projects FOR SELECT USING (is_published = TRUE);
DROP POLICY IF EXISTS "Admin gère projets" ON public.course_projects;
CREATE POLICY "Admin gère projets" ON public.course_projects FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Jalons publiés visibles" ON public.course_project_milestones;
CREATE POLICY "Jalons publiés visibles" ON public.course_project_milestones FOR SELECT USING (is_published = TRUE);
DROP POLICY IF EXISTS "Admin gère jalons" ON public.course_project_milestones;
CREATE POLICY "Admin gère jalons" ON public.course_project_milestones FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

WITH c AS (SELECT id FROM public.courses WHERE slug='llm-rag')
INSERT INTO public.course_projects(
    course_id,slug,title,summary,brief_md,corpus_policy_md,starter_assets,
    minimum_version,advanced_version,functional_criteria,technical_criteria,
    rubric,reference_solution_md,is_published
)
SELECT
    c.id,
    'assistant-documentaire-rag',
    'Assistant documentaire RAG avec sources',
    'Construire une application complète qui ingère un corpus autorisé, retrouve les passages utiles, répond avec citations et refuse les questions hors contexte.',
    '# Brief\n\nCréer un assistant documentaire destiné à un domaine réel : formation, RH, procédures internes, documentation technique ou réglementation. Le système doit ingérer des documents, produire des chunks traçables, créer des embeddings, indexer dans Qdrant, rechercher les passages pertinents, générer une réponse fondée sur les sources et afficher ces sources dans une interface Streamlit.\n\n## Livrables\n- dépôt exécutable ;\n- README d’installation ;\n- corpus autorisé ;\n- pipeline d’ingestion ;\n- moteur de recherche ;\n- interface ;\n- jeu de dix questions de recette ;\n- rapport court sur les limites ;\n- démonstration de cinq minutes.',
    '# Politique du corpus\n\nLe corpus doit être créé par l’apprenant, libre de droits, public avec autorisation d’usage, ou fourni explicitement pour la formation. Aucune donnée personnelle sensible, confidentielle ou obtenue sans autorisation. Chaque document doit avoir une source, un identifiant et une catégorie.',
    '[{"path":"project/README.md","purpose":"Brief et commandes de démarrage"},{"path":"project/src","purpose":"Squelettes ingestion, retrieval et génération"},{"path":"project/data/sample","purpose":"Petit corpus de démonstration autorisé"},{"path":"project/tests/questions.json","purpose":"Jeu de recette initial"},{"path":"project/evaluation-grid.csv","purpose":"Grille d’évaluation"}]'::jsonb,
    '["Importer au moins 3 documents autorisés","Créer des chunks avec métadonnées","Indexer dans Qdrant","Répondre à partir du corpus","Afficher au moins une source par réponse","Refuser une question hors contexte","Fournir une interface Streamlit","Documenter installation et limites"]'::jsonb,
    '["Support de plusieurs formats de documents","Filtres par catégorie","Reranking","Historique contrôlé","Évaluation automatique","Observabilité coût et latence","Déploiement cloud","Gestion multi-corpus"]'::jsonb,
    '["Le corpus est chargeable","Les réponses utilisent le contexte retrouvé","Les sources sont visibles et vérifiables","Les questions hors contexte sont refusées","Les erreurs sont compréhensibles","La démonstration fonctionne de bout en bout"]'::jsonb,
    '["Architecture séparée en services","Configuration centralisée sans secret versionné","Indexation idempotente","Logs sans données sensibles","Tests locaux reproductibles","README complet","Code lisible et typé lorsque pertinent"]'::jsonb,
    '[{"criterion":"Fonctionnement de bout en bout","points":15},{"criterion":"Qualité du retrieval","points":10},{"criterion":"Fidélité et citations","points":10},{"criterion":"Sécurité et gestion des erreurs","points":8},{"criterion":"Qualité du code et tests","points":7},{"criterion":"Interface et expérience utilisateur","points":5},{"criterion":"Documentation et présentation","points":5}]'::jsonb,
    '# Solution de référence\n\nLa solution de référence reste séparée de l’espace apprenant. Elle assemble les services du dépôt compagnon, utilise des identifiants de chunks stables, centralise la configuration, sépare retrieval et génération, affiche les sources et contient des tests locaux. Elle ne doit être rendue accessible qu’après évaluation ou décision pédagogique explicite.',
    FALSE
FROM c
ON CONFLICT(course_id,slug) DO UPDATE SET
    title=EXCLUDED.title,
    summary=EXCLUDED.summary,
    brief_md=EXCLUDED.brief_md,
    corpus_policy_md=EXCLUDED.corpus_policy_md,
    starter_assets=EXCLUDED.starter_assets,
    minimum_version=EXCLUDED.minimum_version,
    advanced_version=EXCLUDED.advanced_version,
    functional_criteria=EXCLUDED.functional_criteria,
    technical_criteria=EXCLUDED.technical_criteria,
    rubric=EXCLUDED.rubric,
    reference_solution_md=EXCLUDED.reference_solution_md,
    is_published=FALSE;

WITH p AS (
    SELECT cp.id AS project_id, cp.course_id
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='llm-rag' AND cp.slug='assistant-documentaire-rag'
), m AS (
    SELECT id,course_id,order_index FROM public.modules
), seed(module_order,slug,title,description,deliverables,acceptance,ord) AS (VALUES
(1,'initialisation','Initialiser le projet','Préparer environnement, structure et configuration sans secret.','["Dépôt initialisé","Environnement reproductible",".env.example"]'::jsonb,'["Le diagnostic démarre","Aucun secret versionné"]'::jsonb,0),
(2,'corpus','Préparer le corpus','Choisir des documents autorisés et normaliser leurs métadonnées.','["Corpus autorisé","Inventaire des sources","Chargeur fonctionnel"]'::jsonb,'["Chaque document a une source et un identifiant","Les erreurs sont explicites"]'::jsonb,1),
(3,'chunking','Valider le chunking','Comparer deux stratégies et retenir un réglage argumenté.','["Rapport comparatif","Chunks inspectables"]'::jsonb,'["Le nombre réel de chunks est mesuré","Le choix est justifié"]'::jsonb,2),
(5,'indexation','Indexer dans Qdrant','Créer une collection et une indexation rejouable.','["Collection Qdrant","Script d’indexation","Payloads complets"]'::jsonb,'["Deux exécutions ne créent pas de doublons","Les filtres fonctionnent"]'::jsonb,3),
(6,'retrieval','Évaluer la recherche','Mesurer les résultats sur cinq questions connues.','["Jeu de questions","Rapport hit@k"]'::jsonb,'["Le bon passage est retrouvé pour la majorité des cas","Les échecs sont diagnostiqués"]'::jsonb,4),
(8,'generation','Valider les réponses','Relier retrieval et génération avec citations et refus.','["Pipeline complet","Dix tests documentés"]'::jsonb,'["Les affirmations sont sourcées","Les questions hors corpus sont refusées"]'::jsonb,5),
(9,'interface','Créer l’interface','Exposer le pipeline dans Streamlit avec sources et états.','["Interface Streamlit","Gestion chargement et erreurs"]'::jsonb,'["Un autre utilisateur peut tester sans explication orale","Les sources sont visibles"]'::jsonb,6),
(10,'recette','Terminer la recette','Exécuter sécurité, tests et documentation avant remise.','["Checklist qualité","README final","Rapport de limites"]'::jsonb,'["Aucun défaut bloquant","Aucun secret exposé","Les commandes sont reproductibles"]'::jsonb,7),
(11,'remise','Remettre et présenter','Soumettre le dépôt et présenter les choix techniques.','["URL du dépôt","Démonstration","Présentation courte"]'::jsonb,'["Tous les livrables sont accessibles","La présentation couvre résultats et limites"]'::jsonb,8)
)
INSERT INTO public.course_project_milestones(project_id,module_id,slug,title,description,deliverables,acceptance_criteria,order_index,is_published)
SELECT p.project_id,m.id,s.slug,s.title,s.description,s.deliverables,s.acceptance,s.ord,FALSE
FROM p JOIN m ON m.course_id=p.course_id JOIN seed s ON s.module_order=m.order_index
ON CONFLICT(project_id,slug) DO UPDATE SET
    module_id=EXCLUDED.module_id,
    title=EXCLUDED.title,
    description=EXCLUDED.description,
    deliverables=EXCLUDED.deliverables,
    acceptance_criteria=EXCLUDED.acceptance_criteria,
    order_index=EXCLUDED.order_index,
    is_published=FALSE;

DO $$
DECLARE projects_count INT; milestones_count INT; rubric_total INT;
BEGIN
    SELECT COUNT(*) INTO projects_count
    FROM public.course_projects cp JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='llm-rag';

    SELECT COUNT(*) INTO milestones_count
    FROM public.course_project_milestones pm
    JOIN public.course_projects cp ON cp.id=pm.project_id
    JOIN public.courses c ON c.id=cp.course_id
    WHERE c.slug='llm-rag';

    SELECT COALESCE(SUM((item->>'points')::INT),0) INTO rubric_total
    FROM public.course_projects cp
    JOIN public.courses c ON c.id=cp.course_id,
    LATERAL jsonb_array_elements(cp.rubric) item
    WHERE c.slug='llm-rag';

    IF projects_count <> 1 OR milestones_count <> 9 OR rubric_total <> 60 THEN
        RAISE EXCEPTION 'Chantier 7 incomplet: projets %, jalons %, barème %', projects_count,milestones_count,rubric_total;
    END IF;
END $$;
