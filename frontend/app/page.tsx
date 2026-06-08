"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  FileCode2,
  GraduationCap,
  LineChart,
  LockKeyhole,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

const PARTNER_AUTH_URL = process.env.NEXT_PUBLIC_PARTNER_AUTH_URL || "https://partenaires.innovaplus.africa/inscription";

const words = ["Data Analyst", "analyste métier", "profil data", "portfolio solide"];
const skills = ["Python", "Pandas", "NumPy", "Matplotlib", "Data Cleaning", "EDA", "Dashboard", "Portfolio", "Certificat"];

const modules = [
  { title: "Installation & notebooks", desc: "Anaconda, Jupyter et environnement de travail.", icon: FileCode2 },
  { title: "Bases de Python", desc: "Variables, conditions, boucles et fonctions.", icon: Code2 },
  { title: "NumPy", desc: "Calcul numérique, tableaux et opérations rapides.", icon: Database },
  { title: "Pandas", desc: "Importer, nettoyer et transformer des données.", icon: BookOpen },
  { title: "Visualisation", desc: "Graphiques propres avec une lecture métier.", icon: BarChart3 },
  { title: "Projet portfolio", desc: "Cas complet, restitution et certificat.", icon: Award },
];

const benefits = [
  "Une progression claire pour apprendre sans te perdre.",
  "Des notebooks réels, pas seulement des vidéos à regarder.",
  "Un assistant IA pour expliquer le code quand tu bloques.",
  "Un projet final qui te donne une preuve concrète de compétence.",
];

const faqs = [
  ["Je peux commencer même si je débute ?", "Oui. Le parcours commence par l’installation et les bases avant d’aller vers Pandas, l’analyse et le projet."],
  ["Comment l’accès est activé ?", "Après validation, ton accès est attribué à ton compte partenaire. Tu peux entrer directement dans l’espace formation."],
  ["La vidéo d’introduction reste disponible ?", "Oui. Le module 0 est visible sur la landing pour comprendre l’expérience avant de commencer."],
  ["Le certificat est inclus ?", "Oui, le certificat fait partie du parcours de complétion."],
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
    <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span>
    </span>
  );
}

function AnimatedOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{ x: [0, 45, -24, 0], y: [0, -30, 24, 0], scale: [1, 1.14, 0.92, 1] }}
      transition={{ duration: 10, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function SkillTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.04] py-4">
      <motion.div className="flex w-max gap-4 whitespace-nowrap" animate={{ x: [0, -560] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProductStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="relative mx-auto mt-14 max-w-6xl"
    >
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-r from-blue-500/25 via-cyan-400/10 to-violet-500/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-2xl shadow-blue-950/50 backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">KORYXA Learning OS</span>
        </div>
        <div className="grid lg:grid-cols-[1fr_22rem]">
          <div className="p-5 sm:p-8">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-200 ring-1 ring-blue-300/20">Module 3 · Pandas</span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200 ring-1 ring-emerald-300/20">Progression 52%</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-4xl">Analyse de ventes avec Python</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Nettoie un dataset, calcule le chiffre d’affaires, visualise les performances et rédige des conclusions métier.</p>
            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/85">
              <div className="border-b border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">analyse_ventes.ipynb</div>
              <pre className="overflow-x-auto p-5 text-xs leading-7 text-slate-200 sm:text-sm"><code>{`import pandas as pd

ventes = pd.read_csv("ventes_koryxa.csv")
ventes = ventes.drop_duplicates()

ca = ventes.groupby("produit")["total"].sum()
ca.sort_values().plot(kind="barh")`}</code></pre>
              <motion.div animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 1.8, repeat: Infinity }} className="border-t border-white/10 bg-emerald-400/10 px-5 py-4 text-sm font-black text-emerald-100">✓ Graphique généré · insights prêts</motion.div>
            </div>
          </div>
          <aside className="border-t border-white/10 bg-white/[0.05] p-5 lg:border-l lg:border-t-0">
            <p className="text-sm font-black text-white">Prochaine action</p>
            <div className="mt-4 space-y-3">
              {["Lire le cours", "Exécuter le notebook", "Demander à l’IA", "Terminer le module"].map((item, index) => (
                <motion.div key={item} whileHover={{ x: 4 }} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${index < 2 ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-slate-300"}`}>
                    {index < 2 ? <CheckCircle2 size={16} /> : index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-200">{item}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-white p-4 text-slate-950 shadow-soft">
              <p className="flex items-center gap-2 text-sm font-black"><Sparkles size={16} className="text-blue-600" /> Assistant IA</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Explique le code simplement et propose une méthode pour retenir.</p>
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
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/78 backdrop-blur-2xl">
        <div className="kx-container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-500/25">K</span>
            <span>
              <span className="block text-sm font-black text-white sm:text-base">KORYXA Formation</span>
              <span className="hidden text-xs font-medium text-slate-400 sm:block">Python Data Academy</span>
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-bold text-slate-300 lg:flex">
            <a href="#video" className="transition hover:text-white">Vidéo</a>
            <a href="#programme" className="transition hover:text-white">Programme</a>
            <a href="#prix" className="transition hover:text-white">Prix</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
          <Link href={PARTNER_AUTH_URL} className="inline-flex h-10 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700">
            Commencer
          </Link>
        </div>
      </nav>

      <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <AnimatedOrb className="left-[8%] top-[18%] h-72 w-72 bg-blue-600/25" />
        <AnimatedOrb className="right-[6%] top-[28%] h-80 w-80 bg-cyan-500/16" delay={1.2} />
        <AnimatedOrb className="bottom-[4%] left-[36%] h-72 w-72 bg-violet-500/18" delay={2.1} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="kx-container relative">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="kx-dark-eyebrow">
              Formation Python Data · projet portfolio · certificat
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              De zéro à <TypingText /> avec une plateforme qui te pousse à finir.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
              Apprends Python, Pandas et l’analyse de données avec notebooks, vidéo d’introduction, quiz, assistant IA, projet portfolio et certificat.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={PARTNER_AUTH_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500">
                Commencer le parcours <ArrowRight size={19} />
              </Link>
              <a href="#video" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12">
                <PlayCircle size={19} /> Voir la vidéo
              </a>
            </motion.div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-slate-400">
              <span className="inline-flex items-center gap-2"><LockKeyhole size={15} className="text-emerald-300" /> Accès sécurisé</span>
              <span className="inline-flex items-center gap-2"><Star size={15} className="text-amber-300" /> 29 000 FCFA</span>
              <span className="inline-flex items-center gap-2"><Award size={15} className="text-cyan-300" /> Certificat inclus</span>
            </div>
          </div>

          <ProductStage />

          <motion.div animate={{ y: [0, 12, 0], opacity: [0.45, 1, 0.45] }} transition={{ duration: 1.8, repeat: Infinity }} className="mt-10 flex justify-center text-slate-500">
            <ChevronDown size={28} />
          </motion.div>
        </div>
      </section>

      <SkillTicker />

      <section id="video" className="kx-section relative overflow-hidden">
        <div className="kx-container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="kx-dark-eyebrow">Vidéo d’introduction</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Regarde le Module 0 avant d’entrer.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">Découvre le ton, la méthode et l’environnement de travail avant de commencer le parcours complet.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 28, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-blue-950/40">
            <iframe
              src="https://www.youtube.com/embed/EWy_CcxHyxc"
              title="Analyse de Données avec Python — Module 0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] py-6">
        <div className="kx-container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[['8', 'modules guidés', BookOpen], ['21h', 'contenu', Clock3], ['120+', 'exercices', Code2], ['1', 'certificat', Award]].map(([value, label, Icon]) => {
            const IconComponent = Icon as typeof BookOpen;
            return (
              <div key={label as string} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur">
                <IconComponent className="mx-auto mb-3 h-5 w-5 text-blue-200" />
                <p className="text-2xl font-black text-white">{value as string}</p>
                <p className="mt-1 text-xs font-semibold text-slate-400">{label as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="programme" className="kx-section">
        <div className="kx-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kx-dark-eyebrow">Programme</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Une progression nette, pratique et orientée résultat.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <motion.div key={module.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -6 }} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:border-blue-300/30 hover:bg-white/[0.085]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200 ring-1 ring-blue-300/20"><module.icon size={22} /></span>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Module {index + 1}</p>
                <h3 className="mt-2 text-xl font-black text-white">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="kx-section border-y border-white/10 bg-white/[0.03]">
        <div className="kx-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="kx-dark-eyebrow">Expérience apprenant</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Beau, mais surtout conçu pour te faire avancer.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">Chaque écran doit répondre à une question simple : où j’en suis, quoi apprendre maintenant, comment pratiquer, comment terminer.</p>
          </div>
          <div className="space-y-3">
            {benefits.map((benefit) => (
              <motion.div key={benefit} whileHover={{ x: 5 }} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <p className="text-sm font-semibold leading-6 text-slate-200">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="prix" className="kx-section">
        <div className="kx-container">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <span className="kx-dark-eyebrow">Offre de lancement</span>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Entre dans la formation complète.</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">Notebooks, vidéo d’introduction, modules guidés, assistant IA, quiz, projet final et certificat.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Accès formation", "Notebooks inclus", "Assistant IA", "Certificat"].map((item) => <p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-200"><CheckCircle2 size={16} className="text-emerald-300" /> {item}</p>)}
                </div>
              </div>
              <motion.div animate={{ boxShadow: ["0 20px 70px rgba(37,99,235,.18)", "0 28px 90px rgba(37,99,235,.34)", "0 20px 70px rgba(37,99,235,.18)"] }} transition={{ duration: 3, repeat: Infinity }} className="rounded-3xl bg-white p-6 text-slate-950 shadow-soft">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Prix actuel</p>
                <p className="mt-4 text-5xl font-black tracking-tight">29 000<span className="ml-1 text-xl text-slate-500">FCFA</span></p>
                <p className="mt-2 text-sm font-semibold text-slate-500">Accès attribué après validation.</p>
                <Link href={PARTNER_AUTH_URL} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500">
                  Activer mon accès <ArrowRight size={17} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="kx-section border-t border-white/10">
        <div className="kx-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="kx-dark-eyebrow">FAQ</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Avant de commencer.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <summary className="cursor-pointer list-none text-base font-black text-white marker:hidden"><span className="flex items-center justify-between gap-4">{q}<span className="text-blue-200 transition group-open:rotate-45">+</span></span></summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="kx-container rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center shadow-glow sm:p-12">
          <Zap className="mx-auto mb-5 h-9 w-9 text-white" />
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">On apprend mieux quand l’expérience donne envie.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50">C’est le niveau qu’on vise pour toute la plateforme KORYXA Formation.</p>
          <Link href={PARTNER_AUTH_URL} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-black text-blue-700 shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50">
            Commencer maintenant <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-slate-400 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="font-black text-white">KORYXA Formation</p>
          <p>© {new Date().getFullYear()} KORYXA Tech Store — Python Data Academy.</p>
        </div>
      </footer>
    </main>
  );
}
