"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { aiAPI } from "@/lib/api";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  message: string;
}

interface AIAssistantProps {
  moduleId: string;
  moduleTitle: string;
}

export default function AIAssistant({ moduleId, moduleTitle }: AIAssistantProps) {
  const [open, setOpen]         = useState(false);
  const [history, setHistory]   = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, loading]);

  const send = async () => {
    const question = input.trim();
    if (!question || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", message: question };
    setHistory((h) => [...h, userMsg]);
    setLoading(true);
    try {
      const res = await aiAPI.chat(moduleId, question, [...history, userMsg]);
      setHistory((h) => [...h, { role: "assistant", message: res.data.answer }]);
    } catch {
      setHistory((h) => [...h, { role: "assistant", message: "Désolé, une erreur est survenue. Réessaie." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 10px #3b82f6", "0 0 25px #3b82f6", "0 0 10px #3b82f6"] }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full p-3 sm:p-4 shadow-xl"
        title="Assistant IA"
      >
        <MessageSquare size={22} />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:max-h-[560px] flex flex-col bg-[#0d1829] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-blue-400" />
                <div>
                  <p className="text-white text-sm font-semibold">Assistant IA</p>
                  <p className="text-slate-400 text-xs">{moduleTitle}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[400px]">
              {history.length === 0 && (
                <div className="text-center py-8">
                  <Bot size={32} className="mx-auto mb-3 text-blue-400/50" />
                  <p className="text-slate-400 text-sm">Pose-moi une question sur ce module !</p>
                  <div className="mt-4 flex flex-col gap-2">
                    {["C'est quoi un DataFrame ?", "Explique-moi groupby", "Donne un exemple de boucle"].map((q) => (
                      <button key={q} onClick={() => { setInput(q); }}
                        className="text-xs text-left bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-2 rounded-xl transition">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {history.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs
                    ${msg.role === "user" ? "bg-blue-600" : "bg-white/10"}`}>
                    {msg.role === "user" ? <User size={14} /> : <Bot size={14} className="text-blue-400" />}
                  </div>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed
                    ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "bg-white/5 text-slate-200 border border-white/8 rounded-tl-sm"}`}>
                    {msg.role === "assistant"
                      ? <div className="prose prose-invert prose-sm max-w-none prose-p:m-0 prose-code:text-orange-300">
                          <ReactMarkdown>{msg.message}</ReactMarkdown>
                        </div>
                      : msg.message
                    }
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Bot size={14} className="text-blue-400" />
                  </div>
                  <div className="bg-white/5 border border-white/8 px-3 py-2 rounded-xl rounded-tl-sm">
                    <Loader2 size={14} className="text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Pose ta question..."
                  rows={1}
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
                <motion.button
                  onClick={send} disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-600 disabled:opacity-40 text-white p-2 rounded-xl shrink-0 transition"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 text-center">Propulsé par Cohere · Enter pour envoyer</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
