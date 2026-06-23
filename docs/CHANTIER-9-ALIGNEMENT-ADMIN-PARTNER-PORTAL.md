# Chantier 9 — Alignement avec KORYXA Admin et Partner Portal

Date: 2026-06-23
Repos concernés:

```txt
koryxa_formation
koryxa-admin
koryxa-partner-portal
```

Objectif: vérifier que le nouveau landing général KORYXA Formation ne contredit pas les règles produits, accès et distribution commerciale portées par KORYXA Admin et Partner Portal.

---

## 1. Fichiers inspectés

### koryxa-admin

```txt
infra/db/partner_products.sql
apps/api/app/routers/partner_products.py
apps/api/app/services/partner_products_service.py
```

### koryxa-partner-portal

```txt
src/lib/partner-products.ts
src/app/partenaire/dashboard/_components/ProductsSection.tsx
```

### koryxa_formation

```txt
frontend/app/page.tsx
frontend/components/marketing/KoryxaFormationPortal.tsx
```

---

## 2. Source de vérité produits côté KORYXA Admin

KORYXA Admin expose les produits partenaires publiés via:

```txt
GET /api/v1/partner-products/published
```

Le service applique:

```txt
status = published uniquement
ressources marketing published uniquement côté consommation publique
validation anti-placeholder / fictif / coming soon / fake / lorem ipsum
commission_amount > 0 pour publication
champs obligatoires avant publication
```

Produit publié actuellement dans le SQL Admin:

```txt
slug: formation-python-data
assistant_slug: koryxa-formation-python-data
name: Formation Analyse de données avec Python
category: Formation
commission_amount: 5000 FCFA
status: published
is_primary: true
```

Conclusion:

```txt
Le seul produit partenaire publié et validé actuellement est la formation Python Data.
```

---

## 3. Consommation côté Partner Portal

Le Partner Portal consomme:

```txt
GET {KORYXA_ADMIN_API_URL}/api/v1/partner-products/published
```

avec header optionnel:

```txt
x-koryxa-service-key
```

Fallback local strictement réel:

```txt
formation-python-data
```

Le fichier `src/lib/partner-products.ts` indique explicitement:

```txt
Ne jamais ajouter de produit fictif, "coming soon" ou placeholder ici.
Les futurs produits publics doivent venir de KORYXA Admin central en statut published.
```

La section `ProductsSection` indique aussi:

```txt
Seules les offres réellement validées par KORYXA apparaissent ici.
Aucun produit fictif, placeholder ou offre non publiée n'est affiché.
```

Conclusion:

```txt
Le nouveau landing Formation doit rester compatible avec cette règle stricte: seul Python Data peut être traité comme produit publié/vendable/distribuable.
```

---

## 4. Vérification du nouveau landing général

### Python Data Analyst

Statut dans le landing:

```txt
Disponible
Prix affiché: 29 000 FCFA
CTA: Voir le parcours
Route: /formations/python-data-analyst
```

Alignement:

```txt
OK
```

Raison:

```txt
Ce produit correspond au produit publié côté KORYXA Admin: formation-python-data.
```

### LLM/RAG Chatbot IA

Statut dans le landing:

```txt
En préparation avancée
Aucun prix
Aucun bouton acheter
CTA vers #roadmap
Message: pas encore ouverte à l'achat
```

Alignement:

```txt
OK
```

Raison:

```txt
LLM/RAG n'est pas publié côté Admin ni consommé par Partner Portal. Le landing le présente comme préparation, pas comme produit vendable.
```

### Assistant IA pour métier

Statut dans le landing:

```txt
Roadmap
Aucun prix
CTA: En préparation
```

Alignement:

```txt
OK
```

### Automatisation IA & no-code

Statut dans le landing:

```txt
Roadmap
Aucun prix
CTA: En préparation
```

Alignement:

```txt
OK
```

---

## 5. Vérification des CTA

### CTA publics autorisés

```txt
Découvrir les formations -> #formations
Voir Python Data Analyst -> /formations/python-data-analyst
Voir le parcours -> /formations/python-data-analyst
Voir l'état de l'accès -> /access
Explorer le catalogue -> #formations
```

Statut:

```txt
OK
```

### CTA LLM/RAG

```txt
Voir le programme prévu -> #roadmap
```

Statut:

```txt
OK
```

Raison:

```txt
Le CTA ne pointe pas vers une page inexistante /formations/llm-rag-chatbot et ne déclenche pas d'achat.
```

### CTA partenaire

Le landing actuel ne crée pas de CTA direct vers Partner Portal.

Statut:

```txt
OK
```

Raison:

```txt
La section partenaire reste informative et ne contourne pas le Partner Portal.
```

---

## 6. Vérification des routes sensibles

### Routes utilisées dans le landing

```txt
/formations/python-data-analyst
/access
#formations
#roadmap
#methode
#plateforme
#partenaires
#faq
```

Statut:

```txt
OK
```

### Routes volontairement non utilisées

```txt
/formations/llm-rag-chatbot
https://partenaires.koryxa.fr/partenaire/dashboard
KORYXA Admin privé
```

Statut:

```txt
OK
```

Raison:

```txt
Ces routes ne sont pas suffisamment validées pour devenir des CTA publics dans le landing général.
```

---

## 7. Vérification SEO / JSON-LD

### OfferCatalog

Le JSON-LD de `frontend/app/page.tsx` ne déclare comme Course exploitable que:

```txt
Formation Analyse de données avec Python
```

Statut:

```txt
OK
```

Raison:

```txt
Les formations en préparation ne sont pas publiées comme offres exploitables dans le structured data.
```

### FAQPage

La FAQ indique clairement:

```txt
LLM/RAG, Assistant IA et Automatisation ne sont pas ouvertes à l'achat.
```

Statut:

```txt
OK
```

---

## 8. Risques restants

### Risque 1 — Prix public vs produit partenaire

Le landing affiche:

```txt
Prix apprenant: 29 000 FCFA
```

Admin affiche côté partenaire:

```txt
Commission partenaire: 5 000 FCFA
```

Statut:

```txt
OK
```

Raison:

```txt
Ce ne sont pas les mêmes valeurs. Le landing affiche le prix formation apprenant; Admin/Partner Portal affichent la commission partenaire.
```

### Risque 2 — LLM/RAG visible publiquement

LLM/RAG est visible publiquement mais non vendable.

Statut:

```txt
OK sous condition
```

Condition:

```txt
Garder le statut En préparation avancée et ne pas ajouter de prix/achat avant publication Admin et création du tunnel dédié.
```

### Risque 3 — Section partenaire trop ouverte

La section partenaire est informative, sans bouton.

Statut:

```txt
OK
```

Condition:

```txt
Ne pas ajouter de lien direct Partner Portal public tant que la route publique et le comportement attendu ne sont pas validés.
```

---

## 9. Décision d'alignement

Le landing général redesigné est aligné avec:

```txt
KORYXA Admin
Partner Portal
Produit partenaire publié formation-python-data
Règle anti-placeholder
Règle no fictitious product
Règle no published product hors Admin
```

Aucune correction frontend obligatoire n'a été identifiée pendant ce chantier.

---

## 10. Checklist avant future publication d'une formation LLM/RAG

Avant de rendre LLM/RAG vendable, il faudra:

```txt
[ ] Créer la landing /formations/llm-rag-chatbot
[ ] Valider l'offre et le prix
[ ] Créer le produit côté KORYXA Admin si distribution partenaire prévue
[ ] Passer le produit en published côté Admin seulement après validation
[ ] Ajouter les ressources marketing validées côté Admin
[ ] Vérifier consommation côté Partner Portal
[ ] Ajouter le tunnel d'accès formation spécifique si nécessaire
[ ] Mettre à jour le JSON-LD du landing général
[ ] Remplacer CTA #roadmap par route dédiée
[ ] Ne pas mélanger les modules internes Python et LLM/RAG dans le même parcours global
```

---

## 11. Vérifications exécutées

```txt
grep produits / Admin / Partner Portal: OK
lecture fichiers Admin: OK
lecture fichiers Partner Portal: OK
contrôle CTA landing: OK
contrôle JSON-LD: OK
```

### Build frontend

```txt
npm run build
Résultat: OK depuis chantier 8 après les dernières corrections frontend.
```

---

## 12. Conclusion chantier 9

Le redesign du landing général est cohérent avec l'écosystème existant.

Décision:

```txt
Alignement Admin / Partner Portal validé.
```

Le prochain chantier recommandé est:

```txt
Chantier 10 — QA production + déploiement
```

Il devra vérifier:

```txt
- build final;
- git status;
- review des changements;
- absence de fichiers générés;
- éventuel commit uniquement après accord;
- checklist production;
- non-régression des routes /access et /formations/python-data-analyst.
```
