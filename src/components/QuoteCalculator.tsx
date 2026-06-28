"use client";

import { useState, useEffect } from "react";

// ── PRICING CONFIG ──
const PRICING = {
  Web: {
    label: "🌐 Web Development",
    sizes: [
      { label: "1-3 pages (Starter)", base: 15000 },
      { label: "4-8 pages (Business)", base: 35000 },
      { label: "9+ pages / Web App", base: 80000 },
      { label: "Custom (E-commerce/M-Pesa)", base: 120000 },
    ],
  },
  Mobile: {
    label: "📱 Mobile App",
    sizes: [
      { label: "MVP (Core features)", base: 60000 },
      { label: "Standard App", base: 90000 },
      { label: "Full App (iOS + Android)", base: 130000 },
      { label: "Complex App + Backend", base: 200000 },
    ],
  },
  Brand: {
    label: "🎨 Brand & Design",
    sizes: [
      { label: "Logo Design", base: 5000 },
      { label: "Logo + Business Card", base: 8000 },
      { label: "Full Brand Kit", base: 15000 },
      { label: "Brand Kit + Social Templates", base: 22000 },
    ],
  },
  VA: {
    label: "🐝 Virtual Assistant",
    sizes: [
      { label: "5 hrs/week", base: 12000 },
      { label: "10 hrs/week", base: 22000 },
      { label: "20 hrs/week (Retainer)", base: 25000 },
      { label: "40 hrs/week (Full-time)", base: 45000 },
    ],
  },
};

const TIMELINES = [
  { label: "Standard (Normal pace)", multiplier: 1, badge: "" },
  { label: "Rush (50% faster)", multiplier: 1.5, badge: "⚡ +50%" },
];

type ProjectType = keyof typeof PRICING;

export default function QuoteCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>("Web");
  const [sizeIndex, setSizeIndex] = useState(0);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const base = PRICING[projectType].sizes[sizeIndex]?.base || 0;
    const multiplier = TIMELINES[timelineIndex].multiplier;
    setEstimate(Math.ceil(base * multiplier));
  }, [projectType, sizeIndex, timelineIndex]);

  // Reset size when type changes
  useEffect(() => {
    setSizeIndex(0);
  }, [projectType]);

  function formatKES(n: number) {
    return `KES ${n.toLocaleString("en-KE")}`;
  }

  function buildWaMessage() {
    const type = PRICING[projectType].label;
    const size = PRICING[projectType].sizes[sizeIndex].label;
    const timeline = TIMELINES[timelineIndex].label;
    return encodeURIComponent(
      `Hi Brian! 🐝 I used your Quote Calculator and got this estimate:\n\n` +
        `📋 Project: ${type}\n` +
        `📐 Scope: ${size}\n` +
        `⏱️ Timeline: ${timeline}\n` +
        `💰 Estimate: ${formatKES(estimate)}\n\n` +
        `I'd like to discuss this project further!`
    );
  }

  return (
    <section
      id="calculator"
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
          <span
            style={{
              width: "20px",
              height: "1px",
              background: "#00f5c8",
              display: "inline-block",
            }}
          />
          Instant Pricing
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
          Quote Calculator
        </h2>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}
        >
          Get an instant estimate for your project — no forms, no waiting.
          Updates live as you select! 🐝
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="quote-grid"
        >
          {/* LEFT — SELECTORS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            {/* PROJECT TYPE */}
            <div>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#5a6278",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                1. Project Type
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem",
                }}
              >
                {(Object.keys(PRICING) as ProjectType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "10px",
                      border:
                        projectType === type
                          ? "1px solid #00f5c8"
                          : "1px solid rgba(255,255,255,0.08)",
                      background:
                        projectType === type
                          ? "rgba(0,245,200,0.1)"
                          : "#0d1220",
                      color:
                        projectType === type ? "#00f5c8" : "#9ba3bb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    {PRICING[type].label}
                  </button>
                ))}
              </div>
            </div>

            {/* SCOPE / SIZE */}
            <div>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#5a6278",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                2. Project Scope
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {PRICING[projectType].sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSizeIndex(i)}
                    style={{
                      padding: "0.8rem 1rem",
                      borderRadius: "10px",
                      border:
                        sizeIndex === i
                          ? "1px solid #8b5cf6"
                          : "1px solid rgba(255,255,255,0.06)",
                      background:
                        sizeIndex === i
                          ? "rgba(139,92,246,0.1)"
                          : "#0d1220",
                      color:
                        sizeIndex === i ? "#c4b5fd" : "#9ba3bb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.73rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{size.label}</span>
                    <span
                      style={{
                        color:
                          sizeIndex === i
                            ? "#c4b5fd"
                            : "#5a6278",
                        fontSize: "0.68rem",
                      }}
                    >
                      from {formatKES(size.base)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* TIMELINE */}
            <div>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#5a6278",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                3. Timeline
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem",
                }}
              >
                {TIMELINES.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTimelineIndex(i)}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "10px",
                      border:
                        timelineIndex === i
                          ? "1px solid #f5c842"
                          : "1px solid rgba(255,255,255,0.08)",
                      background:
                        timelineIndex === i
                          ? "rgba(245,200,66,0.08)"
                          : "#0d1220",
                      color:
                        timelineIndex === i ? "#f5c842" : "#9ba3bb",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                  >
                    {t.label}
                    {t.badge && (
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.6rem",
                          marginTop: "3px",
                          color: "#f5c842",
                        }}
                      >
                        {t.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — RESULT */}
          <div
            style={{
              position: "sticky",
              top: "100px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,245,200,0.06), rgba(139,92,246,0.04))",
                border: "1px solid rgba(0,245,200,0.2)",
                borderRadius: "20px",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              {/* LABEL */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#5a6278",
                  marginBottom: "0.8rem",
                }}
              >
                Your Estimate
              </div>

              {/* PRICE */}
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  letterSpacing: "0.04em",
                  color: "#00f5c8",
                  lineHeight: "1",
                  marginBottom: "0.4rem",
                  transition: "all 0.3s",
                }}
              >
                {formatKES(estimate)}
              </div>

              {timelineIndex === 1 && (
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#f5c842",
                    marginBottom: "0.5rem",
                  }}
                >
                  ⚡ Includes rush fee (+50%)
                </div>
              )}

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#5a6278",
                  marginBottom: "1.8rem",
                  lineHeight: "1.6",
                }}
              >
                {PRICING[projectType].label}
                <br />
                {PRICING[projectType].sizes[sizeIndex]?.label}
                <br />
                {TIMELINES[timelineIndex].label}
              </div>

              {/* DISCLAIMER */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "0.8rem",
                  marginBottom: "1.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  color: "#5a6278",
                  lineHeight: "1.6",
                  textAlign: "left",
                }}
              >
                💡 This is a starting estimate. Final price depends
                on exact features and scope. Book a free call for
                a precise quote!
              </div>

              {/* WA CTA */}
              <a
                href={`https://wa.me/254768771559?text=${buildWaMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  background: "#25D366",
                  color: "#fff",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.9rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontWeight: "700",
                  marginBottom: "0.7rem",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#1da851")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#25D366")
                }
              >
                💬 Send Quote to Brian
              </a>

              <a
                href="/book"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  background: "transparent",
                  color: "#00f5c8",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "0.85rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  border: "1px solid rgba(0,245,200,0.25)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(0,245,200,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                📅 Book Free Discovery Call
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE */}
      <style>{`
        @media (max-width: 768px) {
          .quote-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}