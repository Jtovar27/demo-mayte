export const metadata = {
  title: "Contacto | Taxes and Insurance Group LLC",
  description: "Contáctanos para una consulta gratuita. Estamos en Kissimmee, Florida. Atención en persona o virtual.",
};

const contactMethods = [
  {
    icon: "📞",
    title: "Teléfono",
    detail: "(407) 235-4065",
    action: "Llamar ahora",
    href: "tel:4072354065",
    color: "blue",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    detail: "Escríbenos directamente",
    action: "Abrir WhatsApp",
    href: "https://wa.me/14072354065",
    color: "green",
  },
  {
    icon: "✉️",
    title: "Correo Electrónico",
    detail: "inmigracion360@gmail.com",
    action: "Enviar correo",
    href: "mailto:inmigracion360@gmail.com",
    color: "amber",
  },
  {
    icon: "📍",
    title: "Dirección",
    detail: "1216 Dyer Blvd, Kissimmee, FL 34741",
    action: "Ver en mapa",
    href: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741",
    color: "red",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
  green: "bg-green-50 border-green-200 hover:border-green-400",
  amber: "bg-amber-50 border-amber-200 hover:border-amber-400",
  red: "bg-red-50 border-red-200 hover:border-red-400",
};

const btnColorMap: Record<string, string> = {
  blue: "bg-blue-900 hover:bg-blue-800",
  green: "bg-green-700 hover:bg-green-600",
  amber: "bg-amber-600 hover:bg-amber-500",
  red: "bg-red-700 hover:bg-red-600",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Contacto</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Consulta Gratuita Ahora Mismo</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Atención en persona o virtual. Sin compromiso. 100% en español.
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-10">¿Cómo prefieres contactarnos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className={`rounded-xl border-2 p-6 transition-all ${colorMap[method.color]}`}
              >
                <div className="text-4xl mb-3">{method.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.detail}</p>
                <a
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`inline-block text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors ${btnColorMap[method.color]}`}
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
            <h2 className="text-2xl font-bold text-blue-900 mb-2">Envíanos un Mensaje</h2>
            <p className="text-gray-600 text-sm">Te respondemos a la brevedad posible.</p>
          </div>
          <form className="space-y-4 bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="(407) 000-0000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Servicio de Interés *</label>
              <select
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos en qué podemos ayudarte..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Enviar Mensaje
            </button>
            <p className="text-xs text-gray-400 text-center">
              Tu información está segura. No compartimos tus datos con terceros.
            </p>
          </form>
        </div>
      </section>

      {/* Hours + Disclaimer */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-3">Horario de Atención</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between"><span>Lunes – Viernes</span><span className="font-semibold">9:00am – 6:00pm</span></li>
              <li className="flex justify-between"><span>Sábado</span><span className="font-semibold">Con cita previa</span></li>
              <li className="flex justify-between"><span>Domingo</span><span className="font-semibold text-gray-400">Cerrado</span></li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-sm text-amber-800 italic leading-relaxed">
              ⚠️ <strong>Aviso:</strong> No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
