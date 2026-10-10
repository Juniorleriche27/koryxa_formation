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
import Footer from "@/components/layout/Footer";
import LearnerCourseContext from "@/components/learner/LearnerCourseContext";
import { certificatesAPI, getApiErrorMessage, validationAPI } from "@/lib/api";
import type { Certificate, CertificationStatus } from "@/types";
import { EXCEL_DATA_ANALYST_COURSE_SLUG, POWER_BI_DATA_ANALYST_COURSE_SLUG, SQL_DATA_ANALYST_COURSE_SLUG, LLM_RAG_COURSE_SLUG, courseCatalog, readCourseSlug } from "@/lib/courseConfig";

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
  const [courseSlug, setCourseSlug] = useState("python-data-analyst");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState("");

  const loadCertificateState = useCallback(async () => {
    const selectedCourse = readCourseSlug(window.location.search);
    setCourseSlug(selectedCourse);
    setLoading(true);
    setError("");

    try {
      const [statusResponse, certificateResponse] = await Promise.allSettled([
        validationAPI.getCertificationStatus(selectedCourse),
        certificatesAPI.getMy(selectedCourse),
      ]);

      if (statusResponse.status === "fulfilled") {
        setStatus(statusResponse.value.data);
      } else {
        setError(getApiErrorMessage(statusResponse.reason));
      }

      if (certificateResponse.status === "fulfilled") {
        setCertificate(certificateResponse.value.data);
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
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
      const response = await certificatesAPI.issue(courseSlug);
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
  const courseMeta = courseCatalog[courseSlug as keyof typeof courseCatalog] ?? courseCatalog["python-data-analyst"];
  const dedicatedLearnerLayout = courseSlug !== "python-data-analyst";
  const certificateTitle = courseSlug === EXCEL_DATA_ANALYST_COURSE_SLUG
    ? "Analyse de données avec Excel"
    : courseSlug === POWER_BI_DATA_ANALYST_COURSE_SLUG
      ? "Analyse et visualisation de données avec Power BI"
      : courseSlug === SQL_DATA_ANALYST_COURSE_SLUG
        ? "Analyse de données avec SQL et PostgreSQL"
        : courseSlug === LLM_RAG_COURSE_SLUG
          ? "Développement d’applications LLM & RAG"
          : courseMeta?.title || "Formation KORYXA";
  const certificateDescription = `Ce certificat atteste la validation du parcours KORYXA ${certificateTitle}, incluant la validation des modules, des QCM d'évaluation, la réalisation du projet final et le respect des critères d'exigence KORYXA.`;
  const scoreRows = useMemo(() => [
    { label: "Plateforme", value: `${status?.platform_score ?? 0}/40`, icon: CheckCircle2 },
    { label: "Projet final", value: `${status?.project_score ?? 0}/60`, icon: FileCheck2 },
    { label: "Score final", value: `${status?.final_score ?? 0}/100`, icon: Trophy },
  ], [status]);

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
      <LearnerCourseContext courseSlug={courseSlug} current="overview" />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-xs">
                Certificat Officiel KORYXA
              </span>
              <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Certification {courseMeta.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Le certificat est délivré uniquement lorsque l&apos;ensemble des exigences KORYXA sont validées : QCM du parcours, projet final vérifié et score minimal requis.
              </p>
            </div>

            {loading ? (
              <div className="rounded-3xl border border-[#dfe5d8] bg-white px-6 py-16 text-center text-slate-600 shadow-xs">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#00a86b]" />
                <p className="mt-4 font-bold text-slate-950">Calcul de votre éligibilité au certificat…</p>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-10 shadow-md text-slate-950"
                >
                  <div className="rounded-2xl border-2 border-[#dfe5d8] bg-[#faf9f5]/50 p-6 text-center sm:p-10 lg:p-12">
                    <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-sm ${certificateIssued ? "bg-[#00a86b]" : isEligible ? "bg-[#00a86b]" : "bg-slate-400"}`}>
                      {certificateIssued ? <Award size={32} /> : isEligible ? <Sparkles size={32} /> : <Lock size={32} />}
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-widest text-[#008b58]">KORYXA Pôle Formation</p>
                    <h2 className="mt-3 font-serif text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl">{certificateTitle}</h2>
                    <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600">
                      {certificateIssued
                        ? certificateDescription
                        : isEligible
                        ? "Toutes les conditions sont validées. Vous pouvez générer votre certificat officiel."
                        : "Votre certificat n’est pas encore disponible. Les conditions restantes sont affichées dans l'encart d'éligibilité."}
                    </p>

                    <div className="mx-auto my-8 h-px max-w-md bg-slate-200" />

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-[#dfe5d8] bg-white p-4 text-left">
                        <ShieldCheck className="h-5 w-5 text-[#00a86b]" />
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Statut</p>
                        <p className="mt-1 text-sm font-bold text-slate-950">{certificateIssued ? "Certificat émis" : isEligible ? "Éligible" : "Non éligible"}</p>
                      </div>
                      <div className="rounded-xl border border-[#dfe5d8] bg-white p-4 text-left">
                        <Trophy className="h-5 w-5 text-[#00a86b]" />
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Score final</p>
                        <p className="mt-1 text-sm font-bold text-slate-950">{status?.final_score ?? 0}/100</p>
                      </div>
                      <div className="rounded-xl border border-[#dfe5d8] bg-white p-4 text-left">
                        <Clock3 className="h-5 w-5 text-[#00a86b]" />
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Date</p>
                        <p className="mt-1 text-sm font-bold text-slate-950">{formattedIssuedAt}</p>
                      </div>
                    </div>

                    {certificate && (
                      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left">
                        <p className="font-bold text-slate-950 text-xs sm:text-sm">Identifiant de vérification : {getCertificateNumber(certificate)}</p>
                        <p className="mt-1 text-xs text-slate-600">
                          Émis officiellement le {formattedIssuedAt}. Score validé : {validatedFinalScore}/100.
                        </p>
                      </div>
                    )}

                    {!certificateIssued && isEligible && (
                      <button
                        onClick={issueCertificate}
                        disabled={issuing}
                        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {issuing ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />} Générer mon certificat officiel
                      </button>
                    )}

                    {certificateIssued && (
                      <button disabled className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-500 disabled:cursor-not-allowed">
                        <Download size={15} /> Téléchargement PDF certifié actif
                      </button>
                    )}
                  </div>
                </motion.div>

                <aside className="space-y-4 rounded-3xl border border-[#dfe5d8] bg-white p-5 shadow-xs sm:p-6 lg:sticky lg:top-24">
                  <div className="flex items-center justify-between gap-4 border-b border-[#dfe5d8] pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Contrôle qualité</p>
                      <h2 className="mt-1 font-serif text-lg font-bold text-slate-950">Critères d&apos;éligibilité</h2>
                    </div>
                    <button
                      onClick={loadCertificateState}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
                      aria-label="Actualiser"
                    >
                      <RefreshCw size={15} />
                    </button>
                  </div>

                  <div className="grid gap-2.5">
                    {scoreRows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-4 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-xs">
                        <span className="flex items-center gap-2 font-semibold text-slate-700"><row.icon size={15} className="text-[#00a86b]" /> {row.label}</span>
                        <span className="font-bold text-slate-950">{row.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-xs">
                      <span className="font-semibold text-slate-700">Modules validés</span>
                      <span className="font-bold text-slate-950">{status?.modules_validated ?? 0}/{status?.modules_required ?? 7}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-xs">
                      <span className="font-semibold text-slate-700">Délai minimum requis</span>
                      <span className="font-bold text-slate-950">{status?.days_remaining_for_certificate ?? 21} jours</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5 text-xs">
                    <p className="font-bold text-slate-950">Validité des accès</p>
                    <dl className="mt-2 space-y-1.5 text-slate-600">
                      <div className="flex justify-between gap-4"><dt>Activation</dt><dd className="font-semibold text-slate-900">{formatDate(status?.access_activated_at)}</dd></div>
                      <div className="flex justify-between gap-4"><dt>Accès garanti</dt><dd className="font-semibold text-slate-900">À vie</dd></div>
                      <div className="flex justify-between gap-4"><dt>Éligibilité dès</dt><dd className="font-semibold text-slate-900">{formatDate(status?.certificate_eligible_from)}</dd></div>
                    </dl>
                  </div>

                  {blockingReasons.length > 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-amber-900 text-xs">
                      <div className="mb-2 flex items-center gap-1.5 font-bold"><AlertTriangle size={15} /> Conditions en cours :</div>
                      <ul className="space-y-1 leading-relaxed text-amber-800">
                        {blockingReasons.map((reason) => <li key={reason}>• {reason}</li>)}
                      </ul>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-[#008b58] text-xs">
                      <div className="flex items-center gap-1.5 font-bold"><CheckCircle2 size={15} /> Toutes les conditions sont validées.</div>
                    </div>
                  )}

                  {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">{error}</p>}
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      {!dedicatedLearnerLayout && <Footer />}
    </div>
  );
}
