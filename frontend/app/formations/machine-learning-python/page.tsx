"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
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
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const words = [
  "Modèles Supervisés",
  "Pipelines Scikit-Learn",
  "Forêts Aléatoires & Boosting",
  "Interprétabilité SHAP",
  "Prédictions du Churn Client",
];

const skills = [
  "Scikit-Learn",
  "Pipelines & ColumnTransformer",
  "Cross-Validation Stratifiée",
  "Random Forest & Gradient Boosting",
  "Interprétabilité SHAP",
  "Gestion du Déséquilibre",
  "Optimisation Hyperparamètres",
  "Model Card & Dérive",
  "Seuils Coût-Sensibles",
];

const modulesList = [
  {
    num: "01",
    title: "Workflow Professionnel du Machine Learning",
    desc: "Cycle de vie d'un projet ML : cadrage du problème métier, baseline initiale, métriques de succès et séparation stricte train/test.",
    duration: "4h00",
    icon: Database,
  },
  {
    num: "02",
    title: "Préparation des Données sans Fuite (Leakage)",
    desc: "Nettoyage des valeurs manquantes, gestion des types, encodage One-Hot/Ordinal et ajustement des transformateurs sur le train uniquement.",
    duration: "4h00",
    icon: Table2,
  },
  {
    num: "03",
    title: "Feature Engineering & Sélection de Variables",
    desc: "Création d'indicateurs métier, normalisation StandardScaler/RobustScaler, corrélation et élimination récursive de variables (RFE).",
    duration: "4h00",
    icon: Code2,
  },
  {
    num: "04",
    title: "Régression Supervisée & Métriques d'Erreur",
    desc: "Régression linéaire, Ridge, Lasso, évaluation continue (MAE, RMSE, R²), analyse des résidus et application au dataset immobilier.",
    duration: "4h30",
    icon: TrendingUp,
  },
  {
    num: "05",
    title: "Classification Supervisée & Calibration",
    desc: "Régression logistique, matrice de confusion, précision, rappel, F1-score, courbe ROC-AUC et calibration des probabilités prédites.",
    duration: "4h30",
    icon: Gauge,
  },
  {
    num: "06",
    title: "Arbres de Décision & Méthodes d'Ensemble",
    desc: "Arbre CART, Random Forest, Gradient Boosting (XGBoost/LightGBM), bagging vs boosting et compromis biais-variance.",
    duration: "5h00",
    icon: Layers3,
  },
  {
    num: "07",
    title: "Gestion des Classes Déséquilibrées",
    desc: "Techniques de sur-échantillonnage (SMOTE), sous-échantillonnage, pondération class_weight et optimisation du seuil coût-sensible.",
    duration: "4h00",
    icon: Workflow,
  },
  {
    num: "08",
    title: "Pipelines Scikit-Learn & Validation Croisée",
    desc: "ColumnTransformer étanche, Pipeline imbriqué, K-Fold stratifié et prévention absolue de toute fuite de données d'évaluation.",
    duration: "4h30",
    icon: Zap,
  },
  {
    num: "09",
    title: "Optimisation des Hyperparamètres",
    desc: "Recherche exhaustive GridSearchCV, RandomizedSearchCV, validation croisée imbriquée (nested CV) et suivi de convergence.",
    duration: "4h30",
    icon: BrainCircuit,
  },
  {
    num: "10",
    title: "Interprétabilité des Modèles & Valeurs SHAP",
    desc: "Feature importance par permutation, explications locales et globales SHAP (valeurs de Shapley), graphiques de dépendance partielle.",
    duration: "4h30",
    icon: LineChart,
  },
  {
    num: "11",
    title: "Analyse des Erreurs, Robustesse & Dérive",
    desc: "Diagnostic des faux positifs/négatifs coûteux, stress tests sur sous-populations, dérive des données (data drift) et suivi en production.",
    duration: "4h00",
    icon: ShieldCheck,
  },
  {
    num: "12",
    title: "Sélection Finale, Model Card & Restitution",
    desc: "Sélection du modèle optimal, rédaction d'une Model Card standardisée, synthèse exécutive CODIR et soutenance du projet de churn.",
    duration: "4h00",
    icon: Share2,
  },
];

const outcomes = [
  "Construire un pipeline scikit-learn complet et étanche sans fuite de données",
  "Entraîner et comparer des modèles supervisés (Régression, Random Forest, Gradient Boosting)",
  "Traiter efficacement le déséquilibre de classes sur des données de churn réelles",
  "Optimiser le seuil de décision en fonction des coûts financiers réels de l'entreprise",
  "Expliquer chaque prédiction individuelle grâce aux valeurs SHAP et à l'importance de permutation",
  "Documenter une Model Card professionnelle et formuler des recommandations actionnables",
];

const faqs = [
  [
    "Quels sont les prérequis pour suivre ce parcours Machine Learning ?",
    "Une bonne maîtrise de Python et des bibliothèques pandas/NumPy est requise. Avoir des notions en statistiques descriptives ou avoir suivi Python Data Analyst est idéal.",
  ],
  [
    "Ce cours aborde-t-il les modèles en boîte noire comme le Deep Learning ?",
    "Ce parcours se concentre sur le Machine Learning tabulaire professionnel (scikit-learn, XGBoost, Random Forest), qui représente plus de 85% des cas d'usage réels en entreprise avec une priorité donnée à l'explicabilité.",
  ],
  [
    "Quels sont les cas pratiques et données utilisés ?",
    "Deux datasets réels d'entreprise : un cas complet de prédiction de résiliation (churn) avec 1 000+ clients multi-facteurs, et un cas de modélisation de prix immobiliers avec variables hétérogènes.",
  ],
  [
    "Comment est délivrée la certification KORYXA ?",
    "La validation repose sur des quiz techniques par module et la notation du projet fil rouge de churn (60 points) avec examen du pipeline, des métriques et de la Model Card.",
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

function MlProductStage() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "shap" | "metrics">("pipeline");

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
              KORYXA ML Pipeline Engine • Scikit-Learn &amp; SHAP
            </span>
          </div>
          <div className="flex gap-1.5 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "pipeline" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Pipeline Étanche
            </button>
            <button
              onClick={() => setActiveTab("shap")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "shap" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Interprétabilité SHAP
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`rounded-lg px-3 py-1 transition ${
                activeTab === "metrics" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Matrice de Confusion
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Projet Capstone · 60 Heures
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Classification du Churn Client
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Pipeline de prédiction du désengagement client
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Prétraitement sans data leakage, comparaison d&apos;ensembles et calibration du seuil de décision économique.
            </p>

            {activeTab === "pipeline" && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                  <span>pipeline_churn_sklearn.py</span>
                  <span className="text-[#86efac]">CV Stratifiée : ROC-AUC 0.884</span>
                </div>
                <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier

# Prétraitement étanche sans fuite de données
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), ['anciennete', 'montant_moyen', 'recence']),
    ('cat', OneHotEncoder(drop='first'), ['contrat', 'mode_paiement'])
])

# Pipeline complet intégré
model = Pipeline([
    ('prep', preprocessor),
    ('clf', RandomForestClassifier(class_weight='balanced', random_state=42))
])
model.fit(X_train, y_train)`}</code>
                </pre>
                <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                  ✓ Prévention totale du data leakage · Fit sur train uniquement, transform sur test
                </div>
              </div>
            )}

            {activeTab === "shap" && (
              <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-slate-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400">
                  <span>analyse_shap_explicabilite.py</span>
                  <span className="text-emerald-400">Explicabilité SHAP Active</span>
                </div>
                <div className="space-y-2 pt-2 text-[11px]">
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-red-400">1. Récence d&apos;achat élevée (+3.42)</span>
                      <span className="text-slate-400">Impact Churn Positif</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-1.5 rounded-full bg-red-400" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-emerald-400">2. Ancienneté &gt; 24 mois (-2.85)</span>
                      <span className="text-slate-400">Impact Rétention</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-1.5 rounded-full bg-emerald-400" style={{ width: "68%" }} />
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-900 p-2.5">
                    <div className="flex justify-between">
                      <span className="font-bold text-red-400">3. Réclamations ouvertes (+1.94)</span>
                      <span className="text-slate-400">Signal Faible Alerte</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-slate-800">
                      <div className="h-1.5 rounded-full bg-red-400" style={{ width: "46%" }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="mt-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Matrice de Décision à Seuil Économique Optimisé (Seuil = 0.38)
                </p>
                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">Rappel (Recall Churn)</p>
                    <p className="mt-1 text-base font-extrabold text-emerald-700">84.2 %</p>
                    <p className="text-[10px] text-slate-500">8 clients sur 10 sauvés</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                    <p className="text-[11px] text-slate-400 uppercase">Précision Modèle</p>
                    <p className="mt-1 text-base font-bold text-slate-700">76.5 %</p>
                    <p className="text-[10px] text-slate-500">Faux positifs limités</p>
                  </div>
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50/80 p-3 shadow-xs">
                    <p className="text-[11px] text-emerald-700 uppercase">Score ROC-AUC</p>
                    <p className="mt-1 text-base font-extrabold text-emerald-900">0.884</p>
                    <p className="text-[10px] text-emerald-600 font-bold">Performance Élite</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Packs d&apos;Exercices &amp; Datasets Réels
              </p>
              <div className="mt-4 space-y-2.5">
                {[
                  ["clients_churn.csv", "1 000+ enregistrements & labels de churn"],
                  ["biens_immobiliers.csv", "Données pour modélisation de régression"],
                  ["12 Notebooks Guidés", "De la baseline aux ensembles et SHAP"],
                  ["12 Notebooks Corrigés", "Solutions complètes réexécutables"],
                  ["Model_Card_Template.md", "Format d'audit de modèle pour l'entreprise"],
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
              <p className="text-xs font-bold text-emerald-950">Projet Noté sur 60 Points</p>
              <p className="mt-0.5 text-[11px] text-emerald-700">
                Démontrez votre maîtrise des pipelines étanches et de l&apos;explicabilité des prédictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MachineLearningPythonLanding() {
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
            Formation Pratique Certifiante · 60 Heures de Pratique
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]"
          >
            Maîtrisez le Machine Learning pour déployer des <TypingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center"
          >
            Apprenez à construire des modèles de Machine Learning professionnels avec scikit-learn : pipelines sans fuite de données, forêts aléatoires, boosting, optimisation coût-sensible et interprétabilité complète avec SHAP.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PurchaseCourseLink
              courseSlug="machine-learning-python"
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

          <MlProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Pourquoi cette compétence */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Compétence Clé du Marché Data
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Du code expérimental au modèle de production fiable
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              En entreprise, un bon modèle n&apos;est pas seulement celui qui maximise une métrique abstraite : c&apos;est un modèle robuste, reproductible et dont les prédictions sont compréhensibles par les décideurs métiers.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Database,
                title: "Pipelines sans Fuite",
                desc: "Intégrez encodage et imputation dans des Transformers scikit-learn garantissant zéro contamination des jeux de test.",
              },
              {
                icon: Layers3,
                title: "Méthodes d'Ensemble",
                desc: "Maîtrisez les Random Forests et les algorithmes de Gradient Boosting pour tirer le meilleur parti des données tabulaires.",
              },
              {
                icon: Gauge,
                title: "Décisions Coût-Sensibles",
                desc: "Calibrez le seuil de décision pour minimiser les coûts financiers réels des faux négatifs et faux positifs en entreprise.",
              },
              {
                icon: ShieldCheck,
                title: "Explicabilité SHAP",
                desc: "Expliquez avec précision pourquoi le modèle a pris telle décision pour chaque client grâce aux valeurs de Shapley.",
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
              <Layers3 size={14} /> Programme Complet · 60 Heures
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              12 modules progressifs vers l&apos;expertise Machine Learning
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Chaque module comprend un cours approfondi, des notebooks guidés, des exercices corrigés et des quiz techniques.
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
              Le Projet Fil Rouge : Prédiction du Churn Client
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous êtes chargé de concevoir le modèle prédictif d&apos;attrition d&apos;une entreprise de services télécom et fintech en Afrique de l&apos;Ouest.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 1</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Ingestion &amp; Pipeline Étanche</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Construisez un ColumnTransformer intégrant variables numériques et catégorielles sans fuite d&apos;information entre train et test.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 2</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Ensembles &amp; Optimisation Coût</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Comparez Régression Logistique, Random Forest et Gradient Boosting, calibrez le seuil pour maximiser la rentabilité de la rétention.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Étape 3</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">Interprétabilité &amp; Model Card</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Générez les graphiques d&apos;impact SHAP et rédigez la Model Card professionnelle documentant limites, biais et recommandations.
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
              Des compétences concrètes et recherchées en entreprise
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Vous êtes capable d&apos;intégrer une équipe data et de déployer des modèles solides dès le premier jour.
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
            Rejoignez le parcours Machine Learning
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Maîtrisez les modèles prédictifs et propulsez votre carrière en Data Science.
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
                "12 modules progressifs et 24 notebooks scikit-learn complets",
                "Datasets réels d'entreprises : churn client et régression immobilière",
                "Guide des pipelines étanches, tuning et interprétabilité SHAP",
                "Projet portfolio noté sur 60 points avec Model Card",
                "Certificat d'achèvement officiel KORYXA vérifiable",
                "Accès à vie aux notebooks et aux mises à jour pédagogiques",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <PurchaseCourseLink
                courseSlug="machine-learning-python"
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
