"use client";
import { useState, useEffect } from "react";
import { progressAPI } from "@/lib/api";
import type { Progress } from "@/types";

export function useProgress() {
  const [progress, setProgress]     = useState<Progress[]>([]);
  const [completion, setCompletion] = useState<number>(0);

  useEffect(() => {
    progressAPI.getAll()
      .then((r) => setProgress(r.data))
      .catch(() => {});
    progressAPI.getCompletion()
      .then((r) => setCompletion(r.data.percentage))
      .catch(() => {});
  }, []);

  const markCompleted = async (moduleId: string) => {
    await progressAPI.update(moduleId, true);
    setProgress((prev) => {
      const exists = prev.find((p) => p.module_id === moduleId);
      if (exists) return prev.map((p) => p.module_id === moduleId ? { ...p, completed: true } : p);
      return [...prev, { id: "", user_id: "", module_id: moduleId, completed: true }];
    });
    progressAPI.getCompletion().then((r) => setCompletion(r.data.percentage));
  };

  const isCompleted = (moduleId: string) =>
    progress.some((p) => p.module_id === moduleId && p.completed);

  return { progress, completion, markCompleted, isCompleted };
}
