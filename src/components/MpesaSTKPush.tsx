"use client";

import { useState, useRef, useEffect } from "react";

type PayState = "idle" | "sending" | "pending" | "success" | "failed";

export default function MpesaSTKPush() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [state, setState] = useState<PayState>("idle");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollCount = useRef(0);

  useEffect(() => {
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, []);

  function startPolling(id: string) {
    pollCount.current = 0;
    pollTimer.current = setInterval(async () => {
      pollCount.current += 1;
      try {
        const res = await fetch("/api/mpesa/status?checkoutRequestId=" + id);
        const data = await res.json();

        if (data.status === "success") {
          setState("success");
          setReceipt(data.mpesa_receipt_number || "");
          if (pollTimer.current) clearInterval(pollTimer.current);
        } else if (data.status === "failed") {
          setState("failed");
          setError(data.result_desc || "Payment was not completed");
          if (pollTimer.current) clearInterval(pollTimer.current);
        }
      } catch {
        // keep polling
      }

      if (pollCount.current >= 30 && pollTimer.current) {
        clearInterval(pollTimer.current);
        setState((s) => {
          if (s === "pending") {
            setError("Taking longer than expected. Check your M-Pesa messages, or try again.");
            return "idle";
          }
          return s;
        });
      }
    }, 3000);
  }

  async function handlePay() {
    setError("");
    if (!phone.trim() || !amount.trim()) {
      setError("Please enter your phone number and amount");
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to start payment");
        setState("idle");
        return;
      }

      setState("pending");
      startPolling(data.checkoutRequestId);
    } catch {
      setError("Network error. Please try again.");
      setState("idle");
    }
  }

  function reset() {
    setState("idle");
    setError("");
    setReceipt("");
    setPhone("");
    setAmount("");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#05070d",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#eef0f6",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 0.9rem",
    borderRadius: "10px",
    outline: "none",
    minHeight: "46px",
  };

  return (
    <div style={{ background: "rgba(0,193,110,0.04)", border: "1px solid rgba(0,193,110,0.2)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#00C16E", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
          Instant Pay — STK Push
        </span>
      </div>

      {state === "success" ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <p style={{ color: "#00C16E", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", marginBottom: "0.4rem" }}>
            Payment Received!
          </p>
          {receipt && (
            <p style={{ color: "#9ba3bb", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", marginBottom: "1rem" }}>
              Receipt: {receipt}
            </p>
          )}
          <button onClick={reset} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#00C16E", background: "transparent", border: "1px solid rgba(0,193,110,0.3)", padding: "0.5rem 1.2rem", borderRadius: "50px", cursor: "pointer" }}>
            Make Another Payment
          </button>
        </div>
      ) : state === "pending" ? (
        <div style={{ textAlign: "center", padding: "1.2rem 0" }}>
          <p style={{ color: "#eef0f6", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", marginBottom: "0.4rem" }}>
            Check your phone
          </p>
          <p style={{ color: "#5a6278", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem" }}>
            Enter your M-Pesa PIN to complete the payment
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem", marginBottom: "0.9rem" }}>
            <div>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#5a6278", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                M-Pesa Phone Number
              </label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0712345678" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00C16E")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
            <div>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#5a6278", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                Amount (KES)
              </label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="5000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00C16E")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
            </div>
          </div>

          {error && (
            <p style={{ color: "#f5c842", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", marginBottom: "0.8rem" }}>
              {error}
            </p>
          )}

          <button
            onClick={handlePay}
            disabled={state === "sending"}
            style={{ width: "100%", background: state === "sending" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #00C16E, #009956)", color: state === "sending" ? "#5a6278" : "#fff", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.85rem", borderRadius: "50px", cursor: state === "sending" ? "not-allowed" : "pointer", fontWeight: 700 }}
          >
            {state === "sending" ? "Sending Request..." : "Pay with M-Pesa"}
          </button>

          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", color: "#5a6278", textAlign: "center", marginTop: "0.7rem" }}>
            You will receive a prompt on your phone to enter your M-Pesa PIN.
          </p>
        </>
      )}
    </div>
  );
}