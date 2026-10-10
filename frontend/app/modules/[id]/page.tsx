"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Layers3,
  Link2,
  Lock,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { modulesAPI, notebookAPI, validationAPI } from "@/lib/api";
import { DEFAULT_COURSE_SLUG, EXCEL_DATA_ANALYST_COURSE_SLUG, POWER_BI_DATA_ANALYST_COURSE_SLUG, SQL_DATA_ANALYST_COURSE_SLUG, LLM_RAG_COURSE_SLUG, courseRoutes, readCourseSlug } from "@/lib/courseConfig";
import { moduleZeroCells, moduleZeroResources } from "@/lib/moduleZeroContent";
import type { Module, ModuleStatus } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LearnerCourseContext from "@/components/learner/LearnerCourseContext";
import Badge from "@/components/ui/Badge";
import NotebookViewer, { NotebookCell } from "@/components/modules/NotebookViewer";
import AIAssistant from "@/components/modules/AIAssistant";
import QuizBlock from "@/components/modules/QuizBlock";
import DocumentViewer from "@/components/modules/DocumentViewer";
import CourseLearningContent from "@/components/modules/CourseLearningContent";
import LlmRagLearningContent from "@/components/modules/LlmRagLearningContent";
import ExcelLearningContent from "@/components/modules/ExcelLearningContent";
import PowerBiLearningContent from "@/components/modules/PowerBiLearningContent";
import SqlLearningContent from "@/components/modules/SqlLearningContent";

const tabClasses = {
  active: "bg-white text-slate-950 shadow-sm border border-slate-200/80",
  inactive: "text-slate-600 hover:bg-white/60 hover:text-slate-900",
};

function isModuleZero(module: Module | null) {
  return module?.order_index === 0;
}

function isPythonNotebookModule(courseSlug: string, module: Module | null) {
  return courseSlug === DEFAULT_COURSE_SLUG && !!module && module.order_index >= 1 && module.order_index <= 7;
}

function normalizeNotebookSource(source: unknown): string {
  if (Array.isArray(source)) return source.join("");
  return typeof source === "string" ? source : "";
}

function normalizeNotebookOutputs(outputs: unknown): NotebookCell["outputs"] {
  if (!Array.isArray(outputs)) return [];

  return outputs.reduce<NotebookCell["outputs"]>((normalized, output) => {
    if (!output || typeof output !== "object") return normalized;
    const value = output as Record<string, unknown>;
    const data = value.data && typeof value.data === "object" ? value.data as Record<string, unknown> : {};

    if (data["image/png"]) {
      normalized.push({ type: "image", data: normalizeNotebookSource(data["image/png"]) });
      return normalized;
    }
    if (data["text/html"]) {
      normalized.push({ type: "html", data: normalizeNotebookSource(data["text/html"]) });
      return normalized;
    }

    const text = value.text ?? data["text/plain"];
    if (text) normalized.push({ type: "text", data: normalizeNotebookSource(text) });
    return normalized;
  }, []);
}

function parseNotebookCells(payload: unknown): NotebookCell[] {
  if (!payload || typeof payload !== "object") return [];
  const rawCells = (payload as { cells?: unknown }).cells;
  if (!Array.isArray(rawCells)) return [];

  return rawCells.flatMap((cell) => {
    if (!cell || typeof cell !== "object") return [];
    const value = cell as Record<string, unknown>;
    const cellType = value.cell_type;
    if (cellType !== "markdown" && cellType !== "code" && cellType !== "raw") return [];
    return [{
      cell_type: cellType,
      source: normalizeNotebookSource(value.source),
      outputs: normalizeNotebookOutputs(value.outputs),
    } satisfies NotebookCell];
  });
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([^&?/\s]{11})/);
  return match?.[1] ?? null;
}

export default function ModuleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [courseSlug, setCourseSlug] = useState(DEFAULT_COURSE_SLUG);
  const [module, setModule] = useState<Module | null>(null);
  const [moduleLoading, setModuleLoading] = useState(true);
  const [moduleError, setModuleError] = useState("");
  const [cells, setCells] = useState<NotebookCell[]>([]);
  const [loadingNb, setLoadingNb] = useState(false);
  const [tab, setTab] = useState<"cours" | "ressources">("cours");
  const [moduleStatus, setModuleStatus] = useState<ModuleStatus | null>(null);
  const [moduleStatuses, setModuleStatuses] = useState<ModuleStatus[]>([]);

  const refreshModuleStatus = useCallback(async (selectedCourse = courseSlug) => {
    try {
      const response = await validationAPI.getModuleStatuses(selectedCourse);
      const statuses = (response.data.modules || []) as ModuleStatus[];
      setModuleStatuses(statuses);
      setModuleStatus(statuses.find((status) => status.module_id === id) || null);
    } catch {
      setModuleStatuses([]);
      setModuleStatus(null);
    }
  }, [courseSlug, id]);

  useEffect(() => {
    const requestedCourse = readCourseSlug(window.location.search);
    setCourseSlug(requestedCourse);
    setModuleLoading(true);
    setModuleError("");
    modulesAPI
      .getOne(id, requestedCourse)
      .then((response) => setModule(response.data))
      .catch(() => setModuleError("Impossible de charger ce module."))
      .finally(() => setModuleLoading(false));
    refreshModuleStatus(requestedCourse);
  }, [id, refreshModuleStatus]);

  useEffect(() => {
    if (!module) return;

    let cancelled = false;
    const loadNotebook = async () => {
      setLoadingNb(true);
      setCells([]);

      try {
        const response = await notebookAPI.getContent(id);
        const loadedCells = parseNotebookCells(response.data);
        if (!cancelled && loadedCells.length > 0) {
          setCells(loadedCells);
          return;
        }
      } catch {
        // Le fallback ci-dessous restaure le moteur depuis la ressource .ipynb.
      }

      if (isModuleZero(module)) {
        if (!cancelled) setCells(moduleZeroCells);
        return;
      }

      if (isPythonNotebookModule(courseSlug, module)) {
        const notebookResource = module.resources?.find(
          (resource) => resource.type === "notebook" || resource.url.toLowerCase().includes(".ipynb")
        );

        if (notebookResource) {
          try {
            const response = await fetch(notebookResource.url, { cache: "no-store" });
            if (!response.ok) throw new Error(`Notebook indisponible (${response.status})`);
            const loadedCells = parseNotebookCells(await response.json());
            if (!cancelled && loadedCells.length > 0) {
              setCells(loadedCells);
              return;
            }
          } catch {
            // L'interface affiche ensuite un message dédié plutôt qu'un faux lecteur de document.
          }
        }
      }

      if (!cancelled) setCells([]);
    };

    loadNotebook().finally(() => {
      if (!cancelled) setLoadingNb(false);
    });

    return () => {
      cancelled = true;
    };
  }, [module, id, courseSlug]);

  if (!module) {
    return (
      <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
        {courseSlug !== LLM_RAG_COURSE_SLUG && courseSlug !== EXCEL_DATA_ANALYST_COURSE_SLUG && courseSlug !== POWER_BI_DATA_ANALYST_COURSE_SLUG && courseSlug !== SQL_DATA_ANALYST_COURSE_SLUG && <Navbar />}
        <LearnerCourseContext courseSlug={courseSlug} current="module" compact />
        <main className="kx-container flex flex-1 items-center justify-center py-12">
          {moduleError ? (
            <div role="alert" className="w-full max-w-xl rounded-3xl border border-red-200 bg-red-50/90 px-6 py-10 text-center text-red-950 shadow-xl backdrop-blur-xl">
              <AlertTriangle className="mx-auto h-9 w-9 text-red-600" />
              <p className="mt-4 text-xl font-black">{moduleError}</p>
              <p className="mt-2 text-sm leading-6 text-red-800">Le module peut être indisponible ou ne pas appartenir à ce parcours.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={courseRoutes.modules(courseSlug)} className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-black text-white hover:bg-slate-800 transition">
                  Retour au parcours
                </Link>
                <button type="button" onClick={() => window.location.reload()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-black text-slate-700 hover:bg-slate-50 transition">
                  <RefreshCw size={16} /> Réessayer
                </button>
              </div>
            </div>
          ) : (
            <div aria-live="polite" aria-busy={moduleLoading} className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-lg">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mx-auto h-8 w-8 rounded-full border-2 border-[#00a86b] border-t-transparent" />
              <p className="mt-4 text-sm font-bold text-slate-700">Préparation du module…</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  const downloadUrl = notebookAPI.getDownloadUrl(id);
  const dedicatedLearnerLayout = courseSlug === LLM_RAG_COURSE_SLUG || courseSlug === EXCEL_DATA_ANALYST_COURSE_SLUG || courseSlug === POWER_BI_DATA_ANALYST_COURSE_SLUG || courseSlug === SQL_DATA_ANALYST_COURSE_SLUG;
  const completed = Boolean(moduleStatus?.is_validated);
  const isLocked = module.order_index > 0 && (!moduleStatus || moduleStatus.status === "locked" || moduleStatus.is_accessible === false);
  const hasFallbackModuleZero = isModuleZero(module) && cells === moduleZeroCells;
  const resourcesCount = (module.resources?.length ?? 0) + (isModuleZero(module) ? moduleZeroResources.length : 0);
  const videos = module.resources?.filter((resource) => resource.type === "video") ?? [];
  const others = module.resources?.filter((resource) => resource.type !== "video") ?? [];
  const previousModuleStatus = moduleStatuses.find((status) => Number(status.order_index ?? -1) === Number(module.order_index ?? -1) - 1) || null;
  const nextModuleStatus = moduleStatuses.find((status) => Number(status.order_index ?? -1) === Number(module.order_index ?? -1) + 1) || null;
  const canGoToNextModule = completed && nextModuleStatus?.module_id && nextModuleStatus.is_accessible !== false && nextModuleStatus.status !== "locked";

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-950 flex flex-col antialiased">
      {!dedicatedLearnerLayout && <Navbar />}
      <LearnerCourseContext courseSlug={courseSlug} current="module" compact />

      <header className="relative overflow-hidden border-b border-[#dfe5d8] bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,168,107,0.08),transparent_30rem),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05),transparent_26rem)]" />
        <div className="kx-container relative py-8 sm:py-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <Link href={courseRoutes.modules(courseSlug)} className="font-semibold text-slate-600 transition hover:text-slate-950">
                  Modules
                </Link>
                <ChevronRight size={15} />
                <span className="font-medium text-slate-800">Module {module.order_index}</span>
                {previousModuleStatus?.module_id && (
                  <Link
                    href={courseRoutes.module(previousModuleStatus.module_id, courseSlug)}
                    className="ml-auto inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-[#faf9f5] px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
                  >
                    <ChevronLeft size={14} /> Module précédent
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge color="blue" className="bg-emerald-50 text-[#008b58] ring-emerald-300/30">Module {module.order_index}</Badge>
                {completed && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-[#008b58]">
                    <CheckCircle2 size={14} className="text-[#00a86b]" /> Validé
                  </span>
                )}
                {moduleStatus?.status === "quiz_failed" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                    <RefreshCw size={14} /> QCM à refaire
                  </span>
                )}
                {isLocked && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    <Lock size={14} /> Bloqué
                  </span>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl font-serif text-3xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {module.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {module.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-4">
                  <Clock className="mb-3 h-5 w-5 text-blue-600" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Durée</p>
                  <p className="mt-1 font-bold text-slate-950">{module.duration}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-4">
                  <BookOpen className="mb-3 h-5 w-5 text-emerald-600" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Cours</p>
                  <p className="mt-1 font-bold text-slate-950">{cells.length || "—"} cellules</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-4">
                  <Layers3 className="mb-3 h-5 w-5 text-purple-600" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Ressources</p>
                  <p className="mt-1 font-bold text-slate-950">{resourcesCount} éléments</p>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-[#dfe5d8] bg-white p-4 shadow-xl lg:sticky lg:top-24">
              <div className="rounded-2xl bg-[#faf9f5] border border-slate-200/80 p-4 text-slate-950">
                <p className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Sparkles size={16} className="text-[#00a86b]" />
                  Action recommandée
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {isLocked
                    ? "Ce module est verrouillé. Valide d’abord le module précédent."
                    : completed
                    ? "Module validé. Tu peux continuer vers l’étape suivante."
                    : "Lis le cours, pratique, puis valide le QCM avec au moins 12/20."}
                </p>
              </div>
              <div className="mt-4 grid gap-3">
                {!hasFallbackModuleZero && (
                  <a
                    href={downloadUrl}
                    download
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#00a86b] px-5 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#008b58]"
                  >
                    <Download size={17} /> Télécharger .ipynb
                  </a>
                )}
                <div className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-4 text-sm text-slate-800">
                  <p className="flex items-center gap-2 font-black text-slate-900">
                    {completed ? <CheckCircle2 size={16} className="text-[#00a86b]" /> : <Trophy size={16} className="text-amber-500" />}
                    Validation certifiante
                  </p>
                  <p className="mt-2 leading-6 text-slate-600">
                    {completed
                      ? `QCM validé${moduleStatus?.quiz_best_score != null ? ` avec ${moduleStatus.quiz_best_score}/20` : ""}.`
                      : `QCM obligatoire : minimum ${moduleStatus?.quiz_pass_score || module.quiz_pass_score || 12}/20.`}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1">
            <button
              onClick={() => setTab("cours")}
              className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-black transition ${tab === "cours" ? tabClasses.active : tabClasses.inactive}`}
            >
              <FileText size={16} /> Cours
            </button>
            <button
              onClick={() => setTab("ressources")}
              className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-black transition ${tab === "ressources" ? tabClasses.active : tabClasses.inactive}`}
            >
              <Link2 size={16} /> Ressources
              {module.resources && module.resources.length > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${tab === "ressources" ? "bg-emerald-50 text-[#008b58]" : "bg-slate-200 text-slate-700"}`}>
                  {module.resources.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="kx-container py-8 sm:py-12">
          {tab === "cours" && (
            <div className="mx-auto max-w-5xl">
              {isLocked ? (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-md">
                  <Lock size={42} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-xl font-black text-slate-950">Module verrouillé</p>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                    Tu dois valider le module précédent avant d’ouvrir cette étape. Retourne au parcours pour voir ta progression et les QCM à refaire.
                  </p>
                  <Link href={courseRoutes.modules(courseSlug)} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
                    Voir le parcours <ChevronRight size={16} />
                  </Link>
                </div>
              ) : courseSlug !== DEFAULT_COURSE_SLUG ? (
                <CourseLearningContent
                  courseSlug={courseSlug}
                  moduleId={id}
                  moduleOrder={module.order_index}
                  completed={completed}
                  passScore={moduleStatus?.quiz_pass_score || module.quiz_pass_score || 12}
                  onValidated={() => refreshModuleStatus(courseSlug)}
                />
              ) : loadingNb ? (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-md">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mx-auto h-8 w-8 rounded-full border-2 border-[#00a86b] border-t-transparent"
                  />
                  <p className="mt-4 font-bold text-slate-800">Chargement du notebook…</p>
                </div>
              ) : cells.length > 0 ? (
                <>
                  <NotebookViewer cells={cells} moduleTitle={module.title} />
                  <div className="mt-8">
                    <QuizBlock
                      moduleId={id}
                      passScore={moduleStatus?.quiz_pass_score || module.quiz_pass_score || 12}
                      isValidated={completed}
                      onValidated={refreshModuleStatus}
                    />
                  </div>

                  {canGoToNextModule && nextModuleStatus && (
                    <section className="mt-8 rounded-3xl border border-emerald-300 bg-emerald-50/80 p-5 shadow-lg sm:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#008b58]">Étape suivante débloquée</p>
                          <h2 className="mt-2 font-serif text-2xl font-black tracking-tight text-slate-950">Continue vers le module {nextModuleStatus.order_index}</h2>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                            {nextModuleStatus.title || "Le module suivant"} est maintenant disponible. Tu peux continuer sans revenir au tableau du parcours.
                          </p>
                        </div>
                        <Link
                          href={courseRoutes.module(nextModuleStatus.module_id, courseSlug)}
                          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#00a86b] px-6 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#008b58]"
                        >
                          Passer au module suivant <ChevronRight size={17} />
                        </Link>
                      </div>
                    </section>
                  )}

                  {module.resources && module.resources.length > 0 && (
                    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#008b58]">Compléments</p>
                          <h2 className="mt-1 font-serif text-2xl font-black tracking-tight text-slate-950">Ressources du module</h2>
                        </div>
                      </div>

                      {videos.length > 0 && (
                        <div className="space-y-4">
                          {videos.map((resource) => {
                            const youtubeId = getYouTubeId(resource.url);
                            return (
                              <div key={resource.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                                {resource.title && (
                                  <div className="border-b border-slate-800 bg-slate-900 px-5 py-4">
                                    <p className="font-bold text-white">{resource.title}</p>
                                    {resource.description && <p className="mt-1 text-sm text-slate-400">{resource.description}</p>}
                                  </div>
                                )}
                                {youtubeId ? (
                                  <div className="aspect-video">
                                    <iframe
                                      src={`https://www.youtube.com/embed/${youtubeId}`}
                                      title={resource.title}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                      className="h-full w-full"
                                    />
                                  </div>
                                ) : (
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 transition hover:bg-white/[0.04]">
                                    <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-red-400/20">
                                      <PlayCircle size={26} />
                                    </span>
                                    <span>
                                      <span className="block font-bold text-white">Ouvrir la vidéo</span>
                                      <span className="mt-1 flex items-center gap-1 text-sm text-red-200"><ExternalLink size={13} /> Regarder sur YouTube</span>
                                    </span>
                                  </a>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {others.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-3">
                          {others.map((resource) => (
                            <a
                              key={resource.id}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#faf9f5] px-4 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:text-slate-950 hover:shadow-sm"
                            >
                              <Badge color="blue" className="bg-blue-50 text-blue-700 ring-blue-300/30">{resource.type}</Badge>
                              {resource.title}
                              <ExternalLink size={14} className="text-slate-500" />
                            </a>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  {isModuleZero(module) && (
                    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#008b58]">Ressources externes fiables</p>
                      <h2 className="mt-1 font-serif text-2xl font-black tracking-tight text-slate-950">Pour installer, pratiquer et débloquer</h2>
                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {moduleZeroResources.map((resource) => (
                          <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:shadow-sm">
                            <Badge color={resource.type === "outil" ? "green" : "blue"} className="bg-emerald-50 text-[#008b58] ring-emerald-300/30">{resource.type}</Badge>
                            <p className="mt-3 font-bold text-slate-950">{resource.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#008b58]">Ouvrir <ExternalLink size={13} /></span>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              ) : isPythonNotebookModule(courseSlug, module) ? (
                <div role="alert" className="rounded-3xl border border-amber-200 bg-amber-50/80 px-6 py-12 text-center text-amber-950 shadow-md">
                  <AlertTriangle size={38} className="mx-auto text-amber-600" />
                  <p className="mt-4 text-xl font-black text-slate-950">Le laboratoire Python n’a pas pu être chargé</p>
                  <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-amber-800">
                    Réessaie dans quelques instants. Le notebook reste disponible dans l’onglet Ressources, mais il ne remplace plus le moteur intégré du cours.
                  </p>
                  <button type="button" onClick={() => window.location.reload()} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-black text-white transition hover:bg-slate-800">
                    <RefreshCw size={16} /> Recharger le laboratoire
                  </button>
                </div>
              ) : (() => {
                const docResource = module.resources?.find(
                  (resource) => resource.type === "notebook" || resource.type === "article" || resource.type === "dataset"
                );
                if (docResource) {
                  return (
                    <>
                      <DocumentViewer resource={docResource} />
                      <div className="mt-8">
                        <QuizBlock
                      moduleId={id}
                      passScore={moduleStatus?.quiz_pass_score || module.quiz_pass_score || 12}
                      isValidated={completed}
                      onValidated={refreshModuleStatus}
                    />
                      </div>
                    </>
                  );
                }
                return (
                  <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-md">
                    <BookOpen size={42} className="mx-auto mb-4 text-[#00a86b]" />
                    <p className="text-lg font-bold text-slate-950">Le contenu de ce module sera bientôt disponible.</p>
                    <p className="mt-2 text-sm text-slate-500">Reviens plus tard ou consulte les ressources disponibles.</p>
                  </div>
                );
              })()}
            </div>
          )}

          {tab === "ressources" && (
            <div className="mx-auto max-w-3xl space-y-4">
              {module.resources && module.resources.length > 0 && module.resources.map((resource) => (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <Badge color={resource.type === "video" ? "orange" : "blue"}>{resource.type}</Badge>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-950">{resource.title}</span>
                    {resource.description && <span className="mt-1 block text-sm leading-6 text-slate-600">{resource.description}</span>}
                  </span>
                  <ExternalLink size={18} className="mt-1 shrink-0 text-slate-400" />
                </motion.a>
              ))}

              {isModuleZero(module) && moduleZeroResources.map((resource) => (
                <motion.a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
                >
                  <Badge color={resource.type === "outil" ? "green" : "blue"}>{resource.type}</Badge>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-950">{resource.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{resource.description}</span>
                  </span>
                  <ExternalLink size={18} className="mt-1 shrink-0 text-slate-400" />
                </motion.a>
              ))}

              {(!module.resources || module.resources.length === 0) && !isModuleZero(module) && (
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center text-slate-600 shadow-md">
                  <Link2 size={38} className="mx-auto mb-4 text-[#00a86b]" />
                  <p className="font-bold text-slate-950">Aucune ressource pour ce module.</p>
                  <p className="mt-2 text-sm text-slate-500">Les compléments apparaîtront ici dès qu’ils seront disponibles.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <AIAssistant moduleId={id} moduleTitle={module.title} />
      {!dedicatedLearnerLayout && <Footer />}
    </div>
  );
}
