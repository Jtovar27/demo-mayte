import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { SITE } from "@/config/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://taxesinsurancegroupfl.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taxes and Insurance Group LLC | Kissimmee, Florida",
    template: "%s | Taxes and Insurance Group LLC",
  },
  description:
    "Más de 20 años ayudando a la comunidad hispana en Kissimmee y Orlando con impuestos, seguros, notaría y servicios de negocios. Servicio bilingüe. Over 20 years helping the Hispanic community with taxes, insurance, and notary services.",
  keywords: [
    "taxes Kissimmee", "impuestos Kissimmee", "seguros Kissimmee",
    "insurance Kissimmee Florida", "notary Kissimmee", "notaria Kissimmee",
    "apostilla Florida", "LLC Florida", "Obamacare Florida",
    "Medicare Kissimmee", "ITIN Florida", "declaracion impuestos Orlando",
    "Taxes and Insurance Group", "Mayte Roses",
  ],
  authors: [{ name: "Taxes and Insurance Group LLC" }],
  creator: "Taxes and Insurance Group LLC",
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
      
    ],
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_US",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Taxes and Insurance Group LLC",
    title: "Taxes and Insurance Group LLC | Kissimmee, Florida",
    description:
      "Más de 20 años ayudando a la comunidad hispana con impuestos, seguros y notaría en Kissimmee, FL. Bilingüe · Consulta gratis.",
    images: [
      {
        url: "/logo-business.jpg",
        width: 1024,
        height: 1024,
        alt: "Taxes and Insurance Group LLC — Kissimmee, Florida",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Taxes and Insurance Group LLC | Kissimmee, FL",
    description: "Impuestos · Seguros · Notaría · Kissimmee, Florida. Bilingüe. +20 años.",
    images: ["/logo-business.jpg"],
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AccountingService"],
  name: SITE.legalName,
  alternateName: SITE.name,
  description:
    "Oficina de impuestos, seguros, notaría y servicios de negocios en Kissimmee, Florida. Más de 20 años sirviendo a la comunidad hispana. Bilingüe.",
  url: siteUrl,
  telephone: SITE.phone,
  email: SITE.email,
  founder: { "@type": "Person", name: SITE.owner },
  foundingDate: "2004",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Check",
  areaServed: [
    { "@type": "City", name: "Kissimmee", containedIn: "Florida" },
    { "@type": "City", name: "Orlando", containedIn: "Florida" },
    { "@type": "State", name: "Florida" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.2917,
    longitude: -81.3978,
  },
  hasMap: SITE.address.mapsHref,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "17:00",
      description: "By appointment only",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.phone,
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    SITE.address.mapsHref,
    SITE.google.reviewsUrl,
  ],
  image: `${siteUrl}/logo-business.jpg`,
  logo: `${siteUrl}/logo-business.jpg`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <SiteSettingsProvider>
          <LanguageProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </LanguageProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
