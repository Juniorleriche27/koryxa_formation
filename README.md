# KORYXA Pôle Formation

Plateforme multi-parcours composée de :

- un frontend Next.js dans `frontend/` ;
- une API FastAPI dans `backend/` ;
- un schéma et des migrations Supabase dans `supabase/` ;
- des contrôles qualité dans `scripts/` ;
- la documentation produit et technique dans `docs/`.

## Parcours

- `python-data-analyst` : parcours historique publié et fallback par défaut ;
- `llm-rag` : parcours en préparation, non publié tant que la recette n’est pas terminée.

## Démarrage local

Consulter [`docs/local-development.md`](docs/local-development.md).

## Documentation

L’index complet se trouve dans [`docs/README.md`](docs/README.md).

## Contrôle qualité

```bash
python scripts/quality_check.py --with-build
```

Cette commande compile le backend, exécute les tests, vérifie les migrations, contrôle la documentation et lance le build frontend.

## Sécurité

Ne jamais versionner ni afficher un vrai fichier `.env`, une clé API, un token ou un mot de passe. Les variables attendues sont documentées uniquement par leur nom dans la documentation.
