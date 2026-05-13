import { Link } from "react-router-dom";

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const colHeading = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      "11px",
  fontWeight:    700,
  color:         "rgba(255,245,243,0.45)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  margin:        "0 0 20px",
};

const footLink = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      "15px",
  fontWeight:    400,
  color:         "rgba(255,245,243,0.8)",
  textDecoration:"none",
  display:       "block",
  marginBottom:  "13px",
};

const contactLabel = {
  fontFamily:    "Inter, sans-serif",
  fontSize:      "11px",
  fontWeight:    600,
  color:         "rgba(255,245,243,0.4)",
  margin:        "0 0 4px",
  textTransform: "uppercase",
  letterSpacing: "0.07em",
};

const Footer = () => (
  <footer style={{ backgroundColor: "#490652" }}>

    {/* Main grid */}
    <div className="footer-grid" style={{
      maxWidth:  "1440px",
      margin:    "0 auto",
    }}>

      {/* Brand */}
      <div>
        <Link to="/" style={{ lineHeight: 0, display: "inline-block", marginBottom: "20px" }}>
          <img src="/logo.png" alt="Tender Living Residence" style={{ height: "64px", objectFit: "contain", display: "block", filter: "invert(1) sepia(1) hue-rotate(-30deg) saturate(2.5) brightness(1.25)" }} />
        </Link>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "clamp(15px, 1.2vw, 20px)", color: "rgba(255,245,243,0.85)", lineHeight: 1.6, margin: "0 0 32px", maxWidth: "300px" }}>
          Empowering individuals to grow, thrive, and live independently.
        </p>
        {/* <div style={{ display: "flex", gap: "10px" }}>
          {[
            { href: "#", icon: <FacebookIcon />,  label: "Facebook" },
            { href: "#", icon: <InstagramIcon />, label: "Instagram" },
            { href: "#", icon: <LinkedInIcon />,  label: "LinkedIn" },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} aria-label={label} style={{ width: "38px", height: "38px", borderRadius: "10px", backgroundColor: "rgba(255,245,243,0.08)", border: "1px solid rgba(255,245,243,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,245,243,0.65)", textDecoration: "none", flexShrink: 0 }}>
              {icon}
            </a>
          ))}
        </div> */}
      </div>

      {/* Company */}
      <nav>
        <p style={colHeading}>Company</p>
        <Link to="/"            style={footLink}>Home</Link>
        <Link to="/about"       style={footLink}>About Us</Link>
        <Link to="/our-values"  style={footLink}>Our Values</Link>
        <Link to="/contact"     style={footLink}>Contact</Link>
        <Link to="/blog"         style={footLink}>Blog</Link>
        <Link to="/work-with-us" style={{ ...footLink, color: "#f4a5c6", fontWeight: 600, marginBottom: 0 }}>
          Work With Us ↗
        </Link>
      </nav>

      {/* Services */}
      <nav>
        <p style={colHeading}>Our Services</p>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(255,245,243,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Home-Based Care</p>
        <Link to="/services/home-based-care/domiciliary-care"   style={footLink}>Domiciliary Care</Link>
        <Link to="/services/home-based-care/live-in-care"       style={footLink}>Live-in Care</Link>
        <Link to="/services/home-based-care/complex-care"       style={footLink}>Complex Care</Link>
        <Link to="/services/home-based-care/home-based-respite" style={{ ...footLink, marginBottom: "18px" }}>Home-Based Respite</Link>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(255,245,243,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Accommodation</p>
        <Link to="/services/accommodation-based-support/supported-living"         style={footLink}>Supported Living</Link>
        <Link to="/services/accommodation-based-support/supported-accommodation"  style={{ ...footLink, marginBottom: "18px" }}>Supported Accommodation</Link>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(255,245,243,0.38)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Crisis & Urgent</p>
        <Link to="/services/crisis-and-urgent-support/emergency-crisis-placements" style={footLink}>Emergency Placements</Link>
        <Link to="/services/crisis-and-urgent-support/rapid-response"              style={{ ...footLink, marginBottom: 0 }}>Rapid Response</Link>
      </nav>

      {/* Support + Contact */}
      <div>
        <nav style={{ marginBottom: "32px" }}>
          <p style={colHeading}>Our Support</p>
          <Link to="/who-we-support"  style={footLink}>Who We Support</Link>
          <Link to="/how-we-support"  style={footLink}>How We Support</Link>
          <Link to="/when-we-support" style={{ ...footLink, marginBottom: 0 }}>When We Support</Link>
        </nav>

        <div>
          <p style={colHeading}>Get in Touch</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <p style={contactLabel}>Email</p>
              <a href="mailto:tenderlivingresidence@gmail.com" style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#f4a5c6", textDecoration: "none" }}>tenderlivingresidence@gmail.com</a>
            </div>
            <div>
              <p style={contactLabel}>Location</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,245,243,0.85)", margin: 0 }}>United Kingdom</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Divider */}
    <div className="footer-pad" style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ borderTop: "1px solid rgba(255,245,243,0.1)" }} />
    </div>

    {/* Bottom bar */}
    <div className="footer-bottom" style={{ maxWidth: "1440px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,245,243,0.35)", margin: 0 }}>
        © {new Date().getFullYear()} Tender Living Residence. All rights reserved.
      </p>
      <div style={{ display: "flex", gap: "24px" }}>
        <Link to="/privacy-policy"  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,245,243,0.35)", textDecoration: "none" }}>Privacy Policy</Link>
        <Link to="/terms-of-service" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,245,243,0.35)", textDecoration: "none" }}>Terms of Service</Link>
        <Link to="/cqc-regulated"   style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,245,243,0.35)", textDecoration: "none" }}>CQC Regulated</Link>
      </div>
    </div>

  </footer>
);

export default Footer;
