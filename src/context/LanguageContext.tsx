"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // NAV
  "nav.home": { es: "Inicio", en: "Home" },
  "nav.about": { es: "Nosotros", en: "About" },
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.blog": { es: "Blog", en: "Blog" },
  "nav.faq": { es: "FAQ", en: "FAQ" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.cta": { es: "Consulta Gratis", en: "Free Consult" },

  // HEADER
  "header.tagline": { es: "Mayte F. Roses Soto · Kissimmee, Florida", en: "Mayte F. Roses Soto · Kissimmee, Florida" },

  // HERO
  "hero.badge": { es: "Consulta Gratis · Atención en Español", en: "Free Consult · English & Spanish" },
  "hero.h1.line1": { es: "Tu Aliado de Confianza en", en: "Your Trusted Partner in" },
  "hero.h1.line2": { es: "Impuestos, Seguros", en: "Taxes, Insurance" },
  "hero.h1.line3": { es: "y Servicios Notariales", en: "& Notary Services" },
  "hero.sub": { es: "Más de 20 años ayudando a familias y negocios en Kissimmee, Florida. Atención personalizada, precios justos y cero complicaciones.", en: "Over 20 years helping families and businesses in Kissimmee, Florida. Personalized service, fair prices, no hassle." },
  "hero.location": { es: "En persona o virtual · Kissimmee, FL · (407) 235-4065", en: "In-person or virtual · Kissimmee, FL · (407) 235-4065" },
  "hero.cta.call": { es: "Llámanos Ahora", en: "Call Us Now" },
  "hero.cta.services": { es: "Ver Servicios", en: "Our Services" },

  // TRUST BAR
  "trust.years": { es: "Años de Experiencia", en: "Years of Experience" },
  "trust.spanish": { es: "Atención en Español", en: "Bilingual Service" },
  "trust.free": { es: "Consulta Inicial", en: "Free Consultation" },

  // SERVICES SECTION
  "services.title": { es: "Nuestros Servicios", en: "Our Services" },
  "services.sub": { es: "Todo lo que necesitas en un solo lugar. Atención profesional, personalizada y en español.", en: "Everything you need in one place. Professional, personalized, bilingual service." },
  "services.cta": { es: "Ver Todos los Servicios", en: "View All Services" },

  // FEATURED SERVICES
  "svc.taxes.personal.title": { es: "Impuestos Personales", en: "Personal Taxes" },
  "svc.taxes.personal.desc": { es: "Declaración federal y estatal. Maximizamos tu reembolso con precisión y sin errores.", en: "Federal and state tax returns. We maximize your refund accurately and error-free." },
  "svc.taxes.business.title": { es: "Impuestos Empresariales", en: "Business Taxes" },
  "svc.taxes.business.desc": { es: "Preparamos los impuestos de tu negocio con experiencia y conocimiento local.", en: "We prepare your business taxes with expertise and local knowledge." },
  "svc.insurance.health.title": { es: "Seguros de Salud", en: "Health Insurance" },
  "svc.insurance.health.desc": { es: "Obamacare / ACA. Te ayudamos a encontrar el plan de salud que mejor se adapta a ti.", en: "Obamacare / ACA. We help you find the best health plan for you and your family." },
  "svc.insurance.life.title": { es: "Seguros de Vida y Medicare", en: "Life Insurance & Medicare" },
  "svc.insurance.life.desc": { es: "Protege a tu familia y asegura tu futuro con los planes correctos.", en: "Protect your family and secure your future with the right plans." },
  "svc.notary.title": { es: "Notario Público y Apostillas", en: "Notary Public & Apostilles" },
  "svc.notary.desc": { es: "Documentos legalizados, apostillados y traducciones certificadas en más de 5 idiomas.", en: "Notarized documents, apostilles, and certified translations in 5+ languages." },
  "svc.credit.title": { es: "Crédito y Préstamos", en: "Credit & Loans" },
  "svc.credit.desc": { es: "Establecimiento de crédito empresarial, préstamos de corto y largo plazo.", en: "Business credit establishment, short and long-term loans." },

  // ABOUT TEASER
  "about.label": { es: "Sobre Nosotros", en: "About Us" },
  "about.h2": { es: "Más de 20 años a tu servicio", en: "Over 20 years at your service" },
  "about.p1": { es: "Taxes and Insurance Group LLC es propiedad de Mayte F. Roses Soto. Llevamos más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.", en: "Taxes and Insurance Group LLC is owned by Mayte F. Roses Soto. For over 20 years we have been helping the Hispanic community in Kissimmee and Orlando with taxes, insurance, and notary services." },
  "about.p2": { es: "Nuestro compromiso es la atención personalizada, precios justos y cero complicaciones.", en: "Our commitment is personalized attention, fair prices, and zero complications." },
  "about.cta": { es: "Conoce Más", en: "Learn More" },
  "about.tile1": { es: "Servicio personalizado", en: "Personalized service" },
  "about.tile2": { es: "Atención en español", en: "Bilingual service" },
  "about.tile3": { es: "Precios justos", en: "Fair prices" },
  "about.tile4": { es: "Presencial o virtual", en: "In-person or virtual" },

  // BLOG
  "blog.title": { es: "Artículos y Recursos", en: "Articles & Resources" },
  "blog.sub": { es: "Información útil para tomar mejores decisiones financieras y de seguros.", en: "Useful information to help you make better financial and insurance decisions." },
  "blog.read": { es: "Leer más", en: "Read more" },

  // LOCATION BAR
  "location.visit": { es: "Visítanos en", en: "Visit us at" },
  "location.hours": { es: "Lunes a Viernes · 9am – 6pm · Sábados con cita", en: "Mon–Fri · 9am–6pm · Saturdays by appointment" },

  // CTA BANNER
  "cta.title": { es: "Listo para empezar?", en: "Ready to get started?" },
  "cta.sub": { es: "Consulta gratuita · Atención 100% en español · En persona o virtual", en: "Free consult · Bilingual service · In-person or virtual" },
  "cta.call": { es: "Llámanos Ahora", en: "Call Us Now" },
  "cta.whatsapp": { es: "WhatsApp", en: "WhatsApp" },

  // FOOTER
  "footer.tagline": { es: "Más de 20 años ayudando a la comunidad hispana de Kissimmee y Orlando con impuestos, seguros y servicios notariales.", en: "Over 20 years helping the Hispanic community in Kissimmee and Orlando with taxes, insurance, and notary services." },
  "footer.disclaimer": { es: "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.", en: "We are not attorneys. We only prepare documents and assist with administrative processes." },
  "footer.nav": { es: "Navegación", en: "Navigation" },
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.rights": { es: "© 2026 Taxes and Insurance Group LLC · Todos los derechos reservados", en: "© 2026 Taxes and Insurance Group LLC · All rights reserved" },
  "footer.bilingual": { es: "Kissimmee, Florida · Atención 100% en español", en: "Kissimmee, Florida · Bilingual service" },

  // ABOUT PAGE
  "about.page.hero.label": { es: "Sobre Nosotros", en: "About Us" },
  "about.page.hero.h1": { es: "Tu Oficina de Confianza en Kissimmee", en: "Your Trusted Office in Kissimmee" },
  "about.page.hero.sub": { es: "Más de 20 años ayudando a familias y negocios con impuestos, seguros y servicios notariales.", en: "Over 20 years helping families and businesses with taxes, insurance, and notary services." },
  "about.page.story.h2": { es: "Nuestra Historia", en: "Our Story" },
  "about.page.story.p1": { es: "Taxes and Insurance Group LLC es propiedad de Mayte F. Roses Soto, quien fundó este negocio con una misión clara: ser un aliado real para la comunidad hispana de Kissimmee y Orlando.", en: "Taxes and Insurance Group LLC is owned by Mayte F. Roses Soto, who founded this business with a clear mission: to be a real partner for the Hispanic community in Kissimmee and Orlando." },
  "about.page.story.p2": { es: "Llevamos más de 20 años brindando servicios profesionales de impuestos, seguros de salud y vida, servicios notariales y apoyo administrativo. Desde el inicio, nuestra filosofía ha sido simple: atención personalizada, precios justos y cero complicaciones.", en: "For over 20 years we have provided professional tax, health and life insurance, notary, and administrative support services. From the start, our philosophy has been simple: personalized service, fair prices, and zero complications." },
  "about.page.story.p3": { es: "Hemos tenido el privilegio de acompañar a cientos de familias y empresarios en momentos importantes: al declarar sus impuestos, al proteger su salud, al formalizar sus negocios, y al dar forma a sus documentos más importantes.", en: "We have had the privilege of accompanying hundreds of families and business owners in important moments: filing taxes, protecting their health, formalizing their businesses, and preparing their most important documents." },
  "about.page.disclaimer": { es: "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.", en: "We are not attorneys. We only prepare documents and assist with administrative processes." },
  "about.stat1": { es: "Años de experiencia", en: "Years of experience" },
  "about.stat2": { es: "Familias atendidas", en: "Families served" },
  "about.stat3": { es: "Idiomas de traducción", en: "Translation languages" },
  "about.stat4": { es: "Atención en español", en: "Bilingual service" },
  "about.values.title": { es: "Nuestros Valores", en: "Our Values" },
  "about.values.sub": { es: "Lo que nos hace diferentes y por qué nuestros clientes nos regresan.", en: "What makes us different and why our clients keep coming back." },
  "about.value1.title": { es: "Compromiso", en: "Commitment" },
  "about.value1.desc": { es: "Nos tomamos el tiempo necesario para entender tu situación y darte la mejor solución.", en: "We take the time to understand your situation and give you the best solution." },
  "about.value2.title": { es: "Confianza", en: "Trust" },
  "about.value2.desc": { es: "Tu información está segura con nosotros. Manejamos cada caso con total discreción.", en: "Your information is safe with us. We handle every case with full discretion." },
  "about.value3.title": { es: "Comunicación", en: "Communication" },
  "about.value3.desc": { es: "Explicamos todo en términos claros, sin jerga complicada ni sorpresas.", en: "We explain everything in clear terms, without complicated jargon or surprises." },
  "about.value4.title": { es: "Comunidad", en: "Community" },
  "about.value4.desc": { es: "Somos parte de la comunidad hispana de Kissimmee. Tu éxito es nuestro éxito.", en: "We are part of the Kissimmee community. Your success is our success." },
  "about.founder.role": { es: "Propietaria y Fundadora", en: "Owner & Founder" },
  "about.founder.bio": { es: "Con más de dos décadas de experiencia en servicios financieros y administrativos, Mayte lidera cada caso con dedicación y cuidado. Su compromiso personal con cada cliente es lo que hace de esta oficina un lugar de confianza.", en: "With over two decades of experience in financial and administrative services, Mayte leads every case with dedication and care. Her personal commitment to each client is what makes this office a place of trust." },

  // SERVICES PAGE
  "services.page.label": { es: "Servicios Profesionales", en: "Professional Services" },
  "services.page.h1": { es: "Todo en Un Solo Lugar", en: "Everything in One Place" },
  "services.page.sub": { es: "Impuestos, seguros, notaría, apostillas, traducciones y apoyo empresarial. Atención 100% en español.", en: "Taxes, insurance, notary, apostilles, translations, and business support. Bilingual service." },
  "services.page.cta": { es: "Consulta Gratuita", en: "Free Consultation" },
  "services.disclaimer": { es: "Aviso importante: No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.", en: "Important notice: We are not attorneys. We only prepare documents and assist with administrative processes." },

  // SERVICE CATEGORIES
  "cat.taxes": { es: "Impuestos", en: "Taxes" },
  "cat.insurance": { es: "Seguros", en: "Insurance" },
  "cat.notary": { es: "Notaría y Documentos", en: "Notary & Documents" },
  "cat.business": { es: "Negocios y Crédito", en: "Business & Credit" },
  "svc.taxes.personal.full.title": { es: "Impuestos Personales", en: "Personal Tax Returns" },
  "svc.taxes.personal.full.desc": { es: "Preparamos tu declaración federal y estatal con precisión. Maximizamos tu reembolso y cumplimos todos los requisitos del IRS.", en: "We prepare your federal and state tax returns with precision. We maximize your refund and meet all IRS requirements." },
  "svc.taxes.business.full.title": { es: "Impuestos Empresariales", en: "Business Tax Returns" },
  "svc.taxes.business.full.desc": { es: "Declaraciones para LLC, corporaciones, sole proprietors y más. Te ayudamos a cumplir con todas tus obligaciones fiscales como negocio.", en: "Returns for LLCs, corporations, sole proprietors, and more. We help you meet all your business tax obligations." },
  "svc.ins.health.title": { es: "Seguros de Salud (Obamacare / ACA)", en: "Health Insurance (Obamacare / ACA)" },
  "svc.ins.health.desc": { es: "Te ayudamos a seleccionar y enrolarte en el plan de salud que más te conviene a ti y a tu familia, incluyendo subsidios disponibles.", en: "We help you select and enroll in the best health plan for you and your family, including available subsidies." },
  "svc.ins.life.title": { es: "Seguros de Vida y Medicare", en: "Life Insurance & Medicare" },
  "svc.ins.life.desc": { es: "Protege el futuro de tu familia con seguros de vida y asegura tu cobertura médica con Medicare. Te asesoramos sin presión.", en: "Protect your family's future with life insurance and secure your medical coverage with Medicare. We advise without pressure." },
  "svc.notary.pub.title": { es: "Notario Público", en: "Notary Public" },
  "svc.notary.pub.desc": { es: "Autenticación y certificación de documentos oficiales. Servicio rápido, legal y confiable.", en: "Authentication and certification of official documents. Fast, legal, and reliable service." },
  "svc.apostille.title": { es: "Apostillas", en: "Apostilles" },
  "svc.apostille.desc": { es: "Legalizamos documentos para uso internacional. Apostillamos ante las autoridades competentes del estado de Florida.", en: "We legalize documents for international use. Apostilles processed through Florida state authorities." },
  "svc.power.title": { es: "Poderes Notariales", en: "Powers of Attorney" },
  "svc.power.desc": { es: "Preparamos y formalizamos poderes generales y específicos para representar a familiares u otorgar autoridad legal.", en: "We prepare and formalize general and specific powers of attorney to represent family members or grant legal authority." },
  "svc.fevida.title": { es: "Fe de Vida", en: "Certificate of Life" },
  "svc.fevida.desc": { es: "Documento oficial que certifica que una persona se encuentra viva. Requisito frecuente para trámites en el extranjero.", en: "Official document certifying that a person is alive. Often required for international procedures." },
  "svc.translation.title": { es: "Traducciones Certificadas", en: "Certified Translations" },
  "svc.translation.desc": { es: "Traducción de documentos en más de 5 idiomas. Certificadas y aceptadas por instituciones oficiales.", en: "Document translation in 5+ languages. Certified and accepted by official institutions." },
  "svc.biz.reg.title": { es: "Registro de Empresa / Perfil Empresarial", en: "Business Registration / Business Profile" },
  "svc.biz.reg.desc": { es: "Te ayudamos a registrar tu LLC, corporación o negocio en Florida. También armamos tu perfil empresarial para acceder a crédito.", en: "We help you register your LLC, corporation, or business in Florida. We also build your business profile to access credit." },
  "svc.biz.credit.title": { es: "Establecimiento de Crédito Empresarial", en: "Business Credit Establishment" },
  "svc.biz.credit.desc": { es: "Te guiamos paso a paso para construir un historial crediticio sólido para tu negocio y acceder a más oportunidades.", en: "We guide you step by step to build a solid credit history for your business and access more opportunities." },
  "svc.loans.title": { es: "Préstamos de Corto y Largo Plazo", en: "Short & Long-Term Loans" },
  "svc.loans.desc": { es: "Te conectamos con opciones de financiamiento para tu negocio o necesidades personales. Evaluamos tu caso sin compromiso.", en: "We connect you with financing options for your business or personal needs. We evaluate your case without obligation." },

  // BLOG PAGE
  "blog.page.label": { es: "Blog y Recursos", en: "Blog & Resources" },
  "blog.page.h1": { es: "Información que te Ayuda", en: "Information That Helps You" },
  "blog.page.sub": { es: "Artículos útiles sobre impuestos, seguros, negocios y servicios notariales escritos para la comunidad hispana.", en: "Useful articles about taxes, insurance, business, and notary services written for our community." },
  "blog.coming": { es: "Próximamente", en: "Coming Soon" },
  "blog.more.title": { es: "Más artículos próximamente", en: "More articles coming soon" },
  "blog.more.sub": { es: "Seguimos publicando contenido útil para ayudarte a tomar mejores decisiones sobre impuestos, seguros y tu negocio.", en: "We continue publishing useful content to help you make better decisions about taxes, insurance, and your business." },
  "blog.a1.title": { es: "Cómo preparar tus impuestos 2026 sin errores", en: "How to prepare your 2026 taxes without errors" },
  "blog.a1.excerpt": { es: "Conoce los documentos que necesitas, los créditos disponibles y los pasos clave para declarar correctamente este año fiscal.", en: "Learn the documents you need, available credits, and key steps to file correctly this tax year." },
  "blog.a2.title": { es: "Obamacare vs Medicare: cuál te conviene a ti", en: "Obamacare vs Medicare: which is right for you" },
  "blog.a2.excerpt": { es: "Comparamos los dos programas más importantes de salud en Estados Unidos para que puedas tomar la mejor decisión.", en: "We compare the two most important health programs in the US so you can make the best decision." },
  "blog.a3.title": { es: "Qué documentos llevar para declarar impuestos", en: "What documents to bring to file taxes" },
  "blog.a3.excerpt": { es: "Una lista completa y clara de los documentos que necesitas tener listos para tu cita de declaración de impuestos este año.", en: "A complete, clear list of the documents you need ready for your tax appointment this year." },
  "blog.a4.title": { es: "Errores comunes al registrar una empresa en Florida", en: "Common mistakes when registering a business in Florida" },
  "blog.a4.excerpt": { es: "Evita los errores más frecuentes que cometen los nuevos empresarios al iniciar su LLC o corporación en el estado de Florida.", en: "Avoid the most common mistakes new business owners make when starting their LLC or corporation in Florida." },
  "blog.cat.taxes": { es: "Impuestos", en: "Taxes" },
  "blog.cat.insurance": { es: "Seguros", en: "Insurance" },
  "blog.cat.business": { es: "Negocios", en: "Business" },
  "blog.readtime": { es: "lectura", en: "read" },

  // CONTACT PAGE
  "contact.label": { es: "Contacto", en: "Contact" },
  "contact.h1": { es: "Consulta Gratuita Ahora Mismo", en: "Free Consultation Right Now" },
  "contact.sub": { es: "Atención en persona o virtual. Sin compromiso. 100% en español.", en: "In-person or virtual. No commitment. Bilingual service." },
  "contact.how": { es: "Como prefieres contactarnos?", en: "How would you like to contact us?" },
  "contact.phone.title": { es: "Teléfono", en: "Phone" },
  "contact.phone.action": { es: "Llamar ahora", en: "Call now" },
  "contact.whatsapp.title": { es: "WhatsApp", en: "WhatsApp" },
  "contact.whatsapp.detail": { es: "Escríbenos directamente", en: "Write to us directly" },
  "contact.whatsapp.action": { es: "Abrir WhatsApp", en: "Open WhatsApp" },
  "contact.email.title": { es: "Correo Electrónico", en: "Email" },
  "contact.email.action": { es: "Enviar correo", en: "Send email" },
  "contact.address.title": { es: "Dirección", en: "Address" },
  "contact.address.action": { es: "Ver en mapa", en: "View on map" },
  "contact.form.title": { es: "Envíanos un Mensaje", en: "Send Us a Message" },
  "contact.form.sub": { es: "Te respondemos a la brevedad posible.", en: "We will reply as soon as possible." },
  "contact.form.name": { es: "Nombre *", en: "Name *" },
  "contact.form.name.ph": { es: "Tu nombre completo", en: "Your full name" },
  "contact.form.phone": { es: "Teléfono *", en: "Phone *" },
  "contact.form.email": { es: "Correo Electrónico", en: "Email" },
  "contact.form.service": { es: "Servicio de Interés *", en: "Service of Interest *" },
  "contact.form.service.ph": { es: "Selecciona un servicio", en: "Select a service" },
  "contact.form.message": { es: "Mensaje", en: "Message" },
  "contact.form.message.ph": { es: "Cuéntanos en qué podemos ayudarte...", en: "Tell us how we can help you..." },
  "contact.form.submit": { es: "Enviar Mensaje", en: "Send Message" },
  "contact.form.privacy": { es: "Tu información está segura. No compartimos tus datos con terceros.", en: "Your information is safe. We do not share your data with third parties." },
  "contact.hours.title": { es: "Horario de Atención", en: "Business Hours" },
  "contact.hours.mf": { es: "Lunes – Viernes", en: "Monday – Friday" },
  "contact.hours.sat": { es: "Sábado", en: "Saturday" },
  "contact.hours.sat.val": { es: "Con cita previa", en: "By appointment" },
  "contact.hours.sun": { es: "Domingo", en: "Sunday" },
  "contact.hours.sun.val": { es: "Cerrado", en: "Closed" },
  "contact.disclaimer": { es: "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.", en: "We are not attorneys. We only prepare documents and assist with administrative processes." },

  // FAQ PAGE
  "faq.label": { es: "Preguntas Frecuentes", en: "Frequently Asked Questions" },
  "faq.h1": { es: "Tienes Dudas?", en: "Have Questions?" },
  "faq.sub": { es: "Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, contáctanos directamente.", en: "Here we answer the most common questions. If you don't find what you're looking for, contact us directly." },
  "faq.notfound.title": { es: "No encontraste tu respuesta?", en: "Didn't find your answer?" },
  "faq.notfound.sub": { es: "Contáctanos directamente. Estamos aquí para ayudarte sin costo.", en: "Contact us directly. We are here to help you at no cost." },
  "faq.call": { es: "Llamar ahora", en: "Call now" },
  "faq.cat.taxes": { es: "Impuestos", en: "Taxes" },
  "faq.cat.insurance": { es: "Seguros", en: "Insurance" },
  "faq.cat.notary": { es: "Notaría y Documentos", en: "Notary & Documents" },
  "faq.cat.business": { es: "Negocios", en: "Business" },
  "faq.t.q1": { es: "Cuándo es la fecha límite para declarar mis impuestos?", en: "When is the deadline to file my taxes?" },
  "faq.t.a1": { es: "En general, el 15 de abril de cada año es la fecha límite federal. Si necesitas más tiempo, podemos solicitar una extensión de 6 meses. Sin embargo, si debes dinero, el pago sigue siendo exigible el 15 de abril.", en: "Generally, April 15th is the federal deadline. If you need more time, we can request a 6-month extension. However, if you owe money, payment is still due on April 15th." },
  "faq.t.q2": { es: "Qué documentos necesito para declarar mis impuestos?", en: "What documents do I need to file my taxes?" },
  "faq.t.a2": { es: "Generalmente necesitas: W-2 o 1099 de tu empleador, número de seguro social o ITIN, información de cuenta bancaria para depósito directo, recibos de gastos deducibles (si aplica), y la declaración del año anterior si es posible.", en: "Generally you need: W-2 or 1099 from your employer, social security number or ITIN, bank account information for direct deposit, receipts for deductible expenses (if applicable), and last year's return if possible." },
  "faq.t.q3": { es: "Puedo declarar aunque no tenga número de seguro social?", en: "Can I file even if I don't have a social security number?" },
  "faq.t.a3": { es: "Sí. Si tienes un ITIN (Individual Taxpayer Identification Number), puedes declarar tus impuestos. Si no tienes ITIN, te ayudamos a solicitarlo.", en: "Yes. If you have an ITIN (Individual Taxpayer Identification Number), you can file your taxes. If you don't have an ITIN, we help you apply for one." },
  "faq.i.q1": { es: "Qué es Obamacare y quién puede calificar?", en: "What is Obamacare and who can qualify?" },
  "faq.i.a1": { es: "Obamacare (ACA) es el programa de salud del gobierno federal. La mayoría de residentes en EE.UU. pueden calificar, incluyendo personas con bajos ingresos. Dependiendo de tus ingresos, puedes recibir subsidios que reducen el costo mensual.", en: "Obamacare (ACA) is the federal health program. Most US residents can qualify, including low-income individuals. Depending on your income, you may receive subsidies that reduce the monthly cost." },
  "faq.i.q2": { es: "Cuál es la diferencia entre Medicare y Medicaid?", en: "What is the difference between Medicare and Medicaid?" },
  "faq.i.a2": { es: "Medicare es para personas de 65 años o más (o con ciertas discapacidades). Medicaid es para personas con ingresos bajos, sin límite de edad. Podemos ayudarte a determinar cuál te corresponde según tu situación.", en: "Medicare is for people 65 or older (or with certain disabilities). Medicaid is for low-income individuals, with no age limit. We can help you determine which one applies to your situation." },
  "faq.n.q1": { es: "Qué es una apostilla y para qué se necesita?", en: "What is an apostille and when is it needed?" },
  "faq.n.a1": { es: "Una apostilla es un sello oficial que autentica documentos para que sean válidos en otros países. Se necesita cuando debes presentar documentos como actas de nacimiento, diplomas o poderes notariales fuera de EE.UU.", en: "An apostille is an official seal that authenticates documents for use in other countries. It is needed when presenting documents such as birth certificates, diplomas, or powers of attorney outside the US." },
  "faq.n.q2": { es: "En cuántos idiomas ofrecen traducciones certificadas?", en: "How many languages do you offer certified translations in?" },
  "faq.n.a2": { es: "Ofrecemos traducciones certificadas en más de 5 idiomas, incluyendo español, inglés, portugués, francés e italiano. Nuestras traducciones son aceptadas por instituciones oficiales, consulados y tribunales.", en: "We offer certified translations in 5+ languages, including Spanish, English, Portuguese, French, and Italian. Our translations are accepted by official institutions, consulates, and courts." },
  "faq.b.q1": { es: "Cuánto cuesta registrar una LLC en Florida?", en: "How much does it cost to register an LLC in Florida?" },
  "faq.b.a1": { es: "El costo oficial del estado de Florida es de $125 para registrar una LLC nueva. Nosotros te ayudamos con todo el proceso y la preparación de documentos. Contáctanos para conocer nuestras tarifas de servicio.", en: "The official Florida state cost is $125 to register a new LLC. We help you with the entire process and document preparation. Contact us to learn about our service fees." },
  "faq.b.q2": { es: "Necesito un número de EIN para mi negocio?", en: "Do I need an EIN number for my business?" },
  "faq.b.a2": { es: "Si tienes empleados, operas como LLC o corporación, o abres una cuenta bancaria de negocios, sí necesitas un EIN. Te ayudamos a solicitarlo ante el IRS de forma gratuita.", en: "If you have employees, operate as an LLC or corporation, or open a business bank account, you do need an EIN. We help you apply for it with the IRS for free." },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "es",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
