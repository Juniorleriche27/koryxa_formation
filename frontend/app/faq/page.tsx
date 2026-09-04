import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "Foire Aux Questions — KORYXA Formation",
  description: "Réponses claires aux questions fréquentes sur les 8 parcours certifiants KORYXA Formation.",
};

const categories = [
  {
    title: "Formations et niveaux",
    icon: GraduationCap,
    questions: [
      {
        question: "À qui s’adressent les formations KORYXA ?",
        answer:
          "Nos parcours s’adressent aux débutants motivés, aux professionnels en reconversion ou en poste, aux indépendants et aux équipes d’entreprise qui souhaitent acquérir des compétences concrètes et vérifiables en Data, Intelligence Artificielle et Automatisation.",
      },
      {
        question: "Puis-je commencer sans expérience préalable en programmation ?",
        answer:
          "Absolument. Les parcours conçus pour débutants (Python Data Analyst, Excel Data Analyst, SQL Data Analyst) démarrent par les fondamentaux et montent en puissance de manière très progressive avec des exercices guidés.",
      },
      {
        question: "Comment choisir le bon parcours pour moi ?",
        answer:
          "Fondez votre choix sur votre objectif professionnel immédiat : analyser et visualiser des données (Excel, SQL, Power BI, Python), concevoir des assistants IA documentaires (LLM RAG), ou bâtir des modèles prédictifs et des pipelines (Machine Learning, Data Engineering).",
      },
      {
        question: "Les formations sont-elles uniquement théoriques ?",
        answer:
          "Non, c'est l'opposé. La méthode KORYXA est 100% pratique : chaque concept théorique est immédiatement appliqué sur des données réelles dans des notebooks interactifs et validé par un projet complet de portfolio.",
      },
    ],
  },
  {
    title: "Organisation et progression",
    icon: Clock3,
    questions: [
      {
        question: "Puis-je avancer à mon propre rythme ?",
        answer:
          "Oui. Tous les contenus, notebooks interactifs et quiz sont accessibles en ligne 24h/24 et 7j/7. Vous pouvez vous former le soir, le week-end ou à temps plein selon vos disponibilités.",
      },
      {
        question: "Combien de temps faut-il consacrer par semaine ?",
        answer:
          "Nous recommandons 4 à 6 heures par semaine pour progresser régulièrement et assimiler les concepts. Chaque parcours comporte 12 modules structurés avec un suivi continu de votre avancement.",
      },
      {
        question: "Que se passe-t-il si je bloque sur un exercice ?",
        answer:
          "L'assistant IA KORYXA est intégré directement dans votre interface pour vous expliquer les messages d'erreur et vous guider. Notre équipe pédagogique reste également joignable sur nos canaux d'assistance officiels.",
      },
      {
        question: "Comment est délivrée la certification finale ?",
        answer:
          "Dès que l'ensemble des modules, quiz et le projet de fin d'études sont validés, votre certificat officiel KORYXA est généré automatiquement avec son identifiant unique infalsifiable et son QR code de vérification publique.",
      },
    ],
  },
  {
    title: "Accès, compte KORYXA et sécurité",
    icon: WalletCards,
    questions: [
      {
        question: "Mon compte KORYXA fonctionne-t-il sur la formation ?",
        answer:
          "Oui. KORYXA Formation utilise le SSO unique KORYXA Identity. Un seul compte vous donne accès à la formation et à tous les autres services de l'écosystème souverain (MERQALOR, CoraBiz, ChatLAYA, etc.).",
      },
      {
        question: "Quels moyens de paiement sont acceptés ?",
        answer:
          "Nous supportons les moyens de paiement adaptés aux réalités économiques : Mobile Money (Wave, Orange Money, MTN MoMo, Moov) ainsi que les cartes bancaires Visa et Mastercard via notre passerelle sécurisée KORYXA Pay.",
      },
      {
        question: "Mes données personnelles sont-elles sécurisées ?",
        answer:
          "KORYXA applique des règles strictes de gouvernance et de souveraineté des données. Vos données d'apprentissage et votre identité sont strictement protégées et ne sont jamais revendues.",
      },
      {
        question: "Proposez-vous des tarifs pour les entreprises ou groupes ?",
        answer:
          "Oui. Des packs entreprises avec remises quantitatives (-25% dès 3 accès), facturation entreprise officielle et dashboard de suivi RH sont disponibles sur simple demande via notre page entreprise ou WhatsApp.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#faf9f5] pt-16 text-slate-950 lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#00a86b]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.72fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <CircleHelp size={14} /> Centre d&apos;Aide &amp; FAQ
            </span>
            <h1 className="mt-6 font-serif text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-950">
              Des réponses transparentes avant de commencer.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              Retrouvez toutes les réponses sur nos 8 parcours, la certification officielle KORYXA, l&apos;organisation pédagogique et votre accès sécurisé.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/formations"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:-translate-y-0.5 hover:bg-[#008b58]"
              >
                Explorer les formations <ArrowRight size={17} />
              </Link>
              <a
                href="mailto:contact.koryxa@gmail.com"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                <Mail size={16} className="text-[#00a86b]" /> Poser une question directe
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#dfe5d8] bg-white p-7 shadow-xl sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
              <ShieldCheck size={22} />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-slate-950">Engagements KORYXA</h2>
            <div className="mt-6 grid gap-2.5">
              {[
                "100% de code exécutable dans votre navigateur web",
                "Certifications vérifiables par QR code et identifiant unique",
                "Compte universel KORYXA SSO sécurisé",
                "Support d'orientation réactif par email et WhatsApp",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-[#faf9f5] p-3.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#00a86b]" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dfe5d8] bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00a86b]/30 bg-[#00a86b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <Sparkles size={14} /> Toutes les questions
            </span>
            <h2 className="mt-5 font-serif text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
              Trouvez rapidement votre information.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-start">
            {categories.map(({ title, icon: Icon, questions }) => (
              <section key={title} className="rounded-3xl border border-[#dfe5d8] bg-[#faf9f5] p-6">
                <div className="flex items-center gap-3 pb-5 border-b border-[#dfe5d8]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00a86b]/15 text-[#008b58]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-950">{title}</h3>
                </div>

                <div className="mt-5 grid gap-3">
                  {questions.map(({ question, answer }) => (
                    <details
                      key={question}
                      className="group rounded-2xl border border-[#dfe5d8] bg-white p-4 open:shadow-md transition-all"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left font-serif text-sm font-bold text-slate-900 marker:hidden">
                        <span>{question}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-[#00a86b] transition group-open:rotate-180" />
                      </summary>
                      <div className="mt-3 border-t border-slate-100 pt-3">
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#faf9f5] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-[#dfe5d8] bg-white p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12 shadow-sm">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#008b58]">
              <CheckCircle2 size={15} /> Prochaine étape
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-black text-slate-950">
              Vous avez toutes les clés. Choisissez votre formation.
            </h2>
            <p className="mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
              Découvrez nos 8 parcours d&apos;excellence et lancez votre apprentissage dès aujourd&apos;hui.
            </p>
          </div>
          <Link
            href="/formations"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00a86b] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,168,107,0.3)] transition hover:bg-[#008b58]"
          >
            Voir les 8 formations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
