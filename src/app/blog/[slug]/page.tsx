import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_image_url")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — BUNDOXXBRIAN`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.cover_image_url ? [post.cover_image_url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-KE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main
      style={{
        background: "#05070d",
        minHeight: "100vh",
        padding: "7rem 2rem 4rem",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* BACK */}
        <Link
          href="/blog"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#5a6278",
            textDecoration: "none",
            letterSpacing: "0.08em",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            marginBottom: "2rem",
          }}
        >
          ← Back to Blog
        </Link>

        {/* DATE */}
        {date && (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#00f5c8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "0.8rem",
            }}
          >
            {date}
          </div>
        )}

        {/* TITLE */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
            letterSpacing: "0.04em",
            lineHeight: "1.05",
            color: "#eef0f6",
            marginBottom: "1rem",
          }}
        >
          {post.title}
        </h1>

        {/* EXCERPT */}
        {post.excerpt && (
          <p
            style={{
              fontSize: "1rem",
              color: "#9ba3bb",
              lineHeight: "1.7",
              marginBottom: "2rem",
              borderLeft: "3px solid #00f5c8",
              paddingLeft: "1rem",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* COVER IMAGE */}
        {post.cover_image_url && (
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "2.5rem",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image_url}
              alt={post.title}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        {/* CONTENT */}
        <div
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.9",
            color: "#9ba3bb",
          }}
        >
          <style>{`
            .markdown-body h1,
            .markdown-body h2,
            .markdown-body h3 {
              font-family: 'Bebas Neue', sans-serif;
              letter-spacing: 0.05em;
              color: #eef0f6;
              margin: 2rem 0 0.8rem;
              line-height: 1.1;
            }
            .markdown-body h1 { font-size: 2.2rem; }
            .markdown-body h2 { font-size: 1.8rem; }
            .markdown-body h3 { font-size: 1.4rem; }
            .markdown-body p { margin-bottom: 1.2rem; }
            .markdown-body a { color: #00f5c8; text-decoration: none; }
            .markdown-body a:hover { text-decoration: underline; }
            .markdown-body code {
              background: rgba(0,245,200,0.1);
              border: 1px solid rgba(0,245,200,0.2);
              border-radius: 4px;
              padding: 0.15rem 0.4rem;
              font-family: 'JetBrains Mono', monospace;
              font-size: 0.82rem;
              color: #00f5c8;
            }
            .markdown-body pre {
              background: #0d1220;
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 10px;
              padding: 1.2rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }
            .markdown-body pre code {
              background: none;
              border: none;
              padding: 0;
              color: #eef0f6;
              font-size: 0.85rem;
            }
            .markdown-body ul,
            .markdown-body ol {
              padding-left: 1.5rem;
              margin-bottom: 1.2rem;
            }
            .markdown-body li { margin-bottom: 0.4rem; }
            .markdown-body blockquote {
              border-left: 3px solid #8b5cf6;
              padding-left: 1rem;
              color: #9ba3bb;
              font-style: italic;
              margin: 1.5rem 0;
            }
            .markdown-body strong {
              color: #eef0f6;
              font-weight: 600;
            }
            .markdown-body hr {
              border: none;
              border-top: 1px solid rgba(255,255,255,0.08);
              margin: 2rem 0;
            }
          `}</style>
          <div className="markdown-body">
            <ReactMarkdown>{post.content || ""}</ReactMarkdown>
          </div>
        </div>

        {/* AUTHOR */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Image
            src="/bee.jpg"
            alt="Brian"
            width={48}
            height={48}
            style={{
              borderRadius: "50%",
              border: "2px solid #f5c842",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#eef0f6",
              }}
            >
              Brian Kurui — BundoxxBrian
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "#5a6278",
                marginTop: "2px",
              }}
            >
              Full-Stack Developer · Mombasa, Kenya 🐝
            </div>
          </div>

          <a
            href="https://wa.me/254768771559"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#25D366",
              border: "1px solid rgba(37,211,102,0.3)",
              padding: "0.4rem 0.9rem",
              borderRadius: "50px",
              textDecoration: "none",
              letterSpacing: "0.06em",
              flexShrink: 0,
            }}
          >
            💬 WhatsApp
          </a>
        </div>

        {/* BACK */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <Link
            href="/blog"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#5a6278",
              textDecoration: "none",
            }}
          >
            ← More Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
