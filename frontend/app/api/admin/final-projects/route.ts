import { NextResponse } from "next/server";

const payload = {
  ok: false,
  message: "La correction locale des projets finaux est fermée pendant la migration vers KORYXA Admin.",
};

export async function GET() {
  return NextResponse.json(payload, { status: 503 });
}

export async function PATCH() {
  return NextResponse.json(payload, { status: 503 });
}
