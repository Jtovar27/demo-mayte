"use client";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";
import { serviceCategories } from "@/data/services";

export default function ServicesPage() {
  const { t } = useLang();

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
            alt="Financial documents and tax preparation"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(8,8,8,0.93) 0%, rgba(28,28,28,0.87) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("services.page.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("services.page.h1")}
          </h1>
          <p className="text-base max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("services.page.sub")}
          </p>
          <a
            href={SITE.phoneHref}
            className="inline-block text-white font-semibold px-8 py-3 rounded-lg"
            style={{ backgroundColor: "#B9954F" }}
          >
            {t("services.page.cta")}
          </a>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {serviceCategories.map((cat) => (
            <div key={cat.categoryKey}>
              <h2
                className="text-xl font-bold mb-8 pb-2 border-b-2 inline-block"
                style={{ color: "#1C1C1C", borderColor: "#B9954F", fontFamily: "var(--font-heading), serif" }}
              >
                {t(cat.categoryKey)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => (
                  <ServiceCard
                    key={service.titleKey}
                    title={t(service.titleKey)}
                    description={t(service.descKey)}
                    icon={service.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-y py-8" style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs italic" style={{ color: "#6E6E6E" }}>
            {t("services.disclaimer")}
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
