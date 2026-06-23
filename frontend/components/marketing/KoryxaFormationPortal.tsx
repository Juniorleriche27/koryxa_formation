"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpenCheck,
  Bot,
  BrainCircuit,
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
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";

const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/7693408/7693408-hd_1920_1080_25fps.mp4";

const navItems = [
  { label: "Formations", href: "#formations" },
  { label: "Projet", href: "#projet" },
  { label: "Méthode", href: "#methode" },
  { label: "Plateforme", href: "#plateforme" },
  { label: "FAQ", href: "#faq" },
];

const trustItems = [
  { value: "1", label: "formation disponible" },
  { value: "29k", label: "FCFA pour démarrer" },
  { value: "100%", label: "orienté projet" },
  { value: "4", label: "étapes simples" },
];

const proofItems = [
  { label: "Modules guidés", icon: BookOpenCheck },
  { label: "Projet portfolio", icon: Layers3 },
  { label: "Certificat", icon: Award },
  { label: "Accès apprenant", icon: ShieldCheck },
];

const buildItems = [
  {
    title: "Notebook Python",
    description: "Manipuler des données avec des commandes claires et réutilisables.",
    icon: Code2,
  },
  {
    title: "Graphiques propres",
    description: "Transformer des chiffres en visuels compréhensibles.",
    icon: LineChart,
  },
  {
    title: "Analyse métier",
    description: "Expliquer ce que les données disent vraiment.",
    icon: Target,
  },
  {
    title: "Projet présentable",
    description: "Finaliser une preuve visible de compétence.",
    icon: Award,
  },
];

const methodSteps = [
  {
    title: "Apprendre",
    description: "Comprendre les bases sans se perdre dans la théorie.",
    icon: GraduationCap,
  },
  {
    title: "Pratiquer",
    description: "Avancer avec des exercices, fichiers et exemples concrets.",
    icon: MousePointerClick,
  },
  {
    title: "Construire",
    description: "Assembler un vrai projet, étape par étape.",
    icon: Workflow,
  },
  {
    title: "Montrer",
    description: "Présenter un résultat clair, utile et visible.",
    icon: Sparkles,
  },
];

const audiences = [
  { title: "Étudiants", description: "Construire un projet concret pour renforcer un dossier ou un portfolio.", icon: GraduationCap },
  { title: "Professionnels", description: "Comprendre la data et l’IA appliquée pour travailler plus efficacement.", icon: TrendingUp },
  { title: "Entrepreneurs", description: "Mieux lire ses chiffres, tester des idées et automatiser certaines tâches.", icon: Target },
  { title: "Débutants motivés", description: "Apprendre avec une progression claire, sans partir dans tous les sens.", icon: Users },
];

const faqs = [
  {
    question: "Quelle formation est disponible aujourd’hui ?",
    answer:
      "La formation Analyse de données avec Python est disponible. Elle vous aide à apprendre Python, organiser des données, créer des graphiques et construire un projet portfolio.",
  },
  {
    question: "Ai-je besoin d’être développeur ?",
    answer:
      "Non. Le parcours est progressif. Vous devez surtout être motivé, régulier et prêt à pratiquer avec des exemples concrets.",
  },
  {
    question: "Qu’est-ce que je vais construire ?",
    answer:
      "Vous construisez un projet d’analyse de données avec notebooks, graphiques, interprétation et résultat présentable.",
  },
  {
    question: "Les prochains parcours IA sont-ils déjà ouverts ?",
    answer:
      "Pas encore. Le prochain parcours autour d’un chatbot IA avec documents est annoncé comme bientôt disponible, sans paiement ni inscription ouverte pour le moment.",
  },
  {
    question: "Y a-t-il un certificat ?",
    answer:
      "Oui, un certificat de complétion est prévu pour le parcours Python Data Analyst après les étapes nécessaires.",
  },
];

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-black uppercase tracking-[0.18em] ${
        dark
          ? "border-white/15 bg-white/10 text-emerald-100"
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/80 shadow-sm shadow-slate-950/5 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil KORYXA Formation">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-black text-white shadow-lg shadow-emerald-800/20">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-tight text-slate-950 sm:text-base">KORYXA Formation</span>
            <span className="block text-[0.7rem] font-semibold text-slate-500 sm:text-xs">Apprendre en construisant</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-black text-slate-600 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-emerald-700">
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/formations/python-data-analyst"
          className="hidden h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-emerald-600 lg:inline-flex"
        >
          Voir la formation
        </Link>

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
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.18 }}
            className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl shadow-slate-950/10 lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-emerald-700"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/formations/python-data-analyst"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
              >
                Voir la formation disponible
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="contenu" className="relative min-h-[92vh] overflow-hidden bg-slate-950 px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute inset-0">
        <video
          className="h-full w-full scale-105 object-cover opacity-55"
          src={HERO_VIDEO_URL}
          poster="/assets/landing/hero/koryxa-learning-hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(16,185,129,.55),transparent_24rem),linear-gradient(90deg,rgba(3,7,18,.92),rgba(3,7,18,.54),rgba(3,7,18,.78))]" />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.25, scale: 1 }}
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[18%] h-80 w-80 rounded-full bg-lime-300/20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(92vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
          <SectionLabel dark>
            <Sparkles size={14} /> Formations pratiques en data, IA et automatisation
          </SectionLabel>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.88] tracking-[-0.075em] sm:text-7xl lg:text-[6.7rem]">
            Apprenez en construisant des projets concrets.
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-100 sm:text-xl sm:leading-9">
            KORYXA Formation vous guide pas à pas pour apprendre Python, la data et l’IA appliquée avec des exercices, des projets et une preuve visible de compétence.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/formations/python-data-analyst"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-emerald-400 px-7 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-emerald-950/25 transition hover:-translate-y-1 hover:bg-lime-300"
            >
              Voir la formation disponible <ArrowRight size={18} />
            </Link>
            <a
              href="#formations"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/18"
            >
              Explorer les parcours <Play size={17} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[2rem] border border-white/15 bg-white/12 p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl"
          >
            <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Disponible maintenant</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">Python Data Analyst</h2>
                </div>
                <BarChart3 className="h-10 w-10 text-emerald-600" />
              </div>
              <div className="mt-6 h-3 rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: "30%" }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.4, delay: 0.75 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-400"
                />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {trustItems.slice(1).map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-slate-200">
                    <p className="text-xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-14 rounded-3xl border border-white/15 bg-slate-950/70 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300 text-slate-950">
                <Award size={20} />
              </span>
              <div>
                <p className="text-sm font-black">Projet portfolio</p>
                <p className="text-xs font-semibold text-slate-300">une preuve visible</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-3 rounded-[2rem] border border-white/70 bg-white/90 p-3 shadow-2xl shadow-slate-950/12 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className="rounded-[1.35rem] bg-slate-50 px-5 py-4 text-center ring-1 ring-slate-200"
          >
            <p className="text-3xl font-black tracking-tight text-emerald-700">{item.value}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-slate-500">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FormationSection() {
  return (
    <section id="formations" className="scroll-mt-24 bg-[#f7f8f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-300/35 to-lime-200/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-slate-950/12">
            <Image
              src="/assets/landing/formations/python-data-workspace.jpg"
              alt="Espace de travail avec ordinateur pour apprendre l’analyse de données avec Python"
              width={1400}
              height={950}
              className="h-[28rem] w-full rounded-[1.5rem] object-cover"
              priority={false}
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/70 bg-white/88 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Ce que vous construisez</p>
              <p className="mt-2 text-xl font-black tracking-tight text-slate-950">un projet data clair, présentable et utile.</p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionLabel>
            <Zap size={14} /> Formation disponible
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Analyse de données avec Python.
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-slate-600">
            Apprenez à nettoyer, explorer et visualiser des données avec Python, puis construisez un projet portfolio que vous pouvez présenter.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {proofItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon size={20} />
                  </span>
                  <span className="text-sm font-black text-slate-800">{item.label}</span>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/formations/python-data-analyst"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-1 hover:bg-emerald-600"
            >
              Voir le parcours <ArrowRight size={18} />
            </Link>
            <span className="inline-flex min-h-14 items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-4 text-sm font-black text-emerald-700">
              29 000 FCFA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildSection() {
  return (
    <section id="projet" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>
            <Target size={14} /> Projet concret
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Un projet visible vaut mieux qu’une promesse de compétence.
          </h2>
          <p className="mt-5 text-lg leading-9 text-slate-600">
            Vous ne repartez pas seulement avec des notions. Vous repartez avec quelque chose à montrer, expliquer et améliorer.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {buildItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.06 }}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-2 hover:bg-slate-950 hover:text-white hover:shadow-2xl hover:shadow-slate-950/15"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm group-hover:bg-emerald-400 group-hover:text-slate-950">
                  <Icon size={22} />
                </span>
                <h3 className="mt-8 text-xl font-black tracking-tight text-slate-950 group-hover:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 group-hover:text-slate-300">{item.description}</p>
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
    <section id="methode" className="scroll-mt-24 overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel dark>
              <Workflow size={14} /> Méthode KORYXA
            </SectionLabel>
            <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl">
              Apprendre. Pratiquer. Construire. Montrer.
            </h2>
            <p className="mt-6 text-lg leading-9 text-slate-300">
              Le parcours est pensé pour avancer sans confusion : une notion, une pratique, un livrable, puis une preuve claire.
            </p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1 }}
              className="absolute bottom-10 left-6 top-10 w-1 origin-top rounded-full bg-gradient-to-b from-emerald-300 via-lime-300 to-cyan-300 md:left-1/2 md:-translate-x-1/2"
            />
            <div className="grid gap-5 md:grid-cols-2">
              {methodSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.08 }}
                    className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300 text-slate-950">
                      <Icon size={22} />
                    </span>
                    <p className="mt-8 text-sm font-black text-emerald-200">0{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FutureAISection() {
  const nodes = ["Documents", "Recherche", "Réponse", "Chatbot"];
  return (
    <section className="relative overflow-hidden bg-[#f7f8f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950 to-transparent opacity-5" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionLabel>
            <BrainCircuit size={14} /> Bientôt
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Construisez un chatbot IA avec vos propres documents.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            Un futur parcours pratique pour comprendre comment relier des documents, une recherche intelligente et une interface de conversation.
          </p>
          <a
            href="#faq"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700"
          >
            Voir ce qui arrive bientôt
          </a>
        </div>

        <div className="relative rounded-[2.2rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20">
          <div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,.35),transparent_18rem),radial-gradient(circle_at_90%_20%,rgba(0,199,216,.24),transparent_16rem)]" />
          <div className="relative grid gap-4">
            {nodes.map((node, index) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
              >
                <motion.span
                  animate={{ boxShadow: ["0 0 0 rgba(163,230,53,0)", "0 0 30px rgba(163,230,53,.35)", "0 0 0 rgba(163,230,53,0)"] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.25 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300 text-sm font-black text-slate-950"
                >
                  {index + 1}
                </motion.span>
                <div>
                  <p className="text-lg font-black">{node}</p>
                  <p className="text-sm font-semibold text-slate-300">étape {index + 1} du futur projet IA</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section id="plateforme" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative order-2 lg:order-1">
          <Image
            src="/assets/landing/platform/koryxa-platform-workspace.jpg"
            alt="Équipe travaillant sur ordinateur dans un environnement moderne"
            width={1400}
            height={950}
            className="h-[32rem] w-full rounded-[2.2rem] object-cover shadow-2xl shadow-slate-950/12"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-6 right-6 rounded-[1.7rem] border border-white/70 bg-white/90 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur-xl sm:left-auto sm:w-80"
          >
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Plateforme</p>
            <p className="mt-2 text-xl font-black tracking-tight text-slate-950">Modules, progression, ressources et projet final.</p>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel>
            <Database size={14} /> Expérience apprenant
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Une formation claire du premier module au projet final.
          </h2>
          <p className="mt-6 text-lg leading-9 text-slate-600">
            L’objectif est simple : savoir quoi apprendre, quoi pratiquer et quoi construire à chaque étape.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Modules guidés", "Ressources pratiques", "Suivi de progression", "Projet final"].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800">
                <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-700" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="bg-[#f7f8f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionLabel>
            <Users size={14} /> Pour qui
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Pour celles et ceux qui veulent apprendre utile.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.article
                key={audience.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-950/10"
              >
                <Icon className="h-7 w-7 text-emerald-700" />
                <h3 className="mt-7 text-xl font-black tracking-tight text-slate-950">{audience.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{audience.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <SectionLabel>
            <FileText size={14} /> FAQ
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
            Avant de commencer.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-xl open:shadow-slate-950/7">
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
    <section className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <Image
        src="/assets/landing/hero/koryxa-modern-office.jpg"
        alt="Bureau moderne pour apprendre et travailler avec la technologie"
        width={1400}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Sparkles className="mx-auto h-10 w-10 text-lime-300" />
        <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl">
          Commencez par construire votre premier projet data.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-200">
          Découvrez la formation Python Data Analyst et avancez vers un résultat concret, visible et présentable.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/formations/python-data-analyst"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-lime-300 px-7 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-lime-950/25 transition hover:-translate-y-1 hover:bg-emerald-300"
          >
            Voir Python Data Analyst <ArrowRight size={18} />
          </Link>
          <a
            href="#formations"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/18"
          >
            Explorer les parcours
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
          <p className="mt-3 max-w-md text-sm leading-6">Formations pratiques en data, IA et automatisation pour apprendre en construisant des projets concrets.</p>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Formations</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <Link href="/formations/python-data-analyst" className="block hover:text-white">Python Data Analyst</Link>
            <a href="#faq" className="block hover:text-white">Chatbot IA avec documents</a>
            <a href="#methode" className="block hover:text-white">Méthode KORYXA</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Plateforme</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <a href="#formations" className="block hover:text-white">Parcours</a>
            <a href="#projet" className="block hover:text-white">Projet</a>
            <a href="#faq" className="block hover:text-white">FAQ</a>
            <Link href="/access" className="block hover:text-white">Accès formation</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm">
        © {new Date().getFullYear()} KORYXA Formation — apprendre en construisant des projets concrets.
      </div>
    </footer>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-slate-950 focus:shadow-xl">
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <TrustStrip />
      <FormationSection />
      <BuildSection />
      <MethodSection />
      <FutureAISection />
      <PlatformSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTA />
      <FooterSEO />
    </main>
  );
}
