export const ACCESS_COOKIE_NAME = "koryxa_formation_access";

export async function accessTokenFor(code: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(code.trim());
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function getExpectedAccessToken() {
  const code = process.env.KORYXA_FORMATION_ACCESS_CODE;
  if (!code) return null;

  return accessTokenFor(code);
}
