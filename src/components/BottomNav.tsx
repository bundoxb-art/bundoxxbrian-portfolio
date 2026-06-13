"use client";

import { useEffect, useState } from "react";

const navItems = [
  { icon: "🏠", label: "Home", href: "#hero", id: "hero" },
  { icon: "👤", label: "About", href: "#about", id: "about" },
  { icon: "⭐", label: "Reviews", href: "#feedback", id: "feedback" },
  { icon: "⚡", label: "Skills", href: "#skills", id: "skills" },
];

export default function BottomNav() {
  const [active, setActive] = useState("hero");

  // Auto highlight based on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActive(item.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* BOTTOM NAV BAR */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 450,
          height: "64px",
          background: "rgba(5,7,13,0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(0,245,200,0.12)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 1rem",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: "700px",
            width: "100%",
            position: "relative",
          }}
        >
          {/* LEFT 2 ITEMS */}
          {navItems.slice(0, 2).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}

          {/* CENTER GAP for hire me button */}
          <div className="bn-gap" style={{ width: "68px", flexShrink: 0 }} />

          {/* RIGHT 2 ITEMS */}
          {navItems.slice(2).map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </div>
      </nav>

      {/* FLOATING HIRE ME — center of bottom nav */}
      <a
        href="#contact"
        onClick={() => setActive("contact")}
        style={{
          position: "fixed",
          bottom: "calc(32px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 451,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00f5c8, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1px",
          boxShadow:
            "0 0 0 4px rgba(0,245,200,0.15), 0 8px 30px rgba(0,245,200,0.5)",
          textDecoration: "none",
          border: "2.5px solid rgba(255,255,255,0.2)",
          transition: "transform 0.25s, box-shadow 0.25s",
          animation: "hireFloat 2.5s infinite",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform =
            "translateX(-50%) scale(1.1)";
          e.currentTarget.style.animation = "none";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateX(-50%)";
          e.currentTarget.style.animation = "hireFloat 2.5s infinite";
        }}
      >
        <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>💼</span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.42rem",
            color: "#05070d",
            letterSpacing: "0.06em",
            fontWeight: "700",
            marginTop: "1px",
          }}
        >
          HIRE ME
        </span>

        {/* Animation style */}
        <style jsx>{`
          @keyframes hireFloat {
            0%, 100% {
              box-shadow: 0 0 0 4px rgba(0,245,200,0.15),
                          0 8px 30px rgba(0,245,200,0.5);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(0,245,200,0.08),
                          0 8px 32px rgba(0,245,200,0.7);
            }
          }
        `}</style>
      </a>
    </>
  );
}

// ── NAV ITEM ──
function NavItem({
  item,
  isActive,
  onClick,
}: {
  item: { icon: string; label: string; href: string };
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className="bn-item"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        textDecoration: "none",
        color: isActive ? "#00f5c8" : "#5a6278",
        cursor: "pointer",
        padding: "0.5rem 1.4rem",
        borderRadius: "12px",
        transition: "all 0.22s",
        minWidth: "64px",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.15rem",
          background: isActive ? "rgba(0,245,200,0.1)" : "transparent",
          boxShadow: isActive
            ? "0 0 14px rgba(0,245,200,0.15)"
            : "none",
          transition: "all 0.22s",
        }}
      >
        {item.icon}
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.58rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {item.label}
      </span>
    </a>
  );
}