import { useEffect, useState } from "react";

const links = [["overview", "Overview"], ["demo", "Live Demo"], ["offer", "Offerings"], ["process", "Process"], ["faq", "FAQ"], ["contact", "Get a Quote"]];

export default function SectionNav() {
  const [p, setP] = useState(0);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", on);
      io.disconnect();
    };
  }, []);

  return (
    <div className="sticky z-40 border-b border-border bg-background/80 backdrop-blur" style={{ top: "var(--header-offset, 0px)" }}>
      <div className="h-[2px] bg-lav" style={{ width: `${p}%` }} />
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex gap-2 overflow-x-auto text-sm">
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 transition ${active === id ? "bg-accent/25 text-foreground" : "text-foreground/60 hover:text-foreground"}`}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
