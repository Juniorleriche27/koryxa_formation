import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Bot,
  Braces,
  CheckCircle2,
  BriefcaseBusiness,
  Clock3,
  Database,
  FileSearch,
  GraduationCap,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Rocket,
  Network,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Target,
  Workflow,
} from "lucide-react";
import { courseRoutes, LLM_RAG_COURSE_SLUG } from "@/lib/courseConfig";
import {
  LlmRagExercisePreview,
  LlmRagProjectPreview,
  LlmRagQuizPreview,
  LlmRagSecurityPreview,
  LlmRagTheoryPreview,
} from "@/components/marketing/llm-rag";

export const metadata = {
  title: "Formation LLM RAG Developer | KORYXA Formation",
  description:
    "Construisez un assistant documentaire avec Python, embeddings, Qdrant, génération sourcée et interface Streamlit.",
};

const accessUrl = courseRoutes.access(LLM_RAG_COURSE_SLUG);

const modules = [
  ["01", "Comprendre les LLM et le RAG", "Modèles de langage, hallucinations, recherche augmentée et architecture globale.", "1h30", Bot],
  ["02", "Préparer l’environnement", "Python, VS Code, environnement virtuel, configuration et structure professionnelle.", "2h", Braces],
  ["03", "Charger les documents", "Extraction, nettoyage, métadonnées et validation des fichiers.", "2h30", FileSearch],
  ["04", "Découper en chunks", "Stratégies de découpage, tokens, chevauchement et compromis qualité/coût.", "2h30", Layers3],
  ["05", "Créer les embeddings", "Vectorisation, similarité, traitement par lots et reprise sur erreur.", "2h30", Network],
  ["06", "Indexer avec Qdrant", "Collections, points, payloads, filtres et maintenance de l’index.", "3h", Database],
  ["07", "Rechercher les bons passages", "Top-k, seuils, filtres et évaluation de la pertinence documentaire.", "3h", SearchCheck],
  ["08", "Construire le prompt RAG", "Contexte, citations, refus hors sujet et protection contre les injections.", "2h30", MessageSquareText],
  ["09", "Générer et évaluer", "Réponses sourcées, fidélité, coût, latence et jeu de tests.", "3h", Workflow],
  ["10", "Créer l’interface Streamlit", "Expérience de question-réponse, historique, sources et erreurs.", "2h30", Sparkles],
  ["11", "Sécuriser et mettre en ligne", "Tests, secrets, fichiers, logs, quotas et checklist de déploiement.", "2h", ShieldCheck],
  ["12", "Projet final", "Un assistant documentaire RAG complet, testé, documenté et présentable.", "3h", GraduationCap],
] as const;

const skills = [
  "Concevoir une architecture RAG complète",
  "Préparer et découper des documents",
  "Créer et stocker des embeddings",
  "Interroger une base vectorielle Qdrant",
  "Produire des réponses avec citations",
  "Évaluer la qualité d’un pipeline RAG",
  "Créer une interface Streamlit",
  "Sécuriser et documenter le projet",
];


const importancePoints = [
  {
    title: "Les entreprises veulent exploiter leurs propres données",
    text: "Un chatbot généraliste ne connaît ni les procédures internes, ni les contrats, ni les documents métier. Le RAG permet de connecter l’IA à une base documentaire contrôlée.",
    icon: Database,
  },
  {
    title: "La confiance exige des sources vérifiables",
    text: "Dans un contexte professionnel, une réponse fluide ne suffit pas. Il faut retrouver les bons passages, citer les sources et refuser lorsque le contexte est insuffisant.",
    icon: ShieldCheck,
  },
  {
    title: "Le marché a besoin de profils capables de livrer",
    text: "Cette formation vous apprend à passer du prototype à une application démontrable : ingestion, recherche vectorielle, interface, évaluation, sécurité et déploiement.",
    icon: BriefcaseBusiness,
  },
];

const careerOutcomes = [
  "Développeur d’assistants documentaires",
  "Intégrateur IA pour PME et organisations",
  "Consultant automatisation et recherche documentaire",
  "Prototypeur de produits IA internes",
];

function CourseHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-300/10 bg-[#041b15]/88 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/formations/llm-rag" className="flex items-center gap-3" aria-label="Accueil Formation LLM RAG">
          <Image src="/assets/brand/koryxa-formation-mark.webp" alt="KORYXA Formation" width={42} height={42} className="h-10 w-10 object-contain" priority />
          <span className="leading-tight">
            <span className="block text-sm font-black tracking-[0.08em] text-white sm:text-base">KORYXA FORMATION</span>
            <span className="block text-xs font-semibold text-emerald-200/70">LLM RAG Developer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-black text-slate-300 lg:flex" aria-label="Navigation de la formation LLM RAG">
          <a href="#programme" className="transition hover:text-white">Programme</a>
          <a href="#methode" className="transition hover:text-white">Méthode</a>
          <a href="#projet" className="transition hover:text-white">Projet</a>
          <a href="#prix" className="transition hover:text-white">Prix</a>
        </nav>

        <Link href={accessUrl} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-xs font-black text-[#06251c] shadow-xl transition hover:-translate-y-0.5 hover:bg-emerald-100 sm:px-5 sm:text-sm">
          Accéder <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}

function CourseFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#03140f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/brand/koryxa-formation-mark.webp" alt="KORYXA Formation" width={40} height={40} className="h-10 w-10 object-contain" />
          <div><p className="font-black">KORYXA Formation</p><p className="text-sm text-slate-400">Parcours LLM RAG Developer</p></div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
          <Link href="/formations" className="hover:text-white">Toutes les formations</Link>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <Link href={accessUrl} className="text-emerald-300 hover:text-emerald-200">Espace apprenant</Link>
        </div>
      </div>
    </footer>
  );
}

export default function LlmRagLandingPage() {
  return (
    <main className="min-h-screen bg-[#041b15] text-white">
      <CourseHeader />

      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,.26),transparent_28rem),radial-gradient(circle_at_86%_36%,rgba(34,211,238,.12),transparent_30rem),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[length:auto,auto,64px_64px,64px_64px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.12fr_.72fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-emerald-200">
              <Sparkles size={14} /> Formation LLM RAG · Projet portfolio · Certificat
            </span>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[5.8rem]">
              De documents bruts à un <span className="bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">assistant RAG fiable</span> et présentable.
            </h1>
            <p className="mt-7 max-w-3xl text-base font-semibold leading-8 text-slate-300 sm:text-xl sm:leading-9">
              Apprenez Python, embeddings, Qdrant, retrieval, prompting et Streamlit en construisant un assistant documentaire qui répond avec ses sources.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={accessUrl} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-7 py-4 text-sm font-black text-[#05261c] shadow-2xl shadow-emerald-500/20 transition hover:-translate-y-1 hover:bg-emerald-300">
                Accéder à la formation <ArrowRight size={18} />
              </Link>
              <a href="#programme" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-black text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10">
                <PlayCircle size={18} /> Voir le programme
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-slate-300">
              <span className="inline-flex items-center gap-2"><LockKeyhole size={15} className="text-emerald-300" /> Accès sécurisé</span>
              <span className="inline-flex items-center gap-2"><Star size={15} className="text-amber-300" /> Tarif visible à l’accès</span>
              <span className="inline-flex items-center gap-2"><Award size={15} className="text-cyan-300" /> Certificat inclus</span>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/12 bg-white/[0.07] p-5 shadow-2xl shadow-emerald-950/40 backdrop-blur-2xl sm:p-7">
            <div className="rounded-[1.5rem] border border-emerald-300/15 bg-[#092d23] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Projet final</p>
              <h2 className="mt-3 text-2xl font-black">Assistant documentaire avec réponses sourcées</h2>
              <div className="mt-6 space-y-3">
                {["Ingestion de documents", "Recherche vectorielle", "Réponses avec citations", "Interface Streamlit", "Tests et sécurité"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.05] p-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-xs font-black text-emerald-200">{index + 1}</span>
                    <span className="text-sm font-bold text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[[Clock3, "28 h", "Durée"], [GraduationCap, "12", "Modules"], [BookOpenCheck, "26", "Leçons"], [Target, "1", "Projet"]].map(([Icon, value, label]) => {
                const ItemIcon = Icon as typeof Clock3;
                return <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"><ItemIcon size={18} className="text-emerald-300"/><p className="mt-3 text-xl font-black">{value as string}</p><p className="text-xs font-bold uppercase tracking-[.12em] text-slate-500">{label as string}</p></div>;
              })}
            </div>
          </aside>
        </div>
      </section>


      <section className="bg-white px-4 py-20 text-[#06251c] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-800"><TrendingUp size={14}/> Pourquoi cette compétence compte maintenant</span>
              <h2 className="mt-6 text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-5xl">L’IA devient vraiment utile quand elle sait travailler avec les documents de l’entreprise.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">Le RAG répond à un problème concret : permettre à une organisation d’interroger ses procédures, contrats, guides, rapports ou bases de connaissances sans laisser le modèle inventer librement.</p>
              <div className="mt-8 rounded-[1.75rem] bg-[#06251c] p-6 text-white">
                <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-200">Débouchés possibles</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">{careerOutcomes.map(item => <p key={item} className="flex gap-2 text-sm font-bold leading-6 text-slate-200"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-300"/>{item}</p>)}</div>
              </div>
            </div>
            <div className="grid gap-5">
              {importancePoints.map(({ title, text, icon: Icon }, index) => <article key={title} className="rounded-[1.75rem] border border-emerald-950/10 bg-[#f4fbf7] p-6 sm:p-8"><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-200 text-emerald-950"><Icon size={22}/></span><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Enjeu {index + 1}</p><h3 className="mt-2 text-2xl font-black tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{text}</p></div></div></article>)}
              <div className="rounded-[1.75rem] border border-emerald-300/30 bg-emerald-100 p-6 sm:p-8"><div className="flex gap-4"><Rocket className="mt-1 shrink-0 text-emerald-800"/><div><p className="font-black text-emerald-950">À la fin, vous ne présentez pas seulement un certificat.</p><p className="mt-2 text-sm leading-7 text-emerald-950/75">Vous présentez un assistant documentaire RAG complet, testable, sourcé et suffisamment structuré pour devenir une preuve de compétence ou la base d’un service client.</p></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="methode" className="bg-[#f4fbf7] px-4 py-20 text-[#06251c] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-200 px-4 py-2 text-xs font-black uppercase tracking-[.16em]"><Target size={14}/> Résultat concret</span>
            <h2 className="mt-6 text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-5xl">Vous ne construisez pas un simple chatbot.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">Vous construisez une application capable de retrouver les bons passages, citer ses sources, refuser ce qu’elle ne sait pas et rester testable.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => <div key={skill} className="flex gap-3 rounded-[1.5rem] border border-emerald-950/10 bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"/><p className="text-sm font-bold leading-7">{skill}</p></div>)}
          </div>
        </div>
      </section>

      <section id="programme" className="bg-white px-4 py-20 text-[#06251c] sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#06251c] px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Layers3 size={14}/> Programme complet</span>
            <h2 className="mt-6 text-4xl font-black leading-[.98] tracking-[-.05em] sm:text-6xl">Du concept au produit déployable.</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">Chaque module produit une preuve concrète : schéma, script, index, moteur de recherche, prompt, interface ou test.</p>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {modules.map(([number, title, description, duration, Icon]) => (
              <article key={number} className="group rounded-[1.75rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-xl">
                <div className="flex items-start justify-between gap-4"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100"><Icon size={22}/></span><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700">{duration}</span></div>
                <p className="mt-6 text-xs font-black uppercase tracking-[.16em] text-emerald-600">Module {number}</p><h3 className="mt-2 text-2xl font-black tracking-[-.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LlmRagTheoryPreview />
      <LlmRagExercisePreview />
      <LlmRagQuizPreview />
      <div id="projet"><LlmRagProjectPreview /></div>
      <LlmRagSecurityPreview />

      <section id="prix" className="bg-[#041b15] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-emerald-950/40 sm:p-10">
          <div className="grid gap-9 lg:grid-cols-[1fr_22rem] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Award size={14}/> Formation complète</span>
              <h2 className="mt-6 text-4xl font-black tracking-[-.05em] sm:text-5xl">Apprenez, construisez et présentez votre assistant RAG.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Leçons guidées, notebooks, exercices, quiz, projet fil rouge, assistant IA et certificat KORYXA.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{["12 modules progressifs", "5 notebooks pratiques", "Projet final portfolio", "Certificat inclus"].map(item=><p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-200"><CheckCircle2 size={16} className="text-emerald-300"/>{item}</p>)}</div>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 text-slate-950 shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[.18em] text-emerald-700">Prix de la formation</p>
              <p className="mt-4 text-4xl font-black tracking-tight">49 000 FCFA</p>
              <div className="mt-2 flex items-center gap-3"><span className="text-sm font-bold text-slate-400 line-through">69 000 FCFA</span><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-emerald-800">Tarif de lancement</span></div>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-500">Paiement unique. Leçons, notebooks, ressources officielles, exercices, projet final et certificat inclus.</p>
              <Link href={accessUrl} className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-emerald-700">Accéder à la formation <ArrowRight size={17}/></Link>
            </div>
          </div>
        </div>
      </section>

      <CourseFooter />
    </main>
  );
}
