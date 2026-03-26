import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, saveBlogPosts, BlogPost } from "@/lib/admin-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Failed to read posts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Omit<BlogPost, "id">;
    const posts = await getBlogPosts();

    if (posts.some((p) => p.slug === body.slug)) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    const newPost: BlogPost = {
      ...body,
      id: crypto.randomUUID(),
    };

    posts.unshift(newPost);
    await saveBlogPosts(posts);
    revalidatePath("/blog");

    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
