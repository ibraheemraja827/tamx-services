const S = "#a2a3e9";
const F = "rgba(105,106,172,0.16)";
const T = { fill: "#e3e3f8", fontSize: 12, fontFamily: "Inter, sans-serif", textAnchor: "middle" };

const Node = ({ x, y, r = 24, label, d = 0 }) => (
  <g className="dg-pulse" style={{ animationDelay: `${d}s` }}>
    <circle cx={x} cy={y} r={r} fill={F} stroke={S} />
    <text x={x} y={y + 4} {...T}>{label}</text>
  </g>
);
const Link = ({ x1, y1, x2, y2 }) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={S} strokeWidth="1.5" className="dg-flow" />;

function Design() {
  return (
    <g>
      <rect x="50" y="60" width="300" height="270" rx="16" fill={F} stroke={S} />
      {[74, 90, 106].map((x) => <circle key={x} cx={x} cy="80" r="4" fill={S} />)}
      <line x1="50" y1="98" x2="350" y2="98" stroke={S} opacity=".3" />
      <rect x="66" y="114" width="70" height="200" rx="8" fill="rgba(162,163,233,.12)" />
      <rect x="150" y="114" width="184" height="84" rx="10" fill="url(#dg-g)" className="dg-pulse" />
      {[150, 214, 278].map((x, i) => <rect key={x} x={x} y="212" width="56" height="64" rx="8" fill={F} stroke={S} className="dg-pulse" style={{ animationDelay: `${i * 0.4}s` }} />)}
      {[160, 182, 204].map((x, i) => <circle key={x} cx={x} cy="304" r="8" fill={["#a2a3e9", "#a78bfa", "#38bdf8"][i]} />)}
      <g className="dg-float"><polygon points="300,250 300,284 310,275 318,292 324,289 316,272 328,270" fill="#fff" stroke={S} /></g>
    </g>
  );
}

function Network() {
  const pos = [[335, 200, "VPN"], [267, 317, "DC"], [133, 317, "WAN"], [65, 200, "IoT"], [133, 83, "DR"], [267, 83, "FW"]];
  return (
    <g>
      <circle cx="200" cy="200" r="150" fill="none" stroke={S} opacity=".3" strokeDasharray="4 8" className="dg-orbit" />
      {pos.map(([x, y], i) => <Link key={i} x1="200" y1="200" x2={x} y2={y} />)}
      {pos.map(([x, y, l], i) => <Node key={l} x={x} y={y} label={l} d={i * 0.3} />)}
      <path d="M200 150 L240 165 V205 C240 232 222 248 200 256 C178 248 160 232 160 205 V165 Z" fill="url(#dg-g)" stroke="#c7c8f2" strokeWidth="2" className="dg-pulse" />
      <path d="M182 205 l14 14 l24 -28" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Agent() {
  const pos = [[200, 50, "LLM"], [330, 110, "Email"], [330, 290, "CRM"], [70, 290, "DB"], [70, 110, "Chat"]];
  return (
    <g>
      <circle cx="200" cy="200" r="160" fill="none" stroke={S} opacity=".25" strokeDasharray="3 9" className="dg-orbit" />
      {pos.map(([x, y], i) => <Link key={i} x1="200" y1="200" x2={x} y2={y} />)}
      {pos.map(([x, y, l], i) => <Node key={l} x={x} y={y} r={28} label={l} d={i * 0.35} />)}
      <circle cx="200" cy="200" r="48" fill="url(#dg-g)" stroke="#c7c8f2" strokeWidth="2" className="dg-pulse" />
      <text x="200" y="196" {...T} fontSize="15" fontWeight="700">AI</text>
      <text x="200" y="214" {...T} fontSize="11">Agent</text>
    </g>
  );
}

function Stack() {
  const layer = (y, label, d) => (
    <g className="dg-float" style={{ animationDelay: `${d}s` }}>
      <polygon points={`200,${y} 330,${y + 50} 200,${y + 100} 70,${y + 50}`} fill={F} stroke={S} strokeWidth="1.5" />
      <text x="200" y={y + 54} {...T} fontSize="14" fontWeight="600">{label}</text>
    </g>
  );
  return (
    <g>
      <Link x1="352" y1="70" x2="352" y2="300" />
      {layer(180, "Data & Cloud", 0.6)}
      {layer(120, "API & Backend", 0.3)}
      {layer(60, "AI / Product UI", 0)}
      <circle cx="352" cy="70" r="5" fill="#c7c8f2" className="dg-pulse" />
      <circle cx="352" cy="300" r="5" fill="#c7c8f2" className="dg-pulse" />
    </g>
  );
}

function WebMobile() {
  return (
    <g>
      <rect x="30" y="100" width="250" height="170" rx="12" fill={F} stroke={S} />
      <rect x="10" y="272" width="290" height="10" rx="5" fill="rgba(162,163,233,.35)" />
      <rect x="46" y="116" width="218" height="22" rx="6" fill="rgba(162,163,233,.2)" />
      <rect x="46" y="150" width="100" height="60" rx="8" fill="url(#dg-g)" className="dg-pulse" />
      {[0, 1, 2].map((i) => <rect key={i} x="160" y={152 + i * 20} width="100" height="9" rx="4" fill={S} opacity=".6" className="dg-line" style={{ animationDelay: `${i * 0.5}s` }} />)}
      {[0, 1].map((i) => <rect key={i} x="46" y={224 + i * 18} width="214" height="8" rx="4" fill="rgba(199,210,254,.35)" className="dg-line" style={{ animationDelay: `${i * 0.4}s` }} />)}
      <g className="dg-float">
        <rect x="250" y="150" width="104" height="190" rx="18" fill="#0b0d22" stroke={S} strokeWidth="2" />
        <rect x="262" y="172" width="80" height="50" rx="8" fill="url(#dg-g)" />
        {[0, 1, 2].map((i) => <rect key={i} x="262" y={236 + i * 22} width="80" height="12" rx="5" fill={F} stroke={S} />)}
        <circle cx="302" cy="160" r="3" fill={S} />
      </g>
    </g>
  );
}

function Startup() {
  const h = [40, 75, 115, 160, 205];
  return (
    <g>
      <line x1="50" y1="320" x2="360" y2="320" stroke={S} opacity=".5" />
      {h.map((v, i) => <rect key={i} x={65 + i * 58} y={320 - v} width="38" height={v} rx="6" fill={i === 4 ? "url(#dg-g)" : F} stroke={S} className="dg-bar" style={{ animationDelay: `${i * 0.25}s` }} />)}
      <polyline points="84,255 142,225 200,185 258,140 316,100" fill="none" stroke="#c7c8f2" strokeWidth="2" className="dg-flow" />
      <g className="dg-float">
        <path d="M335 40 C352 56 352 80 335 96 C318 80 318 56 335 40 Z" fill="#fff" stroke={S} strokeWidth="2" />
        <circle cx="335" cy="65" r="6" fill={S} />
        <path d="M335 96 L329 112 L335 106 L341 112 Z" fill="#e3e3f8" />
      </g>
      {[[70, 80], [120, 50], [250, 60], [200, 110]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#c7c8f2" className="dg-pulse" style={{ animationDelay: `${i * 0.5}s` }} />)}
    </g>
  );
}

function Data() {
  const h = [60, 95, 80, 130, 110, 165];
  return (
    <g>
      <rect x="40" y="60" width="320" height="270" rx="16" fill={F} stroke={S} />
      <line x1="64" y1="300" x2="336" y2="300" stroke={S} opacity=".4" />
      {h.map((v, i) => <rect key={i} x={74 + i * 42} y={300 - v} width="26" height={v} rx="5" fill="url(#dg-g)" className="dg-bar" style={{ animationDelay: `${i * 0.2}s` }} />)}
      <polyline points="87,230 129,200 171,215 213,165 255,185 297,125" fill="none" stroke="#e3e3f8" strokeWidth="2.5" className="dg-flow" />
      <circle cx="297" cy="125" r="5" fill="#e3e3f8" className="dg-pulse" />
      <circle cx="90" cy="100" r="22" fill="none" stroke="rgba(162,163,233,.25)" strokeWidth="8" />
      <circle cx="90" cy="100" r="22" fill="none" stroke={S} strokeWidth="8" strokeDasharray="90 140" transform="rotate(-90 90 100)" />
      <rect x="130" y="84" width="90" height="10" rx="5" fill="rgba(199,210,254,.4)" />
      <rect x="130" y="104" width="60" height="8" rx="4" fill="rgba(199,210,254,.25)" />
    </g>
  );
}

const map = {
  "product-design": Design,
  "network-security-solutions": Network,
  "ai-agents-workflow-automation": Agent,
  "custom-ai-software-saas": Stack,
  "web-mobile-app-development": WebMobile,
  "startup-innovation-services": Startup,
  "data-analytics-business-intelligence": Data,
};

export default function ServiceDiagram({ slug }) {
  const Diagram = map[slug] || Network;
  return (
    <div className="relative w-full max-w-[460px] aspect-square">
      <div className="absolute inset-6 rounded-full bg-primary/20 blur-3xl" />
      <svg viewBox="0 0 400 400" className="relative w-full h-full">
        <defs>
          <linearGradient id="dg-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3e3f7e" stopOpacity=".9" />
            <stop offset="100%" stopColor="#696aac" stopOpacity=".55" />
          </linearGradient>
        </defs>
        <Diagram />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-5 py-2 rounded-2xl border border-border bg-background/70 backdrop-blur">
        <img src="/tamx-logo.png" alt="TAMx" className="h-7 w-auto" />
      </div>
      <style>{`
        .dg-flow{stroke-dasharray:6 8;animation:dgflow 1.6s linear infinite}
        @keyframes dgflow{to{stroke-dashoffset:-28}}
        .dg-pulse{transform-box:fill-box;transform-origin:center;animation:dgp 2.6s ease-in-out infinite}
        @keyframes dgp{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.7}}
        .dg-orbit{transform-origin:200px 200px;animation:dgo 30s linear infinite}
        @keyframes dgo{to{transform:rotate(360deg)}}
        .dg-float{animation:dgf 5s ease-in-out infinite}
        @keyframes dgf{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        .dg-bar{transform-box:fill-box;transform-origin:bottom;animation:dgb 3.2s ease-in-out infinite}
        @keyframes dgb{0%,100%{transform:scaleY(.65)}50%{transform:scaleY(1)}}
        .dg-line{transform-box:fill-box;transform-origin:left;animation:dgl 3s ease-in-out infinite}
        @keyframes dgl{0%,100%{transform:scaleX(.55)}50%{transform:scaleX(1)}}
      `}</style>
    </div>
  );
}
