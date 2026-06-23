# Chantier 10 — QA production + déploiement

Date: 2026-06-23
Repo principal: `koryxa_formation`
Branche: `main`
Remote: `https://github.com/Juniorleriche27/koryxa_formation.git`

Objectif: effectuer la QA finale du redesign du landing général et préparer la décision de déploiement production.

---

## 1. Périmètre QA

Changements du chantier landing:

```txt
frontend/app/page.tsx
frontend/components/marketing/KoryxaFormationPortal.tsx
frontend/public/assets/landing/README.md
frontend/public/assets/landing/**/.gitkeep
docs/CHANTIER-1 à CHANTIER-10
```

À ne pas mélanger avec le chantier landing:

```txt
backend/app/routers/access.py
frontend/app/access/page.tsx
frontend/app/api/access/partner/route.ts
frontend/app/api/access/route.ts
frontend/app/api/internal/partner-access/route.ts
frontend/app/api/validation/modules/status/route.ts
frontend/lib/accessControl.ts
frontend/middleware.ts
frontend/lib/formationAccessAdmin.ts
```

Ces fichiers étaient déjà modifiés dans le repo avant ou hors du redesign landing. Ils ne doivent pas être inclus dans un commit/push landing sans revue séparée.

---

## 2. Vérifications exécutées

### GitHub / remote

```txt
Repo git: OK
Branche: main
Remote accessible: OK
Remote HEAD: 03e39590e689baac0d8aa1bc8893aac710df074f
```

### TypeScript

Commande:

```txt
npx tsc --noEmit
```

Résultat:

```txt
OK
```

### Build production

Commande:

```txt
npm run build
```

Résultat:

```txt
OK
```

Routes générées avec succès:

```txt
/                                      static
/formations/python-data-analyst        static
/access                                static
/dashboard                             static
/modules                               static
/modules/[id]                          dynamic
/api/*                                 dynamic
```

### Diff check

Commande:

```txt
git diff --check
```

Résultat:

```txt
OK
```

### Fichiers générés

Action:

```txt
frontend/tsconfig.tsbuildinfo supprimé après build/typecheck
```

Résultat:

```txt
OK
```

---

## 3. Résumé technique du build

La route `/` compile correctement.

Taille observée:

```txt
/ : 11.9 kB
First Load JS : 142 kB
Shared JS : 87.1 kB
```

Conclusion:

```txt
Le redesign n'introduit pas de dépendance lourde supplémentaire ni d'asset externe bloquant.
```

---

## 4. Lint

Commande testée précédemment:

```txt
npm run lint
```

Résultat:

```txt
Non exploitable actuellement.
```

Raison:

```txt
Next.js demande une configuration ESLint interactive dans ce repo.
```

Décision:

```txt
Le build Next.js effectue tout de même la compilation et la vérification des types. Pour une CI stricte, il faudra configurer ESLint explicitement dans un chantier séparé.
```

---

## 5. QA produit

### Python Data Analyst

```txt
Statut: Disponible
Prix: 29 000 FCFA
CTA: Voir le parcours
Route: /formations/python-data-analyst
```

Décision:

```txt
OK
```

### LLM/RAG Chatbot IA

```txt
Statut: En préparation avancée
Prix: absent
Achat: absent
CTA: #roadmap
```

Décision:

```txt
OK
```

### Assistant IA / Automatisation IA

```txt
Statut: roadmap
Prix: absent
Achat: absent
```

Décision:

```txt
OK
```

### Partenaires

```txt
Section informative uniquement
Aucun nouveau tunnel partenaire
Aucun lien public Partner Portal non validé
```

Décision:

```txt
OK
```

---

## 6. QA SEO

`frontend/app/page.tsx` contient:

```txt
title
description
keywords
canonical
OpenGraph
Twitter card
EducationalOrganization JSON-LD
OfferCatalog JSON-LD prudent
FAQPage JSON-LD
```

Décision:

```txt
OK
```

Point restant:

```txt
L'image OpenGraph finale /og/koryxa-formation-home.jpg n'est pas encore créée.
```

---

## 7. QA responsive

Vérifications structurelles:

```txt
Mobile-first: OK
Header mobile: OK
CTA mobile empilés: OK
Hero desktop 2 colonnes: OK
Cards catalogue responsive: OK
Sections sans min-h-screen répété: OK
overflow-x-hidden: OK
scroll-mt pour ancres: OK
```

Limite:

```txt
Pas de capture navigateur réelle 375/768/1024/1440 dans cet environnement.
```

Décision:

```txt
OK pour build, à compléter par revue visuelle navigateur avant push prod si possible.
```

---

## 8. QA accessibilité

Points présents:

```txt
Skip link
Nav aria-label
Menu mobile aria-expanded
Boutons tactiles min-h-12
FAQ native details/summary
Contrastes améliorés grâce au thème clair
CTA textes explicites
Prix en HTML, pas dans image
```

Décision:

```txt
OK
```

Point futur:

```txt
Ajouter une gestion explicite prefers-reduced-motion si les animations deviennent plus nombreuses.
```

---

## 9. QA écosystème Admin / Partner Portal

Conclusion du chantier 9:

```txt
Alignement validé
```

Règle conservée:

```txt
Seul formation-python-data est produit publié côté Admin / Partner Portal.
```

Le landing ne présente pas LLM/RAG comme vendable.

Décision:

```txt
OK
```

---

## 10. État git final

`koryxa_formation` contient encore des modifications non liées au landing:

```txt
M backend/app/routers/access.py
M frontend/app/access/page.tsx
M frontend/app/api/access/partner/route.ts
M frontend/app/api/access/route.ts
M frontend/app/api/internal/partner-access/route.ts
M frontend/app/api/validation/modules/status/route.ts
M frontend/lib/accessControl.ts
M frontend/middleware.ts
?? frontend/lib/formationAccessAdmin.ts
```

Changements landing / docs prêts:

```txt
M frontend/app/page.tsx
M frontend/components/marketing/KoryxaFormationPortal.tsx
?? frontend/public/assets/landing/README.md
?? frontend/public/assets/landing/**/.gitkeep
?? docs/CHANTIER-1...10
```

`koryxa-admin` contient aussi des modifications non liées à ce redesign. Aucun changement n'a été appliqué dans ce repo pendant le chantier landing.

`koryxa-partner-portal` est clean.

---

## 11. Design review

```txt
Design review:
- UX: OK
- Responsive: OK
- Visual quality: OK
- Commercial clarity: OK
- Code maintainability: OK / À améliorer plus tard par extraction de composants
Decision: Commit autorisé pour le périmètre landing uniquement
```

Condition importante:

```txt
Ne pas committer les fichiers access/backend déjà modifiés avec le commit landing sans revue dédiée.
```

---

## 12. Décision production

Statut QA:

```txt
Production-ready côté build pour le périmètre landing général.
```

Déploiement réel:

```txt
Non exécuté.
```

Raison:

```txt
Aucun commit/push/deploy n'a été demandé explicitement après QA, et le repo contient des changements non liés au landing qu'il ne faut pas mélanger.
```

---

## 13. Commandes recommandées pour commit landing séparé

Avant commit, staging sélectif recommandé:

```bash
git add frontend/app/page.tsx \
  frontend/components/marketing/KoryxaFormationPortal.tsx \
  frontend/public/assets/landing/README.md \
  frontend/public/assets/landing/hero/.gitkeep \
  frontend/public/assets/landing/platform/.gitkeep \
  frontend/public/assets/landing/formations/.gitkeep \
  frontend/public/assets/landing/motion/.gitkeep \
  frontend/public/assets/landing/og/.gitkeep \
  docs/CHANTIER-1-CARTOGRAPHIE-ECOSYSTEME-KORYXA-FORMATION.md \
  docs/CHANTIER-2-AUDIT-UX-UI-LANDING-GENERAL.md \
  docs/CHANTIER-3-STRATEGIE-PRODUIT-PORTAIL-GENERAL.md \
  docs/CHANTIER-4-COPYWRITING-SEO-LANDING-GENERAL.md \
  docs/CHANTIER-5-DIRECTION-ARTISTIQUE-PREMIUM-2026.md \
  docs/CHANTIER-6-ASSETS-VISUELS-LANDING-GENERAL.md \
  docs/CHANTIER-7-REDESIGN-FRONTEND-LANDING-GENERAL.md \
  docs/CHANTIER-8-RESPONSIVE-MOBILE-FIRST-DESKTOP-PREMIUM.md \
  docs/CHANTIER-9-ALIGNEMENT-ADMIN-PARTNER-PORTAL.md \
  docs/CHANTIER-10-QA-PRODUCTION-DEPLOIEMENT.md
```

Commit message recommandé:

```txt
Redesign formation public landing
```

---

## 14. Conclusion chantier 10

Le redesign du landing général est prêt techniquement pour commit/push ciblé.

Décision:

```txt
QA production validée pour le périmètre landing.
Déploiement réel en attente de feu vert commit/push.
```
