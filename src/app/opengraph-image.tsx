import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BUNDOXXBRIAN — Full-Stack Developer · Mombasa, Kenya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#05070d",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* BACKGROUND GLOW */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(0,245,200,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* GRID LINES */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* BEE BADGE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#00f5c8",
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#00f5c8",
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            Available for Projects · Mombasa, Kenya
          </span>
        </div>

        {/* NAME */}
        <div
          style={{
            fontSize: "120px",
            fontWeight: "900",
            letterSpacing: "-2px",
            lineHeight: "0.9",
            color: "#eef0f6",
            marginBottom: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>BUNDOXX</span>
          <span style={{ color: "#00f5c8" }}>BRIAN</span>
        </div>

        {/* TAGLINE */}
        <div
          style={{
            fontSize: "28px",
            color: "#9ba3bb",
            marginBottom: "48px",
            display: "flex",
          }}
        >
          Full-Stack Developer · Brand Designer · Virtual Assistant
        </div>

        {/* BOTTOM ROW */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* MOTTO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(245,200,66,0.1)",
              border: "1px solid rgba(245,200,66,0.3)",
              borderRadius: "50px",
              padding: "12px 24px",
            }}
          >
            <span style={{ fontSize: "24px" }}>🐝</span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                color: "#f5c842",
                letterSpacing: "2px",
              }}
            >
              FOCUSED. FAST. RELIABLE.
            </span>
          </div>

          {/* TECH TAGS */}
          {["React", "Next.js", "React Native", "M-Pesa"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(0,245,200,0.08)",
                  border: "1px solid rgba(0,245,200,0.2)",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontFamily: "monospace",
                  fontSize: "16px",
                  color: "#00f5c8",
                  display: "flex",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>

        {/* BOTTOM RIGHT — URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "100px",
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#5a6278",
            display: "flex",
          }}
        >
          bundoxx-brian.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
