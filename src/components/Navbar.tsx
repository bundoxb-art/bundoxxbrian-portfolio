"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Reviews", href: "#feedback" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* MAIN NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(5,7,13,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              letterSpacing: "0.08em",
              color: "#eef0f6",
            }}
          >
            BUNDOXX
            <span style={{ color: "#00f5c8" }}>BRIAN</span>
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="no-underline"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5a6278",
                  textDecoration: "none",
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
              </Link>
            </li>
          ))}
        </ul>

        {/* HIRE ME BUTTON */}
        <Link
          href="#contact"
          className="hidden md:flex items-center gap-2 no-underline"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#05070d",
            background: "#00f5c8",
            padding: "0.55rem 1.3rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "700",
            boxShadow: "0 4px 20px rgba(0,245,200,0.3)",
            transition: "all 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00d4ad";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#00f5c8";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          💼 Hire Me
        </Link>

        {/* HAMBURGER — mobile */}
        <button
          className="flex md:hidden flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "#eef0f6",
              borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translateY(6px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "#eef0f6",
              borderRadius: "2px",
              opacity: menuOpen ? 0 : 1,
              transition: "all 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "#eef0f6",
              borderRadius: "2px",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(5,7,13,0.98)" }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-8 bg-transparent border-none cursor-pointer"
            style={{
              fontSize: "2rem",
              color: "#5a6278",
            }}
          >
            ✕
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="no-underline"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "3rem",
                letterSpacing: "0.1em",
                color: "#eef0f6",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00f5c8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#eef0f6")
              }
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            className="no-underline"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              color: "#05070d",
              background: "#00f5c8",
              padding: "0.8rem 2.5rem",
              borderRadius: "50px",
              textDecoration: "none",
            }}
          >
            💼 Hire Me
          </Link>
        </div>
      )}
    </>
  );
}