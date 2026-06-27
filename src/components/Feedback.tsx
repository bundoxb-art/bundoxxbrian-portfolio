"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  reviewer_name: string;
  project_type: string;
  created_at: string;
}

const PROJECT_TYPES = [
  "Web Development",
  "Mobile App",
  "Brand / Logo Design",
  "Virtual Assistant",
  "Data Entry",
  "Other",
];

const STAR_LABELS = [
  "",
  "Poor 😕",
  "Fair 🙂",
  "Good 👍",
  "Very Good 😊",
  "Excellent! 🤩",
];

const AVATAR_COLORS = [
  "linear-gradient(135deg,#00f5c8,#8b5cf6)",
  "linear-gradient(135deg,#8b5cf6,#f5c842)",
  "linear-gradient(135deg,#f5c842,#00f5c8)",
  "linear-gradient(135deg,#00f5c8,#f5c842)",
  "linear-gradient(135deg,#8b5cf6,#00f5c8)",
];

export default function Feedback() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function fetchReviews() {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.reviews) setReviews(data.reviews);
    } catch {
      console.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  const avg =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "5.0";

  async function handleSubmit() {
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!rating) {
      setError("Please select a star rating");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          projectType,
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
      setName("");
      setEmail("");
      setRating(0);
      setComment("");
      setProjectType(PROJECT_TYPES[0]);
    } catch {
      setError("Something went wrong. Please try again!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="feedback"
      className="section-pad"
      style={{
        padding: "5.5rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
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
          Client Reviews
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
          What Clients Say
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
          Worked with BundoxxB? Leave a review — it takes 60 seconds
          and helps others know what to expect! 🐝
        </p>

        <div
          className="feedback-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* LEFT — SUBMIT FORM */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
              border: "1px solid rgba(0,245,200,0.2)",
              borderRadius: "20px",
              padding: "2rem",
            }}
          >
            {submitted ? (
              /* SUCCESS STATE */
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div
                  style={{ fontSize: "3rem", marginBottom: "1rem" }}
                >
                  🎉
                </div>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.6rem",
                    color: "#eef0f6",
                    marginBottom: "0.6rem",
                  }}
                >
                  Thank You!
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#9ba3bb",
                    lineHeight: "1.7",
                    marginBottom: "1.2rem",
                  }}
                >
                  Your review has been submitted! BundoxxB will approve
                  it shortly and it will appear here. 🐝
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#00f5c8",
                    background: "transparent",
                    border: "1px solid rgba(0,245,200,0.2)",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                >
                  Leave Another Review
                </button>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.6rem",
                    letterSpacing: "0.06em",
                    marginBottom: "1.2rem",
                    color: "#eef0f6",
                  }}
                >
                  Rate My Work ⭐
                </h3>

                {/* NAME + EMAIL */}
                <div
                  className="form-row-2"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.8rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      Your Name *
                    </label>
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
                </div>

                {/* PROJECT TYPE */}
                <div style={{ marginBottom: "0.8rem" }}>
                  <label style={labelStyle}>
                    Project Type *
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* STARS */}
                <div style={{ marginBottom: "0.5rem" }}>
                  <label style={labelStyle}>
                    Rating *
                  </label>
                  <div
                    className="star-pick"
                    style={{
                      display: "flex",
                      gap: "0.2rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          fontSize: "2.2rem",
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          padding: "0.1rem",
                          minWidth: "40px",
                          minHeight: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "transform 0.2s",
                          transform:
                            star <= (hoverRating || rating)
                              ? "scale(1.2)"
                              : "scale(1)",
                          color:
                            star <= (hoverRating || rating)
                              ? "#f5c842"
                              : "rgba(255,255,255,0.15)",
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.68rem",
                      color:
                        hoverRating || rating
                          ? "#f5c842"
                          : "#5a6278",
                      minHeight: "1rem",
                      transition: "color 0.2s",
                      marginTop: "0.2rem",
                    }}
                  >
                    {STAR_LABELS[hoverRating || rating] ||
                      "Tap a star to rate"}
                  </p>
                </div>

                {/* COMMENT */}
                <div style={{ marginBottom: "0.9rem" }}>
                  <label style={labelStyle}>
                    Your Comment (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell others about your experience working with Brian…"
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "none",
                      minHeight: "80px",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "#00f5c8")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor =
                        "rgba(255,255,255,0.08)")
                    }
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <p
                    style={{
                      color: "#f5c842",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      marginBottom: "0.7rem",
                    }}
                  >
                    ⚠️ {error}
                  </p>
                )}

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #00f5c8, #00c4a0)",
                    color: "#05070d",
                    border: "none",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "0.88rem",
                    borderRadius: "50px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontWeight: "700",
                    opacity: submitting ? 0.6 : 1,
                    transition: "all 0.25s",
                  }}
                >
                  {submitting
                    ? "Submitting... 🐝"
                    : "Submit Review 🐝"}
                </button>
              </>
            )}
          </div>

          {/* RIGHT — REVIEWS LIST */}
          <div>
            {/* AVERAGE RATING */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                padding: "1.2rem",
                background: "#0d1220",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "3.5rem",
                  color: "#f5c842",
                  lineHeight: "1",
                }}
              >
                {avg}
              </span>
              <div>
                <div
                  style={{
                    color: "#f5c842",
                    fontSize: "1.2rem",
                    letterSpacing: "2px",
                  }}
                >
                  {"★".repeat(Math.round(Number(avg)))}
                  {"☆".repeat(5 - Math.round(Number(avg)))}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#5a6278",
                    marginTop: "4px",
                  }}
                >
                  {reviews.length} verified review
                  {reviews.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "100px",
                      background: "#0d1220",
                      borderRadius: "14px",
                      opacity: 0.5,
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                ))}
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && reviews.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 2rem",
                  background: "#0d1220",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
                  🐝
                </div>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#5a6278",
                  }}
                >
                  Be the first to leave a review!
                </p>
              </div>
            )}

            {/* REVIEW CARDS */}
            {!loading && reviews.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {reviews.map((review, i) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    colorIndex={i % AVATAR_COLORS.length}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
}

// ── REVIEW CARD ──
function ReviewCard({
  review,
  colorIndex,
}: {
  review: Review;
  colorIndex: number;
}) {
  const initials = review.reviewer_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        background: "#0d1220",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "1.2rem",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor =
          "rgba(0,245,200,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor =
          "rgba(255,255,255,0.08)")
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "0.7rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.7rem",
          }}
        >
          {/* AVATAR */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: AVATAR_COLORS[colorIndex],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "0.8rem",
              color: "#05070d",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.88rem",
                fontWeight: "600",
                color: "#eef0f6",
                lineHeight: "1.2",
              }}
            >
              {review.reviewer_name}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#5a6278",
                marginTop: "2px",
              }}
            >
              {review.project_type}
            </div>
          </div>
        </div>

        {/* DATE */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.58rem",
            color: "#5a6278",
            flexShrink: 0,
          }}
        >
          {format(new Date(review.created_at), "MMM yyyy")}
        </div>
      </div>

      {/* STARS */}
      <div
        style={{
          color: "#f5c842",
          fontSize: "0.85rem",
          letterSpacing: "2px",
          marginBottom: "0.5rem",
        }}
      >
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      {/* COMMENT */}
      {review.comment && (
        <p
          style={{
            fontSize: "0.83rem",
            lineHeight: "1.7",
            color: "#9ba3bb",
          }}
        >
          &ldquo;{review.comment}&rdquo;
        </p>
      )}
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
  padding: "0.7rem 0.9rem",
  borderRadius: "10px",
  outline: "none",
  minHeight: "44px",
  transition: "border-color 0.2s",
};