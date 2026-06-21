"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  LineChart,
  LockKeyhole,
  NotebookTabs,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { buildKoryxaAdminAuthUrl } from "@/lib/koryxaAdminAuth";

const adminAuthUrl = buildKoryxaAdminAuthUrl("/dashboard");

const formations = [
  {
    title: "Python Data Analyst",
    status: "Parcours actuel",
    level: "Débutant à opérationnel",
    duration: "8 modules",
    price: "29 000 FCFA",
    icon: LineChart,
    description: "Python, Pandas, nettoyage de données, visualisation, analyse exploratoire et projet portfolio certifiant.",
    outcomes: ["Analyser un fichier métier", "Construire un notebook propre", "Présenter des insights"],
  },
  {
    title: "Assistant IA pour métier",
    status: "En préparation",
    level: "Professionnels",
    duration: "Ateliers guidés",
    price: "Bientôt",
    icon: Bot,
    description: "Utiliser l’IA pour écrire, vendre, organiser, automatiser et produire plus vite dans un vrai contexte métier.",
    outcomes: ["Prompts métier", "Méthodes de travail IA", "Cas pratiques par fonction"],
  },
  {
    title: "Automatisation IA & no-code",
    status: "En préparation",
    level: "Opérateurs / entrepreneurs",
    duration: "Projets pratiques",
    price: "Bientôt",
    icon: Workflow,
    description: "Créer des workflows, assistants et systèmes simples pour gagner du temps sans construire une usine à gaz.",
    outcomes: ["Process automatisés", "Agents simples", "Tableaux de suivi"],
  },
  {
    title: "Développeur IA appliquée",
    status: "Roadmap",
    level: "Intermédiaire",
    duration: "Bootcamp",
    price: "Bientôt",
    icon: BrainCircuit,
    description: "Passer du code classique aux produits IA : RAG, API, intégrations, assistants et déploiement propre.",
    outcomes: ["Apps IA", "APIs", "Portfolio technique"],
  },
];

const learningSystem = [
  { icon: NotebookTabs, title: "Contenu praticable", text: "Cours, notebooks, exercices, quiz et cas métiers concrets." },
  { icon: Sparkles, title: "Assistant IA pédagogique", text: "Aide à comprendre le code, reformuler et débloquer l’apprentissage." },
  { icon: BadgeCheck, title: "Preuve de compétence", text: "Projet final, validation, certificat et éléments réutilisables en portfolio." },
  { icon: ShieldCheck, title: "Accès centralisé", text: "L’authentification part vers KORYXA Admin pour éviter les comptes dispersés." },
];

const audiences = [
  "Débutants sérieux qui veulent apprendre un métier de l’IA",
  "Professionnels qui veulent intégrer l’IA dans leur travail",
  "Entrepreneurs qui veulent automatiser leurs opérations",
  "Développeurs qui veulent construire des produits IA utiles",
];

const roadmap = [
  "Migration de l’authentification vers KORYXA Admin",
  "Passage officiel vers formation.koryxa.fr",
  "Catalogue multi-formations IA et métiers IA",
  "Espace apprenant conservé pour les parcours actifs",
];

function MaintenanceNotice() {
  return (
    <div className="border-b border-amber-300/20 bg-amber-300/10 px-4 py-3 text-center text-sm font-bold text-amber-100">
      Maintenance annoncée aux apprenants : la plateforme évolue vers le portail officiel des formations IA KORYXA.
    </div>
  );
}

function HeroMockup() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="relative mx-auto mt-12 max-w-6xl">
      <div className="absolute -inset-8 rounded-[2.5rem] bg-emerald-400/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-slate-950/50 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">formation.koryxa.fr</span>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-5 sm:p-8">
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-200 ring-1 ring-emerald-300/20">Catalogue IA</span>
            <h3 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-4xl">Une entrée publique claire, plusieurs parcours derrière.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              La landing ne vend plus un seul cours : elle prépare KORYXA Formation à accueillir les formations IA, data, automatisation et métiers augmentés.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {roadmap.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm font-semibold leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="border-t border-white/10 bg-slate-950/45 p-5 lg:border-l lg:border-t-0">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">Parcours prioritaire</p>
            <div className="mt-5 rounded-3xl bg-white p-5 text-slate-950 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white"><LineChart size={22} /></span>
                <div>
                  <p className="font-black">Python Data Analyst</p>
                  <p className="text-sm font-semibold text-slate-500">Parcours actif</p>
                </div>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <motion.div className="h-full rounded-full bg-emerald-500" initial={{ width: "0%" }} animate={{ width: "68%" }} transition={{ duration: 1.2, delay: 0.35 }} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-600">Modules, quiz, projet final et certificat restent dans l’espace apprenant.</p>
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.06] p-4">
              <p className="flex items-center gap-2 text-sm font-black text-white"><LockKeyhole size={16} /> Auth déplacée</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Les nouveaux accès doivent passer par KORYXA Admin, pas par un formulaire isolé dans la formation.</p>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <main className="kx-dark-page">
      <MaintenanceNotice />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/85 backdrop-blur-2xl">
        <div className="kx-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-lg shadow-white/10">K</span>
            <span>
              <span className="block text-sm font-black text-white sm:text-base">KORYXA Formation</span>
              <span className="hidden text-xs font-medium text-slate-400 sm:block">formations IA & métiers de l’IA</span>
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-bold text-slate-300 lg:flex">
            <a href="#formations" className="transition hover:text-white">Formations</a>
            <a href="#methode" className="transition hover:text-white">Méthode</a>
            <a href="#public" className="transition hover:text-white">Pour qui</a>
            <a href="#maintenance" className="transition hover:text-white">Maintenance</a>
          </div>
          <Link href={adminAuthUrl} className="inline-flex h-10 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:text-emerald-800">Espace apprenant</Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute right-[6%] top-[22%] h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="kx-container relative">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kx-dark-eyebrow">Nouveau domaine · formation.koryxa.fr</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Les formations KORYXA pour apprendre l’IA, la data et les métiers augmentés.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
              Le site devient la vitrine officielle des formations IA KORYXA. L’espace apprenant reste protégé, mais l’authentification part progressivement vers KORYXA Admin.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-base font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400">Voir les formations <ArrowRight size={19} /></a>
              <Link href={adminAuthUrl} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"><LockKeyhole size={19} /> Se connecter via KORYXA Admin</Link>
            </motion.div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-slate-400">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-emerald-300" /> Auth centralisée</span>
              <span className="inline-flex items-center gap-2"><GraduationCap size={15} className="text-amber-300" /> Formations IA</span>
              <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={15} className="text-emerald-300" /> Métiers augmentés</span>
            </div>
          </div>
          <HeroMockup />
        </div>
      </section>

      <section id="formations" className="kx-section border-y border-white/10 bg-white/[0.03]">
        <div className="kx-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kx-dark-eyebrow">Catalogue</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Un site prêt pour plusieurs formations IA.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">La première formation reste Python Data Analyst. Les suivantes sont préparées pour élargir KORYXA Formation vers les usages IA, l’automatisation et le développement IA.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {formations.map((formation, index) => {
              const Icon = formation.icon;
              return (
                <motion.article key={formation.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex min-h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/20"><Icon size={22} /></span>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-300">{formation.status}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">{formation.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{formation.description}</p>
                  <div className="mt-5 grid gap-2 text-xs font-bold text-slate-300">
                    <p className="flex items-center gap-2"><UsersRound size={14} className="text-emerald-300" /> {formation.level}</p>
                    <p className="flex items-center gap-2"><CalendarClock size={14} className="text-emerald-300" /> {formation.duration}</p>
                    <p className="flex items-center gap-2"><FileText size={14} className="text-emerald-300" /> {formation.price}</p>
                  </div>
                  <div className="mt-5 space-y-2">
                    {formation.outcomes.map((item) => <p key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-300"><CheckCircle2 size={15} className="text-emerald-300" /> {item}</p>)}
                  </div>
                  <div className="mt-auto pt-6">
                    <Link href={formation.status === "Parcours actuel" ? adminAuthUrl : "#maintenance"} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-black text-white transition hover:bg-white/12">
                      {formation.status === "Parcours actuel" ? "Accéder au parcours" : "Suivre la préparation"} <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="methode" className="kx-section">
        <div className="kx-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="kx-dark-eyebrow">Méthode KORYXA</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Chaque formation doit mener à une compétence visible.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Le site est préparé pour présenter des parcours sérieux : objectif, niveau, livrables, projet final, certificat et accès sécurisé.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {learningSystem.map((item) => {
              const Icon = item.icon;
              return <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"><Icon className="h-6 w-6 text-emerald-200" /><p className="mt-4 text-lg font-black text-white">{item.title}</p><p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section id="public" className="kx-section border-y border-white/10 bg-white/[0.03]">
        <div className="kx-container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><span className="kx-dark-eyebrow">Public cible</span><h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Un portail pour les apprenants qui veulent vraiment pratiquer.</h2></div>
          <div className="space-y-3">
            {audiences.map((audience) => <div key={audience} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" /><p className="text-sm font-semibold leading-6 text-slate-200">{audience}</p></div>)}
          </div>
        </div>
      </section>

      <section id="maintenance" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="kx-container rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-8 text-center shadow-2xl shadow-slate-950/25 sm:p-12">
          <ShieldCheck className="mx-auto mb-5 h-9 w-9 text-amber-200" />
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Maintenance en cours, évolution maîtrisée.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-amber-50/90">Les apprenants ont été prévenus. La prochaine étape est l’intégration côté KORYXA Admin pour gérer l’identité, les droits et l’accès aux formations depuis un point central.</p>
          <Link href={adminAuthUrl} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-amber-50">Continuer via KORYXA Admin <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-slate-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-black text-white">KORYXA Formation</p>
          <p>© {new Date().getFullYear()} KORYXA — formation.koryxa.fr</p>
        </div>
      </footer>
    </main>
  );
}
