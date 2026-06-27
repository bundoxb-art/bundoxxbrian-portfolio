"use client";

import Image from "next/image";

const stats = [
  { num: "3+", label: "Years Coding" },
  { num: "20+", label: "Projects Built" },
  { num: "15+", label: "Happy Clients" },
];

const stack = [
  "React", "Next.js", "Node.js", "TypeScript",
  "React Native", "Python", "PostgreSQL", "Vercel",
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="about-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "4.5rem",
          alignItems: "center",
        }}
      >
        {/* LEFT — Photo Collage */}
        <div className="about-grid-left" style={{ position: "relative" }}>
          {/* MAIN IMAGE */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
            }}
          >
            <Image
              src="/photo1.jpg"
              alt="Brian — Developer Mombasa Kenya"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
          </div>

          {/* ACCENT IMAGE — overlapping, Bee branded */}
          <div
            style={{
              position: "absolute",
              top: "-24px",
              right: "-24px",
              width: "42%",
              aspectRatio: "4/5",
              borderRadius: "12px",
              overflow: "hidden",
              border: "3px solid #05070d",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              zIndex: 2,
            }}
          >
            <Image
              src="/photo2.jpg"
              alt="Brian — BundoxxThe Bee"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top center",
              }}
            />
            {/* Teal overlay tint for brand cohesion */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(0,245,200,0.15), rgba(139,92,246,0.1))",
              }}
            />
          </div>

          {/* CORNER BADGE */}
          <div
            style={{
              position: "absolute",
              bottom: "-16px",
              right: "-16px",
              background: "#00f5c8",
              color: "#05070d",
              borderRadius: "12px",
              padding: "1rem 1.3rem",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              lineHeight: "1",
              textAlign: "center",
              zIndex: 3,
              boxShadow: "0 12px 30px rgba(0,245,200,0.3)",
            }}
          >
            3+
            <small
              style={{
                display: "block",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.56rem",
                letterSpacing: "0.1em",
                marginTop: "2px",
              }}
            >
              YRS EXP
            </small>
          </div>
        </div>

        {/* RIGHT — Content */}
        <div>
          {/* SECTION TAG */}
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
            About Me
          </div>

          {/* TITLE */}
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
            Mr. BundoxxB
            <br />— The Developer
          </h2>

          {/* BIO */}
          <div style={{ marginBottom: "1rem" }}>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.9",
                color: "#9ba3bb",
                marginBottom: "1rem",
              }}
            >
              I&apos;m{" "}
              <strong style={{ color: "#eef0f6", fontWeight: 600 }}>
                Brian
              </strong>{" "}
              — a self-driven Freelance Full-Stack Developer, Brand
              Designer, and Virtual Assistant based in{" "}
              <strong style={{ color: "#eef0f6", fontWeight: 600 }}>
                Mombasa, Kenya
              </strong>
              . I help businesses build fast, modern digital products
              that actually work.
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: "1.9",
                color: "#9ba3bb",
                marginBottom: "1rem",
              }}
            >
              Operating under my brand{" "}
              <strong style={{ color: "#eef0f6", fontWeight: 600 }}>
                BundoxxThe Bee
              </strong>{" "}
              — focused, fast, and reliable. Whether you need a web
              app, mobile product, brand design, or data entry — I
              deliver on time, every time.
            </p>
          </div>

          {/* MOTTO BOX */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(245,200,66,0.08), rgba(0,245,200,0.05))",
              border: "1px solid rgba(245,200,66,0.2)",
              borderRadius: "10px",
              padding: "1rem 1.3rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
            }}
          >
            <Image
              src="/bee.jpg"
              alt="The Bee"
              width={44}
              height={44}
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  color: "#f5c842",
                }}
              >
                FOCUSED. FAST. RELIABLE.
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  color: "#5a6278",
                  marginTop: "2px",
                }}
              >
                BundoxxThe Bee · Mombasa, Kenya
              </div>
            </div>
          </div>

          {/* TECH STACK PILLS */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1.8rem",
            }}
          >
            {stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#00f5c8",
                  background: "rgba(0,245,200,0.07)",
                  border: "1px solid rgba(0,245,200,0.2)",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "6px",
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.9rem",
              marginBottom: "1.8rem",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.1rem 0.9rem",
                  textAlign: "center",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00f5c8";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2rem",
                    color: "#00f5c8",
                    letterSpacing: "0.04em",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#5a6278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "0.2rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* LOCATION MAP */}
          <div
            style={{
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "1.8rem",
            }}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=39.6290%2C-4.0450%2C39.6490%2C-4.0250&layer=mapnik&marker=-4.0350%2C39.6390"
              width="100%"
              height="180"
              style={{
                border: "none",
                display: "block",
                filter:
                  "invert(90%) hue-rotate(180deg) brightness(0.85) saturate(0.9)",
              }}
              loading="lazy"
              title="Mombasa Makupa Location"
            />
            <div
              style={{
                padding: "0.8rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>📍</span>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#9ba3bb",
                }}
              >
                <strong style={{ color: "#00f5c8", display: "block" }}>
                  Mombasa, Makupa
                </strong>
                Near Makupa Police Station, Kenya
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
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
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💼 Let&apos;s Work Together
            </a>

            {/* NEW — Book a Call CTA */}
            <a
              href="/book"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#f5c842",
                background: "rgba(245,200,66,0.08)",
                padding: "0.85rem 1.8rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                border: "1px solid rgba(245,200,66,0.25)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,200,66,0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(245,200,66,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              📅 Book a Free Call
            </a>

            <a
              href="https://github.com/bundoxb-art"
              target="_blank"
              rel="noopener noreferrer"
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
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}