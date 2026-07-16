# Architecture multi-parcours KORYXA Formation

## Principes

- `courses` est la racine fonctionnelle d’un parcours.
- `modules` appartient à un seul parcours via `course_id`.
- `lessons`, `exercises`, quiz, supports théoriques et jalons de projet appartiennent au bon module ou parcours.
- `python-data-analyst` reste le parcours historique et le fallback par défaut.
- `llm-rag` reste non publié tant que la recette n’est pas terminée.

## Backend

Les routes HTTP restent fines. Elles délèguent aux services :

- `app/services/courses.py` : résolution des parcours et fallback Python ;
- `app/services/content.py` : contrôle d’appartenance, lecture publiée et erreurs homogènes ;
- `app/constants.py` : slugs et messages partagés ;
- `app/schemas/content.py` : contrats Pydantic pour le contenu pédagogique.

Les réponses publiques ne doivent jamais exposer :

- solutions avant autorisation ;
- réponses de quiz avant soumission ;
- contenus non publiés ;
- secrets ou configuration privée.

## Frontend

- `frontend/lib/courseConfig.ts` centralise les slugs et routes ;
- `/modules` reste compatible et ouvre Python par défaut ;
- `/learn/[course]` redirige vers l’espace du parcours ;
- les composants de présentation LLM RAG sont regroupés dans `components/marketing/llm-rag`.

## Publication

La publication d’un nouveau parcours doit être progressive :

1. données préparées avec `is_published = false` ;
2. tests et recette ;
3. activation des modules, leçons, ressources, exercices et quiz ;
4. activation du parcours ;
5. vérification des accès et progressions.

Aucune migration ne doit supprimer ou réaffecter les données Python existantes.
