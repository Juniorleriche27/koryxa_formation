# Chantier 1 — Cartographie fonctionnelle de l'écosystème KORYXA Formation

Date: 2026-06-23
Repos concernés:

- `koryxa_formation`
- `koryxa-admin`
- `koryxa-partner-portal`

Objectif: comprendre les responsabilités de chaque repo avant tout redesign du landing général, afin de préserver les tunnels réels d'accès, de vente et de distribution partenaire.

---

## 1. Synthèse exécutive

L'écosystème KORYXA Formation repose sur trois rôles distincts:

```txt
koryxa_formation
= vitrine publique + landings dédiées + espace apprenant + accès formation

koryxa-admin
= cockpit central + gouvernance produits + accès + ponts d'authentification

koryxa-partner-portal
= espace partenaire + distribution commerciale + liens de vente + commissions + kits marketing
```

Le landing général de `koryxa_formation` peut être redesigné, mais il ne doit pas être traité comme une page isolée. Il doit rester cohérent avec les produits réellement publiés, les accès attribués par l'admin et les liens distribués par le portail partenaire.

---

## 2. Repo `koryxa_formation`

### Rôle produit

`koryxa_formation` est le site public et l'expérience apprenant.

Il porte:

- le portail général KORYXA Formation;
- les landings dédiées par formation;
- l'accès formation;
- l'espace apprenant;
- les modules, notebooks, QCM, progression et certificat;
- le pont interne permettant à l'admin ou au partner portal d'attribuer/vérifier un accès.

### Pages et fichiers clés

```txt
frontend/app/page.tsx
frontend/components/marketing/KoryxaFormationPortal.tsx
frontend/app/formations/python-data-analyst/page.tsx
frontend/app/access/page.tsx
frontend/app/dashboard/page.tsx
frontend/app/modules/page.tsx
frontend/app/modules/[id]/page.tsx
frontend/app/api/internal/partner-access/route.ts
frontend/lib/formationAccessAdmin.ts
frontend/lib/accessControl.ts
backend/app/routers/modules.py
backend/app/routers/notebook.py
backend/app/routers/validation.py
supabase/schema.sql
```

### Responsabilités exactes

```txt
Visiteur public:
- comprendre KORYXA Formation;
- découvrir les formations disponibles;
- aller vers la landing dédiée d'une formation.

Apprenant:
- accéder à son parcours;
- suivre les modules;
- valider QCM/progression/certificat.

Partenaire avec accès:
- entrer dans sa formation depuis le Partner Portal;
- ne pas utiliser forcément un code manuel.

Admin:
- attribuer ou révoquer un accès formation via l'endpoint interne.
```

### Point sensible

Le repo contient déjà un endpoint interne:

```txt
POST /api/internal/partner-access
```

Il permet à un système serveur autorisé de:

```txt
- vérifier un accès partenaire;
- attribuer un accès;
- révoquer un accès.
```

Cet endpoint dépend d'un secret interne:

```txt
KORYXA_ADMIN_FORMATION_BRIDGE_SECRET
ou KORYXA_FORMATION_INTERNAL_SECRET
ou KORYXA_FORMATION_PARTNER_BRIDGE_SECRET
```

Donc le futur landing ne doit pas inventer un nouveau tunnel d'accès. Il doit respecter cette logique.

---

## 3. Repo `koryxa-admin`

### Rôle produit

`koryxa-admin` est le cockpit central KORYXA.

Il ne remplace pas le site formation et ne remplace pas le Partner Portal. Il pilote l'écosystème.

Il porte:

- la gestion centrale des projets;
- la gestion des accès;
- la gestion des produits partenaires;
- la publication des produits vendables;
- les ressources marketing publiées;
- le pont vers KORYXA Formation;
- le pont vers KORYXA Partner Portal;
- l'authentification centrale via Clerk.

### Structure principale

```txt
apps/web   = interface admin Next.js
apps/api   = API FastAPI centrale
infra/db   = schémas SQL admin
```

### Fichiers clés Formation

```txt
apps/api/app/routers/formation_bridge.py
apps/web/src/app/formation/launch/route.ts
apps/web/src/lib/formation-admin-api.ts
apps/web/src/components/formation/formation-access-control-panel.tsx
```

### Fichiers clés Partner Portal

```txt
apps/api/app/routers/partner_portal_auth.py
apps/web/src/app/partner-portal/launch/route.ts
apps/api/app/services/partner_portal_auth_service.py
```

### Fichiers clés produits partenaires

```txt
apps/api/app/routers/partner_products.py
apps/api/app/services/partner_products_service.py
infra/db/partner_products.sql
apps/web/src/components/dashboard/partner-products-panel.tsx
apps/web/src/components/dashboard/partner-product-action-forms.tsx
```

### Responsabilités exactes

```txt
KORYXA Admin décide:
- quels produits partenaires sont publiés;
- quels produits peuvent être consommés par le Partner Portal;
- quels supports marketing sont publiés;
- quels accès Formation sont attribués aux partenaires;
- quel utilisateur KORYXA peut lancer Formation ou Partner Portal.
```

### Pont Admin → Formation

Le flux observé:

```txt
1. L'utilisateur est connecté dans KORYXA Admin via Clerk.
2. Admin Web appelle Admin API.
3. Admin API vérifie que l'utilisateur a un accès actif au projet `koryxa-formation`.
4. Admin API signe un payload court.
5. L'utilisateur est redirigé vers KORYXA Formation via une URL callback signée.
```

Fichiers:

```txt
apps/web/src/app/formation/launch/route.ts
apps/api/app/routers/formation_bridge.py
```

### Pont Admin → Partner Portal

Le flux observé:

```txt
1. L'utilisateur clique vers le Partner Portal depuis Admin.
2. Admin Web vérifie la session Clerk.
3. Admin API rattache l'utilisateur à `public.koryxa_partners`.
4. Admin API signe un payload court.
5. Partner Portal reçoit le callback et ouvre le dashboard partenaire.
```

Fichiers:

```txt
apps/web/src/app/partner-portal/launch/route.ts
apps/api/app/routers/partner_portal_auth.py
```

### Point sensible

`koryxa-admin` est la source centrale pour les produits partenaires publiés:

```txt
GET /api/v1/partner-products/published
```

Le landing général de Formation ne doit pas présenter comme vendable un produit qui n'est pas encore validé/publié côté Admin, sauf si le wording indique clairement qu'il est en préparation et non disponible à l'achat.

---

## 4. Repo `koryxa-partner-portal`

### Rôle produit

`koryxa-partner-portal` est l'espace des partenaires commerciaux.

Il porte:

- le dashboard partenaire;
- les liens de vente;
- les liens trackés;
- les leads;
- les commissions;
- les demandes de retrait;
- les kits marketing;
- la section `Ma formation KORYXA`;
- le lancement vers KORYXA Formation quand l'accès est attribué.

### Fichiers clés

```txt
src/app/partenaire/dashboard/page.tsx
src/app/partenaire/dashboard/_components/FormationSection.tsx
src/app/partenaire/dashboard/_components/ProductsSection.tsx
src/app/partenaire/dashboard/_components/KitSection.tsx
src/app/api/partners/dashboard/route.ts
src/app/api/formation/access/route.ts
src/app/api/formation/launch/route.ts
src/app/api/partners/koryxa-auth/callback/route.ts
src/lib/formation-access.ts
src/lib/partner-products.ts
src/lib/product-config.ts
```

### Responsabilités exactes

```txt
Le partenaire peut:
- voir ses statistiques;
- copier son lien de vente;
- consulter ses prospects;
- suivre ses commissions;
- utiliser les ressources marketing;
- ouvrir sa formation si son accès est actif.
```

### Consommation des produits Admin

Le Partner Portal peut consommer les produits publiés par KORYXA Admin:

```txt
KORYXA_ADMIN_API_URL
KORYXA_ADMIN_PARTNER_PRODUCTS_SERVICE_KEY
GET {KORYXA_ADMIN_API_URL}/api/v1/partner-products/published
```

Fallback local strictement réel:

```txt
formation-python-data
```

Règle déjà documentée dans le repo: aucun produit fictif, aucun placeholder et aucun `coming soon` inventé ne doit être affiché dans l'interface partenaire.

### Pont Partner Portal → Formation

Le flux observé:

```txt
1. Le partenaire est connecté au dashboard partenaire.
2. Il ouvre la section `Ma formation KORYXA`.
3. Le Partner Portal vérifie son statut d'accès auprès de KORYXA Formation.
4. S'il clique pour ouvrir la formation, le Partner Portal signe un payload partenaire.
5. KORYXA Formation reçoit le payload et ouvre la page d'accès / espace formation.
```

Fichiers:

```txt
src/app/api/formation/access/route.ts
src/app/api/formation/launch/route.ts
src/lib/formation-access.ts
```

---

## 5. Schéma des flux principaux

### Flux public simple

```txt
Visiteur
→ koryxa_formation landing général
→ landing dédiée formation
→ accès / achat / inscription selon tunnel actif
```

### Flux partenaire commercial

```txt
Partenaire
→ koryxa-partner-portal dashboard
→ lien produit tracké
→ visiteur arrive sur landing / assistant / produit
→ lead ou achat
→ commission visible côté partenaire
```

### Flux attribution accès partenaire

```txt
Admin
→ koryxa-admin
→ attribue 2 mois d'accès Formation à un partenaire
→ koryxa_formation crée/met à jour formation_access_codes
→ Partner Portal affiche l'accès actif
→ partenaire ouvre Formation
```

### Flux produits partenaires

```txt
KORYXA Admin
→ crée/publie un produit partenaire réel
→ endpoint /partner-products/published
→ Partner Portal consomme le produit publié
→ dashboard partenaire affiche liens + ressources
```

---

## 6. Implications pour le redesign du landing général

Le futur landing général de `koryxa_formation` doit:

```txt
- rester la porte d'entrée globale des formations;
- présenter les formations validées clairement;
- envoyer vers les landings dédiées;
- éviter les CTA incompatibles avec les tunnels réels;
- ne pas promettre un accès partenaire inexistant;
- ne pas afficher comme vendable un produit non publié côté Admin;
- garder des messages compatibles avec le Partner Portal.
```

### CTA recommandés selon contexte

```txt
Visiteur public:
- Découvrir les formations
- Voir le parcours
- Rejoindre la formation

Formation disponible:
- Voir le parcours
- Accéder / s'inscrire

Formation en préparation:
- Voir le programme prévu
- Être informé
- Pas de bouton d'achat si produit non validé

Partenaire:
- Le CTA d'accès formation doit rester dans Partner Portal ou via le pont existant
```

---

## 7. Risques identifiés

### Risque 1 — Produit affiché mais non publié

Si le landing affiche LLM/RAG comme vendable alors que `koryxa-admin` ne l'a pas publié comme produit partenaire ou formation validée, l'écosystème devient incohérent.

Décision recommandée:

```txt
Afficher LLM/RAG uniquement comme formation en préparation tant que le produit n'est pas validé/publie dans le système commercial.
```

### Risque 2 — CTA qui contourne le Partner Portal

Un partenaire doit continuer à utiliser son espace partenaire pour les liens, la commission et l'accès formation.

Décision recommandée:

```txt
Ne pas créer de nouveau flux partenaire depuis la landing publique sans passer par les routes existantes.
```

### Risque 3 — Landing trop belle mais déconnectée du backend réel

Le redesign doit respecter les accès, le catalogue publié et les liens existants.

Décision recommandée:

```txt
Chaque CTA doit être mappé à une route existante ou à une route explicitement validée avant développement.
```

### Risque 4 — Mélange entre vitrine formation et cockpit admin

La page publique ne doit pas expliquer l'admin interne ni exposer des détails techniques.

Décision recommandée:

```txt
Le landing vend la valeur; Admin garde la gouvernance; Partner Portal garde la distribution commerciale.
```

---

## 8. Décisions de cadrage validées pour la suite

```txt
1. Un seul repo principal pour le site Formation: koryxa_formation.
2. La page générale réunit les formations.
3. Chaque formation garde sa landing dédiée.
4. Les formations ne doivent pas être mélangées dans un même parcours frontend apprenant.
5. KORYXA Admin reste la source de gouvernance produits/accès.
6. Partner Portal reste la source de distribution partenaire.
7. Le redesign du landing général doit préserver les tunnels existants.
```

---

## 9. Matrice de responsabilités

| Sujet | koryxa_formation | koryxa-admin | koryxa-partner-portal |
|---|---|---|---|
| Landing général | Propriétaire | Impact indirect | Impact indirect |
| Landing dédiée formation | Propriétaire | Produit à valider si vendu | Peut pointer via lien produit |
| Espace apprenant | Propriétaire | Accès gouvernés | Accès partenaire vers Formation |
| Attribution accès | Exécute l'accès | Déclenche/contrôle | Lit le statut |
| Produits partenaires | Peut recevoir du trafic | Source centrale | Consomme et distribue |
| Ressources marketing | Non prioritaire public | Source centrale | Affichage partenaire |
| Leads/commissions | Non prioritaire | Gouvernance future | Propriétaire opérationnel |
| Auth centralisée | Consommateur partiel | Source centrale | Consommateur partiel |

---

## 10. Conclusion chantier 1

Le chantier 1 confirme que le redesign du landing général est possible, mais il doit être cadré comme une intervention sur une vitrine connectée à un écosystème.

Le prochain chantier recommandé est:

```txt
Chantier 2 — Audit UX/UI du landing général actuel
```

Avant de coder le redesign, il faudra auditer précisément la page actuelle, puis produire une nouvelle structure éditoriale et SEO.
