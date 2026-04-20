"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Loader2, CheckCircle2, XCircle, RefreshCw, Trophy } from "lucide-react";
import { aiAPI } from "@/lib/api";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizBlockProps {
  moduleId: string;
  onComplete?: () => void;
}

export default function QuizBlock({ moduleId, onComplete }: QuizBlockProps) {
  const [questions, setQuestions]   = useState<QuizQuestion[]>([]);
  const [answers, setAnswers]       = useState<Record<number, string>>({});
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const loadQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    try {
      const res = await aiAPI.quiz(moduleId);
      setQuestions(res.data.questions || []);
    } catch {
      setError("Impossible de générer le quiz. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  return (
    <div className="mt-12 border-t border-white/10 pt-10">
      <div className="flex items-center gap-3 mb-6">
        <Brain size={24} className="text-purple-400" />
        <div>
          <h3 className="text-xl font-bold text-white">Quiz du module</h3>
          <p className="text-slate-400 text-sm">Teste tes connaissances — généré par IA</p>
        </div>
      </div>

      {/* État initial */}
      {questions.length === 0 && !loading && !error && (
        <motion.button
          onClick={loadQuiz}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl"
          style={{ boxShadow: "0 0 30px rgba(147,51,234,0.3)" }}
        >
          <Brain size={20} />
          Générer mon quiz
        </motion.button>
      )}

      {/* Chargement */}
      {loading && (
        <div className="flex items-center gap-3 text-slate-400 py-6">
          <Loader2 size={20} className="animate-spin text-purple-400" />
          <span>Génération du quiz en cours...</span>
        </div>
      )}

      {/* Erreur */}
      {error && (
        <div className="flex items-center gap-3 text-red-300 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl">
          <XCircle size={18} />
          {error}
          <button onClick={loadQuiz} className="ml-auto text-sm underline hover:text-red-200">Réessayer</button>
        </div>
      )}

      {/* Questions */}
      <AnimatePresence>
        {questions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {questions.map((q, qi) => {
              const userAnswer = answers[qi];
              const isCorrect  = userAnswer === q.answer;
              return (
                <motion.div
                  key={qi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qi * 0.08 }}
                  className="bg-white/3 border border-white/10 rounded-2xl p-6"
                >
                  <p className="text-white font-medium mb-4">
                    <span className="text-purple-400 font-bold mr-2">{qi + 1}.</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt) => {
                      const letter = opt.charAt(0);
                      let cls = "border border-white/10 bg-white/5 text-slate-300 hover:border-purple-400 hover:text-white";
                      if (submitted) {
                        if (letter === q.answer)        cls = "border border-green-500 bg-green-500/15 text-green-300";
                        else if (letter === userAnswer) cls = "border border-red-500 bg-red-500/15 text-red-300";
                        else                            cls = "border border-white/5 bg-white/3 text-slate-500";
                      } else if (userAnswer === letter) {
                        cls = "border border-purple-500 bg-purple-500/15 text-white";
                      }
                      return (
                        <button
                          key={opt}
                          onClick={() => !submitted && setAnswers({ ...answers, [qi]: letter })}
                          disabled={submitted}
                          className={`text-left px-4 py-3 rounded-xl text-sm transition ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className={`flex items-center gap-2 mt-3 text-sm font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      {isCorrect ? "Bonne réponse !" : `La bonne réponse était ${q.answer}`}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Actions */}
            {!submitted ? (
              <motion.button
                onClick={() => { setSubmitted(true); if (score === questions.length) onComplete?.(); }}
                disabled={!allAnswered}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-2xl disabled:opacity-40 transition"
              >
                {allAnswered ? "Valider mes réponses" : `Réponds à toutes les questions (${Object.keys(answers).length}/${questions.length})`}
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                {score === questions.length ? (
                  <Trophy size={40} className="mx-auto mb-3 text-yellow-400" />
                ) : (
                  <Brain size={40} className="mx-auto mb-3 text-purple-400" />
                )}
                <p className="text-2xl font-bold text-white mb-1">{score} / {questions.length}</p>
                <p className="text-slate-400 text-sm mb-4">
                  {score === questions.length
                    ? "Parfait ! Tu maîtrises ce module."
                    : score >= questions.length / 2
                    ? "Bon travail ! Relis les points que tu as manqués."
                    : "Continue à pratiquer — relis le cours avant de réessayer."}
                </p>
                <button onClick={loadQuiz}
                  className="flex items-center gap-2 mx-auto text-sm text-purple-400 hover:text-purple-300 transition">
                  <RefreshCw size={14} /> Nouveau quiz
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
