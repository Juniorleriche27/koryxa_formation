# Exploitation, migrations et publication

## Avant migration

1. Vérifier l’état Git.
2. Exécuter `python scripts/quality_check.py --with-build`.
3. Sauvegarder la base cible.
4. Vérifier l’ordre lexical des migrations.
5. Confirmer qu’aucune migration ne supprime ou ne réaffecte les données Python existantes.
6. Utiliser un environnement de test avant la production.

## Ordre des migrations LLM RAG

1. fondation multi-parcours ;
2. curriculum ;
3. contenu des leçons ;
4. supports théoriques ;
5. exercices ;
6. quiz ;
7. projet final.

## Publication d’un parcours

La publication doit être progressive :

1. publier les ressources et leçons validées ;
2. publier les exercices et quiz ;
3. publier les modules ;
4. publier le projet final ;
5. publier le parcours ;
6. créer un grant de test ;
7. vérifier dashboard, progression, certification et restrictions inter-parcours.

Ne jamais publier `llm-rag` avant la fin de la recette et l’accord explicite.

## Vérifications après mise en ligne

- health backend ;
- catalogue public ;
- connexion apprenant ;
- accès Python historique ;
- mauvais parcours refusé ;
- progression et quiz ;
- émission du certificat ;
- logs sans secret ;
- endpoints cloud ;
- rendu mobile et desktop.

## Rollback

Consulter [Incident et rollback](incident-and-rollback.md). Une migration de rollback doit être préparée et testée avant toute opération risquée. Ne pas supprimer les données apprenants pour annuler une publication : désactiver d’abord `is_published` et les accès concernés.
