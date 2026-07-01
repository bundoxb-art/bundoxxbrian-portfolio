"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

/*
 * HOW TO ADD VIDEO TESTIMONIALS:
 * 1. Ask your client to record a quick Loom or YouTube video
 *    about their experience working with you.
 * 2. Client sends you the video link via WhatsApp: wa.me/254768771559
 * 3. Go to Supabase -> Table Editor -> video_reviews -> Insert Row:
 *    client_name, project_type, video_url, thumbnail_url (optional), approved: true
 * 4. The video appears on your portfolio automatically.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface VideoReview {
  id: string;
  client_name: string;
  project_type: string;
  video_url: string;
  thumbnail_url: string | null;
}

function getEmbedUrl(url: string): string {
  const ytMatch =
    url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    url.match(/youtu\.be\/([^?]+)/);
  if (ytMatch) {
    return "https://www.youtube.com/embed/" + ytMatch[1];
  }
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    return "https://www.loom.com/embed/" + loomMatch[1];
  }
  return url;
}

function getThumbnail(review: VideoReview): string {
  if (review.thumbnail_url) return review.thumbnail_url;
  const ytMatch =
    review.video_url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
    review.video_url.match(/youtu\.be\/([^?]+)/);
  if (ytMatch) {
    return "https://img.youtube.com/vi/" + ytMatch[1] + "/maxresdefault.jpg";
  }
  return "";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "linear-gradient(135deg,#00f5c8,#8b5cf6)",
  "linear-gradient(135deg,#8b5cf6,#f5c842)",
  "linear-gradient(135deg,#f5c842,#00f5c8)",
];

function VideoModal({
  review,
  onClose,
}: {
  review: VideoReview;
  onClose: () => void;
}) {
  const embedUrl = getEmbedUrl(review.video_url);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#0d1220",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(0,245,200,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#eef0f6" }}>
              {review.client_name}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", marginTop: "2px" }}>
              {review.project_type}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.06)", border: "none", color: "#eef0f6", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}
          >
            X
          </button>
        </div>

        <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
          <iframe
            src={embedUrl + "?autoplay=1"}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={review.client_name + " testimonial"}
          />
        </div>
      </div>
    </div>
  );
}

function TextReviewsFallback() {
  const reviews = [
    { name: "James Mwangi", type: "Web Development", text: "Brian delivered our website faster than expected. Outstanding quality and communication!", rating: 5 },
    { name: "Sarah Ochieng", type: "Mobile App", text: "The mobile app works flawlessly. Brian understood exactly what we needed.", rating: 5 },
    { name: "David Kipchoge", type: "Brand Design", text: "Focused, Fast and Reliable, exactly as advertised! Our brand kit looks amazing.", rating: 5 },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
      {reviews.map((r, i) => (
        <div
          key={r.name}
          style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.3rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: AVATAR_COLORS[i % AVATAR_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: "#05070d", flexShrink: 0 }}>
              {getInitials(r.name)}
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#eef0f6" }}>{r.name}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#5a6278", marginTop: "2px" }}>{r.type}</div>
            </div>
          </div>
          <div style={{ color: "#f5c842", fontSize: "0.85rem", letterSpacing: "2px", marginBottom: "0.5rem" }}>
            {"*".repeat(r.rating)}
          </div>
          <p style={{ fontSize: "0.83rem", lineHeight: "1.7", color: "#9ba3bb" }}>{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function VideoTestimonials() {
  const [reviews, setReviews] = useState<VideoReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoReview | null>(null);

  useEffect(() => {
    supabase
      .from("video_reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setReviews(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <section id="testimonials" style={{ padding: "5.5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#00f5c8", marginBottom: "0.5rem" }}>
          <span style={{ width: "20px", height: "1px", background: "#00f5c8", display: "inline-block" }} />
          Social Proof
        </div>

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "0.04em", lineHeight: "1", marginBottom: "0.6rem", color: "#eef0f6" }}>
          Client Testimonials
        </h2>

        <p style={{ fontSize: "0.92rem", color: "#9ba3bb", lineHeight: "1.7", marginBottom: "2.5rem", maxWidth: "500px" }}>
          What clients say about working with Brian.
        </p>

        {!loading && reviews.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {reviews.map((review, i) => {
              const thumbnail = getThumbnail(review);
              return (
                <div
                  key={review.id}
                  onClick={() => setActiveVideo(review)}
                  style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden", cursor: "pointer" }}
                >
                  <div style={{ position: "relative", paddingTop: "56.25%", background: thumbnail ? "#000" : "linear-gradient(135deg, rgba(0,245,200,0.1), rgba(139,92,246,0.08))" }}>
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumbnail} alt={review.client_name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                        🎥
                      </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(0,245,200,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "10px 0 10px 18px", borderColor: "transparent transparent transparent #05070d", marginLeft: "4px" }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: "1.1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: AVATAR_COLORS[i % AVATAR_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.72rem", color: "#05070d", flexShrink: 0 }}>
                        {getInitials(review.client_name)}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "#eef0f6" }}>{review.client_name}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#5a6278", marginTop: "2px" }}>{review.project_type}</div>
                      </div>
                      <div style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#00f5c8" }}>
                        Play
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <TextReviewsFallback />
        )}

        <div style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", background: "rgba(0,245,200,0.04)", border: "1px dashed rgba(0,245,200,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#eef0f6", fontWeight: 600, marginBottom: "0.2rem" }}>
              Worked with Brian?
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#5a6278" }}>
              Record a quick Loom video and send it via WhatsApp.
            </p>
          </div>

          <a
            href="https://wa.me/254768771559"
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#25D366", color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.7rem 1.4rem", borderRadius: "50px", textDecoration: "none", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}
          >
            Send Video via WhatsApp
          </a>
        </div>
      </div>

      {activeVideo && <VideoModal review={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}
