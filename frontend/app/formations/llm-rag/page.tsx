"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Cpu,
  Database,
  FileSearch,
  FileText,
  GraduationCap,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  PlayCircle,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { courseRoutes, LLM_RAG_COURSE_SLUG } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

// KORYXA FORMATION - Header autonome pour LLM RAG
const CourseHeader = Header;

const words = [
  "Assistants RAG d'Entreprise",
  "Bases Vectorielles Qdrant",
  "Génération Sourcée & Citations",
  "Défense Anti-Injection de Prompts",
  "Applications Streamlit Professionnelles",
];

const skills = [
  "Architecture RAG",
  "Base Vectorielle Qdrant",
  "Semantic Chunking",
  "Dense Embeddings 768d",
  "Cosine Similarity",
  "Recherche Hybride (Dense + BM25)",
  "FlashRank Reranking",
  "Défense Anti-Injection",
  "Strict Grounding & Citations",
  "Évaluation RAGAS",
  "Interface Streamlit",
  "API FastAPI RAG",
  "Observabilité & Logs",
];

const modulesList = [
  {
    num: "01",
    title: "Fondations des LLMs & Architecture RAG",
    desc: "Fonctionnement des modèles de langage, limites de la fenêtre de contexte, hallucinations et architecture de référence du Retrieval-Augmented Generation.",
    duration: "2h00",
    icon: BrainCircuit,
  },
  {
    num: "02",
    title: "Environnement Professionnel & Stack RAG",
    desc: "Configuration de Python, gestion sécurisée des secrets (.env), installation des bibliothèques (Qdrant, Pydantic, Tiktoken) et bonnes pratiques logicielles.",
    duration: "2h00",
    icon: Code2,
  },
  {
    num: "03",
    title: "Ingestion & Nettoyage de Documents Métier",
    desc: "Chargement de documents PDF, DOCX, Markdown et JSON, extraction de texte brut, nettoyage regex et attachement de métadonnées structurées.",
    duration: "2h30",
    icon: FileSearch,
  },
  {
    num: "04",
    title: "Stratégies de Chunking Sémantique & Tokens",
    desc: "Découpage par tokens, RecursiveCharacterTextSplitter, gestion du chevauchement (overlap) et compromis crucial entre granularité et contexte.",
    duration: "2h30",
    icon: Layers3,
  },
  {
    num: "05",
    title: "Modèles d'Embeddings & Vectorisation Dense",
    desc: "Génération de représentations vectorielles denses (768 dimensions), calcul de similarité cosinus, modèles Sentence-Transformers et traitement par lots.",
    duration: "2h30",
    icon: Network,
  },
  {
    num: "06",
    title: "Indexation & Stockage Vectoriel dans Qdrant",
    desc: "Configuration de la collection Qdrant, distance cosinus, index HNSW, stockage des payloads de métadonnées et filtrage par attributs métier.",
    duration: "3h00",
    icon: Database,
  },
  {
    num: "07",
    title: "Algorithmes de Retrieval & Recherche Hybride",
    desc: "Recherche dense top-k, scoring de pertinence, seuil minimal de confiance (score threshold) et combinaison hybride dense + mots-clés.",
    duration: "3h00",
    icon: SearchCheck,
  },
  {
    num: "08",
    title: "Prompt Engineering RAG, Grounding & Citations",
    desc: "Conception de prompts stricts, obligation de citations formelles [DOC-ID, Section], injection de contexte et rejet explicite des requêtes hors périmètre.",
    duration: "2h30",
    icon: MessageSquareText,
  },
  {
    num: "09",
    title: "Génération Sourcée & Évaluation Métrique (RAGAS)",
    desc: "Pipeline de génération de réponses fidèles, calcul des métriques de fidélité (faithfulness), pertinence des réponses et détection des hallucinations.",
    duration: "3h00",
    icon: Workflow,
  },
  {
    num: "10",
    title: "Interface Interactive Streamlit & Citations Visuelles",
    desc: "Développement d'une interface de chat moderne avec historique de session, indicateurs de confiance et encarts déroulants affichant les sources citées.",
    duration: "2h30",
    icon: Sparkles,
  },
  {
    num: "11",
    title: "Sécurité, Défense Anti-Injection & Observabilité",
    desc: "Détection des tentatives de jailbreak et prompt injection, validation stricte Pydantic, journalisation des requêtes, calcul de latence et quotas.",
    duration: "2h00",
    icon: ShieldCheck,
  },
  {
    num: "12",
    title: "Projet Fil Rouge Capstone d'Entreprise & Déploiement",
    desc: "Intégration complète d'un assistant documentaire d'entreprise sur corpus réel ouest-africain (Finance, RH, Sécurité IT) prêt pour le portfolio technique.",
    duration: "3h00",
    icon: GraduationCap,
  },
];

const outcomes = [
  "Concevoir et déployer une architecture RAG de bout en bout prête pour la production en entreprise",
  "Extraire, nettoyer et découper sémantiquement des documents complexes en préservant le contexte",
  "Vectoriser des corpus et administrer une base de données vectorielle Qdrant haute performance",
  "Mettre en place un système de recherche sémantique hybride avec seuil de similarité strict",
  "Construire des prompts professionnels garantissant zéro hallucination avec citations vérifiables",
  "Protéger le système contre les attaques de prompt injection et déployer une interface Streamlit",
];

const faqs = [
  [
    "Quels sont les prérequis pour suivre cette formation LLM & RAG ?",
    "Une bonne maîtrise du langage Python (structures de données, fonctions, virtualenv) et des notions de base sur les APIs REST. Aucune expertise préalable en intelligence artificielle n'est exigée.",
  ],
  [
    "Ai-je besoin d'un abonnement payant OpenAI ou d'un compte Cloud coûteux ?",
    "Non. Toute la formation est conçue pour fonctionner avec des alternatives 100% locales et gratuites (Qdrant en local/Docker, embeddings Sentence-Transformers open source, Ollama) ainsi qu'avec des APIs cloud pay-as-you-go pour quelques centimes.",
  ],
  [
    "Quelle est la différence entre un simple chatbot et ce système RAG ?",
    "Un chatbot ordinaire hallucine fréquemment et ignore les données privées de votre entreprise. Le système RAG que vous construisez interroge une base documentaire vérifiée, cite précisément ses sources et refuse expressément de répondre s'il ne dispose pas de l'information.",
  ],
  [
    "Comment est validée la certification KORYXA ?",
    "Vous réalisez un projet fil rouge complet noté sur 60 points : ingestion de corpus réel, indexation vectorielle Qdrant, pipeline de recherche, prompt sécurisé anti-injection et interface Streamlit fonctionnelle.",
  ],
];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!deleting && displayed.length < word.length) {
      const timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(timer);
    }
    if (!deleting && displayed.length === word.length) {
      const timer = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(timer);
    }
    if (deleting && displayed.length > 0) {
      const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(timer);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
    }
  }, [deleting, displayed, index]);

  return (
    <span className="text-[#00a86b]">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
        |
      </motion.span>
    </span>
  );
}

function SkillTicker() {
  return (
    <div className="overflow-hidden border-y border-[#dfe5d8] bg-white py-4">
      <motion.div
        className="flex w-max gap-4 whitespace-nowrap"
        animate={{ x: [0, -560] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a86b]" /> {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RagProductStage() {
  const [activeTab, setActiveTab] = useState<"chunk" | "qdrant" | "search" | "grounding">("chunk");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="relative mx-auto mt-12 w-full max-w-5xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 rounded-full bg-red-400" />
            <span className="flex h-3 w-3 rounded-full bg-amber-400" />
            <span className="flex h-3 w-3 rounded-full bg-[#00a86b]" />
            <span className="ml-2 font-mono text-xs font-bold text-slate-500">
              KORYXA RAG Engine • Qdrant &amp; Python Production
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("chunk")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "chunk" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              1. Chunking Sémantique
            </button>
            <button
              onClick={() => setActiveTab("qdrant")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "qdrant" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              2. Indexation Qdrant
            </button>
            <button
              onClick={() => setActiveTab("search")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "search" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              3. Retrieval Hybride
            </button>
            <button
              onClick={() => setActiveTab("grounding")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "grounding" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              4. Réponse Sourcée
            </button>
          </div>
        </div>

        {activeTab === "chunk" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>ingestion_pipeline.py</span>
                <span className="text-[#00a86b]">✓ Validation des Tokens</span>
              </div>
              <pre className="mt-3 leading-relaxed">
{`from langchain_text_splitters import RecursiveCharacterTextSplitter

# Découpage sémantique adapté aux procédures d'entreprise
splitter = RecursiveCharacterTextSplitter(
    chunk_size=450,
    chunk_overlap=80,
    separators=["\\n\\n## ", "\\n\\n", "\\n", ". ", " "]
)

chunks = splitter.create_documents(
    texts=[doc_politique_voyages_texte],
    metadatas=[{
        "doc_id": "POL-FIN-2026-04",
        "division": "Finance",
        "pays": "Côte d'Ivoire & Sénégal",
        "maj": "2026-01-01"
    }]
)
print(f"Indexé : {len(chunks)} fragments validés avec métadonnées.")`}
              </pre>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Corpus Entreprise</p>
                <p className="mt-1 text-2xl font-black text-slate-950">3 Guides</p>
                <p className="mt-1 text-xs text-slate-600">Finance, Sécurité IT, SIRH</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Taille Moyenne Chunk</p>
                <p className="mt-1 text-2xl font-black text-[#00a86b]">114 Tokens</p>
                <p className="mt-1 text-xs text-slate-600">Granularité optimale de recherche</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Chevauchement (Overlap)</p>
                <p className="mt-1 text-2xl font-black text-blue-600">80 Tokens</p>
                <p className="mt-1 text-xs text-slate-600">Zéro rupture de contexte sémantique</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "qdrant" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>qdrant_vector_store.py</span>
                <span className="text-[#00a86b]">✓ Collection Opérationnelle</span>
              </div>
              <pre className="mt-3 leading-relaxed">
{`from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

client = QdrantClient(url="http://localhost:6333")

# Création de la collection vectorielle haute performance
client.recreate_collection(
    collection_name="koryxa_enterprise_docs",
    vectors_config=VectorParams(size=768, distance=Distance.COSINE),
)

# Insertion des points avec vecteurs denses et métadonnées
client.upsert(
    collection_name="koryxa_enterprise_docs",
    points=[
        PointStruct(
            id=point_id,
            vector=embedding_vector,
            payload={
                "doc_id": chunk.metadata["doc_id"],
                "section": chunk.metadata.get("section", "General"),
                "texte": chunk.page_content
            }
        ) for point_id, (chunk, embedding_vector) in enumerate(chunks_avec_embeddings)
    ]
)`}
              </pre>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Dimensions Vecteur</p>
                <p className="mt-1 text-2xl font-black text-slate-950">768 dim</p>
                <p className="mt-1 text-xs text-slate-600">Modèle dense multilingue</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Métrique de Distance</p>
                <p className="mt-1 text-2xl font-black text-[#00a86b]">Cosine</p>
                <p className="mt-1 text-xs text-slate-600">Normalisation géométrique stricte</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Latence Requête</p>
                <p className="mt-1 text-2xl font-black text-emerald-600">&lt; 14 ms</p>
                <p className="mt-1 text-xs text-slate-600">Indexation HNSW accélérée</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "search" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>hybrid_retrieval.py</span>
                <span className="text-[#00a86b]">✓ Top-3 Pertinence Filtrée</span>
              </div>
              <pre className="mt-3 leading-relaxed">
{`# Recherche vectorielle avec seuil strict de similarité
query = "Quel est le montant maximum remboursé par nuit d'hôtel à Abidjan ?"
query_vector = embedder.encode(query)

resultats = client.search(
    collection_name="koryxa_enterprise_docs",
    query_vector=query_vector,
    limit=3,
    score_threshold=0.75  # Rejet systématique des passages non pertinents
)

for hit in resultats:
    print(f"Score: {hit.score:.3f} | Réf: {hit.payload['doc_id']}")
    print(f"Extrait: {hit.payload['texte'][:90]}...")`}
              </pre>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00a86b] font-bold text-white">#1</span>
                  <div>
                    <p className="font-bold text-slate-900">POL-FIN-2026-04 • Art. 2 Plafonds Hôteliers Abidjan &amp; Dakar</p>
                    <p className="text-slate-600 mt-0.5">&quot;Zone 1 - Métropoles Principales : 85 000 FCFA TTC par nuitée avec petit-déjeuner...&quot;</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#008b58] bg-white px-2.5 py-1 rounded-md border border-emerald-200">Score : 0.924</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-300 font-bold text-slate-700">#2</span>
                  <div>
                    <p className="font-bold text-slate-900">POL-FIN-2026-04 • Art. 3 Indemnité Journalière de Repas (Per Diem)</p>
                    <p className="text-slate-600 mt-0.5">&quot;Forfait complet journalier repas : 25 000 FCFA / jour calendaire de mission...&quot;</p>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">Score : 0.812</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "grounding" && (
          <div className="mt-6 space-y-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-[#00a86b]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Réponse Assistante KORYXA AI</span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#00a86b]/15 px-3 py-1 text-[11px] font-bold text-[#008b58]">
                  <ShieldCheck size={13} /> 100% Sourcé • 0 Hallucination
                </span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-800 leading-relaxed">
                <p>
                  Selon la politique interne en vigueur{" "}
                  <strong className="text-slate-950 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                    [Réf: POL-FIN-2026-04, Art. 2]
                  </strong>
                  , le plafond maximal de remboursement par nuitée d&apos;hôtel à Abidjan (classée en Zone 1) est fixé à{" "}
                  <strong className="text-[#008b58] font-bold">85 000 FCFA TTC</strong> (chambre standard avec petit-déjeuner inclus).
                </p>
                <p className="text-xs text-slate-600">
                  Tout dépassement exceptionnel doit impérativement faire l&apos;objet d&apos;un accord préalable écrit du Directeur Administratif et Financier (DAF).
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-emerald-200 bg-white p-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Source Documentaire Citée</p>
                <p className="mt-1 text-xs font-semibold text-slate-900">
                  Document : Politique des Missions et Notes de Frais KORYXA Holding (Date d&apos;effet : 01/01/2026)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LlmRagLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <CourseHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-xs"
          >
            <Sparkles size={14} className="text-[#00a86b]" /> Parcours Professionnel • LLM &amp; RAG Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.08]"
          >
            Maîtrisez les LLMs et bâtissez des <br className="hidden sm:inline" />
            <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600"
          >
            Passez des simples prompts à la conception d&apos;un véritable assistant d&apos;entreprise souverain : chunking sémantique, bases vectorielles Qdrant, génération sourcée avec citations et interface Streamlit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug={LLM_RAG_COURSE_SLUG}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
            >
              Rejoindre la formation • 49 000 FCFA <ArrowRight size={16} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-xs transition hover:bg-[#faf9f5]"
            >
              <PlayCircle size={16} /> Découvrir les 12 modules
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat et à vie
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={15} className="text-amber-500 fill-amber-500" /> Tarif unique 49 000 FCFA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#00a86b]" /> Certificat KORYXA inclus
            </span>
          </div>

          {/* Interactive Cockpit */}
          <RagProductStage />
        </div>
      </section>

      {/* Infinite Skill Ticker */}
      <SkillTicker />

      {/* Enterprise Fil Rouge Narrative */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Cas Réel d&apos;Entreprise • Fil Rouge
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              L&apos;IA en entreprise n&apos;est utile que lorsqu&apos;elle est 100% vérifiable.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Fini les chatbots génériques qui inventent des réponses. Construisez le système documentaire interne d&apos;un groupe opérant à Abidjan, Dakar et Douala.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Des documents internes cruciaux",
                text: "Politiques de notes de frais en FCFA, charte de sécurité informatique et conventions RH : le RAG indexe des données d'entreprise réelles et confidentielles.",
                icon: Database,
                badge: "Enjeu 01",
              },
              {
                title: "Citations obligatoires & Zéro Hallucination",
                text: "Chaque réponse de l'assistant doit obligatoirement citer la clause exacte [Doc-ID, Art. X] et refuser de répondre si l'information n'est pas sourcée.",
                icon: ShieldCheck,
                badge: "Enjeu 02",
              },
              {
                title: "Défense Anti-Injection & Streamlit",
                text: "Protection contre les tentatives de détournement de consignes (jailbreak), journalisation et déploiement d'une interface de chat conviviale pour les salariés.",
                icon: ShieldAlert,
                badge: "Enjeu 03",
              },
            ].map(({ title, text, icon: Icon, badge }) => (
              <article
                key={title}
                className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 sm:p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <Icon size={22} />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#008b58]">{badge}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Key Deliverables Matrix */}
          <div className="mt-12 rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-slate-950 text-center">Ce que vous construisez concrètement</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-[#dfe5d8] bg-white p-4">
                  <CheckCircle2 size={18} className="shrink-0 text-[#00a86b] mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum 12 Modules */}
      <section id="programme" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-xs">
              <Layers3 size={14} /> Curriculum Pédagogique Complet
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 Modules pratiques du corpus brut à la production.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Une progression rigoureuse avec notebooks téléchargeables, code source commenté et tests unitaires pour chaque étape.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulesList.map(({ num, title, desc, duration, icon: Icon }) => (
              <article
                key={num}
                className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-xs transition hover:border-[#00a86b]/50 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf9f5] border border-[#dfe5d8] text-[#008b58] shadow-xs group-hover:bg-[#00a86b]/10">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-emerald-200 bg-[#faf9f5] px-3 py-1 text-xs font-bold text-[#008b58]">
                      {duration}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#008b58]">Module {num}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Questions Fréquentes
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Tout ce que vous devez savoir avant de débuter
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map(([q, a], idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={q} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-900 transition hover:text-[#008b58]"
                  >
                    <span>{q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600 border-t border-[#dfe5d8] pt-4">
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="prix" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-xs">
            Tarif Officiel &amp; Accès Immédiat
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Devenez le développeur IA que les entreprises s&apos;arrachent.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Maîtrisez la technologie la plus demandée du moment et livrez des assistants RAG prêts pour la production.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Tarif d&apos;accès complet</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-black text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">79 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Accès à vie garanti • Mises à jour continues incluses</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules structurés avec notebooks téléchargeables",
                "Corpus d'entreprise réaliste (Finance, RH, Sécurité IT)",
                "Stack de production : Python, Qdrant, Streamlit, RAGAS",
                "Projet capstone portfolio vérifié et certifiant",
                "Certificat d'achèvement officiel KORYXA inclus",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug={LLM_RAG_COURSE_SLUG}
                className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
              >
                S&apos;inscrire à la formation • 49 000 FCFA <ArrowRight size={16} />
              </PurchaseCourseLink>
              <Link
                href={courseRoutes.access(LLM_RAG_COURSE_SLUG)}
                className="mt-4 inline-block text-xs font-semibold text-slate-500 hover:text-[#008b58] transition-colors"
              >
                Déjà inscrit ? Accéder à la formation →
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Paiement instantané et sécurisé par Mobile Money (Wave, Orange, MTN, Moov) ou Carte Bancaire
            </p>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
