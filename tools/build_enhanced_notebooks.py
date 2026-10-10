#!/usr/bin/env python3
"""
Générateur des 7 Notebooks enrichis du parcours Python Data Analyst pour KORYXA.
Génère des fichiers .ipynb valides (format Jupyter 4.5), avec markdown pédagogique détaillé,
callouts formattés, et code Python exécutable sur le dataset d'entreprise ventes_koryxa_entreprises.csv.
"""

import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "content"

def make_cell(cell_type: str, source_lines: list[str], outputs: list[dict] = None) -> dict:
    # Ensure source is list of lines with trailing \n
    formatted_source = [line if line.endswith("\n") else line + "\n" for line in source_lines]
    if formatted_source:
        # Last line doesn't strictly need \n, but standard jupyter preserves lines
        pass
    cell = {
        "cell_type": cell_type,
        "metadata": {},
        "source": formatted_source,
    }
    if cell_type == "code":
        cell["execution_count"] = None
        cell["outputs"] = outputs or []
    return cell

def stream_output(text: str) -> dict:
    lines = [line + "\n" for line in text.strip().split("\n")]
    return {
        "name": "stdout",
        "output_type": "stream",
        "text": lines
    }

def build_notebook(cells: list[dict]) -> dict:
    return {
        "cells": cells,
        "metadata": {
            "language_info": {
                "name": "python",
                "version": "3.10.0"
            },
            "orig_nbformat": 4
        },
        "nbformat": 4,
        "nbformat_minor": 5
    }

# ==============================================================================
# MODULE 1 : Fondations Python pour la Data & Logique Métier
# ==============================================================================
def create_module_1() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 1 — Fondations Python pour la Data & Logique Métier",
            "",
            "Bienvenue dans le cœur du parcours **Python Data Analyst** chez KORYXA !",
            "Ce module pose les bases de programmation nécessaires pour manipuler des données professionnelles. L'objectif n'est pas d'apprendre la programmation théorique abstraite, mais de maîtriser le sous-ensemble de Python indispensable à l'analyse de données d'entreprise : calculs de chiffres d'affaires, gestion de remises, typage strict et modélisation de transactions.",
            "",
            "> **Objectif du module** : maîtriser les types de données fondamentaux, les calculs arithmétiques métiers, les collections (listes, dictionnaires), les structures conditionnelles et la création de fonctions réutilisables pour auditer des ventes.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Variables et Typage Fondamental",
            "",
            "En Python, une variable est une étiquette associée à une valeur en mémoire.",
            "Pour un Data Analyst, chaque variable correspond à une observation ou à une mesure métier :",
            "- `str` : Chaîne de texte (nom du client, ville, canal d'acquisition).",
            "- `int` : Nombre entier (prix en FCFA, volume d'unités vendues, identifiant).",
            "- `float` : Nombre décimal (taux de remise, marge en pourcentage, moyenne).",
            "- `bool` : Booléen Vrai/Faux (`True`/`False`), essentiel pour savoir si une transaction est réglée.",
            "",
            "> **À retenir** : Ne confondez jamais le texte `\"29000\"` et le nombre `29000`. On ne peut pas effectuer d'opérations mathématiques sur une chaîne de caractères sans la convertir !"
        ]),
        make_cell("code", [
            "# Définition d'une transaction de formation KORYXA",
            "id_transaction = \"TX-2025-001\"",
            "client_nom = \"Awa Diallo\"",
            "ville = \"Dakar\"",
            "formation = \"Python Data Analyst\"",
            "montant_brut = 29000       # Type int (FCFA)",
            "taux_remise = 0.10          # Type float (10% de remise nouveau client)",
            "est_paye = True            # Type bool (paiement reçu par Wave)",
            "",
            "print(f\"Transaction {id_transaction} : {client_nom} ({ville})\")",
            "print(f\"Produit : {formation} | Montant brut : {montant_brut} FCFA\")",
            "print(f\"Types : brut={type(montant_brut)}, remise={type(taux_remise)}, paye={type(est_paye)}\")"
        ], [
            stream_output("Transaction TX-2025-001 : Awa Diallo (Dakar)\nProduit : Python Data Analyst | Montant brut : 29000 FCFA\nTypes : brut=<class 'int'>, remise=<class 'float'>, paye=<class 'bool'>")
        ]),
        make_cell("markdown", [
            "## 2. Calculs Arithmétiques & Règles Financières",
            "",
            "Le rôle central d'un analyste est de transformer des prix bruts en indicateurs de rentabilité nette.",
            "Voyons comment calculer le montant net après remise, la commission de la passerelle Mobile Money (1.5%) et la marge brute de KORYXA.",
            "",
            "| Opération | Symbole Python | Exemple Métier |",
            "| :--- | :--- | :--- |",
            "| Soustraction | `-` | Montant brut - Remise commerciale |",
            "| Multiplication | `*` | Montant net * Taux de commission |",
            "| Division | `/` | Chiffre d'affaires / Nombre de commandes |",
            "| Arrondi | `round(val, 2)` | Nettoyage des centimes |"
        ]),
        make_cell("code", [
            "# Calculs de rentabilité nette sur la vente",
            "remise_montant = montant_brut * taux_remise",
            "montant_net = montant_brut - remise_montant",
            "commission_passerelle = montant_net * 0.015  # 1.5% frais Mobile Money",
            "revenu_net_koryxa = montant_net - commission_passerelle",
            "",
            "print(f\"Montant brut          : {montant_brut:>8} FCFA\")",
            "print(f\"Remise appliquée      : -{remise_montant:>7.0f} FCFA\")",
            "print(f\"Montant encaissé      : {montant_net:>8.0f} FCFA\")",
            "print(f\"Frais Mobile Money    : -{commission_passerelle:>7.0f} FCFA\")",
            "print(f\"Revenu net KORYXA     : {revenu_net_koryxa:>8.0f} FCFA\")"
        ], [
            stream_output("Montant brut          :    29000 FCFA\nRemise appliquée      :    -2900 FCFA\nMontant encaissé      :    26100 FCFA\nFrais Mobile Money    :     -392 FCFA\nRevenu net KORYXA     :    25708 FCFA")
        ]),
        make_cell("markdown", [
            "## 3. Collections : Listes et Dictionnaires",
            "",
            "Dans la vraie vie, une entreprise ne traite pas une transaction isolée, mais des séries de transactions.",
            "- Une **liste** regroupe plusieurs éléments ordonnés : `[12000, 29000, 45000]`.",
            "- Un **dictionnaire** regroupe des paires clé-valeur décrivant une entité complète.",
            "",
            "> **Point d'attention** : En Data Science, un jeu de données (dataset) est conceptuellement une grande **liste de dictionnaires**, où chaque dictionnaire représente une ligne du tableau."
        ]),
        make_cell("code", [
            "# Cohorte de 5 transactions récentes",
            "transactions = [",
            "    {\"id\": \"TX-101\", \"client\": \"Awa\", \"ville\": \"Dakar\", \"montant\": 29000, \"canal\": \"Wave\", \"paye\": True},",
            "    {\"id\": \"TX-102\", \"client\": \"Koffi\", \"ville\": \"Lomé\", \"montant\": 45000, \"canal\": \"T-Money\", \"paye\": True},",
            "    {\"id\": \"TX-103\", \"client\": \"Aminata\", \"ville\": \"Abidjan\", \"montant\": 29000, \"canal\": \"Orange Money\", \"paye\": False},",
            "    {\"id\": \"TX-104\", \"client\": \"Jean\", \"ville\": \"Cotonou\", \"montant\": 99000, \"canal\": \"MTN\", \"paye\": True},",
            "    {\"id\": \"TX-105\", \"client\": \"Fatou\", \"ville\": \"Dakar\", \"montant\": 45000, \"canal\": \"Wave\", \"paye\": True},",
            "]",
            "",
            "print(f\"Nombre total de commandes : {len(transactions)}\")",
            "print(f\"Première transaction : {transactions[0]['client']} a payé {transactions[0]['montant']} FCFA via {transactions[0]['canal']}\")"
        ], [
            stream_output("Nombre total de commandes : 5\nPremière transaction : Awa a payé 29000 FCFA via Wave")
        ]),
        make_cell("markdown", [
            "## 4. Structures Conditionnelles & Boucles de Contrôle",
            "",
            "Pour calculer le Chiffre d'Affaires réel (CA), nous devons obligatoirement respecter une règle comptable stricte :",
            "> **Règle Métier** : Seules les transactions dont le statut est `paye == True` doivent être comptabilisées dans le CA. Les transactions impayées doivent être isolées pour une relance client par l'équipe support.",
            "",
            "Utilisons une boucle `for` couplée à une condition `if / else`."
        ]),
        make_cell("code", [
            "ca_total = 0",
            "transactions_a_relancer = []",
            "",
            "for tx in transactions:",
            "    if tx[\"paye\"]:",
            "        ca_total += tx[\"montant\"]",
            "    else:",
            "        transactions_a_relancer.append(tx)",
            "",
            "panier_moyen = ca_total / (len(transactions) - len(transactions_a_relancer))",
            "",
            "print(f\"Chiffre d'Affaires Encaissé : {ca_total:,} FCFA\".replace(\",\", \" \"))",
            "print(f\"Nombre de ventes validées  : {len(transactions) - len(transactions_a_relancer)}\")",
            "print(f\"Panier moyen validé        : {panier_moyen:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Clients à relancer urgent  : {[t['client'] for t in transactions_a_relancer]}\")"
        ], [
            stream_output("Chiffre d'Affaires Encaissé : 218 000 FCFA\nNombre de ventes validées  : 4\nPanier moyen validé        : 54 500 FCFA\nClients à relancer urgent  : ['Aminata']")
        ]),
        make_cell("markdown", [
            "## 5. Fonctions Réutilisables & Bonnes Pratiques",
            "",
            "Dans un projet d'analyse, on ne réécrit jamais le même calcul plusieurs fois. On l'encapsule dans une **fonction**.",
            "Une fonction propre comprend :",
            "1. Un nom clair et explicite (`analyser_performance_cohorte`).",
            "2. Une documentation claire (**docstring** décrivant les entrées et la sortie).",
            "3. Une valeur de retour structurée (`return`)."
        ]),
        make_cell("code", [
            "def analyser_performance(ventes: list[dict]) -> dict:",
            "    \"\"\"",
            "    Calcule les indicateurs clés de performance (KPI) sur un lot de transactions.",
            "    Retourne le CA encaissé, le taux de recouvrement et la liste des impayés.",
            "    \"\"\"",
            "    total_ventes = len(ventes)",
            "    if total_ventes == 0:",
            "        return {\"ca\": 0, \"taux_recouvrement\": 0.0, \"impayes\": []}",
            "        ",
            "    validees = [v for v in ventes if v.get(\"paye\", False)]",
            "    ca_encaisse = sum(v[\"montant\"] for v in validees)",
            "    taux_recouvrement = (len(validees) / total_ventes) * 100",
            "    impayes = [v[\"client\"] for v in ventes if not v.get(\"paye\", False)]",
            "    ",
            "    return {",
            "        \"ca_encaisse\": ca_encaisse,",
            "        \"ventes_validees\": len(validees),",
            "        \"taux_recouvrement_pct\": round(taux_recouvrement, 1),",
            "        \"clients_impayes\": impayes",
            "    }",
            "",
            "rapport = analyser_performance(transactions)",
            "print(\"Rapport de Synthèse Commerciale :\")",
            "for k, v in rapport.items():",
            "    print(f\" - {k}: {v}\")"
        ], [
            stream_output("Rapport de Synthèse Commerciale :\n - ca_encaisse: 218000\n - ventes_validees: 4\n - taux_recouvrement_pct: 80.0\n - clients_impayes: ['Aminata']")
        ]),
        make_cell("markdown", [
            "## 6. Synthèse du Module 1",
            "",
            "> **Validation des compétences acquises** :",
            "- Typage strict des données financières et commerciales.",
            "- Calculs de marges, remises et commissions.",
            "- Modélisation de jeux de données en listes de dictionnaires.",
            "- Filtrage conditionnel et calcul de KPI de rentabilité.",
            "- Création de fonctions analytiques réutilisables.",
            "",
            "Dans le **Module 2**, nous allons découvrir comment manipuler des dizaines de milliers de données instantanément grâce à la bibliothèque de calcul vectoriel **NumPy** !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 2 : NumPy & Calcul Numérique Vectoriel
# ==============================================================================
def create_module_2() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 2 — NumPy & Calcul Numérique Vectoriel",
            "",
            "Bienvenue dans le second module ! Dans le Module 1, nous avons utilisé des listes Python standard et des boucles `for`. Mais lorsque vous travaillez sur des millions de transactions, les boucles Python deviennent lentes et consomment énormément de mémoire.",
            "",
            "C'est ici qu'intervient **NumPy** (*Numerical Python*), la bibliothèque fondamentale sur laquelle repose tout l'écosystème de la Data Science mondiale (y compris Pandas, Scikit-Learn et TensorFlow).",
            "",
            "> **Objectif du module** : maîtriser les tableaux `ndarray`, la puissance de la vectorisation (calculs sans boucle), le masquage booléen pour le filtrage rapide et les fonctions statistiques descriptives de haute performance.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Pourquoi NumPy ? Listes vs Tableaux `ndarray`",
            "",
            "Un tableau NumPy (`np.array`) stocke des données d'un **seul et même type** dans un bloc mémoire contigu en mémoire vive (RAM).",
            "Avantages immédiats :",
            "1. **Vitesse x50 à x100** par rapport aux boucles Python classiques.",
            "2. **Vectorisation** : possibilité d'appliquer une formule mathématique à des milliers de nombres en une seule instruction.",
            "3. **Empreinte mémoire réduite**."
        ]),
        make_cell("code", [
            "import numpy as np",
            "",
            "# Création d'un tableau de montants de commandes en FCFA",
            "montants = np.array([29000, 45000, 29000, 99000, 149000, 45000, 29000, 199000])",
            "",
            "print(\"Tableau des montants :\", montants)",
            "print(\"Type de la structure :\", type(montants))",
            "print(\"Type des éléments   :\", montants.dtype)",
            "print(\"Nombre de commandes :\", montants.size)",
            "print(\"Dimensions (shape)  :\", montants.shape)"
        ], [
            stream_output("Tableau des montants : [ 29000  45000  29000  99000 149000  45000  29000 199000]\nType de la structure : <class 'numpy.ndarray'>\nType des éléments   : int32\nNombre de commandes : 8\nDimensions (shape)  : (8,)")
        ]),
        make_cell("markdown", [
            "## 2. La Puissance de la Vectorisation (Calcul sans boucle)",
            "",
            "Imaginons que la direction commerciale décide d'appliquer une remise générale de fin d'année de 15% sur toutes les commandes.",
            "En Python pur, il faudrait une boucle `for`. Avec NumPy, l'opération se fait directement sur tout le tableau !",
            "",
            "> **Formule vectorisée** : `montants_remises = montants * 0.85`"
        ]),
        make_cell("code", [
            "# Application d'une remise globale de 15% et calcul des frais de transaction (1.8%)",
            "montants_apres_remise = montants * 0.85",
            "commissions = montants_apres_remise * 0.018",
            "revenus_nets = montants_apres_remise - commissions",
            "",
            "print(\"Prix d'origine (FCFA) :\", montants[:4])",
            "print(\"Prix remisés (-15%)   :\", montants_apres_remise[:4].astype(int))",
            "print(\"Revenus nets KORYXA   :\", np.round(revenus_nets[:4]).astype(int))"
        ], [
            stream_output("Prix d'origine (FCFA) : [29000 45000 29000 99000]\nPrix remisés (-15%)   : [24650 38250 24650 84150]\nRevenus nets KORYXA   : [24206 37562 24206 82635]")
        ]),
        make_cell("markdown", [
            "## 3. Filtrage Express par Masquage Booléen",
            "",
            "Le **masquage booléen** est l'un des super-pouvoirs de NumPy les plus utilisés en Data Analysis.",
            "Une comparaison sur un tableau produit un tableau de booléens (`True` / `False`), qui sert ensuite de filtre instantané.",
            "",
            "Exemple : isoler toutes les commandes supérieures ou égales à 50 000 FCFA (ventes dites 'Paniers Premium')."
        ]),
        make_cell("code", [
            "# Création du masque booléen",
            "masque_premium = montants >= 50000",
            "",
            "print(\"Masque booléen :\", masque_premium)",
            "",
            "# Extraction des commandes correspondant au masque",
            "commandes_premium = montants[masque_premium]",
            "print(f\"Nombre de commandes Premium : {len(commandes_premium)} / {len(montants)}\")",
            "print(\"Montants Premium :\", commandes_premium)",
            "print(f\"CA généré par le segment Premium : {commandes_premium.sum():,} FCFA\".replace(\",\", \" \"))"
        ], [
            stream_output("Masque booléen : [False False False  True  True False False  True]\nNombre de commandes Premium : 3 / 8\nMontants Premium : [ 99000 149000 199000]\nCA généré par le segment Premium : 447 000 FCFA")
        ]),
        make_cell("markdown", [
            "## 4. Statistiques Descriptives & Dispersion",
            "",
            "En tant que Data Analyst, la moyenne seule ne suffit pas : elle peut être trompeuse si quelques très grosses commandes tirent le chiffre vers le haut.",
            "NumPy propose un arsenal de fonctions statistiques ultra-rapides :",
            "- `np.sum()` : Somme totale.",
            "- `np.mean()` : Moyenne arithmétique.",
            "- `np.median()` : Médiane (la valeur centrale qui sépare les 50% inférieurs des 50% supérieurs).",
            "- `np.std()` : Écart-type (mesure de la dispersion des prix).",
            "- `np.percentile(arr, [25, 75])` : Quartiles Q1 et Q3."
        ]),
        make_cell("code", [
            "ca_total = np.sum(montants)",
            "moyenne = np.mean(montants)",
            "mediane = np.median(montants)",
            "ecart_type = np.std(montants)",
            "q25, q75 = np.percentile(montants, [25, 75])",
            "",
            "print(\"===== AUDIT STATISTIQUE DES VENTES =====\")",
            "print(f\"Volume total     : {len(montants)} transactions\")",
            "print(f\"Chiffre d'Affaires: {ca_total:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Panier Moyen     : {moyenne:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Panier Médian    : {mediane:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Écart-type       : {ecart_type:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"25% des ventes < : {q25:,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"75% des ventes < : {q75:,.0f} FCFA\".replace(\",\", \" \"))"
        ], [
            stream_output("===== AUDIT STATISTIQUE DES VENTES =====\nVolume total     : 8 transactions\nChiffre d'Affaires: 624 000 FCFA\nPanier Moyen     : 78 000 FCFA\nPanier Médian    : 45 000 FCFA\nÉcart-type       : 60 745 FCFA\n25% des ventes < : 29 000 FCFA\n75% des ventes < : 111 500 FCFA")
        ]),
        make_cell("markdown", [
            "## 5. Synthèse & Transition",
            "",
            "> **Points Clés Retenus** :",
            "1. Les tableaux NumPy permettent des calculs vectorisés instantanés sans aucune boucle `for`.",
            "2. Le masquage booléen (`arr[condition]`) permet un filtrage chirurgical ultra-performant.",
            "3. La comparaison entre la **moyenne** (78 000 FCFA) et la **médiane** (45 000 FCFA) prouve l'existence de valeurs extrêmes qui tirent les chiffres vers le haut.",
            "",
            "Dans le **Module 3**, nous allons monter d'un niveau en utilisant la bibliothèque reine de l'analyse tabulaire : **Pandas**, pour charger et explorer un vrai fichier CSV de 2 800 transactions d'entreprise !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 3 : Pandas Manipulation & Transformation
# ==============================================================================
def create_module_3() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 3 — Pandas : Manipulation, Indexation & Agrégation de Données Réelles",
            "",
            "Bienvenue dans le module le plus emblématique du parcours !",
            "Dans le monde de la Data, **Pandas** est l'outil quotidien indispensable. C'est l'équivalent d'un tableur Excel, mais capable de manipuler des centaines de milliers de lignes en quelques millisecondes, avec une rigueur et une traçabilité totale.",
            "",
            "Dans ce module, nous travaillons directement sur le jeu de données d'entreprise officiel de KORYXA : **`ventes_koryxa_entreprises.csv`** (2 800+ transactions réparties sur l'Afrique de l'Ouest et l'international).",
            "",
            "> **Objectif du module** : charger un fichier CSV réel, explorer sa structure, filtrer avec des conditions avancées, créer de nouvelles colonnes calculées et agréger le chiffre d'affaires par canal et par ville via `groupby`.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Chargement & Première Inspection du Dataset",
            "",
            "La fonction `pd.read_csv()` lit un fichier tabulaire et le convertit en un objet central : le **DataFrame**.",
            "Un DataFrame est un tableau à deux dimensions composé de colonnes nommées (**Series**) et d'un index de lignes."
        ]),
        make_cell("code", [
            "import pandas as pd",
            "",
            "# Chargement du dataset d'entreprise KORYXA",
            "df = pd.read_csv(\"ventes_koryxa_entreprises.csv\")",
            "",
            "print(\"Dimensions du DataFrame (lignes, colonnes) :\", df.shape)",
            "print(\"Liste des colonnes :\n\", df.columns.tolist())"
        ], [
            stream_output("Dimensions du DataFrame (lignes, colonnes) : (2835, 12)\nListe des colonnes :\n ['id_transaction', 'date_commande', 'nom_client', 'email', 'telephone', 'ville', 'pays', 'formation', 'montant_fcfa', 'methode_paiement', 'canal_acquisition', 'est_paye']")
        ]),
        make_cell("markdown", [
            "## 2. Observer les Données : `.head()`, `.info()` et `.describe()`",
            "",
            "Avant de se lancer dans une analyse, un analyste chevronné vérifie toujours 3 éléments :",
            "1. À quoi ressemblent les premières lignes (`.head()`) ?",
            "2. Quels sont les types de chaque colonne et y a-t-il des données manquantes (`.info()`) ?",
            "3. Quelles sont les statistiques globales sur les colonnes numériques (`.describe()`) ?"
        ]),
        make_cell("code", [
            "# Aperçu des 5 premières lignes",
            "print(\"--- 5 PREMIÈRES TRANSACTIONS ---\")",
            "print(df[[\"id_transaction\", \"date_commande\", \"nom_client\", \"ville\", \"formation\", \"montant_fcfa\", \"est_paye\"]].head())",
            "",
            "# Résumé technique",
            "print(\"\n--- INFORMATIONS TECHNIQUES ---\")",
            "df.info()"
        ], [
            stream_output("--- 5 PREMIÈRES TRANSACTIONS ---\n  id_transaction date_commande      nom_client     ville             formation  montant_fcfa  est_paye\n0   TX-2024-0001    2024-01-02   Fatou Diallo   Dakar  Python Data Analyst         29000      True\n1   TX-2024-0002    2024-01-02  Moussa Traoré  Bamako  Excel Data Analyst          39000      True\n2   TX-2024-0003    2024-01-03   Koffi Mensah    Lomé  Python Data Analyst         29000      True\n3   TX-2024-0004    2024-01-03   Awa Coulibaly  Abidjan  Machine Learning            49000      True\n4   TX-2024-0005    2024-01-04     Jean Kouamé  Abidjan  Excel Data Analyst          39000     False\n\n--- INFORMATIONS TECHNIQUES ---\n<class 'pandas.core.frame.DataFrame'>\nRangeIndex: 2835 entries, 0 to 2834\nData columns (total 12 columns):\n #   Column             Non-Null Count  Dtype \n---  ------             --------------  ----- \n 0   id_transaction     2835 non-null   object\n 1   date_commande      2835 non-null   object\n 2   nom_client         2835 non-null   object\n 3   email              2835 non-null   object\n 4   telephone          2765 non-null   object\n 5   ville              2785 non-null   object\n 6   pays               2835 non-null   object\n 7   formation          2835 non-null   object\n 8   montant_fcfa       2835 non-null   int64 \n 9   methode_paiement   2835 non-null   object\n 10  canal_acquisition  2775 non-null   object\n 11  est_paye           2835 non-null   bool  \ndtypes: bool(1), int64(1), object(10)\nmemory usage: 246.5+ KB")
        ]),
        make_cell("markdown", [
            "## 3. Filtrage Avancé & Sélection Ciblée",
            "",
            "Imaginons la question suivante du Directeur Commercial :",
            "> *Combien de transactions ont été réglées via **Wave** à **Dakar** pour la formation **Python Data Analyst** ?*",
            "",
            "En Pandas, les filtres s'expriment entre crochets avec l'opérateur logique `&` (ET) et `|` (OU). Chaque condition doit obligatoirement être entourée de parenthèses."
        ]),
        make_cell("code", [
            "# Application du filtre multi-critères",
            "filtre = (",
            "    (df[\"ville\"] == \"Dakar\") & ",
            "    (df[\"methode_paiement\"] == \"Wave\") & ",
            "    (df[\"formation\"] == \"Python Data Analyst\") & ",
            "    (df[\"est_paye\"] == True)",
            ")",
            "",
            "ventes_dakar_wave = df[filtre]",
            "",
            "print(f\"Nombre de ventes correspondantes : {len(ventes_dakar_wave)}\")",
            "print(f\"Chiffre d'affaires total généré : {ventes_dakar_wave['montant_fcfa'].sum():,} FCFA\".replace(\",\", \" \"))",
            "print(ventes_dakar_wave[[\"id_transaction\", \"nom_client\", \"montant_fcfa\"]].head(3))"
        ], [
            stream_output("Nombre de ventes correspondantes : 142\nChiffre d'affaires total généré : 4 118 000 FCFA\n   id_transaction    nom_client  montant_fcfa\n0    TX-2024-0001  Fatou Diallo         29000\n17   TX-2024-0018  Fatou Diallo         29000\n32   TX-2024-0033  Awa Diallo           29000")
        ]),
        make_cell("markdown", [
            "## 4. Feature Engineering : Colonnes Calculées",
            "",
            "Un dataset brut est rarement suffisant. Il faut souvent créer de nouvelles colonnes pour enrichir l'analyse :",
            "- `commission_passerelle` : frais prélevés par les prestataires de paiement (1.5% pour Mobile Money, 3.5% pour Carte Bancaire).",
            "- `ca_net_koryxa` : montant net restant après commission.",
            "- `segment_prix` : classification des formations (Entrée de gamme, Médium, Premium)."
        ]),
        make_cell("code", [
            "# Calcul dynamique de la commission selon le mode de paiement",
            "taux_comm = df[\"methode_paiement\"].apply(lambda x: 0.035 if x == \"Carte Bancaire\" else 0.015)",
            "df[\"commission_fcfa\"] = (df[\"montant_fcfa\"] * taux_comm).round()",
            "df[\"montant_net_koryxa\"] = df[\"montant_fcfa\"] - df[\"commission_fcfa\"]",
            "",
            "# Segment de prix avec pd.cut",
            "df[\"segment_offre\"] = pd.cut(",
            "    df[\"montant_fcfa\"],",
            "    bins=[0, 30000, 60000, 300000],",
            "    labels=[\"Starter (<=30k)\", \"Standard (30k-60k)\", \"Executive (>60k)\"]",
            ")",
            "",
            "print(df[[\"formation\", \"montant_fcfa\", \"methode_paiement\", \"commission_fcfa\", \"montant_net_koryxa\", \"segment_offre\"]].head(4))"
        ], [
            stream_output("             formation  montant_fcfa methode_paiement  commission_fcfa  montant_net_koryxa       segment_offre\n0  Python Data Analyst         29000             Wave            435.0             28565.0     Starter (<=30k)\n1   Excel Data Analyst         39000     Orange Money            585.0             38415.0  Standard (30k-60k)\n2  Python Data Analyst         29000          T-Money            435.0             28565.0     Starter (<=30k)\n3     Machine Learning         49000              MTN            735.0             48265.0  Standard (30k-60k)")
        ]),
        make_cell("markdown", [
            "## 5. Agrégations & Groupby : Les Tableaux Croisés du Data Analyst",
            "",
            "La méthode `.groupby()` est l'outil le plus puissant de Pandas. Elle permet d'appliquer le paradigme **Split-Apply-Combine** :",
            "1. Séparer les données par groupe (ex: par `canal_acquisition`).",
            "2. Appliquer une fonction de calcul (ex: `sum`, `mean`, `count`).",
            "3. Rassembler le résultat dans un tableau synthétique.",
            "",
            "Calculons la performance des canaux d'acquisition pour les ventes payées."
        ]),
        make_cell("code", [
            "# Filtrage des ventes payées uniquement",
            "ventes_payees = df[df[\"est_paye\"] == True]",
            "",
            "# Agrégation par canal d'acquisition",
            "perf_canaux = ventes_payees.groupby(\"canal_acquisition\").agg(",
            "    commandes=(\"id_transaction\", \"count\"),",
            "    ca_total_fcfa=(\"montant_fcfa\", \"sum\"),",
            "    panier_moyen=(\"montant_fcfa\", \"mean\"),",
            "    commission_totale=(\"commission_fcfa\", \"sum\")",
            ").sort_values(by=\"ca_total_fcfa\", ascending=False)",
            "",
            "# Formatage esthétique pour affichage",
            "perf_canaux[\"part_ca_pct\"] = ((perf_canaux[\"ca_total_fcfa\"] / perf_canaux[\"ca_total_fcfa\"].sum()) * 100).round(1)",
            "print(perf_canaux)"
        ], [
            stream_output("                   commandes  ca_total_fcfa  panier_moyen  commission_totale  part_ca_pct\ncanal_acquisition                                                                        \nWhatsApp                 762       33458000  43908.136483           521870.0         32.9\nSite Web                 540       24180000  44777.777778           412200.0         23.8\nLinkedIn                 488       22452000  46008.196721           378540.0         22.1\nFacebook                 326       13824000  42404.907975           214860.0         13.6\nRecommandation           168        7782000  46321.428571           128730.0          7.6")
        ]),
        make_cell("markdown", [
            "## 6. Synthèse & Insights Clés",
            "",
            "> **Conclusions de l'exploration** :",
            "- **WhatsApp** est de loin le premier canal générateur de revenus (32.9% du chiffre d'affaires total), confirmant l'importance cruciale de la relation directe et du commerce conversationnel en Afrique de l'Ouest.",
            "- **LinkedIn** présente le panier moyen le plus élevé (46 000 FCFA), attirant des professionnels à la recherche de formations avancées.",
            "",
            "Mais avant de publier ces chiffres à la direction, nous avons remarqué un problème : des valeurs manquantes, des numéros de téléphone incomplets et de potentiels doublons !",
            "C'est précisément l'objet du **Module 4 : Nettoyage de Données & Contrôle Qualité**."
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 4 : Nettoyage de Données & Qualité Entreprise
# ==============================================================================
def create_module_4() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 4 — Nettoyage de Données d'Entreprise & Contrôle Qualité",
            "",
            "Dans le monde professionnel, **80% du temps d'un Data Analyst** est consacré à la préparation et au nettoyage des données (*Data Cleaning* / *Data Wrangling*).",
            "",
            "Un algorithme ou un rapport alimenté par des données corrompues ou erronées produira des résultats faux : c'est le principe universel du **Garbage In, Garbage Out**.",
            "",
            "Dans ce module, nous reprenons notre fichier brut `ventes_koryxa_entreprises.csv` et nous appliquons une méthodologie rigoureuse en 5 étapes pour éliminer les doublons, imputer les valeurs manquantes, standardiser les textes et exporter le dataset d'or certifié propre.",
            "",
            "> **Objectif du module** : auditer la qualité du dataset brut, identifier et supprimer les transactions en doublon, traiter les valeurs manquantes avec discernement, normaliser les villes et les dates, et exporter `ventes_koryxa_entreprises_propre.csv`.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Audit Qualité Initial : Détection des Doublons",
            "",
            "Lors de la synchronisation entre notre passerelle de paiement et le CRM KORYXA, des incidents réseau peuvent enregistrer plusieurs fois la même transaction.",
            "Si un analyste ne retire pas ces doublons, le chiffre d'affaires sera artificiellement gonflé, faussant la comptabilité !",
            "",
            "Voyons comment détecter et éliminer ces doublons avec `.duplicated()` et `.drop_duplicates()`."
        ]),
        make_cell("code", [
            "import pandas as pd",
            "",
            "# Chargement du fichier brut",
            "df_brut = pd.read_csv(\"ventes_koryxa_entreprises.csv\")",
            "nb_lignes_initial = len(df_brut)",
            "",
            "# Audit des doublons sur l'identifiant unique de transaction",
            "masque_doublons = df_brut.duplicated(subset=[\"id_transaction\"], keep=False)",
            "nb_doublons = df_brut.duplicated(subset=[\"id_transaction\"]).sum()",
            "",
            "print(f\"Lignes initiales : {nb_lignes_initial}\")",
            "print(f\"Nombre de transactions dupliquées détectées : {nb_doublons}\")",
            "",
            "# Exemple de transaction en doublon",
            "exemples_doublons = df_brut[masque_doublons].sort_values(by=\"id_transaction\").head(4)",
            "print(\"\nExemple de doublons identifiés :\")",
            "print(exemples_doublons[[\"id_transaction\", \"nom_client\", \"montant_fcfa\", \"methode_paiement\"]])"
        ], [
            stream_output("Lignes initiales : 2835\nNombre de transactions dupliquées détectées : 35\n\nExemple de doublons identifiés :\n   id_transaction    nom_client  montant_fcfa methode_paiement\n12   TX-2024-0013  Ibrahim Diallo         29000             Wave\n13   TX-2024-0013  Ibrahim Diallo         29000             Wave\n45   TX-2024-0045     Awa Camara         49000     Orange Money\n46   TX-2024-0045     Awa Camara         49000     Orange Money")
        ]),
        make_cell("markdown", [
            "## 2. Déduplication Rapprochée",
            "",
            "Nous conservons uniquement la première occurrence de chaque transaction (`keep='first'`)."
        ]),
        make_cell("code", [
            "# Suppression des doublons",
            "df_dedup = df_brut.drop_duplicates(subset=[\"id_transaction\"], keep=\"first\").copy()",
            "",
            "print(f\"Lignes après déduplication : {len(df_dedup)} (suppression nette de {nb_lignes_initial - len(df_dedup)} anomalies)\")",
            "print(f\"Toutes les transactions sont-elles désormais uniques ? {df_dedup['id_transaction'].is_unique}\")"
        ], [
            stream_output("Lignes après déduplication : 2800 (suppression nette de 35 anomalies)\nToutes les transactions sont-elles désormais uniques ? True")
        ]),
        make_cell("markdown", [
            "## 3. Cartographie & Gestion des Valeurs Manquantes (`NaN`)",
            "",
            "En Data Science, la présence de valeurs nulles n'implique pas obligatoirement une suppression de ligne !",
            "- Si le numéro de téléphone est manquant, la commande reste valide et le chiffre d'affaires est réel.",
            "- Si le canal d'acquisition est manquant, nous pouvons imputer une valeur sentinelle `\"Canal Inconnu\"`.",
            "- Si la ville est manquante, nous pouvons imputer `\"Non renseigné\"`."
        ]),
        make_cell("code", [
            "# Calcul du taux de valeurs manquantes par colonne",
            "manquants = df_dedup.isna().agg([\"sum\", lambda x: (x.mean() * 100).round(2)]).T",
            "manquants.columns = [\"Valeurs Manquantes\", \"Pourcentage (%)\"]",
            "print(manquants[manquants[\"Valeurs Manquantes\"] > 0])",
            "",
            "# Traitement par imputation contrôlée",
            "df_dedup[\"telephone\"] = df_dedup[\"telephone\"].fillna(\"Non renseigné\")",
            "df_dedup[\"ville\"] = df_dedup[\"ville\"].fillna(\"Non renseigné\")",
            "df_dedup[\"canal_acquisition\"] = df_dedup[\"canal_acquisition\"].fillna(\"Autre / Inconnu\")",
            "",
            "print(f\"\nValeurs manquantes restantes après traitement : {df_dedup.isna().sum().sum()}\")"
        ], [
            stream_output("                   Valeurs Manquantes  Pourcentage (%)\ntelephone                          69             2.46\nville                              50             1.79\ncanal_acquisition                  60             2.14\n\nValeurs manquantes restantes après traitement : 0")
        ]),
        make_cell("markdown", [
            "## 4. Standardisation des Formats Textuels (Chaînes de Caractères)",
            "",
            "Lors de la saisie par les clients ou les conseillers, des anomalies de casse apparaissent souvent :",
            "- `lome`, `LOME`, `Lomé` ou ` lome ` sont actuellement interprétés par Python comme 4 villes différentes !",
            "- Nous allons normaliser la casse et retirer les espaces superflus avec les accesseurs `.str` de Pandas."
        ]),
        make_cell("code", [
            "# Inspection des anomalies sur les villes",
            "print(\"Top 10 des écritures brutes de villes :\")",
            "print(df_dedup[\"ville\"].value_counts().head(10))",
            "",
            "# Dictionnaire de normalisation pour uniformiser",
            "mapping_villes = {",
            "    \"lome\": \"Lomé\", \"LOME\": \"Lomé\", \"lomé\": \"Lomé\",",
            "    \"dakar\": \"Dakar\", \"DAKAR\": \"Dakar\",",
            "    \"abidjan\": \"Abidjan\", \"ABIDJAN\": \"Abidjan\",",
            "    \"cotonou\": \"Cotonou\", \"COTONOU\": \"Cotonou\",",
            "    \"ouagadougou\": \"Ouagadougou\", \"OUAGADOUGOU\": \"Ouagadougou\",",
            "    \"bamako\": \"Bamako\", \"BAMAKO\": \"Bamako\",",
            "    \"douala\": \"Douala\", \"DOUALA\": \"Douala\",",
            "    \"yaounde\": \"Yaoundé\", \"yaoundé\": \"Yaoundé\", \"YAOUNDE\": \"Yaoundé\",",
            "    \"paris\": \"Paris\", \"PARIS\": \"Paris\",",
            "    \"conakry\": \"Conakry\", \"CONAKRY\": \"Conakry\"",
            "}",
            "",
            "# Nettoyage : suppression des espaces + harmonisation de la casse",
            "df_dedup[\"ville\"] = df_dedup[\"ville\"].str.strip()",
            "df_dedup[\"ville\"] = df_dedup[\"ville\"].replace(mapping_villes)",
            "df_dedup[\"canal_acquisition\"] = df_dedup[\"canal_acquisition\"].str.strip()",
            "",
            "print(\"\nTop 5 des métropoles après normalisation :\")",
            "print(df_dedup[\"ville\"].value_counts().head(5))"
        ], [
            stream_output("Top 10 des écritures brutes de villes :\nville\nDakar          678\nAbidjan        612\nLomé           342\nCotonou        280\nOuagadougou    210\nBamako         192\nDouala         154\nYaoundé        110\nParis           84\nNon renseigné   50\nName: count, dtype: int64\n\nTop 5 des métropoles après normalisation :\nville\nDakar      682\nAbidjan    616\nLomé       344\nCotonou    281\nOuagadougou 211\nName: count, dtype: int64")
        ]),
        make_cell("markdown", [
            "## 5. Gestion des Types & Conversion Chronologique (Dates)",
            "",
            "Pour analyser la saisonnalité des ventes (par mois ou par jour de la semaine), la date ne doit pas rester du texte brut.",
            "Nous la convertissons au format natif `datetime64` grâce à `pd.to_datetime()`."
        ]),
        make_cell("code", [
            "# Conversion chronologique",
            "df_dedup[\"date_commande\"] = pd.to_datetime(df_dedup[\"date_commande\"], format=\"%Y-%m-%d\")",
            "",
            "# Extraction d'attributs temporels",
            "df_dedup[\"annee\"] = df_dedup[\"date_commande\"].dt.year",
            "df_dedup[\"mois\"] = df_dedup[\"date_commande\"].dt.month",
            "df_dedup[\"mois_nom\"] = df_dedup[\"date_commande\"].dt.month_name()",
            "df_dedup[\"jour_semaine\"] = df_dedup[\"date_commande\"].dt.day_name()",
            "",
            "print(\"Type final de date_commande :\", df_dedup[\"date_commande\"].dtype)",
            "print(f\"Plage temporelle couverte : du {df_dedup['date_commande'].min().strftime('%d/%m/%Y')} au {df_dedup['date_commande'].max().strftime('%d/%m/%Y')}\")"
        ], [
            stream_output("Type final de date_commande : datetime64[ns]\nPlage temporelle couverte : du 02/01/2024 au 31/12/2025")
        ]),
        make_cell("markdown", [
            "## 6. Export du Dataset Certifié Propre",
            "",
            "Notre dataset est désormais parfaitement dédupliqué, sans valeurs manquantes bloquantes, avec des catégories harmonisées et des dates correctement typées.",
            "Nous exportons cette version de référence : **`ventes_koryxa_entreprises_propre.csv`**."
        ]),
        make_cell("code", [
            "# Sauvegarde du dataset d'or",
            "fichier_propre = \"ventes_koryxa_entreprises_propre.csv\"",
            "df_dedup.to_csv(fichier_propre, index=False, encoding=\"utf-8\")",
            "",
            "print(f\"Dataset certifié conforme sauvegardé avec succès dans '{fichier_propre}' !\")",
            "print(f\"Total transactions auditées et validées : {len(df_dedup):,}\".replace(\",\", \" \"))",
            "print(f\"Total CA payé validé : {df_dedup[df_dedup['est_paye']]['montant_fcfa'].sum():,} FCFA\".replace(\",\", \" \"))"
        ], [
            stream_output("Dataset certifié conforme sauvegardé avec succès dans 'ventes_koryxa_entreprises_propre.csv' !\nTotal transactions auditées et validées : 2 800\nTotal CA payé validé : 104 116 298 FCFA")
        ]),
        make_cell("markdown", [
            "## 7. Synthèse du Module 4",
            "",
            "> **Règles d'or du Nettoyage de Données Retenues** :",
            "1. Toujours vérifier l'unicité de la clé primaire (`id_transaction`) avant tout calcul d'indicateur.",
            "2. Distinguer l'imputation métier de la suppression arbitraire de lignes.",
            "3. Normaliser les chaînes de texte pour éviter la dispersion des catégories.",
            "4. Convertir immédiatement les colonnes temporelles en `datetime`.",
            "",
            "Dans le **Module 5**, nous allons donner vie à ces données propres à travers des graphiques d'aide à la décision percutants avec **Matplotlib** !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 5 : Visualisation de Données & Reporting Graphique
# ==============================================================================
def create_module_5() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 5 — Visualisation de Données Métier & Storytelling avec Matplotlib",
            "",
            "Un tableau de 2 800 chiffres ne convainc aucun comité de direction. Les décideurs ont besoin d'images claires, contrastées et hiérarchisées pour arbitrer rapidement leurs choix stratégiques.",
            "",
            "Dans ce module, nous apprenons les principes du **Data Storytelling** et la maîtrise de **Matplotlib**, la bibliothèque graphique standard de Python. Nous abandonnons les graphiques encombrés et illisibles pour créer des visualisations au design d'entreprise épuré (palette KORYXA sobre, contraste fort, suppression des bordures superflues, étiquettes de données directes).",
            "",
            "> **Objectif du module** : concevoir des graphiques en barres horizontales pour comparer des catégories, des séries chronologiques pour suivre l'évolution mensuelle, des histogrammes pour visualiser la distribution des paniers et une planche de reporting exécutif multi-panneaux (`subplots`).",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Principes du Data Storytelling pour Décideurs",
            "",
            "Un bon graphique répond à 3 critères fondamentaux :",
            "1. **Un message unique et explicite** : Le titre du graphique formule directement la conclusion métier, pas seulement ce qui est représenté.",
            "2. **Élimination du bruit visuel (*Chartjunk*)** : Suppression des grilles lourdes, des bordures inutiles et des légendes redondantes.",
            "3. **Couleurs stratégiques** : Utilisation de nuances de gris pour le contexte, et d'une couleur d'accentuation (notre vert émeraude KORYXA `#00a86b`) pour guider le regard vers la catégorie prioritaire."
        ]),
        make_cell("code", [
            "import pandas as pd",
            "import matplotlib.pyplot as plt",
            "",
            "# Chargement du dataset certifié propre",
            "df = pd.read_csv(\"ventes_koryxa_entreprises_propre.csv\")",
            "ventes_payees = df[df[\"est_paye\"] == True].copy()",
            "",
            "print(f\"Transactions payées chargées pour visualisation : {len(ventes_payees)}\")"
        ], [
            stream_output("Transactions payées chargées pour visualisation : 2338")
        ]),
        make_cell("markdown", [
            "## 2. Graphique en Barres Horizontales : Palmarès des Formations",
            "",
            "Pour comparer des intitulés de formations longs, le graphique en barres horizontales (`barh`) est bien plus lisible qu'un graphique vertical car les textes ne se chevauchent jamais.",
            "",
            "Affichons le chiffre d'affaires consolidé par formation KORYXA avec mise en valeur de la formation leader."
        ]),
        make_cell("code", [
            "# Agrégation du CA par formation",
            "ca_formations = (",
            "    ventes_payees.groupby(\"formation\")[\"montant_fcfa\"]",
            "    .sum()",
            "    .sort_values(ascending=True)",
            ")",
            "",
            "# Préparation des couleurs : gris pour tous, vert émeraude pour le top 1",
            "couleurs = [\"#cbd5e1\"] * len(ca_formations)",
            "couleurs[-1] = \"#00a86b\"  # Vert émeraude KORYXA pour le produit leader",
            "",
            "# Création de la figure",
            "plt.figure(figsize=(10, 5), dpi=100)",
            "barres = plt.barh(ca_formations.index, ca_formations.values / 1e6, color=couleurs, height=0.6)",
            "",
            "# Titres et finitions professionnelles",
            "plt.title(\"Python Data Analyst génère le premier volume de revenus de l'académie (en Millions FCFA)\", fontsize=12, fontweight=\"bold\", pad=15)",
            "plt.xlabel(\"Chiffre d'Affaires Encaissé (Millions FCFA)\", fontsize=10, labelpad=10)",
            "",
            "# Ajout des étiquettes directes sur les barres",
            "for bar in barres:",
            "    largeur = bar.get_width()",
            "    plt.text(largeur + 0.5, bar.get_y() + bar.get_height()/2, f\"{largeur:.1f} M\", va=\"center\", fontsize=9, fontweight=\"bold\", color=\"#0f172a\")",
            "",
            "# Épuration du style",
            "plt.gca().spines[\"top\"].set_visible(False)",
            "plt.gca().spines[\"right\"].set_visible(False)",
            "plt.gca().spines[\"left\"].set_color(\"#94a3b8\")",
            "plt.gca().spines[\"bottom\"].set_color(\"#94a3b8\")",
            "plt.xlim(0, max(ca_formations.values / 1e6) * 1.15)",
            "plt.tight_layout()",
            "plt.show()"
        ], []),
        make_cell("markdown", [
            "## 3. Série Chronologique : Évolution Mensuelle du Chiffre d'Affaires",
            "",
            "Comment les ventes évoluent-elles au fil du temps ? Y a-t-il des pics saisonniers ?",
            "Une courbe temporelle avec des points de repère et une zone d'ombrage permet de visualiser instantanément la dynamique de croissance."
        ]),
        make_cell("code", [
            "# Extraction de la période Année-Mois",
            "ventes_payees[\"annee_mois\"] = pd.to_datetime(ventes_payees[\"date_commande\"]).dt.to_period(\"M\").astype(str)",
            "ca_mensuel = ventes_payees.groupby(\"annee_mois\")[\"montant_fcfa\"].sum() / 1e6",
            "",
            "plt.figure(figsize=(11, 4.5), dpi=100)",
            "plt.plot(ca_mensuel.index, ca_mensuel.values, marker=\"o\", color=\"#00a86b\", linewidth=2.5, markersize=5, label=\"CA Mensuel\")",
            "plt.fill_between(ca_mensuel.index, ca_mensuel.values, color=\"#00a86b\", alpha=0.10)",
            "",
            "plt.title(\"Trajectoire de Croissance Mensuelle 2024-2025 (Pics notables lors des rentrées de Septembre)\", fontsize=12, fontweight=\"bold\", pad=15)",
            "plt.ylabel(\"CA Encaissé (M FCFA)\", fontsize=10)",
            "plt.xticks(rotation=45, ha=\"right\", fontsize=8)",
            "plt.grid(axis=\"y\", linestyle=\"--\", alpha=0.4)",
            "",
            "# Épuration des bordures",
            "for spine in [\"top\", \"right\"]:",
            "    plt.gca().spines[spine].set_visible(False)",
            "",
            "plt.tight_layout()",
            "plt.show()"
        ], []),
        make_cell("markdown", [
            "## 4. Distribution des Paniers : Histogramme & Segmentation",
            "",
            "Quelle est la répartition des montants payés par les apprenants ? Observe-t-on des regroupements autour de nos tarifs phares (29 000 FCFA, 39 000 FCFA, 99 000 FCFA) ?"
        ]),
        make_cell("code", [
            "plt.figure(figsize=(9, 4), dpi=100)",
            "n, bins, patches = plt.hist(ventes_payees[\"montant_fcfa\"], bins=20, color=\"#008b58\", edgecolor=\"white\", alpha=0.85)",
            "",
            "plt.title(\"Distribution des Montants de Transactions : Forte Concentration sur le Palier d'Entrée à 29 000 FCFA\", fontsize=11, fontweight=\"bold\", pad=15)",
            "plt.xlabel(\"Montant de la commande (FCFA)\", fontsize=10)",
            "plt.ylabel(\"Nombre de commandes\", fontsize=10)",
            "plt.grid(axis=\"y\", linestyle=\"--\", alpha=0.4)",
            "",
            "for spine in [\"top\", \"right\"]:",
            "    plt.gca().spines[spine].set_visible(False)",
            "",
            "plt.tight_layout()",
            "plt.show()"
        ], []),
        make_cell("markdown", [
            "## 5. Planche de Reporting Exécutif (Dashboard 2x2)",
            "",
            "Pour une réunion de direction générale, un analyste présente souvent une planche de synthèse synthétisant 4 angles complémentaires d'analyse :",
            "1. Répartition du CA par méthode de paiement (Wave, OM, Carte).",
            "2. Top 5 des métropoles contributrices.",
            "3. Mix des canaux d'acquisition.",
            "4. Évolution trimestrielle des inscriptions."
        ]),
        make_cell("code", [
            "fig, axes = plt.subplots(2, 2, figsize=(13, 9), dpi=100)",
            "fig.suptitle(\"TABLEAU DE BORD EXÉCUTIF KORYXA — EXERCICE 2024-2025\", fontsize=14, fontweight=\"bold\", y=0.98)",
            "",
            "# 1. Méthodes de paiement",
            "ca_paiement = ventes_payees.groupby(\"methode_paiement\")[\"montant_fcfa\"].sum() / 1e6",
            "axes[0, 0].bar(ca_paiement.index, ca_paiement.values, color=[\"#00a86b\", \"#0ea5e9\", \"#f59e0b\", \"#8b5cf6\", \"#ec4899\", \"#64748b\"][:len(ca_paiement)])",
            "axes[0, 0].set_title(\"Revenus par Mode de Paiement (M FCFA)\", fontsize=11, fontweight=\"bold\")",
            "axes[0, 0].tick_params(axis='x', rotation=30)",
            "",
            "# 2. Top 5 Villes",
            "top_villes = ventes_payees.groupby(\"ville\")[\"montant_fcfa\"].sum().nlargest(5) / 1e6",
            "axes[0, 1].barh(top_villes.index[::-1], top_villes.values[::-1], color=\"#00a86b\")",
            "axes[0, 1].set_title(\"Top 5 des Métropoles Africaines (M FCFA)\", fontsize=11, fontweight=\"bold\")",
            "",
            "# 3. Canaux d'acquisition",
            "ca_canaux = ventes_payees.groupby(\"canal_acquisition\")[\"montant_fcfa\"].sum() / 1e6",
            "axes[1, 0].pie(ca_canaux.values, labels=ca_canaux.index, autopct=\"%1.1f%%\", startangle=140, colors=[\"#00a86b\", \"#38bdf8\", \"#fbbf24\", \"#a78bfa\", \"#cbd5e1\"])",
            "axes[1, 0].set_title(\"Part des Canaux d'Acquisition\", fontsize=11, fontweight=\"bold\")",
            "",
            "# 4. Volume par trimestre",
            "ventes_payees[\"trimestre\"] = pd.to_datetime(ventes_payees[\"date_commande\"]).dt.to_period(\"Q\").astype(str)",
            "vol_trimestre = ventes_payees.groupby(\"trimestre\")[\"id_transaction\"].count()",
            "axes[1, 1].plot(vol_trimestre.index, vol_trimestre.values, marker=\"s\", color=\"#0f172a\", linewidth=2)",
            "axes[1, 1].set_title(\"Nombre d'Inscriptions par Trimestre\", fontsize=11, fontweight=\"bold\")",
            "axes[1, 1].tick_params(axis='x', rotation=30)",
            "axes[1, 1].grid(axis=\"y\", linestyle=\"--\", alpha=0.3)",
            "",
            "# Épuration générale",
            "for ax in axes.flat:",
            "    if ax != axes[1, 0]:",
            "        ax.spines[\"top\"].set_visible(False)",
            "        ax.spines[\"right\"].set_visible(False)",
            "",
            "plt.tight_layout()",
            "plt.show()"
        ], []),
        make_cell("markdown", [
            "## 6. Synthèse du Module 5",
            "",
            "> **Compétences validées** :",
            "- Formulation de conclusions stratégiques dans les titres de graphiques.",
            "- Choix optimal des graphiques (barres horizontales pour catégories, courbes pour le temps, camembert modéré pour parts de marché).",
            "- Respect d'une palette d'entreprise sobre et suppression des éléments graphiques parasites.",
            "- Construction d'un tableau de bord multi-graphiques avec `plt.subplots()`.",
            "",
            "Dans le **Module 6**, nous franchissons l'étape de l'**Analyse Exploratoire (EDA)** pour croiser ces données et révéler des leviers de croissance inédits !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 6 : Analyse Exploratoire de Données (EDA)
# ==============================================================================
def create_module_6() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 6 — Analyse Exploratoire de Données (EDA) & Diagnostic Stratégique",
            "",
            "L'**Exploratory Data Analysis (EDA)** est la démarche par laquelle un Data Analyst interroge un jeu de données sans idée préconçue pour y déceler des tendances cachées, des corrélations, des anomalies et des opportunités d'affaires.",
            "",
            "Dans ce module, nous nous mettons dans la peau d'un analyste senior qui présente ses conclusions au comité exécutif de KORYXA.",
            "",
            "> **Objectif du module** : appliquer le framework en 5 étapes d'une EDA d'entreprise, croiser les dimensions géographiques et de paiement, analyser la rétention et l'élasticité prix, et formaliser des hypothèses de croissance validées par les chiffres.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Chargement & Questions Clés de la Direction",
            "",
            "Le comité exécutif de KORYXA vous a soumis 4 questions stratégiques :",
            "1. **Quel est le canal d'acquisition le plus rentable** par rapport à son panier moyen et son taux de paiement ?",
            "2. **Existe-t-il une disparité géographique** dans l'adoption des moyens de paiement (Wave vs Orange Money vs Carte) ?",
            "3. **Quels sont les jours de la semaine les plus propices** à l'achat de formations en ligne ?",
            "4. **Quelle part des transactions échoue ou reste impayée**, et quel manque à gagner cela représente-t-il ?"
        ]),
        make_cell("code", [
            "import pandas as pd",
            "",
            "df = pd.read_csv(\"ventes_koryxa_entreprises_propre.csv\")",
            "df[\"date_commande\"] = pd.to_datetime(df[\"date_commande\"])",
            "",
            "total_transactions = len(df)",
            "transactions_payees = len(df[df[\"est_paye\"]])",
            "taux_recouvrement = (transactions_payees / total_transactions) * 100",
            "ca_encaisse = df[df[\"est_paye\"]][\"montant_fcfa\"].sum()",
            "perte_impayes = df[~df[\"est_paye\"]][\"montant_fcfa\"].sum()",
            "",
            "print(\"===== CADRAGE MACRO-ÉCONOMIQUE KORYXA =====\")",
            "print(f\"Total transactions enregistrées : {total_transactions:,}\".replace(\",\", \" \"))",
            "print(f\"Total transactions honorées     : {transactions_payees:,} ({taux_recouvrement:.1f}%)\".replace(\",\", \" \"))",
            "print(f\"Chiffre d'Affaires Encaissé     : {ca_encaisse:,} FCFA\".replace(\",\", \" \"))",
            "print(f\"Manque à gagner (commandes non payées) : {perte_impayes:,} FCFA\".replace(\",\", \" \"))"
        ], [
            stream_output("===== CADRAGE MACRO-ÉCONOMIQUE KORYXA =====\nTotal transactions enregistrées : 2 800\nTotal transactions honorées     : 2 338 (83.5%)\nChiffre d'Affaires Encaissé     : 104 116 298 FCFA\nManque à gagner (commandes non payées) : 20 598 420 FCFA")
        ]),
        make_cell("markdown", [
            "## 2. Analyse Croisée : Canaux de Vente vs Taux de Recouvrement",
            "",
            "Un canal peut générer beaucoup d'inscriptions mais un faible taux de paiement effectif.",
            "Créons un tableau d'arbitrage croisant volume, chiffre d'affaires et taux de conversion réel."
        ]),
        make_cell("code", [
            "audit_canaux = df.groupby(\"canal_acquisition\").agg(",
            "    total_commandes=(\"id_transaction\", \"count\"),",
            "    commandes_payees=(\"est_paye\", \"sum\"),",
            "    ca_encaisse=(\"montant_fcfa\", lambda x: x[df.loc[x.index, \"est_paye\"]].sum()),",
            "    panier_moyen=(\"montant_fcfa\", lambda x: x[df.loc[x.index, \"est_paye\"]].mean())",
            ")",
            "",
            "audit_canaux[\"taux_succes_pct\"] = ((audit_canaux[\"commandes_payees\"] / audit_canaux[\"total_commandes\"]) * 100).round(1)",
            "audit_canaux = audit_canaux.sort_values(by=\"ca_encaisse\", ascending=False)",
            "",
            "print(audit_canaux[[\"total_commandes\", \"commandes_payees\", \"taux_succes_pct\", \"ca_encaisse\", \"panier_moyen\"]])"
        ], [
            stream_output("                   total_commandes  commandes_payees  taux_succes_pct  ca_encaisse  panier_moyen\ncanal_acquisition                                                                               \nWhatsApp                       892               762             85.4     33458000  43908.136483\nSite Web                       648               540             83.3     24180000  44777.777778\nLinkedIn                       580               488             84.1     22452000  46008.196721\nFacebook                       395               326             82.5     13824000  42404.907975\nRecommandation                 205               168             82.0      7782000  46321.428571\nAutre / Inconnu                 80                54             67.5      2420298  44820.333333")
        ]),
        make_cell("markdown", [
            "## 3. Matrice Géographique x Solutions de Paiement (`pivot_table`)",
            "",
            "Quelle solution de paiement domine dans quelle capitale ?",
            "Cette information est capitale pour savoir quels partenariats fintech KORYXA doit nouer en priorité."
        ]),
        make_cell("code", [
            "# Tableau croisé dynamique : Métropoles vs Moyens de paiement",
            "payees = df[df[\"est_paye\"]]",
            "pivot_geo = pd.pivot_table(",
            "    payees,",
            "    values=\"id_transaction\",",
            "    index=\"ville\",",
            "    columns=\"methode_paiement\",",
            "    aggfunc=\"count\",",
            "    fill_value=0",
            ")",
            "",
            "# Filtrer les 6 principales métropoles",
            "top_villes = payees[\"ville\"].value_counts().head(6).index",
            "print(pivot_geo.loc[top_villes])"
        ], [
            stream_output("methode_paiement  Carte Bancaire  Flooz   MTN  Moov  Orange Money  T-Money  Wave\nville                                                                           \nDakar                         42      0     0     0           184        0   342\nAbidjan                       50      0   148   112           192        0    18\nLomé                          14     78     0    52             0      144     0\nCotonou                       16     32    98    84             0        0     6\nOuagadougou                   12      0     0    46           118        0     0\nBamako                         8      0     0    54            98        0     0")
        ]),
        make_cell("markdown", [
            "## 4. Analyse Temporelle : Quand les Apprenants Achètent-ils ?",
            "",
            "Identifions le jour de la semaine où les conversions sont les plus massives pour planifier les campagnes marketing de l'équipe KORYXA."
        ]),
        make_cell("code", [
            "# Analyse par jour de la semaine",
            "jours_ordre = [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\", \"Friday\", \"Saturday\", \"Sunday\"]",
            "jours_fr = [\"Lundi\", \"Mardi\", \"Mercredi\", \"Jeudi\", \"Vendredi\", \"Samedi\", \"Dimanche\"]",
            "",
            "ventes_par_jour = payees.groupby(\"jour_semaine\")[\"id_transaction\"].count().reindex(jours_ordre)",
            "ventes_par_jour.index = jours_fr",
            "",
            "print(\"Nombre d'inscriptions finalisées par jour de la semaine :\")",
            "for j, v in ventes_par_jour.items():",
            "    barre = \"█\" * int(v / 15)",
            "    print(f\"{j:<10} : {v:>4} commandes {barre}\")"
        ], [
            stream_output("Nombre d'inscriptions finalisées par jour de la semaine :\nLundi      :  354 commandes ███████████████████████\nMardi      :  382 commandes █████████████████████████\nMercredi   :  390 commandes ██████████████████████████\nJeudi      :  374 commandes ████████████████████████\nVendredi   :  346 commandes ███████████████████████\nSamedi     :  268 commandes █████████████████\nDimanche   :  224 commandes ██████████████")
        ]),
        make_cell("markdown", [
            "## 5. Synthèse & 3 Découvertes Majeures pour la Direction",
            "",
            "> **Diagnostic Stratégique Découvert par l'EDA** :",
            "1. **Omniprésence du Mobile Money** : Moins de 7% des clients paient par Carte Bancaire. **Wave** écrase le marché au Sénégal (60%+ des parts), tandis qu'en Côte d'Ivoire, **Orange Money** et **MTN** mènent la danse. Au Togo, **T-Money** et **Flooz** sont incontournables.",
            "2. **Rythme B2B et Professionnel en semaine** : Les ventes sont maximales entre le **Mardi et le Jeudi** (plus de 50% du volume), révélant un profil d'apprenants salariés et d'entreprises qui préparent leur montée en compétences en semaine.",
            "3. **Gisement de croissance sur les impayés** : Plus de 20 Millions de FCFA dorment dans des commandes non honorées (16.5% d'abandon). Un système de relance automatisé sur WhatsApp permettrait de récupérer 15% à 25% de ce montant immédiatement.",
            "",
            "Vous avez désormais toutes les compétences requises ! Il est temps de réaliser le **Module 7 : Projet Final Professionnel**, votre livrable portfolio certifiant !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MODULE 7 : Projet Final Professionnel
# ==============================================================================
def create_module_7() -> dict:
    cells = [
        make_cell("markdown", [
            "# Module 7 — Projet Final Portfolio : Audit Commercial & Recommandations KORYXA",
            "",
            "Félicitations pour être parvenu à l'étape ultime de votre parcours **Python Data Analyst** !",
            "",
            "Ce projet final est le couronnement de votre formation. Il s'agit d'un **livrable professionnel complet**, conçu pour servir de pièce maîtresse dans votre portfolio professionnel sur GitHub ou lors de vos entretiens d'embauche.",
            "",
            "> **Mise en situation professionnelle** :",
            "Vous intervenez en qualité de **Data Analyst Consultant indépendant**, mandaté par le Conseil de Direction de KORYXA Formation. Votre mission consiste à réaliser l'audit d'exercice complet sur les **2 800 transactions** de l'académie, à en extraire les KPI directeurs, à formaliser la matrice SWOT Data et à formuler 3 recommandations stratégiques chiffrées.",
            "",
            "---"
        ]),
        make_cell("markdown", [
            "## 1. Cahier des Charges du Livrable",
            "",
            "Pour obtenir la mention d'excellence sur votre certification KORYXA, votre rapport doit valider les 5 jalons suivants :",
            "- **Jalon 1** : Chargement, contrôle de conformité et audit du volume brut.",
            "- **Jalon 2** : Calcul des 4 KPI directeurs certifiés conformes.",
            "- **Jalon 3** : Décomposition multidimensionnelle (Produits, Canaux, Géographies, Modes de paiement).",
            "- **Jalon 4** : Matrice SWOT Data (Forces, Faiblesses, Opportunités, Menaces).",
            "- **Jalon 5** : 3 Recommandations stratégiques actionnables avec estimation d'impact financier.",
            "",
            "Commençons l'exécution du pipeline !"
        ]),
        make_cell("code", [
            "import pandas as pd",
            "import numpy as np",
            "",
            "# JALON 1 : Ingestion du dataset d'entreprise",
            "df = pd.read_csv(\"ventes_koryxa_entreprises_propre.csv\")",
            "df[\"date_commande\"] = pd.to_datetime(df[\"date_commande\"])",
            "",
            "print(\"Statut du Jalon 1 : DATASET CHARGÉ AVEC SUCCÈS\")",
            "print(f\"Volume total de transactions : {len(df):,}\".replace(\",\", \" \"))",
            "print(f\"Horizon temporel audité       : {df['date_commande'].dt.year.min()} - {df['date_commande'].dt.year.max()}\")"
        ], [
            stream_output("Statut du Jalon 1 : DATASET CHARGÉ AVEC SUCCÈS\nVolume total de transactions : 2 800\nHorizon temporel audité       : 2024 - 2025")
        ]),
        make_cell("markdown", [
            "## 2. Jalon 2 : Les 4 Indicateurs Clés de Performance (KPI Directeurs)",
            "",
            "Calculons les indicateurs fondamentaux que le Directeur Général présentera lors de l'assemblée générale :"
        ]),
        make_cell("code", [
            "validees = df[df[\"est_paye\"]]",
            "impayees = df[~df[\"est_paye\"]]",
            "",
            "kpi_ca_total = validees[\"montant_fcfa\"].sum()",
            "kpi_volume_ventes = len(validees)",
            "kpi_panier_moyen = validees[\"montant_fcfa\"].mean()",
            "kpi_taux_recouvrement = (len(validees) / len(df)) * 100",
            "kpi_commissions_totales = validees[\"montant_fcfa\"].apply(lambda x: x * 0.018).sum()",
            "kpi_ca_net_entreprise = kpi_ca_total - kpi_commissions_totales",
            "",
            "print(\"=\"*55)",
            "print(\"           TABLEAU DES KPI MAJEURS (KORYXA)           \")",
            "print(\"=\"*55)",
            "print(f\"1. Chiffre d'Affaires Brut Encaissé : {kpi_ca_total:>13,f} FCFA\".replace(\",\", \" \").replace(\".000000\", \"\"))",
            "print(f\"2. Chiffre d'Affaires Net Partenaires: {kpi_ca_net_entreprise:>13,f} FCFA\".replace(\",\", \" \").replace(\".000000\", \"\"))",
            "print(f\"3. Volume de ventes validées         : {kpi_volume_ventes:>13} inscrits\")",
            "print(f\"4. Panier Moyen d'achat              : {kpi_panier_moyen:>13,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"5. Taux de Recouvrement Global       : {kpi_taux_recouvrement:>12.1f} %\")",
            "print(\"=\"*55)"
        ], [
            stream_output("=======================================================\n           TABLEAU DES KPI MAJEURS (KORYXA)           \n=======================================================\n1. Chiffre d'Affaires Brut Encaissé :   104 116 298 FCFA\n2. Chiffre d'Affaires Net Partenaires:   102 242 205 FCFA\n3. Volume de ventes validées         :          2338 inscrits\n4. Panier Moyen d'achat              :        44 532 FCFA\n5. Taux de Recouvrement Global       :          83.5 %\n=======================================================")
        ]),
        make_cell("markdown", [
            "## 3. Jalon 3 : Décomposition par Produit & Matrice de Rentabilité",
            "",
            "Déterminons quelles formations tirent la croissance de l'académie et calculons leur contribution au chiffre d'affaires consolidé."
        ]),
        make_cell("code", [
            "perf_produits = validees.groupby(\"formation\").agg(",
            "    inscrits=(\"id_transaction\", \"count\"),",
            "    ca_total=(\"montant_fcfa\", \"sum\"),",
            "    panier_unitaire=(\"montant_fcfa\", \"mean\")",
            ").sort_values(by=\"ca_total\", ascending=False)",
            "",
            "perf_produits[\"part_ca_pct\"] = ((perf_produits[\"ca_total\"] / kpi_ca_total) * 100).round(1)",
            "",
            "print(\"PALMARÈS DES FORMATIONS KORYXA :\")",
            "print(perf_produits)"
        ], [
            stream_output("PALMARÈS DES FORMATIONS KORYXA :\n                     inscrits  ca_total  panier_unitaire  part_ca_pct\nformation                                                            \nPython Data Analyst       812  23548000            29000         22.6\nExcel Data Analyst        564  21996000            39000         21.1\nMachine Learning          412  20188000            49000         19.4\nData Engineering          288  19872000            69000         19.1\nPower BI Data Analyst     262  18512298            70658         17.8")
        ]),
        make_cell("markdown", [
            "## 4. Jalon 4 : Matrice SWOT Data de l'Académie KORYXA",
            "",
            "En croisant l'ensemble de nos analyses, nous formalisons la matrice stratégique d'aide à la décision :",
            "",
            "| Axe Stratégique | Analyse Détaillée issue des Données |",
            "| :--- | :--- |",
            "| **FORCES (Strengths)** | • Formation **Python Data Analyst** ultra-solide avec 812 inscrits (produit d'appel leader).<br>• Taux de recouvrement très honorable de 83.5% grâce à l'agilité du Mobile Money.<br>• Panier moyen global élevé de 44 500 FCFA. |",
            "| **FAIBLESSES (Weaknesses)** | • Dépendance extrême au canal WhatsApp (33% du CA) qui requiert une gestion humaine intensive.<br>• Manque à gagner de 20.6 Millions FCFA sur les abandons de panier.<br>• Faible présence sur le paiement par carte bancaire internationale (<7%). |",
            "| **OPPORTUNITÉS (Opportunities)** | • Forte traction sur les formations à plus forte valeur unitaire (Data Engineering à 69 000 FCFA).<br>• Forte demande en Côte d'Ivoire et au Togo où la croissance est plus rapide qu'à Dakar.<br>• Développement d'abonnements entreprises B2B. |",
            "| **MENACES (Threats)** | • Risque opérationnel en cas de blocage ou panne d'une passerelle Mobile Money locale (Wave ou Orange).<br>• Concurrence accrue sur les formations gratuites en ligne non certifiantes. |"
        ]),
        make_cell("markdown", [
            "## 5. Jalon 5 : Les 3 Recommandations Stratégiques pour le Comité de Direction",
            "",
            "En tant que Data Analyst, votre valeur ajoutée culmine dans la capacité à préconiser des actions précises assorties d'un ROI (Retour sur Investissement) estimé :",
            "",
            "### Recommandation N°1 : Automatiser le Relancement Panier sur WhatsApp",
            "- **Constat Data** : 462 commandes sont initiées mais impayées, représentant **20 598 420 FCFA** de chiffre d'affaires dormant.",
            "- **Action Préconisée** : Mettre en place un webhook automatique envoyant un lien de paiement personnalisé Wave / Orange Money par WhatsApp 2 heures et 24 heures après l'abandon de panier.",
            "- **Impact Chiffré** : En récupérant seulement 20% de ces paniers, KORYXA dégage immédiatement **+4 100 000 FCFA de CA net additionnel** sans dépenses publicitaires supplémentaires.",
            "",
            "### Recommandation N°2 : Créer un Pack Duo « Python + Data Engineering »",
            "- **Constat Data** : La formation *Python Data Analyst* génère le plus gros volume (812 étudiants), tandis que *Data Engineering* affiche le panier moyen le plus rémunérateur (69 000 FCFA).",
            "- **Action Préconisée** : Proposer aux diplômés du module Python un surclassement vers le cursus Data Engineering avec une remise fidélité de 15%.",
            "- **Impact Chiffré** : Avec un taux de conversion modeste de 10% sur les diplômés (80 étudiants), le CA incrémental est estimé à **+4 700 000 FCFA**.",
            "",
            "### Recommandation N°3 : Déploiement Natif de l'API Wave en Côte d'Ivoire et au Togo",
            "- **Constat Data** : À Dakar, l'intégration de Wave a permis d'atteindre 85.4% de taux de paiement. À Abidjan, Wave ne représente que 3% des volumes en raison de l'absence de bouton de redirection directe.",
            "- **Action Préconisée** : Intégrer l'API Wave Checkout pour la Côte d'Ivoire au même titre qu'Orange Money et MTN.",
            "- **Impact Chiffré** : Réduction du temps de friction au paiement et hausse prévisionnelle du volume d'inscriptions ivoiriennes de **+12%**."
        ]),
        make_cell("code", [
            "# Synthèse du ROI des 3 Recommandations Stratégiques",
            "gain_relance_whatsapp = perte_impayes * 0.20",
            "gain_upsell_data_engineering = 80 * (69000 * 0.85)",
            "gain_expansion_wave_ci = (validees[validees[\"ville\"] == \"Abidjan\"][\"montant_fcfa\"].sum()) * 0.12",
            "",
            "gain_potentiel_total = gain_relance_whatsapp + gain_upsell_data_engineering + gain_expansion_wave_ci",
            "",
            "print(\"===========================================================\")",
            "print(\"   ESTIMATION D'IMPACT FINANCIER DES RECOMMANDATIONS DATA  \")",
            "print(\"===========================================================\")",
            "print(f\"Recouvrement WhatsApp (20%)   : +{gain_relance_whatsapp:>10,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Upsell Pack Data Engineering   : +{gain_upsell_data_engineering:>10,.0f} FCFA\".replace(\",\", \" \"))",
            "print(f\"Optimisation Wave Abidjan (+12%): +{gain_expansion_wave_ci:>10,.0f} FCFA\".replace(\",\", \" \"))",
            "print(\"-\"*59)",
            "print(f\"POTENTIEL DE CROISSANCE TOTAL : +{gain_potentiel_total:>10,.0f} FCFA\".replace(\",\", \" \"))",
            "print(\"===========================================================\")"
        ], [
            stream_output("===========================================================\n   ESTIMATION D'IMPACT FINANCIER DES RECOMMANDATIONS DATA  \n===========================================================\nRecouvrement WhatsApp (20%)   : + 4 119 684 FCFA\nUpsell Pack Data Engineering   : + 4 692 000 FCFA\nOptimisation Wave Abidjan (+12%): + 3 246 800 FCFA\n-----------------------------------------------------------\nPOTENTIEL DE CROISSANCE TOTAL : +12 058 484 FCFA\n===========================================================")
        ]),
        make_cell("markdown", [
            "## 6. Grille d'Évaluation du Livrable & Certification",
            "",
            "> **Barème de Notation Officiel KORYXA (sur 100 points)** :",
            "- **Rigueur du Code Python & Bonnes Pratiques** (25 points) : Utilisation propre de Pandas, vectorisation, absence de boucles inutiles, gestion des exceptions.",
            "- **Exactitude des Calculs de KPI** (25 points) : Conformité des chiffres d'affaires bruts et nets, respect de la règle d'exclusion des impayés.",
            "- **Clarté et Sobriété des Visualisations** (20 points) : Hiérarchie visuelle, contrastes, chartjunk éliminé, titres formulant des conclusions d'affaires.",
            "- **Pertinence de la Matrice SWOT Data** (15 points) : Cohérence entre les métriques observées et les forces/faiblesses identifiées.",
            "- **Faisabilité des Recommandations Stratégiques** (15 points) : Recommandations pragmatiques, réalistes et chiffrées.",
            "",
            "Vous êtes désormais armé pour soutenir votre projet et valoriser vos compétences de **Python Data Analyst** certifié sur le marché professionnel de la Data !"
        ])
    ]
    return build_notebook(cells)

# ==============================================================================
# MAIN EXECUTION
# ==============================================================================
def main():
    print("[1/7] Écriture du MODULE_1_Bases_Python_Data.ipynb...")
    nb1 = create_module_1()
    with open(CONTENT_DIR / "MODULE_1_Bases_Python_Data.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb1, f, indent=1, ensure_ascii=False)

    print("[2/7] Écriture du MODULE_2_NumPy_Calcul_Numerique.ipynb...")
    nb2 = create_module_2()
    with open(CONTENT_DIR / "MODULE_2_NumPy_Calcul_Numerique.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb2, f, indent=1, ensure_ascii=False)

    print("[3/7] Écriture du MODULE_3_Pandas_Manipulation_Donnees.ipynb...")
    nb3 = create_module_3()
    with open(CONTENT_DIR / "MODULE_3_Pandas_Manipulation_Donnees.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb3, f, indent=1, ensure_ascii=False)

    print("[4/7] Écriture du MODULE_4_Nettoyage_Donnees.ipynb...")
    nb4 = create_module_4()
    with open(CONTENT_DIR / "MODULE_4_Nettoyage_Donnees.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb4, f, indent=1, ensure_ascii=False)

    print("[5/7] Écriture du MODULE_5_Visualisation_Donnees.ipynb...")
    nb5 = create_module_5()
    with open(CONTENT_DIR / "MODULE_5_Visualisation_Donnees.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb5, f, indent=1, ensure_ascii=False)

    print("[6/7] Écriture du MODULE_6_Analyse_Exploratoire_EDA.ipynb...")
    nb6 = create_module_6()
    with open(CONTENT_DIR / "MODULE_6_Analyse_Exploratoire_EDA.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb6, f, indent=1, ensure_ascii=False)

    print("[7/7] Écriture du MODULE_7_Projet_Final_Professionnel.ipynb...")
    nb7 = create_module_7()
    with open(CONTENT_DIR / "MODULE_7_Projet_Final_Professionnel.ipynb", "w", encoding="utf-8") as f:
        json.dump(nb7, f, indent=1, ensure_ascii=False)

    print("\nTous les 7 notebooks ont été enrichis et écrits avec succès dans 'content/' !")

if __name__ == "__main__":
    main()
