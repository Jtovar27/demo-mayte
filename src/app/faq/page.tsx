import CTABanner from "@/components/CTABanner";

export const metadata = {
  title: "Preguntas Frecuentes | Taxes and Insurance Group LLC",
  description: "Respuestas a las preguntas más comunes sobre impuestos, seguros, notaría y servicios administrativos.",
};

const faqs = [
  {
    category: "Impuestos",
    questions: [
      {
        q: "Cuándo es la fecha límite para declarar mis impuestos?",
        a: "En general, el 15 de abril de cada año es la fecha límite federal. Si necesitas más tiempo, podemos solicitar una extensión de 6 meses. Sin embargo, si debes dinero, el pago sigue siendo exigible el 15 de abril.",
      },
      {
        q: "Qué documentos necesito para declarar mis impuestos?",
        a: "Generalmente necesitas: W-2 o 1099 de tu empleador, número de seguro social o ITIN, información de cuenta bancaria para depósito directo, recibos de gastos deducibles (si aplica), y la declaración del año anterior si es posible.",
      },
      {
        q: "Puedo declarar aunque no tenga número de seguro social?",
        a: "Sí. Si tienes un ITIN (Individual Taxpayer Identification Number), puedes declarar tus impuestos. Si no tienes ITIN, te ayudamos a solicitarlo.",
      },
    ],
  },
  {
    category: "Seguros",
    questions: [
      {
        q: "Qué es Obamacare y quién puede calificar?",
        a: "Obamacare (ACA) es el programa de salud del gobierno federal. La mayoría de residentes en EE.UU. pueden calificar, incluyendo personas con bajos ingresos. Dependiendo de tus ingresos, puedes recibir subsidios que reducen el costo mensual.",
      },
      {
        q: "Cuál es la diferencia entre Medicare y Medicaid?",
        a: "Medicare es para personas de 65 años o más (o con ciertas discapacidades). Medicaid es para personas con ingresos bajos, sin límite de edad. Podemos ayudarte a determinar cuál te corresponde según tu situación.",
      },
    ],
  },
  {
    category: "Notaría y Documentos",
    questions: [
      {
        q: "Qué es una apostilla y para qué se necesita?",
        a: "Una apostilla es un sello oficial que autentica documentos para que sean válidos en otros países. Se necesita cuando debes presentar documentos como actas de nacimiento, diplomas o poderes notariales fuera de EE.UU.",
      },
      {
        q: "En cuántos idiomas ofrecen traducciones certificadas?",
        a: "Ofrecemos traducciones certificadas en más de 5 idiomas, incluyendo español, inglés, portugués, francés e italiano. Nuestras traducciones son aceptadas por instituciones oficiales, consulados y tribunales.",
      },
    ],
  },
  {
    category: "Negocios",
    questions: [
      {
        q: "Cuánto cuesta registrar una LLC en Florida?",
        a: "El costo oficial del estado de Florida es de $125 para registrar una LLC nueva. Nosotros te ayudamos con todo el proceso y la preparación de documentos. Contáctanos para conocer nuestras tarifas de servicio.",
      },
      {
        q: "Necesito un número de EIN para mi negocio?",
        a: "Si tienes empleados, operas como LLC o corporación, o abres una cuenta bancaria de negocios, sí necesitas un EIN. Te ayudamos a solicitarlo ante el IRS de forma gratuita.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="text-white py-20"
        style={{ background: "linear-gradient(135deg, #0E0E0E 0%, #1C1C1C 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="font-semibold text-sm uppercase tracking-wider mb-3" style={{ color: "#B9954F" }}>
            Preguntas Frecuentes
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Tienes Dudas?</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#C2C8CC" }}>
            Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, contáctanos directamente.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2
                className="text-xl font-bold mb-6 pb-2 border-b-2 inline-block"
                style={{ color: "#1C1C1C", borderColor: "#B9954F" }}
              >
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq) => (
                  <div
                    key={faq.q}
                    className="bg-white rounded-xl border p-6 hover:shadow-sm transition-shadow"
                    style={{ borderColor: "#E4E4E4" }}
                  >
                    <h3 className="text-base font-bold mb-3" style={{ color: "#1C1C1C" }}>
                      {faq.q}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6E6E6E" }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="max-w-4xl mx-auto px-4 mt-12">
          <div className="text-white rounded-2xl p-8 text-center" style={{ backgroundColor: "#1C1C1C" }}>
            <h3 className="text-xl font-bold mb-2 text-white">No encontraste tu respuesta?</h3>
            <p className="mb-6 text-sm" style={{ color: "#AFAFAF" }}>
              Contáctanos directamente. Estamos aquí para ayudarte sin costo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:4072354065"
                className="text-white font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#B9954F" }}
              >
                Llamar ahora
              </a>
              <a
                href="https://wa.me/14072354065"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold px-6 py-3 rounded-xl transition-opacity hover:opacity-90 border-2 border-white text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
