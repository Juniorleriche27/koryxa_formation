from datetime import datetime
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.sax.saxutils import escape
import csv

OUT = Path(__file__).resolve().parents[1] / "frontend/public/resources/excel-data-analyst"
OUT.mkdir(parents=True, exist_ok=True)

CONTENT_TYPES = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
{sheet_overrides}
</Types>'''
ROOT_RELS = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'''
STYLES = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="16"/><name val="Calibri"/></font><font><b/><color rgb="FF06251C"/><sz val="11"/><name val="Calibri"/></font></fonts>
<fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF06251C"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FF00BD72"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="2"><border/><border><left/><right/><top/><bottom style="thin"><color rgb="FF0F5132"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="5"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="14" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs>
<numFmts count="1"><numFmt numFmtId="164" formatCode="# ##0 &quot;FCFA&quot;"/></numFmts>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>'''

def col_name(n):
    value = ""
    while n:
        n, r = divmod(n - 1, 26)
        value = chr(65 + r) + value
    return value

def cell_xml(row, col, value, style=0, formula=None):
    ref = f"{col_name(col)}{row}"
    if formula is not None:
        return f'<c r="{ref}" s="{style}"><f>{escape(formula)}</f><v>0</v></c>'
    if value is None:
        return f'<c r="{ref}" s="{style}"/>'
    if isinstance(value, (int, float)):
        return f'<c r="{ref}" s="{style}"><v>{value}</v></c>'
    if isinstance(value, datetime):
        serial = (value - datetime(1899, 12, 30)).days
        return f'<c r="{ref}" s="3"><v>{serial}</v></c>'
    return f'<c r="{ref}" s="{style}" t="inlineStr"><is><t>{escape(str(value))}</t></is></c>'

def sheet_xml(rows, merges=None, widths=None, formulas=None):
    formulas = formulas or {}
    row_xml = []
    for ridx, row in enumerate(rows, 1):
        cells = []
        for cidx, value in enumerate(row, 1):
            style = 1 if ridx == 1 else 2 if ridx == 3 else 0
            cells.append(cell_xml(ridx, cidx, value, style, formulas.get((ridx, cidx))))
        row_xml.append(f'<row r="{ridx}"{(" ht=\"30\" customHeight=\"1\"" if ridx == 1 else "")}>{"".join(cells)}</row>')
    cols = ""
    if widths:
        cols = '<cols>' + ''.join(f'<col min="{i}" max="{i}" width="{w}" customWidth="1"/>' for i,w in enumerate(widths,1)) + '</cols>'
    merge_xml = ""
    if merges:
        merge_xml = f'<mergeCells count="{len(merges)}">' + ''.join(f'<mergeCell ref="{m}"/>' for m in merges) + '</mergeCells>'
    max_col = max(len(r) for r in rows)
    return f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><dimension ref="A1:{col_name(max_col)}{len(rows)}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="3" topLeftCell="A4" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/>{cols}<sheetData>{''.join(row_xml)}</sheetData>{merge_xml}</worksheet>'''

def create_xlsx(path, sheets):
    sheet_tags=[]; rels=[]; overrides=[]
    for i,(name,_,_,_,_) in enumerate(sheets,1):
        sheet_tags.append(f'<sheet name="{escape(name)}" sheetId="{i}" r:id="rId{i}"/>')
        rels.append(f'<Relationship Id="rId{i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i}.xml"/>')
        overrides.append(f'<Override PartName="/xl/worksheets/sheet{i}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>')
    rels.append(f'<Relationship Id="rId{len(sheets)+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>')
    workbook=f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>{''.join(sheet_tags)}</sheets><calcPr calcId="191029" fullCalcOnLoad="1" forceFullCalc="1"/></workbook>'''
    workbook_rels=f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">{''.join(rels)}</Relationships>'''
    with ZipFile(path,"w",ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml",CONTENT_TYPES.format(sheet_overrides=''.join(overrides)))
        z.writestr("_rels/.rels",ROOT_RELS); z.writestr("xl/workbook.xml",workbook); z.writestr("xl/_rels/workbook.xml.rels",workbook_rels); z.writestr("xl/styles.xml",STYLES)
        for i,(_,rows,merges,widths,formulas) in enumerate(sheets,1): z.writestr(f"xl/worksheets/sheet{i}.xml",sheet_xml(rows,merges,widths,formulas))

fund=[
["KORYXA — Excel Data Analyst — Fondamentaux"]+[None]*12,
[None]*13,
["Date","Référence","Produit","Région","Commercial","Quantité","Prix unitaire","Remise","CA brut","CA net",None,"Paramètre","Valeur"],
[datetime(2026,1,3),"V-001","Clavier","Nord","Awa",3,18000,.05,None,None,None,"Taux TVA",.18],
[datetime(2026,1,4),"V-002","Souris","Sud","Moussa",8,9000,0,None,None,None,"Objectif mensuel",700000],
[datetime(2026,1,6),"V-003","Écran","Ouest","Fatou",2,145000,.1,None,None,None,"Total CA net",None],
[datetime(2026,1,8),"V-004","Clavier","Nord","Awa",5,18000,.05,None,None,None,"Écart objectif",None],
[datetime(2026,1,11),"V-005","Dock USB-C","Centre","Idrissa",4,32000,0,None,None,None,"Statut",None],
[datetime(2026,1,13),"V-006","Souris","Sud","Moussa",10,9000,.03,None,None],
[datetime(2026,1,14),"V-007","Écran","Ouest","Fatou",1,145000,0,None,None],
[datetime(2026,1,17),"V-008","Casque","Centre","Idrissa",6,24000,.05,None,None],]
formulas={}
for r in range(4,12): formulas[(r,9)]=f"F{r}*G{r}"; formulas[(r,10)]=f"I{r}*(1-H{r})"
formulas[(6,13)]="SUM(J4:J11)"; formulas[(7,13)]="M6-M5"; formulas[(8,13)]='IF(M6>=M5,"Objectif atteint","À renforcer")'
create_xlsx(OUT/"01_fondamentaux_formules.xlsx",[("Ventes",fund,["A1:M1"],[12,12,18,12,14,10,14,10,14,14,3,20,18],formulas)])

sales=[["KORYXA — Recherches et KPI"]+[None]*6,[None]*7,["Code produit","Date","Région","Commercial","Quantité","Prix","CA"],["P001",datetime(2026,2,1),"Nord","Awa",4,None,None],["P003",datetime(2026,2,2),"Sud","Moussa",2,None,None],["P002",datetime(2026,2,4),"Nord","Awa",8,None,None],["P004",datetime(2026,2,5),"Centre","Idrissa",3,None,None],["P999",datetime(2026,2,7),"Ouest","Fatou",1,None,None],["P001",datetime(2026,2,9),"Sud","Moussa",5,None,None]]
products=[["Référentiel produits"]+[None]*3,[None]*4,["Code","Produit","Prix","Catégorie"],["P001","Clavier",18000,"Accessoires"],["P002","Souris",9000,"Accessoires"],["P003","Écran",145000,"Équipement"],["P004","Dock USB-C",32000,"Accessoires"],["P005","Casque",24000,"Audio"]]
kpi=[["Synthèse KPI",None],[None,None],["Indicateur","Valeur"],["CA total",None],["Nombre de ventes",None],["Panier moyen",None],["Ventes Nord",None],["CA Nord",None]]
f={}
for r in range(4,10): f[(r,6)]=f'XLOOKUP(A{r},Produits!A$4:A$8,Produits!C$4:C$8,"Code inconnu")'; f[(r,7)]=f"IFERROR(E{r}*F{r},0)"
kf={(4,2):"SUM(Ventes!G4:G9)",(5,2):'COUNTIF(Ventes!G4:G9,">0")',(6,2):"IFERROR(B4/B5,0)",(7,2):'COUNTIF(Ventes!C4:C9,"Nord")',(8,2):'SUMIF(Ventes!C4:C9,"Nord",Ventes!G4:G9)'}
create_xlsx(OUT/"02_recherches_et_kpi.xlsx",[("Ventes",sales,["A1:G1"],[14,12,12,14,10,16,16],f),("Produits",products,["A1:D1"],[12,18,16,16],{}),("KPI",kpi,["A1:B1"],[24,18],kf)])

regions=["Nord","Sud","Centre","Ouest"]; products2=["Clavier","Souris","Écran","Dock USB-C"]; commercials=["Awa","Moussa","Idrissa","Fatou"]; channels=["Boutique","En ligne","Partenaire"]
data=[["KORYXA — Source TCD et visualisation"]+[None]*7,[None]*8,["Date","Région","Produit","Commercial","Canal","Quantité","CA","Marge"]]
for i in range(36):
    q=1+(i*5)%9; price=[18000,9000,145000,32000][i%4]; ca=q*price
    data.append([datetime(2026,1+i%6,1+(i*3)%27),regions[i%4],products2[i%4],commercials[i%4],channels[i%3],q,ca,round(ca*(.18+.02*(i%4)),2)])
guide=[["Consigne — TCD et graphique",None],[None,None],["Étape","Action"],["1","Créer un tableau croisé dynamique à partir de Données."],["2","Placer Région en lignes et CA en valeurs."],["3","Ajouter Produit en colonnes."],["4","Regrouper Date par mois."],["5","Ajouter un segment Commercial."],["6","Créer une courbe du CA mensuel."],["7","Rédiger un titre déclaratif."]]
create_xlsx(OUT/"03_tcd_et_visualisation.xlsx",[("Données",data,["A1:H1"],[12,12,18,14,14,10,16,16],{}),("Guide",guide,["A1:B1"],[10,58],{})])

refs=[["KORYXA — Power Query, modèle et dashboard"]+[None]*5,[None]*6,["Code produit","Produit","Catégorie",None,"Code région","Région"],["P001","Clavier","Accessoires",None,"N","Nord"],["P002","Souris","Accessoires",None,"S","Sud"],["P003","Écran","Équipement",None,"C","Centre"],["P004","Dock USB-C","Accessoires",None,"O","Ouest"],["P005","Casque","Audio"]]
instructions=[["Projet de préparation des données",None],[None,None],["Étape","Travail attendu"],["1","Importer les fichiers CSV mensuels depuis un dossier."],["2","Promouvoir les en-têtes et définir les types."],["3","Supprimer les lignes vides et corriger les catégories."],["4","Fusionner avec le référentiel produits."],["5","Fusionner avec le référentiel régions."],["6","Créer les colonnes CA et Marge."],["7","Charger dans le modèle de données."],["8","Créer DimDate et les relations."],["9","Construire les mesures CA, Marge et Taux de marge."]]
create_xlsx(OUT/"04_power_query_modele_dashboard.xlsx",[("Référentiels",refs,["A1:F1"],[16,18,18,3,16,14],{}),("Instructions",instructions,["A1:B1"],[10,64],{})])

prices={"P001":18000,"P002":9000,"P003":145000,"P004":32000,"P005":24000}
for month in range(1,5):
    with (OUT/f"ventes_2026_{month:02d}.csv").open("w",newline="",encoding="utf-8-sig") as f:
        w=csv.writer(f,delimiter=";"); w.writerow(["date","code_produit","code_region","commercial","quantite","prix_unitaire","cout_unitaire"])
        for x in range(12):
            code=list(prices)[x%5]; price=prices[code]
            w.writerow([f"2026-{month:02d}-{1+(x*2)%27:02d}",code,["N","S","C","O"][x%4],["Awa","Moussa","Idrissa","Fatou"][x%4],1+(x*month)%9,price,int(price*(.68+.03*(x%3)))])

print(f"Created {len(list(OUT.iterdir()))} practice files")
