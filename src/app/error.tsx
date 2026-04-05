"use client";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div
        className="text-6xl font-bold mb-4"
        style={{ color: "#B9954F", fontFamily: "var(--font-heading), 'Cormorant Garamond', Georgia, serif" }}
      >
        Oops
      </div>
      <h1
        className="text-2xl font-bold mb-3"
        style={{ color: "#0D2B4E", fontFamily: "var(--font-heading), serif" }}
      >
        Algo salió mal
      </h1>
      <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "#6E6E6E" }}>
        Ocurrió un error inesperado. Por favor intenta de nuevo o llámanos directamente.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="px-8 py-3 rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: "#0D2B4E" }}
        >
          Intentar de nuevo
        </button>
        <a
          href="/"
          className="px-8 py-3 rounded-lg text-sm font-semibold border"
          style={{ borderColor: "#B9954F", color: "#B9954F" }}
        >
          Ir al inicio
        </a>
      </div>
    </div>
  );
}
