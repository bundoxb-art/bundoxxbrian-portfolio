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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="skills"
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