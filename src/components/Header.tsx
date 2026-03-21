"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { SITE } from "@/config/site";
import { navLinks } from "@/data/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "#000000" }}>
      {/* Top bar */}
      <div className="text-sm py-1.5 border-b" style={{ backgroundColor: "#000000", borderColor: "#1C1C1C" }}>
        <div
          className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1"
          style={{ color: "#AFAFAF" }}
        >
          <span>{SITE.address.full}</span>
          <a
            href={SITE.phoneHref}
            className="font-semibold"
            style={{ color: "#B9954F" }}
          >
            {SITE.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo — shows image when SITE.logo.path is set, text otherwise.
             To activate: drop logo file into public/ and set SITE.logo.path in src/config/site.ts */}
        <Link href="/" className="flex items-center gap-3">
          {SITE.logo.path ? (
            <Image
              src={SITE.logo.path}
              alt={SITE.logo.alt}
              width={54}
              height={54}
              priority
              className="object-contain"
            />
          ) : (
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-white" style={{ fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif" }}>
                Taxes &amp; Insurance Group LLC
              </span>
              <span className="text-xs leading-tight" style={{ color: "#AFAFAF" }}>
                {t("header.tagline")}
              </span>
            </div>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors"
              style={{ color: "#C2C8CC" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#B9954F")}
              onMouseLeave={e => (e.currentTarget.style.color = "#C2C8CC")}
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
            href={SITE.phoneHref}
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
            className="text-white p-1"
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
        <div className="md:hidden border-t" style={{ backgroundColor: "#141414", borderColor: "#333333" }}>
          <div className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm border-b last:border-0"
                style={{ color: "#C2C8CC", borderColor: "#2A2A2A" }}
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
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
