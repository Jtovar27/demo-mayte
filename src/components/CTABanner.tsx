export default function CTABanner() {
  return (
    <section className="bg-amber-500 py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          ¿Listo para empezar?
        </h2>
        <p className="text-amber-100 mb-6 text-lg">
          Consulta gratuita · Atención 100% en español · En persona o virtual
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:4072354065"
            className="bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors text-lg"
          >
            📞 Llámanos Ahora
          </a>
          <a
            href="https://wa.me/14072354065"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-500 transition-colors text-lg"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
