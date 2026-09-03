import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();

    if (userId) {
      const user = await currentUser();
      const email = user?.primaryEmailAddress?.emailAddress?.trim() || "";
      const name =
        user?.fullName?.trim() ||
        [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
        email ||
        "Compte KORYXA";

      return NextResponse.json(
        {
          id: userId,
          name,
          email,
          avatar_url: user?.imageUrl || null,
          kind: "koryxa_identity",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
  } catch {
    // La session Formation reste un secours valide si Clerk est indisponible.
  }

  try {
    const response = await fetch(`${API_BASE_URL}/access/me`, {
      headers: { cookie: request.headers.get("cookie") || "" },
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.json(await response.json(), {
        headers: { "Cache-Control": "no-store" },
      });
    }
  } catch {
    // Une absence de session doit simplement afficher le bouton Connexion.
  }

  return NextResponse.json({ detail: "Non authentifié" }, { status: 401 });
}
