export const metadata = {
  title: "Contacto | Taxes and Insurance Group LLC",
  description: "Contáctanos para una consulta gratuita. Estamos en Kissimmee, Florida. Atención en persona o virtual.",
};

const contactMethods = [
  {
    title: "Teléfono",
    detail: "(407) 235-4065",
    action: "Llamar ahora",
    href: "tel:4072354065",
  },
  {
    title: "WhatsApp",
    detail: "Escríbenos directamente",
    action: "Abrir WhatsApp",
    href: "https://wa.me/14072354065",
  },
  {
    title: "Correo Electrónico",
    detail: "inmigracion360@gmail.com",
    action: "Enviar correo",
    href: "mailto:inmigracion360@gmail.com",
  },
  {
    title: "Dirección",
    detail: "1216 Dyer Blvd, Kissimmee, FL 34741",
    action: "Ver en mapa",
    href: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#B9954F" }}>
            Contacto
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Consulta Gratuita Ahora Mismo</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C2C8CC" }}>
            Atención en persona o virtual. Sin compromiso. 100% en español.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#1C1C1C" }}>
            Como prefieres contactarnos?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-xl border-2 p-6 transition-all bg-white hover:shadow-md"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div
                  className="w-8 h-1 rounded-full mb-4"
                  style={{ backgroundColor: "#B9954F" }}
                />
                <h3 className="text-lg font-bold mb-1" style={{ color: "#1C1C1C" }}>{method.title}</h3>
                <p className="text-sm mb-4" style={{ color: "#6E6E6E" }}>{method.detail}</p>
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-block text-white font-bold px-5 py-2 rounded-lg text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#B9954F" }}
                >
                  {method.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#1C1C1C" }}>Envíanos un Mensaje</h2>
            <p className="text-sm" style={{ color: "#6E6E6E" }}>Te respondemos a la brevedad posible.</p>
          </div>
          <form
            className="space-y-4 rounded-2xl p-8 border"
            style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#272727" }}>Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white"
                  style={{ borderColor: "#D0D0D0" }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "#272727" }}>Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="(407) 000-0000"
                  className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white"
                  style={{ borderColor: "#D0D0D0" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#272727" }}>Correo Electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white"
                style={{ borderColor: "#D0D0D0" }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#272727" }}>Servicio de Interés *</label>
              <select
                required
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white"
                style={{ borderColor: "#D0D0D0" }}
              >
                <option value="">Selecciona un servicio</option>
                <option>Impuestos Personales</option>
                <option>Impuestos Empresariales</option>
                <option>Seguro de Salud (Obamacare/ACA)</option>
                <option>Seguro de Vida / Medicare</option>
                <option>Notario Público</option>
                <option>Apostillas</option>
                <option>Poderes Notariales</option>
                <option>Traducciones Certificadas</option>
                <option>Registro de Empresa</option>
                <option>Crédito Empresarial / Préstamos</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: "#272727" }}>Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos en qué podemos ayudarte..."
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none bg-white resize-none"
                style={{ borderColor: "#D0D0D0" }}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white font-bold py-4 rounded-xl transition-opacity hover:opacity-90 text-lg"
              style={{ backgroundColor: "#1C1C1C" }}
            >
              Enviar Mensaje
            </button>
            <p className="text-xs text-center" style={{ color: "#AFAFAF" }}>
              Tu información está segura. No compartimos tus datos con terceros.
            </p>
          </form>
        </div>
      </section>

      {/* Hours + Disclaimer */}
      <section className="py-12 border-t" style={{ backgroundColor: "#F5F5F5", borderColor: "#E4E4E4" }}>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3" style={{ color: "#1C1C1C" }}>Horario de Atención</h3>
            <ul className="space-y-2 text-sm" style={{ color: "#6E6E6E" }}>
              <li className="flex justify-between">
                <span>Lunes – Viernes</span>
                <span className="font-semibold" style={{ color: "#1C1C1C" }}>9:00am – 6:00pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span className="font-semibold" style={{ color: "#1C1C1C" }}>Con cita previa</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="font-semibold" style={{ color: "#AFAFAF" }}>Cerrado</span>
              </li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ backgroundColor: "#FAFAFA", borderColor: "#D0D0D0" }}>
            <p className="text-sm italic leading-relaxed" style={{ color: "#6E6E6E" }}>
              <strong style={{ color: "#1C1C1C" }}>Aviso:</strong> No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
