import CTABanner from "@/components/CTABanner";
import Link from "next/link";

export const metadata = {
  title: "Blog | Taxes and Insurance Group LLC",
  description: "Artículos y recursos sobre impuestos, seguros, negocios y servicios notariales en Kissimmee, Florida.",
};

const articles = [
  {
    title: "Cómo preparar tus impuestos 2026 sin errores",
    excerpt: "Conoce los documentos que necesitas, los créditos disponibles y los pasos clave para declarar correctamente este año fiscal.",
    date: "Marzo 2026",
    category: "Impuestos",
    readTime: "5 min",
  },
  {
    title: "Obamacare vs Medicare: cuál te conviene a ti",
    excerpt: "Comparamos los dos programas más importantes de salud en Estados Unidos para que puedas tomar la mejor decisión para ti y tu familia.",
    date: "Febrero 2026",
    category: "Seguros",
    readTime: "6 min",
  },
  {
    title: "Qué documentos llevar para declarar impuestos",
    excerpt: "Una lista completa y clara de los documentos que necesitas tener listos para tu cita de declaración de impuestos este año.",
    date: "Enero 2026",
    category: "Impuestos",
    readTime: "4 min",
  },
  {
    title: "Errores comunes al registrar una empresa en Florida",
    excerpt: "Evita los errores más frecuentes que cometen los nuevos empresarios al iniciar su LLC o corporación en el estado de Florida.",
    date: "Diciembre 2025",
    category: "Negocios",
    readTime: "5 min",
  },
];

const categoryStyle: Record<string, { bg: string; color: string }> = {
  Impuestos: { bg: "#EDE8E0", color: "#7A6340" },
  Seguros: { bg: "#E4EDEA", color: "#3A6B5A" },
  Negocios: { bg: "#E8E4ED", color: "#5A3A6B" },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#B9954F" }}>
            Blog y Recursos
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Información que te Ayuda</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C2C8CC" }}>
            Artículos útiles sobre impuestos, seguros, negocios y servicios notariales escritos para la comunidad hispana.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article
                key={article.title}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div className="h-1" style={{ backgroundColor: "#B9954F" }} />
                <div className="p-8">
                  <div className="mb-4">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: categoryStyle[article.category]?.bg ?? "#EDEDED",
                        color: categoryStyle[article.category]?.color ?? "#3E3E3E",
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 leading-tight" style={{ color: "#1C1C1C" }}>
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#6E6E6E" }}>{article.excerpt}</p>
                  <div className="flex justify-between items-center text-xs" style={{ color: "#AFAFAF" }}>
                    <span>{article.date} · {article.readTime} lectura</span>
                    <span
                      className="font-semibold cursor-pointer transition-opacity hover:opacity-80"
                      style={{ color: "#B9954F" }}
                    >
                      Próximamente
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon */}
          <div
            className="mt-12 text-center bg-white border rounded-xl p-8"
            style={{ borderColor: "#E4E4E4" }}
          >
            <div
              className="w-12 h-1 rounded-full mx-auto mb-6"
              style={{ backgroundColor: "#B9954F" }}
            />
            <h3 className="text-xl font-bold mb-2" style={{ color: "#1C1C1C" }}>Más artículos próximamente</h3>
            <p className="text-sm max-w-md mx-auto" style={{ color: "#6E6E6E" }}>
              Seguimos publicando contenido útil para ayudarte a tomar mejores decisiones sobre impuestos, seguros y tu negocio.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
