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
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Table2,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "SQL Data Analyst avec PostgreSQL — KORYXA Formation",
  description: "Apprenez SQL, PostgreSQL, jointures, CTE, fonctions de fenêtre et vues analytiques avec un parcours pratique orienté métier.",
};

const modules = [
  "Découvrir SQL, PostgreSQL & l’environnement d’analyse",
  "Sélectionner, filtrer, trier et formater les résultats",
  "Calculer et transformer les valeurs (dates, chaînes, conditions)",
  "Agréger les données et calculer des métriques de synthèse",
  "Relier les tables avec les jointures sans fausser les calculs",
  "Utiliser les sous-requêtes scalaires et corrélées",
  "Structurer les analyses complexes avec les CTE (WITH)",
  "Analyser les tendances avec les fonctions de fenêtre (Window Functions)",
  "Créer des vues analytiques réutilisables",
  "Modifier les données en sécurité (INSERT, UPDATE, transactions)",
  "Optimiser l’exécution et sécuriser les requêtes (EXPLAIN, index)",
  "Connecter PostgreSQL à Power BI et automatiser les actualisations",
];

const outcomes = [
  "Concevoir un schéma relationnel clair et robuste",
  "Écrire des requêtes SELECT fiables, performantes et lisibles",
  "Relier plusieurs tables avec jointures maîtrisées",
  "Créer des KPI avancés avec agrégations, CTE et window functions",
  "Construire des vues analytiques sécurisées pour l’entreprise",
  "Connecter PostgreSQL à Power BI et documenter les pipelines",
];

export default function SqlDataAnalystLanding() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm">
            <Sparkles size={14} className="text-[#00a86b]" /> Parcours Professionnel SQL · Projet Certifiant
          </span>

          <h1 className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]">
            Interrogez vos données avec méthode et produisez des analyses fiables.
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center">
            Apprenez à concevoir une base relationnelle, écrire des requêtes SQL solides, structurer des CTE, manier les fonctions de fenêtre et connecter PostgreSQL à vos outils de reporting.
          </p>

          {/* Centered CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PurchaseCourseLink
              courseSlug="sql-data-analyst"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition hover:bg-[#008b58]"
            >
              Commencer la formation <ArrowRight size={16} />
            </PurchaseCourseLink>
            <a
              href="#programme"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dfe5d8] bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-[#faf9f5]"
            >
              <PlayCircle size={16} /> Voir le programme
            </a>
          </div>

          {/* Centered reassurance checkmarks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5"><LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat et à vie</span>
            <span className="inline-flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" /> 39 000 FCFA tarif unique</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#00a86b]" /> Certificat KORYXA inclus</span>
          </div>

          {/* Centered showcase card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfe5d8] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Projet final évalué</p>
                <h2 className="mt-1 text-2xl font-serif font-bold text-slate-950">Analyse commerciale d’une base PostgreSQL</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                Projet Portfolio
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Créez le schéma relationnel, chargez les données, rédigez les requêtes analytiques avec CTE et Window Functions, optimisez les index et exposez des vues prêtes pour Power BI.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Schéma relationnel & clés",
                "Chargement & typage des données",
                "Requêtes analytiques CTE/Window",
                "Vues connectées à Power BI",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-[#dfe5d8]">
              {[
                [Clock3, "26 h", "Volume de pratique"],
                [Layers3, "12", "Modules structurés"],
                [GraduationCap, "Certificat", "Inclus à la fin"],
              ].map(([Icon, value, label]) => {
                const ItemIcon = Icon as typeof Clock3;
                return (
                  <div key={label as string} className="rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3 text-center">
                    <ItemIcon size={16} className="mx-auto text-[#00a86b]" />
                    <p className="mt-1.5 text-base sm:text-lg font-bold text-slate-950">{value as string}</p>
                    <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi cette compétence compte */}
      <section id="importance" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <TrendingUp size={14} /> Le standard data
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              SQL donne un accès direct et reproductible aux données d’entreprise.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Les équipes finance, opérations et data ont besoin de requêtes fiables, lisibles et réutilisables. PostgreSQL permet de structurer les données et de préparer des sources solides pour l’analyse.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BriefcaseBusiness,
                title: "Compétence universelle",
                text: "SQL est le langage commun à toutes les bases de données et plateformes cloud (PostgreSQL, MySQL, BigQuery, Snowflake).",
              },
              {
                icon: Workflow,
                title: "Extractions reproductibles",
                text: "Un script SQL bien écrit s'exécute à la demande sans risque d'erreur humaine ou de copier-coller approximatif.",
              },
              {
                icon: Database,
                title: "Rigueur relationnelle",
                text: "Vous apprenez à maîtriser les jointures, les contraintes et l'intégrité référentielle pour des chiffres indiscutables.",
              },
              {
                icon: LineChart,
                title: "Analyses avancées",
                text: "Grâce aux CTE et fenêtres d'analyse, calculez des évolutions mois par mois, des rangs et des cohortes en quelques lignes.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programme complet */}
      <section id="programme" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
              <Layers3 size={14} /> Programme détaillé
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              De la base relationnelle à l’analyse SQL professionnelle.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              12 modules progressifs articulant théorie claire, requêtes réelles et exercices corrigés.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => (
              <article
                key={module}
                className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:border-[#00a86b]/40 hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                    Module {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">{module}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats attendus */}
      <section id="projet" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Gauge size={14} /> Compétences opérationnelles
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Vous repartez avec une base, des scripts et une analyse démontrables.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              À l’issue de la formation, vous saurez interroger n'importe quelle base SQL de production avec confiance et rigueur.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {outcomes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                <p className="text-sm font-semibold text-slate-800 leading-snug">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="prix" className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 border-t border-[#dfe5d8]">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58] shadow-sm">
            <Sparkles size={14} /> Tarif & Inscription
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Rejoignez le parcours SQL & PostgreSQL
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Acquérez le langage fondamental indispensable à tout analyste de données.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet au parcours</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">39 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">49 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Accès à vie garanti</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules complets du SELECT élémentaire aux fenêtres d'analyse",
                "Scripts SQL réels et jeux de données relationnels",
                "Guide des bonnes pratiques de modélisation et indexation",
                "Projet final portfolio noté sur 60 points",
                "Certificat de réussite officiel KORYXA",
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
                Commencer la formation <ArrowRight size={16} />
              </PurchaseCourseLink>
            </div>
            <p className="mt-4 text-xs text-slate-500">Paiement sécurisé via Mobile Money ou Carte Bancaire</p>
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
