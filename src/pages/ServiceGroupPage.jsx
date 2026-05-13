import { Link } from "react-router-dom";
import { useEffect } from "react";

// ─── Assets (fetched 2026-04-23) ──────────────────────────────────────────────
const BANNER     = "/Our-services.png";

// Home-based card photos
const PHOTO_DOMI  = "/Domiciliary-care(home-based).png";
const PHOTO_LIVE  = "/Live-in-care(home-based).png";
const PHOTO_RESP  = "/Respite-care(home-based).png";
const PHOTO_CMPLX = "/Complex-care(home-based).png";

// Accommodation card photos
const PHOTO_SULIV = "/Supported-living(accommodation-based).png";
const PHOTO_SACCO = "/Supported-accommodation(accommodation-based).png";

// Crisis photos (kept from prior fetch)
const PHOTO_EMRG  = "/social-worker-taking-care-old-woman.jpg";
const PHOTO_RSPD  = "/Rapid-response(home-based).png";

// Referral section assets
const REF_BG      = "https://www.figma.com/api/mcp/asset/9e29556e-a422-4324-9aad-f9d40c797879";
const REF_FG      = "/Referrals-and-access.png";
const ELLIPSE24   = "/Ellipse 17 (Orange).png";
const ICON_SHIELD = "/Local-authorities.png";
const ICON_SUPPORT= "/Social-workers.png";
const ICON_HEALTH = "/Health-professionals.png";
const ICON_FAMILY = "/Families-and-careers.png";

const HOME_BASED = [
  { slug: "domiciliary-care",   title: "Domiciliary Care",  sub: "Visiting care",                desc: "Scheduled visits built around your routine, supporting daily living, personal care, and wellbeing at home.",                              photo: PHOTO_DOMI,  to: "/services/home-based-care/domiciliary-care" },
  { slug: "live-in-care",       title: "Live-In Care",                                            desc: "A dedicated carer living alongside you, providing round-the-clock support and reassurance.",                                               photo: PHOTO_LIVE,  to: "/services/home-based-care/live-in-care" },
  { slug: "home-based-respite", title: "Respite Care",                                            desc: "Planned or emergency breaks for family carers while maintaining full continuity for the person supported.",                                photo: PHOTO_RESP,  to: "/services/home-based-care/home-based-respite" },
  { slug: "complex-care",       title: "Complex Care",      sub: "Where clinically appropriate", desc: "Support for higher needs delivered with specialist staff, professional coordination, and clear care planning.",                             photo: PHOTO_CMPLX, to: "/services/home-based-care/complex-care" },
];

const ACCOMMODATION = [
  { slug: "supported-living",        title: "Supported Living",        desc: "Longer-term, tenancy-focused support for adults building independence with structured, consistent help.",                                                        photo: PHOTO_SULIV, to: "/services/accommodation-based-support/supported-living" },
  { slug: "supported-accommodation", title: "Supported Accommodation", desc: "Structured placements focused on stabilisation, transition, and progression for ages 16–25 and adults.",                                                         photo: PHOTO_SACCO, to: "/services/accommodation-based-support/supported-accommodation" },
];

const CRISIS = [
  { slug: "emergency-crisis-placements", title: "Emergency Crisis Placements", desc: "Safe, stabilising placements at very short notice for individuals in crisis while longer-term plans are arranged.", photo: PHOTO_EMRG, to: "/services/crisis-and-urgent-support/emergency-crisis-placements" },
  { slug: "rapid-response-crisis",       title: "Rapid Response",              desc: "Same-day or next-day deployment to stabilise urgent situations and maintain care continuity without disruption.",    photo: PHOTO_RSPD, to: "/services/crisis-and-urgent-support/rapid-response" },
];

const REFERRALS = [
  { label: "Local authorities\nand commissioners",  icon: ICON_SHIELD,  flip: false },
  { label: "Social workers\nand care coordinators", icon: ICON_SUPPORT, flip: false },
  { label: "Health professionals",                  icon: ICON_HEALTH,  flip: false },
  { label: "Families\nand individuals",             icon: ICON_FAMILY,  flip: true },
];

const TOGETHER_ITEMS = [
  { n: "01", color: "#f06943", heading: "Smooth Transitions",  body: "Move between home-based and accommodation-based care without disruption to relationships or routines." },
  { n: "02", color: "#b33874", heading: "Continuity of Care",  body: "Consistent staff, familiar faces, and shared care plans that carry through every stage of support." },
  { n: "03", color: "#f06943", heading: "Clear Progression",   body: "Structured pathways toward independence, reviewed regularly with the individual and their network." },
  { n: "04", color: "#b33874", heading: "Stable Placements",   body: "Proactive planning and responsive support reduce breakdown risk and protect long-term wellbeing." },
];

// ─── Injected CSS ─────────────────────────────────────────────────────────────
const CSS = `
  @keyframes sgpUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sgpFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes sgpPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(240,105,67,0.45); }
    50%      { box-shadow: 0 0 0 9px rgba(240,105,67,0); }
  }

  .sh0 { animation: sgpUp 0.75s 0.05s cubic-bezier(0.16,1,0.3,1) both; }
  .sh1 { animation: sgpUp 0.80s 0.18s cubic-bezier(0.16,1,0.3,1) both; }
  .sh2 { animation: sgpUp 0.80s 0.32s cubic-bezier(0.16,1,0.3,1) both; }
  .sh3 { animation: sgpUp 0.80s 0.46s cubic-bezier(0.16,1,0.3,1) both; }
  .shp { animation: sgpFade 1.2s 0.1s ease both; }

  .sr {
    opacity: 0; transform: translateY(22px);
    transition: opacity .65s cubic-bezier(0.16,1,0.3,1),
                transform .65s cubic-bezier(0.16,1,0.3,1);
  }
  .sr.on { opacity: 1; transform: none; }
  .sd1 { transition-delay: 55ms; }  .sd2 { transition-delay: 115ms; }
  .sd3 { transition-delay: 175ms; } .sd4 { transition-delay: 235ms; }
  .sd5 { transition-delay: 295ms; }

  .scard {
    transition: transform .28s cubic-bezier(0.34,1.45,0.64,1), box-shadow .28s ease;
  }
  .scard:hover { transform: translateY(-8px); }
  .scard-light:hover  { box-shadow: 0 28px 56px rgba(73,6,82,0.13); }
  .scard-dark:hover   { box-shadow: 0 28px 56px rgba(0,0,0,0.35); }
  .scard-crisis:hover { box-shadow: 0 28px 56px rgba(240,105,67,0.18); }
  .scard:hover .sarrow { transform: translateX(5px); }
  .sarrow { transition: transform .2s ease; display: inline-block; }

  .spill { transition: background .2s, border-color .2s; }
  .spill:hover { background: rgba(255,245,243,.18) !important; border-color: rgba(255,245,243,.5) !important; }

  .sbtn-o { transition: transform .2s ease, box-shadow .2s ease, background .2s; }
  .sbtn-o:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(240,105,67,.42); background: #d94d18 !important; }
  .sbtn-g { transition: background .2s, border-color .2s; }
  .sbtn-g:hover { background: rgba(255,245,243,.14) !important; border-color: rgba(255,245,243,.5) !important; }
  .sbtn-w { transition: transform .2s ease, box-shadow .2s ease; }
  .sbtn-w:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.18); }

  .strow { transition: background .2s; }
  .strow:hover { background: rgba(73,6,82,0.035) !important; border-radius: 12px; }

  .sref-tile { transition: transform .25s ease; }
  .sref-tile:hover { transform: translateY(-6px); }

  /* Rectangle 121 decorations hide on small screens */
  .srect121 { display: block; }
  @media (max-width: 1024px) { .srect121 { display: none; } }

  @media (max-width: 860px) {
    .saccom-grid  { grid-template-columns: 1fr !important; max-width: 420px !important; }
    .scrisis-grid { grid-template-columns: 1fr !important; max-width: 420px !important; }
    .stogether-split { grid-template-columns: 1fr !important; }
    .sref-layout  { grid-template-columns: 1fr !important; }
    .sref-grid    { grid-template-columns: 1fr 1fr !important; }
    .shome-grid   { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 768px) {
    .shero-content { padding: 40px 22px 56px !important; }
    .ssec-inner    { padding: 56px 22px !important; }
    .shome-grid    { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 500px) {
    .sref-grid { grid-template-columns: 1fr !important; }
  }
`;

// ─── Rectangle 121 decoration (from Figma: border-2 border-[#f64f1f] rounded-tl-[57px]) ──
const Rect121 = ({ flip = false, style = {} }) => (
  <div
    className="srect121"
    style={{
      position: "absolute",
      border: "2px solid #f64f1f",
      background: "transparent",
      pointerEvents: "none",
      borderRadius: flip ? "0 0 57px 0" : "57px 0 0 0",
      ...style,
    }}
  />
);

// ─── Service card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ title, sub, desc, photo, to, dark = false, crisis = false }) => {
  let bg, border, titleC, subC, descC, shadowBase;
  if (dark) {
    bg = "#490652"; border = "rgba(255,255,255,0.09)";
    titleC = "#ffffff"; subC = "rgba(255,245,243,0.45)"; descC = "rgba(255,245,243,0.72)";
    shadowBase = "0 2px 16px rgba(0,0,0,0.2)";
  } else if (crisis) {
    bg = "#fff8f4"; border = "rgba(240,105,67,0.22)";
    titleC = "#1a0802"; subC = "#b07050"; descC = "#7a5040";
    shadowBase = "0 2px 12px rgba(240,105,67,0.08)";
  } else {
    bg = "#ffffff"; border = "rgba(73,6,82,0.08)";
    titleC = "#1a1a1a"; subC = "#aaa"; descC = "#777";
    shadowBase = "0 2px 12px rgba(73,6,82,0.07)";
  }
  const variantClass = dark ? "scard-dark" : crisis ? "scard-crisis" : "scard-light";
  return (
    <Link to={to} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article className={`scard ${variantClass}`} style={{ backgroundColor: bg, border: `1px solid ${border}`, borderRadius: "20px", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", boxShadow: shadowBase }}>
        <div style={{ position: "relative", height: "clamp(200px,18vw,230px)", overflow: "hidden", flexShrink: 0 }}>
          <img src={photo} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "72px", background: `linear-gradient(to bottom, transparent, ${bg})`, pointerEvents: "none" }} />
        </div>
        <div style={{ padding: "18px 22px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(16px,1.4vw,19px)", color: titleC, margin: 0, lineHeight: 1.2 }}>{title}</h3>
            {sub && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: subC, margin: "3px 0 0", fontStyle: "italic" }}>{sub}</p>}
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: descC, margin: 0, lineHeight: 1.7, flex: 1 }}>{desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#f06943" }}>Learn more</span>
            <span className="sarrow" style={{ color: "#f06943", fontSize: "14px", lineHeight: 1 }}>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

// ─── Section header ───────────────────────────────────────────────────────────
const SHead = ({ step, title, accent, body, light = false, stepColor }) => {
  const sc   = stepColor || (light ? "rgba(255,245,243,0.38)" : "rgba(179,56,116,0.42)");
  const line = stepColor ? `${stepColor}55` : (light ? "rgba(255,245,243,0.2)" : "rgba(179,56,116,0.25)");
  return (
    <div className="sr" style={{ marginBottom: "clamp(32px,4vw,52px)" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, color: sc, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
        {step}<span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: line }} />
      </p>
      <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(24px,3vw,42px)", color: light ? "#ffffff" : "#1a1a1a", margin: "0 0 12px", lineHeight: 1.1 }}>
        {title} <span style={{ color: "#f06943" }}>{accent}</span>
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.2vw,16px)", color: light ? "rgba(255,245,243,0.65)" : "#777", margin: 0, lineHeight: 1.7, maxWidth: "480px" }}>
        {body}
      </p>
    </div>
  );
};

const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const OurServicesPage = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>

      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#2b0232", minHeight: "clamp(500px,70vh,760px)", display: "flex", alignItems: "center" }}>
        <div className="shp" style={{ position: "absolute", inset: 0 }}>
          <img src={BANNER} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#2b0232 0%,#3d0448 28%,rgba(61,4,72,0.82) 50%,rgba(61,4,72,0.42) 68%,rgba(43,2,50,0.65) 85%,#2b0232 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(43,2,50,0.55) 0%,transparent 18%,transparent 72%,rgba(43,2,50,0.55) 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-100px", right: "8%", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(255,245,243,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "22%", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(255,245,243,0.04)", pointerEvents: "none" }} />

        <div className="shero-content" style={{ position: "relative", zIndex: 1, maxWidth: "1440px", margin: "0 auto", width: "100%", padding: "clamp(72px,9vw,120px) clamp(36px,6%,100px)" }}>
          <div className="sh0" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "clamp(20px,3vw,30px)" }}>
            {["Home-Based Care", "Accommodation", "Crisis & Urgent"].map((t) => (
              <span key={t} className="spill" style={{ padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(255,245,243,0.22)", fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "rgba(255,245,243,0.75)", letterSpacing: "0.03em" }}>{t}</span>
            ))}
          </div>
          <h1 className="sh1" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(52px,8vw,104px)", color: "white", margin: "0 0 clamp(14px,2vw,22px)", lineHeight: 0.92, letterSpacing: "-0.025em" }}>
            Our<br/><span style={{ color: "#f06943" }}>Services.</span>
          </h1>
          <p className="sh2" style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(14px,1.4vw,18px)", color: "rgba(255,245,243,0.76)", margin: "0 0 clamp(28px,4vw,42px)", lineHeight: 1.7, maxWidth: "400px" }}>
            Flexible, person-centred care and support delivered at home, in supported living, or in an emergency placement.
          </p>
          <div className="sh3" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="#home-based" className="sbtn-o" style={{ padding: "13px 30px", borderRadius: "100px", backgroundColor: "#f06943", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", textDecoration: "none", display: "inline-block" }}>Explore Services</a>
            <Link to="/contact" className="sbtn-g" style={{ padding: "13px 26px", borderRadius: "100px", border: "1px solid rgba(255,245,243,0.28)", color: "rgba(255,245,243,0.88)", fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "none", display: "inline-block" }}>Make a Referral</Link>
          </div>
        </div>
        <Wave fill="#FFF5F3" />
      </section>


      {/* ═══ HOME-BASED CARE ════════════════════════════════════════════════ */}
      <section id="home-based" style={{ backgroundColor: "#FFF5F3", position: "relative", overflow: "hidden" }}>
        <div className="ssec-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(64px,8vw,104px) clamp(36px,6%,100px) 100px" }}>
          <SHead step="01" title="Home-Based" accent="Care" body="Professional support delivered in the comfort and familiarity of your own home, from daily visits to round-the-clock care." />

          <div className="shome-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px,1.6vw,20px)", maxWidth: "800px", margin: "0 auto" }}>
            {HOME_BASED.map((svc, i) => {
              const flip = i % 2 === 1;
              // mix of top-edge and mid-edge positions — varied but intentional
              const photoTops = ["16px", "clamp(172px,16vw,196px)", "16px", null];
              const rS = i === 3
                ? { right: "-78px", bottom: "16px", width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3 }
                : flip
                  ? { right: "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3 }
                  : { left:  "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3 };
              return (
                <div
                  key={svc.slug}
                  className={`sr sd${i + 1}`}
                  style={{
                    position: "relative",
                  }}
                >
                  <Rect121 flip={flip} style={rS} />
                  <ServiceCard {...svc} />
                </div>
              );
            })}
          </div>
        </div>
        <Wave fill="#490652" />
      </section>


      {/* ═══ ACCOMMODATION ══════════════════════════════════════════════════ */}
      <section id="accommodation" style={{ backgroundColor: "#490652", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: "-60px", top: "-60px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(255,245,243,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "6%", bottom: "-50px", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(255,245,243,0.04)", pointerEvents: "none" }} />

        <div className="ssec-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(64px,8vw,104px) clamp(36px,6%,100px) 100px" }}>
          <SHead step="02" title="Accommodation-Based" accent="Support" body="Safe, structured environments where individuals can stabilise, build skills, and progress toward long-term independence." light />

          <div className="saccom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px,1.6vw,20px)", maxWidth: "800px", margin: "0 auto" }}>
            {ACCOMMODATION.map((svc, i) => {
              const flip = i % 2 === 1;
              const photoTops = ["18px", "clamp(170px,16vw,194px)"];
              const rS = flip
                ? { right: "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3, borderColor: "rgba(246,79,31,0.9)" }
                : { left:  "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3, borderColor: "rgba(246,79,31,0.9)" };
              return (
                <div key={svc.slug} className={`sr sd${i + 1}`} style={{ position: "relative" }}>
                  <Rect121 flip={flip} style={rS} />
                  <ServiceCard {...svc} dark />
                </div>
              );
            })}
          </div>
        </div>
        <Wave fill="#ffffff" />
      </section>


      {/* ═══ CRISIS & URGENT ════════════════════════════════════════════════ */}
      <section id="crisis" style={{ backgroundColor: "#ffffff", position: "relative", overflow: "hidden" }}>
        <div className="ssec-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(64px,8vw,104px) clamp(36px,6%,100px) 100px" }}>
          <SHead step="03" title="Crisis &" accent="Urgent Support" body="When circumstances change suddenly, we respond quickly, stabilising situations, reducing risk, and keeping people safe." stepColor="#f06943" />

          <div className="sr" style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(240,105,67,0.08)", border: "1px solid rgba(240,105,67,0.2)", borderRadius: "12px", padding: "14px 20px", marginBottom: "clamp(28px,3vw,40px)", maxWidth: "640px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f06943", flexShrink: 0, animation: "sgpPulse 2.2s infinite" }} />
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#b83800", margin: 0 }}>
              Same-day &amp; next-day response available. Call <a href="tel:01217989039" style={{ color: "#b83800", textDecoration: "none" }}>0121 798 9039</a>
            </p>
          </div>

          <div className="scrisis-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(14px,1.6vw,20px)", maxWidth: "800px", margin: "0 auto" }}>
            {CRISIS.map((svc, i) => {
              // Emergency Crisis (i=0) → upper-left; Rapid Response (i=1) → top-right
              const flip = i === 1;
              const photoTops = ["16px", "14px"];
              const rS = flip
                ? { right: "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3, borderColor: "rgba(246,79,31,0.65)" }
                : { left:  "-78px", top: photoTops[i], width: "clamp(92px,8.5vw,112px)", height: "clamp(95px,9vw,130px)", zIndex: 3, borderColor: "rgba(246,79,31,0.65)" };
              return (
                <div key={svc.slug} className={`sr sd${i + 1}`} style={{ position: "relative" }}>
                  <Rect121 flip={flip} style={rS} />
                  <ServiceCard {...svc} crisis />
                </div>
              );
            })}
          </div>
        </div>
        <Wave fill="#f8f5fc" />
      </section>


      {/* ═══ HOW SERVICES WORK TOGETHER ═════════════════════════════════════ */}
      <section id="together" style={{ backgroundColor: "#f8f5fc", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-140px", right: "-140px", width: "440px", height: "440px", borderRadius: "50%", border: "1px solid rgba(73,6,82,0.05)", pointerEvents: "none" }} />

        <div className="ssec-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(64px,8vw,104px) clamp(36px,6%,100px) 100px" }}>
          <div className="sr" style={{ marginBottom: "clamp(36px,4vw,52px)" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, color: "rgba(179,56,116,0.42)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px", display: "flex", alignItems: "center", gap: "10px" }}>
              04 · Integrated Model
              <span style={{ display: "inline-block", width: "24px", height: "1px", backgroundColor: "rgba(179,56,116,0.25)" }} />
            </p>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(24px,3vw,42px)", color: "#1a1a1a", margin: 0, lineHeight: 1.1 }}>
              How Our Services Work <span style={{ color: "#f06943" }}>Together</span>
            </h2>
          </div>

          <div className="stogether-split" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "clamp(18px,2vw,28px)", alignItems: "start" }}>
            <div className="sr" style={{ background: "linear-gradient(150deg,#2b0232 0%,#490652 60%,#5e1558 100%)", borderRadius: "20px", padding: "clamp(32px,3.5vw,52px) clamp(28px,3vw,44px)", position: "relative", overflow: "hidden" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(80px,10vw,140px)", color: "rgba(255,245,243,0.045)", margin: 0, lineHeight: 1, position: "absolute", top: "-8px", right: "16px", userSelect: "none", pointerEvents: "none" }}>✦</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,245,243,0.38)", margin: "0 0 20px" }}>Our Approach</p>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px,2.8vw,38px)", color: "white", margin: "0 0 18px", lineHeight: 1.1 }}>
                One team.<br/>Every stage<br/>of the journey.
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,245,243,0.68)", margin: "0 0 32px", lineHeight: 1.75 }}>
                Our services are designed to move with the person, ensuring seamless continuity as needs evolve, staff relationships hold, and independence grows.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "9px 16px", borderRadius: "100px", background: "rgba(240,105,67,0.14)", border: "1px solid rgba(240,105,67,0.3)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#f06943", flexShrink: 0, animation: "sgpPulse 2s infinite" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,245,243,0.85)" }}>CQC Regulated Care</span>
              </div>
              <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "9px", padding: "9px 16px", borderRadius: "100px", background: "rgba(255,245,243,0.07)", border: "1px solid rgba(255,245,243,0.12)" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,245,243,0.7)" }}>✓ Personalised care plans</span>
              </div>
            </div>

            <div className="sr sd1" style={{ display: "flex", flexDirection: "column" }}>
              {TOGETHER_ITEMS.map((item, i) => (
                <div key={item.n} className="strow" style={{ display: "flex", alignItems: "flex-start", gap: "clamp(14px,1.5vw,20px)", padding: "clamp(20px,2vw,28px) clamp(14px,1.2vw,18px)", borderBottom: i < TOGETHER_ITEMS.length - 1 ? "1px solid rgba(73,6,82,0.08)" : "none", cursor: "default" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${item.color}18`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "12px", color: item.color }}>{item.n}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "clamp(13px,1.1vw,15px)", color: "#1a1a1a", margin: "0 0 5px", lineHeight: 1.3 }}>{item.heading}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(12px,1vw,14px)", color: "#888", margin: 0, lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                  <div style={{ width: "3px", height: "40px", borderRadius: "2px", backgroundColor: `${item.color}30`, flexShrink: 0, alignSelf: "center" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <Wave fill="#FFF5F3" />
      </section>


      {/* ═══ REFERRALS & ACCESS ═════════════════════════════════════════════ */}
      <section id="referrals" style={{ backgroundColor: "#FFF5F3", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 1 }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div className="ssec-inner" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(64px,8vw,104px) clamp(36px,6%,100px) 100px" }}>

          {/* ── Split: image left, content right ── */}
          <div className="sref-layout" style={{ display: "grid", gridTemplateColumns: "5fr 6fr", gap: "clamp(40px,5vw,80px)", alignItems: "center", marginBottom: "clamp(36px,4vw,52px)" }}>

            {/* Left: clean photo */}
            <div className="sr" style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "3/4", maxHeight: "540px" }}>
              <img src={REF_FG} alt="Referrals team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
            </div>

            {/* Right: header + referral list */}
            <div>
              <SHead step="05" title="Referrals &" accent="Access to Services" body="We accept referrals from a wide range of professionals and individuals. Our team responds promptly and guides you through the next steps." />
              <div className="sr">
                {REFERRALS.map((src, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "clamp(16px,1.8vw,24px)",
                    padding: "clamp(16px,1.8vw,22px) 0",
                    borderBottom: i < REFERRALS.length - 1 ? "1px solid rgba(73,6,82,0.1)" : "none",
                  }}>
                    <div style={{ width: "clamp(52px,5vw,64px)", height: "clamp(52px,5vw,64px)", borderRadius: "50%", position: "relative", flexShrink: 0 }}>
                      <img src={ELLIPSE24} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
                      <img src={src.icon} alt="" style={{ position: "absolute", inset: 0, margin: "auto", width: "54%", height: "54%", objectFit: "contain", transform: src.flip ? "scaleY(-1)" : "none" }} />
                    </div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "clamp(13px,1.2vw,17px)", color: "#2b0232", margin: 0, lineHeight: 1.35, whiteSpace: "pre-line" }}>{src.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CTA bar ── */}
          <div className="sr" style={{ background: "linear-gradient(135deg, #2b0232 0%, #490652 60%, #5e1558 100%)", borderRadius: "20px", padding: "clamp(28px,3vw,44px) clamp(28px,3.5vw,56px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "28px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "240px" }}>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(18px,1.8vw,26px)", color: "#fff5f3", margin: "0 0 8px", lineHeight: 1.2 }}>
                Ready to make a referral?
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(13px,1.1vw,15px)", color: "rgba(255,245,243,0.62)", margin: 0, lineHeight: 1.65 }}>
                Our team works closely with referrers to ensure placements are appropriate, timely, and fully supported from the outset.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", flexShrink: 0, alignItems: "center" }}>
              <a href="tel:01217989039" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(255,245,243,0.85)", textDecoration: "none", padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,245,243,0.18)", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,245,243,0.06)" }}>
                📞 0121 798 9039
              </a>
              <a href="mailto:tenderlivingresidence@gmail.com" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(255,245,243,0.85)", textDecoration: "none", padding: "10px 20px", borderRadius: "100px", border: "1px solid rgba(255,245,243,0.18)", display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,245,243,0.06)" }}>
                ✉ tenderlivingresidence@gmail.com
              </a>
              <Link to="/contact" className="sbtn-o" style={{ display: "inline-block", padding: "11px 28px", borderRadius: "100px", backgroundColor: "#f06943", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Make a Referral →
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OurServicesPage;
