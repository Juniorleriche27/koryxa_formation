import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Layers3,
  LineChart,
  LockKeyhole,
  PieChart,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import { courseRoutes, STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

export const metadata: Metadata = {
  title: "Statistiques & Data Science avec Python — KORYXA Formation",
  description:
    "Maîtrisez les méthodes statistiques, l'analyse exploratoire, la segmentation client et la prévision de séries temporelles avec Python.",
  alternates: { canonical: "/formations/statistics-data-science-python" },
  openGraph: {
    title: "Statistiques & Data Science avec Python — KORYXA Formation",
    description:
      "Un parcours complet de 62 heures avec 12 modules, 24 leçons, notebooks guidés et projet final de prévision des ventes et segmentation client.",
    type: "website",
    locale: "fr_FR",
  },
};

const modules = [
  {
    num: "01",
    title: "Fondations du raisonnement statistique",
    desc: "Population, échantillon, variables, types de données, biais, causalité et démarche scientifique.",
    duration: "2h30",
  },
  {
    num: "02",
    title: "Statistiques descriptives avec Python",
    desc: "Mesures de tendance centrale, dispersion, position, forme et synthèse avec pandas et NumPy.",
    duration: "3h00",
  },
  {
    num: "03",
    title: "Visualiser les distributions",
    desc: "Histogrammes, boxplots, densité, valeurs atypiques, transformations et lecture critique.",
    duration: "3h00",
  },
  {
    num: "04",
    title: "Probabilités et variables aléatoires",
    desc: "Probabilités conditionnelles, indépendance, espérance, variance et lois usuelles.",
    duration: "3h00",
  },
  {
    num: "05",
    title: "Échantillonnage et estimation",
    desc: "Méthodes d’échantillonnage, erreur standard, bootstrap et intervalles de confiance.",
    duration: "3h00",
  },
  {
    num: "06",
    title: "Tests d’hypothèses",
    desc: "Hypothèses nulle et alternative, p-value, erreurs de type I et II, puissance et choix du test.",
    duration: "3h30",
  },
  {
    num: "07",
    title: "Comparer des groupes",
    desc: "Tests t, Mann-Whitney, ANOVA, chi-deux, tailles d’effet et comparaisons multiples.",
    duration: "3h30",
  },
  {
    num: "08",
    title: "Corrélation et régression linéaire",
    desc: "Covariance, Pearson, Spearman, régression simple et multiple, hypothèses et interprétation.",
    duration: "4h00",
  },
  {
    num: "09",
    title: "Segmentation des clients",
    desc: "Préparation des variables, standardisation, K-means, choix du nombre de groupes et profilage.",
    duration: "4h00",
  },
  {
    num: "10",
    title: "Prévision des ventes",
    desc: "Séries temporelles, tendance, saisonnalité, validation temporelle, baseline et modèles de prévision.",
    duration: "4h30",
  },
  {
    num: "11",
    title: "Évaluer et interpréter les modèles",
    desc: "Séparation train/test, validation croisée, métriques, surapprentissage, importance et limites.",
    duration: "4h00",
  },
  {
    num: "12",
    title: "Communiquer une étude data science",
    desc: "Reproductibilité, notebook professionnel, narration analytique, recommandations, éthique et remise du projet.",
    duration: "4h00",
  },
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Statistiques & Data Science avec Python",
  description:
    "Parcours professionnel pour comprendre les méthodes statistiques, explorer les données, construire des modèles explicatifs et produire des recommandations métier avec Python.",
  provider: { "@type": "EducationalOrganization", name: "KORYXA Formation" },
  courseMode: "online",
  inLanguage: "fr-FR",
  timeRequired: "PT62H",
};

export default function StatisticsDataSciencePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white px-4 py-2 text-xs font-bold text-[#008b58] shadow-sm">
              <Sparkles size={14} className="text-[#00a86b]" /> Parcours Professionnel Data Science · Projet Certifiant
            </span>

            <h1 className="mt-6 max-w-4xl mx-auto font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 text-center leading-[1.08]">
              Prenez des décisions défendables grâce aux statistiques.
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600 text-center">
              Passez de simples graphiques à des analyses rigoureuses : distributions, tests d’hypothèses, régression, segmentation client et prévision des ventes avec Python.
            </p>

            {/* Centered CTA row */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <PurchaseCourseLink
                courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG}
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
              <span className="inline-flex items-center gap-1.5"><Star size={15} className="text-amber-500 fill-amber-500" /> 49 000 FCFA tarif unique</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-[#00a86b]" /> Certificat officiel inclus</span>
            </div>

            {/* Centered showcase card */}
            <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dfe5d8] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008b58]">Projet final certifiant</p>
                  <h2 className="mt-1 text-2xl font-serif font-bold text-slate-950">Prévision des ventes & Segmentation clients</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a86b]/10 px-3.5 py-1.5 text-xs font-bold text-[#008b58]">
                  Projet Portfolio
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Audit statistique complet, segmentation K-means des profils d’acheteurs, modélisation temporelle des ventes et recommandations d’optimisation métier.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Audit & nettoyage statistique",
                  "Intervalles de confiance & tests",
                  "Segmentation clients K-means",
                  "Prévision temporelle de ventes",
                  "Notebook reproductible & rapport",
                  "Recommandations exécutives",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl border border-[#dfe5d8] bg-[#faf9f5] p-3.5">
                    <CheckCircle2 size={16} className="shrink-0 text-[#00a86b]" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 pt-5 border-t border-[#dfe5d8]">
                {[
                  [Clock3, "62 h", "Volume de pratique"],
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

        {/* Compétences clés */}
        <section id="competences" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <TrendingUp size={14} /> Méthodologie scientifique
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Du raisonnement statistique aux modèles data science.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                La data science ne consiste pas à appliquer des algorithmes aveuglément. Ce parcours vous apprend à cadrer le problème, vérifier les hypothèses et communiquer des résultats solides.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BarChart3, title: "Explorer & Décrire", text: "Mesures de tendance, dispersion, asymétrie, boxplots et détection d'outliers." },
                { icon: ShieldCheck, title: "Tester & Inférer", text: "Tests d'hypothèses (t-test, ANOVA, chi2), p-values, bootstrap et intervalles de confiance." },
                { icon: PieChart, title: "Segmenter", text: "Préparation des variables, réduction de dimension, clustering K-means et profilage métier." },
                { icon: TrendingUp, title: "Prédire & Évaluer", text: "Régression linéaire, séries temporelles, cross-validation et métriques d'erreur." },
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
                <Layers3 size={14} /> Programme complet
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                12 modules progressifs avec cas d’usage réels.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Chaque module combine concepts théoriques, notebooks guidés avec Python/pandas/scipy/scikit-learn et validation par quiz.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {modules.map(({ num, title, desc, duration }) => (
                <article
                  key={num}
                  className="group flex flex-col justify-between rounded-2xl border border-[#dfe5d8] bg-white p-6 shadow-sm transition hover:border-[#00a86b]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#008b58]">
                        Module {num}
                      </span>
                      <span className="rounded-full border border-emerald-200 bg-[#00a86b]/10 px-2.5 py-0.5 text-xs font-bold text-[#008b58]">
                        {duration}
                      </span>
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projet portfolio */}
        <section id="projet" className="bg-white px-4 py-20 sm:px-6 lg:px-8 border-b border-[#dfe5d8]">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                <Target size={14} /> Projet portfolio
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Construisez une étude data science complète.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous réalisez un projet autonome estimé à 20 heures : audit des données commerciales, identification des moteurs de vente, segmentation des clients et prévision temporelle du chiffre d’affaires.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                "Audit des données, valeurs manquantes & valeurs aberrantes",
                "Tests d'hypothèses sur les performances régionales",
                "Modélisation de régression explicative",
                "Clustering K-means et caractérisation des segments",
                "Prévision temporelle avec validation sans fuite",
                "Rapport exécutif et notebook reproductible",
              ].map((item) => (
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
              <GraduationCap size={14} /> Formation complète
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Rejoignez le parcours Statistiques & Data Science
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              12 modules, 24 leçons guidées, notebooks interactifs, projet portfolio évalué et certificat officiel KORYXA.
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
                  "12 modules progressifs et 24 notebooks interactifs",
                  "Bibliothèques Python : pandas, NumPy, scipy, scikit-learn, statsmodels",
                  "Étude statistique et prédictive complète pour votre portfolio",
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
                  courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG}
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
    </>
  );
}
