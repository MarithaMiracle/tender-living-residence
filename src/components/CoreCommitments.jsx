const puzzleImg    = "/core-commitments-illustration.png";
const ellipse14    = "/Ellipse 14.png";
const ellipse15    = "/Ellipse 15.png";
const ellipse16    = "/Ellipse 16.png";
const shieldIcon   = "/You-will-be-supported.png";
const peopleIcon   = "/You-will-be-respected.png";
const respectIcon  = "/You-will-be-safe.png";

const commitments = [
  {
    ellipse: ellipse16,
    icon: respectIcon,
    title: "You will be safe",
    desc: "We prioritise physical, emotional, psychological, and cultural safety in all care settings.",
  },
  {
    ellipse: ellipse15,
    icon: peopleIcon,
    title: "You will be respected",
    desc: "We value individuality, personal choice, background, and identity in every aspect of care.",
  },
  {
    ellipse: ellipse14,
    icon: shieldIcon,
    title: "You will be supported to grow",
    desc: "We help individuals build confidence, independence, and progress toward their personal goals.",
  },
];

const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const CoreCommitments = () => {
  return (
    <section style={{ backgroundColor: "white", padding: "56px 0 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 64px" }}>

        {/* Top row: heading + puzzle */}
        <div className="cc-top">
          <div style={{ maxWidth: "480px" }}>
            <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3vw, 44px)", color: "#B33874", lineHeight: 1.05, margin: "0 0 14px" }}>
              Our Core Commitments
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 17px)", color: "#7d7b7b", lineHeight: 1.5, margin: 0 }}>
              Our services are built around three core commitments to every person we support.
            </p>
          </div>
          <img
            src={puzzleImg}
            alt="Core commitments illustration"
            className="cc-puzzle"
          />
        </div>

        {/* Three commitment cards */}
        <div className="cc-grid">
          {commitments.map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px", padding: "28px", backgroundColor: "#FFF5F3", borderRadius: "20px" }}>
              <div style={{ position: "relative", width: "88px", height: "88px", flexShrink: 0 }}>
                <img src={c.ellipse} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
                <img
                  src={c.icon}
                  alt={c.title}
                  style={{ position: "absolute", inset: 0, margin: "auto", width: "55%", height: "55%", objectFit: "contain" }}
                />
              </div>
              <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(15px, 1.3vw, 19px)", color: "#490652", margin: 0, lineHeight: 1.2 }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(12px, 0.9vw, 14px)", color: "#606060", lineHeight: 1.6, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreCommitments;
