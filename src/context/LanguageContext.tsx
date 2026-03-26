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
  "nav.taxestogo": { es: "Taxes To Go", en: "Taxes To Go" },

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

  // GOOGLE REVIEWS SECTION
  "reviews.label": { es: "Reseñas de Clientes", en: "Client Reviews" },
  "reviews.h2": { es: "Lo Que Dicen Nuestros Clientes", en: "What Our Clients Say" },
  "reviews.sub": { es: "Más de 20 años construyendo confianza en Kissimmee. Esto es lo que dicen quienes nos visitan.", en: "Over 20 years building trust in Kissimmee. Here's what our clients say." },
  "reviews.aggregate": { es: "Calificación en Google", en: "Rating on Google" },
  "reviews.verified": { es: "Reseña verificada de Google", en: "Verified Google review" },
  "reviews.cta": { es: "Déjanos una Reseña en Google", en: "Leave Us a Google Review" },
  "reviews.cta.sub": { es: "Tu opinión nos ayuda a seguir creciendo y a servir mejor a nuestra comunidad.", en: "Your review helps us keep growing and serve our community better." },
  "reviews.r1.text": { es: "Llevo 5 años con Mayte y no cambiaría nada. Siempre me explica todo con calma y sin letra pequeña. Este año recibí el mejor reembolso de impuestos de mi vida.", en: "I've been with Mayte for 5 years and wouldn't change a thing. She always explains everything calmly and clearly. This year I got the best tax refund of my life." },
  "reviews.r1.name": { es: "María G.", en: "María G." },
  "reviews.r1.service": { es: "Impuestos Personales", en: "Personal Taxes" },
  "reviews.r2.text": { es: "Me ayudaron a registrar mi empresa en tiempo récord. Muy profesionales, me explicaron cada paso y ahora tenemos todo en orden. Totalmente recomendados.", en: "They helped me register my business in record time. Very professional, explained every step, and now everything is in order. Highly recommended." },
  "reviews.r2.name": { es: "Carlos R.", en: "Carlos R." },
  "reviews.r2.service": { es: "Constitución de Empresa", en: "Business Formation" },
  "reviews.r3.text": { es: "Hicimos el seguro de salud aquí y fue facilísimo. Nos consiguieron el mejor plan dentro de nuestro presupuesto. 100% profesionales, muy amables y hablan español perfectamente.", en: "We got health insurance here and it was so easy. They found the best plan within our budget. 100% professional, very friendly, and speak perfect Spanish." },
  "reviews.r3.name": { es: "Ana L.", en: "Ana L." },
  "reviews.r3.service": { es: "Seguros de Salud", en: "Health Insurance" },
  "footer.review.cta": { es: "Reséñanos en Google", en: "Review us on Google" },

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
  "services.page.sub": { es: "Impuestos, seguros, notaría, documentos migratorios, reparación de crédito y apoyo empresarial. Atención 100% en español.", en: "Taxes, insurance, notary, immigration documents, credit repair, and business support. Bilingual service." },
  "services.page.cta": { es: "Consulta Gratuita", en: "Free Consultation" },
  "services.disclaimer": { es: "Aviso importante: No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.", en: "Important notice: We are not attorneys. We only prepare documents and assist with administrative processes." },

  // SERVICE CATEGORIES
  "cat.taxes": { es: "Impuestos", en: "Taxes" },
  "cat.insurance": { es: "Seguros", en: "Insurance" },
  "cat.notary": { es: "Notaría y Documentos", en: "Notary & Documents" },
  "cat.business": { es: "Negocios y Crédito", en: "Business & Credit" },

  // Notary category compliance notice (shown below the full category grid)
  "cat.notary.immigration.disclaimer": {
    es: "Aviso de cumplimiento: Los servicios de documentación migratoria que ofrecemos son de preparación y organización de documentos administrativos únicamente. No somos abogados de inmigración ni consultores acreditados. No ofrecemos asesoría legal migratoria. Para orientación legal sobre su caso migratorio, consulte a un abogado de inmigración certificado.",
    en: "Compliance notice: The immigration documentation services we offer consist of document preparation and administrative organization only. We are not immigration attorneys or accredited consultants. We do not provide legal immigration advice. For legal guidance on your immigration case, please consult a licensed immigration attorney.",
  },

  // Taxes
  "svc.taxes.personal.full.title": { es: "Impuestos Personales", en: "Personal Tax Returns" },
  "svc.taxes.personal.full.desc": { es: "Preparamos tu declaración federal y estatal con precisión. Maximizamos tu reembolso y cumplimos todos los requisitos del IRS.", en: "We prepare your federal and state tax returns with precision. We maximize your refund and meet all IRS requirements." },
  "svc.taxes.business.full.title": { es: "Impuestos Empresariales", en: "Business Tax Returns" },
  "svc.taxes.business.full.desc": { es: "Declaraciones para LLC, corporaciones, sole proprietors y más. Te ayudamos a cumplir con todas tus obligaciones fiscales como negocio.", en: "Returns for LLCs, corporations, sole proprietors, and more. We help you meet all your business tax obligations." },

  // Insurance
  "svc.ins.health.title": { es: "Seguros de Salud (Obamacare / ACA)", en: "Health Insurance (Obamacare / ACA)" },
  "svc.ins.health.desc": { es: "Te ayudamos a seleccionar y enrolarte en el plan de salud que más te conviene a ti y a tu familia, incluyendo subsidios disponibles.", en: "We help you select and enroll in the best health plan for you and your family, including available subsidies." },
  "svc.ins.life.title": { es: "Seguros de Vida y Medicare", en: "Life Insurance & Medicare" },
  "svc.ins.life.desc": { es: "Protege el futuro de tu familia con seguros de vida y asegura tu cobertura médica con Medicare. Te asesoramos sin presión.", en: "Protect your family's future with life insurance and secure your medical coverage with Medicare. We advise without pressure." },

  // Notary & Documents
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
  "svc.immigration.title": { es: "Documentos para Trámites Migratorios", en: "Immigration Document Assistance" },
  "svc.immigration.desc": { es: "Preparamos y organizamos documentos de apoyo para trámites migratorios: cartas de presentación, declaraciones escritas y paquetes de evidencia. Somos preparadores de documentos, no abogados de inmigración.", en: "We prepare and organize supporting documents for immigration processes: cover letters, written declarations, and evidence packages. We are document preparers, not immigration attorneys." },

  // Business & Credit
  "svc.biz.reg.title": { es: "Constitución de Empresa", en: "Business Formation" },
  "svc.biz.reg.desc": { es: "Gestionamos el registro administrativo de tu LLC, corporación o negocio en Florida. Te acompañamos en cada paso del proceso: desde el nombre hasta el EIN, incluyendo tu perfil empresarial para acceder a financiamiento.", en: "We handle the administrative registration of your LLC, corporation, or business in Florida. We guide you through every step: from naming to EIN, including your business profile to access financing." },
  "svc.biz.credit.title": { es: "Establecimiento de Crédito Empresarial", en: "Business Credit Establishment" },
  "svc.biz.credit.desc": { es: "Te acompañamos paso a paso para construir un historial crediticio sólido para tu negocio: apertura de cuentas, líneas de crédito y estrategia para calificar a mejores tasas y financiamiento.", en: "We walk you through building a solid credit history for your business: account setup, credit lines, and a strategy to qualify for better rates and financing." },
  "svc.loans.title": { es: "Préstamos de Corto y Largo Plazo", en: "Short & Long-Term Loans" },
  "svc.loans.desc": { es: "Te conectamos con opciones de financiamiento para tu negocio o necesidades personales. Evaluamos tu caso sin compromiso.", en: "We connect you with financing options for your business or personal needs. We evaluate your case without obligation." },
  "svc.credit.repair.title": { es: "Reparación de Crédito", en: "Credit Repair" },
  "svc.credit.repair.desc": { es: "Te ayudamos a revisar tu reporte de crédito, identificar errores y gestionar cartas de disputa ante las agencias crediticias. Un proceso claro y paso a paso para mejorar tu historial financiero.", en: "We help you review your credit report, identify errors, and manage dispute letters with the credit bureaus. A clear, step-by-step process to improve your financial history." },

  // TAXES TO GO PAGE
  "ttg.page.label": { es: "Servicio Especial", en: "Special Service" },
  "ttg.page.h1": { es: "Taxes To Go", en: "Taxes To Go" },
  "ttg.page.sub": { es: "Declara tus impuestos de forma rápida y conveniente. Sin citas largas ni trámites complicados — nosotros nos encargamos de todo.", en: "File your taxes quickly and conveniently. No long appointments or complicated steps — we handle everything." },
  "ttg.page.cta": { es: "Comenzar Ahora", en: "Get Started Now" },
  "ttg.what.label": { es: "Qué es Taxes To Go?", en: "What is Taxes To Go?" },
  "ttg.what.h2": { es: "Tu Declaración, Rápida y Sin Complicaciones", en: "Your Tax Return, Fast and Hassle-Free" },
  "ttg.what.p1": { es: "Taxes To Go es nuestra solución ágil para clientes que necesitan declarar sus impuestos de forma práctica. Te atendemos de manera eficiente, con el mismo nivel de precisión y cuidado que caracteriza a nuestra oficina.", en: "Taxes To Go is our efficient solution for clients who need to file their taxes conveniently. We serve you quickly, with the same level of precision and care our office is known for." },
  "ttg.what.p2": { es: "Ideal para personas que trabajan con W-2, son independientes (1099), o necesitan declarar en temporada alta sin perder tiempo.", en: "Ideal for individuals with W-2s, self-employed workers (1099), or anyone who needs to file during tax season without losing time." },
  "ttg.steps.label": { es: "Cómo Funciona", en: "How It Works" },
  "ttg.steps.h2": { es: "4 Pasos Simples", en: "4 Simple Steps" },
  "ttg.steps.sub": { es: "Desde agendar hasta recibir tu reembolso, lo hacemos simple.", en: "From booking to receiving your refund, we keep it simple." },
  "ttg.step1.title": { es: "Agenda tu Espacio", en: "Book Your Spot" },
  "ttg.step1.desc": { es: "Llámanos o escríbenos por WhatsApp para reservar. Te confirmamos disponibilidad al instante.", en: "Call us or message us on WhatsApp to reserve. We confirm availability instantly." },
  "ttg.step2.title": { es: "Reúne tus Documentos", en: "Gather Your Documents" },
  "ttg.step2.desc": { es: "Te enviamos la lista exacta de lo que necesitas. Sin sorpresas ni viajes innecesarios.", en: "We send you the exact checklist of what you need. No surprises or unnecessary trips." },
  "ttg.step3.title": { es: "Nosotros Preparamos Todo", en: "We Prepare Everything" },
  "ttg.step3.desc": { es: "Un profesional revisa y prepara tu declaración con precisión. Te explicamos cada detalle en español.", en: "A professional reviews and prepares your return accurately. We explain every detail in Spanish." },
  "ttg.step4.title": { es: "Recibe tu Reembolso", en: "Receive Your Refund" },
  "ttg.step4.desc": { es: "Te ayudamos a elegir la forma más rápida de recibir tu reembolso. Depósito directo disponible.", en: "We help you choose the fastest way to receive your refund. Direct deposit available." },
  "ttg.bring.label": { es: "Qué Traer", en: "What to Bring" },
  "ttg.bring.h2": { es: "Documentos que Necesitas", en: "Documents You Need" },
  "ttg.bring.sub": { es: "Trae estos documentos y nosotros hacemos el resto.", en: "Bring these documents and we'll do the rest." },
  "ttg.bring.item1": { es: "W-2, 1099 u otros documentos de ingresos", en: "W-2, 1099 or other income documents" },
  "ttg.bring.item2": { es: "Número de Seguro Social o ITIN", en: "Social Security Number or ITIN" },
  "ttg.bring.item3": { es: "Identificación vigente (pasaporte, DL, matrícula consular)", en: "Valid ID (passport, driver's license, or consular card)" },
  "ttg.bring.item4": { es: "Información de cuenta bancaria para depósito directo", en: "Bank account information for direct deposit" },
  "ttg.bring.item5": { es: "Declaración del año anterior (si la tienes)", en: "Last year's tax return (if available)" },
  "ttg.bring.item6": { es: "Gastos deducibles: médicos, educativos, donaciones (si aplica)", en: "Deductible expenses: medical, education, donations (if applicable)" },
  "ttg.cta.h2": { es: "Listo para Declarar con Taxes To Go?", en: "Ready to File with Taxes To Go?" },
  "ttg.cta.sub": { es: "Accede al servicio ahora o contáctanos para más información. Atención 100% en español.", en: "Access the service now or contact us for more information. Bilingual service available." },
  "ttg.cta.primary": { es: "Acceder a Taxes To Go", en: "Access Taxes To Go" },
  "ttg.cta.secondary": { es: "Contáctanos Primero", en: "Contact Us First" },
  "ttg.cta.note": { es: "¿Preguntas antes de empezar? Llámanos al", en: "Questions before starting? Call us at" },

  // TAXES TO GO — Step-by-step guide
  "ttg.guide.label": { es: "Guía Completa", en: "Complete Guide" },
  "ttg.guide.h2": { es: "Guía Paso a Paso para Usar TaxesToGo", en: "Step-by-Step Guide to Using TaxesToGo" },
  "ttg.guide.sub": { es: "Sigue estos 13 pasos para completar tu declaración de impuestos desde tu teléfono de forma correcta.", en: "Follow these 13 steps to correctly complete your tax return from your phone." },
  // Step 1
  "ttg.guide.s1.title": { es: "Descarga la aplicación", en: "Download the app" },
  "ttg.guide.s1.desc": { es: "Descarga la app TaxesToGo en tu teléfono desde App Store (iPhone) o Google Play (Android). Todo el proceso está diseñado para completarse desde el móvil.", en: "Download the TaxesToGo app on your phone from the App Store (iPhone) or Google Play (Android). The entire process is designed to be completed from your mobile device." },
  // Step 2
  "ttg.guide.s2.title": { es: "Abre la app y crea tu cuenta", en: "Open the app and create your account" },
  "ttg.guide.s2.desc": { es: "Al abrir la app por primera vez, crea una cuenta con tu nombre, correo electrónico, número de teléfono y contraseña. Mantén tu información siempre actualizada.", en: "When you open the app for the first time, create an account with your name, email address, phone number, and password. Always keep your information up to date." },
  // Step 3
  "ttg.guide.s3.title": { es: "Inicia sesión", en: "Log in" },
  "ttg.guide.s3.desc": { es: "Entra con tu correo y contraseña. Guarda bien esos datos — cada usuario es responsable de proteger sus credenciales de acceso.", en: "Log in with your email and password. Keep those credentials safe — each user is responsible for protecting their access information." },
  // Step 4
  "ttg.guide.s4.title": { es: "Vincula tu información con tu preparador", en: "Link your information with your preparer" },
  "ttg.guide.s4.desc": { es: "La plataforma usa un Tax ID / Tax Number único para conectar tus documentos con tu preparador de impuestos. En algunos casos, el preparador te enviará instrucciones previas o un enlace directo para comenzar.", en: "The platform uses a unique Tax ID / Tax Number to connect your documents with your tax preparer. In some cases, your preparer will send you prior instructions or a direct link to get started." },
  // Step 5
  "ttg.guide.s5.title": { es: "Reúne todos tus documentos antes de subirlos", en: "Gather all your documents before uploading" },
  "ttg.guide.s5.desc": { es: "Ten todo listo y ordenado antes de empezar a tomar fotos. Esto evita errores y asegura un proceso fluido. Por ejemplo:", en: "Have everything ready and organized before you start taking photos. This prevents errors and ensures a smooth process. For example:" },
  "ttg.guide.s5.i1": { es: "ID o licencia de conducir", en: "ID or driver's license" },
  "ttg.guide.s5.i2": { es: "Tarjetas de Seguro Social o cartas de ITIN (si aplica)", en: "Social Security cards or ITIN letters (if applicable)" },
  "ttg.guide.s5.i3": { es: "W-2", en: "W-2" },
  "ttg.guide.s5.i4": { es: "1099", en: "1099" },
  "ttg.guide.s5.i5": { es: "Formas de seguro médico (si aplica)", en: "Health insurance forms (if applicable)" },
  "ttg.guide.s5.i6": { es: "Información bancaria para depósito directo", en: "Bank account information for direct deposit" },
  "ttg.guide.s5.i7": { es: "Declaración del año pasado (si tu preparador la solicita)", en: "Last year's tax return (if your preparer requests it)" },
  "ttg.guide.s5.i8": { es: "Documentos de dependientes", en: "Dependent documents" },
  "ttg.guide.s5.i9": { es: "Cartas del IRS o documentos especiales", en: "IRS letters or special documents" },
  // Step 6
  "ttg.guide.s6.title": { es: "Toma fotos claras de cada documento", en: "Take clear photos of each document" },
  "ttg.guide.s6.desc": { es: "La función principal de TaxesToGo es cargar fotos de tus documentos desde el móvil. Hazlo así:", en: "The main function of TaxesToGo is to upload photos of your documents from your phone. Follow these tips:" },
  "ttg.guide.s6.i1": { es: "Coloca el documento sobre una superficie plana", en: "Place the document on a flat surface" },
  "ttg.guide.s6.i2": { es: "Usa buena iluminación, natural o artificial", en: "Use good lighting, natural or artificial" },
  "ttg.guide.s6.i3": { es: "Evita sombras sobre el documento", en: "Avoid shadows on the document" },
  "ttg.guide.s6.i4": { es: "Toma la foto completa sin cortar las esquinas", en: "Take the full photo without cutting the corners" },
  "ttg.guide.s6.i5": { es: "Asegúrate de que todo el texto se lea claramente", en: "Make sure all text is clearly readable" },
  "ttg.guide.s6.i6": { es: "Si salió borrosa, repite la foto", en: "If it came out blurry, retake the photo" },
  // Step 7
  "ttg.guide.s7.title": { es: "Sube cada documento correctamente", en: "Upload each document correctly" },
  "ttg.guide.s7.desc": { es: "Carga los documentos en orden y revisa antes de enviar que la imagen correcta quedó adjunta, que no hay duplicados y que no falta ninguna página:", en: "Upload documents in order and verify before sending that the correct image is attached, there are no duplicates, and no pages are missing:" },
  "ttg.guide.s7.i1": { es: "Primero: identificación", en: "First: identification" },
  "ttg.guide.s7.i2": { es: "Luego: ingresos (W-2, 1099, etc.)", en: "Then: income documents (W-2, 1099, etc.)" },
  "ttg.guide.s7.i3": { es: "Después: documentos de dependientes", en: "Next: dependent documents" },
  "ttg.guide.s7.i4": { es: "Finalmente: documentos adicionales solicitados", en: "Finally: any additional requested documents" },
  "ttg.guide.s7.i5": { es: "Verifica que ningún documento esté duplicado o incompleto", en: "Verify that no document is duplicated or incomplete" },
  // Step 8
  "ttg.guide.s8.title": { es: "Completa la información solicitada en la app", en: "Complete the information requested in the app" },
  "ttg.guide.s8.desc": { es: "Además de fotos, puede que tengas que escribir información adicional directamente en la app:", en: "In addition to photos, you may need to enter additional information directly in the app:" },
  "ttg.guide.s8.i1": { es: "Dirección actual", en: "Current address" },
  "ttg.guide.s8.i2": { es: "Estado civil", en: "Marital status" },
  "ttg.guide.s8.i3": { es: "Ocupación", en: "Occupation" },
  "ttg.guide.s8.i4": { es: "Datos de dependientes", en: "Dependent information" },
  "ttg.guide.s8.i5": { es: "Información de cuenta bancaria", en: "Bank account information" },
  "ttg.guide.s8.i6": { es: "Preguntas básicas relacionadas con tus impuestos", en: "Basic questions related to your taxes" },
  // Step 9
  "ttg.guide.s9.title": { es: "Revisa todo antes de enviar", en: "Review everything before sending" },
  "ttg.guide.s9.desc": { es: "Antes de tocar 'enviar', verifica cuidadosamente los datos principales. La plataforma indica que la información debe revisarse antes de enviar:", en: "Before tapping 'send', carefully verify the main information. The platform states that all information should be reviewed before submitting:" },
  "ttg.guide.s9.i1": { es: "Que tu nombre esté correcto", en: "Your name is correct" },
  "ttg.guide.s9.i2": { es: "Que no falte ningún documento", en: "No document is missing" },
  "ttg.guide.s9.i3": { es: "Que los números (ingresos, cuenta bancaria) se lean bien", en: "Numbers (income, bank account) are clearly readable" },
  "ttg.guide.s9.i4": { es: "Que la cuenta bancaria para depósito directo sea correcta", en: "Bank account for direct deposit is correct" },
  "ttg.guide.s9.i5": { es: "Que los dependientes estén correctamente identificados", en: "Dependents are properly identified" },
  // Step 10
  "ttg.guide.s10.title": { es: "Envía la información a tu preparador", en: "Send your information to your preparer" },
  "ttg.guide.s10.desc": { es: "Cuando todo esté listo, envía los documentos y datos a tu preparador desde la app. TaxesToGo es una forma rápida, conveniente y segura de transmitir información sin ir físicamente a la oficina.", en: "When everything is ready, send your documents and data to your preparer through the app. TaxesToGo is a fast, convenient, and secure way to transmit information without visiting the office in person." },
  // Step 11
  "ttg.guide.s11.title": { es: "Espera la revisión y responde si te piden más documentos", en: "Wait for the review and respond if more documents are needed" },
  "ttg.guide.s11.desc": { es: "El preparador revisará la información enviada. Si falta algo, normalmente te pedirá una foto más clara, documentos adicionales o confirmación de algún dato. Esto es normal — muchas veces el primer envío genera preguntas de seguimiento.", en: "Your preparer will review the submitted information. If something is missing, they will typically ask for a clearer photo, additional documents, or confirmation of a detail. This is normal — the first submission often generates follow-up questions." },
  // Step 12
  "ttg.guide.s12.title": { es: "Firma la declaración cuando te la envíen", en: "Sign your return when it is sent to you" },
  "ttg.guide.s12.desc": { es: "TaxesToGo permite firmar tu declaración de impuestos directamente desde el móvil. Antes de firmar, verifica: tu nombre, dirección, dependientes, cuenta bancaria y el monto de reembolso o balance a pagar. Si tienes dudas, consúltanos antes de firmar.", en: "TaxesToGo allows you to sign your tax return directly from your mobile device. Before signing, verify: your name, address, dependents, bank account, and refund amount or balance due. If you have any questions, ask us before signing." },
  // Step 13
  "ttg.guide.s13.title": { es: "Guarda copia de todo", en: "Save a copy of everything" },
  "ttg.guide.s13.desc": { es: "Importante: TaxesToGo no tiene la obligación de almacenar tu información indefinidamente. Siempre guarda copias de lo que envíes para tus propios registros:", en: "Important: TaxesToGo is not required to store your information indefinitely. Always save copies of what you send for your own records:" },
  "ttg.guide.s13.i1": { es: "Capturas o PDF de los documentos firmados", en: "Screenshots or PDFs of signed documents" },
  "ttg.guide.s13.i2": { es: "Copia de los documentos enviados", en: "Copy of the documents submitted" },
  "ttg.guide.s13.i3": { es: "Copia final de tu declaración de impuestos", en: "Final copy of your tax return" },
  "ttg.guide.s13.i4": { es: "Confirmaciones o mensajes importantes del proceso", en: "Important confirmations or messages from the process" },

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
  "contact.form.team": { es: "Asesor Preferido", en: "Preferred Advisor" },
  "contact.form.team.ph": { es: "Sin preferencia", en: "No preference" },
  "contact.form.submit": { es: "Enviar Mensaje", en: "Send Message" },
  "contact.form.sending": { es: "Enviando...", en: "Sending..." },
  "contact.form.error": { es: "Hubo un error al enviar. Por favor intenta de nuevo o llámanos directamente.", en: "There was an error sending your message. Please try again or call us directly." },
  "contact.form.privacy": { es: "Tu información está segura. No compartimos tus datos con terceros.", en: "Your information is safe. We do not share your data with third parties." },
  "contact.form.success.title": { es: "¡Mensaje Enviado!", en: "Message Sent!" },
  "contact.form.success.sub": { es: "Gracias por contactarnos. Te responderemos a la brevedad posible.", en: "Thank you for reaching out. We will reply as soon as possible." },
  "contact.form.success.back": { es: "Enviar otro mensaje", en: "Send another message" },
  "team.mayte.name": { es: "Mayte F. Roses Soto", en: "Mayte F. Roses Soto" },
  "team.mayte.role": { es: "Propietaria y Asesora Principal", en: "Owner & Senior Advisor" },
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

  // FAQ — Taxes To Go
  // FAQ — Insurance (expanded)
  "faq.i.q3": { es: "¿Qué tipos de seguro de vida ofrecen?", en: "What types of life insurance do you offer?" },
  "faq.i.a3": { es: "Ofrecemos asesoría y planes de seguro de vida para proteger el futuro de tu familia. Te ayudamos a comparar opciones según tu presupuesto, edad y necesidades. La consulta inicial es completamente gratuita. Llámanos o escríbenos por WhatsApp para conocer las opciones disponibles.", en: "We offer life insurance advisory services and plans to protect your family's future. We help you compare options based on your budget, age, and needs. The initial consultation is completely free. Call us or message us on WhatsApp to learn about available options." },

  // FAQ — Notary (expanded)
  "faq.n.q3": { es: "¿Qué es un Poder Notarial y cuándo lo necesito?", en: "What is a Power of Attorney and when do I need one?" },
  "faq.n.a3": { es: "Un Poder Notarial es un documento legal que autoriza a otra persona a actuar en tu nombre para trámites específicos — como firmar contratos, manejar cuentas bancarias o representarte ante instituciones. Lo necesitas cuando no puedes estar presente en persona para un trámite importante. Ofrecemos Poderes Notariales generales y específicos. Contáctanos para más información.", en: "A Power of Attorney is a legal document that authorizes another person to act on your behalf for specific matters — such as signing contracts, managing bank accounts, or representing you before institutions. You need one when you cannot be present in person for an important transaction. We offer general and specific Powers of Attorney. Contact us for more information." },
  "faq.n.q4": { es: "¿Qué es la Fe de Vida y para qué trámites se usa?", en: "What is a Certificate of Life and what is it used for?" },
  "faq.n.a4": { es: "La Fe de Vida es un documento que certifica que una persona está viva. Se necesita principalmente para trámites en el extranjero, como cobrar pensiones, herencias o beneficios en otro país. Si tienes familiares fuera de EE.UU. o necesitas gestionar trámites internacionales, podemos ayudarte a obtener este documento. Contáctanos para conocer el proceso.", en: "A Certificate of Life is a document that certifies that a person is alive. It is mainly needed for international procedures, such as collecting pensions, inheritances, or benefits in another country. If you have family members outside the US or need to manage international procedures, we can help you obtain this document. Contact us to learn about the process." },
  "faq.n.q5": { es: "¿Qué documentos preparan para trámites migratorios?", en: "What documents do you prepare for immigration procedures?" },
  "faq.n.a5": { es: "Preparamos documentos administrativos de apoyo para trámites migratorios, como cartas de presentación, declaraciones y formularios de carácter administrativo. Importante: no somos abogados ni representantes acreditados de inmigración. No tramitamos visas, green cards ni peticiones ante USCIS. Para asuntos legales migratorios, te recomendamos consultar con un abogado de inmigración autorizado.", en: "We prepare administrative support documents for immigration procedures, such as cover letters, declarations, and administrative forms. Important: we are not attorneys or accredited immigration representatives. We do not process visas, green cards, or USCIS petitions. For legal immigration matters, we recommend consulting a licensed immigration attorney." },

  // FAQ — Business (expanded)
  "faq.b.q3": { es: "¿Cómo funciona el servicio de reparación de crédito?", en: "How does the credit repair service work?" },
  "faq.b.a3": { es: "La reparación de crédito es un proceso administrativo en el que disputamos errores o items negativos en tu reporte de crédito ante las agencias (Equifax, Experian, TransUnion). Revisamos tu reporte, identificamos lo que se puede disputar, enviamos las cartas correspondientes y hacemos seguimiento. El proceso toma tiempo — generalmente varios meses — y los resultados varían según cada caso. Contáctanos para una evaluación gratuita.", en: "Credit repair is an administrative process in which we dispute errors or negative items on your credit report with the credit bureaus (Equifax, Experian, TransUnion). We review your report, identify what can be disputed, send the appropriate letters, and follow up. The process takes time — generally several months — and results vary by case. Contact us for a free evaluation." },
  "faq.b.q4": { es: "¿Qué necesito para establecer crédito empresarial?", en: "What do I need to establish business credit?" },
  "faq.b.a4": { es: "Para comenzar a construir crédito empresarial necesitas tener tu negocio formalmente registrado (LLC o corporación), un EIN del IRS, una cuenta bancaria de negocios y una dirección comercial. Nosotros te guiamos en cada paso: desde la formación de la empresa hasta la creación de un perfil crediticio que te permita acceder a financiamiento. Llámanos para una consulta sin costo.", en: "To start building business credit you need to have your business formally registered (LLC or corporation), an EIN from the IRS, a business bank account, and a commercial address. We guide you every step of the way: from business formation to creating a credit profile that gives you access to financing. Call us for a free consultation." },
  "faq.b.q5": { es: "¿Qué tipos de préstamos ofrecen?", en: "What types of loans do you offer?" },
  "faq.b.a5": { es: "Ofrecemos asesoría y gestión de préstamos de corto y largo plazo para personas y negocios. El tipo de préstamo disponible depende de tu historial crediticio, ingresos y necesidades específicas. Te ayudamos a evaluar opciones y a preparar la documentación necesaria. La consulta inicial es completamente gratuita. Contáctanos para conocer qué opciones aplican a tu situación.", en: "We offer advisory services and management for short and long-term loans for individuals and businesses. The type of loan available depends on your credit history, income, and specific needs. We help you evaluate options and prepare the necessary documentation. The initial consultation is completely free. Contact us to find out which options apply to your situation." },

  "faq.cat.taxestogo": { es: "Taxes To Go", en: "Taxes To Go" },
  "faq.ttg.q1": { es: "¿Cómo funciona Taxes To Go paso a paso?", en: "How does Taxes To Go work step by step?" },
  "faq.ttg.a1": { es: "Taxes To Go es una app móvil que te permite enviar tus documentos de impuestos a tu preparador desde el teléfono en 13 pasos: descargar la app, crear cuenta, iniciar sesión, vincular con el preparador, reunir documentos, tomar fotos, subirlos en orden, completar información adicional, revisar, enviar, esperar revisión, firmar la declaración y guardar copia. Visita nuestra página de Taxes To Go para ver la guía completa con todos los detalles.", en: "Taxes To Go is a mobile app that lets you send your tax documents to your preparer from your phone in 13 steps: download the app, create an account, log in, link with your preparer, gather documents, take photos, upload them in order, complete additional info, review, send, wait for review, sign your return, and save a copy. Visit our Taxes To Go page for the complete guide with all the details." },
  "faq.ttg.q2": { es: "¿Qué documentos necesito para usar la app de Taxes To Go?", en: "What documents do I need to use the Taxes To Go app?" },
  "faq.ttg.a2": { es: "Necesitas: ID o licencia de conducir, tarjetas de Seguro Social o carta de ITIN (si aplica), W-2 o 1099, formas de seguro médico (si aplica), información bancaria para depósito directo, declaración del año pasado (si el preparador la solicita), documentos de dependientes y cartas del IRS si las tienes. Visita nuestra página de Taxes To Go para ver la lista y la guía completa.", en: "You need: ID or driver's license, Social Security cards or ITIN letter (if applicable), W-2 or 1099, health insurance forms (if applicable), bank account information for direct deposit, last year's return (if your preparer requests it), dependent documents, and any IRS letters you have. Visit our Taxes To Go page to see the full list and guide." },
  "faq.ttg.q3": { es: "¿Puedo firmar mi declaración de impuestos desde el móvil?", en: "Can I sign my tax return from my mobile phone?" },
  "faq.ttg.a3": { es: "Sí. TaxesToGo permite firmar y enviar tu declaración completamente desde el teléfono. Cuando tu preparador termine de procesar todo, recibirás los documentos para revisión y firma dentro de la app. Antes de firmar, verifica tu nombre, dirección, dependientes, cuenta bancaria y el monto a recibir o pagar.", en: "Yes. TaxesToGo allows you to sign and submit your tax return entirely from your phone. When your preparer finishes processing everything, you will receive the documents for review and signature within the app. Before signing, verify your name, address, dependents, bank account, and the amount to receive or pay." },
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
