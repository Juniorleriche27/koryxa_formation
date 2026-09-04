import { Brain, CheckCircle2, CircleHelp, Flag, ListChecks, ShieldCheck } from "lucide-react";

const formats = [
  {
    title: "QCM",
    description: "Vérifier les notions, l’architecture et les choix techniques.",
    icon: ListChecks,
  },
  {
    title: "Vrai / faux",
    description: "Repérer rapidement une idée fausse ou une mauvaise pratique.",
    icon: CheckCircle2,
  },
  {
    title: "Compréhension",
    description: "Expliquer le rôle d’un composant ou diagnostiquer une situation.",
    icon: Brain,
  },
  {
    title: "Mini-défi",
    description: "Choisir la meilleure action dans un cas concret de projet RAG.",
    icon: Flag,
  },
] as const;

export function LlmRagQuizPreview() {
  return (
    <section className="bg-[#faf9f5] border-t border-[#dfe5d8] px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008b58] shadow-sm">
            <CircleHelp size={14} /> Quiz et validations
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950">
            Valider la compréhension avant de débloquer la suite.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Chaque module possède une validation courte. Après soumission, l’apprenant reçoit la bonne réponse, une explication et les notions à revoir.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-emerald-200 bg-[#00a86b]/10 p-6 text-slate-950">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Seuil de réussite</p>
            <p className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-[#008b58]">12/20</p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Une validation réussie débloque le module suivant. Une tentative échouée recommande les parties à revoir.
            </p>
          </div>
          <div className="rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm text-slate-950">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#00a86b]" />
              <div>
                <p className="font-bold text-slate-900">Réponses protégées avant soumission</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  L’API publique du quiz ne renvoie jamais la bonne réponse. Les corrections détaillées apparaissent uniquement après l’enregistrement de la tentative.
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-4 text-sm leading-relaxed text-slate-600">
              Le dernier module contient également un test final de connaissances avant la remise du projet.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
