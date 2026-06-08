# KORYXA Formation — Déploiement urgence apprenants

## Objectif

Remettre la plateforme en service rapidement avec :

- frontend sur Vercel ;
- backend FastAPI sur Render ;
- nouvelle base Supabase ;
- codes d'accès individuels pour les apprenants ;
- réactivation douce du backend Render gratuit quand un apprenant ouvre le site.

## 1. Supabase

Dans le SQL Editor de la nouvelle base Supabase, rejouer le fichier :

```text
supabase/schema.sql
```

Le schéma crée :

- les profils ;
- les modules ;
- les ressources ;
- la progression ;
- les certificats ;
- la table des codes individuels `formation_access_codes` ;
- la fonction sécurisée de validation des codes.

Après le schéma, créer les deux codes apprenants depuis Supabase SQL Editor en utilisant la fonction `public.sha256_hex(...)`. Les vrais codes ne doivent pas être committés dans GitHub.

## 2. Backend Render

Créer ou reconnecter un service Render depuis le dossier :

```text
backend
```

Render peut utiliser `backend/render.yaml`.

Variables nécessaires côté Render :

```text
SUPABASE_URL
SUPABASE_KEY
SUPABASE_JWT_SECRET
FRONTEND_URL
COHERE_API_KEY
```

`FRONTEND_URL` doit être l'URL publique Vercel du frontend.

Endpoint de santé disponible :

```text
/health
```

## 3. Frontend Vercel

Variables nécessaires côté Vercel :

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_KORYXA_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
KORYXA_FORMATION_ACCESS_SECRET
```

Notes :

- `NEXT_PUBLIC_API_URL` doit pointer vers l'URL Render du backend.
- `NEXT_PUBLIC_APP_URL` doit pointer vers l'URL Vercel de la plateforme formation.
- `NEXT_PUBLIC_SUPABASE_URL` est public.
- `SUPABASE_SERVICE_ROLE_KEY` reste serveur uniquement. Ne jamais l'exposer côté navigateur.
- `KORYXA_FORMATION_ACCESS_SECRET` sert à signer le cookie d'accès. Utiliser une valeur longue et privée.

## 4. Réactivation Render gratuit

Le frontend appelle `/health` quand un apprenant ouvre le site.

Si Render dort, l'utilisateur voit un message clair pendant la réactivation. Tant que la page reste ouverte, le frontend relance un ping léger environ toutes les 8 minutes.

## 5. Vérification rapide

Après déploiement :

1. ouvrir la page publique ;
2. aller sur `/access` ;
3. tester un code apprenant ;
4. vérifier l'accès au dashboard ;
5. ouvrir `/modules` ;
6. vérifier que le backend Render répond sur `/health` ;
7. vérifier dans Supabase que `used_count` évolue pour le code testé.

## 6. Règles sécurité

- Ne jamais mettre de vrais codes apprenants dans GitHub.
- Ne jamais mettre de clés Supabase ou Render dans GitHub.
- Ne jamais partager `SUPABASE_SERVICE_ROLE_KEY` côté frontend client.
- Révoquer un code en mettant `status = 'revoked'` dans Supabase.
