import { useEffect, useState } from "react";

const links = [["overview", "Overview"], ["demo", "Live Demo"], ["offer", "Offerings"], ["process", "Process"], ["faq", "FAQ"], ["contact", "Get a Quote"]];

export default function SectionNav() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      setP((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="h-[2px] bg-gradient-to-r from-primary to-lav" style={{ width: `${p}%` }} />
      <div className="max-w-6xl mx-auto px-6 py-3 flex gap-7 overflow-x-auto text-sm text-foreground/60">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-foreground transition">{label}</a>
        ))}
      </div>
    </div>
  );
}
