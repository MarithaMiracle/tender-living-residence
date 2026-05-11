const buildingImg   = "https://www.figma.com/api/mcp/asset/e79136b5-b580-49e2-acec-58a31a2e3675";
const ellipseCircle = "https://www.figma.com/api/mcp/asset/ce1f2596-813c-4515-86d7-7bc84fb73c5d";
const healthIcon    = "https://www.figma.com/api/mcp/asset/4687086d-59eb-439b-bc27-7d18884aeec3";
const supportIcon   = "https://www.figma.com/api/mcp/asset/a21e34f5-a08c-4be0-a86c-812cb50d86e9";
const shieldIcon    = "https://www.figma.com/api/mcp/asset/ecc60df4-98e4-4d24-a2a3-7cd14255308f";
const techIcon      = "https://www.figma.com/api/mcp/asset/f4560def-9145-4a15-9206-ae1909e469c4";
const familyIcon    = "https://www.figma.com/api/mcp/asset/965e66a4-a925-4021-9672-e52590e7d67b";
const communityIcon = "https://www.figma.com/api/mcp/asset/55248298-7ecc-4310-b7b5-dc9577f209fa";

const leftCards = [
  { icon: shieldIcon,    label: "Local authorities\nand commissioners" },
  { icon: healthIcon,    label: "Health\nprofessionals" },
  { icon: communityIcon, label: "Community\norganisations" },
];

const rightCards = [
  { icon: supportIcon,   label: "Social workers\nand care coordinators" },
  { icon: familyIcon,    label: "Families\nand carers" },
  { icon: techIcon,      label: "Individuals seeking\nsupport" },
];

function Card({ icon, label }) {
  return (
    <div style={{ backgroundColor: "#FFE6EE", borderRadius: "20px", padding: "56px 14px 20px", position: "relative", textAlign: "center", minHeight: "160px" }}>
      <div style={{ position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)", width: "84px", height: "84px" }}>
        <img src={ellipseCircle} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
        <img src={icon} alt={label} style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
      </div>
      <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "clamp(13px, 1.1vw, 17px)", color: "#4a0c57", margin: 0, lineHeight: 1.3, whiteSpace: "pre-line" }}>
        {label}
      </p>
    </div>
  );
}

const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const WhoWeWorkWith = () => {
  return (
    <section style={{ backgroundColor: "#FFF5F3", padding: "56px 0 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div className="www-outer">
          <div className="www-grid">

            <div className="www-col">
              {leftCards.map((c, i) => <Card key={i} {...c} />)}
            </div>

            <div className="www-center-col">
              <img src={buildingImg} alt="Tender Living Residence building" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(58,9,69,0.9) 0%, rgba(179,56,116,0.25) 60%)" }} />
              <div style={{ position: "absolute", top: "32px", left: 0, right: 0, padding: "0 24px" }}>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "clamp(22px, 2.5vw, 36px)", color: "#fff5f3", lineHeight: 1.1, margin: 0, whiteSpace: "pre-line" }}>
                  {"Who We\nWork With"}
                </h2>
              </div>
            </div>

            <div className="www-col">
              {rightCards.map((c, i) => <Card key={i} {...c} />)}
            </div>

          </div>
        </div>
      </div>
      <Wave fill="#490652" />
    </section>
  );
};

export default WhoWeWorkWith;
