"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  FileCode2,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

const PARTNER_AUTH_URL = process.env.NEXT_PUBLIC_PARTNER_AUTH_URL || "https://partenaires.innovaplus.africa/inscription";

const program = [
  { title: "Installation & environnement", desc: "Anaconda, Jupyter, notebooks et premiers réflexes de travail.", icon: FileCode2 },
  { title: "Python pour la data", desc: "Variables, conditions, boucles, fonctions et logique de programmation.", icon: Code2 },
  { title: "NumPy & calcul", desc: "Tableaux, opérations rapides et bases du calcul numérique.", icon: Database },
  { title: "Pandas professionnel", desc: "Importer, nettoyer, transformer et analyser des données réelles.", icon: Layers3 },
  { title: "Visualisation & EDA", desc: "Graphiques lisibles, exploration et interprétation business.", icon: BarChart3 },
  { title: "Projet portfolio", desc: "Un cas pratique complet pour montrer tes compétences.", icon: Award },
];

const benefits = [
  "Apprendre avec des explications simples, pas du jargon compliqué.",
  "Construire une vraie logique métier autour des données.",
  "Travailler sur notebooks, datasets, quiz et exercices guidés.",
  "Avancer à ton rythme avec un accès attribué à ton compte partenaire.",
];

const stats = [
  { label: "Modules guidés", value: "8", icon: BookOpen },
  { label: "Heures de contenu", value: "21h", icon: Clock3 },
  { label: "Exercices & cellules", value: "120+", icon: Code2 },
  { label: "Certificat inclus", value: "Oui", icon: Award },
];

const steps = [
  { title: "Inscription partenaire", desc: "Tu passes par l’espace partenaire KORYXA pour sécuriser ton accès." },
  { title: "Activation formation", desc: "Après validation, ton accès est attribué directement à ton compte." },
  { title: "Apprentissage guidé", desc: "Tu avances module par module avec notebooks, ressources et IA d’aide." },
  { title: "Projet & certificat", desc: "Tu termines avec un projet portfolio et un certificat de complétion." },
];

const faqs = [
  {
    q: "Est-ce adapté si je débute complètement ?",
    a: "Oui. Le parcours commence par l’installation et les bases de Python avant d’aller progressivement vers Pandas, la visualisation et le projet final.",
  },
  {
    q: "Est-ce que j’ai besoin d’un ordinateur puissant ?",
    a: "Non. Un ordinateur standard suffit pour suivre les notebooks, pratiquer les exercices et réaliser le projet.",
  },
  {
    q: "Comment l’accès est activé ?",
    a: "Après inscription et validation, l’accès est attribué à ton compte partenaire. Tu peux ensuite entrer directement dans la formation sans code WhatsApp.",
  },
  {
    q: "Est-ce qu’il y a un certificat ?",
    a: "Oui. Le certificat est prévu après progression et complétion du parcours.",
  },
];

function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-emerald-400/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">KORYXA Learning OS</span>
        </div>
        <div className="grid gap-0 lg:grid-cols-[1fr_21rem]">
          <div className="p-5 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-200 ring-1 ring-blue-300/20">Module 3</span>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/20">52% complété</span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Analyse de ventes avec Pandas</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Nettoie un dataset réel, trouve les produits performants, visualise les tendances et prépare une conclusion business claire.
            </p>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
              <div className="border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Notebook interactif</div>
              <pre className="overflow-x-auto p-5 text-xs leading-7 text-slate-200 sm:text-sm"><code>{`import pandas as pd

ventes = pd.read_csv("ventes_koryxa.csv")
ca_par_produit = ventes.groupby("produit")["total"].sum()

ca_par_produit.sort_values().plot(kind="barh")`}</code></pre>
              <div className="border-t border-white/10 bg-emerald-400/10 px-5 py-4 text-sm font-bold text-emerald-100">✓ Graphique généré · 3 insights détectés</div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-white/[0.04] p-5 lg:border-l lg:border-t-0">
            <p className="text-sm font-black text-white">Aujourd’hui</p>
            <div className="mt-4 space-y-3">
              {["Lire le cours", "Exécuter le notebook", "Répondre au quiz", "Marquer terminé"].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${index < 2 ? "bg-emerald-400/15 text-emerald-200" : "bg-white/10 text-slate-300"}`}>
                    {index < 2 ? <CheckCircle2 size={16} /> : index + 1}
                  </span>
                  <span className="text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-white p-4 text-slate-950 shadow-soft">
              <p className="flex items-center gap-2 text-sm font-black"><Sparkles size={16} className="text-blue-600" /> Assistant IA</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">“Explique-moi ce code comme si je débutais.”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <a href="#programme" className="transition hover:text-white">Programme</a>
            <a href="#experience" className="transition hover:text-white">Expérience</a>
            <a href="#prix" className="transition hover:text-white">Prix</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </div>
          <Link href={PARTNER_AUTH_URL} className="inline-flex h-10 items-center justify-center rounded-2xl bg-white px-4 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700">
            Commencer
          </Link>
        </div>
      </nav>

      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="kx-container relative">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="kx-dark-eyebrow">
              Formation Python Data · projet portfolio · certificat
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Apprends la data avec Python dans une plateforme qui donne envie d’avancer.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
              Un parcours clair pour passer des bases de Python à l’analyse de données réelle : notebooks, vidéos, quiz, assistant IA, projet portfolio et certificat.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={PARTNER_AUTH_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-blue-500">
                Commencer le parcours <ArrowRight size={19} />
              </Link>
              <a href="#experience" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-7 py-4 text-base font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10">
                <PlayCircle size={19} /> Voir l’expérience
              </a>
            </motion.div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2"><LockKeyhole size={15} className="text-emerald-300" /> Accès sécurisé</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-300" /> Certificat inclus</span>
              <span className="inline-flex items-center gap-2"><Star size={15} className="text-amber-300" /> 29 000 FCFA</span>
            </div>
          </div>

          <div className="mt-14">
            <ProductPreview />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.04] py-6">
        <div className="kx-container grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-center backdrop-blur">
              <stat.icon className="mx-auto mb-3 h-5 w-5 text-blue-200" />
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="kx-section">
        <div className="kx-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="kx-dark-eyebrow">Pourquoi c’est différent</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Une formation pensée pour apprendre, pratiquer et finir.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              La plateforme ne te jette pas juste des vidéos. Elle te guide avec une progression claire, des notebooks exploitables, des ressources utiles et des actions concrètes à chaque étape.
            </p>
            <div className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <p className="text-sm font-semibold leading-6 text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: GraduationCap, title: "Débutant accepté", desc: "Tu démarres avec les bases et tu avances sans te perdre." },
              { icon: LineChart, title: "Logique métier", desc: "Chaque notion sert à résoudre un vrai problème de données." },
              { icon: Sparkles, title: "IA pédagogique", desc: "Tu peux demander une explication claire du code dans les modules." },
              { icon: TrendingUp, title: "Progression visible", desc: "Tu sais où tu es, quoi faire et ce qui reste à terminer." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <item.icon className="h-7 w-7 text-blue-200" />
                <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programme" className="kx-section border-y border-white/10 bg-white/[0.03]">
        <div className="kx-container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="kx-dark-eyebrow">Programme</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Un parcours progressif, pas une liste de cours dispersés.</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {program.map((item, index) => (
              <div key={item.title} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.08]">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200 ring-1 ring-blue-300/20">
                    <item.icon size={22} />
                  </span>
                  <span className="text-sm font-black text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kx-section">
        <div className="kx-container">
          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-black text-slate-950">{index + 1}</span>
                <h3 className="mt-5 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prix" className="kx-section">
        <div className="kx-container">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-center">
              <div>
                <span className="kx-dark-eyebrow">Offre de lancement</span>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Formation Python Data complète.</h2>
                <p className="mt-4 text-base leading-8 text-slate-300">Accès au parcours, notebooks, ressources, assistant IA, quiz et certificat. Une fondation sérieuse pour entrer dans l’analyse de données.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Accès formation", "Notebooks inclus", "Assistant IA", "Certificat"].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-200"><CheckCircle2 size={16} className="text-emerald-300" /> {item}</p>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-white p-6 text-slate-950 shadow-soft">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Prix actuel</p>
                <p className="mt-4 text-5xl font-black tracking-tight">29 000<span className="ml-1 text-xl text-slate-500">FCFA</span></p>
                <p className="mt-2 text-sm font-semibold text-slate-500">Offre claire, accès attribué après validation.</p>
                <Link href={PARTNER_AUTH_URL} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500">
                  Activer mon accès <ArrowRight size={17} />
                </Link>
                <p className="mt-4 text-center text-xs font-semibold text-slate-500">Inscription via l’espace partenaire KORYXA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="kx-section border-t border-white/10">
        <div className="kx-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="kx-dark-eyebrow">FAQ</span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">Les questions avant de commencer.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <summary className="cursor-pointer list-none text-base font-black text-white marker:hidden">
                  <span className="flex items-center justify-between gap-4">{faq.q}<span className="text-blue-200 transition group-open:rotate-45">+</span></span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="kx-container rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center shadow-glow sm:p-12">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Prêt à apprendre autrement ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50">Entre dans une formation propre, guidée et pensée pour t’aider à terminer le parcours, pas seulement à t’inscrire.</p>
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
