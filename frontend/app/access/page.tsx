"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  KeyRound,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function AccessForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const partnerCtx = searchParams.get("partner_ctx");
  const partnerSig = searchParams.get("partner_sig");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingPartnerAccess, setCheckingPartnerAccess] = useState(Boolean(partnerCtx && partnerSig));

  useEffect(() => {
    if (!partnerCtx || !partnerSig) {
      setCheckingPartnerAccess(false);
      return;
    }

    let cancelled = false;

    async function checkPartnerAccess() {
      const response = await fetch("/api/access/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partner_ctx: partnerCtx, partner_sig: partnerSig }),
      }).catch(() => null);

      if (cancelled) return;

      if (response?.ok) {
        window.location.href = redirect.startsWith("/") ? redirect : "/dashboard";
        return;
      }

      setCheckingPartnerAccess(false);
    }

    void checkPartnerAccess();

    return () => {
      cancelled = true;
    };
  }, [partnerCtx, partnerSig, redirect]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, partner_ctx: partnerCtx, partner_sig: partnerSig }),
    });

    if (response.ok) {
      window.location.href = redirect.startsWith("/") ? redirect : "/dashboard";
      return;
    }

    const payload = await response.json().catch(() => null);
    setError(payload?.message || "Impossible de valider ce code.");
    setLoading(false);
  };

  return (
    <main className="kx-dark-page flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <section className="kx-container relative grid gap-8 lg:grid-cols-[1fr_28rem] lg:items-center">
        <div className="max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/10">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-black text-white">K</span>
            KORYXA Formation
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
            <ShieldCheck size={15} /> Accès sécurisé
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Entre dans ton espace formation.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Si ton accès partenaire est déjà attribué, la plateforme te connecte automatiquement. Le code manuel reste disponible pour les tests et les cas de dépannage.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Compte vérifié", text: "Accès lié à ton profil partenaire." },
              { icon: Clock3, title: "Rapide", text: "Entrée directe après attribution." },
              { icon: Sparkles, title: "Guidé", text: "Dashboard, modules, IA et certificat." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <item.icon className="h-6 w-6 text-blue-200" />
                <p className="mt-4 font-black text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-xl sm:p-5">
          <div className="rounded-[1.5rem] bg-white p-6 text-slate-950 shadow-soft sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
              <LockKeyhole size={26} />
            </div>
            <h2 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">Accès formation</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {checkingPartnerAccess
                ? "Vérification de ton accès partenaire en cours. Tu seras redirigé automatiquement si l’accès est actif."
                : "Entre ton code seulement si l’accès direct partenaire n’est pas encore disponible pour ton compte."}
            </p>

            {checkingPartnerAccess && (
              <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-800">
                Vérification automatique en cours… garde cette page ouverte quelques secondes.
              </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="access-code" className="mb-2 flex items-center gap-2 text-sm font-black text-slate-800">
                  <KeyRound size={16} className="text-blue-600" /> Code d’accès manuel
                </label>
                <input
                  id="access-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  autoComplete="one-time-code"
                  placeholder="Exemple : O-XXXX-XXXX"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
                <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                  Le code est lié à ton compte pour protéger l’accès à la formation.
                </p>
              </div>

              {error && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Validation…" : "Valider l’accès"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-sm leading-6 text-slate-600">
                  Besoin d’aide ? Ouvre CoraBiz pour discuter avec l’assistant commercial KORYXA :{" "}
                  <a href="https://cora.innovaplus.africa" target="_blank" rel="noopener noreferrer" className="font-black text-blue-700 underline underline-offset-4 hover:text-blue-600">
                    cora.innovaplus.africa
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-300 sm:grid-cols-2">
            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-300" /> Accès partenaire prioritaire</p>
            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-300" /> Code manuel en secours</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AccessPage() {
  return (
    <Suspense fallback={null}>
      <AccessForm />
    </Suspense>
  );
}
