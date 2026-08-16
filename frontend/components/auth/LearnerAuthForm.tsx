"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, Loader2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { authAPI, getApiErrorMessage, storeAuthSession } from "@/lib/api";

type Mode = "login" | "register";

export default function LearnerAuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = searchParams.get("course") || "python-data-analyst";
  const next = searchParams.get("next") || `/access?course=${encodeURIComponent(course)}`;
  const isRegister = mode === "register";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const alternateHref = useMemo(() => {
    const params = new URLSearchParams({ course, next });
    return `${isRegister ? "/login" : "/register"}?${params.toString()}`;
  }, [course, isRegister, next]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        await authAPI.register({ full_name: fullName.trim(), email: email.trim(), password });
        setSuccess("Compte créé. Vérifie ton email si une confirmation est demandée, puis connecte-toi.");
        const params = new URLSearchParams({ course, next, email: email.trim() });
        router.push(`/login?${params.toString()}`);
        return;
      }

      const response = await authAPI.login({ email: email.trim(), password });
      storeAuthSession(response.data.access_token);
      router.push(next);
      router.refresh();
    } catch (authError) {
      setError(getApiErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050914] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(16,185,129,.18),transparent_28rem),radial-gradient(circle_at_82%_20%,rgba(59,130,246,.15),transparent_30rem),linear-gradient(180deg,#050914_0%,#06111f_60%,#050914_100%)]" />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <Link href={`/formations/${course}`} className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-slate-200 transition hover:bg-white/[0.1]">
          <ArrowLeft size={16} /> Retour à la formation
        </Link>

        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.06] shadow-2xl shadow-slate-950/40 backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="border-b border-white/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
                <LockKeyhole size={15} /> Compte apprenant
              </div>
              <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
                {isRegister ? "Crée ton espace KORYXA." : "Retrouve ton espace KORYXA."}
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Ton compte sert d’identité apprenant. L’achat et l’attribution automatique des formations seront reliés à cette identité dans les prochains chantiers.
              </p>
              <div className="mt-8 space-y-3">
                {["Une seule identité pour tes formations", "Progression et certificats rattachés au compte", "Accès partenaire existant conservé séparément"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <span className="text-sm font-bold leading-6 text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="mx-auto max-w-lg">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-300">{isRegister ? "Inscription" : "Connexion"}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-white">{isRegister ? "Créer mon compte" : "Me connecter"}</h2>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {isRegister && (
                    <label className="block">
                      <span className="mb-2 block text-sm font-bold text-slate-200">Nom complet</span>
                      <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 focus-within:border-emerald-400">
                        <UserRound size={18} className="text-slate-500" />
                        <input value={fullName} onChange={(event) => setFullName(event.target.value)} required minLength={2} autoComplete="name" className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600" placeholder="Junior KORYXA" />
                      </div>
                    </label>
                  )}

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-200">Email</span>
                    <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 focus-within:border-emerald-400">
                      <Mail size={18} className="text-slate-500" />
                      <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" autoComplete="email" className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600" placeholder="toi@exemple.com" />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-200">Mot de passe</span>
                    <div className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 focus-within:border-emerald-400">
                      <LockKeyhole size={18} className="text-slate-500" />
                      <input value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-600" placeholder="8 caractères minimum" />
                      <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} className="rounded-lg p-1 text-slate-400 hover:text-white">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </label>

                  {error && <div role="alert" className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-100">{error}</div>}
                  {success && <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-100">{success}</div>}

                  <button disabled={loading} type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                    {loading ? "Traitement…" : isRegister ? "Créer mon compte" : "Me connecter"}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-400">
                  {isRegister ? "Tu as déjà un compte ?" : "Pas encore de compte ?"}{" "}
                  <Link href={alternateHref} className="font-black text-emerald-300 hover:text-emerald-200">
                    {isRegister ? "Se connecter" : "Créer un compte"}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
