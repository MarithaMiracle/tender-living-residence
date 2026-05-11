const bgImg         = "https://www.figma.com/api/mcp/asset/7c6dd354-cc77-4fd5-914d-e033625b9a89";
const personIcon    = "https://www.figma.com/api/mcp/asset/bd6a27b5-76d7-45c4-839d-99c9a61a59ac";
const safetyIcon    = "https://www.figma.com/api/mcp/asset/61da3c15-7bc3-4050-86da-ed97c94aa554";
const respectIcon   = "https://www.figma.com/api/mcp/asset/6fd6bedb-b95f-44c5-a4c8-11b59d981dd0";

const approaches = [
  { icon: personIcon,  title: "Person-centred care",      desc: "Every support plan is built around the individual: their preferences, goals, and needs." },
  { icon: safetyIcon,  title: "Safety and consistency",   desc: "Reliable routines and trained staff create the stability people need to feel secure." },
  { icon: respectIcon, title: "Respectful relationships", desc: "We build trust through honesty, dignity, and genuine care for every person we work with." },
];

const wavePath = "M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z";

const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 2 }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d={wavePath}/>
    </svg>
  </div>
);

const WaveTop = ({ fill }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 2 }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block", transform: "scaleY(-1)" }} preserveAspectRatio="none">
      <path d={wavePath}/>
    </svg>
  </div>
);

const OurApproach = () => {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={bgImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.73 }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(149.86deg, #490652 31.96%, #b33874 135.16%)", mixBlendMode: "multiply" }} />

      <WaveTop fill="#ffffff" />

      <div className="approach-inner" style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.2vw, 32px)", color: "#FFF5F3", textAlign: "center", marginBottom: "40px", letterSpacing: "0.06em" }}>
          OUR APPROACH
        </h2>

        <div className="approach-grid">
          {approaches.map((a, i) => (
            <div key={i} style={{ backgroundColor: "rgba(255,214,232,0.07)", border: "1px solid rgba(255,214,232,0.2)", borderRadius: "24px", padding: "28px 24px 32px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ width: "clamp(72px, 8vw, 120px)", height: "clamp(72px, 8vw, 120px)", overflow: "hidden", borderRadius: "16px", flexShrink: 0 }}>
                <img src={a.icon} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "clamp(16px, 1.4vw, 22px)", color: "white", margin: 0, lineHeight: 1.2 }}>
                {a.title}
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(13px, 0.9vw, 14px)", color: "rgba(255,245,243,0.75)", margin: 0, lineHeight: 1.6 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Wave fill="#FFF5F3" />
    </section>
  );
};

export default OurApproach;
