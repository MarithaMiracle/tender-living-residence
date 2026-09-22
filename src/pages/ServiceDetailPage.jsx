import { useParams, Link } from "react-router-dom";
import { getGroupBySlug, getServiceBySlug, serviceGroups } from "../data/services";
import SEO from "../components/SEO";
import { RichParagraphs, linkifyText } from "../components/RichText";
import { breadcrumbSchema, serviceSchema, faqSchema, truncate } from "../lib/seo";

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
    <h2 style={{
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      fontSize: "clamp(18px, 2.5vw, 40px)",
      color: "#f06943",
      margin: 0,
      whiteSpace: "normal",
      textAlign: "center",
      lineHeight: 1.15,
      maxWidth: "70%",
    }}>
      {title}
    </h2>
    <div style={{ flex: 1, height: "3px", background: "linear-gradient(to left, transparent, rgba(73,6,82,0.18))" }} />
  </div>
);

const IconItem = ({ circleImg, icon, title, subtitle, titleColor = "#888" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
    <div style={{ position: "relative", width: "84px", height: "84px" }}>
      <img src={circleImg} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
      {icon && (
        <img src={icon} alt="" style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
      )}
    </div>
    <h3 style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      fontSize: "clamp(13px, 1.1vw, 17px)",
      color: titleColor,
      margin: "16px 0 0",
      lineHeight: 1.3,
    }}>
      {title}
    </h3>
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
            <img src={item.icon} alt="" style={{ position: "absolute", inset: 0, margin: "auto", width: "52%", height: "52%", objectFit: "contain" }} />
          )}
        </div>
        <h3 style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "clamp(14px, 1.3vw, 18px)",
          color: section.itemTitleColor || "#4a0c57",
          margin: 0,
          lineHeight: 1.35,
          flex: 1,
        }}>
          {item.title}
        </h3>
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

const TextSection = ({ section, currentPath }) => (
  <div style={contentWrap}>
    <div style={bodyText}>
      <RichParagraphs text={section.text} currentPath={currentPath} style={bodyText} />
    </div>
  </div>
);

const BulletSection = ({ section, currentPath }) => (
  <div style={contentWrap}>
    {section.intro && (
      <p style={{ ...bodyText, margin: "0 0 20px" }}>{linkifyText(section.intro, { currentPath })}</p>
    )}
    <ul style={{ margin: 0, padding: "0 0 0 22px", ...bodyText }}>
      {(section.items || []).map((item, i) => (
        <li key={i} style={{ marginBottom: "12px" }}>
          {linkifyText(typeof item === "string" ? item : item.title, { currentPath })}
        </li>
      ))}
    </ul>
    {section.outro && (
      <p style={{ ...bodyText, margin: "20px 0 0" }}>{linkifyText(section.outro, { currentPath })}</p>
    )}
  </div>
);

const ProcessSection = ({ section, currentPath }) => (
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
        }} aria-hidden="true">
          {i + 1}
        </div>
        <div>
          <h3 style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(16px, 1.3vw, 20px)",
            color: "#490652",
            margin: "0 0 8px",
          }}>
            {step.title}
          </h3>
          <p style={{ ...bodyText, margin: 0 }}>{linkifyText(step.body, { currentPath })}</p>
        </div>
      </div>
    ))}
  </div>
);

const AreasSection = ({ section, currentPath }) => (
  <div style={contentWrap}>
    {section.intro && (
      <p style={{ ...bodyText, margin: "0 0 24px" }}>{linkifyText(section.intro, { currentPath })}</p>
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
      <p style={{ ...bodyText, margin: "24px 0 0" }}>{linkifyText(section.outro, { currentPath })}</p>
    )}
  </div>
);

const FaqSection = ({ section, currentPath }) => (
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
          <h3 style={{
            display: "inline",
            fontFamily: "inherit",
            fontWeight: "inherit",
            fontSize: "inherit",
            color: "inherit",
            margin: 0,
          }}>
            {faq.question}
          </h3>
        </summary>
        <p style={{ ...bodyText, margin: "14px 0 0" }}>{linkifyText(faq.answer, { currentPath })}</p>
      </details>
    ))}
  </div>
);

const CtaSection = ({ section, currentPath }) => (
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
          {linkifyText(section.intro, {
            currentPath,
            linkStyle: { color: "#f4a5c6", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" },
          })}
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {(section.items || []).map((item, i) => (
          <p key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", margin: 0, color: "rgba(255,245,243,0.92)" }}>
            {item.startsWith("Phone:") ? (
              <>Phone: <a href="tel:01217989039" style={{ color: "#f4a5c6", fontWeight: 600 }}>0121 798 9039</a></>
            ) : item.startsWith("Email:") ? (
              <>Email: <a href="mailto:info@tlrs.co.uk" style={{ color: "#f4a5c6", fontWeight: 600 }}>info@tlrs.co.uk</a></>
            ) : item}
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
        <Link to="/assessment" style={{
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
          Care Needs Assessment
        </Link>
        <Link to="/services" style={{
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
          All Services
        </Link>
      </div>
      {section.outro && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.65, margin: "24px 0 0", color: "rgba(255,245,243,0.8)" }}>
          {linkifyText(section.outro, {
            currentPath,
            linkStyle: { color: "#f4a5c6", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" },
          })}
        </p>
      )}
    </div>
  </div>
);

const RelatedServices = ({ group, currentSlug }) => {
  const related = (group?.services || []).filter((s) => s.slug !== currentSlug);
  if (!related.length) return null;

  return (
    <section style={{ backgroundColor: "white", padding: "0 0 40px" }}>
      <SectionDivider title="Related Services" />
      <div style={{
        maxWidth: "860px",
        margin: "40px auto 0",
        padding: "0 clamp(24px, 5%, 48px)",
        display: "grid",
        gap: "12px",
      }}>
        <p style={{ ...bodyText, margin: "0 0 8px" }}>
          Explore other {group.title.toLowerCase()} options from Tender Living Residence:
        </p>
        {related.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${group.slug}/${s.slug}`}
            style={{
              display: "block",
              padding: "16px 18px",
              borderRadius: "12px",
              backgroundColor: "#fff5f3",
              border: "1px solid rgba(73,6,82,0.08)",
              textDecoration: "none",
            }}
          >
            <h3 style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontSize: "17px",
              color: "#490652",
              margin: "0 0 6px",
            }}>
              {s.title}
            </h3>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#666",
              margin: 0,
              lineHeight: 1.5,
            }}>
              {s.tagline}
            </p>
          </Link>
        ))}
        <p style={{ ...bodyText, margin: "16px 0 0" }}>
          Or browse {" "}
          <Link to="/services" style={{ color: "#b33874", fontWeight: 600 }}>all our services</Link>
          {", "}
          learn more {" "}
          <Link to="/about" style={{ color: "#b33874", fontWeight: 600 }}>about us</Link>
          {", or "}
          <Link to="/cqc-regulated" style={{ color: "#b33874", fontWeight: 600 }}>our CQC regulation</Link>.
        </p>
      </div>
    </section>
  );
};

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
  const faqItems = (service.sections || []).find((s) => s.layout === "faq")?.items || [];
  const hasCta = (service.sections || []).some((s) => s.layout === "cta");
  const otherGroups = serviceGroups.filter((g) => g.slug !== group.slug);

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
          faqItems.length ? faqSchema(faqItems) : null,
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

      <section style={{ backgroundColor: "white", padding: "clamp(48px, 6vw, 88px) 0 0" }} aria-label="Introduction">
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5%, 48px)" }}>
          <div style={bodyText}>
            <RichParagraphs text={description} currentPath={servicePath} style={bodyText} />
          </div>
          <nav aria-label="Page links" style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "10px 18px" }}>
            <Link to="/services" style={{ color: "#b33874", fontWeight: 600, fontFamily: "Inter, sans-serif", fontSize: "15px" }}>Our Services</Link>
            <Link to="/contact" style={{ color: "#b33874", fontWeight: 600, fontFamily: "Inter, sans-serif", fontSize: "15px" }}>Contact Us</Link>
            <Link to="/assessment" style={{ color: "#b33874", fontWeight: 600, fontFamily: "Inter, sans-serif", fontSize: "15px" }}>Care Assessment</Link>
            <Link to="/cqc-regulated" style={{ color: "#b33874", fontWeight: 600, fontFamily: "Inter, sans-serif", fontSize: "15px" }}>CQC Regulated</Link>
            <Link to="/about" style={{ color: "#b33874", fontWeight: 600, fontFamily: "Inter, sans-serif", fontSize: "15px" }}>About Us</Link>
          </nav>
        </div>
      </section>

      {(service.sections || []).map((section, i) => {
        const isLast = i === (service.sections || []).length - 1 && !hasCta;
        return (
          <section
            key={i}
            style={{
              backgroundColor: "white",
              paddingBottom: isLast ? 0 : 0,
            }}
            aria-labelledby={`section-${i}`}
          >
            <div style={{ display: "none" }} id={`section-${i}`}>{section.heading}</div>
            <SectionDivider title={section.heading} />
            {section.layout === "grid2-icon-right" && <Grid2IconRight section={section} />}
            {section.layout === "grid3" && <Grid3 section={section} />}
            {section.layout === "grid4" && <Grid4 section={section} />}
            {section.layout === "text" && <TextSection section={section} currentPath={servicePath} />}
            {section.layout === "bullets" && <BulletSection section={section} currentPath={servicePath} />}
            {section.layout === "process" && <ProcessSection section={section} currentPath={servicePath} />}
            {section.layout === "areas" && <AreasSection section={section} currentPath={servicePath} />}
            {section.layout === "faq" && <FaqSection section={section} currentPath={servicePath} />}
            {section.layout === "cta" && <CtaSection section={section} currentPath={servicePath} />}
          </section>
        );
      })}

      <RelatedServices group={group} currentSlug={serviceSlug} />

      {otherGroups.length > 0 && (
        <section style={{ backgroundColor: "white", padding: "0 0 100px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
              <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" />
            </svg>
          </div>
          <SectionDivider title="More Ways We Support" />
          <div style={{
            maxWidth: "860px",
            margin: "32px auto 0",
            padding: "0 clamp(24px, 5%, 48px)",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            {otherGroups.map((g) => (
              <Link
                key={g.slug}
                to={`/services#${g.slug}`}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#490652",
                  backgroundColor: "#fff5f3",
                  border: "1px solid rgba(73,6,82,0.1)",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  textDecoration: "none",
                }}
              >
                {g.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetailPage;
