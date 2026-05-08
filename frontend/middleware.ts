import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const KORYXA_LOGIN = process.env.NEXT_PUBLIC_KORYXA_SITE_URL + "/login";
const APP_URL      = process.env.NEXT_PUBLIC_APP_URL ?? "";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get("innova_session")?.value;
  if (!session) {
    const returnUrl = APP_URL + pathname;
    const loginUrl  = `${KORYXA_LOGIN}?redirect=${encodeURIComponent(returnUrl)}`;
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/modules/:path*", "/certificate/:path*"],
};
