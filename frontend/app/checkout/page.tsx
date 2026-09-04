"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Package,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { commerceAPI, getApiErrorMessage } from "@/lib/api";
import { courseCatalog } from "@/lib/courseConfig";

type Order = {
  id: string;
  course_slug: string;
  course_title?: string;
  amount: number;
  currency: string;
  status: string;
};

const careerPacksConfig: Record<
  string,
  { title: string; price: number; originalPrice: number; courses: string[] }
> = {
  "full-stack-data-analyst": {
    title: "Pack Full-Stack Data Analyst",
    price: 89000,
    originalPrice: 127000,
    courses: [
      "Excel Data Analyst",
      "SQL Data Analyst (PostgreSQL)",
      "Power BI Data Analyst",
    ],
  },
  "data-scientist-ai-engineer": {
    title: "Pack Data Scientist & AI Engineer",
    price: 129000,
    originalPrice: 186000,
    courses: [
      "Python Data Analyst",
      "Statistiques & Data Science avec Python",
      "Machine Learning avec Python",
      "LLM RAG Developer",
    ],
  },
  "data-ultimate-all-access": {
    title: "Pack Data Ultimate All-Access",
    price: 199000,
    originalPrice: 372000,
    courses: [
      "Les 8 parcours complets (Python, SQL, Excel, Power BI, Stats, ML, RAG, Data Engineering)",
      "Accès illimité à vie et futures mises à jour",
    ],
  },
};

const coursePrices: Record<string, number> = {
  "python-data-analyst": 29000,
  "excel-data-analyst": 39000,
  "llm-rag": 49000,
  "sql-data-analyst": 39000,
  "power-bi-data-analyst": 49000,
  "statistics-data-science-python": 49000,
  "machine-learning-python": 59000,
  "data-engineering-python-sql": 69000,
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const packSlug = searchParams.get("pack");
  const partnerCode = searchParams.get("ref");

  const packInfo = packSlug ? careerPacksConfig[packSlug] : null;
  const activeSlug = packSlug || courseSlug || "python-data-analyst";

  const courseInfo = (courseCatalog as Record<string, { title: string }>)[activeSlug];
  const order: Order = {
    id: `${packSlug ? "pack" : "course"}-${activeSlug}`,
    course_slug: activeSlug,
    course_title: packInfo?.title || courseInfo?.title || "Formation KORYXA",
    amount: packInfo?.price || coursePrices[activeSlug] || 29000,
    currency: "XOF",
    status: "pending",
  };
  const loading = false;
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [initiatingPay, setInitiatingPay] = useState(false);

  async function handleKoryxaPayCheckout() {
    if (customerName.trim().length < 2 || customerPhone.replace(/\D/g, "").length < 8) {
      setError("Renseignez votre nom et un numéro Mobile Money valide.");
      return;
    }
    setInitiatingPay(true);
    setError("");
    try {
      const response = await commerceAPI.initiateKoryxaPay({
        product_code: activeSlug,
        item_type: packSlug ? "pack" : "course",
        partner_code: partnerCode,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
      });

      const checkoutUrl =
        response.data?.checkout_url ||
        (response.data as any)?.url ||
        (response.data as any)?.data?.checkout_url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setError("Lien de paiement KORYXA Pay non disponible actuellement.");
      }
    } catch (err: any) {
      setError(getApiErrorMessage(err));
    } finally {
      setInitiatingPay(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050914] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={packSlug ? "/formations#packs" : `/formations/${activeSlug}`}
          className="inline-flex items-center gap-2 text-sm font-black text-slate-400 transition hover:text-emerald-400"
        >
          <ArrowLeft size={16} /> {packSlug ? "Retour aux Packs" : "Retour à la formation"}
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/50">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Colonne Gauche : Récapitulatif */}
            <aside className="bg-gradient-to-b from-[#06251c] to-[#041611] p-6 text-white sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-emerald-200">
                <ReceiptText size={15} /> KORYXA Checkout
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                Finaliser ma commande
              </h1>
              <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                Accès individuel illimité à vie avec projets portfolios, exercices et certification officielle KORYXA inclus.
              </p>

              {order && (
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-emerald-300">
                    {packSlug ? <Package size={14} /> : <Sparkles size={14} />}
                    {order.course_title || order.course_slug.replaceAll("-", " ")}
                  </div>
                  <p className="mt-3 text-4xl font-black text-white">
                    {Number(order.amount).toLocaleString("fr-FR")}{" "}
                    <span className="text-xl text-emerald-300">{order.currency === "XOF" ? "FCFA" : order.currency}</span>
                  </p>
                  {packInfo && (
                    <p className="mt-1 text-xs font-bold text-slate-400 line-through">
                      Prix public : {Number(packInfo.originalPrice).toLocaleString("fr-FR")} FCFA
                    </p>
                  )}

                  {packInfo && (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-300">Formations incluses :</p>
                      <ul className="mt-2.5 space-y-1.5 text-xs text-emerald-100">
                        {packInfo.courses.map((c, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="text-slate-400">Statut de la commande :</span>
                    <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 font-black text-emerald-300">
                      {order.status}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
                <ShieldCheck size={16} className="text-emerald-400" /> Paiement 100% sécurisé par KORYXA Tech Store
              </div>
            </aside>

            {/* Colonne Droite : Formulaire & Coordonnées */}
            <div className="bg-[#0b1222] p-6 sm:p-8 lg:p-10">
              {loading ? (
                <div className="flex min-h-80 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                </div>
              ) : order?.status === "paid" ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 text-emerald-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-white">Paiement validé avec succès !</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Votre accès à la formation est activé. Vous pouvez dès maintenant commencer vos cours.
                  </p>
                  <Link
                    href={`/dashboard?course=${encodeURIComponent(activeSlug)}`}
                    className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-400 px-6 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                  >
                    Ouvrir mon espace apprenant
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Option 1 : KORYXA Pay en ligne (Recommandé) */}
                  <div className="rounded-3xl border border-emerald-400/30 bg-emerald-950/40 p-6 shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                        <Sparkles size={16} /> Recommandé · Instantané
                      </div>
                      <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] font-black text-emerald-300">
                        KORYXA Pay API
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-black text-white">Paiement en ligne sécurisé KORYXA Pay</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      Réglez directement par Mobile Money ou Carte Bancaire sur le portail officiel KORYXA Pay. Votre formation sera activée automatiquement dès validation.
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <label className="grid gap-1.5 text-xs font-bold text-slate-200">
                        Nom complet
                        <input
                          value={customerName}
                          onChange={(event) => setCustomerName(event.target.value)}
                          autoComplete="name"
                          placeholder="Votre nom complet"
                          className="min-h-11 rounded-xl border border-white/15 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-emerald-400"
                        />
                      </label>
                      <label className="grid gap-1.5 text-xs font-bold text-slate-200">
                        Numéro Mobile Money
                        <input
                          value={customerPhone}
                          onChange={(event) => setCustomerPhone(event.target.value)}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="Ex. +228 90 00 00 00"
                          className="min-h-11 rounded-xl border border-white/15 bg-slate-950/70 px-3 text-sm text-white outline-none focus:border-emerald-400"
                        />
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleKoryxaPayCheckout}
                      disabled={initiatingPay || loading}
                      className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-300 disabled:opacity-60"
                    >
                      {initiatingPay ? <Loader2 size={18} className="animate-spin" /> : <ExternalLink size={18} />}
                      {initiatingPay ? "Connexion à KORYXA Pay..." : `Payer ${Number(order?.amount || 0).toLocaleString("fr-FR")} FCFA avec KORYXA Pay →`}
                    </button>
                  </div>

                  {error && (
                    <div role="alert" className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-200">
                      {error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
