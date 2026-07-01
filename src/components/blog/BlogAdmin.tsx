"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

export default function BlogAdmin({ posts }: { posts: Post[] }) {
  const [view, setView] = useState<"list" | "write" | "preview">("list");
  const [editing, setEditing] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!editing) setSlug(slugify(val));
  }

  function startNew() {
    setEditing(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCoverUrl("");
    setView("write");
  }

  function startEdit(post: Post) {
    setEditing(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || "");
    setContent(post.content || "");
    setCoverUrl(post.cover_image_url || "");
    setView("write");
  }

  async function save(publish: boolean) {
    setSaving(true);
    try {
      const body = {
        id: editing?.id || null,
        title,
        slug,
        excerpt,
        content,
        cover_image_url: coverUrl || null,
        published: publish,
        published_at: publish ? new Date().toISOString() : null,
      };

      await fetch("/api/blog/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.refresh();
      setView("list");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function togglePublish(post: Post) {
    await fetch("/api/blog/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        cover_image_url: post.cover_image_url,
        published: !post.published,
        published_at: !post.published ? new Date().toISOString() : null,
      }),
    });
    router.refresh();
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#eef0f6",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    padding: "0.72rem 0.9rem",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <main style={{ background: "#05070d", minHeight: "100vh", padding: "7rem 2rem 4rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* NAV */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.05em", color: "#eef0f6" }}>
            Blog Admin ✍️
          </h1>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <button onClick={() => setView("list")} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: view === "list" ? "#00f5c8" : "#5a6278", background: "transparent", border: "1px solid " + (view === "list" ? "#00f5c8" : "rgba(255,255,255,0.08)"), padding: "0.4rem 1rem", borderRadius: "50px", cursor: "pointer" }}>
              All Posts
            </button>
            <button onClick={startNew} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#05070d", background: "#00f5c8", border: "none", padding: "0.4rem 1rem", borderRadius: "50px", cursor: "pointer", fontWeight: "700" }}>
              + New Post
            </button>
          </div>
        </div>

        {/* LIST VIEW */}
        {view === "list" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#5a6278", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
                No posts yet. Click &quot;+ New Post&quot; to write your first! 🐝
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", fontWeight: "600", color: "#eef0f6", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {post.title}
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278" }}>
                      /{post.slug} · {post.published ? "✅ Published" : "📝 Draft"}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button onClick={() => startEdit(post)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#00f5c8", background: "rgba(0,245,200,0.08)", border: "1px solid rgba(0,245,200,0.2)", padding: "0.35rem 0.8rem", borderRadius: "8px", cursor: "pointer" }}>
                      Edit
                    </button>
                    <button onClick={() => togglePublish(post)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: post.published ? "#f5c842" : "#00C16E", background: "transparent", border: `1px solid ${post.published ? "rgba(245,200,66,0.2)" : "rgba(0,193,110,0.2)"}`, padding: "0.35rem 0.8rem", borderRadius: "8px", cursor: "pointer" }}>
                      {post.published ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* WRITE VIEW */}
        {(view === "write" || view === "preview") && (
          <div>
            {/* WRITE/PREVIEW TABS */}
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.5rem" }}>
              {["write", "preview"].map((v) => (
                <button key={v} onClick={() => setView(v as "write" | "preview")} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: view === v ? "#00f5c8" : "#5a6278", background: "transparent", border: "1px solid " + (view === v ? "#00f5c8" : "rgba(255,255,255,0.08)"), padding: "0.4rem 1.2rem", borderRadius: "50px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {v}
                </button>
              ))}
            </div>

            {view === "write" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Title *</label>
                    <input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Post title..." style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Slug *</label>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="post-url-slug" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Excerpt</label>
                  <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description shown in blog list..." rows={2} style={{ ...inputStyle, resize: "none" }} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cover Image URL</label>
                  <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#5a6278", display: "block", marginBottom: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Content (Markdown) *</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post in Markdown...

# Heading 1
## Heading 2

**bold** *italic* `code`

- List item
- Another item" rows={20} style={{ ...inputStyle, resize: "vertical", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", lineHeight: "1.6" }} onFocus={(e) => (e.target.style.borderColor = "#00f5c8")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")} />
                </div>
              </div>
            ) : (
              /* PREVIEW */
              <div style={{ background: "#0d1220", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "2rem" }}>
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.5rem", color: "#eef0f6", marginBottom: "0.5rem" }}>{title || "Post Title"}</h1>
                {excerpt && <p style={{ color: "#9ba3bb", borderLeft: "3px solid #00f5c8", paddingLeft: "1rem", marginBottom: "1.5rem", fontStyle: "italic" }}>{excerpt}</p>}
                <div style={{ color: "#9ba3bb", fontSize: "0.9rem", lineHeight: "1.9" }}>
                  <ReactMarkdown>{content || "*No content yet...*"}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
              <button onClick={() => save(false)} disabled={saving || !title || !slug} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#eef0f6", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1.5rem", borderRadius: "50px", cursor: saving ? "not-allowed" : "pointer", opacity: !title || !slug ? 0.5 : 1 }}>
                💾 Save Draft
              </button>
              <button onClick={() => save(true)} disabled={saving || !title || !slug || !content} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#05070d", background: "linear-gradient(135deg, #00f5c8, #00c4a0)", border: "none", padding: "0.75rem 1.5rem", borderRadius: "50px", cursor: saving ? "not-allowed" : "pointer", fontWeight: "700", opacity: !title || !slug || !content ? 0.5 : 1 }}>
                {saving ? "Publishing..." : "🚀 Publish Now"}
              </button>
              <button onClick={() => setView("list")} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#5a6278", background: "transparent", border: "none", cursor: "pointer", padding: "0.75rem" }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}