# KORYXA Formation — Déploiement urgence apprenants

## Objectif

Remettre la plateforme en service rapidement avec :

- frontend sur Vercel ;
- backend FastAPI sur Render ;
- nouvelle base Supabase ;
- codes d'accès individuels pour les apprenants ;
- écran admin pour créer, suivre, réactiver et révoquer les codes ;
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

Les vrais codes ne doivent pas être committés dans GitHub. Depuis l'écran `/admin`, les codes sont générés côté serveur, puis seul leur hash est stocké dans Supabase.

## 2. Backend Render

Créer ou reconnecter un service Render depuis le dossier :

```text
backend
```

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

Les routes de cours du backend (`/modules`, `/modules/{id}`, `/modules/{id}/notebook`, `/ai/*`) sont protégées par la barrière d’accès Formation côté frontend. Elles ne dépendent plus de l’ancien token utilisateur externe.

## 3. Frontend Vercel

Variables nécessaires côté Vercel :

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_PARTNER_AUTH_URL
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
KORYXA_FORMATION_ACCESS_SECRET
KORYXA_ADMIN_EMAIL
KORYXA_ADMIN_SECRET
KORYXA_ACCESS_CODE_PREFIX
KORYXA_FORMATION_PARTNER_BRIDGE_SECRET
```

Notes :

- `NEXT_PUBLIC_API_URL` doit pointer vers l'URL Render du backend.
- `NEXT_PUBLIC_APP_URL` doit pointer vers l'URL Vercel de la plateforme formation.
- `NEXT_PUBLIC_SUPABASE_URL` est public.
- `SUPABASE_SERVICE_ROLE_KEY` reste serveur uniquement. Ne jamais l'exposer côté navigateur.
- `KORYXA_FORMATION_ACCESS_SECRET` sert à signer le cookie d'accès apprenant. Utiliser une valeur longue et privée.
- `KORYXA_ADMIN_EMAIL` est l'email autorisé pour ouvrir `/admin`.
- `KORYXA_ADMIN_SECRET` est la clé privée admin à saisir sur `/admin`.
- `KORYXA_ACCESS_CODE_PREFIX` peut être `O` pour générer des codes qui commencent par O.
- `KORYXA_FORMATION_PARTNER_BRIDGE_SECRET` doit être identique sur Vercel Formation et Vercel Partenaire pour signer le lien partenaire → formation.

## 4. Écran admin

URL :

```text
/admin
```

Fonctions disponibles :

- connexion admin par email + clé privée ;
- création d'un code unique pour un apprenant ;
- code généré automatiquement avec le préfixe configuré ;
- affichage du code une seule fois après création ;
- suivi des statuts : actif, utilisé, révoqué, expiré ;
- réactivation d'un code ;
- révocation d'un code.

## 5. Réactivation Render gratuit

Le frontend appelle `/health` quand un apprenant ouvre le site.

Si Render dort, l'utilisateur voit un message clair pendant la réactivation. Tant que la page reste ouverte, le frontend relance un ping léger environ toutes les 8 minutes.

## 6. Vérification rapide

Après déploiement :

1. ouvrir la page publique ;
2. aller sur `/admin` ;
3. se connecter avec l'email admin et la clé admin ;
4. créer un code apprenant ;
5. copier le code généré ;
6. aller sur `/access` ;
7. tester le code ;
8. vérifier l'accès au dashboard ;
9. vérifier dans `/admin` que `used_count` évolue.

## 7. Règles sécurité

- Ne jamais mettre de vrais codes apprenants dans GitHub.
- Ne jamais mettre de clés Supabase ou Render dans GitHub.
- Ne jamais partager `SUPABASE_SERVICE_ROLE_KEY` côté frontend client.
- Ne jamais partager `KORYXA_ADMIN_SECRET` aux apprenants.
- Révoquer un code depuis `/admin` quand l'accès doit être coupé.

Les policies publiques de lecture sur `modules` et `resources` sont volontaires : l’accès apprenant reste contrôlé par le cookie signé Formation côté frontend.

Render doit définir `CORS_ORIGINS=https://formation.innovaplus.africa,https://koryxa-formation-jlr7.vercel.app,https://koryxa-formation.vercel.app,http://localhost:3000` pour autoriser le frontend Formation.

- `NEXT_PUBLIC_PARTNER_AUTH_URL` pointe vers l’inscription/authentification partenaire utilisée par les CTA publics de la landing Formation.
