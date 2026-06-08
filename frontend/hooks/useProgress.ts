"use client";
import { useState, useEffect } from "react";
import type { Progress } from "@/types";

const STORAGE_KEY = "koryxa_formation_progress_v1";

function readProgress(): Progress[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Progress[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProgress(progress: Progress[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    const saved = readProgress();
    setProgress(saved);
  }, []);

  const markCompleted = async (moduleId: string) => {
    setProgress((prev) => {
      const exists = prev.find((p) => p.module_id === moduleId);
      const next = exists
        ? prev.map((p) => p.module_id === moduleId ? { ...p, completed: true } : p)
        : [...prev, { id: moduleId, user_id: "local-access", module_id: moduleId, completed: true }];

      writeProgress(next);
      return next;
    });
  };

  const isCompleted = (moduleId: string) =>
    progress.some((p) => p.module_id === moduleId && p.completed);

  return { progress, completion, setCompletion, markCompleted, isCompleted };
}
