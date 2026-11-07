import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: (process.env.ALLOWED_ORIGIN || "http://localhost:5173").split(",") }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

const esc = (s = "") =>
  String(s).slice(0, 200).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// simple spam protection: max 5 requests per hour per IP
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 3600000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
};

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/quote", async (req, res) => {
  const { name, email, service, size, timeline } = req.body || {};
  if (!name || !/^\S+@\S+\.\S+$/.test(email || "")) {
    return res.status(400).json({ ok: false, error: "Invalid name or email" });
  }
  if (limited(req.ip)) return res.status(429).json({ ok: false, error: "Too many requests" });

  try {
    await transporter.sendMail({
      from: `"TAMx Website" <${process.env.SMTP_USER}>`,
      to: process.env.QUOTE_TO,
      replyTo: email,
      subject: `New quote request: ${service} (${name})`,
      html: `
        <h2>New quote request</h2>
        <p><b>Name:</b> ${esc(name)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Service:</b> ${esc(service)}</p>
        <p><b>Project size:</b> ${esc(size)}</p>
        <p><b>Timeline:</b> ${esc(timeline)}</p>`,
    });

    if (process.env.SEND_AUTOREPLY === "true") {
      await transporter.sendMail({
        from: `"TAMx Technologies" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We received your request",
        html: `<p>Hi ${esc(name)},</p>
               <p>Thank you for your interest in our <b>${esc(service)}</b> service. Our team will contact you within one business day.</p>
               <p>TAMx Technologies</p>`,
      });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ ok: false, error: "Email could not be sent" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Quote server running on http://localhost:${port}`));
