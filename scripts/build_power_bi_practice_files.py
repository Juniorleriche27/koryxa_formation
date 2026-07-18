from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.sax.saxutils import escape
from datetime import date, timedelta
import csv

OUT = Path(__file__).resolve().parents[1] / "frontend/public/resources/power-bi-data-analyst"
OUT.mkdir(parents=True, exist_ok=True)


def col(n):
    s = ""
    while n:
        n, r = divmod(n - 1, 26)
        s = chr(65 + r) + s
    return s


def cell(r, c, value, style=0):
    ref = f"{col(c)}{r}"
    if isinstance(value, (int, float)):
        return f'<c r="{ref}" s="{style}"><v>{value}</v></c>'
    return f'<c r="{ref}" s="{style}" t="inlineStr"><is><t>{escape(str(value))}</t></is></c>'


def create_xlsx(path: Path, sheets):
    sheet_tags, rels, overrides = [], [], []
    for i, (name, rows) in enumerate(sheets, 1):
        sheet_tags.append(f'<sheet name="{escape(name)}" sheetId="{i}" r:id="rId{i}"/>')
        rels.append(f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>')
        overrides.append(f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>')
    rels.append(f'<Relationship Id="rId{len(sheets)+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>')
    workbook = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>{''.join(sheet_tags)}</sheets></workbook>'''
    workbook_rels = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{''.join(rels)}</Relationships>'''
    styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF06251C"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'''
    content_types = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>{''.join(overrides)}</Types>'''
    root_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'''
    with ZipFile(path, "w", ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", root_rels)
        z.writestr("xl/workbook.xml", workbook)
        z.writestr("xl/_rels/workbook.xml.rels", workbook_rels)
        z.writestr("xl/styles.xml", styles)
        for i, (_, rows) in enumerate(sheets, 1):
            xml_rows = []
            max_c = max(len(r) for r in rows)
            for ri, row in enumerate(rows, 1):
                cells = ''.join(cell(ri, ci, v, 1 if ri == 1 else 0) for ci, v in enumerate(row, 1))
                xml_rows.append(f'<row r="{ri}">{cells}</row>')
            xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:{col(max_c)}{len(rows)}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetData>{''.join(xml_rows)}</sheetData></worksheet>'''
            z.writestr(f"xl/worksheets/sheet{i}.xml", xml)

products = [
    ["P001", "Laptop Pro 14", "Informatique", 525000, 385000],
    ["P002", "Écran 27 pouces", "Informatique", 185000, 132000],
    ["P003", "Imprimante Laser", "Bureautique", 210000, 158000],
    ["P004", "Chaise Ergo", "Mobilier", 145000, 92000],
    ["P005", "Bureau Compact", "Mobilier", 175000, 118000],
    ["P006", "Casque USB", "Accessoires", 35000, 21000],
]
regions = [["R01", "Dakar", "Awa"], ["R02", "Thiès", "Moussa"], ["R03", "Saint-Louis", "Fatou"], ["R04", "Kaolack", "Idrissa"]]
clients = [[f"C{i:03d}", f"Client {i:03d}", ["PME", "Grand compte", "Particulier"][i % 3], regions[i % 4][0]] for i in range(1, 41)]

create_xlsx(OUT / "01_sources_et_referentiels.xlsx", [
    ("Produits", [["code_produit", "produit", "categorie", "prix_unitaire", "cout_unitaire"]] + products),
    ("Regions", [["code_region", "region", "responsable"]] + regions),
    ("Clients", [["code_client", "client", "segment", "code_region"]] + clients),
])

create_xlsx(OUT / "02_modele_donnees.xlsx", [
    ("Dictionnaire", [["table", "colonne", "type", "role"], ["FaitVentes", "date_vente", "Date", "clé date"], ["FaitVentes", "code_produit", "Texte", "clé produit"], ["FaitVentes", "code_client", "Texte", "clé client"], ["FaitVentes", "quantite", "Entier", "mesure additive"], ["FaitVentes", "montant", "Décimal", "mesure additive"], ["DimProduit", "code_produit", "Texte", "clé unique"], ["DimClient", "code_client", "Texte", "clé unique"], ["DimDate", "Date", "Date", "clé unique"]]),
    ("Relations", [["table_un", "colonne_un", "table_plusieurs", "colonne_plusieurs", "cardinalite"], ["DimProduit", "code_produit", "FaitVentes", "code_produit", "1:*"], ["DimClient", "code_client", "FaitVentes", "code_client", "1:*"], ["DimDate", "Date", "FaitVentes", "date_vente", "1:*"]]),
])

create_xlsx(OUT / "03_dax_kpi.xlsx", [
    ("Mesures", [["nom", "expression_dax", "format"], ["CA Total", "SUM(FaitVentes[montant])", "# ##0 FCFA"], ["Quantité", "SUM(FaitVentes[quantite])", "0"], ["Clients actifs", "DISTINCTCOUNT(FaitVentes[code_client])", "0"], ["Marge", "SUM(FaitVentes[marge])", "# ##0 FCFA"], ["Taux de marge", "DIVIDE([Marge],[CA Total])", "0.0%"], ["Panier moyen", "DIVIDE([CA Total],DISTINCTCOUNT(FaitVentes[id_vente]))", "# ##0 FCFA"], ["CA N-1", "CALCULATE([CA Total],SAMEPERIODLASTYEAR(DimDate[Date]))", "# ##0 FCFA"], ["Évolution CA", "DIVIDE([CA Total]-[CA N-1],[CA N-1])", "0.0%"]]),
    ("Objectifs", [["mois", "objectif_ca"]] + [[f"2026-{m:02d}", 9000000 + m * 250000] for m in range(1, 13)]),
])

create_xlsx(OUT / "04_cahier_dashboard.xlsx", [
    ("Pages", [["page", "objectif", "visuels"], ["Synthèse", "Piloter CA, marge, volume et objectif", "Cartes KPI; courbe mensuelle; barres régions"], ["Produits", "Comparer catégories et produits", "Barres; matrice; arbre de décomposition"], ["Clients", "Analyser segments et comptes", "Nuage; tableau détaillé; segments"], ["Détails", "Explorer les transactions", "Table; drill-through"]]),
    ("Controle", [["controle", "attendu"], ["Interactions", "Tous les segments filtrent les visuels utiles"], ["Mobile", "Vue mobile configurée"], ["RLS", "Rôle Région testé"], ["Performance", "Aucun visuel lent dans Analyseur de performances"], ["Documentation", "Sources, actualisation et mesures documentées"]]),
])

headers = ["id_vente", "date_vente", "code_produit", "code_client", "code_region", "quantite", "prix_unitaire", "cout_unitaire", "montant", "marge", "canal"]
start = date(2026, 1, 1)
for month in range(1, 5):
    path = OUT / f"ventes_2026_{month:02d}.csv"
    with path.open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(headers)
        for i in range(1, 31):
            p = products[(i + month) % len(products)]
            client = clients[(i * 3 + month) % len(clients)]
            region = client[3]
            qty = 1 + (i * month) % 6
            amount = qty * p[3]
            margin = qty * (p[3] - p[4])
            d = start + timedelta(days=(month - 1) * 30 + i - 1)
            w.writerow([f"V{month:02d}{i:03d}", d.isoformat(), p[0], client[0], region, qty, p[3], p[4], amount, margin, ["Boutique", "En ligne", "Partenaire"][i % 3]])

print(f"Created {len(list(OUT.iterdir()))} Power BI practice files in {OUT}")
