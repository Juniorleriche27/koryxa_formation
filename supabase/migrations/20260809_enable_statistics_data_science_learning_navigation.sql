-- KORYXA FORMATION — STATISTIQUES & DATA SCIENCE AVEC PYTHON — CHANTIER 5
-- Active l’expérience apprenant tout en gardant le cours hors du catalogue API public.

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.modules m SET is_published = TRUE FROM c WHERE m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.lessons l SET is_published = TRUE FROM public.modules m, c WHERE l.module_id = m.id AND m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.exercises e SET is_published = TRUE FROM c WHERE e.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.theory_resources r SET is_published = TRUE FROM c WHERE r.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.course_projects p SET is_published = TRUE FROM c WHERE p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.course_project_milestones pm SET is_published = TRUE FROM public.course_projects p, c WHERE pm.project_id = p.id AND p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'statistics-data-science-python')
UPDATE public.quiz_questions q SET is_active = TRUE FROM public.modules m, c WHERE q.module_id = m.id AND m.course_id = c.id;

UPDATE public.courses SET is_published = FALSE WHERE slug = 'statistics-data-science-python';

DO $$
DECLARE
    module_count INT;
    lesson_count INT;
    project_count INT;
    milestone_count INT;
    quiz_count INT;
    course_published BOOLEAN;
BEGIN
    SELECT COUNT(*) INTO module_count
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python' AND m.is_published = TRUE;

    SELECT COUNT(*) INTO lesson_count
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python' AND l.is_published = TRUE;

    SELECT COUNT(*) INTO project_count
    FROM public.course_projects p
    JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'statistics-data-science-python' AND p.is_published = TRUE;

    SELECT COUNT(*) INTO milestone_count
    FROM public.course_project_milestones pm
    JOIN public.course_projects p ON p.id = pm.project_id
    JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'statistics-data-science-python' AND pm.is_published = TRUE;

    SELECT COUNT(*) INTO quiz_count
    FROM public.quiz_questions q
    JOIN public.modules m ON m.id = q.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python' AND q.is_active = TRUE;

    SELECT is_published INTO course_published
    FROM public.courses
    WHERE slug = 'statistics-data-science-python';

    IF module_count <> 12 OR lesson_count <> 24 OR project_count <> 1 OR milestone_count <> 7 OR quiz_count <> 60 OR course_published IS DISTINCT FROM FALSE THEN
        RAISE EXCEPTION 'Navigation Statistiques incomplète: modules %, leçons %, projets %, jalons %, quiz %, cours publié %',
            module_count, lesson_count, project_count, milestone_count, quiz_count, course_published;
    END IF;
END $$;
