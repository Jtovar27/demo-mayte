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
    <header className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-blue-950 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-1 text-blue-200">
          <span>📍 1216 Dyer Blvd, Kissimmee, FL 34741</span>
          <a href="tel:4072354065" className="font-semibold text-amber-400 hover:text-amber-300">
            📞 (407) 235-4065
          </a>
        </div>
      </div>
      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold leading-tight text-white">Taxes &amp; Insurance Group LLC</span>
          <span className="text-xs text-blue-300 leading-tight">Mayte F. Roses Soto · Kissimmee, Florida</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-blue-100 hover:text-amber-400 transition-colors">
              {link.label}
            </Link>
          ))}
          <a
            href="tel:4072354065"
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm"
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
        <div className="md:hidden bg-blue-950 border-t border-blue-800">
          <div className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-blue-100 hover:text-amber-400 py-2 text-base border-b border-blue-800 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:4072354065"
              className="bg-amber-500 text-white font-bold py-3 rounded-lg text-center mt-2"
            >
              Consulta Gratis
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
