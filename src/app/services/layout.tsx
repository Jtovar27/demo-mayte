import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Servicios | Taxes & Insurance Group LLC",
  description: "Impuestos, seguros de salud y vida, notaría, apostillas, traducciones, formación de LLC y reparación de crédito en Kissimmee, Florida.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
