"use client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
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
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { t, lang } = useLang();

  const paragraphStyle = { marginBottom: "0.85rem" };
  const headingStyle = { fontWeight: 700, color: "#1C1C1C", marginBottom: "0.4rem", fontFamily: "var(--font-heading), serif" };

  return (
    <>
      {/* Header bar */}
      <section className="py-14" style={{ backgroundColor: "#1C1C1C" }}>
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="text-xs font-semibold uppercase tracking-widest mb-6 inline-block"
            style={{ color: "#B9954F" }}
          >
            ← {lang === "es" ? "Blog" : "Blog"}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: "#2A2A2A", color: "#B9954F" }}
            >
              {t(CATEGORY_KEY_MAP[post.category] ?? "blog.cat.taxes")}
            </span>
            <span className="text-xs" style={{ color: "#6E6E6E" }}>
              {formatDate(post.date, lang as Lang)}
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {post.title[lang as Lang]}
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#A0A8AF" }}>
            {post.excerpt[lang as Lang]}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-14" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="bg-white rounded-2xl border p-8 md:p-12"
            style={{ borderColor: "#E4E4E4" }}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 style={{ ...headingStyle, fontSize: "1.4rem", marginTop: "1.2rem" }}>{children}</h1>,
                h2: ({ children }) => <h2 style={{ ...headingStyle, fontSize: "1.2rem", marginTop: "1rem" }}>{children}</h2>,
                h3: ({ children }) => <h3 style={{ ...headingStyle, fontSize: "1.05rem", marginTop: "0.8rem" }}>{children}</h3>,
                p: ({ children }) => <p className="text-base leading-relaxed" style={{ ...paragraphStyle, color: "#3A3A3A" }}>{children}</p>,
                ul: ({ children }) => <ul style={{ paddingLeft: "1.4rem", marginBottom: "0.85rem", listStyleType: "disc", color: "#3A3A3A" }}>{children}</ul>,
                ol: ({ children }) => <ol style={{ paddingLeft: "1.4rem", marginBottom: "0.85rem", listStyleType: "decimal", color: "#3A3A3A" }}>{children}</ol>,
                li: ({ children }) => <li className="text-base leading-relaxed" style={{ marginBottom: "0.3rem" }}>{children}</li>,
                strong: ({ children }) => <strong style={{ fontWeight: 700, color: "#1C1C1C" }}>{children}</strong>,
                em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote style={{ borderLeft: "3px solid #B9954F", paddingLeft: "1rem", margin: "1rem 0", color: "#6E6E6E" }}>
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content[lang as Lang]}
            </ReactMarkdown>
          </div>

          {/* Back link */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-block text-sm font-semibold px-6 py-3 rounded-xl border"
              style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
            >
              ← {lang === "es" ? "Ver todos los artículos" : "See all articles"}
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
