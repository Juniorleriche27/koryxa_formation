-- KORYXA FORMATION — RESTAURATION DU MOTEUR NOTEBOOK PYTHON DATA ANALYST
-- Rétablit les chemins des notebooks intégrés pour les modules 1 à 7 uniquement.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'python-data-analyst'
), notebook_paths(order_index, notebook_path) AS (
    VALUES
        (1, 'MODULE_1_Bases_Python_Data.ipynb'),
        (2, 'MODULE_2_NumPy_Calcul_Numerique.ipynb'),
        (3, 'MODULE_3_Pandas_Manipulation_Donnees.ipynb'),
        (4, 'MODULE_4_Nettoyage_Donnees.ipynb'),
        (5, 'MODULE_5_Visualisation_Donnees.ipynb'),
        (6, 'MODULE_6_Analyse_Exploratoire_EDA.ipynb'),
        (7, 'MODULE_7_Projet_Final_Professionnel.ipynb')
)
UPDATE public.modules m
SET notebook_path = paths.notebook_path
FROM target_course c, notebook_paths paths
WHERE m.course_id = c.id
  AND m.order_index = paths.order_index;

DO $$
DECLARE
    restored_count INT;
    invalid_count INT;
BEGIN
    SELECT
        COUNT(*) FILTER (WHERE m.notebook_path IS NOT NULL),
        COUNT(*) FILTER (
            WHERE m.notebook_path IS NULL
               OR m.notebook_path NOT LIKE 'MODULE_%\.ipynb' ESCAPE '\'
        )
    INTO restored_count, invalid_count
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    WHERE c.slug = 'python-data-analyst'
      AND m.order_index BETWEEN 1 AND 7;

    IF restored_count <> 7 OR invalid_count <> 0 THEN
        RAISE EXCEPTION 'Restauration notebooks Python Data Analyst incomplète: restaurés %, invalides %', restored_count, invalid_count;
    END IF;
END $$;
