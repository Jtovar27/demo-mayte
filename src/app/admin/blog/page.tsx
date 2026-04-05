"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/admin-store";

const CATEGORY_LABELS: Record<string, string> = {
  taxes: "Taxes",
  insurance: "Insurance",
  notary: "Notary",
  business: "Business",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function loadPosts() {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json() as BlogPost[];
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadPosts(); }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (!res.ok) { alert("Failed to delete post."); return; }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    setTogglingId(post.id);
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      if (!res.ok) { alert("Failed to update post."); return; }
      const updated = await res.json() as BlogPost;
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    } catch {
      alert("Failed to update post.");
    } finally {
      setTogglingId(null);
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
          >
            Blog Posts
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
            {loading ? "Loading..." : `${posts.length} post${posts.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          + New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border" style={{ borderColor: "#E4E4E4" }}>
        {loading ? (
          <div className="p-12 text-center text-sm" style={{ color: "#6E6E6E" }}>
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm mb-4" style={{ color: "#6E6E6E" }}>No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
              style={{ backgroundColor: "#B9954F" }}
            >
              Create first post
            </Link>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "#F0F0F0" }}>
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#F0EAE0", color: "#7A5F30" }}
                    >
                      {CATEGORY_LABELS[post.category] ?? post.category}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: post.published ? "#E8F5E9" : "#FFF3E0",
                        color: post.published ? "#2E7D32" : "#B9954F",
                      }}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: "#0D2B4E" }}>
                    {post.title.es}
                  </div>
                  <div className="text-xs truncate mt-0.5" style={{ color: "#AFAFAF" }}>
                    {post.title.en}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#AFAFAF" }}>
                    {post.date}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    disabled={togglingId === post.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50"
                    style={{
                      borderColor: "#D0D0D0",
                      color: "#6E6E6E",
                    }}
                  >
                    {togglingId === post.id ? "..." : post.published ? "Unpublish" : "Publish"}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                    style={{ backgroundColor: "#0D2B4E" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={deletingId === post.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white disabled:opacity-50"
                    style={{ backgroundColor: "#C0392B" }}
                  >
                    {deletingId === post.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
