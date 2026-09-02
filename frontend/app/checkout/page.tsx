"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  HelpCircle,
  Loader2,
  MessageCircleMore,
  Package,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { commerceAPI, getApiErrorMessage } from "@/lib/api";

type Order = {
  id: string;
  course_slug: string;
  course_title?: string;
  amount: number;
  currency: string;
  status: string;
  payment_method?: string | null;
  payment_reference?: string | null;
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

const paymentMethodsList = [
  { id: "tmoney", label: "TMoney (Togo)", provider: "TMoney", number: "+228 92 09 25 72", name: "KORYXA Tech Store" },
  { id: "moov_money", label: "Moov Money", provider: "Moov Money", number: "+228 99 00 00 00", name: "KORYXA Tech Store" },
  { id: "wave", label: "Wave", provider: "Wave", number: "+228 92 09 25 72", name: "KORYXA Tech Store" },
  { id: "card", label: "Carte Bancaire / En ligne", provider: "KORYXA Pay", number: "En ligne", name: "KORYXA Central Gateway" },
  { id: "bank_transfer", label: "Virement bancaire (UEMOA / SEPA)", provider: "Banque", number: "RIB sur demande", name: "KORYXA Tech Store" },
  { id: "western_union", label: "Western Union / RIA / MoneyGram", provider: "Transfert d'argent", number: "+228 92 09 25 72", name: "KORYXA Tech Store (Lomé, Togo)" },
] as const;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const packSlug = searchParams.get("pack");
  const partnerCode = searchParams.get("ref");

  const packInfo = packSlug ? careerPacksConfig[packSlug] : null;
  const activeSlug = packSlug || courseSlug || "python-data-analyst";

  const [order, setOrder] = useState<Order | null>(null);
  const [method, setMethod] = useState("tmoney");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const selectedPaymentConfig = useMemo(
    () => paymentMethodsList.find((p) => p.id === method) || paymentMethodsList[0],
    [method]
  );

  useEffect(() => {
    const nextUrl = `/checkout?${packSlug ? `pack=${encodeURIComponent(packSlug)}` : `course=${encodeURIComponent(activeSlug)}`}${partnerCode ? `&ref=${encodeURIComponent(partnerCode)}` : ""}`;

    // Si c'est un cours unique, on utilise commerceAPI pour créer l'ordre backend
    if (!packSlug) {
      commerceAPI
        .createOrder({ course_slug: activeSlug, partner_code: partnerCode })
        .then((response) => setOrder(response.data))
        .catch((checkoutError: any) => {
          if (checkoutError?.response?.status === 401) {
            router.replace(`/login?course=${encodeURIComponent(activeSlug)}&next=${encodeURIComponent(nextUrl)}`);
            return;
          }
          setError(getApiErrorMessage(checkoutError));
        })
        .finally(() => setLoading(false));
    } else {
      // Pour un pack, commande pack préparée
      setOrder({
        id: `pack-${packSlug}-${Date.now().toString().slice(-6)}`,
        course_slug: packSlug,
        course_title: packInfo?.title || "Pack Carrière KORYXA",
        amount: packInfo?.price || 89000,
        currency: "XOF",
        status: "pending",
      });
      setLoading(false);
    }
  }, [activeSlug, packSlug, packInfo, partnerCode, router]);

  const copyNumber = async () => {
    if (selectedPaymentConfig?.number) {
      try {
        await navigator.clipboard.writeText(selectedPaymentConfig.number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback
      }
    }
  };

  const [initiatingPay, setInitiatingPay] = useState(false);

  async function handleKoryxaPayCheckout() {
    setInitiatingPay(true);
    setError("");
    try {
      const response = await commerceAPI.initiateKoryxaPay({
        product_code: activeSlug,
        item_type: packSlug ? "pack" : "course",
        partner_code: partnerCode,
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

  async function submitPayment(event: FormEvent) {
    event.preventDefault();
    if (!order) return;
    setSubmitting(true);
    setError("");

    try {
      if (!packSlug) {
        const response = await commerceAPI.submitPayment(order.id, {
          payment_method: method,
          payment_reference: reference.trim(),
        });
        setOrder(response.data);
      } else {
        // Enregistrement de paiement pack
        setOrder((prev) => (prev ? { ...prev, status: "payment_submitted", payment_method: method, payment_reference: reference.trim() } : null));
      }
    } catch (paymentError) {
      setError(getApiErrorMessage(paymentError));
    } finally {
      setSubmitting(false);
    }
  }

  const whatsappText = `Bonjour KORYXA, je viens d'effectuer mon paiement de ${order?.amount?.toLocaleString("fr-FR")} FCFA pour "${order?.course_title || order?.course_slug}". Référence : ${reference.trim() || "à communiquer"}.`;

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
              ) : order?.status === "payment_submitted" ? (
                <div className="py-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-10 w-10 text-amber-400" />
                    <div>
                      <h2 className="text-xl font-black text-white">Paiement envoyé pour vérification</h2>
                      <p className="text-xs text-slate-400">Réf : {order.payment_reference}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Votre référence de transaction a été enregistrée. L&apos;accès sera débloqué dès confirmation. Pour un traitement instantané, vous pouvez notifier le support sur WhatsApp.
                  </p>

                  <a
                    href={`https://wa.me/22892092572?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                  >
                    <MessageCircleMore size={18} /> Confirmer rapidement sur WhatsApp
                  </a>
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

                  <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
                    <span className="relative bg-[#0b1222] px-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      ou règlement direct / manuel
                    </span>
                  </div>

                  <form onSubmit={submitPayment} className="space-y-6">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-emerald-400">
                        Option de secours
                      </span>
                      <h2 className="mt-1 text-2xl font-black text-white">Déclarer un transfert direct</h2>
                      <p className="mt-1.5 text-xs leading-5 text-slate-400">
                        Si vous avez déjà envoyé votre règlement manuellement, renseignez votre référence de transaction ci-dessous.
                      </p>
                    </div>

                  {/* Sélection du moyen */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">
                      Moyen de paiement
                    </span>
                    <select
                      value={method}
                      onChange={(event) => setMethod(event.target.value)}
                      className="min-h-12 w-full rounded-2xl border border-white/15 bg-slate-900 px-4 text-sm font-bold text-white outline-none focus:border-emerald-400"
                    >
                      {paymentMethodsList.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Bloc Coordonnées Officielles KORYXA */}
                  <div className="rounded-2xl border border-emerald-400/25 bg-emerald-950/40 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-300">
                        <Smartphone size={15} /> Coordonnées KORYXA Pay
                      </div>
                      <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-200">
                        {selectedPaymentConfig.provider}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950/80 p-3.5">
                      <div>
                        <p className="text-[11px] font-medium text-slate-400">Numéro / Compte officiel :</p>
                        <p className="mt-0.5 font-mono text-base font-black text-white">
                          {selectedPaymentConfig.number}
                        </p>
                      </div>
                      {selectedPaymentConfig.number !== "En ligne" && selectedPaymentConfig.number !== "RIB sur demande" && (
                        <button
                          type="button"
                          onClick={copyNumber}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
                        >
                          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          {copied ? "Copié !" : "Copier"}
                        </button>
                      )}
                    </div>
                    <p className="mt-3 text-xs text-slate-300">
                      Bénéficiaire : <strong className="text-white">{selectedPaymentConfig.name}</strong>
                    </p>
                  </div>

                  {/* Saisie de la référence */}
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.1em] text-slate-300">
                      Référence de transaction ou ID de paiement
                    </span>
                    <input
                      value={reference}
                      onChange={(event) => setReference(event.target.value)}
                      required
                      minLength={3}
                      maxLength={180}
                      placeholder="Ex. TM987654321 ou Transaction ID"
                      className="min-h-12 w-full rounded-2xl border border-white/15 bg-slate-900 px-4 text-sm font-bold text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
                    />
                  </label>

                  {error && (
                    <div role="alert" className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs font-bold text-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    disabled={submitting || !order}
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 text-sm font-black text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
                  >
                    {submitting && <Loader2 size={18} className="animate-spin" />}
                    Valider et envoyer ma référence
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href={`https://wa.me/22892092572?text=${encodeURIComponent(whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-300"
                    >
                      <MessageCircleMore size={14} /> Besoin d&apos;aide pour payer ? Échanger sur WhatsApp
                    </a>
                  </div>
                </form>
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
