import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getAccessSessionPayload,
} from "@/lib/accessControl";
import { findGrantById, grantMatchesCourse, summarizeGrant } from "@/lib/formationAccessAdmin";
import { normalizeCourseSlug } from "@/lib/courseConfig";


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

export default clerkMiddleware(async (_auth, request: NextRequest) => {
  if (request.nextUrl.pathname === "/identity/formation/launch") {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const sessionPayload = await getAccessSessionPayload(accessToken);

  if (!sessionPayload || sessionPayload.sub === "legacy-access") {
    return redirectToAccess(request);
  }

  const requestedCourse = normalizeCourseSlug(request.nextUrl.searchParams.get("course"));

  try {
    if (sessionPayload.kind === "identity") {
      const accessUrl = request.nextUrl.clone();
      accessUrl.pathname = "/access";
      accessUrl.search = "";
      accessUrl.searchParams.set("course", requestedCourse);
      accessUrl.searchParams.set("redirect", request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(accessUrl);
    }

    const grant = await findGrantById(sessionPayload.sub);
    const summary = summarizeGrant(grant);
    const sessionCourse = normalizeCourseSlug(sessionPayload.course);

    if (summary.status !== "active" || requestedCourse !== sessionCourse || !(await grantMatchesCourse(grant!, requestedCourse))) {
      return redirectToAccess(request);
    }
  } catch {
    return redirectToAccess(request);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/identity/formation/launch", "/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
