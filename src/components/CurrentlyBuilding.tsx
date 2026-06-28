"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CurrentProject {
  project_name: string;
  description: string | null;
  tech_stack: string[];
  progress: number;
  updated_at: string;
}

export default function CurrentlyBuilding() {
  const [project, setProject] = useState<CurrentProject | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("pf_current_project")
        .select("*")
        .eq("is_active", true)
        .single();

      setProject(data);
      setLoading(false);
      setTimeout(() => setAnimated(true), 300);
    }
    fetch();
  }, []);

  if (loading) return null;

  if (!project) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "rgba(0,193,110,0.08)",
          border: "1px solid rgba(0,193,110,0.2)",
          borderRadius: "50px",
          padding: "0.5rem 1.1rem",
          marginTop: "1.5rem",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#00C16E",
            animation: "availPulse 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "#00C16E",
            letterSpacing: "0.08em",
          }}
        >
          Available for new projects 🐝
        </span>
        <style>{`
          @keyframes availPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0,193,110,0.4); }
            50% { box-shadow: 0 0 0 6px rgba(0,193,110,0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(245,200,66,0.06), rgba(0,245,200,0.04))",
        border: "1px solid rgba(245,200,66,0.2)",
        borderRadius: "16px",
        padding: "1.2rem 1.5rem",
        marginTop: "1.5rem",
        maxWidth: "480px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.8rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#f5c842",
              animation: "buildPulse 1.5s infinite",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5c842",
            }}
          >
            Currently Building
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#5a6278",
          }}
        >
          {project.progress}% done
        </span>
      </div>

      {/* PROJECT NAME */}
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.3rem",
          letterSpacing: "0.05em",
          color: "#eef0f6",
          lineHeight: "1.1",
          marginBottom: "0.3rem",
        }}
      >
        {project.project_name}
      </div>

      {project.description && (
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.78rem",
            color: "#9ba3bb",
            lineHeight: "1.5",
            marginBottom: "0.8rem",
          }}
        >
          {project.description}
        </p>
      )}

      {/* PROGRESS BAR */}
      <div
        style={{
          height: "4px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "0.7rem",
        }}
      >
        <div
          style={{
            height: "100%",
            background:
              "linear-gradient(90deg, #f5c842, #00f5c8)",
            borderRadius: "4px",
            width: animated ? `${project.progress}%` : "0%",
            transition: "width 1.5s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 0 8px rgba(245,200,66,0.4)",
          }}
        />
      </div>

      {/* TECH STACK */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tech_stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.58rem",
                color: "#5a6278",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "0.18rem 0.5rem",
                borderRadius: "4px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <style>{`
        @keyframes buildPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(245,200,66,0); }
        }
      `}</style>
    </div>
  );
}