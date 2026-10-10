#!/usr/bin/env python3
"""
Générateur des ressources professionnelles pour la formation Excel Data Analyst de KORYXA.
Génère :
- 4 fichiers CSV mensuels (ventes_2026_01.csv à ventes_2026_04.csv)
- 4 classeurs Excel (.xlsx) haut de gamme avec feuilles multiples, formules de référence,
  référentiels d'entreprise, tableaux de KPI et maquette de Dashboard commercial exécutif.
"""

import os
import random
from pathlib import Path
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
EXCEL_DIR = ROOT / "frontend" / "public" / "resources" / "excel-data-analyst"
EXCEL_DIR.mkdir(parents=True, exist_ok=True)

# Styles KORYXA
FONT_TITLE = Font(name="Calibri", size=14, bold=True, color="FFFFFF")
FONT_HEADER = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
FONT_BOLD = Font(name="Calibri", size=11, bold=True, color="0F172A")
FONT_REGULAR = Font(name="Calibri", size=11, color="1E293B")
FONT_MUTED = Font(name="Calibri", size=9, italic=True, color="64748B")

FILL_EMERALD = PatternFill(start_color="00A86B", end_color="00A86B", fill_type="solid") # Vert KORYXA
FILL_EMERALD_DARK = PatternFill(start_color="006D44", end_color="006D44", fill_type="solid")
FILL_HEADER = PatternFill(start_color="0F172A", end_color="0F172A", fill_type="solid") # Ardoise foncée
FILL_ACCENT = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
FILL_ZEBRA = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
FILL_CARD = PatternFill(start_color="ECFDF5", end_color="ECFDF5", fill_type="solid") # Vert clair pastel

BORDER_THIN = Border(
    left=Side(style='thin', color='E2E8F0'),
    right=Side(style='thin', color='E2E8F0'),
    top=Side(style='thin', color='E2E8F0'),
    bottom=Side(style='thin', color='E2E8F0')
)
BORDER_TOP_BOTTOM = Border(
    top=Side(style='thin', color='94A3B8'),
    bottom=Side(style='double', color='0F172A')
)

PRODUITS_CATALOGUE = [
    ("P001", "Clavier Professionnel", "Accessoires", 18000, 12240),
    ("P002", "Souris Ergonomique", "Accessoires", 9000, 6390),
    ("P003", "Écran 27 pouces 4K", "Matériel", 145000, 107300),
    ("P004", "Casque Réduction Bruit", "Audio", 32000, 21760),
    ("P005", "Station USB-C Universelle", "Connectique", 24000, 17040),
    ("P006", "Support Ventilateur PC", "Accessoires", 15000, 9500),
    ("P007", "Webcam Full HD Pro", "Audio/Vidéo", 42000, 28000),
    ("P008", "Câble HDMI 4K Renforcé", "Connectique", 8000, 4800),
]

REGIONS_CATALOGUE = [
    ("N", "Nord", "Sénégal / Mali", "Awa Diallo"),
    ("S", "Sud", "Côte d'Ivoire", "Moussa Traoré"),
    ("C", "Centre", "Togo / Bénin", "Idrissa Mensah"),
    ("O", "Ouest", "Burkina Faso / Guinée", "Fatou Camara"),
    ("E", "Export", "International / Diaspora", "Jean Kouamé"),
]

COMMERCIAUX = ["Awa", "Moussa", "Idrissa", "Fatou", "Jean", "Aminata"]
CANAUX = ["Boutique", "B2B Entreprise", "Site Web", "WhatsApp"]

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
        ws.column_dimensions[col_letter].width = max(max_len + 3, 12)

# ==============================================================================
# 1. GÉNÉRATION DES 4 FICHIERS CSV MENSUELS (POUR POWER QUERY)
# ==============================================================================
def generate_monthly_csvs():
    random.seed(42)
    mois_list = [
        ("01", 31, 85),
        ("02", 28, 80),
        ("03", 31, 95),
        ("04", 30, 90),
    ]
    
    for mois_num, max_days, nb_lignes in mois_list:
        file_path = EXCEL_DIR / f"ventes_2026_{mois_num}.csv"
        rows = ["date;code_produit;code_region;commercial;quantite;prix_unitaire;cout_unitaire"]
        
        for _ in range(nb_lignes):
            day = random.randint(1, max_days)
            date_str = f"2026-{mois_num}-{day:02d}"
            p_code, _, _, p_prix, p_cout = random.choice(PRODUITS_CATALOGUE)
            r_code, _, _, _ = random.choice(REGIONS_CATALOGUE)
            com = random.choice(COMMERCIAUX)
            qte = random.randint(1, 10)
            
            rows.append(f"{date_str};{p_code};{r_code};{com};{qte};{p_prix};{p_cout}")
            
        with open(file_path, "w", encoding="utf-8") as f:
            f.write("\n".join(rows) + "\n")
        print(f"Écrit avec succès : {file_path.name} ({len(rows)} lignes)")

# ==============================================================================
# 2. CLASSEUR 01 : FONDAMENTAUX & FORMULES
# ==============================================================================
def generate_workbook_01():
    wb = openpyxl.Workbook()
    ws_ventes = wb.active
    ws_ventes.title = "Ventes"
    
    # Titre bandeau
    ws_ventes.merge_cells("A1:J1")
    ws_ventes["A1"] = "KORYXA FORMATION — EXCEL DATA ANALYST : FONDAMENTAUX & FORMULES"
    ws_ventes["A1"].font = FONT_TITLE
    ws_ventes["A1"].fill = FILL_EMERALD
    ws_ventes["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws_ventes.row_dimensions[1].height = 36
    
    # Encart Paramètres
    ws_ventes["L3"] = "Paramètre"
    ws_ventes["M3"] = "Valeur"
    ws_ventes["L3"].font = FONT_HEADER; ws_ventes["L3"].fill = FILL_HEADER
    ws_ventes["M3"].font = FONT_HEADER; ws_ventes["M3"].fill = FILL_HEADER
    
    params = [
        ("Taux TVA", 0.18, "0.0%"),
        ("Objectif mensuel", 5000000, "#,##0 \"FCFA\""),
        ("Seuil Alerte", 50000, "#,##0 \"FCFA\""),
        ("Taux Marge Cible", 0.30, "0.0%"),
    ]
    for idx, (lbl, val, fmt) in enumerate(params, start=4):
        ws_ventes[f"L{idx}"] = lbl
        ws_ventes[f"M{idx}"] = val
        ws_ventes[f"M{idx}"].number_format = fmt
        ws_ventes[f"L{idx}"].fill = FILL_ACCENT
        ws_ventes[f"M{idx}"].fill = FILL_ACCENT
        ws_ventes[f"L{idx}"].border = BORDER_THIN
        ws_ventes[f"M{idx}"].border = BORDER_THIN
        
    # En-têtes du tableau de données
    headers = [
        "Date", "Référence", "Produit", "Région", "Commercial", 
        "Quantité", "Prix unitaire", "Remise", "CA brut", "CA net"
    ]
    for col_idx, h in enumerate(headers, start=1):
        cell = ws_ventes.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER
        cell.fill = FILL_HEADER
        cell.alignment = Alignment(horizontal="center")
        cell.border = BORDER_THIN
    ws_ventes.row_dimensions[3].height = 24
    
    # Données réalistes (80 transactions)
    random.seed(101)
    row_start = 4
    for i in range(80):
        r_idx = row_start + i
        day = (i % 28) + 1
        p_code, p_nom, _, p_prix, _ = PRODUITS_CATALOGUE[i % len(PRODUITS_CATALOGUE)]
        _, reg_nom, _, _ = REGIONS_CATALOGUE[i % len(REGIONS_CATALOGUE)]
        com = COMMERCIAUX[i % len(COMMERCIAUX)]
        qte = random.randint(1, 8)
        remise = random.choice([0.0, 0.05, 0.10, 0.15]) if i % 3 == 0 else 0.0
        
        ws_ventes[f"A{r_idx}"] = f"2026-01-{day:02d}"
        ws_ventes[f"B{r_idx}"] = f"TX-2026-{1001 + i}"
        ws_ventes[f"C{r_idx}"] = p_nom
        ws_ventes[f"D{r_idx}"] = reg_nom
        ws_ventes[f"E{r_idx}"] = com
        ws_ventes[f"F{r_idx}"] = qte
        ws_ventes[f"G{r_idx}"] = p_prix
        ws_ventes[f"H{r_idx}"] = remise
        ws_ventes[f"I{r_idx}"] = f"=F{r_idx}*G{r_idx}"          # CA Brut
        ws_ventes[f"J{r_idx}"] = f"=I{r_idx}*(1-H{r_idx})"      # CA Net
        
        # Formats
        ws_ventes[f"G{r_idx}"].number_format = "#,##0 \"FCFA\""
        ws_ventes[f"H{r_idx}"].number_format = "0.0%"
        ws_ventes[f"I{r_idx}"].number_format = "#,##0 \"FCFA\""
        ws_ventes[f"J{r_idx}"].number_format = "#,##0 \"FCFA\""
        
        fill_row = FILL_ZEBRA if i % 2 == 1 else None
        for c in range(1, 11):
            cell = ws_ventes.cell(row=r_idx, column=c)
            cell.font = FONT_REGULAR
            cell.border = BORDER_THIN
            if fill_row: cell.fill = fill_row
            
    # Ligne de totaux
    total_row = row_start + 80
    ws_ventes[f"A{total_row}"] = "TOTAL CONSOLIDÉ"
    ws_ventes[f"A{total_row}"].font = FONT_BOLD
    ws_ventes[f"F{total_row}"] = f"=SUM(F4:F{total_row-1})"
    ws_ventes[f"I{total_row}"] = f"=SUM(I4:I{total_row-1})"
    ws_ventes[f"J{total_row}"] = f"=SUM(J4:J{total_row-1})"
    ws_ventes[f"I{total_row}"].number_format = "#,##0 \"FCFA\""
    ws_ventes[f"J{total_row}"].number_format = "#,##0 \"FCFA\""
    
    for c in range(1, 11):
        cell = ws_ventes.cell(row=total_row, column=c)
        cell.font = FONT_BOLD
        cell.border = BORDER_TOP_BOTTOM
        
    adjust_columns(ws_ventes, 1, 13)
    
    file_path = EXCEL_DIR / "01_fondamentaux_formules.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 3. CLASSEUR 02 : RECHERCHES & KPI (RECHERCHEX, INDEX/EQUIV, SOMME.SI.ENS)
# ==============================================================================
def generate_workbook_02():
    wb = openpyxl.Workbook()
    
    # Feuille 1 : Ventes
    ws_ventes = wb.active
    ws_ventes.title = "Ventes"
    
    ws_ventes.merge_cells("A1:G1")
    ws_ventes["A1"] = "KORYXA — RECHERCHES AVANCÉES & FORMULES D'ENRICHISSEMENT"
    ws_ventes["A1"].font = FONT_TITLE
    ws_ventes["A1"].fill = FILL_EMERALD
    ws_ventes["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws_ventes.row_dimensions[1].height = 36
    
    headers_ventes = ["Code produit", "Date", "Région", "Commercial", "Quantité", "Prix", "CA"]
    for col_idx, h in enumerate(headers_ventes, start=1):
        cell = ws_ventes.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    random.seed(202)
    for i in range(75):
        r_idx = 4 + i
        day = (i % 28) + 1
        p_code, _, _, _, _ = PRODUITS_CATALOGUE[i % len(PRODUITS_CATALOGUE)]
        _, reg_nom, _, _ = REGIONS_CATALOGUE[i % len(REGIONS_CATALOGUE)]
        com = COMMERCIAUX[i % len(COMMERCIAUX)]
        qte = random.randint(1, 6)
        
        ws_ventes[f"A{r_idx}"] = p_code
        ws_ventes[f"B{r_idx}"] = f"2026-02-{day:02d}"
        ws_ventes[f"C{r_idx}"] = reg_nom
        ws_ventes[f"D{r_idx}"] = com
        ws_ventes[f"E{r_idx}"] = qte
        # Formule RECHERCHEX avec valeur par défaut si non trouvé
        ws_ventes[f"F{r_idx}"] = f'=XLOOKUP(A{r_idx},Produits!A$4:A$11,Produits!C$4:C$11,"Code inconnu")'
        # Formule SIERREUR
        ws_ventes[f"G{r_idx}"] = f'=IFERROR(E{r_idx}*F{r_idx},0)'
        
        ws_ventes[f"F{r_idx}"].number_format = "#,##0 \"FCFA\""
        ws_ventes[f"G{r_idx}"].number_format = "#,##0 \"FCFA\""
        for c in range(1, 8):
            cell = ws_ventes.cell(row=r_idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if i % 2 == 1: cell.fill = FILL_ZEBRA
            
    adjust_columns(ws_ventes, 1, 8)
    
    # Feuille 2 : Produits (Référentiel)
    ws_prod = wb.create_sheet("Produits")
    ws_prod.merge_cells("A1:D1")
    ws_prod["A1"] = "RÉFÉRENTIEL PRODUITS & TARIFS OFFICIELS"
    ws_prod["A1"].font = FONT_TITLE; ws_prod["A1"].fill = FILL_HEADER
    ws_prod["A1"].alignment = Alignment(horizontal="center", vertical="center")
    
    headers_prod = ["Code", "Produit", "Prix", "Catégorie"]
    for col_idx, h in enumerate(headers_prod, start=1):
        cell = ws_prod.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    for idx, (code, nom, cat, prix, _) in enumerate(PRODUITS_CATALOGUE, start=4):
        ws_prod[f"A{idx}"] = code
        ws_prod[f"B{idx}"] = nom
        ws_prod[f"C{idx}"] = prix
        ws_prod[f"D{idx}"] = cat
        ws_prod[f"C{idx}"].number_format = "#,##0 \"FCFA\""
        for c in range(1, 5):
            ws_prod.cell(row=idx, column=c).border = BORDER_THIN
            ws_prod.cell(row=idx, column=c).font = FONT_REGULAR
    adjust_columns(ws_prod, 1, 5)
    
    # Feuille 3 : KPI (SOMME.SI.ENS & KPI de pilotage)
    ws_kpi = wb.create_sheet("KPI")
    ws_kpi.merge_cells("A1:D1")
    ws_kpi["A1"] = "SYNTHÈSE EXÉCUTIVE DES KPI COMMERCIAUX"
    ws_kpi["A1"].font = FONT_TITLE; ws_kpi["A1"].fill = FILL_EMERALD
    
    headers_kpi = ["Indicateur Clé", "Formule / Périmètre", "Valeur Calculée", "Objectif"]
    for col_idx, h in enumerate(headers_kpi, start=1):
        cell = ws_kpi.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    kpis = [
        ("Chiffre d'Affaires Global", "=SUM(Ventes!G4:G78)", 15000000, "#,##0 \"FCFA\""),
        ("Volume de Ventes (Quantité)", "=SUM(Ventes!E4:E78)", 250, "#,##0"),
        ("CA Région Nord (SOMME.SI)", '=SUMIF(Ventes!C4:C78,"Nord",Ventes!G4:G78)', 4000000, "#,##0 \"FCFA\""),
        ("CA Région Sud (SOMME.SI)", '=SUMIF(Ventes!C4:C78,"Sud",Ventes!G4:G78)', 3500000, "#,##0 \"FCFA\""),
        ("CA Commercial Awa (SOMME.SI.ENS)", '=SUMIFS(Ventes!G4:G78,Ventes!D4:D78,"Awa")', 3000000, "#,##0 \"FCFA\""),
        ("Nombre Commandes > 100k (NB.SI)", '=COUNTIF(Ventes!G4:G78,">100000")', 15, "#,##0"),
        ("Panier Moyen (MOYENNE)", "=AVERAGE(Ventes!G4:G78)", 120000, "#,##0 \"FCFA\""),
    ]
    
    for idx, (lbl, formule, obj, fmt) in enumerate(kpis, start=4):
        ws_kpi[f"A{idx}"] = lbl
        ws_kpi[f"B{idx}"] = formule
        ws_kpi[f"C{idx}"] = formule
        ws_kpi[f"D{idx}"] = obj
        ws_kpi[f"C{idx}"].number_format = fmt
        ws_kpi[f"D{idx}"].number_format = fmt
        for c in range(1, 5):
            cell = ws_kpi.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
            
    adjust_columns(ws_kpi, 1, 5)
    
    file_path = EXCEL_DIR / "02_recherches_et_kpi.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 4. CLASSEUR 03 : TCD & VISUALISATION DE DIRECTION
# ==============================================================================
def generate_workbook_03():
    wb = openpyxl.Workbook()
    
    # Feuille 1 : Données
    ws_donnees = wb.active
    ws_donnees.title = "Données"
    
    ws_donnees.merge_cells("A1:K1")
    ws_donnees["A1"] = "KORYXA — BASE CONSOLIDÉE POUR TABLEAUX CROISÉS & VISUALISATION"
    ws_donnees["A1"].font = FONT_TITLE; ws_donnees["A1"].fill = FILL_EMERALD
    ws_donnees["A1"].alignment = Alignment(horizontal="center", vertical="center")
    
    headers_tcd = [
        "Date", "Région", "Produit", "Commercial", "Canal", 
        "Quantité", "CA", "Marge", "Année", "Mois", "Trimestre"
    ]
    for col_idx, h in enumerate(headers_tcd, start=1):
        cell = ws_donnees.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    random.seed(303)
    for i in range(120):
        r_idx = 4 + i
        month = (i % 4) + 1
        day = (i % 28) + 1
        date_str = f"2026-{month:02d}-{day:02d}"
        _, p_nom, _, p_prix, p_cout = PRODUITS_CATALOGUE[i % len(PRODUITS_CATALOGUE)]
        _, reg_nom, _, _ = REGIONS_CATALOGUE[i % len(REGIONS_CATALOGUE)]
        com = COMMERCIAUX[i % len(COMMERCIAUX)]
        canal = CANAUX[i % len(CANAUX)]
        qte = random.randint(1, 8)
        ca = qte * p_prix
        marge = qte * (p_prix - p_cout)
        
        ws_donnees[f"A{r_idx}"] = date_str
        ws_donnees[f"B{r_idx}"] = reg_nom
        ws_donnees[f"C{r_idx}"] = p_nom
        ws_donnees[f"D{r_idx}"] = com
        ws_donnees[f"E{r_idx}"] = canal
        ws_donnees[f"F{r_idx}"] = qte
        ws_donnees[f"G{r_idx}"] = ca
        ws_donnees[f"H{r_idx}"] = marge
        ws_donnees[f"I{r_idx}"] = 2026
        ws_donnees[f"J{r_idx}"] = f"Mois {month:02d}"
        ws_donnees[f"K{r_idx}"] = f"T{(month-1)//3 + 1}"
        
        ws_donnees[f"G{r_idx}"].number_format = "#,##0 \"FCFA\""
        ws_donnees[f"H{r_idx}"].number_format = "#,##0 \"FCFA\""
        
        for c in range(1, 12):
            cell = ws_donnees.cell(row=r_idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if i % 2 == 1: cell.fill = FILL_ZEBRA
            
    adjust_columns(ws_donnees, 1, 12)
    
    # Feuille 2 : Guide d'apprentissage TCD
    ws_guide = wb.create_sheet("Guide")
    ws_guide.merge_cells("A1:D1")
    ws_guide["A1"] = "GUIDE PRATIQUE — CRÉATION DU TABLEAU CROISÉ DYNAMIQUE & GRAPHIQUE"
    ws_guide["A1"].font = FONT_TITLE; ws_guide["A1"].fill = FILL_HEADER
    
    headers_guide = ["Étape", "Action Méthodologique", "Détail Technique", "Résultat Attendu"]
    for col_idx, h in enumerate(headers_guide, start=1):
        cell = ws_guide.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    steps = [
        ("Étape 1", "Sélectionner la base de données", "Cliquer dans le tableau Données (A3:K123)", "Plage active prête pour l'insertion"),
        ("Étape 2", "Insérer le TCD", "Menu Insertion > Tableau croisé dynamique", "Création d'une nouvelle feuille d'analyse"),
        ("Étape 3", "Disposition des champs", "Lignes: Produit | Colonnes: Canal | Valeurs: Somme de CA, Somme de Marge", "Matrice croisée Produits x Canaux"),
        ("Étape 4", "Ajouter des Segments (Slicers)", "Menu Analyse du TCD > Insérer un segment > Région et Trimestre", "Filtres visuels interactifs en 1 clic"),
        ("Étape 5", "Insérer un Graphique croisé", "Menu Analyse du TCD > Graphique croisé dynamique > Barres horizontales", "Visualisation dynamique connectée aux segments"),
    ]
    for idx, (st, act, det, res) in enumerate(steps, start=4):
        ws_guide[f"A{idx}"] = st
        ws_guide[f"B{idx}"] = act
        ws_guide[f"C{idx}"] = det
        ws_guide[f"D{idx}"] = res
        for c in range(1, 5):
            ws_guide.cell(row=idx, column=c).border = BORDER_THIN
            ws_guide.cell(row=idx, column=c).font = FONT_REGULAR
            if idx % 2 == 1: ws_guide.cell(row=idx, column=c).fill = FILL_ZEBRA
            
    adjust_columns(ws_guide, 1, 5)
    
    file_path = EXCEL_DIR / "03_tcd_et_visualisation.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

# ==============================================================================
# 5. CLASSEUR 04 : POWER QUERY, MODÈLE & DASHBOARD COMMERCIAL EXÉCUTIF
# ==============================================================================
def generate_workbook_04():
    wb = openpyxl.Workbook()
    
    # Feuille 1 : Dashboard Exécutif
    ws_dash = wb.active
    ws_dash.title = "Dashboard"
    
    # Bandeau titre
    ws_dash.merge_cells("A1:K1")
    ws_dash["A1"] = "TABLEAU DE BORD COMMERCIAL EXÉCUTIF — KORYXA FORMATION"
    ws_dash["A1"].font = FONT_TITLE; ws_dash["A1"].fill = FILL_EMERALD
    ws_dash["A1"].alignment = Alignment(horizontal="center", vertical="center")
    ws_dash.row_dimensions[1].height = 40
    
    # Cartouches KPI (Scorecards)
    kpi_cards = [
        ("CHIFFRE D'AFFAIRES", "104 116 298 FCFA", "+18.4% vs N-1", "B", "C"),
        ("TAUX DE RECOUVREMENT", "83.5 %", "Objectif : 80.0%", "D", "E"),
        ("COMMANDES VALIDÉES", "2 338", "Inscriptions certifiées", "F", "G"),
        ("PANIER MOYEN", "44 532 FCFA", "Segment Standard", "H", "I"),
        ("MARGE COMMERCIALE", "31 234 890 FCFA", "Taux de marge : 30.0%", "J", "K"),
    ]
    
    for title, val, sub, c1, c2 in kpi_cards:
        ws_dash.merge_cells(f"{c1}3:{c2}3")
        ws_dash.merge_cells(f"{c1}4:{c2}4")
        ws_dash.merge_cells(f"{c1}5:{c2}5")
        
        ws_dash[f"{c1}3"] = title
        ws_dash[f"{c1}3"].font = Font(name="Calibri", size=9, bold=True, color="00A86B")
        ws_dash[f"{c1}3"].fill = FILL_CARD
        ws_dash[f"{c1}3"].alignment = Alignment(horizontal="center")
        
        ws_dash[f"{c1}4"] = val
        ws_dash[f"{c1}4"].font = Font(name="Calibri", size=13, bold=True, color="0F172A")
        ws_dash[f"{c1}4"].fill = FILL_CARD
        ws_dash[f"{c1}4"].alignment = Alignment(horizontal="center")
        
        ws_dash[f"{c1}5"] = sub
        ws_dash[f"{c1}5"].font = Font(name="Calibri", size=8, italic=True, color="64748B")
        ws_dash[f"{c1}5"].fill = FILL_CARD
        ws_dash[f"{c1}5"].alignment = Alignment(horizontal="center")
        
    # Section Répartition par Région & Gamme
    ws_dash.merge_cells("B7:F7")
    ws_dash["B7"] = "PERFORMANCE PAR ZONE GÉOGRAPHIQUE"
    ws_dash["B7"].font = FONT_HEADER; ws_dash["B7"].fill = FILL_HEADER
    
    headers_reg = ["Code", "Zone / Région", "Responsable", "CA Encaissé", "Poids %"]
    for col_idx, h in enumerate(headers_reg, start=2):
        cell = ws_dash.cell(row=8, column=col_idx, value=h)
        cell.font = FONT_BOLD; cell.fill = FILL_ACCENT; cell.border = BORDER_THIN
        
    reg_data = [
        ("N", "Nord (Sénégal / Mali)", "Awa Diallo", 34500000, 0.331),
        ("S", "Sud (Côte d'Ivoire)", "Moussa Traoré", 28900000, 0.278),
        ("C", "Centre (Togo / Bénin)", "Idrissa Mensah", 18200000, 0.175),
        ("O", "Ouest (Burkina Faso)", "Fatou Camara", 13800000, 0.133),
        ("E", "Export (Diaspora)", "Jean Kouamé", 8716298, 0.083),
    ]
    for idx, (code, zone, resp, ca, pct) in enumerate(reg_data, start=9):
        ws_dash[f"B{idx}"] = code
        ws_dash[f"C{idx}"] = zone
        ws_dash[f"D{idx}"] = resp
        ws_dash[f"E{idx}"] = ca
        ws_dash[f"F{idx}"] = pct
        ws_dash[f"E{idx}"].number_format = "#,##0 \"FCFA\""
        ws_dash[f"F{idx}"].number_format = "0.0%"
        for c in range(2, 7):
            cell = ws_dash.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
            
    # Section Recommandations Stratégiques
    ws_dash.merge_cells("H7:K7")
    ws_dash["H7"] = "OBSERVATIONS & RECOMMANDATIONS COMITÉ"
    ws_dash["H7"].font = FONT_HEADER; ws_dash["H7"].fill = FILL_HEADER
    
    recomms = [
        ("1. Zone Nord en tête", "Le Sénégal porte 33% du volume grâce à la pénétration de Wave."),
        ("2. Potentiel Côte d'Ivoire", "Accélérer l'intégration directe Orange Money et MTN à Abidjan."),
        ("3. Relances Paniers", "20M FCFA de commandes en attente à automatiser via WhatsApp."),
        ("4. Montée en gamme", "Les formations avancées à 69k FCFA affichent la meilleure marge."),
    ]
    for idx, (titre, desc) in enumerate(recomms, start=8):
        ws_dash.merge_cells(f"H{idx*2-8}:K{idx*2-8}")
        ws_dash.merge_cells(f"H{idx*2-7}:K{idx*2-7}")
        ws_dash[f"H{idx*2-8}"] = titre
        ws_dash[f"H{idx*2-8}"].font = Font(name="Calibri", size=10, bold=True, color="00A86B")
        ws_dash[f"H{idx*2-7}"] = desc
        ws_dash[f"H{idx*2-7}"].font = FONT_MUTED
        
    adjust_columns(ws_dash, 1, 12)
    
    # Feuille 2 : Référentiels
    ws_ref = wb.create_sheet("Référentiels")
    ws_ref.merge_cells("A1:C1")
    ws_ref["A1"] = "RÉFÉRENTIEL PRODUITS (DIM_PRODUITS)"
    ws_ref["A1"].font = FONT_HEADER; ws_ref["A1"].fill = FILL_HEADER
    
    headers_ref_p = ["Code produit", "Produit", "Catégorie"]
    for col_idx, h in enumerate(headers_ref_p, start=1):
        cell = ws_ref.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_BOLD; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    for idx, (code, nom, cat, _, _) in enumerate(PRODUITS_CATALOGUE, start=4):
        ws_ref[f"A{idx}"] = code
        ws_ref[f"B{idx}"] = nom
        ws_ref[f"C{idx}"] = cat
        for c in range(1, 4):
            ws_ref.cell(row=idx, column=c).border = BORDER_THIN
            ws_ref.cell(row=idx, column=c).font = FONT_REGULAR
            
    ws_ref.merge_cells("E1:G1")
    ws_ref["E1"] = "RÉFÉRENTIEL RÉGIONS (DIM_REGIONS)"
    ws_ref["E1"].font = FONT_HEADER; ws_ref["E1"].fill = FILL_HEADER
    
    headers_ref_r = ["Code région", "Région", "Pays Associés"]
    for col_idx, h in enumerate(headers_ref_r, start=5):
        cell = ws_ref.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_BOLD; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    for idx, (code, nom, pays, _) in enumerate(REGIONS_CATALOGUE, start=4):
        ws_ref[f"E{idx}"] = code
        ws_ref[f"F{idx}"] = nom
        ws_ref[f"G{idx}"] = pays
        for c in range(5, 8):
            ws_ref.cell(row=idx, column=c).border = BORDER_THIN
            ws_ref.cell(row=idx, column=c).font = FONT_REGULAR
            
    adjust_columns(ws_ref, 1, 8)
    
    # Feuille 3 : Pipeline Power Query
    ws_pq = wb.create_sheet("Power_Query_M")
    ws_pq.merge_cells("A1:D1")
    ws_pq["A1"] = "PIPELINE POWER QUERY — CONSOLIDATION DE DOSSIER & ÉTAPES M"
    ws_pq["A1"].font = FONT_TITLE; ws_pq["A1"].fill = FILL_EMERALD
    
    headers_pq = ["Étape N°", "Nom de l'étape Power Query", "Code M ou Action Interface", "Rôle Métier"]
    for col_idx, h in enumerate(headers_pq, start=1):
        cell = ws_pq.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_HEADER; cell.border = BORDER_THIN
        
    pq_steps = [
        ("1", "Source", "= Folder.Files(\"C:\\Dossier_Ventes\")", "Se connecter au dossier contenant les 4 CSV mensuels"),
        ("2", "FichiersMasques", "= Table.SelectRows(Source, each [Extension] = \".csv\")", "Filtrer pour ignorer les fichiers temporaires"),
        ("3", "ContenuCombine", "= Table.TransformColumns(FichiersMasques, {{\"Data\", Csv.Document}})", "Lire le contenu délimité par des points-virgules"),
        ("4", "EnTetesPromues", "= Table.PromoteHeaders(TableCombinee)", "Transformer la première ligne en en-têtes réelles"),
        ("5", "TypeModifie", "= Table.TransformColumnTypes(..., {{\"date\", type date}, {\"montant\", Int64.Type}})", "Forcer le typage strict pour calculs fiables"),
        ("6", "ColonnePersonnalisee", "= Table.AddColumn(..., \"CA_Net\", each [quantite] * [prix_unitaire])", "Créer la colonne calculée de chiffre d'affaires"),
        ("7", "JointureReferentiel", "= Table.NestedJoin(..., \"code_produit\", Produits, \"Code\")", "Enrichir la table avec le libellé et la catégorie"),
        ("8", "FermerEtCharger", "Fermer & Charger dans le Modèle de données", "Alimenter Power Pivot et les tableaux croisés"),
    ]
    for idx, (n, nom, code_m, role) in enumerate(pq_steps, start=4):
        ws_pq[f"A{idx}"] = n
        ws_pq[f"B{idx}"] = nom
        ws_pq[f"C{idx}"] = code_m
        ws_pq[f"D{idx}"] = role
        for c in range(1, 5):
            cell = ws_pq.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
            
    adjust_columns(ws_pq, 1, 5)
    
    # Feuille 4 : Instructions (conserver la feuille attendue par les tests)
    ws_inst = wb.create_sheet("Instructions")
    ws_inst.merge_cells("A1:C1")
    ws_inst["A1"] = "PROJET FINAL — DASHBOARD COMMERCIAL ACTUALISABLE"
    ws_inst["A1"].font = FONT_TITLE; ws_inst["A1"].fill = FILL_HEADER
    
    headers_inst = ["Jalon", "Travail Attendu", "Critère de Validation"]
    for col_idx, h in enumerate(headers_inst, start=1):
        cell = ws_inst.cell(row=3, column=col_idx, value=h)
        cell.font = FONT_HEADER; cell.fill = FILL_EMERALD; cell.border = BORDER_THIN
        
    inst_rows = [
        ("1", "Consolider les 4 fichiers CSV mensuels via Power Query", "Pipeline actualisable en 1 clic sans copier-coller"),
        ("2", "Relier les tables dans le modèle relationnel Power Pivot", "Schéma en étoile avec relations 1 à plusieurs actives"),
        ("3", "Créer 5 mesures DAX fondamentales", "CA Encaissé, Marge %, Panier Moyen, Taux Atteinte"),
        ("4", "Construire le Dashboard commercial interactif", "Segments connectés par Région et Commercial, carte KPI"),
        ("5", "Auditer la robustesse et protéger les formules", "Classeur propre prêt pour présentation devant le CODIR"),
    ]
    for idx, (j, t, c_v) in enumerate(inst_rows, start=4):
        ws_inst[f"A{idx}"] = j
        ws_inst[f"B{idx}"] = t
        ws_inst[f"C{idx}"] = c_v
        for c in range(1, 4):
            cell = ws_inst.cell(row=idx, column=c)
            cell.font = FONT_REGULAR; cell.border = BORDER_THIN
            if idx % 2 == 1: cell.fill = FILL_ZEBRA
            
    adjust_columns(ws_inst, 1, 4)
    
    file_path = EXCEL_DIR / "04_power_query_modele_dashboard.xlsx"
    wb.save(file_path)
    print(f"Généré avec succès : {file_path.name} (Taille : {file_path.stat().st_size} octets)")

def main():
    print("--- 1. GÉNÉRATION DES CSV MENSUELS ---")
    generate_monthly_csvs()
    print("\n--- 2. GÉNÉRATION DES 4 CLASSEURS EXCEL PROFESSIONNELS ---")
    generate_workbook_01()
    generate_workbook_02()
    generate_workbook_03()
    generate_workbook_04()
    print("\nToutes les ressources Excel ont été générées avec succès !")

if __name__ == "__main__":
    main()
