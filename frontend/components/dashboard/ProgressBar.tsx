interface ProgressBarProps {
  percentage: number;
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">Progression globale</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Ton parcours Python Data</h2>
        </div>
        <p className="text-4xl font-black tracking-tight text-white">{percentage}%</p>
      </div>
      <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-950/70 ring-1 ring-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-300 shadow-lg shadow-blue-500/30 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Continue module par module. L’objectif est simple : pratiquer, comprendre, terminer et obtenir ton certificat.
      </p>
    </section>
  );
}
