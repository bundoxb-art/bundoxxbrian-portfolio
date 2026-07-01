import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BUNDOXXBRIAN",
  description: "Thoughts, tutorials and insights from Brian Kurui — Full-Stack Developer in Mombasa, Kenya.",
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 60;

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, cover_image_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <main
      style={{
        background: "#05070d",
        minHeight: "100vh",
        padding: "7rem 2rem 4rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
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
          Dev Blog
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "0.04em",
            lineHeight: "1",
            marginBottom: "0.6rem",
            color: "#eef0f6",
          }}
        >
          Thoughts & Builds
        </h1>

        <p
          style={{
            fontSize: "0.92rem",
            color: "#9ba3bb",
            lineHeight: "1.7",
            marginBottom: "3rem",
            maxWidth: "500px",
          }}
        >
          Things I&apos;ve built, learned, and discovered while coding
          from Mombasa, Kenya. 🐝
        </p>

        {/* POSTS GRID */}
        {!posts || posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "#0d1220",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              🐝
            </div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: "#5a6278",
              }}
            >
              No posts yet — Brian is cooking something up!
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* BACK */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#5a6278",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}

function BlogCard({
  post,
}: {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
  };
}) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          background: "#0d1220",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          overflow: "hidden",
          transition: "all 0.3s",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor =
            "rgba(0,245,200,0.25)";
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor =
            "rgba(255,255,255,0.08)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* COVER */}
        {post.cover_image_url ? (
          <div
            style={{
              height: "160px",
              background: "#090c14",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={post.title}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              height: "120px",
              background:
                "linear-gradient(135deg, rgba(0,245,200,0.1), rgba(139,92,246,0.08))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
            }}
          >
            🐝
          </div>
        )}

        {/* BODY */}
        <div
          style={{
            padding: "1.3rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {date && (
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "#5a6278",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {date}
            </div>
          )}

          <h2
            style={{
              fontSize: "1rem",
              fontWeight: "700",
              color: "#eef0f6",
              lineHeight: "1.4",
              marginBottom: "0.5rem",
              flex: 1,
            }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              style={{
                fontSize: "0.8rem",
                lineHeight: "1.6",
                color: "#9ba3bb",
                marginBottom: "0.8rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.excerpt}
            </p>
          )}

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#00f5c8",
              letterSpacing: "0.08em",
            }}
          >
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}