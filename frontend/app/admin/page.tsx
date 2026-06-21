import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Construction, ShieldCheck, LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Ancien admin fermé — KORYXA Formation",
  description: "L’ancien admin local de KORYXA Formation est fermé pendant la migration vers KORYXA Admin.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyAdminMaintenancePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,.18),transparent_28rem),radial-gradient(circle_at_82%_20%,rgba(59,130,246,.15),transparent_30rem),linear-gradient(180deg,#050914_0%,#06111f_60%,#050914_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60" />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <Link href="/" className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-slate-200 backdrop-blur-xl transition hover:bg-white/[0.1]">
          <ArrowLeft size={16} /> Retour au portail
        </Link>

        <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-10 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-100">
            <Construction size={15} /> Ancien admin fermé
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">
            L’administration Formation passe dans KORYXA Admin.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Cette ancienne interface locale est volontairement fermée pendant la migration afin d’éviter toute création, révocation ou correction d’accès en dehors de KORYXA Admin.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: LockKeyhole, title: "Routes fermées", text: "Pas d’ancien admin local." },
              { icon: ShieldCheck, title: "Source centrale", text: "KORYXA Admin pilote les accès." },
              { icon: Construction, title: "Migration", text: "Réouverture après test complet." },
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
        </section>
      </div>
    </main>
  );
}
