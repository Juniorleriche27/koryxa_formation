import json
import os
from typing import Optional

import cohere
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import settings
from app.database import supabase

router = APIRouter()

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "..", "content")

SYSTEM_PROMPT = """Tu es un assistant pedagogique expert pour la formation "Analyse de Donnees avec Python" de KORYXA Tech Store.
Tu aides des etudiants debutants a comprendre Python, NumPy, Pandas, Matplotlib et la data analyse.
Reponds toujours en francais, de facon claire, simple et encourageante.
Utilise des exemples concrets. Si tu donnes du code, garde-le minimal et commente.
Ne reponds qu'aux questions liees a la formation ou a la data science."""


def get_cohere_client() -> cohere.Client:
    if not settings.COHERE_API_KEY:
        raise HTTPException(status_code=503, detail="Cle API Cohere non configuree.")
    return cohere.Client(settings.COHERE_API_KEY)


def cohere_chat_text(
    co: cohere.Client,
    prompt: str,
    system: str,
    temperature: float,
    max_tokens: int,
) -> str:
    try:
        response = co.chat(
            model="command-r",
            preamble=system,
            message=prompt,
            temperature=temperature,
            max_tokens=max_tokens,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Erreur Cohere: {str(exc)[:300]}") from exc

    text = getattr(response, "text", "")
    if not text:
        raise HTTPException(status_code=502, detail="Cohere n'a retourne aucun texte.")
    return text.strip()


def load_notebook_text(module_id: str, max_chars: int = 8000) -> str:
    result = supabase.table("modules").select("notebook_path, title").eq("id", module_id).single().execute()
    if not result.data or not result.data.get("notebook_path"):
        return ""
    path = os.path.join(CONTENT_DIR, result.data["notebook_path"])
    if not os.path.exists(path):
        return ""
    with open(path, encoding="utf-8") as f:
        nb = json.load(f)
    parts = []
    for cell in nb.get("cells", []):
        source = "".join(cell.get("source", []))
        if source.strip():
            parts.append(source)
    return "\n\n".join(parts)[:max_chars]


class ChatMessage(BaseModel):
    role: str
    message: str


class ChatRequest(BaseModel):
    module_id: str
    question: str
    history: list[ChatMessage] = []


@router.post("/chat")
def chat(req: ChatRequest):
    co = get_cohere_client()
    context = load_notebook_text(req.module_id)

    system = SYSTEM_PROMPT
    if context:
        system += f"\n\nContenu du module actuel (utilise-le comme reference):\n---\n{context}\n---"

    history = [
        {"role": msg.role, "message": msg.message}
        for msg in req.history[-10:]
    ]

    try:
        response = co.chat(
            model="command-r",
            preamble=system,
            chat_history=history,
            message=req.question,
            temperature=0.4,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Erreur Cohere: {str(exc)[:300]}") from exc

    return {"answer": response.text}


class ExplainRequest(BaseModel):
    code: str
    module_title: Optional[str] = ""


@router.post("/explain")
def explain_code(req: ExplainRequest):
    co = get_cohere_client()

    system = """Tu es un professeur Python bienveillant.
Explique le code a un debutant complet, en francais.
Sois simple, clair, et explique chaque ligne importante. Maximum 200 mots."""

    prompt = f"""{f"Contexte : ce code vient du module '{req.module_title}'." if req.module_title else ""}

Code a expliquer:
```python
{req.code[:3000]}
```

Explication:"""

    explanation = cohere_chat_text(
        co=co,
        prompt=prompt,
        system=system,
        temperature=0.3,
        max_tokens=400,
    )

    return {"explanation": explanation}


class QuizRequest(BaseModel):
    module_id: str


@router.post("/quiz")
def generate_quiz(req: QuizRequest):
    co = get_cohere_client()
    context = load_notebook_text(req.module_id, max_chars=6000)

    if not context:
        raise HTTPException(status_code=404, detail="Contenu du module introuvable.")

    system = """Tu es un createur de quiz pedagogique.
Tu reponds uniquement avec un JSON valide, sans texte avant ni apres."""

    prompt = f"""Genere exactement 5 questions QCM en francais basees sur ce contenu de cours Python.

Contenu du cours:
---
{context}
---

Format JSON exact:
{{
  "questions": [
    {{
      "question": "La question ici ?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "answer": "A"
    }}
  ]
}}

Les questions doivent tester la comprehension reelle. La bonne reponse doit etre dans "answer" (A, B, C ou D)."""

    raw = cohere_chat_text(
        co=co,
        prompt=prompt,
        system=system,
        temperature=0.2,
        max_tokens=1200,
    )

    start = raw.find("{")
    end = raw.rfind("}") + 1
    if start == -1 or end == 0:
        raise HTTPException(status_code=500, detail="Impossible de generer le quiz.")

    try:
        quiz = json.loads(raw[start:end])
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Format de quiz invalide.")

    return quiz
