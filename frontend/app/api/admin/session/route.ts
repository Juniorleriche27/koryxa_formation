import { NextResponse } from "next/server";

const payload = {
  ok: false,
  message: "L’ancien admin local Formation est fermé pendant la migration vers KORYXA Admin.",
};

export async function GET() {
  return NextResponse.json(payload, { status: 503 });
}

export async function POST() {
  return NextResponse.json(payload, { status: 503 });
}

export async function DELETE() {
  return NextResponse.json(payload, { status: 503 });
}
