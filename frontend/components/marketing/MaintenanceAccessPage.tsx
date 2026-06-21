import Link from "next/link";
import { ArrowLeft, Construction, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";

export function MaintenanceAccessPage({ source = "access" }: { source?: "access" | "login" | "register" }) {
  const label = source === "login" ? "Connexion" : source === "register" ? "Inscription" : "Accès apprenant";

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,.18),transparent_28rem),radial-gradient(circle_at_82%_20%,rgba(59,130,246,.15),transparent_30rem),linear-gradient(180deg,#050914_0%,#06111f_60%,#050914_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <Link href="/" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-slate-200 backdrop-blur-xl transition hover:bg-white/[0.1]">
          <ArrowLeft size={16} /> Retour au portail
        </Link>

        <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-slate-950/40 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[1fr_0.82fr]">
            <div className="p-6 sm:p-10 lg:p-14">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-100">
                <Construction size={15} /> Maintenance active
              </div>
              <h1 className="mt-7 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                {label} temporairement fermé pendant la migration KORYXA Admin.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                La plateforme Formation évolue vers une entrée centralisée. L’ancien accès apprenant n’est pas remis en service pendant cette maintenance afin d’éviter les accès incohérents.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: LockKeyhole, title: "Accès fermé", text: "Pas de fallback public." },
                  { icon: ShieldCheck, title: "Migration", text: "Pont KORYXA Admin en préparation." },
                  { icon: Sparkles, title: "Réouverture", text: "Parcours plus propre et centralisé." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                      <Icon className="h-5 w-5 text-emerald-200" />
                      <p className="mt-3 font-black text-white">{item.title}</p>
                      <p className="mt-1 text-sm font-semibold leading-6 text-slate-400">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[24rem] border-t border-white/10 bg-slate-950/50 p-6 sm:p-10 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,.22),transparent_18rem)]" />
              <div className="relative flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">État actuel</p>
                  <div className="mt-5 space-y-3">
                    {[
                      "/ reste le portail général",
                      "/formations/python-data-analyst reste la landing Data Analyse",
                      "/dashboard reste protégé",
                      "KORYXA Admin devient l’entrée future",
                    ].map((item) => (
                      <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-bold text-slate-200">{item}</p>
                    ))}
                  </div>
                </div>
                <p className="mt-8 text-sm leading-7 text-slate-400">
                  Cette page est volontairement informative. Elle ne collecte pas de code, ne crée pas de session et ne contourne pas la maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
