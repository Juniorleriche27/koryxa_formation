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
import { DEFAULT_COURSE_SLUG, LLM_RAG_COURSE_SLUG, courseRoutes, readCourseSlug } from "@/lib/courseConfig";
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

const tabClasses = {
  active: "bg-white text-slate-950 shadow-lg shadow-slate-950/10",
  inactive: "text-slate-300 hover:bg-white/10 hover:text-white",
};

function isModuleZero(module: Module | null) {
  return module?.order_index === 0;
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
    setLoadingNb(true);
    notebookAPI
      .getContent(id)
      .then((response) => {
        const loadedCells = response.data.cells || [];
        setCells(loadedCells.length > 0 ? loadedCells : isModuleZero(module) ? moduleZeroCells : []);
      })
      .catch(() => setCells(isModuleZero(module) ? moduleZeroCells : []))
      .finally(() => setLoadingNb(false));
  }, [module, id]);

  if (!module) {
    return (
      <div className="kx-dark-page flex min-h-screen flex-col">
        {courseSlug !== LLM_RAG_COURSE_SLUG && <Navbar />}
        <LearnerCourseContext courseSlug={courseSlug} current="module" compact />
        <main className="kx-container flex flex-1 items-center justify-center py-12">
          {moduleError ? (
            <div role="alert" className="w-full max-w-xl rounded-3xl border border-red-300/20 bg-red-400/10 px-6 py-10 text-center text-red-100 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <AlertTriangle className="mx-auto h-9 w-9" />
              <p className="mt-4 text-xl font-black">{moduleError}</p>
              <p className="mt-2 text-sm leading-6 text-red-100/75">Le module peut être indisponible ou ne pas appartenir à ce parcours.</p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={courseRoutes.modules(courseSlug)} className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-black text-slate-950">
                  Retour au parcours
                </Link>
                <button type="button" onClick={() => window.location.reload()} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 px-4 text-sm font-black text-white">
                  <RefreshCw size={16} /> Réessayer
                </button>
              </div>
            </div>
          ) : (
            <div aria-live="polite" aria-busy={moduleLoading} className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-8 text-center shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mx-auto h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent" />
              <p className="mt-4 text-sm font-semibold text-slate-300">Préparation du module…</p>
            </div>
          )}
        </main>
      </div>
    );
  }

  const downloadUrl = notebookAPI.getDownloadUrl(id);
  const dedicatedLearnerLayout = courseSlug === LLM_RAG_COURSE_SLUG;
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
    <div className="kx-dark-page flex flex-col">
      {!dedicatedLearnerLayout && <Navbar />}
      <LearnerCourseContext courseSlug={courseSlug} current="module" compact />

      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(59,130,246,0.28),transparent_34rem),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.14),transparent_28rem)]" />
        <div className="kx-container relative py-8 sm:py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <Link href={courseRoutes.modules(courseSlug)} className="font-semibold text-slate-300 transition hover:text-white">
                  Modules
                </Link>
                <ChevronRight size={15} />
                <span>Module {module.order_index}</span>
                {previousModuleStatus?.module_id && (
                  <Link
                    href={courseRoutes.module(previousModuleStatus.module_id, courseSlug)}
                    className="ml-auto inline-flex items-center gap-1 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft size={14} /> Module précédent
                  </Link>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge color="blue" className="bg-white text-blue-700 ring-white/70">Module {module.order_index}</Badge>
                {completed && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                    <CheckCircle2 size={14} /> Validé
                  </span>
                )}
                {moduleStatus?.status === "quiz_failed" && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                    <RefreshCw size={14} /> QCM à refaire
                  </span>
                )}
                {isLocked && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                    <Lock size={14} /> Bloqué
                  </span>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {module.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {module.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <Clock className="mb-3 h-5 w-5 text-blue-300" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Durée</p>
                  <p className="mt-1 font-bold text-white">{module.duration}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <BookOpen className="mb-3 h-5 w-5 text-cyan-300" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Cours</p>
                  <p className="mt-1 font-bold text-white">{cells.length || "—"} cellules</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <Layers3 className="mb-3 h-5 w-5 text-emerald-300" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Ressources</p>
                  <p className="mt-1 font-bold text-white">{resourcesCount} éléments</p>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/30 backdrop-blur-xl lg:sticky lg:top-24">
              <div className="rounded-2xl bg-white p-4 text-slate-950 shadow-soft">
                <p className="flex items-center gap-2 text-sm font-black">
                  <Sparkles size={16} className="text-blue-600" />
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
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
                  >
                    <Download size={17} /> Télécharger .ipynb
                  </a>
                )}
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
                  <p className="flex items-center gap-2 font-black text-white">
                    {completed ? <CheckCircle2 size={16} className="text-emerald-300" /> : <Trophy size={16} className="text-purple-300" />}
                    Validation certifiante
                  </p>
                  <p className="mt-2 leading-6 text-slate-400">
                    {completed
                      ? `QCM validé${moduleStatus?.quiz_best_score != null ? ` avec ${moduleStatus.quiz_best_score}/20` : ""}.`
                      : `QCM obligatoire : minimum ${moduleStatus?.quiz_pass_score || module.quiz_pass_score || 12}/20.`}
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl">
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
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${tab === "ressources" ? "bg-slate-100 text-slate-700" : "bg-blue-400/20 text-blue-200"}`}>
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
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <Lock size={42} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-xl font-black text-white">Module verrouillé</p>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                    Tu dois valider le module précédent avant d’ouvrir cette étape. Retourne au parcours pour voir ta progression et les QCM à refaire.
                  </p>
                  <Link href={courseRoutes.modules(courseSlug)} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-blue-600 hover:text-white">
                    Voir le parcours <ChevronRight size={16} />
                  </Link>
                </div>
              ) : loadingNb ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mx-auto h-8 w-8 rounded-full border-2 border-blue-400 border-t-transparent"
                  />
                  <p className="mt-4 font-semibold">Chargement du notebook…</p>
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
                    <section className="mt-8 rounded-3xl border border-emerald-300/25 bg-emerald-400/10 p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl sm:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Étape suivante débloquée</p>
                          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Continue vers le module {nextModuleStatus.order_index}</h2>
                          <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80">
                            {nextModuleStatus.title || "Le module suivant"} est maintenant disponible. Tu peux continuer sans revenir au tableau du parcours.
                          </p>
                        </div>
                        <Link
                          href={courseRoutes.module(nextModuleStatus.module_id, courseSlug)}
                          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                        >
                          Passer au module suivant <ChevronRight size={17} />
                        </Link>
                      </div>
                    </section>
                  )}

                  {module.resources && module.resources.length > 0 && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Compléments</p>
                          <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Ressources du module</h2>
                        </div>
                      </div>

                      {videos.length > 0 && (
                        <div className="space-y-4">
                          {videos.map((resource) => {
                            const youtubeId = getYouTubeId(resource.url);
                            return (
                              <div key={resource.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70">
                                {resource.title && (
                                  <div className="border-b border-white/10 px-5 py-4">
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
                              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/[0.08] hover:text-white"
                            >
                              <Badge color="blue" className="bg-blue-400/10 text-blue-200 ring-blue-300/20">{resource.type}</Badge>
                              {resource.title}
                              <ExternalLink size={14} className="text-slate-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  {isModuleZero(module) && (
                    <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Ressources externes fiables</p>
                      <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Pour installer, pratiquer et débloquer</h2>
                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {moduleZeroResources.map((resource) => (
                          <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-white/[0.08]">
                            <Badge color={resource.type === "outil" ? "green" : "blue"} className="bg-blue-400/10 text-blue-200 ring-blue-300/20">{resource.type}</Badge>
                            <p className="mt-3 font-black text-white">{resource.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">{resource.description}</p>
                            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-200">Ouvrir <ExternalLink size={13} /></span>
                          </a>
                        ))}
                      </div>
                    </section>
                  )}
                </>
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
                  <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                    <BookOpen size={42} className="mx-auto mb-4 text-blue-300" />
                    <p className="text-lg font-bold text-white">Le contenu de ce module sera bientôt disponible.</p>
                    <p className="mt-2 text-sm text-slate-400">Reviens plus tard ou consulte les ressources disponibles.</p>
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
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:border-blue-300/40 hover:bg-white/[0.09]"
                >
                  <Badge color={resource.type === "video" ? "orange" : "blue"}>{resource.type}</Badge>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white">{resource.title}</span>
                    {resource.description && <span className="mt-1 block text-sm leading-6 text-slate-400">{resource.description}</span>}
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
                  className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition hover:border-blue-300/40 hover:bg-white/[0.09]"
                >
                  <Badge color={resource.type === "outil" ? "green" : "blue"}>{resource.type}</Badge>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-white">{resource.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">{resource.description}</span>
                  </span>
                  <ExternalLink size={18} className="mt-1 shrink-0 text-slate-400" />
                </motion.a>
              ))}

              {(!module.resources || module.resources.length === 0) && !isModuleZero(module) && (
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-16 text-center text-slate-300 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                  <Link2 size={38} className="mx-auto mb-4 text-blue-300" />
                  <p className="font-bold text-white">Aucune ressource pour ce module.</p>
                  <p className="mt-2 text-sm text-slate-400">Les compléments apparaîtront ici dès qu’ils seront disponibles.</p>
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
