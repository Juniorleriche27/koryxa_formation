-- KORYXA FORMATION — ORDERS + PAYMENTS + ENROLLMENTS
-- Additive migration for learner commerce. Historical partner/admin access stays separate.

ALTER TABLE public.courses
    ADD COLUMN IF NOT EXISTS price_amount NUMERIC(12,2),
    ADD COLUMN IF NOT EXISTS price_currency TEXT NOT NULL DEFAULT 'XOF',
    ADD COLUMN IF NOT EXISTS partner_product_slug TEXT;

UPDATE public.courses SET price_amount = 29000, price_currency = 'XOF', partner_product_slug = COALESCE(partner_product_slug, 'formation-python-data') WHERE slug = 'python-data-analyst' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 39000, price_currency = 'XOF' WHERE slug = 'excel-data-analyst' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 49000, price_currency = 'XOF' WHERE slug = 'llm-rag' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 39000, price_currency = 'XOF' WHERE slug = 'sql-data-analyst' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 49000, price_currency = 'XOF' WHERE slug = 'power-bi-data-analyst' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 59000, price_currency = 'XOF' WHERE slug = 'machine-learning-python' AND price_amount IS NULL;
UPDATE public.courses SET price_amount = 69000, price_currency = 'XOF' WHERE slug = 'data-engineering-python-sql' AND price_amount IS NULL;

CREATE TABLE IF NOT EXISTS public.formation_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    learner_email TEXT NOT NULL,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'XOF',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','payment_submitted','paid','failed','cancelled','refunded')),
    payment_method TEXT,
    payment_reference TEXT,
    partner_code TEXT,
    partner_attribution_status TEXT CHECK (partner_attribution_status IN ('pending','synced','failed')),
    partner_attribution_attempted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

CREATE OR REPLACE TRIGGER formation_orders_updated_at
    BEFORE UPDATE ON public.formation_orders
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_formation_orders_user ON public.formation_orders(learner_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_formation_orders_course ON public.formation_orders(course_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_formation_orders_partner ON public.formation_orders(partner_code) WHERE partner_code IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS uq_formation_orders_open_per_course
    ON public.formation_orders(learner_user_id, course_id)
    WHERE status IN ('pending', 'payment_submitted', 'paid');
CREATE UNIQUE INDEX IF NOT EXISTS uq_formation_orders_payment_reference
    ON public.formation_orders(payment_reference)
    WHERE payment_reference IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.formation_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE RESTRICT,
    order_id UUID REFERENCES public.formation_orders(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','expired','revoked','completed')),
    access_source TEXT NOT NULL CHECK (access_source IN ('purchase','partner_benefit','admin_grant','promotion','scholarship','migration')),
    activated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    access_until TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (learner_user_id, course_id)
);

CREATE OR REPLACE TRIGGER formation_enrollments_updated_at
    BEFORE UPDATE ON public.formation_enrollments
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_formation_enrollments_user ON public.formation_enrollments(learner_user_id, status);
CREATE INDEX IF NOT EXISTS idx_formation_enrollments_course ON public.formation_enrollments(course_id, status);
CREATE UNIQUE INDEX IF NOT EXISTS uq_formation_enrollments_order
    ON public.formation_enrollments(order_id)
    WHERE order_id IS NOT NULL;

ALTER TABLE public.formation_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formation_enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Learner reads own formation orders" ON public.formation_orders;
CREATE POLICY "Learner reads own formation orders"
    ON public.formation_orders FOR SELECT
    USING (auth.uid() = learner_user_id);

DROP POLICY IF EXISTS "Learner creates own formation orders" ON public.formation_orders;
CREATE POLICY "Learner creates own formation orders"
    ON public.formation_orders FOR INSERT
    WITH CHECK (auth.uid() = learner_user_id);

DROP POLICY IF EXISTS "Learner reads own formation enrollments" ON public.formation_enrollments;
CREATE POLICY "Learner reads own formation enrollments"
    ON public.formation_enrollments FOR SELECT
    USING (auth.uid() = learner_user_id);

COMMENT ON TABLE public.formation_orders IS 'Commandes apprenant KORYXA Formation. Le partner_code sert uniquement à l attribution commerciale.';
COMMENT ON TABLE public.formation_enrollments IS 'Droits d accès durables liés au compte apprenant et au parcours.';
