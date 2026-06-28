"use client";

import Image from "next/image";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Pricing", href: "/#services" },
  { label: "Reviews", href: "/#feedback" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/bundoxb-art",
    icon: "⌥",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/BundoxxB",
    icon: "📸",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@BundoxxB",
    icon: "🎵",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bundoxx-the-brian-778576348",
    icon: "🔗",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254768771559",
    icon: "💬",
  },
];

const services = [
  { label: "Web Development", href: "/#services" },
  { label: "Mobile Apps", href: "/#services" },
  { label: "Brand & Logo Design", href: "/#services" },
  { label: "Virtual Assistant", href: "/#services" },
  { label: "Book a Free Call", href: "/book" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#05070d",
        paddingBottom: "80px", // clear bottom nav
      }}
    >
      {/* TOP SECTION */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* COL 1 — Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            <Image
              src="/bee.jpg"
              alt="BundoxxThe Bee"
              width={40}
              height={40}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #f5c842",
              }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.6rem",
                letterSpacing: "0.08em",
                color: "#eef0f6",
              }}
            >
              BUNDOXX
              <span style={{ color: "#00f5c8" }}>BRIAN</span>
            </span>
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: "1.8",
              color: "#9ba3bb",
              maxWidth: "300px",
              marginBottom: "1.2rem",
            }}
          >
            Full-Stack Developer, Brand Designer & VA based in
            Mombasa, Kenya. Building fast, clean digital products
            that help businesses grow. 🐝
          </p>

          {/* SOCIAL LINKS */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00f5c8";
                  e.currentTarget.style.background =
                    "rgba(0,245,200,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.04)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* COL 2 — Navigation */}
        <div>
          <h4
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5a6278",
              marginBottom: "1rem",
            }}
          >
            Navigation
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#5a6278",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
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
        </div>

        {/* COL 3 — Services */}
        <div>
          <h4
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5a6278",
              marginBottom: "1rem",
            }}
          >
            Services
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            {services.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#5a6278",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#00f5c8")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#5a6278")
                  }
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CONTACT */}
          <div style={{ marginTop: "1.5rem" }}>
            <h4
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#5a6278",
                marginBottom: "0.8rem",
              }}
            >
              Contact
            </h4>
            <a
              href="mailto:Bundoxb@gmail.com"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "#9ba3bb",
                textDecoration: "none",
                display: "block",
                marginBottom: "0.4rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#00f5c8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#9ba3bb")
              }
            >
              Bundoxb@gmail.com
            </a>
            <a
              href="https://wa.me/254768771559"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "#9ba3bb",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#25D366")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#9ba3bb")
              }
            >
              +254 768 771 559
            </a>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      />

      {/* BOTTOM BAR */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.8rem",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "#5a6278",
            letterSpacing: "0.06em",
          }}
        >
          © {year} BUNDOXXBRIAN · Mombasa, Makupa, Kenya · All
          rights reserved.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "#5a6278",
          }}
        >
          Powered by
          <span style={{ color: "#f5c842" }}>
            BundoxxB The Bee
          </span>
          🐝
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginLeft: "8px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#00C16E",
                display: "inline-block",
              }}
            />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}