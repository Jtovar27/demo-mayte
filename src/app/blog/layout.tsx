import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | Taxes & Insurance Group LLC",
  description: "Artículos sobre impuestos, seguros, notaría y negocios en Kissimmee, Florida. Información útil en español e inglés.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
