import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const CATEGORIES = ["Company News", "Care Tips", "Staff Stories", "Community", "Supported Living", "Home Care"];

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
  if (!text) return <p style={{ color: "#bbb", fontStyle: "italic" }}>Start typing to see a preview…</p>;
  const lines = text.split("\n");
  const out = []; let listBuf = []; let key = 0;
  const flushList = () => {
    if (!listBuf.length) return;
    out.push(<ul key={key++} className="bp-list">{listBuf.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>);
    listBuf = [];
  };
  lines.forEach(line => {
    if (line.startsWith("# "))        { flushList(); out.push(<h2 key={key++} className="bp-h2">{line.slice(2)}</h2>); }
    else if (line.startsWith("## "))  { flushList(); out.push(<h3 key={key++} className="bp-h3">{line.slice(3)}</h3>); }
    else if (line.startsWith("> "))   { flushList(); out.push(<blockquote key={key++} className="bp-quote">{renderInline(line.slice(2))}</blockquote>); }
    else if (line.startsWith("- "))   { listBuf.push(line.slice(2)); }
    else if (line.trim() === "")      { flushList(); }
    else                              { flushList(); out.push(<p key={key++} className="bp-p">{renderInline(line)}</p>); }
  });
  flushList();
  return out;
}

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id }   = useParams();
  const isEdit   = !!id;

  const [loading,  setLoading]  = useState(isEdit);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const [tab,      setTab]      = useState("write");
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    category: CATEGORIES[0], author: "Tender Living Residence",
    cover_url: "", published: false,
  });

  useEffect(() => {
    if (!supabase) { navigate("/blog/admin"); return; }
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) navigate("/blog/admin");
    });
    if (isEdit) {
      supabase.from("posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({ title: data.title, slug: data.slug, excerpt: data.excerpt || "", content: data.content || "", category: data.category || CATEGORIES[0], author: data.author || "Tender Living Residence", cover_url: data.cover_url || "", published: data.published });
        setLoading(false);
      });
    }
  }, [id]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleTitle = (val) => {
    set("title", val);
    if (!slugLocked) set("slug", slugify(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.slug.trim())  { setError("Slug is required."); return; }
    setSaving(true); setError("");
    const payload = { ...form, slug: form.slug.trim(), updated_at: new Date().toISOString() };
    let err;
    if (isEdit) {
      ({ error: err } = await supabase.from("posts").update(payload).eq("id", id));
    } else {
      ({ error: err } = await supabase.from("posts").insert([payload]));
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    navigate("/blog/admin");
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f4fc" }}>
        <div className="bp-spinner" />
      </div>
    );
  }

  const inputSt = { width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1a1a1a", outline: "none", backgroundColor: "white" };
  const labelSt = { display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "#490652", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f4fc" }}>

      {/* Top bar */}
      <div style={{ backgroundColor: "#490652", padding: "0 clamp(16px,4vw,40px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
            <button onClick={() => navigate("/blog/admin")} style={{ background: "none", border: "none", color: "rgba(255,245,243,0.7)", fontFamily: "Inter, sans-serif", fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap" }}>
              ← Dashboard
            </button>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px", color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {isEdit ? "Edit Post" : "New Post"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button type="button" onClick={() => { set("published", false); handleSubmit({ preventDefault: () => {} }); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "1px solid rgba(255,245,243,0.3)", backgroundColor: "transparent", color: "rgba(255,245,243,0.85)", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
              Save Draft
            </button>
            <button type="button" onClick={() => { set("published", true); setTimeout(() => document.getElementById("be-form").requestSubmit(), 0); }}
              style={{ padding: "8px 22px", borderRadius: 20, border: "none", backgroundColor: "#f06943", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <form id="be-form" onSubmit={handleSubmit}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px clamp(16px,4vw,40px)", display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>

          {/* Main column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {error && <div style={{ backgroundColor: "#fff0f0", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#e53e3e" }}>{error}</div>}

            {/* Title */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <input
                type="text"
                placeholder="Post title…"
                value={form.title}
                onChange={e => handleTitle(e.target.value)}
                style={{ ...inputSt, fontSize: "22px", fontFamily: "Poppins, sans-serif", fontWeight: 700, color: "#490652", border: "none", padding: "0", borderRadius: 0, marginBottom: 12 }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#999" }}>slug:</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => { setSlugLocked(true); set("slug", slugify(e.target.value)); }}
                  style={{ ...inputSt, fontSize: "12px", color: "#666", padding: "4px 10px", borderRadius: 6, flex: 1 }}
                />
                <button type="button" onClick={() => { setSlugLocked(false); set("slug", slugify(form.title)); }}
                  style={{ background: "none", border: "none", fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#b33874", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Reset
                </button>
              </div>
            </div>

            {/* Content editor */}
            <div style={{ backgroundColor: "white", borderRadius: 16, boxShadow: "0 1px 8px rgba(73,6,82,0.06)", overflow: "hidden" }}>
              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #f0e4f7" }}>
                {["write", "preview"].map(t => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    style={{ flex: 1, padding: "13px", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", textTransform: "capitalize", border: "none", cursor: "pointer", backgroundColor: tab === t ? "white" : "#fdf8ff", color: tab === t ? "#490652" : "#aaa", borderBottom: tab === t ? "2px solid #490652" : "none" }}>
                    {t === "write" ? "✏ Write" : "👁 Preview"}
                  </button>
                ))}
              </div>

              {tab === "write" ? (
                <div>
                  {/* Formatting hint */}
                  <div style={{ display: "flex", gap: 12, padding: "10px 16px", borderBottom: "1px solid #f9f0fc", flexWrap: "wrap" }}>
                    {[["# H2", "# "], ["## H3", "## "], ["**bold**", "**bold**"], ["*italic*", "*italic*"], ["- List", "- item"], ["> Quote", "> "]].map(([label]) => (
                      <span key={label} style={{ fontFamily: "monospace", fontSize: "11px", backgroundColor: "#f0e4f7", color: "#490652", padding: "2px 8px", borderRadius: 4 }}>{label}</span>
                    ))}
                  </div>
                  <textarea
                    value={form.content}
                    onChange={e => set("content", e.target.value)}
                    placeholder={"Start writing your post…\n\nUse # for headings, **bold**, *italic*, - for lists, > for quotes."}
                    style={{ width: "100%", boxSizing: "border-box", minHeight: 420, padding: "20px 24px", fontFamily: "monospace", fontSize: "14px", lineHeight: 1.8, border: "none", outline: "none", resize: "vertical", color: "#1a1a1a" }}
                  />
                </div>
              ) : (
                <div className="bp-content" style={{ minHeight: 420, padding: "24px 28px" }}>
                  {renderContent(form.content)}
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "24px 28px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <label style={labelSt}>Excerpt <span style={{ fontWeight: 400, color: "#aaa" }}>(shown on listing page)</span></label>
              <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={3}
                placeholder="A short summary of this post…"
                style={{ ...inputSt, resize: "vertical" }} />
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Publish status */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", color: "#490652", margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Status</p>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div
                  onClick={() => set("published", !form.published)}
                  style={{ width: 42, height: 24, borderRadius: 12, backgroundColor: form.published ? "#490652" : "#d1d5db", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 3, left: form.published ? 21 : 3, width: 18, height: 18, borderRadius: "50%", backgroundColor: "white", transition: "left 0.2s" }} />
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: form.published ? "#15803d" : "#92400e" }}>
                  {form.published ? "Published" : "Draft"}
                </span>
              </label>
            </div>

            {/* Category */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <label style={labelSt}>Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} style={{ ...inputSt }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Author */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <label style={labelSt}>Author</label>
              <input type="text" value={form.author} onChange={e => set("author", e.target.value)} style={inputSt} />
            </div>

            {/* Cover image */}
            <div style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 22px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <label style={labelSt}>Cover Image URL</label>
              <input type="url" value={form.cover_url} onChange={e => set("cover_url", e.target.value)} placeholder="https://…" style={inputSt} />
              {form.cover_url && (
                <img src={form.cover_url} alt="cover preview" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginTop: 12 }} onError={e => { e.target.style.display = "none"; }} />
              )}
            </div>

            {/* Save */}
            <button type="submit" disabled={saving}
              style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", padding: "13px", borderRadius: 30, border: "none", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
              {saving ? "Saving…" : isEdit ? "Update Post" : "Save Post"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
