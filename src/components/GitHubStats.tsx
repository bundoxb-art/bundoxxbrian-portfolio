"use client";

import { useEffect, useState } from "react";

interface GitHubData {
  totalRepos: number;
  totalStars: number;
  languages: { name: string; count: number }[];
  latestRepos: {
    name: string;
    description: string | null;
    url: string;
    stars: number;
    language: string | null;
    updated_at: string;
  }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  "HTML": "#e34f26",
  CSS: "#1572b6",
  Shell: "#89e051",
  Other: "#5a6278",
};

function SkeletonCard() {
  return (
    <div
      style={{
        background: "#0d1220",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "1.2rem",
        animation: "ghPulse 1.5s infinite",
      }}
    >
      <div
        style={{
          height: "14px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "4px",
          marginBottom: "0.6rem",
          width: "60%",
        }}
      />
      <div
        style={{
          height: "10px",
          background: "rgba(255,255,255,0.04)",
          borderRadius: "4px",
          width: "90%",
        }}
      />
    </div>
  );
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const totalLangs = data?.languages.reduce(
    (sum, l) => sum + l.count,
    0
  ) || 1;

  return (
    <section
      id="github"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "#090c14",
      }}
    >
      <style>{`
        @keyframes ghPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>

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
          Open Source
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
          GitHub Stats
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
          Real-time stats from my GitHub profile{" "}
          <a
            href="https://github.com/bundoxb-art"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00f5c8", textDecoration: "none" }}
          >
            @bundoxb-art ↗
          </a>
        </p>

        {/* ERROR STATE */}
        {error && (
          <div
            style={{
              padding: "2rem",
              background: "#0d1220",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              textAlign: "center",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.78rem",
              color: "#5a6278",
            }}
          >
            Couldn&apos;t load GitHub stats right now.{" "}
            <a
              href="https://github.com/bundoxb-art"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00f5c8" }}
            >
              View profile directly ↗
            </a>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* DATA */}
        {data && !loading && (
          <>
            {/* STAT CARDS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {[
                {
                  label: "Public Repos",
                  value: data.totalRepos,
                  icon: "📁",
                  color: "#00f5c8",
                },
                {
                  label: "Total Stars",
                  value: data.totalStars,
                  icon: "⭐",
                  color: "#f5c842",
                },
                {
                  label: "Languages Used",
                  value: data.languages.length,
                  icon: "💻",
                  color: "#8b5cf6",
                },
                {
                  label: "Recent Commits",
                  value: data.latestRepos.length + "+",
                  icon: "🔧",
                  color: "#00C16E",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: "#0d1220",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "1.3rem",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = stat.color + "50";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "2.2rem",
                      color: stat.color,
                      lineHeight: "1",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {stat.value}
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
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
              }}
              className="github-grid"
            >
              {/* LANGUAGES */}
              <div
                style={{
                  background: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.05em",
                    color: "#eef0f6",
                    marginBottom: "1.2rem",
                  }}
                >
                  Most Used Languages
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  {data.languages.map((lang) => {
                    const pct = Math.round(
                      (lang.count / totalLangs) * 100
                    );
                    const color =
                      LANG_COLORS[lang.name] || LANG_COLORS.Other;
                    return (
                      <div key={lang.name}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "0.3rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: color,
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.75rem",
                                color: "#eef0f6",
                              }}
                            >
                              {lang.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.7rem",
                              color: "#5a6278",
                            }}
                          >
                            {pct}%
                          </span>
                        </div>
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
                              width: `${pct}%`,
                              background: color,
                              borderRadius: "4px",
                              transition: "width 1s ease",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* LATEST REPOS */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem",
                    letterSpacing: "0.05em",
                    color: "#eef0f6",
                    marginBottom: "0.4rem",
                  }}
                >
                  Latest Repositories
                </h3>

                {data.latestRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      background: "#0d1220",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "1.1rem",
                      textDecoration: "none",
                      transition: "all 0.25s",
                      flex: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(0,245,200,0.25)";
                      e.currentTarget.style.transform =
                        "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "0.5rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.8rem",
                          color: "#00f5c8",
                          fontWeight: "600",
                        }}
                      >
                        ⌥ {repo.name}
                      </span>
                      {repo.stars > 0 && (
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            color: "#f5c842",
                            flexShrink: 0,
                          }}
                        >
                          ⭐ {repo.stars}
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p
                        style={{
                          fontSize: "0.78rem",
                          color: "#9ba3bb",
                          lineHeight: "1.5",
                          marginBottom: "0.5rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                        }}
                      >
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background:
                              LANG_COLORS[repo.language] ||
                              LANG_COLORS.Other,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.62rem",
                            color: "#5a6278",
                          }}
                        >
                          {repo.language}
                        </span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* VIEW ALL */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a
                href="https://github.com/bundoxb-art"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#eef0f6",
                  background: "#0d1220",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "0.75rem 1.8rem",
                  borderRadius: "50px",
                  textDecoration: "none",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#00f5c8";
                  e.currentTarget.style.color = "#00f5c8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#eef0f6";
                }}
              >
                ⌥ View All Repos on GitHub
              </a>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .github-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}