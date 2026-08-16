"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2, ReceiptText } from "lucide-react";
import { commerceAPI, getApiErrorMessage, getStoredAuthToken } from "@/lib/api";

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

const paymentMethods = [
  ["tmoney", "TMoney"],
  ["moov_money", "Moov Money"],
  ["western_union", "Western Union"],
  ["ria", "RIA"],
  ["moneygram", "MoneyGram"],
  ["bank_transfer", "Virement bancaire"],
] as const;

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const course = searchParams.get("course") || "python-data-analyst";
  const partnerCode = searchParams.get("ref");

  const [order, setOrder] = useState<Order | null>(null);
  const [method, setMethod] = useState("tmoney");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getStoredAuthToken()) {
      const next = `/checkout?course=${encodeURIComponent(course)}${partnerCode ? `&ref=${encodeURIComponent(partnerCode)}` : ""}`;
      router.replace(`/login?course=${encodeURIComponent(course)}&next=${encodeURIComponent(next)}`);
      return;
    }

    commerceAPI
      .createOrder({ course_slug: course, partner_code: partnerCode })
      .then((response) => setOrder(response.data))
      .catch((checkoutError) => setError(getApiErrorMessage(checkoutError)))
      .finally(() => setLoading(false));
  }, [course, partnerCode, router]);

  async function submitPayment(event: FormEvent) {
    event.preventDefault();
    if (!order) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await commerceAPI.submitPayment(order.id, {
        payment_method: method,
        payment_reference: reference.trim(),
      });
      setOrder(response.data);
    } catch (paymentError) {
      setError(getApiErrorMessage(paymentError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href={`/formations/${course}`} className="inline-flex items-center gap-2 text-sm font-black text-slate-600 hover:text-emerald-700">
          <ArrowLeft size={16} /> Retour à la formation
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="bg-[#06251c] p-6 text-white sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-100">
                <ReceiptText size={15} /> Commande KORYXA
              </div>
              <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Finaliser mon inscription</h1>
              <p className="mt-4 text-sm leading-7 text-emerald-50/80">Ta commande est liée à ton compte apprenant. Après validation du paiement, ton accès à la formation sera attribué automatiquement.</p>

              {order && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-emerald-200">{order.course_title || order.course_slug.replaceAll("-", " ")}</p>
                  <p className="mt-2 text-3xl font-black">{Number(order.amount).toLocaleString("fr-FR")} {order.currency === "XOF" ? "FCFA" : order.currency}</p>
                  <p className="mt-2 text-sm text-emerald-50/75">Statut : <span className="font-black text-white">{order.status}</span></p>
                </div>
              )}
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              {loading ? (
                <div className="flex min-h-80 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-emerald-600" /></div>
              ) : order?.status === "paid" ? (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
                  <h2 className="mt-5 text-2xl font-black text-slate-950">Paiement validé</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">Ton enrollment a été créé. Tu peux maintenant ouvrir ton espace apprenant.</p>
                  <Link href={`/access?course=${encodeURIComponent(course)}`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white hover:bg-emerald-500">Accéder à ma formation</Link>
                </div>
              ) : order?.status === "payment_submitted" ? (
                <div className="py-8">
                  <CheckCircle2 className="h-12 w-12 text-amber-500" />
                  <h2 className="mt-5 text-2xl font-black text-slate-950">Paiement envoyé pour vérification</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">La référence <strong>{order.payment_reference}</strong> est enregistrée. Dès confirmation, l’accès sera créé automatiquement.</p>
                </div>
              ) : (
                <form onSubmit={submitPayment} className="space-y-5">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-emerald-700">Paiement</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-950">Déclarer mon paiement</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">Effectue le paiement avec les instructions KORYXA qui te sont communiquées, puis saisis ici la référence de transaction. La confirmation reste contrôlée côté KORYXA.</p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">Moyen de paiement</span>
                    <select value={method} onChange={(event) => setMethod(event.target.value)} className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 outline-none focus:border-emerald-500">
                      {paymentMethods.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-800">Référence de transaction</span>
                    <input value={reference} onChange={(event) => setReference(event.target.value)} required minLength={3} maxLength={180} placeholder="Ex. TM123456789" className="min-h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-500" />
                  </label>

                  {error && <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

                  <button disabled={submitting || !order} type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#06251c] px-5 text-sm font-black text-white transition hover:bg-emerald-700 disabled:opacity-60">
                    {submitting && <Loader2 size={18} className="animate-spin" />}
                    Envoyer la référence
                  </button>
                </form>
              )}

              {error && order?.status !== "pending" && <div role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}
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
