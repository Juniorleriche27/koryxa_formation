import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_COOKIE_NAME, getAccessSessionPayload } from "@/lib/accessControl";
import { findGrantById, summarizeGrant } from "@/lib/formationAccessAdmin";

function redirectToMaintenanceAccess(request: NextRequest) {
  const accessUrl = new URL("/access", request.url);
  accessUrl.searchParams.set("from", request.nextUrl.pathname + request.nextUrl.search);

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
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const sessionPayload = await getAccessSessionPayload(accessToken);

  if (!sessionPayload || sessionPayload.sub === "legacy-access") {
    return redirectToMaintenanceAccess(request);
  }

  try {
    const grant = await findGrantById(sessionPayload.sub);
    const summary = summarizeGrant(grant);

    if (summary.status !== "active" || grant?.auth_provider !== "koryxa_admin") {
      return redirectToMaintenanceAccess(request);
    }
  } catch {
    return redirectToMaintenanceAccess(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
