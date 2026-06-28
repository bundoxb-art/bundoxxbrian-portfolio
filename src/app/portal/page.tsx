"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import Image from "next/image";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleLogin() {
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setSending(true);
    setError("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setSending(false);
  }

  return (
    <main
      style={{
        background: "#05070d",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,245,200,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* LOGO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <Image
            src="/bee.jpg"
            alt="BundoxxThe Bee"
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              border: "2px solid #f5c842",
              marginBottom: "1rem",
            }}
          />
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.1em",
              color: "#eef0f6",
              lineHeight: "1",
              marginBottom: "0.3rem",
            }}
          >
            BUNDOXX<span style={{ color: "#00f5c8" }}>BRIAN</span>
          </h1>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#5a6278",
              textTransform: "uppercase",
            }}
          >
            Client Portal
          </div>
        </div>

        {/* CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
            border: "1px solid rgba(0,245,200,0.2)",
            borderRadius: "20px",
            padding: "2.5rem",
          }}
        >
          {sent ? (
            /* SUCCESS */
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                📧
              </div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.6rem",
                  letterSpacing: "0.05em",
                  color: "#eef0f6",
                  marginBottom: "0.7rem",
                }}
              >
                Check Your Email!
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9ba3bb",
                  lineHeight: "1.7",
                  marginBottom: "1.5rem",
                }}
              >
                We sent a magic link to{" "}
                <strong style={{ color: "#00f5c8" }}>
                  {email}
                </strong>
                . Click the link in the email to access your project dashboard!
              </p>
              <button
                onClick={() => setSent(false)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#5a6278",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Try a different email
              </button>
            </div>
          ) : (
            /* LOGIN FORM */
            <>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  letterSpacing: "0.05em",
                  color: "#eef0f6",
                  marginBottom: "0.4rem",
                }}
              >
                Welcome Back 🐝
              </h2>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: "#5a6278",
                  marginBottom: "1.8rem",
                  lineHeight: "1.6",
                }}
              >
                Enter your email to receive a magic link and access
                your project dashboard.
              </p>

              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.63rem",
                  color: "#5a6278",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="jane@example.com"
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#eef0f6",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.9rem",
                  padding: "0.8rem 1rem",
                  borderRadius: "10px",
                  outline: "none",
                  marginBottom: "1.2rem",
                  transition: "border-color 0.2s",
                  minHeight: "48px",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#00f5c8")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />

              {error && (
                <p
                  style={{
                    color: "#f5c842",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  ⚠️ {error}
                </p>
              )}

              <button
                onClick={handleLogin}
                disabled={sending}
                style={{
                  width: "100%",
                  background: sending
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg, #00f5c8, #00c4a0)",
                  color: sending ? "#5a6278" : "#05070d",
                  border: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.9rem",
                  borderRadius: "50px",
                  cursor: sending ? "not-allowed" : "pointer",
                  fontWeight: "700",
                  transition: "all 0.25s",
                  boxShadow: sending
                    ? "none"
                    : "0 4px 20px rgba(0,245,200,0.25)",
                }}
              >
                {sending
                  ? "Sending Magic Link..."
                  : "✨ Send Magic Link"}
              </button>

              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#5a6278",
                  textAlign: "center",
                  marginTop: "1.2rem",
                  lineHeight: "1.6",
                }}
              >
                No account needed. Brian will add you when your
                project starts. Questions?{" "}
                <a
                  href="https://wa.me/254768771559"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#25D366" }}
                >
                  WhatsApp Brian
                </a>
              </p>
            </>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#5a6278",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}