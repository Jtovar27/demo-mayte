import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taxes and Insurance Group LLC | Kissimmee, Florida",
  description:
    "Tu aliado de confianza en impuestos, seguros y servicios notariales en Kissimmee, Florida. Más de 20 años ayudando a la comunidad hispana. Atención 100% en español.",
  keywords: "impuestos, seguros, notario, Kissimmee, Florida, apostillas, traducciones, Medicare, Obamacare",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
