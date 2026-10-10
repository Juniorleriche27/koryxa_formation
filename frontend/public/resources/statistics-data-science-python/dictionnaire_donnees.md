# Dictionnaire des Données · Statistiques & Data Science

Ce jeu de données d'entreprise modélise les transactions commerciales et l'activité journalière du groupe **KORYXA Distribution Ouest & Centre Afrique** (2024–2025).

---

## 1. Table `transactions_clients.csv`
- **Grain** : 1 ligne = 1 client unique (2 500 clients observés).

| Variable | Type | Description | Valeurs / Unité |
| :--- | :--- | :--- | :--- |
| `id_client` | Texte | Identifiant unique du client | `CLT_0001` à `CLT_2500` |
| `ville` | Texte | Ville d'implantation principale | Abidjan, Dakar, Douala, Cotonou, Lomé, etc. |
| `pays` | Texte | Pays de la zone UEMOA / CEMAC | Côte d'Ivoire, Sénégal, Cameroun, Bénin... |
| `segment` | Catégorie | Typologie contractuelle client | Particulier, Professionnel, PME, Grand Compte |
| `canal_principal` | Catégorie | Canal d'acquisition / d'achat | En ligne, Boutique, Distributeur, Commercial B2B |
| `anciennete_mois` | Entier | Nombre de mois depuis le premier achat | 1 à 48 mois |
| `recence_jours` | Entier | Jours écoulés depuis le dernier achat | 1 à 365 jours |
| `frequence_achats` | Entier | Nombre total de commandes passées | 1 à 80 commandes |
| `montant_total_fcfa`| Entier | Somme cumulée dépensée | Francs CFA (XOF/XAF) |
| `panier_moyen_fcfa` | Entier | Dépense moyenne par commande | Francs CFA |
| `taux_satisfaction`| Décimal | Note moyenne attribuée lors des enquêtes | Échelle 1.0 à 5.0 |
| `score_engagement` | Décimal | Score synthétique d'interaction client | 10.0 à 100.0 points |
| `a_churn` | Binaire | Statut de désengagement (1 = inactif/perdu) | 0 ou 1 |

---

## 2. Table `ventes_journalieres.csv`
- **Grain** : 1 ligne = 1 date journalière continue (730 jours : 2024-01-01 au 2025-12-31).

| Variable | Type | Description | Valeurs / Unité |
| :--- | :--- | :--- | :--- |
| `date` | Date ISO | Date du jour au format AAAA-MM-JJ | `2024-01-01` à `2025-12-31` |
| `ventes_fcfa` | Entier | Chiffre d'affaires journalier encaissé | Francs CFA |
| `quantite_articles`| Entier | Nombre d'articles physiques vendus | Quantité |
| `commandes_nb` | Entier | Nombre de bordereaux de commandes | Entier positif |
| `jour_semaine` | Entier | Indice du jour (0 = Lundi, 6 = Dimanche) | 0 à 6 |
| `nom_jour` | Texte | Nom en clair du jour | Lundi, Mardi... |
| `mois` | Entier | Numéro du mois calendaire | 1 à 12 |
| `annee` | Entier | Année civile | 2024 ou 2025 |
| `est_weekend` | Binaire | Indicateur samedi / dimanche | 0 ou 1 |
| `promo_active` | Binaire | Présence d'une campagne de remise | 0 ou 1 |

---

## 3. Objectifs d'Analyse Statistique & Data Science
1. **Statistique Descriptive & Tests** : Évaluer l'effet du canal et du segment sur le panier moyen (Tests t de Welch, ANOVA à 1 facteur, régression OLS).
2. **Segmentation K-Means** : Regrouper les 2 500 clients par profil RFM (Récence, Fréquence, Montant) après standardisation `StandardScaler`.
3. **Prévision Chronologique** : Modéliser la série temporelle journalière, comparer les baselines (naïve, saisonnière J-7) avec une modélisation walk-forward (MAE, RMSE, WAPE).
