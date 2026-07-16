# Intégration KORYXA Formation multi-parcours

## Catalogue

Le catalogue public ne retourne que les parcours publiés. `python-data-analyst` reste publié et accessible. `llm-rag` reste présent dans les données de préparation mais n’est pas retourné comme parcours apprenant tant que `is_published` vaut `false`.

## KORYXA Admin

Le bridge signé peut transmettre `course_slug`. En son absence, le parcours attribué reste `python-data-analyst` pour préserver les accès historiques.

Le backend résout obligatoirement le slug avec le service des parcours publiés. Une tentative d’attribution vers un parcours non publié est refusée.

Contrat attendu dans le payload signé :

```json
{
  "project": "koryxa-formation",
  "clerk_user_id": "...",
  "course_slug": "python-data-analyst"
}
```

Aucun secret de bridge ne doit être transmis dans le payload.

## Accès apprenant

`GET /access/courses` retourne uniquement les parcours publiés et ajoute `has_access` pour indiquer celui couvert par le grant actif.

Un grant reste rattaché à un seul `course_id`. Les modules, quiz, progressions, projets et certificats sont vérifiés dans ce périmètre.

## Dashboard et certification

Le dashboard et la page certificat lisent le paramètre `course` de l’URL et le transmettent aux API correspondantes. Les liens entre modules conservent ce contexte.

Exemples :

- `/dashboard?course=python-data-analyst`
- `/certificate?course=python-data-analyst`
- `/modules?course=python-data-analyst`

## Compatibilité

- `/dashboard`, `/certificate` et `/modules` continuent d’utiliser Python par défaut.
- Les anciens grants sans sélection explicite restent rattachés à Python via la migration et le fallback backend.
- LLM RAG ne peut pas être attribué ni ouvert avant publication.

## Activation future de LLM RAG

1. terminer recette et QA ;
2. publier les contenus nécessaires ;
3. publier le parcours ;
4. rendre `llm-rag` sélectionnable dans KORYXA Admin ;
5. créer des grants dédiés ;
6. vérifier dashboard, progression, projet final et certificat avec un compte de test.
