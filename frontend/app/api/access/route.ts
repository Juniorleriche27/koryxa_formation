import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  accessTokenFor,
  createAccessSession,
} from "@/lib/accessControl";
import { verifyPartnerBridgeContext } from "@/lib/partnerBridge";
import { findGrantByCodeHash, findGrantById, grantMatchesCourse } from "@/lib/formationAccessAdmin";
import { normalizeCourseSlug } from "@/lib/courseConfig";

type RedeemAccessResponse = {
  ok?: boolean;
  id?: string;
  student_name?: string | null;
  student_email?: string | null;
  partner_code?: string | null;
  partner_email?: string | null;
  access_until?: string | null;
  reason?: "invalid" | "used" | "revoked" | "expired" | "bound_to_another_partner" | string;
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid: "Code incorrect. Vérifie le code reçu après validation du paiement.",
  used: "Ce code a déjà été utilisé. Contacte le support KORYXA si tu penses qu'il s'agit d'une erreur.",
  bound_to_another_partner: "Ce code est déjà lié à un autre compte partenaire.",
  revoked: "Ce code a été désactivé. Contacte le support KORYXA.",
  expired: "Ce code a expiré. Contacte le support KORYXA pour renouveler ton accès.",
};

async function redeemCodeWithSupabase(
  code: string,
  partner: { partner_code: string; partner_email: string | null; partner_name: string | null } | null
): Promise<RedeemAccessResponse> {
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
    body: JSON.stringify({
      p_code_hash: codeHash,
      p_partner_code: partner?.partner_code || null,
      p_partner_email: partner?.partner_email || null,
      p_partner_name: partner?.partner_name || null,
    }),
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
  const courseSlug = normalizeCourseSlug(typeof body?.course === "string" ? body.course : null);
  const partner = verifyPartnerBridgeContext(
    typeof body?.partner_ctx === "string" ? body.partner_ctx : null,
    typeof body?.partner_sig === "string" ? body.partner_sig : null
  );

  if (!code) {
    return NextResponse.json(
      { message: "Entre le code reçu après validation du paiement." },
      { status: 400 }
    );
  }

  const codeHash = await accessTokenFor(code);
  const requestedGrant = await findGrantByCodeHash(codeHash);
  if (!requestedGrant || !(await grantMatchesCourse(requestedGrant, courseSlug))) {
    return NextResponse.json(
      { message: "Ce code ne donne pas accès au parcours sélectionné." },
      { status: 403 }
    );
  }

  const redeemResult = await redeemCodeWithSupabase(code, partner);

  if (!redeemResult.ok) {
    const message =
      ERROR_MESSAGES[redeemResult.reason || ""] ||
      "Impossible de valider ce code. Utilise l’accès attribué depuis ton espace partenaire ou demande une réactivation.";

    return NextResponse.json({ message }, { status: redeemResult.reason === "server_error" ? 503 : 401 });
  }

  const grant = await findGrantById(redeemResult.id as string);
  if (!grant || !(await grantMatchesCourse(grant, courseSlug))) {
    return NextResponse.json(
      { message: "Ce code ne donne pas accès au parcours sélectionné." },
      { status: 403 }
    );
  }

  const maxAge = 60 * 60 * 24 * 90;
  const accessSession = await createAccessSession(
    {
      sub: redeemResult.id as string,
      name: redeemResult.student_name || partner?.partner_name || "Apprenant KORYXA",
      email: redeemResult.student_email || redeemResult.partner_email || partner?.partner_email || null,
      course: courseSlug,
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
