"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Peet Designs",
    category: "Design",
    cat: "Portfolio · Design",
    problem: "🎯 Creative portfolio & design showcase",
    desc: "Stunning design portfolio with smooth animations and creative gallery layout.",
    outcome: "✅ Live on Netlify",
    url: "https://peetdesigns.netlify.app",
    tags: ["HTML", "CSS", "JavaScript"],
    featured: true,
  },
  {
    id: 2,
    title: "Craves Tattoo",
    category: "Business",
    cat: "Business · Tattoo Studio",
    problem: "🎯 Online presence for a tattoo studio",
    desc: "Full business website — gallery, booking, services in one sleek dark site.",
    outcome: "✅ Live on Vercel",
    url: "https://craves-tattoo.vercel.app",
    tags: ["React", "Vercel"],
    featured: true,
  },
  {
    id: 3,
    title: "Artmine Photography",
    category: "Photography",
    cat: "Photography · Portfolio",
    problem: "🎯 Photography portfolio & gallery",
    desc: "Professional photography portfolio with stunning image galleries.",
    outcome: "✅ Live on Vercel",
    url: "https://artminephotography.vercel.app",
    tags: ["React", "Gallery"],
    featured: false,
  },
  {
    id: 4,
    title: "Shadrack Dev",
    category: "Dev",
    cat: "Dev · Portfolio",
    problem: "🎯 Developer portfolio website",
    desc: "Sleek developer portfolio showcasing skills and projects with dark aesthetic.",
    outcome: "✅ Live on Vercel",
    url: "https://shadrack-dev.vercel.app",
    tags: ["Next.js", "Vercel"],
    featured: false,
  },
  {
    id: 5,
    title: "Elite Media Creation",
    category: "Media",
    cat: "Media · Agency",
    problem: "🎯 Media agency online presence",
    desc: "Professional media agency site with services showcase and portfolio.",
    outcome: "✅ Live on Vercel",
    url: "https://elitemediacreation.vercel.app",
    tags: ["React", "Media"],
    featured: false,
  },
];

const filters = ["All", "Design", "Business", "Photography", "Dev", "Media"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
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
          My Work
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
          Live Projects
        </h2>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "2rem",
            maxWidth: "500px",
          }}
        >
          Real websites I&apos;ve built and deployed — click to visit
          them live.{" "}
          <a
            rel="noopener noreferrer"
            style={{ color: "#00f5c8", textDecoration: "none" }}
          >
            More on GitHub @bundoxb-art ↗
          </a>
        </p>

        {/* FILTER TABS */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.45rem 1rem",
                borderRadius: "50px",
                border:
                  active === f
                    ? "1px solid #00f5c8"
                    : "1px solid rgba(255,255,255,0.08)",
                background:
                  active === f
                    ? "rgba(0,245,200,0.1)"
                    : "transparent",
                color: active === f ? "#00f5c8" : "#5a6278",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.6rem",
          }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "2.5rem",
            padding: "2rem",
            background:
              "linear-gradient(135deg, rgba(0,245,200,0.05), rgba(139,92,246,0.04))",
            border: "1px solid rgba(0,245,200,0.2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.95rem", color: "#9ba3bb" }}>
            <strong style={{ color: "#eef0f6" }}>
              Want a website like these?
            </strong>{" "}
            I build yours fast, clean, deployed in days.
          </p>
          <a
            href="#contact"
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
            💼 Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
}

// ── PROJECT CARD COMPONENT ──
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0d1220",
        border: hovered
          ? "1px solid rgba(0,245,200,0.3)"
          : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.35s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 30px 60px rgba(0,0,0,0.45)" : "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* TOP LINE ANIMATION */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #00f5c8, #8b5cf6)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }}
      />

      {/* IFRAME PREVIEW */}
      <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
        <iframe
          src={project.url}
          title={project.title}
          scrolling="no"
          style={{
            width: "100%",
            height: "200px",
            border: "none",
            pointerEvents: "none",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.5s",
          }}
        />
        {/* OVERLAY — prevents iframe interaction */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "transparent",
            zIndex: 2,
          }}
        />
      </div>

      {/* CARD BODY */}
      <div
        style={{
          padding: "1.4rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#00f5c8",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.4rem",
          }}
        >
          {project.cat}
        </div>

        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            letterSpacing: "-0.01em",
            marginBottom: "0.4rem",
            lineHeight: "1.3",
            color: "#eef0f6",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#f5c842",
            marginBottom: "0.35rem",
          }}
        >
          {project.problem}
        </p>

        <p
          style={{
            fontSize: "0.83rem",
            lineHeight: "1.7",
            color: "#9ba3bb",
            flex: 1,
          }}
        >
          {project.desc}
        </p>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#00f5c8",
            marginTop: "0.4rem",
          }}
        >
          {project.outcome}
        </p>

        {/* FOOTER */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.58rem",
                  color: "#5a6278",
                  padding: "0.22rem 0.5rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              color: "#00f5c8",
              background: "rgba(0,245,200,0.07)",
              border: "1px solid rgba(0,245,200,0.2)",
              padding: "0.28rem 0.7rem",
              borderRadius: "20px",
              textDecoration: "none",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            🔗 Visit Live
          </a>
        </div>
      </div>
    </div>
  );
}