import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="block p-6 rounded-2xl bg-foreground/5 border border-border hover:border-accent/50 transition"
    >
      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
      <p className="text-sm text-foreground/60">{service.desc}</p>
    </Link>
  );
}
