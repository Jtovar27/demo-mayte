import { NextResponse } from "next/server";
import { getTeamMembers } from "@/lib/admin-store";

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: "Failed to read team" }, { status: 500 });
  }
}
