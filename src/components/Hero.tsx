"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/photo1.jpg",
    label: "💼 Available for Hire",
    alt: "Brian — Professional Developer",
  },
  {
    image: "/photo2.jpg",
    label: "🐝 BundoxxThe Bee",
    alt: "Brian — The Bee Brand",
  },
  {
    image: "/photo3.jpg",
    label: "📞 Always Reachable",
    alt: "Brian — Always Available",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback((n: number) => {
    setCurrent((n + slides.length) % slides.length);
    setProgress(0);
  }, []);

  // Auto slide every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goTo(current + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [current, goTo]);

  // Progress bar
  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 100);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ padding: "7rem 2rem 4rem" }}
    >
      {/* BACKGROUND GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 70% 50%, rgba(0,245,200,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 15% 80%, rgba(139,92,246,0.08) 0%, transparent 60%)",
        }}
      />

      {/* GRID LINES */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* CONTENT */}
      <div
        className="relative z-10 w-full mx-auto grid gap-16 items-center"
        style={{
          maxWidth: "1200px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {/* LEFT — Text */}
        <div>
          {/* BADGE */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              background: "rgba(0,245,200,0.08)",
              border: "1px solid rgba(0,245,200,0.2)",
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#00f5c8",
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ fontSize: "0.45rem" }}>●</span>
            Available for projects · Mombasa, Kenya
          </div>

          {/* NAME */}
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.2rem, 8vw, 7rem)",
              lineHeight: "0.92",
              letterSpacing: "0.04em",
              color: "#eef0f6",
            }}
          >
            BUNDOXX
            <br />
            <span style={{ color: "#00f5c8" }}>BRIAN</span>
          </h1>

          {/* VALUE PROP */}
          <p
            className="mt-4"
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#eef0f6",
              lineHeight: "1.5",
              maxWidth: "460px",
            }}
          >
            I build{" "}
            <span style={{ color: "#00f5c8" }}>
              fast, clean web & mobile apps
            </span>{" "}
            that help businesses grow online.
          </p>

          {/* DESC */}
          <p
            className="mt-3"
            style={{
              fontSize: "0.92rem",
              lineHeight: "1.8",
              color: "#9ba3bb",
              maxWidth: "440px",
            }}
          >
            Full-Stack Developer · Brand Designer · Virtual Assistant.
            Based in Mombasa, Kenya. Real results for real clients.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 flex-wrap mt-8">
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
                boxShadow: "0 4px 24px rgba(0,245,200,0.3)",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💼 Hire Me Now
            </a>

            <a
              href={`https://wa.me/254768771559?text=Hi%20Brian!`}
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
                fontWeight: "600",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💬 WhatsApp
            </a>

            <a
              href="#projects"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#eef0f6",
                background: "transparent",
                padding: "0.85rem 1.8rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.25s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              View My Work
            </a>
          </div>
        </div>

        {/* RIGHT — Image Slider */}
        <div className="flex justify-center items-center">
          <div style={{ position: "relative", width: "380px", height: "520px" }}>

            {/* GRADIENT FRAME */}
            <div
              style={{
                position: "absolute",
                inset: "-3px",
                borderRadius: "24px",
                background:
                  "linear-gradient(135deg, #00f5c8, #8b5cf6, #f5c842)",
                backgroundSize: "200% 200%",
                animation: "frameGrad 4s ease infinite",
                zIndex: 0,
                boxShadow: "0 0 40px rgba(0,245,200,0.25)",
              }}
            />

            {/* SHADOW */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                right: "-20px",
                bottom: "-20px",
                border: "1px solid rgba(0,245,200,0.1)",
                borderRadius: "24px",
                zIndex: 0,
              }}
            />

            {/* SLIDER CONTAINER */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                height: "100%",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
              }}
            >
              {/* PROGRESS BAR */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: "rgba(255,255,255,0.1)",
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #00f5c8, #8b5cf6)",
                    width: `${progress}%`,
                    transition:
                      progress === 0 ? "none" : "width 4.5s linear",
                    boxShadow: "0 0 8px rgba(0,245,200,0.5)",
                  }}
                />
              </div>

              {/* COUNTER */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  zIndex: 10,
                  background: "rgba(5,7,13,0.75)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,245,200,0.2)",
                  borderRadius: "20px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#9ba3bb",
                  padding: "0.22rem 0.65rem",
                }}
              >
                {current + 1} / {slides.length}
              </div>

              {/* SLIDES */}
              {slides.map((slide, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: i === current ? 1 : 0,
                    transition: "opacity 1.2s ease",
                    zIndex: i === current ? 2 : 1,
                  }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                    }}
                    priority={i === 0}
                  />
                  {/* GRADIENT OVERLAY */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top, rgba(5,7,13,0.85), transparent)",
                      zIndex: 3,
                    }}
                  />
                  {/* LABEL */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "44px",
                      left: "16px",
                      right: "16px",
                      zIndex: 4,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {slide.label}
                  </div>
                </div>
              ))}

              {/* ARROWS */}
              <button
                onClick={() => goTo(current - 1)}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(5,7,13,0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,245,200,0.25)",
                  color: "#00f5c8",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ←
              </button>
              <button
                onClick={() => goTo(current + 1)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "rgba(5,7,13,0.55)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,245,200,0.25)",
                  color: "#00f5c8",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                →
              </button>

              {/* DOTS */}
              <div
                style={{
                  position: "absolute",
                  bottom: "14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                  display: "flex",
                  gap: "6px",
                }}
              >
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      height: "6px",
                      width: i === current ? "24px" : "6px",
                      borderRadius: "3px",
                      background:
                        i === current
                          ? "#00f5c8"
                          : "rgba(255,255,255,0.35)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s",
                      boxShadow:
                        i === current
                          ? "0 0 8px rgba(0,245,200,0.6)"
                          : "none",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* OPEN TO WORK BADGE */}
            <div
              style={{
                position: "absolute",
                bottom: "-14px",
                left: "-14px",
                zIndex: 5,
                background: "#0d1220",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "0.7rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#00f5c8",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  color: "#eef0f6",
                }}
              >
                Open to Work 🐝
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes frameGrad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,245,200,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(0,245,200,0); }
        }
      `}</style>
    </section>
  );
}