const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://formation.innovaplus.africa";

const LOOP_PATHS = ["/login", "/register"];

function isSafeRedirect(url: string): boolean {
  try {
    const path = new URL(url).pathname;
    return !LOOP_PATHS.some((p) => path === p || path.startsWith(p + "?"));
  } catch {
    return false;
  }
}

/**
 * Returns a safe absolute return URL for post-SSO redirect.
 * Prevents infinite loops by normalising /login and /register to /dashboard.
 */
export function safeReturnUrl(raw: string | null | undefined): string {
  const fallback = `${APP_URL}/dashboard`;
  if (!raw) return fallback;

  // raw may be an absolute URL or just a path
  const absolute = raw.startsWith("http") ? raw : `${APP_URL}${raw}`;

  return isSafeRedirect(absolute) ? absolute : fallback;
}
