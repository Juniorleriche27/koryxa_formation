"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { accessAPI, commerceAPI } from "@/lib/api";
import { courseCatalog, courseRoutes, normalizeCourseSlug } from "@/lib/courseConfig";
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
  const rawCourseParam = searchParams.get("course");
  const hasExplicitCourse = Boolean(rawCourseParam);
  const courseSlug = normalizeCourseSlug(rawCourseParam);
  const course = courseCatalog[courseSlug];
  const redirect = searchParams.get("redirect") || (hasExplicitCourse ? courseRoutes.dashboard(courseSlug) : "/dashboard");
  const partnerCtx = searchParams.get("partner_ctx");
  const partnerSig = searchParams.get("partner_sig");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingPartnerAccess, setCheckingPartnerAccess] = useState(Boolean(partnerCtx && partnerSig));
  const [checkingLearnerAccess, setCheckingLearnerAccess] = useState(true);
  const [learnerAuthenticated, setLearnerAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    commerceAPI
      .listEnrollments()
      .then((response) => {
        if (cancelled) return;
        setLearnerAuthenticated(true);
        const active = (response.data || []).some(
          (enrollment: { course_slug?: string; status?: string }) =>
            enrollment.course_slug === courseSlug && enrollment.status === "active"
        );
        if (active) {
          accessAPI
            .activateEnrollment(courseSlug)
            .then(() => {
              if (!cancelled) {
                window.location.href = redirect.startsWith("/") ? redirect : "/dashboard";
              }
            })
            .catch(() => {
              if (!cancelled) setCheckingLearnerAccess(false);
            });
          return;
        }
        setCheckingLearnerAccess(false);
      })
      .catch(() => {
        if (!cancelled) setCheckingLearnerAccess(false);
      });

    return () => {
      cancelled = true;
    };
  }, [courseSlug, redirect]);

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
        body: JSON.stringify({ partner_ctx: partnerCtx, partner_sig: partnerSig, course: courseSlug }),
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
  }, [partnerCtx, partnerSig, redirect, courseSlug]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, partner_ctx: partnerCtx, partner_sig: partnerSig, course: courseSlug }),
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
            {hasExplicitCourse
              ? `Entre dans ton espace ${course.title}.`
              : "Accédez à votre espace KORYXA Formation."}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {hasExplicitCourse
              ? "Connecte-toi avec ton compte apprenant pour accéder à ce parcours et synchroniser ta progression."
              : "Connectez-vous avec votre compte KORYXA unique pour accéder à tous vos parcours, modules interactifs et certificats."}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Compte vérifié", text: "Accès lié à ton identité KORYXA." },
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
            <h2 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">
              {hasExplicitCourse ? "Accès à votre formation" : "Espace Apprenant KORYXA"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {hasExplicitCourse && (
                <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{course.title}</span>
              )}
              {checkingPartnerAccess
                ? "Vérification de ton accès en cours. Tu seras redirigé automatiquement."
                : learnerAuthenticated
                  ? "Votre compte KORYXA est connecté. Accédez directement à votre tableau de bord."
                  : "Connectez-vous avec votre compte KORYXA pour accéder à l'ensemble de vos parcours."}
            </p>

            {!checkingPartnerAccess && !checkingLearnerAccess && !learnerAuthenticated && (
              <div className="mt-6">
                <a
                  href="https://accounts.koryxa.fr/sign-in"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-6 text-sm font-black text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-800"
                >
                  Se connecter avec mon compte KORYXA <ArrowRight size={17} />
                </a>
                <div className="mt-3 text-center">
                  <a
                    href="https://accounts.koryxa.fr/sign-up"
                    className="text-xs font-bold text-slate-500 hover:text-emerald-700"
                  >
                    Pas encore de compte ? Créer mon compte KORYXA →
                  </a>
                </div>
              </div>
            )}

            {!checkingPartnerAccess && !checkingLearnerAccess && learnerAuthenticated && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-black text-emerald-900">Compte KORYXA connecté</p>
                <p className="mt-1 text-sm leading-6 text-emerald-800">Accédez à votre espace apprenant ou commandez ce parcours.</p>
                <div className="mt-3 flex gap-2">
                  <Link href={`/dashboard?course=${encodeURIComponent(courseSlug)}`} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-black text-white transition hover:bg-emerald-600">
                    Ouvrir mon Dashboard
                  </Link>
                  <Link href={`/checkout?course=${encodeURIComponent(courseSlug)}`} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 text-sm font-black text-emerald-800 transition hover:bg-emerald-50">
                    Commander ce cours
                  </Link>
                </div>
              </div>
            )}

            {(checkingPartnerAccess || checkingLearnerAccess) && (
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">
                Vérification automatique de votre accès en cours…
              </div>
            )}

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <span className="relative bg-white px-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                ou activer un code
              </span>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="access-code" className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-slate-700">
                  <KeyRound size={15} className="text-emerald-700" /> Code d’activation (Entreprise / Bon)
                </label>
                <input
                  id="access-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  autoComplete="one-time-code"
                  placeholder="Exemple : O-XXXX-XXXX"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              {error && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !code.trim()}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-100 px-5 text-sm font-black text-slate-800 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Validation…" : "Activer le code"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
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
