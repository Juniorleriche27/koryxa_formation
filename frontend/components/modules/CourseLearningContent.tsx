"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileCode,
  FlaskConical,
  FolderKanban,
  Lightbulb,
  Loader2,
  Network,
  Send,
  Target,
} from "lucide-react";
import { contentAPI, getApiErrorMessage, validationAPI } from "@/lib/api";
import QuizBlock from "@/components/modules/QuizBlock";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  order_index: number;
  lesson_type: string;
  estimated_minutes: number;
  objectives: string[];
  content_md?: string;
  validation_prompt?: string;
}

interface Exercise {
  id: string;
  title: string;
  exercise_type: string;
  brief_md: string;
  starter_files: Array<{ name?: string; path?: string; content?: string }>;
  expected_result_md: string;
  hints: string[];
  estimated_minutes: number;
}

interface Theory {
  glossary: Array<{ id: string; term: string; definition: string; example?: string }>;
  diagrams: Array<{
    id: string;
    title: string;
    description: string;
    module_id?: string;
    nodes?: unknown[];
    edges?: unknown[];
  }>;
  resources: Array<{
    id: string;
    title: string;
    summary: string;
    content_md?: string;
    module_id?: string;
  }>;
}

interface Project {
  id: string;
  title: string;
  summary: string;
  brief_md: string;
  minimum_version: string[];
  advanced_version: string[];
  milestones: Array<{
    id: string;
    module_id: string;
    title: string;
    description: string;
    deliverables: string[];
    acceptance_criteria: string[];
    order_index: number;
  }>;
}

const practicalResourcesByCourse: Record<string, Record<number, { title: string; href: string }>> = {
  "llm-rag": {
    3: { title: "Laboratoire chunking", href: "/notebooks/llm-rag/03-chunking.ipynb" },
    4: { title: "Laboratoire embeddings", href: "/notebooks/llm-rag/04-embeddings.ipynb" },
    5: { title: "Laboratoire recherche vectorielle", href: "/notebooks/llm-rag/05-vector-search.ipynb" },
    6: { title: "Laboratoire retrieval", href: "/notebooks/llm-rag/06-retrieval.ipynb" },
    8: { title: "Laboratoire évaluation RAG", href: "/notebooks/llm-rag/08-evaluation.ipynb" },
  },
  "sql-data-analyst": {
    0: { title: "Schéma PostgreSQL", href: "/resources/sql-data-analyst/01_schema_postgresql.sql" },
    1: { title: "Clients et régions (CSV)", href: "/resources/sql-data-analyst/clients.csv" },
    3: { title: "Ventes et objectifs (CSV)", href: "/resources/sql-data-analyst/ventes.csv" },
    4: { title: "Requêtes de départ (SQL)", href: "/resources/sql-data-analyst/03_requetes_depart.sql" },
    8: { title: "Corrigés de référence", href: "/resources/sql-data-analyst/04_solutions_reference.sql" },
    11: { title: "Kit de chargement PostgreSQL", href: "/resources/sql-data-analyst/02_chargement_donnees.sql" },
  },
  "excel-data-analyst": {
    0: { title: "Référentiel & données brutes", href: "/resources/excel-data-analyst/01_referentiel_produits_regions.xlsx" },
    1: { title: "Ventes mensuelles (CSV)", href: "/resources/excel-data-analyst/ventes_2026_01.csv" },
    3: { title: "Modèle de données & formules", href: "/resources/excel-data-analyst/02_formules_synthese_commerciale.xlsx" },
    4: { title: "Power Query & consolidation", href: "/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx" },
    8: { title: "Tableaux croisés & segments", href: "/resources/excel-data-analyst/03_tableaux_croises_dynamiques.xlsx" },
    11: { title: "Dashboard final modèle", href: "/resources/excel-data-analyst/04_power_query_modele_dashboard.xlsx" },
  },
  "power-bi-data-analyst": {
    0: { title: "Sources & référentiels", href: "/resources/power-bi-data-analyst/01_sources_et_referentiels.xlsx" },
    1: { title: "Ventes Janvier (CSV)", href: "/resources/power-bi-data-analyst/ventes_2026_01.csv" },
    3: { title: "Modèle de données relationnel", href: "/resources/power-bi-data-analyst/02_modele_donnees.xlsx" },
    4: { title: "Mesures DAX & KPIs", href: "/resources/power-bi-data-analyst/03_dax_kpi.xlsx" },
    8: { title: "Cahier de dashboard", href: "/resources/power-bi-data-analyst/04_cahier_dashboard.xlsx" },
  },
  "machine-learning-python": {
    0: { title: "Dataset Churn clients (CSV)", href: "/resources/machine-learning-python/clients_churn.csv" },
    1: { title: "Dataset Immobilier (CSV)", href: "/resources/machine-learning-python/biens_immobiliers.csv" },
  },
  "data-engineering-python-sql": {
    0: { title: "Données Clients (CSV)", href: "/resources/data-engineering-python-sql/customers.csv" },
    1: { title: "Données Produits (CSV)", href: "/resources/data-engineering-python-sql/products.csv" },
    2: { title: "Données Ventes (CSV)", href: "/resources/data-engineering-python-sql/sales.csv" },
    3: { title: "Flux API Ventes (JSON)", href: "/resources/data-engineering-python-sql/api_sales_pages.json" },
  },
};

function Markdown({ children }: { children?: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-black prose-a:text-blue-300 prose-code:text-emerald-200">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children || ""}</ReactMarkdown>
    </div>
  );
}

export default function CourseLearningContent({
  courseSlug,
  moduleId,
  moduleOrder,
  completed,
  passScore,
  onValidated,
}: {
  courseSlug: string;
  moduleId: string;
  moduleOrder: number;
  completed: boolean;
  passScore: number;
  onValidated: () => void;
}) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [theory, setTheory] = useState<Theory>({ glossary: [], diagrams: [], resources: [] });
  const [projects, setProjects] = useState<Project[]>([]);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [openHints, setOpenHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const projectStorageKey = `koryxa_project_draft_${courseSlug}_${moduleId}`;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    Promise.all([
      contentAPI.lessons(courseSlug, moduleId),
      contentAPI.exercises(courseSlug, moduleId),
      contentAPI.theory(courseSlug),
      contentAPI.projects(courseSlug),
    ])
      .then(([l, e, t, p]) => {
        if (!active) return;
        const rows = l.data || [];
        setLessons(rows);
        setOpenLesson(rows[0]?.id || null);
        setExercises(e.data || []);
        setTheory(t.data || { glossary: [], diagrams: [], resources: [] });
        setProjects(p.data || []);
      })
      .catch((err) => active && setError(getApiErrorMessage(err)))
      .finally(() => active && setLoading(false));

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(projectStorageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.url) setSubmissionUrl(parsed.url);
          if (parsed.notes) setSubmissionNotes(parsed.notes);
        }
      } catch {
        // Ignorer les erreurs de parsing localStorage
      }
    }

    return () => {
      active = false;
    };
  }, [courseSlug, moduleId, projectStorageKey]);

  const handleUrlChange = (val: string) => {
    setSubmissionUrl(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        projectStorageKey,
        JSON.stringify({ url: val, notes: submissionNotes })
      );
    }
  };

  const handleNotesChange = (val: string) => {
    setSubmissionNotes(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        projectStorageKey,
        JSON.stringify({ url: submissionUrl, notes: val })
      );
    }
  };

  const moduleTheory = useMemo(
    () => ({
      diagrams: theory.diagrams.filter((item) => !item.module_id || item.module_id === moduleId),
      resources: theory.resources.filter((item) => !item.module_id || item.module_id === moduleId),
    }),
    [theory, moduleId]
  );

  const project = projects[0];
  const milestone = project?.milestones?.find((item) => item.module_id === moduleId);
  const practicalResource = practicalResourcesByCourse[courseSlug]?.[moduleOrder];

  const submitProject = async () => {
    setSubmittingProject(true);
    setProjectMessage("");
    try {
      await validationAPI.submitFinalProject(
        submissionUrl || undefined,
        submissionNotes || undefined,
        courseSlug
      );
      setProjectMessage("Projet envoyé avec succès pour évaluation.");
      if (typeof window !== "undefined") {
        localStorage.removeItem(projectStorageKey);
      }
    } catch (err) {
      setProjectMessage(getApiErrorMessage(err));
    } finally {
      setSubmittingProject(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-slate-300">
        <Loader2 className="animate-spin" /> Chargement du contenu pédagogique…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6 text-red-100">
        Impossible de charger ce module. {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {lessons.length > 0 && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="text-blue-300" />
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-blue-200">
                Cours structuré
              </p>
              <h2 className="text-2xl font-black text-white">Leçons du module</h2>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {lessons.map((lesson) => {
              const open = openLesson === lesson.id;
              return (
                <article
                  key={lesson.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30"
                >
                  <button
                    onClick={() => setOpenLesson(open ? null : lesson.id)}
                    className="flex w-full items-start gap-4 p-5 text-left"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 font-black text-blue-200">
                      {lesson.order_index}
                    </span>
                    <span className="flex-1">
                      <span className="block font-black text-white">{lesson.title}</span>
                      <span className="mt-1 block text-sm text-slate-400">
                        {lesson.summary} · {lesson.estimated_minutes} min
                      </span>
                    </span>
                    {open ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {open && (
                    <div className="border-t border-white/10 p-5 sm:p-7">
                      {lesson.objectives?.length > 0 && (
                        <div className="mb-6 rounded-2xl bg-blue-500/10 p-4">
                          <p className="mb-2 font-black text-blue-100">Objectifs</p>
                          <ul className="space-y-1 text-sm text-slate-200">
                            {lesson.objectives.map((o) => (
                              <li key={o}>• {o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Markdown>{lesson.content_md}</Markdown>
                      {lesson.validation_prompt && (
                        <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4">
                          <p className="font-black text-emerald-100">Point de validation</p>
                          <p className="mt-2 text-sm leading-6 text-slate-200">
                            {lesson.validation_prompt}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {exercises.length > 0 && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-emerald-300" />
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-200">
                Pratique appliquée
              </p>
              <h2 className="text-2xl font-black text-white">Exercices du module</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-2xl border border-white/10 bg-slate-950/30 p-5 sm:p-6"
              >
                <h3 className="text-lg font-black text-white">{exercise.title}</h3>
                <div className="mt-3">
                  <Markdown>{exercise.brief_md}</Markdown>
                </div>
                {exercise.starter_files && exercise.starter_files.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exercise.starter_files.map((file, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-slate-300"
                      >
                        <FileCode size={13} className="text-cyan-300" /> {file.name || "fichier"}
                      </span>
                    ))}
                  </div>
                )}
                {exercise.hints?.length > 0 && (
                  <div className="mt-5">
                    <button
                      onClick={() => setOpenHints(!openHints)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200"
                    >
                      <Lightbulb size={14} /> {openHints ? "Masquer les indices" : "Afficher les indices"}
                    </button>
                    {openHints && (
                      <ul className="mt-3 space-y-1 rounded-xl bg-amber-400/10 p-3 text-xs text-amber-100">
                        {exercise.hints.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {(moduleTheory.diagrams.length > 0 || moduleTheory.resources.length > 0) && (
        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <Network className="text-cyan-300" />
            <h2 className="text-2xl font-black text-white">Supports théoriques</h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {moduleTheory.diagrams.map((d) => (
              <div key={d.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="font-black text-white">{d.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{d.description}</p>
              </div>
            ))}
            {moduleTheory.resources.map((r) => (
              <div key={r.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5">
                <p className="font-black text-white">{r.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{r.summary}</p>
                {r.content_md && (
                  <div className="mt-4">
                    <Markdown>{r.content_md}</Markdown>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {practicalResource && (
        <section className="rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <FlaskConical className="text-cyan-200" />
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-cyan-100">
                  Ressource pratique du module
                </p>
                <h2 className="text-xl font-black text-white">{practicalResource.title}</h2>
              </div>
            </div>
            <a
              href={practicalResource.href}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
            >
              <Download size={16} /> Télécharger la ressource
            </a>
          </div>
        </section>
      )}

      {milestone && (
        <section className="rounded-3xl border border-amber-300/25 bg-amber-400/10 p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <Target className="text-amber-300" />
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-amber-200">
                Jalon du Projet Final
              </p>
              <h2 className="text-xl font-black text-white">{milestone.title}</h2>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">{milestone.description}</p>
          <div className="mt-6 space-y-3">
            <input
              type="url"
              placeholder="URL du dépôt GitHub ou livrable (optionnel)"
              value={submissionUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-300"
            />
            <textarea
              placeholder="Notes ou explications sur votre avancement (optionnel)"
              value={submissionNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-300"
            />
            <button
              onClick={submitProject}
              disabled={submittingProject}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
            >
              {submittingProject ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
              Enregistrer l&apos;avancement
            </button>
            {projectMessage && (
              <p className="mt-2 text-xs font-bold text-amber-200">{projectMessage}</p>
            )}
          </div>
        </section>
      )}

      <section className="mt-8">
        <QuizBlock
          moduleId={moduleId}
          passScore={passScore}
          isValidated={completed}
          onValidated={onValidated}
        />
      </section>
    </div>
  );
}
