import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  accessTokenFor,
  createAccessSession,
} from "@/lib/accessControl";

type RedeemAccessResponse = {
  ok?: boolean;
  id?: string;
  student_name?: string | null;
  student_email?: string | null;
  reason?: "invalid" | "used" | "revoked" | "expired" | string;
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Code incorrect. Vérifie le code reçu après validation du paiement.",
  used: "Ce code a déjà été utilisé. Contacte le support KORYXA si tu penses qu'il s'agit d'une erreur.",
  revoked: "Ce code a été désactivé. Contacte le support KORYXA.",
  expired: "Ce code a expiré. Contacte le support KORYXA pour renouveler ton accès.",
};

async function redeemCodeWithSupabase(code: string): Promise<RedeemAccessResponse> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { ok: false, reason: "not_configured" };
  }

  const codeHash = await accessTokenFor(code);
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/redeem_formation_access_code`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_code_hash: codeHash }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, reason: "server_error" };
  }

  return response.json();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!code) {
    return NextResponse.json(
      { message: "Entre le code reçu après validation du paiement." },
      { status: 400 }
    );
  }

  const redeemResult = await redeemCodeWithSupabase(code);

  if (!redeemResult.ok) {
    const legacyCode = process.env.KORYXA_FORMATION_ACCESS_CODE?.trim();
    const legacyAccepted = legacyCode && code === legacyCode;

    if (!legacyAccepted) {
      const message =
        ERROR_MESSAGES[redeemResult.reason || ""] ||
        "Impossible de valider ce code pour le moment. Réessaie dans quelques instants.";

      return NextResponse.json({ message }, { status: redeemResult.reason === "server_error" ? 503 : 401 });
    }
  }

  const maxAge = 60 * 60 * 24 * 90;
  const accessSession = await createAccessSession(
    {
      sub: redeemResult.id || "legacy-access",
      name: redeemResult.student_name || "Apprenant KORYXA",
      email: redeemResult.student_email || null,
    },
    maxAge
  );
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: accessSession,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });

  return response;
}
