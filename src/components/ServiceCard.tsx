import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  featured?: boolean;
}

export default function ServiceCard({ title, description, icon: Icon, featured }: ServiceCardProps) {
  return (
    <div
      className="rounded-xl p-6 border transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
      style={
        featured
          ? { backgroundColor: "#1C1C1C", borderColor: "#B9954F" }
          : { backgroundColor: "#FFFFFF", borderColor: "#E4E4E4" }
      }
    >
      {Icon ? (
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: featured ? "rgba(185,149,79,0.15)" : "rgba(185,149,79,0.08)" }}
        >
          <Icon size={22} style={{ color: "#B9954F" }} />
        </div>
      ) : (
        <div
          className="w-1 h-8 rounded-full mb-4"
          style={{ backgroundColor: "#B9954F" }}
        />
      )}
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
