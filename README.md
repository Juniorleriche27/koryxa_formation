# KORYXA Pôle Formation

Plateforme multi-parcours composée de :

- un frontend Next.js dans `frontend/` ;
- une API FastAPI dans `backend/` ;
- un schéma et des migrations Supabase dans `supabase/` ;
- des contrôles qualité dans `scripts/` ;
- la documentation produit et technique dans `docs/`.

## Parcours de Formation

- `python-data-analyst` : Python Data Analyst (parcours par défaut) ;
- `llm-rag` : LLM RAG Developer ;
- `excel-data-analyst` : Excel Data Analyst ;
- `power-bi-data-analyst` : Power BI Data Analyst ;
- `sql-data-analyst` : SQL Data Analyst avec PostgreSQL ;
- `statistics-data-science-python` : Statistiques & Data Science avec Python ;
- `machine-learning-python` : Machine Learning avec Python ;
- `data-engineering-python-sql` : Data Engineering avec Python et SQL.

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
