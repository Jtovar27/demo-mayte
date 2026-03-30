"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { serviceDropdownKeys } from "@/data/services";

interface TeamMember {
  id: string;
  name: string;
  role: { es: string; en: string };
}

const EMPTY_FORM = { name: "", phone: "", email: "", service: "", advisor: "", message: "" };

export default function ContactPage() {
  const { t, lang } = useLang();
  const site = useSiteSettings();
  const [dynamicTeam, setDynamicTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) setDynamicTeam(data as TeamMember[]);
      })
      .catch(() => {/* keep empty */});
  }, []);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const contactMethods = [
    {
      titleKey: "contact.phone.title",
      detail: site.phone,
      actionKey: "contact.phone.action",
      href: site.phoneHref,
    },
    {
      titleKey: "contact.whatsapp.title",
      detailKey: "contact.whatsapp.detail",
      actionKey: "contact.whatsapp.action",
      href: site.whatsapp,
    },
    {
      titleKey: "contact.email.title",
      detail: site.email,
      actionKey: "contact.email.action",
      href: site.emailHref,
    },
    {
      titleKey: "contact.address.title",
      detail: site.address.full,
      actionKey: "contact.address.action",
      href: site.address.mapsHref,
    },
  ];

  // Prepend placeholder option, then all service title keys from shared data
  const serviceOptions = ["contact.form.service.ph", ...serviceDropdownKeys];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setServerError(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          service: form.service,
          advisor: form.advisor || undefined,
          message: form.message || undefined,
        }),
      });
      if (!res.ok) throw new Error("server error");
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setServerError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative text-white py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Professional office reception"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, rgba(8,8,8,0.93) 0%, rgba(28,28,28,0.87) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("contact.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            {t("contact.h1")}
          </h1>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            {t("contact.sub")}
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2
            className="text-2xl font-bold text-center mb-12"
            style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
          >
            {t("contact.how")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.titleKey}
                className="rounded-xl border p-6 bg-white hover:shadow-md transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="w-6 h-0.5 mb-5" style={{ backgroundColor: "#B9954F" }} />
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
                >
                  {t(method.titleKey)}
                </h3>
                <p className="text-sm mb-5" style={{ color: "#6E6E6E" }}>
                  {method.detail ?? t(method.detailKey!)}
                </p>
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-block text-white font-semibold px-5 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: "#B9954F" }}
                >
                  {t(method.actionKey)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("contact.form.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6E6E6E" }}>{t("contact.form.sub")}</p>
          </div>

          {submitted ? (
            /* Success state */
            <div
              className="rounded-2xl p-10 border text-center flex flex-col items-center gap-5"
              style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}
            >
              <CheckCircle size={48} style={{ color: "#B9954F" }} />
              <div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
                >
                  {t("contact.form.success.title")}
                </h3>
                <p className="text-sm" style={{ color: "#6E6E6E" }}>
                  {t("contact.form.success.sub")}
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm font-semibold underline underline-offset-2"
                style={{ color: "#B9954F" }}
              >
                {t("contact.form.success.back")}
              </button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl p-8 border"
              style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.name.ph")}
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
                    style={{ borderColor: "#D0D0D0" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(407) 000-0000"
                    className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
                    style={{ borderColor: "#D0D0D0" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
                  style={{ borderColor: "#D0D0D0" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                  {t("contact.form.service")}
                </label>
                <select
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
                  style={{ borderColor: "#D0D0D0" }}
                >
                  {serviceOptions.map((key, i) => (
                    <option key={key} value={i === 0 ? "" : t(key)}>
                      {t(key)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                  {t("contact.form.team")}
                </label>
                <select
                  name="advisor"
                  value={form.advisor}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none"
                  style={{ borderColor: "#D0D0D0" }}
                >
                  <option value="">{t("contact.form.team.ph")}</option>
                  {dynamicTeam.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} — {member.role[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#272727" }}>
                  {t("contact.form.message")}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message.ph")}
                  className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none resize-none"
                  style={{ borderColor: "#D0D0D0" }}
                />
              </div>
              {serverError && (
                <p className="text-sm text-center" style={{ color: "#C0392B" }}>
                  {t("contact.form.error")}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-4 rounded-xl text-base disabled:opacity-60"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                {loading ? t("contact.form.sending") : t("contact.form.submit")}
              </button>
              <p className="text-xs text-center" style={{ color: "#AFAFAF" }}>
                {t("contact.form.privacy")}
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Hours + Disclaimer */}
      <section className="py-12 border-t" style={{ backgroundColor: "#F5F5F5", borderColor: "#E4E4E4" }}>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-heading), serif" }}
            >
              {t("contact.hours.title")}
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: "#6E6E6E" }}>
              <li className="flex justify-between border-b pb-2" style={{ borderColor: "#EBEBEB" }}>
                <span>{t("contact.hours.mf")}</span>
                <span className="font-semibold" style={{ color: "#1C1C1C" }}>9:00am – 6:00pm</span>
              </li>
              <li className="flex justify-between border-b pb-2" style={{ borderColor: "#EBEBEB" }}>
                <span>{t("contact.hours.sat")}</span>
                <span className="font-semibold" style={{ color: "#1C1C1C" }}>{t("contact.hours.sat.val")}</span>
              </li>
              <li className="flex justify-between">
                <span>{t("contact.hours.sun")}</span>
                <span className="font-semibold" style={{ color: "#AFAFAF" }}>{t("contact.hours.sun.val")}</span>
              </li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ backgroundColor: "#FAFAFA", borderColor: "#D0D0D0" }}>
            <p className="text-xs italic leading-relaxed" style={{ color: "#6E6E6E" }}>
              {t("contact.disclaimer")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
