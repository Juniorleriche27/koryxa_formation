# KORYXA — Variables et SQL avant push

Ce document reflète l’architecture corrigée : le frontend Formation ne porte plus l’auth métier, ne contient plus `SUPABASE_SERVICE_ROLE_KEY`, ne vérifie plus le pont KORYXA Admin et ne manipule plus `formation_access_codes`.

## Architecture cible

```txt
koryxa-admin/apps/web
→ interface admin seulement
→ appelle KORYXA Admin API pour lancer Formation

koryxa-admin/apps/api
→ vérifie Clerk + project_access
→ signe le payload de lancement Formation
→ journalise l’audit

koryxa_formation/backend
→ reçoit le callback signé
→ vérifie la signature
→ crée/retrouve formation_access_codes
→ pose le cookie apprenant
→ expose les endpoints validation/progression/certificats par cookie

koryxa_formation/frontend
→ pages, maintenance, navigation
→ proxy léger vers backend Formation
→ aucun service_role
```

## 1. KORYXA Formation Frontend — Vercel

Projet concerné : `koryxa_formation/frontend`.

Variables autorisées côté frontend Formation :

```env
NEXT_PUBLIC_API_URL=https://api.formation.koryxa.fr
NEXT_PUBLIC_APP_URL=https://formation.koryxa.fr
NEXT_PUBLIC_FORMATION_PUBLIC_URL=https://formation.koryxa.fr
NEXT_PUBLIC_KORYXA_ADMIN_URL=https://admin.koryxa.fr
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-formation>
KORYXA_IDENTITY_BRIDGE_KEY=<meme-secret-que-koryxa-admin-et-partner-portal>
```

Variables à ne pas exposer avec le préfixe `NEXT_PUBLIC_` :

```env
KORYXA_IDENTITY_BRIDGE_KEY
KORYXA_IDENTITY_BRIDGE_KEY
KORYXA_ADMIN_SECRET
```

`SUPABASE_SERVICE_ROLE_KEY` et `KORYXA_IDENTITY_BRIDGE_KEY` restent des variables serveur Vercel. La clé KORYXA Identity doit être strictement identique sur Vercel Formation, Render Formation, KORYXA Admin et Partner Portal.

## 2. KORYXA Formation Backend — Render/API

Projet concerné : `koryxa_formation/backend`.

Variables à ajouter côté backend Formation :

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_KEY=<supabase-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-formation>
SUPABASE_JWT_SECRET=<supabase-jwt-secret>
FRONTEND_URL=https://formation.koryxa.fr
CORS_ORIGINS=https://formation.koryxa.fr,http://localhost:3000
KORYXA_IDENTITY_BRIDGE_KEY=<meme-secret-que-cote-koryxa-admin-api>
KORYXA_IDENTITY_BRIDGE_KEY=<meme-secret-que-koryxa-admin-et-partner-portal>
FORMATION_COOKIE_DOMAIN=.koryxa.fr
COHERE_API_KEY=<cohere-key>
COHERE_MODEL=command-r-08-2024
```

Point critique : le backend Formation doit être accessible sur un domaine compatible cookie, idéalement :

```txt
https://api.formation.koryxa.fr
```

Le callback final attendu sera :

```txt
https://api.formation.koryxa.fr/access/koryxa-admin/callback
```

## 3. KORYXA Admin Web — Vercel

Projet concerné : `koryxa-admin/apps/web`.

Variables côté Admin Web :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<clerk-publishable-key>
CLERK_SECRET_KEY=<clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_KORYXA_ADMIN_API_URL=https://<url-koryxa-admin-api>
NEXT_PUBLIC_APP_URL=https://admin.koryxa.fr
```

Variables à ne plus mettre côté Admin Web :

```env
KORYXA_IDENTITY_BRIDGE_KEY
KORYXA_FORMATION_BRIDGE_CALLBACK_URL
```

Le web Admin ne signe plus le pont. Il appelle l’Admin API.

## 4. KORYXA Admin API — Render/API

Projet concerné : `koryxa-admin/apps/api`.

Variables côté Admin API :

```env
ENVIRONMENT=production
ALLOWED_ORIGINS=https://admin.koryxa.fr,http://localhost:3000
DATABASE_URL=<database-url-koryxa-admin>
CLERK_ISSUER=<clerk-issuer-url>
CLERK_JWKS_URL=<clerk-jwks-url-ou-vide-si-clerk-issuer-suffit>
KORYXA_ADMIN_INGEST_KEY=<cle-audit-si-utilisee>
KORYXA_IDENTITY_BRIDGE_KEY=<meme-secret-que-cote-formation-backend>
KORYXA_FORMATION_BRIDGE_CALLBACK_URL=https://api.formation.koryxa.fr/access/koryxa-admin/callback
```

Point critique : `KORYXA_IDENTITY_BRIDGE_KEY` doit être strictement identique côté Admin API et Formation Backend.

## 5. Migration SQL à jouer dans Supabase Formation

Cette migration doit être jouée sur la base Supabase de `koryxa_formation`, pas sur la base KORYXA Admin.

Chemin repo :

```txt
supabase/migrations/20260621_koryxa_admin_formation_bridge.sql
```

Ne rejoue pas `supabase/schema.sql` sur une base existante. `schema.sql` est le schéma complet, pas la migration de production.

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

1. Configurer variables Formation Frontend.
2. Configurer variables Formation Backend.
3. Configurer variables Admin Web.
4. Configurer variables Admin API.
5. Jouer la migration SQL dans Supabase Formation.
6. Vérifier 5 colonnes + 2 index.
7. Dernier build/test.
8. Push `koryxa_formation`.
9. Push `koryxa-admin`.
10. Déployer.
11. Tester : KORYXA Admin → Admin API → Backend Formation → Dashboard.
