# Expérience apprenant multi-parcours

## Objectifs

- montrer clairement le parcours actif ;
- conserver le contexte du parcours entre la liste et le module ;
- éviter toute confusion entre Python Data Analyst et LLM RAG ;
- rendre la progression lisible sur mobile et desktop ;
- fournir des états chargement, erreur et vide explicites ;
- garder LLM RAG fermé tant que le parcours n’est pas publié.

## Navigation

L’espace apprenant affiche désormais :

- le nom du parcours actif ;
- un lien vers la vue d’ensemble ;
- un indicateur de la page module ;
- un retour vers la présentation publique ;
- une barre de progression sur la liste des modules.

Les routes existantes restent compatibles :

- `/modules` ouvre Python Data Analyst ;
- `/modules?course=python-data-analyst` ouvre explicitement Python ;
- `/learn/[course]` conserve le contexte du parcours.

## États UX

- Chargement : indicateur annoncé avec `aria-live` et `aria-busy`.
- Erreur : message non sensible, retour au parcours et action Réessayer.
- Parcours vide publié : aucun module disponible.
- Parcours non publié : message de préparation et lien vers la présentation publique.
- Module verrouillé : explication et retour au parcours.

## Accessibilité

- navigation nommée avec `aria-label` ;
- page active signalée avec `aria-current` ;
- focus visible sur les actions ;
- boutons et liens utilisables au clavier ;
- contrastes conservés sur le thème sombre ;
- mise en page mobile-first.

## Protection du parcours Python

Python Data Analyst reste le parcours par défaut. Aucun module, accès, quiz ou contenu Python n’est masqué par ces changements.
