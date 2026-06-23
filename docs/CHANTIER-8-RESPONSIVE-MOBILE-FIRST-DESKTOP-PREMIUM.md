# Chantier 8 — Responsive mobile-first + desktop premium

Date: 2026-06-23
Repo principal: `koryxa_formation`
Page cible: `/`

Objectif: vérifier et renforcer le rendu responsive du landing général après le redesign frontend du chantier 7.

---

## 1. Fichier ajusté

```txt
frontend/components/marketing/KoryxaFormationPortal.tsx
```

Fichier ajouté:

```txt
docs/CHANTIER-8-RESPONSIVE-MOBILE-FIRST-DESKTOP-PREMIUM.md
```

---

## 2. Corrections responsive appliquées

### Ancres avec header fixe

Les sections principales ont reçu un `scroll-mt` pour éviter que les ancres soient masquées par le header sticky.

Sections corrigées:

```txt
#contenu
#formations
#roadmap
#methode
#plateforme
#partenaires
#faq
```

Classes ajoutées:

```txt
scroll-mt-24
lg:scroll-mt-28
```

### Hero mobile

Le H1 mobile a été légèrement ajusté pour mieux respirer sur petits écrans.

Avant:

```txt
text-4xl tracking-[-0.06em]
```

Après:

```txt
text-[2.55rem] tracking-[-0.055em]
```

Objectif:

```txt
meilleure densité visuelle sur 375px
moins de risque de rendu trop comprimé
conservation d'un hero fort
```

---

## 3. Revue par breakpoint

### 375px — mobile standard

Statut attendu:

```txt
OK
```

Points validés par structure:

```txt
- header compact avec menu burger;
- CTA empilés;
- hero sur une colonne;
- visuel Learning OS en pleine largeur;
- cards empilées;
- pas de grilles forcées avant sm/md;
- overflow-x-hidden sur main;
- section padding x-4;
- CTA min-h-12.
```

Points de vigilance:

```txt
- vérifier visuellement la hauteur du HeroLearningVisual;
- vérifier que les textes longs du H1 restent élégants;
- vérifier que les cards du pipeline RAG ne donnent pas une page trop longue.
```

### 768px — tablette

Statut attendu:

```txt
OK
```

Points validés par structure:

```txt
- certaines grilles passent en sm:grid-cols-2;
- les cards catalogue restent lisibles;
- padding sm:px-6 actif;
- header mobile encore actif jusqu'à lg;
- HeroLearningVisual profite de sm:grid-cols interne.
```

### 1024px — laptop / petit desktop

Statut attendu:

```txt
OK
```

Points validés par structure:

```txt
- header desktop actif;
- hero passe en deux colonnes;
- formation phare passe en deux colonnes;
- sections plateforme/partenaire/FAQ utilisent une grille desktop;
- scroll-mt-28 protège les ancres sous header desktop.
```

### 1440px — desktop premium

Statut attendu:

```txt
OK
```

Points validés par structure:

```txt
- max-w-7xl limite la largeur;
- hero deux colonnes stable;
- catalogue en xl:grid-cols-4;
- méthode en xl:grid-cols-4;
- footer en grille;
- sections respirantes avec lg:py-28.
```

---

## 4. Design mobile-first confirmé

Le redesign respecte la logique mobile-first:

```txt
- base en colonne;
- grilles activées progressivement;
- CTA pleine largeur ou empilés sur mobile;
- navigation mobile dédiée;
- sections sans min-h-screen forcé;
- padding progressif;
- textes importants en HTML;
- pas de dépendance à de grandes images externes.
```

---

## 5. Desktop premium confirmé

Le desktop n'est pas seulement un mobile élargi.

Éléments premium desktop:

```txt
- header complet avec navigation;
- hero en deux colonnes;
- visuel Learning OS plus dense;
- carte Python dominante en deux colonnes;
- section LLM/RAG en composition texte + pipeline;
- catalogues en grilles larges;
- footer SEO structuré;
- alternance clair/sombre.
```

---

## 6. Accessibilité responsive

Points conservés:

```txt
- skip link;
- menu mobile avec aria-expanded;
- nav aria-label;
- focus visible global via CSS existant;
- details/summary pour FAQ;
- tailles de boutons suffisantes;
- sections ancrées non masquées par header fixe.
```

---

## 7. Performance responsive

Décisions favorables:

```txt
- aucun GIF lourd;
- aucune vidéo autoplay;
- aucun asset photo externe obligatoire;
- mockups HTML/CSS;
- framer-motion limité à micro-interactions;
- pas de min-h-screen répété;
- overflow-x-hidden au niveau main.
```

---

## 8. Vérifications exécutées

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

### Diff check

```txt
git diff --check
Résultat: OK
```

### Lint

```txt
npm run lint
Résultat: non exploitable actuellement, car Next.js demande une configuration ESLint interactive.
```

---

## 9. Limites restantes

```txt
- Pas de test navigateur réel avec capture 375/768/1024/1440 dans cet environnement.
- Pas de test Lighthouse visuel.
- Pas d'image OpenGraph finale.
- Les assets réels du chantier 6 restent à sélectionner.
```

---

## 10. Décision chantier 8

Le landing est prêt pour une revue visuelle finale et une validation écosystème.

Le prochain chantier recommandé est:

```txt
Chantier 9 — Alignement avec KORYXA Admin et Partner Portal
```

Ce chantier devra vérifier:

```txt
- cohérence des produits affichés;
- cohérence des CTA;
- absence de contradiction avec les produits publiés côté Admin;
- absence de contournement du Partner Portal;
- cohérence des accès Formation.
```
