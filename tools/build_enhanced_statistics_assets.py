"""Script de generation des assets pedagogiques pour le parcours
Statistiques & Data Science avec Python (KORYXA Formation)

Cree les donnees entreprises reelles dans :
- frontend/public/resources/statistics-data-science/
- frontend/public/resources/statistics-data-science-python/
"""
import os
import json
import random
import datetime
from pathlib import Path

random.seed(42)

ROOT = Path(__file__).resolve().parents[1]
DIRS = [
    ROOT / "frontend/public/resources/statistics-data-science",
    ROOT / "frontend/public/resources/statistics-data-science-python",
]

for d in DIRS:
    d.mkdir(parents=True, exist_ok=True)

# 1. GENERATION DE transactions_clients.csv (2 500 clients)
villes_regions = [
    ("Abidjan", "Côte d'Ivoire"),
    ("Dakar", "Sénégal"),
    ("Douala", "Cameroun"),
    ("Cotonou", "Bénin"),
    ("Lomé", "Togo"),
    ("Libreville", "Gabon"),
    ("Bamako", "Mali"),
    ("Ouagadougou", "Burkina Faso"),
]

canaux = ["En ligne", "Boutique", "Distributeur", "Commercial B2B"]
segments_init = ["Particulier", "Professionnel", "PME", "Grand Compte"]

clients_rows = [
    "id_client,ville,pays,segment,canal_principal,anciennete_mois,recence_jours,frequence_achats,montant_total_fcfa,panier_moyen_fcfa,taux_satisfaction,score_engagement,a_churn"
]

for i in range(1, 2501):
    cid = f"CLT_{i:04d}"
    ville, pays = random.choice(villes_regions)
    seg = random.choices(segments_init, weights=[0.45, 0.25, 0.20, 0.10])[0]
    canal = random.choice(canaux)
    
    anciennete = random.randint(1, 48) # mois
    recence = random.randint(1, 365) # jours
    
    if seg == "Particulier":
        freq = random.randint(1, 14)
        panier = round(random.gauss(35000, 12000), -2)
        panier = max(7500, panier)
    elif seg == "Professionnel":
        freq = random.randint(3, 28)
        panier = round(random.gauss(85000, 25000), -2)
        panier = max(25000, panier)
    elif seg == "PME":
        freq = random.randint(6, 45)
        panier = round(random.gauss(240000, 65000), -2)
        panier = max(75000, panier)
    else: # Grand Compte
        freq = random.randint(10, 80)
        panier = round(random.gauss(850000, 220000), -2)
        panier = max(250000, panier)
        
    montant_total = int(freq * panier)
    panier_moyen = int(panier)
    satisfaction = round(min(5.0, max(1.0, random.gauss(4.1, 0.7))), 1)
    engagement = round(min(100.0, max(10.0, (freq * 1.5) + (50 - recence / 8) + random.uniform(5, 25))), 1)
    
    # Churn probabiliste basé sur récence et satisfaction
    prob_churn = 0.05
    if recence > 180: prob_churn += 0.45
    elif recence > 90: prob_churn += 0.20
    if satisfaction < 3.0: prob_churn += 0.30
    a_churn = 1 if (random.random() < prob_churn) else 0
    
    clients_rows.append(
        f"{cid},{ville},{pays},{seg},{canal},{anciennete},{recence},{freq},{montant_total},{panier_moyen},{satisfaction},{engagement},{a_churn}"
    )

content_clients = "\n".join(clients_rows) + "\n"

# 2. GENERATION DE ventes_journalieres.csv (730 jours: 2024-01-01 à 2025-12-31)
start_date = datetime.date(2024, 1, 1)
ventes_rows = [
    "date,ventes_fcfa,quantite_articles,commandes_nb,jour_semaine,nom_jour,mois,annee,est_weekend,promo_active"
]

base_vente = 2800000 # 2.8M FCFA par jour en moyenne de départ
growth_rate = 1.0006 # croissance tendancielle ~25% par an

for day_idx in range(730):
    curr_date = start_date + datetime.timedelta(days=day_idx)
    dow = curr_date.weekday() # 0 = Lundi, 6 = Dimanche
    jours_nom = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
    nom_j = jours_nom[dow]
    est_weekend = 1 if dow in (5, 6) else 0
    
    # Facteur jour de la semaine
    facteur_dow = [1.05, 0.95, 1.00, 1.10, 1.25, 1.15, 0.70][dow]
    
    # Facteur mensuel (effet fin de mois paye + pic de fin d'annee)
    day_of_month = curr_date.day
    facteur_paye = 1.22 if day_of_month >= 25 or day_of_month <= 3 else 1.0
    
    facteur_saison = 1.0
    if curr_date.month in (11, 12): facteur_saison = 1.35 # fin d'annee
    elif curr_date.month in (7, 8): facteur_saison = 0.92 # vacances
    
    promo_active = 1 if (day_of_month in (28, 29, 30) or (curr_date.month == 11 and curr_date.day >= 20)) else 0
    facteur_promo = 1.28 if promo_active else 1.0
    
    bruit = random.gauss(1.0, 0.08)
    
    vente_jour = int(base_vente * (growth_rate ** day_idx) * facteur_dow * facteur_paye * facteur_saison * facteur_promo * bruit)
    articles = max(10, int(vente_jour / random.uniform(22000, 28000)))
    commandes = max(5, int(articles / random.uniform(2.5, 4.0)))
    
    ventes_rows.append(
        f"{curr_date.isoformat()},{vente_jour},{articles},{commandes},{dow},{nom_j},{curr_date.month},{curr_date.year},{est_weekend},{promo_active}"
    )

content_ventes = "\n".join(ventes_rows) + "\n"

# 3. GENERATION DU DICTIONNAIRE DE DONNEES (dictionnaire_donnees.md)
content_dict = """# Dictionnaire des Données · Statistiques & Data Science

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
"""

# 4. GENERATION DU STARTER NOTEBOOK (.ipynb)
cells = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# Parcours KORYXA Formation — Statistiques & Data Science avec Python\n",
            "## Projet Professionnel : Analyse, Segmentation Client & Prévision des Ventes\n",
            "\n",
            "Ce notebook applique la démarche scientifique aux données réelles de KORYXA Distribution (2 500 clients et 730 jours de ventes)."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "import numpy as np\n",
            "import pandas as pd\n",
            "import matplotlib.pyplot as plt\n",
            "\n",
            "# Fixer la graine aleatoire pour la reproductibilite stricte\n",
            "np.random.seed(42)\n",
            "plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')\n",
            "print('Environnement Data Science KORYXA configure avec succes.')"
        ]
    },
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "### 1. Chargement et Audit de Qualite des Donnees\n",
            "Inspection des types, verification de l'absence de valeurs manquantes et controle du grain."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "df_clients = pd.read_csv('transactions_clients.csv')\n",
            "df_ventes = pd.read_csv('ventes_journalieres.csv')\n",
            "df_ventes['date'] = pd.to_datetime(df_ventes['date'])\n",
            "\n",
            "print(f'Dimensions Clients : {df_clients.shape}')\n",
            "print(f'Dimensions Ventes : {df_ventes.shape}')\n",
            "display(df_clients.head(3))"
        ]
    },
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "### 2. Statistiques Descriptives & Distributions\n",
            "Calcul des tendances centrales (moyenne vs mediane) et dispersion (ecart-type, IQR)."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "stats_panier = df_clients['panier_moyen_fcfa'].describe(percentiles=[0.25, 0.5, 0.75, 0.95])\n",
            "iqr = stats_panier['75%'] - stats_panier['25%']\n",
            "print('--- Synthese Statistique Panier Moyen (FCFA) ---')\n",
            "print(f'Moyenne : {stats_panier[\"mean\"]:,.0f} FCFA')\n",
            "print(f'Mediane : {stats_panier[\"50%\"]:,.0f} FCFA')\n",
            "print(f'IQR     : {iqr:,.0f} FCFA')\n",
            "\n",
            "plt.figure(figsize=(10, 4))\n",
            "plt.hist(df_clients['panier_moyen_fcfa'] / 1000, bins=40, color='#00a86b', edgecolor='black', alpha=0.8)\n",
            "plt.title('Distribution du Panier Moyen Client (kFCFA)')\n",
            "plt.xlabel('Panier Moyen (kFCFA)')\n",
            "plt.ylabel('Frequence (Nombre de Clients)')\n",
            "plt.show()"
        ]
    },
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "### 3. Tests d'Hypotheses & Comparaison de Groupes\n",
            "Testons si les clients avec `satisfaction >= 4.0` ont un panier moyen significativement superieur."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "from scipy import stats\n",
            "\n",
            "groupe_satisfait = df_clients[df_clients['taux_satisfaction'] >= 4.0]['panier_moyen_fcfa']\n",
            "groupe_neutre = df_clients[df_clients['taux_satisfaction'] < 4.0]['panier_moyen_fcfa']\n",
            "\n",
            "# Test t de Welch (sans supposer l'egalite des variances)\n",
            "stat_t, p_val = stats.ttest_ind(groupe_satisfait, groupe_neutre, equal_var=False)\n",
            "print(f'Statistique t de Welch : {stat_t:.4f}')\n",
            "print(f'P-valeur : {p_val:.4e}')\n",
            "if p_val < 0.05:\n",
            "    print('=> Difference statistiquement significative au seuil alpha = 5%')"
        ]
    },
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "### 4. Segmentation Client K-Means (Pipeline RFM)\n",
            "Standardisation via `StandardScaler`, selection du nombre de clusters $k$ et interpretation metier."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "from sklearn.preprocessing import StandardScaler\n",
            "from sklearn.cluster import KMeans\n",
            "\n",
            "rfm_features = ['recence_jours', 'frequence_achats', 'montant_total_fcfa']\n",
            "X = df_clients[rfm_features]\n",
            "\n",
            "scaler = StandardScaler()\n",
            "X_scaled = scaler.fit_transform(X)\n",
            "\n",
            "kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)\n",
            "df_clients['cluster'] = kmeans.fit_predict(X_scaled)\n",
            "\n",
            "profil_clusters = df_clients.groupby('cluster')[rfm_features].mean()\n",
            "display(profil_clusters.round(1))"
        ]
    },
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "### 5. Prevision Temporelle des Ventes Journalieres\n",
            "Separation train/test chronologique sans fuite d'information et calcul de l'erreur MAE."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# Train sur les 600 premiers jours, Test sur les 130 derniers\n",
            "split_idx = 600\n",
            "train = df_ventes.iloc[:split_idx]\n",
            "test = df_ventes.iloc[split_idx:].copy()\n",
            "\n",
            "# Baseline Saisonniere (valeur de la semaine precedente J-7)\n",
            "test['prev_baseline_saison'] = df_ventes['ventes_fcfa'].shift(7).iloc[split_idx:]\n",
            "\n",
            "mae_baseline = np.mean(np.abs(test['ventes_fcfa'] - test['prev_baseline_saison']))\n",
            "print(f'MAE Baseline Saisonniere J-7 : {mae_baseline:,.0f} FCFA')\n",
            "\n",
            "plt.figure(figsize=(12, 4))\n",
            "plt.plot(test['date'], test['ventes_fcfa'] / 1e6, label='Reel', color='black')\n",
            "plt.plot(test['date'], test['prev_baseline_saison'] / 1e6, label='Baseline Saisonniere J-7', color='#00a86b', linestyle='--')\n",
            "plt.title('Prevision des Ventes Journalieres (Millions FCFA)')\n",
            "plt.xlabel('Date')\n",
            "plt.ylabel('Ventes (M FCFA)')\n",
            "plt.legend()\n",
            "plt.show()"
        ]
    }
]

notebook_json = {
    "cells": cells,
    "metadata": {
        "kernelspec": {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3"
        },
        "language_info": {
            "name": "python",
            "version": "3.10.0"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 5
}

# ECRIRE DANS TOUS LES DOSSIERS CIBLES
for target_dir in DIRS:
    (target_dir / "transactions_clients.csv").write_text(content_clients, encoding="utf-8", newline="\n")
    (target_dir / "ventes_journalieres.csv").write_text(content_ventes, encoding="utf-8", newline="\n")
    (target_dir / "dictionnaire_donnees.md").write_text(content_dict, encoding="utf-8", newline="\n")
    with open(target_dir / "starter_notebook.ipynb", "w", encoding="utf-8", newline="\n") as f:
        json.dump(notebook_json, f, indent=2, ensure_ascii=False)
        f.write("\n")

print("Tous les assets de Statistiques & Data Science ont ete generes avec succes dans :")
for d in DIRS:
    print(f" -> {d}")
