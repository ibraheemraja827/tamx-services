import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services.js";
import { serviceIcons } from "../data/icons.js";

export default function ServicesGrid() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-20 pb-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Our Services</h1>
        <p className="text-foreground/60">End-to-end technology services to drive your digital transformation.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => {
          const Icon = serviceIcons[s.slug];
          return (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 min-h-[22rem] flex flex-col transition hover:border-lav/40"
            >
              <Icon size={150} strokeWidth={1.2} className="absolute right-8 top-10 text-foreground/[0.06]" />
              <span className="relative flex w-16 h-16 rounded-2xl border border-border bg-foreground/10 items-center justify-center text-lav shadow-[0_0_40px_rgba(162,163,233,0.2)]">
                <Icon size={28} />
              </span>
              <h3 className="relative mt-8 mb-3 text-2xl font-semibold transition group-hover:text-lav">{s.title}</h3>
              <p className="relative text-foreground/60 leading-relaxed">{s.desc}</p>
              <span className="relative mt-auto pt-6 inline-flex items-center gap-2 text-sm text-lav opacity-0 transition group-hover:opacity-100">
                Learn more <ArrowUpRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
