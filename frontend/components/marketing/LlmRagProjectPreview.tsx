import { CheckCircle2, Database, FileCode2, Flag, Layers3, Rocket, ShieldCheck, Trophy } from "lucide-react";

const milestones = [
  "Initialiser le projet",
  "Préparer le corpus",
  "Valider le chunking",
  "Indexer dans Qdrant",
  "Évaluer le retrieval",
  "Valider les réponses",
  "Créer l’interface",
  "Terminer la recette",
  "Remettre et présenter",
] as const;

const minimumVersion = [
  "3 documents autorisés minimum",
  "Chunks avec métadonnées",
  "Indexation Qdrant idempotente",
  "Réponses avec sources",
  "Refus hors contexte",
  "Interface Streamlit",
] as const;

const advancedVersion = [
  "Filtres par catégorie",
  "Reranking",
  "Évaluation automatique",
  "Suivi coût et latence",
  "Support multi-format",
  "Déploiement cloud",
] as const;

export function LlmRagProjectPreview() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#06251c] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#bcf5d7]">
            <Rocket size={14} /> Projet fil rouge
          </span>
          <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl">
            Construire l’application finale étape par étape.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Le projet commence dès les premiers modules. Chaque jalon produit un livrable vérifiable avant l’assemblage final.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#06251c]/10 bg-[#f5fbf7] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                <Flag size={22} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#008f58]">9 jalons</p>
                <h3 className="text-2xl font-black tracking-[-0.03em] text-[#06251c]">Une progression continue</h3>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {milestones.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#06251c] text-xs font-black text-[#bcf5d7]">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold leading-6 text-[#06251c]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#06251c] p-6 text-white sm:p-8">
            <Database className="h-7 w-7 text-[#bcf5d7]" />
            <h3 className="mt-5 text-3xl font-black tracking-[-0.04em]">Corpus autorisé uniquement</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">
              L’apprenant utilise des documents créés par lui, libres de droits, publics avec autorisation d’usage ou fournis explicitement pour la formation.
            </p>
            <div className="mt-5 flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#bcf5d7]" />
              <p className="text-sm leading-7 text-white/65">
                Aucune donnée personnelle sensible, confidentielle ou collectée sans autorisation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-[#06251c]/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <FileCode2 className="h-6 w-6 text-[#00bd72]" />
              <h3 className="text-2xl font-black tracking-[-0.03em] text-[#06251c]">Version minimale</h3>
            </div>
            <div className="mt-5 space-y-3">
              {minimumVersion.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00bd72]" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-[#06251c]/10 bg-[#f5fbf7] p-6">
            <div className="flex items-center gap-3">
              <Layers3 className="h-6 w-6 text-[#00bd72]" />
              <h3 className="text-2xl font-black tracking-[-0.03em] text-[#06251c]">Version avancée</h3>
            </div>
            <div className="mt-5 space-y-3">
              {advancedVersion.map((item) => (
                <div key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#00bd72]" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#00bd72] p-6 text-[#06251c] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Trophy className="h-8 w-8" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.16em]">Évaluation sur 60 points</p>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">Un barème transparent.</h3>
            </div>
            <p className="text-sm font-semibold leading-7 text-[#06251c]/75">
              Fonctionnement, retrieval, fidélité, citations, sécurité, qualité du code, tests, interface, documentation et présentation sont évalués séparément. La solution de référence reste protégée et séparée de l’espace apprenant.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
