"use client";
import Link from "next/link";
import Image from "next/image";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";

export default function HomePage() {
  const { t } = useLang();

  const featuredServices = [
    { title: t("svc.taxes.personal.title"), description: t("svc.taxes.personal.desc") },
    { title: t("svc.taxes.business.title"), description: t("svc.taxes.business.desc") },
    { title: t("svc.insurance.health.title"), description: t("svc.insurance.health.desc") },
    { title: t("svc.insurance.life.title"), description: t("svc.insurance.life.desc") },
    { title: t("svc.notary.title"), description: t("svc.notary.desc") },
    { title: t("svc.credit.title"), description: t("svc.credit.desc") },
  ];

  const blogPreviews = [
    { title: t("blog.a1.title"), excerpt: t("blog.a1.excerpt"), date: "Marzo 2026", category: t("blog.cat.taxes") },
    { title: t("blog.a2.title"), excerpt: t("blog.a2.excerpt"), date: "Febrero 2026", category: t("blog.cat.insurance") },
    { title: t("blog.a3.title"), excerpt: t("blog.a3.excerpt"), date: "Enero 2026", category: t("blog.cat.business") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative text-white py-24 md:py-36 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
            alt="Professional office consultation"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(150deg, rgba(10,10,10,0.92) 0%, rgba(28,28,28,0.88) 55%, rgba(39,39,39,0.85) 100%)" }}
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div
            className="inline-block text-xs font-semibold px-5 py-1.5 rounded-full mb-7 tracking-widest uppercase"
            style={{ backgroundColor: "rgba(185,149,79,0.15)", color: "#B9954F", border: "1px solid rgba(185,149,79,0.4)" }}
          >
            {t("hero.badge")}
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white"
            style={{ fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}
          >
            {t("hero.h1.line1")}<br />
            <span style={{ color: "#B9954F" }}>{t("hero.h1.line2")}</span><br />
            {t("hero.h1.line3")}
          </h1>
          <p className="text-base md:text-lg mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("hero.sub")}
          </p>
          <p className="text-sm mb-10" style={{ color: "#6E6E6E" }}>
            {t("hero.location")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.phoneHref}
              className="text-white font-semibold px-8 py-4 rounded-lg text-base shadow-lg"
              style={{ backgroundColor: "#B9954F" }}
            >
              {t("hero.cta.call")}
            </a>
            <Link
              href="/services"
              className="font-semibold px-8 py-4 rounded-lg text-base text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {t("hero.cta.services")}
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}

      <section className="bg-white border-b py-8" style={{ borderColor: "#E4E4E4" }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { number: "20+", key: "trust.years" },
            { number: "100%", key: "trust.spanish" },
            { number: t("trust.free"), key: null },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-1 py-2 text-center">
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: "var(--font-heading), serif", color: "#B9954F" }}
              >
                {stat.number}
              </span>
              <span className="text-sm" style={{ color: "#6E6E6E" }}>
                {stat.key ? t(stat.key) : (i === 2 ? t("trust.free") : "")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("services.title")}
            </h2>
            <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "#6E6E6E" }}>
              {t("services.sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block text-white font-semibold px-8 py-3 rounded-lg"
              style={{ backgroundColor: "#1C1C1C" }}
            >
              {t("services.cta")}
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
              {t("about.label")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-5 leading-tight"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("about.h2")}
            </h2>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "#6E6E6E" }}>
              <strong style={{ color: "#1C1C1C" }}>Taxes and Insurance Group LLC</strong>{" "}
              {t("about.p1").replace("Taxes and Insurance Group LLC", "").trim()}
            </p>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: "#6E6E6E" }}>
              {t("about.p2")}
            </p>
            <Link
              href="/about"
              className="inline-block text-white font-semibold px-6 py-3 rounded-lg"
              style={{ backgroundColor: "#B9954F" }}
            >
              {t("about.cta")}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(["about.tile1", "about.tile2", "about.tile3", "about.tile4"] as const).map((key) => (
              <div
                key={key}
                className="rounded-xl p-6 text-center border"
                style={{ backgroundColor: "#FAFAFA", borderColor: "#EBEBEB" }}
              >
                <div className="w-6 h-0.5 mx-auto mb-4" style={{ backgroundColor: "#B9954F" }} />
                <p className="text-sm font-semibold" style={{ color: "#272727" }}>{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("blog.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6E6E6E" }}>{t("blog.sub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="h-0.5" style={{ backgroundColor: "#B9954F" }} />
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#B9954F" }}>
                    {post.category}
                  </span>
                  <h3
                    className="text-base font-bold mt-2 mb-2 leading-tight"
                    style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#6E6E6E" }}>{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#AFAFAF" }}>{post.date}</span>
                    <Link href="/blog" className="text-xs font-semibold" style={{ color: "#B9954F" }}>
                      {t("blog.read")}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#B9954F" }}>
              {t("reviews.label")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("reviews.h2")}
            </h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "#6E6E6E" }}>
              {t("reviews.sub")}
            </p>
            {/* Aggregate rating */}
            <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border" style={{ borderColor: "#E4E4E4", backgroundColor: "#FAFAFA" }}>
              <span className="text-base font-bold" style={{ color: "#1C1C1C" }}>4.9</span>
              <span className="text-sm" style={{ color: "#B9954F" }}>★★★★★</span>
              <span className="text-xs" style={{ color: "#6E6E6E" }}>{t("reviews.aggregate")}</span>
            </div>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { text: "reviews.r1.text", name: "reviews.r1.name", service: "reviews.r1.service" },
              { text: "reviews.r2.text", name: "reviews.r2.name", service: "reviews.r2.service" },
              { text: "reviews.r3.text", name: "reviews.r3.name", service: "reviews.r3.service" },
            ].map((r) => (
              <div
                key={r.name}
                className="rounded-xl border p-6 flex flex-col gap-4"
                style={{ borderColor: "#E4E4E4", backgroundColor: "#FAFAFA" }}
              >
                <div className="flex items-center gap-1 text-sm" style={{ color: "#B9954F" }}>
                  {"★★★★★"}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#444444" }}>
                  &ldquo;{t(r.text)}&rdquo;
                </p>
                <div className="border-t pt-4" style={{ borderColor: "#EBEBEB" }}>
                  <p className="text-sm font-semibold" style={{ color: "#1C1C1C" }}>{t(r.name)}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#B9954F" }}>{t(r.service)}</p>
                  <p className="text-xs mt-1" style={{ color: "#AFAFAF" }}>{t("reviews.verified")}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a review CTA */}
          <div className="text-center">
            <p className="text-sm mb-5" style={{ color: "#6E6E6E" }}>
              {t("reviews.cta.sub")}
            </p>
            <a
              href={SITE.google.reviewsUrl || SITE.google.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-8 py-3 rounded-lg border-2 transition-colors hover:text-white"
              style={{ borderColor: "#B9954F", color: "#B9954F" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#B9954F"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
            >
              <span>★</span>
              {t("reviews.cta")}
            </a>
          </div>
        </div>
      </section>

      <CTABanner />

      {/* LOCATION BAR */}
      <section className="py-8 text-white" style={{ backgroundColor: "#1C1C1C" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: "#6E6E6E" }}>{t("location.visit")}</p>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {SITE.address.full}
          </p>
          <p className="text-xs mt-2" style={{ color: "#AFAFAF" }}>{t("location.hours")}</p>
        </div>
      </section>
    </>
  );
}
