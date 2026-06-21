export const FORMATION_PUBLIC_URL = (
  process.env.NEXT_PUBLIC_FORMATION_PUBLIC_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://formation.koryxa.fr"
).replace(/\/$/, "");

export const KORYXA_ADMIN_URL = (
  process.env.NEXT_PUBLIC_KORYXA_ADMIN_URL ||
  "https://admin.koryxa.fr"
).replace(/\/$/, "");

export function buildKoryxaAdminAuthUrl(redirectPath = "/dashboard") {
  const safeRedirectPath = redirectPath.startsWith("/") ? redirectPath : "/dashboard";
  const callbackUrl = new URL(safeRedirectPath, FORMATION_PUBLIC_URL);
  const authUrl = new URL("/auth", KORYXA_ADMIN_URL);

  authUrl.searchParams.set("project", "koryxa-formation");
  authUrl.searchParams.set("callback_url", callbackUrl.toString());

  return authUrl.toString();
}

export function buildKoryxaAdminAccessUrl() {
  const accessUrl = new URL("/access", KORYXA_ADMIN_URL);
  accessUrl.searchParams.set("project", "koryxa-formation");
  return accessUrl.toString();
}
