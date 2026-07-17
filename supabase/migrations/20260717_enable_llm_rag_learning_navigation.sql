-- Chantier 2: rendre les modules LLM RAG accessibles dans l’espace apprenant.
-- Le parcours reste absent du catalogue public tant que courses.is_published = false.

UPDATE public.modules
SET is_published = true
WHERE course_id = (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
);
