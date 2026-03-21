"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Calendar, FileText, ClipboardList, DollarSign, ExternalLink } from "lucide-react";
import CTABanner from "@/components/CTABanner";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";

const steps = [
  { key: "ttg.step1", icon: Calendar },
  { key: "ttg.step2", icon: ClipboardList },
  { key: "ttg.step3", icon: FileText },
  { key: "ttg.step4", icon: DollarSign },
];

const bringItems = [
  "ttg.bring.item1",
  "ttg.bring.item2",
  "ttg.bring.item3",
  "ttg.bring.item4",
  "ttg.bring.item5",
  "ttg.bring.item6",
];

export default function TaxesToGoPage() {
  const { t } = useLang();

  const externalUrl = SITE.taxesToGo.url || SITE.whatsapp;

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
            alt="Tax preparation service"
            fill
            className="object-cover object-center"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(150deg, rgba(8,8,8,0.94) 0%, rgba(28,28,28,0.88) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full border"
            style={{ color: "#B9954F", borderColor: "#B9954F" }}
          >
            {t("ttg.page.label")}
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("ttg.page.h1")}
          </h1>
          <p
            className="text-base max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "#C2C8CC" }}
          >
            {t("ttg.page.sub")}
          </p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#B9954F" }}
          >
            {t("ttg.page.cta")}
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* What is Taxes To Go */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#B9954F" }}
          >
            {t("ttg.what.label")}
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
          >
            {t("ttg.what.h2")}
          </h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: "#444444" }}>
            {t("ttg.what.p1")}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#444444" }}>
            {t("ttg.what.p2")}
          </p>
        </div>
      </section>

      {/* How it works — process steps */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#B9954F" }}
            >
              {t("ttg.steps.label")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("ttg.steps.h2")}
            </h2>
            <p className="text-base" style={{ color: "#6E6E6E" }}>
              {t("ttg.steps.sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="bg-white rounded-xl p-6 flex flex-col gap-4 shadow-sm border"
                  style={{ borderColor: "#E8E8E8" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: "#B9954F" }}
                    >
                      {index + 1}
                    </div>
                    <Icon size={20} style={{ color: "#B9954F" }} />
                  </div>
                  <h3
                    className="text-base font-bold leading-snug"
                    style={{ color: "#1C1C1C" }}
                  >
                    {t(`${step.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6E6E6E" }}>
                    {t(`${step.key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to bring */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#B9954F" }}
            >
              {t("ttg.bring.label")}
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("ttg.bring.h2")}
            </h2>
            <p className="text-base" style={{ color: "#6E6E6E" }}>
              {t("ttg.bring.sub")}
            </p>
          </div>

          <div
            className="rounded-xl border p-8"
            style={{ borderColor: "#E8E8E8", backgroundColor: "#FAFAFA" }}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bringItems.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#B9954F" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "#444444" }}>
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA block */}
      <section
        className="py-16 md:py-20"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("ttg.cta.h2")}
          </h2>
          <p className="text-base mb-8" style={{ color: "#C2C8CC" }}>
            {t("ttg.cta.sub")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-lg transition-opacity hover:opacity-90 text-white"
              style={{ backgroundColor: "#B9954F" }}
            >
              {t("ttg.cta.primary")}
              <ExternalLink size={16} />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold px-8 py-3 rounded-lg border transition-colors hover:bg-white hover:text-gray-900"
              style={{ borderColor: "#C2C8CC", color: "#C2C8CC" }}
            >
              {t("ttg.cta.secondary")}
            </Link>
          </div>
          <p className="mt-6 text-sm" style={{ color: "#888888" }}>
            {t("ttg.cta.note")}{" "}
            <a
              href={SITE.phoneHref}
              className="underline hover:opacity-80"
              style={{ color: "#B9954F" }}
            >
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
