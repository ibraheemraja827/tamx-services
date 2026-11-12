import { createElement, useState } from "react";
import { Layers, Cpu, Shield, Zap, Globe, Code2, CheckCircle2 } from "lucide-react";
import SectionNav from "../components/services/SectionNav.jsx";
import ServiceDemo, { demoMeta } from "../components/services/ServiceDemo.jsx";
import QuoteWizard from "../components/services/QuoteWizard.jsx";
import { useParams, Navigate, Link } from "react-router-dom";
import { services } from "../data/services.js";
import ServiceDiagram from "../components/services/ServiceDiagram.jsx";
import { overview } from "../data/overview.js";
import { details } from "../data/details.js";
import { processes } from "../data/process.js";
import { offerDetail, moreFaqs, demoNotes } from "../data/extra.js";
import { serviceIcons } from "../data/icons.js";
import Reveal from "../components/services/Reveal.jsx";

const card = "rounded-3xl border border-border bg-card backdrop-blur-sm";

const icons = [Layers, Cpu, Shield, Zap, Globe, Code2];

function Offerings({ s, dt, od }) {
  const [i, setI] = useState(0);
  const o = s.offerings[i];
  const inc = od?.[i]?.b || [0, 1, 2].map((n) => dt.deliver[(i + n) % dt.deliver.length]);
  return (
    <div className="grid lg:grid-cols-5 gap-5">
      <div className="lg:col-span-2 space-y-2">
        {s.offerings.map((x, k) => (
          <button key={x.t} onClick={() => setI(k)} className={`w-full text-left flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${i === k ? "border-accent bg-accent/15" : "border-border bg-card hover:border-accent/50"}`}>
            <span className="w-11 h-11 shrink-0 rounded-xl border border-border bg-foreground/10 text-lav flex items-center justify-center shadow-[0_0_24px_rgba(162,163,233,0.18)]">{createElement(icons[k % icons.length], { size: 20 })}</span>
            <span className="font-medium">{x.t}</span>
          </button>
        ))}
      </div>
      <div key={i} className={`${card} lg:col-span-3 p-8 fade-up`}>
        <h3 className="text-2xl font-semibold mb-3">{o.t}</h3>
        <p className="text-foreground/80 leading-relaxed mb-3">{o.d}</p>
        {od?.[i]?.p && <p className="text-sm text-foreground/60 leading-relaxed mb-6">{od[i].p}</p>}
        <p className="text-xs uppercase tracking-widest text-lav mb-3">Typically includes</p>
        <ul className="space-y-2 mb-6">
          {inc.map((x) => <li key={x} className="flex items-start gap-3 text-sm text-foreground/75"><CheckCircle2 size={18} className="text-lav shrink-0 mt-0.5" />{x}</li>)}
        </ul>
        <p className="text-xs uppercase tracking-widest text-lav mb-3">Ideal for</p>
        <div className="flex flex-wrap gap-2 mb-7">
          {s.industries.slice(0, 4).map((x) => <span key={x} className="px-3 py-1 rounded-full text-xs border border-accent/30 bg-accent/10 text-lav">{x}</span>)}
        </div>
        <a href="#contact" className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-medium hover:brightness-125 transition">Discuss this service</a>
      </div>
    </div>
  );
}

function Head({ tag, title, sub }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-12">
      <p className="text-xs tracking-widest uppercase text-lav mb-3">{tag}</p>
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h2>
      {sub && <p className="text-foreground/60">{sub}</p>}
    </Reveal>
  );
}

function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((f, i) => (
        <Reveal key={f.q} delay={i * 80}>
          <div className={card}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex justify-between items-center text-left px-6 py-4 font-medium">
              {f.q}
              <span className="text-lav text-xl ml-4">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="px-6 pb-5 text-sm text-foreground/60 leading-relaxed">{f.a}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/services" replace />;

  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const ov = overview[s.slug];
  const dt = details[s.slug];
  const steps = processes[s.slug];
  const Icon = serviceIcons[s.slug];

  return (
    <>
      <main key={s.slug} className="relative z-10">
        {/* HERO */}
        <section className="relative px-6 pt-20 pb-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-center lg:text-left">
              <div className="fade-up mb-6 flex justify-center lg:justify-start"><span className="flex w-14 h-14 rounded-2xl border border-border bg-foreground/10 items-center justify-center text-lav shadow-[0_0_40px_rgba(162,163,233,0.2)]"><Icon size={26} /></span></div>
              <nav className="fade-up flex items-center justify-center lg:justify-start gap-2 text-xs text-foreground/50 mb-6">
                <Link to="/services" className="hover:text-foreground">Services</Link><span>/</span><span className="text-lav">{s.title}</span>
              </nav>
              <span className="fade-up inline-block px-4 py-1.5 mb-6 rounded-full border border-lav/30 bg-accent/10 text-xs text-lav">
                {s.badge}
              </span>
              <h1 className="fade-up text-4xl md:text-5xl font-semibold leading-tight mb-6 text-foreground" style={{ animationDelay: "120ms" }}>
                {s.title}
              </h1>
              <p className="fade-up text-lg text-foreground/60 max-w-xl mx-auto lg:mx-0 mb-10" style={{ animationDelay: "240ms" }}>
                {s.desc}
              </p>
              <div className="fade-up flex flex-wrap justify-center lg:justify-start gap-4" style={{ animationDelay: "360ms" }}>
                <a href="#contact" className="px-8 py-3 rounded-full bg-primary hover:bg-accent font-medium transition">Get a Free Quote</a>
                <a href="#offer" className="px-8 py-3 rounded-full border border-border hover:bg-foreground/5 transition">Explore Offerings</a>
              </div>
              <div className="fade-up mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-foreground/60" style={{ animationDelay: "480ms" }}>
                {["Free consultation", "Reply within 24 hours", "NDA available"].map((x) => (
                  <span key={x} className="flex items-center gap-2"><span className="text-lav">✓</span>{x}</span>
                ))}
              </div>
            </div>
            <div className="fade-up flex justify-center" style={{ animationDelay: "300ms" }}>
              <ServiceDiagram slug={s.slug} />
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto mt-14 grid grid-cols-3 gap-4">
            {s.stats.map((st, i) => (
              <div key={st.l} className={`${card} py-6 px-3 text-center fade-up`} style={{ animationDelay: `${500 + i * 120}ms` }}>
                <p className="text-2xl md:text-3xl font-semibold text-foreground">{st.v}</p>
                <p className="text-xs md:text-sm text-foreground/60 mt-1">{st.l}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionNav />

        {/* OVERVIEW */}
        <section id="overview" className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-xs tracking-widest uppercase text-lav mb-3">Overview</p>
            <h2 className="text-2xl md:text-3xl font-semibold mb-5">{ov.h}</h2>
            {[...ov.p, ...dt.about].map((x) => <p key={x} className="text-foreground/60 leading-relaxed mb-4">{x}</p>)}
          </Reveal>
          <div className="space-y-4">
            {ov.pts.map((x, i) => (
              <Reveal key={x.t} delay={i * 120}>
                <div className={`${card} p-6 flex gap-4`}>
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/20 text-lav flex items-center justify-center font-semibold">{i + 1}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{x.t}</h3>
                    <p className="text-sm text-foreground/60">{x.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LIVE DEMO */}
        <section id="demo" className="max-w-6xl mx-auto px-6 py-16">
          <Head tag="Interactive demo" title={demoMeta[s.slug][0]} sub={demoMeta[s.slug][1]} />
          <Reveal><ServiceDemo slug={s.slug} /></Reveal>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {demoNotes[s.slug].map((n, i) => (
              <Reveal key={n} delay={i * 100}>
                <div className="flex gap-3 h-full rounded-xl border border-border bg-card px-5 py-4">
                  <span className="text-lav font-semibold">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm text-foreground/65">{n}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* OFFERINGS */}
        <section id="offer" className="max-w-6xl mx-auto px-6 py-16">
          <Head tag="What we offer" title={`${s.title} services`} sub="Select a service to see what is included and who it is for." />
          <Offerings key={s.slug} s={s} dt={dt} od={offerDetail[s.slug]} />
        </section>

        {/* DELIVERABLES + USE CASES */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2">
            <div className={`${card} p-8 h-full`}>
              <p className="text-xs tracking-widest uppercase text-lav mb-3">Deliverables</p>
              <h3 className="text-2xl font-semibold mb-6">What you get</h3>
              <ul className="space-y-4">
                {dt.deliver.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-foreground/75">
                    <CheckCircle2 size={20} className="text-lav shrink-0 mt-0.5" />{x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <div className="lg:col-span-3 space-y-4">
            <Reveal>
              <p className="text-xs tracking-widest uppercase text-lav mb-1">Use cases</p>
              <h3 className="text-2xl font-semibold mb-2">Where this works best</h3>
            </Reveal>
            {dt.cases.map((c, i) => (
              <Reveal key={c.t} delay={i * 120}>
                <div className={`${card} p-6 hover:border-accent/50 transition`}>
                  <h4 className="font-semibold mb-1">{c.t}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="max-w-6xl mx-auto px-6 py-16">
          <Head tag="Our process" title={`How we deliver ${s.title}`} sub="A clear, transparent four-step approach so you always know what is happening and what comes next." />
          <div className="grid md:grid-cols-2 gap-5">
            {steps.map((st, i) => (
              <Reveal key={st.t} delay={(i % 2) * 120}>
                <div className={`${card} p-7 h-full flex gap-5 hover:border-accent/50 transition duration-300`}>
                  <span className="text-5xl font-semibold leading-none text-lav/30">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{st.t}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed mb-4">{st.d}</p>
                    <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-lav">Output: {st.o}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className={`${card} mt-8 p-6 grid md:grid-cols-3 gap-6`}>
              {[["Weekly updates", "Short progress reports and demos every week."], ["Dedicated lead", "One point of contact who owns delivery."], ["Full documentation", "Clear handover so you are never locked in."]].map(([a, b]) => (
                <div key={a} className="flex gap-3">
                  <CheckCircle2 size={20} className="text-lav shrink-0 mt-0.5" />
                  <div><p className="font-medium text-sm">{a}</p><p className="text-xs text-foreground/55 mt-1">{b}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* STACK + INDUSTRIES */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className={`${card} p-8 h-full`}>
              <h3 className="text-xl font-semibold mb-5">Technologies we use</h3>
              <div className="flex flex-wrap gap-2">
                {s.stack.map((t) => <span key={t} className="px-3 py-1.5 rounded-full text-sm border border-border bg-foreground/5 text-foreground/75 hover:border-lav/50 transition">{t}</span>)}
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className={`${card} p-8 h-full`}>
              <h3 className="text-xl font-semibold mb-5">Industries we serve</h3>
              <div className="flex flex-wrap gap-2">
                {s.industries.map((t) => <span key={t} className="px-3 py-1.5 rounded-full text-sm border border-lav/20 bg-accent/10 text-lav2">{t}</span>)}
              </div>
            </div>
          </Reveal>
        </section>

        {/* WHY TAMX */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <Head tag="Why TAMx" title="Why businesses choose us" />
          <div className="grid md:grid-cols-3 gap-5">
            {s.benefits.map((b, i) => (
              <Reveal key={b.t} delay={i * 130}>
                <div className="h-full rounded-xl border border-border bg-card p-7 transition duration-300">
                  <div className="w-10 h-10 mb-4 rounded-full bg-accent/20 text-lav flex items-center justify-center"><CheckCircle2 size={20} /></div>
                  <h3 className="font-semibold mb-2">{b.t}</h3>
                  <p className="text-sm text-foreground/60">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-6xl mx-auto px-6 py-16">
          <Head tag="FAQ" title="Frequently asked questions" sub="Everything you need to know before getting started." />
          <FAQ faqs={[...s.faqs, ...moreFaqs[s.slug]]} />
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 rounded-xl border border-border bg-card p-8 md:p-12">
              <div>
                <p className="text-xs tracking-widest uppercase text-lav mb-3">Get a quote</p>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to start with {s.title}?</h2>
                <p className="text-foreground/65 mb-8">Tell us about your project. Our team will reply within one business day with next steps.</p>
                <ul className="space-y-3 text-sm text-foreground/75">
                  {["Free initial consultation", "Clear scope, timeline and estimate", "No obligation"].map((x) => (
                    <li key={x} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-lav" />{x}</li>
                  ))}
                </ul>
                <div className="mt-8 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-lav">What happens next</p>
                  {[["We review your request", "Within one business day."], ["Discovery call", "A short call to confirm scope and goals."], ["Detailed proposal", "Timeline, approach and estimate for your approval."]].map(([a, b], i) => (
                    <div key={a} className="flex gap-4">
                      <span className="w-7 h-7 shrink-0 rounded-full bg-accent/25 text-lav text-xs flex items-center justify-center">{i + 1}</span>
                      <div><p className="text-sm font-medium">{a}</p><p className="text-xs text-foreground/55">{b}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteWizard service={s.slug} />
            </div>
          </Reveal>
        </section>

        {/* RELATED */}
        <section className="max-w-6xl mx-auto px-6 pb-10">
          <Reveal><h2 className="text-2xl font-semibold mb-8">Explore more services</h2></Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <Link to={`/services/${o.slug}`} className={`${card} block h-full p-6 hover:border-accent/50 transition duration-300`}>
                  <h3 className="font-semibold mb-2">{o.title}</h3>
                  <p className="text-sm text-foreground/60 line-clamp-3">{o.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
