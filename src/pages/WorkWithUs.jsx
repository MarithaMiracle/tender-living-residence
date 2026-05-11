import { Link } from "react-router-dom";

const roles = [
  {
    title: "Support Worker",
    type: "Full-time / Part-time",
    desc: "Provide day-to-day support to young people in our accommodation or in the community, helping them develop life skills and achieve personal goals.",
  },
  {
    title: "Senior Support Worker",
    type: "Full-time",
    desc: "Lead a small team of support workers, oversee care plans, and act as a key escalation point for complex situations.",
  },
  {
    title: "Night Support Worker",
    type: "Part-time / Relief",
    desc: "Provide overnight supervision and support, ensuring young people are safe and settled during evening and night hours.",
  },
  {
    title: "Registered Manager",
    type: "Full-time",
    desc: "Lead the operational management of a residential service, ensuring CQC compliance, staff development, and outstanding outcomes for young people.",
  },
];

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const WorkWithUs = () => {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          Work With Us
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "660px", lineHeight: 1.6 }}>
          Join a passionate team making a real difference in the lives of young people across the UK.
        </p>
        <Wave />
      </section>

      {/* Why join us */}
      <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 64px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3vw, 40px)", color: "#490652", margin: "0 0 40px", textAlign: "center" }}>
            Why Join Tender Living Residence?
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "64px", justifyContent: "center" }}>
            {[
              "Competitive salary & benefits",
              "Ongoing training & development",
              "Supportive, inclusive culture",
              "Career progression pathways",
              "Flexible working options",
              "Make a genuine difference",
            ].map((benefit) => (
              <div key={benefit} style={{ flex: "1 1 200px", maxWidth: "225px", backgroundColor: "white", borderRadius: "16px", padding: "24px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 12px rgba(73,6,82,0.07)" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#b33874", flexShrink: 0 }} />
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "15px", color: "#490652", margin: 0 }}>{benefit}</p>
              </div>
            ))}
          </div>

          {/* Current roles */}
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(24px, 2.5vw, 36px)", color: "#490652", margin: "0 0 32px" }}>
            Current Opportunities
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {roles.map((role) => (
              <div key={role.title} className="role-card" style={{ backgroundColor: "white", borderRadius: "20px", padding: "28px 32px", boxShadow: "0 2px 12px rgba(73,6,82,0.07)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "18px", color: "#490652", margin: 0 }}>{role.title}</h3>
                    <span style={{ backgroundColor: "#ffe6ee", color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "20px" }}>{role.type}</span>
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", color: "#606060", lineHeight: 1.6, margin: 0 }}>{role.desc}</p>
                </div>
                <Link to={`/application-form?role=${encodeURIComponent(role.title)}`} className="role-apply" style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", padding: "10px 24px", borderRadius: "30px", textDecoration: "none" }}>
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkWithUs;
