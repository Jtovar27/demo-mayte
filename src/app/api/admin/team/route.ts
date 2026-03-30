import { NextRequest, NextResponse } from "next/server";
import { getTeamMembers, createTeamMember, AdminTeamMember } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const members = await getTeamMembers();
    return NextResponse.json(members);
  } catch {
    return NextResponse.json({ error: "Failed to read team" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Omit<AdminTeamMember, "id">;
    const newMember = await createTeamMember(body);
    revalidatePath("/contact");
    return NextResponse.json(newMember, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
