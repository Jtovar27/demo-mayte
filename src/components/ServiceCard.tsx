interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  featured?: boolean;
}

export default function ServiceCard({ icon, title, description, featured }: ServiceCardProps) {
  return (
    <div className={`rounded-xl p-6 border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
      featured
        ? "bg-blue-900 border-blue-700 text-white"
        : "bg-white border-gray-200 text-gray-800"
    }`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className={`text-lg font-bold mb-2 ${featured ? "text-white" : "text-blue-900"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${featured ? "text-blue-200" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
}
