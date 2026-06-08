"use client";

import { FormEvent, useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LockKeyhole, MessageCircle } from "lucide-react";

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
    <main className="min-h-screen bg-[#050c1a] text-white flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6">
          <span className="text-blue-400 font-bold">KORYXA</span>
          <span>Formation</span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 shadow-2xl shadow-blue-950/30">
          <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/25 flex items-center justify-center mb-5">
            <LockKeyhole className="text-blue-300" size={24} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Accès à la formation</h1>
          <p className="text-slate-400 text-sm leading-6 mb-6">
            {checkingPartnerAccess
              ? "Vérification de ton accès partenaire..."
              : "Entre le code reçu après confirmation de ton paiement. Il sera lié à ton compte partenaire pour sécuriser ton accès."}
          </p>

          <form onSubmit={submit} className="space-y-4">
            {checkingPartnerAccess && (
              <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
                Accès partenaire en cours de vérification. Si aucun accès n’est encore attribué, le champ code restera disponible.
              </div>
            )}
            <div>
              <label htmlFor="access-code" className="block text-sm font-medium text-slate-300 mb-2">
                Code d&apos;accès
              </label>
              <input
                id="access-code"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                autoComplete="one-time-code"
                className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Validation..." : "Valider l'accès"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <MessageCircle className="text-green-300 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-slate-400">
              Discutez avec notre assistant commercial sur{" "}
              <a
                href="https://cora.innovaplus.africa"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-300 underline underline-offset-4 hover:text-blue-200"
              >
                cora.innovaplus.africa
              </a>
              .
            </p>
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
