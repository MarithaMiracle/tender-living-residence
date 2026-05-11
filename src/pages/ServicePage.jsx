import { useParams, Link } from "react-router-dom";
import { getServiceBySlug } from "../data/services";

const ellipseCircle = "https://www.figma.com/api/mcp/asset/ce1f2596-813c-4515-86d7-7bc84fb73c5d";

const ServicePage = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "32px", color: "#490652" }}>Service not found</h1>
        <Link to="/" style={{ color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        <img src={service.heroImage} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(149.86deg, #490652 31.96%, #b33874 135.16%)", opacity: 0.82 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 40px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(32px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 16px", lineHeight: 1.1 }}>
            {service.title}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 2vw, 22px)", color: "rgba(255,245,243,0.85)", margin: 0, maxWidth: "640px" }}>
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section style={{ backgroundColor: "#fff5f3", padding: "64px 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.5vw, 20px)", color: "#606060", lineHeight: 1.7, margin: 0 }}>
            {service.intro}
          </p>
        </div>
      </section>

      {/* Section title */}
      <div style={{ backgroundColor: "white", padding: "40px 40px 0", maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center", marginBottom: "48px" }}>
          <div style={{ height: "2px", flex: 1, maxWidth: "200px", backgroundColor: "#f06943" }} />
          <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(20px, 2vw, 28px)", color: "#490652", margin: 0, textAlign: "center", whiteSpace: "nowrap" }}>
            What We Support With
          </h2>
          <div style={{ height: "2px", flex: 1, maxWidth: "200px", backgroundColor: "#f06943" }} />
        </div>
      </div>

      {/* Cards grid */}
      <section style={{ backgroundColor: "white", padding: "0 0 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "56px 32px" }}>
            {service.sections.map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "56px", position: "relative" }}>
                <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "16px", flexShrink: 0 }}>
                  <img src={ellipseCircle} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
                  <img src={item.icon} alt={item.title} style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "18px", color: "#490652", margin: "0 0 10px" }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "14px", color: "#606060", lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bar */}
      <section style={{ backgroundColor: "#490652", padding: "48px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(16px, 1.5vw, 20px)", color: "white", margin: "0 0 24px" }}>
          Ready to get started or make a referral?
        </p>
        <Link to="/contact" style={{ backgroundColor: "#f06943", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px", padding: "14px 40px", borderRadius: "40px", textDecoration: "none", display: "inline-block" }}>
          Contact Us
        </Link>
      </section>
    </>
  );
};

export default ServicePage;
