-- KORYXA FORMATION — POWER BI DATA ANALYST — CHANTIER 6
-- Publication finale, score plateforme sur 40 et recette complète.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst'
), points(order_index, platform_points) AS (
    VALUES
    (0,4),(1,4),(2,4),(3,4),(4,4),(5,4),
    (6,3),(7,3),(8,3),(9,3),(10,2),(11,2)
)
UPDATE public.modules m
SET platform_points = p.platform_points,
    is_published = TRUE
FROM target_course c, points p
WHERE m.course_id = c.id AND m.order_index = p.order_index;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.lessons l SET is_published = TRUE
FROM public.modules m, c
WHERE l.module_id = m.id AND m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.exercises e SET is_published = TRUE FROM c WHERE e.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.theory_resources r SET is_published = TRUE FROM c WHERE r.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.course_projects p SET is_published = TRUE FROM c WHERE p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.course_project_milestones pm SET is_published = TRUE
FROM public.course_projects p, c
WHERE pm.project_id = p.id AND p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'power-bi-data-analyst')
UPDATE public.quiz_questions q SET is_active = TRUE
FROM public.modules m, c
WHERE q.module_id = m.id AND m.course_id = c.id;

UPDATE public.courses
SET is_published = TRUE,
    estimated_hours = 30,
    final_project_title = 'Dashboard de pilotage commercial avec Power BI',
    final_project_description = 'Rapport Power BI actualisable avec Power Query, modèle en étoile, mesures DAX, visualisations interactives, sécurité RLS et recommandations métier.'
WHERE slug = 'power-bi-data-analyst';

DO $$
DECLARE
    module_count INT;
    lesson_count INT;
    exercise_count INT;
    resource_count INT;
    quiz_count INT;
    final_quiz_count INT;
    project_count INT;
    milestone_count INT;
    total_points INT;
    rubric_total INT;
    published_course BOOLEAN;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(platform_points),0)
    INTO module_count, total_points
    FROM public.modules m JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND m.is_published = TRUE;

    SELECT COUNT(*) INTO lesson_count
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND l.is_published = TRUE;

    SELECT COUNT(*) INTO exercise_count
    FROM public.exercises e JOIN public.courses c ON c.id = e.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND e.is_published = TRUE;

    SELECT COUNT(*) INTO resource_count
    FROM public.theory_resources r JOIN public.courses c ON c.id = r.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND r.is_published = TRUE;

    SELECT COUNT(*), COUNT(*) FILTER (WHERE q.is_final_test = TRUE)
    INTO quiz_count, final_quiz_count
    FROM public.quiz_questions q
    JOIN public.modules m ON m.id = q.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND q.is_active = TRUE;

    SELECT COUNT(*) INTO project_count
    FROM public.course_projects p JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND p.is_published = TRUE;

    SELECT COUNT(*) INTO milestone_count
    FROM public.course_project_milestones pm
    JOIN public.course_projects p ON p.id = pm.project_id
    JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'power-bi-data-analyst' AND pm.is_published = TRUE;

    SELECT COALESCE(SUM((item->>'points')::INT),0) INTO rubric_total
    FROM public.course_projects p
    JOIN public.courses c ON c.id = p.course_id,
    LATERAL jsonb_array_elements(p.rubric) item
    WHERE c.slug = 'power-bi-data-analyst';

    SELECT is_published INTO published_course
    FROM public.courses WHERE slug = 'power-bi-data-analyst';

    IF module_count <> 12
       OR lesson_count <> 24
       OR exercise_count <> 12
       OR resource_count <> 12
       OR quiz_count <> 60
       OR final_quiz_count <> 12
       OR project_count <> 1
       OR milestone_count <> 7
       OR total_points <> 40
       OR rubric_total <> 60
       OR published_course IS NOT TRUE THEN
        RAISE EXCEPTION 'Publication Power BI incomplète: modules %, leçons %, exercices %, ressources %, quiz %, quiz finaux %, projets %, jalons %, points plateforme %, barème projet %, publié %',
            module_count, lesson_count, exercise_count, resource_count, quiz_count, final_quiz_count,
            project_count, milestone_count, total_points, rubric_total, published_course;
    END IF;
END $$;
