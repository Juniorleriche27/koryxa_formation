"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Code2,
  Command,
  Database,
  GraduationCap,
  Layers3,
  LockKeyhole,
  MousePointerClick,
  Network,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { buildKoryxaAdminAuthUrl } from "@/lib/koryxaAdminAuth";

const adminAuthUrl = buildKoryxaAdminAuthUrl("/dashboard");

const formations = [
  {
    title: "Python Data Analyst",
    slug: "/formations/python-data-analyst",
    label: "Disponible",
    level: "Débutant → opérationnel",
    duration: "8 modules",
    price: "29 000 FCFA",
    icon: BarChart3,
    gradient: "from-cyan-300 via-blue-300 to-indigo-300",
    description:
      "Le parcours actif : Python, Pandas, notebooks, analyse exploratoire, visualisation, projet portfolio et certificat.",
    chips: ["Python", "Pandas", "EDA", "Portfolio"],
  },
  {
    title: "Assistant IA pour métier",
    slug: "#roadmap",
    label: "Préparation",
    level: "Professionnels",
    duration: "Ateliers guidés",
    price: "Bientôt",
    icon: Bot,
    gradient: "from-emerald-200 via-lime-200 to-amber-200",
    description:
      "Apprendre à travailler avec l’IA dans un vrai métier : écrire, vendre, organiser, synthétiser, décider et produire plus vite.",
    chips: ["Prompts", "Méthode", "Cas métier", "Productivité"],
  },
  {
    title: "Automatisation IA & no-code",
    slug: "#roadmap",
    label: "Préparation",
    level: "Entrepreneurs / opérateurs",
    duration: "Projets pratiques",
    price: "Bientôt",
    icon: Workflow,
    gradient: "from-orange-200 via-rose-200 to-pink-200",
    description:
      "Construire des workflows et assistants simples pour automatiser les tâches répétitives sans complexifier l’entreprise.",
    chips: ["Workflows", "Agents", "Airtable", "Opérations"],
  },
  {
    title: "Développeur IA appliquée",
    slug: "#roadmap",
    label: "Roadmap",
    level: "Intermédiaire",
    duration: "Bootcamp",
    price: "Bientôt",
    icon: BrainCircuit,
    gradient: "from-violet-200 via-fuchsia-200 to-cyan-200",
    description:
      "Passer du code classique aux produits IA : RAG, API, intégrations, assistants spécialisés et déploiement propre.",
    chips: ["RAG", "API", "Agents", "SaaS IA"],
  },
];

const stats = [
  { value: "01", label: "portail général" },
  { value: "04", label: "parcours IA préparés" },
  { value: "100%", label: "mobile-first" },
  { value: "SEO", label: "structure propre" },
];

const method = [
  {
    icon: MousePointerClick,
    title: "Choisir le bon parcours",
    text: "Le portail général présente les formations. Chaque formation garde sa landing dédiée, claire et optimisée.",
  },
  {
    icon: TerminalSquare,
    title: "Pratiquer, pas seulement regarder",
    text: "Notebooks, exercices, quiz, projets et assistant IA servent à produire une compétence visible.",
  },
  {
    icon: BadgeCheck,
    title: "Prouver la progression",
    text: "Projet final, certificat et livrables portfolio donnent une preuve concrète à la fin du parcours.",
  },
];

const audience = [
  "Débutants sérieux qui veulent apprendre un métier autour de l’IA",
  "Professionnels qui veulent devenir plus rapides avec l’IA",
  "Entrepreneurs qui veulent structurer et automatiser leurs opérations",
  "Développeurs qui veulent construire des produits IA utiles",
];

function FloatingGlyph({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      className={`absolute hidden rounded-3xl border border-white/10 bg-white/[0.07] p-4 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:block ${className}`}
      animate={{ y: [0, -14, 0], rotate: [0, 2, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function NeuralHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 90]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, 14]);

  return (
    <div className="relative mx-auto mt-12 max-w-6xl lg:mt-16">
      <motion.div style={{ y, rotate }} className="absolute -inset-8 rounded-[3rem] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(16,185,129,.3),rgba(59,130,246,.18),rgba(244,114,182,.18),rgba(16,185,129,.3))] blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-slate-950/60 backdrop-blur-2xl">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">Learning OS</span>
            </div>
            <div className="mt-8 rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950"><Command size={21} /></span>
                <div>
                  <p className="font-black text-white">KORYXA Formation</p>
                  <p className="text-sm font-semibold text-slate-400">Portail IA / Data / Automatisation</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {formations.slice(0, 3).map((formation, index) => (
                  <motion.div
                    key={formation.title}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.08 }}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${formation.gradient}`} />
                      <div>
                        <p className="text-sm font-black text-white">{formation.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{formation.level}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden p-5 sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/25" />
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-5 text-slate-950 shadow-2xl shadow-emerald-500/20"
              animate={{ scale: [1, 1.04, 1], boxShadow: ["0 25px 80px rgba(16,185,129,.12)", "0 35px 120px rgba(16,185,129,.3)", "0 25px 80px rgba(16,185,129,.12)"] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <Sparkles className="mb-3 h-8 w-8 text-emerald-600" />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-500">KORYXA</p>
                <p className="mt-1 text-2xl font-black tracking-tight">IA Skills</p>
              </div>
            </motion.div>
            <FloatingGlyph className="left-[8%] top-[16%]" delay={0.2}><Database className="h-6 w-6 text-cyan-200" /></FloatingGlyph>
            <FloatingGlyph className="right-[10%] top-[18%]" delay={0.9}><Bot className="h-6 w-6 text-emerald-200" /></FloatingGlyph>
            <FloatingGlyph className="bottom-[18%] left-[15%]" delay={1.4}><Code2 className="h-6 w-6 text-fuchsia-200" /></FloatingGlyph>
            <FloatingGlyph className="bottom-[16%] right-[14%]" delay={1.8}><Network className="h-6 w-6 text-amber-200" /></FloatingGlyph>
          </div>
        </div>
      </div>
    </div>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050914] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_10%_10%,rgba(16,185,129,.18),transparent_30rem),radial-gradient(circle_at_82%_18%,rgba(59,130,246,.16),transparent_28rem),radial-gradient(circle_at_50%_90%,rgba(244,114,182,.12),transparent_30rem),linear-gradient(180deg,#050914_0%,#06111f_50%,#050914_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-70" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050914]/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-lg shadow-white/10">K</span>
            <span>
              <span className="block text-sm font-black sm:text-base">KORYXA Formation</span>
              <span className="hidden text-xs font-semibold text-slate-400 sm:block">IA · Data · Automatisation</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-300 lg:flex">
            <a href="#formations" className="transition hover:text-white">Formations</a>
            <a href="#methode" className="transition hover:text-white">Méthode</a>
            <a href="#public" className="transition hover:text-white">Pour qui</a>
            <a href="#roadmap" className="transition hover:text-white">Roadmap</a>
          </nav>
          <Link href={adminAuthUrl} className="inline-flex h-10 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:text-emerald-800">
            Espace apprenant
          </Link>
        </div>
      </header>

      <section className="relative px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
              <Sparkles size={15} /> Nouveau portail · formation.koryxa.fr
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-7 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Apprendre l’IA avec des parcours qui deviennent des preuves.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
              Le portail général KORYXA Formation oriente vers chaque landing dédiée : data analyse, métiers augmentés par l’IA, automatisation et développement IA appliqué.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 text-base font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-300">
                Explorer les formations <ArrowRight size={19} />
              </a>
              <Link href="/formations/python-data-analyst" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12">
                <PlayCircle size={19} /> Voir Python Data Analyst
              </Link>
            </motion.div>
          </div>

          <NeuralHero />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-center backdrop-blur-xl">
                <p className="text-3xl font-black tracking-tight text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="formations" className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300">Catalogue évolutif</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Chaque formation a sa propre landing. Le portail général donne la vision.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">La formation Data Analyse garde sa page clean. Les nouveaux parcours auront chacun leur page dédiée, leurs preuves, leur programme, leur SEO et leur CTA.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {formations.map((formation, index) => {
              const Icon = formation.icon;
              return (
                <motion.article
                  key={formation.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex min-h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.09]"
                >
                  <div className={`h-28 bg-gradient-to-br ${formation.gradient} opacity-95`} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="-mt-12 flex items-end justify-between gap-3">
                      <span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-white/20 bg-slate-950 text-white shadow-xl"><Icon size={27} /></span>
                      <span className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-black text-white backdrop-blur">{formation.label}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-black text-white">{formation.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{formation.description}</p>
                    <div className="mt-5 grid gap-2 text-xs font-bold text-slate-300">
                      <p className="flex items-center gap-2"><GraduationCap size={14} className="text-emerald-300" /> {formation.level}</p>
                      <p className="flex items-center gap-2"><CalendarDays size={14} className="text-emerald-300" /> {formation.duration}</p>
                      <p className="flex items-center gap-2"><Layers3 size={14} className="text-emerald-300" /> {formation.price}</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {formation.chips.map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-300">{chip}</span>)}
                    </div>
                    <Link href={formation.slug} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition group-hover:bg-emerald-300">
                      {formation.label === "Disponible" ? "Voir la landing" : "Voir la roadmap"} <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="methode" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">Méthode premium</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Pas une collection de cours. Un système d’apprentissage orienté résultat.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Le portail doit rassurer, orienter et convertir. Les pages formations doivent ensuite vendre le parcours avec un niveau de détail complet.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {method.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                  <Icon className="h-6 w-6 text-emerald-200" />
                  <p className="mt-4 text-lg font-black text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="public" className="border-y border-white/10 bg-white/[0.03] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300">Pour qui</span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">Pour celles et ceux qui veulent utiliser l’IA sérieusement, pas juste en parler.</h2>
          </div>
          <div className="space-y-3">
            {audience.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm font-semibold leading-6 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-100">Maintenance maîtrisée</span>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-5xl">On ne casse pas l’existant : on ajoute une couche propre au-dessus.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">La landing Python Data Analyst reste dédiée à sa formation. Le portail général devient l’entrée de marque, SEO et catalogue pour toutes les formations futures.</p>
            </div>
            <div className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-soft">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-emerald-700"><ShieldCheck size={16} /> Architecture cible</p>
              <div className="mt-5 space-y-3">
                {["/ : portail général", "/formations/python-data-analyst : landing existante", "Chaque nouvelle formation : landing dédiée", "Auth apprenant : KORYXA Admin"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700"><CheckCircle2 size={16} className="text-emerald-600" /> {item}</p>
                ))}
              </div>
              <Link href={adminAuthUrl} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-emerald-700">
                Espace apprenant <LockKeyhole size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-slate-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-black text-white">KORYXA Formation</p>
          <p>© {new Date().getFullYear()} KORYXA — IA, data et métiers augmentés.</p>
        </div>
      </footer>
    </main>
  );
}
