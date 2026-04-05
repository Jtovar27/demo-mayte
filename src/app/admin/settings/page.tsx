"use client";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/admin-store";

const DEFAULT_SETTINGS: SiteSettings = {
  phone: "",
  phoneRaw: "",
  email: "",
  address: { street: "", city: "", state: "", zip: "" },
  hours: { weekdays: "", saturday: "", sunday: "" },
  googleReviewsUrl: "",
  taxesToGoUrl: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json() as SiteSettings;
        setSettings(data);
      } catch {
        setError("Failed to load settings.");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".") as [string, string];
      setSettings((prev) => ({
        ...prev,
        [parent]: { ...(prev[parent as keyof SiteSettings] as Record<string, string>), [child]: value },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        setError("Failed to save settings.");
        return;
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-sm" style={{ color: "#6E6E6E" }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold"
          style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
        >
          Site Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6E6E6E" }}>
          Override site contact information saved in <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">content/settings.json</code>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Phone (display)</label>
              <input type="text" name="phone" value={settings.phone} onChange={handleChange}
                placeholder="(407) 235-4065" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Phone (raw digits)</label>
              <input type="text" name="phoneRaw" value={settings.phoneRaw} onChange={handleChange}
                placeholder="4072354065" className={inputCls} style={inputStyle} />
            </div>
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Email</label>
            <input type="email" name="email" value={settings.email} onChange={handleChange}
              placeholder="office@example.com" className={inputCls} style={inputStyle} />
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Address</h2>
          <div>
            <label className={labelCls} style={labelStyle}>Street</label>
            <input type="text" name="address.street" value={settings.address.street} onChange={handleChange}
              placeholder="1216 Dyer Blvd" className={inputCls} style={inputStyle} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className={labelCls} style={labelStyle}>City</label>
              <input type="text" name="address.city" value={settings.address.city} onChange={handleChange}
                placeholder="Kissimmee" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>State</label>
              <input type="text" name="address.state" value={settings.address.state} onChange={handleChange}
                placeholder="FL" className={inputCls} style={inputStyle} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>ZIP</label>
              <input type="text" name="address.zip" value={settings.address.zip} onChange={handleChange}
                placeholder="34741" className={inputCls} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>Business Hours</h2>
          <div>
            <label className={labelCls} style={labelStyle}>Weekdays</label>
            <input type="text" name="hours.weekdays" value={settings.hours.weekdays} onChange={handleChange}
              placeholder="9:00am – 6:00pm" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Saturday</label>
            <input type="text" name="hours.saturday" value={settings.hours.saturday} onChange={handleChange}
              placeholder="By appointment" className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Sunday</label>
            <input type="text" name="hours.sunday" value={settings.hours.sunday} onChange={handleChange}
              placeholder="Closed" className={inputCls} style={inputStyle} />
          </div>
        </div>

        {/* URLs */}
        <div className="bg-white rounded-xl border p-6 space-y-4" style={{ borderColor: "#E4E4E4" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#6E6E6E" }}>URLs</h2>
          <div>
            <label className={labelCls} style={labelStyle}>Google Reviews URL</label>
            <input type="url" name="googleReviewsUrl" value={settings.googleReviewsUrl} onChange={handleChange}
              placeholder="https://share.google/..." className={inputCls} style={inputStyle} />
          </div>
          <div>
            <label className={labelCls} style={labelStyle}>Taxes To Go URL</label>
            <input type="url" name="taxesToGoUrl" value={settings.taxesToGoUrl} onChange={handleChange}
              placeholder="https://taxestogo.com/..." className={inputCls} style={inputStyle} />
          </div>
        </div>

        {error && <p className="text-sm text-center" style={{ color: "#C0392B" }}>{error}</p>}
        {success && <p className="text-sm text-center" style={{ color: "#2E7D32" }}>Settings saved successfully.</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-60"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
