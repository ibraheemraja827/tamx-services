import { useState } from "react";

const box = "rounded-2xl border border-border bg-card p-5 md:p-6";
const btn = (on) =>
  `px-4 py-2 rounded-full text-sm border transition ${on ? "bg-accent/30 border-accent text-foreground" : "border-border text-foreground/60 hover:text-foreground hover:border-accent/50"}`;

/* ---------- AI Agents: chat ---------- */
function Chat() {
  const [m, setM] = useState([{ r: "bot", t: "Hi! I am a demo TAMx agent. Give me a task: qualify a lead, process an invoice or answer a support ticket." }]);
  const [v, setV] = useState("");
  const [busy, setBusy] = useState(false);

  const send = (text) => {
    if (!text.trim() || busy) return;
    const q = text.toLowerCase();
    setM((x) => [...x, { r: "me", t: text }]);
    setV("");
    setBusy(true);
    const a = q.includes("lead")
      ? "Lead scored 82/100. I drafted a personalised follow-up email and added the contact to your CRM."
      : q.includes("invoice")
      ? "Invoice #1042 matched with its purchase order, amount verified and sent to finance for approval."
      : q.includes("support") || q.includes("ticket")
      ? "Ticket tagged as Billing and answered from your help docs. It escalates to a human only if the customer is unhappy."
      : "I can qualify leads, process invoices and answer support tickets. Try one of those!";
    setTimeout(() => { setM((x) => [...x, { r: "bot", t: a }]); setBusy(false); }, 900);
  };

  return (
    <div className={box}>
      <div className="h-60 overflow-y-auto space-y-3 mb-4 pr-1">
        {m.map((x, i) => (
          <div key={i} className={`flex ${x.r === "me" ? "justify-end" : ""}`}>
            <span className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${x.r === "me" ? "bg-accent/30" : "bg-foreground/10"}`}>{x.t}</span>
          </div>
        ))}
        {busy && <p className="text-xs text-foreground/50">Agent is working...</p>}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {["Qualify a new lead", "Process an invoice", "Answer a support ticket"].map((c) => (
          <button key={c} onClick={() => send(c)} className={btn(false)}>{c}</button>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(v)} placeholder="Type a task..." className="flex-1 rounded-xl border border-border bg-foreground/5 px-4 py-2 text-sm outline-none focus:border-accent" />
        <button onClick={() => send(v)} className="px-5 rounded-xl bg-primary hover:bg-accent transition">Send</button>
      </div>
    </div>
  );
}

/* ---------- Network: nodes + threat simulation ---------- */
const nodes = [
  { n: "Firewall", d: "Filters traffic and blocks known threats at the edge before they reach your systems." },
  { n: "SD-WAN", d: "Routes branch traffic over the best available link and switches automatically if one fails." },
  { n: "Data Center", d: "Redundant core infrastructure with automatic failover and daily backups." },
  { n: "Branch Office", d: "Secure site-to-site VPN into headquarters with centralized policies." },
  { n: "IoT / OT", d: "Isolated segment so machines and sensors can never expose your business network." },
];
function Net() {
  const [sel, setSel] = useState(0);
  const [log, setLog] = useState([]);
  const sim = () => {
    setLog([]);
    ["Suspicious login detected at Branch Office", "Firewall blocked the source IP", "Traffic rerouted through the SD-WAN backup link", "Incident logged and security team alerted"].forEach((t, i) =>
      setTimeout(() => setLog((l) => [...l, t]), i * 900)
    );
  };
  return (
    <div className={`${box} grid md:grid-cols-2 gap-6`}>
      <div>
        <div className="flex flex-wrap gap-2 mb-5">
          {nodes.map((x, i) => <button key={x.n} onClick={() => setSel(i)} className={btn(sel === i)}>{x.n}</button>)}
        </div>
        <h4 className="font-semibold text-lg mb-2">{nodes[sel].n}</h4>
        <p className="text-sm text-foreground/60 leading-relaxed">{nodes[sel].d}</p>
      </div>
      <div>
        <button onClick={sim} className="mb-4 px-5 py-2 rounded-full bg-primary hover:bg-accent text-sm transition">Simulate a threat</button>
        <ul className="space-y-2 text-sm min-h-[110px]">
          {log.map((l, i) => <li key={i} className="flex gap-2 text-foreground/75"><span className="text-lav">●</span>{l}</li>)}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Product Design: before / after ---------- */
function Ui({ good }) {
  return good ? (
    <div className="h-64 rounded-xl p-5 bg-[#0b0d22] border border-accent/30">
      <div className="flex justify-between items-center mb-5"><div className="h-4 w-24 rounded bg-lav/70" /><div className="h-8 w-24 rounded-full bg-gradient-to-r from-primary to-accent" /></div>
      <div className="h-6 w-2/3 rounded bg-foreground/80 mb-2" /><div className="h-3 w-1/2 rounded bg-foreground/30 mb-6" />
      <div className="grid grid-cols-3 gap-3">{[0, 1, 2].map((i) => <div key={i} className="h-20 rounded-xl border border-border bg-card" />)}</div>
    </div>
  ) : (
    <div className="h-64 rounded-xl p-5 bg-zinc-300">
      <div className="flex flex-wrap gap-1 mb-3">{[40, 70, 30, 55, 45, 60, 35, 50].map((w, i) => <div key={i} className="h-5 rounded-sm bg-zinc-500" style={{ width: w }} />)}</div>
      {[100, 90, 95].map((w, i) => <div key={i} className="h-3 rounded bg-zinc-400 mb-1" style={{ width: `${w}%` }} />)}
      <div className="grid grid-cols-5 gap-1 mt-3">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-9 bg-zinc-400" />)}</div>
      <div className="h-6 w-16 bg-red-400 mt-3" />
    </div>
  );
}
function BeforeAfter() {
  const [v, setV] = useState(50);
  return (
    <div className={box}>
      <div className="relative">
        <Ui good={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}><Ui good /></div>
        <span className="absolute top-2 right-3 text-xs bg-black/60 px-2 py-1 rounded">Before</span>
        <span className="absolute top-2 left-3 text-xs bg-black/60 px-2 py-1 rounded">After</span>
        <div className="absolute inset-y-0 w-0.5 bg-lav" style={{ left: `${v}%` }} />
      </div>
      <input type="range" min="0" max="100" value={v} onChange={(e) => setV(+e.target.value)} className="w-full mt-4 accent-[#696aac]" />
      <p className="text-xs text-foreground/50 mt-2">Drag the slider to compare a cluttered interface with a TAMx redesign.</p>
    </div>
  );
}

/* ---------- Web & Mobile: device switcher ---------- */
function Devices() {
  const [d, setD] = useState("Laptop");
  const w = { Laptop: "100%", Tablet: "62%", Phone: "30%" }[d];
  const cols = d === "Phone" ? "grid-cols-1" : d === "Tablet" ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className={box}>
      <div className="flex gap-2 mb-5">{["Laptop", "Tablet", "Phone"].map((x) => <button key={x} onClick={() => setD(x)} className={btn(d === x)}>{x}</button>)}</div>
      <div className="flex justify-center min-h-[240px]">
        <div style={{ width: w }} className="transition-all duration-500 rounded-2xl border border-accent/40 bg-[#0b0d22] p-4 h-fit">
          <div className="flex justify-between mb-3"><div className="h-3 w-1/4 rounded bg-accent/60" /><div className="h-3 w-1/6 rounded bg-foreground/20" /></div>
          <div className="h-16 rounded-lg bg-gradient-to-r from-primary/60 to-accent/40 mb-3" />
          <div className={`grid gap-3 ${cols}`}>{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-14 rounded-lg bg-foreground/10" />)}</div>
        </div>
      </div>
      <p className="text-xs text-foreground/50 mt-3">Same product, layout adapts automatically to every screen.</p>
    </div>
  );
}

/* ---------- Data: filterable dashboard ---------- */
const sales = { Q1: [40, 55, 30, 65], Q2: [60, 45, 70, 50], Q3: [75, 80, 55, 90], Q4: [95, 70, 85, 100] };
const regions = ["North", "South", "East", "West"];
function Dash() {
  const [q, setQ] = useState("Q4");
  const [r, setR] = useState("All");
  const vals = sales[q];
  const total = r === "All" ? vals.reduce((a, b) => a + b, 0) : vals[regions.indexOf(r)];
  return (
    <div className={box}>
      <div className="flex flex-wrap gap-2 mb-5">
        {Object.keys(sales).map((x) => <button key={x} onClick={() => setQ(x)} className={btn(q === x)}>{x}</button>)}
        <span className="w-px bg-border mx-1" />
        {["All", ...regions].map((x) => <button key={x} onClick={() => setR(x)} className={btn(r === x)}>{x}</button>)}
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-border p-5"><p className="text-xs text-foreground/50">Sales index ({r})</p><p className="text-4xl font-bold mt-1">{total}</p><p className="text-xs text-lav mt-1">{q} demo data</p></div>
        <div className="md:col-span-2 flex items-end gap-4 h-40 rounded-xl border border-border p-5">
          {vals.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className={`w-full rounded-t-md bg-gradient-to-t from-primary to-accent transition-all duration-500 ${r === "All" || r === regions[i] ? "opacity-100" : "opacity-25"}`} style={{ height: `${v}%` }} />
              <span className="text-xs mt-2 text-foreground/60">{regions[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- SaaS: stack explorer ---------- */
const layers = [
  { n: "AI / Product UI", d: "The interface users touch, plus AI features such as smart search, recommendations and copilots." },
  { n: "API & Backend", d: "Business logic, authentication, roles and billing exposed through secure, documented APIs." },
  { n: "Data & Cloud", d: "Multi-tenant databases, storage, queues and scalable cloud infrastructure." },
  { n: "Security & DevOps", d: "CI/CD, monitoring, backups and access controls that keep the product reliable." },
];
function Stack() {
  const [i, setI] = useState(0);
  return (
    <div className={`${box} grid md:grid-cols-2 gap-6`}>
      <div className="space-y-2">
        {layers.map((l, k) => (
          <button key={l.n} onClick={() => setI(k)} className={`w-full text-left rounded-xl border px-5 py-4 transition ${i === k ? "border-accent bg-accent/15 translate-x-2" : "border-border hover:border-accent/50"}`}>{l.n}</button>
        ))}
      </div>
      <div key={i} className="fade-up self-center"><h4 className="text-xl font-semibold mb-2">{layers[i].n}</h4><p className="text-foreground/60 leading-relaxed">{layers[i].d}</p></div>
    </div>
  );
}

/* ---------- Startup: MVP planner ---------- */
const feats = [["User accounts & login", 1], ["Core product feature", 3], ["Payments & subscriptions", 1.5], ["Admin dashboard", 1.5], ["AI-powered feature", 2]];
function Mvp() {
  const [on, setOn] = useState([0, 1]);
  const toggle = (i) => setOn((x) => (x.includes(i) ? x.filter((k) => k !== i) : [...x, i]));
  const weeks = 2 + on.reduce((a, i) => a + feats[i][1], 0);
  return (
    <div className={`${box} grid md:grid-cols-2 gap-6`}>
      <div className="space-y-2">
        {feats.map(([n], i) => (
          <button key={n} onClick={() => toggle(i)} className={`w-full text-left flex items-center gap-3 rounded-xl border px-4 py-3 transition ${on.includes(i) ? "border-accent bg-accent/15" : "border-border"}`}>
            <span className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${on.includes(i) ? "bg-accent border-accent" : "border-border"}`}>{on.includes(i) ? "✓" : ""}</span>{n}
          </button>
        ))}
      </div>
      <div className="self-center">
        <p className="text-xs text-foreground/50 mb-1">Indicative MVP timeline</p>
        <p className="text-5xl font-bold mb-4">~{weeks} weeks</p>
        <div className="h-3 rounded-full bg-foreground/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary to-lav transition-all duration-500" style={{ width: `${Math.min(100, (weeks / 11) * 100)}%` }} /></div>
        <p className="text-xs text-foreground/50 mt-3">Includes 2 weeks for discovery and setup. Final scope is agreed after a consultation.</p>
      </div>
    </div>
  );
}

const demos = {
  "ai-agents-workflow-automation": Chat,
  "network-security-solutions": Net,
  "product-design": BeforeAfter,
  "web-mobile-app-development": Devices,
  "data-analytics-business-intelligence": Dash,
  "custom-ai-software-saas": Stack,
  "startup-innovation-services": Mvp,
};

export const demoMeta = {
  "ai-agents-workflow-automation": ["Talk to an AI agent", "Give the agent a task and watch how it responds."],
  "network-security-solutions": ["Explore a secure network", "Click each layer, then simulate a threat to see how it is handled."],
  "product-design": ["See the design difference", "Drag the slider to compare a cluttered UI with a redesigned one."],
  "web-mobile-app-development": ["One product, every screen", "Switch devices to see the layout adapt."],
  "data-analytics-business-intelligence": ["Play with a live dashboard", "Filter by quarter and region to see the numbers change."],
  "custom-ai-software-saas": ["Explore the product stack", "Click a layer to see what it does inside a SaaS product."],
  "startup-innovation-services": ["Plan your MVP", "Pick the features you need and see an indicative timeline."],
};

export default function ServiceDemo({ slug }) {
  const Demo = demos[slug];
  return Demo ? <Demo /> : null;
}
