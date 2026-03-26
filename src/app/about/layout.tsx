import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sobre Nosotros | Taxes & Insurance Group LLC",
  description: "Más de 20 años ayudando a familias y negocios en Kissimmee, Florida. Conoce a Mayte F. Roses Soto y al equipo de Taxes & Insurance Group LLC.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
