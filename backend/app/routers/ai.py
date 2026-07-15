import json
import os
import random
import urllib.error
import urllib.request
import zipfile
from typing import Optional
import xml.etree.ElementTree as ET

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


def cohere_chat_text(
    messages: list[dict[str, str]],
    temperature: float,
    max_tokens: int,
    timeout_seconds: int = 20,
) -> str:
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
        with urllib.request.urlopen(request, timeout=timeout_seconds) as response:
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



def load_module_context(module_id: str, max_chars: int = 24000) -> tuple[dict, str]:
    module_result = supabase.table("modules").select("*").eq("id", module_id).single().execute()
    module = module_result.data or {}
    if not module:
        return {}, ""

    resources_result = supabase.table("resources").select("*").eq("module_id", module_id).order("order_index").execute()
    resources = resources_result.data or []

    parts = [
        f"Titre du module: {module.get('title', '')}",
        f"Description: {module.get('description', '')}",
        f"Ordre: {module.get('order_index', '')}",
    ]

    if resources:
        parts.append("Ressources du module:")
        for resource in resources:
            parts.append(
                f"- {resource.get('type', 'ressource')}: {resource.get('title', '')}. "
                f"{resource.get('description', '')}"
            )

    content_text = load_content_file_text(module)
    if content_text:
        parts.append("Contenu pedagogique:")
        parts.append(content_text)

    return module, "\n\n".join(part for part in parts if part).strip()[:max_chars]


def load_content_file_text(module: dict, max_chars: int = 22000) -> str:
    content_path = get_module_content_path(module)
    if not content_path or not os.path.exists(content_path):
        return ""

    if content_path.endswith(".ipynb"):
        return load_notebook_file_text(content_path, max_chars=max_chars)
    if content_path.endswith(".docx"):
        return load_docx_text(content_path, max_chars=max_chars)
    return ""


def get_module_content_path(module: dict) -> str:
    notebook_path = module.get("notebook_path")
    if notebook_path:
        return os.path.join(CONTENT_DIR, notebook_path)

    if module.get("order_index") == 0:
        return os.path.join(CONTENT_DIR, "MODULE_0_Introduction_Installation.docx")

    return ""


def load_notebook_file_text(path: str, max_chars: int) -> str:
    with open(path, encoding="utf-8") as f:
        nb = json.load(f)
    parts = []
    for cell in nb.get("cells", []):
        source = "".join(cell.get("source", []))
        if source.strip():
            parts.append(source)
    return "\n\n".join(parts)[:max_chars]


def load_docx_text(path: str, max_chars: int) -> str:
    try:
        with zipfile.ZipFile(path) as docx:
            xml = docx.read("word/document.xml")
    except (KeyError, OSError, zipfile.BadZipFile):
        return ""

    root = ET.fromstring(xml)
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs = []
    for paragraph in root.findall(".//w:p", namespace):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", namespace)).strip()
        if text:
            paragraphs.append(text)
    return "\n".join(paragraphs)[:max_chars]


class ChatMessage(BaseModel):
    role: str
    message: str


class ChatRequest(BaseModel):
    module_id: str
    question: str
    history: list[ChatMessage] = []


@router.post("/chat")
def chat(req: ChatRequest):
    _, context = load_module_context(req.module_id, max_chars=8000)

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
        timeout_seconds=45,
    )

    return {"explanation": explanation}


class QuizRequest(BaseModel):
    module_id: str


@router.post("/quiz")
def generate_quiz(req: QuizRequest):
    response = (
        supabase.table("quiz_questions")
        .select("question, options, answer, difficulty, skill, explanation, order_index")
        .eq("module_id", req.module_id)
        .eq("is_active", True)
        .order("order_index")
        .execute()
    )

    questions = response.data or []
    if not questions:
        raise HTTPException(status_code=404, detail="Aucun QCM prepare pour ce module.")

    rng = random.SystemRandom()
    rng.shuffle(questions)

    return {
        "source": "prepared",
        "total": len(questions),
        "questions": [
            {
                "question": question["question"],
                "options": question["options"],
                "answer": question["answer"],
                "difficulty": question.get("difficulty"),
                "skill": question.get("skill"),
                "explanation": question.get("explanation"),
            }
            for question in questions
        ],
    }
