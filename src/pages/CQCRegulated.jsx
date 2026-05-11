const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const pillars = [
  { label: "Safe", desc: "People are protected from abuse and avoidable harm. We assess and manage risk carefully and take immediate action when needed." },
  { label: "Effective", desc: "Care, treatment, and support achieves good outcomes for people and is based on the best available evidence." },
  { label: "Caring", desc: "Staff involve and treat people with compassion, kindness, dignity, and respect at every interaction." },
  { label: "Responsive", desc: "Services are organised so that they meet the needs of each person and respond swiftly when circumstances change." },
  { label: "Well-led", desc: "Leadership, management, and governance assures high-quality, person-centred care and promotes learning and innovation." },
];

const CQCRegulated = () => (
  <>
    <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,245,243,0.5)", margin: "0 0 16px" }}>
        Regulated · Inspected · Accountable
      </p>
      <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
        CQC Regulated Care
      </h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "660px", lineHeight: 1.6 }}>
        Tender Living Residence is registered with and regulated by the Care Quality Commission, England's independent health and social care regulator.
      </p>
      <Wave />
    </section>

    <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
          <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
        </svg>
      </div>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 40px" }}>

        {/* What is CQC */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 32px)", color: "#490652", margin: "0 0 20px" }}>
            What is the CQC?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 1.8, margin: "0 0 16px", maxWidth: "720px" }}>
            The Care Quality Commission (CQC) is the independent regulator of health and adult social care in England. It monitors, inspects, and regulates services to make sure they meet fundamental standards of quality and safety.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 1.8, maxWidth: "720px", margin: 0 }}>
            CQC registration means we are legally authorised to provide care services and are subject to regular unannounced inspections. Our registration details can be verified directly on the CQC website.
          </p>
        </div>

        {/* Five Key Questions */}
        <div style={{ marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 32px)", color: "#490652", margin: "0 0 8px" }}>
            The Five Key Questions
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#777", lineHeight: 1.7, margin: "0 0 36px" }}>
            CQC inspects services against five domains. We design every aspect of our practice to meet and exceed each one.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            {pillars.map((p, i) => (
              <div key={p.label} style={{ flex: "1 1 240px", maxWidth: "300px", backgroundColor: "white", borderRadius: "16px", padding: "28px 24px", boxShadow: "0 2px 12px rgba(73,6,82,0.07)" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "11px", color: "rgba(73,6,82,0.35)", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>0{i + 1}</p>
                <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "17px", color: "#490652", margin: "0 0 10px" }}>{p.label}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#606060", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Commitment */}
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "clamp(32px, 4vw, 52px)", boxShadow: "0 2px 16px rgba(73,6,82,0.07)", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2.2vw, 28px)", color: "#490652", margin: "0 0 16px" }}>
            Our Commitment to Quality
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 1.8, margin: "0 0 16px" }}>
            CQC registration is not a box-ticking exercise for us. It is the foundation of our accountability to the people we support, their families, and the professionals who refer to us. We actively prepare for inspections at all times, not just when one is scheduled.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 1.8, margin: 0 }}>
            Our Registered Manager holds responsibility for maintaining compliance, and all staff receive regular training aligned to CQC fundamental standards. We welcome scrutiny as a mark of confidence in our practice.
          </p>
        </div>

        {/* CQC link */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#777", margin: "0 0 20px" }}>
            Verify our registration and view inspection reports on the CQC website.
          </p>
          <a
            href="https://www.cqc.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "15px", padding: "14px 36px", borderRadius: "40px", textDecoration: "none" }}
          >
            Visit CQC Website ↗
          </a>
        </div>

      </div>
    </section>
  </>
);

export default CQCRegulated;
