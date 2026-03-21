/**
 * SITE CONFIG — Single source of truth for all business contact data.
 *
 * Update this file when business contact details change.
 * All components and API routes import from here — do NOT hardcode these values elsewhere.
 *
 * TODO: Replace email with the correct business email before going live.
 * TODO: Add googleReviewsUrl once the Google Business profile link is confirmed.
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
  // TODO: replace with correct business email before going live
  email: "inmigracion360@gmail.com",
  emailHref: "mailto:inmigracion360@gmail.com",

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
    // TODO: add the Google Business review link once confirmed
    reviewsUrl: "",
    mapsUrl: "https://maps.google.com/?q=1216+Dyer+Blvd+Kissimmee+FL+34741",
  },

  // Taxes To Go — external service URL
  // TODO: replace with the real Taxes To Go external URL when confirmed
  taxesToGo: {
    url: "",
  },

  // Legal disclaimer (used in footer, about, services, contact)
  disclaimer: {
    es: "No somos abogados. Solo preparamos documentos y ayudamos con trámites administrativos.",
    en: "We are not attorneys. We only prepare documents and assist with administrative processes.",
  },
} as const;
