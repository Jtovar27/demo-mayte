"use client";
import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { navLinks } from "@/data/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const site = useSiteSettings();

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 8px rgba(13,43,78,0.15)" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#0D2B4E" }} className="text-sm py-1.5">
        <div
          className="max-w-7xl mx-auto px-4 flex justify-between items-center gap-1"
          style={{ color: "#FFFFFF" }}
        >
          <span className="hidden sm:block text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>{site.address.full}</span>
          <a
            href={site.phoneHref}
            className="font-semibold text-xs w-full sm:w-auto text-center sm:text-left"
            style={{ color: "#B9954F" }}
          >
            {site.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-2 md:py-4 flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.logo.path || "/logo-transparent.png"}
            alt={site.logo.alt}
            className="h-12 md:h-24 w-auto object-contain flex-shrink-0"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors"
              style={{ color: "#0D2B4E" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#B9954F")}
              onMouseLeave={e => (e.currentTarget.style.color = "#0D2B4E")}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-bold px-3 py-1 rounded-full border transition-all"
            style={{
              borderColor: "#B9954F",
              color: "#B9954F",
              backgroundColor: "transparent",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B9954F";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#B9954F";
            }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a
            href={site.phoneHref}
            className="text-white font-bold px-4 py-2 rounded-lg text-sm"
            style={{ backgroundColor: "#B9954F" }}
          >
            {t("nav.cta")}
          </a>
        </nav>

        {/* Mobile: language + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-bold px-2 py-1 rounded border"
            style={{ borderColor: "#B9954F", color: "#B9954F" }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            className="p-1"
            style={{ color: "#0D2B4E" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E4E4" }}>
          <div className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm border-b last:border-0"
                style={{ color: "#0D2B4E", borderColor: "#E4E4E4" }}
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="text-white font-bold py-3 rounded-lg text-center mt-3"
              style={{ backgroundColor: "#B9954F" }}
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
