"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/admin-store";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [teamCount, setTeamCount] = useState(0);
  const [unreadContacts, setUnreadContacts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, teamRes, contactsRes] = await Promise.all([
          fetch("/api/admin/blog"),
          fetch("/api/admin/team"),
          fetch("/api/admin/contacts"),
        ]);
        const postsData = await postsRes.json() as BlogPost[];
        const teamData = await teamRes.json() as unknown[];
        const contactsData = await contactsRes.json() as { read: boolean }[];
        setPosts(Array.isArray(postsData) ? postsData : []);
        setTeamCount(Array.isArray(teamData) ? teamData.length : 0);
        if (Array.isArray(contactsData)) {
          setTotalContacts(contactsData.length);
          setUnreadContacts(contactsData.filter((c) => !c.read).length);
        }
      } catch {
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;
  const recent = posts.slice(0, 5);

  return (
    <div className="p-4 md:p-8">
      {loadError && (
        <div className="mb-6 rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#FEECEC", color: "#C0392B" }}>
          Error al cargar datos. Por favor recarga la página.
        </div>
      )}

      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
        >
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
          Bienvenido. Aquí tienes un resumen de tu contenido.
        </p>
      </div>

      {/* Unread contacts alert */}
      {!loading && unreadContacts > 0 && (
        <Link
          href="/admin/contacts"
          className="flex items-center gap-3 rounded-xl border px-4 py-3 mb-6 transition-opacity hover:opacity-80"
          style={{ backgroundColor: "rgba(185,149,79,0.08)", borderColor: "#B9954F" }}
        >
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: "#B9954F" }}
          >
            {unreadContacts}
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: "#0D2B4E" }}>
              {unreadContacts === 1 ? "1 mensaje nuevo" : `${unreadContacts} mensajes nuevos`}
            </p>
            <p className="text-xs" style={{ color: "#6E6E6E" }}>Toca para ver los formularios de contacto</p>
          </div>
          <span className="ml-auto text-sm" style={{ color: "#B9954F" }}>→</span>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Mensajes", value: totalContacts, color: "#B9954F", href: "/admin/contacts" },
          { label: "Publicados", value: published, color: "#2E7D32", href: "/admin/blog" },
          { label: "Borradores", value: drafts, color: "#0D2B4E", href: "/admin/blog" },
          { label: "Equipo", value: teamCount, color: "#0D2B4E", href: "/admin/team" },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border p-5 hover:shadow-sm transition-shadow"
            style={{ borderColor: "#E4E4E4" }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
              {loading ? "—" : stat.value}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6E6E6E" }}>
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/admin/contacts"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
          style={{ backgroundColor: "#B9954F" }}
        >
          Ver Mensajes {unreadContacts > 0 && `(${unreadContacts})`}
        </Link>
        <Link
          href="/admin/blog/new"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          + Nuevo Post
        </Link>
        <Link
          href="/admin/team"
          className="text-sm font-semibold px-5 py-2.5 rounded-lg border"
          style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
        >
          Equipo
        </Link>
      </div>

      {/* Recent posts */}
      <div className="bg-white rounded-xl border" style={{ borderColor: "#E4E4E4" }}>
        <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#E4E4E4" }}>
          <h2
            className="text-base font-bold"
            style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
          >
            Posts Recientes
          </h2>
          <Link href="/admin/blog" className="text-xs font-semibold" style={{ color: "#B9954F" }}>
            Ver todos
          </Link>
        </div>
        <div className="divide-y" style={{ borderColor: "#E4E4E4" }}>
          {loading ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6E6E6E" }}>Cargando...</div>
          ) : recent.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm" style={{ color: "#6E6E6E" }}>
              Sin posts.{" "}
              <Link href="/admin/blog/new" className="font-semibold" style={{ color: "#B9954F" }}>
                Crear el primero
              </Link>
            </div>
          ) : (
            recent.map((post) => (
              <Link
                key={post.id}
                href={`/admin/blog/${post.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="text-sm font-medium" style={{ color: "#0D2B4E" }}>{post.title.es}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#AFAFAF" }}>{post.date} · {post.category}</div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full ml-4 shrink-0"
                  style={{
                    backgroundColor: post.published ? "#E8F5E9" : "#FFF3E0",
                    color: post.published ? "#2E7D32" : "#B9954F",
                  }}
                >
                  {post.published ? "Publicado" : "Borrador"}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
