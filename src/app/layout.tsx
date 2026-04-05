import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";

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

export const metadata: Metadata = {
  title: "Taxes and Insurance Group LLC | Kissimmee, Florida",
  description:
    "Your trusted partner in taxes, insurance, and notary services in Kissimmee, Florida. Over 20 years serving the community. Bilingual service.",
  keywords: "taxes, insurance, notary, Kissimmee, Florida, apostilles, translations, Medicare, Obamacare, impuestos, seguros",
  icons: {
    icon: "/logo-business.jpg",
    apple: "/logo-business.jpg",
  },
  openGraph: {
    title: "Taxes and Insurance Group LLC | Kissimmee, Florida",
    description: "Over 20 years helping the Hispanic community in Kissimmee and Orlando with taxes, insurance, and notary services.",
    images: [{ url: "/logo-business.jpg", width: 1024, height: 1024, alt: "Taxes and Insurance Group LLC" }],
    locale: "es_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body>
        <SiteSettingsProvider>
          <LanguageProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </LanguageProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
