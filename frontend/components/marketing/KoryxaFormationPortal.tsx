"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  PlayCircle,
  Sparkles,
  Workflow,
} from "lucide-react";

const formations = [
  {
    title: "Python Data Analyst",
    slug: "/formations/python-data-analyst",
    label: "Disponible",
    level: "Débutant sérieux",
    duration: "8 modules",
    price: "29 000 FCFA",
    icon: BarChart3,
    description: "Python, Pandas, notebooks, analyse exploratoire, visualisation, projet portfolio et certificat.",
    chips: ["Python", "Pandas", "Data", "Portfolio"],
  },
  {
    title: "Assistant IA pour métier",
    slug: "#roadmap",
    label: "Préparation",
    level: "Professionnels",
    duration: "Ateliers guidés",
    price: "Bientôt",
    icon: Bot,
    description: "Utiliser l’IA pour écrire, vendre, organiser, synthétiser, décider et produire plus vite.",
    chips: ["Prompts", "Cas métier", "Méthode", "Productivité"],
  },
  {
    title: "Automatisation IA & no-code",
    slug: "#roadmap",
    label: "Préparation",
    level: "Entrepreneurs",
    duration: "Projets pratiques",
    price: "Bientôt",
    icon: Workflow,
    description: "Construire des assistants et workflows simples pour automatiser les tâches répétitives.",
    chips: ["Workflows", "Agents", "Airtable", "Opérations"],
  },
];

const method = [
  "Des modules courts, structurés et orientés pratique.",
  "Des exercices pour construire une preuve réelle, pas seulement regarder des vidéos.",
  "Un projet final pour montrer une compétence utile et vérifiable.",
];

const audience = [
  "Débutants qui veulent apprendre un métier autour de l’IA.",
  "Professionnels qui veulent devenir plus rapides avec les bons outils.",
  "Entrepreneurs qui veulent automatiser leurs opérations sans complexité inutile.",
  "Développeurs qui veulent construire des produits IA utiles.",
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-emerald-100">
      {children}
    </span>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 }}
      className="relative mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:rounded-[2.75rem] sm:p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,.24),transparent_18rem),radial-gradient(circle_at_78%_32%,rgba(59,130,246,.18),transparent_18rem)]" />
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#07101d] sm:rounded-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="relative mx-auto flex min-h-[23rem] max-w-3xl flex-col items-center justify-center px-5 py-10 text-center sm:min-h-[28rem]">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-44 w-44 items-center justify-center rounded-[2.5rem] border border-emerald-300/25 bg-slate-950/90 shadow-2xl shadow-emerald-500/20 sm:h-56 sm:w-56"
          >
            <div className="absolute -inset-7 rounded-full border border-emerald-300/15" />
            <div className="absolute -inset-14 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-300 to-transparent" />
            <div className="absolute bottom-0 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-t from-emerald-300 to-transparent" />
            <div className="absolute left-0 top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-r from-emerald-300 to-transparent" />
            <div className="absolute right-0 top-1/2 h-px w-10 -translate-y-1/2 bg-gradient-to-l from-emerald-300 to-transparent" />
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-slate-950 shadow-xl sm:h-28 sm:w-28">
              <BrainCircuit className="h-11 w-11 text-emerald-700 sm:h-12 sm:w-12" />
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-black text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2">IA appliquée</span>
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2">Data</span>
            <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-2">Automatisation</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FormationCard({ formation, index }: { formation: (typeof formations)[number]; index: number }) {
  const Icon = formation.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.05 }}
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 text-left shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7"
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-white/10">
          <Icon size={25} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black tracking-[-0.02em] text-white sm:text-2xl">{formation.title}</h3>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.68rem] font-black text-emerald-100">{formation.label}</span>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{formation.description}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{formation.level}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{formation.duration}</span>
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{formation.price}</span>
        {formation.chips.map((chip) => (
          <span key={chip} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2">{chip}</span>
        ))}
      </div>
      <Link href={formation.slug} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:w-auto">
        {formation.label === "Disponible" ? "Voir le parcours" : "Bientôt disponible"} <ArrowRight size={17} />
      </Link>
    </motion.article>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050914] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,.20),transparent_28rem),radial-gradient(circle_at_20%_45%,rgba(59,130,246,.14),transparent_26rem),radial-gradient(circle_at_80%_85%,rgba(168,85,247,.13),transparent_26rem),linear-gradient(180deg,#050914_0%,#07111f_46%,#050914_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#050914]/82 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-4 sm:h-18 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-lg shadow-white/10">K</span>
            <span className="text-left">
              <span className="block text-sm font-black sm:text-base">KORYXA Formation</span>
              <span className="block text-[0.7rem] font-semibold text-slate-400 sm:text-xs">IA · Data · Automatisation</span>
            </span>
          </Link>
        </div>
      </header>

      <section className="flex min-h-screen items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <SectionBadge><Sparkles size={14} className="mr-2" /> Portail officiel KORYXA Formation</SectionBadge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mx-auto mt-7 max-w-5xl text-[2.6rem] font-black leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl"
          >
            Des formations IA pour apprendre, pratiquer et prouver.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg"
          >
            Un portail clair pour découvrir les parcours KORYXA : data analyse, intelligence artificielle appliquée, automatisation et compétences numériques concrètes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href="#formations" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 sm:w-auto">
              Explorer les parcours <ArrowRight size={18} />
            </a>
            <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12 sm:w-auto">
              <PlayCircle size={18} /> Python Data Analyst
            </Link>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

      <section id="formations" className="flex min-h-screen items-center border-y border-white/10 bg-white/[0.025] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl text-center">
          <SectionBadge><GraduationCap size={14} className="mr-2" /> Catalogue</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Un parcours principal aujourd’hui, d’autres formations demain.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Chaque formation aura sa page dédiée, son programme, ses preuves et ses objectifs. Le portail garde une vision simple et professionnelle.
          </p>
          <div className="mt-12 space-y-5">
            {formations.map((formation, index) => (
              <FormationCard key={formation.title} formation={formation} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="methode" className="flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <SectionBadge><BadgeCheck size={14} className="mr-2" /> Méthode</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Une formation sérieuse doit produire une compétence visible.
          </h2>
          <div className="mx-auto mt-12 space-y-4">
            {method.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="mx-auto flex w-full max-w-3xl items-start gap-4 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 text-left backdrop-blur-xl sm:p-6"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-300 text-slate-950 text-sm font-black">0{index + 1}</span>
                <p className="text-sm font-semibold leading-7 text-slate-200 sm:text-base">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="public" className="flex min-h-screen items-center border-y border-white/10 bg-white/[0.025] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <SectionBadge><Layers3 size={14} className="mr-2" /> Pour qui</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Pour apprendre avec intention, pas pour collectionner des cours.
          </h2>
          <div className="mx-auto mt-12 space-y-4">
            {audience.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="mx-auto flex w-full max-w-3xl items-start gap-4 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 text-left backdrop-blur-xl sm:p-6"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm font-semibold leading-7 text-slate-200 sm:text-base">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="flex min-h-screen items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl text-center">
          <SectionBadge><Code2 size={14} className="mr-2" /> Roadmap</SectionBadge>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Le catalogue KORYXA Formation va s’enrichir progressivement.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Les prochains parcours seront publiés avec le même principe : une promesse claire, des exercices pratiques, une progression mesurable et une preuve finale.
          </p>
          <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <Database className="h-8 w-8 text-emerald-300" />
              <p className="text-lg font-black text-white">Data, IA métier, automatisation et produits IA.</p>
              <p className="max-w-xl text-sm leading-7 text-slate-300">Un écosystème de formations pour construire des compétences utiles, applicables et vérifiables.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400 sm:px-8">
        <p className="font-black text-white">KORYXA Formation</p>
        <p className="mt-2">© {new Date().getFullYear()} KORYXA — IA, data et automatisation.</p>
      </footer>
    </main>
  );
}
