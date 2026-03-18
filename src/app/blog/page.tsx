"use client";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";

export default function BlogPage() {
  const { t } = useLang();

  const articles = [
    { titleKey: "blog.a1.title", excerptKey: "blog.a1.excerpt", date: "Marzo 2026", categoryKey: "blog.cat.taxes", readTime: "5" },
    { titleKey: "blog.a2.title", excerptKey: "blog.a2.excerpt", date: "Febrero 2026", categoryKey: "blog.cat.insurance", readTime: "6" },
    { titleKey: "blog.a3.title", excerptKey: "blog.a3.excerpt", date: "Enero 2026", categoryKey: "blog.cat.taxes", readTime: "4" },
    { titleKey: "blog.a4.title", excerptKey: "blog.a4.excerpt", date: "Diciembre 2025", categoryKey: "blog.cat.business", readTime: "5" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-24"
        style={{ background: "linear-gradient(150deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("blog.page.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article
                key={article.titleKey}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="h-0.5" style={{ backgroundColor: "#B9954F" }} />
                <div className="p-8">
                  <div className="mb-4">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#F0EAE0", color: "#8A6F40" }}
                    >
                      {t(article.categoryKey)}
                    </span>
                  </div>
                  <h2
                    className="text-lg font-bold mb-3 leading-tight"
                    style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
                  >
                    {t(article.titleKey)}
                  </h2>
                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#6E6E6E" }}>
                    {t(article.excerptKey)}
                  </p>
                  <div className="flex justify-between items-center text-xs" style={{ color: "#AFAFAF" }}>
                    <span>{article.date} · {article.readTime} min {t("blog.readtime")}</span>
                    <span className="font-semibold" style={{ color: "#B9954F" }}>
                      {t("blog.coming")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon */}
          <div
            className="mt-12 text-center bg-white border rounded-xl p-10"
            style={{ borderColor: "#E4E4E4" }}
          >
            <div className="w-10 h-0.5 mx-auto mb-6" style={{ backgroundColor: "#B9954F" }} />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("blog.more.title")}
            </h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E6E" }}>
              {t("blog.more.sub")}
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
