"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpenCheck, ChevronDown, ChevronUp, Download, FlaskConical, FolderKanban, Lightbulb, Loader2, Network, Target } from "lucide-react";
import { contentAPI, getApiErrorMessage, validationAPI } from "@/lib/api";
import QuizBlock from "@/components/modules/QuizBlock";

interface Lesson { id:string; slug:string; title:string; summary:string; order_index:number; lesson_type:string; estimated_minutes:number; objectives:string[]; content_md?:string; validation_prompt?:string; }
interface Exercise { id:string; title:string; exercise_type:string; brief_md:string; starter_files:Array<{name?:string;path?:string;content?:string}>; expected_result_md:string; hints:string[]; estimated_minutes:number; }
interface Theory { glossary:Array<{id:string;term:string;definition:string;example?:string}>; diagrams:Array<{id:string;title:string;description:string;module_id?:string;nodes?:unknown[];edges?:unknown[]}>; resources:Array<{id:string;title:string;summary:string;content_md?:string;module_id?:string}>; }
interface Project { id:string; title:string; summary:string; brief_md:string; minimum_version:string[]; advanced_version:string[]; milestones:Array<{id:string;module_id:string;title:string;description:string;deliverables:string[];acceptance_criteria:string[];order_index:number}>; }

const notebookByOrder: Record<number, {title:string; href:string}> = {
  3: { title: "Laboratoire chunking", href: "/notebooks/llm-rag/03-chunking.ipynb" },
  4: { title: "Laboratoire embeddings", href: "/notebooks/llm-rag/04-embeddings.ipynb" },
  5: { title: "Laboratoire recherche vectorielle", href: "/notebooks/llm-rag/05-vector-search.ipynb" },
  6: { title: "Laboratoire retrieval", href: "/notebooks/llm-rag/06-retrieval.ipynb" },
  8: { title: "Laboratoire évaluation RAG", href: "/notebooks/llm-rag/08-evaluation.ipynb" },
};

function Markdown({ children }: { children?: string }) {
  return <div className="prose prose-invert max-w-none prose-headings:font-black prose-a:text-blue-300 prose-code:text-emerald-200"><ReactMarkdown remarkPlugins={[remarkGfm]}>{children || ""}</ReactMarkdown></div>;
}

export default function LlmRagLearningContent({ moduleId, moduleOrder, completed, passScore, onValidated }: { moduleId:string; moduleOrder:number; completed:boolean; passScore:number; onValidated:()=>void }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [theory, setTheory] = useState<Theory>({ glossary:[], diagrams:[], resources:[] });
  const [projects, setProjects] = useState<Project[]>([]);
  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [openHints, setOpenHints] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [submittingProject, setSubmittingProject] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    Promise.all([
      contentAPI.lessons("llm-rag", moduleId),
      contentAPI.exercises("llm-rag", moduleId),
      contentAPI.theory("llm-rag"),
      contentAPI.projects("llm-rag"),
    ]).then(([l,e,t,p]) => {
      if (!active) return;
      const rows = l.data || [];
      setLessons(rows); setOpenLesson(rows[0]?.id || null);
      setExercises(e.data || []); setTheory(t.data || { glossary:[], diagrams:[], resources:[] }); setProjects(p.data || []);
    }).catch((err) => active && setError(getApiErrorMessage(err))).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [moduleId]);

  const moduleTheory = useMemo(() => ({
    diagrams: theory.diagrams.filter((item) => !item.module_id || item.module_id === moduleId),
    resources: theory.resources.filter((item) => !item.module_id || item.module_id === moduleId),
  }), [theory, moduleId]);
  const project = projects[0];
  const milestone = project?.milestones?.find((item) => item.module_id === moduleId);
  const notebook = notebookByOrder[moduleOrder];

  const submitProject = async () => {
    setSubmittingProject(true);
    setProjectMessage("");
    try {
      await validationAPI.submitFinalProject(submissionUrl || undefined, submissionNotes || undefined, "llm-rag");
      setProjectMessage("Projet envoyé pour évaluation.");
    } catch (err) {
      setProjectMessage(getApiErrorMessage(err));
    } finally {
      setSubmittingProject(false);
    }
  };

  if (loading) return <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.05] p-6 text-slate-300"><Loader2 className="animate-spin" /> Chargement du contenu pédagogique…</div>;
  if (error) return <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6 text-red-100">Impossible de charger ce module. {error}</div>;

  return <div className="space-y-8">
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7">
      <div className="flex items-center gap-3"><BookOpenCheck className="text-blue-300"/><div><p className="text-xs font-black uppercase tracking-[.16em] text-blue-200">Cours structuré</p><h2 className="text-2xl font-black text-white">Leçons du module</h2></div></div>
      <div className="mt-6 space-y-3">{lessons.map((lesson) => {
        const open = openLesson === lesson.id;
        return <article key={lesson.id} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30">
          <button onClick={() => setOpenLesson(open ? null : lesson.id)} className="flex w-full items-start gap-4 p-5 text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 font-black text-blue-200">{lesson.order_index}</span>
            <span className="flex-1"><span className="block font-black text-white">{lesson.title}</span><span className="mt-1 block text-sm text-slate-400">{lesson.summary} · {lesson.estimated_minutes} min</span></span>{open ? <ChevronUp/> : <ChevronDown/>}
          </button>
          {open && <div className="border-t border-white/10 p-5 sm:p-7">{lesson.objectives?.length > 0 && <div className="mb-6 rounded-2xl bg-blue-500/10 p-4"><p className="mb-2 font-black text-blue-100">Objectifs</p><ul className="space-y-1 text-sm text-slate-200">{lesson.objectives.map((o)=><li key={o}>• {o}</li>)}</ul></div>}<Markdown>{lesson.content_md}</Markdown>{lesson.validation_prompt && <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4"><p className="font-black text-emerald-100">Point de validation</p><p className="mt-2 text-sm leading-6 text-slate-200">{lesson.validation_prompt}</p></div>}</div>}
        </article>;
      })}</div>
    </section>

    {(moduleTheory.diagrams.length > 0 || moduleTheory.resources.length > 0) && <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 sm:p-7"><div className="flex items-center gap-3"><Network className="text-cyan-300"/><h2 className="text-2xl font-black text-white">Supports théoriques</h2></div><div className="mt-5 grid gap-4 md:grid-cols-2">{moduleTheory.diagrams.map(d=><div key={d.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5"><p className="font-black text-white">{d.title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{d.description}</p></div>)}{moduleTheory.resources.map(r=><div key={r.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-5"><p className="font-black text-white">{r.title}</p><p className="mt-2 text-sm leading-6 text-slate-300">{r.summary}</p>{r.content_md && <div className="mt-4"><Markdown>{r.content_md}</Markdown></div>}</div>)}</div></section>}

    {notebook && <section className="rounded-3xl border border-cyan-300/20 bg-cyan-500/10 p-5 sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><FlaskConical className="text-cyan-200"/><div><p className="text-xs font-black uppercase tracking-[.16em] text-cyan-100">Laboratoire pratique</p><h2 className="text-xl font-black text-white">{notebook.title}</h2></div></div><a href={notebook.href} download className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950"><Download size={16}/> Télécharger le notebook</a></div></section>}

    {exercises.map(exercise => <section key={exercise.id} className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-5 sm:p-7"><div className="flex items-center gap-3"><Target className="text-amber-200"/><div><p className="text-xs font-black uppercase tracking-[.16em] text-amber-100">Exercice {exercise.exercise_type}</p><h2 className="text-2xl font-black text-white">{exercise.title}</h2></div></div><div className="mt-5"><Markdown>{exercise.brief_md}</Markdown></div>{exercise.starter_files?.length > 0 && <div className="mt-5 rounded-2xl bg-slate-950/40 p-4"><p className="font-black text-white">Fichiers de départ</p>{exercise.starter_files.map((f,i)=><p key={i} className="mt-2 font-mono text-sm text-amber-100">{f.path || f.name || `fichier-${i+1}`}</p>)}</div>}<div className="mt-5 rounded-2xl border border-white/10 p-4"><p className="font-black text-white">Résultat attendu</p><div className="mt-2"><Markdown>{exercise.expected_result_md}</Markdown></div></div>{exercise.hints?.length > 0 && <div className="mt-5"><button onClick={()=>setOpenHints(!openHints)} className="inline-flex items-center gap-2 text-sm font-black text-amber-100"><Lightbulb size={16}/> {openHints ? "Masquer les indices" : "Afficher les indices"}</button>{openHints && <ul className="mt-3 space-y-2 rounded-2xl bg-slate-950/30 p-4 text-sm text-slate-200">{exercise.hints.map(h=><li key={h}>• {h}</li>)}</ul>}</div>}</section>)}

    {milestone && <section className="rounded-3xl border border-purple-300/20 bg-purple-500/10 p-5 sm:p-7"><div className="flex items-center gap-3"><FolderKanban className="text-purple-200"/><div><p className="text-xs font-black uppercase tracking-[.16em] text-purple-100">Projet fil rouge · jalon {milestone.order_index}</p><h2 className="text-2xl font-black text-white">{milestone.title}</h2></div></div><p className="mt-4 leading-7 text-slate-200">{milestone.description}</p><div className="mt-5 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-slate-950/30 p-4"><p className="font-black text-white">Livrables</p><ul className="mt-2 space-y-2 text-sm text-slate-200">{milestone.deliverables.map(x=><li key={x}>• {x}</li>)}</ul></div><div className="rounded-2xl bg-slate-950/30 p-4"><p className="font-black text-white">Critères d’acceptation</p><ul className="mt-2 space-y-2 text-sm text-slate-200">{milestone.acceptance_criteria.map(x=><li key={x}>• {x}</li>)}</ul></div></div></section>}

    {project && moduleOrder >= 11 && <section className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-5 sm:p-7"><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-100">Projet final</p><h2 className="mt-2 text-3xl font-black text-white">{project.title}</h2><p className="mt-3 text-slate-200">{project.summary}</p><div className="mt-5"><Markdown>{project.brief_md}</Markdown></div><div className="mt-6 grid gap-4"><label className="text-sm font-black text-white">Lien du dépôt ou de la démonstration<input value={submissionUrl} onChange={(event)=>setSubmissionUrl(event.target.value)} type="url" placeholder="https://..." className="mt-2 min-h-12 w-full rounded-2xl border border-white/15 bg-slate-950/40 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-300" /></label><label className="text-sm font-black text-white">Notes de livraison<textarea value={submissionNotes} onChange={(event)=>setSubmissionNotes(event.target.value)} rows={5} placeholder="Décris les choix techniques, tests et limites." className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/40 p-4 text-sm text-white outline-none focus:ring-2 focus:ring-emerald-300" /></label><button onClick={submitProject} disabled={submittingProject || (!submissionUrl.trim() && !submissionNotes.trim())} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">{submittingProject ? "Envoi en cours…" : "Envoyer le projet pour évaluation"}</button>{projectMessage && <p role="status" className="rounded-2xl bg-slate-950/30 p-4 text-sm font-bold text-emerald-100">{projectMessage}</p>}</div></section>}

    <QuizBlock moduleId={moduleId} passScore={passScore} isValidated={completed} onValidated={onValidated}/>
  </div>;
}
