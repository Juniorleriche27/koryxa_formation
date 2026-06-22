import { NextRequest, NextResponse } from "next/server";
import {
  findGrantByPartnerCode,
  getInternalSecret,
  grantPartnerFormationAccess,
  revokePartnerFormationAccess,
  summarizeGrant,
} from "@/lib/formationAccessAdmin";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

function requireInternalSecret(request: NextRequest) {
  const expected = getInternalSecret();
  const provided = request.headers.get("x-koryxa-internal-secret") || "";
  return Boolean(expected && provided && provided === expected);
}

export async function POST(request: NextRequest) {
  if (!requireInternalSecret(request)) {
    return jsonError("Accès serveur non autorisé.", 401);
  }

  const body = await request.json().catch(() => null);
  const action = typeof body?.action === "string" ? body.action : "status";
  const partnerCode = typeof body?.partner_code === "string" ? body.partner_code.trim() : "";

  if (!partnerCode) {
    return jsonError("Le code partenaire est requis.");
  }

  try {
    if (action === "status") {
      const grant = await findGrantByPartnerCode(partnerCode);
      return NextResponse.json({ success: true, ...summarizeGrant(grant) });
    }

    if (action === "grant") {
      const grant = await grantPartnerFormationAccess({
        partnerCode,
        partnerEmail: typeof body?.partner_email === "string" ? body.partner_email : null,
        partnerName: typeof body?.partner_name === "string" ? body.partner_name : null,
        months: Number(body?.months || 2),
        assignedBy: typeof body?.assigned_by === "string" ? body.assigned_by : null,
      });

      return NextResponse.json({ success: true, ...summarizeGrant(grant), grant });
    }

    if (action === "revoke") {
      const grant = await revokePartnerFormationAccess(partnerCode);
      return NextResponse.json({ success: true, ...summarizeGrant(grant), grant });
    }

    return jsonError("Action formation inconnue.");
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur accès formation.", 502);
  }
}
