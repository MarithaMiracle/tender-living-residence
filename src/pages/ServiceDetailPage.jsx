import { useParams, Link } from "react-router-dom";
import { getGroupBySlug, getServiceBySlug } from "../data/services";
import SEO from "../components/SEO";
import { breadcrumbSchema, serviceSchema, truncate } from "../lib/seo";

const SectionDivider = ({ title }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: "clamp(16px, 2vw, 32px)",
    padding: "0 clamp(32px, 6%, 120px)",
    margin: "clamp(56px, 6vw, 88px) auto 0",
    maxWidth: "1920px",
  }}>
    <div style={{ flex: 1, height: "3px", background: "linear-gradient(to right, transparent, rgba(73,6,82,0.18))" }} />
    <p style={{
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      fontSize: "clamp(18px, 2.5vw, 40px)",
      color: "#f06943",
      margin: 0,
      whiteSpace: "nowrap",
      textAlign: "center",
      lineHeight: 1.0,
    }}>
      {title}
    </p>
    <div style={{ flex: 1, height: "3px", background: "linear-gradient(to left, transparent, rgba(73,6,82,0.18))" }} />
  </div>
);

const IconItem = ({ circleImg, icon, title, subtitle, titleColor = "#888" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
    <div style={{ position: "relative", width: "84px", height: "84px" }}>
      <img src={circleImg} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
      {icon && (
        <img src={icon} alt={title} style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
      )}
    </div>
    <p style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "clamp(13px, 1.1vw, 17px)",
      color: titleColor,
      margin: "16px 0 0",
      lineHeight: 1.3,
    }}>
      {title}
    </p>
    {subtitle && (
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: "clamp(11px, 0.9vw, 15px)",
        color: "#888",
        margin: "4px 0 0",
        lineHeight: 1.4,
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

const Grid3 = ({ section }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "32px 24px",
    maxWidth: "1000px",
    margin: "40px auto 0",
    padding: "0 32px",
  }}>
    {section.items.map((item, i) => (
      <div key={i} style={{ flex: "0 0 180px", maxWidth: "180px" }}>
        <IconItem
          circleImg={section.circleImg}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          titleColor={section.itemTitleColor || "#4a0c57"}
        />
      </div>
    ))}
  </div>
);

const Grid4 = ({ section }) => (
  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px 20px",
    maxWidth: "1000px",
    margin: "40px auto 0",
    padding: "0 32px",
  }}>
    {section.items.map((item, i) => (
      <div key={i} style={{ flex: "0 0 160px", maxWidth: "160px" }}>
        <IconItem
          circleImg={section.circleImg}
          icon={item.icon}
          title={item.title}
          subtitle={item.subtitle}
          titleColor={section.itemTitleColor || "#4a0c57"}
        />
      </div>
    ))}
  </div>
);

const Grid2IconRight = ({ section }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
    gap: "28px 20px",
    maxWidth: "1000px",
    margin: "40px auto 0",
    padding: "0 32px",
    justifyContent: "center",
  }}>
    {section.items.map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ position: "relative", width: "84px", height: "84px", flexShrink: 0 }}>
          <img src={section.circleImg} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
          {item.icon && (
            <img src={item.icon} alt={item.title} style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
          )}
        </div>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(14px, 1.3vw, 18px)",
          color: section.itemTitleColor || "#4a0c57",
          margin: 0,
          lineHeight: 1.35,
          flex: 1,
        }}>
          {item.title}
        </p>
      </div>
    ))}
  </div>
);

const contentWrap = {
  maxWidth: "860px",
  margin: "40px auto 0",
  padding: "0 clamp(24px, 5%, 48px)",
};

const bodyText = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize: "clamp(16px, 1.4vw, 19px)",
  color: "#1a1a1a",
  lineHeight: 1.7,
};

const TextSection = ({ section }) => (
  <div style={contentWrap}>
    <div style={bodyText}>
      {(section.text || "").split("\n\n").map((para, i) => (
        <p key={i} style={{ margin: i === 0 ? 0 : "20px 0 0" }}>{para}</p>
      ))}
    </div>
  </div>
);

const BulletSection = ({ section }) => (
  <div style={contentWrap}>
    {section.intro && (
      <p style={{ ...bodyText, margin: "0 0 20px" }}>{section.intro}</p>
    )}
    <ul style={{ margin: 0, padding: "0 0 0 22px", ...bodyText }}>
      {(section.items || []).map((item, i) => (
        <li key={i} style={{ marginBottom: "12px" }}>{typeof item === "string" ? item : item.title}</li>
      ))}
    </ul>
    {section.outro && (
      <p style={{ ...bodyText, margin: "20px 0 0" }}>{section.outro}</p>
    )}
  </div>
);

const ProcessSection = ({ section }) => (
  <div style={{ ...contentWrap, display: "flex", flexDirection: "column", gap: "24px" }}>
    {(section.steps || []).map((step, i) => (
      <div key={i} style={{
        display: "flex",
        gap: "18px",
        alignItems: "flex-start",
        padding: "20px 22px",
        borderRadius: "16px",
        backgroundColor: "#fff5f3",
        border: "1px solid rgba(73,6,82,0.08)",
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#490652",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          flexShrink: 0,
        }}>
          {i + 1}
        </div>
        <div>
          <p style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(16px, 1.3vw, 20px)",
            color: "#490652",
            margin: "0 0 8px",
          }}>
            {step.title}
          </p>
          <p style={{ ...bodyText, margin: 0 }}>{step.body}</p>
        </div>
      </div>
    ))}
  </div>
);

const AreasSection = ({ section }) => (
  <div style={contentWrap}>
    {section.intro && (
      <p style={{ ...bodyText, margin: "0 0 24px" }}>{section.intro}</p>
    )}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "10px 16px",
    }}>
      {(section.items || []).map((area, i) => (
        <div key={i} style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "15px",
          color: "#490652",
          fontWeight: 500,
          padding: "12px 14px",
          backgroundColor: "#fff5f3",
          borderRadius: "10px",
          border: "1px solid rgba(73,6,82,0.08)",
        }}>
          {area}
        </div>
      ))}
    </div>
    {section.outro && (
      <p style={{ ...bodyText, margin: "24px 0 0" }}>{section.outro}</p>
    )}
  </div>
);

const FaqSection = ({ section }) => (
  <div style={{ ...contentWrap, display: "flex", flexDirection: "column", gap: "14px" }}>
    {(section.items || []).map((faq, i) => (
      <details key={i} style={{
        backgroundColor: "#fff5f3",
        borderRadius: "14px",
        border: "1px solid rgba(73,6,82,0.08)",
        padding: "18px 22px",
      }}>
        <summary style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontSize: "clamp(15px, 1.2vw, 18px)",
          color: "#490652",
          cursor: "pointer",
          listStyle: "none",
        }}>
          {faq.question}
        </summary>
        <p style={{ ...bodyText, margin: "14px 0 0" }}>{faq.answer}</p>
      </details>
    ))}
  </div>
);

const CtaSection = ({ section }) => (
  <div style={{
    maxWidth: "860px",
    margin: "40px auto 0",
    padding: "0 clamp(24px, 5%, 48px)",
  }}>
    <div style={{
      backgroundColor: "#490652",
      borderRadius: "20px",
      padding: "clamp(28px, 4vw, 40px)",
      color: "#fff5f3",
    }}>
      {section.intro && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.65, margin: "0 0 20px", color: "rgba(255,245,243,0.9)" }}>
          {section.intro}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {(section.items || []).map((item, i) => (
          <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", margin: 0, color: "rgba(255,245,243,0.92)" }}>
            {item}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Link to="/contact" style={{
          display: "inline-block",
          backgroundColor: "#f06943",
          color: "white",
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "15px",
          padding: "12px 28px",
          borderRadius: "30px",
          textDecoration: "none",
        }}>
          Contact Us
        </Link>
        <Link to="/" style={{
          display: "inline-block",
          backgroundColor: "transparent",
          color: "#fff5f3",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
          fontSize: "15px",
          padding: "12px 28px",
          borderRadius: "30px",
          textDecoration: "none",
          border: "1px solid rgba(255,245,243,0.35)",
        }}>
          Back to Home
        </Link>
      </div>
      {section.outro && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.65, margin: "24px 0 0", color: "rgba(255,245,243,0.8)" }}>
          {section.outro}
        </p>
      )}
    </div>
  </div>
);

const ServiceDetailPage = () => {
  const { groupSlug, serviceSlug } = useParams();
  const group = getGroupBySlug(groupSlug);
  const service = getServiceBySlug(groupSlug, serviceSlug);

  if (!group || !service) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "32px", color: "#490652" }}>Service not found</h1>
        <Link to="/" style={{ color: "#b33874", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>← Back to Home</Link>
      </div>
    );
  }

  const description = service.figmaDescription || service.description;
  const heroOverlay = group.slug === "accommodation-based-support" ? "#f06943" : "#490652";
  const servicePath = `/services/${groupSlug}/${serviceSlug}`;
  const pageTitle = service.metaTitle || service.title;
  const pageDescription = truncate(service.metaDescription || service.tagline || description);

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        path={servicePath}
        image={service.heroPhoto || "/hero-bg.jpg"}
        jsonLd={[
          serviceSchema({
            title: service.title,
            description: pageDescription,
            path: servicePath,
            image: service.heroPhoto,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Services", path: "/services" },
            { name: group.title, path: `/services#${group.slug}` },
            { name: service.title, path: servicePath },
          ]),
        ]}
      />

      <section style={{
        position: "relative",
        height: "clamp(360px, 36vw, 530px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
        {service.heroPhoto && (
          <img
            src={service.heroPhoto}
            alt={`${service.title} — ${service.tagline || "Tender Living Residence"}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        )}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: heroOverlay,
          mixBlendMode: "multiply",
          opacity: 0.82,
        }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(32px, 6%, 120px)", maxWidth: "860px" }}>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 60px)", color: "white", margin: "0 0 clamp(10px, 1vw, 16px)", lineHeight: 1.05 }}>
            {service.heroTitle || service.title}
            {service.titleNote && (
              <span style={{ fontWeight: 400, display: "block" }}>{service.titleNote}</span>
            )}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(14px, 1.3vw, 22px)", color: "rgba(255,245,243,0.88)", margin: 0, lineHeight: 1.45, maxWidth: "580px" }}>
            {service.tagline}
          </p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" />
          </svg>
        </div>
      </section>

      <section style={{ backgroundColor: "white", padding: "clamp(48px, 6vw, 88px) 0 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5%, 48px)" }}>
          <div style={bodyText}>
            {(description || "").split("\n\n").map((para, i) => (
              <p key={i} style={{ margin: i === 0 ? 0 : "20px 0 0" }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {(service.sections || []).map((section, i) => {
        const isLast = i === (service.sections || []).length - 1;
        return (
          <section
            key={i}
            style={{
              backgroundColor: "white",
              paddingBottom: isLast ? "100px" : 0,
              position: isLast ? "relative" : undefined,
              overflow: isLast ? "hidden" : undefined,
            }}
          >
            {isLast && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
                  <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" />
                </svg>
              </div>
            )}
            <SectionDivider title={section.heading} />
            {section.layout === "grid2-icon-right" && <Grid2IconRight section={section} />}
            {section.layout === "grid3" && <Grid3 section={section} />}
            {section.layout === "grid4" && <Grid4 section={section} />}
            {section.layout === "text" && <TextSection section={section} />}
            {section.layout === "bullets" && <BulletSection section={section} />}
            {section.layout === "process" && <ProcessSection section={section} />}
            {section.layout === "areas" && <AreasSection section={section} />}
            {section.layout === "faq" && <FaqSection section={section} />}
            {section.layout === "cta" && <CtaSection section={section} />}
          </section>
        );
      })}
    </>
  );
};

export default ServiceDetailPage;
