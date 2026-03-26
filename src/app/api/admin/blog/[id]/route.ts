import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts, BlogPost } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.id === id);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json() as Partial<BlogPost>;
    const posts = await getBlogPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    posts[index] = { ...posts[index], ...body, id };
    await saveBlogPosts(posts);
    revalidatePath("/blog");

    return NextResponse.json(posts[index]);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const posts = await getBlogPosts();
    const filtered = posts.filter((p) => p.id !== id);

    if (filtered.length === posts.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await saveBlogPosts(filtered);
    revalidatePath("/blog");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
