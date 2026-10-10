"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Download,
  FileSpreadsheet,
  Gauge,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  PlayCircle,
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
  "Requêtes Analytiques",
  "Jointures & Schémas",
  "Pipelines CTE (WITH)",
  "Fonctions de Fenêtre",
  "Vues Connectées Power BI",
];

const skills = [
  "PostgreSQL 16",
  "SELECT / WHERE / ORDER BY",
  "JOIN Multi-Tables",
  "GROUP BY & HAVING",
  "Expressions CASE & COALESCE",
  "Sous-Requêtes & EXISTS",
  "CTE (WITH) Complexes",
  "Window Functions (LAG/LEAD)",
  "Vues Matérialisées",
  "Transactions ACID",
  "EXPLAIN & Indexation",
  "Connexion Power BI",
];

const modulesList = [
  {
    num: "01",
    title: "Découvrir SQL, PostgreSQL & l’Écosystème Relationnel",
    desc: "Architecture client-serveur, tables, lignes, clés primaires/étrangères, pgAdmin, psql et première requête SELECT.",
    duration: "1h30",
    icon: Database,
  },
  {
    num: "02",
    title: "Sélectionner, Filtrer & Trier avec Rigueur",
    desc: "SELECT, alias, DISTINCT, WHERE, opérateurs logiques, BETWEEN, IN, LIKE, gestion des valeurs NULL et ORDER BY.",
    duration: "2h00",
    icon: Table2,
  },
  {
    num: "03",
    title: "Calculer & Transformer les Données Métier",
    desc: "Expressions arithmétiques, logique conditionnelle CASE, COALESCE, CAST, fonctions texte, dates et arrondis financiers.",
    duration: "2h00",
    icon: Code2,
  },
  {
    num: "04",
    title: "Agréger les Données & KPI de Gestion",
    desc: "COUNT, SUM, AVG, MIN, MAX, regroupements GROUP BY, filtres post-agrégation HAVING et agrégations conditionnelles.",
    duration: "2h00",
    icon: TrendingUp,
  },
  {
    num: "05",
    title: "Relier les Tables avec les Jointures",
    desc: "INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, contrôle d'intégrité référentielle, cardinalité et détection des doublons.",
    duration: "2h30",
    icon: Layers3,
  },
  {
    num: "06",
    title: "Sous-Requêtes Scalaires & Corrélées",
    desc: "Sous-requêtes dans le WHERE et le FROM, opérateurs IN, NOT IN, EXISTS, NOT EXISTS et comparaison aux moyennes globales.",
    duration: "2h00",
    icon: Workflow,
  },
  {
    num: "07",
    title: "Pipelines Analytiques avec les CTE (WITH)",
    desc: "Common Table Expressions, CTE en cascade, décomposition de requêtes denses en étapes lisibles et reproductibles.",
    duration: "2h00",
    icon: Zap,
  },
  {
    num: "08",
    title: "Fonctions de Fenêtre (Window Functions)",
    desc: "OVER, PARTITION BY, ORDER BY, calcul de rangs (ROW_NUMBER, DENSE_RANK), cumuls mobiles, LAG et LEAD d'évolution temporelle.",
    duration: "2h30",
    icon: LineChart,
  },
  {
    num: "09",
    title: "Vues Analytiques & Vues Matérialisées",
    desc: "CREATE VIEW, CREATE MATERIALIZED VIEW, stratégies de rafraîchissement (REFRESH), index sur vues et exposition sécurisée.",
    duration: "2h00",
    icon: BarChart3,
  },
  {
    num: "10",
    title: "Modifier les Données en Sécurité & Transactions",
    desc: "INSERT, UPDATE, DELETE avec clause RETURNING, transactions ACID, BEGIN, COMMIT, ROLLBACK et préservation des données.",
    duration: "2h00",
    icon: ShieldCheck,
  },
  {
    num: "11",
    title: "Optimisation de Requêtes & Indexation",
    desc: "Lecture des plans d'exécution avec EXPLAIN ANALYZE, création d'index B-Tree composites, scan séquentiel vs scan par index.",
    duration: "2h30",
    icon: Gauge,
  },
  {
    num: "12",
    title: "Connecter PostgreSQL à Power BI & Projet Final",
    desc: "Préparation des vues analytiques, connexion ODBC/PostgreSQL dans Power BI, actualisation automatique et soutenance finale.",
    duration: "3h00",
    icon: Share2,
  },
];

const outcomes = [
  "Modéliser et interroger une base relationnelle PostgreSQL sans ambiguïté",
  "Écrire des requêtes complexes avec jointures multiples, CTE et Window Functions",
  "Calculer des indicateurs métier fiables : CA, marge, paniers moyens et cumuls mensuels",
  "Diagnostiquer et optimiser des requêtes lentes grâce à EXPLAIN ANALYZE et aux index",
  "Construire des vues analytiques et matérialisées prêtes pour le reporting de direction",
  "Connecter une base de production à Power BI pour automatiser les tableaux de bord",
];

const faqs = [
  [
    "Quel système et quels outils sont nécessaires pour suivre ce cours ?",
    "PostgreSQL et pgAdmin (tous deux gratuits et open-source, compatibles Windows, Mac et Linux). Nous fournissons les scripts SQL prêts à exécuter en un clic.",
  ],
  [
    "Faut-il savoir programmer ou avoir des bases en Python ?",
    "Non, aucun prérequis en code. SQL est un langage déclaratif très intuitif qui s'apprend pas-à-pas à travers la manipulation directe de tables.",
  ],
  [
    "Ce cours est-il utile si je travaille déjà sur Excel ou Power BI ?",
    "C'est le complément le plus recherché en entreprise ! Savoir extraire et préparer la donnée directement à la source en SQL vous rend autonome et démultiplie l'efficacité de vos dashboards Power BI.",
  ],
  [
    "Comment est validée la formation et le certificat KORYXA ?",
    "La validation repose sur des quiz de compréhension à chaque module et la réalisation d'un projet fil rouge noté sur 60 points avec certificat officiel vérifiable.",
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

function SqlProductStage() {
  const [activeTab, setActiveTab] = useState<"query" | "schema" | "results">("query");

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
              KORYXA SQL Query Engine • PostgreSQL 16
            </span>
          </div>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("query")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "query" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Requête CTE &amp; Window
            </button>
            <button
              onClick={() => setActiveTab("schema")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "schema" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Schéma DDL
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "results" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Résultat d&apos;Analyse
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Module 08 · Window Functions
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Temps d&apos;exécution : 12 ms
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Analyse de performance commerciale par région
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Extraction multi-tables avec calculs de cumuls chronologiques et comparaisons au mois précédent.
            </p>

            {activeTab === "query" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>pipeline_analytique.sql</span>
                  <span className="text-[#86efac]">PostgreSQL Query : OK</span>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`WITH mensuel AS (
    SELECT
        date_trunc('month', v.date_vente)::date AS mois,
        r.region,
        SUM(v.quantite * p.prix_unitaire) AS ca_realise,
        SUM(v.quantite * (p.prix_unitaire - p.cout_unitaire)) AS marge
    FROM formation_sql.ventes v
    JOIN formation_sql.produits p USING (code_produit)
    JOIN formation_sql.clients c USING (code_client)
    JOIN formation_sql.regions r USING (code_region)
    GROUP BY 1, 2
)
SELECT
    mois, region, ca_realise, marge,
    SUM(ca_realise) OVER (PARTITION BY region ORDER BY mois) AS cumul_ca,
    LAG(ca_realise) OVER (PARTITION BY region ORDER BY mois) AS ca_mois_precedent
FROM mensuel
ORDER BY region, mois;`}</code>
                </pre>
                <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                  ✓ Requête optimisée · Utilisation d&apos;index sur code_produit et code_client
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                  <span>01_schema_postgresql.sql</span>
                  <span className="text-emerald-400">Contraintes d&apos;Intégrité</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <p className="font-bold text-emerald-400">TABLE clients</p>
                    <p className="mt-1 text-[11px] text-slate-400">code_client (PK), client, segment, code_region (FK)</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <p className="font-bold text-emerald-400">TABLE produits</p>
                    <p className="mt-1 text-[11px] text-slate-400">code_produit (PK), produit, categorie, prix_unitaire</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <p className="font-bold text-emerald-400">TABLE regions</p>
                    <p className="mt-1 text-[11px] text-slate-400">code_region (PK), region, responsable</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <p className="font-bold text-emerald-400">TABLE ventes</p>
                    <p className="mt-1 text-[11px] text-slate-400">id_vente (PK), date_vente, code_produit, code_client, quantite</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Extrait du Jeu de Résultats Analytiques
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <tr>
                        <th className="p-2.5">Mois</th>
                        <th className="p-2.5">Région</th>
                        <th className="p-2.5">CA Réalisé</th>
                        <th className="p-2.5">Marge</th>
                        <th className="p-2.5">Cumul CA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      <tr>
                        <td className="p-2.5 font-bold">2026-01</td>
                        <td className="p-2.5">Dakar</td>
                        <td className="p-2.5">8 450 000 F</td>
                        <td className="p-2.5 text-emerald-700">2 890 000 F</td>
                        <td className="p-2.5 font-bold">8 450 000 F</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">2026-02</td>
                        <td className="p-2.5">Dakar</td>
                        <td className="p-2.5">9 120 000 F</td>
                        <td className="p-2.5 text-emerald-700">3 140 000 F</td>
                        <td className="p-2.5 font-bold">17 570 000 F</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">2026-01</td>
                        <td className="p-2.5">Thiès</td>
                        <td className="p-2.5">4 210 000 F</td>
                        <td className="p-2.5 text-emerald-700">1 420 000 F</td>
                        <td className="p-2.5 font-bold">4 210 000 F</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pack Ressources &amp; Données Réelles
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["01_schema_postgresql.sql", "DDL complet avec contraintes & clés"],
                  ["02_chargement_donnees.sql", "Commandes \\copy pour ingestion rapide"],
                  ["03_requetes_depart.sql", "Vues enrichies & exploration initiale"],
                  ["04_solutions_reference.sql", "Corrigés détaillés pour chaque module"],
                  ["clients.csv & ventes.csv", "Données d'entreprises ouest-africaines"],
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
              <p className="text-xs font-bold text-emerald-950">Intégration directe Power BI</p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Exposez vos requêtes sous forme de vues consommables en temps réel par les outils décisionnels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SqlDataAnalystLanding() {
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
            Formation Pratique Certifiante · SQL &amp; PostgreSQL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]"
          >
            Maîtrisez SQL &amp; PostgreSQL pour construire des <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center"
          >
            Acquérez le langage fondamental de l&apos;analyse de données : apprenez à interroger des bases de production, structurer des jointures sans erreur, analyser des tendances avec les fonctions de fenêtre et connecter vos requêtes à Power BI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug="sql-data-analyst"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
            >
              Rejoindre la formation <ArrowRight size={16} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
            >
              <PlayCircle size={16} /> Voir les 12 modules
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat &amp; à vie
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star size={15} className="text-amber-500 fill-amber-500" /> Tarif unique : 39 000 FCFA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#00a86b]" /> Certificat officiel vérifiable
            </span>
          </div>

          <SqlProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Pourquoi SQL */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Le Langage Standard de la Data
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Pourquoi SQL est la compétence la plus demandée
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Toutes les entreprises stockent leurs informations stratégiques dans des bases de données relationnelles. Maîtriser SQL vous rend autonome pour extraire la vérité des chiffres sans dépendre des équipes techniques.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Database,
                title: "Accès Direct à la Source",
                desc: "Interrogez directement les millions de lignes de votre ERP ou CRM sans plantage de fichier Excel.",
              },
              {
                icon: Workflow,
                title: "Extractions 100% Reproductibles",
                desc: "Rédigez des scripts SQL clairs qui s'exécutent chaque semaine sans aucune intervention manuelle.",
              },
              {
                icon: LineChart,
                title: "Calculs Avancés avec CTE & Fenêtres",
                desc: "Calculez des évolutions mois par mois, des classements par catégorie et des moyennes mobiles en quelques lignes.",
              },
              {
                icon: Share2,
                title: "Passerelle vers Power BI & Python",
                desc: "Exposez des vues SQL propres que vous connectez directement à Power BI pour des dashboards temps réel.",
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
              <Layers3 size={14} /> Programme Complet · 26 Heures
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 modules progressifs vers la maîtrise de SQL
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Une méthode pédagogique guidée pas-à-pas : théories concises, requêtes en situation réelle et exercices corrigés.
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
              Le Projet Fil Rouge : Base Commerciale KORYXA Sénégal
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous êtes recruté comme Data Analyst pour structurer et exploiter la base relationnelle PostgreSQL de la distribution commerciale dans les régions de Dakar, Thiès, Saint-Louis et Kaolack.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 1</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Schéma &amp; Ingestion</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Créez les tables relationnelles avec contraintes CHECK et clés étrangères, puis chargez les données réelles clients, produits et ventes via psql.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 2</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Jointures, CTE &amp; Fenêtres</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Rédigez les requêtes de rentabilité par produit et par région, comparez les réalisations aux objectifs mensuels et calculez les évolutions N-1.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 3</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Vues &amp; Connexion Power BI</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Créez des vues matérialisées optimisées avec index, configurez un rôle d&apos;accès sécurisé et connectez la base à Power BI pour le rapport final.
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
              Des compétences immédiatement mobilisables en poste
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Des cas d&apos;usage d&apos;entreprise réels pour répondre avec assurance aux entretiens et aux exigences de production.
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
            Rejoignez le parcours SQL &amp; PostgreSQL
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Acquérez le langage fondamental indispensable à tout analyste de données d&apos;entreprise.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet &amp; illimité</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">39 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">49 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Aucun abonnement caché</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules progressifs du SELECT de base aux Window Functions",
                "Scripts SQL réels et jeux de données relationnels d'entreprises",
                "Guide des bonnes pratiques de modélisation, transactions et index",
                "Projet final portfolio noté sur 60 points",
                "Certificat d'achèvement officiel KORYXA vérifiable",
                "Accès à vie à la communauté d'entraide et aux ressources",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug="sql-data-analyst"
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
