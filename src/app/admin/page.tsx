"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/admin-store";

interface Stats {
  total: number;
  published: number;
  drafts: number;
  teamCount: number;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [teamCount, setTeamCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, teamRes] = await Promise.all([
          fetch("/api/admin/blog"),
          fetch("/api/admin/team"),
        ]);
        const postsData = await postsRes.json() as BlogPost[];
        const teamData = await teamRes.json() as unknown[];
        setPosts(Array.isArray(postsData) ? postsData : []);
        setTeamCount(Array.isArray(teamData) ? teamData.length : 0);
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const stats: Stats = {
    total: posts.length,
    published: posts.filter((p) => p.published).length,
    drafts: posts.filter((p) => !p.published).length,
    teamCount,
  };

  const recent = posts.slice(0, 5);

  const STAT_CARDS = [
    { label: "Total Posts", value: stats.total, color: "#0D2B4E" },
    { label: "Published", value: stats.published, color: "#2E7D32" },
    { label: "Drafts", value: stats.drafts, color: "#B9954F" },
    { label: "Team Members", value: stats.teamCount, color: "#1565C0" },
  ];

  return (
    <div className="p-4 md:p-8">
      {loadError && (
        <div className="mb-6 rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#FEECEC", color: "#C0392B" }}>
          Failed to load dashboard data. Please refresh the page.
        </div>
      )}
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
        >
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
          Welcome back. Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STAT_CARDS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border p-5"
            style={{ borderColor: "#E4E4E4" }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
              {loading ? "—" : stat.value}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6E6E6E" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex gap-3 mb-8">
        <Link
          href="/admin/blog/new"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          + New Blog Post
        </Link>
        <Link
          href="/admin/team"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
          style={{ backgroundColor: "#B9954F" }}
        >
          Manage Team
        </Link>
      </div>

      {/* Recent posts */}
      <div
        className="bg-white rounded-xl border"
        style={{ borderColor: "#E4E4E4" }}
      >
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#E4E4E4" }}>
          <h2
            className="text-base font-bold"
            style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
          >
            Recent Posts
          </h2>
          <Link href="/admin/blog" className="text-xs font-semibold" style={{ color: "#B9954F" }}>
            View all
          </Link>
        </div>
        <div className="divide-y" style={{ borderColor: "#E4E4E4" }}>
          {loading ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6E6E6E" }}>
              Loading...
            </div>
          ) : recent.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6E6E6E" }}>
              No posts yet.{" "}
              <Link href="/admin/blog/new" className="font-semibold" style={{ color: "#B9954F" }}>
                Create your first post
              </Link>
            </div>
          ) : (
            recent.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: "#0D2B4E" }}>
                    {post.title.es}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#AFAFAF" }}>
                    {post.date} · {post.category}
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full ml-4 shrink-0"
                  style={{
                    backgroundColor: post.published ? "#E8F5E9" : "#FFF3E0",
                    color: post.published ? "#2E7D32" : "#B9954F",
                  }}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
