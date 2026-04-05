"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "◈" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/team", label: "Equipo", icon: "◉" },
  { href: "/admin/settings", label: "Ajustes", icon: "⚙" },
  { href: "/admin/settings/security", label: "Contraseña", icon: "◆" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F2F5" }}>

      {/* Mobile top bar */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4"
        style={{ backgroundColor: "#0D2B4E", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col gap-1.5 p-1"
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-6 h-0.5 bg-white rounded" />
          <span className="block w-5 h-0.5 bg-white rounded" />
        </button>
        <span
          className="text-sm font-bold text-white absolute left-1/2 -translate-x-1/2"
          style={{ fontFamily: "var(--font-heading), serif" }}
        >
          Admin
        </span>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-xs font-semibold disabled:opacity-50"
          style={{ color: "#B9954F" }}
        >
          {loggingOut ? "..." : "Salir"}
        </button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-60 flex flex-col transition-transform duration-300 md:translate-x-0 md:z-30 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#0D2B4E" }}
      >
        {/* Logo */}
        <div
          className="px-6 py-5 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-0.5"
              style={{ color: "#B9954F" }}
            >
              Admin Panel
            </div>
            <div
              className="text-sm font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-heading), serif" }}
            >
              Taxes &amp; Insurance
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            className="md:hidden text-white/50 hover:text-white ml-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive ? "#B9954F" : "rgba(255,255,255,0.75)",
                  backgroundColor: isActive ? "rgba(185,149,79,0.15)" : "transparent",
                }}
              >
                <span className="w-4 text-center" style={{ fontSize: "13px" }}>{link.icon}</span>
                {link.label}
                {isActive && (
                  <span
                    className="ml-auto w-1 h-4 rounded-full"
                    style={{ backgroundColor: "#B9954F" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <a
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <span className="w-4 text-center text-xs">↗</span>
            Ver sitio
          </a>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <span className="w-4 text-center text-xs">→</span>
            {loggingOut ? "Cerrando..." : "Cerrar sesión"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="md:ml-60 pt-14 md:pt-0 min-h-screen"
        style={{ backgroundColor: "#F0F2F5" }}
      >
        {children}
      </main>
    </div>
  );
}
