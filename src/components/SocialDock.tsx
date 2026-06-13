"use client";

import { useState } from "react";

const buttons = [
  {
    icon: "💬",
    tip: "WhatsApp",
    href: "https://wa.me/254768771559?text=Hi%20Brian!",
    bg: "#25D366",
  },
  {
    icon: "📸",
    tip: "@BundoxxB",
    href: "https://instagram.com/BundoxxB",
    bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
  },
  {
    icon: "✉️",
    tip: "Send SMS",
    href: "sms:+254768771559",
    bg: "#00f5c8",
  },
  {
    icon: "⭐",
    tip: "Leave Review",
    href: "#feedback",
    bg: "#f5c842",
  },
];

export default function SocialDock() {
  return (
    <div
      className="social-dock"
      style={{
        position: "fixed",
        right: "22px",
        bottom: "80px",
        zIndex: 399,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignItems: "center",
      }}
    >
      {buttons.map((btn) => (
        <DockButton key={btn.tip} btn={btn} />
      ))}
    </div>
  );
}

function DockButton({
  btn,
}: {
  btn: {
    icon: string;
    tip: string;
    href: string;
    bg: string;
  };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={btn.href}
      target={btn.href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.15rem",
        textDecoration: "none",
        background: btn.bg,
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        transition: "all 0.25s",
        transform: hovered
          ? "scale(1.15) translateX(-4px)"
          : "scale(1)",
        position: "relative",
        cursor: "pointer",
        color: btn.tip === "Leave Review" ? "#000" : "#fff",
      }}
    >
      {btn.icon}

      {/* TOOLTIP */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            right: "54px",
            background: "rgba(13,18,32,0.95)",
            color: "#eef0f6",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.63rem",
            padding: "0.3rem 0.65rem",
            borderRadius: "8px",
            whiteSpace: "nowrap",
            border: "1px solid rgba(255,255,255,0.08)",
            letterSpacing: "0.06em",
            zIndex: 9999,
          }}
        >
          {btn.tip}
        </div>
      )}
    </a>
  );
}