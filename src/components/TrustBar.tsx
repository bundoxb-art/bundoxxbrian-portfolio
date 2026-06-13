const items = [
  { icon: "✅", text: "3+ Years Experience" },
  { icon: "🚀", text: "20+ Projects Delivered" },
  { icon: "📍", text: "Mombasa, Kenya" },
  { icon: "⚡", text: "Fast Turnaround" },
  { icon: "🐝", text: "Focused. Fast. Reliable." },
];

export default function TrustBar() {
  return (
    <div
      className="trust-bar"
      style={{
        background: "#090c14",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        flexWrap: "wrap",
      }}
    >
      {items.map((item) => (
        <div
          key={item.text}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#5a6278",
            letterSpacing: "0.06em",
          }}
        >
          <span>{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}