"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Code2,
  Database,
  FileCode2,
  GraduationCap,
  LineChart,
  LockKeyhole,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Header, FooterSEO } from "@/components/marketing/KoryxaFormationPortal";

const LEARNER_ACCESS_URL = "/access?course=python-data-analyst";
const PURCHASE_URL = "/checkout?course=python-data-analyst";

const words = ["Data Analyst", "analyste métier", "profil data", "portfolio solide"];
const skills = ["Python", "Pandas", "NumPy", "Matplotlib", "Data Cleaning", "EDA", "Dashboard", "Portfolio", "Certificat"];

const modules = [
  { title: "Installation & notebooks", desc: "Anaconda, Jupyter et environnement de travail.", icon: FileCode2 },
  { title: "Bases de Python", desc: "Variables, conditions, boucles et fonctions.", icon: Code2 },
  { title: "NumPy", desc: "Calcul numérique, tableaux et opérations rapides.", icon: Database },
  { title: "Pandas", desc: "Importer, nettoyer et transformer des données.", icon: BookOpen },
  { title: "Visualisation", desc: "Graphiques propres avec une lecture métier.", icon: BarChart3 },
  { title: "Projet portfolio", desc: "Cas complet, restitution et certificat.", icon: Award },
];

const benefits = [
  "Une progression claire pour apprendre sans te perdre.",
  "Des notebooks réels, pas seulement des vidéos à regarder.",
  "Un assistant IA pour expliquer le code quand tu bloques.",
  "Un projet final qui te donne une preuve concrète de compétence.",
];

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Formation Python Data Analyst",
  description:
    "Formation pratique pour apprendre Python, Pandas, le nettoyage de données, la visualisation, l’analyse exploratoire et construire un projet portfolio.",
  provider: {
    "@type": "EducationalOrganization",
    name: "KORYXA Formation",
    url: "https://formation.koryxa.fr",
  },
  educationalCredentialAwarded: "Certificat KORYXA Formation",
  courseMode: "online",
  timeRequired: "PT90H",
  inLanguage: "fr-FR",
  offers: {
    "@type": "Offer",
    price: "29000",
    priceCurrency: "XOF",
    availability: "https://schema.org/LimitedAvailability",
    url: "https://formation.koryxa.fr/formations/python-data-analyst",
  },
};

const faqs = [
  ["Je peux commencer même si je débute ?", "Oui. Le parcours commence par l’installation et les bases avant d’aller vers Pandas, l’analyse et le projet."],
  ["J’ai déjà un accès, comment entrer ?", "Utilise le bouton Espace apprenant. La plateforme vérifie ton accès et t’envoie vers ton espace de formation."],
  ["La vidéo d’introduction reste disponible ?", "Oui. Le module 0 est visible sur la landing pour comprendre l’expérience avant de commencer."],
  ["Le certificat est inclus ?", "Oui, le certificat fait partie du parcours de complétion."],
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
      <motion.div className="flex w-max gap-4 whitespace-nowrap" animate={{ x: [0, -560] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
          <span key={`${skill}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a86b]" /> {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ProductStage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="relative mx-auto mt-12 w-full max-w-5xl"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white p-6 sm:p-8 shadow-xl text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-[#00a86b]" />
            <span className="ml-2 font-mono text-xs font-bold text-slate-400">KORYXA Learning Kernel</span>
          </div>
          <span className="rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3 py-0.5 text-xs font-bold text-[#008b58]">
            Environnement Interactif
          </span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-[#00a86b]/15 px-3 py-1 text-xs font-bold text-[#008b58]">Module 4 · Pandas</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Progression : 52%</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">Analyse de ventes avec Python &amp; Pandas</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Nettoyez un jeu de données réel, calculez le chiffre d’affaires consolidé, visualisez les marges et formulez des recommandations d’affaires.</p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-slate-100 shadow-inner">
              <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-2.5 font-mono text-xs text-slate-400">
                analyse_ventes.ipynb
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-200"><code>{`import pandas as pd

# 1. Chargement et déduplication des données de ventes
ventes = pd.read_csv("ventes_koryxa.csv")
ventes = ventes.drop_duplicates()

# 2. Agrégation par gamme de produit et chiffre d'affaires
ca = ventes.groupby("produit")["total"].sum()
ca.sort_values(ascending=True).plot(kind="barh", color="#00a86b")`}</code></pre>
              <div className="border-t border-slate-800 bg-[#00a86b]/20 px-4 py-3 font-mono text-xs font-bold text-[#86efac]">
                ✓ Graphique généré avec succès · Insights prêts pour le comité de direction
              </div>
            </div>
          </div>

          <aside className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Plan d&apos;action du module</p>
              <div className="mt-4 space-y-2.5">
                {["Comprendre le cas métier", "Exécuter le notebook en ligne", "Valider les acquis au quiz", "Obtenir le feedback IA"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${index < 2 ? "bg-[#00a86b]/15 text-[#008b58]" : "bg-slate-100 text-slate-600"}`}>
                      {index < 2 ? <CheckCircle2 size={15} /> : index + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-[#00a86b]/20 bg-[#00a86b]/10 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-[#008b58]">
                <Sparkles size={14} /> Assistant Pédagogique IA
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Vous guide sur la syntaxe, explique les erreurs et valide votre raisonnement analytique.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [purchaseUrl, setPurchaseUrl] = useState(PURCHASE_URL);

  useEffect(() => {
    const partnerRef = new URLSearchParams(window.location.search).get("ref")?.trim();
    if (partnerRef) {
      setPurchaseUrl(`${PURCHASE_URL}&ref=${encodeURIComponent(partnerRef)}`);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#faf9f5] text-slate-950 antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <Header />

      {/* Hero Section Centrée */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#dfe5d8]">
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-semibold text-[#008b58]">
            <Sparkles size={14} /> Formation Certifiante Python Data • Écosystème KORYXA
          </span>

          <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-[4.2rem] font-black leading-[1.08] tracking-tight text-slate-950 max-w-4xl mx-auto">
            De zéro à <TypingText /><br />
            avec un parcours qui vous pousse à réussir.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Apprenez Python, Pandas et l’analyse de données sur des cas d’affaires concrets. Notebooks interactifs, assistant pédagogique, projet portfolio et certification officielle vérifiable.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href={purchaseUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]"
            >
              Commencer la formation <ArrowRight size={18} />
            </Link>
            <a
              href="#video"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
            >
              <PlayCircle size={18} /> Voir la vidéo d’introduction
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <LockKeyhole size={15} className="text-[#00a86b]" /> Accès sécurisé
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={15} className="text-amber-500" /> Tarif officiel : 29 000 FCFA
            </span>
            <span className="flex items-center gap-1.5">
              <Award size={15} className="text-[#00a86b]" /> Certification officielle incluse
            </span>
          </div>

          {/* Démo interactive / Cockpit */}
          <ProductStage />
        </div>
      </section>

      <SkillTicker />

      {/* Vidéo d'introduction */}
      <section id="video" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
            <PlayCircle size={14} /> Module 0 en libre accès
          </span>
          <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Découvrez la pédagogie avant de vous engager.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Regardez la première leçon pour apprécier l&apos;approche concrète, le rythme et la clarté des explications.
          </p>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[#dfe5d8] bg-white shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/EWy_CcxHyxc"
              title="Formation Python Data Analyst — Module 0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </section>

      {/* Métriques d'excellence */}
      <section className="border-b border-[#dfe5d8] bg-[#faf9f5] py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["8", "Modules guidés", BookOpen],
            ["90h", "Parcours complet", Clock3],
            ["120+", "Exercices de code", Code2],
            ["ID Unique", "Certificat vérifiable", Award],
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

      {/* Programme des modules */}
      <section id="programme" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <BookOpen size={14} /> Programme d&apos;Études
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Une progression rigoureuse, pratique et opérationnelle.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Chaque module alterne fondamentaux théoriques, écriture de code et validation immédiate.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="rounded-2xl border border-[#dfe5d8] bg-[#faf9f5] p-6 shadow-sm transition hover:border-[#00a86b] hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00a86b]/10 text-[#008b58]">
                    <Icon size={22} />
                  </div>
                  <p className="mt-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Module 0{index + 1}
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-bold text-slate-950">{module.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{module.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expérience Apprenant */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5] border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Sparkles size={14} /> Méthode Pédagogique
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Conçu pour vous mener jusqu&apos;à la certification.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Une expérience fluide éliminant toute friction technique pour vous concentrer sur l&apos;apprentissage effectif.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3.5 rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00a86b]" />
                <p className="text-sm font-semibold leading-relaxed text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloc Tarif & Accès */}
      <section id="prix" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-white border-b border-[#dfe5d8]">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-8 sm:p-12 shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#008b58]">
                Tarif Individuel Transparent
              </span>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                Accédez à l’intégralité de la formation.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Notebooks, exercices interactifs, assistant IA, projet final évalué et certificat officiel KORYXA vérifiable.
              </p>
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {["Accès immédiat à vie", "Environnement interactif", "Assistant IA dédié", "Certification incluse"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-[#00a86b]" /> {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#dfe5d8] bg-white p-6 text-center shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tarif Unique</p>
              <p className="mt-3 font-serif text-4xl font-black text-slate-950">
                29 000 <span className="text-base font-bold text-slate-500">FCFA</span>
              </p>
              <p className="mt-2 text-xs text-slate-500">Paiement sécurisé via Mobile Money et carte bancaire</p>
              <Link
                href={purchaseUrl}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#008b58]"
              >
                S’inscrire au parcours <ArrowRight size={16} />
              </Link>
              <Link
                href={LEARNER_ACCESS_URL}
                className="mt-2.5 inline-block text-xs font-semibold text-slate-500 hover:text-[#008b58] transition-colors"
              >
                Déjà inscrit ? Accéder à l&apos;espace apprenant →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28 bg-[#faf9f5]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              Foire Aux Questions
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl border border-[#dfe5d8] bg-white p-5 shadow-sm">
                <summary className="cursor-pointer list-none text-base font-bold text-slate-900 marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {q}
                    <span className="text-slate-400 transition group-open:rotate-45 text-xl font-bold">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bannière d'appel final */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 bg-[#faf9f5]">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#00a86b] p-8 sm:p-12 text-center text-white shadow-xl">
          <Zap className="mx-auto mb-4 h-8 w-8 text-white" />
          <h2 className="font-serif text-2xl sm:text-4xl font-black tracking-tight">
            Prêt à valoriser vos compétences en analyse de données ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-emerald-50">
            Rejoignez l&apos;académie KORYXA et transformez votre profil professionnel dès aujourd&apos;hui.
          </p>
          <Link
            href={purchaseUrl}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Commencer maintenant <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
