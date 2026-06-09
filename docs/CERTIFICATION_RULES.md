# KORYXA Formation — Règles officielles de validation et certification

Statut : cadre produit validé avant implémentation technique.

## 1. Objectif du document

Ce document définit les règles produit, pédagogiques et fonctionnelles du système de validation de la formation **Analyse de Données avec Python**.

Il sert de référence avant toute modification technique de la base de données, du backend, du frontend apprenant, de l'espace admin et du certificat.

Principe central :

```text
La plateforme ne doit pas seulement afficher des modules.
Elle doit piloter une progression certifiante sérieuse, mesurable et contrôlée.
```

---

## 2. Distinction essentielle : accès plateforme et certificat

Deux notions ne doivent jamais être mélangées.

### 2.1 Accès à la plateforme

L'accès à la plateforme est accordé après activation d'un code d'accès valide.

Règle produit :

```text
Durée d'accès plateforme : 2 mois.
```

Cette durée correspond au droit d'utiliser la plateforme, consulter les modules, pratiquer, refaire les QCM et préparer le projet final.

### 2.2 Délai minimum pour certificat

Le délai de 21 jours concerne uniquement l'éligibilité au certificat.

Règle produit :

```text
Certificat impossible avant 21 jours après activation de l'accès.
```

Ce délai ne bloque pas :

```text
l'accès aux modules ;
la progression ;
les exercices ;
les QCM ;
le projet final ;
la consultation des contenus.
```

Il bloque seulement :

```text
la disponibilité finale du certificat.
```

### 2.3 Règle non négociable

```text
Un apprenant peut avancer vite dans la plateforme,
mais il ne peut pas recevoir le certificat avant 21 jours.
```

---

## 3. Activation par code d'accès

L'entrée dans la formation commence par un code d'accès.

Règle :

```text
L'apprenant doit saisir un code d'accès valide pour activer son accès.
```

À l'activation, le système doit enregistrer :

```text
id apprenant ;
code utilisé ou référence du code ;
date d'activation ;
date d'expiration d'accès plateforme ;
date minimale d'éligibilité certificat ;
statut d'accès.
```

Calculs attendus :

```text
access_until = activated_at + 2 mois
certificate_eligible_from = activated_at + 21 jours
```

Important :

```text
certificate_eligible_from ne remplace pas access_until.
access_until reste la règle d'accès plateforme.
```

---

## 4. Progression verrouillée par module

La formation doit suivre une progression contrôlée.

Règle :

```text
Le module suivant se débloque seulement lorsque le module courant est validé.
```

Déblocage attendu :

```text
Module 0 validé → Module 1 accessible
Module 1 validé → Module 2 accessible
Module 2 validé → Module 3 accessible
Module 3 validé → Module 4 accessible
Module 4 validé → Module 5 accessible
Module 5 validé → Module 6 accessible
Module 6 validé → Projet final accessible
Projet final validé + score final OK + 21 jours minimum → certificat disponible
```

### 4.1 Statuts d'un module

Chaque module doit pouvoir avoir un statut clair.

```text
locked       → module bloqué
available    → module accessible
in_progress  → module commencé
quiz_failed  → QCM tenté mais non validé
validated    → module validé
```

### 4.2 Règle d'accès à un module

Un module est accessible si :

```text
c'est le premier module du parcours ;
ou le module précédent est validé ;
ou l'utilisateur est admin/formateur.
```

---

## 5. Validation d'un module

Un module n'est pas validé parce que l'apprenant l'a simplement ouvert.

Règle :

```text
Un module est validé uniquement si les conditions pédagogiques de validation sont remplies.
```

Conditions minimales :

```text
contenu consulté ;
exercices ou blocs obligatoires réalisés quand ils existent ;
QCM de fin de module réussi avec minimum 12/20 ;
checklist ou validation finale confirmée si le module en contient une.
```

### 5.1 Module 0

Validation simple mais contrôlée :

```text
contenu consulté ;
méthode de travail comprise ;
checklist de démarrage confirmée ;
QCM ou validation de compréhension réussi si activé.
```

### 5.2 Module 1

Validation attendue :

```text
contenu consulté ;
notions installation / Jupyter / Colab / VS Code / terminal / venv comprises ;
mini-projet analyse_ventes compris ou exécuté ;
QCM module 1 réussi avec minimum 12/20.
```

### 5.3 Modules 2 à 6

Validation attendue :

```text
contenu consulté ;
exercices clés réalisés ;
QCM de fin de module réussi avec minimum 12/20 ;
parties faibles revues si QCM échoué ;
module marqué validé par le système.
```

### 5.4 Module 7 — Projet final

Le module 7 n'est pas validé comme les autres modules.

Règle :

```text
Le projet final est l'évaluation principale de certification.
```

Validation attendue :

```text
projet soumis ;
projet consulté par admin/formateur ;
note projet attribuée sur 60 ;
statut projet final défini : soumis, à corriger, validé, refusé.
```

---

## 6. QCM de fin de module

Chaque module obligatoire doit avoir un QCM de fin de module.

Règle :

```text
Score QCM minimum pour valider un module : 12/20.
```

### 6.1 Statuts QCM

```text
not_started → QCM non commencé
passed      → QCM réussi
failed      → QCM échoué
retake      → QCM à refaire
```

### 6.2 Tentatives QCM

L'apprenant peut refaire un QCM non réussi.

Règle :

```text
Si score QCM < 12/20, le module n'est pas validé.
L'apprenant doit revoir les parties recommandées puis refaire le QCM.
```

Le système doit enregistrer chaque tentative :

```text
module ;
apprenant ;
score sur 20 ;
réponses données ;
questions réussies ;
questions échouées ;
sections à revoir ;
date de tentative ;
statut : passed ou failed.
```

### 6.3 Feedback après échec

Si l'apprenant obtient moins de 12/20, afficher :

```text
score obtenu ;
statut non validé ;
message de reprise ;
parties à revoir ;
bouton Revoir le module ;
bouton Refaire le QCM.
```

Exemple :

```text
Score : 9/20
Résultat : non validé

À revoir :
- variables
- conditions
- boucles

Consulte ces parties puis refais le QCM.
```

### 6.4 Feedback après réussite

Si l'apprenant obtient 12/20 ou plus :

```text
score affiché ;
statut validé ;
module marqué validé ;
module suivant débloqué.
```

Exemple :

```text
Score : 14/20
Résultat : QCM validé
Module suivant débloqué.
```

---

## 7. Score plateforme — 40 points

La plateforme compte pour 40 % de la certification finale.

Règle :

```text
Score plateforme maximum : 40 points.
```

Le score plateforme mesure :

```text
la validation progressive des modules ;
la réussite des QCM ;
la régularité minimale ;
la progression contrôlée.
```

Répartition recommandée :

```text
Module 0 : 3 points
Module 1 : 7 points
Module 2 : 6 points
Module 3 : 6 points
Module 4 : 6 points
Module 5 : 6 points
Module 6 : 6 points
Total : 40 points
```

Le module 7 n'est pas inclus dans ces 40 points parce qu'il correspond au projet final.

### 7.1 Conversion QCM vers points module

Version simple recommandée :

```text
QCM réussi → points du module accordés
QCM échoué → 0 point pour le module jusqu'à réussite
```

Version avancée possible plus tard :

```text
points_module = points_max_module × score_qcm / 20
avec validation seulement si score_qcm >= 12/20
```

Pour la première version produit, utiliser la version simple.

---

## 8. Projet final — 60 points

Le projet final compte pour 60 % de la certification.

Règle :

```text
Score projet final maximum : 60 points.
```

Le projet final doit être noté par admin ou formateur.

Critères recommandés :

```text
compréhension du problème business : 10 points
qualité du nettoyage ou préparation des données : 10 points
qualité des analyses et KPIs : 15 points
qualité des visualisations : 10 points
qualité des conclusions : 10 points
clarté du rapport final : 5 points
Total : 60 points
```

Statuts possibles :

```text
not_started
submitted
needs_revision
graded
validated
rejected
```

---

## 9. Score final et réussite

La certification est calculée sur 100 points.

Formule :

```text
score_final = score_plateforme + score_projet_final
```

Avec :

```text
score_plateforme maximum = 40
score_projet_final maximum = 60
score_final maximum = 100
```

Règle de réussite KORYXA :

```text
Score final minimum requis : 60/100.
```

Important :

```text
Chez KORYXA, 50/100 ne suffit pas.
La réussite commence à 60/100.
```

---

## 10. Conditions complètes d'éligibilité au certificat

Le certificat devient disponible uniquement si toutes les conditions suivantes sont vraies :

```text
code d'accès activé ;
accès plateforme correctement rattaché à l'apprenant ;
minimum 21 jours depuis activation de l'accès ;
modules 0 à 6 validés ;
QCM de chaque module obligatoire réussi avec minimum 12/20 ;
projet final soumis ;
projet final corrigé / noté ;
score plateforme calculé sur 40 ;
score projet final calculé sur 60 ;
score final >= 60/100.
```

Règle absolue :

```text
Aucun certificat ne peut être généré automatiquement par simple consultation des contenus.
```

---

## 11. Messages de blocage certificat

Si le certificat n'est pas disponible, la plateforme doit expliquer pourquoi.

Exemples :

```text
Certificat pas encore disponible : il reste 8 jours avant le délai minimum de 21 jours.
Certificat pas encore disponible : le Module 3 n'est pas validé.
Certificat pas encore disponible : le QCM du Module 4 est à refaire.
Certificat pas encore disponible : le projet final n'est pas encore soumis.
Certificat pas encore disponible : le projet final n'a pas encore été noté.
Certificat pas encore disponible : le score final est inférieur à 60/100.
```

Le message doit être clair, actionnable et non humiliant.

---

## 12. Expérience apprenant attendue

### Page modules

La page modules doit afficher :

```text
module validé ;
module en cours ;
module bloqué ;
note QCM si disponible ;
statut QCM ;
bouton Ouvrir ;
bouton Revoir ;
bouton Refaire le QCM ;
badge À débloquer.
```

### Page module

La page module doit afficher :

```text
contenu du module ;
exercices ;
feedback d'exécution ;
QCM de fin de module ;
score QCM ;
parties à revoir ;
validation ou blocage du module suivant.
```

### Page certificat

La page certificat doit afficher :

```text
score plateforme /40 ;
score projet /60 ;
score final /100 ;
jours écoulés depuis activation ;
jours restants avant éligibilité certificat ;
statut des modules ;
statut du projet final ;
certificat disponible ou non.
```

---

## 13. Expérience admin attendue

L'admin ou formateur doit pouvoir :

```text
voir la progression des apprenants ;
voir les QCM réussis ou échoués ;
voir les scores par module ;
voir les parties à revoir ;
voir les projets soumis ;
saisir une note projet final sur 60 ;
marquer un projet à corriger ;
valider un projet final ;
voir si un apprenant est éligible au certificat.
```

---

## 14. Règles anti-abus et sérieux pédagogique

La plateforme doit éviter les validations trop faciles.

Règles :

```text
un module non validé ne débloque pas le suivant ;
un QCM échoué ne valide pas le module ;
un score inférieur à 12/20 ne valide pas le QCM ;
le certificat ne peut pas être obtenu en 3 jours ;
le certificat ne peut pas être obtenu sans projet final noté ;
le certificat ne peut pas être obtenu avec moins de 60/100 ;
le délai de 21 jours ne doit jamais réduire l'accès plateforme de 2 mois.
```

---

## 15. Priorité de développement

Ordre recommandé des prochains chantiers :

```text
1. Modèle de données Supabase
2. Backend / logique métier de validation
3. QCM par module
4. Verrouillage frontend des modules
5. Score plateforme et score final
6. Admin projet final
7. Certificat conditionnel
8. Messages pédagogiques de reprise
```

---

## 16. Décision produit validée

Le système KORYXA Formation doit appliquer les règles suivantes :

```text
Accès plateforme : 2 mois
Délai certificat : 21 jours minimum après activation
QCM module : minimum 12/20
Plateforme : 40 points
Projet final : 60 points
Réussite : minimum 60/100
Module suivant : débloqué seulement après validation du précédent
Certificat : disponible seulement après toutes les conditions pédagogiques, projet et délai
```

Ce document est la référence produit pour les chantiers techniques suivants.
