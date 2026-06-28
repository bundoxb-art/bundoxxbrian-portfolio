"use client";

import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const STAGES = [
  {
    key: "Discovery",
    icon: "🔍",
    desc: "Gathering requirements",
  },
  {
    key: "Design",
    icon: "🎨",
    desc: "UI/UX design phase",
  },
  {
    key: "Development",
    icon: "💻",
    desc: "Building your project",
  },
  {
    key: "Testing",
    icon: "🧪",
    desc: "Quality assurance",
  },
  {
    key: "Live",
    icon: "🚀",
    desc: "Deployed and live!",
  },
];

interface Deliverable {
  name: string;
  url: string;
  type: string;
}

interface Client {
  name: string;
  email: string;
  project_name: string;
  project_description: string | null;
  status: string;
  deliverables: Deliverable[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export default function ClientDashboard({
  client,
  userEmail,
}: {
  client: Client | null;
  userEmail: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/portal");
  }

  const currentStageIndex = client
    ? STAGES.findIndex((s) => s.key === client.status)
    : -1;

  return (
    <main
      style={{
        background: "#05070d",
        minHeight: "100vh",
        padding: "0",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          background: "rgba(5,7,13,0.95)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <Image
            src="/bee.jpg"
            alt="BundoxxThe Bee"
            width={32}
            height={32}
            style={{
              borderRadius: "50%",
              border: "2px solid #f5c842",
            }}
          />
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.2rem",
              letterSpacing: "0.08em",
              color: "#eef0f6",
            }}
          >
            BUNDOXX
            <span style={{ color: "#00f5c8" }}>BRIAN</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#5a6278",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginLeft: "0.6rem",
              }}
            >
              Client Portal
            </span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#5a6278",
            }}
          >
            {userEmail}
          </span>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#5a6278",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "0.4rem 0.9rem",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f5c842";
              e.currentTarget.style.color = "#f5c842";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#5a6278";
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        {!client ? (
          /* NO PROJECT YET */
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}
            >
              🐝
            </div>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "2rem",
                letterSpacing: "0.05em",
                color: "#eef0f6",
                marginBottom: "0.7rem",
              }}
            >
              No Project Yet
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#9ba3bb",
                lineHeight: "1.7",
                maxWidth: "380px",
                margin: "0 auto 1.5rem",
              }}
            >
              Brian hasn&apos;t set up your project dashboard yet.
              Reach out to get started!
            </p>
            
              href="https://wa.me/254768771559"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#25D366",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.85rem 1.8rem",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              💬 Message Brian
            </a>
          </div>
        ) : (
          <>
            {/* WELCOME */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#00f5c8",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                Welcome back
              </div>
              <h1
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  letterSpacing: "0.04em",
                  color: "#eef0f6",
                  lineHeight: "1",
                  marginBottom: "0.4rem",
                }}
              >
                {client.name}
              </h1>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#9ba3bb",
                }}
              >
                Here&apos;s the latest update on your project 🐝
              </p>
            </div>

            {/* PROJECT STATUS CARD */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,245,200,0.06), rgba(139,92,246,0.04))",
                border: "1px solid rgba(0,245,200,0.2)",
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.15em",
                      color: "#5a6278",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Project
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.8rem",
                      letterSpacing: "0.04em",
                      color: "#eef0f6",
                      lineHeight: "1",
                    }}
                  >
                    {client.project_name}
                  </h2>
                  {client.project_description && (
                    <p
                      style={{
                        fontSize: "0.82rem",
                        color: "#9ba3bb",
                        marginTop: "0.4rem",
                        maxWidth: "400px",
                        lineHeight: "1.6",
                      }}
                    >
                      {client.project_description}
                    </p>
                  )}
                </div>

                {/* STATUS BADGE */}
                <div
                  style={{
                    background:
                      client.status === "Live"
                        ? "rgba(0,193,110,0.15)"
                        : "rgba(0,245,200,0.1)",
                    border:
                      client.status === "Live"
                        ? "1px solid rgba(0,193,110,0.4)"
                        : "1px solid rgba(0,245,200,0.3)",
                    borderRadius: "50px",
                    padding: "0.5rem 1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        client.status === "Live"
                          ? "#00C16E"
                          : "#00f5c8",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      color:
                        client.status === "Live"
                          ? "#00C16E"
                          : "#00f5c8",
                      letterSpacing: "0.08em",
                      fontWeight: "600",
                    }}
                  >
                    {client.status}
                  </span>
                </div>
              </div>

              {/* PROGRESS STAGES */}
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.15em",
                    color: "#5a6278",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Project Stages
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    marginBottom: "1rem",
                    overflowX: "auto",
                    paddingBottom: "4px",
                  }}
                >
                  {STAGES.map((stage, i) => {
                    const isCompleted = i < currentStageIndex;
                    const isCurrent = i === currentStageIndex;
                    const isFuture = i > currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.4rem",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: isCurrent ? "1.3rem" : "1rem",
                              background: isCompleted
                                ? "#00f5c8"
                                : isCurrent
                                ? "rgba(0,245,200,0.15)"
                                : "rgba(255,255,255,0.04)",
                              border: isCurrent
                                ? "2px solid #00f5c8"
                                : isCompleted
                                ? "2px solid #00f5c8"
                                : "2px solid rgba(255,255,255,0.08)",
                              boxShadow: isCurrent
                                ? "0 0 20px rgba(0,245,200,0.3)"
                                : "none",
                              transition: "all 0.3s",
                            }}
                          >
                            {isCompleted ? "✓" : stage.icon}
                          </div>
                          <div
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.58rem",
                              color: isFuture ? "#5a6278" : "#eef0f6",
                              letterSpacing: "0.05em",
                              textAlign: "center",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {stage.key}
                          </div>
                        </div>

                        {i < STAGES.length - 1 && (
                          <div
                            style={{
                              flex: 1,
                              height: "2px",
                              background: isCompleted
                                ? "#00f5c8"
                                : "rgba(255,255,255,0.08)",
                              margin: "0 0.3rem",
                              marginBottom: "1.4rem",
                              transition: "background 0.3s",
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* PROGRESS BAR */}
                <div
                  style={{
                    height: "4px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #00f5c8, #8b5cf6)",
                      borderRadius: "4px",
                      width: `${
                        currentStageIndex < 0
                          ? 0
                          : ((currentStageIndex + 1) / STAGES.length) * 100
                      }%`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    color: "#5a6278",
                    marginTop: "0.4rem",
                    textAlign: "right",
                  }}
                >
                  {currentStageIndex >= 0
                    ? `${Math.round(
                        ((currentStageIndex + 1) / STAGES.length) * 100
                      )}% complete`
                    : "Not started yet"}
                </div>
              </div>
            </div>

            {/* DELIVERABLES */}
            <div
              style={{
                background: "#0d1220",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "1.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.3rem",
                  letterSpacing: "0.05em",
                  color: "#eef0f6",
                  marginBottom: "1rem",
                }}
              >
                📦 Deliverables
              </h3>

              {!client.deliverables ||
              client.deliverables.length === 0 ? (
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.73rem",
                    color: "#5a6278",
                    lineHeight: "1.6",
                  }}
                >
                  No deliverables yet — Brian will add files,
                  links and assets here as the project progresses.
                  🐝
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  {client.deliverables.map(
                    (item: Deliverable, i: number) => (
                      
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.85rem 1rem",
                          background:
                            "rgba(255,255,255,0.03)",
                          border:
                            "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "10px",
                          textDecoration: "none",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(0,245,200,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(255,255,255,0.06)";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.7rem",
                          }}
                        >
                          <span style={{ fontSize: "1.2rem" }}>
                            {item.type === "figma"
                              ? "🎨"
                              : item.type === "github"
                              ? "⌥"
                              : item.type === "live"
                              ? "🚀"
                              : item.type === "video"
                              ? "🎥"
                              : "📄"}
                          </span>
                          <div>
                            <div
                              style={{
                                fontFamily:
                                  "'Outfit', sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: "600",
                                color: "#eef0f6",
                                lineHeight: "1.2",
                              }}
                            >
                              {item.name}
                            </div>
                            <div
                              style={{
                                fontFamily:
                                  "'JetBrains Mono', monospace",
                                fontSize: "0.6rem",
                                color: "#5a6278",
                                marginTop: "2px",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {item.type}
                            </div>
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily:
                              "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            color: "#00f5c8",
                          }}
                        >
                          Open ↗
                        </span>
                      </a>
                    )
                  )}
                </div>
              )}
            </div>

            {/* NOTES FROM BRIAN */}
            {client.notes && (
              <div
                style={{
                  background:
                    "rgba(245,200,66,0.04)",
                  border:
                    "1px solid rgba(245,200,66,0.2)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  <Image
                    src="/bee.jpg"
                    alt="Brian"
                    width={28}
                    height={28}
                    style={{
                      borderRadius: "50%",
                      border: "1.5px solid #f5c842",
                    }}
                  />
                  <span
                    style={{
                      fontFamily:
                        "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#f5c842",
                      letterSpacing: "0.1em",
                    }}
                  >
                    NOTE FROM BRIAN
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#9ba3bb",
                    lineHeight: "1.7",
                  }}
                >
                  {client.notes}
                </p>
              </div>
            )}

            {/* LAST UPDATED */}
            <div
              style={{
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "#5a6278",
                marginBottom: "1.5rem",
              }}
            >
              Last updated:{" "}
              {new Date(client.updated_at).toLocaleDateString(
                "en-KE",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </div>

            {/* CONTACT BRIAN */}
            <div
              style={{
                background: "#0d1220",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "1.2rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9ba3bb",
                }}
              >
                <strong style={{ color: "#eef0f6" }}>
                  Questions?
                </strong>{" "}
                Brian is just a message away 🐝
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                }}
              >
                
                  href="https://wa.me/254768771559"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#25D366",
                    color: "#fff",
                    fontFamily:
                      "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "50px",
                    textDecoration: "none",
                    fontWeight: "700",
                  }}
                >
                  💬 WhatsApp
                </a>
                
                  href="mailto:Bundoxb@gmail.com"
                  style={{
                    background: "transparent",
                    color: "#eef0f6",
                    fontFamily:
                      "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "50px",
                    textDecoration: "none",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  ✉ Email
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,245,200,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(0,245,200,0); }
        }
      `}</style>
    </main>
  );
}