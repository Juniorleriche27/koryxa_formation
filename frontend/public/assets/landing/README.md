# Landing assets — KORYXA Formation

Dossier préparé pour le redesign du landing général.

## Structure

```txt
hero/        Image humaine principale, ordinateur, environnement learning/tech
platform/    Mockups produit exportés ou visuels d'interface
formations/  Visuels par formation: Python Data, LLM/RAG, roadmap
motion/      Animations légères Lottie/SVG si retenues
og/          Image OpenGraph 1200x630
```

## Règles d'ajout

- Utiliser des noms de fichiers explicites en kebab-case.
- Optimiser les images avant commit.
- Préférer `webp` pour les photos intégrées au site.
- Garder `jpg` seulement si nécessaire pour OpenGraph ou compatibilité.
- Ne pas ajouter d'image sans vérifier la licence et la source.
- Éviter les logos, marques tierces visibles et visages trop reconnaissables sans prudence.
- Pour le hero, utiliser `next/image` avec `priority` uniquement sur l'image principale.

## Nommage cible

```txt
hero/koryxa-learner-laptop.webp
platform/koryxa-learning-dashboard.webp
formations/python-data-card.webp
formations/llm-rag-preview.webp
motion/learning-progress.json
og/koryxa-formation-home.jpg
```
