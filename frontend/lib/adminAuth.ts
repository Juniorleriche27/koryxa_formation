import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "koryxa_formation_admin";

type AdminSessionPayload = {
  email: string;
  iat: number;
  exp: number;
};

function getAdminSecret() {
  return (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();
}

function getAdminEmail() {
  return (process.env.KORYXA_ADMIN_EMAIL || "").trim().toLowerCase();
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

export function adminConfigIsReady() {
  return Boolean(getAdminEmail() && getAdminSecret());
}

export function adminEmailMatches(email: string) {
  return email.trim().toLowerCase() === getAdminEmail();
}

export function adminSecretMatches(secret: string) {
  return secret === getAdminSecret();
}

export function getConfiguredAdminEmail() {
  return getAdminEmail();
}

export async function createAdminSession(email: string, maxAgeSeconds = 60 * 60 * 8) {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("KORYXA_IDENTITY_BRIDGE_KEY is not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    email: email.trim().toLowerCase(),
    iat: now,
    exp: now + maxAgeSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(encodedPayload, secret);

  return `v1.${encodedPayload}.${signature}`;
}

export async function getAdminSessionEmail(value?: string | null) {
  if (!value) return null;

  const secret = getAdminSecret();
  if (!secret) return null;

  const parts = value.split(".");
  const version = parts[0];
  const encodedPayload = parts[1];
  const signature = parts[2];

  if (version !== "v1" || !encodedPayload || !signature) return null;

  const expectedSignature = await hmacSha256(encodedPayload, secret);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;

    if (typeof payload.exp !== "number" || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    if (!adminEmailMatches(payload.email)) {
      return null;
    }

    return payload.email;
  } catch {
    return null;
  }
}

export async function requireAdmin(request: NextRequest) {
  const email = await getAdminSessionEmail(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (!email) {
    return {
      email: null,
      response: NextResponse.json({ message: "Session administrateur requise." }, { status: 401 }),
    };
  }

  return { email, response: null };
}
