"use client";

import { Children, isValidElement, ReactNode, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  Code2,
  FileText,
  Flag,
  GraduationCap,
  Lightbulb,
  Loader2,
  PlayCircle,
  RefreshCw,
  Sparkles,
  Target,
  TerminalSquare,
  X,
} from "lucide-react";
import { aiAPI, getApiErrorMessage } from "@/lib/api";

export interface CellOutput {
  type: "image" | "text" | "html";
  data: string;
}

export interface NotebookCell {
  cell_type: "markdown" | "code" | "raw";
  source: string;
  outputs: CellOutput[];
}

interface NotebookViewerProps {
  cells: NotebookCell[];
  moduleTitle?: string;
}

type CalloutTone = "remember" | "warning" | "practice" | "success" | "objective" | "default";

function fixNotebookText(value: string) {
  return value
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜|â€™/g, "'")
    .replace(/â€œ|â€�/g, '"')
    .replace(/â€¦/g, "…")
    .replace(/Â /g, " ")
    .replace(/Â/g, "")
    .replace(/\uFFFD/g, "")
    .replace(/\n---\n/g, "\n\n---\n\n")
    .replace(/\n{3,}/g, "\n\n");
}

function normalizeMarkdown(source: string) {
  return fixNotebookText(source)
    .replace(/^---\s*\n/m, "")
    .replace(/\n---\s*\n/g, "\n\n---\n\n");
}

function cleanAIResponse(text: string): string {
  return text
    .replace(/^(Bonjour\s*!?\s*|Pas de souci\s*!?\s*|Bien sûr\s*!?\s*|Avec plaisir\s*!?\s*|Bien entendu\s*!?\s*)/i, "")
    .trimStart();
}

function flattenNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenNodeText).join(" ");
  if (isValidElement(node)) return flattenNodeText(node.props.children);
  return "";
}

function getCalloutTone(children: ReactNode): CalloutTone {
  const text = flattenNodeText(children).toLowerCase();

  if (/erreur|attention|évite|evite|bloque|warning|danger/.test(text)) return "warning";
  if (/à toi|a toi|teste|exercice|pratique|challenge|défi|defi/.test(text)) return "practice";
  if (/objectif|tu sauras|résultat attendu|resultat attendu/.test(text)) return "objective";
  if (/réussi|reussi|correct|validation|checklist/.test(text)) return "success";
  if (/à retenir|a retenir|important|note/.test(text)) return "remember";

  return "default";
}

function Callout({ children }: { children: ReactNode }) {
  const tone = getCalloutTone(children);
  const config = {
    remember: {
      icon: Lightbulb,
      label: "À retenir",
      className: "border-blue-200 bg-blue-50 text-blue-950",
      iconClassName: "bg-blue-600 text-white",
    },
    warning: {
      icon: AlertTriangle,
      label: "Point d'attention",
      className: "border-amber-200 bg-amber-50 text-amber-950",
      iconClassName: "bg-amber-500 text-white",
    },
    practice: {
      icon: PlayCircle,
      label: "À toi de jouer",
      className: "border-emerald-200 bg-emerald-50 text-emerald-950",
      iconClassName: "bg-emerald-600 text-white",
    },
    success: {
      icon: CheckCircle2,
      label: "Validation",
      className: "border-teal-200 bg-teal-50 text-teal-950",
      iconClassName: "bg-teal-600 text-white",
    },
    objective: {
      icon: Target,
      label: "Objectif",
      className: "border-indigo-200 bg-indigo-50 text-indigo-950",
      iconClassName: "bg-indigo-600 text-white",
    },
    default: {
      icon: BookOpenCheck,
      label: "Note du cours",
      className: "border-slate-200 bg-slate-50 text-slate-900",
      iconClassName: "bg-slate-900 text-white",
    },
  }[tone];
  const Icon = config.icon;

  return (
    <aside className={`my-6 rounded-[1.5rem] border p-4 shadow-sm sm:p-5 ${config.className}`}>
      <div className="mb-3 flex items-center gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${config.iconClassName}`}>
          <Icon size={17} />
        </span>
        <p className="m-0 text-xs font-black uppercase tracking-[0.18em] opacity-80">{config.label}</p>
      </div>
      <div className="callout-content">{children}</div>
    </aside>
  );
}

function SectionDivider() {
  return (
    <div className="my-8 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
      <span className="h-2 w-2 rounded-full bg-blue-500" />
      <span className="h-px flex-1 bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />
    </div>
  );
}

function MarkdownCell({ source, index }: { source: string; index: number }) {
  const normalizedSource = normalizeMarkdown(source);
  const isFirst = index === 0;

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-5 text-slate-950 shadow-xl shadow-slate-950/8 ring-1 ring-white/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-slate-950/12 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-300" />
      <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-blue-100/60 blur-3xl transition group-hover:bg-cyan-100/80" />
      <div className="relative">
        {isFirst && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-blue-800">
            <GraduationCap size={14} /> Parcours guidé
          </div>
        )}

        <div className="prose max-w-none
          prose-headings:tracking-tight prose-headings:text-slate-950 prose-headings:font-black
          prose-h1:mb-5 prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-5 prose-h1:text-3xl prose-h1:leading-tight sm:prose-h1:text-4xl
          prose-h2:mt-10 prose-h2:rounded-[1.35rem] prose-h2:bg-gradient-to-r prose-h2:from-slate-950 prose-h2:to-blue-950 prose-h2:px-5 prose-h2:py-3 prose-h2:text-xl prose-h2:text-white prose-h2:shadow-lg prose-h2:shadow-slate-950/15 sm:prose-h2:text-2xl
          prose-h3:mt-7 prose-h3:text-lg prose-h3:text-blue-800 sm:prose-h3:text-xl
          prose-h4:mt-6 prose-h4:text-base prose-h4:text-slate-900
          prose-p:text-slate-700 prose-p:text-[1.03rem] prose-p:leading-8
          prose-strong:text-slate-950 prose-strong:font-extrabold
          prose-a:text-blue-700 prose-a:font-bold prose-a:no-underline hover:prose-a:text-blue-600
          prose-code:rounded-lg prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:text-blue-800 prose-code:ring-1 prose-code:ring-blue-100
          prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-950 prose-pre:text-slate-100
          prose-hr:my-0 prose-hr:border-0
          prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-slate-700 prose-li:leading-8 prose-li:marker:text-blue-600
          prose-table:overflow-hidden prose-table:rounded-2xl prose-table:text-sm
          prose-th:border prose-th:border-slate-200 prose-th:bg-slate-950 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-white
          prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-3 prose-td:text-slate-700">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              blockquote: ({ children }) => <Callout>{children}</Callout>,
              hr: () => <SectionDivider />,
              table: ({ children }) => (
                <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="m-0 min-w-[640px] w-full border-collapse">{children}</table>
                </div>
              ),
              code: ({ className, children, ...props }) => {
                const inline = !className;
                if (inline) {
                  return (
                    <code className="rounded-lg bg-blue-50 px-2 py-1 font-semibold text-blue-800 ring-1 ring-blue-100" {...props}>
                      {children}
                    </code>
                  );
                }
                return <code className={className} {...props}>{children}</code>;
              },
            }}
          >
            {normalizedSource}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

function AIMarkdown({ text }: { text: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-p:my-2 prose-p:text-slate-100 prose-p:leading-7
      prose-strong:text-white prose-strong:font-bold
      prose-em:text-purple-200 prose-em:not-italic prose-em:font-semibold
      prose-h2:mt-4 prose-h2:text-base prose-h2:text-white
      prose-h3:mt-3 prose-h3:text-sm prose-h3:text-purple-200
      prose-li:text-slate-100 prose-li:leading-7 prose-ul:marker:text-purple-300
      prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-amber-200
      prose-blockquote:rounded-r-xl prose-blockquote:border-l-purple-400 prose-blockquote:bg-purple-400/10 prose-blockquote:text-slate-100">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

function OutputBlock({ output }: { output: CellOutput }) {
  if (output.type === "image") {
    return (
      <figure className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
        <img src={`data:image/png;base64,${output.data}`} alt="Graphique généré par le notebook" className="max-w-full rounded-2xl bg-white" />
      </figure>
    );
  }

  if (output.type === "html") {
    return (
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-950 shadow-sm" dangerouslySetInnerHTML={{ __html: fixNotebookText(output.data) }} />
    );
  }

  return (
    <pre className="overflow-x-auto whitespace-pre-wrap rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950 shadow-sm">
      {fixNotebookText(output.data)}
    </pre>
  );
}

function CodeCell({ source, outputs, moduleTitle }: { source: string; outputs: CellOutput[]; moduleTitle?: string }) {
  const [fullText, setFullText] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showExp, setShowExp] = useState(false);

  useEffect(() => {
    if (!fullText) return;
    setDisplayed("");
    setStreaming(true);
    let index = 0;
    const delay = fullText.length > 600 ? 8 : fullText.length > 300 ? 12 : 18;
    const timer = setInterval(() => {
      index += 1;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(timer);
        setStreaming(false);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [fullText]);

  const explain = async () => {
    if (fullText) {
      setShowExp(true);
      return;
    }
    setLoading(true);
    try {
      const response = await aiAPI.explain(source, moduleTitle);
      setFullText(cleanAIResponse(response.data.explanation));
      setShowExp(true);
    } catch (error) {
      setFullText(`Impossible de générer l'explication.\n\n${getApiErrorMessage(error)}`);
      setShowExp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/30 ring-1 ring-white/10">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
            <TerminalSquare size={18} />
          </span>
          <div>
            <p className="text-sm font-black text-white">Code Python</p>
            <p className="text-xs text-slate-400">Lis, comprends, puis modifie pour pratiquer.</p>
          </div>
        </div>
        <motion.button
          onClick={explain}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-purple-300/20 bg-purple-400/10 px-4 text-xs font-black uppercase tracking-[0.12em] text-purple-100 transition hover:border-purple-200/40 hover:bg-purple-400/15 disabled:opacity-50"
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Analyse…</> : <><Sparkles size={14} /> Expliquer</>}
        </motion.button>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-4 flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.88rem", background: "#020617", padding: "3rem 1.25rem 1.25rem" }}
          showLineNumbers
          lineNumberStyle={{ color: "#64748b", fontSize: "0.75rem", paddingRight: "1rem" }}
          wrapLongLines
        >
          {fixNotebookText(source)}
        </SyntaxHighlighter>
      </div>

      <AnimatePresence>
        {showExp && fullText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative border-t border-purple-300/20 bg-gradient-to-br from-purple-950/75 via-slate-950/80 to-blue-950/70 px-5 py-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl border border-purple-300/20 bg-purple-400/10 text-purple-100">
                    <Lightbulb size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">Explication simplifiée</p>
                    <p className="text-xs text-purple-200/80">Comprendre avant de copier</p>
                  </div>
                </div>
                <button onClick={() => setShowExp(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Fermer l'explication">
                  <X size={16} />
                </button>
              </div>
              <AIMarkdown text={displayed + (streaming ? "▍" : "")} />
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <span className="h-px flex-1 bg-white/10" />
                Généré par IA, à vérifier
                <span className="h-px flex-1 bg-white/10" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {outputs.length > 0 && (
        <div className="border-t border-white/10 bg-slate-50 px-4 py-5 sm:px-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            <Flag size={14} /> Résultat attendu
          </div>
          <div className="space-y-4">
            {outputs.map((output, index) => (
              <OutputBlock key={index} output={output} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function CourseProgressSummary({ cells }: { cells: NotebookCell[] }) {
  const summary = useMemo(() => {
    const markdown = cells.filter((cell) => cell.cell_type === "markdown" && cell.source.trim()).length;
    const code = cells.filter((cell) => cell.cell_type === "code" && cell.source.trim()).length;
    const outputs = cells.reduce((total, cell) => total + cell.outputs.length, 0);
    return { markdown, code, outputs };
  }, [cells]);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <FileText size={18} />
        </div>
        <p className="text-2xl font-black text-slate-950">{summary.markdown}</p>
        <p className="text-sm font-semibold text-slate-500">sections guidées</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
          <Code2 size={18} />
        </div>
        <p className="text-2xl font-black text-slate-950">{summary.code}</p>
        <p className="text-sm font-semibold text-slate-500">blocs de code</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={18} />
        </div>
        <p className="text-2xl font-black text-slate-950">{summary.outputs}</p>
        <p className="text-sm font-semibold text-slate-500">résultats visibles</p>
      </div>
    </div>
  );
}

export default function NotebookViewer({ cells, moduleTitle }: NotebookViewerProps) {
  const visibleCells = cells.filter((cell) => cell.source.trim());

  return (
    <div className="space-y-7">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-blue-50/60 to-emerald-50/40 p-5 shadow-xl shadow-slate-950/8 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
              <Sparkles size={13} /> Mode apprentissage premium
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{moduleTitle || "Cours interactif KORYXA"}</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Avance section par section : lis, observe le code, compare le résultat, puis pratique jusqu'à validation.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-emerald-800 shadow-sm">
            <RefreshCw size={16} /> Voir → Tester → Valider
          </div>
        </div>
        <CourseProgressSummary cells={visibleCells} />
      </div>

      {visibleCells.map((cell, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {cell.cell_type === "markdown" && <MarkdownCell source={cell.source} index={index} />}
          {cell.cell_type === "code" && <CodeCell source={cell.source} outputs={cell.outputs} moduleTitle={moduleTitle} />}
        </motion.div>
      ))}
    </div>
  );
}
