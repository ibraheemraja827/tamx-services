import { Link } from "react-router-dom";
import { services } from "../data/services.js";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <img src="/tamx-logo.png" alt="TAMx" className="h-10 w-auto mb-3" />
          <p className="text-sm text-foreground/60">
            AI, software and technology solutions for growing businesses.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-foreground/60">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-foreground">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-foreground/60">info@tamx.com</p>
        </div>
      </div>

      <p className="text-center text-xs text-foreground/45 py-4 border-t border-border">
        © {new Date().getFullYear()} TAMx Technologies. All rights reserved.
      </p>
    </footer>
  );
}
