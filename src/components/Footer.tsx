import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-2">Taxes &amp; Insurance Group LLC</h3>
          <p className="text-blue-300 text-sm mb-4 leading-relaxed">
            Más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.
          </p>
          <p className="text-xs text-blue-400 italic border-l-2 border-amber-500 pl-3">
            &quot;No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.&quot;
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-blue-300">
            {[
              { href: "/", label: "Inicio" },
              { href: "/about", label: "Nosotros" },
              { href: "/services", label: "Servicios" },
              { href: "/blog", label: "Blog" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contacto" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-blue-300">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>1216 Dyer Blvd,<br />Kissimmee, FL 34741</span>
            </li>
            <li>
              <a href="tel:4072354065" className="flex items-center gap-2 hover:text-amber-400">
                <span>📞</span> (407) 235-4065
              </a>
            </li>
            <li>
              <a href="mailto:inmigracion360@gmail.com" className="flex items-center gap-2 hover:text-amber-400">
                <span>✉️</span> inmigracion360@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/14072354065"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-amber-400"
              >
                <span>💬</span> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-400">
          <span>© 2026 Taxes and Insurance Group LLC · Todos los derechos reservados</span>
          <span>Kissimmee, Florida · Atención 100% en español</span>
        </div>
      </div>
    </footer>
  );
}
