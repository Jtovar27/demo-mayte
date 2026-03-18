export default function ContactBlock() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Contáctanos</h3>
      <ul className="space-y-4 text-sm text-gray-700">
        <li className="flex items-start gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="font-semibold text-gray-900">Dirección</p>
            <p>1216 Dyer Blvd, Kissimmee, FL 34741</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-xl">📞</span>
          <div>
            <p className="font-semibold text-gray-900">Teléfono</p>
            <a href="tel:4072354065" className="text-blue-700 hover:text-amber-600">(407) 235-4065</a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-xl">✉️</span>
          <div>
            <p className="font-semibold text-gray-900">Correo</p>
            <a href="mailto:inmigracion360@gmail.com" className="text-blue-700 hover:text-amber-600">
              inmigracion360@gmail.com
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-xl">💬</span>
          <div>
            <p className="font-semibold text-gray-900">WhatsApp</p>
            <a
              href="https://wa.me/14072354065"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-amber-600"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-xl">🕐</span>
          <div>
            <p className="font-semibold text-gray-900">Horario</p>
            <p>Lun–Vie: 9am – 6pm</p>
            <p>Sábados: Con cita previa</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
