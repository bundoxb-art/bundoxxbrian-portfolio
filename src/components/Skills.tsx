"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  {
    icon: "🎨",
    name: "Frontend",
    pills: [
      "React", "Next.js", "TypeScript",
      "Vue 3", "Tailwind CSS", "HTML/CSS", "Figma",
    ],
  },
  {
    icon: "⚙️",
    name: "Backend",
    pills: [
      "Node.js", "Express", "Python",
      "FastAPI", "PostgreSQL", "MongoDB", "REST APIs",
    ],
  },
  {
    icon: "📱",
    name: "Mobile",
    pills: [
      "React Native", "Expo", "TypeScript",
      "Context API", "SQLite", "Push Notif.",
    ],
  },
  {
    icon: "🐝",
    name: "VA & Data",
    pills: [
      "Data Entry", "Excel/Sheets", "Virtual Assist",
      "Research", "Automation", "Content Mgmt",
    ],
  },
];

const bars = [
  { name: "React / Next.js", pct: 90 },
  { name: "React Native", pct: 88 },
  { name: "Node.js / Express", pct: 85 },
  { name: "TypeScript", pct: 85 },
  { name: "Data Entry & VA", pct: 95 },
];

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [guideEmail, setGuideEmail] = useState("");
  const [guideSending, setGuideSending] = useState(false);
  const [guideSent, setGuideSent] = useState(false);
  const [guideError, setGuideError] = useState("");

  async function sendGuide() {
    if (!guideEmail.includes("@")) {
      setGuideError("Please enter a valid email");
      return;
    }
    setGuideSending(true);
    setGuideError("");
    try {
      const res = await fetch("/api/tech-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: guideEmail }),
      });
      if (!res.ok) throw new Error();
      setGuideSent(true);
      setGuideEmail("");
    } catch {
      setGuideError("Something went wrong. Try again!");
    } finally {
      setGuideSending(false);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const current = barsRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <section
      id="skills"
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
          Expertise
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
          Tech Stack
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
          Languages, frameworks, and tools I use daily to build
          great products.
        </p>

        {/* SKILL CATEGORIES GRID */}
        <div
          className="skills-cat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.3rem",
            marginBottom: "2rem",
          }}
        >
          {categories.map((cat) => (
            <SkillCard key={cat.name} cat={cat} />
          ))}
        </div>

        {/* PROFICIENCY BARS */}
        <div
          ref={barsRef}
          style={{
            background: "#0d1220",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "1.8rem",
            maxWidth: "700px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.3rem",
              letterSpacing: "0.05em",
              marginBottom: "1.3rem",
              color: "#eef0f6",
            }}
          >
            Core Proficiency
          </h3>

          {bars.map((bar) => (
            <div key={bar.name} style={{ marginBottom: "1.1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.35rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.76rem",
                    color: "#eef0f6",
                  }}
                >
                  {bar.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#00f5c8",
                  }}
                >
                  {bar.pct}%
                </span>
              </div>
              <div
                style={{
                  height: "4px",
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(90deg, #00f5c8, #8b5cf6)",
                    width: animated ? `${bar.pct}%` : "0%",
                    transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* DOWNLOAD RESOURCE GUIDE */}
        <div
          className="reveal"
          style={{
            marginTop: "2rem",
            background: "linear-gradient(135deg, rgba(245,200,66,0.06), rgba(0,245,200,0.04))",
            border: "1px solid rgba(245,200,66,0.2)",
            borderRadius: "16px",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📥</div>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.5rem",
            }}
          >
            Want to Learn This Stack?
          </h3>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#9ba3bb",
              maxWidth: "480px",
              margin: "0 auto 1.3rem",
              lineHeight: "1.7",
            }}
          >
            Get my <strong style={{ color: "#f5c842" }}>free Dev Resource Guide</strong> — the
            exact docs & tutorials I used to learn React, Next.js, TypeScript and more. Plus
            early access to &quot;Learn From Brian&quot; courses! 🐝
          </p>

          {!guideSent ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  maxWidth: "420px",
                  margin: "0 auto",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <input
                  type="email"
                  value={guideEmail}
                  onChange={(e) => setGuideEmail(e.target.value)}
                  placeholder="you@email.com"
                  style={{
                    flex: 1,
                    minWidth: "180px",
                    background: "#05070d",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#eef0f6",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.85rem",
                    padding: "0.7rem 1rem",
                    borderRadius: "50px",
                    outline: "none",
                    minHeight: "44px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f5c842")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <button
                  onClick={sendGuide}
                  disabled={guideSending}
                  style={{
                    background: "linear-gradient(135deg, #f5c842, #00f5c8)",
                    color: "#05070d",
                    border: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "50px",
                    cursor: guideSending ? "not-allowed" : "pointer",
                    fontWeight: "700",
                    opacity: guideSending ? 0.6 : 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {guideSending ? "Sending..." : "Send Me the Guide"}
                </button>
              </div>
              {guideError && (
                <p style={{ color: "#f5c842", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", marginTop: "0.6rem" }}>
                  {guideError}
                </p>
              )}
            </>
          ) : (
            <p style={{ color: "#00f5c8", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
              🎉 Check your email — your guide is on its way!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ── SKILL CARD ──
function SkillCard({
  cat,
}: {
  cat: { icon: string; name: string; pills: string[] };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0d1220",
        border: hovered
          ? "1px solid rgba(0,245,200,0.25)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1.5rem",
        transition: "all 0.3s",
      }}
    >
      <div style={{ fontSize: "1.8rem", marginBottom: "0.6rem" }}>
        {cat.icon}
      </div>
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.1rem",
          letterSpacing: "0.05em",
          marginBottom: "0.9rem",
          color: "#eef0f6",
        }}
      >
        {cat.name}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {cat.pills.map((pill) => (
          <span
            key={pill}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.66rem",
              color: "#9ba3bb",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.28rem 0.6rem",
              borderRadius: "6px",
              transition: "all 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(0,245,200,0.08)";
              e.currentTarget.style.borderColor =
                "rgba(0,245,200,0.3)";
              e.currentTarget.style.color = "#00f5c8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#9ba3bb";
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  );
}