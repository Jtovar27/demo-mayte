import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/admin-store";

const BASE = "https://taxesandinsurancegroup.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const blogEntries = posts
    .filter((p) => p.published)
    .map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date(p.date) }));

  return [
    { url: BASE, lastModified: new Date() },
    { url: `${BASE}/about`, lastModified: new Date() },
    { url: `${BASE}/services`, lastModified: new Date() },
    { url: `${BASE}/blog`, lastModified: new Date() },
    { url: `${BASE}/faq`, lastModified: new Date() },
    { url: `${BASE}/contact`, lastModified: new Date() },
    { url: `${BASE}/taxes-to-go`, lastModified: new Date() },
    ...blogEntries,
  ];
}
