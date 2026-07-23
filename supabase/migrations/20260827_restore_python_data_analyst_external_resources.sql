-- KORYXA FORMATION — RESTAURATION DES RESSOURCES EXTERNES PYTHON DATA ANALYST
-- Ajoute des vidéos YouTube et articles de référence pour les modules 0 à 7.
-- Migration idempotente : les notebooks et datasets existants sont conservés.

WITH target_course AS (
    SELECT id FROM public.courses WHERE slug = 'python-data-analyst'
), resource_seed(module_order, title, type, url, description, order_index) AS (
    VALUES
    (0, 'Python pour débutants — recherche vidéo guidée', 'video', 'https://www.youtube.com/results?search_query=python+debutant+francais+jupyter', 'Sélection de vidéos YouTube pour comprendre Python, Jupyter et la pratique en notebook.', 20),
    (0, 'Tutoriel officiel Python', 'article', 'https://docs.python.org/fr/3/tutorial/', 'Documentation officielle pour revoir les premiers concepts du langage.', 21),

    (1, 'Installer Python, Jupyter et VS Code — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=installer+python+jupyter+vscode+francais', 'Vidéos YouTube consacrées à l’installation et à la configuration de l’environnement Python.', 20),
    (1, 'Environnements virtuels avec venv', 'article', 'https://docs.python.org/fr/3/library/venv.html', 'Référence officielle pour créer et utiliser un environnement virtuel.', 21),

    (2, 'Bases Python pour la Data — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=bases+python+data+analyse+francais', 'Vidéos YouTube sur les variables, conditions, boucles, fonctions et structures Python.', 20),
    (2, 'Structures de données Python', 'article', 'https://docs.python.org/fr/3/tutorial/datastructures.html', 'Documentation officielle sur listes, tuples, dictionnaires et ensembles.', 21),

    (3, 'Pandas et fichiers CSV — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=pandas+csv+tutoriel+francais', 'Vidéos YouTube sur la lecture de CSV et la manipulation de DataFrames avec pandas.', 20),
    (3, 'Guide utilisateur pandas', 'article', 'https://pandas.pydata.org/docs/user_guide/index.html', 'Documentation officielle pandas pour charger, explorer et transformer des données.', 21),

    (4, 'Nettoyage de données avec pandas — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=nettoyage+donnees+pandas+francais', 'Vidéos YouTube sur les valeurs manquantes, doublons, types et formats.', 20),
    (4, 'Valeurs manquantes dans pandas', 'article', 'https://pandas.pydata.org/docs/user_guide/missing_data.html', 'Référence officielle pour détecter et traiter les données manquantes.', 21),

    (5, 'Matplotlib et Seaborn — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=matplotlib+seaborn+tutoriel+francais', 'Vidéos YouTube pour créer et interpréter des visualisations de données.', 20),
    (5, 'Tutoriels officiels Matplotlib', 'article', 'https://matplotlib.org/stable/tutorials/index.html', 'Tutoriels officiels pour construire des graphiques lisibles et professionnels.', 21),

    (6, 'Analyse exploratoire EDA — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=analyse+exploratoire+donnees+EDA+pandas+francais', 'Vidéos YouTube sur les KPI, groupby, distributions, tendances et anomalies.', 20),
    (6, 'GroupBy dans pandas', 'article', 'https://pandas.pydata.org/docs/user_guide/groupby.html', 'Documentation officielle pour agréger et comparer les données par groupe.', 21),

    (7, 'Projet Data Analyst Python — recherche vidéo', 'video', 'https://www.youtube.com/results?search_query=projet+data+analyst+python+pandas+portfolio+francais', 'Vidéos YouTube pour structurer un projet complet et préparer un portfolio.', 20),
    (7, 'Galerie d’exemples pandas', 'article', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html', 'Tutoriels officiels utiles pour finaliser un projet d’analyse de données.', 21)
), target_modules AS (
    SELECT m.id, m.order_index
    FROM public.modules m
    JOIN target_course c ON c.id = m.course_id
    WHERE m.order_index BETWEEN 0 AND 7
)
INSERT INTO public.resources(module_id, title, type, url, description, order_index)
SELECT m.id, r.title, r.type, r.url, r.description, r.order_index
FROM resource_seed r
JOIN target_modules m ON m.order_index = r.module_order
WHERE NOT EXISTS (
    SELECT 1
    FROM public.resources existing
    WHERE existing.module_id = m.id
      AND existing.url = r.url
);

DO $$
DECLARE
    covered_modules INT;
    video_count INT;
    article_count INT;
BEGIN
    SELECT
        COUNT(DISTINCT m.id),
        COUNT(*) FILTER (WHERE r.type = 'video'),
        COUNT(*) FILTER (WHERE r.type = 'article')
    INTO covered_modules, video_count, article_count
    FROM public.modules m
    JOIN public.courses c ON c.id = m.course_id
    JOIN public.resources r ON r.module_id = m.id
    WHERE c.slug = 'python-data-analyst'
      AND m.order_index BETWEEN 0 AND 7;

    IF covered_modules <> 8 OR video_count < 8 OR article_count < 8 THEN
        RAISE EXCEPTION 'Ressources Python Data Analyst incomplètes: modules %, vidéos %, articles %', covered_modules, video_count, article_count;
    END IF;
END $$;
