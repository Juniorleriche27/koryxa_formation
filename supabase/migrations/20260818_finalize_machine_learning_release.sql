-- KORYXA FORMATION — MACHINE LEARNING AVEC PYTHON — CHANTIER 7
-- Intégration plateforme, activation complète et publication Supabase.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'machine-learning-python'
), points(order_index, platform_points) AS (
    VALUES
    (0,4),(1,4),(2,4),(3,4),
    (4,3),(5,3),(6,3),(7,3),(8,3),(9,3),(10,3),(11,3)
)
UPDATE public.modules m
SET platform_points = p.platform_points,
    requires_quiz = TRUE,
    quiz_pass_score = 12,
    is_published = TRUE
FROM target_course c, points p
WHERE m.course_id = c.id
  AND m.order_index = p.order_index;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.lessons l
SET is_published = TRUE
FROM public.modules m, c
WHERE l.module_id = m.id
  AND m.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.exercises e
SET is_published = TRUE
FROM c
WHERE e.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.theory_resources r
SET is_published = TRUE
FROM c
WHERE r.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.course_projects p
SET is_published = TRUE
FROM c
WHERE p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.course_project_milestones pm
SET is_published = TRUE
FROM public.course_projects p, c
WHERE pm.project_id = p.id
  AND p.course_id = c.id;

WITH c AS (SELECT id FROM public.courses WHERE slug = 'machine-learning-python')
UPDATE public.quiz_questions q
SET is_active = TRUE
FROM public.modules m, c
WHERE q.module_id = m.id
  AND m.course_id = c.id;

UPDATE public.courses
SET is_published = TRUE,
    estimated_hours = 60,
    final_project_title = 'Prédiction du churn client avec Python',
    final_project_description = 'Projet autonome estimé à 16 heures : cadrage, audit des données, préparation sans fuite, feature engineering, comparaison de modèles, gestion du déséquilibre, optimisation, interprétabilité, robustesse, model card et recommandations métier responsables.'
WHERE slug = 'machine-learning-python';

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
    course_hours NUMERIC;
    module_hours NUMERIC;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(m.platform_points),0), COALESCE(SUM(m.estimated_hours),0)
    INTO module_count,total_points,module_hours
    FROM public.modules m
    JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='machine-learning-python'
      AND m.is_published=TRUE;

    SELECT COUNT(*) INTO lesson_count
    FROM public.lessons l
    JOIN public.modules m ON m.id=l.module_id
    JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='machine-learning-python'
      AND l.is_published=TRUE;

    SELECT COUNT(*) INTO exercise_count
    FROM public.exercises e
    JOIN public.courses c ON c.id=e.course_id
    WHERE c.slug='machine-learning-python'
      AND e.is_published=TRUE;

    SELECT COUNT(*) INTO resource_count
    FROM public.theory_resources r
    JOIN public.courses c ON c.id=r.course_id
    WHERE c.slug='machine-learning-python'
      AND r.is_published=TRUE;

    SELECT COUNT(*),COUNT(*) FILTER (WHERE q.is_final_test=TRUE)
    INTO quiz_count,final_quiz_count
    FROM public.quiz_questions q
    JOIN public.modules m ON m.id=q.module_id
    JOIN public.courses c ON c.id=m.course_id
    WHERE c.slug='machine-learning-python'
      AND q.is_active=TRUE;

    SELECT COUNT(*) INTO project_count
    FROM public.course_projects p
    JOIN public.courses c ON c.id=p.course_id
    WHERE c.slug='machine-learning-python'
      AND p.is_published=TRUE;

    SELECT COUNT(*) INTO milestone_count
    FROM public.course_project_milestones pm
    JOIN public.course_projects p ON p.id=pm.project_id
    JOIN public.courses c ON c.id=p.course_id
    WHERE c.slug='machine-learning-python'
      AND pm.is_published=TRUE;

    SELECT COALESCE(SUM((item->>'points')::INT),0)
    INTO rubric_total
    FROM public.course_projects p
    JOIN public.courses c ON c.id=p.course_id,
    LATERAL jsonb_array_elements(p.rubric) item
    WHERE c.slug='machine-learning-python';

    SELECT is_published,estimated_hours
    INTO published_course,course_hours
    FROM public.courses
    WHERE slug='machine-learning-python';

    IF module_count<>12
       OR lesson_count<>24
       OR exercise_count<>12
       OR resource_count<>12
       OR quiz_count<>60
       OR final_quiz_count<>12
       OR project_count<>1
       OR milestone_count<>10
       OR total_points<>40
       OR rubric_total<>60
       OR module_hours<>44
       OR course_hours<>60
       OR published_course IS NOT TRUE THEN
        RAISE EXCEPTION 'Publication Machine Learning incomplète: modules %, leçons %, exercices %, ressources %, quiz %, quiz finaux %, projets %, jalons %, points %, barème %, heures modules %, heures cours %, publié %',
            module_count,lesson_count,exercise_count,resource_count,quiz_count,final_quiz_count,
            project_count,milestone_count,total_points,rubric_total,module_hours,course_hours,published_course;
    END IF;
END $$;
