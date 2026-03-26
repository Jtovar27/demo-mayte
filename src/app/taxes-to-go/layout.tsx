import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Taxes To Go | Taxes & Insurance Group LLC",
  description: "Presenta tus impuestos desde cualquier lugar con Taxes To Go. Servicio móvil y remoto de declaración de impuestos en Kissimmee, Florida.",
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
