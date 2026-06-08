import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";

type RouteParams = {
  params: {
    id: string;
  };
};

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

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const admin = await requireAdmin(request);
  if (admin.response) return admin.response;

  const config = getSupabaseConfig();
  if (!config) return jsonError("Supabase n'est pas configuré côté serveur.", 503);

  const body = await request.json().catch(() => null);
  const action = typeof body?.action === "string" ? body.action : "";

  const updates: Record<string, string | number | null> = {};

  if (action === "revoke") {
    updates.status = "revoked";
  } else if (action === "reactivate") {
    updates.status = "active";
  } else if (action === "expire") {
    updates.status = "expired";
  } else if (action === "update") {
    if (typeof body?.student_name === "string") updates.student_name = body.student_name.trim();
    if (typeof body?.student_email === "string") updates.student_email = body.student_email.trim().toLowerCase() || null;
    if (typeof body?.label === "string") updates.label = body.label.trim() || null;
    if (typeof body?.notes === "string") updates.notes = body.notes.trim() || null;
    if (typeof body?.expires_at === "string") updates.expires_at = body.expires_at || null;
    if (typeof body?.max_uses !== "undefined") {
      const maxUsesRaw = Number(body.max_uses);
      updates.max_uses = Number.isFinite(maxUsesRaw) ? Math.min(Math.max(Math.floor(maxUsesRaw), 1), 10) : 1;
    }
  } else {
    return jsonError("Action admin inconnue.");
  }

  if (Object.keys(updates).length === 0) {
    return jsonError("Aucune modification à appliquer.");
  }

  const response = await fetch(`${config.url}/rest/v1/formation_access_codes?id=eq.${params.id}`, {
    method: "PATCH",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    return jsonError("Impossible de mettre à jour ce code.", 502);
  }

  const rows = await response.json();
  return NextResponse.json({ code: rows[0] || null });
}
