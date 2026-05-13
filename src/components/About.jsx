import { Link } from "react-router-dom";

const volunteerImg = "/close-up-volunteers-collecting-food 1.png";

const wavePath = "M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z";

const WaveTop = ({ fill }) => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 2 }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "80px", display: "block", transform: "scaleY(-1)" }}
      preserveAspectRatio="none">
      <path d={wavePath}/>
    </svg>
  </div>
);

const WaveBottom = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 2 }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "80px", display: "block" }}
      preserveAspectRatio="none">
      <path d={wavePath}/>
    </svg>
  </div>
);

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: "#FFF5F3", padding: "0", position: "relative", overflow: "hidden" }}>

      <WaveTop fill="#490652" />

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div className="about-layout">

          <div className="about-photo">
            <img
              src={volunteerImg}
              alt="Volunteer helping"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
            />
          </div>

          <div className="about-content" style={{ backgroundColor: "#FFE6EE" }}>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "clamp(22px, 2.2vw, 32px)", color: "#490652", marginBottom: "24px", lineHeight: 1.3 }}>
              About Tender Living Residence
            </h2>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.4vw, 20px)", color: "#b33874", lineHeight: 1.75, marginBottom: "18px" }}>
                Tender Living Residence is a warm, dependable, and professional care provider offering domiciliary care, supported living, and supported accommodation services delivered to high professional standards.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.4vw, 20px)", color: "#b33874", lineHeight: 1.75, marginBottom: "18px" }}>
                We work with people experiencing change, vulnerability, or additional support needs, providing care in their own homes or within supported accommodation settings.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.4vw, 20px)", color: "#b33874", lineHeight: 1.75, marginBottom: "32px" }}>
                Our trained staff use clear support plans and proportionate risk management to ensure care remains safe, effective, and responsive to individual needs.
              </p>
              <Link
                to="/about"
                style={{ display: "inline-block", backgroundColor: "#490652", color: "#F8E3DF", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", padding: "12px 32px", borderRadius: "22px", textDecoration: "none" }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <WaveBottom fill="#ffffff" />
    </section>
  );
};

export default About;
