interface StatsProps {
  totalModules: number;
  completedModules: number;
  percentage: number;
}

export default function Stats({ totalModules, completedModules, percentage }: StatsProps) {
  const stats = [
    { label: "Modules terminés", value: `${completedModules} / ${totalModules}` },
    { label: "Progression",      value: `${percentage}%` },
    { label: "Modules restants", value: totalModules - completedModules },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center backdrop-blur-sm">
          <p className="text-2xl font-bold text-blue-400">{s.value}</p>
          <p className="text-slate-400 text-sm mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
