import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  createAccessSession,
} from "@/lib/accessControl";
import { verifyPartnerBridgeContext } from "@/lib/partnerBridge";
import { findGrantByPartnerCode, summarizeGrant } from "@/lib/formationAccessAdmin";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const partner = verifyPartnerBridgeContext(
    typeof body?.partner_ctx === "string" ? body.partner_ctx : null,
    typeof body?.partner_sig === "string" ? body.partner_sig : null
  );

  if (!partner) {
    return jsonError("Session partenaire introuvable ou expirée.", 401);
  }

  const grant = await findGrantByPartnerCode(partner.partner_code);
  const summary = summarizeGrant(grant);

  if (summary.status !== "active" || !grant) {
    return NextResponse.json({ ok: false, status: summary.status, access_until: summary.access_until }, { status: 404 });
  }

  const maxAge = 60 * 60 * 24 * 90;
  const accessSession = await createAccessSession(
    {
      sub: grant.id,
      name: grant.student_name || grant.partner_name || partner.partner_name || "Apprenant KORYXA",
      email: grant.student_email || grant.partner_email || partner.partner_email || null,
    },
    maxAge
  );

  const response = NextResponse.json({ ok: true, access_until: summary.access_until });

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
