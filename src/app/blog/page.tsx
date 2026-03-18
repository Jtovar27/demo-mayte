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
    icon: "📊",
  },
  {
    title: "Obamacare vs Medicare: ¿cuál te conviene a ti?",
    excerpt: "Comparamos los dos programas más importantes de salud en Estados Unidos para que puedas tomar la mejor decisión para ti y tu familia.",
    date: "Febrero 2026",
    category: "Seguros",
    readTime: "6 min",
    icon: "🏥",
  },
  {
    title: "¿Qué documentos llevar para declarar impuestos?",
    excerpt: "Una lista completa y clara de los documentos que necesitas tener listos para tu cita de declaración de impuestos este año.",
    date: "Enero 2026",
    category: "Impuestos",
    readTime: "4 min",
    icon: "📋",
  },
  {
    title: "Errores comunes al registrar una empresa en Florida",
    excerpt: "Evita los errores más frecuentes que cometen los nuevos empresarios al iniciar su LLC o corporación en el estado de Florida.",
    date: "Diciembre 2025",
    category: "Negocios",
    readTime: "5 min",
    icon: "🏢",
  },
];

const categoryColors: Record<string, string> = {
  Impuestos: "bg-blue-100 text-blue-800",
  Seguros: "bg-green-100 text-green-800",
  Negocios: "bg-amber-100 text-amber-800",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Blog y Recursos</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Información que te Ayuda</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Artículos útiles sobre impuestos, seguros, negocios y servicios notariales escritos para la comunidad hispana.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <article key={article.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-blue-900 h-1" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{article.icon}</span>
                    <div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-blue-900 mb-3 leading-tight">{article.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{article.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{article.date} · {article.readTime} lectura</span>
                    <span className="text-blue-600 font-semibold cursor-pointer hover:text-amber-600">
                      Próximamente →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="mt-12 text-center bg-white border border-gray-200 rounded-xl p-8">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Más artículos próximamente</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Seguimos publicando contenido útil para ayudarte a tomar mejores decisiones sobre impuestos, seguros y tu negocio.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
