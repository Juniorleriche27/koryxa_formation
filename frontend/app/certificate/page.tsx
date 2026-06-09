"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock3,
  Download,
  FileCheck2,
  Loader2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { certificatesAPI, getApiErrorMessage, validationAPI } from "@/lib/api";
import type { Certificate, CertificationStatus } from "@/types";

function formatDate(value?: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(value));
}

function getCertificateNumber(certificate?: Certificate | null) {
  if (!certificate?.id) return "—";
  return `KX-FORM-${certificate.id.slice(0, 8).toUpperCase()}`;
}

export default function CertificatePage() {
  const [status, setStatus] = useState<CertificationStatus | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState("");

  const loadCertificateState = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [statusResponse, certificateResponse] = await Promise.allSettled([
        validationAPI.getCertificationStatus(),
        certificatesAPI.getMy(),
      ]);

      if (statusResponse.status === "fulfilled") {
        setStatus(statusResponse.value.data);
      } else {
        setError(getApiErrorMessage(statusResponse.reason));
      }

      if (certificateResponse.status === "fulfilled") {
        setCertificate(certificateResponse.value.data);
        if (certificateResponse.value.data.certification_status) {
          setStatus(certificateResponse.value.data.certification_status);
        }
      } else {
        setCertificate(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCertificateState();
  }, [loadCertificateState]);

  const issueCertificate = async () => {
    setIssuing(true);
    setError("");

    try {
      const response = await certificatesAPI.issue();
      setCertificate(response.data);
      if (response.data.certification_status) {
        setStatus(response.data.certification_status);
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIssuing(false);
    }
  };

  const isEligible = Boolean(status?.is_eligible);
  const certificateIssued = Boolean(certificate);
  const validatedFinalScore = certificate?.final_score ?? status?.final_score ?? 0;
  const formattedIssuedAt = certificate?.issued_at ? formatDate(certificate.issued_at) : "—";
  const blockingReasons = status?.blocking_reasons || [];
  const scoreRows = useMemo(() => [
    { label: "Plateforme", value: `${status?.platform_score ?? 0}/40`, icon: CheckCircle2 },
    { label: "Projet final", value: `${status?.project_score ?? 0}/60`, icon: FileCheck2 },
    { label: "Score final", value: `${status?.final_score ?? 0}/100`, icon: Trophy },
  ], [status]);

  return (
    <div className="kx-dark-page flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(59,130,246,0.24),transparent_34rem),radial-gradient(circle_at_80%_75%,rgba(168,85,247,0.14),transparent_28rem)]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <span className="kx-dark-eyebrow">Certificat KORYXA</span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl">Certification Python Data</h1>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300">
                Le certificat est délivré uniquement si toutes les règles KORYXA sont validées : QCM, projet final, score minimum et délai pédagogique de 21 jours.
              </p>
            </div>

            {loading ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                <Loader2 className="mx-auto h-9 w-9 animate-spin text-blue-300" />
                <p className="mt-4 font-black">Calcul de ton éligibilité certificat…</p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-4 text-slate-950 shadow-2xl shadow-blue-950/35 sm:p-6"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.10),transparent_24rem),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_24rem)]" />
                  <div className="relative rounded-[2rem] border border-slate-200 bg-white/80 p-6 text-center sm:p-10 lg:p-14">
                    <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] text-white shadow-lg ${certificateIssued ? "bg-gradient-to-br from-emerald-500 to-blue-500 shadow-emerald-500/25" : isEligible ? "bg-gradient-to-br from-blue-600 to-cyan-400 shadow-blue-500/25" : "bg-gradient-to-br from-slate-600 to-slate-400 shadow-slate-500/20"}`}>
                      {certificateIssued ? <Award size={38} /> : isEligible ? <Sparkles size={38} /> : <Lock size={38} />}
                    </div>

                    <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-blue-700">KORYXA Tech Store présente</p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">Analyse de Données avec Python</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
                      {certificateIssued
                        ? "Ce certificat atteste la validation du parcours KORYXA Formation Python Data, incluant QCM, projet final et seuil de réussite."
                        : isEligible
                        ? "Toutes les conditions sont validées. Tu peux générer ton certificat officiel."
                        : "Ton certificat n’est pas encore disponible. Les conditions restantes sont affichées à droite."}
                    </p>

                    <div className="mx-auto my-8 h-px max-w-xl bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Statut</p>
                        <p className="mt-1 text-sm font-black text-slate-950">{certificateIssued ? "Certificat émis" : isEligible ? "Éligible" : "Non éligible"}</p>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                        <Trophy className="h-5 w-5 text-blue-600" />
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Score final</p>
                        <p className="mt-1 text-sm font-black text-slate-950">{status?.final_score ?? 0}/100</p>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                        <Clock3 className="h-5 w-5 text-blue-600" />
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-slate-500">Date</p>
                        <p className="mt-1 text-sm font-black text-slate-950">{formattedIssuedAt}</p>
                      </div>
                    </div>

                    {certificate && (
                      <div className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-left">
                        <p className="font-black text-emerald-950">Numéro certificat : {getCertificateNumber(certificate)}</p>
                        <p className="mt-2 text-sm leading-6 text-emerald-800">
                          Émis le {formattedIssuedAt}. Score validé : {validatedFinalScore}/100.
                        </p>
                      </div>
                    )}

                    {!certificateIssued && isEligible && (
                      <button onClick={issueCertificate} disabled={issuing} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
                        {issuing ? <Loader2 size={17} className="animate-spin" /> : <Award size={17} />} Générer mon certificat
                      </button>
                    )}

                    {certificateIssued && (
                      <button disabled className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-slate-200 px-6 py-4 text-sm font-black text-slate-500 disabled:cursor-not-allowed">
                        <Download size={17} /> Export PDF à venir
                      </button>
                    )}
                  </div>
                </motion.div>

                <aside className="space-y-4 rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-6 lg:sticky lg:top-24">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Éligibilité</p>
                      <h2 className="mt-2 text-2xl font-black text-white">Contrôle certificat</h2>
                    </div>
                    <button onClick={loadCertificateState} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-slate-200 transition hover:bg-white/10" aria-label="Actualiser">
                      <RefreshCw size={17} />
                    </button>
                  </div>

                  <div className="grid gap-3">
                    {scoreRows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                        <span className="flex items-center gap-2 text-sm font-bold text-slate-300"><row.icon size={16} className="text-blue-200" /> {row.label}</span>
                        <span className="text-sm font-black text-white">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                      <span className="text-sm font-bold text-slate-300">Modules validés</span>
                      <span className="text-sm font-black text-white">{status?.modules_validated ?? 0}/{status?.modules_required ?? 7}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                      <span className="text-sm font-bold text-slate-300">Jours restants</span>
                      <span className="text-sm font-black text-white">{status?.days_remaining_for_certificate ?? 21}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                    <p className="text-sm font-black text-white">Dates d’accès</p>
                    <dl className="mt-3 space-y-2 text-sm text-slate-400">
                      <div className="flex justify-between gap-4"><dt>Activation</dt><dd className="font-bold text-slate-200">{formatDate(status?.access_activated_at)}</dd></div>
                      <div className="flex justify-between gap-4"><dt>Accès plateforme</dt><dd className="font-bold text-slate-200">{formatDate(status?.access_until)}</dd></div>
                      <div className="flex justify-between gap-4"><dt>Certificat possible dès</dt><dd className="font-bold text-slate-200">{formatDate(status?.certificate_eligible_from)}</dd></div>
                    </dl>
                  </div>

                  {blockingReasons.length > 0 ? (
                    <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-amber-100">
                      <div className="mb-3 flex items-center gap-2 font-black"><AlertTriangle size={17} /> Conditions restantes</div>
                      <ul className="space-y-2 text-sm leading-6">
                        {blockingReasons.map((reason) => <li key={reason}>• {reason}</li>)}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-emerald-100">
                      <div className="flex items-center gap-2 font-black"><CheckCircle2 size={17} /> Toutes les conditions sont validées.</div>
                    </div>
                  )}

                  {error && <p className="rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm font-bold text-red-100">{error}</p>}
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
