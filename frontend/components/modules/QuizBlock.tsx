"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Brain, CheckCircle2, Loader2, RefreshCw, Trophy, XCircle } from "lucide-react";
import { getApiErrorMessage, validationAPI } from "@/lib/api";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  difficulty?: "debutant" | "intermediaire" | "avance";
  skill?: string;
}

interface QuizResult {
  score: number;
  max_score: number;
  pass_score: number;
  passed: boolean;
  module_validated: boolean;
  correct_count: number;
  total_questions: number;
  review_sections: string[];
  feedback: string;
  explanations?: string[];
}

interface QuizBlockProps {
  moduleId: string;
  passScore?: number;
  isValidated?: boolean;
  onValidated?: () => void;
}

const difficultyLabel = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

function getOptionLetter(option: string) {
  const first = option.trim().charAt(0).toUpperCase();
  return ["A", "B", "C", "D"].includes(first) ? first : "";
}

export default function QuizBlock({ moduleId, passScore = 12, isValidated = false, onValidated }: QuizBlockProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadQuiz = async () => {
    setLoading(true);
    setError("");
    setQuestions([]);
    setAnswers({});
    setResult(null);

    try {
      const response = await validationAPI.getQuiz(moduleId);
      setQuestions(response.data.questions || []);
    } catch (err) {
      setError(`Impossible de charger le QCM. ${getApiErrorMessage(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await validationAPI.submitQuiz(moduleId, answers);
      setResult(response.data);
      if (response.data?.module_validated) {
        onValidated?.();
      }
    } catch (err) {
      setError(`Impossible de corriger le QCM. ${getApiErrorMessage(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  return (
    <section className="mt-12 border-t border-white/10 pt-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-200 ring-1 ring-purple-300/20">
            <Brain size={22} />
          </span>
          <div>
            <h3 className="text-xl font-black text-white">QCM de validation du module</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Score minimum requis : <span className="font-black text-white">{passScore}/20</span>. Si tu échoues, la plateforme te montre les parties à revoir.
            </p>
          </div>
        </div>
        {isValidated && (
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200">
            <CheckCircle2 size={14} /> Module validé
          </span>
        )}
      </div>

      {questions.length === 0 && !loading && !error && (
        <motion.button
          onClick={loadQuiz}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-black text-white shadow-lg shadow-purple-900/25"
        >
          <Brain size={20} />
          Commencer le QCM
        </motion.button>
      )}

      {loading && (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-slate-300">
          <Loader2 size={20} className="animate-spin text-purple-300" />
          <span className="font-semibold">Chargement du QCM préparé…</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-red-100">
          <div className="flex items-start gap-3">
            <XCircle size={18} className="mt-1 shrink-0" />
            <p className="text-sm leading-6">{error}</p>
          </div>
          <button onClick={loadQuiz} className="mt-3 text-sm font-bold underline hover:text-red-50">
            Réessayer
          </button>
        </div>
      )}

      <AnimatePresence>
        {questions.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const disabled = Boolean(result) || submitting;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl sm:p-6"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                    <span className="rounded-full bg-purple-500/15 px-3 py-1 text-purple-200 ring-1 ring-purple-300/20">
                      Question {index + 1}/{questions.length}
                    </span>
                    {question.difficulty && <span>{difficultyLabel[question.difficulty]}</span>}
                    {question.skill && <span>• {question.skill}</span>}
                  </div>

                  <p className="mb-5 text-base font-bold leading-7 text-white">{question.question}</p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const letter = getOptionLetter(option);
                      const selected = userAnswer === letter;
                      const cls = selected
                        ? "border-purple-300/50 bg-purple-500/20 text-white"
                        : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-purple-300/35 hover:bg-white/[0.075] hover:text-white";

                      return (
                        <button
                          key={option}
                          onClick={() => !disabled && setAnswers({ ...answers, [question.id]: letter })}
                          disabled={disabled}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold leading-6 transition ${cls}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}

            {!result ? (
              <motion.button
                onClick={submitQuiz}
                disabled={!allAnswered || submitting}
                whileHover={{ scale: allAnswered ? 1.01 : 1 }}
                whileTap={{ scale: allAnswered ? 0.98 : 1 }}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 font-black text-white shadow-lg shadow-purple-900/20 transition disabled:cursor-not-allowed disabled:opacity-45"
              >
                {submitting ? "Correction en cours…" : allAnswered ? "Valider mon QCM" : `Réponds à toutes les questions (${Object.keys(answers).length}/${questions.length})`}
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl border p-6 text-center shadow-2xl shadow-slate-950/10 ${result.passed ? "border-emerald-300/25 bg-emerald-500/10" : "border-amber-300/25 bg-amber-500/10"}`}
              >
                {result.passed ? (
                  <Trophy size={42} className="mx-auto mb-3 text-yellow-300" />
                ) : (
                  <AlertTriangle size={42} className="mx-auto mb-3 text-amber-200" />
                )}
                <p className="text-3xl font-black text-white">{result.score} / {result.max_score}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{result.feedback}</p>

                {!result.passed && result.review_sections.length > 0 && (
                  <div className="mx-auto mt-5 max-w-2xl rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-left">
                    <p className="mb-3 text-sm font-black text-white">Parties à revoir avant de refaire le QCM :</p>
                    <div className="flex flex-wrap gap-2">
                      {result.review_sections.map((section) => (
                        <span key={section} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-100 ring-1 ring-white/10">
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={loadQuiz} className="mx-auto mt-5 inline-flex items-center gap-2 text-sm font-black text-purple-200 transition hover:text-white">
                  <RefreshCw size={14} /> {result.passed ? "Revoir le QCM" : "Refaire le QCM"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
