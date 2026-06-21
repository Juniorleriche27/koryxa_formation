import { NextResponse } from "next/server";

const payload = {
  ok: false,
  message: "La modification locale des codes Formation est fermée. Les accès doivent passer par KORYXA Admin.",
};

export async function PATCH() {
  return NextResponse.json(payload, { status: 503 });
}

export async function DELETE() {
  return NextResponse.json(payload, { status: 503 });
}
