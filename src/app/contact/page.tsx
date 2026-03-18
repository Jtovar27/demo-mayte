"use client";
import { useLang } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLang();

  const contactMethods = [
    { titleKey: "contact.phone.title", detail: "(407) 235-4065", actionKey: "contact.phone.action", href: "tel:4072354065" },
    { titleKey: "contact.whatsapp.title", detailKey: "contact.whatsapp.detail", actionKey: "contact.whatsapp.action", href: "https://wa.me/14072354065" },
    { titleKey: "contact.email.title", detail: "inmigracion360@gmail.com", actionKey: "contact.email.action", href: "mailto:inmigracion360@gmail.com" },
    { titleKey: "contact.address.title", detail: "1216 Dyer Blvd, Kissimmee, FL 34741", actionKey: "contact.address.action", href: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741" },
  ];

  const serviceOptions = [
    "contact.form.service.ph",
    "svc.taxes.personal.title",
    "svc.taxes.business.title",
    "svc.ins.health.title",
    "svc.ins.life.title",
    "svc.notary.pub.title",
    "svc.apostille.title",
    "svc.power.title",
    "svc.translation.title",
    "svc.biz.reg.title",
    "svc.biz.credit.title",
    "svc.loans.title",
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-24"
        style={{ background: "linear-gradient(150deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B9954F" }}>
            {t("contact.label")}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
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
            style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
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
                  style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
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
              style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
            >
              {t("contact.form.title")}
            </h2>
            <p className="text-sm" style={{ color: "#6E6E6E" }}>{t("contact.form.sub")}</p>
          </div>
          <form
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
                  required
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
                  required
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
                required
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
                {t("contact.form.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("contact.form.message.ph")}
                className="w-full border rounded-lg px-4 py-3 text-sm bg-white focus:outline-none resize-none"
                style={{ borderColor: "#D0D0D0" }}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-bold py-4 rounded-xl text-base"
              style={{ backgroundColor: "#1C1C1C" }}
            >
              {t("contact.form.submit")}
            </button>
            <p className="text-xs text-center" style={{ color: "#AFAFAF" }}>
              {t("contact.form.privacy")}
            </p>
          </form>
        </div>
      </section>

      {/* Hours + Disclaimer */}
      <section className="py-12 border-t" style={{ backgroundColor: "#F5F5F5", borderColor: "#E4E4E4" }}>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: "#1C1C1C", fontFamily: "var(--font-playfair), serif" }}
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
