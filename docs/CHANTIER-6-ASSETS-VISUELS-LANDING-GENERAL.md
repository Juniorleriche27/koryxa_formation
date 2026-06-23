# Chantier 6 — Recherche, sélection et préparation des assets visuels

Date: 2026-06-23
Repo principal: `koryxa_formation`
Page cible: landing général `/`

Objectif: préparer la stratégie d'assets visuels du futur landing général KORYXA Formation: sources, types d'images, critères de sélection, structure de fichiers, noms cibles, règles de licence, animation et intégration frontend.

---

## 1. Décision principale

Le futur landing général ne doit pas utiliser un hero abstrait basé uniquement sur une icône IA.

Il doit utiliser une composition visuelle plus humaine:

```txt
personne concentrée sur ordinateur
+ environnement tech/learning moderne
+ cartes d'interface KORYXA superposées
+ preuve visuelle de parcours, progression, formation et projet final
```

La direction retenue reste:

```txt
KORYXA Learning OS — Clean Tech Human Premium
```

---

## 2. Dossier d'assets préparé

Le dossier suivant a été préparé dans le repo:

```txt
frontend/public/assets/landing/
```

Structure créée:

```txt
frontend/public/assets/landing/hero/
frontend/public/assets/landing/platform/
frontend/public/assets/landing/formations/
frontend/public/assets/landing/motion/
frontend/public/assets/landing/og/
```

README créé:

```txt
frontend/public/assets/landing/README.md
```

---

## 3. Sources visuelles recommandées

### Sources photo principales

```txt
Unsplash
Pexels
Pixabay
```

Usage recommandé:

```txt
Unsplash: photos hero premium, architecture moderne, workspace tech.
Pexels: photos et vidéos courtes de personnes sur laptop, coding, apprentissage.
Pixabay: backup pour illustrations, vidéos, images tech ou abstraites.
```

### Sources animation

```txt
LottieFiles
SVG/CSS custom
framer-motion déjà installé dans le projet
```

Usage recommandé:

```txt
LottieFiles: seulement pour animations légères et vérifiées.
SVG/CSS custom: recommandé pour éviter les assets tiers inutiles.
framer-motion: micro-interactions déjà possibles dans le code actuel.
```

---

## 4. Règles de licence et prudence

### Règle générale

Même si une plateforme annonce un usage commercial libre, chaque asset doit être vérifié individuellement avant intégration.

À éviter:

```txt
- logos visibles;
- marques visibles sur ordinateur ou bâtiment;
- visages trop centraux si l'image donne l'impression d'un témoignage réel;
- images premium/sponsored confondues avec images gratuites;
- éléments protégés: œuvres d'art, bâtiments iconiques, interfaces propriétaires;
- animations Lottie sans licence claire.
```

### Attribution

Même si l'attribution n'est pas toujours obligatoire selon la plateforme, conserver dans le repo une trace:

```txt
source
URL
photographe/auteur
licence vérifiée
date de récupération
```

Proposition de fichier futur:

```txt
frontend/public/assets/landing/ASSET-SOURCES.md
```

---

## 5. Sélection visuelle cible

### Asset 1 — Hero humain principal

Nom cible:

```txt
frontend/public/assets/landing/hero/koryxa-learner-laptop.webp
```

Type:

```txt
photo réelle ou semi-réaliste
```

Recherche recommandée:

```txt
man working on laptop modern office
person learning laptop technology
student laptop modern workspace
African man laptop modern office
professional using laptop learning online
```

Critères:

```txt
- personne concentrée;
- ordinateur visible;
- lumière naturelle ou premium;
- cadrage horizontal ou facilement recadrable;
- pas de logo Apple ou marque trop visible si possible;
- fond suffisamment calme pour superposer des cartes UI;
- énergie sérieuse, pas corporate fake.
```

Usage:

```txt
hero desktop à droite
image compacte sur mobile
```

---

### Asset 2 — Ambiance tech / bâtiment moderne

Nom cible:

```txt
frontend/public/assets/landing/hero/koryxa-tech-building.webp
```

Type:

```txt
photo d'environnement moderne ou bâtiment tech
```

Recherche recommandée:

```txt
modern office building exterior dusk
technology building modern architecture
tech campus office exterior
modern glass office building
```

Critères:

```txt
- architecture moderne;
- pas de marque identifiable;
- couleur compatible palette KORYXA;
- peut servir de background secondaire ou bande crédibilité;
- ne doit pas donner un aspect immobilier générique.
```

Usage:

```txt
background léger section crédibilité ou partenaire
peut aussi être ignoré si le hero humain suffit
```

---

### Asset 3 — Mockup plateforme apprenant

Nom cible:

```txt
frontend/public/assets/landing/platform/koryxa-learning-dashboard.webp
```

Type:

```txt
mockup généré depuis le frontend ou codé en HTML/CSS, puis éventuellement exporté en image
```

Recommandation:

```txt
À privilégier par rapport à une photo externe.
```

Contenu du mockup:

```txt
- module en cours;
- progression;
- carte Python Data Analyst;
- prochain projet;
- certificat;
- statut LLM/RAG en préparation.
```

Usage:

```txt
section aperçu plateforme
cartes flottantes du hero
OpenGraph
```

---

### Asset 4 — Formation Python Data Analyst

Nom cible:

```txt
frontend/public/assets/landing/formations/python-data-card.webp
```

Type:

```txt
mockup interface / notebook / dashboard data
```

Contenu visuel:

```txt
- notebook Python;
- graphique simple;
- badge Pandas/NumPy;
- projet portfolio;
- prix 29 000 FCFA si intégré en HTML plutôt qu'image.
```

Recommandation:

```txt
Ne pas intégrer le prix dans l'image si possible. Le prix doit rester du texte HTML pour SEO/accessibilité.
```

---

### Asset 5 — LLM/RAG Preview

Nom cible:

```txt
frontend/public/assets/landing/formations/llm-rag-preview.webp
```

Type:

```txt
illustration UI ou mockup RAG
```

Contenu visuel:

```txt
Documents → Chunks → Embeddings → Qdrant → LLM → Chatbot
```

Style:

```txt
section sombre premium
lignes fines
nodes simples
accent emerald/cyan maîtrisé
pas de robot cliché
```

Règle:

```txt
Aucun prix, aucun bouton achat dans le visuel.
```

---

### Asset 6 — Motion léger progression

Nom cible:

```txt
frontend/public/assets/landing/motion/learning-progress.json
```

Type:

```txt
Lottie JSON ou animation CSS/framer-motion
```

Animation cible:

```txt
Apprendre → Pratiquer → Produire → Prouver
```

Recommandation:

```txt
Commencer par CSS/framer-motion custom plutôt que dépendre d'un asset Lottie tiers.
```

Raison:

```txt
plus léger
plus maîtrisable
moins de risque licence
meilleure cohérence graphique
```

---

### Asset 7 — OpenGraph

Nom cible:

```txt
frontend/public/assets/landing/og/koryxa-formation-home.jpg
```

Format:

```txt
1200x630
```

Composition:

```txt
fond clair premium
logo KORYXA Formation
headline: Formations pratiques en IA, Data et Automatisation
mockup dashboard ou laptop
accent emerald/lime
aucun texte trop petit
```

Usage:

```txt
LinkedIn
WhatsApp
partage social
OpenGraph metadata
Twitter card
```

---

## 6. Assets à privilégier vs assets à éviter

### À privilégier

```txt
- photos humaines crédibles;
- ordinateur/laptop visible;
- environnement de travail propre;
- photos avec espace négatif;
- mockups codés en HTML/CSS;
- SVG simples pour flows IA/RAG;
- micro-animations framer-motion;
- OpenGraph custom.
```

### À éviter

```txt
- robot 3D générique;
- cerveau néon;
- tunnel futuriste bleu/violet;
- stock photo trop souriante;
- photo de salle de classe générique;
- logos visibles;
- Lottie trop cartoon;
- vidéos lourdes autoplay;
- images avec texte incrusté non accessible;
- assets non vérifiés.
```

---

## 7. Sélection recommandée pour la première intégration

Pour ne pas ralentir le redesign, la première version peut fonctionner avec 4 assets seulement:

```txt
1. hero/koryxa-learner-laptop.webp
2. platform/koryxa-learning-dashboard.webp
3. formations/llm-rag-preview.webp
4. og/koryxa-formation-home.jpg
```

Le reste peut être enrichi après le premier redesign.

---

## 8. Recommandation technique d'intégration

### Images

Utiliser `next/image`.

```txt
- priority: uniquement image hero;
- sizes: définir par breakpoint;
- alt text descriptif;
- lazy loading automatique pour secondaires;
- dimensions fixes ou ratio stable pour éviter CLS.
```

### Formats

```txt
Hero: .webp
Mockups: .webp ou .svg si vectoriel
OpenGraph: .jpg 1200x630
Lottie: .json seulement si retenu
```

### Poids cible

```txt
Hero image: < 250 KB si possible
Images secondaires: < 180 KB
OpenGraph: < 400 KB
Lottie: < 80 KB
```

---

## 9. Alt text recommandé

### Hero

```txt
Professionnel utilisant un ordinateur pour suivre une formation numérique KORYXA.
```

### Platform mockup

```txt
Aperçu de l'interface apprenant KORYXA Formation avec modules, progression et projet final.
```

### Python card

```txt
Aperçu d'un projet d'analyse de données avec Python, notebook et graphique.
```

### LLM/RAG preview

```txt
Schéma visuel d'un pipeline RAG reliant documents, embeddings, base vectorielle, LLM et chatbot.
```

### Tech building

```txt
Bâtiment moderne évoquant un environnement technologique et professionnel.
```

---

## 10. Plan de recherche concret

### Requête 1 — Hero humain

```txt
Pexels: man working on laptop modern office
Unsplash: man working on laptop modern office
Pexels: person using laptop learning online
```

### Requête 2 — Tech / building

```txt
Unsplash: modern office building exterior dusk
Unsplash: technology building modern architecture
Pexels: high tech office
```

### Requête 3 — Coding / data

```txt
Pexels: data dashboard laptop
Pexels: computer code office
Unsplash: data dashboard laptop
```

### Requête 4 — Motion

```txt
LottieFiles: learning progress animation
LottieFiles: online education animation
LottieFiles: data analysis animation
```

Mais pour motion, recommandation prioritaire:

```txt
créer l'animation directement en framer-motion.
```

---

## 11. Résultats de recherche utiles déjà identifiés

### Recherches photo utiles

```txt
Unsplash — man working on laptop
Pexels — man working on laptop
Pexels — man using computer
Unsplash — office building exterior
Pexels — high tech office
Pexels — data dashboard
Pexels — computer code
```

### Exemples de résultats pertinents à vérifier manuellement avant téléchargement

```txt
Pexels — Man Studying Using a Laptop
Pexels — A Person Working With A Laptop video
Pexels — Woman Coding on Computer
Pexels — High Angle Shot of a Man Using a Laptop
Unsplash — Modern office building exterior at dusk with lights
Unsplash — A man works on a laptop in an office
```

Note:

```txt
Certains résultats Unsplash peuvent être Unsplash+ et donc payants. Vérifier chaque page avant usage.
```

---

## 12. Préparation frontend réalisée

Dossiers préparés:

```txt
frontend/public/assets/landing/hero/.gitkeep
frontend/public/assets/landing/platform/.gitkeep
frontend/public/assets/landing/formations/.gitkeep
frontend/public/assets/landing/motion/.gitkeep
frontend/public/assets/landing/og/.gitkeep
frontend/public/assets/landing/README.md
```

Ces dossiers permettront d'ajouter les images sans mélanger les assets du landing avec les autres parties du projet.

---

## 13. Décision sur les images animées

Le besoin exprimé inclut des images animées.

Décision recommandée:

```txt
Ne pas baser la page sur de lourds GIFs ou vidéos animées.
```

À la place:

```txt
- framer-motion pour les cartes flottantes;
- SVG/HTML pour le flow LLM/RAG;
- Lottie seulement si animation légère, utile et licence claire;
- aucune animation qui empêche la lecture.
```

Animations visuelles recommandées:

```txt
- badge progression qui remplit doucement;
- cartes formation qui apparaissent au scroll;
- lignes du pipeline RAG qui s'activent;
- léger flottement de cartes dans le hero;
- FAQ accordion.
```

---

## 14. Contrôle qualité avant intégration

Chaque asset choisi doit passer cette checklist:

```txt
[ ] Licence vérifiée
[ ] Source notée
[ ] Auteur noté
[ ] Pas de logo visible problématique
[ ] Pas de marque tierce dominante
[ ] Visage/usage cohérent avec la marque
[ ] Poids optimisé
[ ] Format adapté
[ ] Alt text rédigé
[ ] Rendu mobile vérifié
[ ] Rendu desktop vérifié
```

---

## 15. Fichier source à créer au moment du téléchargement

Quand les images finales seront téléchargées, créer:

```txt
frontend/public/assets/landing/ASSET-SOURCES.md
```

Template:

```md
# Asset sources

| Fichier | Source | Auteur | URL | Licence | Date | Notes |
|---|---|---|---|---|---|---|
| hero/koryxa-learner-laptop.webp | Pexels | ... | ... | Pexels License | 2026-06-23 | Hero principal |
```

---

## 16. Conclusion chantier 6

Le chantier 6 prépare les assets sans encore figer des images définitives.

Décision:

```txt
On ne télécharge pas d'asset tiers sans vérification manuelle finale de la licence, du rendu et de l'adéquation produit.
```

La base technique est prête:

```txt
frontend/public/assets/landing/
```

La prochaine étape recommandée est:

```txt
Chantier 7 — Redesign frontend complet du landing général
```

Avant le chantier 7, il faudra soit:

```txt
- sélectionner/télécharger les images finales;
- ou coder une première version avec mockups HTML/CSS et placeholders propres;
- puis remplacer par les images finales après validation.
```
