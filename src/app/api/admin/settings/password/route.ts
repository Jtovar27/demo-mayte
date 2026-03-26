import { NextRequest, NextResponse } from "next/server";
import { checkPassword, hashPassword, savePasswordHash } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { current, next } = await req.json() as { current?: string; next?: string };
    if (!current || !next) return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    if (next.length < 8) return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
    if (!(await checkPassword(current))) return NextResponse.json({ error: "Current password is incorrect." }, { status: 401 });
    await savePasswordHash(hashPassword(next));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
