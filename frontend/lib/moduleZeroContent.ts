import type { NotebookCell } from "@/components/modules/NotebookViewer";

export type ModuleZeroResource = {
  title: string;
  description: string;
  url: string;
  type: "documentation" | "outil" | "video" | "exercice";
};

export const moduleZeroResources: ModuleZeroResource[] = [
  {
    type: "documentation",
    title: "Documentation officielle Python — tutoriel débutant",
    description: "Référence officielle pour revoir les bases du langage Python avec une source fiable.",
    url: "https://docs.python.org/3/tutorial/index.html",
  },
  {
    type: "documentation",
    title: "Python venv — environnements virtuels",
    description: "Documentation officielle pour comprendre pourquoi chaque projet doit avoir son environnement isolé.",
    url: "https://docs.python.org/3/library/venv.html",
  },
  {
    type: "outil",
    title: "Télécharger Anaconda Distribution",
    description: "Option recommandée pour débutants data : Python, Jupyter, pandas, NumPy et Matplotlib dans un seul environnement.",
    url: "https://www.anaconda.com/download",
  },
  {
    type: "documentation",
    title: "Guide officiel : installer Anaconda",
    description: "Documentation officielle pour Windows, macOS et Linux. À consulter si l'installation bloque.",
    url: "https://www.anaconda.com/docs/getting-started/anaconda/install/overview",
  },
  {
    type: "documentation",
    title: "Documentation officielle Jupyter",
    description: "Comprendre les notebooks, les cellules, les kernels et l'écosystème Jupyter.",
    url: "https://docs.jupyter.org/",
  },
  {
    type: "outil",
    title: "Google Colab — notebook sans installation",
    description: "Alternative dans le navigateur pour pratiquer rapidement si l'ordinateur ou l'installation locale bloque.",
    url: "https://colab.research.google.com/",
  },
  {
    type: "outil",
    title: "Visual Studio Code",
    description: "Éditeur professionnel utilisé pour organiser des projets Python, écrire des scripts et travailler proprement.",
    url: "https://code.visualstudio.com/",
  },
];

export const moduleZeroCells: NotebookCell[] = [
  {
    cell_type: "markdown",
    source: `# Module 0 — Démarrage professionnel de la formation\n\nBienvenue dans **KORYXA Formation — Analyse de Données avec Python**.\n\nCe module n'est pas un simple accueil. C'est la salle d'orientation du parcours : tu vas comprendre où tu vas, comment travailler, comment demander de l'aide et comment progresser avec méthode.\n\n> **Objectif du module** : te donner une méthode claire pour suivre la formation sans te perdre, pratiquer correctement et préparer ton passage vers l'installation complète du Module 1.\n\nÀ la fin de ce module, tu dois pouvoir :\n\n- expliquer ce qu'est l'analyse de données avec des mots simples ;\n- comprendre pourquoi Python est utilisé dans la data ;\n- comprendre le rôle d'un notebook ;\n- exécuter une première cellule de code ;\n- appliquer la méthode KORYXA : **Voir → Comprendre → Tester → Corriger → Refaire → Valider** ;\n- savoir quoi faire si tu bloques ;\n- préparer ton espace de travail pour le Module 1.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 1. Ce que cette formation doit changer pour toi\n\nL'objectif n'est pas seulement de “connaître Python”. L'objectif est de devenir capable d'utiliser Python pour analyser des données et aider à prendre de meilleures décisions.\n\n| Avant la formation | Après une bonne progression |\n|---|---|\n| Tu vois un fichier CSV comme un tableau compliqué. | Tu sais charger le fichier, l'explorer et poser les bonnes questions. |\n| Tu copies du code sans comprendre. | Tu sais lire, modifier et expliquer un code simple. |\n| Tu as peur des erreurs. | Tu sais qu'une erreur est un message à lire et à corriger. |\n| Tu ne sais pas organiser un projet. | Tu ranges notebooks, scripts et datasets proprement. |\n| Tu apprends au hasard. | Tu suis une méthode, tu pratiques, tu valides. |\n\n> **À retenir** : la compétence data ne vient pas d'une lecture passive. Elle vient de la pratique régulière, des erreurs corrigées et des mini-projets terminés.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 2. La data, c'est quoi exactement ?\n\nLa data, ce sont des informations que l'on peut stocker, organiser, comparer, calculer et transformer en décisions.\n\nExemples concrets :\n\n| Situation | Données disponibles | Question utile | Décision possible |\n|---|---|---|---|\n| Boutique | ventes, produits, prix, clients | Quel produit rapporte le plus ? | Renforcer le stock du produit gagnant. |\n| Formation | étudiants, modules, progression | Qui est bloqué ? | Organiser une séance d'aide ciblée. |\n| Réseau social | vues, clics, commentaires | Quel contenu attire le plus ? | Publier plus de contenus performants. |\n| WhatsApp business | prospects, relances, paiements | Qui doit être relancé aujourd'hui ? | Prioriser les prospects chauds. |\n\nUn analyste data ne fait pas seulement des graphiques. Il transforme des données en réponses utiles pour agir.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 3. Python, c'est quoi ?\n\nPython est un langage de programmation. Tu peux le voir comme une langue qui permet de donner des instructions précises à l'ordinateur.\n\nPhrase humaine :\n\n> “Lis le fichier des ventes, calcule le chiffre d'affaires total, trouve les meilleurs produits et affiche un graphique.”\n\nVersion Python plus tard dans la formation :\n\n\`\`\`python\nimport pandas as pd\n\nventes = pd.read_csv("ventes.csv")\nchiffre_affaires = ventes["total"].sum()\nprint(chiffre_affaires)\n\`\`\`\n\nTu n'as pas besoin de tout comprendre aujourd'hui. Pour l'instant, retiens seulement ceci : Python sert à donner des instructions à l'ordinateur pour traiter des données.\n\n> **Point d'attention** : ne cherche pas à mémoriser tout le langage. Cherche d'abord à comprendre les petites actions : afficher, calculer, stocker, lire, filtrer, comparer.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 4. Notebook, script, plateforme : comprendre les espaces de travail\n\nDans la formation, tu vas rencontrer plusieurs espaces. Il faut savoir les distinguer.\n\n| Outil | À quoi ça sert ? | Quand l'utiliser ? |\n|---|---|---|\n| Plateforme KORYXA | Suivre les modules, lire, pratiquer, valider. | Tous les jours pendant la formation. |\n| Jupyter Notebook | Mélanger texte, code et résultats. | Pour apprendre, explorer et analyser. |\n| Google Colab | Notebook dans le navigateur. | Si tu veux éviter une installation locale au début. |\n| VS Code | Éditeur professionnel de projet. | Pour écrire des scripts et organiser un vrai projet. |\n| Terminal | Envoyer des commandes à l'ordinateur. | Installer, lancer, vérifier, activer un environnement. |\n\n> **À retenir** : un notebook est excellent pour apprendre et explorer. VS Code devient utile quand tu veux travailler comme dans un vrai projet professionnel.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 5. La méthode KORYXA pour apprendre le code\n\nTu vas utiliser une méthode simple et exigeante.\n\n### Étape 1 — Voir\nObserve l'exemple sans paniquer. Regarde les mots, les parenthèses, les guillemets, les lignes.\n\n### Étape 2 — Comprendre\nLis l'explication. Demande-toi : “Que fait cette ligne ? Que garde cette variable ? Quel résultat est attendu ?”\n\n### Étape 3 — Tester\nExécute le code. Ne reste pas seulement dans la théorie.\n\n### Étape 4 — Corriger\nSi une erreur apparaît, lis-la. Une erreur n'est pas une humiliation, c'est un message.\n\n### Étape 5 — Refaire\nChange une valeur, recommence, observe la différence.\n\n### Étape 6 — Valider\nQuand tu peux expliquer ce qui se passe, tu avances.\n\n> **Validation** : tu as compris une notion quand tu peux l'expliquer simplement et la refaire avec une petite modification.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 6. Première cellule : afficher un message\n\nLa première commande à connaître est \`print()\`. Elle sert à afficher quelque chose.\n\nAvant de regarder le code, lis cette phrase :\n\n> Affiche le message “Bonjour KORYXA”.\n\nEn Python, cette instruction devient :`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `print("Bonjour KORYXA")`,
    outputs: [{ type: "text", data: "Bonjour KORYXA" }],
  },
  {
    cell_type: "markdown",
    source: `## 7. Lire le code comme un débutant intelligent\n\nDécoupons la ligne :\n\n| Élément | Signification |\n|---|---|\n| \`print\` | commande qui affiche quelque chose |\n| \`( )\` | parenthèses qui contiennent ce qu'on veut afficher |\n| \`"Bonjour KORYXA"\` | texte à afficher |\n\n> **À toi de jouer** : remplace le texte par ton prénom, puis exécute à nouveau. Exemple : \`print("Je m'appelle Awa")\`.\n\nCe petit exercice est important : tu apprends déjà à modifier un code existant sans le casser.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 8. Deuxième cellule : calculer une information utile\n\nLa data commence souvent avec des calculs simples.\n\nImagine une personne qui vend trois produits dans la journée :\n\n| Vente | Montant |\n|---|---:|\n| Vente 1 | 12 000 FCFA |\n| Vente 2 | 15 000 FCFA |\n| Vente 3 | 29 000 FCFA |\n\nQuestion : quel est le chiffre d'affaires total ?`,
    outputs: [],
  },
  {
    cell_type: "code",
    source: `vente_1 = 12000\nvente_2 = 15000\nvente_3 = 29000\n\nchiffre_affaires = vente_1 + vente_2 + vente_3\n\nprint("Chiffre d'affaires :", chiffre_affaires, "FCFA")`,
    outputs: [{ type: "text", data: "Chiffre d'affaires : 56000 FCFA" }],
  },
  {
    cell_type: "markdown",
    source: `## 9. Ce que tu viens de faire\n\nTu as utilisé trois idées fondamentales :\n\n| Notion | Exemple | Explication simple |\n|---|---|---|\n| Variable | \`vente_1 = 12000\` | Une boîte nommée qui garde une valeur. |\n| Calcul | \`vente_1 + vente_2 + vente_3\` | Python additionne les montants. |\n| Affichage | \`print(...)\` | Python montre le résultat à l'écran. |\n\n> **À retenir** : même un code très court peut produire une information utile pour un business.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 10. Erreurs fréquentes dès le premier jour\n\nLes erreurs ci-dessous sont normales. Le problème n'est pas d'en avoir. Le problème serait de ne pas apprendre à les lire.\n\n| Erreur | Exemple cassé | Cause probable | Correction |\n|---|---|---|---|\n| Guillemets oubliés | \`print(Bonjour)\` | Python croit que Bonjour est une variable. | \`print("Bonjour")\` |\n| Parenthèse non fermée | \`print("Bonjour"\` | La commande n'est pas terminée. | \`print("Bonjour")\` |\n| Majuscule incorrecte | \`Print("Bonjour")\` | Python distingue majuscules et minuscules. | \`print("Bonjour")\` |\n| Nom de variable différent | \`vente1 + vente_1\` | Les deux noms ne sont pas identiques. | Choisir un seul nom cohérent. |\n\n> **Point d'attention** : quand une erreur apparaît, commence par vérifier les guillemets, les parenthèses, les noms de variables et les majuscules.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 11. Comment poser une bonne question quand tu bloques\n\nUne bonne question permet au formateur, au groupe Discord ou à l'assistant IA de t'aider rapidement.\n\nMauvaise question :\n\n> “Ça ne marche pas.”\n\nBonne question :\n\n> “J'ai écrit ce code, j'attendais tel résultat, mais j'obtiens cette erreur. Voici ma capture.”\n\nStructure recommandée :\n\n1. Ce que tu voulais faire.\n2. Le code ou la capture.\n3. Le message d'erreur exact.\n4. Ce que tu as déjà essayé.\n\n> **À retenir** : apprendre à bien poser une question fait partie de la compétence professionnelle.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 12. Organisation minimale avant le Module 1\n\nAvant d'installer les outils en détail, prépare mentalement une structure propre. Dans le Module 1, tu vas créer un espace comme celui-ci :\n\n\`\`\`text\nKORYXA_FORMATION/\n├── notebooks/\n│   ├── module_1_installation.ipynb\n│   └── module_2_bases_python.ipynb\n├── datasets/\n│   └── ventes_exemple.csv\n├── projets/\n│   └── analyse_ventes/\n│       ├── main.py\n│       ├── notebook.ipynb\n│       └── ventes.csv\n└── notes.txt\n\`\`\`\n\nPourquoi c'est important ?\n\n- Tu retrouves facilement tes fichiers.\n- Tu évites de mélanger les cours, les données et les tests.\n- Tu prends les habitudes d'un vrai analyste data.\n- Tu prépares ton futur portfolio.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 13. Mini-mission du Module 0\n\nCette mission valide que tu es prêt à passer au module d'installation complet.\n\n### Mission\n\nCrée trois petites réponses dans tes notes :\n\n1. En une phrase, explique ce qu'est la data.\n2. En une phrase, explique à quoi sert Python.\n3. En une phrase, explique ce que tu feras quand une erreur apparaît.\n\nEnsuite, exécute mentalement cette checklist :\n\n- Je sais que la data sert à aider la décision.\n- Je sais que Python permet de donner des instructions à l'ordinateur.\n- Je sais qu'un notebook mélange texte, code et résultats.\n- Je sais que je dois pratiquer, pas seulement lire.\n- Je sais comment poser une question claire.\n\n> **Validation** : si tu peux répondre simplement à ces points, tu es prêt pour le Module 1.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## 14. Ce qui arrive au Module 1\n\nLe Module 1 sera la fondation technique complète. Il va détailler pas à pas :\n\n- installation de Python ;\n- installation ou utilisation d'Anaconda ;\n- création d'un notebook Jupyter ;\n- utilisation de Google Colab ;\n- installation et usage de VS Code ;\n- compréhension du terminal ;\n- création d'un environnement virtuel \`venv\` ;\n- création d'un vrai dossier projet ;\n- premier mini-projet \`analyse_ventes\` ;\n- erreurs d'installation fréquentes et corrections.\n\n> **Objectif** : après le Module 1, tu dois pouvoir installer, ouvrir, créer, exécuter et organiser ton environnement Python Data sans dépendre de quelqu'un à chaque étape.`,
    outputs: [],
  },
  {
    cell_type: "markdown",
    source: `## Résumé du Module 0\n\nTu as maintenant la vision du parcours, la méthode de travail, les premiers repères Python et les règles de progression.\n\nCe module doit te laisser avec une idée simple :\n\n> Tu n'as pas besoin d'être fort au départ. Tu dois être méthodique, régulier et capable de corriger progressivement.\n\nLe prochain module transforme cette orientation en action technique : installation, outils, environnement et premier projet Python Data.`,
    outputs: [],
  },
];
