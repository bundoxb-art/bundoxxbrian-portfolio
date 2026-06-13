"use client";

import { useState } from "react";

const contacts = [
  {
    icon: "💬",
    label: "WhatsApp: +254 768 771 559",
    href: "https://wa.me/254768771559?text=Hi%20Brian!",
    wa: true,
  },
  {
    icon: "✉️",
    label: "Bundoxb@gmail.com",
    href: "mailto:Bundoxb@gmail.com",
    wa: false,
  },
  {
    icon: "🔗",
    label: "LinkedIn — Bundoxx The Brian",
    href: "https://www.linkedin.com/in/bundoxx-the-brian-778576348",
    wa: false,
  },
  {
    icon: "⌥",
    label: "GitHub — @bundoxb-art",
    href: "https://github.com/bundoxb-art",
    wa: false,
  },
  {
    icon: "📸",
    label: "Instagram — @BundoxxB",
    href: "https://instagram.com/BundoxxB",
    wa: false,
  },
  {
    icon: "🎵",
    label: "TikTok — @BundoxxB",
    href: "https://tiktok.com/@BundoxxB",
    wa: false,
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Freelance Project");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function sendWA() {
    const text = `Hi Brian! I am ${name || "Someone"}. ${message || "I saw your portfolio and want to discuss a project."}`;
    window.open(
      `https://wa.me/254768771559?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  async function sendMessage() {
    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and message");
      return;
    }
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("Couldn't send. Please try WhatsApp instead!");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#090c14",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* BIG CTA BOX */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            marginBottom: "3rem",
            background:
              "linear-gradient(135deg, rgba(0,245,200,0.06), rgba(139,92,246,0.05))",
            border: "1px solid rgba(0,245,200,0.2)",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "0.06em",
              marginBottom: "0.8rem",
              color: "#eef0f6",
            }}
          >
            Ready to{" "}
            <span style={{ color: "#00f5c8" }}>Work Together?</span>
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#9ba3bb",
              marginBottom: "1.8rem",
              maxWidth: "480px",
              margin: "0 auto 1.8rem",
            }}
          >
            Web app, mobile app, brand design, or VA work — fast,
            clean results from Mombasa, Kenya.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://wa.me/254768771559?text=Hi%20Brian!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#fff",
                background: "#25D366",
                padding: "0.85rem 1.8rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💬 WhatsApp Me Now
            </a>
            <a
              href="mailto:Bundoxb@gmail.com"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#05070d",
                background: "#00f5c8",
                padding: "0.85rem 1.8rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              ✉ Send Email
            </a>
          </div>
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.66rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#00f5c8",
            marginBottom: "0.5rem",
          }}
        >
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
          Get In Touch
        </div>

        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            letterSpacing: "0.04em",
            lineHeight: "1",
            marginBottom: "2.5rem",
            color: "#eef0f6",
          }}
        >
          All Contact Channels
        </h2>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — LINKS */}
          <div>
            <p
              style={{
                fontSize: "0.92rem",
                lineHeight: "1.8",
                color: "#9ba3bb",
                marginBottom: "1.5rem",
              }}
            >
              One tap to reach me. I respond fast. Available for
              freelance, full-time, VA work, and collaborations.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {contacts.map((c) => (
                <ContactLink key={c.label} contact={c} />
              ))}
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div
            style={{
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1.7rem",
            }}
          >
            <div
              className="form-row-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.9rem",
                marginBottom: "0.85rem",
              }}
            >
              <div>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.63rem",
                    color: "#5a6278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  style={{
                    width: "100%",
                    background: "#05070d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#eef0f6",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.87rem",
                    padding: "0.72rem 0.9rem",
                    borderRadius: "8px",
                    outline: "none",
                    minHeight: "44px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.63rem",
                    color: "#5a6278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@email.com"
                  style={{
                    width: "100%",
                    background: "#05070d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#eef0f6",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.87rem",
                    padding: "0.72rem 0.9rem",
                    borderRadius: "8px",
                    outline: "none",
                    minHeight: "44px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "0.85rem" }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.63rem",
                  color: "#5a6278",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  background: "#05070d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#eef0f6",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.87rem",
                  padding: "0.72rem 0.9rem",
                  borderRadius: "8px",
                  outline: "none",
                  minHeight: "44px",
                  cursor: "pointer",
                }}
              >
                <option>Freelance Project</option>
                <option>Data Entry / VA</option>
                <option>Brand / Logo Design</option>
                <option>Full-Time Role</option>
                <option>Collaboration</option>
              </select>
            </div>

            <div style={{ marginBottom: "0.85rem" }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.63rem",
                  color: "#5a6278",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, timeline, and budget…"
                rows={4}
                style={{
                  width: "100%",
                  background: "#05070d",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#eef0f6",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.87rem",
                  padding: "0.72rem 0.9rem",
                  borderRadius: "8px",
                  outline: "none",
                  resize: "none",
                  minHeight: "100px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(255, 59, 48, 0.1)",
                  border: "1px solid rgba(255, 59, 48, 0.3)",
                  color: "#ff3b30",
                  padding: "0.7rem 0.9rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  marginBottom: "0.8rem",
                }}
              >
                {error}
              </div>
            )}

            {sent && (
              <div
                style={{
                  background: "rgba(0, 245, 200, 0.1)",
                  border: "1px solid rgba(0, 245, 200, 0.3)",
                  color: "#00f5c8",
                  padding: "0.7rem 0.9rem",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  marginBottom: "0.8rem",
                }}
              >
                ✓ Message sent! I'll be in touch soon.
              </div>
            )}

            <button
              onClick={sendMessage}
              disabled={sending}
              style={{
                width: "100%",
                background: sending ? "#666" : "#00f5c8",
                color: sending ? "#999" : "#05070d",
                border: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.88rem",
                borderRadius: "50px",
                cursor: sending ? "not-allowed" : "pointer",
                fontWeight: "700",
                transition: "all 0.25s",
                marginBottom: "0.6rem",
              }}
              onMouseEnter={(e) => {
                if (!sending) {
                  e.currentTarget.style.background = "#00d9ad";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!sending) {
                  e.currentTarget.style.background = "#00f5c8";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {sending ? "Sending..." : "Send Message"}
            </button>

            <button
              onClick={sendWA}
              style={{
                width: "100%",
                background: "#25D366",
                color: "#fff",
                border: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.82rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.88rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.25s",
                marginBottom: "0.6rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1da851";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#25D366";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              💬 Send via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT LINK ──
function ContactLink({
  contact,
}: {
  contact: { icon: string; label: string; href: string; wa: boolean };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={contact.href}
      target={contact.href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.9rem",
        padding: "0.85rem 1rem",
        background: "#0d1220",
        border: hovered
          ? contact.wa
            ? "1px solid #25D366"
            : "1px solid #00f5c8"
          : contact.wa
          ? "1px solid rgba(37,211,102,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        textDecoration: "none",
        color: hovered
          ? contact.wa ? "#25D366" : "#00f5c8"
          : "#eef0f6",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.76rem",
        transition: "all 0.25s",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        minHeight: "44px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          background: contact.wa
            ? "rgba(37,211,102,0.1)"
            : "rgba(0,245,200,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.95rem",
          flexShrink: 0,
        }}
      >
        {contact.icon}
      </div>
      {contact.label}
    </a>
  );
}