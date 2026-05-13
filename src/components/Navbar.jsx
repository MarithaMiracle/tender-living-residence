import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4l4 4 4-4" />
  </svg>
);

const ChevronRight = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2l4 4-4 4" />
  </svg>
);

const navLinks = [
  { label: "Home", to: "/" },
  {
    label: "About",
    children: [
      { label: "About Us",   to: "/about" },
      { label: "Our Values", to: "/our-values" },
    ],
  },
  {
    label: "Our Services",
    to: "/services",
    children: [
      {
        label: "Home-Based Care",
        desc: "Domiciliary, live-in, complex & respite care",
        services: [
          { label: "Domiciliary Care", to: "/services/home-based-care/domiciliary-care" },
          { label: "Live-In Care",     to: "/services/home-based-care/live-in-care" },
          { label: "Respite Care",     to: "/services/home-based-care/home-based-respite" },
          { label: "Complex Care",     to: "/services/home-based-care/complex-care" },
        ],
      },
      {
        label: "Accommodation-Based Support",
        desc: "Supported living & supported accommodation",
        services: [
          { label: "Supported Living",        to: "/services/accommodation-based-support/supported-living" },
          { label: "Supported Accommodation", to: "/services/accommodation-based-support/supported-accommodation" },
        ],
      },
      {
        label: "Crisis & Urgent Support",
        desc: "Emergency placements & rapid response",
        services: [
          { label: "Emergency Crisis Placements", to: "/services/crisis-and-urgent-support/emergency-crisis-placements" },
          { label: "Rapid Response",              to: "/services/crisis-and-urgent-support/rapid-response" },
        ],
      },
    ],
  },
  {
    label: "Our Support",
    children: [
      { label: "Who We Support",  to: "/who-we-support" },
      { label: "How We Support",  to: "/how-we-support" },
      { label: "When We Support", to: "/when-we-support" },
    ],
  },
  { label: "Blog",    to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const CARD = {
  backgroundColor: "white",
  borderRadius:    "14px",
  boxShadow:       "0 16px 48px rgba(73,6,82,0.18), 0 2px 8px rgba(73,6,82,0.06)",
  border:          "1px solid rgba(73,6,82,0.07)",
  padding:         "8px",
};

const Navbar = () => {
  const [openDropdown,    setOpenDropdown]    = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [mobileExpanded,  setMobileExpanded]  = useState(null);
  const [mobileSub,       setMobileSub]       = useState(null);
  const location = useLocation();

  const isActive = (to) => location.pathname === to;

  const isGroupActive = (link) => {
    if (link.to && link.to !== "/" && location.pathname.startsWith(link.to)) return true;
    return link.children?.some((c) => {
      if (c.to) return c.to !== "/" && location.pathname.startsWith(c.to);
      return c.services?.some((s) => location.pathname.startsWith(s.to));
    });
  };

  const closeAll = () => { setOpenDropdown(null); setOpenSubDropdown(null); };

  const toggleMobileGroup = (label) => {
    setMobileExpanded((p) => (p === label ? null : label));
    setMobileSub(null);
  };
  const toggleMobileSub = (label) =>
    setMobileSub((p) => (p === label ? null : label));

  return (
    <nav style={{
      backgroundColor: "#FFF5F3",
      borderBottom:    "1px solid rgba(73,6,82,0.1)",
      boxShadow:       "0 1px 16px rgba(73,6,82,0.07)",
      width:           "100%",
      position:        "sticky",
      top:             0,
      zIndex:          100,
    }}>
      <div style={{
        maxWidth:       "1440px",
        margin:         "0 auto",
        padding:        "0 40px",
        height:         "72px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        gap:            "16px",
      }}>

        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0, lineHeight: 0 }}>
          <img src="/logo.png" alt="Tender Living Residence" style={{ height: "48px", objectFit: "contain", display: "block" }} />
        </Link>

        {/* Desktop nav */}
        <div className="navbar-desktop-nav" style={{ alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={() => { setOpenDropdown(link.label); setOpenSubDropdown(null); }}
                onMouseLeave={() => { setOpenDropdown(null); setOpenSubDropdown(null); }}
              >
                {/* Trigger */}
                {link.to ? (
                  /* "Our Services" — clickable label + chevron */
                  <div style={{ display: "flex", alignItems: "center", borderRadius: "8px", backgroundColor: isGroupActive(link) ? "rgba(179,56,116,0.07)" : "transparent" }}>
                    <Link
                      to={link.to}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                        color: isGroupActive(link) ? "#b33874" : "#490652",
                        textDecoration: "none", padding: "8px 4px 8px 12px",
                      }}
                    >
                      {link.label}
                    </Link>
                    <span style={{ padding: "8px 10px 8px 2px", color: isGroupActive(link) ? "#b33874" : "#490652", display: "flex", alignItems: "center" }}>
                      <ChevronDown />
                    </span>
                  </div>
                ) : (
                  <button style={{
                    display: "flex", alignItems: "center", gap: "5px",
                    fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                    color: isGroupActive(link) ? "#b33874" : "#490652",
                    background: "none", border: "none", cursor: "pointer",
                    padding: "8px 12px", borderRadius: "8px",
                    backgroundColor: isGroupActive(link) ? "rgba(179,56,116,0.07)" : "transparent",
                  }}>
                    {link.label}
                    <ChevronDown />
                  </button>
                )}

                {/* First-level dropdown */}
                {openDropdown === link.label && (
                  <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", paddingTop: "10px", minWidth: "300px", zIndex: 200 }}>
                    <div style={CARD}>
                      {link.children.map((child) =>
                        child.services ? (
                          /* Category item — hover reveals sub-dropdown */
                          <div
                            key={child.label}
                            style={{ position: "relative" }}
                            onMouseEnter={(e) => { e.stopPropagation(); setOpenSubDropdown(child.label); }}
                            onMouseLeave={(e) => { e.stopPropagation(); setOpenSubDropdown(null); }}
                          >
                            <div style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "10px 14px", borderRadius: "8px", gap: "12px",
                              backgroundColor: openSubDropdown === child.label ? "rgba(179,56,116,0.07)" : "transparent",
                              cursor: "default",
                            }}>
                              <div>
                                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#490652" }}>{child.label}</div>
                                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(73,6,82,0.5)", marginTop: "3px", lineHeight: 1.4 }}>{child.desc}</div>
                              </div>
                              <span style={{ color: openSubDropdown === child.label ? "#b33874" : "rgba(73,6,82,0.35)", flexShrink: 0 }}>
                                <ChevronRight />
                              </span>
                            </div>

                            {/* Sub-dropdown — paddingLeft creates hover bridge to prevent flicker */}
                            {openSubDropdown === child.label && (
                              <div style={{ position: "absolute", left: "100%", top: 0, paddingLeft: "6px", minWidth: "220px", zIndex: 300 }}>
                                <div style={CARD}>
                                  {child.services.map((svc) => (
                                    <Link
                                      key={svc.to}
                                      to={svc.to}
                                      onClick={closeAll}
                                      style={{
                                        display: "flex", alignItems: "center", gap: "10px",
                                        padding: "9px 14px", borderRadius: "8px", textDecoration: "none",
                                        backgroundColor: isActive(svc.to) ? "rgba(179,56,116,0.07)" : "transparent",
                                      }}
                                    >
                                      <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, backgroundColor: isActive(svc.to) ? "#b33874" : "rgba(73,6,82,0.2)" }} />
                                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: isActive(svc.to) ? 700 : 600, color: isActive(svc.to) ? "#b33874" : "#490652" }}>
                                        {svc.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Regular child link (About, Our Support) */
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={closeAll}
                            style={{
                              display: "flex", alignItems: "center", gap: "10px",
                              padding: "10px 14px", borderRadius: "8px", textDecoration: "none",
                              backgroundColor: isActive(child.to) ? "rgba(179,56,116,0.07)" : "transparent",
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, backgroundColor: isActive(child.to) ? "#b33874" : "rgba(73,6,82,0.2)" }} />
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: isActive(child.to) ? 700 : 600, color: isActive(child.to) ? "#b33874" : "#490652" }}>
                              {child.label}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                  textDecoration: "none", whiteSpace: "nowrap",
                  padding: "8px 12px", borderRadius: "8px",
                  color: isActive(link.to) ? "#b33874" : "#490652",
                  backgroundColor: isActive(link.to) ? "rgba(179,56,116,0.07)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right: CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <Link
            to="/work-with-us"
            className="navbar-desktop-cta"
            style={{
              alignItems: "center", backgroundColor: "#b33874", color: "white",
              fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px",
              padding: "10px 22px", borderRadius: "30px", textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Work With Us
          </Link>

          <button
            className="navbar-mobile-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ gap: "5px", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#490652", borderRadius: "2px", transition: "transform 0.25s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#490652", borderRadius: "2px", transition: "opacity 0.25s", opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: "24px", height: "2px", backgroundColor: "#490652", borderRadius: "2px", transition: "transform 0.25s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ borderTop: "1px solid rgba(73,6,82,0.1)", backgroundColor: "#FFF5F3", padding: "12px 24px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  {/* Level 1 row */}
                  <div style={{ display: "flex", alignItems: "center", borderRadius: "8px", backgroundColor: isGroupActive(link) ? "rgba(179,56,116,0.07)" : "transparent" }}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          flex: 1, fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 700,
                          color: isGroupActive(link) ? "#b33874" : "#490652",
                          textDecoration: "none", padding: "10px 0 10px 12px",
                        }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 700, color: isGroupActive(link) ? "#b33874" : "#490652", padding: "10px 0 10px 12px" }}>
                        {link.label}
                      </span>
                    )}
                    <button
                      onClick={() => toggleMobileGroup(link.label)}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px", color: isGroupActive(link) ? "#b33874" : "#490652" }}
                    >
                      <span style={{ display: "block", transform: mobileExpanded === link.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                        <ChevronDown />
                      </span>
                    </button>
                  </div>

                  {/* Level 2 */}
                  {mobileExpanded === link.label && (
                    <div style={{ paddingLeft: "12px", paddingBottom: "4px" }}>
                      {link.children.map((child) =>
                        child.services ? (
                          /* Category with sub-items */
                          <div key={child.label}>
                            <button
                              onClick={() => toggleMobileSub(child.label)}
                              style={{
                                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                                fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#490652",
                                background: "none", border: "none", cursor: "pointer",
                                padding: "9px 12px", borderRadius: "8px", textAlign: "left",
                              }}
                            >
                              {child.label}
                              <span style={{ transform: mobileSub === child.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                                <ChevronDown />
                              </span>
                            </button>

                            {/* Level 3 — individual services */}
                            {mobileSub === child.label && (
                              <div style={{ paddingLeft: "12px", paddingBottom: "4px" }}>
                                {child.services.map((svc) => (
                                  <Link
                                    key={svc.to}
                                    to={svc.to}
                                    onClick={() => { setMobileOpen(false); setMobileExpanded(null); setMobileSub(null); }}
                                    style={{
                                      display: "flex", alignItems: "center", gap: "8px",
                                      fontFamily: "Inter, sans-serif", fontSize: "13px",
                                      fontWeight: isActive(svc.to) ? 700 : 400,
                                      color: isActive(svc.to) ? "#b33874" : "#490652",
                                      textDecoration: "none", padding: "8px 12px", borderRadius: "8px",
                                      backgroundColor: isActive(svc.to) ? "rgba(179,56,116,0.07)" : "transparent",
                                    }}
                                  >
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, backgroundColor: isActive(svc.to) ? "#b33874" : "rgba(73,6,82,0.2)" }} />
                                    {svc.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Regular child */
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
                            style={{
                              display: "block", fontFamily: "Inter, sans-serif", fontSize: "14px",
                              fontWeight: isActive(child.to) ? 700 : 400,
                              color: isActive(child.to) ? "#b33874" : "#490652",
                              textDecoration: "none", padding: "9px 12px", borderRadius: "8px",
                              backgroundColor: isActive(child.to) ? "rgba(179,56,116,0.07)" : "transparent",
                            }}
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600,
                    color: isActive(link.to) ? "#b33874" : "#490652",
                    textDecoration: "none", padding: "10px 12px", borderRadius: "8px",
                    backgroundColor: isActive(link.to) ? "rgba(179,56,116,0.07)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/work-with-us"
              onClick={() => setMobileOpen(false)}
              style={{ display: "block", marginTop: "14px", backgroundColor: "#b33874", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", padding: "13px 20px", borderRadius: "30px", textDecoration: "none", textAlign: "center" }}
            >
              Work With Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
