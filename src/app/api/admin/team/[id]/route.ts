import { NextRequest, NextResponse } from "next/server";
import { getTeamMembers, saveTeamMembers, AdminTeamMember } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<AdminTeamMember>;
    const members = await getTeamMembers();
    const index = members.findIndex((m) => m.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    members[index] = { ...members[index], ...body, id };
    await saveTeamMembers(members);
    revalidatePath("/contact");

    return NextResponse.json(members[index]);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const members = await getTeamMembers();
    const filtered = members.filter((m) => m.id !== id);

    if (filtered.length === members.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await saveTeamMembers(filtered);
    revalidatePath("/contact");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
