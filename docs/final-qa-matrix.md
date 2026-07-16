# Matrice QA finale — Chantier 15

Statut global attendu avant Chantier 16 : **PASS** sur tous les contrôles locaux et hors secrets.

## Catalogue et publication

| Contrôle | Attendu | Statut |
|---|---|---|
| Python Data Analyst reste le parcours par défaut | `python-data-analyst` publié et fallback actif | PASS |
| LLM RAG reste non publié | aucune entrée apprenant active | PASS |
| Landing LLM RAG | visible comme parcours en préparation | PASS |

## Accès multi-parcours

| Contrôle | Attendu | Statut |
|---|---|---|
| Grant sans parcours explicite | rattachement Python | PASS |
| Grant avec parcours publié | `course_id` résolu | PASS |
| Grant LLM RAG non publié | refusé | PASS |
| Module d’un autre parcours | traité comme introuvable | PASS |

## Progression, quiz et projet

| Contrôle | Attendu | Statut |
|---|---|---|
| Progression | isolée par `course_id` | PASS |
| Questions de quiz | réponses absentes avant soumission | PASS |
| Correction quiz | réponse et explication après soumission | PASS |
| Projet final | brief public, solution de référence protégée | PASS |
| Certification | lecture et émission conservant le parcours | PASS |

## Sécurité

| Contrôle | Attendu | Statut |
|---|---|---|
| En-têtes HTTP | actifs frontend et backend | PASS |
| Rate limiting | routes IA et readiness protégées | PASS |
| Solutions | authentification requise | PASS |
| Notebook | chemin confiné au dossier prévu | PASS |
| Secrets | aucun vrai `.env` lu ou affiché | PASS |

## Frontend et responsive

| Contrôle | Attendu | Statut |
|---|---|---|
| Mobile-first | navigation empilée puis horizontale sur grand écran | PASS |
| Accessibilité | labels, focus visible, alertes et page active | PASS |
| Chargement | état explicite avec `aria-busy` | PASS |
| Erreur | message non sensible et bouton Réessayer | PASS |
| Parcours vide/non publié | états distincts | PASS |
| Contexte | parcours conservé entre modules, dashboard et certificat | PASS |

## Base et contenu

| Contrôle | Attendu | Statut |
|---|---|---|
| Fondation multi-parcours | migrations présentes | PASS |
| Leçons LLM RAG | 26 attendues | PASS |
| Exercices | 12 attendus | PASS |
| Quiz | 48 questions attendues | PASS |
| Projet final | 9 jalons et barème sur 60 | PASS |
| Publication | tous les seeds LLM RAG restent inactifs | PASS |

## Commandes de recette

```bash
python scripts/quality_check.py --with-build
python scripts/final_qa.py
```

Le rapport machine est généré dans `qa-final-report.json`.

## Limites avant Chantier 16

La QA locale ne remplace pas :

- application réelle des migrations sur une base Supabase de test ;
- probes Qdrant et Cohere avec identifiants autorisés ;
- recette navigateur sur l’URL déployée ;
- contrôle production après déploiement.

Ces contrôles appartiennent au **Chantier 16 — Go-live** et nécessitent une validation explicite avant toute migration, publication, mise en production, commit ou push.
