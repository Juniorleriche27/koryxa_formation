"""
Script pour réécrire MODULE_5 et MODULE_6 avec %matplotlib inline
et sans plt.savefig() ni matplotlib.use('Agg')
"""
import json


def make_md(source_lines):
    return {
        "cell_type": "markdown",
        "metadata": {},
        "source": source_lines
    }


def make_code(source_lines):
    return {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": source_lines
    }


def make_nb(cells):
    return {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "name": "python",
                "version": "3.11.0"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 4
    }


# =============================================================================
# MODULE 5
# =============================================================================

cells5 = []

cells5.append(make_md([
    "# MODULE 5 \u2014 Visualisation des Donn\u00e9es\n",
    "\n",
    "Un graphique vaut mille mots ! En data science, la visualisation permet de comprendre rapidement les donn\u00e9es.\n",
    "\n",
    "Dans ce module, tu vas apprendre \u00e0 cr\u00e9er des graphiques avec deux biblioth\u00e8ques :\n",
    "- **Matplotlib** : la biblioth\u00e8que de base pour les graphiques\n",
    "- **Seaborn** : construite sur Matplotlib, avec des graphiques plus beaux et plus faciles\n",
    "\n",
    "Dans ce module, tu vas cr\u00e9er :\n",
    "- Des graphiques en barres (bar chart)\n",
    "- Des courbes (line chart)\n",
    "- Des histogrammes\n",
    "- Des camemberts (pie chart)\n",
    "- Des boxplots\n",
    "- Des heatmaps (cartes de chaleur)"
]))

# Cellule 1 : imports + %matplotlib inline
cells5.append(make_code([
    "# %matplotlib inline dit a Jupyter d'afficher les graphiques DANS le notebook\n",
    "%matplotlib inline\n",
    "\n",
    "import matplotlib.pyplot as plt  # bibliotheque principale de graphiques\n",
    "import seaborn as sns             # bibliotheque de graphiques avances\n",
    "import pandas as pd               # pour manipuler les donnees\n",
    "import numpy as np                # pour les calculs\n",
    "import os                         # pour tester l'existence de fichiers\n",
    "\n",
    "# On configure le style des graphiques Seaborn\n",
    "sns.set_theme(style=\"whitegrid\")  # fond blanc avec grille\n",
    "print(\"Bibliotheques de visualisation chargees !\")"
]))

# Cellule 2 : markdown chargement
cells5.append(make_md([
    "### Chargement du dataset\n",
    "\n",
    "On charge le fichier CSV nettoy\u00e9 produit par le module 4.\n",
    "Si ce fichier n'existe pas, on utilise le fichier brut avec un nettoyage rapide."
]))

# Cellule 3 : code chargement
cells5.append(make_code([
    "# On charge le dataset nettoye (produit par le module 4)\n",
    "if os.path.exists(\"ventes_koryxa_propre.csv\"):\n",
    "    df = pd.read_csv(\"ventes_koryxa_propre.csv\", encoding=\"utf-8\")\n",
    "    print(\"Dataset propre charge !\")\n",
    "else:\n",
    "    df = pd.read_csv(\"ventes_koryxa.csv\", encoding=\"utf-8\")\n",
    "    df[\"date\"] = pd.to_datetime(df[\"date\"], errors=\"coerce\")\n",
    "    df[\"mois\"] = df[\"date\"].dt.month\n",
    "    print(\"Dataset brut charge avec nettoyage rapide !\")\n",
    "\n",
    "print(f\"Dimensions : {df.shape[0]} lignes x {df.shape[1]} colonnes\")"
]))

# --------------------------------------------------------------------------
# PARTIE 1 - BAR CHART
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 1 \u2014 Graphique en Barres (Bar Chart)\n",
    "\n",
    "### Qu'est-ce qu'un bar chart ?\n",
    "\n",
    "Le **graphique en barres** est ideal pour **comparer des categories** entre elles.\n",
    "\n",
    "**Exemple de vie reelle :** un magasin veut savoir quel rayon vend le plus.\n",
    "\n",
    "Chaque barre represente une categorie, et la hauteur de la barre = la valeur.\n",
    "\n",
    "**Quand l'utiliser ?** Quand on veut comparer des valeurs entre differentes categories."
]))

cells5.append(make_md([
    "### Etape 1 : on prepare les donnees avec groupby"
]))

cells5.append(make_code([
    "# On calcule le chiffre d'affaires total par categorie de produit\n",
    "# groupby regroupe les lignes par categorie\n",
    "# sum() additionne les totaux de vente\n",
    "ventes_categorie = df.groupby(\"categorie\")[\"total\"].sum().sort_values(ascending=False)\n",
    "print(ventes_categorie)"
]))

cells5.append(make_md([
    "### Etape 2 : on trace le graphique avec ax.bar() + plt.show()"
]))

cells5.append(make_code([
    "# On cree le graphique en barres\n",
    "fig, ax = plt.subplots(figsize=(10, 5))   # on cree la feuille et le cadre\n",
    "\n",
    "# ax.bar() trace les barres\n",
    "ax.bar(ventes_categorie.index, ventes_categorie.values, color=\"steelblue\")\n",
    "ax.set_title(\"Chiffre d'affaires par categorie de produit\", fontsize=14)  # titre\n",
    "ax.set_xlabel(\"Categorie\")                # axe X\n",
    "ax.set_ylabel(\"Total des ventes (euros)\") # axe Y\n",
    "plt.xticks(rotation=45, ha=\"right\")       # incline les etiquettes\n",
    "\n",
    "plt.tight_layout()   # ajuste les marges\n",
    "plt.show()           # affiche le graphique dans le notebook"
]))

cells5.append(make_md([
    "### Analyse du bar chart\n",
    "\n",
    "Ce graphique montre le chiffre d'affaires total de chaque categorie de produits Koryxa.\n",
    "\n",
    "On voit clairement que la categorie **Peripherique** domine largement avec plus de 60% du CA total.\n",
    "La categorie **Informatique** arrive en deuxieme position avec environ 23% du CA.\n",
    "Les trois autres categories (Stockage, Accessoire, Audio) se partagent les 17% restants.\n",
    "Cette information est precieuse : Koryxa devrait concentrer ses efforts commerciaux et son stock\n",
    "sur les peripheriques pour maximiser les revenus."
]))

# --------------------------------------------------------------------------
# PARTIE 2 - LINE CHART
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 2 \u2014 Courbe (Line Chart)\n",
    "\n",
    "### Qu'est-ce qu'un line chart ?\n",
    "\n",
    "La **courbe** est ideale pour montrer l'**evolution dans le temps**.\n",
    "\n",
    "**Exemple de vie reelle :** la meteo montre la temperature jour par jour avec une courbe.\n",
    "\n",
    "Les points sont relies par une ligne pour montrer la tendance.\n",
    "\n",
    "**Quand l'utiliser ?** Quand les donnees sont ordonnees dans le temps (mois, annees, jours)."
]))

cells5.append(make_md([
    "### Etape 1 : on calcule les ventes par mois"
]))

cells5.append(make_code([
    "# On convertit la colonne mois en entier et on somme les ventes par mois\n",
    "df[\"mois\"] = df[\"mois\"].astype(int)     # convertit float en entier\n",
    "ventes_mensuelles = df.groupby(\"mois\")[\"total\"].sum().sort_index()  # somme par mois\n",
    "print(ventes_mensuelles)"
]))

cells5.append(make_md([
    "### Etape 2 : on trace la courbe avec ax.plot() + plt.show()"
]))

cells5.append(make_code([
    "# On cree la courbe d'evolution des ventes mois par mois\n",
    "fig, ax = plt.subplots(figsize=(10, 5))\n",
    "\n",
    "# ax.plot() trace la courbe, marker=\"o\" ajoute des points sur chaque mois\n",
    "ax.plot(ventes_mensuelles.index, ventes_mensuelles.values,\n",
    "        marker=\"o\", color=\"darkorange\", linewidth=2, markersize=8)\n",
    "\n",
    "ax.set_title(\"Evolution des ventes par mois\", fontsize=14)  # titre\n",
    "ax.set_xlabel(\"Mois\")                                       # axe X\n",
    "ax.set_ylabel(\"Total des ventes (euros)\")                   # axe Y\n",
    "\n",
    "noms_mois = [\"Jan\",\"Fev\",\"Mar\",\"Avr\",\"Mai\",\"Jun\",\"Jul\",\"Aou\",\"Sep\",\"Oct\",\"Nov\",\"Dec\"]\n",
    "ax.set_xticks(range(1, 13))       # 12 positions sur l'axe X\n",
    "ax.set_xticklabels(noms_mois)     # noms des mois au lieu des numeros\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells5.append(make_md([
    "### Analyse de la courbe mensuelle\n",
    "\n",
    "Cette courbe montre comment les ventes evoluent au fil des mois.\n",
    "\n",
    "On peut reperer des **pics** (mois ou les ventes sont fortes) et des **creux** (mois plus calmes).\n",
    "**Novembre** ressort comme le mois le plus fort avec plus de 100 000 euros de CA\n",
    "— probablement l'effet Black Friday et les achats de fin d'annee.\n",
    "**Mai** est egalement tres actif avec plus de 80 000 euros.\n",
    "Ces informations aident a planifier les stocks et les campagnes marketing aux bonnes periodes."
]))

# --------------------------------------------------------------------------
# PARTIE 3 - HISTOGRAMME
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 3 \u2014 Histogramme\n",
    "\n",
    "### Qu'est-ce qu'un histogramme ?\n",
    "\n",
    "L'**histogramme** montre la **distribution** d'une variable numerique.\n",
    "\n",
    "**Exemple de vie reelle :** un professeur trace l'histogramme des notes de classe\n",
    "pour voir si beaucoup d'eleves ont eu entre 10 et 12.\n",
    "\n",
    "L'axe X montre les valeurs, l'axe Y montre combien de fois chaque plage apparait.\n",
    "\n",
    "**Quand l'utiliser ?** Quand on veut savoir comment sont reparties les valeurs d'une variable."
]))

cells5.append(make_md([
    "### On trace l'histogramme des montants de vente avec ax.hist() + plt.show()"
]))

cells5.append(make_code([
    "# On trace l'histogramme de la distribution des montants de vente\n",
    "fig, ax = plt.subplots(figsize=(10, 5))\n",
    "\n",
    "# ax.hist() trace l'histogramme\n",
    "# bins = nombre d'intervalles (barres)\n",
    "ax.hist(df[\"total\"].dropna(), bins=30, color=\"mediumseagreen\", edgecolor=\"white\", alpha=0.8)\n",
    "\n",
    "# Ligne rouge pour la moyenne, ligne orange pour la mediane\n",
    "ax.axvline(df[\"total\"].mean(), color=\"red\", linestyle=\"--\", linewidth=2,\n",
    "           label=\"Moyenne : \" + str(int(df[\"total\"].mean())) + \" euros\")\n",
    "ax.axvline(df[\"total\"].median(), color=\"orange\", linestyle=\"--\", linewidth=2,\n",
    "           label=\"Mediane : \" + str(int(df[\"total\"].median())) + \" euros\")\n",
    "\n",
    "ax.set_title(\"Distribution des montants de vente\", fontsize=14)  # titre\n",
    "ax.set_xlabel(\"Montant de la vente (euros)\")                      # axe X\n",
    "ax.set_ylabel(\"Nombre de ventes\")                                 # axe Y\n",
    "ax.legend()     # affiche la legende\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells5.append(make_md([
    "### Analyse de l'histogramme\n",
    "\n",
    "L'histogramme revele la forme de la distribution des montants de vente.\n",
    "\n",
    "On voit que la distribution est tres **asymetrique vers la droite** : la grande majorite des ventes\n",
    "sont petites (moins de 5 000 euros), mais quelques tres grosses ventes tirent la moyenne tres haut.\n",
    "La ligne rouge (moyenne : 4 173 euros) est bien plus elevee que la ligne orange (mediane : 1 784 euros).\n",
    "Cela confirme que la **mediane est un meilleur indicateur** du montant typique d'une vente\n",
    "car elle n'est pas influencee par les quelques commandes exceptionnellement grandes."
]))

# --------------------------------------------------------------------------
# PARTIE 4 - PIE CHART
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 4 \u2014 Camembert (Pie Chart)\n",
    "\n",
    "### Qu'est-ce qu'un camembert ?\n",
    "\n",
    "Le **camembert** montre les **proportions** : comment une totalite se divise en parts.\n",
    "\n",
    "**Exemple de vie reelle :** un budget familial montre en camembert (loyer 40%, nourriture 25%...).\n",
    "\n",
    "Chaque tranche represente une categorie, sa taille est proportionnelle a sa part.\n",
    "\n",
    "**Quand l'utiliser ?** Quand on veut montrer des pourcentages qui s'additionnent a 100%."
]))

cells5.append(make_md([
    "### Etape 1 : on prepare les donnees (normalisation des noms)"
]))

cells5.append(make_code([
    "# On normalise les noms de modes de paiement (certains ont des majuscules differentes)\n",
    "df[\"paiement\"] = df[\"paiement\"].str.title().str.strip()   # uniformise les noms\n",
    "paiements = df[\"paiement\"].dropna().value_counts()         # compte chaque mode\n",
    "print(paiements)"
]))

cells5.append(make_md([
    "### Etape 2 : on trace le camembert avec ax.pie() + plt.show()"
]))

cells5.append(make_code([
    "# On cree le camembert de repartition des modes de paiement\n",
    "fig, ax = plt.subplots(figsize=(8, 8))\n",
    "\n",
    "# ax.pie() trace le camembert\n",
    "# autopct affiche le pourcentage sur chaque part\n",
    "ax.pie(paiements.values,\n",
    "       labels=paiements.index,        # nom de chaque tranche\n",
    "       autopct=\"%1.1f%%\",             # affiche \"42.3%\" sur chaque part\n",
    "       startangle=90,                 # la premiere tranche commence en haut\n",
    "       colors=sns.color_palette(\"pastel\"))  # couleurs douces\n",
    "\n",
    "ax.set_title(\"Repartition des ventes par mode de paiement\", fontsize=14)\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells5.append(make_md([
    "### Analyse du camembert\n",
    "\n",
    "Ce camembert montre comment les clients de Koryxa paient leurs achats.\n",
    "\n",
    "On constate que les modes de paiement sont repartis de maniere relativement equilibree :\n",
    "Carte Bancaire, Especes, Virement, PayPal et Mobile Money representent chacun environ 15 a 25%\n",
    "des transactions.\n",
    "Cela signifie que Koryxa doit maintenir **tous ces systemes de paiement** operationnels.\n",
    "Aucun ne domine assez pour qu'on puisse en supprimer un sans perdre des clients."
]))

# --------------------------------------------------------------------------
# PARTIE 5 - BOXPLOT
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 5 \u2014 Boxplot avec Seaborn\n",
    "\n",
    "### Qu'est-ce qu'un boxplot ?\n",
    "\n",
    "Le **boxplot** (boite a moustaches) resume la distribution en 5 valeurs cles :\n",
    "- La **boite** : contient 50% des donnees (de Q1 a Q3)\n",
    "- La **ligne** au milieu de la boite : la mediane (valeur du milieu)\n",
    "- Les **moustaches** : s'etendent jusqu'aux valeurs extremes normales\n",
    "- Les **points** au-dela des moustaches : valeurs aberrantes (outliers)\n",
    "\n",
    "**Quand l'utiliser ?** Pour comparer la distribution d'une variable numerique entre plusieurs groupes.\n",
    "\n",
    "**Exemple de vie reelle :** comparer les salaires dans differents secteurs d'activite."
]))

cells5.append(make_md([
    "### On trace le boxplot des ventes par categorie avec sns.boxplot() + plt.show()"
]))

cells5.append(make_code([
    "# On trace le boxplot des montants de vente par categorie\n",
    "fig, ax = plt.subplots(figsize=(12, 6))\n",
    "\n",
    "# sns.boxplot() trace les boites a moustaches\n",
    "# x = categorie (axe horizontal), y = valeur numerique (axe vertical)\n",
    "sns.boxplot(x=\"categorie\", y=\"total\", data=df,\n",
    "            hue=\"categorie\", palette=\"Set2\", legend=False, ax=ax)\n",
    "\n",
    "ax.set_title(\"Distribution des ventes par categorie (Boxplot)\", fontsize=14)\n",
    "ax.set_xlabel(\"Categorie de produit\")        # axe X\n",
    "ax.set_ylabel(\"Montant de la vente (euros)\") # axe Y\n",
    "plt.xticks(rotation=45, ha=\"right\")          # incline les etiquettes\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells5.append(make_md([
    "### Analyse du boxplot\n",
    "\n",
    "Le boxplot permet de comparer la distribution des ventes pour chaque categorie.\n",
    "\n",
    "La categorie **Informatique** presente la boite la plus haute, ce qui signifie que les montants\n",
    "varient beaucoup d'une commande a l'autre (grande dispersion).\n",
    "Les **points isoles** (outliers) au-dessus des moustaches representent des commandes exceptionnellement\n",
    "grandes — probablement des achats en gros ou des equipements professionnels.\n",
    "Les categories avec une **mediane elevee** generent des ventes plus importantes en moyenne."
]))

# --------------------------------------------------------------------------
# PARTIE 6 - HEATMAP
# --------------------------------------------------------------------------
cells5.append(make_md([
    "---\n",
    "## PARTIE 6 \u2014 Heatmap (Carte de Chaleur)\n",
    "\n",
    "### Qu'est-ce qu'une heatmap ?\n",
    "\n",
    "Une **heatmap** (carte de chaleur) utilise des **couleurs** pour representer des valeurs dans un tableau.\n",
    "\n",
    "**Exemple de vie reelle :** une carte meteo qui colore les pays selon leur temperature\n",
    "(rouge = chaud, bleu = froid).\n",
    "\n",
    "On l'utilise souvent pour la **matrice de correlation** qui montre si deux variables evoluent ensemble :\n",
    "- Correlation proche de **+1** : les deux augmentent ensemble (rouge)\n",
    "- Correlation proche de **-1** : quand l'une augmente, l'autre diminue (bleu)\n",
    "- Correlation proche de **0** : pas de relation (blanc)\n",
    "\n",
    "**Comment lire une heatmap de correlation ?**\n",
    "La diagonale est toujours 1.00 (une variable se correle avec elle-meme).\n",
    "On regarde les cases hors diagonale pour trouver des relations interessantes."
]))

cells5.append(make_md([
    "### Etape 1 : on calcule la matrice de correlation"
]))

cells5.append(make_code([
    "# On calcule la matrice de correlation entre les variables numeriques\n",
    "colonnes_num = [\"age\", \"quantite\", \"prix_unitaire\", \"total\", \"satisfaction\"]\n",
    "matrice_corr = df[colonnes_num].corr()   # .corr() calcule toutes les correlations\n",
    "\n",
    "print(\"Matrice de correlation :\")          # affiche le tableau\n",
    "print(matrice_corr.round(2))              # arrondi a 2 decimales"
]))

cells5.append(make_md([
    "### Etape 2 : on visualise avec la heatmap avec sns.heatmap() + plt.show()"
]))

cells5.append(make_code([
    "# On trace la heatmap de la matrice de correlation\n",
    "fig, ax = plt.subplots(figsize=(8, 6))\n",
    "\n",
    "# sns.heatmap() trace la carte de chaleur\n",
    "# annot=True affiche les chiffres dans chaque case\n",
    "# cmap=\"coolwarm\" = bleu pour negatif, rouge pour positif\n",
    "sns.heatmap(matrice_corr,\n",
    "            annot=True,        # affiche les valeurs dans les cases\n",
    "            fmt=\".2f\",         # format a 2 decimales\n",
    "            cmap=\"coolwarm\",   # palette de couleurs\n",
    "            center=0,          # blanc = 0 (pas de correlation)\n",
    "            vmin=-1, vmax=1,   # echelle de -1 a +1\n",
    "            ax=ax)\n",
    "\n",
    "ax.set_title(\"Matrice de correlation des variables numeriques\", fontsize=14)\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells5.append(make_md([
    "### Analyse de la heatmap\n",
    "\n",
    "La heatmap revele les relations entre toutes les variables numeriques du dataset.\n",
    "\n",
    "La correlation la plus forte est entre **quantite et total** (0.95, case rouge vif) :\n",
    "c'est logique — plus on achete d'articles, plus le montant est eleve.\n",
    "La correlation entre **prix_unitaire et total** est positive mais moderee (0.27).\n",
    "En revanche, l'**age** et la **satisfaction** ne sont pratiquement pas correlees a quoi que ce soit\n",
    "(cases presque blanches), ce qui signifie que ces facteurs n'influencent pas le montant des achats."
]))

# RECAPITULATIF
cells5.append(make_md([
    "---\n",
    "## RECAPITULATIF DU MODULE 5\n",
    "\n",
    "| Graphique | Commande | Utilisation |\n",
    "|-----------|----------|-------------|\n",
    "| Barre | `ax.bar()` | Comparer des categories |\n",
    "| Courbe | `ax.plot()` | Montrer une evolution dans le temps |\n",
    "| Histogramme | `ax.hist()` | Distribution d'une variable |\n",
    "| Camembert | `ax.pie()` | Proportions d'un tout |\n",
    "| Boxplot | `sns.boxplot()` | Distribution avec statistiques |\n",
    "| Heatmap | `sns.heatmap()` | Matrice de correlation |\n",
    "\n",
    "**Regle d'or :** toujours utiliser `%matplotlib inline` en haut du notebook\n",
    "pour afficher les graphiques directement dans les cellules.\n",
    "\n",
    "**Dans le prochain module**, on fait une analyse exploratoire complete du dataset !"
]))

nb5 = make_nb(cells5)
with open("c:/KORYXA_formation/MODULE_5_Visualisation_Donnees.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb5, f, ensure_ascii=False, indent=1)
print("MODULE_5 ecrit avec succes !")


# =============================================================================
# MODULE 6
# =============================================================================

cells6 = []

cells6.append(make_md([
    "# MODULE 6 \u2014 Analyse Exploratoire des Donn\u00e9es (EDA)\n",
    "\n",
    "**EDA** signifie **Exploratory Data Analysis** (Analyse Exploratoire des Donnees).\n",
    "\n",
    "C'est la phase ou on 'interroge' les donnees pour comprendre :\n",
    "- Ce qu'elles contiennent (KPIs, statistiques)\n",
    "- Comment chaque variable est distribuee (analyse univariee)\n",
    "- Les relations entre les variables (analyse bivariee)\n",
    "- Les patterns complexes impliquant plusieurs variables (analyse multivariee)\n",
    "\n",
    "A la fin de ce module, on redige un **rapport de conclusions**.\n",
    "\n",
    "**Ce module utilise les donnees nettoyees du module 4.**"
]))

# Cellule 1 : imports + %matplotlib inline
cells6.append(make_code([
    "# %matplotlib inline dit a Jupyter d'afficher les graphiques DANS le notebook\n",
    "%matplotlib inline\n",
    "\n",
    "import pandas as pd               # pour manipuler les donnees\n",
    "import numpy as np                # pour les calculs\n",
    "import matplotlib.pyplot as plt   # pour les graphiques\n",
    "import seaborn as sns             # pour les graphiques avances\n",
    "import os                         # pour tester l'existence de fichiers\n",
    "\n",
    "# On configure le style et la resolution des graphiques\n",
    "sns.set_theme(style=\"whitegrid\")    # fond blanc avec grille\n",
    "plt.rcParams[\"figure.dpi\"] = 100   # resolution des graphiques\n",
    "print(\"Environnement configure !\")"
]))

# Cellule 2 : chargement
cells6.append(make_md([
    "### Chargement du dataset\n",
    "\n",
    "On charge le fichier CSV nettoye produit par le module 4."
]))

cells6.append(make_code([
    "# Chargement du dataset nettoye\n",
    "if os.path.exists(\"ventes_koryxa_propre.csv\"):\n",
    "    df = pd.read_csv(\"ventes_koryxa_propre.csv\", encoding=\"utf-8\")\n",
    "    print(\"Dataset propre charge !\")\n",
    "else:\n",
    "    df = pd.read_csv(\"ventes_koryxa.csv\", encoding=\"utf-8\")\n",
    "    df[\"date\"] = pd.to_datetime(df[\"date\"], errors=\"coerce\")\n",
    "    df[\"mois\"] = df[\"date\"].dt.month\n",
    "    df[\"annee\"] = df[\"date\"].dt.year\n",
    "    print(\"Dataset brut avec nettoyage rapide !\")\n",
    "\n",
    "# On s'assure que la colonne mois est en entier\n",
    "if \"mois\" in df.columns:\n",
    "    df[\"mois\"] = df[\"mois\"].astype(int)\n",
    "\n",
    "print(f\"Dimensions : {df.shape[0]} lignes x {df.shape[1]} colonnes\")\n",
    "print(\"Colonnes :\", list(df.columns))"
]))

# --------------------------------------------------------------------------
# PARTIE 1 - KPIs
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 1 \u2014 KPIs (Indicateurs Cles de Performance)\n",
    "\n",
    "### Qu'est-ce qu'un KPI ?\n",
    "\n",
    "**KPI** = Key Performance Indicator = Indicateur Cle de Performance.\n",
    "\n",
    "Ce sont les **chiffres essentiels** qui permettent de comprendre la sante d'un business en un coup d'oeil.\n",
    "\n",
    "C'est comme le tableau de bord d'une voiture : quelques chiffres importants (vitesse, carburant,\n",
    "temperature) qui resument tout."
]))

cells6.append(make_md([
    "### On calcule les KPIs principaux de Koryxa"
]))

cells6.append(make_code([
    "# Calcul des KPIs principaux\n",
    "print(\"=\" * 50)\n",
    "print(\"   TABLEAU DE BORD KORYXA - KPIs PRINCIPAUX\")\n",
    "print(\"=\" * 50)\n",
    "\n",
    "# Volume\n",
    "nb_transactions = len(df)                     # nombre total de lignes\n",
    "nb_clients_uniques = df[\"client\"].nunique()   # clients differents\n",
    "\n",
    "# Financier\n",
    "ca_total = df[\"total\"].sum()                   # somme de toutes les ventes\n",
    "ca_moyen_par_vente = df[\"total\"].mean()        # moyenne des ventes\n",
    "ca_median = df[\"total\"].median()               # mediane des ventes\n",
    "\n",
    "# Produits\n",
    "nb_produits_uniques = df[\"produit\"].nunique()  # produits differents\n",
    "nb_categories = df[\"categorie\"].nunique()      # categories differentes\n",
    "\n",
    "# Satisfaction\n",
    "satisfaction_moyenne = df[\"satisfaction\"].mean()  # note moyenne\n",
    "\n",
    "print(f\"Nombre de transactions   : {nb_transactions:,}\")\n",
    "print(f\"Clients uniques          : {nb_clients_uniques:,}\")\n",
    "print(f\"Chiffre d'affaires total : {ca_total:,.0f} euros\")\n",
    "print(f\"Vente moyenne            : {ca_moyen_par_vente:.2f} euros\")\n",
    "print(f\"Vente mediane            : {ca_median:.2f} euros\")\n",
    "print(f\"Produits references      : {nb_produits_uniques}\")\n",
    "print(f\"Categories               : {nb_categories}\")\n",
    "print(f\"Satisfaction moyenne     : {satisfaction_moyenne:.2f} / 5\")"
]))

cells6.append(make_md([
    "### KPIs par periode : CA mensuel"
]))

cells6.append(make_code([
    "# KPIs par mois : CA mensuel, nombre de ventes, panier moyen\n",
    "if \"mois\" in df.columns:\n",
    "    ventes_par_mois = df.groupby(\"mois\")[\"total\"].agg([\"sum\", \"count\", \"mean\"])\n",
    "    ventes_par_mois.columns = [\"CA mensuel\", \"Nb ventes\", \"Panier moyen\"]  # renomme les colonnes\n",
    "\n",
    "    print(\"=== CA PAR MOIS ===\")\n",
    "    print(ventes_par_mois.to_string())"
]))

cells6.append(make_md([
    "### Analyse des KPIs\n",
    "\n",
    "Les KPIs donnent une vue d'ensemble rapide du business Koryxa.\n",
    "\n",
    "On note que la **mediane (1 784 euros) est bien inferieure a la moyenne (4 173 euros)**,\n",
    "ce qui indique que quelques tres grosses ventes tirent la moyenne vers le haut.\n",
    "La **satisfaction moyenne de 3.11/5** est neutre — il y a de la marge d'amelioration.\n",
    "Le tableau mensuel revele des disparites importantes : certains mois comme novembre generent\n",
    "beaucoup plus de CA que d'autres."
]))

# --------------------------------------------------------------------------
# PARTIE 2 - ANALYSE UNIVARIEE
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 2 \u2014 Analyse Univariee\n",
    "\n",
    "### Qu'est-ce que l'analyse univariee ?\n",
    "\n",
    "L'**analyse univariee** examine **une seule variable** a la fois.\n",
    "\n",
    "On cherche a comprendre sa **distribution** : comment les valeurs sont reparties.\n",
    "\n",
    "On analyse :\n",
    "- Les variables **numeriques** avec des histogrammes\n",
    "- Les variables **categorielles** avec des graphiques en barres"
]))

cells6.append(make_md([
    "### Variable numerique : distribution des montants de vente (total)"
]))

cells6.append(make_code([
    "# Statistiques descriptives de la variable 'total'\n",
    "print(\"=== STATISTIQUES DE LA VARIABLE 'total' ===\")\n",
    "print(df[\"total\"].describe().round(2))   # min, max, moyenne, quartiles"
]))

cells6.append(make_code([
    "# Histogramme de la distribution des montants de vente\n",
    "fig, ax = plt.subplots(figsize=(10, 5))\n",
    "\n",
    "# ax.hist() trace l'histogramme avec 40 barres\n",
    "ax.hist(df[\"total\"].dropna(), bins=40, color=\"steelblue\", edgecolor=\"white\", alpha=0.8)\n",
    "ax.axvline(df[\"total\"].mean(), color=\"red\", linestyle=\"--\", linewidth=2,\n",
    "           label=\"Moyenne: \" + str(int(df[\"total\"].mean())))\n",
    "ax.axvline(df[\"total\"].median(), color=\"orange\", linestyle=\"--\", linewidth=2,\n",
    "           label=\"Mediane: \" + str(int(df[\"total\"].median())))\n",
    "ax.set_title(\"Distribution des montants de vente\", fontsize=14)\n",
    "ax.set_xlabel(\"Montant (euros)\")\n",
    "ax.set_ylabel(\"Nombre de ventes\")\n",
    "ax.legend()\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse : distribution du total\n",
    "\n",
    "La distribution du montant des ventes est tres **asymetrique vers la droite**.\n",
    "\n",
    "La grande majorite des ventes se situent entre 0 et 5 000 euros, mais quelques ventes\n",
    "depassent 50 000 euros (probablement des achats en gros ou des contrats professionnels).\n",
    "Ces quelques ventes geantes font monter la moyenne a 4 173 euros, alors que la mediane est\n",
    "a seulement 1 784 euros. Dans une telle distribution, la **mediane represente mieux** le\n",
    "montant typique d'une transaction Koryxa."
]))

cells6.append(make_md([
    "### Variable categorielle : repartition par categorie de produit"
]))

cells6.append(make_code([
    "# Nombre de ventes par categorie\n",
    "print(\"=== REPARTITION PAR CATEGORIE ===\")\n",
    "print(df[\"categorie\"].value_counts())   # compte chaque categorie"
]))

cells6.append(make_code([
    "# Graphique en barres horizontal : nombre de ventes par categorie\n",
    "fig, ax = plt.subplots(figsize=(10, 6))\n",
    "\n",
    "categorie_counts = df[\"categorie\"].value_counts()   # comptage des categories\n",
    "ax.barh(categorie_counts.index, categorie_counts.values, color=\"mediumseagreen\")\n",
    "ax.set_title(\"Nombre de ventes par categorie\", fontsize=14)  # titre\n",
    "ax.set_xlabel(\"Nombre de ventes\")                            # axe X\n",
    "\n",
    "# On affiche le nombre sur chaque barre\n",
    "for i, v in enumerate(categorie_counts.values):\n",
    "    ax.text(v + 0.5, i, str(v), va=\"center\")  # texte au bout de chaque barre\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse : repartition par categorie\n",
    "\n",
    "Le graphique montre une tres forte concentration sur les **Peripheriques** (47 ventes)\n",
    "et l'**Informatique** (28 ventes), qui representent a eux seuls 75% des transactions.\n",
    "\n",
    "Les categories **Audio**, **Stockage** et **Accessoire** ont chacune moins de 10 ventes.\n",
    "Ce desequilibre peut refleter soit la demande reelle des clients, soit un manque de\n",
    "visibilite de ces autres categories dans le catalogue Koryxa."
]))

cells6.append(make_md([
    "### Variable numerique discrete : distribution des notes de satisfaction"
]))

cells6.append(make_code([
    "# Distribution des notes de satisfaction (valeurs de 1 a 5)\n",
    "print(\"=== DISTRIBUTION DE LA SATISFACTION ===\")\n",
    "print(df[\"satisfaction\"].value_counts().sort_index())  # trie par note"
]))

cells6.append(make_code([
    "# Graphique en barres de la satisfaction avec une couleur par note\n",
    "fig, ax = plt.subplots(figsize=(8, 5))\n",
    "\n",
    "sat_counts = df[\"satisfaction\"].value_counts().sort_index()  # trie par valeur\n",
    "# Une couleur differente par note : rouge = mauvaise, vert = bonne\n",
    "ax.bar(sat_counts.index, sat_counts.values,\n",
    "       color=[\"#d73027\", \"#f46d43\", \"#fdae61\", \"#a6d96a\", \"#1a9641\"])\n",
    "\n",
    "ax.set_title(\"Distribution des notes de satisfaction (1 a 5)\", fontsize=14)\n",
    "ax.set_xlabel(\"Note de satisfaction\")   # axe X\n",
    "ax.set_ylabel(\"Nombre de clients\")      # axe Y\n",
    "ax.set_xticks([1, 2, 3, 4, 5])          # on fixe les 5 valeurs sur l'axe X\n",
    "\n",
    "# On affiche le nombre au-dessus de chaque barre\n",
    "for x, v in zip(sat_counts.index, sat_counts.values):\n",
    "    ax.text(x, v + 1, str(v), ha=\"center\")\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse : distribution de la satisfaction\n",
    "\n",
    "La distribution des notes de satisfaction est relativement **equilibree** entre toutes les notes.\n",
    "\n",
    "Aucune note ne domine clairement : les notes 1, 2, 3, 4 et 5 sont toutes representees de\n",
    "facon assez similaire (environ 15-24% chacune).\n",
    "Cela signifie que les clients ont des avis tres partages sur leurs experiences.\n",
    "La note 5 est la plus frequente (24%), mais les notes negatives (1 et 2) representent\n",
    "ensemble environ 38% des clients — un signal d'alarme qui merite attention."
]))

# --------------------------------------------------------------------------
# PARTIE 3 - ANALYSE BIVARIEE
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 3 \u2014 Analyse Bivariee\n",
    "\n",
    "### Qu'est-ce que l'analyse bivariee ?\n",
    "\n",
    "L'**analyse bivariee** examine la **relation entre deux variables**.\n",
    "\n",
    "On cherche a savoir : \"Est-ce que la variable A influence la variable B ?\"\n",
    "\n",
    "Selon les types de variables, on utilise differents graphiques :\n",
    "- Numerique vs Numerique -> scatterplot\n",
    "- Categorielle vs Numerique -> boxplot\n",
    "- Categorielle vs Categorielle -> crosstab"
]))

cells6.append(make_md([
    "### Bivariee Categorielle x Numerique : categorie vs montant de vente"
]))

cells6.append(make_code([
    "# Boxplot : est-ce que la categorie influence le montant de la vente ?\n",
    "fig, ax = plt.subplots(figsize=(12, 6))\n",
    "\n",
    "# sns.boxplot() pour comparer les distributions de 'total' par categorie\n",
    "sns.boxplot(x=\"categorie\", y=\"total\", data=df,\n",
    "            hue=\"categorie\", palette=\"Set3\", legend=False, ax=ax)\n",
    "\n",
    "ax.set_title(\"Distribution des ventes par categorie\", fontsize=14)\n",
    "ax.set_xlabel(\"Categorie\")\n",
    "ax.set_ylabel(\"Total vente (euros)\")\n",
    "plt.xticks(rotation=45, ha=\"right\")\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse : categorie vs montant\n",
    "\n",
    "Le boxplot montre que le montant des ventes varie significativement selon la categorie.\n",
    "\n",
    "La categorie **Informatique** a les medianes les plus hautes et de nombreux outliers\n",
    "(points isoles au-dessus) — ce sont probablement des ordinateurs ou des serveurs tres chers.\n",
    "Les **Peripheriques** ont beaucoup de ventes mais a des prix plus moderes.\n",
    "Ces differences de prix entre categories justifient d'analyser le CA par categorie\n",
    "plutot que simplement le nombre de ventes."
]))

cells6.append(make_md([
    "### Bivariee Numerique x Numerique : quantite vs total"
]))

cells6.append(make_code([
    "# Scatterplot : est-ce que la quantite influence le total ?\n",
    "fig, ax = plt.subplots(figsize=(8, 6))\n",
    "\n",
    "# sns.scatterplot() trace un point par vente\n",
    "# alpha=0.4 rend les points semi-transparents pour voir les superpositions\n",
    "sns.scatterplot(x=\"quantite\", y=\"total\", data=df, alpha=0.4, color=\"steelblue\", ax=ax)\n",
    "\n",
    "ax.set_title(\"Relation entre quantite et total de la vente\", fontsize=14)\n",
    "ax.set_xlabel(\"Quantite achetee\")\n",
    "ax.set_ylabel(\"Total (euros)\")\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse : quantite vs total\n",
    "\n",
    "Le nuage de points montre une **relation positive tres claire** entre quantite et total.\n",
    "\n",
    "Les points forment une tendance montante : plus on achete d'articles, plus le total est eleve.\n",
    "La correlation est de 0.95 (tres forte), confirmee par le scatterplot.\n",
    "On remarque aussi que pour une meme quantite, les montants varient beaucoup\n",
    "(car le prix unitaire differe selon les produits)."
]))

cells6.append(make_md([
    "### Bivariee Categorielle x Categorielle : tableau croise"
]))

cells6.append(make_code([
    "# Tableau croise : combien de ventes par categorie ET par mode de paiement ?\n",
    "# pd.crosstab() cree un tableau a double entree\n",
    "tableau_croise = pd.crosstab(df[\"categorie\"], df[\"paiement\"])\n",
    "print(\"=== TABLEAU CROISE : Categorie x Mode de paiement ===\")\n",
    "print(tableau_croise)"
]))

cells6.append(make_md([
    "### Analyse : tableau croise\n",
    "\n",
    "Le tableau croise montre comment se combinent les categories de produits et les modes de paiement.\n",
    "\n",
    "Les **Peripheriques** utilisent tous les modes de paiement de facon relativement equilibree,\n",
    "ce qui confirme que c'est la categorie la plus vendue.\n",
    "L'**Informatique** presente une forte utilisation du Virement bancaire,\n",
    "peut-etre parce que les montants eleves incitent a utiliser un moyen de paiement securise."
]))

# --------------------------------------------------------------------------
# PARTIE 4 - ANALYSE MULTIVARIEE
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 4 \u2014 Analyse Multivariee\n",
    "\n",
    "### Analyser plusieurs variables en meme temps\n",
    "\n",
    "L'**analyse multivariee** regarde les interactions entre **3 variables ou plus**.\n",
    "\n",
    "On utilise :\n",
    "- **pivot_table** : tableau croise avec agregation (comme un tableau Excel avance)\n",
    "- **heatmap** : visualiser le tableau croise avec des couleurs"
]))

cells6.append(make_md([
    "### Etape 1 : on cree le pivot table (panier moyen par categorie et mode de paiement)"
]))

cells6.append(make_code([
    "# Pivot table : CA moyen par categorie et par mode de paiement\n",
    "pivot = df.pivot_table(\n",
    "    values=\"total\",        # la valeur a calculer\n",
    "    index=\"categorie\",     # les lignes du tableau\n",
    "    columns=\"paiement\",    # les colonnes du tableau\n",
    "    aggfunc=\"mean\"         # on calcule la moyenne\n",
    ")\n",
    "\n",
    "print(\"=== PANIER MOYEN PAR CATEGORIE ET MODE DE PAIEMENT ===\")\n",
    "print(pivot.round(0).fillna(0))   # arrondi et remplace les NaN par 0"
]))

cells6.append(make_md([
    "### Etape 2 : on visualise le pivot avec une heatmap"
]))

cells6.append(make_code([
    "# Heatmap du pivot table : panier moyen par categorie et mode de paiement\n",
    "fig, ax = plt.subplots(figsize=(12, 7))\n",
    "\n",
    "# sns.heatmap() avec cmap YlOrRd : jaune = faible, rouge = fort\n",
    "sns.heatmap(pivot.fillna(0),\n",
    "            annot=True,       # affiche les chiffres\n",
    "            fmt=\".0f\",        # format entier\n",
    "            cmap=\"YlOrRd\",    # jaune = faible, rouge = fort\n",
    "            ax=ax)\n",
    "\n",
    "ax.set_title(\"Panier moyen par categorie et mode de paiement\", fontsize=14)\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse de la heatmap multivariee\n",
    "\n",
    "Cette heatmap montre simultanement 3 variables : categorie, mode de paiement et panier moyen.\n",
    "\n",
    "Les **cases les plus rouges** (valeurs les plus elevees) indiquent les combinaisons\n",
    "categorie + mode de paiement qui generent les paniers les plus grands.\n",
    "Par exemple, les achats en **Especes pour les Peripheriques** ou par **Virement pour l'Informatique**\n",
    "tendent a avoir des montants eleves.\n",
    "Les **cases blanches (0)** signifient qu'aucune transaction n'a combine cette categorie et ce mode\n",
    "de paiement dans le dataset."
]))

# --------------------------------------------------------------------------
# PARTIE 5 - MATRICE DE CORRELATION
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 5 \u2014 Matrice de Correlation\n",
    "\n",
    "### Voir toutes les correlations d'un coup\n",
    "\n",
    "La **matrice de correlation** montre les correlations entre **toutes les paires de variables\n",
    "numeriques** en un seul tableau.\n",
    "\n",
    "C'est comme avoir un 'radar' qui detecte toutes les relations dans les donnees."
]))

cells6.append(make_md([
    "### Etape 1 : on calcule la matrice"
]))

cells6.append(make_code([
    "# Calcul de la matrice de correlation\n",
    "colonnes_num = [\"age\", \"quantite\", \"prix_unitaire\", \"total\", \"satisfaction\"]\n",
    "matrice_corr = df[colonnes_num].corr()   # .corr() calcule toutes les correlations\n",
    "\n",
    "print(\"=== MATRICE DE CORRELATION ===\")\n",
    "print(matrice_corr.round(2))   # arrondi a 2 decimales"
]))

cells6.append(make_md([
    "### Etape 2 : on trace la heatmap de correlation"
]))

cells6.append(make_code([
    "# Heatmap de la matrice de correlation\n",
    "fig, ax = plt.subplots(figsize=(8, 6))\n",
    "\n",
    "# cmap=\"coolwarm\" : bleu = correlation negative, rouge = correlation positive\n",
    "sns.heatmap(matrice_corr,\n",
    "            annot=True,        # affiche les valeurs dans les cases\n",
    "            fmt=\".2f\",         # 2 decimales\n",
    "            cmap=\"coolwarm\",   # bleu negatif, rouge positif\n",
    "            center=0,          # blanc = 0 (pas de correlation)\n",
    "            vmin=-1, vmax=1,   # echelle fixe de -1 a +1\n",
    "            ax=ax)\n",
    "\n",
    "ax.set_title(\"Matrice de correlation des variables numeriques\", fontsize=14)\n",
    "\n",
    "plt.tight_layout()\n",
    "plt.show()"
]))

cells6.append(make_md([
    "### Analyse de la matrice de correlation\n",
    "\n",
    "La heatmap de correlation confirme et visualise les relations entre variables.\n",
    "\n",
    "La correlation **quantite-total = 0.95** est la plus forte du dataset (rouge vif) :\n",
    "c'est mathematiquement logique car total = quantite x prix_unitaire.\n",
    "La correlation **prix_unitaire-total = 0.27** est positive mais plus faible.\n",
    "L'**age** est quasiment independant de tout (cases blanches dans sa rangee) :\n",
    "les clients de tous les ages depensent des montants similaires.\n",
    "La **satisfaction** n'est pas correlee au montant depense (0.10 negatif),\n",
    "ce qui signifie que depenser plus n'apporte pas plus de satisfaction."
]))

# --------------------------------------------------------------------------
# PARTIE 6 - RAPPORT DE CONCLUSIONS
# --------------------------------------------------------------------------
cells6.append(make_md([
    "---\n",
    "## PARTIE 6 \u2014 Rapport de Conclusions\n",
    "\n",
    "### Synthese de l'analyse exploratoire\n",
    "\n",
    "On va maintenant resumer toutes nos decouvertes dans un rapport clair."
]))

cells6.append(make_md([
    "### Etape 1 : on calcule les donnees pour le rapport"
]))

cells6.append(make_code([
    "# Calculs pour le rapport final\n",
    "top3_categories = df.groupby(\"categorie\")[\"total\"].sum().sort_values(ascending=False).head(3)\n",
    "top3_villes = df.groupby(\"ville\")[\"total\"].sum().sort_values(ascending=False).head(3)\n",
    "top_paiement = df[\"paiement\"].value_counts().index[0]   # mode de paiement le plus frequent\n",
    "\n",
    "print(\"=== DONNEES POUR LE RAPPORT ===\")\n",
    "print(\"Top 3 categories par CA :\")\n",
    "print(top3_categories)\n",
    "print()\n",
    "print(\"Top 3 villes par CA :\")\n",
    "print(top3_villes)"
]))

cells6.append(make_md([
    "### Etape 2 : on redige le rapport complet"
]))

cells6.append(make_code([
    "# Rapport de conclusions\n",
    "print(\"=\" * 60)\n",
    "print(\"    RAPPORT D'ANALYSE EXPLORATOIRE - KORYXA\")\n",
    "print(\"=\" * 60)\n",
    "print()\n",
    "print(\"1. VUE D'ENSEMBLE\")\n",
    "print(f\"   - {len(df):,} transactions analysees\")\n",
    "print(f\"   - Chiffre d'affaires total : {df['total'].sum():,.0f} euros\")\n",
    "print(f\"   - Panier moyen : {df['total'].mean():.2f} euros\")\n",
    "print()\n",
    "print(\"2. TOP CATEGORIES DE PRODUITS\")\n",
    "for cat, ca in top3_categories.items():\n",
    "    pct = ca / df[\"total\"].sum() * 100\n",
    "    print(f\"   - {cat}: {ca:,.0f} euros ({pct:.1f}% du CA)\")\n",
    "print()\n",
    "print(\"3. GEOGRAPHIE DES VENTES\")\n",
    "for ville, ca in top3_villes.items():\n",
    "    pct = ca / df[\"total\"].sum() * 100\n",
    "    print(f\"   - {ville}: {ca:,.0f} euros ({pct:.1f}% du CA)\")\n",
    "print()\n",
    "print(\"4. MODES DE PAIEMENT\")\n",
    "for mode, count in df[\"paiement\"].value_counts().items():\n",
    "    pct = count / len(df) * 100\n",
    "    print(f\"   - {mode}: {count} transactions ({pct:.1f}%)\")\n",
    "print()\n",
    "print(\"5. SATISFACTION CLIENT\")\n",
    "print(f\"   - Score moyen : {df['satisfaction'].mean():.2f} / 5\")\n",
    "pct_positif = df[df[\"satisfaction\"] >= 4][\"satisfaction\"].count() / len(df) * 100\n",
    "print(f\"   - Clients satisfaits (note 4 ou 5) : {pct_positif:.1f}%\")\n",
    "print()\n",
    "print(\"6. CORRELATIONS CLES\")\n",
    "print(f\"   - Quantite <-> Total : {df['quantite'].corr(df['total']):.3f}\")\n",
    "print(f\"   - Prix unitaire <-> Total : {df['prix_unitaire'].corr(df['total']):.3f}\")\n",
    "print()\n",
    "print(\"=\" * 60)\n",
    "print(\"Fin du rapport d'analyse exploratoire.\")"
]))

cells6.append(make_md([
    "---\n",
    "## RECAPITULATIF DU MODULE 6\n",
    "\n",
    "Dans ce module d'analyse exploratoire, on a parcouru 4 niveaux d'analyse :\n",
    "\n",
    "| Niveau | Type | Questions repondues |\n",
    "|--------|------|---------------------|\n",
    "| KPIs | Vue globale | Chiffres cles du business |\n",
    "| Univariee | 1 variable | Comment est distribuee cette variable ? |\n",
    "| Bivariee | 2 variables | Y a-t-il une relation entre A et B ? |\n",
    "| Multivariee | 3+ variables | Comment les variables interagissent-elles ? |\n",
    "\n",
    "**Outils utilises :**\n",
    "- `df.describe()` - statistiques rapides\n",
    "- `df[\"col\"].value_counts()` - comptage categories\n",
    "- `df.groupby().agg()` - agregation par groupe\n",
    "- `pd.crosstab()` - tableau croise\n",
    "- `df.pivot_table()` - tableau croise avec calcul\n",
    "- `df.corr()` - matrice de correlation\n",
    "- Matplotlib + Seaborn - visualisations\n",
    "\n",
    "**Felicitations ! Tu as complete les 6 modules de la formation Data Science Koryxa !**\n",
    "\n",
    "Tu sais maintenant :\n",
    "- Ecrire du Python (Module 1)\n",
    "- Faire des calculs rapides avec NumPy (Module 2)\n",
    "- Manipuler des donnees avec Pandas (Module 3)\n",
    "- Nettoyer des donnees (Module 4)\n",
    "- Creer des visualisations (Module 5)\n",
    "- Realiser une analyse exploratoire complete (Module 6)"
]))

nb6 = make_nb(cells6)
with open("c:/KORYXA_formation/MODULE_6_Analyse_Exploratoire_EDA.ipynb", "w", encoding="utf-8") as f:
    json.dump(nb6, f, ensure_ascii=False, indent=1)
print("MODULE_6 ecrit avec succes !")
