import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Login ── */
function LoginForm({ onLogin }) {
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!supabase) { setError("Supabase is not configured. Add your .env credentials."); setLoading(false); return; }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (err) setError("Incorrect email or password.");
    else onLogin();
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f3", padding: "40px 16px" }}>
      <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "48px 44px", width: "100%", maxWidth: 420, boxShadow: "0 4px 32px rgba(73,6,82,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link to="/" style={{ display: "inline-block", marginBottom: 20 }}>
            <img src="/logo.png" alt="TLR" style={{ height: 52, objectFit: "contain" }} />
          </Link>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "22px", color: "#490652", margin: "0 0 6px" }}>Blog Admin</h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888", margin: 0 }}>Sign in to manage posts</p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "#490652", marginBottom: 6 }}>Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none" }} />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "#490652", marginBottom: 6 }}>Password</label>
            <input type="password" required value={pass} onChange={e => setPass(e.target.value)}
              style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none" }} />
          </div>
          {error && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#e53e3e", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", padding: "12px", borderRadius: 30, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/blog" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#b33874" }}>← Back to Blog</Link>
        </p>
      </div>
    </div>
  );
}

/* ── Delete confirm modal ── */
function DeleteModal({ title, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ backgroundColor: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: "#fff0f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 22 }}>🗑</div>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "18px", color: "#490652", margin: "0 0 10px" }}>Delete this post?</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#666", margin: "0 0 28px", lineHeight: 1.5 }}>
          "<strong>{title}</strong>" will be permanently deleted and cannot be recovered.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={onCancel} style={{ padding: "10px 24px", borderRadius: 30, border: "1.5px solid #e0d0e6", backgroundColor: "transparent", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "#490652", cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "10px 24px", borderRadius: 30, border: "none", backgroundColor: "#e53e3e", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function Dashboard({ onSignOut }) {
  const navigate = useNavigate();
  const [posts, setPosts]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]       = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const loadPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, category, published, created_at, updated_at")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const togglePublished = async (post) => {
    await supabase.from("posts").update({ published: !post.published, updated_at: new Date().toISOString() }).eq("id", post.id);
    setPosts(ps => ps.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
    showToast(post.published ? "Post unpublished." : "Post published.");
  };

  const deletePost = async () => {
    await supabase.from("posts").delete().eq("id", deleteTarget.id);
    setPosts(ps => ps.filter(p => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast("Post deleted.");
  };

  const published  = posts.filter(p => p.published).length;
  const drafts     = posts.filter(p => !p.published).length;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f4fc" }}>

      {/* Top bar */}
      <div style={{ backgroundColor: "#490652", padding: "0 clamp(16px,4vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Link to="/" style={{ display: "inline-block", lineHeight: 0 }}>
              <img src="/logo.png" alt="TLR" style={{ height: 36, objectFit: "contain" }} />
            </Link>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,245,243,0.6)", borderLeft: "1px solid rgba(255,245,243,0.2)", paddingLeft: 20 }}>Blog Admin</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link to="/blog" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "rgba(255,245,243,0.7)", textDecoration: "none" }}>View Blog ↗</Link>
            <button onClick={onSignOut} style={{ backgroundColor: "rgba(255,245,243,0.1)", border: "1px solid rgba(255,245,243,0.2)", color: "rgba(255,245,243,0.8)", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", padding: "7px 16px", borderRadius: 20, cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px clamp(16px,4vw,40px)" }}>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          {[
            { label: "Total Posts", value: posts.length },
            { label: "Published",   value: published,  color: "#22c55e" },
            { label: "Drafts",      value: drafts,     color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 28px", flex: "1 1 140px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>{s.label}</p>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "28px", color: s.color || "#490652", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "20px", color: "#490652", margin: 0 }}>All Posts</h2>
          <button onClick={() => navigate("/blog/admin/new")}
            style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", padding: "10px 24px", borderRadius: 30, border: "none", cursor: "pointer" }}>
            + New Post
          </button>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "white", borderRadius: 20, boxShadow: "0 1px 8px rgba(73,6,82,0.06)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 48, textAlign: "center" }}>
              <div className="bp-spinner" style={{ margin: "0 auto" }} />
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "18px", color: "#490652", marginBottom: 8 }}>No posts yet</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888" }}>Click "New Post" to write your first article.</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0e4f7" }}>
                  {["Title", "Category", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", padding: "14px 20px", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid #f9f0fc" : "none" }}>
                    <td style={{ padding: "16px 20px", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", color: "#2b0232", maxWidth: 280 }}>
                      <div style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.title}</div>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span style={{ backgroundColor: "#ffe6ee", color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{post.category}</span>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <button onClick={() => togglePublished(post)}
                        style={{ backgroundColor: post.published ? "#dcfce7" : "#fef9c3", color: post.published ? "#15803d" : "#92400e", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: 20, border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                        {post.published ? "● Published" : "○ Draft"}
                      </button>
                    </td>
                    <td style={{ padding: "16px 20px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888", whiteSpace: "nowrap" }}>
                      {formatDate(post.created_at)}
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => navigate(`/blog/admin/edit/${post.id}`)}
                          style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid #e0d0e6", backgroundColor: "transparent", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#490652", cursor: "pointer" }}>
                          Edit
                        </button>
                        <button onClick={() => setDeleteTarget(post)}
                          style={{ padding: "6px 14px", borderRadius: 20, border: "1.5px solid #fecdd3", backgroundColor: "transparent", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#e53e3e", cursor: "pointer" }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {deleteTarget && <DeleteModal title={deleteTarget.title} onConfirm={deletePost} onCancel={() => setDeleteTarget(null)} />}

      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", padding: "12px 24px", borderRadius: 12, boxShadow: "0 4px 24px rgba(73,6,82,0.3)", zIndex: 9999, animation: "slideInToast 0.25s ease" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
const BlogAdmin = () => {
  const [user, setUser]     = useState(undefined);

  useEffect(() => {
    if (!supabase) { setUser(null); return; }
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user === undefined) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f3" }}>
        <div className="bp-spinner" />
      </div>
    );
  }

  if (!user) return <LoginForm onLogin={() => supabase.auth.getUser().then(({ data }) => setUser(data?.user))} />;

  return <Dashboard onSignOut={handleSignOut} />;
};

export default BlogAdmin;
