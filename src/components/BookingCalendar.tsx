"use client";

import { useState } from "react";
import {
  format,
  addDays,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";

// ── CONFIG ──
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const PROJECT_TYPES = [
  "Web Development",
  "Mobile App",
  "Brand / Logo Design",
  "Data Entry / VA",
  "Consultation",
  "Other",
];

const WHATSAPP = "254768771559";
const DAYS_AHEAD = 14; // show next 14 days

type Step = "date" | "time" | "details" | "success";

export default function BookingCalendar() {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [details, setDetails] = useState("");

  // Generate next 14 days (skip Sundays)
  const today = startOfDay(new Date());
  const days: Date[] = [];
  let d = today;
  while (days.length < DAYS_AHEAD) {
    if (d.getDay() !== 0) days.push(d); // 0 = Sunday
    d = addDays(d, 1);
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setStep("time");
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep("details");
  }

  function handleSubmit() {
    if (!name.trim()) return alert("Please enter your name");
    if (!selectedDate || !selectedTime) return;

    const dateStr = format(selectedDate, "EEEE, MMMM d, yyyy");

    // Build WhatsApp message
    const lines = [
      `Hi Brian! I'd like to book a call 📅`,
      ``,
      `👤 Name: ${name}`,
      email ? `✉️ Email: ${email}` : null,
      phone ? `📱 Phone: ${phone}` : null,
      `🏷️ Project: ${projectType}`,
      `📅 Date: ${dateStr}`,
      `🕐 Time: ${selectedTime}`,
      details ? `💬 Details: ${details}` : null,
    ].filter(Boolean);

    const message = lines.join("\n");
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    setStep("success");
  }

  function reset() {
    setStep("date");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setProjectType(PROJECT_TYPES[0]);
    setDetails("");
  }

  // Google Calendar link (Kenya is UTC+3, no DST)
  function getCalendarLink() {
    if (!selectedDate || !selectedTime) return "#";

    const [time, period] = selectedTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const start = new Date(selectedDate);
    start.setHours(hours, minutes, 0, 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    // Convert EAT (UTC+3) to UTC
    const toUTC = (date: Date) => {
      const utc = new Date(date.getTime() - 3 * 60 * 60 * 1000);
      return format(utc, "yyyyMMdd'T'HHmmss'Z'");
    };

    const text = encodeURIComponent(`Call with Brian — ${projectType}`);
    const datesParam = `${toUTC(start)}/${toUTC(end)}`;
    const detailsParam = encodeURIComponent(
      `Project: ${projectType}\nClient: ${name}\n${details}`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${datesParam}&details=${detailsParam}`;
  }

  return (
    <div
      className="booking-wrap"
      style={{
        background: "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
        border: "1px solid rgba(0,245,200,0.2)",
        borderRadius: "20px",
        padding: "2rem",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      {/* PROGRESS STEPS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {["date", "time", "details"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }}>
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
                background:
                  step === s ||
                  (s === "date" && (step === "time" || step === "details" || step === "success")) ||
                  (s === "time" && (step === "details" || step === "success")) ||
                  (s === "details" && step === "success")
                    ? "#00f5c8"
                    : "rgba(255,255,255,0.08)",
                color:
                  step === s ||
                  (s === "date" && (step === "time" || step === "details" || step === "success")) ||
                  (s === "time" && (step === "details" || step === "success")) ||
                  (s === "details" && step === "success")
                    ? "#05070d"
                    : "#5a6278",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            {i < 2 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  background:
                    (s === "date" && (step === "time" || step === "details" || step === "success")) ||
                    (s === "time" && (step === "details" || step === "success"))
                      ? "#00f5c8"
                      : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: DATE ── */}
      {step === "date" && (
        <>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.3rem",
            }}
          >
            Pick a Date 📅
          </h3>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#5a6278",
              marginBottom: "1.5rem",
            }}
          >
            Choose a day that works for you (Sundays off 🐝)
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
              gap: "0.6rem",
            }}
          >
            {days.map((day) => {
              const isToday = isSameDay(day, today);
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDateSelect(day)}
                  style={{
                    background: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "0.8rem 0.5rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00f5c8";
                    e.currentTarget.style.background = "rgba(0,245,200,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "#0d1220";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: "#5a6278",
                      textTransform: "uppercase",
                    }}
                  >
                    {format(day, "EEE")}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.4rem",
                      color: "#eef0f6",
                    }}
                  >
                    {format(day, "d")}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.55rem",
                      color: "#00f5c8",
                    }}
                  >
                    {isToday ? "Today" : format(day, "MMM")}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* ── STEP 2: TIME ── */}
      {step === "time" && selectedDate && (
        <>
          <button
            onClick={() => setStep("date")}
            style={{
              background: "none",
              border: "none",
              color: "#5a6278",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              cursor: "pointer",
              marginBottom: "1rem",
              padding: 0,
            }}
          >
            ← Back
          </button>

          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.3rem",
            }}
          >
            Pick a Time 🕐
          </h3>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#00f5c8",
              marginBottom: "1.5rem",
            }}
          >
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
              gap: "0.6rem",
            }}
          >
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                style={{
                  background: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "0.8rem",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.78rem",
                  color: "#eef0f6",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00f5c8";
                  e.currentTarget.style.background = "rgba(0,245,200,0.06)";
                  e.currentTarget.style.color = "#00f5c8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.background = "#0d1220";
                  e.currentTarget.style.color = "#eef0f6";
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── STEP 3: DETAILS FORM ── */}
      {step === "details" && selectedDate && selectedTime && (
        <>
          <button
            onClick={() => setStep("time")}
            style={{
              background: "none",
              border: "none",
              color: "#5a6278",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              cursor: "pointer",
              marginBottom: "1rem",
              padding: 0,
            }}
          >
            ← Back
          </button>

          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.6rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.3rem",
            }}
          >
            Your Details 📝
          </h3>

          {/* SELECTED DATE/TIME SUMMARY */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(0,245,200,0.06)",
              border: "1px solid rgba(0,245,200,0.15)",
              borderRadius: "10px",
              padding: "0.6rem 0.9rem",
              marginBottom: "1.3rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#00f5c8",
            }}
          >
            📅 {format(selectedDate, "EEE, MMM d")} · 🕐 {selectedTime}
          </div>

          {/* NAME */}
          <FormField label="Your Name *">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </FormField>

          {/* EMAIL + PHONE */}
          <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
            <FormField label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@email.com"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </FormField>
            <FormField label="Phone">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254..."
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </FormField>
          </div>

          {/* PROJECT TYPE */}
          <FormField label="Project Type">
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FormField>

          {/* DETAILS */}
          <FormField label="Project Details (optional)">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Tell me a bit about what you need..."
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#00f5c8")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </FormField>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #25D366, #1da851)",
              color: "#fff",
              border: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.9rem",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "700",
              marginTop: "0.5rem",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            💬 Confirm via WhatsApp
          </button>
        </>
      )}

      {/* ── STEP 4: SUCCESS ── */}
      {step === "success" && selectedDate && selectedTime && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.8rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "0.5rem",
            }}
          >
            Almost Done!
          </h3>
          <p
            style={{
              fontSize: "0.88rem",
              color: "#9ba3bb",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
            }}
          >
            Your WhatsApp message is ready. Send it to confirm your booking
            with Brian — he&apos;ll reply to lock it in!
          </p>

          <div
            style={{
              background: "#0d1220",
              border: "1px solid rgba(0,245,200,0.15)",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1.5rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#00f5c8",
            }}
          >
            📅 {format(selectedDate, "EEEE, MMMM d, yyyy")}
            <br />
            🕐 {selectedTime}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            
              href={getCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#eef0f6",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                padding: "0.85rem",
                borderRadius: "50px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00f5c8";
                e.currentTarget.style.color = "#00f5c8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "#eef0f6";
              }}
            >
              📆 Add to Google Calendar
            </a>

            <button
              onClick={reset}
              style={{
                background: "none",
                border: "none",
                color: "#5a6278",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                cursor: "pointer",
                padding: "0.5rem",
              }}
            >
              ← Book Another Time
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── HELPERS ──
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "0.9rem" }}>
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
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#05070d",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#eef0f6",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.87rem",
  padding: "0.72rem 0.9rem",
  borderRadius: "8px",
  outline: "none",
  minHeight: "44px",
  transition: "border-color 0.2s",
};