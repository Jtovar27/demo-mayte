"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border p-8"
        style={{ backgroundColor: "#252525", borderColor: "#333333" }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#B9954F" }}
          >
            Admin Panel
          </div>
          <h1
            className="text-xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Taxes & Insurance Group LLC
          </h1>
          <p className="text-sm mt-2" style={{ color: "#888888" }}>
            Sign in to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-semibold uppercase tracking-wider mb-2"
              style={{ color: "#AAAAAA" }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter admin password"
              className="w-full rounded-lg px-4 py-3 text-sm text-white focus:outline-none border"
              style={{
                backgroundColor: "#1C1C1C",
                borderColor: "#444444",
              }}
            />
          </div>

          {error && (
            <p className="text-xs text-center" style={{ color: "#E05555" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-opacity"
            style={{ backgroundColor: "#B9954F" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
