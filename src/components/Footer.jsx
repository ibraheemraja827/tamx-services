import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Linkedin, Instagram, Facebook } from "lucide-react";
import { services } from "../data/services.js";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Karachi",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = fmt.formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t)?.value;

  return (
    <div className="flex items-end gap-3">
      <span className="text-6xl sm:text-7xl md:text-8xl font-normal tracking-tight tabular-nums leading-none">
        {get("hour")}:{get("minute")}:{get("second")}
      </span>
      <span className="text-2xl md:text-3xl text-foreground/50 pb-1">{get("dayPeriod")}</span>
    </div>
  );
}

const head = "text-sm tracking-[0.15em] uppercase text-foreground/50 mb-6";
const item = "text-foreground/75 hover:text-foreground transition";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[#020202]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* left: contact + clock */}
          <div>
            <a href="mailto:info@tamxai.com" className="text-3xl md:text-4xl font-normal hover:text-lav transition">info@tamxai.com</a>
            <div className="mt-5">
              <a href="#" className="inline-flex items-center gap-2 text-lg border-b border-foreground/80 pb-0.5 hover:text-lav hover:border-lav transition">
                Linkedin <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="mt-10 text-foreground/85">
              Based in Regional Plan 9, NASTP, Islamabad, PK
              <span className="ml-4 text-foreground/45">Serving clients globally</span>
            </p>
            <div className="mt-4"><Clock /></div>
          </div>

          {/* right: link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-[1.6fr_1fr_1fr] gap-10">
            <div>
              <h4 className={head}>Services</h4>
              <ul className="space-y-4">
                {services.map((s) => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className={item}>{s.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={head}>Product</h4>
              <ul className="space-y-4">
                {["Mapalz", "LMS", "CRM", "E-Courses"].map((x) => (
                  <li key={x}><a href="#" className={item}>{x}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={head}>Socials</h4>
              <div className="flex gap-3">
                {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="flex w-12 h-12 rounded-full border border-border bg-foreground/5 items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4 text-sm text-foreground/45">
          <p>© {new Date().getFullYear()} TAMx. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
