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
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const words = [
  "Rapports Interactifs",
  "Modélisation en Étoile",
  "Mesures DAX Précises",
  "Tableaux de Bord CODIR",
  "Power BI Service Cloud",
];

const skills = [
  "Power Query ETL",
  "Schéma en Étoile",
  "DAX Avancé",
  "Time Intelligence",
  "Cartes KPI & Matrices",
  "Drill-down & Info-bulles",
  "Power BI Service Cloud",
  "Sécurité RLS",
  "Passerelle & Actualisation",
];

const modulesList = [
  {
    num: "01",
    title: "Écosystème & Interface Power BI Desktop",
    desc: "Architecture Power BI Desktop vs Service, navigation dans les 3 vues (Rapport, Données, Modèle) et premier import.",
    duration: "2h00",
    icon: BarChart3,
  },
  {
    num: "02",
    title: "Power Query : Ingestion & Hygiène des Données",
    desc: "Connexion aux sources Excel/CSV, typage strict, nettoyage des valeurs nulles et étapes reproductibles.",
    duration: "2h30",
    icon: Workflow,
  },
  {
    num: "03",
    title: "Consolidation Multi-Sources & Pipeline ETL",
    desc: "Fusion de tables, ajout de flux mensuels, gestion des clés primaires et jointures dimensionnelles fiables.",
    duration: "3h00",
    icon: Database,
  },
  {
    num: "04",
    title: "Modélisation Relationnelle & Schéma en Étoile",
    desc: "Séparation Faits vs Dimensions, cardinalité 1 à plusieurs (1:*), sens de filtre croisé et suppression des ambiguïtés.",
    duration: "3h00",
    icon: Layers3,
  },
  {
    num: "05",
    title: "Dimension Temporelle : Table Calendrier DAX",
    desc: "Création de la table DimDate avec CALENDARAUTO, colonnes d'années, mois, trimestres et tri chronologique.",
    duration: "2h00",
    icon: Calendar,
  },
  {
    num: "06",
    title: "Introduction à DAX : Mesures Fondamentales",
    desc: "Distinction colonne calculée vs mesure, syntaxe DAX, SUM, COUNTROWS, DISTINCTCOUNT et fonction DIVIDE sécurisée.",
    duration: "3h00",
    icon: BookOpen,
  },
  {
    num: "07",
    title: "DAX pour les KPI Métier & CALCULATE",
    desc: "Le rôle central du contexte de filtre, CALCULATE, FILTER, ALL, marge brute, taux de conversion et objectifs.",
    duration: "3h00",
    icon: TrendingUp,
  },
  {
    num: "08",
    title: "Time Intelligence : Comparatifs & N-1",
    desc: "SAMEPERIODLASTYEAR, DATEADD, TOTALYTD, analyse d'évolution en valeur et en pourcentage sur les exercices précédents.",
    duration: "3h00",
    icon: Clock3,
  },
  {
    num: "09",
    title: "Visualisations Percutantes & Storytelling",
    desc: "Cartes KPI multi-lignes, graphiques à barres contrastés, matrices interactives, segments synchronisés et info-bulles.",
    duration: "3h00",
    icon: LineChart,
  },
  {
    num: "10",
    title: "Architecture d'un Rapport Multi-Pages",
    desc: "Hiérarchie de lecture CODIR, boutons de navigation, panneau de filtres escamotable et disposition responsive mobile.",
    duration: "3h00",
    icon: Table2,
  },
  {
    num: "11",
    title: "Power BI Service, Espaces & Actualisation",
    desc: "Publication dans le cloud, configuration des workspaces, planifications de rafraîchissement et partage sécurisé.",
    duration: "2h30",
    icon: Share2,
  },
  {
    num: "12",
    title: "Sécurité RLS, Performance & Soutenance",
    desc: "Configuration de la sécurité par rôle (RLS), optimisation de la mémoire avec DAX Studio et grille d'évaluation finale.",
    duration: "2h00",
    icon: ShieldCheck,
  },
];

const outcomes = [
  "Consolider des sources hétérogènes (Excel, CSV, SQL) en pipeline Power Query sans rupture",
  "Construire un modèle en étoile certifié avec relations 1:* et calendrier continu",
  "Rédiger des mesures DAX robustes avec CALCULATE, DIVIDE et fonctions temporelles N-1",
  "Concevoir un rapport décisionnel multi-pages ergonomique pour la direction générale",
  "Mettre en place la sécurité au niveau des lignes (RLS) pour cloisonner les accès par agence",
  "Publier, actualiser et automatiser les flux décisionnels sur Power BI Service",
];

const faqs = [
  [
    "Quelle est la configuration requise pour suivre ce parcours ?",
    "Power BI Desktop (logiciel gratuit fourni par Microsoft sur Windows). Un compte Microsoft gratuit ou professionnel vous permettra de publier vos rapports sur Power BI Service Cloud.",
  ],
  [
    "Ce parcours est-il accessible si je n'ai jamais codé en DAX ?",
    "Oui. Nous démarrons de zéro avec une pédagogie progressive : d'abord la logique des contextes de filtre et de calcul, puis l'écriture de formules pas-à-pas avec des exemples métiers clairs.",
  ],
  [
    "Les données d'exercice sont-elles réalistes ?",
    "Oui, 100% de données d'entreprises réalistes réparties sur 4 mois de ventes réelles (Abidjan, Douala, Dakar, Libreville, Cotonou, Lomé, etc.) avec référentiels produits, clients et commerciaux.",
  ],
  [
    "Le certificat délivré est-il vérifiable par les employeurs ?",
    "Oui, chaque diplômé reçoit un certificat KORYXA authentifié par un QR code et un identifiant unique vérifiable publiquement en ligne.",
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

function PowerBiProductStage() {
  const [activeTab, setActiveTab] = useState<"dax" | "modele" | "kpis">("dax");

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
              KORYXA Power BI Cockpit • Étoile &amp; DAX Engine
            </span>
          </div>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("dax")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "dax" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Mesures DAX
            </button>
            <button
              onClick={() => setActiveTab("modele")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "modele" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Schéma en Étoile
            </button>
            <button
              onClick={() => setActiveTab("kpis")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "kpis" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Cartouches KPI
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Projet Capstone Certifiant
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                4 Mois de Données Consolidées
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Rapport de pilotage commercial exécutif
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              De l&apos;importation Power Query multi-sources à la publication sécurisée dans le Cloud avec sécurité RLS.
            </p>

            {activeTab === "dax" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>Mesures DAX de Performance &amp; N-1</span>
                  <span className="text-[#86efac]">Syntaxe Validée</span>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`// 1. Chiffre d'Affaires Encaissé & Filtré
CA_Paye =
CALCULATE(
    SUM(F_Ventes[Montant_FCFA]),
    F_Ventes[Statut] = "Payé"
)

// 2. Évolution temporelle N-1 (Time Intelligence)
CA_Annee_Precedente =
CALCULATE([CA_Paye], SAMEPERIODLASTYEAR(DimDate[Date]))

// 3. Taux d'atteinte de l'objectif commercial
Taux_Realisation =
DIVIDE([CA_Paye], [Objectif_Ventes], 0)`}</code>
                </pre>
                <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                  ✓ 15 mesures DAX structurées · Contextes de transition de ligne automatisés
                </div>
              </div>
            )}

            {activeTab === "modele" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>Architecture Schéma en Étoile (1:*)</span>
                  <span className="text-emerald-400">Filtre Unidirectionnel</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                    <p className="font-bold text-emerald-400">Dim_Clients (1)</p>
                    <p className="mt-1 text-[11px] text-slate-400">ID_Client, Nom, Ville, Segment</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                    <p className="font-bold text-emerald-400">Dim_Produits (1)</p>
                    <p className="mt-1 text-[11px] text-slate-400">ID_Produit, Categorie, Prix_Unitaire</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                    <p className="font-bold text-emerald-400">Dim_Commerciaux (1)</p>
                    <p className="mt-1 text-[11px] text-slate-400">ID_Commercial, Nom, Agence, Zone</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                    <p className="font-bold text-emerald-400">DimDate (1)</p>
                    <p className="mt-1 text-[11px] text-slate-400">Date, Annee, Mois, Trimestre, Semaine</p>
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-center font-mono text-xs">
                  <p className="font-bold text-emerald-300">F_Ventes (Table de Faits - N)</p>
                  <p className="text-[11px] text-slate-300">ID_Vente, Date, ID_Client, ID_Produit, ID_Commercial, Quantite, Montant_FCFA</p>
                </div>
              </div>
            )}

            {activeTab === "kpis" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cartouches Directeurs Généraux
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                    <p className="text-[11px] font-bold uppercase text-slate-400">CA Réalisé</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-950">148 450 000 FCFA</p>
                    <p className="text-xs font-semibold text-emerald-600">+14.2% vs Objectif</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                    <p className="text-[11px] font-bold uppercase text-slate-400">Taux de Marge Brute</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-950">34.8 %</p>
                    <p className="text-xs font-semibold text-emerald-600">+2.1 pts vs N-1</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Livrables du Projet Portfolio
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["01_sources_et_referentiels.xlsx", "Référentiels & 4 tables dimensions"],
                  ["ventes_2026_01 à 04.csv", "324 transactions réelles d'entreprises"],
                  ["02_modele_donnees.xlsx", "Dictionnaire de données & relations"],
                  ["03_dax_kpi.xlsx", "15 mesures DAX et règles métier"],
                  ["04_cahier_dashboard.xlsx", "Maquette 4 pages & rôles RLS"],
                ].map(([file, desc]) => (
                  <div key={file} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5 shadow-xs">
                    <FileSpreadsheet size={16} className="shrink-0 text-[#00a86b]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-xs font-bold text-slate-900">{file}</p>
                      <p className="text-[11px] text-slate-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-center">
              <p className="text-xs font-bold text-emerald-950">Prêt pour le recrutement international</p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Tableau de bord multi-pages publiable dans votre portfolio Power BI Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PowerBiDataAnalystLanding() {
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
            Formation Pratique Certifiante · Power BI Desktop &amp; Cloud
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]"
          >
            Maîtrisez Power BI pour concevoir des <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center"
          >
            Devenez le référent Business Intelligence de votre organisation : importez vos données brutes, concevez un modèle en étoile sans ambiguïté, programmez des mesures DAX précises et publiez des dashboards interactifs de direction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug="power-bi-data-analyst"
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
              <Star size={15} className="text-amber-500 fill-amber-500" /> Tarif unique : 49 000 FCFA
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#00a86b]" /> Certificat officiel vérifiable
            </span>
          </div>

          <PowerBiProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Pourquoi Power BI */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Compétence Clé du Marché
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Pourquoi Power BI est l&apos;outil décisionnel n°1 en entreprise
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Fini les classeurs déconnectés qui plantent et les chiffres contradictoires. Power BI unifie la donnée pour donner aux dirigeants une vision fiable et actualisée de leur activité.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Workflow,
                title: "Power Query ETL Sans Code",
                desc: "Automatisez la collecte et le nettoyage de dizaines de fichiers sans recopier une seule ligne manuellement.",
              },
              {
                icon: Database,
                title: "Modèle de Données Évolutif",
                desc: "Structurez vos tables en schéma en étoile pour des analyses ultra-rapides même sur des millions de lignes.",
              },
              {
                icon: Zap,
                title: "Calculs DAX Avancés",
                desc: "Calculez marges, paniers moyens, taux de rétention et comparaisons N-1 avec des formules standardisées.",
              },
              {
                icon: Share2,
                title: "Partage Sécurisé Cloud (RLS)",
                desc: "Diffusez vos rapports sur Power BI Service en contrôlant précisément qui a accès à quelles agences.",
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
              <Layers3 size={14} /> Programme Complet · 30 Heures
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 modules progressifs vers l&apos;expertise Power BI
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Chaque module alterne théorie conceptuelle, manipulation pratique sur des données réelles et quiz de validation.
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
              Le Projet Fil Rouge : KORYXA Distribution Ouest-Afrique
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous incarnez le Lead Data Analyst mandaté par la direction commerciale d&apos;un grand groupe de distribution implanté dans 6 pays africains.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 1</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Ingestion &amp; Normalisation</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Connectez les 4 fichiers de ventes brutes CSV, gérez les devises en FCFA, nettoyez les doublons et bâtissez la dimension DimDate.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 2</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Modélisation &amp; DAX</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Reliez les tables en schéma en étoile sans circularité, créez 15 mesures DAX (CA, Marge, Panier Moyen, Cumul YTD, Écart N-1).
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 3</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Dashboard &amp; Sécurité</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Concevez un rapport 4 pages avec navigation fluide, configurez les rôles RLS par agence et publiez sur Power BI Service Cloud.
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
              Des compétences immédiatement applicables dès demain
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Pas de théorie abstraite : chaque concept répond à un besoin concret en entreprise.
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
            Rejoignez la formation Power BI
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Investissez dans la compétence analytique la plus valorisée par les recruteurs et les directions.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet &amp; illimité</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">75 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Aucun abonnement caché</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules complets de Power Query au cloud",
                "4 classeurs d'exercice et 4 fichiers CSV réels",
                "Catalogue des 15 mesures DAX et modèle en étoile",
                "Projet final fil rouge noté sur 60 points",
                "Certificat d'achèvement officiel KORYXA vérifiable",
                "Accès à vie à la communauté et aux mises à jour",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug="power-bi-data-analyst"
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
