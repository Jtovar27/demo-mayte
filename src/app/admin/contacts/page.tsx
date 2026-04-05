"use client";
import { useEffect, useState } from "react";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  advisor: string | null;
  message: string | null;
  read: boolean;
  created_at: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminContactsPage() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json() as Submission[];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function markRead(id: string, read: boolean) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, read } : s));
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este mensaje?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((s) => s.id !== id));
      if (expanded === id) setExpanded(null);
    } finally {
      setDeletingId(null);
    }
  }

  function toggleExpand(id: string, read: boolean) {
    setExpanded((prev) => (prev === id ? null : id));
    if (!read) void markRead(id, true);
  }

  const unread = items.filter((s) => !s.read).length;

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
          >
            Mensajes de Contacto
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
            {unread > 0 ? (
              <span>
                <span className="font-semibold" style={{ color: "#B9954F" }}>{unread} sin leer</span>
                {" · "}{items.length} total
              </span>
            ) : (
              `${items.length} mensaje${items.length !== 1 ? "s" : ""}`
            )}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={() => {
              items.filter((s) => !s.read).forEach((s) => void markRead(s.id, true));
            }}
            className="text-xs font-semibold px-4 py-2 rounded-lg border"
            style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
          >
            Marcar todos leídos
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: "#6E6E6E" }}>Cargando...</div>
      ) : items.length === 0 ? (
        <div
          className="rounded-xl border p-12 text-center"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E4E4" }}
        >
          <div className="text-3xl mb-3" style={{ color: "#D0D0D0" }}>◎</div>
          <p className="text-sm font-medium" style={{ color: "#0D2B4E" }}>Sin mensajes todavía</p>
          <p className="text-xs mt-1" style={{ color: "#AFAFAF" }}>Los formularios del sitio aparecerán aquí</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: s.read ? "#E4E4E4" : "#B9954F",
              }}
            >
              {/* Row */}
              <button
                onClick={() => toggleExpand(s.id, s.read)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                {/* Unread dot */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: s.read ? "transparent" : "#B9954F" }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#0D2B4E" }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "#F0F2F5", color: "#6E6E6E" }}
                    >
                      {s.service}
                    </span>
                    {!s.read && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(185,149,79,0.12)", color: "#B9954F" }}
                      >
                        Nuevo
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: "#AFAFAF" }}>{s.phone}</span>
                    {s.email && <span className="text-xs" style={{ color: "#AFAFAF" }}>{s.email}</span>}
                    <span className="text-xs ml-auto" style={{ color: "#AFAFAF" }}>{formatDate(s.created_at)}</span>
                  </div>
                </div>
                <span style={{ color: "#D0D0D0", fontSize: "12px" }}>
                  {expanded === s.id ? "▲" : "▼"}
                </span>
              </button>

              {/* Expanded detail */}
              {expanded === s.id && (
                <div
                  className="px-4 pb-4 border-t"
                  style={{ borderColor: "#F0F2F5" }}
                >
                  <div className="pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#AFAFAF" }}>Teléfono</p>
                        <a href={`tel:${s.phone}`} className="text-sm font-semibold" style={{ color: "#0D2B4E" }}>{s.phone}</a>
                      </div>
                      {s.email && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#AFAFAF" }}>Email</p>
                          <a href={`mailto:${s.email}`} className="text-sm" style={{ color: "#B9954F" }}>{s.email}</a>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#AFAFAF" }}>Servicio</p>
                        <p className="text-sm" style={{ color: "#0D2B4E" }}>{s.service}</p>
                      </div>
                      {s.advisor && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#AFAFAF" }}>Asesor preferido</p>
                          <p className="text-sm" style={{ color: "#0D2B4E" }}>{s.advisor}</p>
                        </div>
                      )}
                    </div>
                    {s.message && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#AFAFAF" }}>Mensaje</p>
                        <p className="text-sm leading-relaxed p-3 rounded-lg" style={{ color: "#0D2B4E", backgroundColor: "#F0F2F5" }}>
                          {s.message}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-1">
                      <a
                        href={`tel:${s.phone}`}
                        className="text-xs font-bold px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: "#0D2B4E" }}
                      >
                        Llamar
                      </a>
                      {s.email && (
                        <a
                          href={`mailto:${s.email}`}
                          className="text-xs font-bold px-4 py-2 rounded-lg text-white"
                          style={{ backgroundColor: "#B9954F" }}
                        >
                          Email
                        </a>
                      )}
                      <button
                        onClick={() => void markRead(s.id, !s.read)}
                        className="text-xs font-semibold px-4 py-2 rounded-lg border ml-auto"
                        style={{ borderColor: "#D0D0D0", color: "#6E6E6E" }}
                      >
                        {s.read ? "Marcar no leído" : "Marcar leído"}
                      </button>
                      <button
                        onClick={() => void handleDelete(s.id)}
                        disabled={deletingId === s.id}
                        className="text-xs font-semibold px-4 py-2 rounded-lg text-white disabled:opacity-50"
                        style={{ backgroundColor: "#C0392B" }}
                      >
                        {deletingId === s.id ? "..." : "Eliminar"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
