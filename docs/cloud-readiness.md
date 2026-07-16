# Recette cloud — KORYXA Formation

## Services concernés

- Supabase : données, authentification et API REST ;
- Qdrant : stockage et recherche vectorielle ;
- Cohere : génération et embeddings selon la configuration du parcours LLM RAG.

## Modes d’exécution

- `mock` : aucun service cloud requis ;
- `local` : services locaux ou de développement ;
- `cloud` : configuration complète et probes réels possibles.

Le mode par défaut reste `mock` pour éviter toute dépendance externe involontaire.

## Variables attendues

Les noms de variables sont documentés sans aucune valeur réelle :

- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` si nécessaire côté serveur
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `QDRANT_COLLECTION`
- `COHERE_API_KEY`
- `COHERE_MODEL`
- `RAG_RUNTIME_MODE`
- `CLOUD_PROBE_TIMEOUT_SECONDS`

Ne jamais afficher, journaliser ou copier le contenu d’un vrai `.env`.

## Diagnostic sans réseau

```bash
python scripts/cloud_readiness.py
```

Le rapport indique uniquement :

- si chaque intégration est configurée ;
- le mode d’exécution ;
- si la configuration est prête pour le cloud.

Aucune URL complète, clé ou valeur secrète n’est affichée.

## Probe réel

À exécuter uniquement dans un environnement de test autorisé :

```bash
python scripts/cloud_readiness.py --probe
```

Le probe vérifie la joignabilité et retourne uniquement un état, un message générique et une latence. Les erreurs réseau sont nettoyées avant journalisation.

## Endpoint backend

```text
GET /integrations/readiness
GET /integrations/readiness?probe=true
```

Le second endpoint ne doit pas être exposé publiquement sans contrôle d’accès réseau ou applicatif approprié.

## Critères de recette

1. Supabase répond avec la clé prévue pour l’environnement de test.
2. La collection Qdrant existe et correspond à `QDRANT_COLLECTION`.
3. Le fournisseur LLM accepte l’authentification et le modèle configuré.
4. Aucun secret n’apparaît dans les réponses ou logs.
5. Le mode `cloud` n’est activé qu’après validation des trois services.
6. Le parcours `llm-rag` reste non publié jusqu’à la recette complète.

## Limite de ce chantier

Aucun probe réel n’est obligatoire sans identifiants de test disponibles dans le workspace. La préparation, les protections et les tests hors réseau sont néanmoins opérationnels.
