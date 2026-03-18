"use client";
import Link from "next/link";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLang();

  const values = [
    { titleKey: "about.value1.title", descKey: "about.value1.desc" },
    { titleKey: "about.value2.title", descKey: "about.value2.desc" },
    { titleKey: "about.value3.title", descKey: "about.value3.desc" },
    { titleKey: "about.value4.title", descKey: "about.value4.desc" },
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
            {t("about.page.hero.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {t("about.page.hero.h1")}
          </h1>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("about.page.hero.sub")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2
              className="text-3xl font-bold mb-6 leading-tight"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("about.page.story.h2")}
            </h2>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "#6E6E6E" }}>
              {t("about.page.story.p1")}
            </p>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: "#6E6E6E" }}>
              {t("about.page.story.p2")}
            </p>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: "#6E6E6E" }}>
              {t("about.page.story.p3")}
            </p>
            <div className="border-l-4 p-4 rounded-r-lg" style={{ backgroundColor: "#FAFAFA", borderColor: "#B9954F" }}>
              <p className="text-sm italic" style={{ color: "#6E6E6E" }}>
                &quot;{t("about.page.disclaimer")}&quot;
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "260px" }}>
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Professional business consultation"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
            {[
              { number: "20+", key: "about.stat1" },
              { number: "500+", key: "about.stat2" },
              { number: "5+", key: "about.stat3" },
              { number: "100%", key: "about.stat4" },
            ].map((stat) => (
              <div
                key={stat.key}
                className="text-white rounded-xl p-6 text-center"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "#B9954F", fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.number}
                </div>
                <div className="text-xs" style={{ color: "#AFAFAF" }}>{t(stat.key)}</div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("about.values.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6E6E6E" }}>{t("about.values.sub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.titleKey}
                className="bg-white rounded-xl p-6 border text-center hover:shadow-md transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="w-8 h-0.5 mx-auto mb-5" style={{ backgroundColor: "#B9954F" }} />
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
                >
                  {t(value.titleKey)}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#6E6E6E" }}>{t(value.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-lg font-bold text-white mx-auto mb-6"
            style={{ backgroundColor: "#B9954F", fontFamily: "var(--font-playfair), serif" }}
          >
            MR
          </div>
          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
          >
            Mayte F. Roses Soto
          </h2>
          <p className="font-semibold text-xs uppercase tracking-wider mb-5" style={{ color: "#B9954F" }}>
            {t("about.founder.role")}
          </p>
          <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ color: "#6E6E6E" }}>
            {t("about.founder.bio")}
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
