import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  Braces,
  CheckCircle2,
  Clock3,
  Database,
  FileSearch,
  GraduationCap,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Network,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";
import {
  LlmRagExercisePreview,
  LlmRagProjectPreview,
  LlmRagQuizPreview,
  LlmRagSecurityPreview,
  LlmRagTheoryPreview,
} from "@/components/marketing/llm-rag";

export const metadata = {
  title: "Formation LLM RAG Developer | KORYXA Pôle Formation",
  description:
    "Construisez un assistant documentaire avec Python, embeddings, Qdrant, génération sourcée et interface Streamlit.",
};

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
  ["11", "Sécuriser et préparer la mise en ligne", "Tests, secrets, fichiers, logs, quotas et checklist de déploiement.", "2h", ShieldCheck],
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

export default function LlmRagLandingPage() {
  return (
    <main className="kx-marketing min-h-screen bg-white pt-16 text-[#06251c] lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,189,114,.28),transparent_30rem),radial-gradient(circle_at_88%_70%,rgba(188,245,215,.14),transparent_26rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.75fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#bcf5d7]/30 bg-[#bcf5d7]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <Sparkles size={14} /> Parcours en préparation
            </span>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Construisez un assistant documentaire avec LLM et RAG.
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-white/75 sm:text-lg">
              Apprenez à transformer des documents en réponses utiles, traçables et sourcées avec Python, embeddings, Qdrant et Streamlit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#programme" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">
                Voir le programme <ArrowRight size={17} />
              </a>
              <Link href="/faq" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/8 px-6 py-3.5 text-sm font-black text-white backdrop-blur-md transition hover:bg-white/14">
                Poser une question
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                [Clock3, "Durée estimée", "28 heures"],
                [GraduationCap, "Niveau", "Débutant technique à intermédiaire"],
                [BookOpenCheck, "Format", "12 modules + exercices + quiz"],
                [Target, "Livrable", "Assistant RAG avec sources"],
              ].map(([Icon, label, value]) => {
                const ItemIcon = Icon as typeof Clock3;
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                    <ItemIcon size={20} className="text-[#bcf5d7]" />
                    <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-white/45">{label as string}</p>
                    <p className="mt-2 text-sm font-black leading-6 text-white">{value as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
              <Target size={14} /> Résultat attendu
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">
              Vous ne construisez pas un simple chatbot.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Le projet final doit répondre à partir d’un corpus réel, montrer les passages utilisés, refuser les réponses non couvertes et rester testable.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill} className="flex gap-3 rounded-[1.5rem] border border-[#06251c]/10 bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00bd72]" />
                <p className="text-sm font-bold leading-7 text-[#06251c]">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#06251c] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
              <Layers3 size={14} /> Programme complet
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Une progression du concept au projet déployable.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Chaque module débouche sur une preuve concrète : schéma, script, index, moteur de recherche, prompt, interface ou test.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {modules.map(([number, title, description, duration, Icon]) => (
              <article key={number} className="group rounded-[1.75rem] border border-[#06251c]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#00bd72]/35 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                    <Icon size={22} />
                  </span>
                  <span className="rounded-full bg-[#f2fbf5] px-3 py-1.5 text-xs font-black text-[#008f58]">{duration}</span>
                </div>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#00bd72]">Module {number}</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LlmRagTheoryPreview />
      <LlmRagExercisePreview />
      <LlmRagQuizPreview />
      <LlmRagProjectPreview />
      <LlmRagSecurityPreview />

      <section className="bg-[#06251c] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/12 bg-white/8 p-7 sm:p-9">
            <LockKeyhole className="h-7 w-7 text-[#bcf5d7]" />
            <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">Prérequis</h2>
            <div className="mt-6 space-y-3 text-sm leading-7 text-white/70">
              <p>• Bases simples de Python.</p>
              <p>• Savoir utiliser un terminal et installer des dépendances.</p>
              <p>• Notions de Git recommandées, mais pas obligatoires.</p>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#00bd72] p-7 text-[#06251c] sm:p-9">
            <GraduationCap className="h-7 w-7" />
            <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">Projet final</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#06251c]/75">
              Une application RAG complète qui ingère des documents, retrouve les passages pertinents, produit une réponse sourcée et affiche clairement ses références.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#06251c]/10 bg-white p-7 text-center shadow-sm sm:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#06251c]/6 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
            Parcours en préparation
          </span>
          <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] sm:text-5xl">L’accès apprenant ouvrira après la recette complète.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
            Le programme est structuré, mais les modules restent volontairement non publiés pour protéger l’expérience des apprenants et le parcours Python existant.
          </p>
          <Link href="/formations" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#06251c] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#00bd72] hover:text-[#06251c]">
            Retour au catalogue <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
