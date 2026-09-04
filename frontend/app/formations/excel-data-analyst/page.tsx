import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Database,
  FileSpreadsheet,
  Gauge,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Table2,
  Workflow,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";

import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Excel Data Analyst — KORYXA Formation",
  description: "Apprenez Excel, Power Query, Power Pivot et les dashboards professionnels avec un parcours pratique orienté métier.",
};

const modules = [
  "Prendre en main Excel & automatisation",
  "Calculs et formules essentielles avancées",
  "Organiser et nettoyer des données brutes",
  "Fonctions de recherche (XLOOKUP, INDEX/MATCH)",
  "Manipuler le texte et les formats dates",
  "Analyse conditionnelle & règles d'alerte",
  "Tableaux croisés dynamiques (TCD) avancés",
  "Graphiques de direction et visualisation",
  "Power Query & transformation automatisée",
  "Modèle relationnel et Power Pivot",
  "Conception d'un dashboard de direction",
  "Automatisation, contrôles et audit qualité",
];

const outcomes = [
  "Nettoyer et fiabiliser des données métier volumineuses",
  "Automatiser les flux d'imports répétitifs avec Power Query",
  "Construire des KPI exécutifs et des tableaux croisés dynamiques",
  "Créer un modèle relationnel robuste avec Power Pivot",
  "Livrer un Dashboard commercial actualisable en 1 clic",
  "Présenter des analyses défendables devant la direction",
];

export default function ExcelDataAnalystLanding() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section Centrée */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
            <Sparkles size={14} /> Parcours Professionnel Certifiant • Écosystème KORYXA
          </span>

          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-black leading-[1.08] tracking-tight text-slate-950 max-w-4xl mx-auto">
            Transformez Excel en véritable<br />
            <em className="text-[#00a86b] not-italic">outil d’analyse et de décision.</em>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Apprenez à nettoyer des données, automatiser les imports avec Power Query, modéliser avec Power Pivot et livrer un dashboard de direction interactif.
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
              Voir le programme
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
              <GraduationCap size={16} className="text-[#00a86b]" /> Certificat officiel KORYXA
            </span>
          </div>

          {/* Carte Vitrine Projet Final */}
          <div className="relative mx-auto mt-12 sm:mt-16 w-full max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">Projet Certifiant de Sortie</span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-950">Dashboard commercial &amp; financier actualisable</h2>
                  </div>
                </div>
                <span className="rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3 py-1 text-xs font-bold text-[#008b58]">
                  Cas Réel d’Entreprise
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                Consolidez plusieurs fichiers CSV de ventes, automatisez l’ingestion et le nettoyage via Power Query, construisez le modèle relationnel dans Power Pivot, calculez les marges et livrez un tableau de bord exécutif prêt à l’emploi.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["4 Fichiers sources réels", "Pipeline Power Query", "Modèle Power Pivot", "Dashboard interactif"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs font-semibold text-slate-800">
                    <CheckCircle2 size={16} className="text-[#00a86b] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              Finance, commerce, opérations, RH et gestion reposent quotidiennement sur Excel. La valeur se crée en passant d&apos;une utilisation manuelle fragile à une maîtrise automatisée et rigoureuse.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              { icon: BriefcaseBusiness, title: "Compétence immédiatement rentable", text: "Les recruteurs recherchent des collaborateurs capables de produire des analyses exactes sans délais." },
              { icon: Workflow, title: "Automatisation concrète", text: "Power Query supprime les tâches répétitives et actualise vos données en un seul clic." },
              { icon: Database, title: "Données consolidées & fiables", text: "Apprenez à nettoyer, relier et contrôler plusieurs sources hétérogènes sans erreurs." },
              { icon: LineChart, title: "Recommandations éclairées", text: "Les KPI et graphiques synthétiques transforment les chiffres bruts en décisions stratégiques." },
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

      {/* Programme complet */}
      <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5] border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Curriculum Détaillé
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              12 modules structurés : de la cellule au dashboard exécutif.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <article key={module} className="rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm transition hover:border-[#00a86b] hover:shadow-md">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#008b58]">MODULE {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-base font-bold text-slate-950">{module}</h3>
              </article>
            ))}
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
      <section id="prix" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5]">
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

      <FooterSEO />
    </main>
  );
}
