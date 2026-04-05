/**
 * SITE CONFIG — Single source of truth for all business contact data.
 *
 * Update this file when business contact details change.
 * All components and API routes import from here — do NOT hardcode these values elsewhere.
 */

export const SITE = {
  name: "Taxes & Insurance Group LLC",
  legalName: "Taxes and Insurance Group LLC",
  owner: "Mayte F. Roses Soto",
  tagline: "Mayte F. Roses Soto · Kissimmee, Florida",

  // Phone
  phone: "(407) 235-4065",
  phoneRaw: "4072354065", // used in href="tel:..." and wa.me links
  phoneHref: "tel:4072354065",

  // Contact
  email: "tigllc4@gmail.com",
  emailHref: "mailto:tigllc4@gmail.com",

  // WhatsApp
  whatsapp: "https://wa.me/14072354065",

  // Address
  address: {
    street: "1216 Dyer Blvd",
    city: "Kissimmee",
    state: "FL",
    zip: "34741",
    full: "1216 Dyer Blvd, Kissimmee, FL 34741",
    mapsHref: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741",
  },

  // Business hours
  hours: {
    weekdays: "9:00am – 6:00pm",
    saturday: "Con cita previa / By appointment",
    sunday: "Cerrado / Closed",
    display: "Lunes a Viernes · 9am – 6pm · Sábados con cita",
    displayEn: "Mon–Fri · 9am–6pm · Saturdays by appointment",
  },

  // Google Business
  google: {
    reviewsUrl: "https://share.google/S6E2cBbGFseLH14MC",
    mapsUrl: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741",
  },

  // Taxes To Go — external service
  taxesToGo: {
    url: "https://taxestogo.com/App/Download/2620",
  },

  // Logo — set path to activate the image in the header.
  // While path is empty, the header displays the business name as text (safe fallback).
  // IMPORTANT: Replace /logo.jpeg with a transparent asset (e.g. public/logo.png or public/logo.svg)
  // for clean rendering on the dark navbar. JPEG files with a background will show a visible box.
  logo: {
    path: "/logo-transparent.png" as string,
    alt: "Taxes & Insurance Group LLC",
  },

  // Legal disclaimer (used in footer, about, services, contact)
  disclaimer: {
    es: "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.",
    en: "We are not attorneys. We only prepare documents and assist with administrative processes.",
  },
} as const;
