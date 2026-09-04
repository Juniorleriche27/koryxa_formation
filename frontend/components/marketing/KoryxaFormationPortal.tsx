"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
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
  FileCode2,
  FileText,
  GraduationCap,
  Layers3,
  LineChart,
  Mail,
  Menu,
  MessageCircleMore,
  Linkedin,
  Facebook,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import KoryxaUserNav from "@/components/auth/KoryxaUserNav";

const navItems = [
  { label: "Formations", href: "/formations" },
  { label: "Méthode", href: "/methode" },
  { label: "Pour qui", href: "/pour-qui" },
  { label: "FAQ", href: "/faq" },
];

export const formations = [
  {
    title: "Python Data Analyst",
    status: "Disponible",
    href: "/formations/python-data-analyst",
    cta: "Voir le programme",
    description: "Apprenez Python, nettoyez et analysez les données avec Pandas et NumPy, et construisez un portfolio prêt pour l’emploi.",
    icon: BarChart3,
    active: true,
    accentColor: "#10b981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    tags: ["Python", "Pandas", "NumPy", "Visualisation"],
  },
  {
    title: "Excel Data Analyst",
    status: "Disponible",
    href: "/formations/excel-data-analyst",
    cta: "Voir le programme",
    description: "Nettoyez, modélisez et automatisez les données avec Excel avancé, Power Query, Power Pivot et des tableaux de bord interactifs.",
    icon: LineChart,
    active: true,
    accentColor: "#16a34a",
    accentBg: "rgba(22, 163, 74, 0.12)",
    tags: ["Excel", "Power Query", "Power Pivot", "KPIs"],
  },
  {
    title: "LLM RAG Developer",
    status: "Disponible",
    href: "/formations/llm-rag",
    cta: "Voir le programme",
    description: "Construisez des assistants IA capables d’exploiter des documents d’entreprise privés avec recherche vectorielle Qdrant et sources vérifiables.",
    icon: BrainCircuit,
    active: true,
    accentColor: "#8b5cf6",
    accentBg: "rgba(139, 92, 246, 0.12)",
    tags: ["LLM", "RAG", "Qdrant", "Agents IA"],
  },
  {
    title: "Power BI Data Analyst",
    status: "Disponible",
    href: "/formations/power-bi-data-analyst",
    cta: "Voir le programme",
    description: "Préparez, reliez et visualisez les données décisionnelles avec Power Query, formules DAX avancées et rapports interactifs.",
    icon: TrendingUp,
    active: true,
    accentColor: "#f59e0b",
    accentBg: "rgba(245, 158, 11, 0.12)",
    tags: ["Power BI", "DAX", "Power Query", "Data Modeling"],
  },
  {
    title: "SQL Data Analyst avec PostgreSQL",
    status: "Disponible",
    href: "/formations/sql-data-analyst",
    cta: "Voir le programme",
    description: "Interrogez, reliez et transformez les données d’entreprise avec SQL, PostgreSQL, CTE, fonctions de fenêtrage et vues analytiques.",
    icon: Database,
    active: true,
    accentColor: "#06b6d4",
    accentBg: "rgba(6, 182, 212, 0.12)",
    tags: ["SQL", "PostgreSQL", "CTE", "Window Functions"],
  },
  {
    title: "Statistiques & Data Science avec Python",
    status: "Disponible",
    href: "/formations",
    cta: "Voir le catalogue",
    description: "Maîtrisez le raisonnement statistique, la segmentation client, les tests d’hypothèses, la prévision et l’évaluation rigoureuse de modèles.",
    icon: BarChart3,
    active: true,
    accentColor: "#2563eb",
    accentBg: "rgba(37, 99, 235, 0.12)",
    tags: ["Statistiques", "Data Science", "Python", "Inférence"],
  },
  {
    title: "Machine Learning avec Python",
    status: "Disponible",
    href: "/formations/machine-learning-python",
    cta: "Voir le programme",
    description: "Construisez, comparez, optimisez et interprétez des modèles prédictifs avec Python, scikit-learn et un cas complet de prédiction du churn.",
    icon: BrainCircuit,
    active: true,
    accentColor: "#ec4899",
    accentBg: "rgba(236, 72, 153, 0.12)",
    tags: ["Machine Learning", "scikit-learn", "Classification", "SHAP"],
  },
  {
    title: "Data Engineering avec Python et SQL",
    status: "Disponible",
    href: "/formations/data-engineering-python-sql",
    cta: "Voir le programme",
    description: "Concevez des pipelines de données fiables avec PostgreSQL, dbt, Airflow, Docker, tests de qualité automatisés et observabilité.",
    icon: Database,
    active: true,
    accentColor: "#0f766e",
    accentBg: "rgba(15, 118, 110, 0.12)",
    tags: ["Data Engineering", "dbt", "Airflow", "Docker"],
  },
  {
    title: "Assistant IA pour métier",
    status: "Bientôt",
    href: "/formations",
    cta: "En préparation",
    description: "Exploitez l’intelligence artificielle générative pour rédiger, synthétiser, automatiser et produire plus vite dans votre métier.",
    icon: Bot,
    active: false,
    accentColor: "#64748b",
    accentBg: "rgba(100, 116, 139, 0.12)",
    tags: ["IA Métier", "Productivité", "Prompts avancés"],
  },
  {
    title: "Automatisation IA & No-Code",
    status: "Bientôt",
    href: "/formations",
    cta: "En préparation",
    description: "Créez des flux automatisés intelligents pour supprimer les tâches répétitives et relier vos applications métiers sans coder.",
    icon: Workflow,
    active: false,
    accentColor: "#64748b",
    accentBg: "rgba(100, 116, 139, 0.12)",
    tags: ["Workflows", "No-code", "Automatisations"],
  },
];

const proofMetrics = [
  {
    stat: "8",
    label: "Parcours Certifiants",
    sub: "De l'initiation à l'expertise avancée",
    icon: Layers3,
  },
  {
    stat: "100%",
    label: "Pratique & Projets Réels",
    sub: "Notebooks & code exécutable en direct",
    icon: Code2,
  },
  {
    stat: "ID Unique",
    label: "Certifications KORYXA",
    sub: "Vérifiables avec QR Code public",
    icon: Award,
  },
  {
    stat: "SSO",
    label: "Compte KORYXA Unique",
    sub: "Pass universel vers tout l'écosystème",
    icon: ShieldCheck,
  },
];

const methodSteps = [
  {
    step: "01",
    title: "Fondations & Code en Ligne",
    description: "Accédez immédiatement à votre environnement interactif sans installer de logiciels complexes. Testez le code directement dans votre navigateur.",
    icon: FileCode2,
  },
  {
    step: "02",
    title: "Cas Métiers & Données Réelles",
    description: "Travaillez sur des jeux de données authentiques : finance, banques, mobile money, télécoms, distribution et e-commerce.",
    icon: Database,
  },
  {
    step: "03",
    title: "Validation Continue & Quizz",
    description: "Mesurez vos acquis à chaque étape grâce à des évaluations interactives et des retours immédiats sur votre compréhension.",
    icon: BookOpenCheck,
  },
  {
    step: "04",
    title: "Projet Portfolio & Certification",
    description: "Concluez votre parcours par un projet d’envergure validé, obtenez votre certificat KORYXA officiel et exposez-le aux recruteurs.",
    icon: Award,
  },
];

const audiences = [
  {
    title: "Reconversion & Débutants",
    badge: "Accessibilité & Clarté",
    description: "Démarrez dans la data et l’IA sans prérequis lourds grâce à un accompagnement progressif, visuel et très structuré.",
    icon: GraduationCap,
  },
  {
    title: "Professionnels & Analystes",
    badge: "Impact Métier Immédiat",
    description: "Montez en compétence sur Python, SQL, Power BI et l’automatisation pour booster votre valeur sur le marché de l’emploi.",
    icon: TrendingUp,
  },
  {
    title: "Développeurs & Tech Leads",
    badge: "Architecture & IA Avancée",
    description: "Maîtrisez les architectures LLM RAG, les bases vectorielles et les pipelines de données robustes pour vos applications.",
    icon: BrainCircuit,
  },
  {
    title: "Entreprises & Managers",
    badge: "Transformation Numérique",
    description: "Formez vos équipes aux technologies data & IA souveraines pour automatiser leurs opérations et sécuriser leurs données.",
    icon: Target,
  },
];

const faqs = [
  {
    question: "Cette page concerne-t-elle une seule formation ?",
    answer: "Non. Cette page est le portail officiel de l’académie KORYXA Formation. Elle présente l’ensemble de nos 8 parcours certifiants. Chaque formation possède sa page dédiée avec son programme exhaustif et ses modalités d’accès.",
  },
  {
    question: "Quelles formations sont immédiatement disponibles ?",
    answer: "Les 8 parcours principaux sont immédiatement accessibles : Python Data Analyst, Excel Data Analyst, LLM RAG Developer, Power BI Data Analyst, SQL Data Analyst avec PostgreSQL, Statistiques & Data Science, Machine Learning avec Python et Data Engineering.",
  },
  {
    question: "Comment fonctionne la certification KORYXA ?",
    answer: "À l’issue de la validation des modules et du projet final de portfolio, un certificat officiel KORYXA doté d’un identifiant unique infalsifiable et d’un QR code de vérification publique vous est délivré.",
  },
  {
    question: "Dois-je installer des logiciels complexes sur mon ordinateur ?",
    answer: "Non. KORYXA Formation intègre un moteur de code Python et des interfaces de données directement dans votre navigateur web. Vous pouvez commencer à coder et analyser dès votre première connexion.",
  },
  {
    question: "Puis-je utiliser mon compte unique KORYXA ?",
    answer: "Oui. Grâce au SSO souverain KORYXA Identity, votre compte unique fonctionne sur KORYXA Formation ainsi que sur l’ensemble des produits de la suite (MERQALOR, CoraBiz, ChatLAYA, FlowCore, etc.).",
  },
];

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider ${
        dark
          ? "border-[#00a86b]/40 bg-[#00a86b]/20 text-[#86efac]"
          : "border-[#00a86b]/30 bg-[#00a86b]/10 text-[#008b58]"
      }`}
    >
      {children}
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-[0_2px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 sm:h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:bg-slate-100 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Accueil KORYXA Pôle Formation">
            <span className="relative inline-flex overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1 shadow-sm transition group-hover:scale-105 h-9 w-9">
              <Image
                src="/assets/brand/koryxa-formation-logo.webp"
                alt="Logo KORYXA"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-slate-950">
                KORY<span className="text-[#00a86b]">XA</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-slate-500 mt-0.5">
                Pôle Formation
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  active
                    ? "bg-slate-100 text-[#008b58]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <KoryxaUserNav variant="desktop" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-slate-200 bg-white/95 px-4 py-5 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Navigation mobile">
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                      active ? "bg-[#00a86b]/10 text-[#008b58]" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <KoryxaUserNav variant="mobileMenu" onCloseMobile={() => setOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="contenu" className="relative overflow-hidden bg-[#faf9f5] pt-12 pb-16 sm:pt-20 sm:pb-24">
      {/* Halos d'ambiance KORYXA ultra-doux */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[28rem] w-[42rem] rounded-full bg-[#00a86b]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-72 w-72 rounded-full bg-[#f59e0b]/8 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Partie 1 : Accroche & Titres centrés */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00a86b] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00a86b]" />
            </span>
            <span>Académie d’Excellence Data &amp; IA • Écosystème KORYXA</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-black leading-[1.08] tracking-tight text-slate-950">
            Apprenez la Data &amp; l’IA.<br />
            <em className="text-[#00a86b] not-italic">Des compétences concrètes par la pratique.</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            KORYXA Formation rassemble 8 parcours certifiants intensifs, conçus pour les défis réels du marché africain et international. Développez des compétences recherchées en manipulant de vrais jeux de données et construisez un portfolio prêt pour l’emploi.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a
              href="/formations"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]"
            >
              Explorer les 8 formations <ArrowRight size={18} />
            </a>
            <a
              href="/methode"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Découvrir notre méthode
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#00a86b]" /> Aucun prérequis lourd
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#00a86b]" /> Code en ligne immédiat
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#00a86b]" /> Certifications vérifiables
            </span>
          </div>
        </div>

        {/* Partie 2 : Cockpit Vitrine KORYXA en pleine largeur sous le texte */}
        <div className="relative mx-auto mt-12 sm:mt-16 w-full max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00a86b]/15 text-[#008b58]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-slate-900">KORYXA Formation Kernel</h3>
                  <p className="text-[11px] text-slate-500">8 Filières Certifiantes Actives • Environnement Interactif</p>
                </div>
              </div>
              <span className="rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3 py-1 text-xs font-bold text-[#008b58]">
                Opérationnel
              </span>
            </div>

            {/* Aperçu des 4 filières phares */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Python Data Analyst",
                  tag: "Data & Visualisation",
                  icon: BarChart3,
                  color: "#10b981",
                  href: "/formations/python-data-analyst",
                },
                {
                  title: "LLM RAG Developer",
                  tag: "IA Générative & Vecteurs",
                  icon: BrainCircuit,
                  color: "#8b5cf6",
                  href: "/formations/llm-rag",
                },
                {
                  title: "Power BI Data Analyst",
                  tag: "BI & DAX Avancé",
                  icon: TrendingUp,
                  color: "#f59e0b",
                  href: "/formations/power-bi-data-analyst",
                },
                {
                  title: "Machine Learning",
                  tag: "Modèles Prédictifs",
                  icon: BrainCircuit,
                  color: "#ec4899",
                  href: "/formations/machine-learning-python",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-[#00a86b]/40 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-105"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-900 group-hover:text-[#008b58]">
                          {item.title}
                        </p>
                        <p className="truncate text-[10px] text-slate-500">{item.tag}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-700">Garantie d’authenticité KORYXA</span>
                  <span className="rounded-full bg-[#00a86b]/15 px-2 py-0.5 text-[10px] font-bold text-[#008b58]">100% Vérifiable</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                  Chaque certificat KORYXA est horodaté et vérifiable par employeurs et clients via QR code et identifiant unique.
                </p>
              </div>
              <Link
                href="/formations"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#008b58] transition hover:text-[#00a86b]"
              >
                Voir les 8 parcours du catalogue <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-3xl border border-[#dfe5d8] bg-white/95 p-6 shadow-xl backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {proofMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00a86b]/15 text-[#008b58]">
                <Icon size={20} />
              </div>
              <div>
                <span className="font-serif text-2xl font-black text-slate-950">{item.stat}</span>
                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                <p className="mt-0.5 text-[11px] text-slate-500 leading-tight">{item.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export function FormationsSection() {
  return (
    <section id="formations" className="scroll-mt-24 bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionLabel>
            <Zap size={14} /> Catalogue d&apos;Excellence
          </SectionLabel>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Choisissez le parcours qui propulse vos ambitions.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Chaque formation KORYXA est autonome, certifiante et dotée d’un environnement interactif avec notebooks et jeux de données réels.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formations.map((formation, index) => {
            const Icon = formation.icon;
            return (
              <motion.article
                key={formation.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group flex flex-col justify-between rounded-3xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00a86b] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition group-hover:scale-105"
                      style={{ backgroundColor: formation.accentBg, color: formation.accentColor }}
                    >
                      <Icon size={24} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                        formation.active
                          ? "border border-[#00a86b]/30 bg-[#00a86b]/15 text-[#008b58]"
                          : "border border-slate-200 bg-slate-100 text-slate-500"
                      }`}
                    >
                      {formation.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-slate-950 group-hover:text-[#008b58] transition-colors">
                    {formation.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {formation.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {formation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={formation.href}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                      formation.active
                        ? "bg-slate-50 text-slate-900 group-hover:bg-[#00a86b] group-hover:text-white"
                        : "bg-slate-50 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <span>{formation.cta}</span>
                    <ArrowRight size={14} />
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

export function MethodSection() {
  return (
    <section id="methode" className="scroll-mt-24 border-y border-[#dfe5d8] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionLabel>
              <Workflow size={14} /> Pédagogie KORYXA
            </SectionLabel>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              La Méthode KORYXA :<br />
              <em className="text-[#00a86b] not-italic">Apprendre par l’Action.</em>
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600">
              Chaque formation applique une boucle d’apprentissage rigoureuse. Pas de longues théories passives : vous codez, testez, corrigez et validez des projets concrets étape par étape.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Pratique immédiate dès la première minute",
                "Données réelles issues de contextes économiques concrets",
                "Validation progressive par tests et exercices automatisés",
                "Certification souveraine avec identifiant infalsifiable",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a86b] shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {methodSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-6 transition hover:border-[#00a86b] hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#008b58]">{step.step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/15 text-[#008b58]">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-base sm:text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AudienceSection() {
  return (
    <section id="pour-qui" className="scroll-mt-24 bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionLabel>
            <Users size={14} /> Public Cible
          </SectionLabel>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Pour celles et ceux qui visent l’excellence.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Que vous découvriez la data ou dirigiez une équipe technique, nos parcours s’adaptent avec rigueur et clarté.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {audiences.map((aud, index) => {
            const Icon = aud.icon;
            return (
              <motion.div
                key={aud.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00a86b] hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
                  <Icon size={22} />
                </div>
                <span className="mt-4 inline-block rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                  {aud.badge}
                </span>
                <h3 className="mt-3 font-serif text-lg font-bold text-slate-950">
                  {aud.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {aud.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-[#dfe5d8] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>
            <FileText size={14} /> Réponses aux questions
          </SectionLabel>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Tout ce que vous devez savoir avant de commencer.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Une question spécifique ? Notre équipe et nos assistants IA restent disponibles 24/7 pour vous orienter.
          </p>
          <div className="mt-8">
            <a
              href="mailto:contact.koryxa@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <Mail size={16} className="text-[#00a86b]" /> Poser une question à l’équipe
            </a>
          </div>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 open:bg-white open:shadow-lg transition-all"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-base font-bold text-slate-900">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180 text-[#00a86b]" />
              </summary>
              <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050b08] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
      {/* Halo subtil émeraude */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a86b]/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/20 text-[#4ade80] border border-[#00a86b]/30">
          <Sparkles size={24} />
        </div>

        <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
          Prêt à maîtriser la Data &amp; l’IA ?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
          Rejoignez des centaines d’apprenants, construisez des projets réels et obtenez une certification valorisable immédiatement sur le marché.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3.5 sm:flex-row">
          <a
            href="/formations"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-8 py-4 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.35)] transition hover:bg-[#008b58] hover:-translate-y-0.5"
          >
            Découvrir les 8 parcours <ArrowRight size={18} />
          </a>
          <a
            href="/methode"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/10 hover:-translate-y-0.5"
          >
            Comprendre la méthode
          </a>
        </div>
      </div>
    </section>
  );
}

export function FooterSEO() {
  const socialLinks = [
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61588408132915", icon: Facebook },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/107221300/", icon: Linkedin },
    { label: "WhatsApp", href: "https://wa.me/22892092572?text=Bonjour%20KORYXA%2C%20je%20souhaite%20vous%20contacter.", icon: MessageCircleMore },
    { label: "Email", href: "mailto:contact.koryxa@gmail.com", icon: Mail },
  ];

  return (
    <footer className="border-t border-[#dfe5d8] bg-[#faf9f5] px-4 py-14 text-slate-900 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
        <div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl font-black tracking-tight text-slate-950">
              KORY<span className="text-[#00a86b]">XA</span>
            </span>
            <span className="text-xs font-semibold tracking-wider text-slate-500 mt-1">
              Pôle Formation
            </span>
          </div>
          <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-slate-600">
            Académie d’excellence en Data, IA et Automatisation, conçue pour les professionnels, créateurs et entreprises. Membre officiel de l’écosystème souverain KORYXA.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00a86b] hover:text-[#008b58]"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Formations</p>
          <div className="mt-4 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-600">
            <Link href="/formations/python-data-analyst" className="block hover:text-[#008b58] transition-colors">Python Data Analyst</Link>
            <Link href="/formations/excel-data-analyst" className="block hover:text-[#008b58] transition-colors">Excel Data Analyst</Link>
            <Link href="/formations/llm-rag" className="block hover:text-[#008b58] transition-colors">LLM RAG Developer</Link>
            <Link href="/formations/power-bi-data-analyst" className="block hover:text-[#008b58] transition-colors">Power BI Data Analyst</Link>
            <Link href="/formations/sql-data-analyst" className="block hover:text-[#008b58] transition-colors">SQL Data Analyst</Link>
            <Link href="/formations/machine-learning-python" className="block hover:text-[#008b58] transition-colors">Machine Learning Python</Link>
            <Link href="/formations/data-engineering-python-sql" className="block hover:text-[#008b58] transition-colors">Data Engineering</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Navigation</p>
          <div className="mt-4 space-y-2.5 text-xs sm:text-sm font-semibold text-slate-600">
            <Link href="/formations" className="block hover:text-[#008b58] transition-colors">Catalogue complet</Link>
            <Link href="/methode" className="block hover:text-[#008b58] transition-colors">Notre méthode</Link>
            <Link href="/pour-qui" className="block hover:text-[#008b58] transition-colors">À qui s’adresse KORYXA</Link>
            <Link href="/faq" className="block hover:text-[#008b58] transition-colors">Foire aux questions</Link>
            <a href="https://koryxa.fr" target="_blank" rel="noreferrer" className="block hover:text-[#008b58] transition-colors">Portail KORYXA Mère ↗</a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Écosystème KORYXA</p>
          <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
            <a href="https://merqalor.koryxa.fr" target="_blank" rel="noreferrer" className="block hover:text-[#008b58] transition-colors">MERQALOR — Finance &amp; Trésorerie</a>
            <a href="https://corabiz.koryxa.fr" target="_blank" rel="noreferrer" className="block hover:text-[#008b58] transition-colors">CoraBiz — ERP &amp; Agents PME</a>
            <a href="https://chatlaya.koryxa.fr" target="_blank" rel="noreferrer" className="block hover:text-[#008b58] transition-colors">ChatLAYA — IA Conversationnelle</a>
            <a href="https://service-ia.koryxa.fr" target="_blank" rel="noreferrer" className="block hover:text-[#008b58] transition-colors">Service IA &amp; Web — Studio</a>
            <a href="https://koryxa.fr/contact" target="_blank" rel="noreferrer" className="mt-4 block font-bold text-[#008b58] hover:text-[#00a86b] transition-colors">
              Portail Partenaires &amp; Contact →
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#dfe5d8] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} KORYXA — Pôle Formation. Tous droits réservés.</span>
        <span>Infrastructure IA Souveraine Africaine • Écosystème KORYXA</span>
      </div>
    </footer>
  );
}

export function KoryxaFormationPortal() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-slate-950 focus:shadow-xl"
      >
        Aller au contenu
      </a>
      <Header />
      <Hero />
      <ProofStrip />
      <FormationsSection />
      <MethodSection />
      <AudienceSection />
      <FAQSection />
      <FinalCTA />
      <FooterSEO />
    </main>
  );
}
