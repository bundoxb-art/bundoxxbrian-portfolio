"use client";

import { useState } from "react";
import MpesaSTKPush from "@/components/MpesaSTKPush";

const PAYBILL = "880100";
const ACCOUNT = "488007";
const WHATSAPP = "254768771559";

const STEPS = [
  "Open M-Pesa on your phone",
  "Select Lipa na M-Pesa",
  "Select Pay Bill",
  "Enter the Business Number (Paybill) shown",
  "Enter the Account Number shown",
  "Enter the agreed amount",
  "Enter your M-Pesa PIN and confirm",
  "Send me the confirmation SMS via WhatsApp",
];

export default function Payment() {
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  }

  const waMessage = `Hi Brian! I've made an M-Pesa payment to Paybill ${PAYBILL}, Account ${ACCOUNT}. Here's my confirmation message:\n\n[paste M-Pesa SMS here]`;

  return (
    <section
      id="payment"
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
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
          Payment
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
          Pay via M-Pesa
        </h2>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "520px",
          }}
        >
          Once we&apos;ve agreed on your project, you can pay deposits or full
          amounts safely via M-Pesa Lipa na M-Pesa — Pay Bill.
        </p>

        <div
          className="payment-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — PAYBILL CARD */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(0,200,100,0.06), rgba(0,245,200,0.04))",
              border: "1px solid rgba(0,200,100,0.2)",
              borderRadius: "20px",
              padding: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "1.6rem" }}>📲</span>
              <div>
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    letterSpacing: "0.08em",
                    color: "#00C16E",
                  }}
                >
                  LIPA NA M-PESA
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#5a6278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Pay Bill
                </div>
              </div>
            </div>

            {/* PAYBILL NUMBER */}
            <PayBox
              label="Business No. (Paybill)"
              value={PAYBILL}
              onCopy={() => copy(PAYBILL, "Paybill")}
              copied={copied === "Paybill"}
            />

            {/* ACCOUNT NUMBER */}
            <PayBox
              label="Account Number"
              value={ACCOUNT}
              onCopy={() => copy(ACCOUNT, "Account")}
              copied={copied === "Account"}
            />

            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                background: "#25D366",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.85rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1da851")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
            >
              ✅ Sent? Confirm via WhatsApp
            </a>
          </div>

          {/* RIGHT — HOW TO PAY STEPS */}
          <div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.05em",
                color: "#eef0f6",
                marginBottom: "1.2rem",
              }}
            >
              How to Pay
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "rgba(0,245,200,0.08)",
                      border: "1px solid rgba(0,245,200,0.2)",
                      color: "#00f5c8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#9ba3bb", lineHeight: "1.6", paddingTop: "2px" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.8rem" }}>
              <MpesaSTKPush />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PAYBILL/ACCOUNT BOX ──
function PayBox({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div
      onClick={onCopy}
      style={{
        background: "#0d1220",
        border: copied ? "1px solid #00C16E" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1rem 1.2rem",
        marginBottom: "0.9rem",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "#5a6278",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.3rem",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            letterSpacing: "0.08em",
            color: "#eef0f6",
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: copied ? "#00C16E" : "#5a6278",
          display: "flex",
          alignItems: "center",
          gap: "0.3rem",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? "✅ Copied!" : "📋 Tap to copy"}
      </div>
    </div>
  );
}