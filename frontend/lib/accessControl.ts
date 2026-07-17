export const ACCESS_COOKIE_NAME = "koryxa_formation_access";

type AccessSessionPayload = {
  sub: string;
  name?: string | null;
  email?: string | null;
  course?: string | null;
  iat: number;
  exp: number;
};

function getAccessSecret() {
  return (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();
}

function base64UrlEncode(input: string | Uint8Array) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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

export async function accessTokenFor(code: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code.trim());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAccessSession(
  payload: Pick<AccessSessionPayload, "sub" | "name" | "email" | "course">,
  maxAgeSeconds = 60 * 60 * 24 * 90
) {
  const secret = getAccessSecret();

  if (!secret) {
    throw new Error("KORYXA_IDENTITY_BRIDGE_KEY is not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const sessionPayload: AccessSessionPayload = {
    sub: payload.sub,
    name: payload.name ?? null,
    email: payload.email ?? null,
    course: payload.course ?? "python-data-analyst",
    iat: now,
    exp: now + maxAgeSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(sessionPayload));
  const signature = await hmacSha256(encodedPayload, secret);

  return `v1.${encodedPayload}.${signature}`;
}

export async function getAccessSessionPayload(value?: string | null) {
  if (!value) return null;

  const secret = getAccessSecret();
  if (!secret) return null;

  const [version, encodedPayload, signature] = value.split(".");
  if (version !== "v1" || !encodedPayload || !signature) return null;

  const expectedSignature = await hmacSha256(encodedPayload, secret);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AccessSessionPayload;
    if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function isValidAccessSession(value?: string | null) {
  return Boolean(await getAccessSessionPayload(value));
}
