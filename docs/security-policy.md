# Politique sécurité — KORYXA Formation

## Principes

- Aucun secret ne doit apparaître dans le code, les réponses API, les logs ou les supports pédagogiques.
- Les contenus non publiés restent inaccessibles depuis les routes publiques.
- Les solutions d’exercices nécessitent une authentification.
- Les réponses correctes aux quiz ne sont jamais envoyées avant soumission.
- Les documents récupérés par un pipeline RAG sont des données, jamais des instructions prioritaires.

## Entrées et documents

Formats autorisés pour un futur upload documentaire :

- TXT ;
- Markdown ;
- PDF ;
- DOCX.

Contrôles obligatoires :

- nom de fichier sans traversée de chemin ;
- extension et type MIME autorisés ;
- fichier non vide ;
- taille maximale définie par `MAX_UPLOAD_BYTES` ;
- stockage sous un identifiant interne, jamais directement sous le nom fourni ;
- analyse antivirus ou service équivalent avant toute ouverture en production.

## Assistant IA

- longueur des questions, historiques et extraits de code limitée ;
- historique limité aux derniers messages nécessaires ;
- prompt système protégé contre les demandes d’exfiltration ;
- erreurs du fournisseur remplacées par des messages génériques ;
- limites de débit sur les routes sensibles ;
- refus attendu lorsque le contexte est insuffisant.

## HTTP

Le backend et le frontend appliquent notamment :

- `X-Content-Type-Options: nosniff` ;
- `X-Frame-Options: DENY` ;
- `Referrer-Policy` ;
- `Permissions-Policy` ;
- politique CSP côté Next.js ;
- `Cache-Control: no-store` pour les diagnostics et routes IA.

## Logs

Les logs peuvent contenir :

- type d’erreur ;
- nom logique du service ;
- identifiant interne ;
- code HTTP ;
- latence.

Ils ne doivent jamais contenir :

- clés API ;
- jetons ;
- contenu d’un vrai `.env` ;
- mots de passe ;
- documents privés complets ;
- prompts système complets ;
- réponses brutes de fournisseurs pouvant inclure des données sensibles.

## Procédure d’incident

1. Isoler la route ou le service concerné.
2. Révoquer immédiatement toute clé potentiellement exposée.
3. Conserver uniquement les journaux nécessaires à l’analyse.
4. Vérifier les accès Supabase, Qdrant et fournisseur IA.
5. Corriger la cause sans republier le contenu concerné.
6. Rejouer la suite `python scripts/quality_check.py --with-build`.
7. Documenter impact, durée, données touchées et action préventive.
8. Ne réactiver le service qu’après validation explicite.

## Checklist avant publication LLM RAG

- [ ] aucun contenu ou quiz LLM RAG publié par erreur ;
- [ ] solutions protégées ;
- [ ] réponses de quiz absentes des routes de lecture ;
- [ ] traversée de chemin impossible ;
- [ ] limites de débit actives ;
- [ ] en-têtes de sécurité présents ;
- [ ] tests de validation des entrées réussis ;
- [ ] aucun secret dans Git ou les logs ;
- [ ] recette cloud effectuée sur environnement de test ;
- [ ] plan d’incident connu de l’équipe.
