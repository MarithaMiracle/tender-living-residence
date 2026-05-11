import { useParams, Link } from "react-router-dom";
import { getGroupBySlug, getServiceBySlug } from "../data/services";

// ─── Orange section divider with lines ───────────────────────────────────────
const SectionDivider = ({ title }) => (
  <div style={{
    display:        "flex",
    alignItems:     "center",
    gap:            "clamp(16px, 2vw, 32px)",
    padding:        "0 clamp(32px, 6%, 120px)",
    margin:         "clamp(56px, 6vw, 88px) auto 0",
    maxWidth:       "1920px",
  }}>
    <div style={{ flex: 1, height: "3px", background: "linear-gradient(to right, transparent, rgba(73,6,82,0.18))" }} />
    <p style={{
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      fontSize:   "clamp(18px, 2.5vw, 40px)",
      color:      "#f06943",
      margin:     0,
      whiteSpace: "nowrap",
      textAlign:  "center",
      lineHeight: 1.0,
    }}>
      {title}
    </p>
    <div style={{ flex: 1, height: "3px", background: "linear-gradient(to left, transparent, rgba(73,6,82,0.18))" }} />
  </div>
);

// ─── Icon item: circle + optional icon overlay + title + optional subtitle ────
const IconItem = ({ circleImg, circleSize, icon, title, subtitle, titleColor = "#888" }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {/* Circle with icon */}
    <div style={{ position: "relative", width: circleSize, height: circleSize }}>
      <img src={circleImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            position:  "absolute",
            inset:     `${Math.round(circleSize * 0.16)}px`,
            width:     `${Math.round(circleSize * 0.68)}px`,
            height:    `${Math.round(circleSize * 0.68)}px`,
            objectFit: "contain",
          }}
        />
      )}
    </div>
    {/* Title */}
    <p style={{
      fontFamily: "Inter, sans-serif",
      fontWeight: 500,
      fontSize:   circleSize >= 200 ? "clamp(14px, 1.4vw, 22px)" : "clamp(12px, 1vw, 17px)",
      color:      titleColor,
      margin:     "clamp(10px, 1.2vw, 18px) 0 0",
      lineHeight: 1.2,
    }}>
      {title}
    </p>
    {/* Subtitle (gray, smaller) */}
    {subtitle && (
      <p style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize:   "clamp(11px, 0.9vw, 15px)",
        color:      "#888",
        margin:     "5px 0 0",
        lineHeight: 1.4,
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

// ─── 3-column grid ────────────────────────────────────────────────────────────
const Grid3 = ({ section }) => (
  <div style={{
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(160px, 18vw, 240px), 1fr))",
    gap:                 "clamp(32px, 4vw, 64px) clamp(16px, 2.5vw, 40px)",
    maxWidth:            "1200px",
    margin:              "clamp(40px, 4vw, 64px) auto 0",
    padding:             "0 clamp(32px, 6%, 120px)",
  }}>
    {section.items.map((item, i) => (
      <IconItem
        key={i}
        circleImg={section.circleImg}
        circleSize={section.circleSize}
        icon={item.icon}
        title={item.title}
        subtitle={item.subtitle}
        titleColor={section.itemTitleColor || "#888"}
      />
    ))}
  </div>
);

// ─── 4-column quality grid ────────────────────────────────────────────────────
const Grid4 = ({ section }) => (
  <div style={{
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(140px, 14vw, 200px), 1fr))",
    gap:                 "clamp(24px, 3vw, 48px) clamp(16px, 2vw, 32px)",
    maxWidth:            "1200px",
    margin:              "clamp(40px, 4vw, 64px) auto 0",
    padding:             "0 clamp(32px, 6%, 120px)",
  }}>
    {section.items.map((item, i) => (
      <IconItem
        key={i}
        circleImg={section.circleImg}
        circleSize={section.circleSize}
        icon={item.icon}
        title={item.title}
        subtitle={item.subtitle}
        titleColor={section.itemTitleColor || "#888"}
      />
    ))}
  </div>
);

// ─── 2-column: circle LEFT + text RIGHT ──────────────────────────────────────
const Grid2IconRight = ({ section }) => (
  <div style={{
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 460px), 1fr))",
    gap:                 "clamp(28px, 3.5vw, 56px) clamp(20px, 3vw, 48px)",
    maxWidth:            "1200px",
    margin:              "clamp(40px, 4vw, 64px) auto 0",
    padding:             "0 clamp(32px, 6%, 120px)",
  }}>
    {section.items.map((item, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 2vw, 32px)" }}>
        <div style={{ position: "relative", width: section.circleSize, height: section.circleSize, flexShrink: 0 }}>
          <img src={section.circleImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
          {item.icon && (
            <img
              src={item.icon}
              alt=""
              style={{
                position:  "absolute",
                inset:     `${Math.round(section.circleSize * 0.16)}px`,
                width:     `${Math.round(section.circleSize * 0.68)}px`,
                height:    `${Math.round(section.circleSize * 0.68)}px`,
                objectFit: "contain",
              }}
            />
          )}
        </div>
        <p style={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize:   "clamp(14px, 1.4vw, 22px)",
          color:      section.itemTitleColor || "#888",
          margin:     0,
          lineHeight: 1.35,
          flex:       1,
        }}>
          {item.title}
        </p>
      </div>
    ))}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ServiceDetailPage = () => {
  const { groupSlug, serviceSlug } = useParams();
  const group   = getGroupBySlug(groupSlug);
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

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        position:   "relative",
        height:     "clamp(360px, 36vw, 530px)",
        overflow:   "hidden",
        display:    "flex",
        alignItems: "center",
      }}>
        {service.heroPhoto && (
          <img
            src={service.heroPhoto}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        )}
        <div style={{
          position:        "absolute",
          inset:           0,
          backgroundColor: heroOverlay,
          mixBlendMode:    "multiply",
          opacity:         0.82,
        }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(32px, 6%, 120px)", maxWidth: "860px" }}>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 60px)", color: "white", margin: "0 0 clamp(10px, 1vw, 16px)", lineHeight: 1.05 }}>
            {service.title}
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
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
      </section>

      {/* ── Description ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "white", padding: "clamp(48px, 6vw, 88px) 0 0" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 clamp(32px, 6%, 120px)" }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize:   "clamp(16px, 1.6vw, 26px)",
            color:      "#000",
            lineHeight: 1.55,
            margin:     0,
            textAlign:  "justify",
          }}>
            {description}
          </p>
        </div>
      </section>

      {/* ── Icon sections ─────────────────────────────────────────────────── */}
      {(service.sections || []).map((section, i) => {
        const isLast = i === (service.sections || []).length - 1;
        return (
          <section key={i} style={{ backgroundColor: "white", paddingBottom: isLast ? "100px" : 0, position: isLast ? "relative" : undefined, overflow: isLast ? "hidden" : undefined }}>
            {isLast && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
                  <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
                </svg>
              </div>
            )}
            <SectionDivider title={section.heading} />
            {section.layout === "grid2-icon-right" && <Grid2IconRight section={section} />}
            {section.layout === "grid3"             && <Grid3 section={section} />}
            {section.layout === "grid4"             && <Grid4 section={section} />}
          </section>
        );
      })}
    </>
  );
};

export default ServiceDetailPage;
