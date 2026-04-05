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
            <span className="sm:hidden">
              {lang === "es" ? "Llámanos al " : "Call us at "} +1{site.phone}
            </span>
            <span className="hidden sm:inline">+1{site.phone}</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative min-h-24 md:min-h-0 md:py-2">

        {/* Mobile: hamburger (left) */}
        <button
          className="md:hidden p-1 z-10"
          style={{ color: "#0D2B4E" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo — centered on mobile, left on desktop */}
        <Link
          href="/"
          className="md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.logo.path || "/logo-transparent.png"}
            alt={site.logo.alt}
            className="h-24 md:h-28 w-auto object-contain"
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
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs font-bold px-3 py-1 rounded-full border transition-all"
            style={{ borderColor: "#B9954F", color: "#B9954F", backgroundColor: "transparent" }}
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

        {/* Mobile: language toggle (right) */}
        <button
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="md:hidden text-xs font-bold px-2.5 py-1.5 rounded-full border z-10"
          style={{ borderColor: "#B9954F", color: "#B9954F" }}
        >
          {lang === "es" ? "EN" : "ES"}
        </button>
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
