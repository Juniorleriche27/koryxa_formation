# Référence API

## Parcours et contenus

- `GET /courses/`
- `GET /courses/{slug}`
- `GET /modules/?course={slug}`
- `GET /lessons/{course_slug}/modules/{module_id}`
- `GET /exercises/{course_slug}/modules/{module_id}`
- `GET /theory/{course_slug}`
- `GET /projects/{course_slug}`

Les routes publiques filtrent systématiquement `is_published = true`.

## Quiz et validation

- lecture des questions sans réponses correctes ;
- soumission via les routes de validation ;
- correction détaillée uniquement après soumission ;
- seuil standard : 12/20.

## Accès et multi-parcours

- `GET /access/session`
- `GET /access/courses`

Un grant est rattaché à un `course_id`. Un module appartenant à un autre parcours doit être traité comme introuvable.

## Projets et certification

Les projets finaux, progressions, snapshots et certificats sont isolés par parcours. Le paramètre `course` doit être conservé entre frontend, proxy Next.js et backend.

## Intégrations

- `GET /integrations/readiness`
- `GET /integrations/readiness?probe=true`

Le probe réel est réservé aux environnements autorisés. Les réponses ne doivent contenir aucun secret.

## Erreurs

Les erreurs attendues utilisent des codes HTTP standards :

- `400` entrée invalide ;
- `401` authentification requise ;
- `403` accès interdit ;
- `404` contenu absent, non publié ou hors parcours ;
- `413` fichier trop volumineux ;
- `415` format non autorisé ;
- `429` trop de requêtes ;
- `502` fournisseur externe indisponible.
