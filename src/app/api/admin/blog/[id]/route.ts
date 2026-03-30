import { NextRequest, NextResponse } from "next/server";
import { getBlogPostById, updateBlogPost, deleteBlogPost, BlogPost } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<BlogPost>;
    const post = await getBlogPostById(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = await updateBlogPost(id, body);
    revalidatePath("/blog");
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await deleteBlogPost(id);
    revalidatePath("/blog");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
