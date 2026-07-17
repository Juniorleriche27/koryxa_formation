-- Ressources externes officielles du parcours LLM RAG.
-- Compatible avec le schéma existant : les liens sont intégrés au Markdown.

WITH c AS (SELECT id FROM public.courses WHERE slug = 'llm-rag')
INSERT INTO public.theory_resources(
    course_id, slug, title, summary, content_md, resource_type, order_index, is_published
)
SELECT c.id, v.slug, v.title, v.summary, v.content_md, 'external', v.ord, TRUE
FROM c CROSS JOIN (VALUES
('qdrant-quickstart-officiel','Qdrant — démarrage rapide','Créer une première collection vectorielle et effectuer une recherche sémantique.','# Documentation officielle\n\nUtilisez cette ressource après le module sur l’indexation vectorielle.\n\n[Consulter le démarrage rapide Qdrant](https://qdrant.tech/documentation/quickstart/)',20),
('qdrant-query-api','Qdrant — Query API','Comprendre les recherches vectorielles, filtres et requêtes hybrides.','# Documentation officielle\n\nRéférence utile pour approfondir le retrieval.\n\n[Consulter la Query API Qdrant](https://qdrant.tech/documentation/search/search/)',21),
('qdrant-fastembed','FastEmbed — génération d’embeddings','Générer rapidement des embeddings avec l’outil léger de Qdrant.','# Documentation officielle\n\nComplément pratique du laboratoire embeddings.\n\n[Consulter le guide FastEmbed](https://qdrant.tech/documentation/fastembed/fastembed-quickstart/)',22),
('huggingface-rag','Hugging Face — RAG','Comprendre le modèle Retrieval-Augmented Generation et ses composants.','# Documentation officielle\n\nRessource de référence pour relier retrieval et génération.\n\n[Consulter la documentation RAG de Hugging Face](https://huggingface.co/docs/transformers/main/model_doc/rag)',23),
('huggingface-agentic-rag','Hugging Face — Agentic RAG','Étudier un exemple moderne de RAG fondé sur des outils et une base de connaissances.','# Documentation officielle\n\nÀ consulter après avoir maîtrisé le pipeline RAG classique.\n\n[Consulter l’exemple Agentic RAG](https://huggingface.co/docs/smolagents/examples/rag)',24),
('streamlit-get-started','Streamlit — prise en main','Installer Streamlit et créer une première application interactive.','# Documentation officielle\n\nSupport du module interface utilisateur.\n\n[Consulter la prise en main Streamlit](https://docs.streamlit.io/get-started)',25),
('streamlit-main-concepts','Streamlit — concepts fondamentaux','Comprendre le flux d’exécution, les widgets, les layouts et les états.','# Documentation officielle\n\nRéférence pour structurer proprement l’interface du projet final.\n\n[Consulter les concepts fondamentaux Streamlit](https://docs.streamlit.io/get-started/fundamentals/main-concepts)',26),
('streamlit-deployment','Streamlit Community Cloud — déploiement','Publier une application Streamlit connectée à un dépôt GitHub.','# Documentation officielle\n\nSupport du module mise en ligne.\n\n[Consulter le guide de déploiement Streamlit](https://docs.streamlit.io/deploy/streamlit-community-cloud/get-started)',27)
) AS v(slug,title,summary,content_md,ord)
ON CONFLICT(course_id,slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    content_md = EXCLUDED.content_md,
    resource_type = EXCLUDED.resource_type,
    order_index = EXCLUDED.order_index,
    is_published = TRUE;
