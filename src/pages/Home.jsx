import { services } from "../data/services.js";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
    </main>
  );
}
