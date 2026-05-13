import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["All", "Company News", "Care Tips", "Staff Stories", "Community", "Supported Living", "Home Care"];

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" />
    </svg>
  </div>
);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function CategoryBadge({ label }) {
  return (
    <span style={{ backgroundColor: "#ffe6ee", color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {label}
    </span>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex" }}>
      <article style={{ backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(73,6,82,0.08)", display: "flex", flexDirection: "column", width: "100%", transition: "transform 0.18s, box-shadow 0.18s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(73,6,82,0.14)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(73,6,82,0.08)"; }}
      >
        {/* Cover */}
        <div style={{ height: "200px", overflow: "hidden", flexShrink: 0, position: "relative", backgroundColor: "#490652" }}>
          {post.cover_url ? (
            <img src={post.cover_url} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #490652 0%, #b33874 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "48px", opacity: 0.3 }}>✦</span>
            </div>
          )}
          <div style={{ position: "absolute", top: "14px", left: "14px" }}>
            <CategoryBadge label={post.category || "News"} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#999", margin: "0 0 10px" }}>
            {formatDate(post.created_at)}
          </p>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(16px, 1.4vw, 20px)", color: "#490652", margin: "0 0 12px", lineHeight: 1.3 }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#666", lineHeight: 1.65, margin: "0 0 20px", flex: 1 }}>
            {post.excerpt || post.content?.slice(0, 120) + "…"}
          </p>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "#b33874" }}>
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div style={{ backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(73,6,82,0.06)" }}>
      <div style={{ height: "200px", backgroundColor: "#f0e4f7", animation: "pulse 1.4s ease-in-out infinite" }} />
      <div style={{ padding: "24px" }}>
        <div style={{ height: 12, width: "40%", backgroundColor: "#f0e4f7", borderRadius: 6, marginBottom: 12, animation: "pulse 1.4s ease-in-out infinite" }} />
        <div style={{ height: 20, width: "80%", backgroundColor: "#f0e4f7", borderRadius: 6, marginBottom: 8, animation: "pulse 1.4s ease-in-out infinite" }} />
        <div style={{ height: 14, width: "100%", backgroundColor: "#f0e4f7", borderRadius: 6, marginBottom: 6, animation: "pulse 1.4s ease-in-out infinite" }} />
        <div style={{ height: 14, width: "70%", backgroundColor: "#f0e4f7", borderRadius: 6, animation: "pulse 1.4s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

const Blog = () => {
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [error, setError]       = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (!supabase) {
        setError("Blog is not yet configured. Please set up your Supabase environment variables.");
        setLoading(false);
        return;
      }
      const { data, error: err } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, content, category, cover_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (err) setError("Unable to load posts at this time.");
      else setPosts(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = posts.filter(p => {
    const matchCat = category === "All" || p.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || (p.excerpt || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#f4a5c6", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 16px" }}>
          INSIGHTS &amp; UPDATES
        </p>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 60px)", color: "#fff5f3", margin: "0 0 18px", lineHeight: 1.1 }}>
          Our Blog
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.5vw, 20px)", color: "rgba(255,245,243,0.8)", margin: "0 auto", maxWidth: 560, lineHeight: 1.65 }}>
          News, care advice, staff stories, and insights from the Tender Living Residence team.
        </p>
        <Wave />
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "#fff5f3", padding: "64px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" />
          </svg>
        </div>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 64px)" }}>

          {/* Search + Filter bar */}
          <div className="blog-toolbar">
            <div style={{ position: "relative", flex: "1 1 280px", maxWidth: 420 }}>
              <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#490652" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 16px 11px 40px", borderRadius: "30px", border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", backgroundColor: "white", outline: "none", color: "#490652" }}
              />
            </div>
            <div className="blog-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px",
                    padding: "8px 18px", borderRadius: "30px", border: "none", cursor: "pointer",
                    backgroundColor: category === cat ? "#490652" : "white",
                    color: category === cat ? "white" : "#490652",
                    boxShadow: category === cat ? "none" : "0 1px 4px rgba(73,6,82,0.08)",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ textAlign: "center", padding: "60px 24px", backgroundColor: "white", borderRadius: "20px", marginTop: "40px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", color: "#b33874", fontSize: "15px" }}>{error}</p>
            </div>
          )}

          {/* Grid */}
          {!error && (
            <div className="blog-grid" style={{ marginTop: "40px" }}>
              {loading
                ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                : filtered.length > 0
                  ? filtered.map(p => <PostCard key={p.id} post={p} />)
                  : (
                    <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "80px 24px" }}>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "20px", color: "#490652", marginBottom: 8 }}>No articles found</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#888" }}>Try a different search or category.</p>
                    </div>
                  )
              }
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Blog;
