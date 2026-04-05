"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";
import type { BlogPost } from "@/lib/admin-store";

type Lang = "es" | "en";

const CATEGORY_KEY_MAP: Record<string, string> = {
  taxes: "blog.cat.taxes",
  insurance: "blog.cat.insurance",
  business: "blog.cat.business",
  notary: "blog.cat.notary",
};

function formatDate(dateStr: string, lang: Lang): string {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return dateStr;
  }
}

const CATEGORIES = ["all", "taxes", "insurance", "business", "notary"] as const;
type Category = typeof CATEGORIES[number];

export default function BlogPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json() as BlogPost[];
        setPosts(Array.isArray(data) ? data : []);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    void loadPosts();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80" alt="Workspace with laptop" fill className="object-cover object-center" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(7,25,41,0.93) 0%, rgba(13,43,78,0.87) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("blog.page.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("blog.page.h1")}
          </h1>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("blog.page.sub")}
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Category filter */}
          {!loading && posts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  style={activeCategory === cat
                    ? { backgroundColor: "#0D2B4E", color: "#FFFFFF" }
                    : { backgroundColor: "#FFFFFF", color: "#6E6E6E", border: "1px solid #D0D0D0" }}
                >
                  {cat === "all" ? (lang === "es" ? "Todos" : "All") : t(CATEGORY_KEY_MAP[cat] ?? cat)}
                </button>
              ))}
            </div>
          )}
          {loading ? (
            /* Loading skeleton */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-xl border overflow-hidden"
                  style={{ borderColor: "#E4E4E4" }}
                >
                  <div className="h-0.5" style={{ backgroundColor: "#B9954F" }} />
                  <div className="p-8 space-y-3 animate-pulse">
                    <div className="h-5 w-20 rounded-full" style={{ backgroundColor: "#F0EAE0" }} />
                    <div className="h-5 w-full rounded" style={{ backgroundColor: "#F0F0F0" }} />
                    <div className="h-5 w-3/4 rounded" style={{ backgroundColor: "#F0F0F0" }} />
                    <div className="h-3 w-full rounded" style={{ backgroundColor: "#F5F5F5" }} />
                    <div className="h-3 w-full rounded" style={{ backgroundColor: "#F5F5F5" }} />
                    <div className="h-3 w-2/3 rounded" style={{ backgroundColor: "#F5F5F5" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            /* Coming soon — no posts */
            <div
              className="text-center bg-white border rounded-xl p-10"
              style={{ borderColor: "#E4E4E4" }}
            >
              <div className="w-10 h-0.5 mx-auto mb-6" style={{ backgroundColor: "#B9954F" }} />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
              >
                {t("blog.more.title")}
              </h3>
              <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E6E" }}>
                {t("blog.more.sub")}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.filter(p => activeCategory === "all" || p.category === activeCategory).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
                    style={{ borderColor: "#E4E4E4" }}
                  >
                    <div className="h-0.5" style={{ backgroundColor: "#B9954F" }} />
                    <div className="p-8">
                      <div className="mb-4">
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: "#F0EAE0", color: "#7A5F30" }}
                        >
                          {t(CATEGORY_KEY_MAP[post.category] ?? "blog.cat.taxes")}
                        </span>
                      </div>
                      <h2
                        className="text-lg font-bold mb-3 leading-tight"
                        style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
                      >
                        {post.title[lang as Lang]}
                      </h2>
                      <p className="text-xs leading-relaxed mb-6" style={{ color: "#6E6E6E" }}>
                        {post.excerpt[lang as Lang]}
                      </p>
                      <div className="flex justify-between items-center text-xs" style={{ color: "#AFAFAF" }}>
                        <span>{formatDate(post.date, lang as Lang)}</span>
                        <span className="font-semibold" style={{ color: "#B9954F" }}>
                          {t("blog.read")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* More coming soon */}
              <div
                className="mt-12 text-center bg-white border rounded-xl p-10"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="w-10 h-0.5 mx-auto mb-6" style={{ backgroundColor: "#B9954F" }} />
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
                >
                  {t("blog.more.title")}
                </h3>
                <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E6E" }}>
                  {t("blog.more.sub")}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
