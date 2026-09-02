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
  PieChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { courseRoutes, STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG } from "@/lib/courseConfig";
import PurchaseCourseLink from "@/components/commerce/PurchaseCourseLink";

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
  const accessUrl = courseRoutes.access(STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
        <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-[#f8fafc]/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/formations" className="flex items-center gap-3 font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f172a] text-amber-300">ST</span>
              <span>
                <span className="block text-[10px] uppercase tracking-[.18em] text-amber-700">KORYXA Formation</span>
                <span className="block text-sm">Statistiques & Data Science avec Python</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-bold lg:flex" aria-label="Navigation de la formation">
              <a href="#programme" className="transition hover:text-amber-600">Programme</a>
              <a href="#competences" className="transition hover:text-amber-600">Compétences</a>
              <a href="#projet" className="transition hover:text-amber-600">Projet</a>
              <a href="#prix" className="transition hover:text-amber-600">Tarif</a>
            </nav>
            <Link href={accessUrl} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f172a] px-5 text-sm font-black text-white transition hover:bg-amber-600">
              Accès apprenant
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#0a1120] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(245,158,11,.18),transparent_28rem),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-amber-200">
                <Sparkles size={14} /> Parcours professionnel disponible
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-7xl">
                Prenez des décisions défendables grâce aux statistiques.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Passez de simples graphiques à des analyses rigoureuses : distributions, tests d&apos;hypothèses, régression, segmentation client et prévision des ventes avec Python.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PurchaseCourseLink courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-[#0a1120] transition hover:-translate-y-0.5 hover:bg-amber-300">
                  Commencer la formation <ArrowRight size={17} />
                </PurchaseCourseLink>
                <a href="#programme" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[.06] px-6 py-4 text-sm font-black text-white transition hover:bg-white/10">
                  Voir le programme
                </a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[{ icon: Clock3, label: "62 heures" }, { icon: Layers3, label: "12 modules" }, { icon: GraduationCap, label: "Certificat inclus" }].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4">
                    <Icon className="text-amber-300" size={20} />
                    <span className="text-sm font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
              <div className="rounded-[1.5rem] bg-[#fffbeb] p-6 text-[#451a03]">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-amber-900">Projet final</span>
                  <LineChart className="text-amber-700" />
                </div>
                <h2 className="mt-6 text-2xl font-black tracking-[-.04em]">Prévision des ventes & Segmentation clients</h2>
                <p className="mt-4 text-sm leading-7 text-amber-950/80">
                  Audit statistique complet, segmentation K-means des profils d&apos;acheteurs, modélisation temporelle des ventes et recommandations d&apos;optimisation métier.
                </p>
                <div className="mt-6 space-y-2.5">
                  {["Audit & nettoyage statistique", "Intervalles de confiance & tests", "Segmentation clients K-means", "Prévision temporelle de ventes", "Notebook reproductible & rapport"].map((item) => (
                    <p key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs font-bold text-slate-900 shadow-sm">
                      <CheckCircle2 size={16} className="text-amber-600" /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="competences" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[.16em] text-amber-700">Compétences clés</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">Du raisonnement statistique aux modèles data science.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600">
                La data science ne consiste pas à appliquer des algorithmes aveuglément. Ce parcours vous apprend à cadrer le problème, vérifier les hypothèses et communiquer des résultats solides.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: BarChart3, title: "Explorer & Décrire", text: "Mesures de tendance, dispersion, asymétrie, boxplots et détection d'outliers." },
                { icon: ShieldCheck, title: "Tester & Inférer", text: "Tests d'hypothèses (t-test, ANOVA, chi2), p-values, bootstrap et intervalles de confiance." },
                { icon: PieChart, title: "Segmenter", text: "Préparation des variables, réduction de dimension, clustering K-means et profilage métier." },
                { icon: TrendingUp, title: "Prédire & Évaluer", text: "Régression linéaire, séries temporelles, cross-validation et métriques d'erreur." },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-sm">
                  <Icon className="text-amber-600" size={28} />
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[.16em] text-amber-700">Programme complet</span>
              <h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">12 modules progressifs avec cas d&apos;usage réels.</h2>
              <p className="mt-4 text-slate-600">Chaque module combine concepts théoriques, notebooks guidés avec Python/pandas/scipy/scikit-learn et validation par quiz.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {modules.map(({ num, title, desc, duration }) => (
                <article key={num} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-[#fefdfa] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0a1120] text-sm font-black text-amber-300">
                    {num}
                  </span>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-black text-slate-900">{title}</h3>
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">{duration}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projet" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] bg-[#0a1120] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-12">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-amber-300"><Target size={15} /> Projet portfolio</span>
              <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">Construisez une étude data science complète.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                Vous réalisez un projet autonome estimé à 20 heures : audit des données commerciales, identification des moteurs de vente, segmentation des clients pour cibler les campagnes, et prévision temporelle du chiffre d&apos;affaires.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                "Audit des données, valeurs manquantes & valeurs aberrantes",
                "Tests d'hypothèses sur les performances régionales",
                "Modélisation de régression explicative",
                "Clustering K-means et caractérisation des segments",
                "Prévision temporelle avec validation sans fuite",
                "Rapport exécutif et notebook reproductible",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4 text-sm font-bold">
                  <CheckCircle2 className="text-amber-300" size={18} /> {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="prix" className="bg-[#f8fafc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-amber-800">
                  <GraduationCap size={14} /> Formation complète
                </span>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Accédez à l&apos;intégralité du parcours Statistiques & Data Science.
                </h2>
                <p className="mt-4 text-slate-600">
                  12 modules, 24 leçons guidées, notebooks interactifs, projet portfolio évalué et certificat officiel KORYXA.
                </p>
                <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {["12 modules progressifs", "Notebooks interactifs", "Projet portfolio complet", "Certificat vérifiable"].map((item) => (
                    <p key={item} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <CheckCircle2 size={16} className="text-amber-600" /> {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-[#0a1120] p-6 text-white shadow-2xl">
                <p className="text-xs font-black uppercase tracking-[.18em] text-amber-300">Tarif de formation</p>
                <p className="mt-4 text-4xl font-black tracking-tight">49 000 FCFA</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm font-bold text-slate-400 line-through">59 000 FCFA</span>
                  <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-amber-300">Offre actuelle</span>
                </div>
                <p className="mt-4 text-xs font-medium leading-5 text-slate-300">
                  Paiement unique sécurisé. Accès immédiat aux cours, notebooks et certificat.
                </p>
                <PurchaseCourseLink courseSlug={STATISTICS_DATA_SCIENCE_PYTHON_COURSE_SLUG} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-4 text-sm font-black text-[#0a1120] transition hover:bg-amber-300">
                  Commencer la formation <ArrowRight size={17} />
                </PurchaseCourseLink>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
