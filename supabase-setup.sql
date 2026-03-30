-- ============================================================
-- Taxes & Insurance Group LLC — Supabase Schema + Seed Data
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Blog posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL DEFAULT '{"es":"","en":""}',
  excerpt JSONB NOT NULL DEFAULT '{"es":"","en":""}',
  content JSONB NOT NULL DEFAULT '{"es":"","en":""}',
  category TEXT NOT NULL DEFAULT 'taxes',
  date TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role JSONB NOT NULL DEFAULT '{"es":"","en":""}',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Site settings (always a single row with id=1)
CREATE TABLE site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  phone TEXT NOT NULL DEFAULT '',
  phone_raw TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  address JSONB NOT NULL DEFAULT '{"street":"","city":"","state":"","zip":""}',
  hours JSONB NOT NULL DEFAULT '{"weekdays":"","saturday":"","sunday":""}',
  google_reviews_url TEXT NOT NULL DEFAULT '',
  taxes_to_go_url TEXT NOT NULL DEFAULT ''
);

-- 4. Auth (always a single row with id=1)
CREATE TABLE auth (
  id INTEGER PRIMARY KEY DEFAULT 1,
  password_hash TEXT
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Site settings
INSERT INTO site_settings (id, phone, phone_raw, email, address, hours, google_reviews_url, taxes_to_go_url)
VALUES (
  1,
  '(407) 235-4065',
  '4072354065',
  'inmigracion360@gmail.com',
  '{"street":"1216 Dyer Blvd","city":"Kissimmee","state":"FL","zip":"34741"}',
  '{"weekdays":"9:00am – 6:00pm","saturday":"Con cita previa / By appointment","sunday":"Cerrado / Closed"}',
  'https://share.google/S6E2cBbGFseLH14MC',
  'https://taxestogo.com/App/Download/2620'
);

-- Team member
INSERT INTO team_members (name, role, email, phone)
VALUES (
  'Mayte F. Roses Soto',
  '{"es":"Propietaria y Asesora Principal","en":"Owner & Senior Advisor"}',
  '',
  '(407) 235-4065'
);

-- Blog posts
INSERT INTO blog_posts (slug, title, excerpt, content, category, date, published) VALUES
(
  'fecha-limite-impuestos-2026',
  '{"es":"¿Cuándo es la Fecha Límite para Declarar en 2026?","en":"When Is the 2026 Tax Deadline?"}',
  '{"es":"Todo lo que necesitas saber sobre las fechas límite federales y estatales para presentar tu declaración de impuestos este año.","en":"Everything you need to know about federal and state tax deadlines for filing your tax return this year."}',
  '{"es":"La fecha límite federal para declarar impuestos en 2026 es el 15 de abril. Si necesitas más tiempo, puedes solicitar una extensión de 6 meses hasta el 15 de octubre, pero recuerda que si debes dinero, el pago sigue siendo exigible el 15 de abril.\n\nEn nuestra oficina te ayudamos a preparar tu declaración con tiempo, evitando multas e intereses por presentación tardía. Llámanos al (407) 235-4065 para agendar tu consulta gratuita.","en":"The federal tax deadline for 2026 is April 15. If you need more time, you can request a 6-month extension until October 15, but remember that if you owe money, payment is still due on April 15.\n\nAt our office we help you prepare your return on time, avoiding penalties and interest for late filing. Call us at (407) 235-4065 to schedule your free consultation."}',
  'taxes', '2026-03-01', true
),
(
  'obamacare-inscripcion-2026',
  '{"es":"Cómo Inscribirte en Obamacare: Guía Completa 2026","en":"How to Enroll in Obamacare: Complete 2026 Guide"}',
  '{"es":"Te explicamos paso a paso cómo inscribirte en un plan de salud ACA, qué subsidios puedes recibir y cuándo son los períodos de inscripción.","en":"We explain step by step how to enroll in an ACA health plan, what subsidies you may receive, and when enrollment periods are."}',
  '{"es":"El Mercado de Seguros de Salud (ACA / Obamacare) ofrece planes de salud accesibles para la mayoría de residentes en Estados Unidos. Dependiendo de tus ingresos, podrías calificar para subsidios que reducen significativamente tu prima mensual.\n\nEl período de inscripción abierta generalmente ocurre entre noviembre y enero, pero si tienes un evento de vida calificado (pérdida de empleo, cambio de estado civil, nacimiento de un hijo), puedes inscribirte en cualquier momento.\n\nEn nuestra oficina te ayudamos a comparar planes y encontrar la mejor opción para tu familia.","en":"The Health Insurance Marketplace (ACA / Obamacare) offers affordable health plans for most US residents. Depending on your income, you may qualify for subsidies that significantly reduce your monthly premium.\n\nOpen enrollment typically runs from November through January, but if you have a qualifying life event, you can enroll at any time through a Special Enrollment Period.\n\nAt our office we help you compare plans and find the best option for your family."}',
  'insurance', '2026-02-15', true
),
(
  'como-registrar-llc-florida',
  '{"es":"Cómo Registrar una LLC en Florida: Paso a Paso","en":"How to Register an LLC in Florida: Step by Step"}',
  '{"es":"Registrar tu empresa en Florida es más sencillo de lo que crees. Descubre los pasos, costos y documentos necesarios para empezar tu negocio legalmente.","en":"Registering your business in Florida is simpler than you think. Discover the steps, costs, and documents needed to start your business legally."}',
  '{"es":"Registrar una LLC en Florida cuesta $125 en tarifas estatales y se puede hacer en pocos días. Los pasos principales son: elegir un nombre disponible, designar un agente registrado, presentar los Articles of Organization ante el estado, y obtener tu EIN ante el IRS.\n\nUna vez formada tu LLC, también necesitarás abrir una cuenta bancaria de negocios y establecer tu crédito empresarial para acceder a financiamiento en el futuro.\n\nEn Taxes & Insurance Group LLC te guiamos en todo el proceso. Llámanos al (407) 235-4065.","en":"Registering an LLC in Florida costs $125 in state fees and can be done in just a few days. The main steps are: choose an available name, designate a registered agent, file the Articles of Organization with the state, and obtain your EIN from the IRS.\n\nOnce your LLC is formed, you will also need to open a business bank account and establish your business credit to access financing in the future.\n\nAt Taxes & Insurance Group LLC we guide you through the entire process. Call us at (407) 235-4065."}',
  'business', '2026-01-20', true
),
(
  'que-es-una-apostilla-y-cuando-la-necesitas',
  '{"es":"¿Qué es una Apostilla y Cuándo la Necesitas?","en":"What Is an Apostille and When Do You Need One?"}',
  '{"es":"Si necesitas usar documentos oficiales en otro país, probablemente necesites una apostilla. Te explicamos qué es, para qué sirve y cómo obtenerla en Florida.","en":"If you need to use official documents in another country, you probably need an apostille. We explain what it is, what it is for, and how to get one in Florida."}',
  '{"es":"Una apostilla es un sello oficial que autentica documentos para que sean válidos en otros países miembros de la Convención de La Haya. Se necesita para documentos como actas de nacimiento, diplomas, poderes notariales y documentos legales en general cuando van a ser usados fuera de Estados Unidos.\n\nEn Florida, las apostillas son emitidas por la Secretaría de Estado. El proceso toma entre 3 y 10 días hábiles.\n\nEn nuestra oficina procesamos apostillas para todo tipo de documentos. Contáctanos para conocer los tiempos y costos actuales.","en":"An apostille is an official seal that authenticates documents for use in other member countries of the Hague Convention. It is needed for documents such as birth certificates, diplomas, and powers of attorney when they will be used outside the United States.\n\nIn Florida, apostilles are issued by the Secretary of State. The process takes between 3 and 10 business days.\n\nAt our office we process apostilles for all types of documents. Contact us for current processing times and costs."}',
  'notary', '2025-12-10', true
);

-- ============================================================
-- DISABLE Row Level Security (service role key bypasses RLS,
-- but disabling it keeps things simple for a private admin app)
-- ============================================================
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth DISABLE ROW LEVEL SECURITY;
