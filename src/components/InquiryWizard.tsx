"use client";

import { useState } from "react";

// ── STEP DATA ──
const PROJECT_TYPES = [
  {
    value: "Web App",
    icon: "🌐",
    desc: "Website or web application",
  },
  {
    value: "Mobile App",
    icon: "📱",
    desc: "Android or iOS app",
  },
  {
    value: "VA Work",
    icon: "🐝",
    desc: "Virtual assistant tasks",
  },
  {
    value: "Brand Design",
    icon: "🎨",
    desc: "Logo, brand kit, design",
  },
];

const BUDGETS = [
  {
    value: "Under KES 15K",
    icon: "🌱",
    desc: "Starter projects",
  },
  {
    value: "KES 15K – 50K",
    icon: "🚀",
    desc: "Small to medium projects",
  },
  {
    value: "KES 50K – 150K",
    icon: "💎",
    desc: "Full featured projects",
  },
  {
    value: "KES 150K+",
    icon: "🏆",
    desc: "Enterprise level",
  },
];

const TIMELINES = [
  {
    value: "ASAP",
    icon: "⚡",
    desc: "Rush delivery needed",
  },
  {
    value: "Within 1 Month",
    icon: "📅",
    desc: "Standard pace",
  },
  {
    value: "2–3 Months",
    icon: "🗓️",
    desc: "Relaxed timeline",
  },
  {
    value: "Flexible",
    icon: "😊",
    desc: "No specific deadline",
  },
];

const STEPS = ["Project", "Budget", "Timeline", "Contact"];

export default function InquiryWizard() {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function next() {
    setStep((s) => Math.min(s + 1, 3));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setError("");
  }

  async function submit() {
    if (!name.trim() || !phone.trim()) {
      setError("Please enter your name and phone number!");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          budget,
          timeline,
          name,
          phone,
          email,
          description,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try WhatsApp instead!");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <WizardShell step={3} total={4}>
        {/* SUCCESS */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            🎉
          </div>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.7rem",
            }}
          >
            You&apos;re all set!
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#9ba3bb",
              lineHeight: "1.8",
              maxWidth: "360px",
              margin: "0 auto 1.8rem",
            }}
          >
            Brian has received your inquiry and will reach out via
            WhatsApp within <strong style={{ color: "#00f5c8" }}>24 hours</strong>.
            For urgent matters, message him directly! 🐝
          </p>

          <div
            style={{
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1.5rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#9ba3bb",
              textAlign: "left",
              lineHeight: "1.9",
            }}
          >
            <strong style={{ color: "#00f5c8" }}>Your Summary:</strong>
            <br />
            📋 {projectType} · 💰 {budget}
            <br />
            ⏱️ {timeline} · 👤 {name}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            
              href={`https://wa.me/254768771559?text=${encodeURIComponent(`Hi Brian! I just submitted an inquiry. I'm ${name} and I need help with ${projectType}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.85rem 1.5rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              💬 Chat on WhatsApp
            </a>
            
              href="/book"
              style={{
                background: "rgba(0,245,200,0.08)",
                color: "#00f5c8",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.85rem 1.5rem",
                borderRadius: "50px",
                textDecoration: "none",
                border: "1px solid rgba(0,245,200,0.2)",
              }}
            >
              📅 Book a Call
            </a>
          </div>
        </div>
      </WizardShell>
    );
  }

  return (
    <WizardShell step={step} total={4}>
      {/* ── STEP 0: PROJECT TYPE ── */}
      {step === 0 && (
        <StepWrapper
          title="What do you need? 🛠️"
          subtitle="Select the type of project you want to build"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1.5rem",
            }}
          >
            {PROJECT_TYPES.map((p) => (
              <OptionCard
                key={p.value}
                icon={p.icon}
                label={p.value}
                desc={p.desc}
                selected={projectType === p.value}
                onClick={() => setProjectType(p.value)}
                color="#00f5c8"
              />
            ))}
          </div>
          <NavButtons
            onNext={next}
            nextDisabled={!projectType}
            showBack={false}
            onBack={back}
          />
        </StepWrapper>
      )}

      {/* ── STEP 1: BUDGET ── */}
      {step === 1 && (
        <StepWrapper
          title="What&apos;s your budget? 💰"
          subtitle="This helps Brian suggest the right solution for you"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1.5rem",
            }}
          >
            {BUDGETS.map((b) => (
              <OptionCard
                key={b.value}
                icon={b.icon}
                label={b.value}
                desc={b.desc}
                selected={budget === b.value}
                onClick={() => setBudget(b.value)}
                color="#8b5cf6"
              />
            ))}
          </div>
          <NavButtons
            onNext={next}
            nextDisabled={!budget}
            showBack={true}
            onBack={back}
          />
        </StepWrapper>
      )}

      {/* ── STEP 2: TIMELINE ── */}
      {step === 2 && (
        <StepWrapper
          title="What&apos;s your timeline? ⏱️"
          subtitle="When do you need this project completed?"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1.5rem",
            }}
          >
            {TIMELINES.map((t) => (
              <OptionCard
                key={t.value}
                icon={t.icon}
                label={t.value}
                desc={t.desc}
                selected={timeline === t.value}
                onClick={() => setTimeline(t.value)}
                color="#f5c842"
              />
            ))}
          </div>
          <NavButtons
            onNext={next}
            nextDisabled={!timeline}
            showBack={true}
            onBack={back}
          />
        </StepWrapper>
      )}

      {/* ── STEP 3: CONTACT ── */}
      {step === 3 && (
        <StepWrapper
          title="Almost done! 🐝"
          subtitle="How can Brian reach you?"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
              marginBottom: "1.2rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.8rem",
              }}
              className="form-row-2"
            >
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#00f5c8")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor =
                      "rgba(255,255,255,0.08)")
                  }
                />
              </div>
              <div>
                <label style={labelStyle}>
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254..."
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#00f5c8")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor =
                      "rgba(255,255,255,0.08)")
                  }
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@email.com"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#00f5c8")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />
            </div>

            <div>
              <label style={labelStyle}>
                Brief Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell Brian a bit more about what you need..."
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#00f5c8")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />
            </div>
          </div>

          {/* SUMMARY */}
          <div
            style={{
              background: "rgba(0,245,200,0.04)",
              border: "1px solid rgba(0,245,200,0.15)",
              borderRadius: "10px",
              padding: "0.9rem 1rem",
              marginBottom: "1.2rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#9ba3bb",
              lineHeight: "1.8",
            }}
          >
            <strong style={{ color: "#00f5c8" }}>
              Your Selection:
            </strong>
            <br />
            📋 {projectType} · 💰 {budget} · ⏱️ {timeline}
          </div>

          {error && (
            <p
              style={{
                color: "#f5c842",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                marginBottom: "0.8rem",
              }}
            >
              ⚠️ {error}
            </p>
          )}

          <NavButtons
            onNext={submit}
            nextLabel={
              submitting ? "Sending... 🐝" : "Submit Inquiry 🚀"
            }
            nextDisabled={submitting}
            showBack={true}
            onBack={back}
          />
        </StepWrapper>
      )}
    </WizardShell>
  );
}

// ── WIZARD SHELL (with progress bar) ──
function WizardShell({
  children,
  step,
  total,
}: {
  children: React.ReactNode;
  step: number;
  total: number;
}) {
  const progress = ((step + 1) / total) * 100;

  return (
    <section
      id="inquiry"
      className="section-pad"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
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
          Start a Project
        </div>

        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "0.04em",
            lineHeight: "1",
            marginBottom: "2rem",
            color: "#eef0f6",
          }}
        >
          Project Inquiry
        </h2>

        {/* STEP INDICATORS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "0.8rem",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                flex: i < STEPS.length - 1 ? 1 : "none",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  flexShrink: 0,
                  background:
                    i <= step
                      ? "#00f5c8"
                      : "rgba(255,255,255,0.06)",
                  color: i <= step ? "#05070d" : "#5a6278",
                  transition: "all 0.3s",
                }}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  color: i === step ? "#00f5c8" : "#5a6278",
                  letterSpacing: "0.08em",
                  display: i === step ? "block" : "none",
                }}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      i < step
                        ? "#00f5c8"
                        : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* PROGRESS BAR */}
        <div
          style={{
            height: "3px",
            background: "rgba(255,255,255,0.06)",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              height: "100%",
              background:
                "linear-gradient(90deg, #00f5c8, #8b5cf6)",
              width: `${progress}%`,
              borderRadius: "3px",
              transition: "width 0.4s ease",
              boxShadow: "0 0 8px rgba(0,245,200,0.4)",
            }}
          />
        </div>

        {/* CARD */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
            border: "1px solid rgba(0,245,200,0.2)",
            borderRadius: "20px",
            padding: "2rem",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

// ── STEP WRAPPER ──
function StepWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        animation: "fadeIn 0.3s ease",
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.8rem",
          letterSpacing: "0.05em",
          color: "#eef0f6",
          marginBottom: "0.4rem",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: "#5a6278",
          marginBottom: "1.4rem",
          lineHeight: "1.5",
        }}
      >
        {subtitle}
      </p>
      {children}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── OPTION CARD ──
function OptionCard({
  icon,
  label,
  desc,
  selected,
  onClick,
  color,
}: {
  icon: string;
  label: string;
  desc: string;
  selected: boolean;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected
          ? `rgba(${
              color === "#00f5c8"
                ? "0,245,200"
                : color === "#8b5cf6"
                ? "139,92,246"
                : "245,200,66"
            },0.1)`
          : "#0d1220",
        border: `1px solid ${
          selected ? color : "rgba(255,255,255,0.08)"
        }`,
        borderRadius: "12px",
        padding: "1rem",
        cursor: "pointer",
        transition: "all 0.2s",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      <span style={{ fontSize: "1.6rem" }}>{icon}</span>
      <span
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "0.88rem",
          fontWeight: "600",
          color: selected ? color : "#eef0f6",
          lineHeight: "1.2",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem",
          color: "#5a6278",
          lineHeight: "1.4",
        }}
      >
        {desc}
      </span>
    </button>
  );
}

// ── NAV BUTTONS ──
function NavButtons({
  onNext,
  onBack,
  nextLabel = "Continue →",
  nextDisabled = false,
  showBack = true,
}: {
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.8rem",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {showBack ? (
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#5a6278",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.06em",
            padding: "0.75rem 1.3rem",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          ← Back
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onNext}
        disabled={nextDisabled}
        style={{
          background: nextDisabled
            ? "rgba(255,255,255,0.06)"
            : "linear-gradient(135deg, #00f5c8, #00c4a0)",
          color: nextDisabled ? "#5a6278" : "#05070d",
          border: "none",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.78rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "0.85rem 2rem",
          borderRadius: "50px",
          cursor: nextDisabled ? "not-allowed" : "pointer",
          fontWeight: "700",
          transition: "all 0.25s",
          boxShadow: nextDisabled
            ? "none"
            : "0 4px 20px rgba(0,245,200,0.3)",
        }}
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ── SHARED STYLES ──
const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.63rem",
  color: "#5a6278",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "0.4rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#eef0f6",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.85rem",
  padding: "0.72rem 0.9rem",
  borderRadius: "10px",
  outline: "none",
  minHeight: "44px",
  transition: "border-color 0.2s",
};