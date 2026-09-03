import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getAccessSessionPayload,
} from "@/lib/accessControl";
import { findGrantById, grantMatchesCourse, summarizeGrant } from "@/lib/formationAccessAdmin";
import { normalizeCourseSlug } from "@/lib/courseConfig";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/modules(.*)",
  "/certificate(.*)",
]);

function redirectToLogin(request: NextRequest) {
  const targetRedirect = request.nextUrl.pathname + request.nextUrl.search;
  const destination = targetRedirect && targetRedirect !== "/"
    ? `https://formation.koryxa.fr${targetRedirect}`
    : "https://formation.koryxa.fr";

  const loginUrl = new URL("https://accounts.koryxa.fr/sign-in");
  loginUrl.searchParams.set("redirect_url", destination);

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

export default clerkMiddleware(async (auth, request) => {
  if (request.nextUrl.pathname === "/identity/formation/launch") {
    return NextResponse.next();
  }

  // 1. Si Clerk a authentifié l'utilisateur
  const authData = auth();
  if (authData.userId) {
    return NextResponse.next();
  }

  const hasClerkCookie = Boolean(
    request.cookies.get("__session")?.value ||
    request.cookies.get("__client_uat")?.value ||
    request.cookies.get("__clerk_db_jwt")?.value
  );

  if (hasClerkCookie) {
    return NextResponse.next();
  }

  // 2. Si la route n'est pas protégée (ex: accueil, landing, etc.), on laisse passer
  if (!isProtectedRoute(request)) {
    return NextResponse.next();
  }

  // 3. Pour les routes protégées, vérifier le token d'accès grant/partenaire
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
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
