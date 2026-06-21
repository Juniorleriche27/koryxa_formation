import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getAccessSessionPayload,
  getExpectedAccessToken,
} from "@/lib/accessControl";
import { findGrantById, summarizeGrant } from "@/lib/formationAccessAdmin";
import { buildKoryxaAdminAuthUrl } from "@/lib/koryxaAdminAuth";

function redirectToAccess(request: NextRequest) {
  const requestedPath = request.nextUrl.pathname + request.nextUrl.search;
  const response = NextResponse.redirect(buildKoryxaAdminAuthUrl(requestedPath));
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
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const sessionPayload = await getAccessSessionPayload(accessToken);

  if (!sessionPayload) {
    const expectedAccessToken = await getExpectedAccessToken();
    const hasLegacyAccess = Boolean(expectedAccessToken && accessToken === expectedAccessToken);

    if (!hasLegacyAccess) {
      return redirectToAccess(request);
    }

    return NextResponse.next();
  }

  if (sessionPayload.sub !== "legacy-access") {
    try {
      const grant = await findGrantById(sessionPayload.sub);
      const summary = summarizeGrant(grant);

      if (summary.status !== "active") {
        return redirectToAccess(request);
      }
    } catch {
      return redirectToAccess(request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/access", "/login", "/register", "/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
