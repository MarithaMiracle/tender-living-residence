import { Link } from "react-router-dom";

const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const WhatWeProvide = () => {
  return (
    <section id="services" style={{ position: "relative" }}>
      <div style={{ background: "linear-gradient(174.5deg, #490652 31.3%, #b33874 144.28%)", padding: "56px 0 0", position: "relative" }}>
        <div className="wwp-inner">

          <div style={{ paddingBottom: "48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3vw, 44px)", margin: "0 0 16px", color: "white" }}>
              What we <span style={{ color: "#F27CA2" }}>Provide</span>
            </h2>
            <div style={{ width: "48px", height: "3px", backgroundColor: "#F06943", margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 17px)", color: "rgba(255,245,243,0.8)", lineHeight: 1.6, margin: 0 }}>
              Our services are built around two clear pathways,<br />so you can quickly find the right support
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 480px))", justifyContent: "center", gap: "48px", paddingBottom: "40px", alignItems: "stretch" }}>

            <Link to="/services/home-based-care/domiciliary-care" style={{ textDecoration: "none", display: "flex" }}>
              <div style={{ backgroundColor: "#FFE5F0", borderRadius: "80px 80px 0 0", overflow: "hidden", position: "relative", paddingBottom: "36px", cursor: "pointer", display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ overflow: "hidden", height: "280px", flexShrink: 0 }}>
                  <img src="/home-care.jpg" alt="Home-Based Care" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ width: "40px", height: "40px", backgroundColor: "#F06943", borderRadius: "50%", position: "absolute", top: "260px", left: "36px" }} />
                <div style={{ padding: "44px 36px 0", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", color: "#B33874", lineHeight: 1.1, marginBottom: "12px", textAlign: "center" }}>
                    Home-Based Care
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(13px, 1.1vw, 16px)", color: "#616161", lineHeight: 1.5, textAlign: "center", marginBottom: "24px", flex: 1 }}>
                    Domiciliary care (visiting care), live-in care, rapid response, respite support, and complex care where required.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ backgroundColor: "#F06943", color: "#FFF5F3", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 400, padding: "8px 22px", borderRadius: "14px", display: "inline-block" }}>
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/services" style={{ textDecoration: "none", display: "flex" }}>
              <div style={{ backgroundColor: "#FFE5F0", borderRadius: "80px 80px 0 0", overflow: "hidden", position: "relative", paddingBottom: "36px", cursor: "pointer", display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ overflow: "hidden", height: "280px", flexShrink: 0 }}>
                  <img src="/accommodation.jpg" alt="Accommodation-Based Support" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ width: "40px", height: "40px", backgroundColor: "#F06943", borderRadius: "50%", position: "absolute", top: "260px", left: "36px" }} />
                <div style={{ padding: "44px 36px 0", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", color: "#B33874", lineHeight: 1.1, marginBottom: "12px", textAlign: "center" }}>
                    Accommodation-Based Support
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(13px, 1.1vw, 16px)", color: "#616161", lineHeight: 1.5, textAlign: "center", marginBottom: "24px", flex: 1 }}>
                    Supported living (longer-term, tenancy-focused) and supported accommodation (transition, stabilisation, and progression for ages 16–25 and adults, where appropriate).
                  </p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ backgroundColor: "#F06943", color: "#FFF5F3", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 400, padding: "8px 22px", borderRadius: "14px", display: "inline-block" }}>
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", paddingBottom: "100px", padding: "0 20px 100px" }}>
          <div style={{ border: "1px solid rgba(255,245,243,0.35)", borderRadius: "8px", padding: "10px 28px" }}>
            <p className="wwp-tagline" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(12px, 1.1vw, 15px)", color: "#fff5f3", margin: 0, textAlign: "center" }}>
              Where care feels human <span className="wwp-tagline-sep">&nbsp;|&nbsp;</span> Where support feels safe <span className="wwp-tagline-sep">&nbsp;|&nbsp;</span> Where progress feels possible.
            </p>
          </div>
        </div>
        <Wave fill="#490652" />
      </div>

      <div style={{ backgroundColor: "#490652" }}>
        <div className="wwp-referral">
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.2vw, 34px)", color: "#fff5f3", margin: "0 0 12px", lineHeight: 1.15 }}>
            Make a referral or speak to us
          </h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(255,245,243,0.65)", margin: "0 auto 36px", maxWidth: "480px", lineHeight: 1.6 }}>
            Whether you are a professional making a referral or a family seeking support, we respond promptly and guide you through the next steps.
          </p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(12px, 2vw, 32px)", flexWrap: "wrap" }}>
            <a href="tel:01217989039" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Inter, sans-serif", fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(255,245,243,0.85)", textDecoration: "none", background: "rgba(255,245,243,0.06)", border: "1px solid rgba(255,245,243,0.12)", borderRadius: "12px", padding: "12px 20px" }}>
              <span style={{ fontSize: "18px" }}>📞</span> 0121 798 9039
            </a>
            <a href="mailto:tenderlivingresidence@gmail.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "Inter, sans-serif", fontSize: "clamp(13px, 1vw, 15px)", color: "rgba(255,245,243,0.85)", textDecoration: "none", background: "rgba(255,245,243,0.06)", border: "1px solid rgba(255,245,243,0.12)", borderRadius: "12px", padding: "12px 20px" }}>
              <span style={{ fontSize: "18px" }}>✉</span> tenderlivingresidence@gmail.com
            </a>
            <Link to="/contact" style={{ display: "inline-block", backgroundColor: "#F06943", color: "#FFF5F3", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(13px, 1vw, 15px)", padding: "13px 32px", borderRadius: "30px", textDecoration: "none" }}>
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeProvide;
