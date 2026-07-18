-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 5
-- Rend le contenu accessible dans l’espace apprenant tout en gardant le cours absent du catalogue API public.

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.modules m SET is_published = TRUE FROM c WHERE m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.lessons l SET is_published = TRUE FROM public.modules m, c WHERE l.module_id = m.id AND m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.exercises e SET is_published = TRUE FROM c WHERE e.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.theory_resources r SET is_published = TRUE FROM c WHERE r.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.course_projects p SET is_published = TRUE FROM c WHERE p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.course_project_milestones pm SET is_published = TRUE FROM public.course_projects p, c WHERE pm.project_id = p.id AND p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.quiz_questions q SET is_active = TRUE FROM public.modules m, c WHERE q.module_id = m.id AND m.course_id = c.id;

UPDATE public.courses SET is_published = FALSE WHERE slug = 'power-bi-data-analyst';
