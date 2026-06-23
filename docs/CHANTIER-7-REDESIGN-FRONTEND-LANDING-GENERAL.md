# Chantier 7 — Redesign frontend complet du landing général

Date: 2026-06-23
Repo principal: `koryxa_formation`
Page cible: `/`

Objectif: intégrer le nouveau landing général KORYXA Formation selon les décisions des chantiers 1 à 6: stratégie produit, copywriting SEO, direction artistique premium 2026 et préparation des assets.

---

## 1. Fichiers modifiés

```txt
frontend/components/marketing/KoryxaFormationPortal.tsx
frontend/app/page.tsx
```

Fichier ajouté:

```txt
docs/CHANTIER-7-REDESIGN-FRONTEND-LANDING-GENERAL.md
```

---

## 2. Direction frontend intégrée

Direction retenue:

```txt
KORYXA Learning OS — Clean Tech Human Premium
```

Le design abandonne le full dark générique au profit d'une alternance:

```txt
fond clair premium
sections blanches
section sombre stratégique pour LLM/RAG
CTA sombres/emerald
cartes bento
mockups HTML/CSS
micro-animations framer-motion
```

---

## 3. Nouvelle structure du landing

La page contient maintenant:

```txt
1. Header premium responsive
2. Hero 2 colonnes desktop / mobile-first
3. Bande de crédibilité
4. Formation phare Python Data Analyst
5. Section LLM/RAG en préparation avancée
6. Catalogue contrôlé
7. Méthode KORYXA
8. Aperçu plateforme apprenant
9. Section Pour qui
10. Section partenaires prudente
11. FAQ
12. CTA final
13. Footer SEO enrichi
```

---

## 4. Composants frontend créés dans le fichier marketing

```txt
Header
HeroLearningVisual
CredibilityStrip
FeaturedFormation
UpcomingRagSection
CatalogSection
MethodSection
PlatformSection
AudienceSection
PartnerSection
FAQSection
FinalCTA
FooterSEO
```

Ces composants restent dans `KoryxaFormationPortal.tsx` pour éviter de disperser trop tôt le chantier. Une extraction en fichiers séparés pourra se faire après stabilisation.

---

## 5. Mobile-first et desktop premium

### Mobile

```txt
- header compact avec menu drawer;
- H1 lisible;
- CTA visibles rapidement;
- cartes empilées;
- pas de min-h-screen répété;
- sections py-16/py-20;
- targets tactiles minimum 44px;
- aucun asset image externe obligatoire.
```

### Desktop

```txt
- hero en deux colonnes;
- visuel Learning OS plus riche;
- carte Python Data Analyst dominante;
- section LLM/RAG premium sombre;
- catalogue en grille;
- footer SEO structuré.
```

---

## 6. Règles produit respectées

```txt
Python Data Analyst:
- formation disponible;
- prix affiché: 29 000 FCFA;
- CTA commercial: Voir le parcours;
- lien: /formations/python-data-analyst.

LLM/RAG Chatbot IA:
- statut: En préparation avancée;
- aucun prix;
- aucun bouton acheter;
- CTA prudent vers #roadmap.

Assistant IA / Automatisation IA:
- statut roadmap;
- pas de prix;
- pas de CTA commercial.

Partenaires:
- mention informative;
- pas de remplacement du Partner Portal;
- pas de tunnel partenaire nouveau.
```

---

## 7. SEO intégré

`frontend/app/page.tsx` a été mis à jour avec:

```txt
- title SEO;
- description SEO;
- keywords;
- canonical;
- OpenGraph;
- Twitter card;
- EducationalOrganization JSON-LD;
- OfferCatalog JSON-LD prudent;
- FAQPage JSON-LD.
```

Règle respectée:

```txt
Le JSON-LD catalogue ne déclare comme formation exploitable que Python Data Analyst.
```

---

## 8. Accessibilité intégrée

```txt
- skip link vers le contenu;
- navigation aria-label;
- bouton menu avec aria-label et aria-expanded;
- contrastes plus lisibles grâce au fond clair;
- FAQ en details/summary natif;
- CTA de hauteur suffisante;
- prix et textes importants en HTML, pas dans image.
```

---

## 9. Assets

Le redesign ne dépend pas d'images tierces non validées.

Décision:

```txt
Utiliser des mockups HTML/CSS pour la première version.
```

Avantages:

```txt
- pas de problème de licence;
- pas de fichier lourd;
- pas de logo tiers visible;
- rendu cohérent avec l'identité KORYXA;
- remplacement facile par images finales plus tard.
```

---

## 10. Vérifications exécutées

### TypeScript

```txt
npx tsc --noEmit
Résultat: OK
```

### Build production

```txt
npm run build
Résultat: OK
```

### Lint

```txt
npm run lint
Résultat: non exploitable car Next.js demande une configuration ESLint interactive.
```

Le build Next.js a quand même compilé la page, vérifié les types et généré les routes avec succès.

---

## 11. Limites restantes

```txt
- Les images finales du chantier 6 ne sont pas encore intégrées.
- L'image OpenGraph finale n'est pas encore créée.
- La route /formations/llm-rag-chatbot n'existe pas encore.
- Les composants pourront être extraits plus tard pour améliorer la maintenabilité.
- Le lint doit être configuré explicitement si l'équipe veut une commande non interactive.
```

---

## 12. Prochaine étape recommandée

```txt
Chantier 8 — Responsive mobile-first + desktop premium
```

Même si le chantier 7 a été codé mobile-first, le chantier 8 devra faire la revue détaillée:

```txt
- 375px;
- 768px;
- 1024px;
- 1440px;
- navigation mobile;
- lisibilité;
- sections longues;
- CTA;
- performance visuelle;
- corrections responsive finales.
```
