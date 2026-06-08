import json
import os
import urllib.error
import urllib.request
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.config import settings
from app.database import supabase

router = APIRouter()

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "..", "content")
COHERE_CHAT_URL = "https://api.cohere.com/v2/chat"

SYSTEM_PROMPT = """Tu es un assistant pedagogique expert pour la formation "Analyse de Donnees avec Python" de KORYXA Tech Store.
Tu aides des etudiants debutants a comprendre Python, NumPy, Pandas, Matplotlib et la data analyse.
Reponds toujours en francais, de facon claire, simple et encourageante.
Utilise des exemples concrets. Si tu donnes du code, garde-le minimal et commente.
Ne reponds qu'aux questions liees a la formation ou a la data science."""


def cohere_chat_text(messages: list[dict[str, str]], temperature: float, max_tokens: int) -> str:
    if not settings.COHERE_API_KEY:
        raise HTTPException(status_code=503, detail="Cle API Cohere non configuree.")

    payload = {
        "model": settings.COHERE_MODEL,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }

    request = urllib.request.Request(
        COHERE_CHAT_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {settings.COHERE_API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(
            status_code=502,
            detail=f"Cohere {exc.code}: {extract_cohere_error(body)}",
        ) from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Erreur Cohere: {str(exc)[:300]}") from exc

    try:
        content = data["message"]["content"]
        text = "".join(part.get("text", "") for part in content if part.get("type") == "text")
    except (KeyError, TypeError):
        text = ""

    if not text.strip():
        raise HTTPException(status_code=502, detail="Cohere n'a retourne aucun texte.")
    return text.strip()


def extract_cohere_error(body: str) -> str:
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return body[:500]

    for key in ("message", "detail", "error"):
        value = data.get(key)
        if isinstance(value, str):
            return value[:500]
        if value:
            return json.dumps(value)[:500]
    return body[:500]


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
    context = load_notebook_text(req.module_id)

    system = SYSTEM_PROMPT
    if context:
        system += f"\n\nContenu du module actuel (utilise-le comme reference):\n---\n{context}\n---"

    messages = [{"role": "system", "content": system}]
    for msg in req.history[-10:]:
        if msg.role in {"user", "assistant"}:
            messages.append({"role": msg.role, "content": msg.message})
    messages.append({"role": "user", "content": req.question})

    answer = cohere_chat_text(messages=messages, temperature=0.4, max_tokens=700)
    return {"answer": answer}


class ExplainRequest(BaseModel):
    code: str
    module_title: Optional[str] = ""


@router.post("/explain")
def explain_code(req: ExplainRequest):
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
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=400,
    )

    return {"explanation": explanation}


class QuizRequest(BaseModel):
    module_id: str


@router.post("/quiz")
def generate_quiz(req: QuizRequest):
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
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
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
