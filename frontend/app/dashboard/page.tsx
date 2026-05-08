"use client";
import { useEffect, useState } from "react";
import { modulesAPI } from "@/lib/api";
import { useProgress } from "@/hooks/useProgress";
import type { Module } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProgressBar from "@/components/dashboard/ProgressBar";
import Stats from "@/components/dashboard/Stats";
import ModuleCard from "@/components/modules/ModuleCard";

export default function DashboardPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const { completion, isCompleted } = useProgress();

  useEffect(() => {
    modulesAPI.getAll()
      .then((r) => setModules(r.data))
      .catch(() => {/* 401 handled globally, other errors leave modules empty */});
  }, []);

  const completedCount = modules.filter((m) => isCompleted(m.id)).length;

  return (
    <div className="min-h-screen bg-[#050c1a] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Tableau de bord</h1>
          <p className="text-slate-400">Bienvenue — reprends là où tu t&apos;es arrêté.</p>
        </div>
        <Stats totalModules={modules.length} completedModules={completedCount} percentage={completion} />
        <ProgressBar percentage={completion} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} completed={isCompleted(module.id)} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
