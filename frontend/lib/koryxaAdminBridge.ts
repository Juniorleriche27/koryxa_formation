export type KoryxaAdminBridgePayload = {
  v: 1;
  project: "koryxa-formation";
  clerk_user_id: string;
  email: string | null;
  name: string | null;
  role_key?: string | null;
  iat: number;
  exp: number;
  redirect: string;
};

function getBridgeSecret() {
  return (process.env.KORYXA_ADMIN_FORMATION_BRIDGE_SECRET || "").trim();
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

function base64UrlEncode(input: Uint8Array) {
  let binary = "";

  for (let index = 0; index < input.length; index += 1) {
    binary += String.fromCharCode(input[index]);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function hmacSha256(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;

  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return result === 0;
}

export async function verifyKoryxaAdminBridge(ctx: string | null, sig: string | null) {
  const secret = getBridgeSecret();
  if (!secret || !ctx || !sig) return null;

  const expected = await hmacSha256(ctx, secret);
  if (!timingSafeEqual(expected, sig)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(ctx)) as KoryxaAdminBridgePayload;
    const now = Math.floor(Date.now() / 1000);

    if (payload.v !== 1) return null;
    if (payload.project !== "koryxa-formation") return null;
    if (!payload.clerk_user_id || typeof payload.clerk_user_id !== "string") return null;
    if (typeof payload.exp !== "number" || payload.exp < now) return null;
    if (typeof payload.iat !== "number" || payload.iat > now + 60) return null;

    return payload;
  } catch {
    return null;
  }
}

export function normalizeBridgeRedirect(value?: string | null) {
  if (!value || !value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//")) return "/dashboard";
  if (["/access", "/login", "/register"].includes(value)) return "/dashboard";
  return value;
}
