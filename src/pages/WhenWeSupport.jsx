const phases = [
  {
    phase: "Phase 1",
    title: "Referral & Assessment",
    desc: "We accept referrals from local authorities, social workers, health professionals, and self-referrals. An initial assessment is completed within 48 hours to understand the young person's needs, risks, and goals.",
    color: "#490652",
  },
  {
    phase: "Phase 2",
    title: "Placement & Welcome",
    desc: "Once a placement is agreed, we prepare the environment and support package. The young person is introduced to their key worker, given a full property induction, and their support plan is co-produced within the first two weeks.",
    color: "#b33874",
  },
  {
    phase: "Phase 3",
    title: "Stabilisation",
    desc: "Our focus is on creating safety, building trust, and establishing consistent routines. Support is intensive during this phase, gradually reducing as confidence and skills develop.",
    color: "#490652",
  },
  {
    phase: "Phase 4",
    title: "Development & Growth",
    desc: "With a stable foundation, we shift focus to life skills, education, employment, and community participation. Goals are reviewed monthly and celebrated regularly.",
    color: "#b33874",
  },
  {
    phase: "Phase 5",
    title: "Move-On & Transition",
    desc: "We begin planning for independence well in advance. Move-on support continues for up to 12 months after a placement ends to ensure a smooth, sustainable transition.",
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

const WhenWeSupport = () => {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          When We Support
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "680px", lineHeight: 1.6 }}>
          Our support journey is structured around five phases, from first referral to sustained independence.
        </p>
        <Wave />
      </section>

      {/* Timeline phases */}
      <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px", display: "flex", flexDirection: "column", gap: "0" }}>
          {phases.map((p, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} style={{ display: "flex", gap: "32px", alignItems: "flex-start", marginBottom: "48px" }}>
                {/* Phase badge */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: p.color, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "10px", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {p.phase.split(" ")[0]}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "20px", color: "white", lineHeight: 1 }}>
                      {p.phase.split(" ")[1]}
                    </span>
                  </div>
                  {i < phases.length - 1 && (
                    <div style={{ width: "2px", height: "48px", backgroundColor: `${p.color}44`, marginTop: "8px" }} />
                  )}
                </div>

                {/* Card */}
                <div style={{ flex: 1, backgroundColor: "white", borderRadius: "20px", padding: "28px 32px", boxShadow: "0 2px 16px rgba(73,6,82,0.07)", marginTop: "8px" }}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(18px, 1.8vw, 24px)", color: p.color, margin: "0 0 12px" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.2vw, 16px)", color: "#606060", lineHeight: 1.7, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default WhenWeSupport;
