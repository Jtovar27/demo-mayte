"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";
import { navLinks } from "@/data/nav";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{ backgroundColor: "#141414" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h3
            className="text-xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif" }}
          >
            {SITE.legalName}
          </h3>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: "#AFAFAF" }}>
            {t("footer.tagline")}
          </p>
          <p
            className="text-xs italic border-l-2 pl-3 leading-relaxed"
            style={{ color: "#6E6E6E", borderColor: "#B9954F" }}
          >
            {t("footer.disclaimer")}
          </p>
          <a
            href={SITE.google.reviewsUrl || SITE.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-5 text-xs transition-opacity hover:opacity-80"
            style={{ color: "#B9954F" }}
          >
            <span>★</span>
            {t("footer.review.cta")}
          </a>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#B9954F" }}>
            {t("footer.nav")}
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "#AFAFAF" }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:opacity-70 transition-opacity">
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#B9954F" }}>
            {t("footer.contact")}
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "#AFAFAF" }}>
            <li>
              <span>{SITE.address.street},</span><br />
              <span>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</span>
            </li>
            <li>
              <a href={SITE.phoneHref} className="hover:opacity-70 transition-opacity">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="hover:opacity-70 transition-opacity">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#222222" }}>
        <div
          className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ color: "#555555" }}
        >
          <span>{t("footer.rights")}</span>
          <span>{t("footer.bilingual")}</span>
        </div>
      </div>
    </footer>
  );
}
