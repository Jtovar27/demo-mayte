import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

const featuredServices = [
  { icon: "📊", title: "Impuestos Personales", description: "Declaración federal y estatal. Maximizamos tu reembolso con precisión y sin errores." },
  { icon: "🏢", title: "Impuestos Empresariales", description: "Preparamos los impuestos de tu negocio con experiencia y conocimiento local." },
  { icon: "🏥", title: "Seguros de Salud", description: "Obamacare / ACA. Te ayudamos a encontrar el plan de salud que mejor se adapta a ti." },
  { icon: "💼", title: "Seguros de Vida y Medicare", description: "Protege a tu familia y asegura tu futuro con los planes correctos." },
  { icon: "📜", title: "Notario Público & Apostillas", description: "Documentos legalizados, apostillados y traducciones certificadas en más de 5 idiomas." },
  { icon: "🏦", title: "Crédito y Préstamos", description: "Establecimiento de crédito empresarial, préstamos de corto y largo plazo." },
];

const blogPreviews = [
  {
    title: "Cómo preparar tus impuestos 2026 sin errores",
    excerpt: "Conoce los documentos que necesitas y los pasos clave para declarar correctamente este año.",
    date: "Marzo 2026",
    category: "Impuestos",
  },
  {
    title: "Obamacare vs Medicare: ¿cuál te conviene?",
    excerpt: "Comparamos los dos programas más importantes de salud para que puedas tomar la mejor decisión.",
    date: "Febrero 2026",
    category: "Seguros",
  },
  {
    title: "Errores comunes al registrar una empresa en Florida",
    excerpt: "Evita los errores más frecuentes que cometen los nuevos empresarios al iniciar su negocio.",
    date: "Enero 2026",
    category: "Negocios",
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-6 tracking-wider uppercase">
            Consulta Gratis · Atención en Español
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Tu Aliado de Confianza en<br />
            <span className="text-amber-400">Impuestos, Seguros</span><br />
            y Servicios Notariales
          </h1>
          <p className="text-lg md:text-xl text-blue-200 mb-4 max-w-2xl mx-auto leading-relaxed">
            Más de 20 años ayudando a familias y negocios en Kissimmee, Florida.
            Atención personalizada, precios justos y cero complicaciones.
          </p>
          <p className="text-blue-300 text-sm mb-8">En persona o virtual · Kissimmee, FL · (407) 235-4065</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:4072354065"
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              📞 Llámanos Ahora
            </a>
            <Link
              href="/services"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/30"
            >
              Ver Servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: "🏆", number: "20+", label: "Años de Experiencia" },
            { icon: "🇺🇸", number: "100%", label: "Atención en Español" },
            { icon: "✅", number: "Gratis", label: "Consulta Inicial" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 py-2">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-2xl font-extrabold text-blue-900">{stat.number}</span>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Todo lo que necesitas en un solo lugar. Atención profesional, personalizada y en español.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Ver Todos los Servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-amber-500 font-semibold text-sm uppercase tracking-wider mb-3">Sobre Nosotros</div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 leading-tight">
              Más de 20 años<br />a tu servicio
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Taxes and Insurance Group LLC</strong> es propiedad de <strong>Mayte F. Roses Soto</strong>. Llevamos más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nuestro compromiso es la atención personalizada, precios justos y cero complicaciones. Nos enorgullece ser un punto de confianza para familias y negocios en nuestra comunidad.
            </p>
            <Link
              href="/about"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Conoce Más →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🤝", label: "Servicio personalizado" },
              { icon: "🗣️", label: "Atención en español" },
              { icon: "💰", label: "Precios justos" },
              { icon: "🏠", label: "Presencial o virtual" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">Artículos y Recursos</h2>
            <p className="text-gray-600">Información útil para tomar mejores decisiones financieras y de seguros.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((post) => (
              <div key={post.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-blue-900 h-2" />
                <div className="p-6">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-lg font-bold text-blue-900 mt-2 mb-2 leading-tight">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <Link href="/blog" className="text-sm font-semibold text-blue-700 hover:text-amber-600">
                      Leer más →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />

      {/* LOCATION BAR */}
      <section className="bg-blue-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-blue-200 text-sm mb-1">Visítanos en</p>
          <p className="text-lg font-bold text-white">📍 1216 Dyer Blvd, Kissimmee, FL 34741</p>
          <p className="text-blue-300 text-sm mt-2">Lunes a Viernes · 9am – 6pm · Sábados con cita</p>
        </div>
      </section>
    </>
  );
}
