"use client";
import { useLang } from "@/context/LanguageContext";

export default function CTABanner() {
  const { t } = useLang();

  return (
    <section className="py-16" style={{ backgroundColor: "#B9954F" }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif" }}
        >
          {t("cta.title")}
        </h2>
        <p className="mb-8 text-base" style={{ color: "#F5EDD9" }}>
          {t("cta.sub")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:4072354065"
            className="font-bold px-8 py-3 rounded-lg text-base"
            style={{ backgroundColor: "#1C1C1C", color: "#FFFFFF" }}
          >
            {t("cta.call")}
          </a>
          <a
            href="https://wa.me/14072354065"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold px-8 py-3 rounded-lg text-base border-2 border-white text-white"
          >
            {t("cta.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
