"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BookOpen, BarChart2, Code2, Award, ChevronDown, Play,
  CheckCircle, Users, Clock, Star, ArrowRight, Zap,
  Database, TrendingUp, Terminal, GitBranch,
} from "lucide-react";

// ── Animated counter (loops) ───────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Floating particle ──────────────────────────────────────────
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-400/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        y: [0, -40, 20, -20, 0],
        x: [0, 15, -10, 5, 0],
        opacity: [0.15, 0.6, 0.2, 0.7, 0.15],
        scale: [1, 1.4, 0.8, 1.2, 1],
      }}
      transition={{ duration: 5 + delay * 2, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// ── Glowing orb (always moving) ────────────────────────────────
function Orb({ color, size, x, y, dur }: { color: string; size: number; x: number; y: number; dur: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[80px] ${color}`}
      style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
      animate={{ x: [0, 60, -40, 30, 0], y: [0, -50, 30, -20, 0], scale: [1, 1.3, 0.8, 1.1, 1] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Typing text animation ──────────────────────────────────────
const words = ["Data Analyst", "Analyste métier", "Professionnel de la donnée", "Portfolio data"];
function TypingText() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    }
  }, [displayed, deleting, idx]);

  return (
    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
      {displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span>
    </span>
  );
}

// ── Scrolling ticker ───────────────────────────────────────────
const tickerItems = ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA", "Data Cleaning", "Visualisation", "Machine Learning", "Certificat"];
function Ticker() {
  return (
    <div className="overflow-hidden py-3 border-y border-white/5 bg-white/2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span key={i} className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Live bar chart animation ────────────────────────────────────
const barData = [
  { label: "Paris",     value: 85, color: "bg-blue-400" },
  { label: "Lyon",      value: 62, color: "bg-cyan-400" },
  { label: "Marseille", value: 48, color: "bg-purple-400" },
  { label: "Bordeaux",  value: 71, color: "bg-pink-400" },
  { label: "Toulouse",  value: 55, color: "bg-orange-400" },
];
function LiveChart() {
  const [vals, setVals] = useState(barData.map((b) => b.value));
  useEffect(() => {
    const t = setInterval(() => {
      setVals(barData.map((b) => { const v = b.value + (Math.random() - 0.5) * 20; return Math.max(20, Math.min(95, v)); }));
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-3 p-5">
      <p className="text-slate-400 text-xs font-mono mb-4">📊 Ventes par ville — live</p>
      {barData.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="text-slate-400 text-xs w-16 shrink-0">{b.label}</span>
          <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
            <motion.div
              className={`h-2 rounded-full ${b.color}`}
              animate={{ width: `${vals[i]}%` }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </div>
          <motion.span
            className="text-xs text-slate-300 w-8 text-right font-mono"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
          >
            {Math.round(vals[i])}%
          </motion.span>
        </div>
      ))}
    </div>
  );
}

// ── Typewriter code block ──────────────────────────────────────
const codeLines = [
  { text: "import pandas as pd", delay: 0 },
  { text: "import matplotlib.pyplot as plt", delay: 0.3 },
  { text: "", delay: 0.5 },
  { text: "df = pd.read_csv('ventes_koryxa.csv')", delay: 0.7 },
  { text: "df = df.drop_duplicates()", delay: 1.0 },
  { text: "", delay: 1.2 },
  { text: "ca = df.groupby('produit')['total']", delay: 1.4 },
  { text: "    .sum().sort_values()", delay: 1.6 },
  { text: "", delay: 1.8 },
  { text: "ca.plot(kind='barh', color='steelblue')", delay: 2.0 },
  { text: "plt.title('CA par produit')", delay: 2.3 },
  { text: "plt.show()  ✓", delay: 2.6 },
];

const particles = Array.from({ length: 25 }, (_, i) => ({
  x: (i * 17) % 100, y: (i * 13 + 7) % 100,
  delay: (i * 0.4) % 3, size: 4 + (i % 3) * 3, id: i,
}));

const modules = [
  { icon: Terminal,   num: 0, title: "Introduction & Installation", desc: "Anaconda, Jupyter, Python",     color: "from-violet-500 to-purple-600" },
  { icon: Code2,      num: 1, title: "Bases de Python",             desc: "Variables, boucles, fonctions", color: "from-blue-500 to-cyan-600" },
  { icon: Database,   num: 2, title: "NumPy",                       desc: "Calcul numérique vectorisé",    color: "from-cyan-500 to-teal-600" },
  { icon: Database,   num: 3, title: "Pandas",                      desc: "Manipulation de données",       color: "from-teal-500 to-green-600" },
  { icon: Zap,        num: 4, title: "Nettoyage de Données",        desc: "Valeurs manquantes, outliers",  color: "from-green-500 to-emerald-600" },
  { icon: BarChart2,  num: 5, title: "Visualisation",               desc: "Matplotlib & Seaborn",          color: "from-orange-500 to-amber-600" },
  { icon: TrendingUp, num: 6, title: "Analyse EDA",                 desc: "Insights & corrélations",       color: "from-red-500 to-pink-600" },
  { icon: Award,      num: 7, title: "Projet Final",                desc: "Portfolio + Certificat",        color: "from-pink-500 to-rose-600" },
];

const kpis = [
  { icon: BookOpen, label: "Modules",           value: 8,   suffix: "",   color: "text-blue-400",   glow: "shadow-blue-500/40" },
  { icon: Clock,    label: "Heures de contenu", value: 21,  suffix: "h",  color: "text-cyan-400",   glow: "shadow-cyan-500/40" },
  { icon: Code2,    label: "Exercices",         value: 120, suffix: "+",  color: "text-purple-400", glow: "shadow-purple-500/40" },
  { icon: Users,    label: "Apprenants",        value: 500, suffix: "+",  color: "text-green-400",  glow: "shadow-green-500/40" },
  { icon: Star,     label: "Note /5",           value: 5,   suffix: "⭐", color: "text-yellow-400", glow: "shadow-yellow-500/40" },
  { icon: Award,    label: "Certificat",        value: 100, suffix: "%",  color: "text-orange-400", glow: "shadow-orange-500/40" },
];

const features = [
  "Notebooks Jupyter interactifs exécutables",
  "Dataset réel d'une boutique tech",
  "Vidéos YouTube par module",
  "Suivi de progression en temps réel",
  "Certificat de complétion officiel",
  "Accès à vie, à ton rythme",
];

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <div className="bg-[#050c1a] text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#050c1a]/80 backdrop-blur-md border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-lg sm:text-xl font-bold"
        >
          <motion.span
            animate={{ color: ["#60a5fa", "#a78bfa", "#34d399", "#60a5fa"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >KORYXA</motion.span>{" "}
          <span className="text-white">Formation</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="hidden sm:block text-slate-300 hover:text-white transition text-sm font-medium">Se connecter</Link>
          <Link href="/register">
            <motion.span
              animate={{ boxShadow: ["0 0 0px #3b82f6", "0 0 20px #3b82f6", "0 0 0px #3b82f6"] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-3 sm:px-5 py-2 rounded-xl transition"
            >
              Commencer →
            </motion.span>
          </Link>
        </motion.div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Orb color="bg-blue-600/25"   size={500} x={30} y={10}  dur={8} />
          <Orb color="bg-purple-600/20" size={350} x={60} y={40}  dur={11} />
          <Orb color="bg-cyan-600/20"   size={300} x={10} y={50}  dur={9} />
          <Orb color="bg-pink-600/15"   size={250} x={75} y={20}  dur={13} />
          {particles.map((p) => <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} size={p.size} />)}
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          {/* Badge promo */}
          <motion.div
            animate={{ scale: [1, 1.04, 1], boxShadow: ["0 0 0px #f97316", "0 0 24px #f9731640", "0 0 0px #f97316"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/40 text-orange-300 text-sm font-semibold px-5 py-2 rounded-full mb-4"
          >
            <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              🔥
            </motion.span>
            Offre de lancement — Places limitées
          </motion.div>

          {/* Prix hero */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="text-slate-500 line-through text-lg sm:text-xl font-medium">55 000 F</span>
            <motion.span
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-extrabold text-2xl sm:text-3xl px-4 py-1 rounded-xl"
            >
              29 000 FCFA
            </motion.span>
            <span className="bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold px-2 py-1 rounded-lg">−47%</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            De{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent bg-[length:200%]"
            >
              zéro
            </motion.span>{" "}
            à{" "}
            <TypingText />
          </h1>

          <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Apprends à analyser des données réelles avec Python, Pandas, NumPy, Matplotlib et une vraie logique métier en{" "}
            <motion.span
              animate={{ color: ["#fff", "#60a5fa", "#a78bfa", "#fff"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-semibold"
            >
              8 modules progressifs
            </motion.span>{" "}
            — du débutant au projet portfolio professionnel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="w-full sm:w-auto">
              <motion.button
                animate={{ boxShadow: ["0 0 10px #3b82f6", "0 0 35px #3b82f6", "0 0 10px #3b82f6"] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto flex flex-col items-center justify-center gap-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-7 sm:px-9 py-3 rounded-2xl text-base sm:text-lg"
              >
                <span className="flex items-center gap-2">
                  Commencer le parcours
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <ArrowRight size={20} />
                  </motion.span>
                </span>
                <span className="text-xs font-normal text-blue-100 opacity-90">29 000 FCFA · Accès à vie</span>
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-7 sm:px-9 py-4 rounded-2xl text-base sm:text-lg transition"
            >
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Play size={18} fill="white" />
              </motion.span>
              Voir le programme
            </motion.button>
          </div>
          <p className="text-slate-500 text-xs mt-4">✓ Paiement sécurisé &nbsp;·&nbsp; ✓ Accès immédiat &nbsp;·&nbsp; ✓ Certificat inclus</p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 text-slate-500"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── VIDEO MODULE 0 ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Aperçu gratuit
            </motion.p>
            <h2 className="text-4xl font-bold mb-4">Regarde le premier cours</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Module 0 — Introduction & Installation. Découvre la formation avant de t&apos;inscrire.
            </p>
          </motion.div>

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.15)", "0 0 50px rgba(59,130,246,0.35)", "0 0 20px rgba(59,130,246,0.15)"] }}
            transition={{ boxShadow: { duration: 3, repeat: Infinity } }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-black"
          >
            <video
              controls
              className="w-full aspect-video"
              poster=""
              preload="metadata"
            >
              <source src="/intro.mp4" type="video/mp4" />
              Ton navigateur ne supporte pas la lecture vidéo.
            </video>
          </motion.div>

          {/* CTA sous la vidéo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-slate-400 mb-2">Tu veux construire ton portfolio data ? Accède au parcours complet.</p>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="text-slate-500 line-through text-sm">55 000 F</span>
              <span className="text-white font-bold text-xl">29 000 FCFA</span>
              <span className="bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold px-2 py-0.5 rounded-lg">−47%</span>
            </div>
            <Link href="/register">
              <motion.button
                animate={{ boxShadow: ["0 0 10px #3b82f6", "0 0 30px #3b82f6", "0 0 10px #3b82f6"] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-10 py-4 rounded-2xl text-lg"
              >
                Commencer le parcours →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── KPIs ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {kpis.map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              animate={{ borderColor: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"] }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="flex flex-col items-center text-center p-5 rounded-2xl border cursor-default"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
              >
                <kpi.icon className={`mb-3 ${kpi.color}`} size={28} />
              </motion.div>
              <p className={`text-3xl font-extrabold ${kpi.color}`}>
                <Counter to={kpi.value} suffix={kpi.suffix} />
              </p>
              <p className="text-slate-400 text-xs mt-1 font-medium">{kpi.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MODULES ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Parcours complet
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold">8 modules pour devenir Data Analyst opérationnel</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                animate={{ y: [0, -4, 0] }}
                whileHover={{ y: -10, scale: 1.04 }}
                onHoverStart={() => setActiveModule(mod.num)}
                onHoverEnd={() => setActiveModule(null)}
                className="relative p-5 rounded-2xl border border-white/8 cursor-pointer overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  animationDelay: `${i * 0.3}s`,
                  transition: "border-color 0.3s",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4 + i * 0.3, repeat: Infinity }}
                  className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} items-center justify-center mb-4`}
                >
                  <mod.icon size={18} className="text-white" />
                </motion.div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Module {mod.num}</p>
                <h3 className="font-bold text-white text-sm mb-1">{mod.title}</h3>
                <p className="text-slate-400 text-xs">{mod.desc}</p>
                <AnimatePresence>
                  {activeModule === mod.num && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute top-4 right-4"
                    >
                      <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
                        <ArrowRight size={16} className="text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Features list */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Pourquoi KORYXA ?
            </motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Une formation qui fait la différence</h2>
            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 cursor-default"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
                    transition={{ duration: 2 + i * 0.4, repeat: Infinity }}
                  >
                    <CheckCircle size={20} className="text-green-400 shrink-0" />
                  </motion.div>
                  <span className="text-slate-300">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Two live cards */}
          <div className="space-y-4">
            {/* Live bar chart */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0d1a2e] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-slate-400 text-xs font-mono">dashboard_live.py</span>
              </div>
              <LiveChart />
            </motion.div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0d1a2e] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                <span className="text-slate-500 text-xs ml-1 font-mono">analyse_ventes.ipynb</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1 leading-relaxed overflow-x-auto">
                {codeLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: line.delay }}
                  >
                    {line.text.includes("import") && (
                      <><span className="text-blue-400">import</span>{" "}<span className="text-green-300">{line.text.replace("import ", "").replace(" as pd", "").replace(" as plt", "")}</span>{line.text.includes(" as ") && <><span className="text-blue-400"> as</span> <span className="text-white">{line.text.split(" as ")[1]}</span></>}</>
                    )}
                    {line.text.includes("read_csv") && <><span className="text-white">df = pd.</span><span className="text-yellow-300">read_csv</span><span className="text-white">(</span><span className="text-orange-300">&apos;ventes_koryxa.csv&apos;</span><span className="text-white">)</span></>}
                    {line.text.includes("drop_dup") && <><span className="text-white">df = df.</span><span className="text-yellow-300">drop_duplicates</span><span className="text-white">()</span></>}
                    {line.text.includes("groupby") && <><span className="text-white">ca = df.</span><span className="text-yellow-300">groupby</span><span className="text-white">(</span><span className="text-orange-300">&apos;produit&apos;</span><span className="text-white">)[</span><span className="text-orange-300">&apos;total&apos;</span><span className="text-white">]</span></>}
                    {line.text.includes(".sum") && <><span className="text-white pl-4">.</span><span className="text-yellow-300">sum</span><span className="text-white">().</span><span className="text-yellow-300">sort_values</span><span className="text-white">()</span></>}
                    {line.text.includes("barh") && <><span className="text-white">ca.</span><span className="text-yellow-300">plot</span><span className="text-white">(kind=</span><span className="text-orange-300">&apos;barh&apos;</span><span className="text-white">)</span></>}
                    {line.text.includes("title") && <><span className="text-white">plt.</span><span className="text-yellow-300">title</span><span className="text-white">(</span><span className="text-orange-300">&apos;CA par produit&apos;</span><span className="text-white">)</span></>}
                    {line.text.includes("show") && (
                      <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                        <span className="text-white">plt.</span><span className="text-yellow-300">show</span><span className="text-white">() </span>
                        <span className="text-green-400">✓ Graphique généré</span>
                      </motion.span>
                    )}
                    {!line.text && "\u00A0"}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRICING / CTA FINAL ── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Orb color="bg-blue-600/20"   size={400} x={30} y={20} dur={7} />
          <Orb color="bg-purple-600/15" size={300} x={60} y={50} dur={10} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-lg mx-auto text-center"
        >
          <motion.h2
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3"
          >
            Prêt à devenir{" "}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent bg-[length:200%]"
            >
              Data Analyst opérationnel ?
            </motion.span>
          </motion.h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            Rejoins KORYXA Formation et construis des compétences data utiles, visibles et exploitables.
          </p>

          {/* Pricing card */}
          <motion.div
            animate={{ boxShadow: ["0 0 20px rgba(59,130,246,0.15)", "0 0 50px rgba(59,130,246,0.35)", "0 0 20px rgba(59,130,246,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8"
          >
            {/* Offre badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            >
              🔥 Offre de lancement
            </motion.div>

            {/* Prix */}
            <div className="mb-6">
              <p className="text-slate-500 line-through text-lg mb-1">Valeur réelle : 55 000 FCFA</p>
              <motion.p
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl sm:text-6xl font-extrabold text-white"
              >
                29 000
                <span className="text-2xl text-slate-300 ml-2">FCFA</span>
              </motion.p>
              <p className="text-green-400 font-semibold mt-2">Tu économises 26 000 FCFA · −47%</p>
            </div>

            {/* Inclus */}
            <div className="text-left space-y-2.5 mb-8">
              {[
                "8 modules complets avec notebooks Jupyter",
                "Vidéos explicatives par module",
                "Dataset réel d'une boutique tech",
                "Assistant IA intégré dans chaque module",
                "Quiz génératif pour valider tes acquis",
                "Certificat officiel de complétion",
                "Accès à vie · À ton rythme",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle size={16} className="text-green-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <Link href="/register" className="block">
              <motion.button
                animate={{ boxShadow: ["0 0 10px #3b82f6", "0 0 50px #3b82f6", "0 0 10px #3b82f6"] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 rounded-2xl text-lg"
              >
                Je m&apos;inscris maintenant →
              </motion.button>
            </Link>

            <p className="text-slate-500 text-xs mt-4">✓ Accès immédiat après inscription &nbsp;·&nbsp; ✓ Paiement sécurisé</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-sm">
        <motion.span
          animate={{ color: ["#60a5fa", "#a78bfa", "#34d399", "#60a5fa"] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="font-semibold"
        >
          KORYXA
        </motion.span>
        <span className="text-slate-600">© {new Date().getFullYear()} KORYXA Tech Store</span>
      </footer>
    </div>
  );
}
