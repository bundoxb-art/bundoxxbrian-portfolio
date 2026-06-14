"use client";

import { useState } from "react";

// 💰 EDIT YOUR PRICES HERE (in KES)
const services = [
  {
    icon: "💻",
    title: "Web Development",
    desc: "Fast, responsive websites & web apps built with React and Next.js.",
    tiers: [
      { name: "Starter", price: "15,000", unit: "", desc: "1-page site · Responsive · 3-5 days" },
      { name: "Business", price: "35,000", unit: "", desc: "Up to 5 pages · SEO · CMS-ready · 1-2 wks", popular: true },
      { name: "Custom App", price: "80,000", unit: "+", desc: "Database · Auth · M-Pesa · 3-6 wks" },
    ],
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    desc: "Cross-platform apps with React Native & Expo — ready for Android & iOS.",
    tiers: [
      { name: "MVP", price: "60,000", unit: "+", desc: "Core features · Android APK · 2-3 wks" },
      { name: "Full App", price: "130,000", unit: "+", desc: "iOS + Android · Backend · 4-6 wks", popular: true },
    ],
  },
  {
    icon: "🎨",
    title: "Brand & Design",
    desc: "Logos and brand identities that make your business memorable.",
    tiers: [
      { name: "Logo Design", price: "5,000", unit: "", desc: "3 concepts · Final files · Revisions" },
      { name: "Brand Kit", price: "15,000", unit: "", desc: "Logo · Colors · Fonts · Social templates", popular: true },
    ],
  },
  {
    icon: "🐝",
    title: "VA & Data Entry",
    desc: "Reliable virtual assistance and data management for your business.",
    tiers: [
      { name: "Hourly", price: "600", unit: "/hr", desc: "Pay as you go · Flexible tasks" },
      { name: "Retainer", price: "25,000", unit: "/mo", desc: "~20 hrs/week · Dedicated support", popular: true },
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="section-pad"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#090c14",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
          Pricing
        </div>

        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            letterSpacing: "0.04em",
            lineHeight: "1",
            marginBottom: "0.6rem",
            color: "#eef0f6",
          }}
        >
          What I Offer
        </h2>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}
        >
          Transparent pricing — no surprises. Every project starts with a free
          call to scope your exact needs.{" "}
          <span style={{ color: "#5a6278", fontStyle: "italic" }}>
            (International clients — message me for USD rates)
          </span>
        </p>

        {/* SERVICES GRID */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.3rem",
          }}
        >
          {services.map((s) => (
            <ServiceCard key={s.title} service={s} />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "2rem",
            background: "linear-gradient(135deg, rgba(0,245,200,0.05), rgba(139,92,246,0.04))",
            border: "1px solid rgba(0,245,200,0.2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#9ba3bb", maxWidth: "400px" }}>
            <strong style={{ color: "#eef0f6" }}>Not sure what you need?</strong>{" "}
            Book a free call and I&apos;ll help you scope the right package.
          </p>
          
            href="/book"
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
              whiteSpace: "nowrap",
            }}
          >
            📅 Book Free Call
          </a>
        </div>
      </div>
    </section>
  );
}

// ── SERVICE CARD ──
function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0d1220",
        border: hovered ? "1px solid rgba(0,245,200,0.25)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1.5rem",
        transition: "all 0.3s",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{service.icon}</div>
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.25rem",
            letterSpacing: "0.04em",
            color: "#eef0f6",
            marginBottom: "0.4rem",
          }}
        >
          {service.title}
        </h3>
        <p style={{ fontSize: "0.78rem", lineHeight: "1.6", color: "#9ba3bb" }}>{service.desc}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {service.tiers.map((tier) => (
          <div
            key={tier.name}
            style={{
              position: "relative",
              border: tier.popular ? "1px solid rgba(0,245,200,0.3)" : "1px solid rgba(255,255,255,0.08)",
              background: tier.popular ? "rgba(0,245,200,0.05)" : "transparent",
              borderRadius: "10px",
              padding: "0.7rem 0.9rem",
            }}
          >
            {tier.popular && (
              <span
                style={{
                  position: "absolute",
                  top: "-9px",
                  right: "10px",
                  background: "#00f5c8",
                  color: "#05070d",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  letterSpacing: "0.08em",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "10px",
                  fontWeight: "700",
                }}
              >
                POPULAR
              </span>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "#eef0f6", fontWeight: 600 }}>
                {tier.name}
              </span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", color: "#00f5c8", whiteSpace: "nowrap" }}>
                KES {tier.price}{tier.unit}
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", marginTop: "0.25rem" }}>
              {tier.desc}
            </div>
          </div>
        ))}
      </div>

      
        href="/book"
        style={{
          textAlign: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: hovered ? "#00f5c8" : "#eef0f6",
          border: hovered ? "1px solid #00f5c8" : "1px solid rgba(255,255,255,0.08)",
          padding: "0.6rem",
          borderRadius: "50px",
          textDecoration: "none",
          transition: "all 0.2s",
        }}
      >
        Get a Quote →
      </a>
    </div>
  );
}