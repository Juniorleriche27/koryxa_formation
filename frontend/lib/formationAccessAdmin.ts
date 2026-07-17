import { accessTokenFor } from "@/lib/accessControl";

export type FormationAccessGrant = {
  id: string;
  course_id: string;
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
};

export type FormationAccessStatus = "active" | "none" | "revoked" | "expired";

const SELECT_COLUMNS = [
  "id",
  "course_id",
  "student_name",
  "student_email",
  "label",
  "status",
  "max_uses",
  "used_count",
  "first_used_at",
  "last_used_at",
  "expires_at",
  "notes",
  "partner_code",
  "partner_email",
  "partner_name",
  "activated_at",
  "access_until",
  "created_at",
].join(",");

function getSupabaseConfig() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!rawUrl || !serviceRoleKey) return null;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("URL Supabase Formation invalide.");
  }

  if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) {
    throw new Error(`URL Supabase Formation refusée: ${url.hostname || "hôte inconnu"}.`);
  }

  return {
    url: url.origin,
    serviceRoleKey,
  };
}

export async function findCourseBySlug(slug: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetchSupabase(
    `${config.url}/rest/v1/courses?select=id,slug,title&slug=eq.${encodeURIComponent(slug)}&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
    "Lecture parcours formation"
  );

  const rows = (await response.json()) as Array<{ id: string; slug: string; title: string }>;
  return rows[0] || null;
}

export async function grantMatchesCourse(grant: FormationAccessGrant, slug: string) {
  const course = await findCourseBySlug(slug);
  return Boolean(course && grant.course_id === course.id);
}

export function getInternalSecret() {
  return (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();
}

function describeFetchFailure(error: unknown) {
  if (!(error instanceof Error)) return "cause inconnue";

  const cause = "cause" in error ? error.cause : null;
  if (cause instanceof Error) return cause.message;

  if (cause && typeof cause === "object") {
    const record = cause as Record<string, unknown>;
    return String(record.code || record.message || error.message || "cause inconnue");
  }

  return error.message || "cause inconnue";
}

async function fetchSupabase(input: string, init: RequestInit, context: string) {
  let response: Response;

  try {
    response = await fetch(input, init);
  } catch (error) {
    throw new Error(`${context}: connexion Supabase impossible (${describeFetchFailure(error)}).`);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${context}: Supabase a répondu HTTP ${response.status}${detail ? ` — ${detail.slice(0, 180)}` : ""}.`);
  }

  return response;
}

function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  next.setHours(23, 59, 59, 0);
  return next;
}

function isExpired(grant: FormationAccessGrant) {
  const expiresAt = grant.access_until || grant.expires_at;
  return Boolean(expiresAt && new Date(expiresAt).getTime() < Date.now());
}

export function summarizeGrant(grant: FormationAccessGrant | null) {
  if (!grant) {
    return { status: "none" as FormationAccessStatus, grant: null, access_until: null };
  }

  if (grant.status === "revoked") {
    return { status: "revoked" as FormationAccessStatus, grant, access_until: grant.access_until || grant.expires_at };
  }

  if (grant.status === "expired" || isExpired(grant)) {
    return { status: "expired" as FormationAccessStatus, grant, access_until: grant.access_until || grant.expires_at };
  }

  return { status: "active" as FormationAccessStatus, grant, access_until: grant.access_until || grant.expires_at };
}

export async function findGrantByCodeHash(codeHash: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetchSupabase(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&code_hash=eq.${encodeURIComponent(codeHash)}&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
    "Lecture accès formation par code"
  );

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}

export async function findGrantById(id: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetchSupabase(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&id=eq.${encodeURIComponent(id)}&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
    "Lecture accès formation par ID"
  );

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}

export async function findGrantByPartnerCode(partnerCode: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetchSupabase(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&partner_code=eq.${encodeURIComponent(partnerCode)}&order=created_at.desc&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    },
    "Lecture accès formation par code partenaire"
  );

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}

export async function grantPartnerFormationAccess(params: {
  partnerCode: string;
  partnerEmail?: string | null;
  partnerName?: string | null;
  months?: number;
  assignedBy?: string | null;
}) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const partnerCode = params.partnerCode.trim();
  const now = new Date();
  const months = Number.isFinite(params.months) ? Math.min(Math.max(Math.floor(params.months || 2), 1), 24) : 2;
  const accessUntil = addMonths(now, months).toISOString();
  const studentName = params.partnerName?.trim() || partnerCode;
  const studentEmail = params.partnerEmail?.trim().toLowerCase() || null;
  const existing = await findGrantByPartnerCode(partnerCode);

  if (existing) {
    const response = await fetchSupabase(`${config.url}/rest/v1/formation_access_codes?id=eq.${existing.id}&select=${SELECT_COLUMNS}`, {
      method: "PATCH",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        student_name: studentName,
        student_email: studentEmail,
        partner_name: params.partnerName || null,
        partner_email: studentEmail,
        status: "used",
        used_count: Math.max(existing.used_count || 0, 1),
        first_used_at: existing.first_used_at || now.toISOString(),
        last_used_at: now.toISOString(),
        activated_at: existing.activated_at || now.toISOString(),
        access_until: accessUntil,
        expires_at: accessUntil,
        label: existing.label || "Formation Python Data",
        notes: `Accès attribué depuis admin partenaire${params.assignedBy ? ` par ${params.assignedBy}` : ""}`,
      }),
    }, "Mise à jour accès formation");

    const rows = (await response.json()) as FormationAccessGrant[];
    return rows[0];
  }

  const codeHash = await accessTokenFor(`PARTNER-GRANT:${partnerCode}`);
  const response = await fetchSupabase(`${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      code_hash: codeHash,
      student_name: studentName,
      student_email: studentEmail,
      label: "Formation Python Data",
      status: "used",
      max_uses: 1,
      used_count: 1,
      first_used_at: now.toISOString(),
      last_used_at: now.toISOString(),
      expires_at: accessUntil,
      notes: `Accès attribué depuis admin partenaire${params.assignedBy ? ` par ${params.assignedBy}` : ""}`,
      partner_code: partnerCode,
      partner_email: studentEmail,
      partner_name: params.partnerName || null,
      activated_at: now.toISOString(),
      access_until: accessUntil,
      created_by_admin_email: params.assignedBy || null,
    }),
  }, "Création accès formation");

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0];
}

export async function revokePartnerFormationAccess(partnerCode: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const existing = await findGrantByPartnerCode(partnerCode.trim());
  if (!existing) return null;

  const response = await fetchSupabase(`${config.url}/rest/v1/formation_access_codes?id=eq.${existing.id}&select=${SELECT_COLUMNS}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status: "revoked" }),
  }, "Révocation accès formation");
  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}
