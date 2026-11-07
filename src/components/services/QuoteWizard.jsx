import { useState } from "react";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { services } from "../../data/services.js";

const sizes = [
  { k: "Small", d: "A single feature, prototype or landing page", t: "2-4 weeks" },
  { k: "Medium", d: "A full product, website or system", t: "1-3 months" },
  { k: "Large", d: "A platform or multi-system project", t: "3-6 months" },
];
const times = ["As soon as possible", "Within 1-3 months", "Flexible"];
const input = "w-full rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm placeholder:text-foreground/40 outline-none focus:border-accent transition";
const pick = (on) => `w-full text-left rounded-xl border px-4 py-3 text-sm transition ${on ? "border-accent bg-accent/15" : "border-border hover:border-accent/50"}`;

export default function QuoteWizard({ service }) {
  const [step, setStep] = useState(0);
  const [svc, setSvc] = useState(service);
  const [size, setSize] = useState(1);
  const [when, setWhen] = useState(times[1]);
  const [f, setF] = useState({ name: "", email: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const title = services.find((s) => s.slug === svc)?.title;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          service: title,
          size: `${sizes[size].k} (${sizes[size].t})`,
          timeline: when,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setErr("Could not send your request. Please try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  if (sent)
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 size={44} className="text-lav mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Request received, {f.name.split(" ")[0]}!</h3>
        <p className="text-sm text-foreground/60 mb-5">Our team will contact you within one business day with a detailed quote.</p>
        <div className="rounded-xl border border-border p-4 text-sm text-left space-y-1">
          <p><span className="text-foreground/50">Service:</span> {title}</p>
          <p><span className="text-foreground/50">Size:</span> {sizes[size].k} (typically {sizes[size].t})</p>
          <p><span className="text-foreground/50">Timeline:</span> {when}</p>
        </div>
      </div>
    );

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex gap-2 mb-6">
        {["Service", "Scope", "Contact"].map((x, i) => (
          <div key={x} className="flex-1">
            <div className={`h-1 rounded-full mb-2 transition ${i <= step ? "bg-gradient-to-r from-primary to-lav" : "bg-foreground/10"}`} />
            <p className={`text-xs ${i === step ? "text-lav" : "text-foreground/40"}`}>{i + 1}. {x}</p>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-2">
          <p className="text-sm text-foreground/60 mb-3">Which service do you need?</p>
          {services.map((s) => <button key={s.slug} onClick={() => setSvc(s.slug)} className={pick(svc === s.slug)}>{s.title}</button>)}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm text-foreground/60 mb-3">How big is the project?</p>
            {sizes.map((x, i) => (
              <button key={x.k} onClick={() => setSize(i)} className={pick(size === i)}>
                <span className="font-medium">{x.k}</span> <span className="text-foreground/50">· {x.d}</span>
              </button>
            ))}
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-3">When do you want to start?</p>
            <div className="flex flex-wrap gap-2">
              {times.map((x) => <button key={x} onClick={() => setWhen(x)} className={`px-4 py-2 rounded-full text-sm border transition ${when === x ? "bg-accent/30 border-accent" : "border-border text-foreground/60"}`}>{x}</button>)}
            </div>
          </div>
          <p className="text-xs text-foreground/50">Typical delivery for a {sizes[size].k.toLowerCase()} project: {sizes[size].t} (indicative).</p>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={submit} className="space-y-4">
          <p className="text-sm text-foreground/60">{title} · {sizes[size].k} · {when}</p>
          <input required placeholder="Full name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={input} />
          <input required type="email" placeholder="Work email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={input} />
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-gradient-to-r from-primary to-accent py-3 font-medium hover:brightness-125 disabled:opacity-60 transition">{busy ? "Sending..." : "Get my quote"}</button>
        </form>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={() => setStep(step - 1)} disabled={step === 0} className="flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground disabled:opacity-0"><ArrowLeft size={16} /> Back</button>
        {step < 2 && <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 rounded-full bg-primary hover:bg-accent px-5 py-2 text-sm transition">Next <ArrowRight size={16} /></button>}
      </div>
    </div>
  );
}
