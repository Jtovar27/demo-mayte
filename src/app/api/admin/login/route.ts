import { NextRequest, NextResponse } from "next/server";
import { signToken, checkPassword } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { password?: string };
    const { password } = body;

    if (!password || !(await checkPassword(password))) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signToken({ role: "admin" });

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
