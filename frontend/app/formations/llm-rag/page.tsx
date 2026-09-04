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
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";
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

// KORYXA FORMATION - Header autonome pour LLM RAG
const CourseHeader = Header;

export default function LlmRagLandingPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <CourseHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm">
            <Sparkles size={14} className="text-[#00a86b]" /> Formation LLM RAG · Projet Portfolio · Certificat Officiel
          </span>

          <h1 className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]">
            De documents bruts à un assistant RAG fiable et prêt pour la production.
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center">
            Maîtrisez Python, embeddings, Qdrant, retrieval, prompting professionnel et Streamlit en construisant un assistant documentaire prêt pour l’entreprise qui cite précisément ses sources.
          </p>

          {/* Centered CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PurchaseCourseLink
              courseSlug={LLM_RAG_COURSE_SLUG}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
            >
              Commencer la formation <ArrowRight size={16} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
            >
              <PlayCircle size={16} /> Voir le programme
            </a>
          </div>

          {/* Centered reassurance checkmarks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5"><LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat et à vie</span>
            <span className="inline-flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" /> 49 000 FCFA tarif unique</span>
            <span className="inline-flex items-center gap-1.5"><Award size={15} className="text-[#00a86b]" /> Certificat KORYXA inclus</span>
          </div>

          {/* Centered showcase card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfe5d8] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Projet fil rouge</p>
                <h2 className="mt-1 text-2xl font-serif font-bold text-slate-950">Assistant documentaire avec réponses sourcées</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                Livrable Portfolio
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Ingestion & validation de documents",
                "Découpage en chunks & métadonnées",
                "Embeddings & indexation Qdrant",
                "Recherche sémantique & filtrage",
                "Génération sourcée & anti-hallucination",
                "Interface de test Streamlit",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00a86b]/10 text-xs font-bold text-[#008b58]">{index + 1}</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-[#dfe5d8]">
              {[
                [Clock3, "28 h", "Durée estimée"],
                [GraduationCap, "12", "Modules pratiques"],
                [BookOpenCheck, "26", "Leçons guidées"],
                [Target, "1", "Projet complet"],
              ].map(([Icon, value, label]) => {
                const ItemIcon = Icon as typeof Clock3;
                return (
                  <div key={label as string} className="rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-center">
                    <ItemIcon size={16} className="mx-auto text-[#00a86b]" />
                    <p className="mt-1.5 text-lg font-bold text-slate-950">{value as string}</p>
                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi cette compétence compte */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Pourquoi cette compétence compte
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              L’IA devient utile quand elle sait travailler avec les documents de l’entreprise.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Le RAG répond à un problème concret : permettre à une organisation d’interroger ses procédures, contrats, guides et bases de connaissances sans laisser le modèle inventer librement.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {importancePoints.map(({ title, text, icon: Icon }, index) => (
              <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <Icon size={22} />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#008b58]">Enjeu 0{index + 1}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Débouchés professionnels</p>
              <h3 className="mt-1 text-xl font-bold text-slate-950">Des opportunités concrètes sur le marché de l’IA appliquée</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {careerOutcomes.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span className="text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compétences acquises */}
      <section id="methode" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <Target size={14} /> Objectifs opérationnels
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Vous ne construisez pas un simple chatbot.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous construisez une application capable de retrouver les bons passages, citer ses sources, refuser ce qu’elle ne sait pas et rester vérifiable.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {skills.map((skill) => (
              <div key={skill} className="flex items-start gap-3 rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme complet */}
      <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Layers3 size={14} /> Programme détaillé
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Du concept au produit déployable.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Chaque module produit un livrable vérifiable : schéma d’architecture, script d’ingestion, index vectoriel, moteur de retrieval, prompt sécurisé, interface ou test unitaire.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(([number, title, description, duration, Icon]) => (
              <article
                key={number}
                className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm transition hover:border-[#00a86b]/40 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#dfe5d8] text-[#008b58] shadow-sm">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-[#008b58] shadow-sm">
                      {duration}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-[#008b58]">Module {number}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Previews */}
      <LlmRagTheoryPreview />
      <LlmRagExercisePreview />
      <LlmRagQuizPreview />
      <div id="projet"><LlmRagProjectPreview /></div>
      <LlmRagSecurityPreview />

      {/* Pricing section */}
      <section id="prix" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-t border-[#dfe5d8]">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
            <Award size={14} /> Tarif d’accès
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Prêt à maîtriser le RAG ?
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Rejoignez la formation et construisez votre assistant documentaire dès aujourd’hui.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Tarif d’accès complet</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">69 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Tarif de lancement · Accès à vie garanti</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules structurés du corpus à la production",
                "5 notebooks pratiques et code source complet",
                "Projet final prêt pour votre portfolio technique",
                "Certificat d’achèvement officiel KORYXA",
                "Accès continu aux futures mises à jour",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug={LLM_RAG_COURSE_SLUG}
                className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
              >
                S’inscrire à la formation <ArrowRight size={16} />
              </PurchaseCourseLink>
              <Link
                href={courseRoutes.access(LLM_RAG_COURSE_SLUG)}
                className="mt-3 inline-block text-xs font-semibold text-slate-500 hover:text-[#008b58] transition-colors"
              >
                Déjà inscrit ? Accéder à la formation →
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">Paiement sécurisé via Mobile Money (Wave, Orange, MTN, Moov) ou Carte Bancaire</p>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
