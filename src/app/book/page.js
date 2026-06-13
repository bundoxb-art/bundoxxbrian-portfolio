import BookingCalendar from "@/components/BookingCalendar";

export const metadata = {
  title: "Book a Call — BUNDOXXBRIAN",
  description: "Book a free consultation call with Brian — Full-Stack Developer in Mombasa, Kenya.",
};

export default function BookPage() {
  return (
    <main
      style={{
        background: "#05070d",
        minHeight: "100vh",
        padding: "8rem 2rem 4rem",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
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
          Let&apos;s Talk
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "0.04em",
            lineHeight: "1",
            marginBottom: "0.8rem",
            color: "#eef0f6",
          }}
        >
          Book a Call <span style={{ color: "#00f5c8" }}>with Brian</span>
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "3rem",
            maxWidth: "480px",
            margin: "0 auto 3rem",
          }}
        >
          Pick a time that works for you. We&apos;ll discuss your project,
          timeline, and how I can help — completely free, no commitment 🐝
        </p>
      </div>

      <BookingCalendar />
    </main>
  );
}