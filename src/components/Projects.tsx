"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client (read-only, safe for client side) ──
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

interface Project {
  id: string;
  name: string;
  description: string;
  problem: string | null;
  outcome: string | null;
  role: string | null;
  category: string;
  tech_stack: string[];
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  sort_order: number;
}

const FILTERS = ["All", "Business", "Media", "Photography", "Dev", "Design"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("pf_projects")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="section-pad"
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
          Real websites I&apos;ve built and deployed. {" "}
          <a
            href="https://github.com/bundoxb-art"
            target="_blank"
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
          {FILTERS.map((f) => (
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

        {/* LOADING STATE */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.6rem",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  height: "380px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
            <style>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.8; }
              }
            `}</style>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              😕
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: "#5a6278",
                marginBottom: "1rem",
              }}
            >
              Couldn&apos;t load projects right now.
            </p>
            <a
              href="https://github.com/bundoxb-art"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#00f5c8",
                textDecoration: "none",
              }}
            >
              View work on GitHub ↗
            </a>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              🐝
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: "#5a6278",
                marginBottom: "0.5rem",
              }}
            >
              No projects in this category yet.
            </p>
            <button
              onClick={() => setActive("All")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#00f5c8",
                background: "transparent",
                border: "1px solid rgba(0,245,200,0.2)",
                padding: "0.4rem 1rem",
                borderRadius: "50px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              View All Projects
            </button>
          </div>
        )}

        {/* PROJECTS GRID */}
        {!loading && !error && filtered.length > 0 && (
          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.6rem",
            }}
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        {!loading && !error && (
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
            <p
              style={{
                fontSize: "0.95rem",
                color: "#9ba3bb",
                maxWidth: "400px",
              }}
            >
              <strong style={{ color: "#eef0f6" }}>
                Want a website like these?
              </strong>{" "}
              I build yours fast, clean, deployed in days.
            </p>
            <a
              href="/#contact"
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
        )}
      </div>
    </section>
  );
}

// ── PROJECT CARD ──
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const screenshotUrl = project.image_url ||
    (project.live_url
      ? `https://api.microlink.io/?url=${encodeURIComponent(project.live_url)}&screenshot=true&meta=false&embed=screenshot.url`
      : null);

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
      {/* TOP ACCENT LINE */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #00f5c8, #8b5cf6)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
          zIndex: 2,
        }}
      />

      {/* FEATURED BADGE */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 5,
            background: "#f5c842",
            color: "#05070d",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.2rem 0.55rem",
            borderRadius: "20px",
            fontWeight: "700",
          }}
        >
          ⭐ Featured
        </div>
      )}

      {/* SCREENSHOT */}
      <div
        style={{
          height: "200px",
          background: "#090c14",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {screenshotUrl && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshotUrl}
            alt={project.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          /* FALLBACK */
          <div
            style={{
              width: "100%",
              height: "200px",
              background:
                "linear-gradient(135deg, #0d1a2f, #0d2a1f)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>🌐</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#00f5c8",
                letterSpacing: "0.1em",
              }}
            >
              {project.name}
            </span>
          </div>
        )}
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
        {/* CATEGORY */}
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
          {project.category}
          {project.role && ` · ${project.role}`}
        </div>

        {/* TITLE */}
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
          {project.name}
        </h3>

        {/* PROBLEM */}
        {project.problem && (
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
        )}

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: "0.83rem",
            lineHeight: "1.7",
            color: "#9ba3bb",
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* OUTCOME */}
        {project.outcome && (
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#00f5c8",
              marginTop: "0.5rem",
            }}
          >
            {project.outcome}
          </p>
        )}

        {/* FOOTER */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* TECH TAGS */}
          <div
            style={{
              display: "flex",
              gap: "0.3rem",
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            {project.tech_stack?.slice(0, 3).map((tag) => (
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

          {/* LIVE LINK */}
          {project.live_url && (
            <a
              href={project.live_url}
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
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,245,200,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,245,200,0.07)";
              }}
            >
              🔗 Visit Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}