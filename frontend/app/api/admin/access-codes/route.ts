import { NextResponse } from "next/server";

const payload = {
  ok: false,
  message: "La gestion locale des codes Formation est fermée. Les accès doivent passer par KORYXA Admin.",
};

export async function GET() {
  return NextResponse.json(payload, { status: 503 });
}

export async function POST() {
  return NextResponse.json(payload, { status: 503 });
}
