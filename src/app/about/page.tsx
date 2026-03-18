import Link from "next/link";
import CTABanner from "@/components/CTABanner";

export const metadata = {
  title: "Nosotros | Taxes and Insurance Group LLC",
  description: "Más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.",
};

const values = [
  { title: "Compromiso", description: "Nos tomamos el tiempo necesario para entender tu situación y darte la mejor solución." },
  { title: "Confianza", description: "Tu información está segura con nosotros. Manejamos cada caso con total discreción." },
  { title: "Comunicación", description: "Explicamos todo en términos claros, sin jerga complicada ni sorpresas." },
  { title: "Comunidad", description: "Somos parte de la comunidad hispana de Kissimmee. Tu éxito es nuestro éxito." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#B9954F" }}>
            Sobre Nosotros
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Tu Oficina de Confianza en Kissimmee
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C2C8CC" }}>
            Más de 20 años ayudando a familias y negocios con impuestos, seguros y servicios notariales.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 leading-tight" style={{ color: "#1C1C1C" }}>Nuestra Historia</h2>
            <p className="leading-relaxed mb-4" style={{ color: "#6E6E6E" }}>
              <strong style={{ color: "#1C1C1C" }}>Taxes and Insurance Group LLC</strong> es propiedad de{" "}
              <strong style={{ color: "#1C1C1C" }}>Mayte F. Roses Soto</strong>, quien fundó este negocio con una
              misión clara: ser un aliado real para la comunidad hispana de Kissimmee y Orlando.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: "#6E6E6E" }}>
              Llevamos más de 20 años brindando servicios profesionales de impuestos, seguros de salud y vida,
              servicios notariales y apoyo administrativo. Desde el inicio, nuestra filosofía ha sido simple:
              atención personalizada, precios justos y cero complicaciones.
            </p>
            <p className="leading-relaxed mb-6" style={{ color: "#6E6E6E" }}>
              Hemos tenido el privilegio de acompañar a cientos de familias y empresarios en momentos importantes:
              al declarar sus impuestos, al proteger su salud, al formalizar sus negocios, y al dar forma a sus
              documentos más importantes.
            </p>
            <div className="border-l-4 p-4 rounded-r-xl" style={{ backgroundColor: "#FAFAFA", borderColor: "#B9954F" }}>
              <p className="text-sm italic" style={{ color: "#6E6E6E" }}>
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
              <div
                key={stat.label}
                className="text-white rounded-xl p-6 text-center"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                <div className="text-3xl font-extrabold mb-1" style={{ color: "#B9954F" }}>{stat.number}</div>
                <div className="text-sm" style={{ color: "#AFAFAF" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#1C1C1C" }}>Nuestros Valores</h2>
            <p style={{ color: "#6E6E6E" }}>Lo que nos hace diferentes y por qué nuestros clientes nos regresan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl p-6 border text-center hover:shadow-md transition-shadow"
                style={{ borderColor: "#E4E4E4" }}
              >
                <div
                  className="w-10 h-1 rounded-full mx-auto mb-5"
                  style={{ backgroundColor: "#B9954F" }}
                />
                <h3 className="text-lg font-bold mb-2" style={{ color: "#1C1C1C" }}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6E6E6E" }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6"
            style={{ backgroundColor: "#B9954F" }}
          >
            MR
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1C1C1C" }}>Mayte F. Roses Soto</h2>
          <p className="font-semibold text-sm mb-4" style={{ color: "#B9954F" }}>Propietaria y Fundadora</p>
          <p className="leading-relaxed max-w-xl mx-auto" style={{ color: "#6E6E6E" }}>
            Con más de dos décadas de experiencia en servicios financieros y administrativos, Mayte lidera cada
            caso con dedicación y cuidado. Su compromiso personal con cada cliente es lo que hace de esta oficina
            un lugar de confianza.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
