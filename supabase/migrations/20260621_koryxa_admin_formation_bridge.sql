-- ============================================================
-- KORYXA FORMATION — KORYXA ADMIN BRIDGE MIGRATION
-- Objectif : relier l'identité KORYXA Admin aux accès formation
-- sans supprimer les codes existants, partner_code, quiz, progression,
-- projets finaux ou certificats.
-- ============================================================

ALTER TABLE public.formation_access_codes
    ADD COLUMN IF NOT EXISTS koryxa_admin_user_id TEXT,
    ADD COLUMN IF NOT EXISTS koryxa_admin_email TEXT,
    ADD COLUMN IF NOT EXISTS koryxa_admin_name TEXT,
    ADD COLUMN IF NOT EXISTS auth_provider TEXT NOT NULL DEFAULT 'formation_code',
    ADD COLUMN IF NOT EXISTS last_admin_sync_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_formation_access_codes_koryxa_admin_user
    ON public.formation_access_codes(koryxa_admin_user_id);

CREATE INDEX IF NOT EXISTS idx_formation_access_codes_auth_provider
    ON public.formation_access_codes(auth_provider);

COMMENT ON COLUMN public.formation_access_codes.koryxa_admin_user_id IS
    'Clerk user id côté KORYXA Admin, utilisé pour créer/retrouver l’accès formation.';

COMMENT ON COLUMN public.formation_access_codes.auth_provider IS
    'Origine principale de l’accès : formation_code, partner_bridge, koryxa_admin.';
