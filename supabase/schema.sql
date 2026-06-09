-- ============================================================
-- KORYXA FORMATION — DATABASE SCHEMA
-- Supabase PostgreSQL
-- Ce fichier est la source unique de vérité pour la base de données.
-- Pour modifier le schéma : mettre à jour ce fichier et le rejouer.
-- ============================================================


-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    avatar_url  TEXT,
    role        TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Apprenant'),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- MODULES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.modules (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title         TEXT NOT NULL,
    description   TEXT NOT NULL,
    order_index   INT  NOT NULL UNIQUE,
    duration      TEXT,
    notebook_path TEXT,
    is_published  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER modules_updated_at
    BEFORE UPDATE ON public.modules
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_modules_order ON public.modules(order_index);

INSERT INTO public.modules (title, description, order_index, duration, notebook_path, is_published) VALUES
('Démarrage professionnel',           'Orientation, méthode KORYXA, premiers repères Python et préparation au parcours.',  0, '1h00', NULL,                                          TRUE),
('Installation & premier projet Data', 'Anaconda, Jupyter, Colab, VS Code, terminal, venv et mini-projet analyse_ventes.',   1, '3h00', 'MODULE_1_Bases_Python_Data.ipynb',           TRUE),
('Bases Python pour la Data',          'Variables, types, listes, dictionnaires, conditions, boucles et fonctions.',         2, '3h00', 'MODULE_2_NumPy_Calcul_Numerique.ipynb',      TRUE),
('Structures, CSV & premières données','Listes de dictionnaires, fichiers CSV, lecture de données et première introduction Pandas.', 3, '3h00', 'MODULE_3_Pandas_Manipulation_Donnees.ipynb', TRUE),
('Nettoyage de Données',               'Valeurs manquantes, doublons, formats incorrects, types et pipeline de nettoyage.',  4, '2h30', 'MODULE_4_Nettoyage_Donnees.ipynb',           TRUE),
('Visualisation de Données',           'Graphiques avec Matplotlib, choix visuel, interprétation et conclusion business.', 5, '2h30', 'MODULE_5_Visualisation_Donnees.ipynb',       TRUE),
('Analyse Exploratoire (EDA)',          'KPIs, exploration, groupby, tendances et recommandations actionnables.',             6, '3h00', 'MODULE_6_Analyse_Exploratoire_EDA.ipynb',    TRUE),
('Projet Final Professionnel',         'Rapport complet : nettoyage, KPIs, visualisation, conclusions et recommandations.',  7, '4h00', 'MODULE_7_Projet_Final_Professionnel.ipynb',  TRUE)
ON CONFLICT (order_index) DO NOTHING;


-- ============================================================
-- RESOURCES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.resources (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    url         TEXT NOT NULL,
    type        TEXT NOT NULL CHECK (type IN ('video', 'notebook', 'article', 'dataset')),
    description TEXT,
    order_index INT  NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resources_module ON public.resources(module_id);


-- ============================================================
-- PREPARED QUIZ QUESTIONS
-- ============================================================
-- Les QCM sont prepares et versionnes ici. Le bouton "Generer mon quiz"
-- charge une session depuis cette banque, sans appel IA live.

CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id   UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    order_index INT  NOT NULL,
    question    TEXT NOT NULL,
    options     JSONB NOT NULL CHECK (jsonb_typeof(options) = 'array' AND jsonb_array_length(options) = 4),
    answer      TEXT NOT NULL CHECK (answer IN ('A', 'B', 'C', 'D')),
    difficulty  TEXT NOT NULL DEFAULT 'intermediaire' CHECK (difficulty IN ('debutant', 'intermediaire', 'avance')),
    skill       TEXT,
    explanation TEXT NOT NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (module_id, order_index)
);

CREATE OR REPLACE TRIGGER quiz_questions_updated_at
    BEFORE UPDATE ON public.quiz_questions
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_quiz_questions_module
    ON public.quiz_questions(module_id, order_index);

WITH module_topics(order_index, topic, objective, tool, pitfall, outcome) AS (
    VALUES
    (0, 'demarrage professionnel', 'comprendre le role de Python, Jupyter et la methode de travail', 'Jupyter ou Google Colab', 'confondre installation, execution et analyse', 'un environnement pret et les premiers codes executes'),
    (1, 'installation et premier projet data', 'installer les outils et organiser un premier projet data', 'Anaconda, VS Code, terminal et venv', 'travailler sans dossier projet ni environnement isole', 'un projet analyse_ventes structure et reproductible'),
    (2, 'bases Python pour la data', 'maitriser variables, types, conditions, boucles et fonctions', 'Python standard', 'memoriser sans comprendre le flux du code', 'du code Python simple, lisible et testable'),
    (3, 'structures, CSV et premieres donnees', 'representer des donnees, lire des CSV et introduire Pandas', 'csv et pandas', 'confondre structure Python et tableau de donnees', 'des donnees chargees et controlees proprement'),
    (4, 'nettoyage de donnees', 'corriger valeurs manquantes, doublons, types et formats', 'pandas', 'nettoyer sans garder de trace ni verifier les impacts', 'un dataset fiable et pret pour analyse'),
    (5, 'visualisation de donnees', 'choisir des graphiques utiles et raconter une conclusion', 'Matplotlib et Seaborn', 'faire un graphique joli mais sans message', 'des visualisations lisibles et actionnables'),
    (6, 'analyse exploratoire EDA', 'explorer les KPI, tendances, segments et anomalies', 'pandas groupby et visualisation', 'tirer une conclusion sans preuve suffisante', 'des recommandations business fondees sur les donnees'),
    (7, 'projet final professionnel', 'produire un rapport complet avec nettoyage, KPI, graphiques et recommandations', 'notebook projet et dataset ventes', 'livrer des calculs sans conclusion ni priorisation', 'un livrable portfolio clair et defendable')
),
seed AS (
    SELECT
        t.order_index AS module_order,
        q.order_index,
        q.question,
        q.options,
        q.answer,
        q.difficulty,
        q.skill,
        q.explanation
    FROM module_topics t
    CROSS JOIN LATERAL (
        VALUES
        (1,
            'Quel est l''objectif principal du module ' || t.topic || ' ?',
            jsonb_build_array('A) Aller vite sans verifier', 'B) ' || t.objective, 'C) Memoriser tous les raccourcis', 'D) Eviter toute pratique'),
            'B', 'debutant', 'objectif module',
            'Le module vise surtout a construire une competence utilisable : ' || t.objective || '.'),
        (2,
            'Quel outil ou ensemble d''outils est central dans ce module ?',
            jsonb_build_array('A) Uniquement un navigateur web', 'B) ' || t.tool, 'C) Un logiciel de dessin', 'D) Un outil sans lien avec la data'),
            'B', 'debutant', 'outillage',
            'L''outil central est ' || t.tool || ', car il permet de pratiquer le contenu du module.'),
        (3,
            'Quelle erreur doit etre evitee en priorite dans ce module ?',
            jsonb_build_array('A) Documenter les choix', 'B) Tester les resultats', 'C) ' || t.pitfall, 'D) Organiser les fichiers'),
            'C', 'intermediaire', 'erreurs frequentes',
            'Cette erreur fragilise l''apprentissage et rend les resultats moins fiables.'),
        (4,
            'Quel resultat attendu montre que le module est compris ?',
            jsonb_build_array('A) ' || t.outcome, 'B) Une capture d''ecran sans explication', 'C) Un code copie sans execution', 'D) Une conclusion non verifiee'),
            'A', 'debutant', 'resultat attendu',
            'Le bon resultat attendu est concret : ' || t.outcome || '.'),
        (5,
            'Dans une demarche professionnelle, que faut-il faire avant de conclure ?',
            jsonb_build_array('A) Choisir la conclusion la plus rapide', 'B) Verifier les donnees, le code et les resultats', 'C) Supprimer les resultats inattendus', 'D) Ignorer les erreurs'),
            'B', 'intermediaire', 'rigueur analytique',
            'Une conclusion fiable vient apres verification des donnees, du code et des resultats.'),
        (6,
            'Pourquoi une question de depart est-elle importante ?',
            jsonb_build_array('A) Elle evite d''analyser au hasard', 'B) Elle remplace le nettoyage', 'C) Elle supprime le besoin de coder', 'D) Elle garantit automatiquement un bon graphique'),
            'A', 'debutant', 'cadrage',
            'La question de depart oriente les calculs, les graphiques et les conclusions.'),
        (7,
            'Quel choix respecte le mieux une logique de reproductibilite ?',
            jsonb_build_array('A) Garder les etapes dans un notebook clair', 'B) Modifier les donnees a la main sans trace', 'C) Effacer les cellules de verification', 'D) Garder seulement le resultat final'),
            'A', 'intermediaire', 'reproductibilite',
            'Un notebook clair permet de comprendre et refaire les etapes.'),
        (8,
            'Que doit contenir une bonne reponse analytique ?',
            jsonb_build_array('A) Une opinion sans chiffres', 'B) Une observation, une preuve et une interpretation', 'C) Seulement du code', 'D) Seulement un graphique colore'),
            'B', 'intermediaire', 'raisonnement data',
            'Une reponse analytique relie observation, preuve et interpretation.'),
        (9,
            'Quelle attitude est la plus professionnelle face a une erreur ?',
            jsonb_build_array('A) La cacher', 'B) Lire le message, isoler la cause et corriger progressivement', 'C) Relancer au hasard', 'D) Supprimer le fichier'),
            'B', 'debutant', 'debugging',
            'Le debugging consiste a comprendre la cause puis corriger methodiquement.'),
        (10,
            'Quel element rend un livrable plus credible ?',
            jsonb_build_array('A) Des etapes explicites et des resultats verifiables', 'B) Des affirmations tres longues', 'C) Des couleurs nombreuses', 'D) Des fichiers non nommes'),
            'A', 'intermediaire', 'qualite livrable',
            'La credibilite vient des etapes explicites, des preuves et de la verification.'),
        (11,
            'Pourquoi faut-il nommer clairement les variables, fichiers ou sections ?',
            jsonb_build_array('A) Pour rendre le travail lisible et maintenable', 'B) Pour ralentir le projet', 'C) Pour eviter d''executer le code', 'D) Pour masquer les erreurs'),
            'A', 'debutant', 'lisibilite',
            'Des noms clairs facilitent la lecture, la correction et la reprise du travail.'),
        (12,
            'Quel comportement montre une comprehension reelle ?',
            jsonb_build_array('A) Copier sans executer', 'B) Modifier un exemple et expliquer le resultat', 'C) Eviter les exercices', 'D) Memoriser la forme sans le sens'),
            'B', 'intermediaire', 'apprentissage actif',
            'Modifier un exemple et expliquer le resultat prouve que le concept est compris.'),
        (13,
            'Dans le contexte du module, que signifie travailler proprement ?',
            jsonb_build_array('A) Garder les donnees, le code et les notes organises', 'B) Melanger tous les fichiers', 'C) Ne pas sauvegarder', 'D) Ne jamais commenter'),
            'A', 'debutant', 'organisation',
            'Un travail propre facilite la progression et la correction.'),
        (14,
            'Quelle option est la meilleure pour valider une competence ?',
            jsonb_build_array('A) Lire seulement le titre', 'B) Faire un exercice, verifier le resultat et expliquer la demarche', 'C) Passer directement au module suivant', 'D) Regarder le code sans l''executer'),
            'B', 'intermediaire', 'validation competence',
            'Une competence se valide par la pratique, la verification et l''explication.'),
        (15,
            'Pourquoi les distracteurs d''un QCM doivent-ils etre plausibles ?',
            jsonb_build_array('A) Pour tester une vraie comprehension', 'B) Pour rendre la question impossible', 'C) Pour cacher la bonne reponse', 'D) Pour augmenter le hasard'),
            'A', 'avance', 'evaluation',
            'Des distracteurs plausibles distinguent la comprehension d''une simple devinette.'),
        (16,
            'Quel indicateur montre une reponse de qualite internationale ?',
            jsonb_build_array('A) Une seule bonne reponse sans ambiguite', 'B) Plusieurs bonnes reponses cachees', 'C) Une question vague', 'D) Une option humoristique'),
            'A', 'avance', 'standard qcm',
            'Un QCM solide doit etre clair, non ambigu et avoir une seule bonne reponse.'),
        (17,
            'Quelle pratique reduit le risque d''erreur dans ce module ?',
            jsonb_build_array('A) Tester par petites etapes', 'B) Tout faire en une seule fois', 'C) Ignorer les sorties', 'D) Changer plusieurs choses sans controle'),
            'A', 'intermediaire', 'controle qualite',
            'Les petites etapes rendent les erreurs plus faciles a localiser.'),
        (18,
            'Que faut-il faire quand un resultat semble surprenant ?',
            jsonb_build_array('A) Le publier directement', 'B) Verifier la source, le calcul et l''interpretation', 'C) Le supprimer', 'D) Changer la conclusion pour qu''elle plaise'),
            'B', 'avance', 'esprit critique',
            'Un resultat surprenant doit etre verifie avant toute conclusion.'),
        (19,
            'Quelle formulation correspond le mieux a une recommandation professionnelle ?',
            jsonb_build_array('A) Je pense que ca va marcher', 'B) Les donnees montrent X, donc je recommande Y parce que Z', 'C) C''est joli', 'D) On verra plus tard'),
            'B', 'avance', 'recommandation',
            'Une recommandation professionnelle relie preuve, action et justification.'),
        (20,
            'Quelle action finale consolide l''apprentissage du module ?',
            jsonb_build_array('A) Relire, refaire un exemple et noter les points difficiles', 'B) Fermer sans sauvegarder', 'C) Supprimer les essais', 'D) Eviter le quiz'),
            'A', 'debutant', 'consolidation',
            'La consolidation passe par la repetition, la pratique et la trace des difficultes.')
    ) AS q(order_index, question, options, answer, difficulty, skill, explanation)
)
INSERT INTO public.quiz_questions (
    module_id, order_index, question, options, answer, difficulty, skill, explanation, is_active
)
SELECT
    modules.id,
    seed.order_index,
    seed.question,
    seed.options,
    seed.answer,
    seed.difficulty,
    seed.skill,
    seed.explanation,
    TRUE
FROM seed
JOIN public.modules ON modules.order_index = seed.module_order
ON CONFLICT (module_id, order_index) DO UPDATE SET
    question = EXCLUDED.question,
    options = EXCLUDED.options,
    answer = EXCLUDED.answer,
    difficulty = EXCLUDED.difficulty,
    skill = EXCLUDED.skill,
    explanation = EXCLUDED.explanation,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.progress (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id    UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    completed    BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    UNIQUE (user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user   ON public.progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_module ON public.progress(module_id);

CREATE OR REPLACE FUNCTION public.get_user_completion(p_user_id UUID)
RETURNS NUMERIC AS $$
DECLARE
    v_total     INT;
    v_completed INT;
BEGIN
    v_total     := (SELECT COUNT(*) FROM public.modules  WHERE is_published = TRUE);
    v_completed := (SELECT COUNT(*) FROM public.progress WHERE user_id = p_user_id AND completed = TRUE);
    IF v_total = 0 THEN RETURN 0; END IF;
    RETURN ROUND((v_completed::NUMERIC / v_total) * 100, 1);
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- CERTIFICATES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    issued_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    certificate_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);

CREATE OR REPLACE FUNCTION public.check_and_issue_certificate()
RETURNS TRIGGER AS $$
DECLARE
    v_completion NUMERIC;
BEGIN
    v_completion := public.get_user_completion(NEW.user_id);
    IF v_completion = 100 THEN
        INSERT INTO public.certificates (user_id)
        VALUES (NEW.user_id)
        ON CONFLICT (user_id) DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_progress_updated
    AFTER INSERT OR UPDATE ON public.progress
    FOR EACH ROW EXECUTE FUNCTION public.check_and_issue_certificate();


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies idempotentes : on supprime seulement les anciennes policies avant de les recréer.
DROP POLICY IF EXISTS "Profil visible par son propriétaire" ON public.profiles;
DROP POLICY IF EXISTS "Profil modifiable par son propriétaire" ON public.profiles;
DROP POLICY IF EXISTS "Modules visibles par tous les connectés" ON public.modules;
DROP POLICY IF EXISTS "Modules visibles par accès formation" ON public.modules;
DROP POLICY IF EXISTS "Admin gère les modules" ON public.modules;
DROP POLICY IF EXISTS "Ressources visibles par tous les connectés" ON public.resources;
DROP POLICY IF EXISTS "Ressources visibles par accès formation" ON public.resources;
DROP POLICY IF EXISTS "Admin gère les ressources" ON public.resources;
DROP POLICY IF EXISTS "QCM visibles par accès formation" ON public.quiz_questions;
DROP POLICY IF EXISTS "Admin gère les QCM" ON public.quiz_questions;
DROP POLICY IF EXISTS "Progression visible par son propriétaire" ON public.progress;
DROP POLICY IF EXISTS "Progression créée par son propriétaire" ON public.progress;
DROP POLICY IF EXISTS "Progression modifiable par son propriétaire" ON public.progress;
DROP POLICY IF EXISTS "Certificat visible par son propriétaire" ON public.certificates;

-- Profiles
CREATE POLICY "Profil visible par son propriétaire"
    ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profil modifiable par son propriétaire"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Modules
CREATE POLICY "Modules visibles par accès formation"
    ON public.modules FOR SELECT
    USING (is_published = TRUE);
CREATE POLICY "Admin gère les modules"
    ON public.modules FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Resources
CREATE POLICY "Ressources visibles par accès formation"
    ON public.resources FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.modules
            WHERE modules.id = resources.module_id
              AND modules.is_published = TRUE
        )
    );
CREATE POLICY "Admin gère les ressources"
    ON public.resources FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Quiz questions
CREATE POLICY "QCM visibles par accès formation"
    ON public.quiz_questions FOR SELECT
    USING (
        is_active = TRUE
        AND EXISTS (
            SELECT 1 FROM public.modules
            WHERE modules.id = quiz_questions.module_id
              AND modules.is_published = TRUE
        )
    );
CREATE POLICY "Admin gère les QCM"
    ON public.quiz_questions FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Progress
CREATE POLICY "Progression visible par son propriétaire"
    ON public.progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Progression créée par son propriétaire"
    ON public.progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Progression modifiable par son propriétaire"
    ON public.progress FOR UPDATE USING (auth.uid() = user_id);

-- Certificates
CREATE POLICY "Certificat visible par son propriétaire"
    ON public.certificates FOR SELECT USING (auth.uid() = user_id);


-- ============================================================
-- FORMATION ACCESS CODES
-- ============================================================
-- Objectif : donner un code individuel à chaque apprenant sans service externe.
-- Les codes réels ne doivent pas être stockés en clair : on stocke uniquement leur SHA-256.
-- Le frontend appelle une route serveur Next.js qui vérifie/réclame le code avec la clé service role.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.sha256_hex(p_value TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(digest(trim(p_value), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE TABLE IF NOT EXISTS public.formation_access_codes (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code_hash     TEXT NOT NULL UNIQUE,
    student_name  TEXT NOT NULL,
    student_email TEXT,
    label         TEXT,
    status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'revoked', 'expired')),
    max_uses      INT  NOT NULL DEFAULT 1 CHECK (max_uses > 0),
    used_count    INT  NOT NULL DEFAULT 0 CHECK (used_count >= 0),
    first_used_at TIMESTAMPTZ,
    last_used_at  TIMESTAMPTZ,
    expires_at    TIMESTAMPTZ,
    notes         TEXT,
    partner_code  TEXT,
    partner_email TEXT,
    partner_name  TEXT,
    activated_at  TIMESTAMPTZ,
    access_until  TIMESTAMPTZ,
    created_by_admin_email TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.formation_access_codes
    ADD COLUMN IF NOT EXISTS partner_code TEXT,
    ADD COLUMN IF NOT EXISTS partner_email TEXT,
    ADD COLUMN IF NOT EXISTS partner_name TEXT,
    ADD COLUMN IF NOT EXISTS activated_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS access_until TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS created_by_admin_email TEXT;

CREATE OR REPLACE TRIGGER formation_access_codes_updated_at
    BEFORE UPDATE ON public.formation_access_codes
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_formation_access_codes_hash
    ON public.formation_access_codes(code_hash);

CREATE INDEX IF NOT EXISTS idx_formation_access_codes_status
    ON public.formation_access_codes(status);

CREATE INDEX IF NOT EXISTS idx_formation_access_codes_partner
    ON public.formation_access_codes(partner_code);

ALTER TABLE public.formation_access_codes ENABLE ROW LEVEL SECURITY;

-- Pas de policy publique volontairement : cette table est lue uniquement côté serveur
-- avec SUPABASE_SERVICE_ROLE_KEY. Ne jamais exposer la clé service role côté navigateur.

CREATE OR REPLACE FUNCTION public.redeem_formation_access_code(
    p_code_hash TEXT,
    p_partner_code TEXT DEFAULT NULL,
    p_partner_email TEXT DEFAULT NULL,
    p_partner_name TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_code public.formation_access_codes%ROWTYPE;
    v_partner_code TEXT;
    v_partner_email TEXT;
    v_partner_name TEXT;
    v_access_until TIMESTAMPTZ;
BEGIN
    v_partner_code := NULLIF(TRIM(COALESCE(p_partner_code, '')), '');
    v_partner_email := NULLIF(LOWER(TRIM(COALESCE(p_partner_email, ''))), '');
    v_partner_name := NULLIF(TRIM(COALESCE(p_partner_name, '')), '');

    SELECT * INTO v_code
    FROM public.formation_access_codes
    WHERE code_hash = p_code_hash
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'invalid');
    END IF;

    IF v_code.expires_at IS NOT NULL AND v_code.expires_at < NOW() THEN
        UPDATE public.formation_access_codes SET status = 'expired' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'expired');
    END IF;

    IF v_code.access_until IS NOT NULL AND v_code.access_until < NOW() THEN
        UPDATE public.formation_access_codes SET status = 'expired' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'expired');
    END IF;

    IF v_code.status IN ('revoked', 'expired') THEN
        RETURN jsonb_build_object('ok', false, 'reason', v_code.status);
    END IF;

    IF v_code.partner_code IS NOT NULL THEN
        IF v_partner_code IS NULL OR v_code.partner_code <> v_partner_code THEN
            RETURN jsonb_build_object('ok', false, 'reason', 'bound_to_another_partner');
        END IF;

        UPDATE public.formation_access_codes SET last_used_at = NOW()
        WHERE id = v_code.id RETURNING * INTO v_code;

        RETURN jsonb_build_object(
            'ok', true,
            'id', v_code.id,
            'student_name', COALESCE(v_code.student_name, v_code.partner_name),
            'student_email', COALESCE(v_code.student_email, v_code.partner_email),
            'partner_code', v_code.partner_code,
            'partner_email', v_code.partner_email,
            'access_until', v_code.access_until,
            'used_count', v_code.used_count,
            'max_uses', v_code.max_uses
        );
    END IF;

    IF v_code.status <> 'active' THEN
        RETURN jsonb_build_object('ok', false, 'reason', v_code.status);
    END IF;

    IF v_code.used_count >= v_code.max_uses THEN
        UPDATE public.formation_access_codes SET status = 'used' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'used');
    END IF;

    v_access_until := COALESCE(v_code.expires_at, NOW() + INTERVAL '2 months');

    UPDATE public.formation_access_codes
    SET
        used_count = used_count + 1,
        first_used_at = COALESCE(first_used_at, NOW()),
        last_used_at = NOW(),
        activated_at = COALESCE(activated_at, NOW()),
        access_until = COALESCE(access_until, v_access_until),
        partner_code = COALESCE(v_code.partner_code, v_partner_code),
        partner_email = COALESCE(v_code.partner_email, v_partner_email),
        partner_name = COALESCE(v_code.partner_name, v_partner_name),
        status = CASE WHEN v_partner_code IS NOT NULL THEN 'used' WHEN used_count + 1 >= max_uses THEN 'used' ELSE 'active' END
    WHERE id = v_code.id
    RETURNING * INTO v_code;

    RETURN jsonb_build_object(
        'ok', true,
        'id', v_code.id,
        'student_name', COALESCE(v_code.student_name, v_code.partner_name),
        'student_email', COALESCE(v_code.student_email, v_code.partner_email),
        'partner_code', v_code.partner_code,
        'partner_email', v_code.partner_email,
        'access_until', v_code.access_until,
        'used_count', v_code.used_count,
        'max_uses', v_code.max_uses
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) TO service_role;

-- Exemple à exécuter dans Supabase pour créer les codes de juin.
-- Remplace les valeurs O-JUIN-CLIENT-1 / O-JUIN-CLIENT-2 par les vrais codes envoyés aux apprenants.
-- Les vrais codes ne seront pas visibles dans la table : seul le hash sera stocké.
--
-- INSERT INTO public.formation_access_codes (code_hash, student_name, student_email, label, max_uses, expires_at, notes)
-- VALUES
--   (public.sha256_hex('O-JUIN-CLIENT-1'), 'Apprenant 1', 'client1@example.com', 'Juin 2026', 2, '2026-07-31 23:59:59+00', 'Accès formation Python Data'),
--   (public.sha256_hex('O-JUIN-CLIENT-2'), 'Apprenant 2', 'client2@example.com', 'Juin 2026', 2, '2026-07-31 23:59:59+00', 'Accès formation Python Data')
-- ON CONFLICT (code_hash) DO NOTHING;


-- ============================================================
-- KORYXA CERTIFICATION VALIDATION MODEL — CHANTIER 2
-- ============================================================
-- Référence produit : docs/CERTIFICATION_RULES.md
-- Règles structurantes :
-- - Accès plateforme : 2 mois.
-- - Délai certificat : 21 jours minimum après activation, uniquement pour le certificat.
-- - QCM module : validation à partir de 12/20.
-- - Plateforme : 40 points.
-- - Projet final : 60 points.
-- - Réussite : 60/100 minimum.

-- MODULE METADATA / WEIGHTS
ALTER TABLE public.modules
    ADD COLUMN IF NOT EXISTS estimated_hours NUMERIC(5,2),
    ADD COLUMN IF NOT EXISTS platform_points NUMERIC(5,2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS requires_quiz BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS quiz_pass_score INT NOT NULL DEFAULT 12 CHECK (quiz_pass_score BETWEEN 0 AND 20);

UPDATE public.modules SET estimated_hours = 2,  platform_points = 3, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 0;
UPDATE public.modules SET estimated_hours = 6,  platform_points = 7, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 1;
UPDATE public.modules SET estimated_hours = 8,  platform_points = 6, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 2;
UPDATE public.modules SET estimated_hours = 7,  platform_points = 6, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 3;
UPDATE public.modules SET estimated_hours = 7,  platform_points = 6, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 4;
UPDATE public.modules SET estimated_hours = 6,  platform_points = 6, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 5;
UPDATE public.modules SET estimated_hours = 8,  platform_points = 6, requires_quiz = TRUE,  quiz_pass_score = 12 WHERE order_index = 6;
UPDATE public.modules SET estimated_hours = 15, platform_points = 0, requires_quiz = FALSE, quiz_pass_score = 12 WHERE order_index = 7;
UPDATE public.modules SET title = 'Démarrage professionnel', description = 'Orientation, méthode KORYXA, premiers repères Python et préparation au parcours.', duration = '2h' WHERE order_index = 0;
UPDATE public.modules SET title = 'Installation & premier projet Data', description = 'Anaconda, Jupyter, Colab, VS Code, terminal, venv et mini-projet analyse_ventes.', duration = '6h' WHERE order_index = 1;
UPDATE public.modules SET title = 'Bases Python pour la Data', description = 'Variables, types, listes, dictionnaires, conditions, boucles et fonctions.', duration = '8h' WHERE order_index = 2;
UPDATE public.modules SET title = 'Structures, CSV & premières données', description = 'Listes de dictionnaires, fichiers CSV, lecture de données et première introduction Pandas.', duration = '7h' WHERE order_index = 3;
UPDATE public.modules SET title = 'Nettoyage de Données', description = 'Valeurs manquantes, doublons, formats incorrects, types et pipeline de nettoyage.', duration = '7h' WHERE order_index = 4;
UPDATE public.modules SET title = 'Visualisation de Données', description = 'Graphiques avec Matplotlib, choix visuel, interprétation et conclusion business.', duration = '6h' WHERE order_index = 5;
UPDATE public.modules SET title = 'Analyse Exploratoire (EDA)', description = 'KPIs, exploration, groupby, tendances et recommandations actionnables.', duration = '8h' WHERE order_index = 6;
UPDATE public.modules SET title = 'Projet Final Professionnel', description = 'Rapport complet : nettoyage, KPIs, visualisation, conclusions et recommandations.', duration = '12h à 15h' WHERE order_index = 7;

-- PROGRESS EXTENSIONS
ALTER TABLE public.progress
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('locked', 'available', 'in_progress', 'quiz_failed', 'validated')),
    ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS validated_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS quiz_best_score INT CHECK (quiz_best_score BETWEEN 0 AND 20),
    ADD COLUMN IF NOT EXISTS platform_points_awarded NUMERIC(5,2) NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS validation_source TEXT CHECK (validation_source IS NULL OR validation_source IN ('quiz', 'admin', 'system')),
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE OR REPLACE TRIGGER progress_updated_at
    BEFORE UPDATE ON public.progress
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_progress_user_status ON public.progress(user_id, status);
UPDATE public.progress SET status = 'validated', validated_at = COALESCE(validated_at, completed_at, NOW()), validation_source = COALESCE(validation_source, 'system') WHERE completed = TRUE AND status <> 'validated';

-- QUIZ ATTEMPTS
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id       UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    score           INT NOT NULL CHECK (score BETWEEN 0 AND 20),
    max_score       INT NOT NULL DEFAULT 20 CHECK (max_score = 20),
    passed          BOOLEAN NOT NULL DEFAULT FALSE,
    answers         JSONB NOT NULL DEFAULT '{}'::jsonb,
    correct_count   INT CHECK (correct_count IS NULL OR correct_count >= 0),
    total_questions INT CHECK (total_questions IS NULL OR total_questions > 0),
    review_sections JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(review_sections) = 'array'),
    feedback        TEXT,
    attempted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_module
    ON public.quiz_attempts(user_id, module_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_passed
    ON public.quiz_attempts(user_id, module_id, passed);

-- FINAL PROJECT EVALUATION
CREATE TABLE IF NOT EXISTS public.final_projects (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    status           TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'submitted', 'needs_revision', 'graded', 'validated', 'rejected')),
    submission_url   TEXT,
    submission_notes TEXT,
    submitted_at     TIMESTAMPTZ,
    reviewed_at      TIMESTAMPTZ,
    graded_at        TIMESTAMPTZ,
    score_points     NUMERIC(5,2) CHECK (score_points IS NULL OR (score_points >= 0 AND score_points <= 60)),
    feedback         TEXT,
    admin_notes      TEXT,
    reviewed_by      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER final_projects_updated_at
    BEFORE UPDATE ON public.final_projects
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_final_projects_user ON public.final_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_final_projects_status ON public.final_projects(status);

-- CERTIFICATION RULES
CREATE TABLE IF NOT EXISTS public.certification_rules (
    id                         BOOLEAN PRIMARY KEY DEFAULT TRUE CHECK (id = TRUE),
    platform_max_points         NUMERIC(5,2) NOT NULL DEFAULT 40 CHECK (platform_max_points = 40),
    project_max_points          NUMERIC(5,2) NOT NULL DEFAULT 60 CHECK (project_max_points = 60),
    passing_score               NUMERIC(5,2) NOT NULL DEFAULT 60 CHECK (passing_score = 60),
    quiz_pass_score             INT NOT NULL DEFAULT 12 CHECK (quiz_pass_score = 12),
    certificate_min_days        INT NOT NULL DEFAULT 21 CHECK (certificate_min_days = 21),
    platform_access_months      INT NOT NULL DEFAULT 2 CHECK (platform_access_months = 2),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.certification_rules (id)
VALUES (TRUE)
ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- CERTIFICATION SNAPSHOTS
CREATE TABLE IF NOT EXISTS public.certification_snapshots (
    id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    platform_score            NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (platform_score >= 0 AND platform_score <= 40),
    project_score             NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (project_score >= 0 AND project_score <= 60),
    final_score               NUMERIC(5,2) NOT NULL DEFAULT 0 CHECK (final_score >= 0 AND final_score <= 100),
    modules_validated         INT NOT NULL DEFAULT 0 CHECK (modules_validated >= 0),
    modules_required          INT NOT NULL DEFAULT 7 CHECK (modules_required = 7),
    access_activated_at       TIMESTAMPTZ,
    access_until              TIMESTAMPTZ,
    certificate_eligible_from TIMESTAMPTZ,
    is_eligible               BOOLEAN NOT NULL DEFAULT FALSE,
    blocking_reasons          JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(blocking_reasons) = 'array'),
    calculated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certification_snapshots_user
    ON public.certification_snapshots(user_id, calculated_at DESC);

-- ACCESS CODE EXTENSION: 21 DAYS ONLY FOR CERTIFICATE
ALTER TABLE public.formation_access_codes
    ADD COLUMN IF NOT EXISTS certificate_eligible_from TIMESTAMPTZ;

-- CERTIFICATE SCORE TRACE
ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS platform_score NUMERIC(5,2) CHECK (platform_score IS NULL OR (platform_score >= 0 AND platform_score <= 40)),
    ADD COLUMN IF NOT EXISTS project_score NUMERIC(5,2) CHECK (project_score IS NULL OR (project_score >= 0 AND project_score <= 60)),
    ADD COLUMN IF NOT EXISTS final_score NUMERIC(5,2) CHECK (final_score IS NULL OR (final_score >= 0 AND final_score <= 100)),
    ADD COLUMN IF NOT EXISTS eligibility_snapshot JSONB;

-- SECURITY: DO NOT AUTO-ISSUE CERTIFICATES FROM SIMPLE PROGRESS
CREATE OR REPLACE FUNCTION public.check_and_issue_certificate()
RETURNS TRIGGER AS $$
BEGIN
    -- Le certificat ne doit pas être émis automatiquement sur simple progression.
    -- La logique complète sera appliquée par le backend/service : 21 jours minimum,
    -- modules 0 à 6 validés, QCM >= 12/20, projet final noté sur 60,
    -- score final >= 60/100.
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS FOR NEW TABLES
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_snapshots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tentatives QCM visibles par son propriétaire" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Tentatives QCM créées par son propriétaire" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Admin gère les tentatives QCM" ON public.quiz_attempts;
DROP POLICY IF EXISTS "Projet final visible par son propriétaire" ON public.final_projects;
DROP POLICY IF EXISTS "Projet final créé par son propriétaire" ON public.final_projects;
DROP POLICY IF EXISTS "Projet final modifiable par son propriétaire avant correction" ON public.final_projects;
DROP POLICY IF EXISTS "Admin gère les projets finaux" ON public.final_projects;
DROP POLICY IF EXISTS "Règles certification visibles par les connectés" ON public.certification_rules;
DROP POLICY IF EXISTS "Snapshots certification visibles par son propriétaire" ON public.certification_snapshots;
DROP POLICY IF EXISTS "Admin gère les snapshots certification" ON public.certification_snapshots;

CREATE POLICY "Tentatives QCM visibles par son propriétaire"
    ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tentatives QCM créées par son propriétaire"
    ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin gère les tentatives QCM"
    ON public.quiz_attempts FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Projet final visible par son propriétaire"
    ON public.final_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Projet final créé par son propriétaire"
    ON public.final_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Projet final modifiable par son propriétaire avant correction"
    ON public.final_projects FOR UPDATE
    USING (auth.uid() = user_id AND status IN ('not_started', 'submitted', 'needs_revision'));
CREATE POLICY "Admin gère les projets finaux"
    ON public.final_projects FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Règles certification visibles par les connectés"
    ON public.certification_rules FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Snapshots certification visibles par son propriétaire"
    ON public.certification_snapshots FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admin gère les snapshots certification"
    ON public.certification_snapshots FOR ALL
    USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ACCESS CODE RPC UPDATED FOR CERTIFICATE DATE
CREATE OR REPLACE FUNCTION public.redeem_formation_access_code(
    p_code_hash TEXT,
    p_partner_code TEXT DEFAULT NULL,
    p_partner_email TEXT DEFAULT NULL,
    p_partner_name TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_code public.formation_access_codes%ROWTYPE;
    v_partner_code TEXT;
    v_partner_email TEXT;
    v_partner_name TEXT;
    v_access_until TIMESTAMPTZ;
BEGIN
    v_partner_code := NULLIF(TRIM(COALESCE(p_partner_code, '')), '');
    v_partner_email := NULLIF(LOWER(TRIM(COALESCE(p_partner_email, ''))), '');
    v_partner_name := NULLIF(TRIM(COALESCE(p_partner_name, '')), '');

    SELECT * INTO v_code
    FROM public.formation_access_codes
    WHERE code_hash = p_code_hash
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('ok', false, 'reason', 'invalid');
    END IF;

    IF v_code.expires_at IS NOT NULL AND v_code.expires_at < NOW() THEN
        UPDATE public.formation_access_codes SET status = 'expired' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'expired');
    END IF;

    IF v_code.access_until IS NOT NULL AND v_code.access_until < NOW() THEN
        UPDATE public.formation_access_codes SET status = 'expired' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'expired');
    END IF;

    IF v_code.status IN ('revoked', 'expired') THEN
        RETURN jsonb_build_object('ok', false, 'reason', v_code.status);
    END IF;

    IF v_code.partner_code IS NOT NULL THEN
        IF v_partner_code IS NULL OR v_code.partner_code <> v_partner_code THEN
            RETURN jsonb_build_object('ok', false, 'reason', 'bound_to_another_partner');
        END IF;

        UPDATE public.formation_access_codes
        SET last_used_at = NOW(),
            certificate_eligible_from = COALESCE(certificate_eligible_from, COALESCE(activated_at, NOW()) + INTERVAL '21 days')
        WHERE id = v_code.id RETURNING * INTO v_code;

        RETURN jsonb_build_object(
            'ok', true,
            'id', v_code.id,
            'student_name', COALESCE(v_code.student_name, v_code.partner_name),
            'student_email', COALESCE(v_code.student_email, v_code.partner_email),
            'partner_code', v_code.partner_code,
            'partner_email', v_code.partner_email,
            'access_until', v_code.access_until,
            'certificate_eligible_from', v_code.certificate_eligible_from,
            'used_count', v_code.used_count,
            'max_uses', v_code.max_uses
        );
    END IF;

    IF v_code.status <> 'active' THEN
        RETURN jsonb_build_object('ok', false, 'reason', v_code.status);
    END IF;

    IF v_code.used_count >= v_code.max_uses THEN
        UPDATE public.formation_access_codes SET status = 'used' WHERE id = v_code.id;
        RETURN jsonb_build_object('ok', false, 'reason', 'used');
    END IF;

    v_access_until := COALESCE(v_code.expires_at, NOW() + INTERVAL '2 months');

    UPDATE public.formation_access_codes
    SET
        used_count = used_count + 1,
        first_used_at = COALESCE(first_used_at, NOW()),
        last_used_at = NOW(),
        activated_at = COALESCE(activated_at, NOW()),
        access_until = COALESCE(access_until, v_access_until),
        certificate_eligible_from = COALESCE(certificate_eligible_from, COALESCE(activated_at, NOW()) + INTERVAL '21 days'),
        partner_code = COALESCE(v_code.partner_code, v_partner_code),
        partner_email = COALESCE(v_code.partner_email, v_partner_email),
        partner_name = COALESCE(v_code.partner_name, v_partner_name),
        status = CASE WHEN v_partner_code IS NOT NULL THEN 'used' WHEN used_count + 1 >= max_uses THEN 'used' ELSE 'active' END
    WHERE id = v_code.id
    RETURNING * INTO v_code;

    RETURN jsonb_build_object(
        'ok', true,
        'id', v_code.id,
        'student_name', COALESCE(v_code.student_name, v_code.partner_name),
        'student_email', COALESCE(v_code.student_email, v_code.partner_email),
        'partner_code', v_code.partner_code,
        'partner_email', v_code.partner_email,
        'access_until', v_code.access_until,
        'certificate_eligible_from', v_code.certificate_eligible_from,
        'used_count', v_code.used_count,
        'max_uses', v_code.max_uses
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM anon;
REVOKE ALL ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_formation_access_code(TEXT, TEXT, TEXT, TEXT) TO service_role;


-- ============================================================
-- FORMATION ACCESS VALIDATION TABLES — COOKIE SESSION MODEL
-- ============================================================
-- Ces tables respectent la logique produit existante :
-- accès donné depuis l'admin/partenaire -> lien formation -> cookie formation.
-- Elles ne dépendent pas d'un compte auth.users côté apprenant.

CREATE TABLE IF NOT EXISTS public.formation_module_progress (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_code_id           UUID NOT NULL REFERENCES public.formation_access_codes(id) ON DELETE CASCADE,
    module_id                UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    completed                BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at             TIMESTAMPTZ,
    status                   TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('locked', 'available', 'in_progress', 'quiz_failed', 'validated')),
    started_at               TIMESTAMPTZ,
    last_seen_at             TIMESTAMPTZ,
    validated_at             TIMESTAMPTZ,
    quiz_best_score          INT CHECK (quiz_best_score BETWEEN 0 AND 20),
    platform_points_awarded  NUMERIC(5,2) NOT NULL DEFAULT 0,
    validation_source        TEXT CHECK (validation_source IS NULL OR validation_source IN ('quiz', 'admin', 'system')),
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (access_code_id, module_id)
);

CREATE OR REPLACE TRIGGER formation_module_progress_updated_at
    BEFORE UPDATE ON public.formation_module_progress
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_formation_module_progress_access
    ON public.formation_module_progress(access_code_id, status);
CREATE INDEX IF NOT EXISTS idx_formation_module_progress_module
    ON public.formation_module_progress(module_id);

CREATE TABLE IF NOT EXISTS public.formation_quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_code_id  UUID NOT NULL REFERENCES public.formation_access_codes(id) ON DELETE CASCADE,
    module_id       UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    score           INT NOT NULL CHECK (score BETWEEN 0 AND 20),
    max_score       INT NOT NULL DEFAULT 20 CHECK (max_score = 20),
    passed          BOOLEAN NOT NULL DEFAULT FALSE,
    answers         JSONB NOT NULL DEFAULT '{}'::jsonb,
    correct_count   INT CHECK (correct_count IS NULL OR correct_count >= 0),
    total_questions INT CHECK (total_questions IS NULL OR total_questions > 0),
    review_sections JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(review_sections) = 'array'),
    feedback        TEXT,
    attempted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_formation_quiz_attempts_access_module
    ON public.formation_quiz_attempts(access_code_id, module_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_formation_quiz_attempts_passed
    ON public.formation_quiz_attempts(access_code_id, module_id, passed);

ALTER TABLE public.formation_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_quiz_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role gère progression formation" ON public.formation_module_progress;
DROP POLICY IF EXISTS "Service role gère tentatives formation" ON public.formation_quiz_attempts;

CREATE POLICY "Service role gère progression formation"
    ON public.formation_module_progress FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role gère tentatives formation"
    ON public.formation_quiz_attempts FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');


-- ============================================================
-- FORMATION ACCESS PROJECT AND CERTIFICATE TABLES — COOKIE SESSION MODEL
-- ============================================================

CREATE TABLE IF NOT EXISTS public.formation_final_projects (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_code_id   UUID NOT NULL REFERENCES public.formation_access_codes(id) ON DELETE CASCADE UNIQUE,
    status           TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'submitted', 'needs_revision', 'graded', 'validated', 'rejected')),
    submission_url   TEXT,
    submission_notes TEXT,
    submitted_at     TIMESTAMPTZ,
    reviewed_at      TIMESTAMPTZ,
    graded_at        TIMESTAMPTZ,
    score_points     NUMERIC(5,2) CHECK (score_points IS NULL OR (score_points >= 0 AND score_points <= 60)),
    feedback         TEXT,
    admin_notes      TEXT,
    reviewed_by      TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER formation_final_projects_updated_at
    BEFORE UPDATE ON public.formation_final_projects
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_formation_final_projects_access
    ON public.formation_final_projects(access_code_id);
CREATE INDEX IF NOT EXISTS idx_formation_final_projects_status
    ON public.formation_final_projects(status);

CREATE TABLE IF NOT EXISTS public.formation_certificates (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_code_id        UUID NOT NULL REFERENCES public.formation_access_codes(id) ON DELETE CASCADE UNIQUE,
    issued_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    certificate_url       TEXT,
    platform_score        NUMERIC(5,2) CHECK (platform_score IS NULL OR (platform_score >= 0 AND platform_score <= 40)),
    project_score         NUMERIC(5,2) CHECK (project_score IS NULL OR (project_score >= 0 AND project_score <= 60)),
    final_score           NUMERIC(5,2) CHECK (final_score IS NULL OR (final_score >= 0 AND final_score <= 100)),
    eligibility_snapshot  JSONB
);

CREATE INDEX IF NOT EXISTS idx_formation_certificates_access
    ON public.formation_certificates(access_code_id);

ALTER TABLE public.formation_final_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role gère projets finaux formation" ON public.formation_final_projects;
DROP POLICY IF EXISTS "Service role gère certificats formation" ON public.formation_certificates;

CREATE POLICY "Service role gère projets finaux formation"
    ON public.formation_final_projects FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role gère certificats formation"
    ON public.formation_certificates FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
