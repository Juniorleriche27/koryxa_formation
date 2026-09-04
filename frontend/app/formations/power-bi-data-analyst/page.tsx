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
  title: "Power BI Data Analyst — KORYXA Formation",
  description: "Apprenez Power BI, Power Query, modélisation DAX et les rapports interactifs professionnels avec un parcours pratique orienté métier.",
};

const modules = [
  "Découvrir Power BI & l'écosystème décisionnel",
  "Nettoyer et transformer avec Power Query",
  "Consolider plusieurs sources de données",
  "Construire un modèle en étoile sans ambiguïté",
  "Créer une table calendrier et temporalités",
  "Écrire les premières mesures DAX",
  "Construire des KPI métier avancés",
  "Analyser les évolutions temporelles & comparatifs",
  "Créer des visualisations claires et efficaces",
  "Assembler un rapport multi-pages professionnel",
  "Publier et collaborer dans Power BI Service",
  "Sécuriser les accès (RLS), optimiser et documenter",
];

const outcomes = [
  "Préparer et consolider plusieurs sources avec Power Query",
  "Construire un modèle en étoile sans ambiguïté",
  "Créer des mesures DAX et KPI fiables pour la direction",
  "Concevoir un rapport multi-pages interactif et dynamique",
  "Configurer une vue mobile et des accès sécurisés (RLS)",
  "Présenter des recommandations stratégiques fondées sur la data",
];

export default function PowerBiDataAnalystLanding() {
  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm">
            <Sparkles size={14} className="text-[#00a86b]" /> Parcours Professionnel Power BI · Projet Certifiant
          </span>

          <h1 className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]">
            Transformez vos données en décisions avec Power BI.
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center">
            Apprenez à préparer les données brutes avec Power Query, construire un modèle en étoile robuste, formuler des mesures DAX précises et concevoir des rapports de pilotage interactifs prêts pour l’entreprise.
          </p>

          {/* Centered CTA row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PurchaseCourseLink
              courseSlug="power-bi-data-analyst"
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
            <span className="inline-flex items-center gap-1.5"><LockKeyhole size={15} className="text-[#00a86b]" /> Accès immédiat et illimité</span>
            <span className="inline-flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" /> 49 000 FCFA tarif unique</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#00a86b]" /> Certificat de réussite inclus</span>
          </div>

          {/* Centered showcase card */}
          <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfe5d8] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Projet final évalué</p>
                <h2 className="mt-1 text-2xl font-serif font-bold text-slate-950">Rapport de pilotage commercial Power BI</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                Projet Portfolio
              </span>
            </div>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Consolidez plusieurs sources de vente, construisez un modèle en étoile relationnel, rédigez des formules DAX de rentabilité et concevez un tableau de bord multi-pages avec filtres dynamiques.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "4 jeux de données CSV & Excel",
                "Ingestion Power Query propre",
                "Modèle en étoile & calendrier",
                "Rapport interactif multi-pages",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                  <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-[#dfe5d8]">
              {[
                [Clock3, "30 h", "Volume de pratique"],
                [Layers3, "12", "Modules pas-à-pas"],
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
              <TrendingUp size={14} /> Valeur Marché
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Power BI transforme les données dispersées en pilotage stratégique.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Les directions et équipes métier ont besoin de rapports fiables, actualisables et sécurisés. Power BI structure les sources, centralise les KPI et crée une lecture unifiée de la performance.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BriefcaseBusiness,
                title: "Compétence immédiatement utile",
                text: "Les entreprises recherchent des analystes capables de concevoir rapidement des tableaux de bord fiables et ergonomiques.",
              },
              {
                icon: Workflow,
                title: "Automatisation concrète",
                text: "Power Query supprime les tâches manuelles répétitives et rend chaque actualisation mensuelle 100% reproductible.",
              },
              {
                icon: Database,
                title: "Données mieux modélisées",
                text: "Vous apprenez à structurer des modèles relationnels solides qui ne ralentissent pas quand le volume grandit.",
              },
              {
                icon: LineChart,
                title: "Décisions stratégiques",
                text: "Les KPI visuels transforment les chiffres bruts en alertes opérationnelles et leviers de croissance concrets.",
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
              De la donnée brute au rapport Power BI interactif.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              12 modules structurés avec exercices pratiques et livrables pour monter en puissance pas-à-pas.
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
              Vous repartez avec un rapport démontrable et exploitable.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              À l’issue de la formation, vous saurez concevoir des tableaux de bord Power BI de niveau entreprise.
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
            <Sparkles size={14} /> Tarif & Accès
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
            Rejoignez le parcours Power BI
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Acquérez la compétence la plus demandée en business intelligence.
          </p>

          <div className="mt-8 rounded-3xl border border-[#dfe5d8] bg-white p-8 sm:p-10 shadow-xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#008b58]">Accès complet au parcours</p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">49 000 FCFA</span>
              <span className="text-base sm:text-lg font-medium text-slate-400 line-through">59 000 FCFA</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-[#008b58]">Paiement unique · Accès à vie garanti</p>

            <div className="mt-6 space-y-3 text-left border-t border-[#dfe5d8] pt-6">
              {[
                "12 modules progressifs de Power Query au cloud",
                "Fichiers d'exercice Excel et CSV réels",
                "Guide de syntaxe DAX et bonnes pratiques de modélisation",
                "Projet final portfolio noté sur 60 points",
                "Certificat d'achèvement officiel KORYXA",
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
