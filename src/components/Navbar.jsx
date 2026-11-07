import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center"><img src="/tamx-logo.png" alt="TAMx" className="h-9 w-auto" /></Link>

        <ul className="flex items-center gap-8 text-sm text-foreground/75">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>

          <li
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="hover:text-foreground">Services ▾</button>

            {open && (
              <div className="absolute right-0 top-full pt-4">
                <div className="w-[640px] max-w-[90vw] grid grid-cols-2 gap-2 p-4 rounded-2xl bg-[#0a0a0a] border border-border">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="p-3 rounded-xl hover:bg-foreground/5"
                    >
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p className="text-xs text-foreground/60 line-clamp-2">{s.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
