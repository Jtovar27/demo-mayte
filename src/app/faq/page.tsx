"use client";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function FAQPage() {
  const { t } = useLang();
  const site = useSiteSettings();

  const faqs = [
    {
      categoryKey: "faq.cat.taxes",
      questions: [
        { qKey: "faq.t.q1", aKey: "faq.t.a1" },
        { qKey: "faq.t.q2", aKey: "faq.t.a2" },
        { qKey: "faq.t.q3", aKey: "faq.t.a3" },
      ],
    },
    {
      categoryKey: "faq.cat.insurance",
      questions: [
        { qKey: "faq.i.q1", aKey: "faq.i.a1" },
        { qKey: "faq.i.q2", aKey: "faq.i.a2" },
        { qKey: "faq.i.q3", aKey: "faq.i.a3" },
      ],
    },
    {
      categoryKey: "faq.cat.notary",
      questions: [
        { qKey: "faq.n.q1", aKey: "faq.n.a1" },
        { qKey: "faq.n.q2", aKey: "faq.n.a2" },
        { qKey: "faq.n.q3", aKey: "faq.n.a3" },
        { qKey: "faq.n.q4", aKey: "faq.n.a4" },
        { qKey: "faq.n.q5", aKey: "faq.n.a5" },
      ],
    },
    {
      categoryKey: "faq.cat.business",
      questions: [
        { qKey: "faq.b.q1", aKey: "faq.b.a1" },
        { qKey: "faq.b.q2", aKey: "faq.b.a2" },
        { qKey: "faq.b.q3", aKey: "faq.b.a3" },
        { qKey: "faq.b.q4", aKey: "faq.b.a4" },
        { qKey: "faq.b.q5", aKey: "faq.b.a5" },
      ],
    },
    {
      categoryKey: "faq.cat.taxestogo",
      questions: [
        { qKey: "faq.ttg.q1", aKey: "faq.ttg.a1" },
        { qKey: "faq.ttg.q2", aKey: "faq.ttg.a2" },
        { qKey: "faq.ttg.q3", aKey: "faq.ttg.a3" },
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80" alt="Professional consultation" fill className="object-cover object-center" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(8,8,8,0.93) 0%, rgba(28,28,28,0.87) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("faq.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("faq.h1")}
          </h1>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("faq.sub")}
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-4xl mx-auto px-4 space-y-14">
          {faqs.map((section) => (
            <div key={section.categoryKey}>
              <h2
                className="text-lg font-bold mb-6 pb-2 border-b-2 inline-block"
                style={{ color: "#1C1C1C", borderColor: "#B9954F", fontFamily: "var(--font-heading), serif" }}
              >
                {t(section.categoryKey)}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq) => (
                  <div
                    key={faq.qKey}
                    className="bg-white rounded-xl border p-6 hover:shadow-sm transition-shadow"
                    style={{ borderColor: "#E4E4E4" }}
                  >
                    <h3
                      className="text-sm font-bold mb-3"
                      style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
                    >
                      {t(faq.qKey)}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#6E6E6E" }}>{t(faq.aKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="max-w-4xl mx-auto px-4 mt-14">
          <div className="text-white rounded-2xl p-10 text-center" style={{ backgroundColor: "#1C1C1C" }}>
            <h3
              className="text-xl font-bold mb-2 text-white"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              {t("faq.notfound.title")}
            </h3>
            <p className="mb-8 text-sm" style={{ color: "#AFAFAF" }}>
              {t("faq.notfound.sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={site.phoneHref}
                className="text-white font-semibold px-6 py-3 rounded-xl"
                style={{ backgroundColor: "#B9954F" }}
              >
                {t("faq.call")}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold px-6 py-3 rounded-xl border-2 border-white text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
