import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, createBlogPost, BlogPost } from "@/lib/admin-store";
import { supabase } from "@/lib/supabase";
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

    // Check slug uniqueness
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", body.slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 409 });
    }

    const newPost = await createBlogPost(body);
    revalidatePath("/blog");
    revalidatePath(`/blog/${newPost.slug}`);
    return NextResponse.json(newPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
