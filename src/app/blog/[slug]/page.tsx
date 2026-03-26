import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/admin-store";
import BlogPostContent from "./BlogPostContent";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) return { title: "Blog | Taxes & Insurance Group LLC" };
  return {
    title: `${post.title.es} | Taxes & Insurance Group LLC`,
    description: post.excerpt.es,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug && p.published);
  if (!post) notFound();
  return <BlogPostContent post={post} />;
}
