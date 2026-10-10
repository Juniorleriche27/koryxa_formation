interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <section className="rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Progression globale</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Avancement de votre parcours</h2>
        </div>
        <p className="text-3xl font-black tracking-tight text-[#008b58]">{percentage}%</p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
        <div
          className="h-full rounded-full bg-[#00a86b] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">
        Avancez module par module. Pratiquez, réussissez les QCM de validation et progressez vers l&apos;obtention de votre certificat officiel KORYXA.
      </p>
    </section>
  );
}
