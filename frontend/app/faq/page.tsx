import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { FooterSEO, Header } from "@/components/marketing/KoryxaFormationPortal";

export const metadata = {
  title: "FAQ — KORYXA Formation",
  description: "Réponses aux questions fréquentes sur les parcours KORYXA Formation.",
};

const categories = [
  {
    title: "Formations et niveaux",
    icon: GraduationCap,
    questions: [
      {
        question: "À qui s’adressent les formations KORYXA ?",
        answer:
          "Les parcours s’adressent aux débutants motivés, aux professionnels en évolution, aux indépendants et aux entrepreneurs qui souhaitent acquérir une compétence concrète en data, intelligence artificielle ou automatisation. Chaque page de formation précise le niveau recommandé.",
      },
      {
        question: "Puis-je commencer sans expérience technique ?",
        answer:
          "Oui. Les parcours annoncés comme débutants commencent par les bases utiles et avancent progressivement. L’objectif n’est pas de supposer que vous savez déjà tout, mais de vous aider à comprendre puis à pratiquer avec méthode.",
      },
      {
        question: "Comment choisir le bon parcours ?",
        answer:
          "Commencez par votre objectif : analyser des données, construire un assistant IA ou automatiser une tâche. Comparez ensuite le niveau, le format et le livrable final sur la page Formations. Le meilleur parcours est celui qui répond à un besoin réel que vous avez aujourd’hui.",
      },
      {
        question: "Les formations sont-elles uniquement théoriques ?",
        answer:
          "Non. La méthode KORYXA privilégie la pratique. Chaque parcours associe des explications essentielles, des exercices guidés et un projet final destiné à prouver ce que vous savez construire.",
      },
    ],
  },
  {
    title: "Organisation et progression",
    icon: Clock3,
    questions: [
      {
        question: "Puis-je avancer à mon rythme ?",
        answer:
          "Oui. Les parcours sont conçus pour être suivis de manière progressive, selon votre disponibilité. Il reste toutefois important de pratiquer régulièrement afin de conserver le fil et d’aller jusqu’au projet final.",
      },
      {
        question: "Combien de temps faut-il prévoir ?",
        answer:
          "La durée dépend du parcours, de votre niveau de départ et du temps consacré chaque semaine. Les informations propres à chaque formation indiquent la structure, le nombre de modules et la période d’accès prévue.",
      },
      {
        question: "Que se passe-t-il si je bloque sur une étape ?",
        answer:
          "Vous pouvez reprendre les explications, refaire les exercices et contacter l’équipe KORYXA pour une question liée à l’accès ou à l’orientation. Les modalités d’accompagnement précises sont indiquées sur la page du parcours concerné.",
      },
      {
        question: "Est-ce que je conserve un résultat à la fin ?",
        answer:
          "Oui. L’objectif est de terminer avec une preuve concrète : projet portfolio, analyse, prototype, assistant ou automatisation selon la formation suivie.",
      },
    ],
  },
  {
    title: "Accès, paiement et sécurité",
    icon: WalletCards,
    questions: [
      {
        question: "Comment accéder à une formation après inscription ?",
        answer:
          "Après validation de votre inscription et de votre paiement, les informations d’accès sont transmises selon le processus indiqué sur la page de la formation. Vérifiez toujours que vous utilisez les coordonnées officielles KORYXA affichées sur ce site.",
      },
      {
        question: "Quels moyens de paiement sont disponibles ?",
        answer:
          "Les moyens de paiement proposés peuvent varier selon le parcours et le pays. La page de la formation ou le processus d’inscription affiche les options réellement disponibles au moment de votre demande.",
      },
      {
        question: "Mes informations sont-elles protégées ?",
        answer:
          "KORYXA limite la collecte aux informations nécessaires à l’inscription, à l’accès et au suivi du parcours. Ne transmettez jamais de mot de passe, de code secret ou de donnée bancaire par message. Utilisez uniquement les canaux officiels.",
      },
      {
        question: "Comment vérifier que je contacte bien KORYXA ?",
        answer:
          "Utilisez les coordonnées officielles affichées dans le bloc Contact de cette page : le numéro WhatsApp, l’adresse email KORYXA et le domaine formation.koryxa.fr.",
      },
    ],
  },
];


export default function FAQPage() {
  return (
    <main className="kx-marketing min-h-screen bg-white pt-16 text-slate-950 lg:pt-20">
      <Header />

      <section className="relative overflow-hidden bg-[#f5fbf7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(188,245,215,.7),transparent_24rem),radial-gradient(circle_at_85%_16%,rgba(0,189,114,.13),transparent_28rem)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.72fr] lg:items-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <CircleHelp size={14} /> Questions fréquentes
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.055em] text-[#06251c] sm:text-6xl lg:text-7xl">
              Des réponses claires avant de commencer.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
              Retrouvez ici les réponses essentielles sur les parcours, les niveaux, l’organisation, l’accès et les canaux officiels de KORYXA Formation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:-translate-y-0.5 hover:bg-[#bcf5d7]">
                Voir les formations <ArrowRight size={17} />
              </Link>
              <a href="mailto:contact.koryxa@gmail.com" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#06251c]/12 bg-white px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:border-[#00bd72]/40 hover:bg-[#f2fbf5]">
                Écrire à KORYXA
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#06251c]/10 bg-white p-6 shadow-xl shadow-[#06251c]/8 sm:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#06251c] text-[#bcf5d7]">
              <ShieldCheck size={22} />
            </span>
            <h2 className="mt-6 text-2xl font-black tracking-[-0.04em] text-[#06251c]">Avant de nous écrire</h2>
            <div className="mt-6 grid gap-3">
              {[
                "Consultez la page de la formation concernée.",
                "Vérifiez le niveau et le résultat final attendu.",
                "Utilisez uniquement les contacts officiels ci-dessous.",
                "Ne partagez jamais de mot de passe ou de code secret.",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-[#f2fbf5] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00bd72]" />
                  <p className="text-sm font-bold leading-6 text-[#06251c]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#bcf5d7] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#06251c]">
              <Sparkles size={14} /> Toutes les réponses
            </span>
            <h2 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.05em] text-[#06251c] sm:text-5xl lg:text-6xl">
              Trouvez rapidement l’information utile.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:items-start">
            {categories.map(({ title, icon: Icon, questions }) => (
              <section key={title} className="rounded-[2rem] border border-[#06251c]/10 bg-[#f5fbf7] p-5 sm:p-6">
                <div className="flex items-center gap-3 px-1 pb-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#bcf5d7] text-[#06251c]">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-black tracking-[-0.03em] text-[#06251c]">{title}</h3>
                </div>

                <div className="grid gap-3">
                  {questions.map(({ question, answer }) => (
                    <details key={question} className="group rounded-2xl border border-[#06251c]/8 bg-white open:border-[#00bd72]/35">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black leading-6 text-[#06251c] marker:hidden">
                        <span>{question}</span>
                        <ChevronDown className="h-5 w-5 shrink-0 text-[#008f58] transition group-open:rotate-180" />
                      </summary>
                      <div className="border-t border-[#06251c]/8 px-5 py-4">
                        <p className="text-sm leading-7 text-slate-600">{answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2.25rem] bg-[#f5fbf7] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#008f58]">
              <CheckCircle2 size={15} /> Prochaine étape
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-[#06251c] sm:text-4xl">Vous avez vos réponses. Choisissez maintenant votre parcours.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Comparez les formations, leur niveau, leur format et le projet final avant de commencer.
            </p>
          </div>
          <Link href="/formations" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00bd72] px-6 py-3.5 text-sm font-black text-[#06251c] transition hover:bg-[#bcf5d7]">
            Voir les formations <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}
