"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, X } from "lucide-react";
import { aiAPI } from "@/lib/api";

interface CellOutput {
  type: "image" | "text" | "html";
  data: string;
}

interface NotebookCell {
  cell_type: "markdown" | "code" | "raw";
  source: string;
  outputs: CellOutput[];
}

interface NotebookViewerProps {
  cells: NotebookCell[];
  moduleTitle?: string;
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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {source}
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
      setExplanation(res.data.explanation);
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
          className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50 transition border border-purple-500/30 hover:border-purple-400/50 px-2.5 py-1 rounded-lg"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          {loading ? "Analyse..." : "Explique"}
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

      {/* Explication IA */}
      <AnimatePresence>
        {showExp && explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-purple-900/20 border-t border-purple-500/20 px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2 flex-1">
                <Sparkles size={14} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
              </div>
              <button onClick={() => setShowExp(false)} className="text-slate-500 hover:text-white transition shrink-0">
                <X size={14} />
              </button>
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
