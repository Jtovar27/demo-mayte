"use client";
import { useState } from "react";
import Link from "next/link";

export default function SecurityPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) { setError("New passwords don't match."); return; }
    setSaving(true); setError(""); setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current, next }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? "Failed to update."); return; }
      setSuccess(true);
      setCurrent(""); setNext(""); setConfirm("");
    } catch {
      setError("Connection error.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls = "w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none";
  const inputStyle = { borderColor: "#D0D0D0" };
  const labelCls = "block text-xs font-semibold mb-1.5 uppercase tracking-wider";
  const labelStyle = { color: "#0D2B4E" };

  return (
    <div className="p-4 md:p-8 max-w-md">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/settings" className="text-sm" style={{ color: "#B9954F" }}>← Settings</Link>
        <span style={{ color: "#D0D0D0" }}>/</span>
        <h1 className="text-2xl font-bold" style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}>
          Change Password
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
        <div>
          <label className={labelCls} style={labelStyle}>Current Password</label>
          <input type="password" value={current} onChange={e => setCurrent(e.target.value)} required
            className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>New Password</label>
          <input type="password" value={next} onChange={e => setNext(e.target.value)} required minLength={8}
            placeholder="Minimum 8 characters" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Confirm New Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
            className={inputCls} style={inputStyle} />
        </div>
        {error && <p className="text-xs" style={{ color: "#C0392B" }}>{error}</p>}
        {success && <p className="text-xs" style={{ color: "#2E7D32" }}>Password updated successfully.</p>}
        <button type="submit" disabled={saving}
          className="w-full py-2.5 rounded-lg text-sm font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "#0D2B4E" }}>
          {saving ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
