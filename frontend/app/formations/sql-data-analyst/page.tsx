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

export const metadata = {
  title: "SQL Data Analyst avec PostgreSQL — KORYXA Formation",
  description: "Apprenez SQL, PostgreSQL, jointures, CTE, fonctions de fenêtre et vues analytiques avec un parcours pratique orienté métier.",
};

const modules = [
  "Découvrir SQL et PostgreSQL",
  "Sélectionner, filtrer et trier",
  "Calculer et transformer les valeurs",
  "Agréger les données",
  "Relier les tables avec les jointures",
  "Utiliser les sous-requêtes",
  "Structurer les analyses avec les CTE",
  "Analyser avec les fonctions de fenêtre",
  "Créer des vues analytiques",
  "Modifier les données en sécurité",
  "Optimiser et sécuriser les requêtes",
  "Connecter PostgreSQL à Power BI",
];

const outcomes = [
  "Concevoir un schéma relationnel clair",
  "Écrire des requêtes SELECT fiables et lisibles",
  "Relier plusieurs tables sans fausser les résultats",
  "Créer des KPI avec agrégations, CTE et fenêtres",
  "Construire des vues analytiques sécurisées",
  "Connecter PostgreSQL à Power BI et documenter l’actualisation",
];

export default function ExcelDataAnalystLanding() {
  return (
    <main className="min-h-screen bg-[#f4f7f2] text-[#10251d]">
      <header className="sticky top-0 z-50 border-b border-[#10251d]/10 bg-[#f4f7f2]/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/formations" className="flex items-center gap-3 font-black">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f6b3f] text-white">X</span>
            <span><span className="block text-[10px] uppercase tracking-[.18em] text-[#0f6b3f]">KORYXA Formation</span><span className="block text-sm">SQL Data Analyst avec PostgreSQL</span></span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold lg:flex">
            <a href="#importance">Pourquoi SQL et PostgreSQL</a><a href="#programme">Programme</a><a href="#projet">Projet</a><a href="#prix">Prix</a>
          </nav>
          <Link href={courseRoutes.access("sql-data-analyst")} className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#10251d] px-5 text-sm font-black text-white transition hover:bg-[#0f6b3f]">Accès apprenant</Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#10251d] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.75fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><Sparkles size={14}/> Parcours professionnel SQL</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[.96] tracking-[-.055em] sm:text-6xl lg:text-7xl">Interrogez vos données avec méthode et produisez des analyses fiables.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Apprenez à concevoir une base relationnelle, écrire des requêtes SQL fiables, créer des vues analytiques et connecter PostgreSQL à Power BI.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={courseRoutes.access("sql-data-analyst")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-4 text-sm font-black text-[#10251d] transition hover:-translate-y-0.5 hover:bg-white">Accéder à la formation <ArrowRight size={17}/></Link>
              <a href="#programme" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[.06] px-6 py-4 text-sm font-black text-white">Voir le programme</a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[{icon:Clock3,label:"26 heures"},{icon:Layers3,label:"12 modules"},{icon:GraduationCap,label:"Certificat inclus"}].map(({icon:Icon,label})=><div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.06] p-4"><Icon className="text-emerald-200" size={20}/><span className="text-sm font-bold">{label}</span></div>)}
            </div>
          </div>
          <aside className="rounded-[2rem] border border-white/10 bg-white/[.07] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-7">
            <div className="rounded-[1.5rem] bg-[#f5fff8] p-6 text-[#10251d]">
              <div className="flex items-center justify-between"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-emerald-800">Projet final</span><FileSpreadsheet className="text-emerald-700"/></div>
              <h2 className="mt-6 text-3xl font-black tracking-[-.04em]">Analyse commerciale d’une base PostgreSQL</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">Créez le schéma, chargez les données, écrivez les requêtes analytiques, optimisez les accès et exposez des vues prêtes pour Power BI.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{["4 fichiers CSV","Power Query","Modèle relationnel","Analyse SQL exploitable"].map(item=><p key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-bold shadow-sm"><CheckCircle2 size={16} className="text-emerald-700"/>{item}</p>)}</div>
            </div>
          </aside>
        </div>
      </section>

      <section id="importance" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div><span className="text-xs font-black uppercase tracking-[.16em] text-[#0f6b3f]">Pourquoi cette compétence compte</span><h2 className="mt-5 text-4xl font-black leading-[1] tracking-[-.05em] sm:text-5xl">SQL donne un accès direct, contrôlé et reproductible aux données de l’entreprise.</h2><p className="mt-6 text-base leading-8 text-slate-600">Les équipes finance, commerce, opérations et data ont besoin de requêtes fiables, lisibles et réutilisables. PostgreSQL permet de structurer les données, contrôler leur qualité et préparer des sources solides pour l’analyse et le reporting.</p></div>
            <div className="grid gap-5 sm:grid-cols-2">
              {[{icon:BriefcaseBusiness,title:"Compétence immédiatement utile",text:"Les entreprises attendent des profils capables de produire vite des analyses fiables."},{icon:Workflow,title:"Automatisation concrète",text:"Power Query réduit les tâches répétitives et rend les mises à jour reproductibles."},{icon:Database,title:"Données mieux structurées",text:"Vous apprenez à nettoyer, relier et contrôler plusieurs sources."},{icon:LineChart,title:"Décisions plus claires",text:"Les KPI et dashboards transforment les chiffres en recommandations actionnables."}].map(({icon:Icon,title,text})=><article key={title} className="rounded-[1.75rem] border border-[#10251d]/10 bg-white p-6 shadow-sm"><Icon className="text-[#0f6b3f]"/><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="programme" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl"><span className="text-xs font-black uppercase tracking-[.16em] text-[#0f6b3f]">Programme complet</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">De la base relationnelle à l’analyse SQL professionnelle.</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{modules.map((module,index)=><article key={module} className="rounded-[1.5rem] border border-[#10251d]/10 bg-[#f7faf6] p-5"><span className="text-xs font-black text-[#0f6b3f]">MODULE {String(index+1).padStart(2,"0")}</span><h3 className="mt-3 text-lg font-black">{module}</h3></article>)}</div>
        </div>
      </section>

      <section id="projet" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <div><span className="text-xs font-black uppercase tracking-[.16em] text-[#0f6b3f]">Résultats attendus</span><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-5xl">Vous repartez avec une base, des scripts et une analyse démontrables.</h2><div className="mt-8 grid gap-3">{outcomes.map(item=><p key={item} className="flex items-start gap-3 rounded-2xl bg-white p-4 font-bold shadow-sm"><CheckCircle2 className="mt-0.5 shrink-0 text-[#0f6b3f]" size={19}/>{item}</p>)}</div></div>
          <aside className="rounded-[2rem] bg-[#0f6b3f] p-7 text-white sm:p-9"><Gauge className="text-emerald-200"/><h3 className="mt-6 text-3xl font-black">Un parcours pensé pour l’analyse métier.</h3><p className="mt-4 leading-8 text-emerald-50/80">Analyste, contrôleur, chargé d’opérations, commercial ou entrepreneur : vous apprenez à interroger les données sans dépendre de manipulations manuelles fragiles.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{["12 exercices","24 leçons","12 quiz","Projet sur 60 points"].map(x=><div key={x} className="rounded-xl bg-white/10 p-4 text-sm font-black">{x}</div>)}</div></aside>
        </div>
      </section>

      <section id="prix" className="bg-[#10251d] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/[.06] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-emerald-200"><ShieldCheck size={15}/> Accès sécurisé</span><h2 className="mt-4 text-4xl font-black tracking-[-.04em]">39 000 FCFA</h2><div className="mt-2 flex flex-wrap items-center gap-3"><span className="text-sm font-bold text-slate-400 line-through">49 000 FCFA</span><span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-[#10251d]">Tarif de lancement</span></div><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Paiement unique. Leçons, scripts SQL, fichiers CSV et ressources PostgreSQL officielles, exercices, projet final et certificat inclus.</p></div>
          <Link href={courseRoutes.access("sql-data-analyst")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-6 py-4 text-sm font-black text-[#10251d] transition hover:bg-white">Accéder au parcours <ArrowRight size={17}/></Link>
        </div>
      </section>
    </main>
  );
}
