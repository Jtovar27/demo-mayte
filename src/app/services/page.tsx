import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";

export const metadata = {
  title: "Servicios | Taxes and Insurance Group LLC",
  description: "Impuestos, seguros de salud y vida, notario público, apostillas, traducciones y más en Kissimmee, Florida.",
};

const serviceCategories = [
  {
    category: "📊 Impuestos",
    services: [
      {
        icon: "🧾",
        title: "Impuestos Personales",
        description: "Preparamos tu declaración federal y estatal con precisión. Maximizamos tu reembolso y cumplimos todos los requisitos del IRS.",
      },
      {
        icon: "🏢",
        title: "Impuestos Empresariales",
        description: "Declaraciones para LLC, corporaciones, sole proprietors y más. Te ayudamos a cumplir con todas tus obligaciones fiscales como negocio.",
      },
    ],
  },
  {
    category: "🏥 Seguros",
    services: [
      {
        icon: "💊",
        title: "Seguros de Salud (Obamacare / ACA)",
        description: "Te ayudamos a seleccionar y enrolarte en el plan de salud que más te conviene a ti y a tu familia, incluyendo subsidios disponibles.",
      },
      {
        icon: "💼",
        title: "Seguros de Vida y Medicare",
        description: "Protege el futuro de tu familia con seguros de vida y asegura tu cobertura médica con Medicare. Te asesoramos sin presión.",
      },
    ],
  },
  {
    category: "📜 Notaría y Documentos",
    services: [
      {
        icon: "🖊️",
        title: "Notario Público",
        description: "Autenticación y certificación de documentos oficiales. Servicio rápido, legal y confiable.",
      },
      {
        icon: "🌍",
        title: "Apostillas",
        description: "Legalizamos documentos para uso internacional. Apostillamos ante las autoridades competentes del estado de Florida.",
      },
      {
        icon: "📄",
        title: "Poderes Notariales",
        description: "Preparamos y formalizamos poderes generales y específicos para representar a familiares u otorgar autoridad legal.",
      },
      {
        icon: "🧾",
        title: "Fe de Vida",
        description: "Documento oficial que certifica que una persona se encuentra viva. Requisito frecuente para trámites en el extranjero.",
      },
      {
        icon: "🗣️",
        title: "Traducciones Certificadas",
        description: "Traducción de documentos en más de 5 idiomas. Certificadas y aceptadas por instituciones oficiales.",
      },
    ],
  },
  {
    category: "🏦 Negocios y Crédito",
    services: [
      {
        icon: "📋",
        title: "Registro de Empresa / Perfil Empresarial",
        description: "Te ayudamos a registrar tu LLC, corporación o negocio en Florida. También armamos tu perfil empresarial para acceder a crédito.",
      },
      {
        icon: "📈",
        title: "Establecimiento de Crédito Empresarial",
        description: "Te guiamos paso a paso para construir un historial crediticio sólido para tu negocio y acceder a más oportunidades.",
      },
      {
        icon: "💵",
        title: "Préstamos de Corto y Largo Plazo",
        description: "Te conectamos con opciones de financiamiento para tu negocio o necesidades personales. Evaluamos tu caso sin compromiso.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">Servicios Profesionales</div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Todo en Un Solo Lugar</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-6">
            Impuestos, seguros, notaría, apostillas, traducciones y apoyo empresarial. Atención 100% en español.
          </p>
          <a
            href="tel:4072354065"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Consulta Gratuita
          </a>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {serviceCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold text-blue-900 mb-8 pb-3 border-b-2 border-amber-400 inline-block">
                {cat.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-amber-50 border-y border-amber-200 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-amber-800 text-sm italic">
            ⚠️ <strong>Aviso importante:</strong> No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
