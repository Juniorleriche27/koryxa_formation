import { createHmac, timingSafeEqual } from "crypto";

export type PartnerBridgePayload = {
  partner_code: string;
  partner_email?: string | null;
  partner_name?: string | null;
  exp: number;
};

function getBridgeSecret() {
  return (
    process.env.KORYXA_ADMIN_FORMATION_BRIDGE_SECRET ||
    process.env.KORYXA_FORMATION_INTERNAL_SECRET ||
    process.env.KORYXA_FORMATION_PARTNER_BRIDGE_SECRET ||
    ""
  ).trim();
}

function signPayload(encodedPayload: string, secret: string) {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function signaturesMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export function verifyPartnerBridgeContext(ctx?: string | null, sig?: string | null) {
  const secret = getBridgeSecret();
  if (!secret || !ctx || !sig) return null;

  const expectedSignature = signPayload(ctx, secret);
  if (!signaturesMatch(sig, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(ctx, "base64url").toString("utf8")) as PartnerBridgePayload;

    if (!payload.partner_code || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return {
      partner_code: payload.partner_code.trim(),
      partner_email: payload.partner_email?.trim().toLowerCase() || null,
      partner_name: payload.partner_name?.trim() || null,
    };
  } catch {
    return null;
  }
}
