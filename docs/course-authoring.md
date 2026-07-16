# Créer et maintenir un parcours

## Modèle

Un parcours contient :

- une entrée `courses` ;
- des modules ordonnés ;
- des leçons ;
- des supports théoriques ;
- des exercices ;
- des quiz ;
- un projet final ;
- une progression et une certification isolées par `course_id`.

## Ordre de création

1. Créer le parcours avec `is_published = false`.
2. Ajouter les modules avec un ordre unique dans le parcours.
3. Ajouter les leçons et objectifs.
4. Ajouter théorie, glossaire et schémas.
5. Ajouter exercices, indices et solutions séparées.
6. Ajouter quiz sans exposer les réponses avant soumission.
7. Ajouter projet final, jalons et barème.
8. Exécuter les tests et la recette.
9. Publier les contenus dans l’ordre défini dans le guide d’exploitation.

## Standard pédagogique

Chaque leçon doit proposer :

- objectif mesurable ;
- concepts ;
- démonstration ;
- exercice ;
- résumé ;
- validation.

Chaque module important doit posséder une mise en pratique et une validation.

## Sécurité

- solution séparée de la consigne ;
- contenu non publié inaccessible ;
- corpus autorisé et traçable ;
- aucun secret dans les supports ;
- prompt système et règles internes non exposés.

## LLM RAG

Le parcours `llm-rag` comporte actuellement 12 modules, 26 leçons, 12 exercices, 48 questions, 9 jalons et un projet noté sur 60. Il reste non publié jusqu’à la recette finale.
