import type { NotebookCell } from "@/components/modules/NotebookViewer";

export type ModuleZeroResource = {
  title: string;
  description: string;
  url: string;
  type: "documentation" | "outil" | "video" | "exercice";
};

export const moduleZeroResources: ModuleZeroResource[] = [
  {
    type: "outil",
    title: "Télécharger Anaconda Distribution",
    description: "Installation recommandée pour débutants : Python, Jupyter, pandas, NumPy, Matplotlib et les outils data essentiels dans un seul package.",
    url: "https://www.anaconda.com/download",
  },
  {
    type: "documentation",
    title: "Guide officiel : installer Anaconda",
    description: "Documentation officielle avec installation graphique Windows/macOS/Linux. À utiliser si l’installation bloque.",
    url: "https://www.anaconda.com/docs/getting-started/anaconda/install/overview",
  },
  {
    type: "documentation",
    title: "Documentation officielle Jupyter",
    description: "Comprendre l’écosystème Jupyter et le fonctionnement des notebooks.",
    url: "https://docs.jupyter.org/",
  },
  {
    type: "documentation",
    title: "Installer et utiliser Jupyter",
    description: "Page officielle avec les bonnes pratiques pour installer et lancer les outils Jupyter.",
    url: "https://docs.jupyter.org/en/latest/install.html",
  },
  {
    type: "documentation",
    title: "Tutoriel officiel Python",
    description: "Référence officielle pour revoir les bases du langage Python après ce module d’installation.",
    url: "https://docs.python.org/3/tutorial/index.html",
  },
  {
    type: "outil",
    title: "Google Colab — alternative sans installation",
    description: "Service notebook dans le navigateur. Utile si ton ordinateur bloque l’installation locale ou pour t’exercer rapidement.",
    url: "https://colab.research.google.com/",
  },
];

export const moduleZeroCells: NotebookCell[] = [
  {
    cell_type: "markdown",
    source: `# Module 0 — Introduction & Installation\n\nBienvenue dans KORYXA Formation. Ce module est conçu pour quelqu’un qui n’a jamais touché Python, Jupyter ou la data.\n\nL’objectif n’est pas d’aller vite. L’objectif est de mettre en place une base propre, rassurante et durable.\n\nÀ la fin de ce module, tu dois être capable de :\n\n- comprendre à quoi sert Python ;\n- comprendre ce qu’est un notebook Jupyter ;\n- installer ou ouvrir un environnement de travail ;\n- créer ton premier notebook ;\n- écrire et exécuter tes premières lignes de code ;\n- comprendre les erreurs les plus fréquentes au démarrage ;\n- savoir comment travailler proprement pendant toute la formation.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 1. La data, c’est quoi exactement ?\n\nLa data, ce sont des informations qu’on peut stocker, organiser, analyser et transformer en décisions.\n\nExemples très simples :\n\n| Situation | Données possibles | Question utile |\n|---|---|---|\n| Boutique | produits, ventes, prix, clients | Qu’est-ce qui se vend le mieux ? |\n| École | notes, élèves, matières | Qui progresse ? Qui a besoin d’aide ? |\n| Réseau social | vues, likes, commentaires | Quel contenu attire le plus ? |\n| Business WhatsApp | prospects, relances, paiements | Qui doit être relancé aujourd’hui ? |\n\nUn analyste data ne fait pas seulement des graphiques. Il aide à répondre à une question importante avec des preuves.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 2. Python, c’est quoi ?\n\nPython est un langage de programmation. Tu peux le voir comme une langue que tu utilises pour donner des instructions à l’ordinateur.\n\nExemple humain :\n\n> “Lis ce fichier, garde les ventes du mois de juin, calcule le chiffre d’affaires, puis affiche un graphique.”\n\nExemple Python plus tard dans la formation :\n\n\`\`\`python\nimport pandas as pd\n\nventes = pd.read_csv("ventes_koryxa.csv")\nca = ventes["total"].sum()\nprint(ca)\n\`\`\`\n\nTu n’as pas besoin de tout comprendre maintenant. Ce module sert à préparer l’environnement pour que la suite soit fluide.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 3. Jupyter Notebook, c’est quoi ?\n\nUn notebook Jupyter est un cahier de travail interactif.\n\nIl peut contenir :\n\n- du texte explicatif ;\n- du code Python ;\n- des tableaux ;\n- des graphiques ;\n- des résultats ;\n- des notes personnelles.\n\nC’est parfait pour apprendre la data, parce que tu peux lire une explication, exécuter le code juste en dessous, voir le résultat et modifier l’exemple.\n\nDans cette formation, les notebooks sont ton terrain d’entraînement principal.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 4. Deux chemins possibles pour commencer\n\nTu as deux options. Choisis celle qui correspond à ta situation.\n\n### Option A — Installation locale avec Anaconda\n\nRecommandée si tu as un ordinateur personnel et que tu veux travailler sérieusement.\n\nAnaconda installe en une fois :\n\n- Python ;\n- Jupyter Notebook ;\n- pandas ;\n- NumPy ;\n- Matplotlib ;\n- plusieurs outils utiles pour la data.\n\n### Option B — Google Colab\n\nRecommandée si :\n\n- ton ordinateur est lent ;\n- l’installation bloque ;\n- tu veux pratiquer tout de suite ;\n- tu utilises un ordinateur qui n’est pas le tien.\n\nColab permet d’écrire et exécuter du Python directement dans le navigateur.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 5. Installation recommandée : Anaconda\n\n### Étape 1 — Télécharger\n\nVa sur le site officiel Anaconda et télécharge la version adaptée à ton système : Windows, macOS ou Linux.\n\n### Étape 2 — Installer\n\nSur Windows, garde les options par défaut si tu débutes. L’installation graphique est recommandée pour les personnes qui ne sont pas à l’aise avec la ligne de commande.\n\n### Étape 3 — Ouvrir Anaconda Navigator\n\nAprès installation, cherche **Anaconda Navigator** dans le menu démarrer.\n\n### Étape 4 — Lancer Jupyter Notebook\n\nDans Anaconda Navigator, clique sur **Launch** sous Jupyter Notebook.\n\nUne page web s’ouvre. C’est normal : Jupyter fonctionne dans ton navigateur, même si les fichiers sont sur ton ordinateur.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 6. Créer ton premier notebook\n\nDans Jupyter Notebook :\n\n1. choisis un dossier de travail ;\n2. clique sur **New** ;\n3. choisis **Python 3** ;\n4. un notebook vide s’ouvre ;\n5. renomme-le : \`module_0_test.ipynb\`.\n\nRègle importante : garde un dossier propre pour la formation.\n\nExemple d’organisation :\n\n\`\`\`text\nKORYXA_FORMATION/\n  module_0_test.ipynb\n  MODULE_1_Bases_Python_Data.ipynb\n  ventes_koryxa.csv\n  notes_personnelles.txt\n\`\`\`\n\nUn bon analyste data garde ses fichiers organisés.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 7. Première exécution : comprendre une cellule\n\nDans un notebook, une cellule est un bloc. Il existe principalement deux types :\n\n- **Markdown** : pour écrire du texte ;\n- **Code** : pour écrire du Python.\n\nPour exécuter une cellule :\n\n- clique dans la cellule ;\n- appuie sur **Shift + Entrée**.\n\nTu vas voir le résultat apparaître sous la cellule.`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `# Ceci est ton premier code Python dans la formation KORYXA\nprint("Bonjour et bienvenue dans KORYXA Formation !")`,
    outputs: [{ type: "text", data: "Bonjour et bienvenue dans KORYXA Formation !" }],
  },
  {
    cell_type: "markdown",
    source: `## 8. Lire le code comme une phrase\n\nLe code précédent dit simplement :\n\n> Affiche le texte “Bonjour et bienvenue dans KORYXA Formation !”\n\nLa fonction \`print()\` sert à afficher quelque chose à l’écran.\n\nLes guillemets indiquent que ce qu’on affiche est du texte.`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `# Python peut aussi calculer\nprix = 29000\nreduction = 26000\nvaleur_reelle = prix + reduction\n\nprint("Prix actuel :", prix, "FCFA")\nprint("Valeur réelle :", valeur_reelle, "FCFA")`,
    outputs: [{ type: "text", data: "Prix actuel : 29000 FCFA\nValeur réelle : 55000 FCFA" }],
  },
  {
    cell_type: "markdown",
    source: `## 9. Les variables : des boîtes avec un nom\n\nDans le code précédent :\n\n- \`prix\` est une variable ;\n- \`reduction\` est une variable ;\n- \`valeur_reelle\` est une variable.\n\nUne variable est comme une boîte qui garde une valeur.\n\nQuand tu écris :\n\n\`\`\`python\nprix = 29000\n\`\`\`\n\nTu dis à Python :\n\n> Garde la valeur 29000 dans une boîte appelée prix.`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `# Exemple très simple de donnée business\nventes = [12000, 15000, 29000, 8000, 45000]\n\nchiffre_affaires = sum(ventes)\nnombre_ventes = len(ventes)\npanier_moyen = chiffre_affaires / nombre_ventes\n\nprint("Chiffre d'affaires :", chiffre_affaires, "FCFA")\nprint("Nombre de ventes :", nombre_ventes)\nprint("Panier moyen :", panier_moyen, "FCFA")`,
    outputs: [{ type: "text", data: "Chiffre d'affaires : 109000 FCFA\nNombre de ventes : 5\nPanier moyen : 21800.0 FCFA" }],
  },
  {
    cell_type: "markdown",
    source: `## 10. Ce que tu viens déjà de faire\n\nMême avec quelques lignes simples, tu as déjà réalisé une mini-analyse :\n\n- tu as stocké des ventes ;\n- tu as calculé un chiffre d’affaires ;\n- tu as compté le nombre de ventes ;\n- tu as calculé un panier moyen.\n\nC’est exactement l’esprit de la data : transformer des valeurs en information utile.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 11. Les erreurs normales du débutant\n\nLes erreurs ne sont pas un échec. Elles font partie du travail.\n\n### Erreur 1 — Oublier les guillemets\n\n\`\`\`python\nprint(Bonjour)\n\`\`\`\n\nPython croit que \`Bonjour\` est une variable. Si elle n’existe pas, il affiche une erreur.\n\nCorrection :\n\n\`\`\`python\nprint("Bonjour")\n\`\`\`\n\n### Erreur 2 — Parenthèse non fermée\n\n\`\`\`python\nprint("Bonjour"\n\`\`\`\n\nCorrection :\n\n\`\`\`python\nprint("Bonjour")\n\`\`\`\n\n### Erreur 3 — Mauvaise casse\n\n\`Print\` et \`print\` ne sont pas la même chose. Python est sensible aux majuscules.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 12. Méthode de travail KORYXA\n\nPour réussir cette formation, utilise cette méthode à chaque module :\n\n1. **Lire** l’explication sans courir ;\n2. **Exécuter** chaque cellule ;\n3. **Observer** le résultat ;\n4. **Modifier** légèrement le code ;\n5. **Noter** ce que tu as compris ;\n6. **Demander à l’IA** d’expliquer si tu bloques ;\n7. **Valider** le quiz ou l’exercice.\n\nNe copie pas seulement. Comprends ce que tu fais.`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `# Exercice 1 — modifie ces valeurs puis exécute la cellule\nnom = "Awa"\nobjectif = "devenir analyste data"\n\nprint(nom, "veut", objectif)`,
    outputs: [{ type: "text", data: "Awa veut devenir analyste data" }],
  },
  {
    cell_type: "code",
    source: `# Exercice 2 — calcule ton propre panier moyen\nvente_1 = 10000\nvente_2 = 25000\nvente_3 = 40000\n\ntotal = vente_1 + vente_2 + vente_3\npanier_moyen = total / 3\n\nprint("Total :", total, "FCFA")\nprint("Panier moyen :", panier_moyen, "FCFA")`,
    outputs: [{ type: "text", data: "Total : 75000 FCFA\nPanier moyen : 25000.0 FCFA" }],
  },
  {
    cell_type: "markdown",
    source: `## 13. Checklist avant de passer au Module 1\n\nAvant de marquer ce module comme terminé, vérifie que tu peux répondre oui à chaque point :\n\n- J’ai compris à quoi sert Python.\n- J’ai compris ce qu’est un notebook Jupyter.\n- J’ai lancé Jupyter ou Google Colab.\n- J’ai exécuté une cellule avec **Shift + Entrée**.\n- J’ai compris la fonction \`print()\`.\n- J’ai compris l’idée d’une variable.\n- J’ai exécuté les deux exercices.\n- Je sais que les erreurs sont normales et utiles.\n\nSi tout est bon, tu peux passer au Module 1.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 14. Mini mission\n\nCrée un nouveau notebook et écris trois cellules :\n\n### Cellule 1\nAffiche ton prénom et ton objectif.\n\n### Cellule 2\nCrée trois ventes et calcule le total.\n\n### Cellule 3\nÉcris une phrase qui explique ce que tu as compris de Python.\n\nCe petit exercice paraît simple, mais il installe le réflexe fondamental : écrire, exécuter, observer, expliquer.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## Résumé du Module 0\n\nTu as installé ou préparé ton environnement, compris le rôle de Python, découvert Jupyter Notebook et exécuté tes premiers codes.\n\nLa suite va construire sur cette base. Le Module 1 commence réellement les bases de Python pour la data : variables, types, listes, conditions, boucles et fonctions.`,
    outputs: [],
  },
];
