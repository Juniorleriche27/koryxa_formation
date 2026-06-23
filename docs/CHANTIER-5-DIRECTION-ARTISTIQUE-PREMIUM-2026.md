# Chantier 5 — Direction artistique premium 2026 du landing général KORYXA Formation

Date: 2026-06-23
Repo principal: `koryxa_formation`
Page cible: `/`

Objectif: définir la direction visuelle complète du futur landing général avant intégration frontend: palette, typographie, structure visuelle, images, animations, composants, responsive et critères qualité.

---

## 1. Décision artistique principale

La nouvelle page générale KORYXA Formation doit quitter le style "landing IA sombre générique" pour aller vers une direction:

```txt
clean tech premium
humaine
internationale
mobile-first
très lisible
visuellement énergique
commercialement rassurante
```

Le design doit donner l'impression suivante:

```txt
KORYXA Formation est une plateforme sérieuse, moderne et accessible, qui transforme l'apprentissage IA/data/automatisation en projets concrets.
```

---

## 2. Problème de la direction actuelle

La page actuelle utilise beaucoup:

```txt
- fond sombre;
- gradients IA classiques;
- glassmorphism;
- icônes abstraites;
- visuel cerveau/IA;
- cartes proches les unes des autres;
- ambiance tech générique.
```

Ce n'est pas mauvais, mais le risque est fort:

```txt
ressembler à une landing IA comme beaucoup d'autres.
```

La nouvelle direction doit être plus propriétaire, plus humaine et plus commerciale.

---

## 3. Territoire visuel cible

### Nom de direction

```txt
KORYXA Learning OS — Clean Tech Human Premium
```

### Mots-clés

```txt
clair
premium
structuré
humain
tech
confiant
calme
énergique
commercial
mobile-first
```

### Ce qu'on veut ressentir

```txt
- sérieux sans froideur;
- tech sans cliché IA;
- formation sans aspect scolaire basique;
- premium sans complexité inutile;
- énergie visuelle sans surcharge.
```

### Ce qu'on évite

```txt
- dark mode intégral;
- gradients bleu/violet IA trop génériques;
- stock photos fades;
- icônes comme visuel principal;
- animations trop lourdes;
- cartes uniformes;
- hero abstrait qui ne montre personne ni produit.
```

---

## 4. Palette recommandée

### Palette principale

```txt
Ink deep        #050914
Slate text      #0F172A
Muted text      #475569
Soft background #F8FAFC
Warm surface    #F7F8F5
White surface   #FFFFFF
Border light    #E2E8F0
```

### Accents

```txt
KORYXA Emerald  #10B981
Soft Lime       #A3E635
Focused Cyan    #06B6D4
Warm Amber      #F59E0B
```

### Utilisation

```txt
Fond général:
#F8FAFC ou #F7F8F5

Texte principal:
#0F172A

Sections premium sombres:
#050914, uniquement par contraste stratégique

CTA principal:
Emerald ou Ink deep selon section

CTA secondaire:
White surface + border light

Badges:
fonds très légers, pas néon agressif
```

### Règle importante

Ne pas construire toute la page sur du bleu/violet. Le bleu peut exister ponctuellement pour les éléments data/tech, mais il ne doit pas devenir l'identité principale.

---

## 5. Typographie

### Direction

La typographie doit être:

```txt
très lisible
contemporaine
sérieuse
forte en hero
simple dans les paragraphes
```

### Recommandation technique

Si le projet reste sans ajout de police externe:

```txt
utiliser la stack système actuelle avec font-smoothing;
travailler la hiérarchie par taille, poids, tracking et line-height.
```

Si on accepte une police via `next/font` plus tard:

```txt
Inter / Geist Sans / Satoshi-like si disponible
```

Mais pour éviter les risques de build et rester rapide, la première version peut rester sur la stack système.

### Hiérarchie cible

Mobile:

```txt
H1: 2.75rem à 3.25rem, line-height 0.95 à 1.02
H2: 2rem à 2.5rem
Body: 1rem, line-height 1.7
Small: 0.875rem minimum pour information utile
```

Desktop:

```txt
H1: 4.5rem à 6rem selon largeur
H2: 3rem à 4.5rem
Body hero: 1.125rem à 1.25rem
Cards: 0.95rem à 1rem
```

### Règles

```txt
- pas de texte important sous 12px;
- limiter les uppercase aux badges courts;
- éviter les paragraphes de plus de 3 lignes dans les cards;
- garder des titres très explicites.
```

---

## 6. Layout général

### Principe

Le futur landing doit être conçu comme un parcours, pas comme une empilement de blocs.

Structure visuelle cible:

```txt
01. Header sticky clair
02. Hero en 2 colonnes sur desktop
03. Bande de crédibilité
04. Formation phare en bento large
05. LLM/RAG en bloc preview premium
06. Catalogue contrôlé
07. Méthode en steps horizontaux/vertical mobile
08. Aperçu plateforme
09. Pour qui
10. Écosystème partenaire
11. FAQ
12. CTA final
13. Footer SEO
```

### Container

```txt
max-width principal: 1200px à 1280px
padding mobile: 16px
padding tablette: 24px
padding desktop: 32px
section vertical mobile: 64px à 80px
section vertical desktop: 96px à 128px
```

### Desktop

Le desktop doit être plus spectaculaire:

```txt
- hero en deux colonnes;
- visuel principal fort à droite;
- cartes bento;
- formation disponible en carte dominante;
- sections alternant fond clair et fond sombre;
- beaucoup d'espace blanc maîtrisé.
```

### Mobile

Le mobile doit être le socle:

```txt
- H1 lisible immédiatement;
- CTA visibles dans le premier écran;
- cards en colonne;
- visuels moins hauts;
- pas d'animation lourde;
- navigation mobile simple;
- sections moins longues que l'actuel min-h-screen répétitif.
```

---

## 7. Header

### Direction

Header premium, clair, fixe/sticky, pas trop haut.

### Desktop

```txt
Logo KORYXA Formation
Navigation: Formations · Méthode · Plateforme · Partenaires · FAQ
CTA: Découvrir les formations
```

### Mobile

```txt
Logo
Bouton menu
Drawer simple
CTA visible dans le drawer
```

### Style

```txt
fond blanc/translucide
border bottom léger
blur léger
hauteur 64px à 72px
ombre très subtile
```

### À éviter

```txt
header centré sans navigation
header trop sombre
trop de liens
CTA invisible
```

---

## 8. Hero visuel

### Direction

Le hero doit remplacer le visuel abstrait actuel par un visuel qui montre:

```txt
une personne qui apprend ou travaille sur ordinateur
+ une surcouche interface KORYXA / modules / progression
+ une ambiance tech propre
```

### Option recommandée

```txt
Hero split layout:
Gauche: copy + CTA + preuves
Droite: grande composition visuelle bento
```

### Composition droite

```txt
- image principale: apprenant/professionnel sur ordinateur;
- carte flottante: Formation Python Data Analyst;
- carte flottante: Prochain parcours LLM/RAG;
- mini-progress: Apprendre → Pratiquer → Produire → Prouver;
- badge: Projet final / Certificat.
```

### Style du visuel

```txt
rounded-3xl
ombres douces
fonds clairs
cartes en glass léger mais pas excessif
accent emerald/lime discret
```

### Images à rechercher ou produire

Types d'images recherchées:

```txt
- homme ou femme utilisant un ordinateur dans un environnement moderne;
- espace de travail tech propre;
- immeubles ou campus tech moderne;
- équipe/apprenant en situation;
- laptop avec dashboard/formation;
- illustrations animées légères orientées learning/tech.
```

Critères:

```txt
- pas de photo corporate trop stock;
- pas de clichés futuristes trop IA;
- lumière naturelle ou studio propre;
- diversité et crédibilité;
- format large utilisable en hero;
- licence exploitable.
```

---

## 9. Style des cartes formation

### Formation disponible

La formation Python Data Analyst doit dominer.

Style recommandé:

```txt
carte large
fond blanc
bordure fine
ombre douce
mockup ou mini-interface
prix visible
CTA fort
badges compétences
statut Disponible
```

Hiérarchie:

```txt
1. Disponible maintenant
2. Analyse de données avec Python
3. Résultat final
4. Badges compétences
5. Prix
6. CTA Voir le parcours
```

### LLM/RAG

La formation LLM/RAG doit être premium mais clairement non vendable.

Style recommandé:

```txt
carte sombre contrôlée ou fond graphite
statut En préparation avancée
visuel embeddings/documents/chatbot
pas de prix
CTA Voir le programme prévu ou Être informé
```

### Roadmap

Assistant IA métier et Automatisation doivent être plus légers.

Style recommandé:

```txt
petites cards
fond clair
status Roadmap
CTA neutralisé: En préparation
pas de prix
```

---

## 10. Style des sections

### Alternance recommandée

```txt
Hero: fond clair premium avec accents doux
Crédibilité: blanc
Formation phare: fond clair / bento
LLM/RAG: section sombre premium
Méthode: blanc avec steps
Aperçu plateforme: fond graphite ou bento clair
Pour qui: fond clair
Partenaires: fond blanc cassé
FAQ: fond clair
CTA final: bloc sombre ou emerald profond
Footer: ink deep
```

### Règle

Ne pas faire toutes les sections en full dark. Le sombre doit devenir un moment de contraste, pas l'ambiance permanente.

---

## 11. Style des images et illustrations

### Catégories d'assets

```txt
1. Image humaine hero
2. Mockups plateforme
3. Mini-illustrations formation
4. OpenGraph image
5. Icônes simples
6. Animations légères
```

### Direction image humaine

```txt
professionnel/apprenant concentré
ordinateur visible
cadre moderne
lumière propre
pas de sourire corporate forcé
pas de mise en scène trop artificielle
```

### Direction tech

```txt
immeuble tech moderne
bureau moderne
laptop/dashboard
écran de code/notebook
interface de progression formation
```

### Mockups internes

Créer des mockups cohérents avec le produit:

```txt
- carte module;
- progression;
- notebook;
- certificat;
- prochain projet;
- status formation.
```

Les mockups peuvent être codés en HTML/CSS plutôt qu'en images lourdes.

---

## 12. Animations

### Direction

Les animations doivent soutenir la compréhension, pas impressionner gratuitement.

Animations autorisées:

```txt
- fade-in léger au scroll;
- slide-up doux;
- hover card subtil;
- apparition progressive des cartes;
- micro-mouvement sur badges flottants;
- accordéon FAQ;
- menu mobile.
```

Animations à éviter:

```txt
- gros parallax permanent;
- mouvement constant sur trop d'éléments;
- scroll-jacking;
- animations qui retardent la lecture;
- vidéos lourdes en hero;
- glow animé agressif.
```

### Durées recommandées

```txt
micro-interaction: 120ms à 180ms
section reveal: 350ms à 600ms
floating subtle: 5s à 8s
```

### Accessibilité

Prévoir une logique `prefers-reduced-motion`:

```txt
si motion réduite:
- désactiver floating infini;
- garder seulement les transitions hover simples;
- éviter les déplacements importants.
```

---

## 13. Design mobile-first

### Objectifs mobile

```txt
- comprendre la promesse sans scroller longtemps;
- voir un CTA en haut;
- ne pas subir de visuel énorme;
- lire les formations facilement;
- avoir des cards respirantes;
- éviter horizontal scroll;
- garder performance fluide.
```

### Structure mobile recommandée

```txt
Hero:
- eyebrow
- H1
- sous-titre
- CTA principal
- CTA secondaire
- preuves rapides
- visuel compact

Formation phare:
- carte pleine largeur
- prix + CTA visibles

Catalogue:
- tabs ou sections empilées

Méthode:
- steps verticales

FAQ:
- accordéons
```

### Taille et spacing mobile

```txt
padding x: 16px
section y: 64px à 80px
card padding: 20px à 24px
border radius: 24px à 32px
CTA height: 48px minimum
```

---

## 14. Design desktop premium

### Objectifs desktop

```txt
- impression haut de gamme dès le hero;
- usage intelligent de l'espace horizontal;
- formation disponible très visible;
- visuels plus riches;
- sections bento;
- rythme clair entre contenus et preuves.
```

### Structure desktop recommandée

```txt
Hero 2 colonnes:
- 52% copy
- 48% visuel

Formation phare:
- bento large 2 colonnes

Catalogue:
- grille contrôlée 1 dominant + 3 secondaires

Méthode:
- 4 steps horizontaux ou grille 2x2

Aperçu plateforme:
- mockup large + cards flottantes
```

### Effet recherché

Le desktop doit donner la sensation d'une plateforme internationale, pas d'un mini-site local bricolé.

---

## 15. Composants visuels à prévoir

```txt
HeaderPremium
MobileMenu
HeroLearningVisual
CredibilityStrip
FeaturedFormationCard
UpcomingFormationCard
RoadmapCard
MethodStep
PlatformPreview
AudienceCard
PartnerEcosystemCard
FAQAccordion
FinalCTA
FooterSEO
```

Ces composants doivent rester simples, maintenables et réutilisables.

---

## 16. Direction OpenGraph

Créer une image OG spécifique:

```txt
/og/koryxa-formation-home.jpg
```

Composition recommandée:

```txt
fond clair premium
logo KORYXA Formation
headline court: Formations pratiques en IA, Data et Automatisation
visuel laptop/dashboard
accent emerald/lime
aucun texte trop petit
format 1200x630
```

Cette image servira pour LinkedIn, WhatsApp et partage social.

---

## 17. Accessibilité visuelle

Règles:

```txt
- contraste texte/fond conforme;
- CTA visibles;
- focus visible;
- pas de texte important dans une image seule;
- badges lisibles;
- menu mobile accessible;
- animations réduites si nécessaire;
- target tactile minimum 44px;
- alt text pertinent pour les images.
```

Règle clé:

```txt
La beauté ne doit jamais réduire la compréhension.
```

---

## 18. Performance visuelle

Règles:

```txt
- next/image pour les images;
- priority uniquement pour l'image hero;
- lazy loading pour images secondaires;
- SVG ou CSS pour mockups quand possible;
- limiter les blur lourds;
- éviter trop d'éléments fixed;
- optimiser OpenGraph séparément;
- éviter vidéo hero en autoplay.
```

Objectif:

```txt
Le landing doit rester fluide sur mobile moyen, pas seulement sur desktop puissant.
```

---

## 19. Règles de cohérence produit

```txt
1. Python Data Analyst = carte dominante, disponible, prix affiché.
2. LLM/RAG = premium mais en préparation, sans prix ni achat.
3. Roadmap = visible mais secondaire.
4. Partenaires = mention sobre, pas un deuxième produit public.
5. Admin = jamais présenté comme destination publique.
6. Les CTA doivent rester cohérents avec les routes validées.
```

---

## 20. Règles à transmettre au chantier frontend

Quand le redesign sera codé:

```txt
- remplacer le full dark par un système clair + contrastes sombres stratégiques;
- créer un hero en deux colonnes desktop;
- garder mobile-first;
- ajouter un vrai header/nav;
- créer la formation Python comme carte dominante;
- ajouter LLM/RAG en bloc préparation;
- ajouter FAQ et footer SEO;
- utiliser next/image pour les assets;
- limiter framer-motion aux interactions utiles;
- vérifier responsive 375px, 768px, 1024px, 1440px;
- vérifier contraste et focus.
```

---

## 21. Critères de validation visuelle

Le chantier frontend ne sera validé que si:

```txt
- la promesse est comprise en moins de 5 secondes;
- la formation disponible est immédiatement identifiable;
- LLM/RAG est clairement en préparation;
- les CTA sont hiérarchisés;
- mobile et desktop sont tous les deux premium;
- le design ne ressemble pas à une landing IA générique;
- les images servent le message;
- les animations restent légères;
- le SEO visuel/social est prévu;
- l'accessibilité de base est respectée.
```

---

## 22. Conclusion chantier 5

La direction artistique validée est:

```txt
KORYXA Learning OS — Clean Tech Human Premium
```

Elle impose:

```txt
- page plus claire;
- visuel plus humain;
- cartes plus stratégiques;
- alternance clair/sombre;
- accent emerald/lime maîtrisé;
- desktop plus ambitieux;
- mobile-first sérieux;
- animations utiles;
- SEO social prévu;
- cohérence produit avec Admin et Partner Portal.
```

Le prochain chantier recommandé est:

```txt
Chantier 6 — Recherche, sélection et préparation des assets visuels
```
