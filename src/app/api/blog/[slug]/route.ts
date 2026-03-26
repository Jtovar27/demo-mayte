import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/admin-store";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === slug && p.published);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Failed to read post" }, { status: 500 });
  }
}
