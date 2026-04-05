import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div
        className="text-8xl font-bold mb-4 leading-none"
        style={{ color: "#B9954F", fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif" }}
      >
        404
      </div>
      <h1
        className="text-2xl md:text-3xl font-bold mb-3"
        style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
      >
        Página no encontrada
      </h1>
      <p className="text-sm mb-2 max-w-sm leading-relaxed" style={{ color: "#6E6E6E" }}>
        La página que buscas no existe o fue movida.
      </p>
      <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "#6E6E6E" }}>
        Page not found — the page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-8 py-3 rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          Volver al inicio
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3 rounded-lg text-sm font-semibold border"
          style={{ borderColor: "#B9954F", color: "#B9954F" }}
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
