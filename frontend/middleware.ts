import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getAccessSessionPayload,
} from "@/lib/accessControl";
import { findGrantById, grantMatchesCourse, summarizeGrant } from "@/lib/formationAccessAdmin";
import { normalizeCourseSlug } from "@/lib/courseConfig";

function redirectToLogin(request: NextRequest) {
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  const targetRedirect = request.nextUrl.pathname + request.nextUrl.search;
  if (targetRedirect && targetRedirect !== "/") {
    loginUrl.searchParams.set("redirect", targetRedirect);
  }

  const response = NextResponse.redirect(loginUrl);
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
  if (request.nextUrl.pathname === "/identity/formation/launch") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (!accessToken) {
    return redirectToLogin(request);
  }

  const sessionPayload = await getAccessSessionPayload(accessToken);
  if (!sessionPayload || sessionPayload.sub === "legacy-access") {
    return redirectToLogin(request);
  }

  const requestedCourse = normalizeCourseSlug(request.nextUrl.searchParams.get("course"));

  try {
    if (sessionPayload.kind === "identity") {
      return NextResponse.next();
    }

    const grant = await findGrantById(sessionPayload.sub);
    const summary = summarizeGrant(grant);
    const sessionCourse = normalizeCourseSlug(sessionPayload.course);

    if (summary.status !== "active" || (requestedCourse && requestedCourse !== sessionCourse && !(await grantMatchesCourse(grant!, requestedCourse)))) {
      return redirectToLogin(request);
    }
  } catch {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
