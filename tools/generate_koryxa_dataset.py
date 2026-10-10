"""
Générateur du jeu de données officiel d'affaires KORYXA Formation.
Produit un dataset réaliste de 2 800 transactions sur 2024-2025 pour les
travaux pratiques d'analyse de données, de nettoyage et le projet portfolio.
"""
import csv
import os
import random
from datetime import datetime, timedelta

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CONTENT_DIR = os.path.join(ROOT_DIR, "content")
PUBLIC_RESOURCES_DIR = os.path.join(ROOT_DIR, "frontend", "public", "resources", "python-data-analyst")

os.makedirs(CONTENT_DIR, exist_ok=True)
os.makedirs(PUBLIC_RESOURCES_DIR, exist_ok=True)

random.seed(42)

# Villes, Pays et Moyens de paiement réalistes
GEOGRAPHY = [
    ("Lomé", "Togo", ["T-Money", "Flooz", "Carte Bancaire", "Virement Bancaire"]),
    ("Cotonou", "Bénin", ["MTN Mobile Money", "Moov Money", "Carte Bancaire"]),
    ("Abidjan", "Côte d'Ivoire", ["Wave", "Orange Money", "MTN Mobile Money", "Carte Bancaire"]),
    ("Dakar", "Sénégal", ["Wave", "Orange Money", "Carte Bancaire"]),
    ("Ouagadougou", "Burkina Faso", ["Orange Money", "Moov Money", "Carte Bancaire"]),
    ("Douala", "Cameroun", ["Orange Money", "MTN Mobile Money", "Carte Bancaire"]),
    ("Yaoundé", "Cameroun", ["Orange Money", "MTN Mobile Money", "Carte Bancaire"]),
    ("Bamako", "Mali", ["Orange Money", "Moov Money"]),
    ("Niamey", "Niger", ["Airtel Money", "Moov Money"]),
    ("Paris", "France", ["Carte Bancaire", "Virement Bancaire", "PayPal"]),
    ("Lyon", "France", ["Carte Bancaire", "Virement Bancaire", "PayPal"]),
]

FIRST_NAMES = [
    "Awa", "Koffi", "Mamadou", "Fatima", "Kodjo", "Aminata", "Yao", "Sarah",
    "Ibrahim", "Clara", "Omar", "Nina", "Mohamed", "Laura", "Georges", "Hana",
    "David", "Alice", "Fousseni", "Esther", "Samuel", "Grace", "Arnaud", "Bintou",
    "Roland", "Chantal", "Jean-Eudes", "Mariam", "Bakary", "Diane", "Serge", "Nadège"
]

LAST_NAMES = [
    "Mensah", "Diallo", "Touré", "Kouassi", "Diop", "Benali", "Sy", "Traoré",
    "Koné", "Ndiaye", "Dupont", "Rousseau", "Petit", "Mbeki", "Yamada", "Osei",
    "Lawson", "Adovi", "Gbedey", "Faye", "Sow", "Camara", "Bamba", "Ouattara",
    "Dossou", "Agossa", "Koffi", "Assogba", "Togbe", "Gueye", "Sangaré", "Kaboré"
]

PRODUCTS = [
    ("Python Data Analyst", 29000, "Cours Unique"),
    ("Excel Data Analyst", 39000, "Cours Unique"),
    ("SQL Data Analyst", 39000, "Cours Unique"),
    ("Power BI Data Analyst", 49000, "Cours Unique"),
    ("Statistiques & Data Science", 49000, "Cours Unique"),
    ("Machine Learning Python", 59000, "Cours Unique"),
    ("LLM RAG Developer", 49000, "Cours Unique"),
    ("Data Engineering", 69000, "Cours Unique"),
    ("Pack Full-Stack Data Analyst", 89000, "Pack Métier"),
    ("Pack Data Scientist & AI Engineer", 129000, "Pack Métier"),
    ("Pack Data Ultimate All-Access", 199000, "Pack Métier"),
]

CHANNELS = ["WhatsApp", "Site Web", "Réseau Partenaires", "Webinaire", "Publicité Facebook", "Campagne TikTok", "Vente Directe"]

START_DATE = datetime(2024, 1, 1, 8, 30)
END_DATE = datetime(2025, 12, 31, 21, 0)
TOTAL_SECONDS = int((END_DATE - START_DATE).total_seconds())

def generate_transactions(count=2800):
    rows_raw = []
    rows_clean = []

    for i in range(1, count + 1):
        txn_id = f"TXN-KOR-{i:05d}"
        
        # Date avec saisonnalité réaliste (croissance en 2025)
        # Biais progressif vers la fin de la période
        rand_offset = int(random.triangular(0, TOTAL_SECONDS, TOTAL_SECONDS * 0.75))
        txn_time = START_DATE + timedelta(seconds=rand_offset)
        iso_time = txn_time.strftime("%Y-%m-%d %H:%M:%S")

        # Client
        fname = random.choice(FIRST_NAMES)
        lname = random.choice(LAST_NAMES)
        client_name = f"{fname} {lname}"

        # Géo
        ville, pays, pay_methods = random.choice(GEOGRAPHY)
        
        # Téléphone
        indicatifs = {
            "Togo": "+228", "Bénin": "+229", "Côte d'Ivoire": "+225",
            "Sénégal": "+221", "Burkina Faso": "+226", "Cameroun": "+237",
            "Mali": "+223", "Niger": "+227", "France": "+33"
        }
        indicatif = indicatifs.get(pays, "+228")
        num_local = f"{random.randint(90, 99)} {random.randint(10, 99)} {random.randint(10, 99)} {random.randint(10, 99)}"
        phone_clean = f"{indicatif} {num_local}"

        # Produit
        prod_name, prod_price, prod_type = random.choices(
            PRODUCTS,
            weights=[25, 18, 14, 12, 8, 7, 6, 4, 3, 2, 1],
            k=1
        )[0]

        # Remise
        discount_rate = random.choices([0, 10, 15, 20, 30], weights=[70, 15, 7, 5, 3], k=1)[0]
        net_price = int(prod_price * (1 - discount_rate / 100))

        # Moyen de paiement
        pay_mode = random.choice(pay_methods)

        # Canal d'acquisition
        canal = random.choices(
            CHANNELS,
            weights=[35, 22, 15, 10, 9, 6, 3],
            k=1
        )[0]

        # Statut paiement
        status = random.choices(
            ["Payé", "En attente", "Annulé", "Remboursé"],
            weights=[83, 10, 5, 2],
            k=1
        )[0]

        # Satisfaction
        if status == "Payé":
            sat_score = random.choices([5, 4, 3, 2, 1], weights=[60, 30, 6, 3, 1], k=1)[0]
        else:
            sat_score = ""

        # Ligne propre de référence
        row_clean = {
            "id_transaction": txn_id,
            "date_heure": iso_time,
            "nom_client": client_name,
            "telephone": phone_clean,
            "ville": ville,
            "pays": pays,
            "canal_acquisition": canal,
            "formation_achetee": prod_name,
            "type_offre": prod_type,
            "montant_brut": prod_price,
            "remise_pourcent": discount_rate,
            "montant_net": net_price,
            "mode_paiement": pay_mode,
            "statut_paiement": status,
            "note_satisfaction": sat_score if sat_score != "" else "",
        }
        rows_clean.append(row_clean)

        # Création des anomalies réalistes dans la version brute (pour le cours de nettoyage)
        row_raw = dict(row_clean)
        
        # 1. Casse et espaces parasites sur ville (5% des cas)
        if random.random() < 0.05:
            if random.random() < 0.5:
                row_raw["ville"] = ville.lower()
            else:
                row_raw["ville"] = f" {ville.upper()} "
        
        # 2. Casse et espaces sur canal (5% des cas)
        if random.random() < 0.05:
            row_raw["canal_acquisition"] = f" {canal.lower()} "

        # 3. Formats variés sur téléphone (5% des cas)
        if random.random() < 0.05:
            row_raw["telephone"] = f"00{indicatif.replace('+', '')}{num_local.replace(' ', '')}"

        # 4. Données manquantes sur ville / pays (3% des cas)
        if random.random() < 0.03:
            row_raw["ville"] = ""
            row_raw["pays"] = ""

        # 5. Données manquantes sur canal (2% des cas)
        if random.random() < 0.02:
            row_raw["canal_acquisition"] = ""

        rows_raw.append(row_raw)

    # Injection intentionnelle de ~35 doublons parfaits (pour enseigner drop_duplicates)
    duplicate_indices = random.sample(range(len(rows_raw)), 35)
    for idx in duplicate_indices:
        rows_raw.append(dict(rows_raw[idx]))

    return rows_raw, rows_clean

def main():
    print("[1/3] Génération de 2 800 transactions réalistes KORYXA...")
    raw_data, clean_data = generate_transactions(2800)

    fieldnames = [
        "id_transaction", "date_heure", "nom_client", "telephone",
        "ville", "pays", "canal_acquisition", "formation_achetee",
        "type_offre", "montant_brut", "remise_pourcent", "montant_net",
        "mode_paiement", "statut_paiement", "note_satisfaction"
    ]

    target_files = [
        os.path.join(CONTENT_DIR, "ventes_koryxa_entreprises.csv"),
        os.path.join(PUBLIC_RESOURCES_DIR, "ventes_koryxa_entreprises.csv"),
    ]

    for path in target_files:
        with open(path, "w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(raw_data)
        print(f"Écrit avec succès ({len(raw_data)} lignes) : {path}")

    # Version de référence propre
    clean_path = os.path.join(CONTENT_DIR, "ventes_koryxa_entreprises_propre.csv")
    with open(clean_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(clean_data)
    print(f"Version propre étalonnée ({len(clean_data)} lignes) : {clean_path}")

    # Aperçu statistique
    total_valide = sum(r["montant_net"] for r in clean_data if r["statut_paiement"] == "Payé")
    nb_valide = sum(1 for r in clean_data if r["statut_paiement"] == "Payé")
    print(f"\n[Statistiques du dataset généré] :")
    print(f"Total transactions brutes : {len(raw_data)}")
    print(f"Transactions uniques : {len(clean_data)}")
    print(f"Transactions payées : {nb_valide} ({nb_valide/len(clean_data):.1%})")
    print(f"Chiffre d'affaires net validé : {total_valide:,.0f} FCFA")

if __name__ == "__main__":
    main()
