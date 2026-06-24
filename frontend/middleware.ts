import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getAccessSessionPayload,
} from "@/lib/accessControl";
import { findGrantById, summarizeGrant } from "@/lib/formationAccessAdmin";

const CANONICAL_HOST = "formation.koryxa.fr";
const LEGACY_HOSTS = new Set(["formation.innovaplus.africa"]);

function redirectLegacyDomain(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || !LEGACY_HOSTS.has(host)) return null;

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";
  return NextResponse.redirect(url, 308);
}

function redirectToAccess(request: NextRequest) {
  const accessUrl = request.nextUrl.clone();
  accessUrl.pathname = "/access";
  accessUrl.search = "";
  accessUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);

  const response = NextResponse.redirect(accessUrl);
  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function middleware(request: NextRequest) {
  const legacyDomainRedirect = redirectLegacyDomain(request);
  if (legacyDomainRedirect) return legacyDomainRedirect;

  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const sessionPayload = await getAccessSessionPayload(accessToken);

  if (!sessionPayload || sessionPayload.sub === "legacy-access") {
    return redirectToAccess(request);
  }

  try {
    const grant = await findGrantById(sessionPayload.sub);
    const summary = summarizeGrant(grant);

    if (summary.status !== "active") {
      return redirectToAccess(request);
    }
  } catch {
    return redirectToAccess(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
