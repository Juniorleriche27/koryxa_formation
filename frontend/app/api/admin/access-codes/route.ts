import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { accessTokenFor } from "@/lib/accessControl";

type AccessCodeRow = {
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
  "created_at",
  "created_by_admin_email",
].join(",");

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceRoleKey,
  };
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ message }, { status });
}

function randomSegment(length: number) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);

  let output = "";
  for (let index = 0; index < values.length; index += 1) {
    output += alphabet[values[index] % alphabet.length];
  }

  return output;
}

function generateAccessCode() {
  const prefix = (process.env.KORYXA_ACCESS_CODE_PREFIX || "O").trim().toUpperCase() || "O";
  return `${prefix}-${randomSegment(4)}-${randomSegment(4)}-${randomSegment(4)}`;
}

function defaultExpiresAt() {
  const date = new Date();
  date.setMonth(date.getMonth() + 2);
  date.setHours(23, 59, 59, 0);
  return date.toISOString();
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const response = await fetch(
    `${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}&order=created_at.desc`,
    {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return jsonError("Impossible de charger les codes d'accès.", 502);
  }

  const codes = (await response.json()) as AccessCodeRow[];
  return NextResponse.json({ codes });
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const body = await request.json().catch(() => null);
  const studentName = typeof body?.student_name === "string" ? body.student_name.trim() : "";
  const studentEmail = typeof body?.student_email === "string" ? body.student_email.trim().toLowerCase() : "";
  const label = typeof body?.label === "string" ? body.label.trim() : "Formation Python Data";
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const requestedCode = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  const maxUsesRaw = Number(body?.max_uses || 2);
  const maxUses = Number.isFinite(maxUsesRaw) ? Math.min(Math.max(Math.floor(maxUsesRaw), 1), 10) : 2;
  const expiresAt = typeof body?.expires_at === "string" && body.expires_at ? body.expires_at : defaultExpiresAt();

  if (!studentName) {
    return jsonError("Le nom de l'apprenant est requis.");
  }

  const plainCode = requestedCode || generateAccessCode();
  const codeHash = await accessTokenFor(plainCode);

  const insertResponse = await fetch(`${config.url}/rest/v1/formation_access_codes?select=${SELECT_COLUMNS}`, {
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
      student_email: studentEmail || null,
      label: label || "Formation Python Data",
      max_uses: maxUses,
      expires_at: expiresAt,
      notes: notes || null,
      created_by_admin_email: admin.email,
    }),
  });

  if (!insertResponse.ok) {
    const details = await insertResponse.text().catch(() => "");
    const duplicate = details.includes("duplicate") || details.includes("23505");

    return jsonError(
      duplicate ? "Ce code existe déjà. Génère un autre code." : "Impossible de créer le code d'accès.",
      duplicate ? 409 : 502
    );
  }

  const rows = (await insertResponse.json()) as AccessCodeRow[];
  return NextResponse.json({ code: rows[0], plain_code: plainCode }, { status: 201 });
}
