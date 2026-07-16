# Incident et rollback

## Déclencheurs

- contenu publié par erreur ;
- accès croisé entre parcours ;
- secret potentiellement exposé ;
- migration partiellement appliquée ;
- progression ou certificat incohérent ;
- service cloud indisponible ;
- régression Python Data Analyst.

## Réponse immédiate

1. Identifier le périmètre exact.
2. Suspendre l’action concernée sans redémarrage global inutile.
3. Désactiver le contenu ou parcours avec `is_published = false` lorsque possible.
4. Révoquer toute clé potentiellement exposée.
5. Préserver les journaux nécessaires sans copier de données sensibles.
6. Sauvegarder l’état de la base avant correction.

## Rollback applicatif

- revenir au dernier commit validé ;
- reconstruire frontend et backend ;
- vérifier les endpoints ;
- ne pas forcer un push sans validation explicite.

## Rollback données

- privilégier une migration corrective idempotente ;
- ne jamais supprimer les progressions ou certificats sans procédure validée ;
- restaurer depuis sauvegarde uniquement après confirmation de l’impact ;
- vérifier le rattachement `course_id` après correction.

## Recette après incident

```bash
python scripts/quality_check.py --with-build
```

Puis contrôler :

- accès Python ;
- parcours non publiés invisibles ;
- grants ;
- progression ;
- quiz ;
- projet final ;
- certificats ;
- logs et health checks.

## Rapport d’incident

Documenter : date, durée, impact, cause, services touchés, données concernées, actions réalisées, vérifications finales et mesure préventive.
