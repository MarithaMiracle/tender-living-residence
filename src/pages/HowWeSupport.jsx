const ellipseCircle = "https://www.figma.com/api/mcp/asset/ce1f2596-813c-4515-86d7-7bc84fb73c5d";

const supportMethods = [
  {
    icon: "https://www.figma.com/api/mcp/asset/4687086d-59eb-439b-bc27-7d18884aeec3",
    title: "Individual Support Plans",
    desc: "Every young person receives a bespoke support plan co-produced with them, reviewed regularly to reflect their changing needs and goals.",
    link: null,
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/a21e34f5-a08c-4be0-a86c-812cb50d86e9",
    title: "Key Worker Relationships",
    desc: "Each person is assigned a dedicated key worker who provides consistency, acts as an advocate, and champions their progress.",
    link: null,
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/ecc60df4-98e4-4d24-a2a3-7cd14255308f",
    title: "Risk Assessment & Management",
    desc: "Regular, dynamic risk assessments ensure we proactively manage challenges and keep everyone safe.",
    link: null,
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/55248298-7ecc-4310-b7b5-dc9577f209fa",
    title: "Multi-Agency Working",
    desc: "We collaborate closely with local authorities, health services, education providers, and the voluntary sector.",
    link: null,
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/f4560def-9145-4a15-9206-ae1909e469c4",
    title: "Life Skills Development",
    desc: "Structured programmes covering budgeting, cooking, cleaning, digital literacy, and all skills needed for independent living.",
    link: null,
  },
  {
    icon: "https://www.figma.com/api/mcp/asset/965e66a4-a925-4021-9672-e52590e7d67b",
    title: "Therapeutic Interventions",
    desc: "Access to counselling, therapeutic activities, and trauma-informed approaches woven into daily support.",
    link: null,
  },
];

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const HowWeSupport = () => {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <Wave />
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          How We Support
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "680px", lineHeight: 1.6 }}>
          Our approach is person-centred, trauma-informed, and built around what works best for each individual.
        </p>
      </section>

      {/* Cards */}
      <section style={{ backgroundColor: "#fff5f3", padding: "64px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div className="hws-inner">
          <div className="hws-grid">
            {supportMethods.map((method, i) => (
              <div key={i} style={{ backgroundColor: "#ffe6ee", borderRadius: "24px", padding: "72px 28px 36px", position: "relative", textAlign: "center" }}>
                {/* Icon circle */}
                <div style={{ position: "absolute", top: "-48px", left: "50%", transform: "translateX(-50%)", width: "96px", height: "96px" }}>
                  <img src={ellipseCircle} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
                  <img src={method.icon} alt={method.title} style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 20px)", color: "#490652", margin: "0 0 12px" }}>
                  {method.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", color: "#606060", lineHeight: 1.6, margin: 0 }}>
                  {method.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowWeSupport;
