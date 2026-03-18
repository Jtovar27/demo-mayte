import Link from "next/link";
import CTABanner from "@/components/CTABanner";

export const metadata = {
  title: "Nosotros | Taxes and Insurance Group LLC",
  description: "Más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.",
};

const values = [
  { icon: "🤝", title: "Compromiso", description: "Nos tomamos el tiempo necesario para entender tu situación y darte la mejor solución." },
  { icon: "🔒", title: "Confianza", description: "Tu información está segura con nosotros. Manejamos cada caso con total discreción." },
  { icon: "💬", title: "Comunicación", description: "Explicamos todo en términos claros, sin jerga complicada ni sorpresas." },
  { icon: "🏠", title: "Comunidad", description: "Somos parte de la comunidad hispana de Kissimmee. Tu éxito es nuestro éxito." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Sobre Nosotros</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tu Oficina de Confianza en Kissimmee</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Más de 20 años ayudando a familias y negocios con impuestos, seguros y servicios notariales.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6 leading-tight">Nuestra Historia</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Taxes and Insurance Group LLC</strong> es propiedad de <strong>Mayte F. Roses Soto</strong>, quien fundó este negocio con una misión clara: ser un aliado real para la comunidad hispana de Kissimmee y Orlando.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Llevamos más de 20 años brindando servicios profesionales de impuestos, seguros de salud y vida, servicios notariales y apoyo administrativo. Desde el inicio, nuestra filosofía ha sido simple: atención personalizada, precios justos y cero complicaciones.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Hemos tenido el privilegio de acompañar a cientos de familias y empresarios en momentos importantes: al declarar sus impuestos, al proteger su salud, al formalizar sus negocios, y al dar forma a sus documentos más importantes.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
              <p className="text-sm text-gray-700 italic">
                &quot;No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.&quot;
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { number: "20+", label: "Años de experiencia" },
              { number: "500+", label: "Familias atendidas" },
              { number: "5+", label: "Idiomas de traducción" },
              { number: "100%", label: "Atención en español" },
            ].map((stat) => (
              <div key={stat.label} className="bg-blue-900 text-white rounded-xl p-6 text-center">
                <div className="text-3xl font-extrabold text-amber-400 mb-1">{stat.number}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Nuestros Valores</h2>
            <p className="text-gray-600">Lo que nos hace diferentes y por qué nuestros clientes nos regresan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet owner */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-blue-900 flex items-center justify-center text-4xl mx-auto mb-6">👩‍💼</div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Mayte F. Roses Soto</h2>
          <p className="text-amber-600 font-semibold text-sm mb-4">Propietaria y Fundadora</p>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
            Con más de dos décadas de experiencia en servicios financieros y administrativos, Mayte lidera cada caso con dedicación y cuidado. Su compromiso personal con cada cliente es lo que hace de esta oficina un lugar de confianza.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
