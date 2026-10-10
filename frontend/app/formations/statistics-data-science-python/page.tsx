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
  FileSpreadsheet,
  Gauge,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  PieChart,
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
import { courseRoutes, STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const words = [
  "Analyses Descriptives",
  "Tests d'Hypothèses",
  "Segmentations K-Means",
  "Séries Temporelles",
  "Modèles de Régression",
];

const skills = [
  "Pandas & NumPy",
  "Scipy Stats",
  "Scikit-Learn",
  "Statsmodels",
  "Tests t de Welch & ANOVA",
  "Bootstrap & Intervalles",
  "Clustering KMeans (RFM)",
  "Séries Temporelles",
  "Validation Walk-Forward",
  "Démarche Scientifique",
];

const modulesList = [
  {
    num: "01",
    title: "Fondations du Raisonnement Statistique",
    desc: "Population, échantillon, types de variables, identification des biais de confusion, causalité vs corrélation.",
    duration: "2h30",
    icon: Database,
  },
  {
    num: "02",
    title: "Statistiques Descriptives avec Python",
    desc: "Tendance centrale (moyenne, médiane), dispersion (écart-type, IQR), asymétrie et résumés numériques avec pandas et NumPy.",
    duration: "3h00",
    icon: Table2,
  },
  {
    num: "03",
    title: "Visualisation des Distributions & Outliers",
    desc: "Histogrammes, boxplots, courbes de densité KDE, détection de valeurs aberrantes et transformations log1p.",
    duration: "3h00",
    icon: BarChart3,
  },
  {
    num: "04",
    title: "Probabilités & Lois Aléatoires",
    desc: "Probabilités conditionnelles, indépendance, théorème de Bayes, espérance, loi normale et loi binomiale.",
    duration: "3h00",
    icon: PieChart,
  },
  {
    num: "05",
    title: "Échantillonnage, Estimation & Bootstrap",
    desc: "Erreur standard d'échantillonnage, rééchantillonnage par bootstrap avec remise et intervalles de confiance à 95%.",
    duration: "3h00",
    icon: Layers3,
  },
  {
    num: "06",
    title: "Tests d’Hypothèses & P-Values",
    desc: "Hypothèses nulle (H0) et alternative (H1), p-value, risques alpha et bêta, puissance statistique et prévention du p-hacking.",
    duration: "3h30",
    icon: ShieldCheck,
  },
  {
    num: "07",
    title: "Comparer des Groupes (Tests t, ANOVA, Chi2)",
    desc: "Test t de Welch, test non paramétrique de Mann-Whitney, ANOVA à 1 facteur, test du Chi-deux et taille d'effet (Cohen d, V de Cramér).",
    duration: "3h30",
    icon: Workflow,
  },
  {
    num: "08",
    title: "Corrélation & Régression Linéaire OLS",
    desc: "Corrélations de Pearson et Spearman, régression multiple avec statsmodels, interprétation des coefficients et diagnostics des résidus.",
    duration: "4h00",
    icon: TrendingUp,
  },
  {
    num: "09",
    title: "Segmentation Clients avec K-Means",
    desc: "Préparation des variables RFM, standardisation StandardScaler, méthode du coude, coefficient de silhouette et profilage métier.",
    duration: "4h00",
    icon: Zap,
  },
  {
    num: "10",
    title: "Prévision des Ventes en Séries Temporelles",
    desc: "Composantes de tendance et saisonnalité, validation temporelle sans fuite d'information, baselines naïve/saisonnière et évaluation MAE.",
    duration: "4h30",
    icon: LineChart,
  },
  {
    num: "11",
    title: "Évaluation Robuste & Prévention de l'Overfitting",
    desc: "Découpage train/test temporel, validation croisée walk-forward, analyse d'erreurs par segment et limites des modèles.",
    duration: "4h00",
    icon: Gauge,
  },
  {
    num: "12",
    title: "Communication Scientifique & Restitution CODIR",
    desc: "Notebook professionnel reproductible, distinction faits vs interprétations, éthique algorithmique et 5 recommandations stratégiques.",
    duration: "4h00",
    icon: Share2,
  },
];

const outcomes = [
  "Cadrer une problématique métier en démarche statistique testable et reproductible",
  "Auditer la qualité de données réelles et traiter asymétries et valeurs atypiques",
  "Conduire des tests d'hypothèses rigoureux (Welch, ANOVA, Chi2) avec tailles d'effet",
  "Segmenter une base clients en clusters actionnables avec K-Means et profilage RFM",
  "Construire des prévisions chronologiques sans fuite temporelle et battre les baselines",
  "Présenter des recommandations stratégiques défendables devant la direction générale",
];

const faqs = [
  [
    "Quel niveau en Python est nécessaire pour suivre cette formation ?",
    "Il est recommandé de connaître les bases de Python et de pandas (variables, listes, dictionnaires, DataFrames). Si vous avez suivi le cours Python Data Analyst KORYXA, vous êtes parfaitement préparé.",
  ],
  [
    "Faut-il avoir un bagage mathématique universitaire poussé ?",
    "Non. Les concepts mathématiques (variance, distributions, p-value, distances euclidiennes) sont introduits par l'intuition visuelle et la pratique du code, avec des explications claires et concrètes.",
  ],
  [
    "Quels jeux de données sont utilisés pendant la formation ?",
    "Nous travaillons sur des données d'entreprise réelles : 2 500 clients ouest et centre-africains avec métriques RFM, et un historique journalier continu de 730 jours de ventes en FCFA.",
  ],
  [
    "Comment se déroule l'évaluation du projet final certifiant ?",
    "Vous remettez un notebook Jupyter professionnel complet noté sur 60 points selon une grille transparente : rigueur des tests, qualité de la segmentation, performance prédictive et recommandations métier.",
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

function StatsProductStage() {
  const [activeTab, setActiveTab] = useState<"tests" | "kmeans" | "timeseries">("tests");

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
              KORYXA Statistical Engine • Scipy &amp; Scikit-Learn
            </span>
          </div>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("tests")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "tests" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Test t de Welch
            </button>
            <button
              onClick={() => setActiveTab("kmeans")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "kmeans" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Clustering KMeans
            </button>
            <button
              onClick={() => setActiveTab("timeseries")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "timeseries" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Série Temporelle
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Projet Capstone · 62 Heures
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                2 500 Clients &amp; 730 Jours de Ventes
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Segmentation client &amp; Prévision des ventes
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              De l&apos;exploration statistique des distributions à la prévision chronologique sans fuite d&apos;information.
            </p>

            {activeTab === "tests" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>test_hypothese_welch.py</span>
                  <span className="text-[#86efac]">p &lt; 0.001 (Significatif)</span>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`from scipy import stats

# Comparaison des paniers moyens selon le niveau de satisfaction
g_satisfait = df[df['satisfaction'] >= 4.0]['panier_moyen_fcfa']
g_neutre = df[df['satisfaction'] < 4.0]['panier_moyen_fcfa']

# Test t de Welch (hétéroscédasticité autorisée)
t_stat, p_val = stats.ttest_ind(g_satisfait, g_neutre, equal_var=False)
cohen_d = (g_satisfait.mean() - g_neutre.mean()) / pooled_std(g_satisfait, g_neutre)

print(f"t = {t_stat:.2f}, p-value = {p_val:.4e}")
print(f"Taille d'effet Cohen d = {cohen_d:.2f} (Effet Moyen)")`}</code>
                </pre>
                <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                  ✓ Hypothèse H0 rejetée · Différence moyenne de +38 400 FCFA avec IC 95%
                </div>
              </div>
            )}

            {activeTab === "kmeans" && (
              <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                  <span>pipeline_segmentation_kmeans.py</span>
                  <span className="text-emerald-400">Silhouette Score : 0.62</span>
                </div>
                <pre className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Pipeline RFM standardisé
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['recence', 'frequence', 'montant']])

# 4 clusters optimaux selon inertie et silhouette
model = KMeans(n_clusters=4, random_state=42, n_init=10)
df['cluster'] = model.fit_predict(X_scaled)`}</code>
                </pre>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                    <p className="font-bold text-emerald-400">Cluster 0 : Champions VIP</p>
                    <p className="text-slate-400">Récence 12j · Freq 32 · CA 4.2M F</p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                    <p className="font-bold text-amber-400">Cluster 1 : À Risque / Churn</p>
                    <p className="text-slate-400">Récence 214j · Freq 3 · CA 210k F</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "timeseries" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Évaluation Walk-Forward Temporelle (730 Jours)
                </p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">MAE Baseline Naïve</p>
                    <p className="mt-1 font-bold text-slate-700">620 000 FCFA</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">MAE Saisonnière J-7</p>
                    <p className="mt-1 font-bold text-slate-700">385 000 FCFA</p>
                  </div>
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3 shadow-xs">
                    <p className="text-[11px] text-emerald-700 uppercase">Modèle Final KORYXA</p>
                    <p className="mt-1 font-extrabold text-emerald-900">242 000 FCFA</p>
                    <p className="text-[10px] text-emerald-600 font-bold">-37% d&apos;erreur</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Corpus &amp; Livrables du Projet
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["transactions_clients.csv", "2 500 profils clients & métriques RFM"],
                  ["ventes_journalieres.csv", "730 jours de ventes & saisonnalité"],
                  ["dictionnaire_donnees.md", "Définitions, types et hypothèses"],
                  ["starter_notebook.ipynb", "Canevas complet exécutable reproductible"],
                  ["recommandations_codir.md", "5 préconisations métier chiffrées"],
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
              <p className="text-xs font-bold text-emerald-950">Projet Portfolio Noté sur 60 Points</p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Idéal pour valoriser une double compétence statistique et data science auprès des recruteurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatisticsDataScienceLanding() {
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
            Formation Pratique Certifiante · 62 Heures de Pratique
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]"
          >
            Passez à la Data Science grâce à des <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center"
          >
            Ne vous contentez plus de simples graphiques : maîtrisez la rigueur statistique, validez vos hypothèses par des tests formels, segmentez vos clients par K-Means et prévoyez vos ventes avec Python.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG}
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

          <StatsProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Pourquoi cette compétence */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> La Passerelle vers la Data Science
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Pourquoi la statistique est le cœur de la vraie Data Science
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              La plupart des analystes confondent corrélation et causalité, ou appliquent des modèles prédictifs sans vérifier les hypothèses. Ce parcours vous donne la rigueur qui distingue les excellents praticiens.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Décisions Défendables",
                desc: "Quantifiez l'incertitude avec des intervalles de confiance et des p-values préspécifiées sans céder au p-hacking.",
              },
              {
                icon: BarChart3,
                title: "Distributions Maîtrisées",
                desc: "Sachez quand préférer la médiane à la moyenne, comment neutraliser les valeurs extrêmes et normaliser les données.",
              },
              {
                icon: Zap,
                title: "Clustering Actionnable",
                desc: "Segmentez vos clients par K-Means en justifiant le choix de k par la silhouette, la stabilité et la valeur métier.",
              },
              {
                icon: LineChart,
                title: "Prévisions Sans Biais",
                desc: "Construisez une validation walk-forward dans le temps sans aucune fuite de données futures.",
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
              <Layers3 size={14} /> Programme Complet · 62 Heures
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 modules structurés de la théorie au code Python
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              42 heures de cours et ateliers pratiques accompagnés de 20 heures de projet autonome évalué.
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
              Le Projet Fil Rouge : KORYXA Retail Distribution
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous prenez en charge l&apos;étude Data Science d&apos;un réseau de distribution dans 8 pays d&apos;Afrique de l&apos;Ouest et Centrale (Abidjan, Dakar, Douala, Cotonou, Lomé, etc.).
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 1</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Audit &amp; Inférence</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Explorez 2 500 clients, testez les écarts de panier selon la satisfaction par des tests t de Welch et estimez les intervalles de confiance par bootstrap.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 2</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Segmentation K-Means</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Standardisez les dimensions RFM, appliquez l&apos;algorithme K-Means, validez le score de silhouette et profilez les typologies d&apos;acheteurs.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 3</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Prévision &amp; Restitution</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Modélisez les 730 jours de ventes, battez la baseline saisonnière J-7 et formulez 5 recommandations stratégiques pour le comité de direction.
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
              Des compétences de Data Scientist opérationnel
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Des méthodes reconnues et demandées dans les équipes data les plus exigeantes.
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
            Rejoignez le parcours Statistiques &amp; Data Science
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Acquérez le raisonnement statistique et les méthodes data science les plus valorisées.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet &amp; illimité</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">79 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Aucun abonnement caché</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules complets du raisonnement probabiliste aux séries temporelles",
                "Jeux de données réels d'entreprises (2 500 clients & 730 jours de ventes)",
                "Notebooks guidés Python : pandas, scipy, statsmodels, scikit-learn",
                "Projet capstone évalué noté sur 60 points",
                "Certificat d'achèvement officiel KORYXA vérifiable en ligne",
                "Accès permanent aux mises à jour et aux supports",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG}
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
