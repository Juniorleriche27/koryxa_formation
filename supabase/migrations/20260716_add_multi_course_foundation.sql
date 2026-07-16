-- ============================================================
-- KORYXA FORMATION — MULTI-PARCOURS FOUNDATION
-- Migration additive et rétrocompatible.
-- Le parcours Python existant reste le parcours par défaut.
-- ============================================================

-- Helper RLS rétrocompatible avec les politiques historiques basées sur profiles.role.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE id = auth.uid()
          AND role = 'admin'
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

CREATE TABLE IF NOT EXISTS public.courses (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug           TEXT NOT NULL UNIQUE,
    title          TEXT NOT NULL,
    short_title    TEXT,
    description    TEXT,
    is_published   BOOLEAN NOT NULL DEFAULT FALSE,
    order_index    INT NOT NULL DEFAULT 0,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.courses (
    id,
    slug,
    title,
    short_title,
    description,
    is_published,
    order_index
)
VALUES (
    '00000000-0000-4000-8000-000000000001',
    'python-data-analyst',
    'Python Data Analyst',
    'Python Data',
    'Parcours professionnel KORYXA pour apprendre l’analyse de données avec Python.',
    TRUE,
    0
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_title = EXCLUDED.short_title,
    description = EXCLUDED.description,
    is_published = TRUE,
    order_index = EXCLUDED.order_index;

INSERT INTO public.courses (
    slug,
    title,
    short_title,
    description,
    is_published,
    order_index
)
VALUES (
    'llm-rag',
    'LLM RAG',
    'LLM RAG',
    'Parcours KORYXA consacré à la conception d’applications LLM enrichies par la recherche documentaire.',
    FALSE,
    1
)
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE public.modules
    ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT;

UPDATE public.modules
SET course_id = (
    SELECT id FROM public.courses WHERE slug = 'python-data-analyst' LIMIT 1
)
WHERE course_id IS NULL;

ALTER TABLE public.modules
    ALTER COLUMN course_id SET DEFAULT '00000000-0000-4000-8000-000000000001',
    ALTER COLUMN course_id SET NOT NULL;

ALTER TABLE public.modules
    DROP CONSTRAINT IF EXISTS modules_order_index_key;

CREATE UNIQUE INDEX IF NOT EXISTS uq_modules_course_order
    ON public.modules(course_id, order_index);

CREATE INDEX IF NOT EXISTS idx_modules_course
    ON public.modules(course_id);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Parcours publiés visibles" ON public.courses;
CREATE POLICY "Parcours publiés visibles"
    ON public.courses
    FOR SELECT
    USING (is_published = TRUE);

DROP POLICY IF EXISTS "Admin gère les parcours" ON public.courses;
CREATE POLICY "Admin gère les parcours"
    ON public.courses
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

COMMENT ON TABLE public.courses IS
    'Catalogue des parcours KORYXA Formation. Le parcours Python historique est conservé comme parcours par défaut.';

COMMENT ON COLUMN public.modules.course_id IS
    'Parcours auquel appartient le module. Les modules historiques sont rattachés à Python Data Analyst.';

ALTER TABLE public.final_projects
    ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT;
UPDATE public.final_projects
SET course_id = '00000000-0000-4000-8000-000000000001'
WHERE course_id IS NULL;
ALTER TABLE public.final_projects
    ALTER COLUMN course_id SET DEFAULT '00000000-0000-4000-8000-000000000001',
    ALTER COLUMN course_id SET NOT NULL;
ALTER TABLE public.final_projects
    DROP CONSTRAINT IF EXISTS final_projects_user_id_key;
CREATE UNIQUE INDEX IF NOT EXISTS uq_final_projects_user_course
    ON public.final_projects(user_id, course_id);

ALTER TABLE public.certification_snapshots
    ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT;
UPDATE public.certification_snapshots
SET course_id = '00000000-0000-4000-8000-000000000001'
WHERE course_id IS NULL;
ALTER TABLE public.certification_snapshots
    ALTER COLUMN course_id SET DEFAULT '00000000-0000-4000-8000-000000000001',
    ALTER COLUMN course_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_certification_snapshots_user_course
    ON public.certification_snapshots(user_id, course_id, calculated_at DESC);

ALTER TABLE public.certificates
    ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT;
UPDATE public.certificates
SET course_id = '00000000-0000-4000-8000-000000000001'
WHERE course_id IS NULL;
ALTER TABLE public.certificates
    ALTER COLUMN course_id SET DEFAULT '00000000-0000-4000-8000-000000000001',
    ALTER COLUMN course_id SET NOT NULL;
ALTER TABLE public.certificates
    DROP CONSTRAINT IF EXISTS certificates_user_id_key;
CREATE UNIQUE INDEX IF NOT EXISTS uq_certificates_user_course
    ON public.certificates(user_id, course_id);

ALTER TABLE public.formation_access_codes
    ADD COLUMN IF NOT EXISTS course_id UUID REFERENCES public.courses(id) ON DELETE RESTRICT;
UPDATE public.formation_access_codes
SET course_id = '00000000-0000-4000-8000-000000000001'
WHERE course_id IS NULL;
ALTER TABLE public.formation_access_codes
    ALTER COLUMN course_id SET DEFAULT '00000000-0000-4000-8000-000000000001',
    ALTER COLUMN course_id SET NOT NULL;
CREATE INDEX IF NOT EXISTS idx_formation_access_codes_course
    ON public.formation_access_codes(course_id);

DROP FUNCTION IF EXISTS public.get_user_completion(UUID);

CREATE OR REPLACE FUNCTION public.get_user_completion(
    p_user_id UUID,
    p_course_id UUID DEFAULT '00000000-0000-4000-8000-000000000001'
)
RETURNS NUMERIC AS $$
DECLARE
    v_total INT;
    v_completed INT;
BEGIN
    SELECT COUNT(*) INTO v_total
    FROM public.modules
    WHERE is_published = TRUE AND course_id = p_course_id;

    SELECT COUNT(*) INTO v_completed
    FROM public.progress p
    JOIN public.modules m ON m.id = p.module_id
    WHERE p.user_id = p_user_id
      AND p.completed = TRUE
      AND m.course_id = p_course_id;

    IF v_total = 0 THEN RETURN 0; END IF;
    RETURN ROUND((v_completed::NUMERIC / v_total) * 100, 1);
END;
$$ LANGUAGE plpgsql;
