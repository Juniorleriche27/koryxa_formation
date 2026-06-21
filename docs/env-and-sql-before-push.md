# KORYXA Formation — Variables et SQL avant push

Ce document est le récap opérationnel avant push final. Le push GitHub reste en dernier, après configuration des variables et exécution de la migration SQL.

## 1. KORYXA Formation Frontend — Vercel

Projet concerné : `koryxa_formation/frontend`.

Variables à ajouter côté Vercel Formation :

```env
NEXT_PUBLIC_API_URL=https://<url-backend-formation>
NEXT_PUBLIC_APP_URL=https://formation.koryxa.fr
NEXT_PUBLIC_FORMATION_PUBLIC_URL=https://formation.koryxa.fr
NEXT_PUBLIC_KORYXA_ADMIN_URL=https://admin.koryxa.fr
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-formation>
KORYXA_FORMATION_ACCESS_SECRET=<secret-long-random>
KORYXA_ADMIN_FORMATION_BRIDGE_SECRET=<meme-secret-que-cote-koryxa-admin-web>
```

Variables historiques à ne plus utiliser pour ouvrir l’accès pendant la maintenance :

```env
KORYXA_FORMATION_ACCESS_CODE
KORYXA_ADMIN_EMAIL
KORYXA_ADMIN_SECRET
KORYXA_FORMATION_PARTNER_BRIDGE_SECRET
KORYXA_ACCESS_CODE_PREFIX
```

Elles peuvent rester temporairement si déjà présentes, mais elles ne doivent plus être considérées comme le chemin officiel d’accès.

## 2. KORYXA Formation Backend — Render ou service API

Projet concerné : `koryxa_formation/backend`.

Variables à ajouter côté backend Formation :

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_KEY=<supabase-anon-or-service-key-selon-usage-backend>
SUPABASE_JWT_SECRET=<supabase-jwt-secret>
FRONTEND_URL=https://formation.koryxa.fr
CORS_ORIGINS=https://formation.koryxa.fr,https://formation.innovaplus.africa,https://koryxa-formation-jlr7.vercel.app,https://koryxa-formation.vercel.app,http://localhost:3000
COHERE_API_KEY=<cohere-key>
COHERE_MODEL=command-r-08-2024
```

Point critique : `https://formation.koryxa.fr` doit être présent dans `CORS_ORIGINS`.

## 3. KORYXA Admin Web — Vercel

Projet concerné : `koryxa-admin/apps/web`.

Variables à ajouter côté Vercel Admin :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
CLERK_SECRET_KEY=<clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_KORYXA_ADMIN_API_URL=https://<url-koryxa-admin-api>
KORYXA_FORMATION_PUBLIC_URL=https://formation.koryxa.fr
KORYXA_ADMIN_FORMATION_BRIDGE_SECRET=<meme-secret-que-cote-formation-frontend>
KORYXA_ADMIN_INGEST_KEY=<meme-cle-que-cote-koryxa-admin-api-si-audit-active>
NEXT_PUBLIC_APP_URL=https://admin.koryxa.fr
```

Point critique : `KORYXA_ADMIN_FORMATION_BRIDGE_SECRET` doit être strictement identique côté Admin Web et Formation Frontend.

## 4. KORYXA Admin API — Render ou service API

Projet concerné : `koryxa-admin/apps/api`.

Variables à ajouter côté Admin API :

```env
ENVIRONMENT=production
ALLOWED_ORIGINS=https://admin.koryxa.fr,http://localhost:3000
DATABASE_URL=<database-url-koryxa-admin>
CLERK_ISSUER=<clerk-issuer-url>
CLERK_JWKS_URL=<clerk-jwks-url-ou-vide-si-clerk-issuer-suffit>
KORYXA_ADMIN_INGEST_KEY=<meme-cle-que-cote-admin-web-si-audit-active>
```

Point critique : `DATABASE_URL` doit pointer vers la base KORYXA Admin, pas vers la base Formation.

## 5. Migration SQL à jouer dans Supabase Formation

Cette migration doit être jouée sur la base Supabase de `koryxa_formation`, pas sur la base KORYXA Admin.

Chemin repo :

```txt
supabase/migrations/20260621_koryxa_admin_formation_bridge.sql
```

SQL :

```sql
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
```

## 6. Vérification SQL après exécution

À exécuter dans Supabase SQL Editor après la migration :

```sql
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'formation_access_codes'
  AND column_name IN (
    'koryxa_admin_user_id',
    'koryxa_admin_email',
    'koryxa_admin_name',
    'auth_provider',
    'last_admin_sync_at'
  )
ORDER BY column_name;
```

Résultat attendu : 5 lignes.

Vérifier les index :

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'formation_access_codes'
  AND indexname IN (
    'idx_formation_access_codes_koryxa_admin_user',
    'idx_formation_access_codes_auth_provider'
  )
ORDER BY indexname;
```

Résultat attendu : 2 lignes.

## 7. Ordre final avant push

1. Ajouter les variables Formation Frontend.
2. Ajouter les variables Formation Backend.
3. Ajouter les variables KORYXA Admin Web.
4. Ajouter les variables KORYXA Admin API.
5. Jouer la migration SQL dans Supabase Formation.
6. Exécuter les deux requêtes de vérification SQL.
7. Tester localement ou staging si disponible.
8. Push `koryxa_formation`.
9. Push `koryxa-admin`.
10. Lancer les déploiements.
11. Tester le flux réel : KORYXA Admin → Formation → Dashboard.
