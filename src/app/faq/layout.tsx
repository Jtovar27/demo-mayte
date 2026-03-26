import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Taxes & Insurance Group LLC",
  description: "Respuestas sobre impuestos, seguros, notaría, apostillas, formación de negocios y el servicio Taxes To Go en Kissimmee, Florida.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
