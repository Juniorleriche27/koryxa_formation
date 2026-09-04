import { FileCheck2, KeyRound, LockKeyhole, ShieldAlert } from "lucide-react";

const controls = [
  [FileCheck2, "Documents contrôlés", "Extensions, type MIME, taille et nom de fichier sont validés avant traitement."],
  [ShieldAlert, "Prompt injection", "Le corpus est traité comme une donnée, jamais comme une instruction prioritaire."],
  [KeyRound, "Secrets protégés", "Aucune clé, configuration interne ou erreur brute ne doit apparaître dans les réponses."],
  [LockKeyhole, "Accès aux solutions", "Les solutions et contenus non publiés restent protégés derrière les contrôles d’accès."],
] as const;

export function LlmRagSecurityPreview() {
  return (
    <section className="bg-white border-t border-[#dfe5d8] px-4 py-20 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">
            <LockKeyhole size={14} /> Sécurité intégrée
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-950">
            Protéger les documents, les utilisateurs et les réponses.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Le parcours apprend à traiter la sécurité comme une partie du produit : validation des fichiers, refus hors contexte, secrets absents des logs et accès contrôlés.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {controls.map(([Icon, title, description]) => (
            <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
