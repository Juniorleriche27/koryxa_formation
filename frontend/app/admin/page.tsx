"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogOut,
  RefreshCw,
  RotateCcw,
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
  active: "border-emerald-400/25 bg-emerald-500/10 text-emerald-200",
  used: "border-blue-400/25 bg-blue-500/10 text-blue-200",
  revoked: "border-red-400/25 bg-red-500/10 text-red-200",
  expired: "border-orange-400/25 bg-orange-500/10 text-orange-200",
};

function toInputDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function defaultExpirationDate() {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  return toInputDate(date);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [sessionEmail, setSessionEmail] = useState("");
  const [codes, setCodes] = useState<AccessCode[]>([]);
  const [createForm, setCreateForm] = useState<CreateFormState>({
    ...initialCreateForm,
    expires_at: defaultExpirationDate(),
  });
  const [newCode, setNewCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const stats = useMemo(() => {
    return {
      total: codes.length,
      active: codes.filter((code) => code.status === "active").length,
      used: codes.filter((code) => code.status === "used").length,
      revoked: codes.filter((code) => code.status === "revoked").length,
    };
  }, [codes]);

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
      <main className="flex min-h-screen items-center justify-center bg-[#050c1a] px-4 text-white">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <Loader2 className="h-5 w-5 animate-spin text-blue-300" />
          <span className="text-sm text-slate-300">Chargement de l&apos;espace admin...</span>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050c1a] px-4 py-10 text-white">
        <section className="w-full max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <span className="font-bold text-blue-400">KORYXA</span>
            <span>Formation Admin</span>
          </Link>

          <form onSubmit={login} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-blue-950/30 sm:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/15">
              <LockKeyhole className="text-blue-300" size={24} />
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">Espace administrateur</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connecte-toi pour créer, suivre et révoquer les codes d&apos;accès des apprenants.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-300">
                  Email admin
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label htmlFor="admin-secret" className="mb-2 block text-sm font-medium text-slate-300">
                  Clé admin privée
                </label>
                <input
                  id="admin-secret"
                  type="password"
                  value={adminSecret}
                  onChange={(event) => setAdminSecret(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving || !adminEmail.trim() || !adminSecret.trim()}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck size={18} />}
              Entrer dans l&apos;admin
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050c1a] px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-blue-950/20 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Admin formation
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Gestion des apprenants</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Crée des codes uniques, suis leur utilisation et révoque l&apos;accès quand la période de formation est terminée.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
            <span className="rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-sm text-slate-300">
              {sessionEmail}
            </span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-slate-400">Total codes</p>
            <p className="mt-2 text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-5">
            <p className="text-sm text-emerald-200/80">Actifs</p>
            <p className="mt-2 text-3xl font-bold text-emerald-100">{stats.active}</p>
          </div>
          <div className="rounded-2xl border border-blue-400/15 bg-blue-500/10 p-5">
            <p className="text-sm text-blue-200/80">Utilisés</p>
            <p className="mt-2 text-3xl font-bold text-blue-100">{stats.used}</p>
          </div>
          <div className="rounded-2xl border border-red-400/15 bg-red-500/10 p-5">
            <p className="text-sm text-red-200/80">Révoqués</p>
            <p className="mt-2 text-3xl font-bold text-red-100">{stats.revoked}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <form onSubmit={createCode} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-blue-950/20 sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-500/10">
                <UserPlus className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Créer un code unique</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Le code est affiché une seule fois après création. La base garde seulement son empreinte sécurisée.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="student-name" className="mb-2 block text-sm font-medium text-slate-300">
                  Nom de l&apos;apprenant
                </label>
                <input
                  id="student-name"
                  value={createForm.student_name}
                  onChange={(event) => setCreateForm({ ...createForm, student_name: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label htmlFor="student-email" className="mb-2 block text-sm font-medium text-slate-300">
                  Email de l&apos;apprenant
                </label>
                <input
                  id="student-email"
                  type="email"
                  value={createForm.student_email}
                  onChange={(event) => setCreateForm({ ...createForm, student_email: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label htmlFor="label" className="mb-2 block text-sm font-medium text-slate-300">
                  Libellé
                </label>
                <input
                  id="label"
                  value={createForm.label}
                  onChange={(event) => setCreateForm({ ...createForm, label: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="max-uses" className="mb-2 block text-sm font-medium text-slate-300">
                    Utilisations max
                  </label>
                  <input
                    id="max-uses"
                    type="number"
                    min="1"
                    max="10"
                    value={createForm.max_uses}
                    onChange={(event) => setCreateForm({ ...createForm, max_uses: event.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                <div>
                  <label htmlFor="expires-at" className="mb-2 block text-sm font-medium text-slate-300">
                    Expire le
                  </label>
                  <input
                    id="expires-at"
                    type="date"
                    value={createForm.expires_at}
                    onChange={(event) => setCreateForm({ ...createForm, expires_at: event.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="custom-code" className="mb-2 block text-sm font-medium text-slate-300">
                  Code personnalisé optionnel
                </label>
                <input
                  id="custom-code"
                  value={createForm.code}
                  onChange={(event) => setCreateForm({ ...createForm, code: event.target.value })}
                  placeholder="Laisse vide pour générer automatiquement"
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-300">
                  Notes internes
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={createForm.notes}
                  onChange={(event) => setCreateForm({ ...createForm, notes: event.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071326] px-4 py-3 text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving || !createForm.student_name.trim()}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound size={18} />}
              Créer le code
            </button>
          </form>

          <section className="space-y-4">
            {(message || error || newCode) && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                {message && (
                  <div className="flex gap-3 text-sm text-emerald-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>{message}</p>
                  </div>
                )}
                {error && (
                  <div className="flex gap-3 text-sm text-red-200">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
                {newCode && (
                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/70">Code à envoyer</p>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <code className="rounded-xl bg-[#050c1a] px-4 py-3 text-lg font-bold text-emerald-100">
                        {newCode}
                      </code>
                      <button
                        type="button"
                        onClick={copyNewCode}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/10"
                      >
                        <Copy size={16} />
                        Copier
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-blue-950/20 sm:p-6">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Codes apprenants</h2>
                  <p className="mt-1 text-sm text-slate-400">Suivi des accès à la formation.</p>
                </div>
                <button
                  type="button"
                  onClick={loadCodes}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5"
                >
                  <RefreshCw size={16} />
                  Actualiser
                </button>
              </div>

              {codes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                  <KeyRound className="mx-auto h-8 w-8 text-slate-500" />
                  <p className="mt-3 font-semibold">Aucun code créé</p>
                  <p className="mt-1 text-sm text-slate-400">Crée le premier code pour donner accès à un apprenant.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {codes.map((code) => (
                    <article key={code.id} className="rounded-2xl border border-white/10 bg-[#071326] p-4">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-white">{code.student_name}</h3>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[code.status]}`}>
                              {statusLabels[code.status]}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-400">{code.student_email || "Email non renseigné"}</p>
                          <p className="mt-2 text-sm text-slate-300">{code.label || "Formation"}</p>
                          {code.notes && <p className="mt-2 text-xs leading-5 text-slate-500">{code.notes}</p>}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {code.status !== "revoked" && (
                            <button
                              type="button"
                              onClick={() => updateCodeStatus(code.id, "revoke")}
                              disabled={saving}
                              className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10 disabled:opacity-60"
                            >
                              <XCircle size={14} />
                              Révoquer
                            </button>
                          )}
                          {code.status !== "active" && (
                            <button
                              type="button"
                              onClick={() => updateCodeStatus(code.id, "reactivate")}
                              disabled={saving}
                              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/10 disabled:opacity-60"
                            >
                              <RotateCcw size={14} />
                              Réactiver
                            </button>
                          )}
                        </div>
                      </div>

                      <dl className="mt-4 grid gap-3 text-xs text-slate-400 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                          <dt>Utilisation</dt>
                          <dd className="mt-1 font-semibold text-slate-200">
                            {code.used_count} / {code.max_uses}
                          </dd>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                          <dt>Créé le</dt>
                          <dd className="mt-1 font-semibold text-slate-200">{formatDate(code.created_at)}</dd>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                          <dt>Dernière utilisation</dt>
                          <dd className="mt-1 font-semibold text-slate-200">{formatDate(code.last_used_at)}</dd>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                          <dt>Expiration</dt>
                          <dd className="mt-1 font-semibold text-slate-200">{formatDate(code.expires_at)}</dd>
                        </div>
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
