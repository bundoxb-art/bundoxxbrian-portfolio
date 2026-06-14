import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#05070d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "110px",
          height: "110px",
          animation: "bbPulse 1.6s ease-in-out infinite",
        }}
      >
        <Image
          src="/logo.jpeg"
          alt="BundoxxB"
          fill
          style={{ objectFit: "contain", borderRadius: "16px" }}
          priority
        />
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          color: "#00f5c8",
          textTransform: "uppercase",
        }}
      >
        Loading 🐝
      </div>
      <style>{`
        @keyframes bbPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}