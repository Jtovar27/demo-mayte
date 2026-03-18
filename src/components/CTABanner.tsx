export default function CTABanner() {
  return (
    <section className="py-14" style={{ backgroundColor: "#B9954F" }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Listo para empezar?
        </h2>
        <p className="mb-6 text-lg" style={{ color: "#F5EDD9" }}>
          Consulta gratuita · Atención 100% en español · En persona o virtual
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:4072354065"
            className="font-bold px-8 py-3 rounded-lg transition-opacity hover:opacity-90 text-lg"
            style={{ backgroundColor: "#1C1C1C", color: "#FFFFFF" }}
          >
            Llámanos Ahora
          </a>
          <a
            href="https://wa.me/14072354065"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold px-8 py-3 rounded-lg transition-opacity hover:opacity-90 text-lg border-2 border-white text-white"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
