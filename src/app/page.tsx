import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import CTABanner from "@/components/CTABanner";

const featuredServices = [
  { title: "Impuestos Personales", description: "Declaración federal y estatal. Maximizamos tu reembolso con precisión y sin errores." },
  { title: "Impuestos Empresariales", description: "Preparamos los impuestos de tu negocio con experiencia y conocimiento local." },
  { title: "Seguros de Salud", description: "Obamacare / ACA. Te ayudamos a encontrar el plan de salud que mejor se adapta a ti." },
  { title: "Seguros de Vida y Medicare", description: "Protege a tu familia y asegura tu futuro con los planes correctos." },
  { title: "Notario Público y Apostillas", description: "Documentos legalizados, apostillados y traducciones certificadas en más de 5 idiomas." },
  { title: "Crédito y Préstamos", description: "Establecimiento de crédito empresarial, préstamos de corto y largo plazo." },
];

const blogPreviews = [
  {
    title: "Cómo preparar tus impuestos 2026 sin errores",
    excerpt: "Conoce los documentos que necesitas y los pasos clave para declarar correctamente este año.",
    date: "Marzo 2026",
    category: "Impuestos",
  },
  {
    title: "Obamacare vs Medicare: cuál te conviene",
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
      <section
        className="text-white py-24 md:py-36"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1C1C1C 60%, #272727 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div
            className="inline-block text-xs font-bold px-4 py-1 rounded-full mb-6 tracking-wider uppercase"
            style={{ backgroundColor: "#B9954F", color: "#FFFFFF" }}
          >
            Consulta Gratis · Atención en Español
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            Tu Aliado de Confianza en<br />
            <span style={{ color: "#B9954F" }}>Impuestos, Seguros</span><br />
            y Servicios Notariales
          </h1>
          <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{ color: "#C2C8CC" }}>
            Más de 20 años ayudando a familias y negocios en Kissimmee, Florida.
            Atención personalizada, precios justos y cero complicaciones.
          </p>
          <p className="text-sm mb-8" style={{ color: "#AFAFAF" }}>
            En persona o virtual · Kissimmee, FL · (407) 235-4065
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:4072354065"
              className="text-white font-bold px-8 py-4 rounded-xl text-lg transition-opacity hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#B9954F" }}
            >
              Llámanos Ahora
            </a>
            <Link
              href="/services"
              className="font-bold px-8 py-4 rounded-xl text-lg transition-opacity hover:opacity-80 border border-white/30 text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b py-8" style={{ borderColor: "#E4E4E4" }}>
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { number: "20+", label: "Años de Experiencia" },
            { number: "100%", label: "Atención en Español" },
            { number: "Gratis", label: "Consulta Inicial" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 py-2">
              <span className="text-2xl font-extrabold" style={{ color: "#1C1C1C" }}>{stat.number}</span>
              <span className="text-sm" style={{ color: "#6E6E6E" }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1C1C1C" }}>Nuestros Servicios</h2>
            <p className="max-w-xl mx-auto" style={{ color: "#6E6E6E" }}>
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
              className="inline-block text-white font-bold px-8 py-3 rounded-xl transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1C1C1C" }}
            >
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#B9954F" }}>
              Sobre Nosotros
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: "#1C1C1C" }}>
              Más de 20 años<br />a tu servicio
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: "#6E6E6E" }}>
              <strong style={{ color: "#1C1C1C" }}>Taxes and Insurance Group LLC</strong> es propiedad de{" "}
              <strong style={{ color: "#1C1C1C" }}>Mayte F. Roses Soto</strong>. Llevamos más de 20 años ayudando a
              la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.
            </p>
            <p className="leading-relaxed mb-6" style={{ color: "#6E6E6E" }}>
              Nuestro compromiso es la atención personalizada, precios justos y cero complicaciones.
            </p>
            <Link
              href="/about"
              className="inline-block text-white font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#B9954F" }}
            >
              Conoce Más
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Servicio personalizado" },
              { label: "Atención en español" },
              { label: "Precios justos" },
              { label: "Presencial o virtual" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-6 text-center border"
                style={{ backgroundColor: "#FAFAFA", borderColor: "#E4E4E4" }}
              >
                <div
                  className="w-8 h-1 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: "#B9954F" }}
                />
                <p className="text-sm font-semibold" style={{ color: "#272727" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1C1C1C" }}>Artículos y Recursos</h2>
            <p style={{ color: "#6E6E6E" }}>Información útil para tomar mejores decisiones financieras y de seguros.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="h-1" style={{ backgroundColor: "#B9954F" }} />
                <div className="p-6">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#B9954F" }}
                  >
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold mt-2 mb-2 leading-tight" style={{ color: "#1C1C1C" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#6E6E6E" }}>{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs" style={{ color: "#AFAFAF" }}>{post.date}</span>
                    <Link
                      href="/blog"
                      className="text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: "#B9954F" }}
                    >
                      Leer más
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
      <section className="py-8 text-white" style={{ backgroundColor: "#1C1C1C" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm mb-1" style={{ color: "#AFAFAF" }}>Visítanos en</p>
          <p className="text-lg font-bold text-white">1216 Dyer Blvd, Kissimmee, FL 34741</p>
          <p className="text-sm mt-2" style={{ color: "#AFAFAF" }}>Lunes a Viernes · 9am – 6pm · Sábados con cita</p>
        </div>
      </section>
    </>
  );
}
