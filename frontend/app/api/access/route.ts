import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "L’ancien accès par code est fermé pendant la maintenance. La réouverture se fera via KORYXA Admin.",
    },
    { status: 503 }
  );
}
