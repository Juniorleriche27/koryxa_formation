# Développement local

## Prérequis

- Python 3.11 ou version compatible avec le backend ;
- Node.js compatible avec le frontend ;
- npm ;
- Git.

## Backend

Depuis `backend/` :

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Le backend attend des variables Supabase. Utiliser un fichier local non versionné. Ne jamais afficher son contenu dans les logs ou rapports.

## Frontend

Depuis `frontend/` :

```bash
npm ci
npm run dev
```

## Variables documentées

Noms principaux, sans valeur :

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_JWT_SECRET`
- `COHERE_API_KEY`
- `COHERE_MODEL`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `QDRANT_COLLECTION`
- `RAG_RUNTIME_MODE`
- `CORS_ORIGINS`

## Vérification locale

```bash
python scripts/quality_check.py --with-build
```

Pour le diagnostic cloud sans réseau :

```bash
python scripts/cloud_readiness.py
```

## Règles

- Python Data Analyst reste le parcours par défaut ;
- LLM RAG reste non publié ;
- aucune migration distante ne doit être appliquée pendant un simple développement local ;
- aucun secret ne doit être ajouté au dépôt.
