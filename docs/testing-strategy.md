# Stratégie de tests — KORYXA Formation

## Objectif

Protéger le parcours Python Data Analyst existant tout en ajoutant les nouveaux parcours, notamment LLM RAG.

## Commande unique

```bash
python scripts/quality_check.py --with-build
```

Cette commande exécute :

1. compilation du backend Python ;
2. tests unitaires des services multi-parcours ;
3. tests statiques des migrations et seeds ;
4. vérification du refactor du Chantier 8 ;
5. invariants frontend ;
6. contrôle `git diff --check` ;
7. build production Next.js.

## Couverture actuelle

### Backend

- fallback `python-data-analyst` ;
- masquage des parcours non publiés ;
- contrôle d’appartenance module/parcours ;
- filtrage systématique `is_published` ;
- erreurs 404 structurées ;
- lecture des contenus publiés.

### Migrations

- conservation du parcours Python ;
- rattachement rétrocompatible des données historiques ;
- ciblage exclusif de `llm-rag` pour les nouveaux seeds ;
- maintien de LLM RAG en non publié ;
- vérification des volumes attendus : 26 leçons, 12 exercices, 48 questions, 9 jalons et barème sur 60.

### Frontend

- fallback Python dans les routes ;
- conservation du parcours dans les liens entre modules ;
- présence de la landing page LLM RAG ;
- absence de CTA public vers l’espace apprenant LLM RAG avant publication ;
- validation TypeScript et rendu par le build Next.js.

## Limites actuelles

Ces tests ne remplacent pas :

- une migration exécutée sur une base Supabase de test ;
- les tests avec Cohere et Qdrant Cloud ;
- les tests end-to-end dans un navigateur ;
- la recette production.

Ces validations seront traitées dans les chantiers cloud, sécurité et recette.
