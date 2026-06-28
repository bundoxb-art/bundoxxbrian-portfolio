"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

const STAGES = [
  "Discovery",
  "Design",
  "Development",
  "Testing",
  "Live",
];

interface Client {
  id: string;
  name: string;
  email: string;
  project_name: string;
  status: string;
  notes: string | null;
  updated_at: string;
}

interface CurrentProject {
  id: string;
  project_name: string;
  description: string;
  tech_stack: string[];
  progress: number;
}

export default function AdminDashboard({
  clients,
  currentProject,
}: {
  clients: Client[];
  currentProject: CurrentProject | null;
}) {
  const [updating, setUpdating] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [cpName, setCpName] = useState(
    currentProject?.project_name || ""
  );
  const [cpDesc, setCpDesc] = useState(
    currentProject?.description || ""
  );
  const [cpStack, setCpStack] = useState(
    currentProject?.tech_stack?.join(", ") || ""
  );
  const [cpProgress, setCpProgress] = useState(
    currentProject?.progress || 0
  );
  const [cpSaving, setCpSaving] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");
  const [addProject, setAddProject] = useState("");
  const [adding, setAdding] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function updateStatus(
    clientId: string,
    newStatus: string
  ) {
    setUpdating(clientId);
    const res = await fetch("/api/portal/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        status: newStatus,
        notes: notes[clientId],
      }),
    });
    if (res.ok) router.refresh();
    setUpdating(null);
  }

  async function saveCurrentProject() {
    setCpSaving(true);
    await fetch("/api/portal/update-current-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentProject?.id,
        project_name: cpName,
        description: cpDesc,
        tech_stack: cpStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        progress: cpProgress,
      }),
    });
    setCpSaving(false);
    router.refresh();
  }

  async function addClient() {
    if (!addEmail || !addName || !addProject) return;
    setAdding(true);
    await fetch("/api/portal/add-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: addEmail,
        name: addName,
        project_name: addProject,
      }),
    });
    setAddEmail("");
    setAddName("");
    setAddProject("");
    setAdding(false);
    router.refresh();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/portal");
  }

  return (
    <main
      style={{ background: "#05070d", minHeight: "100vh" }}
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
        }}
      >
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
              color: "#f5c842",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginLeft: "0.6rem",
            }}
          >
            Admin Panel 🔐
          </span>
        </span>
        <button
          onClick={handleLogout}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#5a6278",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "0.4rem 0.9rem",
            borderRadius: "50px",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </nav>

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "3rem 2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2.5rem",
            letterSpacing: "0.04em",
            color: "#eef0f6",
            marginBottom: "0.4rem",
          }}
        >
          Admin Dashboard
        </h1>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#5a6278",
            marginBottom: "2.5rem",
          }}
        >
          Manage clients, update project status, and control your
          live widget 🐝
        </p>

        {/* CURRENTLY BUILDING WIDGET */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(245,200,66,0.06), rgba(0,245,200,0.04))",
            border: "1px solid rgba(245,200,66,0.2)",
            borderRadius: "16px",
            padding: "1.8rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "1.2rem",
            }}
          >
            ⚡ Currently Building Widget
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8rem",
              marginBottom: "0.8rem",
            }}
          >
            <div>
              <label style={labelStyle}>
                Project Name
              </label>
              <input
                value={cpName}
                onChange={(e) => setCpName(e.target.value)}
                placeholder="e.g. PicDelivr v2"
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#f5c842")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />
            </div>
            <div>
              <label style={labelStyle}>
                Progress: {cpProgress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={cpProgress}
                onChange={(e) =>
                  setCpProgress(Number(e.target.value))
                }
                style={{
                  width: "100%",
                  marginTop: "0.8rem",
                  accentColor: "#f5c842",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "0.8rem" }}>
            <label style={labelStyle}>
              Description
            </label>
            <input
              value={cpDesc}
              onChange={(e) => setCpDesc(e.target.value)}
              placeholder="What are you building?"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "#f5c842")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  "rgba(255,255,255,0.08)")
              }
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={labelStyle}>
              Tech Stack (comma separated)
            </label>
            <input
              value={cpStack}
              onChange={(e) => setCpStack(e.target.value)}
              placeholder="Next.js, Supabase, React Native..."
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "#f5c842")
              }
              onBlur={(e) =>
                (e.target.style.borderColor =
                  "rgba(255,255,255,0.08)")
              }
            />
          </div>

          <button
            onClick={saveCurrentProject}
            disabled={cpSaving}
            style={{
              background: cpSaving
                ? "rgba(255,255,255,0.06)"
                : "linear-gradient(135deg, #f5c842, #f59e0b)",
              color: "#05070d",
              border: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.75rem 1.8rem",
              borderRadius: "50px",
              cursor: cpSaving ? "not-allowed" : "pointer",
              fontWeight: "700",
            }}
          >
            {cpSaving ? "Saving..." : "💾 Update Widget"}
          </button>
        </div>

        {/* ADD CLIENT */}
        <div
          style={{
            background: "#0d1220",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1.8rem",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "1.2rem",
            }}
          >
            ➕ Add New Client
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.8rem",
              marginBottom: "1rem",
            }}
          >
            <div>
              <label style={labelStyle}>Client Name</label>
              <input
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
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
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
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
              <label style={labelStyle}>Project Name</label>
              <input
                value={addProject}
                onChange={(e) => setAddProject(e.target.value)}
                placeholder="Business Website"
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

          <button
            onClick={addClient}
            disabled={
              adding || !addEmail || !addName || !addProject
            }
            style={{
              background:
                adding || !addEmail || !addName || !addProject
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, #00f5c8, #00c4a0)",
              color:
                adding || !addEmail || !addName || !addProject
                  ? "#5a6278"
                  : "#05070d",
              border: "none",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.75rem 1.8rem",
              borderRadius: "50px",
              cursor:
                adding || !addEmail || !addName || !addProject
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "700",
            }}
          >
            {adding ? "Adding..." : "➕ Add Client"}
          </button>
        </div>

        {/* CLIENT LIST */}
        <div
          style={{
            background: "#0d1220",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "1.8rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              letterSpacing: "0.05em",
              color: "#eef0f6",
              marginBottom: "1.2rem",
            }}
          >
            👥 All Clients ({clients.length})
          </h2>

          {clients.length === 0 ? (
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.73rem",
                color: "#5a6278",
              }}
            >
              No clients yet — add one above!
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {clients.map((client) => (
                <div
                  key={client.id}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border:
                      "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "1.2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#eef0f6",
                        }}
                      >
                        {client.name}
                      </div>
                      <div
                        style={{
                          fontFamily:
                            "'JetBrains Mono', monospace",
                          fontSize: "0.65rem",
                          color: "#5a6278",
                          marginTop: "2px",
                        }}
                      >
                        {client.email} ·{" "}
                        {client.project_name}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "'JetBrains Mono', monospace",
                        fontSize: "0.62rem",
                        color:
                          client.status === "Live"
                            ? "#00C16E"
                            : "#00f5c8",
                        border: `1px solid ${
                          client.status === "Live"
                            ? "rgba(0,193,110,0.3)"
                            : "rgba(0,245,200,0.3)"
                        }`,
                        background:
                          client.status === "Live"
                            ? "rgba(0,193,110,0.1)"
                            : "rgba(0,245,200,0.08)",
                        padding: "0.3rem 0.8rem",
                        borderRadius: "50px",
                      }}
                    >
                      {client.status}
                    </div>
                  </div>

                  {/* STATUS SELECTOR */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    {STAGES.map((stage) => (
                      <button
                        key={stage}
                        onClick={() =>
                          updateStatus(client.id, stage)
                        }
                        disabled={updating === client.id}
                        style={{
                          fontFamily:
                            "'JetBrains Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.06em",
                          padding: "0.28rem 0.65rem",
                          borderRadius: "6px",
                          border:
                            client.status === stage
                              ? "1px solid #00f5c8"
                              : "1px solid rgba(255,255,255,0.08)",
                          background:
                            client.status === stage
                              ? "rgba(0,245,200,0.1)"
                              : "transparent",
                          color:
                            client.status === stage
                              ? "#00f5c8"
                              : "#5a6278",
                          cursor:
                            updating === client.id
                              ? "not-allowed"
                              : "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>

                  {/* NOTES */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <input
                      placeholder="Add a note for this client..."
                      value={notes[client.id] || client.notes || ""}
                      onChange={(e) =>
                        setNotes((prev) => ({
                          ...prev,
                          [client.id]: e.target.value,
                        }))
                      }
                      style={{
                        ...inputStyle,
                        fontSize: "0.75rem",
                        flex: 1,
                      }}
                    />
                    <button
                      onClick={() =>
                        updateStatus(
                          client.id,
                          client.status
                        )
                      }
                      disabled={updating === client.id}
                      style={{
                        background:
                          "rgba(0,245,200,0.08)",
                        border:
                          "1px solid rgba(0,245,200,0.2)",
                        color: "#00f5c8",
                        fontFamily:
                          "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        cursor:
                          updating === client.id
                            ? "not-allowed"
                            : "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {updating === client.id
                        ? "..."
                        : "Save Note"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

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
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#eef0f6",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.85rem",
  padding: "0.7rem 0.9rem",
  borderRadius: "10px",
  outline: "none",
  minHeight: "44px",
  transition: "border-color 0.2s",
};