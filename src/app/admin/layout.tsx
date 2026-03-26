"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/blog", label: "Blog", icon: "✎" },
  { href: "/admin/team", label: "Team", icon: "◉" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
  { href: "/admin/settings/security", label: "Password", icon: "🔒" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  // Don't show sidebar on login page
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
    <div className="flex min-h-screen" style={{ backgroundColor: "#F5F5F5" }}>
      {/* Sidebar */}
      <aside
        className="w-60 flex flex-col fixed top-0 left-0 h-full z-40"
        style={{ backgroundColor: "#1C1C1C" }}
      >
        {/* Logo / Business name */}
        <div className="px-6 py-6 border-b" style={{ borderColor: "#2E2E2E" }}>
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#B9954F" }}
          >
            Admin Panel
          </div>
          <div
            className="text-sm font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Taxes & Insurance Group LLC
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive ? "#B9954F" : "#AAAAAA",
                  backgroundColor: isActive ? "rgba(185,149,79,0.12)" : "transparent",
                }}
              >
                <span style={{ fontSize: "14px" }}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "#2E2E2E" }}>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            style={{ color: "#888888" }}
          >
            <span style={{ fontSize: "14px" }}>→</span>
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 min-h-screen">
        {children}
      </main>
    </div>
  );
}
