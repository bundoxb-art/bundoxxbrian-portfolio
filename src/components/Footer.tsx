"use client";

import Image from "next/image";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Reviews", href: "#feedback" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "GitHub ↗", href: "https://github.com/bundoxb-art" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "2.5rem 2rem",
        textAlign: "center",
        background: "#05070d",
      }}
    >
      {/* LOGO + BRAND */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Image
          src="/bee.jpg"
          alt="The Bee"
          width={44}
          height={44}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #f5c842",
          }}
        />
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            letterSpacing: "0.1em",
            color: "#eef0f6",
          }}
        >
          BUNDOXX
          <span style={{ color: "#00f5c8" }}>BRIAN</span>
        </span>
      </div>

      {/* NAV LINKS */}
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.3rem",
          listStyle: "none",
          flexWrap: "wrap",
          margin: "0.9rem 0",
          padding: 0,
        }}
      >
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                color: "#5a6278",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00f5c8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#5a6278")
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* COPYRIGHT */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.64rem",
          color: "#5a6278",
          marginBottom: "0.5rem",
        }}
      >
        © 2026 BUNDOXXBRIAN · Mombasa, Makupa, Kenya · All rights
        reserved.
      </p>

      {/* POWERED BY */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "#5a6278",
          letterSpacing: "0.1em",
        }}
      >
        Powered by{" "}
        <span style={{ color: "#f5c842", fontWeight: 500 }}>
          BundoxxThe Bee
        </span>{" "}
        🐝
      </p>
    </footer>
  );
}