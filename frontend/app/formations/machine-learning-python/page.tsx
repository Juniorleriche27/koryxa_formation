import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Gauge,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { courseRoutes } from "@/lib/courseConfig";

export const metadata: Metadata = {
  title: "Machine Learning avec Python — KORYXA Formation",
  description:
    "Apprenez à préparer les données, construire, comparer, optimiser et interpréter des modèles de Machine Learning avec Python et scikit-learn.",
  alternates: { canonical: "/formations/machine-learning-python" },
  openGraph: {
    title: "Machine Learning avec Python — KORYXA Formation",
    description:
      "Un parcours complet de 60 heures avec 12 modules, exercices, notebooks et projet final de prédiction du churn client.",
    type: "website",
    locale: "fr_FR",
  },
};

const modules = [
  "Workflow professionnel du Machine Learning",
  "Préparation des données pour le ML",
  "Feature engineering",
  "Régression supervisée",
  "Classification supervisée",
  "Arbres et méthodes d’ensemble",
  "Classes déséquilibrées et coûts métier",
  "Pipelines et validation sans fuite",
  "Optimisation des hyperparamètres",
  "Interprétabilité des modèles",
  "Analyse des erreurs et robustesse",
  "Sélection finale et restitution métier",
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Machine Learning avec Python",
  description:
    "Parcours professionnel pour préparer les données, entraîner, comparer, optimiser et interpréter des modèles avec Python et scikit-learn.",
  provider: { "@type": "EducationalOrganization", name: "KORYXA Formation" },
  courseMode: "online",
  inLanguage: "fr-FR",
  timeRequired: "PT60H",
};

export default function MachineLearningPythonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <main className="min-h-screen bg-[#f4f8f5] text-[#0b241b]">
        <header className="sticky top-0 z-50 border-b border-[#0b241b]/10 bg-[#f4f8f5]/90 backdrop-blur-xl">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/formations" className="flex items-center gap-3 font-black">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0b241b] text-emerald-300">ML</span>
              <span><span className="block text-[10px] uppercase tracking-[.18em] text-emerald-700">KORYXA Formation</span><span className="block text-sm">Machine Learning avec Python</span></span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-bold lg:flex" aria-label="Navigation de la formation">
              <a href="#programme">Programme</a><a href="#projet">Projet</a><a href="#competences">Compétences</a>
            </nav>
            <Link href={courseRoutes.access("machine-learning-python")} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0b241b] px-5 text-sm font-black text-white transition hover:bg-emerald-700">Accès apprenant</Link>
          </div>
        </header>

        <section className="relative overflow-hidden bg-[#071d16] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(52,211,153,.22),transparent_26rem),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Sparkles size={14}/> Parcours professionnel disponible</span>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[.95] tracking-[-.055em] sm:text-6xl lg:text-7xl">Construisez des modèles utiles, fiables et explicables.</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Maîtrisez le workflow complet du Machine Learning avec Python : préparation sans fuite, modèles supervisés, validation, optimisation, interprétabilité et restitution métier.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={courseRoutes.access("machine-learning-python")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-4 text-sm font-black text-[#071d16] transition hover:-translate-y-0.5 hover:bg-white">Accéder à la formation <ArrowRight size={17}/></Link>
                <a href="#programme" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[.06] px-6 py-4 text-sm font-black">Voir le programme</a>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[{icon:Clock3,label:"60 heures"},{icon:Layers3,label:"12 modules"},{icon:GraduationCap,label:"Certificat inclus"}].map(({icon:Icon,label})=><div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4"><Icon className="text-emerald-200" size={20}/><span className="text-sm font-bold">{label}</span></div>)}
              </div>
            </div>
            <aside className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
              <div className="rounded-[1.5rem] bg-[#f3fff8] p-6 text-[#0b241b]">
                <div className="flex items-center justify-between"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-emerald-800">Projet final</span><BrainCircuit className="text-emerald-700"/></div>
                <h2 className="mt-6 text-3xl font-black tracking-[-.04em]">Prédiction du churn client avec Python</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">Construisez un pipeline complet, comparez plusieurs modèles, choisissez un seuil métier, expliquez les prédictions et rédigez une model card.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">{["Dataset synthétique","Pipeline sklearn","Analyse SHAP","Model card"].map(item=><p key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-bold shadow-sm"><CheckCircle2 size={16} className="text-emerald-700"/>{item}</p>)}</div>
              </div>
            </aside>
          </div>
        </section>

        <section id="competences" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Compétences professionnelles</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">Du problème métier au modèle défendable.</h2><p className="mt-6 text-base leading-8 text-slate-600">Le parcours privilégie la rigueur expérimentale, la reproductibilité et la capacité à expliquer les résultats à une équipe métier.</p></div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[{icon:Database,title:"Préparer",text:"Nettoyage, encodage et feature engineering sans fuite."},{icon:Code2,title:"Modéliser",text:"Régression, classification, arbres et ensembles."},{icon:Gauge,title:"Évaluer",text:"Validation croisée, métriques, seuils et calibration."},{icon:ShieldCheck,title:"Expliquer",text:"Interprétabilité, robustesse, limites et model card."}].map(({icon:Icon,title,text})=><article key={title} className="rounded-[1.75rem] border border-emerald-900/10 bg-white p-6 shadow-sm"><Icon className="text-emerald-700"/><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.16em] text-emerald-700">Programme complet</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">12 modules pour maîtriser le workflow ML.</h2></div>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {modules.map((title,index)=><article key={title} className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-[#f8fbf9] p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b241b] text-sm font-black text-emerald-300">{String(index+1).padStart(2,"0")}</span><div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Leçons guidées, exercice pratique, ressources et validation.</p></div></article>)}
            </div>
          </div>
        </section>

        <section id="projet" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] bg-[#0b241b] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.8fr] lg:p-12">
            <div><span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Target size={15}/> Projet portfolio</span><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">Livrez une étude de churn complète et crédible.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-white/70">Vous partez d’un dataset synthétique, construisez une démarche reproductible, comparez plusieurs modèles et transformez les résultats en recommandations responsables.</p></div>
            <div className="grid gap-3">{["Notebook exécutable de bout en bout","Comparaison de plusieurs modèles","Choix de seuil coût-sensible","Analyse des erreurs et calibration","Interprétabilité globale et locale","Model card et synthèse exécutive"].map(item=><p key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4 text-sm font-bold"><CheckCircle2 className="text-emerald-300" size={18}/>{item}</p>)}</div>
          </div>
        </section>

        <section className="bg-emerald-200 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[.16em] text-emerald-900">Formation disponible</p><h2 className="mt-3 text-3xl font-black tracking-[-.04em] sm:text-4xl">Commencez votre parcours Machine Learning.</h2></div><Link href={courseRoutes.access("machine-learning-python")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b241b] px-7 py-4 text-sm font-black text-white transition hover:bg-emerald-800">Accéder à la formation <ArrowRight size={17}/></Link></div>
        </section>
      </main>
    </>
  );
}
