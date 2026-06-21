import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "L’ancien pont interne partenaire est fermé pendant la migration vers KORYXA Admin.",
    },
    { status: 503 }
  );
}
