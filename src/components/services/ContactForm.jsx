import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { services } from "../../data/services.js";

const input = "w-full rounded-xl border border-border bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition";

export default function ContactForm({ service }) {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: yahan apni API / EmailJS / Formspree ka call lagayein
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-border bg-card p-10">
        <CheckCircle2 size={44} className="text-lav mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
        <p className="text-sm text-foreground/60">We received your message and will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required placeholder="Full name" className={input} />
        <input required type="email" placeholder="Work email" className={input} />
      </div>
      <select defaultValue={service} className={`${input} appearance-none`}>
        {services.map((s) => <option key={s.slug} className="bg-[#0a0a0a]">{s.title}</option>)}
      </select>
      <textarea required rows={4} placeholder="Tell us about your project" className={input} />
      <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-3 font-medium hover:brightness-125 transition">
        Send Message <Send size={16} />
      </button>
    </form>
  );
}
