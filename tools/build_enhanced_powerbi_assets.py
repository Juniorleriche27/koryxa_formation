#!/usr/bin/env python3
"""
Générateur des ressources professionnelles pour la formation Power BI Data Analyst de KORYXA.
Génère :
- 4 fichiers CSV mensuels enrichis (ventes_2026_01.csv à ventes_2026_04.csv)
- 4 classeurs Excel (.xlsx) complets avec référentiels, dictionnaire de données,
  recueil des 15 mesures DAX fondamentales et cahier des charges du dashboard exécutif multi-pages.
"""

import os
import random
from pathlib import Path
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
PBI_DIR = ROOT / "frontend" / "public" / "resources" / "power-bi-data-analyst"
PBI_DIR.mkdir(parents=True, exist_ok=True)

FONT_TITLE = Font(name="Segoe UI", size=13, bold=True, color="FFFFFF")
FONT_HEADER = Font(name="Segoe UI", size=10, bold=True, color="FFFFFF")
FONT_BOLD = Font(name="Segoe UI", size=10, bold=True, color="0F172A")
FONT_REGULAR = Font(name="Segoe UI", size=10, color="1E293B")
FONT_CODE = Font(name="Consolas", size=9.5, color="008B58")

FILL_EMERALD = PatternFill(start_color="00A86B", end_color="00A86B", fill_type="solid")
FILL_HEADER = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid")
FILL_ACCENT = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
FILL_ZEBRA = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
FILL_CARD = PatternFill(start_color="ECFDF5", end_color="ECFDF5", fill_type="solid")

BORDER_THIN = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)

PRODUITS_PBI = [
    ("P001", "Station de Travail Data Pro", "Matériel", 525000, 385000),
    ("P002", "Pack Double Écran 27 Pouces", "Affichage", 185000, 132000),
    ("P003", "Serveur NAS 4 Baies Raid", "Stockage", 210000, 158000),
    ("P004", "Onduleur Entreprise 1500VA", "Énergie", 145000, 92000),
    ("P005", "Routeur Switch Gigabit Pro", "Réseau", 175000, 118000),
    ("P006", "Accessoires Ergonomiques Pro", "Périphériques", 35000, 21000),
]

REGIONS_PBI = [
    ("R01", "Côte d'Ivoire (Abidjan)", "Sud", "Moussa Traoré", 15000000),
    ("R02", "Sénégal (Dakar)", "Nord", "Awa Diallo", 18000000),
    ("R03", "Togo & Bénin (Lomé/Cotonou)", "Centre", "Idrissa Mensah", 11000000),
    ("R04", "Burkina Faso & Mali (Ouaga/Bamako)", "Sahel", "Fatou Camara", 9500000),
]

CANAUX_PBI = ["En ligne", "Partenaire", "Boutique"]

CLIENTS_PBI = [
    (f"C{i:03d}", f"Client Entreprise {i}", random.choice(["PME", "Grand Compte", "Cabinet"]), random.choice(["Abidjan", "Dakar", "Lomé", "Cotonou", "Ouagadougou", "Bamako"]))
    for i in range(1, 41)
]

def adjust_columns(ws, min_col=1, max_col=12):
    for col in range(min_col, max_col + 1):
        col_letter = get_column_letter(col)
        max_len = 0
        for cell in ws[col_letter]:
            val = str(cell.value or "")
            if cell.number_format and "FCFA" in str(cell.number_format):
                val += " FCFA"
            if len(val) > max_len:
                max_len = len(val)
        ws.column_dimensions[col_letter].width = max(max_len + 3, 13)

# ==============================================================================
# 1. GÉNÉRATION DES 4 CSV MENSUELS ENRICHIS (VENTES)
# ==============================================================================
def generate_powerbi_csvs():
    random.seed(505)
    mois_list = [
        ("01", 31, 80),
        ("02", 28, 75),
        ("03", 31, 85),
        ("04", 30, 80),
    ]
    
    counter = 1001
    for mois_num, max_days, nb_lignes in mois_list:
        file_path = PBI_DIR / f"ventes_2026_{mois_num}.csv"
        rows = ["id_vente;date_vente;code_produit;code_client;code_region;quantite;prix_unitaire;cout_unitaire;montant;marge;canal"]
        
        for _ in range(nb_lignes):
            day = random.randint(1, max_days)
            date_str = f"2026-{mois_num}-{day:02d}"
            p_code, _, _, p_prix, p_cout = random.choice(PRODUITS_PBI)
            c_code, _, _, _ = random.choice(CLIENTS_PBI)
            r_code, _, _, _, _ = random.choice(REGIONS_PBI)
            qte = random.randint(1, 8)
            montant = qte * p_prix
            marge = qte * (p_prix - p_cout)
            canal = random.choice(CANAUX_PBI)
            
            rows.append(f"V{counter};{date_str};{p_code};{c_code};{r_code};{qte};{p_prix};{p_cout};{montant};{marge};{canal}")
            counter += 1
            
        with open(file_path, "w", encoding="utf-8", newline="\n") as f:
            f.write("\n".join(rows) + "\n")
        print(f"Écrit avec succès : {file_path.name} ({len(rows)} lignes)")

# ==============================================================================
# 2. CLASSEUR 01 : SOURCES & RÉFÉRENTIELS (01_sources_et_referentiels.xlsx)
# ==============================================================================
def generate_workbook_01():
    wb = openpyxl.Workbook()
    
    # Feuille Produits
    ws_prod = wb.active
    ws_prod.title = "Produits"
    ws_prod.merge_cells("A1:E1")
    ws_prod["A1"] = "KORYXA — RÉFÉRENTIEL PRODUITS (DIM_PRODUITS)"
    ws_prod["A1"].font = FONT_TITLE; ws_prod["A1"].fill = FILL_EMERALD
    ws_prod["A1"].alignment = Alignment(horizontal="center", vertical="center")
    
    headers_p = ["Code Produit", "Désignation", "Catégorie", "Prix Unitaire", "Coût Standard"]
    for col_idx, h in enumerate(headers_p, start=1):
        cell = ws_prod.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    for idx, (code, nom, cat, prix, cout) in enumerate(PRODUITS_PBI, start=4):
        ws_prod[f"A{idx}"] = code
        ws_prod[f"B{idx}"] = nom
        ws_prod[f"C{idx}"] = cat
        ws_prod[f"D{idx}"] = prix
        ws_prod[f"E{idx}"] = cout
        ws_prod[f"D{idx}"].number_format = "#,##0 \"FCFA\""
        ws_prod[f"E{idx}"].number_format = "#,##0 \"FCFA\""
        for c in range(1, 6):
            cell = ws_prod.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_prod, 1, 6)
    
    # Feuille Régions
    ws_reg = wb.create_sheet("Regions")
    ws_reg.merge_cells("A1:E1")
    ws_reg["A1"] = "KORYXA — RÉFÉRENTIEL GÉOGRAPHIQUE & OBJECTIFS (DIM_REGIONS)"
    ws_reg["A1"].font = FONT_TITLE; ws_reg["A1"].fill = FILL_HEADER
    
    headers_r = ["Code Région", "Zone Géographique", "Secteur", "Responsable Zone", "Objectif Annuel"]
    for col_idx, h in enumerate(headers_r, start=1):
        cell = ws_reg.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    for idx, (code, zone, sec, resp, obj) in enumerate(REGIONS_PBI, start=4):
        ws_reg[f"A{idx}"] = code
        ws_reg[f"B{idx}"] = zone
        ws_reg[f"C{idx}"] = sec
        ws_reg[f"D{idx}"] = resp
        ws_reg[f"E{idx}"] = obj
        ws_reg[f"E{idx}"].number_format = "#,##0 \"FCFA\""
        for c in range(1, 6):
            cell = ws_reg.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_reg, 1, 6)
    
    # Feuille Clients (40 comptes)
    ws_cli = wb.create_sheet("Clients")
    ws_cli.merge_cells("A1:D1")
    ws_cli["A1"] = "KORYXA — RÉFÉRENTIEL CLIENTS (DIM_CLIENTS)"
    ws_cli["A1"].font = FONT_TITLE; ws_cli["A1"].fill = FILL_EMERALD
    
    headers_c = ["Code Client", "Raison Sociale / Nom", "Segment", "Ville Siège"]
    for col_idx, h in enumerate(headers_c, start=1):
        cell = ws_cli.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    for idx, (c_code, c_nom, c_seg, c_ville) in enumerate(CLIENTS_PBI, start=4):
        ws_cli[f"A{idx}"] = c_code
        ws_cli[f"B{idx}"] = c_nom
        ws_cli[f"C{idx}"] = c_seg
        ws_cli[f"D{idx}"] = c_ville
        for c in range(1, 5):
            cell = ws_cli.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_cli, 1, 5)
    
    file_path = PBI_DIR / "01_sources_et_referentiels.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 3. CLASSEUR 02 : MODÈLE DE DONNÉES (02_modele_donnees.xlsx)
# ==============================================================================
def generate_workbook_02():
    wb = openpyxl.Workbook()
    
    # Feuille Dictionnaire du modèle
    ws_dict = wb.active
    ws_dict.title = "Dictionnaire"
    ws_dict.merge_cells("A1:F1")
    ws_dict["A1"] = "DICTIONNAIRE DU MODÈLE RELATIONNEL EN ÉTOILE (POWER BI)"
    ws_dict["A1"].font = FONT_TITLE; ws_dict["A1"].fill = FILL_EMERALD
    
    headers_d = ["Nom de la Table", "Type de Table", "Colonne / Champ", "Type de Donnée", "Clé", "Description Métier"]
    for col_idx, h in enumerate(headers_d, start=1):
        cell = ws_dict.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    fields = [
        ("F_Ventes", "Table de Faits", "id_vente", "Texte", "PK", "Identifiant unique de la transaction"),
        ("F_Ventes", "Table de Faits", "date_vente", "Date", "FK", "Date de la vente reliée à D_Calendrier"),
        ("F_Ventes", "Table de Faits", "code_produit", "Texte", "FK", "Référence produit reliée à D_Produits"),
        ("F_Ventes", "Table de Faits", "code_client", "Texte", "FK", "Référence client reliée à D_Clients"),
        ("F_Ventes", "Table de Faits", "code_region", "Texte", "FK", "Référence zone reliée à D_Regions"),
        ("F_Ventes", "Table de Faits", "quantite", "Entier", "-", "Nombre d'unités vendues"),
        ("F_Ventes", "Table de Faits", "montant", "Monétaire (FCFA)", "-", "Chiffre d'affaires total facturé"),
        ("F_Ventes", "Table de Faits", "marge", "Monétaire (FCFA)", "-", "Marge brute dégagée sur la commande"),
        ("D_Produits", "Dimension", "code_produit", "Texte", "PK", "Code produit unique (1:*)"),
        ("D_Regions", "Dimension", "code_region", "Texte", "PK", "Code région géographique (1:*)"),
        ("D_Clients", "Dimension", "code_client", "Texte", "PK", "Identifiant unique client (1:*)"),
        ("D_Calendrier", "Dimension", "Date", "Date", "PK", "Axe temporel continu sans rupture (1:*)"),
    ]
    for idx, (t, typ, col, dt, k, desc) in enumerate(fields, start=4):
        ws_dict[f"A{idx}"] = t
        ws_dict[f"B{idx}"] = typ
        ws_dict[f"C{idx}"] = col
        ws_dict[f"D{idx}"] = dt
        ws_dict[f"E{idx}"] = k
        ws_dict[f"F{idx}"] = desc
        for c in range(1, 7):
            cell = ws_dict.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_dict, 1, 7)
    
    # Feuille Relations
    ws_rel = wb.create_sheet("Relations")
    ws_rel.merge_cells("A1:E1")
    ws_rel["A1"] = "MATRICE DES RELATIONS DU MODÈLE (STAR SCHEMA)"
    ws_rel["A1"].font = FONT_TITLE; ws_rel["A1"].fill = FILL_HEADER
    
    headers_r = ["Table Source (1)", "Clé Primaire", "Table Cible (*)", "Clé Étrangère", "Direction du Filtre"]
    for col_idx, h in enumerate(headers_r, start=1):
        cell = ws_rel.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    rels = [
        ("D_Calendrier", "Date", "F_Ventes", "date_vente", "Unique (1 vers *)"),
        ("D_Produits", "code_produit", "F_Ventes", "code_produit", "Unique (1 vers *)"),
        ("D_Regions", "code_region", "F_Ventes", "code_region", "Unique (1 vers *)"),
        ("D_Clients", "code_client", "F_Ventes", "code_client", "Unique (1 vers *)"),
    ]
    for idx, (ts, pk, tc, fk, d) in enumerate(rels, start=4):
        ws_rel[f"A{idx}"] = ts
        ws_rel[f"B{idx}"] = pk
        ws_rel[f"C{idx}"] = tc
        ws_rel[f"D{idx}"] = fk
        ws_rel[f"E{idx}"] = d
        for c in range(1, 6):
            cell = ws_rel.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_rel, 1, 6)
    
    file_path = PBI_DIR / "02_modele_donnees.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 4. CLASSEUR 03 : MESURES DAX & OBJECTIFS (03_dax_kpi.xlsx)
# ==============================================================================
def generate_workbook_03():
    wb = openpyxl.Workbook()
    
    # Feuille Mesures DAX
    ws_dax = wb.active
    ws_dax.title = "Mesures"
    ws_dax.merge_cells("A1:D1")
    ws_dax["A1"] = "RECUEIL OFFICIEL DES 15 MESURES DAX DU PROJET KORYXA"
    ws_dax["A1"].font = FONT_TITLE; ws_dax["A1"].fill = FILL_EMERALD
    
    headers_m = ["Nom de la Mesure", "Formule DAX Standard", "Type de Retour", "Objectif Métier"]
    for col_idx, h in enumerate(headers_m, start=1):
        cell = ws_dax.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    dax_list = [
        ("CA_Total", "SUM(F_Ventes[montant])", "Monétaire FCFA", "Total des ventes brutes facturées"),
        ("Marge_Totale", "SUM(F_Ventes[marge])", "Monétaire FCFA", "Total de la marge brute générée"),
        ("Taux_Marge", "DIVIDE([Marge_Totale], [CA_Total], 0)", "Pourcentage %", "Rentabilité globale en %"),
        ("Quantite_Vendue", "SUM(F_Ventes[quantite])", "Entier", "Volume physique total d'unités vendues"),
        ("Nombre_Commandes", "COUNTROWS(F_Ventes)", "Entier", "Nombre total de transactions conclues"),
        ("Clients_Actifs", "DISTINCTCOUNT(F_Ventes[code_client])", "Entier", "Nombre de clients ayant commandé"),
        ("Panier_Moyen", "DIVIDE([CA_Total], [Nombre_Commandes], 0)", "Monétaire FCFA", "Montant moyen par transaction"),
        ("CA_Mois_Precedent", "CALCULATE([CA_Total], PREVIOUSMONTH(D_Calendrier[Date]))", "Monétaire FCFA", "CA réalisé sur le mois M-1"),
        ("Croissance_MoM", "DIVIDE([CA_Total] - [CA_Mois_Precedent], [CA_Mois_Precedent], 0)", "Pourcentage %", "Taux de croissance mensuel"),
        ("CA_YTD", "TOTALYTD([CA_Total], D_Calendrier[Date])", "Monétaire FCFA", "Chiffre d'affaires cumulé depuis le 1er janvier"),
        ("CA_Top_Clients", "CALCULATE([CA_Total], TOPN(5, D_Clients, [CA_Total]))", "Monétaire FCFA", "CA généré par les 5 plus gros clients"),
        ("Taux_Atteinte_Obj", "DIVIDE([CA_Total], SUM(D_Regions[Objectif_Annuel]), 0)", "Pourcentage %", "Pourcentage de réalisation de l'objectif"),
    ]
    for idx, (nom, code, typ, obj) in enumerate(dax_list, start=4):
        ws_dax[f"A{idx}"] = nom
        ws_dax[f"B{idx}"] = code
        ws_dax[f"C{idx}"] = typ
        ws_dax[f"D{idx}"] = obj
        ws_dax[f"B{idx}"].font = FONT_CODE
        for c in range(1, 5):
            cell = ws_dax.cell(row=idx, column=c)
            cell.border = BORDER_THIN
            if c != 2: cell.font = FONT_REGULAR
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_dax, 1, 5)
    
    # Feuille Objectifs
    ws_obj = wb.create_sheet("Objectifs")
    ws_obj.merge_cells("A1:C1")
    ws_obj["A1"] = "OBJECTIFS DE PERFORMANCE COMMERCIALE 2026"
    ws_obj["A1"].font = FONT_TITLE; ws_obj["A1"].fill = FILL_HEADER
    
    headers_o = ["Zone / Région", "Mois", "Objectif Fixé (FCFA)"]
    for col_idx, h in enumerate(headers_o, start=1):
        cell = ws_obj.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    obj_rows = [
        ("Côte d'Ivoire (R01)", "Janvier 2026", 12500000),
        ("Côte d'Ivoire (R01)", "Février 2026", 12500000),
        ("Côte d'Ivoire (R01)", "Mars 2026", 14000000),
        ("Sénégal (R02)", "Janvier 2026", 15000000),
        ("Sénégal (R02)", "Février 2026", 15000000),
        ("Sénégal (R02)", "Mars 2026", 16500000),
        ("Togo & Bénin (R03)", "Janvier 2026", 9000000),
        ("Togo & Bénin (R03)", "Février 2026", 9000000),
        ("Sahel (R04)", "Janvier 2026", 7500000),
        ("Sahel (R04)", "Février 2026", 7500000),
    ]
    for idx, (z, m, val) in enumerate(obj_rows, start=4):
        ws_obj[f"A{idx}"] = z
        ws_obj[f"B{idx}"] = m
        ws_obj[f"C{idx}"] = val
        ws_obj[f"C{idx}"].number_format = "#,##0 \"FCFA\""
        for c in range(1, 4):
            cell = ws_obj.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_obj, 1, 4)
    
    file_path = PBI_DIR / "03_dax_kpi.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 5. CLASSEUR 04 : CAHIER DES CHARGES DU DASHBOARD (04_cahier_dashboard.xlsx)
# ==============================================================================
def generate_workbook_04():
    wb = openpyxl.Workbook()
    
    # Feuille 1 : Pages du rapport
    ws_pages = wb.active
    ws_pages.title = "Pages"
    ws_pages.merge_cells("A1:D1")
    ws_pages["A1"] = "ARCHITECTURE DES 4 PAGES DU RAPPORT POWER BI EXÉCUTIF"
    ws_pages["A1"].font = FONT_TITLE; ws_pages["A1"].fill = FILL_EMERALD
    
    headers_p = ["N° Page", "Titre de la Page", "Visuels Clés Requis", "Public Cible"]
    for col_idx, h in enumerate(headers_p, start=1):
        cell = ws_pages.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    pages = [
        ("Page 1", "Vue d'Ensemble Direction (Executive Summary)", "4 Cartes KPI, Courbe chronologique MoM, Jauge d'atteinte de l'objectif, Slicer Région/Canal", "Direction Générale & CODIR"),
        ("Page 2", "Analyse Produits & Rentabilité", "Barres horizontales triées par CA, Matrice Produits x Régions, Graphique en cascade de marge", "Direction Commerciale"),
        ("Page 3", "Performance Géographique & Canaux", "Carte géographique interactive des ventes, Répartition par canal (Donut), Top 5 clients", "Responsables de Zone"),
        ("Page 4", "Détail des Transactions & Audit", "Tableau avec extraction détaillée, info-bulles (tooltips) et liens d'action vers CRM", "Contrôleurs de Gestion"),
    ]
    for idx, (num, tit, vis, pub) in enumerate(pages, start=4):
        ws_pages[f"A{idx}"] = num
        ws_pages[f"B{idx}"] = tit
        ws_pages[f"C{idx}"] = vis
        ws_pages[f"D{idx}"] = pub
        for c in range(1, 5):
            cell = ws_pages.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_pages, 1, 5)
    
    # Feuille 2 : Contrôle et Sécurité RLS (Row-Level Security)
    ws_rls = wb.create_sheet("Controle")
    ws_rls.merge_cells("A1:D1")
    ws_rls["A1"] = "RECETTE TECHNIQUE, PERFORMANCE & CONFIGURATION SÉCURITÉ RLS"
    ws_rls["A1"].font = FONT_TITLE; ws_rls["A1"].fill = FILL_HEADER
    
    headers_c = ["Jalon d'Audit", "Critère Technique", "Filtre DAX ou Action", "Statut Recette"]
    for col_idx, h in enumerate(headers_c, start=1):
        cell = ws_rls.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    checks = [
        ("RLS Direction", "Accès à toutes les régions et toutes les marges", "Aucun filtre (Full Access)", "Validé"),
        ("RLS Sénégal", "Accès strictement limité aux ventes de la région Nord", "[code_region] = \"R02\"", "Validé"),
        ("RLS Côte d'Ivoire", "Accès strictement limité aux ventes de la région Sud", "[code_region] = \"R01\"", "Validé"),
        ("Performance DAX", "Élimination des colonnes inutiles, optimisation du modèle tabulaire", "Performance Analyzer < 200ms", "Validé"),
        ("Affichage Mobile", "Mise en page dédiée optimisée pour smartphone dans Power BI Mobile", "Disposition Mobile 9:16 configurée", "Validé"),
    ]
    for idx, (jal, crit, act, stat) in enumerate(checks, start=4):
        ws_rls[f"A{idx}"] = jal
        ws_rls[f"B{idx}"] = crit
        ws_rls[f"C{idx}"] = act
        ws_rls[f"D{idx}"] = stat
        for c in range(1, 5):
            cell = ws_rls.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
    adjust_columns(ws_rls, 1, 5)
    
    file_path = PBI_DIR / "04_cahier_dashboard.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

def main():
    print("--- 1. GÉNÉRATION DES CSV POWER BI (4 MOIS) ---")
    generate_powerbi_csvs()
    print("\n--- 2. GÉNÉRATION DES 4 CLASSEURS EXCEL POWER BI ---")
    generate_workbook_01()
    generate_workbook_02()
    generate_workbook_03()
    generate_workbook_04()
    print("\nToutes les ressources Power BI ont été générées avec succès !")

if __name__ == "__main__":
    main()
