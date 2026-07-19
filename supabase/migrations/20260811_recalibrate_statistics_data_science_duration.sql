-- KORYXA FORMATION — STATISTIQUES & DATA SCIENCE AVEC PYTHON — RECALIBRAGE DURÉE
-- La durée affichée représente la charge apprenant complète : cours, pratique guidée,
-- quiz et projet final autonome. Aucun accompagnement humain synchrone n'est inclus.

WITH target_course AS (
    SELECT id
    FROM public.courses
    WHERE slug = 'statistics-data-science-python'
), workload(order_index, duration_label, module_hours) AS (
    VALUES
        (0,  '2h30', 2.5),
        (1,  '3h00', 3.0),
        (2,  '3h00', 3.0),
        (3,  '3h00', 3.0),
        (4,  '3h00', 3.0),
        (5,  '3h30', 3.5),
        (6,  '3h30', 3.5),
        (7,  '4h00', 4.0),
        (8,  '4h00', 4.0),
        (9,  '4h30', 4.5),
        (10, '4h00', 4.0),
        (11, '4h00', 4.0)
)
UPDATE public.modules m
SET duration = w.duration_label,
    estimated_hours = w.module_hours
FROM target_course c, workload w
WHERE m.course_id = c.id
  AND m.order_index = w.order_index;

UPDATE public.courses
SET estimated_hours = 62,
    final_project_description = 'Projet autonome estimé à 20 heures : préparation et audit des données, analyse statistique, segmentation KMeans, prévision temporelle, évaluation des modèles, notebook reproductible et recommandations métier responsables.'
WHERE slug = 'statistics-data-science-python';

DO $$
DECLARE
    module_count INT;
    module_hours NUMERIC;
    lesson_count INT;
    lesson_minutes INT;
    project_count INT;
    milestone_count INT;
    course_hours NUMERIC;
    project_description TEXT;
BEGIN
    SELECT COUNT(*), COALESCE(SUM(m.estimated_hours), 0)
    INTO module_count, module_hours
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python';

    SELECT COUNT(*), COALESCE(SUM(l.estimated_minutes), 0)
    INTO lesson_count, lesson_minutes
    FROM public.lessons l
    JOIN public.modules m ON m.id = l.module_id
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'statistics-data-science-python';

    SELECT COUNT(*) INTO project_count
    FROM public.course_projects p
    JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'statistics-data-science-python';

    SELECT COUNT(*) INTO milestone_count
    FROM public.course_project_milestones pm
    JOIN public.course_projects p ON p.id = pm.project_id
    JOIN public.courses c ON c.id = p.course_id
    WHERE c.slug = 'statistics-data-science-python';

    SELECT estimated_hours, final_project_description
    INTO course_hours, project_description
    FROM public.courses
    WHERE slug = 'statistics-data-science-python';

    IF module_count <> 12
       OR module_hours <> 42
       OR lesson_count <> 24
       OR lesson_minutes <> 1680
       OR project_count <> 1
       OR milestone_count <> 7
       OR course_hours <> 62
       OR project_description NOT LIKE '%20 heures%' THEN
        RAISE EXCEPTION 'Durée Statistiques incohérente: modules %, heures modules %, leçons %, minutes leçons %, projets %, jalons %, heures parcours %, description projet %',
            module_count, module_hours, lesson_count, lesson_minutes,
            project_count, milestone_count, course_hours, project_description;
    END IF;
END $$;
