import { useEffect, useRef } from "react";

const R = () => Math.random() * 2 - 1;
const rz = (p, a) => [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a), p[2]];

const shapes = {
  // glass-like frames with dense edge slabs
  cage: () => {
    const p = [];
    for (let i = 0; i < 700; i++) p.push([R() * 1.1, R() * 1.1, R() * 1.1]);
    for (let i = 0; i < 600; i++) p.push([0.1 + R() * 0.07, R() * 1.4, R() * 0.5]);
    [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => {
      for (let i = 0; i < 160; i++) p.push([sx * (0.95 + Math.random() * 0.2), sy * (0.7 + Math.random() * 0.4), R() * 0.4]);
    });
    return p;
  },
  // orbit rings
  rings: () => {
    const p = [];
    for (let k = 0; k < 3; k++)
      for (let i = 0; i < 600; i++) {
        const a = Math.random() * 6.283, r = 0.9 + k * 0.22;
        p.push(rz([Math.cos(a) * r, Math.sin(a) * r * 0.5, Math.sin(a) * 0.6 * (k - 1) + R() * 0.01], k * 0.55));
      }
    for (let i = 0; i < 300; i++) p.push([R() * 1.4, R() * 1.4, R() * 1.4]);
    return p;
  },
  // vertical spine with tilted slabs
  spine: () => {
    const p = [];
    for (let i = 0; i < 600; i++) p.push([R() * 0.02, R() * 1.4, R() * 0.03]);
    [-0.8, 0, 0.8].forEach((y) => {
      for (let i = 0; i < 550; i++) {
        const x = -Math.random() * 1.3;
        p.push([x, y + x * -0.25 + R() * 0.16, R() * 0.6]);
      }
    });
    return p;
  },
  // stacked lattice layers
  layers: () => {
    const p = [];
    [-0.6, 0, 0.6].forEach((y) => {
      for (let i = 0; i < 16; i++)
        for (let j = 0; j < 16; j++) p.push([-1.2 + i * 0.16, y + Math.sin(i * 0.8 + j * 0.5) * 0.04, -1.2 + j * 0.16]);
    });
    for (let i = 0; i < 500; i++) p.push([R() * 1.2, R() * 0.8, R() * 1.2]);
    return p;
  },
  // dotted sphere with ring
  sphere: () => {
    const p = [], N = 1200;
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), t = i * 2.399963;
      p.push([Math.cos(t) * r, y, Math.sin(t) * r]);
    }
    for (let i = 0; i < 500; i++) {
      const a = Math.random() * 6.283;
      p.push([Math.cos(a) * 1.45, R() * 0.03, Math.sin(a) * 1.45]);
    }
    return p;
  },
  // double helix
  helix: () => {
    const p = [];
    for (let s = 0; s < 2; s++)
      for (let i = 0; i < 700; i++) {
        const t = R() * 1.4;
        p.push([Math.cos(t * 6 + s * Math.PI) * 0.6, t, Math.sin(t * 6 + s * Math.PI) * 0.6]);
      }
    for (let i = 0; i < 160; i++) {
      const t = R() * 1.4, f = Math.random();
      p.push([Math.cos(t * 6) * 0.6 * (1 - 2 * f), t, Math.sin(t * 6) * 0.6 * (1 - 2 * f)]);
    }
    for (let i = 0; i < 300; i++) p.push([R() * 1.3, R() * 1.5, R() * 1.3]);
    return p;
  },
  // data wave surface
  wave: () => {
    const p = [];
    for (let i = 0; i < 46; i++)
      for (let j = 0; j < 46; j++) {
        const x = -1.4 + i * 0.061, z = -1.4 + j * 0.061;
        p.push([x, Math.sin(x * 3) * Math.cos(z * 3) * 0.28 - 0.1, z]);
      }
    return p;
  },
};

const byService = {
  "product-design": "cage",
  "network-security-solutions": "rings",
  "ai-agents-workflow-automation": "spine",
  "custom-ai-software-saas": "layers",
  "web-mobile-app-development": "sphere",
  "startup-innovation-services": "helix",
  "data-analytics-business-intelligence": "wave",
};

export default function ParticleBackground({ slug }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const pts = shapes[byService[slug] || "rings"]();
    let w, h, raf, a = 0;

    const resize = () => {
      const d = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * d;
      c.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      a += 0.003;
      const ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(0.4), st = Math.sin(0.4);
      const cx = w > 900 ? w * 0.24 : w / 2, cy = h * 0.5, S = Math.min(w, h) * 0.5;
      for (const p of pts) {
        const x = p[0] * ca + p[2] * sa, z = -p[0] * sa + p[2] * ca;
        const y2 = p[1] * ct - z * st, z2 = p[1] * st + z * ct;
        const f = 2.6 / (2.6 - z2 * 0.8);
        const al = Math.min(0.85, Math.max(0.12, 0.25 + 0.55 * ((z2 + 1.4) / 2.8)));
        ctx.fillStyle = `rgba(122,124,238,${al})`;
        ctx.fillRect(cx + x * S * f, cy - y2 * S * f, 1.7 * f, 1.7 * f);
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [slug]);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}
