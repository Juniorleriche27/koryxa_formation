"use client";
import { useEffect, useState } from "react";
import { modulesAPI } from "@/lib/api";
import type { Module } from "@/types";
import Link from "next/link";

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    modulesAPI.getAll().then((r) => setModules(r.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Tous les modules</h1>
      <div className="space-y-4 max-w-3xl">
        {modules.map((module) => (
          <Link key={module.id} href={`/modules/${module.id}`}
            className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              {module.order_index}
            </div>
            <div>
              <h2 className="font-bold text-slate-800">{module.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{module.description}</p>
            </div>
            <span className="ml-auto text-sm text-slate-400 shrink-0">{module.duration}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
