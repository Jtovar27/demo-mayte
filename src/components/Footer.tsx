import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#141414" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-2">Taxes &amp; Insurance Group LLC</h3>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "#AFAFAF" }}>
            Más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.
          </p>
          <p className="text-xs italic border-l-2 pl-3" style={{ color: "#6E6E6E", borderColor: "#B9954F" }}>
            &quot;No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.&quot;
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#B9954F" }}>Navegación</h4>
          <ul className="space-y-2 text-sm" style={{ color: "#AFAFAF" }}>
            {[
              { href: "/", label: "Inicio" },
              { href: "/about", label: "Nosotros" },
              { href: "/services", label: "Servicios" },
              { href: "/blog", label: "Blog" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contacto" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:opacity-80 transition-opacity" style={{ color: "#AFAFAF" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#B9954F" }}>Contacto</h4>
          <ul className="space-y-3 text-sm" style={{ color: "#AFAFAF" }}>
            <li>
              <span>1216 Dyer Blvd,</span><br />
              <span>Kissimmee, FL 34741</span>
            </li>
            <li>
              <a href="tel:4072354065" className="hover:opacity-80 transition-opacity">
                (407) 235-4065
              </a>
            </li>
            <li>
              <a href="mailto:inmigracion360@gmail.com" className="hover:opacity-80 transition-opacity">
                inmigracion360@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/14072354065"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#333333" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs" style={{ color: "#6E6E6E" }}>
          <span>© 2026 Taxes and Insurance Group LLC · Todos los derechos reservados</span>
          <span>Kissimmee, Florida · Atención 100% en español</span>
        </div>
      </div>
    </footer>
  );
}
