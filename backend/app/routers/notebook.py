import json
import os
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from app.database import supabase

router = APIRouter()

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "..", "content")

PYTHON_DATA_ANALYST_NOTEBOOKS = {
    1: "MODULE_1_Bases_Python_Data.ipynb",
    2: "MODULE_2_NumPy_Calcul_Numerique.ipynb",
    3: "MODULE_3_Pandas_Manipulation_Donnees.ipynb",
    4: "MODULE_4_Nettoyage_Donnees.ipynb",
    5: "MODULE_5_Visualisation_Donnees.ipynb",
    6: "MODULE_6_Analyse_Exploratoire_EDA.ipynb",
    7: "MODULE_7_Projet_Final_Professionnel.ipynb",
}


def get_notebook_path(module_id: str) -> str:
    result = (
        supabase.table("modules")
        .select("notebook_path,order_index,course_id")
        .eq("id", module_id)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module introuvable.")

    relative_path = result.data.get("notebook_path")
    if not relative_path:
        course = (
            supabase.table("courses")
            .select("slug")
            .eq("id", result.data.get("course_id"))
            .single()
            .execute()
        )
        if course.data and course.data.get("slug") == "python-data-analyst":
            relative_path = PYTHON_DATA_ANALYST_NOTEBOOKS.get(result.data.get("order_index"))

    if not relative_path:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aucun notebook pour ce module.")
    path = os.path.realpath(os.path.join(CONTENT_DIR, relative_path))
    content_root = os.path.realpath(CONTENT_DIR)
    if not path.startswith(content_root + os.sep):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Chemin de notebook invalide.")
    if not path.endswith(".ipynb"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Format de notebook non autorisé.")
    if not os.path.exists(path):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Fichier notebook introuvable.")
    return path


@router.get("/{module_id}/notebook")
def get_notebook_content(module_id: str):
    """Retourne les cellules du notebook pour affichage dans le navigateur."""
    path = get_notebook_path(module_id)

    with open(path, encoding="utf-8") as f:
        nb = json.load(f)

    cells = []
    for cell in nb.get("cells", []):
        cell_type = cell.get("cell_type")
        source    = "".join(cell.get("source", []))

        outputs = []
        for out in cell.get("outputs", []):
            if out.get("output_type") in ("display_data", "execute_result"):
                data = out.get("data", {})
                if "image/png" in data:
                    outputs.append({"type": "image", "data": data["image/png"]})
                elif "text/html" in data:
                    outputs.append({"type": "html", "data": "".join(data["text/html"])})
                elif "text/plain" in data:
                    outputs.append({"type": "text", "data": "".join(data["text/plain"])})
            elif out.get("output_type") == "stream":
                outputs.append({"type": "text", "data": "".join(out.get("text", []))})

        cells.append({"cell_type": cell_type, "source": source, "outputs": outputs})

    return {"cells": cells, "total": len(cells)}


@router.get("/{module_id}/download")
def download_notebook(module_id: str):
    """Télécharge le fichier .ipynb original."""
    path = get_notebook_path(module_id)
    filename = os.path.basename(path)
    return FileResponse(
        path=path,
        media_type="application/octet-stream",
        filename=filename,
    )
