import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Wave = ({ fill = "#fff5f3", position = "bottom", flipped = false }) => (
  <div style={{ position: "absolute", [position]: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block", transform: flipped ? "scaleY(-1)" : "none" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Login ── */
function LoginForm({ onLogin }) {
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [showPass, setShowPass] = useState(false);
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff5f3", padding: "40px 16px", position: "relative", overflow: "hidden" }}>
      {/* Bottom wave like WorkWithUs */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
          <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
        </svg>
      </div>
      <div className="ba-login-box" style={{ backgroundColor: "white", borderRadius: "24px", padding: "48px 44px", width: "100%", maxWidth: 420, boxShadow: "0 4px 32px rgba(73,6,82,0.1)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} required value={pass} onChange={e => setPass(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "11px 14px", paddingRight: "44px", borderRadius: 10, border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none" }} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#888" }}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
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
  const [activeTab, setActiveTab] = useState("posts");
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

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

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    setAdminLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const response = await fetch(
        "https://whdmwhslbsvrqreohauv.supabase.co/functions/v1/invite-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ email: newAdminEmail }),
        }
      );
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      showToast("Invitation sent successfully!");
      setNewAdminEmail("");
      setShowAddAdmin(false);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setAdminLoading(false);
    }
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
    <>
      {/* Top section (hero style with wave) */}
      <div style={{ backgroundColor: "#490652", padding: "24px clamp(16px,4vw,40px) 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="ba-topbar-left" style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,245,243,0.9)" }}>Blog Admin</span>
          </div>
          <div className="ba-topbar-right" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link to="/blog" className="ba-view-blog-link" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", color: "rgba(255,245,243,0.7)", textDecoration: "none" }}>View Blog ↗</Link>
            <button onClick={onSignOut} className="ba-sign-out-btn" style={{ backgroundColor: "rgba(255,245,243,0.1)", border: "1px solid rgba(255,245,243,0.2)", color: "rgba(255,245,243,0.8)", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "13px", padding: "7px 16px", borderRadius: 20, cursor: "pointer" }}>
              Sign Out
            </button>
          </div>
        </div>
        {/* Wave like WorkWithUs hero */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#f8f4fc" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div style={{ backgroundColor: "#f8f4fc", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        {/* Bottom wave like WorkWithUs */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 64px" }}>

        {/* Tabs */}
        <div className="ba-tabs" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <button onClick={() => setActiveTab("posts")} className="ba-tab-btn"
            style={{ backgroundColor: activeTab === "posts" ? "#490652" : "transparent", color: activeTab === "posts" ? "white" : "#490652", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", padding: "8px 20px", borderRadius: 24, border: activeTab === "posts" ? "none" : "1.5px solid #e0d0e6", cursor: "pointer" }}>
            Posts
          </button>
          <button onClick={() => setActiveTab("admins")} className="ba-tab-btn"
            style={{ backgroundColor: activeTab === "admins" ? "#490652" : "transparent", color: activeTab === "admins" ? "white" : "#490652", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", padding: "8px 20px", borderRadius: 24, border: activeTab === "admins" ? "none" : "1.5px solid #e0d0e6", cursor: "pointer" }}>
            Admin Management
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <>
            {/* Stats row */}
            <div className="ba-stats-row" style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { label: "Total Posts", value: posts.length },
                { label: "Published",   value: published,  color: "#22c55e" },
                { label: "Drafts",      value: drafts,     color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} className="ba-stat-card" style={{ backgroundColor: "white", borderRadius: 16, padding: "20px 28px", flex: "1 1 140px", boxShadow: "0 1px 8px rgba(73,6,82,0.06)" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>{s.label}</p>
                  <p className="ba-stat-value" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "28px", color: s.color || "#490652", margin: 0 }}>{s.value}</p>
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
            <div className="ba-table-container" style={{ backgroundColor: "white", borderRadius: 20, boxShadow: "0 1px 8px rgba(73,6,82,0.06)", overflow: "hidden" }}>
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
                <>
                  {/* Desktop table */}
                  <div className="ba-table-desktop" style={{ display: "block" }}>
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
                  </div>
                  {/* Mobile cards */}
                  <div className="ba-table-mobile" style={{ display: "none" }}>
                    {posts.map((post, i) => (
                      <div key={post.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid #f9f0fc" : "none", padding: "20px" }}>
                        <div style={{ marginBottom: "12px" }}>
                          <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "16px", color: "#2b0232", margin: "0 0 8px" }}>{post.title}</h3>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                            <span style={{ backgroundColor: "#ffe6ee", color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{post.category}</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888", whiteSpace: "nowrap" }}>{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                          <button onClick={() => togglePublished(post)}
                            style={{ flex: 1, backgroundColor: post.published ? "#dcfce7" : "#fef9c3", color: post.published ? "#15803d" : "#92400e", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, padding: "8px 12px", borderRadius: 20, border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            {post.published ? "● Published" : "○ Draft"}
                          </button>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button onClick={() => navigate(`/blog/admin/edit/${post.id}`)}
                            style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "1.5px solid #e0d0e6", backgroundColor: "transparent", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#490652", cursor: "pointer" }}>
                            Edit
                          </button>
                          <button onClick={() => setDeleteTarget(post)}
                            style={{ flex: 1, padding: "8px 12px", borderRadius: 20, border: "1.5px solid #fecdd3", backgroundColor: "transparent", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "12px", color: "#e53e3e", cursor: "pointer" }}>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* Admins Tab */}
        {activeTab === "admins" && (
          <div className="ba-admin-section" style={{ backgroundColor: "white", borderRadius: 20, boxShadow: "0 1px 8px rgba(73,6,82,0.06)", padding: "32px" }}>
            <div className="ba-admin-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "20px", color: "#490652", margin: 0 }}>Admin Management</h2>
              <button onClick={() => setShowAddAdmin(!showAddAdmin)}
                style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", padding: "10px 24px", borderRadius: 30, border: "none", cursor: "pointer" }}>
                + Add Admin
              </button>
            </div>

            {showAddAdmin && (
              <form onSubmit={handleAddAdmin} className="ba-add-admin-form" style={{ backgroundColor: "#fff0f6", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px", color: "#490652", margin: "0 0 16px" }}>Add New Admin</h3>
                <div className="ba-add-admin-form-inner" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <input type="email" required placeholder="admin@example.com" className="ba-add-admin-input" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)}
                    style={{ flex: "1 1 280px", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0d0e6", fontFamily: "Inter, sans-serif", fontSize: "14px", outline: "none" }} />
                  <button type="submit" disabled={adminLoading} className="ba-add-admin-btn"
                    style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", padding: "11px 28px", borderRadius: 30, border: "none", cursor: adminLoading ? "not-allowed" : "pointer", opacity: adminLoading ? 0.7 : 1 }}>
                    {adminLoading ? "Sending..." : "Send Invite"}
                  </button>
                </div>
              </form>
            )}

            <div style={{ backgroundColor: "#fff0f6", borderRadius: 16, padding: "20px", textAlign: "center" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#490652", margin: 0 }}>
                Invite new admins by email. They'll receive an invitation to set up their password.
              </p>
            </div>
          </div>
        )}
        </div>
      </div>

      {deleteTarget && <DeleteModal title={deleteTarget.title} onConfirm={deletePost} onCancel={() => setDeleteTarget(null)} />}

      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", padding: "12px 24px", borderRadius: 12, boxShadow: "0 4px 24px rgba(73,6,82,0.3)", zIndex: 9999, animation: "slideInToast 0.25s ease" }}>
          {toast}
        </div>
      )}
    </>
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