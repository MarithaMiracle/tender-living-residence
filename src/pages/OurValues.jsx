const values = [
  {
    title: "Empowerment",
    desc: "We believe in unlocking potential. Every young person has strengths, and we help them discover and use them.",
    color: "#490652",
  },
  {
    title: "Respect",
    desc: "We honour each individual's identity, background, choices, and voice in every interaction.",
    color: "#b33874",
  },
  {
    title: "Integrity",
    desc: "We act with honesty, transparency, and accountability in everything we do.",
    color: "#490652",
  },
  {
    title: "Compassion",
    desc: "We lead with empathy, understanding and responding to emotional and practical needs with genuine care.",
    color: "#b33874",
  },
  {
    title: "Safety",
    desc: "Creating physically and emotionally safe environments is the foundation of all our services.",
    color: "#490652",
  },
  {
    title: "Inclusion",
    desc: "We celebrate diversity and ensure every young person feels valued, seen, and included.",
    color: "#b33874",
  },
  {
    title: "Growth",
    desc: "We are committed to continuous improvement, both for the young people we support and as an organisation.",
    color: "#490652",
  },
  {
    title: "Collaboration",
    desc: "We work in partnership with families, professionals, and communities to achieve the best outcomes.",
    color: "#b33874",
  },
  {
    title: "Excellence",
    desc: "We hold ourselves to the highest standards of care, practice, and professional conduct.",
    color: "#490652",
  },
];

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const OurValues = () => {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          Our Values
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "600px", lineHeight: 1.6 }}>
          The principles that guide every decision we make and every life we touch.
        </p>
        <Wave />
      </section>

      {/* Timeline */}
      <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px", position: "relative" }}>
          {/* Vertical line */}
          <div className="values-line" />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {values.map((v, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="values-row" style={{ justifyContent: isLeft ? "flex-start" : "flex-end" }}>
                  {/* Dot on line */}
                  <div className="values-dot" style={{ position: "absolute", left: "50%", top: "32px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: v.color, transform: "translateX(-50%)", zIndex: 1, boxShadow: `0 0 0 4px ${v.color}33` }} />

                  <div className="values-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: v.color, flexShrink: 0 }} />
                      <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(18px, 1.8vw, 24px)", color: v.color, margin: 0 }}>
                        {v.title}
                      </h3>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.2vw, 16px)", color: "#606060", lineHeight: 1.6, margin: 0 }}>
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurValues;
