import { ArrowRight, BookOpenCheck, BrainCircuit, Database, FileSearch, Network, ShieldCheck } from "lucide-react";

const glossary = [
  ["LLM", "Modèle qui génère du texte token après token."],
  ["RAG", "Recherche documentaire suivie d’une génération fondée sur les passages retrouvés."],
  ["Chunk", "Segment de document utilisé pour l’indexation et la recherche."],
  ["Embedding", "Vecteur numérique représentant le sens d’un texte."],
  ["Métadonnée", "Information qui permet d’identifier et de filtrer une source."],
  ["Prompt système", "Règles prioritaires qui encadrent le comportement du modèle."],
] as const;

const flow = [
  [FileSearch, "Documents"],
  [BookOpenCheck, "Chunks"],
  [Network, "Embeddings"],
  [Database, "Qdrant"],
  [BrainCircuit, "Réponse sourcée"],
] as const;

export function LlmRagTheoryPreview() {
  return (
    <section className="bg-[#faf9f5] border-t border-[#dfe5d8] px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008b58] shadow-sm">
            <BookOpenCheck size={14} /> Supports théoriques
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950">
            Comprendre chaque concept avant de l’implémenter.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Le parcours comprend des fiches théoriques, un glossaire, des schémas et des aide-mémoires utilisables pendant les exercices.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-[#dfe5d8] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {flow.map(([Icon, label], index) => (
              <div key={label} className="flex flex-1 items-center gap-4 lg:flex-col lg:text-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                  <Icon size={22} />
                </span>
                <span className="text-sm font-bold text-slate-900">{label}</span>
                {index < flow.length - 1 && <ArrowRight className="ml-auto h-5 w-5 text-[#00a86b] lg:ml-0 lg:rotate-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glossary.map(([term, definition]) => (
            <article key={term} className="rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">{term}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{definition}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed">
            Les supports complets restent non publiés jusqu’à la recette du parcours. Cette prévisualisation montre uniquement le niveau de structuration prévu.
          </p>
        </div>
      </div>
    </section>
  );
}
