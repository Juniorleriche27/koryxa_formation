import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

export async function POST(request: NextRequest) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ detail: "Session KORYXA Identity requise" }, { status: 401 });
  }

  const bridgeKey = (process.env.KORYXA_IDENTITY_BRIDGE_KEY || "").trim();
  if (!bridgeKey) {
    return NextResponse.json({ detail: "Pont KORYXA non configuré" }, { status: 503 });
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.trim().toLowerCase();
  const payload = await request.json().catch(() => null);
  const customerName =
    user?.fullName?.trim() ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    payload?.customer_name;
  const customerPhone =
    payload?.customer_phone?.trim() || user?.phoneNumbers?.[0]?.phoneNumber?.trim();

  if (!customerName || !customerPhone) {
    return NextResponse.json(
      { detail: "Le nom et le numéro Mobile Money sont obligatoires" },
      { status: 422 },
    );
  }

  const response = await fetch(`${API_BASE_URL}/commerce/internal/koryxa-pay/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-koryxa-bridge-key": bridgeKey,
    },
    body: JSON.stringify({
      ...payload,
      customer_id: email || userId,
      customer_name: customerName,
      customer_phone: customerPhone,
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({ detail: "Réponse KORYXA Pay invalide" }));
  return NextResponse.json(data, { status: response.status });
}
