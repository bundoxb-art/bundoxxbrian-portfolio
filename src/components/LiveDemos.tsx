"use client";

import { useState, useEffect } from "react";

type DemoTab = "currency" | "mpesa" | "age";

// M-Pesa fee bands (Safaricom 2024)
function getMpesaFee(amount: number): number {
  if (amount < 1) return 0;
  if (amount <= 49) return 0;
  if (amount <= 100) return 0;
  if (amount <= 500) return 7;
  if (amount <= 1000) return 13;
  if (amount <= 1500) return 23;
  if (amount <= 2500) return 33;
  if (amount <= 3500) return 53;
  if (amount <= 5000) return 57;
  if (amount <= 7500) return 78;
  if (amount <= 10000) return 90;
  if (amount <= 15000) return 100;
  if (amount <= 20000) return 105;
  if (amount <= 35000) return 108;
  if (amount <= 50000) return 108;
  if (amount <= 150000) return 108;
  return 108;
}

// Currency Converter
function CurrencyConverter() {
  const [kes, setKes] = useState("");
  const [usd, setUsd] = useState("");
  const [rate] = useState(129.5); // approximate rate
  const [direction, setDirection] = useState<"kes" | "usd">("kes");

  function handleKes(val: string) {
    setKes(val);
    setDirection("kes");
    if (val) setUsd((Number(val) / rate).toFixed(2));
    else setUsd("");
  }

  function handleUsd(val: string) {
    setUsd(val);
    setDirection("usd");
    if (val) setKes((Number(val) * rate).toFixed(2));
    else setKes("");
  }

  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#5a6278",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "1.2rem",
        }}
      >
        Rate: 1 USD = KES {rate}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>
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
            Kenyan Shillings (KES)
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="number"
              value={kes}
              onChange={(e) => handleKes(e.target.value)}
              placeholder="Enter KES amount"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${direction === "kes" ? "#00f5c8" : "rgba(255,255,255,0.08)"}`,
                color: "#eef0f6",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.2rem",
                padding: "0.8rem 3.5rem 0.8rem 0.9rem",
                borderRadius: "10px",
                outline: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#5a6278",
              }}
            >
              KES
            </span>
          </div>
        </div>

        <div
          style={{ textAlign: "center", fontSize: "1.5rem", color: "#00f5c8" }}
        >
          ⇅
        </div>

        <div>
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
            US Dollars (USD)
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="number"
              value={usd}
              onChange={(e) => handleUsd(e.target.value)}
              placeholder="Enter USD amount"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${direction === "usd" ? "#f5c842" : "rgba(255,255,255,0.08)"}`,
                color: "#eef0f6",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.2rem",
                padding: "0.8rem 3.5rem 0.8rem 0.9rem",
                borderRadius: "10px",
                outline: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#5a6278",
              }}
            >
              USD
            </span>
          </div>
        </div>
      </div>

      {kes && usd && (
        <div
          style={{
            marginTop: "1.2rem",
            padding: "0.9rem",
            background: "rgba(0,245,200,0.06)",
            border: "1px solid rgba(0,245,200,0.15)",
            borderRadius: "10px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            color: "#00f5c8",
            textAlign: "center",
          }}
        >
          {direction === "kes"
            ? `KES ${Number(kes).toLocaleString("en-KE")} = $${usd} USD`
            : `$${usd} USD = KES ${Number(kes).toLocaleString("en-KE")}`}
        </div>
      )}

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "#5a6278",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        * Rate is approximate. Check XE.com for live rates.
      </p>
    </div>
  );
}

// M-Pesa Fee Calculator
function MpesaCalculator() {
  const [amount, setAmount] = useState("");
  const fee = amount ? getMpesaFee(Number(amount)) : 0;
  const total = amount ? Number(amount) + fee : 0;

  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#5a6278",
          letterSpacing: "0.12em",
          marginBottom: "1.2rem",
        }}
      >
        Safaricom M-Pesa Send Money Fees
      </div>

      <div style={{ marginBottom: "1rem" }}>
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
          Amount to Send (KES)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount e.g. 5000"
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(0,193,110,0.3)",
            color: "#eef0f6",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.2rem",
            padding: "0.8rem 0.9rem",
            borderRadius: "10px",
            outline: "none",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "#00C16E")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(0,193,110,0.3)")
          }
        />
      </div>

      {amount && Number(amount) > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.7rem 0.9rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#9ba3bb",
              }}
            >
              Amount
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#eef0f6",
              }}
            >
              KES {Number(amount).toLocaleString("en-KE")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.7rem 0.9rem",
              background: "rgba(245,200,66,0.06)",
              borderRadius: "8px",
              border: "1px solid rgba(245,200,66,0.15)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#f5c842",
              }}
            >
              Transaction Fee
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#f5c842",
              }}
            >
              KES {fee.toLocaleString("en-KE")}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0.9rem",
              background: "rgba(0,193,110,0.1)",
              borderRadius: "8px",
              border: "1px solid rgba(0,193,110,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.88rem",
                color: "#00C16E",
                fontWeight: "700",
              }}
            >
              TOTAL DEDUCTED
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.88rem",
                color: "#00C16E",
                fontWeight: "700",
              }}
            >
              KES {total.toLocaleString("en-KE")}
            </span>
          </div>
        </div>
      )}

      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "#5a6278",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        * Fees based on Safaricom tariff. Paybill transactions may differ.
      </p>
    </div>
  );
}

// Age Calculator
function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    totalDays: number;
  } | null>(null);

  useEffect(() => {
    if (!dob) {
      setResult(null);
      return;
    }
    const birth = new Date(dob);
    const now = new Date();
    if (birth > now) {
      setResult(null);
      return;
    }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(totalMs / (1000 * 60 * 60));

    setResult({ years, months, days, hours, totalDays });
  }, [dob]);

  return (
    <div>
      <div style={{ marginBottom: "1.2rem" }}>
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
          Date of Birth
        </label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(139,92,246,0.3)",
            color: "#eef0f6",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1rem",
            padding: "0.8rem 0.9rem",
            borderRadius: "10px",
            outline: "none",
            colorScheme: "dark",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = "#8b5cf6")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = "rgba(139,92,246,0.3)")
          }
        />
      </div>

      {result && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0.6rem",
            }}
          >
            {[
              { label: "Years", value: result.years, color: "#8b5cf6" },
              { label: "Months", value: result.months, color: "#00f5c8" },
              { label: "Days", value: result.days, color: "#f5c842" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  textAlign: "center",
                  padding: "1.2rem 0.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${item.color}30`,
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "2.5rem",
                    color: item.color,
                    lineHeight: "1",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#5a6278",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                padding: "0.8rem",
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.6rem",
                  color: "#8b5cf6",
                  lineHeight: "1",
                }}
              >
                {result.totalDays.toLocaleString("en-KE")}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#5a6278",
                  marginTop: "2px",
                }}
              >
                Total Days Lived
              </div>
            </div>
            <div
              style={{
                padding: "0.8rem",
                background: "rgba(0,245,200,0.06)",
                border: "1px solid rgba(0,245,200,0.15)",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.6rem",
                  color: "#00f5c8",
                  lineHeight: "1",
                }}
              >
                {result.hours.toLocaleString("en-KE")}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: "#5a6278",
                  marginTop: "2px",
                }}
              >
                Total Hours Lived
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MAIN EXPORT ──
export default function LiveDemos() {
  const [active, setActive] = useState<DemoTab>("currency");

  const tabs = [
    { key: "currency" as DemoTab, icon: "💱", label: "KES/USD Converter" },
    { key: "mpesa" as DemoTab, icon: "📱", label: "M-Pesa Fees" },
    { key: "age" as DemoTab, icon: "🎂", label: "Age Calculator" },
  ];

  return (
    <section
      id="demos"
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
          <span
            style={{
              width: "20px",
              height: "1px",
              background: "#00f5c8",
              display: "inline-block",
            }}
          />
          Mini Tools
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
          Live Demos
        </h2>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "2.5rem",
            maxWidth: "500px",
          }}
        >
          Useful micro-tools built with React — try them right here! 🐝
        </p>

        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          {/* TABS */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginBottom: "1.5rem",
              background: "#0d1220",
              borderRadius: "12px",
              padding: "0.4rem",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                style={{
                  flex: 1,
                  padding: "0.65rem 0.5rem",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    active === tab.key
                      ? "rgba(0,245,200,0.1)"
                      : "transparent",
                  color:
                    active === tab.key ? "#00f5c8" : "#5a6278",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* CONTENT CARD */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
              border: "1px solid rgba(0,245,200,0.2)",
              borderRadius: "20px",
              padding: "2rem",
              minHeight: "300px",
            }}
          >
            {active === "currency" && <CurrencyConverter />}
            {active === "mpesa" && <MpesaCalculator />}
            {active === "age" && <AgeCalculator />}
          </div>
        </div>
      </div>
    </section>
  );
}