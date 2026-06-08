"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Loader2, Sparkles, X } from "lucide-react";
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
    .replace(/^---\s*
/m, "")
    .replace(/
---\s*
/g, "

---

");
}

function cleanAIResponse(text: string): string {
  return text
    .replace(/^(Bonjour\s*!?\s*|Pas de souci\s*!?\s*|Bien sûr\s*!?\s*|Avec plaisir\s*!?\s*|Bien entendu\s*!?\s*)/i, "")
    .trimStart();
}

function MarkdownCell({ source }: { source: string }) {
  const normalizedSource = normalizeMarkdown(source);

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 text-slate-950 shadow-2xl shadow-slate-950/20 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-300" />
      <div className="prose max-w-none
        prose-headings:tracking-tight prose-headings:text-slate-950 prose-headings:font-black
        prose-h1:mb-5 prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-5 prose-h1:text-3xl prose-h1:leading-tight sm:prose-h1:text-4xl
        prose-h2:mt-10 prose-h2:rounded-2xl prose-h2:bg-slate-950 prose-h2:px-5 prose-h2:py-3 prose-h2:text-xl prose-h2:text-white sm:prose-h2:text-2xl
        prose-h3:mt-7 prose-h3:text-lg prose-h3:text-blue-800 sm:prose-h3:text-xl
        prose-p:text-slate-700 prose-p:text-[1.03rem] prose-p:leading-8
        prose-strong:text-slate-950 prose-strong:font-extrabold
        prose-a:text-blue-700 prose-a:font-bold prose-a:no-underline hover:prose-a:text-blue-600
        prose-code:rounded-lg prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:text-blue-800 prose-code:ring-1 prose-code:ring-blue-100
        prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-950 prose-pre:text-slate-100
        prose-hr:my-8 prose-hr:border-slate-200
        prose-blockquote:rounded-2xl prose-blockquote:border-l-4 prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:text-slate-800
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
            table: ({ children }) => (
              <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="m-0 w-full border-collapse">{children}</table>
              </div>
            ),
          }}
        >
          {normalizedSource}
        </ReactMarkdown>
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
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#151827] shadow-2xl shadow-slate-950/30">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Python</span>
        </div>
        <motion.button
          onClick={explain}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-purple-300/20 bg-purple-400/10 px-3 text-xs font-bold text-purple-100 transition hover:border-purple-200/40 hover:bg-purple-400/15 disabled:opacity-50"
        >
          {loading ? <><Loader2 size={13} className="animate-spin" /> Analyse…</> : <><Sparkles size={13} /> Expliquer ce code</>}
        </motion.button>
      </div>

      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.88rem", background: "#151827", padding: "1.25rem" }}
        showLineNumbers
        lineNumberStyle={{ color: "#64748b", fontSize: "0.75rem", paddingRight: "1rem" }}
        wrapLongLines
      >
        {source}
      </SyntaxHighlighter>

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
        <div className="border-t border-white/10 bg-slate-950/70">
          {outputs.map((output, index) => (
            <div key={index} className="p-5">
              {output.type === "image" && (
                <img src={`data:image/png;base64,${output.data}`} alt="Graphique généré par le notebook" className="max-w-full rounded-2xl border border-white/10 bg-white" />
              )}
              {output.type === "text" && (
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-emerald-400/10 p-4 text-sm leading-7 text-emerald-100 ring-1 ring-emerald-300/20">{fixNotebookText(output.data)}</pre>
              )}
              {output.type === "html" && (
                <div className="overflow-x-auto rounded-2xl bg-white p-4 text-sm text-slate-950" dangerouslySetInnerHTML={{ __html: fixNotebookText(output.data) }} />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function NotebookViewer({ cells, moduleTitle }: NotebookViewerProps) {
  return (
    <div className="space-y-7">
      {cells.map((cell, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.02 }}
        >
          {cell.cell_type === "markdown" && cell.source.trim() && <MarkdownCell source={cell.source} />}
          {cell.cell_type === "code" && cell.source.trim() && <CodeCell source={cell.source} outputs={cell.outputs} moduleTitle={moduleTitle} />}
        </motion.div>
      ))}
    </div>
  );
}
