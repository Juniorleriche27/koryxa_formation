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
  { label: "Méthode", href: "#methode" },
  { label: "Expérience", href: "#experience" },
  { label: "FAQ", href: "#faq" },
];

const formations = [
  {
    title: "Python Data Analyst",
    status: "Disponible",
    href: "/formations/python-data-analyst",
    cta: "Voir la page dédiée",
    description: "Apprendre Python, organiser des données, créer des graphiques et construire un projet portfolio.",
    icon: BarChart3,
    active: true,
    tags: ["Python", "Data", "Portfolio"],
  },
  {
    title: "Chatbot IA avec documents",
    status: "Bientôt",
    href: "#faq",
    cta: "Voir ce qui arrive",
    description: "Comprendre comment relier des documents, une recherche intelligente et une interface chatbot.",
    icon: BrainCircuit,
    active: false,
    tags: ["IA", "Documents", "Chatbot"],
  },
  {
    title: "Assistant IA pour métier",
    status: "Bientôt",
    href: "#faq",
    cta: "En préparation",
    description: "Utiliser l’IA pour écrire, synthétiser, vendre, organiser et produire plus vite dans un contexte réel.",
    icon: Bot,
    active: false,
    tags: ["IA métier", "Productivité", "Cas pratiques"],
  },
  {
    title: "Automatisation IA & no-code",
    status: "Bientôt",
    href: "#faq",
    cta: "En préparation",
    description: "Créer des workflows simples pour réduire les tâches répétitives et structurer des opérations.",
    icon: Workflow,
    active: false,
    tags: ["Workflows", "No-code", "Opérations"],
  },
];

const proofItems = [
  { label: "Formations orientées projets", icon: Layers3 },
  { label: "Pages dédiées par parcours", icon: FileText },
  { label: "Progression guidée", icon: BookOpenCheck },
  { label: "Preuves visibles", icon: Award },
];

const methodSteps = [
  {
    title: "Choisir",
    description: "Sélectionner le parcours qui correspond à votre objectif : data, IA ou automatisation.",
    icon: Target,
  },
  {
    title: "Apprendre",
    description: "Avancer avec des modules clairs, des exemples et des ressources pratiques.",
    icon: GraduationCap,
  },
  {
    title: "Construire",
    description: "Produire un livrable concret lié au parcours choisi.",
    icon: Workflow,
  },
  {
    title: "Montrer",
    description: "Présenter un résultat visible : projet, analyse, interface ou automatisation.",
    icon: Sparkles,
  },
];

const experienceItems = [
  { title: "Une entrée générale", description: "La page actuelle présente l’ensemble des parcours KORYXA Formation.", icon: Database },
  { title: "Une page par formation", description: "Chaque formation garde sa landing dédiée avec son programme, son prix et son accès.", icon: FileText },
  { title: "Un apprentissage guidé", description: "Les parcours sont pensés pour progresser étape par étape jusqu’à un livrable.", icon: BookOpenCheck },
  { title: "Un résultat concret", description: "L’objectif est de repartir avec une compétence appliquée et une preuve visible.", icon: ShieldCheck },
];

const audiences = [
  { title: "Étudiants", description: "Construire des projets pour renforcer un dossier ou un portfolio.", icon: GraduationCap },
  { title: "Professionnels", description: "Apprendre la data, l’IA ou l’automatisation pour travailler plus efficacement.", icon: TrendingUp },
  { title: "Entrepreneurs", description: "Mieux lire ses données, créer des assistants et automatiser certaines tâches.", icon: Target },
  { title: "Débutants motivés", description: "Démarrer avec une progression claire et des exemples concrets.", icon: Users },
];

const faqs = [
  {
    question: "Cette page concerne-t-elle une seule formation ?",
    answer:
      "Non. Cette page est le portail général KORYXA Formation. Elle présente l’ensemble des parcours. Chaque formation possède ensuite sa propre page dédiée.",
  },
  {
    question: "Quelle formation est disponible aujourd’hui ?",
    answer:
      "La formation Python Data Analyst est actuellement disponible. Les autres parcours sont présentés comme bientôt disponibles ou en préparation.",
  },
  {
    question: "Où voir le détail d’une formation ?",
    answer:
      "Depuis la section Formations, chaque parcours renvoie vers sa page dédiée lorsque celle-ci est disponible. La page générale sert d’entrée principale.",
  },
  {
    question: "Les parcours IA sont-ils déjà ouverts ?",
    answer:
      "Pas encore. Le parcours autour du chatbot IA avec documents est annoncé comme bientôt disponible, sans bouton de paiement sur cette page générale.",
  },
  {
    question: "Ai-je besoin d’être développeur ?",
    answer:
      "Cela dépend du parcours. Les formations KORYXA sont pensées pour rester pratiques, progressives et centrées sur la construction d’un résultat concret.",
  },
];

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-sm backdrop-blur-xl ${
        dark
          ? "border-koryxa-gold/30 bg-koryxa-gold/10 text-amber-100"
          : "border-koryxa-gold/25 bg-amber-50 text-koryxa-navy"
      }`}
    >
      {children}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-koryxa-navy/10 bg-[#fafaf8]/92 shadow-sm shadow-koryxa-navy/5 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Accueil KORYXA Formation">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-koryxa-navy text-sm font-black text-koryxa-gold shadow-lg shadow-koryxa-navy/20 ring-1 ring-koryxa-gold/20">
            K
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-tight text-koryxa-navy sm:text-base">KORYXA Formation</span>
            <span className="block text-[0.7rem] font-semibold text-slate-500 sm:text-xs">Portail des parcours</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-black text-slate-600 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-koryxa-gold">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#formations"
          className="hidden h-11 items-center justify-center rounded-full bg-koryxa-navy px-5 text-sm font-black text-white shadow-lg shadow-koryxa-navy/15 transition hover:-translate-y-0.5 hover:bg-koryxa-gold hover:text-koryxa-navy lg:inline-flex"
        >
          Voir les formations
        </a>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-koryxa-navy shadow-sm lg:hidden"
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
                  className="rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-amber-50 hover:text-koryxa-navy"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#formations"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-12 items-center justify-center rounded-2xl bg-koryxa-navy px-5 py-3 text-sm font-black text-white"
              >
                Voir toutes les formations
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="contenu" className="relative min-h-[92vh] overflow-hidden bg-koryxa-navy px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute inset-0">
        <video
          className="h-full w-full scale-105 object-cover opacity-38 saturate-[0.85]"
          src={HERO_VIDEO_URL}
          poster="/assets/landing/hero/koryxa-learning-hero.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(200,169,107,.36),transparent_24rem),radial-gradient(circle_at_82%_18%,rgba(61,122,104,.22),transparent_23rem),linear-gradient(90deg,rgba(7,15,31,.96),rgba(13,27,56,.70),rgba(7,15,31,.90))]" />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.25, scale: 1 }}
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[18%] h-80 w-80 rounded-full bg-koryxa-gold/20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(92vh-7rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="max-w-4xl">
          <SectionLabel dark>
            <Sparkles size={14} /> Portail de formations pratiques
          </SectionLabel>
          <h1 className="mt-7 max-w-4xl font-serif text-5xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-[6.4rem]">
            Apprenez la data, l’IA et l’automatisation par projets.
          </h1>
          <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-white/74 sm:text-xl sm:leading-9">
            KORYXA Formation rassemble plusieurs parcours pour apprendre des compétences utiles, choisir une formation dédiée et construire des résultats concrets.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#formations"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-koryxa-gold px-7 py-4 text-sm font-black text-koryxa-navy shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:bg-amber-200"
            >
              Voir les formations <ArrowRight size={18} />
            </a>
            <a
              href="#methode"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-koryxa-gold/50 hover:bg-white/[0.18]"
            >
              Comprendre la méthode
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
            className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-2xl shadow-black/35 backdrop-blur-2xl ring-1 ring-koryxa-gold/10"
          >
            <div className="rounded-[1.5rem] bg-white p-5 text-koryxa-navy">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-koryxa-gold">Parcours KORYXA</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">Un portail. Plusieurs formations.</h2>
              <div className="mt-6 grid gap-3">
                {formations.map((formation, index) => (
                  <motion.div
                    key={formation.title}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"
                  >
                    <span className="text-sm font-black text-slate-800">{formation.title}</span>
                    <span className={`rounded-full px-3 py-1 text-[0.68rem] font-black ${formation.active ? "bg-amber-100 text-koryxa-navy" : "bg-slate-200 text-slate-600"}`}>
                      {formation.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-3 rounded-[2rem] border border-white/80 bg-[#fafaf8]/94 p-3 shadow-2xl shadow-koryxa-navy/12 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {proofItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex items-center gap-3 rounded-[1.35rem] bg-slate-50 px-5 py-4 ring-1 ring-slate-200"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-koryxa-navy text-koryxa-gold">
                <Icon size={19} />
              </span>
              <p className="text-sm font-black leading-5 text-slate-800">{item.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FormationsSection() {
  return (
    <section id="formations" className="scroll-mt-24 bg-[#f5f6f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionLabel>
              <Zap size={14} /> Toutes les formations
            </SectionLabel>
            <h2 className="mt-6 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-koryxa-navy sm:text-6xl">
              Choisissez le parcours qui correspond à votre objectif.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-medium leading-9 text-slate-600 lg:justify-self-end">
            Cette page est le point d’entrée général. Chaque formation garde sa propre page dédiée avec son programme, ses détails et son parcours d’accès.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {formations.map((formation, index) => {
            const Icon = formation.icon;
            const CardContent = (
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.06 }}
                className={`group flex h-full flex-col rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-koryxa-navy/12 ${
                  formation.active
                    ? "border-koryxa-gold/35 bg-white ring-1 ring-koryxa-gold/10"
                    : "border-slate-200 bg-white/85"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${formation.active ? "bg-koryxa-navy text-koryxa-gold" : "bg-slate-100 text-slate-600"}`}>
                    <Icon size={24} />
                  </span>
                  <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] ${formation.active ? "bg-koryxa-gold text-koryxa-navy" : "bg-slate-200 text-slate-600"}`}>
                    {formation.status}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-black tracking-tight text-koryxa-navy">{formation.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">{formation.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {formation.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={`mt-8 inline-flex items-center gap-2 text-sm font-black ${formation.active ? "text-koryxa-navy" : "text-slate-500"}`}>
                  {formation.cta} <ArrowRight size={16} />
                </span>
              </motion.article>
            );

            return formation.active ? (
              <Link key={formation.title} href={formation.href} className="block h-full">
                {CardContent}
              </Link>
            ) : (
              <a key={formation.title} href={formation.href} className="block h-full">
                {CardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function GeneralVisionSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-koryxa-gold/25 to-koryxa-green/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-slate-950/12">
            <Image
              src="/assets/landing/formations/python-data-workspace.jpg"
              alt="Ordinateur portable utilisé pour apprendre avec des parcours pratiques"
              width={1400}
              height={950}
              className="h-[28rem] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/70 bg-white/88 p-5 shadow-2xl shadow-slate-950/15 backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-koryxa-gold">Principe commun</p>
              <p className="mt-2 text-xl font-black tracking-tight text-koryxa-navy">chaque parcours mène vers un livrable concret.</p>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionLabel>
            <Target size={14} /> Objectif commun
          </SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-koryxa-navy sm:text-6xl">
            Plusieurs formations, une même logique : apprendre utile.
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-slate-600">
            Data, IA ou automatisation : l’objectif reste le même. Comprendre, pratiquer et construire quelque chose que vous pouvez utiliser, présenter ou améliorer.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Data", "IA appliquée", "Automatisation", "Projets visibles"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800">
                <CheckCircle2 className="h-5 w-5 text-koryxa-gold" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section id="methode" className="scroll-mt-24 overflow-hidden bg-koryxa-navy px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel dark>
              <Workflow size={14} /> Méthode générale
            </SectionLabel>
            <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl">
              Choisir. Apprendre. Construire. Montrer.
            </h2>
            <p className="mt-6 text-lg leading-9 text-slate-300">
              La méthode s’applique à tous les parcours KORYXA Formation. Le sujet change, mais la logique reste concrète.
            </p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.1 }}
              className="absolute bottom-10 left-6 top-10 w-1 origin-top rounded-full bg-gradient-to-b from-emerald-300 via-koryxa-gold to-koryxa-green md:left-1/2 md:-translate-x-1/2"
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
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-koryxa-gold text-koryxa-navy">
                      <Icon size={22} />
                    </span>
                    <p className="mt-8 text-sm font-black text-amber-100">0{index + 1}</p>
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

function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
            <p className="text-xs font-black uppercase tracking-[0.16em] text-koryxa-gold">Expérience apprenant</p>
            <p className="mt-2 text-xl font-black tracking-tight text-koryxa-navy">un parcours dédié après le choix de la formation.</p>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel>
            <Database size={14} /> Expérience générale
          </SectionLabel>
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-koryxa-navy sm:text-6xl">
            Le portail présente. Les pages dédiées détaillent.
          </h2>
          <p className="mt-6 text-lg leading-9 text-slate-600">
            Cette page donne une vue d’ensemble. Ensuite, chaque formation possède sa propre page pour expliquer le programme, les bénéfices et les modalités.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {experienceItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Icon className="mb-3 h-5 w-5 text-koryxa-gold" />
                  <h3 className="text-sm font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              );
            })}
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
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-koryxa-navy sm:text-6xl">
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
                <Icon className="h-7 w-7 text-koryxa-gold" />
                <h3 className="mt-7 text-xl font-black tracking-tight text-koryxa-navy">{audience.title}</h3>
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
          <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-koryxa-navy sm:text-6xl">
            Avant de choisir.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white open:shadow-xl open:shadow-slate-950/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black text-koryxa-navy">
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
    <section className="relative overflow-hidden bg-koryxa-navy px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      <Image
        src="/assets/landing/hero/koryxa-modern-office.jpg"
        alt="Bureau moderne pour apprendre et travailler avec la technologie"
        width={1400}
        height={900}
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-koryxa-navy/70" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Sparkles className="mx-auto h-10 w-10 text-koryxa-gold" />
        <h2 className="mt-6 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl">
          Trouvez le parcours qui vous fait avancer.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-200">
          Data, IA ou automatisation : commencez par choisir la formation adaptée à votre objectif.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#formations"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-koryxa-gold px-7 py-4 text-sm font-black text-koryxa-navy shadow-2xl shadow-black/25 transition hover:-translate-y-1 hover:bg-koryxa-gold"
          >
            Voir les formations <ArrowRight size={18} />
          </a>
          <a
            href="#methode"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.18]"
          >
            Voir la méthode
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterSEO() {
  return (
    <footer className="bg-[#070f1f] px-4 py-10 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-lg font-black text-white">KORYXA Formation</p>
          <p className="mt-3 max-w-md text-sm leading-6">Portail de formations pratiques en data, IA et automatisation. Chaque formation possède sa propre page dédiée.</p>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Formations</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <Link href="/formations/python-data-analyst" className="block hover:text-white">Python Data Analyst</Link>
            <a href="#formations" className="block hover:text-white">Chatbot IA avec documents</a>
            <a href="#formations" className="block hover:text-white">Assistant IA pour métier</a>
            <a href="#formations" className="block hover:text-white">Automatisation IA & no-code</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-white">Portail</p>
          <div className="mt-4 space-y-3 text-sm font-semibold">
            <a href="#formations" className="block hover:text-white">Toutes les formations</a>
            <a href="#methode" className="block hover:text-white">Méthode</a>
            <a href="#experience" className="block hover:text-white">Expérience</a>
            <a href="#faq" className="block hover:text-white">FAQ</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm">
        © {new Date().getFullYear()} KORYXA Formation — portail général des parcours pratiques.
      </div>
    </footer>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-koryxa-navy">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-koryxa-navy focus:shadow-xl">
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <ProofStrip />
      <FormationsSection />
      <GeneralVisionSection />
      <MethodSection />
      <ExperienceSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTA />
      <FooterSEO />
    </main>
  );
}
