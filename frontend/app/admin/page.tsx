"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Copy,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  UserPlus,
  XCircle,
} from "lucide-react";

type AccessCode = {
  id: string;
  student_name: string;
  student_email: string | null;
  label: string | null;
  status: "active" | "used" | "revoked" | "expired";
  max_uses: number;
  used_count: number;
  first_used_at: string | null;
  last_used_at: string | null;
  expires_at: string | null;
  notes: string | null;
  partner_code: string | null;
  partner_email: string | null;
  partner_name: string | null;
  activated_at: string | null;
  access_until: string | null;
  created_at: string;
  created_by_admin_email?: string | null;
};

type CreateFormState = {
  student_name: string;
  student_email: string;
  label: string;
  code: string;
  max_uses: string;
  expires_at: string;
  notes: string;
};

const initialCreateForm: CreateFormState = {
  student_name: "",
  student_email: "",
  label: "Formation Python Data",
  code: "",
  max_uses: "2",
  expires_at: "",
  notes: "",
};

const statusLabels: Record<AccessCode["status"], string> = {
  active: "Actif",
  used: "Utilisé",
  revoked: "Révoqué",
  expired: "Expiré",
};

const statusStyles: Record<AccessCode["status"], string> = {
  active: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
  used: "border-blue-300/25 bg-blue-400/10 text-blue-100",
  revoked: "border-red-300/25 bg-red-400/10 text-red-100",
  expired: "border-orange-300/25 bg-orange-400/10 text-orange-100",
};

function toInputDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function defaultExpirationDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  return toInputDate(date);
}

function StatusBadge({ status }: { status: AccessCode["status"] }) {
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [query, setQuery] = useState("");
  const [createForm, setCreateForm] = useState<CreateFormState>({ ...initialCreateForm, expires_at: defaultExpirationDate() });
  const [newCode, setNewCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const stats = useMemo(() => ({
    total: codes.length,
    active: codes.filter((code) => code.status === "active").length,
    used: codes.filter((code) => code.status === "used").length,
    revoked: codes.filter((code) => code.status === "revoked").length,
  }), [codes]);

  const filteredCodes = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return codes;
    return codes.filter((code) => [
      code.student_name,
      code.student_email,
      code.label,
      code.partner_code,
      code.partner_email,
      code.partner_name,
      code.status,
    ].some((value) => (value || "").toLowerCase().includes(needle)));
  }, [codes, query]);

  const loadCodes = async () => {
    setError("");
    const response = await fetch("/api/admin/access-codes", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.message || "Impossible de charger les codes.");
      setLoading(false);
      return;
    }
    const payload = await response.json();
    setCodes(payload.codes || []);
    setAuthenticated(true);
    setLoading(false);
  };

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      if (response.ok) {
        const payload = await response.json();
        setSessionEmail(payload.email || "");
        await loadCodes();
        return;
      }
      setAuthenticated(false);
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adminEmail, secret: adminSecret }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setError(payload?.message || "Accès administrateur refusé.");
      setSaving(false);
      return;
    }
    const payload = await response.json();
    setSessionEmail(payload.email || adminEmail);
    setAuthenticated(true);
    setAdminSecret("");
    await loadCodes();
    setSaving(false);
  };

  const logout = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthenticated(false);
    setCodes([]);
    setSessionEmail("");
  };

  const createCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    setNewCode("");
    const response = await fetch("/api/admin/access-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...createForm,
        expires_at: createForm.expires_at ? new Date(`${createForm.expires_at}T23:59:59`).toISOString() : "",
      }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setError(payload?.message || "Impossible de créer ce code.");
      setSaving(false);
      return;
    }
    setNewCode(payload.plain_code || "");
    setMessage("Code apprenant créé. Copie-le maintenant, il ne sera plus affiché ensuite.");
    setCreateForm({ ...initialCreateForm, expires_at: defaultExpirationDate() });
    await loadCodes();
    setSaving(false);
  };

  const updateCodeStatus = async (id: string, action: "revoke" | "reactivate" | "expire") => {
    setSaving(true);
    setError("");
    setMessage("");
    const response = await fetch(`/api/admin/access-codes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setError(payload?.message || "Impossible de modifier ce code.");
      setSaving(false);
      return;
    }
    setMessage("Code mis à jour.");
    await loadCodes();
    setSaving(false);
  };

  const copyNewCode = async () => {
    if (!newCode) return;
    await navigator.clipboard.writeText(newCode);
    setMessage("Code copié.");
  };

  if (loading) {
    return (
      <main className="kx-dark-page flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-200"><Loader2 className="h-5 w-5 animate-spin text-blue-300" /> Chargement de l’espace admin…</div>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="kx-dark-page flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <section className="relative mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[1fr_27rem] lg:items-center">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-black text-white">K</span>
              KORYXA Formation Admin
            </Link>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
              <ShieldCheck size={15} /> Console sécurisée
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">Pilote les accès formation avec précision.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Crée des codes de dépannage, suis les activations, révoque les accès et garde une traçabilité claire.</p>
          </div>

          <form onSubmit={login} className="rounded-[2rem] border border-white/10 bg-white/[0.08] p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-950 shadow-soft sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 ring-1 ring-blue-100"><LockKeyhole size={26} /></div>
              <h2 className="mt-6 text-2xl font-black tracking-tight sm:text-3xl">Connexion admin</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Utilise uniquement les identifiants administrateur autorisés.</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="admin-email" className="mb-2 block text-sm font-black text-slate-800">Email admin</label>
                  <input id="admin-email" type="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </div>
                <div>
                  <label htmlFor="admin-secret" className="mb-2 block text-sm font-black text-slate-800">Clé admin privée</label>
                  <input id="admin-secret" type="password" value={adminSecret} onChange={(event) => setAdminSecret(event.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100" />
                </div>
              </div>
              {error && <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
              <button type="submit" disabled={saving || !adminEmail.trim() || !adminSecret.trim()} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck size={18} />} Entrer dans l’admin
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="kx-dark-page min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_28rem)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">
                <ShieldCheck className="h-4 w-4" /> Admin formation
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Gestion des accès apprenants</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Crée des codes de secours, surveille les accès et révoque proprement quand la formation est terminée.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
              <span className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-bold text-slate-300">{sessionEmail}</span>
              <button type="button" onClick={loadCodes} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black text-slate-100 transition hover:bg-white/10"><RefreshCw size={16} /> Actualiser</button>
              <button type="button" onClick={logout} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-black text-red-100 transition hover:bg-red-400/15"><LogOut size={16} /> Déconnexion</button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total codes", stats.total, "border-white/10 bg-white/[0.06] text-white"],
            ["Actifs", stats.active, "border-emerald-300/20 bg-emerald-400/10 text-emerald-100"],
            ["Utilisés", stats.used, "border-blue-300/20 bg-blue-400/10 text-blue-100"],
            ["Révoqués", stats.revoked, "border-red-300/20 bg-red-400/10 text-red-100"],
          ].map(([label, value, classes]) => (
            <div key={label as string} className={`rounded-3xl border p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl ${classes as string}`}>
              <p className="text-sm font-bold opacity-80">{label as string}</p>
              <p className="mt-2 text-4xl font-black tracking-tight">{value as number}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[25rem_1fr]">
          <form onSubmit={createCode} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:p-6">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-100"><UserPlus className="h-5 w-5" /></div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Créer un code</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">Pour test, dépannage ou cas exceptionnel.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="student-name" className="mb-2 block text-sm font-black text-slate-200">Nom apprenant</label>
                <input id="student-name" value={createForm.student_name} onChange={(event) => setCreateForm({ ...createForm, student_name: event.target.value })} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
              </div>
              <div>
                <label htmlFor="student-email" className="mb-2 block text-sm font-black text-slate-200">Email</label>
                <input id="student-email" type="email" value={createForm.student_email} onChange={(event) => setCreateForm({ ...createForm, student_email: event.target.value })} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
              </div>
              <div>
                <label htmlFor="label" className="mb-2 block text-sm font-black text-slate-200">Libellé</label>
                <input id="label" value={createForm.label} onChange={(event) => setCreateForm({ ...createForm, label: event.target.value })} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="max-uses" className="mb-2 block text-sm font-black text-slate-200">Usages</label>
                  <input id="max-uses" type="number" min="1" max="10" value={createForm.max_uses} onChange={(event) => setCreateForm({ ...createForm, max_uses: event.target.value })} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
                </div>
                <div>
                  <label htmlFor="expires-at" className="mb-2 block text-sm font-black text-slate-200">Expire le</label>
                  <input id="expires-at" type="date" value={createForm.expires_at} onChange={(event) => setCreateForm({ ...createForm, expires_at: event.target.value })} className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
                </div>
              </div>
              <div>
                <label htmlFor="custom-code" className="mb-2 block text-sm font-black text-slate-200">Code personnalisé optionnel</label>
                <input id="custom-code" value={createForm.code} onChange={(event) => setCreateForm({ ...createForm, code: event.target.value })} placeholder="Laisse vide pour générer" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
              </div>
              <div>
                <label htmlFor="notes" className="mb-2 block text-sm font-black text-slate-200">Notes internes</label>
                <textarea id="notes" rows={3} value={createForm.notes} onChange={(event) => setCreateForm({ ...createForm, notes: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm font-semibold text-white outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
              </div>
            </div>
            <button type="submit" disabled={saving || !createForm.student_name.trim()} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound size={18} />} Générer le code
            </button>
          </form>

          <section className="space-y-4">
            {(message || error || newCode) && (
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
                {message && <p className="flex gap-3 text-sm font-bold text-emerald-100"><CheckCircle2 className="h-5 w-5 shrink-0" /> {message}</p>}
                {error && <p className="flex gap-3 text-sm font-bold text-red-100"><AlertTriangle className="h-5 w-5 shrink-0" /> {error}</p>}
                {newCode && (
                  <div className="mt-4 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-100/70">Code à envoyer</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <code className="rounded-2xl bg-slate-950/80 px-4 py-3 text-lg font-black text-emerald-100">{newCode}</code>
                      <button type="button" onClick={copyNewCode} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 px-4 py-3 text-sm font-black text-emerald-100 transition hover:bg-emerald-400/10"><Copy size={16} /> Copier</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-slate-950/25 backdrop-blur-xl sm:p-6">
              <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white">Codes apprenants</h2>
                  <p className="mt-1 text-sm text-slate-400">Recherche, suivi, révocation et réactivation.</p>
                </div>
                <div className="relative w-full xl:max-w-sm">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher nom, email, statut…" className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-11 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-blue-300 focus:ring-4 focus:ring-blue-400/10" />
                </div>
              </div>

              {filteredCodes.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center">
                  <KeyRound className="mx-auto h-9 w-9 text-slate-500" />
                  <p className="mt-4 text-lg font-black text-white">Aucun code trouvé</p>
                  <p className="mt-2 text-sm text-slate-400">Crée un code ou ajuste la recherche.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCodes.map((code) => (
                    <article key={code.id} className="rounded-3xl border border-white/10 bg-slate-950/45 p-4 transition hover:bg-slate-950/65">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-black text-white">{code.student_name}</h3>
                            <StatusBadge status={code.status} />
                          </div>
                          <p className="mt-1 text-sm font-semibold text-slate-400">{code.student_email || "Email non renseigné"}</p>
                          <p className="mt-2 text-sm text-slate-300">{code.label || "Formation"}</p>
                          {code.partner_code && <p className="mt-3 inline-flex rounded-xl border border-blue-300/20 bg-blue-400/10 px-3 py-1 font-mono text-xs font-bold text-blue-100">{code.partner_code}</p>}
                          {code.notes && <p className="mt-3 text-xs leading-5 text-slate-500">{code.notes}</p>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {code.status !== "revoked" && (
                            <button type="button" onClick={() => updateCodeStatus(code.id, "revoke")} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs font-black text-red-100 transition hover:bg-red-400/15 disabled:opacity-60"><XCircle size={14} /> Révoquer</button>
                          )}
                          {code.status !== "active" && (
                            <button type="button" onClick={() => updateCodeStatus(code.id, "reactivate")} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100 transition hover:bg-emerald-400/15 disabled:opacity-60"><RotateCcw size={14} /> Réactiver</button>
                          )}
                        </div>
                      </div>

                      <dl className="mt-4 grid gap-3 text-xs text-slate-400 sm:grid-cols-2 xl:grid-cols-5">
                        {[
                          ["Utilisation", `${code.used_count} / ${code.max_uses}`],
                          ["Créé le", formatDate(code.created_at)],
                          ["Dernière utilisation", formatDate(code.last_used_at)],
                          ["Expiration code", formatDate(code.expires_at)],
                          ["Accès jusqu’au", formatDate(code.access_until)],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                            <dt className="font-bold text-slate-500">{label}</dt>
                            <dd className="mt-1 font-black text-slate-200">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
