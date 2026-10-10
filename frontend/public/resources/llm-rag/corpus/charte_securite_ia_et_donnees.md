# CHARTE DE SÉCURITÉ DE L'INFORMATION ET USAGE DE L'INTELLIGENCE ARTIFICIELLE
**Réf : SSI-CHARTE-2026-01 | KORYXA GROUP**
*Classification : Confidentiel Interne*

## 1. Contexte et Champ d'Application
Face à l'adoption croissante des outils d'Intelligence Artificielle Générative, cette charte fixe les règles d'utilisation des Large Language Models (LLM) et des applications basées sur le Retrieval-Augmented Generation (RAG).

## 2. Classification des Données d'Entreprise
- **Niveau 1 - Public :** Communiqués de presse, catalogues commerciaux publics.
- **Niveau 2 - Usage Interne :** Politiques internes, guides d'onboarding, documentation technique.
- **Niveau 3 - Confidentiel Métier :** Contrats clients, balances comptables, données financières en FCFA, codes sources applicatifs.
- **Niveau 4 - Strictement Secret :** Données à caractère personnel des salariés (NIF, coordonnées bancaires), secrets industriels, clés de chiffrement.

## 3. Règles d'Usage des Outils LLM
- **Interdiction Formelle :** Il est strictement interdit d'injecter des données de Niveau 3 ou 4 dans des modèles publics externes gratuits (ex. versions grand public gratuites de ChatGPT, Claude, Copilot sans convention d'entreprise garantissant la non-conservation des données).
- **Assistant Souverain Interne :** Toutes les requêtes portant sur les procédures internes de l'entreprise doivent transiter exclusivement par l'assistant documentaire souverain KORYXA RAG, hébergé sur l'infrastructure sécurisée du groupe.
- **Garde-Fous et Protection Anti-Injection :**
  - Les entrées utilisateurs sont soumises à un filtre de détection de prompt injection (rejet des motifs de jailbreak, d'oubli d'instructions système).
  - Les réponses de l'assistant doivent obligatoirement inclure les identifiants de documents sources sous forme de citations vérifiables [DOC-ID, Section].
  - Si le contexte documentaire ne contient pas la réponse avec un score de similarité supérieur à 0.70, le modèle doit explicitement répondre : *"Désolé, les documents internes fournis ne contiennent pas d'information suffisante pour répondre à cette demande."*

## 4. Politique des Mots de Passe et Accès API
- Authentification multifacteur (MFA) obligatoire pour tous les comptes applicatifs.
- Clés d'API Qdrant, OpenAI ou HuggingFace strictement isolées dans des coffres de secrets (.env chiffrés, Vault), rotation trimestrielle obligatoire.
