"""
Script to build all 6 modules for the KORYXA formation.
Each module is written as a Jupyter notebook with detailed pedagogical content.
"""
import json
import os

BASE = "C:/KORYXA_formation"

def md(src):
    return {"cell_type": "markdown", "metadata": {}, "source": src}

def code(src):
    return {"cell_type": "code", "metadata": {}, "execution_count": None, "outputs": [], "source": src}

def make_nb(cells):
    return {
        "nbformat": 4,
        "nbformat_minor": 4,
        "metadata": {
            "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
            "language_info": {"name": "python", "version": "3.8.0"}
        },
        "cells": cells
    }

def write_nb(filename, cells):
    path = os.path.join(BASE, filename)
    nb = make_nb(cells)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(nb, f, ensure_ascii=False, indent=1)
    print(f"Written: {filename}")

# ============================================================
# MODULE 1 — Bases Python
# ============================================================
def build_module1():
    cells = [
        md("""# MODULE 1 — Les Bases de Python pour la Data Science

Bienvenue dans ce premier module ! Ici, on va apprendre les **fondations** de Python.

Python est un **langage de programmation**. C'est une facon d'ecrire des instructions que l'ordinateur peut comprendre et executer.

Imagine que l'ordinateur est un robot tres obeissant. Python est la langue qu'on utilise pour lui donner des ordres.

Dans ce module, tu vas apprendre :
- Comment afficher du texte a l'ecran avec `print()`
- Ce que sont les variables et les types de donnees
- Les listes et les dictionnaires
- Les conditions `if/elif/else`
- Les boucles `for`
- Les fonctions `def`
- Comment lire un fichier CSV de donnees reelles

**On part de zero. Aucune connaissance requise !**"""),

        md("""---
## PARTIE 1 — La commande print()

### Qu'est-ce que print() ?

`print()` est la **premiere commande Python** que tout le monde apprend.

Elle dit a l'ordinateur : **"Affiche ce texte a l'ecran"**

C'est comme appuyer sur le bouton "parler" d'un talkie-walkie : tu parles (tu mets du texte), et l'autre cote affiche a l'ecran.

**Regle importante :** Le texte qu'on veut afficher doit etre entre **guillemets** `""` et entre les **parentheses** `()`

```
print( "Bonjour" )
  ^         ^
commande    texte a afficher
```"""),

        code("""# On demande a Python d'afficher le message "Bonjour le monde !"
# Les guillemets indiquent que c'est du texte
print("Bonjour le monde !")"""),

        md("""Tu vois le texte `Bonjour le monde !` apparaitre juste en dessous ? C'est Python qui repond !

On peut aussi afficher des **nombres** avec `print()`. Les nombres n'ont pas besoin de guillemets."""),

        code("""# On affiche un nombre (pas besoin de guillemets pour les nombres)
print(42)

# On peut aussi afficher plusieurs choses en meme temps
# On les separe avec des virgules
print("Mon age est :", 25)"""),

        md("""---
## PARTIE 2 — Les Variables

### Qu'est-ce qu'une variable ?

Imagine une **boite** avec une etiquette collee dessus.

- L'**etiquette** = le **nom** de la variable (ex: `prenom`)
- Ce qu'il y a **dedans** = la **valeur** (ex: `"Alice"`)

```
+------------------+
|     "Alice"      |   <- la valeur, ce qu'il y a dans la boite
+------------------+
         ^
      prenom         <- l'etiquette (le nom de la variable)
```

En Python, on cree une variable avec le signe `=`

**Attention !** Le `=` en Python veut dire **"met la valeur dans la boite"**. Ce n'est PAS le meme `=` que les mathematiques !

En maths, `x = 5` veut dire "x est egal a 5".
En Python, `x = 5` veut dire **"prends la valeur 5 et range-la dans la boite qui s'appelle x"**."""),

        code("""# On cree une variable appelee "prenom"
# Le signe = met la valeur "Alice" dans la boite "prenom"
prenom = "Alice" """),

        code("""# On affiche ce qui est dans la boite "prenom"
# Python va chercher dans la boite et affiche son contenu
print(prenom)"""),

        code("""# On peut changer la valeur dans la boite a tout moment
# La nouvelle valeur remplace l'ancienne
prenom = "Bob"
print(prenom)"""),

        md("""---
## PARTIE 3 — Les Types de Donnees

### Qu'est-ce qu'un type ?

En Python, chaque valeur a un **type**. Le type dit **quelle sorte de donnee** on a.

C'est comme dans la vraie vie : un numero de telephone, c'est different d'un prenom, meme si les deux ont des chiffres.

Il y a 4 types de base :

| Type | Nom Python | Exemple |
|------|-----------|--------|
| Nombre entier | `int` | 42, -5, 100 |
| Nombre decimal | `float` | 3.14, -0.5, 99.9 |
| Texte | `str` | "Bonjour", "Paris" |
| Vrai/Faux | `bool` | True, False |

### Type 1 : int (nombre entier)"""),

        code("""# int = entier = un nombre SANS virgule
# Exemples : 1, 42, -5, 1000
age = 25                  # 25 est un entier (int)
nombre_produits = 150     # 150 est un entier (int)

# La fonction type() dit quel type est une variable
print(type(age))"""),

        md("""Python repond `<class 'int'>` — ca veut dire que `age` est bien un entier (`int`).

### Type 2 : float (nombre decimal)"""),

        code("""# float = nombre AVEC virgule (on utilise un point, pas une virgule !)
# Exemples : 3.14, -0.5, 19.99
prix = 19.99              # prix avec des centimes -> float
temperature = -3.5        # temperature avec decimales -> float

print(prix)               # affiche 19.99
print(type(prix))         # affiche <class 'float'>"""),

        md("""**Important :** En Python, on ecrit `19.99` avec un **point**, pas `19,99` avec une virgule. La virgule a un autre sens en Python !

### Type 3 : str (texte)"""),

        code("""# str = string = texte = une suite de caracteres
# Le texte est TOUJOURS entre guillemets
ville = "Paris"           # str : le nom d'une ville
produit = "Casque Audio"  # str : le nom d'un produit

print(ville)              # affiche Paris
print(type(ville))        # affiche <class 'str'>"""),

        md("""On peut **coller** des chaines de texte ensemble avec le signe `+`. Ca s'appelle la **concatenation**."""),

        code("""# On colle deux textes ensemble avec +
# C'est comme coller deux morceaux de papier
prenom = "Alice"
nom = "Martin"
nom_complet = prenom + " " + nom  # ajoute un espace entre les deux
print(nom_complet)                 # affiche : Alice Martin"""),

        md("""### Type 4 : bool (Vrai ou Faux)

Le type `bool` (boolean) ne peut avoir que **deux valeurs** : `True` (Vrai) ou `False` (Faux).

C'est comme un interrupteur : soit allume, soit eteint."""),

        code("""# bool = booleen = Vrai ou Faux
# True et False s'ecrivent avec une MAJUSCULE au debut
commande_livree = True    # la commande est livree : Vrai
compte_bloque = False     # le compte est bloque : Faux

print(commande_livree)           # affiche True
print(type(commande_livree))     # affiche <class 'bool'>"""),

        md("""### Les operations mathematiques

On peut faire des calculs avec les nombres en Python.

| Operateur | Signification | Exemple |
|-----------|--------------|--------|
| `+` | Addition | `5 + 3 = 8` |
| `-` | Soustraction | `5 - 3 = 2` |
| `*` | Multiplication | `5 * 3 = 15` |
| `/` | Division | `10 / 2 = 5.0` |
| `**` | Puissance | `2 ** 3 = 8` |"""),

        code("""# Exemple concret : calculer le prix total d'une commande
prix_unitaire = 25.99     # prix d'un article
quantite = 3              # nombre d'articles achetes

# On multiplie le prix par la quantite pour avoir le total
total = prix_unitaire * quantite
print("Total de la commande :", total)"""),

        md("""---
## PARTIE 4 — Les Listes

### Qu'est-ce qu'une liste ?

Jusqu'ici, nos variables ne stockaient qu'**une seule valeur** a la fois.

Mais en data science, on travaille avec des **dizaines, centaines, milliers de valeurs** !

Une **liste** c'est comme un **wagon de train** : plusieurs cases, une a la suite de l'autre, chacune contenant une valeur.

```
+--------+--------+--------+----------+
| Paris  |  Lyon  |  Nice  | Bordeaux |
+--------+--------+--------+----------+
   [0]      [1]      [2]       [3]
    ^         ^        ^          ^
  pos. 0     1        2          3   (on commence a 0 !)
```

En Python, une liste est entre **crochets** `[]` et les valeurs sont separees par des **virgules**."""),

        code("""# On cree une liste de villes
# Les crochets [] indiquent que c'est une liste
# Les guillemets autour de chaque ville -> ce sont des textes (str)
villes = ["Paris", "Lyon", "Nice", "Bordeaux"]
print(villes)"""),

        md("""### Acceder a un element de la liste

Pour aller chercher un element precis, on ecrit le nom de la liste suivi du **numero de position** entre crochets.

**Attention !** Python commence a compter a partir de **0**, pas de 1 !
- Position 0 = 1er element
- Position 1 = 2eme element
- Position 2 = 3eme element..."""),

        code("""# On accede a un element de la liste avec son numero (index)
# ATTENTION : Python compte a partir de 0 !
print(villes[0])   # 1er element : "Paris"
print(villes[1])   # 2eme element : "Lyon"
print(villes[3])   # 4eme element : "Bordeaux" """),

        code("""# On peut connaitre la taille d'une liste avec len()
# len = length = longueur
nombre_de_villes = len(villes)
print("Il y a", nombre_de_villes, "villes dans la liste")"""),

        code("""# On peut ajouter un element a la fin de la liste avec .append()
# append = ajouter en anglais
villes.append("Marseille")  # ajoute "Marseille" a la fin
print(villes)               # on voit "Marseille" a la fin"""),

        md("""---
## PARTIE 5 — Les Dictionnaires

### Qu'est-ce qu'un dictionnaire ?

Un **dictionnaire** c'est comme une **fiche d'informations** : chaque information a un **nom** (cle) et une **valeur**.

C'est exactement comme un vrai dictionnaire : on cherche un **mot** (cle) et on trouve sa **definition** (valeur).

Exemple concret : la fiche d'un client :
```
+----------------------------------+
|  nom       ->  "Alice Martin"    |
|  age       ->  35                |
|  ville     ->  "Paris"           |
|  total     ->  1250.50           |
+----------------------------------+
```

En Python, un dictionnaire est entre **accolades** `{}`. Chaque paire s'ecrit `"cle": valeur`."""),

        code("""# On cree un dictionnaire pour un client
# {} = accolades = indique que c'est un dictionnaire
# "cle": valeur  -> chaque information est une paire cle-valeur
client = {
    "nom": "Alice Martin",
    "age": 35,
    "ville": "Paris",
    "total_achats": 1250.50
}
print(client)"""),

        code("""# Pour lire une valeur, on donne le NOM de la cle entre crochets
# C'est comme chercher un mot dans un vrai dictionnaire
print(client["nom"])          # affiche Alice Martin
print(client["age"])          # affiche 35
print(client["ville"])        # affiche Paris"""),

        code("""# On peut ajouter une nouvelle information au dictionnaire
# On cree une nouvelle cle et on lui donne une valeur
client["email"] = "alice@email.com"   # ajoute la cle email
print(client["email"])                # affiche l'email"""),

        md("""---
## PARTIE 6 — Les Conditions if/elif/else

### Qu'est-ce qu'une condition ?

Les conditions permettent a Python de **prendre des decisions** : faire une chose SI une condition est vraie, une autre chose SI elle est fausse.

C'est exactement comme dans la vraie vie :
- **SI** il pleut -> je prends un parapluie
- **SINON** -> je ne prends pas de parapluie

En Python, ca s'ecrit :
```python
if condition:
    # ce qu'on fait si la condition est vraie
else:
    # ce qu'on fait si la condition est fausse
```

**Important :** L'indentation (l'espace au debut de la ligne) est **obligatoire** en Python !

Les operateurs de comparaison :

| Symbole | Signification |
|---------|---------------|
| `==` | est egal a |
| `!=` | est different de |
| `>` | est plus grand que |
| `<` | est plus petit que |
| `>=` | est plus grand ou egal |
| `<=` | est plus petit ou egal |"""),

        code("""# Exemple : classifier un client selon son montant d'achat
total_achat = 1500  # montant total depense par un client

# SI le total est superieur a 1000 -> client VIP
if total_achat > 1000:
    print("Client VIP")"""),

        code("""# if ... else : deux options possibles
# SI condition vraie -> premier bloc
# SINON (condition fausse) -> deuxieme bloc
total_achat = 500

if total_achat > 1000:
    print("Client VIP")      # execute si total > 1000
else:
    print("Client standard") # execute si total <= 1000"""),

        code("""# if ... elif ... else : plusieurs options possibles
# elif = sinon si -> on verifie une autre condition
total_achat = 750

if total_achat > 1000:
    print("Client VIP")       # si total > 1000
elif total_achat > 500:
    print("Client Premium")   # si 500 < total <= 1000
else:
    print("Client standard")  # si total <= 500"""),

        md("""---
## PARTIE 7 — Les Boucles for

### Qu'est-ce qu'une boucle ?

Imagine que tu dois distribuer un flyer a 100 personnes dans la rue. Tu fais le meme geste 100 fois.

En programmation, quand on veut **repeter** une action plusieurs fois, on utilise une **boucle**.

La boucle `for` dit : **"Pour chaque element dans cette liste, fais cette action"**

```python
for element in ma_liste:
    # action a repeter pour chaque element
```

C'est comme lire une liste de courses : pour chaque produit sur la liste, tu le prends dans le rayon."""),

        code("""# Exemple simple : afficher chaque ville de notre liste
# Pour CHAQUE ville DANS la liste villes -> affiche-la
villes = ["Paris", "Lyon", "Nice", "Bordeaux"]

for ville in villes:    # ville prend tour a tour chaque valeur
    print(ville)        # on affiche la ville en cours"""),

        code("""# Exemple pratique : calculer le total des ventes
ventes = [150, 300, 75, 220, 410]  # liste de montants de ventes
total = 0                           # on commence avec un total de 0

for vente in ventes:           # pour chaque vente dans la liste
    total = total + vente      # on ajoute la vente au total

print("Total des ventes :", total)  # affiche la somme finale"""),

        code("""# range() genere une suite de nombres
# range(5) genere : 0, 1, 2, 3, 4
# Utile quand on veut repeter N fois
for i in range(5):            # i prend les valeurs 0, 1, 2, 3, 4
    print("Repetition", i)    # affiche le numero de repetition"""),

        md("""---
## PARTIE 8 — Les Fonctions def

### Qu'est-ce qu'une fonction ?

Imagine une **machine a cafe** : tu mets des pieces (les entrees), tu appuies sur un bouton, et la machine te donne un cafe (la sortie). Tu n'as pas besoin de savoir comment la machine fonctionne a l'interieur !

En Python, une **fonction** c'est pareil :
- Tu lui donnes des **arguments** (les entrees)
- Elle fait des operations
- Elle te **retourne** un resultat (la sortie)

L'avantage : une fois qu'on a **defini** une fonction, on peut l'utiliser autant de fois qu'on veut sans reecrire le code !

```python
def nom_de_la_fonction(argument1, argument2):
    # le code de la fonction
    return resultat
```

- `def` = define = definir -> on cree la fonction
- `return` -> ce que la fonction donne comme resultat"""),

        code("""# On DEFINIT une fonction qui calcule le prix total
# La fonction recoit le prix et la quantite
# Elle retourne le total
def calculer_total(prix, quantite):
    total = prix * quantite   # on multiplie prix par quantite
    return total              # on retourne le resultat"""),

        code("""# On UTILISE (appelle) la fonction avec des valeurs
# La fonction fait le calcul et retourne le resultat
resultat1 = calculer_total(25.99, 3)   # 25.99 x 3
resultat2 = calculer_total(10.00, 10)  # 10.00 x 10

print("Commande 1 :", resultat1)   # affiche 77.97
print("Commande 2 :", resultat2)   # affiche 100.0"""),

        code("""# Exemple plus complet : une fonction qui classifie un client
def classifier_client(total_achats):
    if total_achats > 1000:
        return "VIP"       # retourne VIP si total > 1000
    elif total_achats > 500:
        return "Premium"   # retourne Premium si 500 < total <= 1000
    else:
        return "Standard"  # retourne Standard sinon

# On teste la fonction avec differentes valeurs
print(classifier_client(1500))   # VIP
print(classifier_client(750))    # Premium
print(classifier_client(200))    # Standard"""),

        md("""---
## PARTIE 9 — Lire un fichier CSV avec Python

### Qu'est-ce qu'un fichier CSV ?

Un fichier **CSV** (Comma-Separated Values = Valeurs separees par des virgules) est un fichier texte qui stocke des donnees sous forme de tableau.

C'est exactement comme un tableau Excel, mais en version texte simple :
```
nom,age,ville
Alice,35,Paris
Bob,28,Lyon
```

Chaque ligne = une **ligne du tableau**
Les valeurs sont separees par des **virgules**
La premiere ligne = les **noms des colonnes** (en-tete)

### Lire un CSV avec le module csv

Python seul ne sait pas lire les CSV. Il faut lui donner des **outils supplementaires** qu'on appelle des **modules**.

On importe un module avec le mot `import`. C'est comme installer une extension dans un logiciel.

Le module `csv` est **inclus avec Python** — pas besoin de l'installer."""),

        code("""# On importe le module csv
# import = donne-moi acces aux outils du module csv
import csv

print("Le module csv est charge et pret a l'emploi !")"""),

        code("""# On ouvre le fichier ventes_koryxa.csv
# open() = ouvre un fichier
# "r" = read = lecture (on ne modifie pas le fichier)
# encoding="utf-8" = pour lire correctement les accents
with open("ventes_koryxa.csv", "r", encoding="utf-8") as fichier:
    lecteur = csv.reader(fichier)       # cree un lecteur CSV
    en_tete = next(lecteur)             # lit la premiere ligne (noms de colonnes)
    print("Colonnes du fichier :")
    print(en_tete)                      # affiche les noms des colonnes"""),

        code("""# On lit les 5 premieres lignes de donnees du fichier
# pour avoir un apercu du contenu
with open("ventes_koryxa.csv", "r", encoding="utf-8") as fichier:
    lecteur = csv.reader(fichier)
    en_tete = next(lecteur)    # saute la ligne d'en-tete

    print("Les 5 premieres ventes :")
    for i, ligne in enumerate(lecteur):  # enumerate donne le numero de ligne
        if i >= 5:                       # on s'arrete apres 5 lignes
            break
        print(ligne)                     # affiche la ligne"""),

        code("""# Calcul du total des ventes depuis le fichier CSV
# La colonne "total" est a l'index 10 (11eme colonne)
total_general = 0          # on commence a zero
nombre_ventes = 0          # compteur de ventes

with open("ventes_koryxa.csv", "r", encoding="utf-8") as fichier:
    lecteur = csv.reader(fichier)
    next(lecteur)                          # saute l'en-tete

    for ligne in lecteur:                  # pour chaque ligne de vente
        try:
            montant = float(ligne[10])     # convertit le total en nombre decimal
            total_general += montant       # ajoute au total general
            nombre_ventes += 1             # compte cette vente
        except:
            pass                           # ignore les lignes avec erreurs

print("Nombre de ventes :", nombre_ventes)
print("Total des ventes :", round(total_general, 2), "euros")"""),

        md("""---
## RECAPITULATIF DU MODULE 1

Voici tout ce qu'on a appris dans ce module :

| Concept | Ce que c'est | Exemple |
|---------|-------------|--------|
| `print()` | Affiche du texte | `print("Bonjour")` |
| Variable | Boite qui stocke une valeur | `age = 25` |
| `int` | Nombre entier | `42` |
| `float` | Nombre decimal | `19.99` |
| `str` | Texte | `"Paris"` |
| `bool` | Vrai ou Faux | `True` |
| Liste | Plusieurs valeurs dans l'ordre | `["a", "b", "c"]` |
| Dictionnaire | Paires cle-valeur | `{"nom": "Alice"}` |
| `if/elif/else` | Prendre des decisions | `if x > 0: ...` |
| `for` | Repeter une action | `for x in liste: ...` |
| `def` | Creer une fonction | `def ma_fonction(): ...` |
| `import csv` | Lire des fichiers CSV | `import csv` |

**Dans le prochain module, on decouvre NumPy — une bibliotheque pour faire des calculs super rapides sur de grandes quantites de donnees !**"""),
    ]
    write_nb("MODULE_1_Bases_Python_Data.ipynb", cells)


# ============================================================
# MODULE 2 — NumPy
# ============================================================
def build_module2():
    cells = [
        md("""# MODULE 2 — NumPy : Le Calcul Numerique en Python

Dans le module precedent, on a appris les bases de Python.

Maintenant on va decouvrir **NumPy** — une des bibliotheques les plus importantes pour la data science.

NumPy permet de faire des calculs tres rapides sur de grandes quantites de nombres.

Dans ce module, tu vas apprendre :
- Pourquoi NumPy est indispensable
- Comment creer des tableaux avec `np.array()`
- Faire des operations sur tous les elements en meme temps
- Acceder a des elements specifiques (indexation et slicing)
- Filtrer des donnees
- Calculer des statistiques : somme, moyenne, min, max, mediane
- Appliquer tout ca sur les vraies donnees de ventes"""),

        md("""---
## PARTIE 1 — Pourquoi NumPy ?

### Le probleme avec les listes Python normales

Avec les listes Python normales, si on veut multiplier tous les prix par 2, on doit utiliser une boucle for.

C'est comme si tu devais ajouter manuellement 1 euro a chaque prix dans une liste de 10 000 prix, un par un.

Avec NumPy, tu peux dire "multiplie TOUS les elements par 2" en une seule ligne !

C'est beaucoup plus rapide et beaucoup plus simple a ecrire."""),

        code("""# Comparaison : liste Python normale vs NumPy

# Avec une liste normale, pour multiplier par 2 :
prix_liste = [10, 20, 30, 40, 50]   # liste normale Python
prix_doubles = []                    # nouvelle liste vide
for prix in prix_liste:              # on parcourt chaque element
    prix_doubles.append(prix * 2)   # on multiplie et ajoute
print("Avec liste normale :", prix_doubles)"""),

        md("""### La solution NumPy

Avec NumPy, on peut faire la meme chose en une seule ligne. NumPy applique l'operation a TOUS les elements en meme temps."""),

        code("""# On importe NumPy avec le surnom "np"
# "as np" veut dire : appelle cette bibliotheque "np" pour aller plus vite
import numpy as np

# Avec NumPy, meme operation en UNE SEULE LIGNE :
prix_array = np.array([10, 20, 30, 40, 50])  # cree un tableau NumPy
prix_doubles = prix_array * 2                 # multiplie TOUT par 2 d'un coup
print("Avec NumPy :", prix_doubles)"""),

        md("""---
## PARTIE 2 — Creer un tableau NumPy

### Qu'est-ce que np.array() ?

`np.array()` transforme une liste Python en **tableau NumPy**.

Un tableau NumPy c'est comme une liste, mais en beaucoup plus puissant :
- On peut faire des calculs sur tous les elements en meme temps
- C'est beaucoup plus rapide pour les grands volumes de donnees
- Il y a plein de fonctions utiles (somme, moyenne, etc.)"""),

        code("""# On cree un tableau NumPy avec np.array()
# On lui donne une liste entre crochets []
ventes = np.array([150, 300, 75, 220, 410, 90, 560, 180])

print("Le tableau :", ventes)         # affiche tous les elements
print("Type :", type(ventes))         # affiche <class 'numpy.ndarray'>
print("Taille :", ventes.shape)       # affiche (8,) = 8 elements"""),

        code("""# On peut creer des tableaux avec des nombres decimaux (float)
prix_unitaires = np.array([25.99, 49.99, 12.50, 99.00, 5.75])

print("Prix :", prix_unitaires)
print("Type des donnees :", prix_unitaires.dtype)  # float64 = nombres decimaux"""),

        md("""---
## PARTIE 3 — Operations sur tous les elements

### La magie de NumPy : operations vectorisees

En NumPy, quand on ecrit `tableau + 10`, Python ajoute 10 a CHAQUE element.

C'est comme si tu avais une baguette magique qui transforme tous les elements d'un coup !

Cela s'appelle les **operations vectorisees**."""),

        code("""# Operation sur TOUS les elements en meme temps
quantites = np.array([2, 4, 1, 3, 5])  # quantites vendues
prix = np.array([50, 30, 100, 25, 80]) # prix unitaires

# Calcul du total de chaque vente (quantite x prix)
# Python multiplie element par element : 2x50, 4x30, 1x100, ...
totaux = quantites * prix
print("Quantites :", quantites)
print("Prix      :", prix)
print("Totaux    :", totaux)"""),

        code("""# Appliquer une remise de 10% sur tous les prix
# On multiplie par 0.9 (= garder 90% du prix = -10%)
prix_originaux = np.array([100.0, 200.0, 50.0, 300.0])
prix_avec_remise = prix_originaux * 0.9   # 10% de remise sur tout

print("Prix originaux     :", prix_originaux)
print("Prix avec -10%     :", prix_avec_remise)"""),

        md("""---
## PARTIE 4 — Indexation et Slicing

### Acceder a des elements specifiques

Comme avec les listes Python, on peut acceder a un element avec son **numero de position** (index).

Et on peut aussi prendre **une tranche** (slice) : une partie du tableau.

```
tableau = [10, 20, 30, 40, 50]
           [0]  [1]  [2]  [3]  [4]   <- index
```"""),

        code("""# Indexation : acceder a un element precis
notes = np.array([85, 92, 78, 95, 61, 88, 74])

print("Tous les elements :", notes)
print("1er element (index 0) :", notes[0])   # 85
print("2eme element (index 1) :", notes[1])   # 92
print("Dernier element (index -1) :", notes[-1])  # -1 = dernier"""),

        code("""# Slicing : prendre une partie du tableau
# array[debut:fin]  -> prend de "debut" jusqu'a "fin" (fin non incluse)
print("Elements 0 a 2 :", notes[0:3])    # indices 0, 1, 2
print("Elements 2 a 4 :", notes[2:5])    # indices 2, 3, 4
print("3 premiers     :", notes[:3])     # debut jusqu'a 3
print("3 derniers      :", notes[-3:])   # 3 derniers elements"""),

        md("""---
## PARTIE 5 — Filtrage des donnees

### Selectionner des elements selon une condition

C'est l'une des fonctions les plus utiles de NumPy !

On peut ecrire `tableau[tableau > 100]` pour obtenir SEULEMENT les elements plus grands que 100.

C'est comme passer les donnees a travers un **filtre** : seul ce qui repond a la condition passe.

Etape 1 : NumPy cree un tableau de True/False (le masque)
Etape 2 : NumPy garde seulement les elements ou c'est True"""),

        code("""# Etape 1 : le masque - Python verifie chaque element
ventes = np.array([150, 300, 75, 220, 410, 90, 560, 180])

masque = ventes > 200    # pour chaque element : est-il > 200 ?
print("Masque True/False :", masque)
# True = l'element est > 200, False = l'element est <= 200"""),

        code("""# Etape 2 : on applique le masque pour filtrer
# Seuls les elements ou masque=True sont gardes
grandes_ventes = ventes[ventes > 200]
print("Ventes originales  :", ventes)
print("Ventes > 200 euros :", grandes_ventes)"""),

        code("""# On peut combiner plusieurs conditions
# & = ET (les deux conditions doivent etre vraies)
# | = OU (au moins une condition doit etre vraie)
ventes_moyennes = ventes[(ventes >= 100) & (ventes <= 300)]
print("Ventes entre 100 et 300 euros :", ventes_moyennes)"""),

        md("""---
## PARTIE 6 — Statistiques avec NumPy

### Calculer des statistiques en une ligne

NumPy a des fonctions toutes prates pour calculer des statistiques.

Ces fonctions analysent TOUS les elements du tableau et retournent une valeur.

C'est comme si tu avais une calculatrice qui fait tout le travail en un clic !"""),

        code("""# Les fonctions statistiques de NumPy
ventes = np.array([150, 300, 75, 220, 410, 90, 560, 180, 320, 95])

print("Somme totale  :", np.sum(ventes))     # additionne tout
print("Moyenne       :", np.mean(ventes))    # valeur moyenne
print("Minimum       :", np.min(ventes))     # plus petite valeur
print("Maximum       :", np.max(ventes))     # plus grande valeur
print("Mediane       :", np.median(ventes))  # valeur du milieu"""),

        code("""# La mediane vs la moyenne : quelle difference ?
# Exemple : si une vente est TRES elevee, elle "tire" la moyenne vers le haut
# mais la mediane reste stable

ventes_avec_outlier = np.array([100, 120, 110, 105, 115, 5000])  # 5000 = vente exceptionnelle

print("Avec une vente exceptionnelle de 5000 euros :")
print("Moyenne :", np.mean(ventes_avec_outlier))    # tiree vers le haut par 5000
print("Mediane :", np.median(ventes_avec_outlier))  # reste representative"""),

        md("""---
## PARTIE 7 — Application sur les donnees de ventes

### Analyse des vraies donnees

Maintenant on va utiliser NumPy sur le vrai dataset de ventes de Koryxa !

On va charger les donnees, les convertir en tableaux NumPy, et faire des analyses."""),

        code("""# On charge les donnees de ventes avec le module csv
import csv

totaux_ventes = []    # liste pour stocker les totaux
quantites_list = []   # liste pour stocker les quantites
satisfactions = []    # liste pour stocker les satisfactions

with open("ventes_koryxa.csv", "r", encoding="utf-8") as fichier:
    lecteur = csv.reader(fichier)
    next(lecteur)   # saute la ligne d'en-tete

    for ligne in lecteur:
        try:
            totaux_ventes.append(float(ligne[10]))    # colonne "total"
            quantites_list.append(int(ligne[8]))       # colonne "quantite"
            satisfactions.append(int(ligne[12]))       # colonne "satisfaction"
        except:
            pass   # ignore les lignes incompletes

print(f"Donnees chargees : {len(totaux_ventes)} ventes")"""),

        code("""# On convertit les listes en tableaux NumPy
# Ca nous permet d'utiliser toutes les fonctions NumPy
totaux = np.array(totaux_ventes)
quantites = np.array(quantites_list)
scores = np.array(satisfactions)

print("Tableau totaux    :", totaux[:5], "...")  # affiche les 5 premiers
print("Nombre de ventes  :", len(totaux))"""),

        code("""# Statistiques sur les totaux de ventes
print("=== STATISTIQUES DES VENTES ===")
print(f"Chiffre d'affaires total : {np.sum(totaux):.2f} euros")
print(f"Vente moyenne            : {np.mean(totaux):.2f} euros")
print(f"Vente minimale           : {np.min(totaux):.2f} euros")
print(f"Vente maximale           : {np.max(totaux):.2f} euros")
print(f"Mediane des ventes       : {np.median(totaux):.2f} euros")"""),

        code("""# Filtrage : ventes importantes (> 1000 euros)
grandes_ventes = totaux[totaux > 1000]   # garde seulement les ventes > 1000

print(f"Nombre de ventes > 1000 euros : {len(grandes_ventes)}")
print(f"Part des grandes ventes       : {len(grandes_ventes)/len(totaux)*100:.1f}%")
print(f"Moyenne des grandes ventes    : {np.mean(grandes_ventes):.2f} euros")"""),

        md("""---
## RECAPITULATIF DU MODULE 2

Voici tout ce qu'on a appris dans ce module :

| Concept | Ce que c'est | Exemple |
|---------|-------------|--------|
| `import numpy as np` | Charger NumPy avec le surnom "np" | `import numpy as np` |
| `np.array()` | Creer un tableau NumPy | `np.array([1, 2, 3])` |
| Operations vectorisees | Calculer sur tous les elements | `tableau * 2` |
| `array[0]` | Acceder a un element | `ventes[0]` |
| `array[0:3]` | Prendre une tranche | `ventes[0:3]` |
| `array[array > 100]` | Filtrer selon une condition | `ventes[ventes > 200]` |
| `np.sum()` | Somme de tous les elements | `np.sum(ventes)` |
| `np.mean()` | Moyenne | `np.mean(ventes)` |
| `np.min()` / `np.max()` | Minimum / Maximum | `np.min(ventes)` |
| `np.median()` | Mediane | `np.median(ventes)` |

**Dans le prochain module, on decouvre Pandas — la bibliotheque reine pour manipuler des tableaux de donnees entiers !**"""),
    ]
    write_nb("MODULE_2_NumPy_Calcul_Numerique.ipynb", cells)


# ============================================================
# MODULE 3 — Pandas
# ============================================================
def build_module3():
    cells = [
        md("""# MODULE 3 — Pandas : Manipulation des Donnees

Dans les modules precedents, on a appris Python et NumPy.

Maintenant on decouvre **Pandas** — la bibliotheque la plus utilisee en data science !

Pandas permet de travailler avec des **tableaux de donnees** (comme des feuilles Excel) directement en Python.

Dans ce module, tu vas apprendre :
- Charger un fichier CSV avec `pd.read_csv()`
- Explorer un dataset (head, tail, info, describe, shape)
- Selectionner des colonnes
- Filtrer des lignes selon des conditions
- Trier les donnees
- Grouper et agreger les donnees
- Fusionner des tableaux
- Sauvegarder en CSV"""),

        md("""---
## PARTIE 1 — Importer Pandas

### Qu'est-ce que Pandas ?

**Pandas** est une bibliotheque Python qui permet de manipuler des **tableaux de donnees**.

Imagine un tableau Excel ultra-puissant que tu peux controler avec du code Python.

Ce tableau s'appelle un **DataFrame** en Pandas.

```
          id   date       client        age   ville    total
       +----+----------+------------+-----+--------+--------+
    0  |  1 | 2024-01  | Alice M.   |  35 | Paris  | 1250.5 |
    1  |  2 | 2024-02  | Bob D.     |  28 | Lyon   |  890.0 |
    2  |  3 | 2024-03  | Clara T.   |  42 | Nice   | 2100.0 |
       +----+----------+------------+-----+--------+--------+
index ->  ^     colonne  ->  colonnes ->  colonnes -> colonne
```

- Les **lignes** = les observations (ici, les ventes)
- Les **colonnes** = les variables (ici, les informations sur chaque vente)
- L'**index** = le numero de chaque ligne (commence a 0)"""),

        code("""# On importe pandas avec le surnom "pd"
# "as pd" veut dire : appelle pandas "pd" pour aller plus vite a ecrire
import pandas as pd

print("Pandas est pret !")
print("Version de Pandas :", pd.__version__)"""),

        md("""---
## PARTIE 2 — Charger un fichier CSV

### pd.read_csv() : la porte d'entree des donnees

`pd.read_csv()` lit un fichier CSV et le transforme en **DataFrame** (tableau Pandas).

C'est comme "ouvrir" un fichier Excel, mais en Python."""),

        code("""# On charge le fichier CSV des ventes dans un DataFrame
# pd.read_csv() lit le fichier et cree un tableau Pandas
# On appelle ce tableau "df" (abréviation de DataFrame)
df = pd.read_csv("ventes_koryxa.csv", encoding="utf-8")

print("Fichier charge avec succes !")
print("Type :", type(df))  # affiche <class 'pandas.core.frame.DataFrame'>"""),

        md("""---
## PARTIE 3 — Explorer le DataFrame

### Les commandes d'exploration

Quand on charge un nouveau dataset, la premiere chose a faire c'est l'**explorer** : regarder sa forme, ses colonnes, ses valeurs.

Voici les commandes indispensables :"""),

        code("""# df.head() affiche les 5 premieres lignes du tableau
# C'est comme regarder les premieres pages d'un livre
# Tres utile pour avoir un apercu rapide des donnees
print("=== Les 5 premieres lignes ===")
df.head()"""),

        code("""# df.tail() affiche les 5 dernieres lignes
# Utile pour voir si les dernieres donnees sont correctes
print("=== Les 5 dernieres lignes ===")
df.tail()"""),

        code("""# df.shape donne la taille du tableau : (nombre de lignes, nombre de colonnes)
# C'est comme demander "c'est grand comment ce tableau ?"
lignes, colonnes = df.shape  # on separe en deux variables
print(f"Le tableau a {lignes} lignes et {colonnes} colonnes")"""),

        code("""# df.info() donne des informations sur chaque colonne :
# - le nom de la colonne
# - le nombre de valeurs non-nulles (non-vides)
# - le type de donnees (int, float, object=texte)
df.info()"""),

        code("""# df.describe() calcule les statistiques de base pour chaque colonne numerique
# count = nombre de valeurs, mean = moyenne, std = ecart-type
# min = minimum, 25% = premier quartile, 50% = mediane, 75% = troisieme quartile
# max = maximum
df.describe()"""),

        md("""---
## PARTIE 4 — Selectionner des colonnes

### Acceder a une seule colonne

Pour acceder a une colonne, on ecrit le nom du DataFrame suivi du **nom de la colonne** entre crochets et guillemets.

C'est comme dire : "Dans le tableau, donne-moi seulement la colonne des prix" """),

        code("""# Selectionner une seule colonne avec df["nom_colonne"]
# On obtient une "Series" Pandas (une colonne)
colonne_total = df["total"]
print("Type :", type(colonne_total))   # Series = une colonne
print(colonne_total.head(5))           # affiche les 5 premiers valeurs"""),

        code("""# Selectionner plusieurs colonnes avec df[["col1", "col2"]]
# On met une liste de noms de colonnes (deux crochets !!)
selection = df[["client", "produit", "total"]]
print("Selection de 3 colonnes :")
print(selection.head(5))  # affiche les 5 premieres lignes"""),

        md("""---
## PARTIE 5 — iloc et loc : selectionner par position ou par etiquette

### Deux methodes de selection

- **`iloc`** = selection par **position numerique** (comme les index Python)
- **`loc`** = selection par **etiquette** (nom de ligne ou condition)

Pense a :
- `iloc` = "I look at position **i**" (je regarde a la position i)
- `loc` = "I **loc**ate by label" (je localise par etiquette/nom)"""),

        code("""# iloc : selection par numero de position
# df.iloc[ligne, colonne] -> indices numeriques
print("=== Selection avec iloc ===")
print("Ligne 0, toutes colonnes :")
print(df.iloc[0])      # toute la premiere ligne"""),

        code("""# iloc avec des plages
# df.iloc[0:3, 0:4] -> lignes 0,1,2 et colonnes 0,1,2,3
print("Lignes 0 a 2, colonnes 0 a 3 :")
print(df.iloc[0:3, 0:4])"""),

        code("""# loc : selection par nom de colonne
# df.loc[condition, "nom_colonne"]
print("=== Selection avec loc ===")
print("Premiere ligne, colonnes client et total :")
print(df.loc[0, ["client", "total"]])"""),

        md("""---
## PARTIE 6 — Filtrer les lignes

### Selectionner les lignes selon une condition

C'est comme faire une recherche dans Excel : "montre-moi seulement les ventes de Paris".

En Pandas, on ecrit la condition entre crochets apres le nom du DataFrame."""),

        code("""# Filtrer les ventes de Paris seulement
# df["ville"] == "Paris" cree un tableau True/False
# On garde seulement les lignes ou c'est True
ventes_paris = df[df["ville"] == "Paris"]

print(f"Nombre de ventes a Paris : {len(ventes_paris)}")
print(ventes_paris[["client", "ville", "produit", "total"]].head(5))"""),

        code("""# Filtrer les ventes avec un total superieur a 1000 euros
grandes_ventes = df[df["total"] > 1000]

print(f"Nombre de grandes ventes (>1000 euros) : {len(grandes_ventes)}")
print(grandes_ventes[["client", "produit", "total"]].head(5))"""),

        code("""# Combiner deux conditions avec & (ET) ou | (OU)
# & = les deux conditions doivent etre vraies
# Ventes de Paris ET avec total > 500
ventes_paris_grandes = df[(df["ville"] == "Paris") & (df["total"] > 500)]

print(f"Ventes a Paris avec total > 500 euros : {len(ventes_paris_grandes)}")"""),

        md("""---
## PARTIE 7 — Trier les donnees

### sort_values() : trier le tableau

`sort_values()` permet de trier le tableau selon une (ou plusieurs) colonnes.

C'est comme cliquer sur l'en-tete d'une colonne dans Excel pour trier."""),

        code("""# Trier par total de vente, du plus grand au plus petit
# ascending=False = ordre decroissant (grand -> petit)
df_trie = df.sort_values("total", ascending=False)

print("Top 5 des plus grandes ventes :")
print(df_trie[["client", "produit", "total"]].head(5))"""),

        code("""# Trier par plusieurs colonnes
# D'abord par ville (A->Z), puis par total (grand->petit)
df_trie2 = df.sort_values(["ville", "total"], ascending=[True, False])

print("Ventes triees par ville puis par total decroissant :")
print(df_trie2[["ville", "client", "total"]].head(8))"""),

        md("""---
## PARTIE 8 — Grouper et Agreger

### groupby() : analyser par categories

`groupby()` est l'une des fonctions les plus puissantes de Pandas.

Elle permet de **regrouper** les lignes par categorie et de faire des **calculs** sur chaque groupe.

C'est comme demander : "Quel est le total des ventes PAR ville ?" ou "Quel est l'age moyen PAR region ?"

Etape 1 : On regroupe (groupby)
Etape 2 : On calcule (sum, mean, count...)"""),

        code("""# Calcul du total des ventes par categorie de produit
# groupby("categorie") = regroupe toutes les lignes par categorie
# ["total"] = on s'interesse a la colonne total
# .sum() = on additionne le total de chaque groupe
ventes_par_categorie = df.groupby("categorie")["total"].sum()

print("Total des ventes par categorie :")
print(ventes_par_categorie.sort_values(ascending=False))"""),

        code("""# Calcul de la satisfaction moyenne par produit
satisfaction_par_produit = df.groupby("produit")["satisfaction"].mean()

print("Satisfaction moyenne par produit :")
print(satisfaction_par_produit.sort_values(ascending=False).head(10))"""),

        code("""# Plusieurs statistiques en meme temps avec .agg()
# agg = aggregate = agreger
stats_par_region = df.groupby("region")["total"].agg(
    total_ventes="sum",     # somme des ventes
    vente_moyenne="mean",   # moyenne
    nombre_ventes="count"   # nombre de ventes
)
print("Statistiques par region :")
print(stats_par_region.sort_values("total_ventes", ascending=False))"""),

        md("""---
## PARTIE 9 — Fusionner des tableaux

### merge() et concat() : combiner des DataFrames

Parfois, les donnees sont reparties dans plusieurs fichiers.

- **`merge()`** : fusionne deux tableaux comme un LEFT JOIN SQL (par colonne commune)
- **`concat()`** : colle deux tableaux l'un au dessus de l'autre"""),

        code("""# Exemple de merge : ajouter des informations supplementaires
# On cree un petit tableau avec des infos supplementaires par ville
infos_villes = pd.DataFrame({
    "ville": ["Paris", "Lyon", "Nice", "Bordeaux"],
    "population": [2161000, 515695, 342669, 254436],
    "region_officielle": ["Ile-de-France", "Auvergne-RA", "PACA", "Nouvelle-Aquitaine"]
})

# On fusionne : le tableau df + infos_villes, en les reliant par la colonne "ville"
df_enrichi = df.merge(infos_villes, on="ville", how="left")
# "left" = garder toutes les lignes de df, meme si pas de correspondance
print("DataFrame enrichi avec infos des villes :")
print(df_enrichi[["ville", "total", "population"]].head(5))"""),

        code("""# Exemple de concat : coller deux tableaux
# On cree deux sous-tableaux : ventes du premier et second semestre
df_S1 = df[df["date"] < "2024-07-01"].copy()  # avant juillet
df_S2 = df[df["date"] >= "2024-07-01"].copy() # apres juillet

# On les recolle avec concat
df_reconstitue = pd.concat([df_S1, df_S2], ignore_index=True)

print(f"S1 : {len(df_S1)} ventes")
print(f"S2 : {len(df_S2)} ventes")
print(f"Total reconstitue : {len(df_reconstitue)} ventes")"""),

        md("""---
## PARTIE 10 — Sauvegarder en CSV

### to_csv() : exporter les resultats

Apres avoir analyse et transforme les donnees, on peut sauvegarder le resultat dans un nouveau fichier CSV."""),

        code("""# On sauvegarde le top 20 des ventes dans un fichier CSV
top20_ventes = df.sort_values("total", ascending=False).head(20)

# to_csv() sauvegarde le DataFrame dans un fichier CSV
# index=False = ne pas ecrire le numero de ligne dans le fichier
top20_ventes.to_csv("top20_ventes.csv", index=False, encoding="utf-8")

print("Fichier top20_ventes.csv sauvegarde !")
print(f"Il contient {len(top20_ventes)} lignes")"""),

        md("""---
## RECAPITULATIF DU MODULE 3

| Commande | Ce que ca fait |
|---------|----------------|
| `pd.read_csv("fichier.csv")` | Charge un CSV en DataFrame |
| `df.head()` | Affiche les 5 premieres lignes |
| `df.tail()` | Affiche les 5 dernieres lignes |
| `df.info()` | Infos sur les colonnes et les types |
| `df.describe()` | Statistiques des colonnes numeriques |
| `df.shape` | Taille (lignes, colonnes) |
| `df["col"]` | Selectionner une colonne |
| `df[["col1","col2"]]` | Selectionner plusieurs colonnes |
| `df.iloc[0]` | Selectionner par position |
| `df.loc[0, "col"]` | Selectionner par etiquette |
| `df[df["col"] > 100]` | Filtrer selon une condition |
| `df.sort_values("col")` | Trier selon une colonne |
| `df.groupby("col").sum()` | Grouper et agreger |
| `df.merge(df2, on="col")` | Fusionner deux tableaux |
| `pd.concat([df1, df2])` | Coller deux tableaux |
| `df.to_csv("fichier.csv")` | Sauvegarder en CSV |

**Dans le prochain module, on apprend a nettoyer les donnees — une etape indispensable avant toute analyse !**"""),
    ]
    write_nb("MODULE_3_Pandas_Manipulation_Donnees.ipynb", cells)


# ============================================================
# MODULE 4 — Nettoyage
# ============================================================
def build_module4():
    cells = [
        md("""# MODULE 4 — Nettoyage des Donnees

Dans le monde reel, les donnees sont rarement parfaites.

Il y a souvent des **valeurs manquantes**, des **doublons**, des **erreurs de saisie**, des **dates mal formatees**, des **valeurs aberrantes**...

Le **nettoyage des donnees** (data cleaning) est l'etape la plus importante en data science. On dit souvent que ca prend 80% du temps d'un data scientist !

Dans ce module, tu vas apprendre :
- Identifier les valeurs manquantes avec `isnull().sum()`
- Corriger les valeurs manquantes avec `fillna()`
- Supprimer les doublons avec `drop_duplicates()`
- Nettoyer les textes avec `str.strip().str.title()`
- Convertir les dates avec `pd.to_datetime()`
- Detecter les valeurs aberrantes avec la methode IQR
- Creer une fonction pipeline de nettoyage
- Sauvegarder le dataset propre"""),

        code("""# On importe les bibliotheques necessaires
import pandas as pd    # pour manipuler les donnees
import numpy as np     # pour les calculs numeriques

# On charge le dataset
df = pd.read_csv("ventes_koryxa.csv", encoding="utf-8")
print(f"Dataset charge : {df.shape[0]} lignes, {df.shape[1]} colonnes")"""),

        md("""---
## PARTIE 1 — Identifier les Valeurs Manquantes

### Qu'est-ce qu'une valeur manquante ?

Une **valeur manquante** (ou valeur nulle) c'est quand une case du tableau est **vide** : on ne connait pas l'information.

Par exemple, si un client n'a pas renseigne son age, cette case sera vide (NaN = "Not a Number" en anglais).

NaN est la facon de Python de dire "Je ne sais pas"."""),

        code("""# isnull() cree un tableau True/False : True = valeur manquante
# .sum() compte le nombre de True par colonne
# = nombre de valeurs manquantes par colonne
valeurs_manquantes = df.isnull().sum()

print("=== VALEURS MANQUANTES PAR COLONNE ===")
print(valeurs_manquantes)"""),

        code("""# On affiche seulement les colonnes qui ont des valeurs manquantes
# valeurs_manquantes > 0 = seulement les colonnes avec des manquants
colonnes_avec_manquants = valeurs_manquantes[valeurs_manquantes > 0]

print("Colonnes avec des valeurs manquantes :")
print(colonnes_avec_manquants)
print()
# On calcule le pourcentage de valeurs manquantes
for col, nb in colonnes_avec_manquants.items():
    pct = nb / len(df) * 100
    print(f"  {col}: {nb} manquants ({pct:.1f}%)")"""),

        md("""---
## PARTIE 2 — Corriger les Valeurs Manquantes

### fillna() : remplir les cases vides

`fillna()` remplace les valeurs manquantes (NaN) par une valeur qu'on choisit.

**Quelle valeur mettre a la place ?**
- Pour un **nombre** : souvent la moyenne ou la mediane
- Pour un **texte** : souvent "Inconnu" ou la valeur la plus frequente"""),

        code("""# On travaille sur une copie pour ne pas modifier l'original
df_propre = df.copy()   # .copy() cree une copie independante

# Remplir l'age manquant par la mediane de l'age
# La mediane est plus robuste que la moyenne face aux valeurs extremes
age_median = df_propre["age"].median()   # calcule la mediane
print(f"Age median : {age_median}")

df_propre["age"] = df_propre["age"].fillna(age_median)  # remplace NaN par la mediane
print(f"Valeurs manquantes dans 'age' apres correction : {df_propre['age'].isnull().sum()}")"""),

        code("""# Remplir les valeurs texte manquantes par "Inconnu"
colonnes_texte = ["ville", "region"]  # colonnes texte avec des manquants

for col in colonnes_texte:
    nb_avant = df_propre[col].isnull().sum()   # compte avant
    df_propre[col] = df_propre[col].fillna("Inconnu")  # remplace par "Inconnu"
    nb_apres = df_propre[col].isnull().sum()   # compte apres
    print(f"{col}: {nb_avant} manquants -> {nb_apres} manquants")"""),

        md("""---
## PARTIE 3 — Supprimer les Doublons

### Qu'est-ce qu'un doublon ?

Un **doublon** c'est quand la meme ligne apparait deux fois (ou plus) dans le tableau.

C'est comme avoir la meme vente enregistree deux fois. Ca fausserait tous nos calculs !

`drop_duplicates()` supprime les lignes en double."""),

        code("""# On compte les doublons avant nettoyage
nb_doublons = df_propre.duplicated().sum()   # .duplicated() repere les lignes en double
print(f"Nombre de doublons detectes : {nb_doublons}")"""),

        code("""# On supprime les doublons avec drop_duplicates()
# keep="first" = on garde la premiere occurrence, on supprime les suivantes
df_propre = df_propre.drop_duplicates(keep="first")

print(f"Lignes avant : {len(df)}")
print(f"Lignes apres suppression des doublons : {len(df_propre)}")
print(f"Doublons supprimes : {len(df) - len(df_propre)}")"""),

        md("""---
## PARTIE 4 — Nettoyer les Textes

### Problemes courants dans les textes

Les donnees textuelles ont souvent des problemes :
- **Espaces en trop** : "Paris " au lieu de "Paris"
- **Majuscules inconsistantes** : "paris", "PARIS", "Paris" = 3 valeurs differentes pour la meme ville !
- **Caracteres parasites**

On utilise les methodes `str` de Pandas pour nettoyer."""),

        code("""# Verifier les problemes de casse (majuscules/minuscules)
print("Villes uniques dans les donnees :")
print(sorted(df_propre["ville"].unique()[:10]))  # 10 premieres villes uniques"""),

        code("""# str.strip() supprime les espaces au debut et a la fin
# str.title() met la premiere lettre en majuscule, le reste en minuscule
# "paris" -> "Paris", " PARIS " -> "Paris"
df_propre["ville"] = df_propre["ville"].str.strip().str.title()
df_propre["region"] = df_propre["region"].str.strip().str.title()
df_propre["client"] = df_propre["client"].str.strip()
df_propre["produit"] = df_propre["produit"].str.strip()

print("Villes apres nettoyage :")
print(sorted(df_propre["ville"].unique()[:10]))"""),

        md("""---
## PARTIE 5 — Convertir les Dates

### pd.to_datetime() : transformer les textes en vraies dates

Les dates sont souvent stockees comme du texte dans les CSV.

Par exemple, "2024-10-18" est un texte, pas une vraie date. Python ne peut pas faire de calculs dessus.

`pd.to_datetime()` transforme ces textes en **vrais objets dates** que Python comprend."""),

        code("""# Avant conversion : le type de la colonne date
print("Type avant conversion :", df_propre["date"].dtype)  # object = texte
print("Exemples :", df_propre["date"].head(3).tolist())"""),

        code("""# pd.to_datetime() convertit les textes en vraies dates
# errors="coerce" = si une date est invalide, on met NaT (date manquante)
df_propre["date"] = pd.to_datetime(df_propre["date"], errors="coerce")

print("Type apres conversion  :", df_propre["date"].dtype)  # datetime64
print("Exemples              :", df_propre["date"].head(3).tolist())"""),

        code("""# Maintenant on peut extraire des informations de la date
# .dt donne acces aux proprietes de date
df_propre["annee"] = df_propre["date"].dt.year     # l'annee
df_propre["mois"] = df_propre["date"].dt.month     # le mois (1-12)
df_propre["jour"] = df_propre["date"].dt.day       # le jour

print("Nouvelles colonnes extraites de la date :")
print(df_propre[["date", "annee", "mois", "jour"]].head(5))"""),

        md("""---
## PARTIE 6 — Detecter les Valeurs Aberrantes

### Qu'est-ce qu'une valeur aberrante (outlier) ?

Une **valeur aberrante** est une valeur qui s'eloigne beaucoup des autres.

Par exemple, si toutes les ventes sont entre 50 et 500 euros, mais qu'une vente est a 50 000 euros, c'est probablement une erreur.

**Methode IQR (Interquartile Range)** :
- On calcule le "quartile 1" (Q1) = valeur en dessous de laquelle se trouvent 25% des donnees
- On calcule le "quartile 3" (Q3) = valeur en dessous de laquelle se trouvent 75% des donnees
- IQR = Q3 - Q1 (l'ecart entre les deux)
- Tout ce qui est en dessous de Q1 - 1.5*IQR ou au dessus de Q3 + 1.5*IQR est suspect"""),

        code("""# Methode IQR pour detecter les outliers sur la colonne "total"
Q1 = df_propre["total"].quantile(0.25)   # 25% des valeurs sont en dessous
Q3 = df_propre["total"].quantile(0.75)   # 75% des valeurs sont en dessous
IQR = Q3 - Q1                             # ecart interquartile

# Limites de detection
borne_basse = Q1 - 1.5 * IQR   # en dessous = trop bas
borne_haute = Q3 + 1.5 * IQR   # au dessus = trop haut

print(f"Q1 (25%) = {Q1:.2f} euros")
print(f"Q3 (75%) = {Q3:.2f} euros")
print(f"IQR = {IQR:.2f} euros")
print(f"Borne basse : {borne_basse:.2f} euros")
print(f"Borne haute : {borne_haute:.2f} euros")"""),

        code("""# On identifie les outliers
outliers = df_propre[(df_propre["total"] < borne_basse) | (df_propre["total"] > borne_haute)]
print(f"Nombre d'outliers detectes : {len(outliers)}")

if len(outliers) > 0:
    print("Exemples d'outliers :")
    print(outliers[["client", "produit", "total"]].head(5))"""),

        md("""---
## PARTIE 7 — Fonction Pipeline de Nettoyage

### Creer une fonction qui fait tout en une fois

On va maintenant tout regrouper dans une **fonction pipeline**.

Un **pipeline** c'est comme une chaine d'usine : les donnees entrent sales, passent par chaque etape de nettoyage, et sortent propres.

On peut ensuite appeler cette fonction sur n'importe quel dataset similaire !"""),

        code("""# Fonction complete de nettoyage
def nettoyer_dataset(df_brut):
    \"\"\"
    Nettoie le dataset de ventes Koryxa.
    Etapes : copie, valeurs manquantes, doublons, textes, dates
    Retourne le dataset nettoye.
    \"\"\"
    # ETAPE 1 : Copie pour ne pas modifier l'original
    df_clean = df_brut.copy()

    # ETAPE 2 : Valeurs manquantes
    df_clean["age"] = df_clean["age"].fillna(df_clean["age"].median())
    df_clean["ville"] = df_clean["ville"].fillna("Inconnu")
    df_clean["region"] = df_clean["region"].fillna("Inconnue")

    # ETAPE 3 : Doublons
    df_clean = df_clean.drop_duplicates(keep="first")

    # ETAPE 4 : Nettoyage textes
    df_clean["ville"] = df_clean["ville"].str.strip().str.title()
    df_clean["region"] = df_clean["region"].str.strip().str.title()
    df_clean["client"] = df_clean["client"].str.strip()
    df_clean["produit"] = df_clean["produit"].str.strip()

    # ETAPE 5 : Conversion des dates
    df_clean["date"] = pd.to_datetime(df_clean["date"], errors="coerce")
    df_clean["annee"] = df_clean["date"].dt.year
    df_clean["mois"] = df_clean["date"].dt.month

    return df_clean

print("Fonction nettoyer_dataset() definie et prete !")"""),

        code("""# On applique la fonction sur le dataset original
df_original = pd.read_csv("ventes_koryxa.csv", encoding="utf-8")
df_nettoye = nettoyer_dataset(df_original)

print("=== RAPPORT DE NETTOYAGE ===")
print(f"Lignes avant : {len(df_original)}")
print(f"Lignes apres : {len(df_nettoye)}")
print(f"Valeurs manquantes restantes : {df_nettoye.isnull().sum().sum()}")
print(f"Colonnes : {list(df_nettoye.columns)}")"""),

        code("""# ETAPE FINALE : Sauvegarde du dataset propre
# C'est ce fichier qui sera utilise par les modules 5 et 6
df_nettoye.to_csv("ventes_koryxa_propre.csv", index=False, encoding="utf-8")

print("Fichier 'ventes_koryxa_propre.csv' sauvegarde avec succes !")
print(f"Dimensions : {df_nettoye.shape[0]} lignes x {df_nettoye.shape[1]} colonnes")"""),

        md("""---
## RECAPITULATIF DU MODULE 4

| Etape | Commande | Ce que ca fait |
|-------|---------|----------------|
| 1. Detecter manquants | `df.isnull().sum()` | Compte les cases vides par colonne |
| 2. Remplir manquants | `df["col"].fillna(valeur)` | Remplace NaN par une valeur |
| 3. Supprimer doublons | `df.drop_duplicates()` | Enleve les lignes en double |
| 4. Nettoyer textes | `str.strip().str.title()` | Supprime espaces, normalise casse |
| 5. Convertir dates | `pd.to_datetime()` | Transforme texte en vraie date |
| 6. Detecter outliers | Methode IQR | Detecte les valeurs extremes |
| 7. Sauvegarder | `df.to_csv("fichier.csv")` | Ecrit le dataset propre |

**Dans le prochain module, on apprend a visualiser les donnees avec des graphiques !**"""),
    ]
    write_nb("MODULE_4_Nettoyage_Donnees.ipynb", cells)


# ============================================================
# MODULE 5 — Visualisation
# ============================================================
def build_module5():
    cells = [
        md("""# MODULE 5 — Visualisation des Donnees

Un graphique vaut mille mots ! En data science, la visualisation permet de comprendre rapidement les donnees.

Dans ce module, tu vas apprendre a creer des graphiques avec deux bibliotheques :
- **Matplotlib** : la bibliotheque de base pour les graphiques
- **Seaborn** : construite sur Matplotlib, avec des graphiques plus beaux et plus faciles

Dans ce module, tu vas creer :
- Des graphiques en barres (bar chart)
- Des courbes (line chart)
- Des histogrammes
- Des graphiques en camembert (pie chart)
- Des boxplots
- Des nuages de points (scatterplot)
- Des heatmaps (cartes de chaleur)"""),

        code("""# Configuration pour les graphiques en mode non-interactif
# Agg = backend sans fenetre graphique (pour execution dans notebooks)
import matplotlib
matplotlib.use("Agg")   # doit etre fait AVANT d'importer pyplot

import matplotlib.pyplot as plt  # bibliotheque principale de graphiques
import seaborn as sns             # bibliotheque de graphiques avances
import pandas as pd               # pour manipuler les donnees
import numpy as np                # pour les calculs

# On configure le style des graphiques Seaborn
sns.set_theme(style="whitegrid")  # fond blanc avec grille
print("Bibliotheques de visualisation chargees !")"""),

        code("""# On charge le dataset nettoye (produit par le module 4)
# Si ventes_koryxa_propre.csv n'existe pas encore, on utilise le brut
import os
if os.path.exists("ventes_koryxa_propre.csv"):
    df = pd.read_csv("ventes_koryxa_propre.csv", encoding="utf-8")
    print("Dataset propre charge !")
else:
    df = pd.read_csv("ventes_koryxa.csv", encoding="utf-8")
    df["ville"] = df["ville"].fillna("Inconnu").str.strip().str.title()
    df["region"] = df["region"].fillna("Inconnue").str.strip().str.title()
    df["age"] = df["age"].fillna(df["age"].median())
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["mois"] = df["date"].dt.month
    print("Dataset brut charge avec nettoyage rapide !")

print(f"Dimensions : {df.shape}")"""),

        md("""---
## PARTIE 1 — Comprendre fig et ax

### La structure d'un graphique Matplotlib

Avant de tracer des graphiques, il faut comprendre deux concepts :

- **`fig`** (figure) = la **feuille de papier** sur laquelle on dessine
- **`ax`** (axes) = le **cadre du graphique** sur la feuille (les axes X et Y)

On cree les deux en meme temps avec `plt.subplots()` :

```python
fig, ax = plt.subplots()
# fig = la feuille
# ax  = le cadre avec les axes X et Y
```

Ensuite on dessine sur `ax` avec des commandes comme `ax.bar()`, `ax.plot()`, etc."""),

        code("""# Exemple minimal : un graphique vide pour voir la structure
fig, ax = plt.subplots(figsize=(8, 4))  # figsize = taille en pouces (largeur, hauteur)

ax.set_title("Mon premier graphique")   # titre du graphique
ax.set_xlabel("Axe X")                  # etiquette axe horizontal
ax.set_ylabel("Axe Y")                  # etiquette axe vertical

plt.tight_layout()          # ajuste automatiquement les marges
plt.savefig("graphique_vide.png", dpi=100, bbox_inches="tight")
plt.close()                 # ferme le graphique pour liberer la memoire
print("Graphique vide cree : graphique_vide.png")"""),

        md("""---
## PARTIE 2 — Graphique en Barres (Bar Chart)

### Quand utiliser un bar chart ?

Le **graphique en barres** est ideal pour **comparer des categories** entre elles.

Exemple : "Quelle categorie de produit a les meilleures ventes ?"

Chaque barre represente une categorie, et la hauteur de la barre = la valeur."""),

        code("""# Calcul du total des ventes par categorie
ventes_categorie = df.groupby("categorie")["total"].sum().sort_values(ascending=False)

# Creation du graphique en barres
fig, ax = plt.subplots(figsize=(10, 5))   # on cree la feuille et le cadre

# ax.bar() trace les barres
# x = les categories (axe horizontal)
# height = les valeurs (hauteur des barres)
ax.bar(ventes_categorie.index, ventes_categorie.values, color="steelblue")

ax.set_title("Total des ventes par categorie", fontsize=14, pad=15)
ax.set_xlabel("Categorie")
ax.set_ylabel("Total des ventes (euros)")
plt.xticks(rotation=45, ha="right")  # incline les etiquettes pour eviter chevauchement

plt.tight_layout()
plt.savefig("bar_ventes_categorie.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : bar_ventes_categorie.png")"""),

        md("""---
## PARTIE 3 — Courbe (Line Chart)

### Quand utiliser un line chart ?

La **courbe** est ideale pour montrer l'**evolution dans le temps**.

Exemple : "Comment les ventes ont-elles evolue mois par mois ?"

Les points sont relies par une ligne pour montrer la tendance."""),

        code("""# Calcul des ventes mensuelles
ventes_mensuelles = df.groupby("mois")["total"].sum()

# Creation de la courbe
fig, ax = plt.subplots(figsize=(10, 5))

# ax.plot() trace une courbe
# marker="o" ajoute des points sur chaque valeur
ax.plot(ventes_mensuelles.index, ventes_mensuelles.values,
        marker="o", color="darkorange", linewidth=2, markersize=8)

ax.set_title("Evolution des ventes par mois", fontsize=14)
ax.set_xlabel("Mois")
ax.set_ylabel("Total des ventes (euros)")
ax.set_xticks(range(1, 13))  # 12 mois sur l'axe X
noms_mois = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jun",
             "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"]
ax.set_xticklabels(noms_mois)  # noms des mois au lieu des numeros

plt.tight_layout()
plt.savefig("line_ventes_mensuelles.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : line_ventes_mensuelles.png")"""),

        md("""---
## PARTIE 4 — Histogramme

### Quand utiliser un histogramme ?

L'**histogramme** montre la **distribution** d'une variable numerique.

Il repond a la question : "Comment les valeurs sont-elles reparties ?"

Par exemple : "La plupart des ventes sont-elles petites ou grandes ?"

L'axe X montre les valeurs, l'axe Y montre combien de fois chaque plage de valeurs apparait."""),

        code("""# Histogramme de la distribution des totaux de vente
fig, ax = plt.subplots(figsize=(10, 5))

# ax.hist() trace l'histogramme
# bins = nombre de barres (intervalles)
# edgecolor = couleur du bord des barres
ax.hist(df["total"].dropna(), bins=30, color="mediumseagreen",
        edgecolor="white", alpha=0.8)

# On ajoute une ligne verticale pour la moyenne
moyenne = df["total"].mean()
ax.axvline(moyenne, color="red", linestyle="--",
           linewidth=2, label=f"Moyenne : {moyenne:.0f} euros")

ax.set_title("Distribution des montants de vente", fontsize=14)
ax.set_xlabel("Montant de la vente (euros)")
ax.set_ylabel("Nombre de ventes")
ax.legend()  # affiche la legende (la ligne rouge)

plt.tight_layout()
plt.savefig("hist_distribution_ventes.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : hist_distribution_ventes.png")"""),

        md("""---
## PARTIE 5 — Camembert (Pie Chart)

### Quand utiliser un camembert ?

Le **camembert** montre les **proportions** : comment une totalite se divise en parts.

Exemple : "Quelle part des ventes represente chaque mode de paiement ?"

Chaque tranche represente une categorie, sa taille est proportionnelle a sa part."""),

        code("""# Repartition par mode de paiement
paiements = df["paiement"].value_counts()   # compte chaque mode de paiement

fig, ax = plt.subplots(figsize=(8, 8))

# ax.pie() trace le camembert
# autopct = format pour afficher le pourcentage sur chaque part
# startangle = angle de depart de la premiere tranche
ax.pie(paiements.values,
       labels=paiements.index,
       autopct="%1.1f%%",      # affiche "42.3%"
       startangle=90,
       colors=sns.color_palette("pastel"))

ax.set_title("Repartition des ventes par mode de paiement", fontsize=14)

plt.tight_layout()
plt.savefig("pie_paiements.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : pie_paiements.png")"""),

        md("""---
## PARTIE 6 — Boxplot avec Seaborn

### Qu'est-ce qu'un boxplot ?

Le **boxplot** (boite a moustaches) resume la distribution en 5 valeurs :
- La **boite** : contient 50% des donnees (de Q1 a Q3)
- La **ligne mediane** au milieu de la boite
- Les **moustaches** : s'etendent jusqu'aux valeurs extremes "normales"
- Les **points** au-dela des moustaches : valeurs aberrantes

C'est tres utile pour comparer plusieurs groupes en meme temps."""),

        code("""# Boxplot des ventes par categorie avec Seaborn
fig, ax = plt.subplots(figsize=(12, 6))

# sns.boxplot() trace les boites
# x = la variable categorielle (axe horizontal)
# y = la variable numerique (axe vertical)
# data = le DataFrame a utiliser
sns.boxplot(x="categorie", y="total", data=df, palette="Set2", ax=ax)

ax.set_title("Distribution des ventes par categorie (Boxplot)", fontsize=14)
ax.set_xlabel("Categorie de produit")
ax.set_ylabel("Montant de la vente (euros)")
plt.xticks(rotation=45, ha="right")

plt.tight_layout()
plt.savefig("boxplot_categorie.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : boxplot_categorie.png")"""),

        md("""---
## PARTIE 7 — Nuage de Points (Scatterplot)

### Quand utiliser un scatterplot ?

Le **nuage de points** montre la **relation entre deux variables numeriques**.

Exemple : "Est-ce qu'il y a un lien entre la quantite achetee et le total de la vente ?"

Chaque point = une observation (une vente). Si les points forment une ligne montante, il y a une correlation positive."""),

        code("""# Nuage de points : relation entre quantite et total
fig, ax = plt.subplots(figsize=(8, 6))

# sns.scatterplot() trace le nuage de points
# hue = colore les points selon une categorie
sns.scatterplot(x="quantite", y="total", data=df,
                hue="categorie", alpha=0.6, ax=ax)

ax.set_title("Relation entre quantite et total de la vente", fontsize=14)
ax.set_xlabel("Quantite achetee")
ax.set_ylabel("Total de la vente (euros)")
ax.legend(title="Categorie", bbox_to_anchor=(1.05, 1), loc="upper left")

plt.tight_layout()
plt.savefig("scatter_quantite_total.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : scatter_quantite_total.png")"""),

        md("""---
## PARTIE 8 — Heatmap (Carte de Chaleur)

### Qu'est-ce qu'une heatmap ?

Une **heatmap** (carte de chaleur) utilise des couleurs pour representer des valeurs dans un tableau.

Elle est souvent utilisee pour visualiser la **matrice de correlation** : un tableau qui montre si deux variables evoluent ensemble.

- Correlation proche de **+1** : les deux variables augmentent ensemble (couleur chaude)
- Correlation proche de **-1** : quand l'une augmente, l'autre diminue (couleur froide)
- Correlation proche de **0** : pas de relation (couleur neutre)"""),

        code("""# Calcul de la matrice de correlation
# On selectionne les colonnes numeriques
colonnes_numeriques = ["age", "quantite", "prix_unitaire", "total", "satisfaction"]
matrice_corr = df[colonnes_numeriques].corr()   # .corr() calcule les correlations

print("Matrice de correlation :")
print(matrice_corr.round(2))  # arrondi a 2 decimales"""),

        code("""# Heatmap de la matrice de correlation
fig, ax = plt.subplots(figsize=(8, 6))

# sns.heatmap() trace la heatmap
# annot=True = affiche les valeurs dans chaque case
# fmt=".2f" = format a 2 decimales
# cmap = palette de couleurs
sns.heatmap(matrice_corr,
            annot=True,        # affiche les chiffres dans les cases
            fmt=".2f",         # 2 decimales
            cmap="coolwarm",   # bleu = negatif, rouge = positif
            center=0,          # blanc = 0
            ax=ax)

ax.set_title("Matrice de correlation des variables numeriques", fontsize=14)

plt.tight_layout()
plt.savefig("heatmap_correlation.png", dpi=100, bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : heatmap_correlation.png")"""),

        md("""---
## RECAPITULATIF DU MODULE 5

| Graphique | Commande | Utilisation |
|-----------|---------|-------------|
| Barre | `ax.bar()` | Comparer des categories |
| Courbe | `ax.plot()` | Montrer une evolution dans le temps |
| Histogramme | `ax.hist()` | Distribution d'une variable |
| Camembert | `ax.pie()` | Proportions d'un tout |
| Boxplot | `sns.boxplot()` | Distribution avec statistiques |
| Scatterplot | `sns.scatterplot()` | Relation entre 2 variables |
| Heatmap | `sns.heatmap()` | Matrice de correlation |

**Pour sauvegarder un graphique :** `plt.savefig("nom.png")`

**Toujours fermer avec :** `plt.close()`

**Dans le prochain module, on fait une analyse exploratoire complete du dataset !**"""),
    ]
    write_nb("MODULE_5_Visualisation_Donnees.ipynb", cells)


# ============================================================
# MODULE 6 — EDA
# ============================================================
def build_module6():
    cells = [
        md("""# MODULE 6 — Analyse Exploratoire des Donnees (EDA)

**EDA** signifie **Exploratory Data Analysis** (Analyse Exploratoire des Donnees).

C'est la phase ou on "interroge" les donnees pour comprendre :
- Ce qu'elles contiennent (KPIs, statistiques)
- Comment chaque variable est distribuee (analyse univariee)
- Les relations entre les variables (analyse bivariee)
- Les patterns complexes impliquant plusieurs variables (analyse multivariee)
- Les correlations

A la fin de ce module, on redige un **rapport de conclusions**.

**Ce module utilise les donnees nettoyees du module 4.**"""),

        code("""# Configuration pour les graphiques
import matplotlib
matplotlib.use("Agg")

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

sns.set_theme(style="whitegrid")
plt.rcParams["figure.dpi"] = 100

print("Environnement configure !")"""),

        code("""# Chargement du dataset nettoye
if os.path.exists("ventes_koryxa_propre.csv"):
    df = pd.read_csv("ventes_koryxa_propre.csv", encoding="utf-8")
    print("Dataset propre charge !")
else:
    df = pd.read_csv("ventes_koryxa.csv", encoding="utf-8")
    df["ville"] = df["ville"].fillna("Inconnu").str.strip().str.title()
    df["region"] = df["region"].fillna("Inconnue").str.strip().str.title()
    df["age"] = df["age"].fillna(df["age"].median())
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["mois"] = df["date"].dt.month
    df["annee"] = df["date"].dt.year
    print("Dataset brut avec nettoyage rapide !")

# S'assurer que les colonnes de date existent
if "mois" not in df.columns and "date" in df.columns:
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["mois"] = df["date"].dt.month
    df["annee"] = df["date"].dt.year

print(f"Dimensions : {df.shape[0]} lignes x {df.shape[1]} colonnes")
print("Colonnes :", list(df.columns))"""),

        md("""---
## PARTIE 1 — KPIs (Indicateurs Cles de Performance)

### Qu'est-ce qu'un KPI ?

**KPI** = Key Performance Indicator = Indicateur Cle de Performance.

Ce sont les **chiffres essentiels** qui permettent de comprendre la sante d'un business en un coup d'oeil.

C'est comme le tableau de bord d'une voiture : quelques chiffres importants (vitesse, carburant, temperature) qui resument tout."""),

        code("""# Calcul des KPIs principaux
print("=" * 50)
print("   TABLEAU DE BORD KORYXA - KPIs PRINCIPAUX")
print("=" * 50)

# Volume
nb_transactions = len(df)
nb_clients_uniques = df["client"].nunique()

# Financier
ca_total = df["total"].sum()
ca_moyen_par_vente = df["total"].mean()
ca_median = df["total"].median()

# Produits
nb_produits_uniques = df["produit"].nunique()
nb_categories = df["categorie"].nunique()

# Satisfaction
satisfaction_moyenne = df["satisfaction"].mean()

print(f"Nombre de transactions   : {nb_transactions:,}")
print(f"Clients uniques          : {nb_clients_uniques:,}")
print(f"Chiffre d'affaires total : {ca_total:,.0f} euros")
print(f"Vente moyenne            : {ca_moyen_par_vente:.2f} euros")
print(f"Vente mediane            : {ca_median:.2f} euros")
print(f"Produits references      : {nb_produits_uniques}")
print(f"Categories               : {nb_categories}")
print(f"Satisfaction moyenne     : {satisfaction_moyenne:.2f} / 5")"""),

        code("""# KPIs par periode (si la colonne mois existe)
if "mois" in df.columns:
    ventes_par_mois = df.groupby("mois")["total"].agg(["sum", "count", "mean"])
    ventes_par_mois.columns = ["CA mensuel", "Nb ventes", "Panier moyen"]

    print("=== CA PAR MOIS ===")
    print(ventes_par_mois.to_string())"""),

        md("""---
## PARTIE 2 — Analyse Univariee

### Qu'est-ce que l'analyse univariee ?

L'**analyse univariee** examine **une seule variable** a la fois.

On cherche a comprendre sa **distribution** : comment les valeurs sont reparties.

On analyse :
- Les variables **numeriques** avec des histogrammes
- Les variables **categorielle** avec des graphiques en barres ou value_counts()"""),

        code("""# Analyse de la variable "total" (numerique)
print("=== STATISTIQUES DE LA VARIABLE 'total' ===")
print(df["total"].describe().round(2))

# Histogramme de la distribution
fig, ax = plt.subplots(figsize=(10, 5))
ax.hist(df["total"].dropna(), bins=40, color="steelblue",
        edgecolor="white", alpha=0.8)
ax.axvline(df["total"].mean(), color="red", linestyle="--",
           linewidth=2, label=f"Moyenne: {df['total'].mean():.0f}")
ax.axvline(df["total"].median(), color="orange", linestyle="--",
           linewidth=2, label=f"Mediane: {df['total'].median():.0f}")
ax.set_title("Distribution des montants de vente", fontsize=14)
ax.set_xlabel("Montant (euros)")
ax.set_ylabel("Nombre de ventes")
ax.legend()
plt.tight_layout()
plt.savefig("eda_hist_total.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_hist_total.png")"""),

        code("""# Analyse de la variable "categorie" (categorielle)
print("=== REPARTITION PAR CATEGORIE ===")
print(df["categorie"].value_counts())

# Graphique en barres horizontal
fig, ax = plt.subplots(figsize=(10, 6))
categorie_counts = df["categorie"].value_counts()
ax.barh(categorie_counts.index, categorie_counts.values, color="mediumseagreen")
ax.set_title("Nombre de ventes par categorie", fontsize=14)
ax.set_xlabel("Nombre de ventes")
for i, v in enumerate(categorie_counts.values):
    ax.text(v + 1, i, str(v), va="center")  # affiche le nombre sur chaque barre
plt.tight_layout()
plt.savefig("eda_barh_categorie.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_barh_categorie.png")"""),

        code("""# Analyse de la satisfaction (numerique discrete)
print("=== DISTRIBUTION DE LA SATISFACTION ===")
print(df["satisfaction"].value_counts().sort_index())

fig, ax = plt.subplots(figsize=(8, 5))
sat_counts = df["satisfaction"].value_counts().sort_index()
ax.bar(sat_counts.index, sat_counts.values,
       color=["#d73027","#f46d43","#fdae61","#a6d96a","#1a9641"])
ax.set_title("Distribution des notes de satisfaction (1 a 5)", fontsize=14)
ax.set_xlabel("Note de satisfaction")
ax.set_ylabel("Nombre de clients")
ax.set_xticks([1,2,3,4,5])
for i, (x, v) in enumerate(zip(sat_counts.index, sat_counts.values)):
    ax.text(x, v + 5, str(v), ha="center")
plt.tight_layout()
plt.savefig("eda_bar_satisfaction.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_bar_satisfaction.png")"""),

        md("""---
## PARTIE 3 — Analyse Bivariee

### Qu'est-ce que l'analyse bivariee ?

L'**analyse bivariee** examine la **relation entre deux variables**.

On cherche a savoir : "Est-ce que la variable A influence la variable B ?"

Selon les types de variables, on utilise differents graphiques :
- Numerique vs Numerique -> scatterplot
- Categorielle vs Numerique -> boxplot
- Categorielle vs Categorielle -> crosstab"""),

        code("""# Bivariee : Categorielle vs Numerique
# Est-ce que la categorie influence le montant de la vente ?
fig, ax = plt.subplots(figsize=(12, 6))
sns.boxplot(x="categorie", y="total", data=df, palette="Set3", ax=ax)
ax.set_title("Distribution des ventes par categorie", fontsize=14)
ax.set_xlabel("Categorie")
ax.set_ylabel("Total vente (euros)")
plt.xticks(rotation=45, ha="right")
plt.tight_layout()
plt.savefig("eda_boxplot_categorie.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_boxplot_categorie.png")"""),

        code("""# Bivariee : Numerique vs Numerique
# Est-ce que la quantite influence le total ?
fig, ax = plt.subplots(figsize=(8, 6))
sns.scatterplot(x="quantite", y="total", data=df,
                alpha=0.4, color="steelblue", ax=ax)
ax.set_title("Relation entre quantite et total de la vente", fontsize=14)
ax.set_xlabel("Quantite")
ax.set_ylabel("Total (euros)")
plt.tight_layout()
plt.savefig("eda_scatter_qte_total.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_scatter_qte_total.png")"""),

        code("""# Bivariee : Categorielle vs Categorielle -> crosstab
# Combien de ventes par categorie ET par mode de paiement ?
tableau_croise = pd.crosstab(df["categorie"], df["paiement"])
print("=== TABLEAU CROISE : Categorie x Mode de paiement ===")
print(tableau_croise)"""),

        md("""---
## PARTIE 4 — Analyse Multivariee

### Analyser plusieurs variables en meme temps

L'**analyse multivariee** regarde les interactions entre **3 variables ou plus**.

On utilise :
- **pivot_table** : tableau croise avec agregation
- **heatmap** : visualiser le tableau croise avec des couleurs"""),

        code("""# Pivot table : CA moyen par categorie et par mode de paiement
pivot = df.pivot_table(
    values="total",        # la valeur a calculer
    index="categorie",     # les lignes du tableau
    columns="paiement",    # les colonnes du tableau
    aggfunc="mean"         # on calcule la moyenne
)

print("=== PANIER MOYEN PAR CATEGORIE ET MODE DE PAIEMENT ===")
print(pivot.round(0).fillna(0))"""),

        code("""# Heatmap du pivot table
fig, ax = plt.subplots(figsize=(12, 7))
sns.heatmap(pivot.fillna(0),
            annot=True,
            fmt=".0f",
            cmap="YlOrRd",    # jaune = faible, rouge = fort
            ax=ax)
ax.set_title("Panier moyen par categorie et mode de paiement", fontsize=14)
plt.tight_layout()
plt.savefig("eda_heatmap_pivot.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_heatmap_pivot.png")"""),

        md("""---
## PARTIE 5 — Matrice de Correlation

### Voir toutes les correlations d'un coup

La **matrice de correlation** montre les correlations entre **toutes les paires de variables numeriques** en un seul tableau.

C'est comme avoir un "radar" qui detecte toutes les relations dans les donnees."""),

        code("""# Calcul de la matrice de correlation
colonnes_num = ["age", "quantite", "prix_unitaire", "total", "satisfaction"]
matrice_corr = df[colonnes_num].corr()

print("=== MATRICE DE CORRELATION ===")
print(matrice_corr.round(2))"""),

        code("""# Heatmap de la matrice de correlation
fig, ax = plt.subplots(figsize=(8, 6))
mask = np.triu(np.ones_like(matrice_corr, dtype=bool), k=1)  # masque triangle superieur
sns.heatmap(matrice_corr,
            annot=True,
            fmt=".2f",
            cmap="coolwarm",
            center=0,
            vmin=-1,
            vmax=1,
            ax=ax)
ax.set_title("Matrice de correlation des variables numeriques", fontsize=14)
plt.tight_layout()
plt.savefig("eda_heatmap_corr.png", bbox_inches="tight")
plt.close()
print("Graphique sauvegarde : eda_heatmap_corr.png")"""),

        md("""---
## PARTIE 6 — Rapport de Conclusions

### Synthese de l'analyse exploratoire

On va maintenant resumer toutes nos decouvertes dans un rapport clair."""),

        code("""# Calculs pour le rapport
top3_categories = df.groupby("categorie")["total"].sum().sort_values(ascending=False).head(3)
top3_villes = df.groupby("ville")["total"].sum().sort_values(ascending=False).head(3)
top_paiement = df["paiement"].value_counts().index[0]
sat_distribution = df["satisfaction"].value_counts(normalize=True).sort_index() * 100

print("=== DONNEES POUR LE RAPPORT ===")
print("Top 3 categories par CA :")
print(top3_categories)
print()
print("Top 3 villes par CA :")
print(top3_villes)
print()
print("Mode de paiement le plus utilise :", top_paiement)
print()
print("Distribution satisfaction (%) :")
for note, pct in sat_distribution.items():
    print(f"  Note {note}: {pct:.1f}%")"""),

        code("""# Rapport de conclusions
print()
print("=" * 60)
print("    RAPPORT D'ANALYSE EXPLORATOIRE - KORYXA")
print("=" * 60)
print()
print("1. VUE D'ENSEMBLE")
print(f"   - {len(df):,} transactions analysees")
print(f"   - Chiffre d'affaires total : {df['total'].sum():,.0f} euros")
print(f"   - Panier moyen : {df['total'].mean():.2f} euros")
print()

print("2. TOP CATEGORIES DE PRODUITS")
for cat, ca in top3_categories.items():
    pct = ca / df["total"].sum() * 100
    print(f"   - {cat}: {ca:,.0f} euros ({pct:.1f}% du CA)")
print()

print("3. GEOGRAPHIE DES VENTES")
for ville, ca in top3_villes.items():
    pct = ca / df["total"].sum() * 100
    print(f"   - {ville}: {ca:,.0f} euros ({pct:.1f}% du CA)")
print()

print("4. MODES DE PAIEMENT")
for mode, count in df["paiement"].value_counts().items():
    pct = count / len(df) * 100
    print(f"   - {mode}: {count} transactions ({pct:.1f}%)")
print()

print("5. SATISFACTION CLIENT")
print(f"   - Score moyen : {df['satisfaction'].mean():.2f} / 5")
pct_positif = df[df["satisfaction"] >= 4]["satisfaction"].count() / len(df) * 100
print(f"   - Clients satisfaits (note 4 ou 5) : {pct_positif:.1f}%")
print()

print("6. CORRELATIONS CLES")
corr_qte_total = df["quantite"].corr(df["total"])
corr_prix_total = df["prix_unitaire"].corr(df["total"])
print(f"   - Quantite <-> Total : {corr_qte_total:.3f}")
print(f"   - Prix unitaire <-> Total : {corr_prix_total:.3f}")
print()
print("=" * 60)
print("Fin du rapport d'analyse exploratoire.")"""),

        md("""---
## RECAPITULATIF DU MODULE 6

Dans ce module d'analyse exploratoire, on a parcouru 4 niveaux d'analyse :

| Niveau | Type | Questions repondues |
|--------|------|---------------------|
| KPIs | Vue globale | Chiffres cles du business |
| Univariee | 1 variable | Comment est distribuee cette variable ? |
| Bivariee | 2 variables | Y a-t-il une relation entre A et B ? |
| Multivariee | 3+ variables | Comment les variables interagissent-elles ? |

**Outils utilises :**
- `df.describe()` - statistiques rapides
- `df["col"].value_counts()` - comptage categories
- `df.groupby().agg()` - aggregation par groupe
- `pd.crosstab()` - tableau croise
- `df.pivot_table()` - tableau croise avec calcul
- `df.corr()` - matrice de correlation
- Matplotlib + Seaborn - visualisations

**Felicitations ! Tu as complete les 6 modules de la formation Data Science Koryxa !**

Tu sais maintenant :
- Ecrire du Python (Module 1)
- Faire des calculs rapides avec NumPy (Module 2)
- Manipuler des donnees avec Pandas (Module 3)
- Nettoyer des donnees (Module 4)
- Creer des visualisations (Module 5)
- Realiser une analyse exploratoire complete (Module 6)"""),
    ]
    write_nb("MODULE_6_Analyse_Exploratoire_EDA.ipynb", cells)


# Run all
build_module1()
build_module2()
build_module3()
build_module4()
build_module5()
build_module6()
print("\nAll 6 modules written successfully!")
