-- Chantier 3 : rendre visibles les contenus pédagogiques LLM RAG dans l’espace apprenant.
-- Le parcours reste non publié dans le catalogue général.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.lessons l
SET is_published = true
FROM public.modules m, target_course c
WHERE l.module_id = m.id
  AND m.course_id = c.id;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.exercises e
SET is_published = true
FROM target_course c
WHERE e.course_id = c.id;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.course_glossary g
SET is_published = true
FROM target_course c
WHERE g.course_id = c.id;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.theory_diagrams d
SET is_published = true
FROM target_course c
WHERE d.course_id = c.id;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.theory_resources r
SET is_published = true
FROM target_course c
WHERE r.course_id = c.id;

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'llm-rag' LIMIT 1
)
UPDATE public.course_projects p
SET is_published = true
FROM target_course c
WHERE p.course_id = c.id;

UPDATE public.course_project_milestones m
SET is_published = true
WHERE EXISTS (
    SELECT 1
    FROM public.course_projects p
    JOIN public.courses c ON c.id = p.course_id
    WHERE p.id = m.project_id
      AND c.slug = 'llm-rag'
);
