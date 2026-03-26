import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/admin-store";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    const published = posts.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));
    return NextResponse.json(published);
  } catch {
    return NextResponse.json({ error: "Failed to read posts" }, { status: 500 });
  }
}
