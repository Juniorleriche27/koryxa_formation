import { accessTokenFor } from "@/lib/accessControl";

export type FormationAccessGrant = {
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
  koryxa_admin_user_id: string | null;
  koryxa_admin_email: string | null;
  koryxa_admin_name: string | null;
  auth_provider: string | null;
  last_admin_sync_at: string | null;
  created_at: string;
};

export type FormationAccessStatus = "active" | "none" | "revoked" | "expired";

const SELECT_COLUMNS = [
  "id",
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
  "koryxa_admin_user_id",
  "koryxa_admin_email",
  "koryxa_admin_name",
  "auth_provider",
  "last_admin_sync_at",
  "created_at",
].join(",");

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

export function getInternalSecret() {
  return (process.env.KORYXA_FORMATION_PARTNER_BRIDGE_SECRET || "").trim();
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

export async function findGrantById(id: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetch(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&id=eq.${encodeURIComponent(id)}&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Impossible de lire l'accès formation.");

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}

export async function findGrantByPartnerCode(partnerCode: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetch(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&partner_code=eq.${encodeURIComponent(partnerCode)}&order=created_at.desc&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Impossible de lire l'accès formation.");

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}


export async function findGrantByKoryxaAdminUserId(koryxaAdminUserId: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const response = await fetch(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&koryxa_admin_user_id=eq.${encodeURIComponent(koryxaAdminUserId)}&order=created_at.desc&limit=1`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Impossible de lire l'accès KORYXA Admin formation.");

  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}

export async function grantKoryxaAdminFormationAccess(params: {
  koryxaAdminUserId: string;
  email?: string | null;
  name?: string | null;
  roleKey?: string | null;
  months?: number;
}) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const now = new Date();
  const months = Number.isFinite(params.months) ? Math.min(Math.max(Math.floor(params.months || 2), 1), 24) : 2;
  const accessUntil = addMonths(now, months).toISOString();
  const certificateEligibleFrom = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString();
  const email = params.email?.trim().toLowerCase() || null;
  const name = params.name?.trim() || email || params.koryxaAdminUserId;
  const existing = await findGrantByKoryxaAdminUserId(params.koryxaAdminUserId);

  if (existing) {
    const updatePayload: Record<string, string | number | null> = {
      student_name: name,
      student_email: email,
      status: existing.status === "revoked" ? "revoked" : "used",
      used_count: Math.max(existing.used_count || 0, 1),
      first_used_at: existing.first_used_at || now.toISOString(),
      last_used_at: now.toISOString(),
      activated_at: existing.activated_at || now.toISOString(),
      access_until: existing.access_until || accessUntil,
      expires_at: existing.expires_at || accessUntil,
      koryxa_admin_email: email,
      koryxa_admin_name: name,
      auth_provider: "koryxa_admin",
      last_admin_sync_at: now.toISOString(),
      notes: `Accès synchronisé depuis KORYXA Admin${params.roleKey ? ` (${params.roleKey})` : ""}`,
    };

    if (!existing.activated_at) {
      updatePayload.certificate_eligible_from = certificateEligibleFrom;
    }

    const response = await fetch(`${config.url}/rest/v1/formation_access_codes?id=eq.${existing.id}&select=${SELECT_COLUMNS}`, {
      method: "PATCH",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(updatePayload),
    });

    if (!response.ok) throw new Error("Impossible de mettre à jour l'accès KORYXA Admin formation.");
    const rows = (await response.json()) as FormationAccessGrant[];
    return rows[0];
  }

  const codeHash = await accessTokenFor(`KORYXA-ADMIN:${params.koryxaAdminUserId}`);
  const response = await fetch(`${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}`, {
    method: "POST",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      code_hash: codeHash,
      student_name: name,
      student_email: email,
      label: "KORYXA Admin · Formation IA",
      status: "used",
      max_uses: 1,
      used_count: 1,
      first_used_at: now.toISOString(),
      last_used_at: now.toISOString(),
      expires_at: accessUntil,
      activated_at: now.toISOString(),
      access_until: accessUntil,
      certificate_eligible_from: certificateEligibleFrom,
      created_by_admin_email: email,
      koryxa_admin_user_id: params.koryxaAdminUserId,
      koryxa_admin_email: email,
      koryxa_admin_name: name,
      auth_provider: "koryxa_admin",
      last_admin_sync_at: now.toISOString(),
      notes: `Accès créé depuis KORYXA Admin${params.roleKey ? ` (${params.roleKey})` : ""}`,
    }),
  });

  if (!response.ok) throw new Error("Impossible de créer l'accès KORYXA Admin formation.");
  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0];
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
    const response = await fetch(`${config.url}/rest/v1/formation_access_codes?id=eq.${existing.id}&select=${SELECT_COLUMNS}`, {
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
    });

    if (!response.ok) throw new Error("Impossible de mettre à jour l'accès formation.");
    const rows = (await response.json()) as FormationAccessGrant[];
    return rows[0];
  }

  const codeHash = await accessTokenFor(`PARTNER-GRANT:${partnerCode}`);
  const response = await fetch(`${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}`, {
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
  });

  if (!response.ok) throw new Error("Impossible de créer l'accès formation.");
  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0];
}

export async function revokePartnerFormationAccess(partnerCode: string) {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase formation non configuré.");

  const existing = await findGrantByPartnerCode(partnerCode.trim());
  if (!existing) return null;

  const response = await fetch(`${config.url}/rest/v1/formation_access_codes?id=eq.${existing.id}&select=${SELECT_COLUMNS}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ status: "revoked" }),
  });

  if (!response.ok) throw new Error("Impossible de révoquer l'accès formation.");
  const rows = (await response.json()) as FormationAccessGrant[];
  return rows[0] || null;
}
