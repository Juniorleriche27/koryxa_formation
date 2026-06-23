# Chantier 2 — Audit UX/UI du landing général KORYXA Formation

Date: 2026-06-23
Repo principal audité: `koryxa_formation`
Page auditée: landing général `/`

Fichiers lus:

```txt
frontend/app/page.tsx
frontend/components/marketing/KoryxaFormationPortal.tsx
frontend/app/globals.css
frontend/app/formations/python-data-analyst/page.tsx
frontend/package.json
```

Contexte écosystème issu du chantier 1:

```txt
koryxa_formation = vitrine publique + landings dédiées + espace apprenant
koryxa-admin = gouvernance produits + accès + ponts d'authentification
koryxa-partner-portal = distribution commerciale + partenaires + liens + commissions
```

---

## 1. Verdict exécutif

Le landing général actuel est techniquement propre et déjà responsive, mais il n'est pas encore au niveau d'une vitrine principale premium pour KORYXA Formation.

Il fonctionne comme une page de catalogue simple. Il ne fonctionne pas encore comme une page de marque, d'acquisition et de conversion.

### Note globale actuelle

```txt
UX clarity: 6.5 / 10
Force commerciale: 5.5 / 10
Qualité visuelle: 6.5 / 10
Responsive: 7 / 10
SEO: 6 / 10
Cohérence écosystème: 6 / 10
Niveau premium attendu: 5.5 / 10
```

### Diagnostic résumé

```txt
Points positifs:
- structure Next.js claire;
- metadata déjà présentes;
- JSON-LD existant;
- framer-motion déjà installé;
- page mobile globalement utilisable;
- cartes formation existantes;
- séparation landing général / landing dédiée Python déjà en place.

Points faibles:
- hero trop générique;
- pas assez d'images humaines ou produit;
- dark mode trop uniforme;
- catalogue trop linéaire;
- pas assez de preuve commerciale;
- CTA pas assez hiérarchisés;
- formations en préparation trop visibles sans cadrage business;
- pas de section partenaires ou distribution;
- pas de vraie narration KORYXA Formation;
- desktop pas assez spectaculaire;
- SEO correct mais incomplet pour une page catalogue ambitieuse.
```

---

## 2. Analyse du hero actuel

### État actuel

Le H1 actuel:

```txt
Des formations IA pour apprendre, pratiquer et prouver.
```

Sous-titre actuel:

```txt
Un portail clair pour découvrir les parcours KORYXA : data analyse, intelligence artificielle appliquée, automatisation et compétences numériques concrètes.
```

### Ce qui marche

```txt
- Le message est court.
- On comprend qu'il s'agit d'un portail de formations.
- IA, data et automatisation sont bien présents.
- Le CTA vers les parcours existe.
```

### Ce qui ne marche pas assez

Le hero ne répond pas encore assez vite à ces questions:

```txt
Pourquoi KORYXA Formation est différente ?
Quel résultat concret l'apprenant obtient ?
Pourquoi faire confiance ?
Quelle formation est disponible maintenant ?
Est-ce une plateforme, une école, un catalogue, une formation unique ?
```

Le mot "prouver" est intéressant, mais il n'est pas suffisamment expliqué visuellement ni commercialement.

### Risque UX

Le visiteur peut comprendre:

```txt
"Encore une page de formations IA généraliste."
```

Alors qu'on veut qu'il comprenne:

```txt
"KORYXA Formation construit des compétences pratiques avec projets, accès plateforme et parcours réels."
```

### Recommandation

Le futur hero doit être plus concret:

```txt
Former aux compétences IA, data et automatisation avec des projets réels, des parcours guidés et des preuves visibles.
```

ou:

```txt
Apprends l'IA, la data et l'automatisation avec des formations orientées projets concrets.
```

---

## 3. Analyse de la structure actuelle

### Sections actuelles

```txt
1. Header
2. Hero
3. Hero visual abstrait
4. Catalogue
5. Méthode
6. Pour qui
7. Roadmap
8. Footer
```

### Ce qui est correct

```txt
- La page a une structure simple.
- Les formations sont visibles.
- La méthode pédagogique existe.
- La cible utilisateur existe.
- La roadmap existe.
```

### Ce qui manque

La page ne contient pas encore assez de sections de confiance et de conversion:

```txt
- preuves de sérieux;
- aperçu produit réel;
- différenciation KORYXA;
- section "comment ça marche";
- section "formation disponible maintenant" plus forte;
- section "pour partenaires" ou au minimum mention contrôlée;
- témoignages/preuves si disponibles;
- FAQ de portail général;
- CTA final plus orienté conversion;
- footer plus riche pour SEO.
```

### Recommandation de nouvelle structure

```txt
1. Header premium avec navigation claire
2. Hero concret + visuel humain/tech
3. Bande de preuves légères
4. Formation disponible maintenant
5. Catalogue des parcours
6. Méthode KORYXA
7. Aperçu de l'expérience apprenant
8. Pour qui
9. Partenaires / distribution, wording prudent
10. Roadmap contrôlée
11. FAQ portail général
12. CTA final
13. Footer SEO enrichi
```

---

## 4. Analyse du header

### État actuel

Le header est centré, avec seulement le logo KORYXA Formation.

### Points positifs

```txt
- Simple;
- lisible;
- propre sur mobile;
- peu de bruit.
```

### Limites

```txt
- Pas de navigation desktop;
- pas de CTA direct;
- pas de menu mobile;
- aucun raccourci vers Catalogue, Méthode, Accès, Partenaires;
- la page paraît plus institutionnelle que commerciale.
```

### Recommandation

Desktop:

```txt
Logo
Formations
Méthode
Pour qui
Partenaires
FAQ
CTA: Voir les parcours
```

Mobile:

```txt
Logo
Bouton menu
CTA compact ou drawer
```

Le header ne doit pas être lourd, mais il doit guider.

---

## 5. Analyse du catalogue actuel

### État actuel

Le tableau `formations` contient:

```txt
Python Data Analyst — Disponible — 29 000 FCFA
Assistant IA pour métier — Préparation — Bientôt
Automatisation IA & no-code — Préparation — Bientôt
```

### Points positifs

```txt
- Les cartes existent.
- La formation disponible est identifiée.
- Les formations à venir sont marquées "Préparation".
- Le bouton change selon disponibilité.
```

### Limites

```txt
- Les cartes sont toutes très proches visuellement.
- La formation disponible ne domine pas assez.
- Les formations non disponibles occupent presque le même poids visuel que la formation vendable.
- Il n'y a pas encore LLM/RAG dans la logique catalogue.
- Les cartes ne montrent pas assez le résultat final de chaque formation.
- Pas de distinction claire entre "vendable", "préparation", "roadmap".
```

### Risque produit

Comme le Partner Portal et KORYXA Admin imposent une règle de produit réel/publié, il faut éviter de donner l'impression qu'une formation non validée est achetable.

### Recommandation

Séparer les formations en deux zones:

```txt
Disponible maintenant
→ Python Data Analyst

En préparation
→ LLM/RAG Chatbot IA
→ Assistant IA métier
→ Automatisation IA & no-code
```

Pour la formation disponible, utiliser une carte plus large:

```txt
- image ou mockup;
- prix;
- résultat final;
- CTA principal;
- badges de compétences.
```

Pour les formations en préparation:

```txt
- visuel plus léger;
- statut clair;
- pas de prix si non validé;
- CTA: Être informé / Voir le programme prévu;
- pas de bouton acheter.
```

---

## 6. Analyse visuelle

### État actuel

La direction actuelle est:

```txt
- fond très sombre;
- gradients radiaux;
- glassmorphism;
- icône cerveau dans le hero;
- cartes sombres;
- accent emerald/blue/purple;
- grille technologique abstraite.
```

### Ce qui marche

```txt
- ambiance tech;
- cohérence globale;
- contraste fort;
- style moderne;
- animations déjà présentes.
```

### Ce qui manque

```txt
- images humaines;
- visuels d'apprentissage;
- mockups réels de la plateforme;
- énergie plus chaleureuse;
- séparation claire entre sections;
- respiration sur desktop;
- identité visuelle plus propriétaire KORYXA;
- variation clair/sombre pour éviter la monotonie.
```

### Risque visuel

La page peut lire comme une landing IA générique sombre. Les gradients bleu/violet/emerald sont très fréquents dans les produits IA.

### Recommandation direction artistique

Passer vers une direction:

```txt
Clean tech premium 2026
clair + noir profond + accent maîtrisé
humain + ordinateur + plateforme + apprentissage
bento sections
cards propres
animations douces
moins de néon générique
plus de précision produit
```

Proposition de palette future:

```txt
Fond principal: #F8FAFC ou #F7F8F5
Texte principal: #0F172A
Surface premium: #FFFFFF
Ink deep: #050914
Accent principal: emerald / lime contrôlé
Accent secondaire: cyan sobre ou bleu limité
Accent chaud optionnel: amber doux
```

---

## 7. Analyse responsive

### Points positifs

```txt
- Utilisation correcte de Tailwind responsive;
- CTA full width sur mobile;
- sections avec px-4 sm:px-6 lg:px-8;
- cartes en colonne sur mobile;
- texte hero adapté avec sm/lg;
- overflow-x-hidden présent.
```

### Limites

```txt
- Les sections min-h-screen répétées peuvent rendre le scroll mobile trop long.
- Le HeroVisual est abstrait et prend beaucoup de hauteur sur mobile.
- Les cartes formation sont grandes et très espacées.
- Le header n'a pas de vraie navigation mobile.
- Les animations ne tiennent pas compte de prefers-reduced-motion.
- Les effets fixed background peuvent coûter en performance mobile.
```

### Recommandations mobile-first

```txt
- Réduire la hauteur du hero visuel sur mobile.
- Éviter min-h-screen pour toutes les sections.
- Utiliser py-16/py-20 au lieu de min-h-screen généralisé.
- Ajouter une navigation mobile propre.
- Garder les CTA visibles dans les premiers écrans.
- Prévoir prefers-reduced-motion.
- Limiter les backgrounds fixed ou blur lourds sur mobile.
```

### Recommandations desktop

```txt
- Créer une vraie composition hero en deux colonnes.
- Ajouter un grand visuel humain/tech ou mockup.
- Mettre le catalogue dans une grille/bento premium.
- Utiliser davantage l'espace horizontal.
- Créer une hiérarchie plus spectaculaire pour la formation disponible.
```

---

## 8. Analyse SEO

### État actuel

`frontend/app/page.tsx` contient:

```txt
metadata.title
metadata.description
canonical
openGraph title/description/type/locale
JSON-LD EducationalOrganization + OfferCatalog + Course
```

### Points positifs

```txt
- Metadata présente.
- OpenGraph présent.
- JSON-LD présent.
- Canonical présent.
- Page servie par Next.js avec metadata API.
```

### Limites

```txt
- Pas de keywords structurés.
- Pas de robots explicite.
- OpenGraph sans image.
- Twitter card non configurée.
- JSON-LD incomplet pour toutes les formations futures.
- Pas de FAQPage schema.
- Pas assez de contenu textuel indexable dans le footer.
- H1 correct mais pas assez orienté recherche.
- Le terme "formation IA", "formation data", "formation Python", "formation automatisation" peut être mieux intégré naturellement.
```

### Recommandations SEO

```txt
- Ajouter OpenGraph image dédiée.
- Ajouter twitter card.
- Enrichir JSON-LD avec les formations réellement disponibles.
- Ajouter FAQPage JSON-LD si FAQ créée.
- Créer un footer avec liens internes:
  /formations/python-data-analyst
  futures pages dédiées non vendables si publiées
  /access selon tunnel
- Mieux intégrer les mots-clés sans bourrage.
```

Proposition de title SEO:

```txt
KORYXA Formation — Formations pratiques en IA, Data et Automatisation
```

Proposition de description:

```txt
Apprenez l'IA, la data analyse et l'automatisation avec des formations pratiques KORYXA orientées projets, portfolio, exercices et compétences concrètes.
```

---

## 9. Analyse accessibilité

### Points positifs

```txt
- Les liens et boutons sont de vrais éléments interactifs.
- Les couleurs texte/bloc ont souvent un contraste suffisant grâce au dark mode.
- Focus visible global dans globals.css.
- Hiérarchie H1/H2/H3 présente.
```

### Limites

```txt
- Animations sans gestion explicite de prefers-reduced-motion.
- Header sans navigation explicite.
- Certains badges ont des textes très petits.
- Certains contrastes emerald sur fond sombre peuvent être à vérifier.
- Les liens "Bientôt disponible" pointent vers #roadmap; il faut éviter la confusion action inactive/action active.
- Pas de skip link.
```

### Recommandations

```txt
- Ajouter skip link vers contenu principal.
- Ajouter prefers-reduced-motion pour animations framer-motion ou classes CSS.
- Éviter les textes sous 12px pour infos importantes.
- Vérifier les contrastes des badges.
- Utiliser aria-label sur menu mobile si ajouté.
- Ne pas transformer une formation non disponible en CTA trop actif.
```

---

## 10. Analyse performance frontend

### Points positifs

```txt
- Pas encore d'images lourdes sur la landing générale.
- Le code est local, simple, sans dépendance visuelle externe.
- Next.js 14 et Tailwind sont adaptés.
```

### Limites

```txt
- Beaucoup de composants motion.
- Plusieurs backgrounds fixed/radial/blur.
- HeroVisual animé abstrait.
- Si on ajoute des images, il faudra utiliser next/image et optimiser.
```

### Recommandations

```txt
- Utiliser next/image pour les visuels.
- Définir des tailles responsive et priority seulement pour le hero principal.
- Lazy-load les visuels secondaires.
- Réduire les animations sur mobile.
- Éviter les vidéos lourdes directement dans le hero général.
- Utiliser des SVG/illustrations légères quand possible.
```

---

## 11. Cohérence avec la landing dédiée Python Data Analyst

### Observation

La landing Python Data Analyst est plus riche que le landing général:

```txt
- hero plus vivant;
- vidéo;
- stats;
- programme;
- pricing;
- FAQ;
- CTA final;
- aperçu produit plus concret.
```

### Problème

Le landing général devrait être la porte d'entrée premium de la marque, mais il paraît aujourd'hui plus simple et moins abouti que la landing dédiée Python.

### Recommandation

Le landing général doit monter d'un niveau:

```txt
- meilleure narration;
- meilleur hero;
- meilleure preuve;
- visuels plus riches;
- catalogue plus stratégique;
- SEO plus complet;
- CTA plus propres.
```

Il ne doit pas copier la landing Python. Il doit jouer son rôle de portail de marque.

---

## 12. Recommandation de structure cible pour le redesign

### Version cible du landing général

```txt
01. Header premium
    Logo, Formations, Méthode, Partenaires, FAQ, CTA

02. Hero
    H1 clair, sous-titre concret, CTA principal, CTA secondaire, visuel humain/tech

03. Bande de crédibilité
    Projets, modules, certificat, approche pratique, accès plateforme

04. Formation disponible
    Python Data Analyst en carte dominante

05. Prochain parcours à cadrer
    LLM/RAG Chatbot IA en préparation, sans vente active avant validation

06. Catalogue contrôlé
    Formations disponibles / en préparation

07. Méthode KORYXA
    Apprendre → pratiquer → construire → prouver

08. Aperçu plateforme
    Mockup espace apprenant / modules / projet / certificat

09. Pour qui
    Étudiants, entrepreneurs, professionnels, développeurs, partenaires apprenants

10. Distribution partenaire
    Mention sobre: les partenaires disposent d'un espace dédié pour liens, kits et suivi

11. FAQ portail général
    Accès, disponibilité, certificat, formations à venir, partenaires

12. CTA final
    Découvrir les formations / Voir Python Data Analyst

13. Footer SEO
    Liens, catégories, contact, mentions utiles
```

---

## 13. Priorités de correction

### Priorité haute

```txt
- Refaire le hero pour être plus concret et plus commercial.
- Créer une vraie navigation header.
- Donner plus de poids à la formation disponible.
- Séparer disponible vs préparation.
- Ajouter un aperçu visuel humain/produit.
- Revoir la structure SEO.
```

### Priorité moyenne

```txt
- Ajouter FAQ portail général.
- Ajouter section partenaires sobre.
- Améliorer footer SEO.
- Ajouter OpenGraph image.
- Réduire min-h-screen sur mobile.
```

### Priorité basse

```txt
- Micro-interactions supplémentaires.
- Animations avancées.
- Effets visuels complexes.
- Transitions plus riches.
```

---

## 14. Décision design avant chantier 3

La page actuelle ne doit pas être simplement "améliorée". Elle doit être repositionnée.

Décision recommandée:

```txt
Transformer le landing général en vitrine premium de plateforme, pas en simple liste de formations.
```

Le futur design doit équilibrer:

```txt
clarté commerciale
preuve pédagogique
énergie visuelle
responsiveness mobile-first
SEO sérieux
cohérence Admin / Partner Portal
```

---

## 15. Conclusion chantier 2

Le chantier 2 confirme que le landing général actuel a une base saine, mais qu'il doit être revu en profondeur pour atteindre le niveau attendu.

Le prochain chantier recommandé est:

```txt
Chantier 3 — Nouvelle stratégie produit du portail général
```

Ce chantier devra verrouiller:

```txt
- le positionnement exact de KORYXA Formation;
- le message principal;
- la hiérarchie des formations;
- la place de LLM/RAG;
- la place des partenaires;
- les CTA autorisés;
- les règles de publication des formations disponibles vs en préparation.
```
