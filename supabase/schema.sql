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
('Introduction & Installation',        'Mise en place de l''environnement Python, Anaconda et Jupyter Notebook.',          0, '1h00', NULL,                                          TRUE),
('Les Bases de Python pour la Data',   'Variables, types, boucles et fonctions expliqués pas à pas.',                       1, '3h00', 'MODULE_1_Bases_Python_Data.ipynb',           TRUE),
('NumPy : Calcul Numérique',           'Arrays, opérations vectorisées, indexation et slicing.',                            2, '2h30', 'MODULE_2_NumPy_Calcul_Numerique.ipynb',      TRUE),
('Pandas : Manipulation de Données',   'DataFrames, lecture CSV, filtres, tris et groupby.',                                3, '3h00', 'MODULE_3_Pandas_Manipulation_Donnees.ipynb', TRUE),
('Nettoyage de Données',               'Valeurs manquantes, doublons, formats incorrects et outliers.',                     4, '2h30', 'MODULE_4_Nettoyage_Donnees.ipynb',           TRUE),
('Visualisation de Données',           'Graphiques professionnels avec Matplotlib et Seaborn.',                             5, '2h30', 'MODULE_5_Visualisation_Donnees.ipynb',       TRUE),
('Analyse Exploratoire (EDA)',          'Méthodologie complète d''exploration d''un dataset.',                               6, '3h00', 'MODULE_6_Analyse_Exploratoire_EDA.ipynb',    TRUE),
('Projet Final Professionnel',         'Analyse complète des ventes KORYXA de A à Z — ton premier projet portfolio.',       7, '4h00', 'MODULE_7_Projet_Final_Professionnel.ipynb',  TRUE)
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
