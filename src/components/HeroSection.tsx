import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="inline-block bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-full mb-6 tracking-wider uppercase">
          Consulta Gratis · Atención en Español
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Tu Aliado de Confianza en<br />
          <span className="text-amber-400">Impuestos, Seguros</span><br />
          y Servicios Notariales
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-4 max-w-2xl mx-auto leading-relaxed">
          Más de 20 años ayudando a familias y negocios en Kissimmee, Florida.
          Atención personalizada, precios justos y cero complicaciones.
        </p>
        <p className="text-blue-300 text-sm mb-8">En persona o virtual · Kissimmee, FL · (407) 235-4065</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:4072354065"
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            📞 Llámanos Ahora
          </a>
          <Link
            href="/services"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors border border-white/30"
          >
            Ver Servicios →
          </Link>
        </div>
      </div>
    </section>
  );
}
