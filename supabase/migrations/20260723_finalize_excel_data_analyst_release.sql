-- KORYXA FORMATION — EXCEL DATA ANALYST — CHANTIER 6
-- Publication finale, score plateforme sur 40 et activation complète.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'excel-data-analyst'
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

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.lessons l SET is_published = TRUE
FROM public.modules m, c
WHERE l.module_id = m.id AND m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.exercises e SET is_published = TRUE FROM c WHERE e.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.theory_resources r SET is_published = TRUE FROM c WHERE r.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.course_projects p SET is_published = TRUE FROM c WHERE p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.course_project_milestones pm SET is_published = TRUE
FROM public.course_projects p, c
WHERE pm.project_id = p.id AND p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'excel-data-analyst')
UPDATE public.quiz_questions q SET is_active = TRUE
FROM public.modules m, c
WHERE q.module_id = m.id AND m.course_id = c.id;

UPDATE public.courses
SET is_published = TRUE,
    estimated_hours = 28,
    final_project_title = 'Dashboard d’analyse commerciale avec Excel',
    final_project_description = 'Classeur actualisable avec Power Query, modèle de données, KPI, dashboard interactif et recommandations métier.'
WHERE slug = 'excel-data-analyst';

DO $$
DECLARE
    module_count INT;
    lesson_count INT;
    exercise_count INT;
    quiz_count INT;
    project_count INT;
    total_points INT;
    published_course BOOLEAN;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(platform_points),0)
    INTO module_count, total_points
    FROM public.modules m JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND m.is_published=TRUE;

    SELECT COUNT(*) INTO lesson_count
    FROM public.lessons l JOIN public.modules m ON m.id=l.module_id JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND l.is_published=TRUE;

    SELECT COUNT(*) INTO exercise_count
    FROM public.exercises e JOIN public.courses c ON c.id=e.course_id
    WHERE c.slug='excel-data-analyst' AND e.is_published=TRUE;

    SELECT COUNT(*) INTO quiz_count
    FROM public.quiz_questions q JOIN public.modules m ON m.id=q.module_id JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='excel-data-analyst' AND q.is_active=TRUE;

    SELECT COUNT(*) INTO project_count
    FROM public.course_projects p JOIN public.courses c ON c.id=p.course_id
    WHERE c.slug='excel-data-analyst' AND p.is_published=TRUE;

    SELECT is_published INTO published_course FROM public.courses WHERE slug='excel-data-analyst';

    IF module_count<>12 OR lesson_count<>24 OR exercise_count<>12 OR quiz_count<>60 OR project_count<>1 OR total_points<>40 OR published_course IS NOT TRUE THEN
        RAISE EXCEPTION 'Publication Excel incomplète: modules %, leçons %, exercices %, quiz %, projets %, points %, publié %', module_count, lesson_count, exercise_count, quiz_count, project_count, total_points, published_course;
    END IF;
END $$;
