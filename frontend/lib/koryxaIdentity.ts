const KORYXA_ACCOUNTS_ORIGIN = "https://accounts.koryxa.fr";
const DEFAULT_IDENTITY_LAUNCH_URL = "https://formation.koryxa.fr/identity/formation/launch";

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function safeFormationRedirect(value: string | null | undefined, fallback: string) {
  const raw = (value || "").trim();
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  if (raw.startsWith("/login") || raw.startsWith("/register")) return fallback;
  return raw;
}

export function buildKoryxaIdentityUrl(params: {
  mode: "sign-in" | "sign-up";
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const searchParams = params.searchParams || {};
  const course = first(searchParams.course) || "python-data-analyst";
  const fallback = `/access?course=${encodeURIComponent(course)}`;
  const redirect = safeFormationRedirect(first(searchParams.next) || first(searchParams.redirect), fallback);

  const launchUrl = new URL(process.env.KORYXA_IDENTITY_LAUNCH_URL || DEFAULT_IDENTITY_LAUNCH_URL);
  launchUrl.searchParams.set("redirect", redirect);

  const identityUrl = new URL(`${KORYXA_ACCOUNTS_ORIGIN}/${params.mode}`);
  identityUrl.searchParams.set("redirect_url", launchUrl.toString());
  return identityUrl.toString();
}
