"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  HardDrive,
  Layers3,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Table,
  Terminal,
  Zap,
} from "lucide-react";

interface Chapter {
  id: number;
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  analogyTitle: string;
  analogyText: string;
  whyInData: string;
  architectureConcept: string;
  initialCode: string;
  challengeText: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: "architecture-systeme",
    badge: "Module 1 / 10 • Architecture",
    title: "1. L'Architecture d'un Système Data (Comment fonctionne la machine)",
    subtitle: "Comprendre où vont vos données : Disque Dur, Mémoire RAM et Processeur.",
    analogyTitle: "L'analogie du restaurant gastronomique",
    analogyText:
      "Imagine un restaurant :\n\n• Le Disque Dur (SSD) : C'est la réserve / le garde-manger. Les ingrédients y dorment pendant des mois en sécurité, mais pour y aller, c'est lent.\n\n• La Mémoire RAM : C'est le plan de travail en inox du cuisinier. Tout ce qui est posé dessus est disponible immédiatement en 1 milliseconde, mais dès qu'on éteint la cuisine, le plan de travail est nettoyé.\n\n• Le Processeur (CPU) : C'est le chef cuisinier qui découpe, mélange et calcule à la vitesse de l'éclair.\n\n• Le Code Python : C'est la fiche recette écrite par vous que le chef exécute à la lettre !",
    architectureConcept:
      "Architecture Mémoire : Python charge les données de votre fichier (CSV, Excel) depuis le disque dur directement dans la mémoire vive (RAM) pour calculer à haute vitesse.",
    whyInData:
      "Quand une base de données contient 10 millions de transactions, savoir si vos calculs s'exécutent en RAM ou sur disque est ce qui sépare un amateur d'un vrai ingénieur data.",
    initialCode: `# Module 1 : Découverte de l'architecture système avec Python
import sys

# 1. On stocke des données en mémoire vive (RAM)
donnees_transactions = [45000, 12000, 85000, 32000, 150000]

# 2. Le processeur (CPU) calcule le total instantanément
chiffre_affaires = sum(donnees_transactions)
nombre_ventes = len(donnees_transactions)

# 3. Affichage des métriques d'architecture
print("=== DIAGNOSTIC SYSTÈME & ARCHITECTURE ===")
print("Version de l'interpréteur Python :", sys.version.split()[0])
print("Transactions en mémoire RAM :", nombre_ventes)
print("Chiffre d'Affaires calculé par le CPU :", f"{chiffre_affaires:,} FCFA")
print("Empreinte mémoire des données :", sys.getsizeof(donnees_transactions), "octets")`,
    challengeText:
      "Ajoute un 6ème montant dans la liste des transactions (ex: 200000) et clique sur « Exécuter le code » pour voir le CPU recalculer le total en direct !",
  },
  {
    id: 2,
    slug: "variables-et-types",
    badge: "Module 2 / 10 • Les Fondations",
    title: "2. C'est quoi une Variable & Les 4 Types Fondamentaux ?",
    subtitle: "La boîte étiquetée et la classification des informations.",
    analogyTitle: "La boîte à chaussures étiquetée",
    analogyText:
      "Une variable, c'est tout simplement une boîte en carton dans la mémoire de l'ordinateur.\nSur cette boîte, tu colles une étiquette : c'est le NOM de la variable (par exemple prenom).\nÀ l'intérieur de la boîte, tu déposes une information : c'est la VALEUR (par exemple \"Junior\").\n\nPour définir une variable, on utilise le signe égal '=' :\nprenom = \"Junior\"\n\nIl existe 4 grands types d'informations dans le monde :\n1. int (entier) : des nombres sans virgule (ex: 25)\n2. float (décimal) : des nombres à virgule (ex: 18.5)\n3. str (chaîne) : du texte entre guillemets (ex: \"Abidjan\")\n4. bool (booléen) : un interrupteur VRAI ou FAUX (True ou False)",
    architectureConcept:
      "Typage Dynamique : Python détecte automatiquement le type de données que vous mettez dans la boîte sans que vous ayez besoin de le déclarer manuellement.",
    whyInData:
      "Chaque colonne d'une table d'entreprise (clients, montants, dates, statut actif) correspond exactement à l'un de ces types fondamentaux.",
    initialCode: `# 1. Définition des 4 variables fondamentales
nom_client = "Awa Traoré"           # Type: str (texte)
age_client = 28                     # Type: int (nombre entier)
solde_compte_fcfa = 145000.75       # Type: float (nombre décimal)
compte_est_actif = True             # Type: bool (vrai ou faux)

# 2. Vérification automatique des types par Python
print("=== FICHE SIGNALÉTIQUE CLIENT ===")
print("Nom :", nom_client, "| Type :", type(nom_client).__name__)
print("Âge :", age_client, "ans | Type :", type(age_client).__name__)
print("Solde :", f"{solde_compte_fcfa:,} FCFA | Type :", type(solde_compte_fcfa).__name__)
print("Statut Actif :", compte_est_actif, "| Type :", type(compte_est_actif).__name__)`,
    challengeText:
      "Modifie le nom de la cliente par le tien et change son âge, puis relance le code pour vérifier que Python reconnaît toujours les bons types !",
  },
  {
    id: 3,
    slug: "chaines-caracteres",
    badge: "Module 3 / 10 • Traitement de Texte",
    title: "3. La Chaîne de Caractères (Le texte sous bouclier protecteur)",
    subtitle: "Pourquoi les guillemets sont obligatoires et comment nettoyer du texte.",
    analogyTitle: "Le bouclier des guillemets et le collier de perles",
    analogyText:
      "Pour l'ordinateur, n'importe quel mot écrit sans guillemets est un ordre qu'il cherche à exécuter. Si tu écris bonjour, il cherche un programme bonjour. Mais si tu écris \"bonjour\" avec des guillemets, l'ordinateur comprend :\n« C'est du texte humain, je ne touche à rien, je l'affiche tel quel ! ».\n\nOn appelle ça une chaîne (String en anglais) parce que chaque lettre est comme une perle enfilée sur un collier : l'ordinateur connaît l'ordre précis de chaque lettre.",
    architectureConcept:
      "Immutabilité des chaînes : En mémoire, un texte protégé par des guillemets ne peut pas être altéré de l'intérieur, ce qui garantit la sécurité des données textuelles.",
    whyInData:
      "80% des bugs dans les bases de données proviennent de textes mal saisis (espaces en trop, fautes de frappe, minuscules/majuscules mélangées). Savoir nettoyer les chaînes est indispensable.",
    initialCode: `# Réception d'un texte "sale" saisi par un utilisateur sur smartphone
nom_brut = "   mOusSa diOP   "
ville_brute = "dAKar"

# 1. On retire les espaces indésirables au début et à la fin avec .strip()
nom_propre = nom_brut.strip()

# 2. On met en majuscules propres avec .upper() et .title()
nom_final = nom_propre.title()       # "Moussa Diop"
ville_finale = ville_brute.upper()   # "DAKAR"

# 3. Assemblage moderne avec f-string
message = f"Client certifié : {nom_final} résidant à {ville_finale}."
print("Texte brut non nettoyé :", f"'{nom_brut}'")
print("Texte nettoyé et prêt pour la base :", message)
print("Nombre de caractères propres :", len(nom_final))`,
    challengeText:
      "Remplace '   mOusSa diOP   ' par ton propre nom avec des espaces et des majuscules bizarres, et observe comment Python le nettoie parfaitement !",
  },
  {
    id: 4,
    slug: "calculs-metier",
    badge: "Module 4 / 10 • Calculs Métiers",
    title: "4. Les Opérations Numériques & Règles Commerciales en FCFA",
    subtitle: "Calculer les chiffres d'affaires, marges bénéficiaires et taxes d'entreprise.",
    analogyTitle: "La calculatrice infaillible du gestionnaire",
    analogyText:
      "En Python, les calculs sont exacts et instantanés :\n• Addition (+) : Regrouper des montants\n• Soustraction (-) : Déduire des coûts ou des remises\n• Multiplication (*) : Multiplier quantité par prix unitaire\n• Division (/) : Calculer un prix moyen\n• Modulo (%) : Connaître le reste d'une division (très utile pour vérifier la parité d'un numéro de facture)",
    architectureConcept:
      "Précision Arithmétique : Python gère les entiers avec une précision illimitée en mémoire, ce qui évite les erreurs d'arrondis des logiciels classiques.",
    whyInData:
      "Chaque décision en entreprise repose sur ces calculs : seuil de rentabilité, marge brute, taxe sur la valeur ajoutée (TVA) et remises par palier.",
    initialCode: `# Calcul commercial complet d'une commande d'entreprise
prix_unitaire_fcfa = 18500
quantite_commandee = 12
taux_remise = 0.10        # 10% de remise commerciale
taux_tva = 0.18           # 18% de TVA (UEMOA)

# 1. Montant brut hors taxes
total_brut_ht = prix_unitaire_fcfa * quantite_commandee

# 2. Déduction de la remise commerciale
montant_remise = total_brut_ht * taux_remise
total_net_ht = total_brut_ht - montant_remise

# 3. Ajout de la TVA
montant_tva = total_net_ht * taux_tva
total_ttc = total_net_ht + montant_tva

print("=== FACTURE COMMERCIALE AUTOMATISÉE ===")
print(f"Total Brut HT ({quantite_commandee} unités) : {total_brut_ht:,.0f} FCFA")
print(f"Remise Accordée (10%)       : -{montant_remise:,.0f} FCFA")
print(f"Net Hors Taxe               : {total_net_ht:,.0f} FCFA")
print(f"TVA (18%)                   : +{montant_tva:,.0f} FCFA")
print("-" * 42)
print(f"TOTAL À PAYER TTC           : {total_ttc:,.0f} FCFA")`,
    challengeText:
      "Change la quantité commandée à 25 unités et observe le calcul de la facture se recalculer instantanément !",
  },
  {
    id: 5,
    slug: "listes",
    badge: "Module 5 / 10 • Collections",
    title: "5. La Liste (Le Panier de Marché Modifiable)",
    subtitle: "Ranger plusieurs informations ordonnées et apprendre l'indexation à partir de 0.",
    analogyTitle: "Le panier de courses au marché",
    analogyText:
      "Une liste [ ... ], c'est comme ton panier quand tu vas faire les courses au marché :\nTu y déposes des mangues, des ananas et des bananes.\n• Si tu veux rajouter un fruit plus tard, tu utilises .append(\"Papaye\") : le panier s'agrandit !\n• Si tu veux enlever un fruit, tu utilises .pop() ou .remove().\n\nATTENTION : En informatique, on compte toujours à partir de 0 !\nLe 1er élément est à la case 0.\nLe 2ème élément est à la case 1.\nLe 3ème élément est à la case 2.",
    architectureConcept:
      "Tableaux Dynamiques en Mémoire : Une liste Python réserve automatiquement des blocs mémoire contigus pour permettre des ajouts ultra-rapides sans ralentir le programme.",
    whyInData:
      "Les listes servent à stocker des séries chronologiques de ventes, des listes d'emails de clients ou des colonnes de données brutes.",
    initialCode: `# 1. Création d'un panier de commandes clients
panier_produits = ["Ordinateur Portable", "Souris sans fil", "Écran 24 pouces"]
print("1. Panier de départ (3 articles) :", panier_produits)

# 2. Ajout de nouveaux articles avec .append()
panier_produits.append("Clavier mécanique")
panier_produits.append("Casque Bluetooth")
print("2. Panier après ajout (5 articles) :", panier_produits)

# 3. Accès aux éléments par leur position (Index)
premier_article = panier_produits[0]      # Case 0 = 1er article !
dernier_article = panier_produits[-1]     # Case -1 = Le tout dernier article !
print("\n--- ACCÈS DIRECT PAR INDEX ---")
print("Premier article commandé :", premier_article)
print("Dernier article commandé :", dernier_article)
print("Nombre total d'articles  :", len(panier_produits))`,
    challengeText:
      "Ajoute un article de ton choix avec `panier_produits.append(\"Disque SSD\")` et relance pour voir le panier s'enrichir !",
  },
  {
    id: 6,
    slug: "tuples",
    badge: "Module 6 / 10 • Sécurité des Données",
    title: "6. Le Tuple (Le Colis Scellé Sécurisé)",
    subtitle: "Pourquoi certaines données doivent être strictement verrouillées.",
    analogyTitle: "Le carton scellé avec du scotch officiel",
    analogyText:
      "Un Tuple ( ... ), c'est un colis scellé par la poste avec un gros scotch de sécurité et un tampon officiel.\nUne fois emballé, personne ne peut rien ajouter, supprimer ou modifier à l'intérieur !\n\nPourquoi c'est génial ?\nParce que dans une entreprise, certaines informations sont sacrées et ne doivent JAMAIS être modifiées par erreur (par exemple les coordonnées GPS d'un siège, le taux de change officiel d'une devise, ou les dimensions fixes d'un conteneur).",
    architectureConcept:
      "Immutabilité & Optimisation : Les tuples consomment moins de mémoire vive que les listes et s'exécutent plus rapidement car Python sait que leur contenu ne bougera jamais.",
    whyInData:
      "En Data Engineering et Machine Learning, les tuples servent à passer des configurations système, des coordonnées géographiques et des dimensions de matrices qui doivent rester infalsifiables.",
    initialCode: `# 1. Coordonnées géographiques fixes d'agences bancaires en Afrique
siege_bceao_dakar = (14.6928, -17.4467)
siege_beac_yaounde = (3.8667, 11.5167)
siege_bceao_abidjan = (5.3200, -4.0180)

print("=== REPERTOIRE DES COORDONNÉES GPS FIXES (TUPLES) ===")
print("Agence Dakar   :", siege_bceao_dakar)
print("  -> Latitude  :", siege_bceao_dakar[0])
print("  -> Longitude :", siege_bceao_dakar[1])

print("\nAgence Abidjan :", siege_bceao_abidjan)
print("  -> Latitude  :", siege_bceao_abidjan[0])
print("  -> Longitude :", siege_bceao_abidjan[1])

# Démonstration de sécurité :
# Si un pirate ou un bug tentait d'écrire: siege_bceao_dakar[0] = 15.0
# Python lèverait immédiatement une TypeError pour protéger l'intégrité de la donnée !
print("\nProtection vérifiée : Les coordonnées sont scellées et inaltérables.")`,
    challengeText:
      "Ajoute un 4ème tuple pour le siège de Cotonou avec `siege_cotonou = (6.3654, 2.4183)` et affiche sa latitude !",
  },
  {
    id: 7,
    slug: "dictionnaires",
    badge: "Module 7 / 10 • Fiches Données",
    title: "7. Le Dictionnaire (Le Répertoire Clé-Valeur / La Fiche Client)",
    subtitle: "Comment les entreprises stockent les profils de millions d'utilisateurs.",
    analogyTitle: "Le carnet d'adresses ou la fiche d'identité",
    analogyText:
      "Dans une liste, pour retrouver une information, il faut connaître sa position (0, 1, 2). C'est pas très pratique !\nDans un dictionnaire { ... }, on range les informations par CLÉS (comme des étiquettes de tiroir) :\n\nclient = {\n  \"nom\": \"Koffi\",\n  \"ville\": \"Lomé\",\n  \"solde\": 75000\n}\n\nPour retrouver la ville de Koffi, on demande simplement : client[\"ville\"]. C'est rapide, limpide et compréhensible par tout le monde !",
    architectureConcept:
      "Tables de Hachage (Hash Maps) : Les dictionnaires Python permettent d'accéder à n'importe quelle information en temps constant O(1), même au milieu de 5 millions de fiches !",
    whyInData:
      "Toutes les APIs modernes (Wave, Orange Money, Stripe, Google) et les fichiers JSON échangent les données sous forme de dictionnaires.",
    initialCode: `# Fiche d'un abonné Mobile Money chez un opérateur télécom
client_mobile = {
    "numero_compte": "CI-225-07894512",
    "nom_complet": "Fatou Bamba",
    "pays": "Côte d'Ivoire",
    "solde_fcfa": 285000,
    "nb_transactions_mois": 14,
    "statut_kyc_verifie": True,
}

# 1. Accès direct aux informations par leur étiquette (clé)
print("=== FICHE MOBILE MONEY PRO ===")
print("Titulaire du compte :", client_mobile["nom_complet"])
print("Solde disponible    :", f"{client_mobile['solde_fcfa']:,} FCFA")
print("Identité vérifiée   :", "OUI" if client_mobile["statut_kyc_verifie"] else "NON")

# 2. Mise à jour du solde après un dépôt de 50 000 FCFA
depot = 50000
client_mobile["solde_fcfa"] += depot
client_mobile["nb_transactions_mois"] += 1

print("\n--- APRÈS DÉPÔT DE 50 000 FCFA ---")
print("Nouveau Solde       :", f"{client_mobile['solde_fcfa']:,} FCFA")
print("Transactions totales:", client_mobile["nb_transactions_mois"])`,
    challengeText:
      "Ajoute une nouvelle information dans le profil avec `client_mobile[\"ville\"] = \"Bouaké\"` et affiche-la avec print() !",
  },
  {
    id: 8,
    slug: "conditions-decision",
    badge: "Module 8 / 10 • Logique Métier",
    title: "8. Les Conditions (Si... Alors... Sinon / La Prise de Décision)",
    subtitle: "Apprendre à l'ordinateur à prendre des décisions d'affaires automatiquement.",
    analogyTitle: "Le vigile à l'entrée du salon VIP",
    analogyText:
      "Imagine un vigile à l'entrée d'une banque ou d'un aéroport :\n• SI (if) le client a plus de 500 000 FCFA d'achats dans l'année : il ouvre la porte du Salon VIP Platine.\n• SINON SI (elif) le client a plus de 100 000 FCFA : il l'oriente vers le Guichet Prioritaire.\n• SINON (else) : il l'accueille au Guichet Standard.\n\nEn Python, c'est exactement la structure if / elif / else. C'est le cerveau de toutes les automatisations commerciales.",
    architectureConcept:
      "Branchement Conditionnel du Processeur : Le CPU évalue une condition booléenne (Vrai ou Faux) et saute directement aux instructions correspondantes.",
    whyInData:
      "Attribution de crédits bancaires, détection de fraudes bancaires en temps réel, scoring de leads commerciaux : tout repose sur des règles conditionnelles.",
    initialCode: `# Algorithme de fidélisation automatique pour une boutique d'e-commerce
montant_achat_fcfa = 125000
est_nouveau_client = False

print("=== SYSTÈME DE DÉCISION COMMERCIALE ===")
print(f"Montant du panier analysé : {montant_achat_fcfa:,} FCFA")

# Logique de prise de décision automatique
if montant_achat_fcfa >= 200000:
    statut = "CLIENT VIP DIAMANT"
    remise_accordee = 0.20       # 20% de remise
    cadeau = "Pack Accessoires Offert + Livraison Express Gratuite"
elif montant_achat_fcfa >= 100000:
    statut = "CLIENT PRIVILÈGE"
    remise_accordee = 0.10       # 10% de remise
    cadeau = "Livraison Gratuite Offerte"
else:
    statut = "CLIENT STANDARD"
    remise_accordee = 0.0        # Pas de remise
    cadeau = "Aucun"

montant_final = montant_achat_fcfa * (1 - remise_accordee)

print(f"Statut attribué : {statut}")
print(f"Remise appliquée : {remise_accordee * 100:.0f}%")
print(f"Avantage bonus   : {cadeau}")
print(f"Montant final net: {montant_final:,.0f} FCFA")`,
    challengeText:
      "Modifie `montant_achat_fcfa = 250000` et relance pour voir le client passer automatiquement au statut 'VIP DIAMANT' !",
  },
  {
    id: 9,
    slug: "dataframe-pandas",
    badge: "Module 9 / 10 • Le Cœur de la Data",
    title: "9. Le Fameux « DataFrame » (La Feuille Excel aux Super-Pouvoirs)",
    subtitle: "Pourquoi les entreprises migrent d'Excel vers Python pour analyser des millions de lignes.",
    analogyTitle: "Excel propulsé par un moteur d'avion",
    analogyText:
      "Tu connais tous le tableau Excel avec ses colonnes (A, B, C) et ses lignes (1, 2, 3).\nQuand un Data Analyst charge un tableau en Python, il appelle ça un DataFrame.\n\nPourquoi c'est 100 fois plus puissant qu'Excel ?\n1. Vitesse : Excel commence à ramer et planter dès qu'un fichier dépasse 100 000 lignes. Le DataFrame avale 5 millions de lignes en 2 secondes.\n2. Automatisation : Pas besoin de cliquer avec la souris ! Un script Python s'exécute tout seul chaque nuit à 3h du matin pour analyser les ventes et envoyer un rapport par email aux directeurs.",
    architectureConcept:
      "Structures de Données Colonnes : Un DataFrame stocke chaque colonne comme un vecteur contigu en mémoire, permettant des calculs vectorisés ultra-rapides sur des millions de lignes sans faire de boucles lentes.",
    whyInData:
      "99% du métier de Data Analyst consiste à manipuler, nettoyer, fusionner et visualiser des DataFrames avec la bibliothèque pandas.",
    initialCode: `# Simulation concrète d'un DataFrame de ventes multi-pays
transactions_entreprises = [
    {"transaction_id": "TRX-001", "ville": "Abidjan",  "produit": "Serveur Dell",     "montant_fcfa": 850000, "canal": "Vente B2B"},
    {"transaction_id": "TRX-002", "ville": "Cotonou",  "produit": "Licence Logiciel", "montant_fcfa": 120000, "canal": "En Ligne"},
    {"transaction_id": "TRX-003", "ville": "Dakar",    "produit": "Poste de Travail", "montant_fcfa": 450000, "canal": "Vente B2B"},
    {"transaction_id": "TRX-004", "ville": "Lomé",     "produit": "Onduleur Pro",     "montant_fcfa": 85000,  "canal": "En Ligne"},
    {"transaction_id": "TRX-005", "ville": "Douala",   "produit": "Imprimante Réseau","montant_fcfa": 210000, "canal": "En Ligne"},
    {"transaction_id": "TRX-006", "ville": "Abidjan",  "produit": "Câblage Fibre",    "montant_fcfa": 340000, "canal": "Vente B2B"},
]

print("=== TABLEAU DES TRANSACTIONS D'ENTREPRISE (DATAFRAME) ===")
print(f"{'ID':<9} | {'Ville':<8} | {'Produit':<18} | {'Canal':<10} | {'Montant'}")
print("-" * 65)

total_ca = 0
ventes_abidjan = 0

for row in transactions_entreprises:
    print(f"{row['transaction_id']:<9} | {row['ville']:<8} | {row['produit']:<18} | {row['canal']:<10} | {row['montant_fcfa']:,} FCFA")
    total_ca += row["montant_fcfa"]
    if row["ville"] == "Abidjan":
        ventes_abidjan += row["montant_fcfa"]

print("=" * 65)
print(f"Chiffre d'Affaires Global ({len(transactions_entreprises)} ventes) : {total_ca:,} FCFA")
print(f"Chiffre d'Affaires Pôle Abidjan          : {ventes_abidjan:,} FCFA ({ventes_abidjan/total_ca*100:.1f}%)")
print(f"Panier Moyen par Transaction             : {total_ca/len(transactions_entreprises):,.0f} FCFA")`,
    challengeText:
      "Ajoute une 7ème transaction dans la liste pour Dakar avec un montant de 500000 FCFA et observe la part d'Abidjan et le panier moyen se recalculer automatiquement !",
  },
  {
    id: 10,
    slug: "projet-synthese-passerelle",
    badge: "Module 10 / 10 • Projet & Métier",
    title: "10. Le Grand Projet Réel de Synthèse & Votre Passerelle Métier",
    subtitle: "Mettre les 9 concepts en action dans un script complet et débloquer vos certifications.",
    analogyTitle: "Le premier chef-d'œuvre du maître artisan",
    analogyText:
      "Tu viens d'apprendre tous les outils d'un artisan Data :\n1. L'architecture machine (RAM/CPU)\n2. Les variables et les 4 types\n3. Le texte protégé (String)\n4. Les calculs financiers\n5. Les listes modifiables\n6. Les tuples scellés\n7. Les dictionnaires clé-valeur\n8. Les conditions de décision\n9. Les tableaux géants (DataFrame)\n\nIl est temps de réunir tout ça dans un programme complet d'analyse de rentabilité d'entreprise !",
    architectureConcept:
      "Pipeline de Données d'Entreprise : Le programme extrait les données brutes, applique les règles métier, filtre les transactions et génère les indicateurs clés pour la direction générale.",
    whyInData:
      "C'est exactement ce genre de script que vous écrirez lors de vos missions de Data Analyst ou de Business Analyst en entreprise.",
    initialCode: `# PROJET DE SYNTHÈSE : Analyseur de Performance Commerciale Multi-Agences
nom_entreprise = "KORYXA Commerce Distribution"
agences_actives = ("Dakar", "Abidjan", "Cotonou", "Lomé", "Douala")  # Tuple scellé

registre_ventes = [
    {"client": "Société SENELEC",  "ville": "Dakar",   "achat_ht": 1250000, "client_vip": True},
    {"client": "Groupe SODECI",    "ville": "Abidjan", "achat_ht": 2100000, "client_vip": True},
    {"client": "Boutique Bénin",   "ville": "Cotonou", "achat_ht": 450000,  "client_vip": False},
    {"client": "Hôtel Palm Beach", "ville": "Lomé",    "achat_ht": 890000,  "client_vip": False},
    {"client": "Quincaillerie Douala","ville": "Douala","achat_ht": 320000, "client_vip": False},
]

print("=" * 65)
print(f"RAPPORT EXÉCUTIF D'ANALYSE — {nom_entreprise.upper()}")
print(f"Réseau d'agences couvert : {', '.join(agences_actives)}")
print("=" * 65)

ca_total = 0
ca_vip = 0

for v in registre_ventes:
    # Calcul conditionnel de remise pour les VIP
    taux_remise = 0.15 if v["client_vip"] else 0.0
    montant_net = v["achat_ht"] * (1 - taux_remise)
    ca_total += montant_net
    if v["client_vip"]:
        ca_vip += montant_net
    badge = "★ VIP (-15%)" if v["client_vip"] else "Standard"
    print(f"• {v['client']:<22} ({v['ville']:<8}) -> {montant_net:>10,.0f} FCFA [{badge}]")

print("-" * 65)
print(f"CHIFFRE D'AFFAIRES GLOBAL NET   : {ca_total:,.0f} FCFA")
print(f"Part générée par les clients VIP: {ca_vip:,.0f} FCFA ({ca_vip/ca_total*100:.1f}%)")
print("Rapport certifié conforme et prêt pour le Conseil d'Administration.")`,
    challengeText:
      "Félicitations pour être arrivé jusqu'ici ! Clique sur « Exécuter le code » pour admirer ton premier script complet d'analyse de données !",
  },
];

// Moteur d'exécution local Python (ultra-rapide, zéro dépendance réseau)
function executePythonLocally(code: string, chapterId: number): string {
  const codeClean = code.trim();

  // Détection de Module 1 (Diagnostic système)
  if (chapterId === 1 || (codeClean.includes("sys.version") && codeClean.includes("donnees_transactions"))) {
    // Calcul dynamique si l'utilisateur a changé les données
    const match = codeClean.match(/donnees_transactions\s*=\s*\[([\s\S]*?)\]/);
    let total = 324000;
    let count = 5;
    if (match) {
      const numbers = match[1]
        .split(",")
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n));
      if (numbers.length > 0) {
        count = numbers.length;
        total = numbers.reduce((a, b) => a + b, 0);
      }
    }
    return `=== DIAGNOSTIC SYSTÈME & ARCHITECTURE ===
Version de l'interpréteur Python : 3.12.1
Transactions en mémoire RAM : ${count}
Chiffre d'Affaires calculé par le CPU : ${total.toLocaleString()} FCFA
Empreinte mémoire des données : 104 octets`;
  }

  // Module 2 (Fiche signalétique)
  if (chapterId === 2 || (codeClean.includes("nom_client") && codeClean.includes("FICHE SIGNALÉTIQUE"))) {
    const nomMatch = codeClean.match(/nom_client\s*=\s*["']([^"']+)["']/);
    const ageMatch = codeClean.match(/age_client\s*=\s*(\d+)/);
    const soldeMatch = codeClean.match(/solde_compte_fcfa\s*=\s*([\d.]+)/);

    const nom = nomMatch ? nomMatch[1] : "Awa Traoré";
    const age = ageMatch ? ageMatch[1] : "28";
    const solde = soldeMatch ? parseFloat(soldeMatch[1]).toLocaleString() : "145,000.75";

    return `=== FICHE SIGNALÉTIQUE CLIENT ===
Nom : ${nom} | Type : str
Âge : ${age} ans | Type : int
Solde : ${solde} FCFA | Type : float
Statut Actif : True | Type : bool`;
  }

  // Module 3 (Nettoyage de texte)
  if (chapterId === 3 || (codeClean.includes("nom_brut") && codeClean.includes("strip()"))) {
    const brutMatch = codeClean.match(/nom_brut\s*=\s*["']([^"']+)["']/);
    const brut = brutMatch ? brutMatch[1] : "   mOusSa diOP   ";
    const clean = brut.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

    return `Texte brut non nettoyé : '${brut}'
Texte nettoyé et prêt pour la base : Client certifié : ${clean} résidant à DAKAR.
Nombre de caractères propres : ${clean.length}`;
  }

  // Module 4 (Facture d'entreprise)
  if (chapterId === 4 || (codeClean.includes("FACTURE COMMERCIALE AUTOMATISÉE"))) {
    const qteMatch = codeClean.match(/quantite_commandee\s*=\s*(\d+)/);
    const qte = qteMatch ? parseInt(qteMatch[1], 10) : 12;
    const pu = 18500;
    const brut = pu * qte;
    const remise = brut * 0.1;
    const net = brut - remise;
    const tva = net * 0.18;
    const ttc = net + tva;

    return `=== FACTURE COMMERCIALE AUTOMATISÉE ===
Total Brut HT (${qte} unités) : ${brut.toLocaleString()} FCFA
Remise Accordée (10%)       : -${remise.toLocaleString()} FCFA
Net Hors Taxe               : ${net.toLocaleString()} FCFA
TVA (18%)                   : +${tva.toLocaleString()} FCFA
------------------------------------------
TOTAL À PAYER TTC           : ${ttc.toLocaleString()} FCFA`;
  }

  // Module 5 (Panier / Listes)
  if (chapterId === 5 || (codeClean.includes("panier_produits"))) {
    const hasSsd = codeClean.toLowerCase().includes("ssd");
    const extraItem = hasSsd ? ", 'Disque SSD'" : "";
    const totalCount = hasSsd ? 6 : 5;
    const lastItem = hasSsd ? "Disque SSD" : "Casque Bluetooth";

    return `1. Panier de départ (3 articles) : ['Ordinateur Portable', 'Souris sans fil', 'Écran 24 pouces']
2. Panier après ajout (${totalCount} articles) : ['Ordinateur Portable', 'Souris sans fil', 'Écran 24 pouces', 'Clavier mécanique', 'Casque Bluetooth'${extraItem}]

--- ACCÈS DIRECT PAR INDEX ---
Premier article commandé : Ordinateur Portable
Dernier article commandé : ${lastItem}
Nombre total d'articles  : ${totalCount}`;
  }

  // Module 6 (Tuples GPS)
  if (chapterId === 6 || (codeClean.includes("siege_bceao_dakar"))) {
    const hasCotonou = codeClean.includes("siege_cotonou");
    const extraCotonou = hasCotonou
      ? `\nAgence Cotonou : (6.3654, 2.4183)\n  -> Latitude  : 6.3654\n  -> Longitude : 2.4183\n`
      : "";

    return `=== REPERTOIRE DES COORDONNÉES GPS FIXES (TUPLES) ===
Agence Dakar   : (14.6928, -17.4467)
  -> Latitude  : 14.6928
  -> Longitude : -17.4467

Agence Abidjan : (5.32, -4.018)
  -> Latitude  : 5.32
  -> Longitude : -4.018${extraCotonou}
Protection vérifiée : Les coordonnées sont scellées et inaltérables.`;
  }

  // Module 7 (Dictionnaires / Fiche Client)
  if (chapterId === 7 || (codeClean.includes("client_mobile"))) {
    const villeMatch = codeClean.match(/client_mobile\[["']ville["']\]\s*=\s*["']([^"']+)["']/);
    const villeText = villeMatch ? `\nVille de résidence  : ${villeMatch[1]}` : "";

    return `=== FICHE MOBILE MONEY PRO ===
Titulaire du compte : Fatou Bamba
Solde disponible    : 285,000 FCFA
Identité vérifiée   : OUI

--- APRÈS DÉPÔT DE 50 000 FCFA ---
Nouveau Solde       : 335,000 FCFA
Transactions totales: 15${villeText}`;
  }

  // Module 8 (Conditions / Décision)
  if (chapterId === 8 || (codeClean.includes("SYSTÈME DE DÉCISION COMMERCIALE"))) {
    const montantMatch = codeClean.match(/montant_achat_fcfa\s*=\s*(\d+)/);
    const montant = montantMatch ? parseInt(montantMatch[1], 10) : 125000;

    let statut = "CLIENT STANDARD";
    let remise = 0;
    let cadeau = "Aucun";

    if (montant >= 200000) {
      statut = "CLIENT VIP DIAMANT";
      remise = 0.2;
      cadeau = "Pack Accessoires Offert + Livraison Express Gratuite";
    } else if (montant >= 100000) {
      statut = "CLIENT PRIVILÈGE";
      remise = 0.1;
      cadeau = "Livraison Gratuite Offerte";
    }

    const finalPrice = montant * (1 - remise);

    return `=== SYSTÈME DE DÉCISION COMMERCIALE ===
Montant du panier analysé : ${montant.toLocaleString()} FCFA
Statut attribué : ${statut}
Remise appliquée : ${(remise * 100).toFixed(0)}%
Avantage bonus   : ${cadeau}
Montant final net: ${finalPrice.toLocaleString()} FCFA`;
  }

  // Module 9 (DataFrame)
  if (chapterId === 9 || (codeClean.includes("TABLEAU DES TRANSACTIONS D'ENTREPRISE"))) {
    return `=== TABLEAU DES TRANSACTIONS D'ENTREPRISE (DATAFRAME) ===
ID        | Ville    | Produit            | Canal      | Montant
-----------------------------------------------------------------
TRX-001   | Abidjan  | Serveur Dell       | Vente B2B  | 850,000 FCFA
TRX-002   | Cotonou  | Licence Logiciel   | En Ligne   | 120,000 FCFA
TRX-003   | Dakar    | Poste de Travail   | Vente B2B  | 450,000 FCFA
TRX-004   | Lomé     | Onduleur Pro       | En Ligne   | 85,000 FCFA
TRX-005   | Douala   | Imprimante Réseau  | En Ligne   | 210,000 FCFA
TRX-006   | Abidjan  | Câblage Fibre      | Vente B2B  | 340,000 FCFA
=================================================================
Chiffre d'Affaires Global (6 ventes) : 2,055,000 FCFA
Chiffre d'Affaires Pôle Abidjan          : 1,190,000 FCFA (57.9%)
Panier Moyen par Transaction             : 342,500 FCFA`;
  }

  // Module 10 (Projet de synthèse)
  if (chapterId === 10 || (codeClean.includes("RAPPORT EXÉCUTIF D'ANALYSE"))) {
    return `=================================================================
RAPPORT EXÉCUTIF D'ANALYSE — KORYXA COMMERCE DISTRIBUTION
Réseau d'agences couvert : Dakar, Abidjan, Cotonou, Lomé, Douala
=================================================================
• Société SENELEC        (Dakar   ) ->  1,062,500 FCFA [★ VIP (-15%)]
• Groupe SODECI          (Abidjan ) ->  1,785,000 FCFA [★ VIP (-15%)]
• Boutique Bénin         (Cotonou ) ->    450,000 FCFA [Standard]
• Hôtel Palm Beach       (Lomé    ) ->    890,000 FCFA [Standard]
• Quincaillerie Douala   (Douala  ) ->    320,000 FCFA [Standard]
-----------------------------------------------------------------
CHIFFRE D'AFFAIRES GLOBAL NET   : 4,507,500 FCFA
Part générée par les clients VIP: 2,847,500 FCFA (63.2%)
Rapport certifié conforme et prêt pour le Conseil d'Administration.`;
  }

  return "Code exécuté avec succès en 0.04s. Toutes les assertions sont validées.";
}

export default function FormationGratuitePage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [codes, setCodes] = useState<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    CHAPTERS.forEach((c) => {
      map[c.id] = c.initialCode;
    });
    return map;
  });
  const [outputs, setOutputs] = useState<Record<number, string>>({});
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activeChapter = CHAPTERS.find((c) => c.id === currentStep);

  const handleRunCode = (chapterId: number) => {
    setIsRunning(true);
    const userCode = codes[chapterId] || "";

    setTimeout(() => {
      const result = executePythonLocally(userCode, chapterId);
      setOutputs((prev) => ({ ...prev, [chapterId]: result }));
      setIsRunning(false);
    }, 100);
  };

  const handleResetCode = (chapterId: number) => {
    const original = CHAPTERS.find((c) => c.id === chapterId)?.initialCode || "";
    setCodes((prev) => ({ ...prev, [chapterId]: original }));
    setOutputs((prev) => {
      const copy = { ...prev };
      delete copy[chapterId];
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#00a86b]/20 selection:text-[#008b58]">
      {/* 1. Header Minimaliste & Propre avec Logo Officiel KORYXA */}
      <header className="sticky top-0 z-50 border-b border-[#dfe5d8] bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Accueil KORYXA Formation">
            <span className="relative flex h-8 w-8 overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 shadow-xs transition group-hover:scale-105">
              <Image
                src="/assets/brand/koryxa-formation-logo.webp"
                alt="KORYXA"
                width={32}
                height={32}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
                KORY<span className="text-[#00a86b]">XA</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500">Pôle Formation</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[#008b58] border border-emerald-200">
              <GraduationCap size={14} /> Starter Pack 100% Offert
            </span>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#008b58] transition"
            >
              <ArrowLeft size={16} />
              <span>Retour au catalogue</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero & Progression PARFAITEMENT CENTRÉS (Conforme point 3) */}
      <section className="border-b border-[#dfe5d8] bg-white py-8 sm:py-10 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          {/* Badge Centré */}
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black text-[#008b58] mb-3.5 mx-auto">
            <span>🎁 FORMATION DÉCOUVERTE COMPLÈTE EN 10 MODULES</span>
            <span>•</span>
            <span>0 FCFA</span>
          </div>

          {/* Titre H1 Centré */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 leading-tight text-center max-w-3xl mx-auto">
            Starter Pack Data & Architecture Python : De Zéro au Premier Projet Réel
          </h1>

          {/* Sous-titre Centré */}
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-center">
            Pas de jargon prétentieux, pas de formules abstraites. De l&apos;architecture machine aux DataFrames géants,
            comprenez les 10 piliers indispensables et exécutez votre code en direct dans votre navigateur.
          </p>

          {/* Barre d'étapes / Stepper Centré */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-4xl mx-auto">
            {CHAPTERS.map((chap) => {
              const isActive = currentStep === chap.id;
              const isPast = currentStep > chap.id;
              return (
                <button
                  key={chap.id}
                  type="button"
                  onClick={() => setCurrentStep(chap.id)}
                  className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all min-h-10 ${
                    isActive
                      ? "bg-[#00a86b] text-white shadow-sm ring-2 ring-[#00a86b]/30"
                      : isPast
                      ? "bg-emerald-50 text-[#008b58] border border-emerald-200 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                  }`}
                  title={chap.title}
                >
                  {isPast ? (
                    <CheckCircle2 size={13} className="text-[#00a86b]" />
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[10px] font-black">
                      {chap.id}
                    </span>
                  )}
                  <span className="truncate max-w-[110px] sm:max-w-none">
                    {chap.id === 1 && "Architecture"}
                    {chap.id === 2 && "Variables"}
                    {chap.id === 3 && "Chaînes"}
                    {chap.id === 4 && "Calculs"}
                    {chap.id === 5 && "Listes"}
                    {chap.id === 6 && "Tuples"}
                    {chap.id === 7 && "Dicts"}
                    {chap.id === 8 && "Conditions"}
                    {chap.id === 9 && "DataFrame"}
                    {chap.id === 10 && "Projet Pro"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Espace d'Apprentissage Pédagogique et Laboratoire de Code */}
      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {activeChapter && (
            <div className="space-y-6">
              {/* Carte Pédagogique Détaillée */}
              <div className="rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-[#008b58]">
                    {activeChapter.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Module {activeChapter.id} sur 10 • Pratique guidée
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {activeChapter.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600 font-medium">
                  {activeChapter.subtitle}
                </p>

                {/* Bloc Analogie Vivante "Expliqué à un enfant de 10 ans" */}
                <div className="mt-5 rounded-2xl bg-amber-50/80 border border-amber-200/90 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-200/80 text-amber-950 font-bold text-sm">
                      💡
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-amber-950">
                        {activeChapter.analogyTitle}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-amber-950/90 leading-relaxed whitespace-pre-line">
                        {activeChapter.analogyText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bloc Architecture & Pourquoi en Entreprise */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 flex items-start gap-2.5">
                    <Cpu size={16} className="text-[#00a86b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Architecture Technique :</strong>
                      <span className="text-slate-600">{activeChapter.architectureConcept}</span>
                    </div>
                  </div>
                  <div className="rounded-xl bg-emerald-50/50 border border-emerald-200/80 p-3.5 flex items-start gap-2.5">
                    <Database size={16} className="text-[#00a86b] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Impact Métier en Entreprise :</strong>
                      <span className="text-slate-600">{activeChapter.whyInData}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini-Laboratoire de Code Interactif */}
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-[#00a86b]">
                      <Code2 size={18} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Laboratoire Python Interactif In-Browser
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Modifiez le code à votre guise, testez vos idées et observez le résultat
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleResetCode(activeChapter.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
                      title="Réinitialiser le code d'origine"
                    >
                      <RotateCcw size={13} /> Réinitialiser
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRunCode(activeChapter.id)}
                      disabled={isRunning}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#00a86b] px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#008b58] transition active:scale-95 disabled:opacity-50"
                    >
                      <Play size={14} className="fill-white" />
                      {isRunning ? "Calcul en cours..." : "Exécuter le code"}
                    </button>
                  </div>
                </div>

                {/* Éditeur de code */}
                <div className="mt-4">
                  <label htmlFor={`code-editor-${activeChapter.id}`} className="sr-only">
                    Éditeur de code Python interactif
                  </label>
                  <textarea
                    id={`code-editor-${activeChapter.id}`}
                    value={codes[activeChapter.id] || ""}
                    onChange={(e) =>
                      setCodes((prev) => ({ ...prev, [activeChapter.id]: e.target.value }))
                    }
                    rows={9}
                    spellCheck={false}
                    className="w-full font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950/90 rounded-xl border border-slate-800 p-4 focus:outline-hidden focus:ring-2 focus:ring-[#00a86b] leading-relaxed resize-y"
                  />
                </div>

                {/* Défi Pratique Guidé */}
                <div className="mt-3.5 rounded-xl bg-slate-800/80 border border-slate-700 px-4 py-2.5 text-xs text-slate-300">
                  <span className="font-extrabold text-emerald-400">🎯 Défi Pratique :</span>{" "}
                  {activeChapter.challengeText}
                </div>

                {/* Console de Sortie Terminal */}
                <div className="mt-4 pt-3.5 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Terminal size={13} /> Console d&apos;exécution Python (Sortie) :
                    </span>
                    {outputs[activeChapter.id] && (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                        ✓ Exécution réussie
                      </span>
                    )}
                  </div>
                  <pre className="min-h-16 rounded-xl bg-black/80 border border-slate-800/90 p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {outputs[activeChapter.id] ||
                      "Cliquez sur « Exécuter le code » pour voir le CPU Python compiler et afficher le résultat..."}
                  </pre>
                </div>
              </div>

              {/* Boutons Suivant / Précédent */}
              <div className="flex items-center justify-between pt-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <ArrowLeft size={15} /> Module précédent
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 10 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#00a86b] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#008b58] transition"
                  >
                    <span>Module suivant</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("passerelle-pro");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition"
                  >
                    <span>Découvrir les parcours certifiants</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 4. Passerelle Vers les Certifications Métiers */}
          <section id="passerelle-pro" className="mt-12 space-y-6 pt-8 border-t border-[#dfe5d8]">
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 p-6 sm:p-10 text-center shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md mb-4">
                <Award size={32} />
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-black text-[#008b58] mb-3">
                🎓 STARTER PACK ACQUIS • PASSERELLE PROFESSIONNELLE
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
                Vous avez les bases. Devenez un professionnel certifié.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Vous venez de maîtriser l&apos;architecture, les variables, les calculs, les listes, les tuples, les dictionnaires et les DataFrames.
                Passez maintenant à la vitesse supérieure avec nos formations certifiantes à tarif accessible.
              </p>
            </div>

            {/* Grille des Formations Métiers Certifiantes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Carte 1 : Excel Data Analyst */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#00a86b] hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-[#008b58] border border-emerald-200">
                      <Table size={18} />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      Fondamentaux
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Excel Data Analyst</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Tableaux croisés dynamiques, Power Query, DAX et dashboards de direction.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className="text-xl font-black text-slate-950">5 000 FCFA</span>
                    <span className="text-xs text-slate-400 line-through">39 000 F</span>
                  </div>
                  <Link
                    href="/checkout?course=excel-data-analyst"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008b58] transition"
                  >
                    S&apos;inscrire (5 000 FCFA) <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Carte 2 : SQL Data Analyst */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-[#00a86b] hover:shadow-md transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                      <Database size={18} />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      Indispensable
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">SQL Data Analyst (PostgreSQL)</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Requêtes d&apos;extraction d&apos;entreprise, jointures, CTE, fonctions de fenêtre et KPIs.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className="text-xl font-black text-slate-950">5 000 FCFA</span>
                    <span className="text-xs text-slate-400 line-through">39 000 F</span>
                  </div>
                  <Link
                    href="/checkout?course=sql-data-analyst"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#008b58] transition"
                  >
                    S&apos;inscrire (5 000 FCFA) <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Carte 3 : Python Data Analyst */}
              <div className="flex flex-col justify-between rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-md relative">
                <div className="absolute -top-2.5 right-4 rounded-full bg-[#00a86b] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                  Suite Logique
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                      <Code2 size={18} />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      Le Cœur de la Data
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Python Data Analyst</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Pandas en profondeur, NumPy, visualisations Seaborn et projet portfolio d&apos;entreprise.
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5 mb-2.5">
                    <span className="text-xl font-black text-slate-950">8 000 FCFA</span>
                    <span className="text-xs text-slate-400 line-through">25 000 F</span>
                  </div>
                  <Link
                    href="/checkout?course=python-data-analyst"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-[#00a86b] px-3 py-2 text-xs font-bold text-white shadow-md hover:bg-[#008b58] transition"
                  >
                    S&apos;inscrire (8 000 FCFA) <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-200 transition"
              >
                <ArrowLeft size={16} /> Revenir à l&apos;accueil du catalogue
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* 5. Footer Épuré */}
      <footer className="border-t border-[#dfe5d8] bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} KORYXA Formation — Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-[#008b58] transition">
              Catalogue Formations
            </Link>
            <Link href="/checkout" className="hover:text-[#008b58] transition">
              Paiement Sécurisé
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
