"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  FileSpreadsheet,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Table2,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const words = ["Excel Data Analyst", "responsable reporting", "analyste financier", "expert Power Query"];
const skills = [
  "Excel Avancé",
  "Power Query",
  "Power Pivot",
  "RECHERCHEX",
  "Modèle en Étoile",
  "Mesures DAX",
  "TCD Avancés",
  "Segments Dynamiques",
  "Dashboard Commercial",
  "Certificat KORYXA",
];

const modulesDetailed = [
  {
    num: "00",
    title: "Prise en main & Structure d'un Classeur Pro",
    desc: "Interface, architecture en 3 feuilles (Données, Calculs, Synthèse), références absolues ($A$1) et relatives.",
    duration: "1h30",
    icon: FileSpreadsheet,
  },
  {
    num: "01",
    title: "Calculs, Formules & Règles Métier",
    desc: "Opérateurs, calculs de marges, TVA, fonctions logiques SI, SIERREUR, ET, OU et validation financière.",
    duration: "2h00",
    icon: Table2,
  },
  {
    num: "02",
    title: "Organisation & Hygiène des Données",
    desc: "Tableaux structurés, déduplication, validation de données à la saisie et règles de propreté d'entreprise.",
    duration: "2h00",
    icon: Database,
  },
  {
    num: "03",
    title: "Fonctions de Recherche : RECHERCHEX & Index/Equiv",
    desc: "Remplacement de RECHERCHEV par RECHERCHEX (XLOOKUP), recherches multicritères et gestion des valeurs absentes.",
    duration: "2h30",
    icon: BookOpen,
  },
  {
    num: "04",
    title: "Traitement du Texte & Calculs Chronologiques",
    desc: "Normalisation des libellés (TEXTE, STXT, MAJUSCULE), extraction d'identifiants et calculs de délais (DATEDIF).",
    duration: "2h00",
    icon: Layers3,
  },
  {
    num: "05",
    title: "Analyse Conditionnelle & Tableaux de KPI",
    desc: "SOMME.SI.ENS, NB.SI.ENS, MOYENNE.SI.ENS pour construire des indicateurs de gestion par région et canal.",
    duration: "2h00",
    icon: TrendingUp,
  },
  {
    num: "06",
    title: "Tableaux Croisés Dynamiques (TCD) Avancés",
    desc: "Regroupements par date, champs calculés de marge, segments interactifs (slicers) et chronologies connectées.",
    duration: "2h30",
    icon: BarChart3,
  },
  {
    num: "07",
    title: "Visualisation & Storytelling Décisionnel",
    desc: "Graphiques épurés, barres horizontales contrastées, élimination du chartjunk et hiérarchie visuelle pour le CODIR.",
    duration: "2h00",
    icon: LineChart,
  },
  {
    num: "08",
    title: "Power Query : L'Automatisation ETL Sans Code",
    desc: "Connexion aux dossiers CSV, fusion de fichiers mensuels, nettoyage automatisé et actualisation en 1 clic.",
    duration: "3h00",
    icon: Workflow,
  },
  {
    num: "09",
    title: "Modèle Relationnel & Power Pivot",
    desc: "Relations 1 à plusieurs, schéma en étoile (Faits & Dimensions), calendrier automatique et premières mesures DAX.",
    duration: "3h00",
    icon: Database,
  },
  {
    num: "10",
    title: "Conception du Dashboard Commercial Exécutif",
    desc: "Assemblage du tableau de bord de direction, cartes KPI, segments interactifs et analyse d'aide à la décision.",
    duration: "3h00",
    icon: Zap,
  },
  {
    num: "11",
    title: "Automatisation, Contrôle Qualité & Clôture",
    desc: "Audit de formules, protection des feuilles, sécurisation des flux et préparation de la soutenance finale.",
    duration: "2h30",
    icon: ShieldCheck,
  },
];

const outcomes = [
  "Nettoyer et fiabiliser des données métier volumineuses sans plantage",
  "Automatiser les flux d'imports répétitifs avec Power Query en 1 clic",
  "Construire des KPI exécutifs avec SOMME.SI.ENS et des tableaux croisés dynamiques",
  "Créer un modèle relationnel robuste en étoile avec Power Pivot",
  "Livrer un Dashboard commercial actualisable et interactif pour la direction",
  "Présenter des analyses chiffrées et défendables lors des comités de direction",
];

const faqs = [
  ["Quelle version d'Excel est nécessaire pour suivre ce parcours ?", "Microsoft 365, Excel 2021 ou Excel 2019 (Windows ou Mac). Les fonctionnalités majeures (Power Query, TCD, formules modernes dont RECHERCHEX) sont pleinement traitées et des alternatives universelles (INDEX/EQUIV) sont enseignées."],
  ["Est-ce adapté si je n'ai jamais utilisé Power Query ou Power Pivot ?", "Absolument. La progression commence par la structure d'une cellule avant de vous guider pas-à-pas vers l'automatisation sans code avec Power Query et la modélisation relationnelle."],
  ["Les fichiers d'entraînement réels sont-ils fournis ?", "Oui, vous recevez 4 classeurs Excel professionnels complets (.xlsx) et 4 jeux de données mensuels réels (.csv) prêts pour la consolidation Power Query."],
  ["Le certificat KORYXA est-il reconnu et vérifiable ?", "Oui, chaque diplômé reçoit un certificat officiel infalsifiable avec un identifiant unique vérifiable sur la plateforme KORYXA."],
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
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}>|</motion.span>
    </span>
  );
}

function SkillTicker() {
  return (
    <div className="overflow-hidden border-y border-[#dfe5d8] bg-white py-4">
      <motion.div className="flex w-max gap-4 whitespace-nowrap" animate={{ x: [0, -560] }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a86b]" /> {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ExcelProductStage() {
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
            <span className="ml-2 font-mono text-xs font-bold text-slate-500">KORYXA Excel Analytics Engine • v2026.1</span>
          </div>
          <span className="rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3 py-0.5 text-xs font-bold text-[#008b58]">
            Projet Certifiant Déployé
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">
                Module 10 · Dashboard Exécutif
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Pipeline Power Query : Validé
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-950 sm:text-3xl">
              Dashboard commercial actualisable en 1 clic
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Combinez 4 sources CSV mensuelles avec Power Query, modélisez dans Power Pivot et pilotez les marges avec des segments interactifs.
            </p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs text-slate-400">
                <span>Formule DAX &amp; Mesures Clés</span>
                <span className="text-[#86efac]">Actualisation Auto : OK</span>
              </div>
              <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
<code>{`// 1. Calcul du Chiffre d'Affaires Encaissé
CA_Encaisse = CALCULATE(
    SUM(F_Ventes[Montant_FCFA]),
    F_Ventes[Statut] = "Payé"
)

// 2. Marge Brute & Taux de Marge
Taux_Marge = DIVIDE([Marge_Totale], [CA_Encaisse], 0)`}</code>
              </pre>
              <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 font-mono text-xs font-bold text-emerald-300">
                ✓ 350 transactions consolidées · Segments par Région &amp; Canal connectés
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Cartouches KPI en Temps Réel</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">CA Encaissé</p>
                  <p className="mt-1 font-serif text-xl font-black text-slate-950">104,1 M</p>
                  <span className="text-[10px] font-bold text-[#00a86b]">+18.4% vs N-1</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Recouvrement</p>
                  <p className="mt-1 font-serif text-xl font-black text-slate-950">83.5 %</p>
                  <span className="text-[10px] font-bold text-[#00a86b]">Obj: 80.0%</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Commandes</p>
                  <p className="mt-1 font-serif text-xl font-black text-slate-950">2 338</p>
                  <span className="text-[10px] font-medium text-slate-500">Validées</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Panier Moyen</p>
                  <p className="mt-1 font-serif text-xl font-black text-slate-950">44 532</p>
                  <span className="text-[10px] font-medium text-slate-500">FCFA</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[#00a86b]/20 bg-[#00a86b]/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-[#008b58]">
                <FileSpreadsheet size={15} /> 4 Fichiers d'Entraînement Inclus
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Téléchargez les classeurs réels : Formules Fondamentales, RECHERCHEX &amp; KPI, TCD Décisionnels et Modèle Power Query.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExcelDataAnalystLanding() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section Centrée */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
            <Sparkles size={14} /> Formation Professionnelle Certifiante • Écosystème KORYXA
          </span>

          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-black leading-[1.08] tracking-tight text-slate-950 max-w-4xl mx-auto">
            Devenez <TypingText /><br />
            et maîtrisez les décisions d’entreprise.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Passez du tableur basique à l'analyste de haut niveau. Maîtrisez les formules avancées, Power Query, Power Pivot, et livrez un Dashboard commercial actualisable qui impressionnera votre direction.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <PurchaseCourseLink
              courseSlug="excel-data-analyst"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]"
            >
              Commencer la formation <ArrowRight size={17} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              Voir les 12 modules
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock3 size={16} className="text-[#00a86b]" /> 28 heures de pratique
            </span>
            <span className="flex items-center gap-1.5">
              <Layers3 size={16} className="text-[#00a86b]" /> 12 modules d’application
            </span>
            <span className="flex items-center gap-1.5">
              <LockKeyhole size={16} className="text-[#00a86b]" /> Tarif certifié : 39 000 FCFA
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap size={16} className="text-[#00a86b]" /> Certificat officiel KORYXA
            </span>
          </div>

          {/* Démo interactive / Cockpit */}
          <ExcelProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Métriques d'excellence */}
      <section className="border-b border-[#dfe5d8] bg-[#faf9f5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["12", "Modules structurés", BookOpen],
            ["4 Fichiers", "Classeurs professionnels", FileSpreadsheet],
            ["Power Query", "Pipeline actualisable", Workflow],
            ["Certificat", "Reconnu & vérifiable", GraduationCap],
          ].map(([value, label, Icon]) => {
            const IconComponent = Icon as typeof BookOpen;
            return (
              <div key={label as string} className="rounded-2xl border border-[#dfe5d8] bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                  <IconComponent size={20} />
                </div>
                <p className="font-serif text-2xl font-black text-slate-950">{value as string}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">{label as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pourquoi Excel */}
      <section id="importance" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Valeur sur le Marché
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Excel reste au cœur des décisions d’entreprise.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Finance, commerce, opérations, RH et gestion reposent quotidiennement sur Excel. La vraie valeur se crée en passant d&apos;une utilisation manuelle fragile à une maîtrise automatisée et rigoureuse.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              { icon: BriefcaseBusiness, title: "Compétence immédiatement rentable", text: "Les recruteurs recherchent des collaborateurs capables de produire des analyses exactes sans délais." },
              { icon: Workflow, title: "Automatisation concrète avec Power Query", text: "Power Query supprime les tâches répétitives et actualise vos données en un seul clic." },
              { icon: Database, title: "Données consolidées & modèle relationnel", text: "Apprenez à nettoyer, relier et contrôler plusieurs sources hétérogènes avec Power Pivot." },
              { icon: LineChart, title: "Recommandations éclairées pour la direction", text: "Les KPI et graphiques synthétiques transforment les chiffres bruts en décisions stratégiques." },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm transition hover:border-[#00a86b] hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programme complet des 12 modules */}
      <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5] border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Curriculum Détaillé
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              12 modules structurés : de la cellule au dashboard exécutif.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Une progression pédagogique progressive, pratique et immédiatement applicable en entreprise.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulesDetailed.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:border-[#00a86b] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400">{mod.duration}</span>
                  </div>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#008b58]">
                    Module {mod.num}
                  </p>
                  <h3 className="mt-1 font-serif text-base font-bold text-slate-950">{mod.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Résultats attendus */}
      <section id="projet" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Compétences Acquises
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Une preuve tangible de maîtrise exploitable dès demain.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#00a86b]" size={18} />
                <p className="text-sm font-semibold leading-relaxed text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloc Tarif & Accès */}
      <section id="prix" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5] border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-12 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <ShieldCheck size={14} /> Accès Professionnel Garanti
              </span>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                Maîtrisez Excel au standard de l’entreprise.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Paiement unique sans abonnement. Fichiers sources d’entraînement, cas pratiques réels, quiz d’évaluation, projet de portfolio et certificat KORYXA officiel vérifiable.
              </p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {["Accès complet à vie", "Fichiers Excel & CSV inclus", "Validation du projet final", "Certificat vérifiable"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#00a86b]" /> {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 text-center shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tarif Unique</p>
              <div className="mt-3 flex items-baseline justify-center gap-2">
                <span className="font-serif text-4xl font-black text-slate-950">39 000 FCFA</span>
                <span className="text-sm font-semibold text-slate-400 line-through">49 000 FCFA</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Paiement sécurisé via Mobile Money et carte bancaire</p>
              <PurchaseCourseLink
                courseSlug="excel-data-analyst"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#008b58]"
              >
                S’inscrire à la formation <ArrowRight size={16} />
              </PurchaseCourseLink>
              <Link
                href={courseRoutes.access("excel-data-analyst")}
                className="mt-2.5 inline-block text-xs font-semibold text-slate-500 hover:text-[#008b58] transition-colors"
              >
                Déjà inscrit ? Accéder à l&apos;espace apprenant →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Foire Aux Questions
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Questions fréquentes sur la formation Excel
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-base font-bold text-slate-900 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {q}
                    <span className="text-slate-400 transition group-open:rotate-45 text-xl font-bold">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 border-t border-slate-200/60 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
