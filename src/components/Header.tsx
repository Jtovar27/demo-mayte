"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/services", label: "Servicios" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "#1C1C1C" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#0E0E0E" }} className="text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1" style={{ color: "#AFAFAF" }}>
          <span>1216 Dyer Blvd, Kissimmee, FL 34741</span>
          <a href="tel:4072354065" className="font-semibold transition-opacity hover:opacity-80" style={{ color: "#B9954F" }}>
            (407) 235-4065
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold leading-tight text-white">Taxes &amp; Insurance Group LLC</span>
          <span className="text-xs leading-tight" style={{ color: "#AFAFAF" }}>Mayte F. Roses Soto · Kissimmee, Florida</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:opacity-80"
              style={{ color: "#C2C8CC" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#B9954F")}
              onMouseLeave={e => (e.currentTarget.style.color = "#C2C8CC")}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:4072354065"
            className="text-white font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 text-sm"
            style={{ backgroundColor: "#B9954F" }}
          >
            Consulta Gratis
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: "#141414", borderColor: "#333333" }}>
          <div className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-base border-b last:border-0 transition-colors"
                style={{ color: "#C2C8CC", borderColor: "#333333" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:4072354065"
              className="text-white font-bold py-3 rounded-lg text-center mt-2"
              style={{ backgroundColor: "#B9954F" }}
            >
              Consulta Gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
