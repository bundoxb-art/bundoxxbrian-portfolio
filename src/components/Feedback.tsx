"use client";

import { useState, useEffect } from "react";

interface Review {
  rating: number;
  comment: string;
  date: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    rating: 5,
    comment: "Brian delivered our website faster than expected. Outstanding quality!",
    date: "Dec 2024",
  },
  {
    rating: 5,
    comment: "The mobile app works flawlessly on Android and iOS. Great communication.",
    date: "Jan 2025",
  },
  {
    rating: 5,
    comment: "Handled our data entry with accuracy and speed. Focused, Fast, Reliable!",
    date: "Feb 2025",
  },
];

const STAR_LABELS = ["", "Poor 😕", "Fair 🙂", "Good 👍", "Very Good 😊", "Excellent! 🤩"];

export default function Feedback() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bb_reviews");
      if (saved) setReviews(JSON.parse(saved));
    } catch {}
  }, []);

  const avg =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  function handleSubmit() {
    if (!rating) return alert("Please select a star rating!");
    const now = new Date();
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const newReview: Review = {
      rating,
      comment: comment.trim() || `${STAR_LABELS[rating]} experience working with Brian!`,
      date: `${months[now.getMonth()]} ${now.getFullYear()}`,
    };
    const updated = [...reviews, newReview];
    setReviews(updated);
    localStorage.setItem("bb_reviews", JSON.stringify(updated));
    setRating(0);
    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
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
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
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
          Leave Your Feedback
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
          Worked with Brian? Rate your experience — it takes 30 seconds!
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
              background: "linear-gradient(135deg, rgba(0,245,200,0.04), rgba(139,92,246,0.03))",
              border: "1px solid rgba(0,245,200,0.2)",
              borderRadius: "20px",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.8rem",
                letterSpacing: "0.06em",
                marginBottom: "0.3rem",
                color: "#eef0f6",
              }}
            >
              Rate My Work ⭐
            </h3>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "#5a6278",
                marginBottom: "1.5rem",
                lineHeight: "1.6",
              }}
            >
              Tap the stars to rate, then leave a comment.
            </p>

            {/* STARS */}
            <div
              className="star-pick"
              style={{
                display: "flex",
                gap: "0.4rem",
                justifyContent: "center",
                marginBottom: "0.5rem",
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: "2.8rem",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    lineHeight: "1",
                    padding: "0.2rem",
                    minWidth: "44px",
                    minHeight: "44px",
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

            {/* STAR LABEL */}
            <p
              style={{
                textAlign: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: hoverRating || rating ? "#f5c842" : "#5a6278",
                letterSpacing: "0.1em",
                marginBottom: "1.2rem",
                minHeight: "1.2rem",
                transition: "all 0.2s",
              }}
            >
              {STAR_LABELS[hoverRating || rating] || "Tap a star to rate"}
            </p>

            {/* COMMENT */}
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
                Your Comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell others about your experience working with Brian…"
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#eef0f6",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.87rem",
                  padding: "0.72rem 0.9rem",
                  borderRadius: "10px",
                  outline: "none",
                  resize: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#00f5c8")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #00f5c8, #00c4a0)",
                color: "#05070d",
                border: "none",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.88rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(0,245,200,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Submit Feedback 🐝
            </button>

            {/* SUCCESS MSG */}
            {submitted && (
              <div
                style={{
                  marginTop: "0.8rem",
                  padding: "0.8rem 1rem",
                  background: "rgba(0,245,200,0.08)",
                  border: "1px solid rgba(0,245,200,0.2)",
                  borderRadius: "10px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#00f5c8",
                  textAlign: "center",
                }}
              >
                🎉 Thank you for your feedback!
              </div>
            )}
          </div>

          {/* RIGHT — REVIEWS LIST */}
          <div>
            {/* AVG RATING */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "3rem",
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
                    fontSize: "1.1rem",
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
                    marginTop: "2px",
                  }}
                >
                  Based on {reviews.length} review
                  {reviews.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* REVIEW CARDS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxHeight: "480px",
                overflowY: "auto",
                paddingRight: "4px",
              }}
            >
              {[...reviews].reverse().map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── REVIEW CARD ──
function ReviewCard({ review }: { review: Review }) {
  const initials = ["A","B","C","D","E","F","G","H"][
    Math.floor(Math.random() * 8)
  ];
  const colors = [
    "linear-gradient(135deg,#00f5c8,#8b5cf6)",
    "linear-gradient(135deg,#8b5cf6,#f5c842)",
    "linear-gradient(135deg,#f5c842,#00f5c8)",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      style={{
        background: "#0d1220",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        padding: "1.1rem",
        transition: "all 0.25s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(0,245,200,0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "0.78rem",
              color: "#05070d",
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <div
              style={{ color: "#f5c842", fontSize: "0.78rem", letterSpacing: "1px" }}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: "#5a6278",
          }}
        >
          {review.date}
        </div>
      </div>
      <p style={{ fontSize: "0.85rem", lineHeight: "1.7", color: "#9ba3bb" }}>
        {review.comment}
      </p>
    </div>
  );
}