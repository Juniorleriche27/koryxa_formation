"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Code2,
  Cpu,
  Database,
  FileCode,
  Gauge,
  GitBranch,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Network,
  PlayCircle,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Table2,
  Terminal,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const words = [
  "Pipelines ETL & ELT",
  "Transformations dbt",
  "DAGs Apache Airflow",
  "Data Warehouses en Étoile",
  "Environnements Docker",
];

const skills = [
  "Python Ingestion API",
  "PostgreSQL DWH",
  "dbt Core (Models & Tests)",
  "Apache Airflow DAGs",
  "Docker & Compose",
  "Watermark & Incrémental",
  "Contrats de Données JSON",
  "Schéma en Étoile (Fact/Dim)",
  "Monitoring & Observabilité",
];

const modulesList = [
  {
    num: "01",
    title: "Fondations du Data Engineering & Architectures",
    desc: "Rôle du Data Engineer, architectures modernes (Modern Data Stack), Data Lake vs Warehouse et cycle de vie de la donnée.",
    duration: "4h00",
    icon: Network,
  },
  {
    num: "02",
    title: "Ingestion Python : APIs, JSON & Pagination",
    desc: "Consommation d'APIs REST avec retry exponentiel, gestion des formats JSON imbriqués, conversion Parquet et stockage brut.",
    duration: "4h30",
    icon: Code2,
  },
  {
    num: "03",
    title: "PostgreSQL & Modélisation Relationnelle",
    desc: "Schémas staging/production, typage strict, contraintes CHECK, clés primaires/étrangères et commandes \\copy volumétriques.",
    duration: "4h30",
    icon: Database,
  },
  {
    num: "04",
    title: "Contrats de Données & Schémas JSON",
    desc: "Spécification de contrats d'interface, validation de schéma Pydantic, détection des cassures (schema drift) et alertes.",
    duration: "4h00",
    icon: ShieldCheck,
  },
  {
    num: "05",
    title: "Pipelines d'Ingestion Incrémentale",
    desc: "Techniques de watermark, colonnes modified_at, rechargement idempotent, déduplication et gestion des purges historiques.",
    duration: "4h30",
    icon: Workflow,
  },
  {
    num: "06",
    title: "Qualité des Données & Tests SQL Automatisés",
    desc: "Tests d'unicité, non-nullité, intégrité référentielle, seuils d'anomalies volumétriques et blocage automatique du pipeline.",
    duration: "4h00",
    icon: Gauge,
  },
  {
    num: "07",
    title: "Entrepôts de Données (DWH) & Schéma en Étoile",
    desc: "Modélisation dimensionnelle de Kimball : tables de faits, dimensions lentes (SCD Type 1 & 2) et clés de substitution.",
    duration: "5h00",
    icon: Layers3,
  },
  {
    num: "08",
    title: "Transformations Modulaires avec dbt Core",
    desc: "Structure d'un projet dbt, modèles staging et marts, tests dbt (schema tests & data tests), macros Jinja et documentation générée.",
    duration: "5h00",
    icon: GitBranch,
  },
  {
    num: "09",
    title: "Orchestration Avancée avec Apache Airflow",
    desc: "Conception de DAGs, opérateurs Bash/Python/dbt, gestion des dépendances en cascade, retries automatiques et backfills.",
    duration: "5h30",
    icon: Cpu,
  },
  {
    num: "10",
    title: "Conteneurisation Complète avec Docker & Compose",
    desc: "Images Docker personnalisées, orchestration multi-conteneurs (Postgres, Airflow, MinIO, dbt) et volumes persistants.",
    duration: "4h30",
    icon: Server,
  },
  {
    num: "11",
    title: "Observabilité, Monitoring, Alerting & Pannes",
    desc: "Métriques de débit de pipeline, alerting Slack/Email sur échec de tâche, SLA de rafraîchissement et runbooks de reprise.",
    duration: "4h30",
    icon: Zap,
  },
  {
    num: "12",
    title: "Industrialisation CI/CD, Déploiement & Soutenance",
    desc: "Pipelines GitHub Actions, tests automatisés en pré-production, sécurité des identifiants et livraison de la plateforme complète.",
    duration: "4h30",
    icon: Share2,
  },
];

const outcomes = [
  "Concevoir et déployer une architecture moderne de données (Modern Data Stack) de bout en bout",
  "Ingérer des flux hétérogènes (APIs, CSV, JSON, Parquet) avec logique incrémentale et idempotence",
  "Modéliser un Data Warehouse relationnel en schéma en étoile certifié pour le reporting",
  "Structurer, tester et documenter des dizaines de modèles SQL avec dbt Core",
  "Orchestrer des pipelines quotidiens avec Apache Airflow et gérer les pannes en autonomie",
  "Conteneuriser l'ensemble de l'infrastructure avec Docker Compose et sécuriser les secrets",
];

const faqs = [
  [
    "Quels sont les prérequis pour suivre ce parcours Data Engineering ?",
    "Une bonne maîtrise du langage SQL (jointures, agrégations) et des bases solides en Python sont nécessaires. Les cours SQL Data Analyst et Python Data Analyst sont d'excellentes préparations.",
  ],
  [
    "Ai-je besoin d'un compte cloud payant (AWS/GCP/Azure) pour suivre les TP ?",
    "Non. Toute la stack est conçue pour fonctionner localement sur votre poste grâce à Docker Compose (PostgreSQL, Apache Airflow, dbt). Vous apprendrez les mêmes standards que dans le cloud sans aucun frais d'infrastructure.",
  ],
  [
    "Quels outils professionnels sont manipulés concrètement ?",
    "Python, SQL, PostgreSQL 16, dbt Core, Apache Airflow, Docker, Docker Compose, Git et GitHub Actions pour la CI/CD.",
  ],
  [
    "Comment est validée la formation et le certificat KORYXA ?",
    "Vous réalisez un projet fil rouge complet noté sur 60 points : pipeline d'ingestion API, projet dbt avec tests, DAG Airflow orchestré et stack Docker Compose fonctionnelle.",
  ],
];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    if (!deleting && displayed.length < word.length) {
      const timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(timer);
    }
    if (!deleting && displayed.length === word.length) {
      const timer = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(timer);
    }
    if (deleting && displayed.length > 0) {
      const timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(timer);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
    }
  }, [deleting, displayed, index]);

  return (
    <span className="text-[#00a86b]">
      {displayed}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>
        |
      </motion.span>
    </span>
  );
}

function SkillTicker() {
  return (
    <div className="overflow-hidden border-y border-[#dfe5d8] bg-white py-4">
      <motion.div
        className="flex w-max gap-4 whitespace-nowrap"
        animate={{ x: [0, -560] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a86b]" /> {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function DeProductStage() {
  const [activeTab, setActiveTab] = useState<"dag" | "dbt" | "ingest">("dag");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="relative mx-auto mt-12 w-full max-w-5xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 rounded-full bg-red-400" />
            <span className="flex h-3 w-3 rounded-full bg-amber-400" />
            <span className="flex h-3 w-3 rounded-full bg-[#00a86b]" />
            <span className="ml-2 font-mono text-xs font-bold text-slate-500">
              KORYXA Data Platform • Airflow &amp; dbt Core
            </span>
          </div>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("dag")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "dag" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              DAG Apache Airflow
            </button>
            <button
              onClick={() => setActiveTab("dbt")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "dbt" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Modèles dbt &amp; Tests
            </button>
            <button
              onClick={() => setActiveTab("ingest")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "ingest" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Ingestion API Python
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Projet Capstone · 64 Heures
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Plateforme Analytique Complète
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Pipeline de données automatisé &amp; supervisé
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              De l&apos;extraction d&apos;API avec reprises à la modélisation en étoile testée par dbt et orchestrée par Airflow.
            </p>

            {activeTab === "dag" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>dags/koryxa_daily_sales_pipeline.py</span>
                  <span className="text-[#86efac]">Schedule : @daily (02:00 UTC)</span>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`with DAG(
    dag_id="koryxa_sales_platform",
    schedule_interval="0 2 * * *",
    start_date=datetime(2026, 1, 1),
    catchup=False,
    max_active_runs=1
) as dag:

    extract_sales = PythonOperator(
        task_id="extract_sales_api",
        python_callable=fetch_incremental_sales
    )

    run_dbt_models = BashOperator(
        task_id="dbt_run_marts",
        bash_command="dbt run --models marts"
    )

    test_contracts = BashOperator(
        task_id="dbt_test_quality",
        bash_command="dbt test"
    )

    extract_sales >> run_dbt_models >> test_contracts`}</code>
                </pre>
                <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                  ✓ Pipeline orchestré · Dépendances linéaires avec retries (3 tentatives, délai 5m)
                </div>
              </div>
            )}

            {activeTab === "dbt" && (
              <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                  <span>models/marts/fct_ventes_mensuelles.sql</span>
                  <span className="text-emerald-400">dbt test : 14/14 PASS</span>
                </div>
                <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`{{ config(materialized='table') }}

with sales as (
    select * from {{ ref('stg_sales') }}
),
dim_clients as (
    select * from {{ ref('dim_customers') }}
)
select
    s.id_vente,
    s.date_vente,
    c.code_client,
    c.region,
    s.quantite * s.prix_unitaire as ca_brut
from sales s
inner join dim_clients c on s.code_client = c.code_client`}</code>
                </pre>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                    <p className="font-bold text-emerald-400">Test dbt : unique</p>
                    <p className="text-slate-400">Zéro doublon sur id_vente</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                    <p className="font-bold text-emerald-400">Test dbt : relationships</p>
                    <p className="text-slate-400">100% clés étrangères reliées</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingest" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Ingestion Python Idempotente avec Watermark
                </p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">Dernier Watermark</p>
                    <p className="mt-1 font-bold text-slate-700">2026-04-15 23:59</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">Débit Ingestion</p>
                    <p className="mt-1 font-bold text-slate-700">1 450 lignes/s</p>
                  </div>
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3 shadow-xs">
                    <p className="text-[11px] text-emerald-700 uppercase">Qualité Contrat</p>
                    <p className="mt-1 font-extrabold text-emerald-900">100 % Valide</p>
                    <p className="text-[10px] text-emerald-600 font-bold">0 rejet</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Packs d&apos;Exercices &amp; Fichiers Sources
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["customers.csv & sales.csv", "Tables sources de ventes réelles"],
                  ["api_sales_pages.json", "Flux API paginé pour les tests d'ingestion"],
                  ["12 Modules Starter", "Code de départ avec tests unitaires"],
                  ["12 Modules Solutions", "Implémentations de référence complètes"],
                  ["docker-compose.yml", "Stack Airflow + Postgres + dbt prête"],
                ].map(([file, desc]) => (
                  <div key={file} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs">
                    <Terminal size={16} className="shrink-0 text-[#00a86b]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-xs font-bold text-slate-900">{file}</p>
                      <p className="text-[11px] text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-center">
              <p className="text-xs font-bold text-emerald-950">Stack 100% Reproductible</p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Lancez l&apos;ensemble de la plateforme en une seule commande `docker compose up`.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DataEngineeringLanding() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm"
          >
            <Sparkles size={14} className="text-[#00a86b]" />
            Formation Pratique Certifiante · 64 Heures de Pratique
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]"
          >
            Maîtrisez le Data Engineering pour construire des <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center"
          >
            Devenez l&apos;architecte data de votre organisation : développez des pipelines d&apos;ingestion Python robustes, concevez des entrepôts PostgreSQL en schéma en étoile, transformez avec dbt Core et orchestrez avec Apache Airflow et Docker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug="data-engineering-python-sql"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
            >
              Rejoindre la formation <ArrowRight size={16} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
            >
              <PlayCircle size={16} /> Découvrir les 12 modules
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat &amp; à vie
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={15} className="text-amber-500 fill-amber-500" /> Tarif unique : 49 000 FCFA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#00a86b]" /> Certificat officiel vérifiable
            </span>
          </div>

          <DeProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Pourquoi cette compétence */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Le Métier le Plus Recherché de la Data
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Sans Data Engineering solide, aucune analyse n&apos;est possible
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Les entreprises ont accumulé des données dispersées, cassées et non fiabilisées. Le rôle du Data Engineer est de créer des autoroutes de données automatisées, vérifiées et disponibles en temps voulu.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Code2,
                title: "Ingestion Python Résiliente",
                desc: "Traitez les pannes d'APIs, les limites de débit et les reprises sans perdre une seule transaction.",
              },
              {
                icon: GitBranch,
                title: "Transformations dbt Modulaires",
                desc: "Finis les scripts SQL géants et illisibles : découpez vos transformations en modèles testés et versionnés.",
              },
              {
                icon: Cpu,
                title: "Orchestration Airflow",
                desc: "Automatisez l'exécution quotidienne avec des graphes de dépendances (DAGs) et des alertes automatiques.",
              },
              {
                icon: Server,
                title: "Environnements Docker",
                desc: "Conteneurisez toute la plateforme pour une portabilité totale entre votre poste local et les serveurs de production.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Détaillé */}
      <section id="programme" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <Layers3 size={14} /> Programme Complet · 64 Heures
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 modules complets couvrant la stack Data Engineering moderne
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Une pédagogie axée sur la construction : chaque module fournit du code starter et une solution complète commentée.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulesList.map((m) => {
              const Icon = m.icon;
              return (
                <article
                  key={m.num}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:border-[#00a86b]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                        Module {m.num}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <Clock3 size={13} /> {m.duration}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                        <Icon size={18} />
                      </span>
                      <h3 className="text-base font-bold text-slate-950 leading-snug">{m.title}</h3>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projet Fil Rouge */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Sparkles size={14} /> Cas Pratique Entreprise
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Le Projet Fil Rouge : Plateforme Analytique Complète
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous concevez et déployez la plateforme de données centralisée d&apos;une entreprise de commerce panafricaine connectant ventes en ligne et points de vente physiques.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 1</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Ingestion &amp; Stockage Brut</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Connectez l&apos;API de facturation et les exports clients, validez les schémas avec Pydantic et stockez les données en zone raw.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 2</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Entrepôt &amp; dbt Core</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Bâtissez le schéma en étoile PostgreSQL, écrivez les modèles staging et marts avec dbt, appliquez les tests d&apos;intégrité référentielle.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 3</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Airflow &amp; Dockerisation</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Assemblez le DAG Airflow quotidien avec gestion des retries, configurez la stack sous Docker Compose et rédigez le runbook d&apos;exploitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Opérationnelles */}
      <section className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <Gauge size={14} /> Ce que vous saurez faire
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Des compétences d&apos;ingénieur data directement déployables
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Une expertise pratique sur les outils les plus demandés du marché mondial.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {outcomes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              FAQ
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Questions Fréquentes
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map(([q, a]) => (
              <div key={q} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-950">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA Final */}
      <section id="prix" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
            <Sparkles size={14} /> Tarif &amp; Inscription
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Rejoignez le parcours Data Engineering
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Maîtrisez la stack moderne de données et devenez un profil incontournable.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet &amp; illimité</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">69 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Aucun abonnement caché</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules progressifs de l'ingestion à l'orchestration",
                "Stack complète : Python, SQL, PostgreSQL, dbt Core, Airflow, Docker",
                "Fichiers réels, API paginée, 12 modules starter et solutions",
                "Projet d'architecture de données noté sur 60 points",
                "Certificat d'achèvement officiel KORYXA vérifiable",
                "Accès à vie à la communauté et aux ressources techniques",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug="data-engineering-python-sql"
                className="w-full inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
              >
                Accéder immédiatement à la formation <ArrowRight size={16} />
              </PurchaseCourseLink>
            </div>
            <p className="mt-4 text-xs text-slate-500">Paiement sécurisé instantané via Mobile Money ou Carte Bancaire</p>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
