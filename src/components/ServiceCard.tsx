interface ServiceCardProps {
  title: string;
  description: string;
  featured?: boolean;
}

export default function ServiceCard({ title, description, featured }: ServiceCardProps) {
  return (
    <div
      className="rounded-xl p-6 border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      style={
        featured
          ? { backgroundColor: "#1C1C1C", borderColor: "#B9954F" }
          : { backgroundColor: "#FFFFFF", borderColor: "#E4E4E4" }
      }
    >
      <div
        className="w-1 h-8 rounded-full mb-4"
        style={{ backgroundColor: "#B9954F" }}
      />
      <h3
        className="text-lg font-bold mb-2"
        style={{ color: featured ? "#FFFFFF" : "#1C1C1C" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: featured ? "#AFAFAF" : "#6E6E6E" }}
      >
        {description}
      </p>
    </div>
  );
}
