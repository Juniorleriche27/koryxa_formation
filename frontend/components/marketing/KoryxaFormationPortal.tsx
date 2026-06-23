"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Database,
  FileText,
  GraduationCap,
  Layers3,
  LineChart,
  Menu,
  MousePointerClick,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Formations", href: "#formations" },
  { label: "Méthode", href: "#methode" },
  { label: "Plateforme", href: "#plateforme" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "FAQ", href: "#faq" },
];

const proofItems = [
  { label: "Parcours guidés", icon: BookOpenCheck },
  { label: "Projets réels", icon: Code2 },
  { label: "Certificat", icon: Award },
  { label: "Plateforme apprenant", icon: ShieldCheck },
];

const formations = [
  {
    title: "Analyse de données avec Python",
    label: "Disponible",
    statusTone: "emerald",
    href: "/formations/python-data-analyst",
    cta: "Voir le parcours",
    price: "29 000 FCFA",
    icon: BarChart3,
    description:
      "Apprenez Python, Pandas, NumPy, le nettoyage de données, la visualisation et l’analyse exploratoire avec un projet final portfolio.",
    chips: ["Python", "Pandas", "NumPy", "EDA", "Portfolio", "Certificat"],
  },
  {
    title: "LLM/RAG Chatbot IA",
    label: "En préparation avancée",
    statusTone: "cyan",
    href: "#roadmap",
    cta: "Voir le programme prévu",
    price: null,
    icon: BrainCircuit,
    description:
      "Construisez un chatbot capable de répondre à partir de documents contrôlés avec embeddings, base vectorielle, recherche sémantique et LLM.",
    chips: ["LLM", "RAG", "Qdrant", "Embeddings", "Streamlit", "Chatbot IA"],
  },
  {
    title: "Assistant IA pour métier",
    label: "Roadmap",
    statusTone: "slate",
    href: "#roadmap",
    cta: "En préparation",
    price: null,
    icon: Bot,
    description:
      "Apprenez à utiliser l’IA pour écrire, vendre, organiser, synthétiser et produire plus vite dans un contexte professionnel.",
    chips: ["Prompts", "Cas métier", "Productivité"],
  },
  {
    title: "Automatisation IA & no-code",
    label: "Roadmap",
    statusTone: "slate",
    href: "#roadmap",
    cta: "En préparation",
    price: null,
    icon: Workflow,
    description:
      "Construisez des workflows simples pour automatiser les tâches répétitives et structurer des opérations avec des outils IA.",
    chips: ["Workflows", "No-code", "Opérations"],
  },
];

const methodSteps = [
  {
    title: "Apprendre",
    description: "Comprendre les notions essentielles avec des modules structurés et progressifs.",
    icon: GraduationCap,
  },
  {
    title: "Pratiquer",
    description: "Manipuler des notebooks, des exercices et des cas guidés pour ancrer la compétence.",
    icon: MousePointerClick,
  },
  {
    title: "Produire",
    description: "Construire un livrable complet : analyse, chatbot, automatisation ou projet métier.",
    icon: Layers3,
  },
  {
    title: "Prouver",
    description: "Finaliser un résultat visible que l’on peut présenter, expliquer ou réutiliser.",
    icon: Award,
  },
];

const audiences = [
  { title: "Étudiants", description: "Construire des bases solides et un projet présentable.", icon: GraduationCap },
  { title: "Professionnels", description: "Comprendre les outils IA, data ou automatisation pour gagner en efficacité.", icon: BriefcaseBusiness },
  { title: "Entrepreneurs", description: "Automatiser, analyser et structurer des opérations plus vite.", icon: TrendingUp },
  { title: "Profils techniques", description: "Construire des projets IA plus propres, mieux organisés et plus utiles.", icon: Code2 },
];

const faqs = [
  {
    question: "Quelle formation est disponible aujourd’hui ?",
    answer:
      "La formation Analyse de données avec Python est le parcours principal actuellement disponible. Elle couvre Python, Pandas, NumPy, la visualisation, l’analyse exploratoire et un projet final portfolio.",
  },
  {
    question: "Les formations LLM/RAG, Assistant IA et Automatisation sont-elles déjà ouvertes ?",
    answer:
      "Non. Ces parcours sont en préparation ou en roadmap. Ils ne doivent pas être considérés comme ouverts à l’achat tant que leur offre, leur landing dédiée et leur tunnel d’accès ne sont pas validés.",
  },
  {
    question: "Est-ce adapté aux débutants ?",
    answer:
      "Oui, selon le parcours. La formation Python Data Analyst démarre progressivement et accompagne l’apprenant vers des notebooks, des exercices et un projet final.",
  },
  {
    question: "Est-ce seulement une plateforme de vidéos ?",
    answer:
      "Non. L’objectif de KORYXA Formation est de guider l’apprenant vers une pratique réelle, avec modules, exercices, ressources, projet final et preuve de compétence.",
  },
  {
    question: "Comment fonctionne l’accès aux formations ?",
    answer:
      "L’accès dépend du parcours et du tunnel actif. Certaines entrées passent par la page d’accès Formation, et les accès partenaires peuvent être attribués via l’écosystème KORYXA Admin et Partner Portal.",
  },
  {
    question: "Les partenaires ont-ils un espace dédié ?",
    answer:
      "Oui. Les partenaires KORYXA utilisent un espace dédié pour suivre leurs liens, prospects, ressources marketing et commissions sur les produits publiés.",
  },
];

function SectionEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] ${
        dark
          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {children}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="KORYXA Formation accueil">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-950/10">K</span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-tight text-slate-950 sm:text-base">KORYXA Formation</span>
            <span className="block text-[0.7rem] font-semibold text-slate-500 sm:text-xs">IA · Data · Automatisation</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-slate-950">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/formations/python-data-analyst" className="inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600">
            Voir le parcours
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-sm lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl shadow-slate-950/5 lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-slate-950">
                  {item.label}
                </a>
              ))}
              <Link href="/formations/python-data-analyst" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
                Voir Python Data Analyst
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroLearningVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      aria-label="Aperçu visuel de l'expérience KORYXA Formation"
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-200/60 via-cyan-200/30 to-lime-200/50 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl shadow-slate-950/15 sm:rounded-[2.5rem] sm:p-4">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#101827] p-5 text-white sm:rounded-[2rem] sm:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,.32),transparent_18rem),radial-gradient(circle_at_88%_20%,rgba(6,182,212,.24),transparent_16rem)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:38px_38px] opacity-50" />

          <div className="relative grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
            <div className="rounded-[1.7rem] border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200 to-emerald-300 text-slate-950 shadow-lg shadow-emerald-950/20">
                  <Users size={25} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100">Apprenant</p>
                  <p className="text-sm font-black text-white">Projet data en cours</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-slate-950/70 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="space-y-2 font-mono text-[0.68rem] leading-5 text-slate-300 sm:text-xs">
                  <p><span className="text-cyan-200">import</span> pandas <span className="text-cyan-200">as</span> pd</p>
                  <p>ventes = pd.read_csv(...)</p>
                  <p className="text-emerald-200">ca.groupby("produit").sum()</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-white p-4 text-slate-950 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Formation disponible</p>
                    <h3 className="mt-2 text-lg font-black tracking-tight">Python Data Analyst</h3>
                  </div>
                  <BarChart3 className="h-7 w-7 text-emerald-600" />
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div initial={{ width: "30%" }} animate={{ width: "74%" }} transition={{ duration: 1.1, delay: 0.5 }} className="h-full rounded-full bg-emerald-500" />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Progression</span>
                  <span>Projet final</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
                  <Network className="h-5 w-5 text-cyan-200" />
                  <p className="mt-2 text-xs font-black text-white">LLM/RAG</p>
                  <p className="mt-1 text-[0.68rem] font-semibold text-slate-300">En préparation</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-lime-300 p-3 text-slate-950">
                  <Award className="h-5 w-5" />
                  <p className="mt-2 text-xs font-black">Certificat</p>
                  <p className="mt-1 text-[0.68rem] font-semibold text-slate-700">Preuve visible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CredibilityStrip() {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-8" aria-label="Preuves rapides">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {proofItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <Icon size={19} />
              </span>
              <span className="text-sm font-black text-slate-800">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedFormation() {
  return (
    <section id="formations" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow><Sparkles size={14} /> Disponible maintenant</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Commencez par le parcours phare KORYXA.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            La formation Python Data Analyst est le parcours principal actuellement disponible sur KORYXA Formation.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/8 lg:rounded-[2.5rem]">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Disponible</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">29 000 FCFA</span>
              </div>
              <h3 className="mt-6 max-w-2xl text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Formation Analyse de données avec Python</h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                Apprenez Python, Pandas, NumPy, le nettoyage de données, la visualisation et l’analyse exploratoire avec un parcours guidé jusqu’au projet final.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "Pandas", "NumPy", "Visualisation", "EDA", "Projet portfolio", "Certificat"].map((chip) => (
                  <span key={chip} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">{chip}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600">
                  Voir le parcours <ArrowRight size={18} />
                </Link>
                <Link href="/access" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-800 transition hover:-translate-y-0.5 hover:bg-slate-50">
                  Voir l’état de l’accès
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.28),transparent_18rem),radial-gradient(circle_at_85%_20%,rgba(6,182,212,.22),transparent_18rem)]" />
              <div className="relative rounded-[1.7rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-100">Projet portfolio</p>
                    <p className="mt-2 text-xl font-black">Analyse de ventes</p>
                  </div>
                  <LineChart className="h-9 w-9 text-emerald-200" />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["Notebook", "Graphiques", "Insights"].map((item) => (
                    <div key={item} className="rounded-2xl bg-white p-4 text-slate-950">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <p className="mt-3 text-sm font-black">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-slate-950/80 p-4 font-mono text-xs leading-6 text-slate-300">
                  <p><span className="text-cyan-200">ventes</span>.groupby("produit")</p>
                  <p className="text-emerald-200">.sum().plot(kind="barh")</p>
                </div>
              </div>
              <div className="relative mt-4 rounded-[1.7rem] border border-lime-300/20 bg-lime-300 p-5 text-slate-950">
                <p className="text-sm font-black">Résultat attendu</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">Un projet portfolio avec notebooks, graphiques, interprétation métier et certificat de complétion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingRagSection() {
  return (
    <section id="roadmap" className="scroll-mt-24 bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionEyebrow dark><BrainCircuit size={14} /> En préparation avancée</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Construire un chatbot RAG professionnel avec Python, Qdrant et Streamlit.</h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            Un futur parcours pour apprendre à connecter des documents, une base vectorielle, un moteur de recherche sémantique et un LLM afin de construire un chatbot capable de répondre à partir de sources contrôlées.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["LLM", "RAG", "Qdrant", "Embeddings", "Streamlit", "Chatbot IA"].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-slate-200">{chip}</span>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-100">
            Cette formation est en préparation. Elle n’est pas encore ouverte à l’achat.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-500/20 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {["Documents", "Chunks", "Embeddings", "Qdrant", "Recherche", "LLM", "Réponse", "Chatbot"].map((node, index) => (
                <motion.div
                  key={node}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-300 text-sm font-black text-slate-950">{index + 1}</span>
                  <span className="text-sm font-black text-white">{node}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
              <p className="text-sm font-black text-emerald-100">Objectif du parcours</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">Construire un projet RAG complet : documents, chunks, embeddings, base vectorielle, recherche, génération et interface chatbot.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CatalogSection() {
  return (
    <section className="bg-[#f7f8f5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionEyebrow><Layers3 size={14} /> Catalogue contrôlé</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Un catalogue pensé par parcours, pas par accumulation de cours.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Chaque formation a son objectif, son niveau, ses livrables et son statut. Les parcours disponibles sont séparés des formations en préparation.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {formations.map((formation, index) => {
            const Icon = formation.icon;
            const disabled = formation.statusTone === "slate";
            return (
              <motion.article
                key={formation.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-[1.7rem] border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/8 ${formation.statusTone === "emerald" ? "border-emerald-200" : "border-slate-200"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${formation.statusTone === "emerald" ? "bg-emerald-100 text-emerald-700" : formation.statusTone === "cyan" ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-700"}`}>
                    <Icon size={22} />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] ${formation.statusTone === "emerald" ? "bg-emerald-100 text-emerald-700" : formation.statusTone === "cyan" ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-600"}`}>{formation.label}</span>
                </div>
                <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">{formation.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{formation.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {formation.chips.slice(0, 4).map((chip) => (
                    <span key={chip} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{chip}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="text-sm font-black text-slate-950">{formation.price || "Prix non affiché"}</span>
                  <Link href={formation.href} aria-disabled={disabled} className={`inline-flex items-center gap-1 text-sm font-black ${disabled ? "text-slate-400" : "text-emerald-700 hover:text-emerald-600"}`}>
                    {formation.cta} {!disabled && <ArrowRight size={15} />}
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="methode" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow><Zap size={14} /> Méthode KORYXA</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Apprendre, pratiquer, produire, prouver.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            La méthode KORYXA évite l’apprentissage passif. Chaque parcours guide l’apprenant vers une compétence observable et un livrable concret.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {methodSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-emerald-700">0{index + 1}</span>
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="mt-8 text-xl font-black text-slate-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="plateforme" className="scroll-mt-24 bg-[#f8fafc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionEyebrow><Database size={14} /> Plateforme apprenant</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Une expérience apprenant conçue pour avancer.</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            KORYXA Formation ne se limite pas à présenter des vidéos. L’objectif est de guider l’apprenant dans un parcours clair, avec modules, progression, ressources, exercices et projet final.
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/8 sm:p-6">
          <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white sm:p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-200">KORYXA Learning OS</p>
                <p className="mt-1 text-lg font-black">Tableau de bord apprenant</p>
              </div>
              <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black text-slate-950">74%</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Modules guidés", "Ressources pratiques", "Projet final", "Accès sécurisé"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-black text-slate-950">{index + 1}</span>
                    <span className="text-sm font-black">{item}</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-emerald-300" style={{ width: `${60 + index * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionEyebrow><Users size={14} /> Pour qui</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Pour celles et ceux qui veulent apprendre utile.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Les formations KORYXA sont pensées pour des profils qui veulent transformer une compétence numérique en résultat concret.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <div key={audience.title} className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-5">
                <Icon className="h-7 w-7 text-emerald-700" />
                <h3 className="mt-5 text-lg font-black text-slate-950">{audience.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{audience.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnerSection() {
  return (
    <section id="partenaires" className="scroll-mt-24 bg-[#f7f8f5] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionEyebrow><Users size={14} /> Écosystème partenaire</SectionEyebrow>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Un portail public connecté à un espace partenaire dédié.</h2>
          </div>
          <div>
            <p className="text-base leading-8 text-slate-600">
              Les partenaires KORYXA disposent d’un espace dédié pour suivre leurs liens de recommandation, leurs ressources marketing, leurs prospects et leurs commissions sur les produits publiés.
            </p>
            <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-600 ring-1 ring-slate-200">
              Le landing général présente les formations. La distribution commerciale, les liens partenaires et les commissions restent gérés dans le Partner Portal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionEyebrow><FileText size={14} /> FAQ</SectionEyebrow>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Avant de choisir un parcours.</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">Les réponses essentielles sur les formations, l’accès et l’écosystème KORYXA.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-lg open:shadow-slate-950/5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-slate-950">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <Sparkles className="mx-auto h-9 w-9 text-emerald-300" />
        <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Commencez par le parcours disponible aujourd’hui.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Découvrez la formation Python Data Analyst et avancez vers un projet concret en analyse de données avec Python.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-7 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-lime-300">
            Voir Python Data Analyst <ArrowRight size={18} />
          </Link>
          <a href="#formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
            Explorer le catalogue
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterSEO() {
  return (
    <footer className="bg-[#030712] px-4 py-10 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-black text-white">KORYXA Formation</p>
          <p className="mt-3 max-w-md text-sm leading-6">Formations pratiques en IA, data analyse et automatisation, orientées projets concrets et compétences visibles.</p>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Formations</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <Link href="/formations/python-data-analyst" className="block hover:text-white">Python Data Analyst</Link>
            <a href="#roadmap" className="block hover:text-white">LLM/RAG Chatbot IA</a>
            <a href="#roadmap" className="block hover:text-white">Assistant IA pour métier</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Plateforme</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <a href="#formations" className="block hover:text-white">Catalogue</a>
            <a href="#methode" className="block hover:text-white">Méthode</a>
            <a href="#faq" className="block hover:text-white">FAQ</a>
            <Link href="/access" className="block hover:text-white">Accès formation</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm">
        © {new Date().getFullYear()} KORYXA Formation — IA, data et automatisation orientées projets concrets.
      </div>
    </footer>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-slate-950 focus:shadow-xl">
        Aller au contenu
      </a>
      <Header />

      <section id="contenu" className="relative scroll-mt-24 overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,.16),transparent_26rem),radial-gradient(circle_at_80%_8%,rgba(163,230,53,.16),transparent_24rem),linear-gradient(180deg,#F8FAFC_0%,#F7F8F5_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <SectionEyebrow><Sparkles size={14} /> Formations pratiques en IA, data et automatisation</SectionEyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-6 max-w-4xl text-[2.55rem] font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl"
            >
              Apprenez l’IA, la data et l’automatisation par des projets concrets.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              KORYXA Formation réunit des parcours guidés pour développer des compétences utiles, construire des preuves visibles et progresser avec une méthode claire : apprendre, pratiquer, produire, prouver.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a href="#formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600">
                Découvrir les formations <ArrowRight size={18} />
              </a>
              <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50">
                <PlayCircle size={18} /> Voir Python Data Analyst
              </Link>
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black text-slate-600">
              {proofItems.map((item) => (
                <span key={item.label} className="rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">{item.label}</span>
              ))}
            </div>
          </div>

          <HeroLearningVisual />
        </div>
      </section>

      <CredibilityStrip />
      <FeaturedFormation />
      <UpcomingRagSection />
      <CatalogSection />
      <MethodSection />
      <PlatformSection />
      <AudienceSection />
      <PartnerSection />
      <FAQSection />
      <FinalCTA />
      <FooterSEO />
    </main>
  );
}
