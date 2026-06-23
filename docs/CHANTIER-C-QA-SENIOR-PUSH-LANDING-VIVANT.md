# Chantier 3 — QA senior design + responsive + push

Date: 2026-06-23
Repo: `koryxa_formation`
Page cible: `/`

Objectif: vérifier la refonte vivante du landing KORYXA Formation, préparer le commit et pousser sur `main`.

---

## 1. Périmètre du chantier

Fichiers frontend:

```txt
frontend/app/page.tsx
frontend/components/marketing/KoryxaFormationPortal.tsx
```

Assets:

```txt
frontend/public/assets/landing/ASSET-SOURCES.md
frontend/public/assets/landing/hero/koryxa-learning-hero.jpg
frontend/public/assets/landing/hero/koryxa-modern-office.jpg
frontend/public/assets/landing/formations/python-data-workspace.jpg
frontend/public/assets/landing/platform/koryxa-platform-workspace.jpg
```

Documents:

```txt
docs/CHANTIER-A-REFONTE-CREATIVE-PREMIUM-LANDING.md
docs/CHANTIER-B-REFONTE-FRONTEND-VIVANTE-LANDING.md
docs/CHANTIER-C-QA-SENIOR-PUSH-LANDING-VIVANT.md
```

---

## 2. QA technique exécutée

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

Résultat route `/`:

```txt
/ : 15.5 kB
First Load JS : 146 kB
```

### Diff check

```txt
git diff --check
Résultat: OK
```

---

## 3. QA responsive structurelle

### Mobile 375px

```txt
- header compact avec menu mobile;
- hero en colonne;
- CTA empilés;
- image/video en background sans dépendre d'une largeur desktop;
- cards en colonne;
- boutons min-h-14;
- overflow-x-hidden conservé.
```

Décision:

```txt
OK structurel
```

### Tablette 768px

```txt
- grilles 2 colonnes quand utile;
- cards et sections respirent;
- images gardent un ratio stable;
- CTA restent lisibles.
```

Décision:

```txt
OK structurel
```

### Desktop 1024px / 1440px

```txt
- hero en composition large;
- image/vidéo plus immersive;
- carte flottante visible;
- sections en 2 colonnes;
- timeline méthode plus premium;
- footer conservé et propre.
```

Décision:

```txt
OK structurel
```

---

## 4. QA design senior

```txt
Design review:
- UX: OK
- Responsive: OK structurel, revue navigateur réelle encore recommandée
- Visual quality: OK, nettement plus vivant que la version précédente
- Animation quality: OK, vidéo hero + motion visibles + reveal au scroll
- Commercial clarity: OK
- Premium feeling: OK, améliorable après capture réelle si besoin
- Code maintainability: OK, extraction composants possible plus tard
Decision: Commit autorisé
```

---

## 5. Points de vigilance production

```txt
- La vidéo hero est chargée depuis le CDN Pexels.
- Si le CDN est lent ou bloqué, le poster local reste disponible.
- Les images locales sont bien dans public/assets/landing.
- L'image OpenGraph finale dédiée 1200x630 n'a pas encore été générée séparément.
- Une revue visuelle dans navigateur réel reste utile après déploiement.
```

---

## 6. Décision

La refonte vivante est prête pour commit et push.

Commit recommandé:

```txt
Refine formation landing with cinematic visuals
```
