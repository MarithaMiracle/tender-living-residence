import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderContent(text) {
  if (!text) return null;
  const lines = text.split("\n");
  const out = [];
  let listBuf = [];
  let key = 0;

  const flushList = () => {
    if (!listBuf.length) return;
    out.push(
      <ul key={key++} className="bp-list">
        {listBuf.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
      </ul>
    );
    listBuf = [];
  };

  lines.forEach(line => {
    if (line.startsWith("# ")) {
      flushList();
      out.push(<h2 key={key++} className="bp-h2">{line.slice(2)}</h2>);
    } else if (line.startsWith("## ")) {
      flushList();
      out.push(<h3 key={key++} className="bp-h3">{line.slice(3)}</h3>);
    } else if (line.startsWith("> ")) {
      flushList();
      out.push(<blockquote key={key++} className="bp-quote">{renderInline(line.slice(2))}</blockquote>);
    } else if (line.startsWith("- ")) {
      listBuf.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
    } else {
      flushList();
      out.push(<p key={key++} className="bp-p">{renderInline(line)}</p>);
    }
  });
  flushList();
  return out;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost]     = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      if (!supabase) { setNotFound(true); setLoading(false); return; }
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (!data) { setNotFound(true); setLoading(false); return; }
      setPost(data);

      const { data: rel } = await supabase
        .from("posts")
        .select("id, title, slug, cover_url, category, created_at")
        .eq("published", true)
        .eq("category", data.category)
        .neq("slug", slug)
        .limit(3);
      setRelated(rel || []);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f3" }}>
        <div className="bp-spinner" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "#fff5f3", gap: 16, padding: "80px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "24px", color: "#490652", margin: 0 }}>Article not found</p>
        <Link to="/blog" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "15px", color: "#b33874" }}>← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "340px", display: "flex", alignItems: "flex-end", overflow: "hidden", backgroundColor: "#490652" }}>
        {post.cover_url && (
          <img src={post.cover_url} alt={post.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(73,6,82,0.92) 0%, rgba(73,6,82,0.45) 60%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 860, margin: "0 auto", padding: "clamp(40px,5vw,80px) clamp(16px,4vw,40px) 48px" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,245,243,0.7)", textDecoration: "none", marginBottom: 20 }}>
            ← Back to Blog
          </Link>
          <div style={{ marginBottom: 14 }}>
            <span style={{ backgroundColor: "#b33874", color: "white", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {post.category}
            </span>
          </div>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 4vw, 46px)", color: "#fff5f3", margin: "0 0 14px", lineHeight: 1.15 }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,245,243,0.65)", margin: 0 }}>
            {post.author || "Tender Living Residence"} &nbsp;·&nbsp; {formatDate(post.created_at)}
          </p>
        </div>
      </section>

      {/* Article body */}
      <section style={{ backgroundColor: "#fff5f3", padding: "64px 0 80px" }}>
        <div className="bp-body">
          {post.excerpt && (
            <p className="bp-lead">{post.excerpt}</p>
          )}
          <div className="bp-content">
            {renderContent(post.content)}
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "white", padding: "60px 0 80px", borderTop: "1px solid #f0e4f7" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px,4vw,64px)" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", color: "#490652", margin: "0 0 32px" }}>
              More from {post.category}
            </h2>
            <div className="blog-grid-3">
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ backgroundColor: "#fff5f3", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: 140, backgroundColor: "#490652", flexShrink: 0, overflow: "hidden" }}>
                      {r.cover_url
                        ? <img src={r.cover_url} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#490652,#b33874)" }} />
                      }
                    </div>
                    <div style={{ padding: "16px 20px 20px" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#b33874", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>{r.category}</p>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px", color: "#490652", margin: "0 0 8px", lineHeight: 1.3 }}>{r.title}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#999", margin: 0 }}>{formatDate(r.created_at)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ backgroundColor: "#490652", padding: "64px clamp(16px,4vw,40px)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.5vw,32px)", color: "#fff5f3", margin: "0 0 12px" }}>
          Want to learn more about our services?
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(255,245,243,0.75)", margin: "0 auto 28px", maxWidth: 480 }}>
          Get in touch with our team — we respond promptly and guide you through every step.
        </p>
        <Link to="/contact" style={{ display: "inline-block", backgroundColor: "#f06943", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", padding: "13px 36px", borderRadius: "30px", textDecoration: "none" }}>
          Contact Us →
        </Link>
      </section>
    </>
  );
};

export default BlogPost;
