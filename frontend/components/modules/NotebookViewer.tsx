"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, X, Lightbulb } from "lucide-react";
import { aiAPI } from "@/lib/api";

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

// Supprime les formules d'intro inutiles de l'IA
function cleanAIResponse(text: string): string {
  return text
    .replace(/^(Bonjour\s*!?\s*|Pas de souci\s*!?\s*|Bien sûr\s*!?\s*|Avec plaisir\s*!?\s*|Bien entendu\s*!?\s*)/i, "")
    .trimStart();
}

function MarkdownCell({ source }: { source: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-h1:text-2xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-3
      prose-h2:text-xl prose-h2:text-blue-300
      prose-h3:text-lg prose-h3:text-cyan-300
      prose-p:text-slate-300 prose-p:leading-relaxed
      prose-strong:text-white
      prose-code:text-orange-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-300
      prose-table:text-sm prose-th:text-white prose-th:bg-white/5 prose-td:text-slate-300 prose-td:border-white/10
      prose-li:text-slate-300 prose-ul:marker:text-blue-400
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}

// Rendu markdown pour l'explication IA — styles soignés purple/dark
function AIMarkdown({ text }: { text: string }) {
  return (
    <div className="
      prose prose-invert prose-sm max-w-none
      prose-p:text-slate-200 prose-p:leading-[1.8] prose-p:my-2
      prose-strong:text-white prose-strong:font-semibold
      prose-em:text-purple-300 prose-em:not-italic prose-em:font-medium
      prose-h1:text-white prose-h1:text-base prose-h1:font-bold prose-h1:mt-4 prose-h1:mb-1
      prose-h2:text-white prose-h2:text-sm prose-h2:font-semibold prose-h2:mt-3 prose-h2:mb-1
      prose-h3:text-purple-300 prose-h3:text-sm prose-h3:font-semibold prose-h3:mt-2 prose-h3:mb-1
      prose-ul:my-2 prose-ul:space-y-1
      prose-ol:my-2 prose-ol:space-y-1
      prose-li:text-slate-200 prose-li:leading-relaxed
      prose-ul:marker:text-purple-400
      prose-ol:marker:text-purple-400
      prose-code:text-amber-300 prose-code:bg-white/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
      prose-pre:bg-[#0d0d1a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:text-xs
      prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-500/5 prose-blockquote:text-slate-300 prose-blockquote:rounded-r
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              {children}
            </a>
          ),
          code: ({ inline, className, children, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              return (
                <SyntaxHighlighter
                  language={match[1]}
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, borderRadius: "0.5rem", fontSize: "0.75rem", background: "#0d0d1a" }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
            return (
              <code className="text-amber-300 bg-white/8 px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function CodeCell({ source, outputs, moduleTitle }: { source: string; outputs: CellOutput[]; moduleTitle?: string }) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading]         = useState(false);
  const [showExp, setShowExp]         = useState(false);

  const explain = async () => {
    if (explanation) { setShowExp(true); return; }
    setLoading(true);
    try {
      const res = await aiAPI.explain(source, moduleTitle);
      setExplanation(cleanAIResponse(res.data.explanation));
      setShowExp(true);
    } catch {
      setExplanation("Impossible de générer l'explication.");
      setShowExp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden border border-white/8">
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e2e] border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          </div>
          <span className="text-xs text-slate-500 font-mono">Python</span>
        </div>
        <motion.button
          onClick={explain}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50 transition border border-purple-500/30 hover:border-purple-400/50 bg-purple-500/5 hover:bg-purple-500/10 px-2.5 py-1 rounded-lg"
        >
          {loading
            ? <><Loader2 size={12} className="animate-spin" /> Analyse en cours…</>
            : <><Sparkles size={12} /> Expliquer ce code</>
          }
        </motion.button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: "0.82rem", background: "#1e1e2e" }}
        showLineNumbers
        lineNumberStyle={{ color: "#4a5568", fontSize: "0.75rem" }}
      >
        {source}
      </SyntaxHighlighter>

      {/* ── Carte explication IA ── */}
      <AnimatePresence>
        {showExp && explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative bg-gradient-to-b from-[#1a0f2e] to-[#130d24] border-t border-purple-500/25">

              {/* Lueur subtile en haut */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="px-5 py-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/30">
                      <Lightbulb size={13} className="text-purple-300" />
                    </div>
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-widest">
                      Explication simplifiée
                    </span>
                    <span className="flex items-center gap-1 text-xs text-purple-500/70 font-mono">
                      <Sparkles size={10} /> IA
                    </span>
                  </div>
                  <button
                    onClick={() => setShowExp(false)}
                    className="text-slate-600 hover:text-slate-300 transition rounded-lg hover:bg-white/5 p-1"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Corps markdown */}
                <div className="pl-1">
                  <AIMarkdown text={explanation} />
                </div>
              </div>

              {/* Pied discret */}
              <div className="px-5 pb-3 flex items-center gap-1.5">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-xs text-slate-600 font-mono">généré par IA · à vérifier</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outputs */}
      {outputs.length > 0 && (
        <div className="bg-[#141424] border-t border-white/5">
          {outputs.map((out, i) => (
            <div key={i} className="p-4">
              {out.type === "image" && (
                <img src={`data:image/png;base64,${out.data}`} alt="Graphique" className="max-w-full rounded-lg" />
              )}
              {out.type === "text" && (
                <pre className="text-green-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">{out.data}</pre>
              )}
              {out.type === "html" && (
                <div className="text-slate-300 text-sm overflow-x-auto" dangerouslySetInnerHTML={{ __html: out.data }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NotebookViewer({ cells, moduleTitle }: NotebookViewerProps) {
  return (
    <div className="space-y-6">
      {cells.map((cell, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
        >
          {cell.cell_type === "markdown" && cell.source.trim() && (
            <div className="px-2">
              <MarkdownCell source={cell.source} />
            </div>
          )}
          {cell.cell_type === "code" && cell.source.trim() && (
            <CodeCell source={cell.source} outputs={cell.outputs} moduleTitle={moduleTitle} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
