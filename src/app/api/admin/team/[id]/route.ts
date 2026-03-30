import { NextRequest, NextResponse } from "next/server";
import { updateTeamMember, deleteTeamMember, AdminTeamMember } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<AdminTeamMember>;
    const updated = await updateTeamMember(id, body);
    revalidatePath("/contact");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await deleteTeamMember(id);
    revalidatePath("/contact");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
