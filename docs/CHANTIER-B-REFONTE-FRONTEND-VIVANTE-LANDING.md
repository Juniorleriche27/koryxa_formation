# Chantier 2 — Refonte frontend vivante du landing KORYXA Formation

Date: 2026-06-23
Repo: `koryxa_formation`
Page cible: `/`

Objectif: remplacer l'approche trop plate par une landing plus immersive, visuelle, animée et publique, sans jargon interne.

---

## 1. Fichiers modifiés

```txt
frontend/components/marketing/KoryxaFormationPortal.tsx
frontend/app/page.tsx
frontend/public/assets/landing/ASSET-SOURCES.md
```

Assets ajoutés:

```txt
frontend/public/assets/landing/hero/koryxa-learning-hero.jpg
frontend/public/assets/landing/hero/koryxa-modern-office.jpg
frontend/public/assets/landing/formations/python-data-workspace.jpg
frontend/public/assets/landing/platform/koryxa-platform-workspace.jpg
```

---

## 2. Direction intégrée

La landing utilise maintenant une direction plus immersive:

```txt
Cinematic Learning Hero
Apprendre en construisant
Images réelles
Motion visible
Sections plus rythmées
Texte public simplifié
```

---

## 3. Hero refondu

Le hero contient maintenant:

```txt
- vidéo externe Pexels en arrière-plan;
- poster local en fallback;
- overlay sombre/vert premium;
- grand H1 plus impactant;
- CTA principal visible;
- carte flottante animée;
- badge projet portfolio animé;
- effet de lumière dynamique.
```

Nouveau H1:

```txt
Apprenez en construisant des projets concrets.
```

---

## 4. Images externes intégrées

Les images sont stockées localement dans `frontend/public/assets/landing`.

Sources:

```txt
Unsplash images CDN
Pexels video CDN
```

Traçabilité:

```txt
frontend/public/assets/landing/ASSET-SOURCES.md
```

---

## 5. Animations ajoutées

Animations visibles:

```txt
- vidéo hero;
- lumière hero en boucle;
- carte formation flottante;
- badge portfolio flottant;
- trust strip en cascade;
- reveal au scroll des sections;
- cards qui montent au scroll;
- timeline méthode qui se remplit;
- nodes chatbot IA qui s'allument;
- carte plateforme flottante;
- hover premium sur cards et CTA.
```

---

## 6. Jargon supprimé de la page publique

Suppression/remplacement des mots froids:

```txt
roadmap -> bientôt
LLM/RAG en titre -> chatbot IA avec vos propres documents
catalogue contrôlé -> parcours
produit publié -> non affiché
KORYXA Admin -> non affiché
Partner Portal -> non affiché
```

---

## 7. Nouvelle structure publique

```txt
1. Hero immersif vivant
2. Bande de preuves rapides
3. Formation disponible Python Data Analyst
4. Ce que vous allez construire
5. Méthode KORYXA animée
6. Bientôt — chatbot IA avec documents
7. Expérience apprenant
8. Pour qui
9. FAQ
10. CTA final avec image
11. Footer conservé/amélioré
```

---

## 8. SEO mis à jour

`frontend/app/page.tsx` a été simplifié pour correspondre au message public:

```txt
- apprendre en construisant;
- Python, data, IA appliquée;
- projet portfolio;
- chatbot IA avec documents;
- FAQ sans jargon interne.
```

---

## 9. Vérifications exécutées

```txt
npx tsc --noEmit: OK
npm run build: OK
git diff --check: OK
```

Build observé:

```txt
/ : 15.5 kB
First Load JS : 146 kB
```

---

## 10. Limites restantes

```txt
- Pas de capture navigateur réelle dans cet environnement.
- Vidéo hero chargée depuis Pexels CDN, donc dépendante d'un service externe.
- L'image OpenGraph dédiée 1200x630 n'est pas encore générée séparément.
- Une revue design humaine reste nécessaire avant commit/push.
```

---

## 11. Décision chantier 2

Le chantier 2 remplace la version plate par une version beaucoup plus vivante et image-first.

Décision:

```txt
Prêt pour revue visuelle utilisateur avant chantier 3 QA/push.
```
