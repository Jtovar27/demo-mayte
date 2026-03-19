import { NextRequest } from "next/server";

// Detect language from message (simple heuristic)
function isSpanish(text: string): boolean {
  const spanishWords = /\b(qué|que|cómo|como|cuándo|cuando|cuánto|cuanto|dónde|donde|quiero|necesito|tengo|puedo|tiene|hacer|ayuda|hola|gracias|impuesto|seguro|apostilla|tramite|trámite|empresa|negocio|notario|traducción|traduccion|declarar|itin|medicare|obamacare|préstamo|prestamo)\b/i;
  return spanishWords.test(text);
}

// Pick a mock response based on keywords
function getMockResponse(lastMessage: string, spanish: boolean): string {
  const msg = lastMessage.toLowerCase();

  // Taxes
  if (/tax|impuesto|declarar|w-2|w2|reembolso|refund|itin|irs/.test(msg)) {
    return spanish
      ? "¡Claro! Ofrecemos preparación de impuestos personales y empresariales. Para declarar necesitas:\n\n• W-2 o 1099 de tu empleador\n• Número de seguro social o ITIN\n• Cuenta bancaria para depósito directo\n• Recibos de gastos deducibles (si aplica)\n\nLa fecha límite federal es generalmente el **15 de abril**. Si no tienes número de seguro social, también podemos ayudarte a tramitar tu ITIN.\n\n¿Te gustaría agendar una consulta gratuita? Llámanos al **(407) 235-4065** o escríbenos por WhatsApp. 😊"
      : "Of course! We offer personal and business tax return preparation. To file you'll need:\n\n• W-2 or 1099 from your employer\n• Social Security Number or ITIN\n• Bank account for direct deposit\n• Deductible expense receipts (if applicable)\n\nThe federal deadline is generally **April 15th**. If you don't have a Social Security Number, we can also help you apply for an ITIN.\n\nWould you like to schedule a free consultation? Call us at **(407) 235-4065** or message us on WhatsApp. 😊";
  }

  // Insurance - health
  if (/obamacare|aca|salud|health|seguro de salud|health insurance|subsidio|subsidie/.test(msg)) {
    return spanish
      ? "¡Con gusto te ayudamos con el seguro de salud! El programa **Obamacare (ACA)** ofrece planes para la mayoría de residentes en EE.UU.\n\nDependiendo de tus ingresos, puedes calificar para **subsidios que reducen el costo mensual** significativamente.\n\nTe ayudamos a:\n• Comparar planes disponibles\n• Calcular tu subsidio\n• Enrolarte en el plan que más te conviene\n\nLlámanos al **(407) 235-4065** para una consulta sin costo. 💙"
      : "We'd love to help you with health insurance! The **Obamacare (ACA)** program offers plans for most US residents.\n\nDepending on your income, you may qualify for **subsidies that significantly reduce your monthly cost**.\n\nWe help you:\n• Compare available plans\n• Calculate your subsidy\n• Enroll in the plan that suits you best\n\nCall us at **(407) 235-4065** for a free consultation. 💙";
  }

  // Insurance - life / Medicare
  if (/vida|life insurance|medicare|medicaid|seguro de vida/.test(msg)) {
    return spanish
      ? "Ofrecemos seguros de vida y asesoría sobre **Medicare y Medicaid**.\n\n• **Medicare**: Para personas de 65 años o más, o con ciertas discapacidades.\n• **Medicaid**: Para personas con bajos ingresos, sin límite de edad.\n• **Seguro de vida**: Para proteger el futuro de tu familia.\n\nTe asesoramos sin presión y sin compromiso. Llámanos al **(407) 235-4065** o escríbenos por WhatsApp. 🌟"
      : "We offer life insurance and guidance on **Medicare and Medicaid**.\n\n• **Medicare**: For people 65+ or with certain disabilities.\n• **Medicaid**: For low-income individuals, no age limit.\n• **Life Insurance**: To protect your family's future.\n\nWe advise without pressure or obligation. Call us at **(407) 235-4065** or message us on WhatsApp. 🌟";
  }

  // Apostille
  if (/apostilla|apostille|legalizar|internacional|international/.test(msg)) {
    return spanish
      ? "¡Sí, ofrecemos servicio de **apostillas**! Una apostilla es un sello oficial que autentica documentos para uso en otros países.\n\nSe necesita para documentos como:\n• Actas de nacimiento\n• Diplomas y títulos académicos\n• Poderes notariales\n• Documentos legales en general\n\nProcesamos las apostillas ante las autoridades competentes del estado de **Florida**. Contáctanos al **(407) 235-4065** para saber el tiempo de proceso y costos. 📄"
      : "Yes, we offer **apostille** services! An apostille is an official seal that authenticates documents for use in other countries.\n\nNeeded for documents such as:\n• Birth certificates\n• Academic diplomas and degrees\n• Powers of attorney\n• Legal documents in general\n\nWe process apostilles through **Florida** state authorities. Contact us at **(407) 235-4065** for processing times and costs. 📄";
  }

  // Notary / translations
  if (/notario|notary|traducción|traduccion|translation|poder|power of attorney|fe de vida|certificate of life/.test(msg)) {
    return spanish
      ? "Ofrecemos una variedad de **servicios notariales y de documentos**:\n\n• **Notario Público**: Autenticación de documentos oficiales\n• **Apostillas**: Legalización para uso internacional\n• **Poderes Notariales**: Generales y específicos\n• **Fe de Vida**: Para trámites en el extranjero\n• **Traducciones Certificadas**: En más de 5 idiomas (español, inglés, portugués, francés, italiano)\n\nNuestras traducciones son aceptadas por consulados y tribunales. Escríbenos al **(407) 235-4065**. 📋"
      : "We offer a variety of **notary and document services**:\n\n• **Notary Public**: Authentication of official documents\n• **Apostilles**: Legalization for international use\n• **Powers of Attorney**: General and specific\n• **Certificate of Life**: For international procedures\n• **Certified Translations**: In 5+ languages (Spanish, English, Portuguese, French, Italian)\n\nOur translations are accepted by consulates and courts. Reach us at **(407) 235-4065**. 📋";
  }

  // Business / LLC / EIN / credit
  if (/llc|empresa|negocio|business|crédito|credito|credit|préstamo|prestamo|loan|ein|registrar|register/.test(msg)) {
    return spanish
      ? "¡Te ayudamos a hacer crecer tu negocio! Nuestros servicios empresariales incluyen:\n\n• **Registro de LLC o Corporación** en Florida (costo estatal: $125)\n• **Obtención de EIN** ante el IRS (gratis)\n• **Establecimiento de Crédito Empresarial**\n• **Perfil Empresarial** para acceder a financiamiento\n• **Préstamos** de corto y largo plazo\n\nTe guiamos paso a paso desde el principio. Llámanos al **(407) 235-4065** para tu consulta sin costo. 🚀"
      : "We're here to help your business grow! Our business services include:\n\n• **LLC or Corporation Registration** in Florida (state fee: $125)\n• **EIN Application** with the IRS (free)\n• **Business Credit Establishment**\n• **Business Profile** to access financing\n• **Short & Long-Term Loans**\n\nWe guide you step by step from the start. Call us at **(407) 235-4065** for a free consultation. 🚀";
  }

  // Hours / schedule / appointment
  if (/horario|hora|horas|hours|cita|appointment|cuando|cuándo|abierto|open|schedule/.test(msg)) {
    return spanish
      ? "Nuestro horario de atención es:\n\n🕘 **Lunes – Viernes**: 9:00am – 6:00pm\n📅 **Sábados**: Con cita previa\n🚫 **Domingos**: Cerrado\n\nTambién ofrecemos atención **virtual (por videoconferencia)** si no puedes venir en persona.\n\nPara agendar una cita llámanos al **(407) 235-4065** o escríbenos por **WhatsApp**. ¡Con gusto te atendemos!"
      : "Our business hours are:\n\n🕘 **Monday – Friday**: 9:00am – 6:00pm\n📅 **Saturdays**: By appointment\n🚫 **Sundays**: Closed\n\nWe also offer **virtual service (video call)** if you can't come in person.\n\nTo schedule an appointment, call us at **(407) 235-4065** or message us on **WhatsApp**. We'd love to help!";
  }

  // Location / address
  if (/dirección|direccion|address|dónde|donde|ubicación|ubicacion|location|kissimmee|florida/.test(msg)) {
    return spanish
      ? "Estamos ubicados en:\n\n📍 **1216 Dyer Blvd, Kissimmee, FL 34741**\n\nPuedes visitarnos en persona de **lunes a viernes de 9am a 6pm**, o los sábados con cita previa.\n\nTambién ofrecemos atención **virtual** si estás fuera del área. Llámanos al **(407) 235-4065** para más información. 🗺️"
      : "We're located at:\n\n📍 **1216 Dyer Blvd, Kissimmee, FL 34741**\n\nYou can visit us in person **Monday through Friday 9am–6pm**, or Saturdays by appointment.\n\nWe also offer **virtual service** if you're outside the area. Call us at **(407) 235-4065** for more information. 🗺️";
  }

  // Price / cost / cuánto cuesta
  if (/precio|costo|cuánto|cuanto|cuesta|cost|price|how much|fee/.test(msg)) {
    return spanish
      ? "¡Buena pregunta! Nuestros precios varían según el tipo de servicio y la complejidad de cada caso.\n\nLo mejor es que **la consulta inicial es completamente gratuita** 🎉\n\nDurante esa llamada evaluamos tu situación y te damos un precio claro y justo, sin sorpresas.\n\nLlámanos al **(407) 235-4065** o escríbenos por **WhatsApp** para tu consulta sin costo. ¡Te esperamos!"
      : "Great question! Our prices vary depending on the type of service and the complexity of each case.\n\nThe good news is that the **initial consultation is completely free** 🎉\n\nDuring that call we assess your situation and give you a clear, fair price with no surprises.\n\nCall us at **(407) 235-4065** or message us on **WhatsApp** for your free consultation. We look forward to hearing from you!";
  }

  // Greeting / hello
  if (/hola|buenos días|buenas tardes|buenas noches|hello|hi|hey|good morning|good afternoon/.test(msg)) {
    return spanish
      ? "¡Hola! 👋 Bienvenido/a a Taxes and Insurance Group LLC. Soy tu asistente virtual.\n\nPuedo ayudarte con información sobre nuestros servicios:\n\n• 🧾 **Impuestos** (personales y empresariales)\n• 🏥 **Seguros** (salud, vida, Medicare)\n• 📄 **Notaría** (apostillas, traducciones, poderes)\n• 🏢 **Negocios** (LLC, crédito, préstamos)\n\n¿En qué puedo ayudarte hoy?"
      : "Hello! 👋 Welcome to Taxes and Insurance Group LLC. I'm your virtual assistant.\n\nI can help you with information about our services:\n\n• 🧾 **Taxes** (personal and business)\n• 🏥 **Insurance** (health, life, Medicare)\n• 📄 **Notary** (apostilles, translations, powers of attorney)\n• 🏢 **Business** (LLC, credit, loans)\n\nHow can I help you today?";
  }

  // Thank you
  if (/gracias|thank you|thanks/.test(msg)) {
    return spanish
      ? "¡Con mucho gusto! 😊 Estamos aquí para ayudarte cuando lo necesites.\n\nRecuerda que puedes contactarnos en cualquier momento:\n📞 **(407) 235-4065**\n💬 **WhatsApp**: +1 (407) 235-4065\n📧 **inmigracion360@gmail.com**\n\n¡Que tengas un excelente día!"
      : "My pleasure! 😊 We're here to help whenever you need us.\n\nRemember you can reach us anytime:\n📞 **(407) 235-4065**\n💬 **WhatsApp**: +1 (407) 235-4065\n📧 **inmigracion360@gmail.com**\n\nHave a wonderful day!";
  }

  // Default fallback
  return spanish
    ? "¡Gracias por tu mensaje! En Taxes and Insurance Group LLC ofrecemos servicios de impuestos, seguros, notaría y apoyo empresarial.\n\nPara darte información más precisa sobre tu caso específico, te invito a contactarnos directamente:\n\n📞 **(407) 235-4065**\n💬 **WhatsApp**: +1 (407) 235-4065\n📧 **inmigracion360@gmail.com**\n\nLa consulta inicial es **completamente gratuita** y sin compromiso. ¡Con gusto te atendemos!"
    : "Thank you for your message! At Taxes and Insurance Group LLC we offer tax, insurance, notary, and business support services.\n\nTo give you more precise information about your specific case, I invite you to contact us directly:\n\n📞 **(407) 235-4065**\n💬 **WhatsApp**: +1 (407) 235-4065\n📧 **inmigracion360@gmail.com**\n\nThe initial consultation is **completely free** and no-obligation. We look forward to helping you!";
}

// Simulate streaming by sending the response word by word
async function* streamWords(text: string) {
  const words = text.split(" ");
  for (let i = 0; i < words.length; i++) {
    yield i === 0 ? words[i] : " " + words[i];
    // Random delay between 20-60ms to simulate natural typing
    await new Promise((r) => setTimeout(r, 20 + Math.random() * 40));
  }
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content ?? "";
  const spanish = isSpanish(lastMessage) || messages.length <= 1;
  const response = getMockResponse(lastMessage, spanish);

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of streamWords(response)) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
