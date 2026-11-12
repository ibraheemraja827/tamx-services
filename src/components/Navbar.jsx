import { Link } from "react-router-dom";
import { ChevronDown, ArrowUpRight, Paintbrush, Cpu, Code } from "lucide-react";
import { services } from "../data/services.js";
import "./navbar.css";

const menuIcons = {
  "product-design": Paintbrush,
  "network-security-solutions": Cpu,
  "ai-agents-workflow-automation": Code,
  "custom-ai-software-saas": Code,
  "web-mobile-app-development": Code,
  "startup-innovation-services": Cpu,
  "data-analytics-business-intelligence": Cpu,
};

// sub-service lines shown in the menu (same as the TAMx website menu)
const menuSubs = {
  "product-design": ["UI/UX", "UX Research", "Design Product"],
  "network-security-solutions": ["Enterprise Networking", "Data Center & SD-WAN", "Network Security", "Industrial Networking", "Disaster Recovery", "Network Consulting"],
  "ai-agents-workflow-automation": ["Large Language Model (LLM) Integration", "Computer Vision Solutions", "AI Maintenance & Monitoring", "Chatbot Development", "AI Agent Development"],
  "custom-ai-software-saas": [],
  "web-mobile-app-development": ["Custom Web Application Development", "Corporate Website Development", "Android App Development", "Cross-Platform App Development"],
  "startup-innovation-services": ["Product Strategy & Roadmapping", "MVP Development", "Startup Ideation & Validation", "AI Integration for Startups", "Go-to-Market (GTM) Strategy", "Technology Consulting"],
};

export default function Navbar() {
  return (
    <header className="nv">
      <nav className="nv-bar">
        <Link to="/services" className="nv-logo">
          <img src="/tamx-logo.png" alt="TAMx" />
        </Link>

        <ul className="nv-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>

          <li className="nv-item">
            <Link to="/services">
              Services <ChevronDown size={15} />
            </Link>

            <div className="nv-panel">
                <div className="nv-grid">
                  {services.map((s) => {
                    const Icon = menuIcons[s.slug] || Code;
                    return (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="nv-card">
                        <span className="nv-ico"><Icon size={20} /></span>
                        <span className="nv-txt">
                          <b>{s.title}</b>
                          <em>{s.desc}</em>
                          <span className="nv-subs">
                            {(menuSubs[s.slug] ?? (s.offerings || []).map((o) => o.t)).map((x) => <span key={x}>{x}</span>)}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
            </div>
          </li>

          <li><a href="#">Product <ChevronDown size={15} /></a></li>
          <li><a href="#">SFP 26</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Pricing</a></li>
        </ul>

        <a href="#contact" className="nv-contact">
          Contact <span><ArrowUpRight size={16} /></span>
        </a>
      </nav>
    </header>
  );
}
