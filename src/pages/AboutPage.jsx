/* ─── Figma CDN assets ──────────────────────────────────────────────── */
const imgMain   = "https://www.figma.com/api/mcp/asset/ea19f3e3-914f-415a-9033-2bc275247f6a";
const imgPerson = "https://www.figma.com/api/mcp/asset/0075d217-0cac-487f-a0f9-1b110a8ab86b";

/* ─────────────────────────────────────────────────────────────────────
   GRAYSCALE BACKGROUND
   ─ The design uses ONE background image for the whole page.
   ─ background-blend-mode: luminosity over a gray gradient desaturates
     the image without touching children (no stacking-context side-effect).
   ─ background-attachment: fixed keeps the image stationary while the
     page scrolls → the same photo shows through every gap and section.
   ─ This is applied to both the outer wrapper (shows in the gaps between
     sections) AND each SideSection (so mix-blend-multiply has a local
     backdrop to compose against).
──────────────────────────────────────────────────────────────────────── */
const grayscaleBg = {
  backgroundImage:    `url(${imgMain}), linear-gradient(#808080, #808080)`,
  backgroundBlendMode:"luminosity",
  backgroundSize:     "cover, cover",
  backgroundPosition: "center, center",
  backgroundAttachment:"fixed, fixed",
};

/* ─────────────────────────────────────────────────────────────────────
   SideSection — floating card layout
   ┌──────────────┬─────────────────────────┐
   │  orange 32 % │  white card  55 %       │   12 % right gap
   │  multiply    │  rgba(255,255,255,0.95)  │   ← photo visible here
   └──────────────┴─────────────────────────┘
   Gaps between sections (in the outer wrapper) also show the photo.
──────────────────────────────────────────────────────────────────────── */
function SideSection({ label, children }) {
  return (
    <section
      style={{
        ...grayscaleBg,
        /* overflow:hidden creates the stacking context; the orange div's
           mix-blend-multiply composites against this element's bg image  */
        overflow: "hidden",
      }}
    >
      <div
        className="side-inner"
        style={{
          minHeight: "clamp(300px, 45.5vw, 874px)",
        }}
      >
        {/* ── orange strip (32.5%) ─────────────────────────────────── */}
        <div
          className="side-orange"
          style={{
            backgroundColor: "#f06943",
            mixBlendMode:    "multiply",
          }}
        >
          <span
            style={{
              display:    "block",
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              /* 96 px at 1920 px = 5 vw; clamp so "Our Commitments" fits */
              fontSize:   "clamp(20px, 5vw, 76px)",
              color:      "white",
              whiteSpace: "nowrap",
              transform:  "rotate(-90deg)",
              lineHeight: 1,
            }}
          >
            {label}
          </span>
        </div>

        {/* ── white floating card (55%) ────────────────────────────── */}
        <div
          className="side-card"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "clamp(40px, 4.2vw, 80px) clamp(24px, 8.5vw, 164px) clamp(40px, 4.2vw, 80px) clamp(28px, 9.8vw, 188px)",
          }}
        >
          <div style={{ maxWidth: 700, width: "100%" }}>
            {children}
          </div>
        </div>

        {/* right 12.5% — no element → photo shows through naturally */}
      </div>
    </section>
  );
}

/* body text — Figma: Inter Regular 30 px at 1920 px */
const txt = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  fontSize:   "clamp(14px, 1.56vw, 22px)",
  color:      "#000",
  lineHeight: 1.78,
  margin:     0,
};

/* ─────────────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────────────────── */
const AboutPage = () => (
  <>
    {/* ════════════════════════════════════════════════════════════════
        HERO
    ════════════════════════════════════════════════════════════════ */}
    <section
      style={{
        background:     "linear-gradient(to right, #f87171 0%, #db2777 43%, #c026d3 100%)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        minHeight:      "clamp(160px, 20.6vw, 396px)",
        padding:        "clamp(40px, 5vw, 100px) 24px",
      }}
    >
      <h1 style={{ fontFamily:"Inter,sans-serif", fontSize:"clamp(30px,4.5vw,72px)", color:"white", margin:0, lineHeight:1.1 }}>
        <em style={{ fontStyle:"italic", fontWeight:300 }}>About </em>
        <strong style={{ fontWeight:700 }}>Tender</strong>
        <br />
        <strong style={{ fontWeight:700 }}>Living Residence</strong>
      </h1>
    </section>

    {/* ════════════════════════════════════════════════════════════════
        INTRO — floating cards: photo (left, larger) | plum (right, overlapping)
    ════════════════════════════════════════════════════════════════ */}
    <div style={{ ...grayscaleBg, position: "relative", overflow: "hidden" }}>

      {/* WaveTop: hero gradient drips into the grayscale section */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none", zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block", transform: "scaleY(-1)" }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#f87171" />
              <stop offset="43%"  stopColor="#db2777" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>
          <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z" fill="url(#heroGrad)"/>
        </svg>
      </div>

      {/* floating gap above — clears the 80px WaveTop */}
      <div style={{ height: "100px" }} />

      <div className="about-intro-layout">

        {/* Photo card — flush to left edge, height controlled */}
        <div className="about-intro-photo" style={{
          height: "clamp(300px, 38vw, 620px)",
        }}>
          <img
            src={imgPerson}
            alt="A Tender Living Residence caregiver"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"right center" }}
          />
        </div>

        {/* Plum card — 42% wide so right edge lands at 87.5%, shorter than photo */}
        <div className="about-intro-plum" style={{
          marginLeft: "-2.5%",
          height:     "clamp(220px, 28vw, 460px)",
          alignSelf:  "center",
          padding:    "clamp(32px, 4vw, 60px) clamp(28px, 3.5vw, 56px)",
        }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize:   "clamp(13px, 1.15vw, 19px)",
            color:      "#fff5f3",
            lineHeight: 1.8,
            margin:     0,
          }}>
            <strong style={{ fontWeight: 800 }}>Tender Living Residence</strong> is a professional
            care provider offering domiciliary care, supported living, and supported accommodation
            helping individuals live safely, confidently, and with dignity.
            <br /><br />
            We support people experiencing change or additional needs, delivering practical,
            consistent care that promotes independence, stability, and personal growth.
          </p>
        </div>

        {/* right ~25.5% — background shows through */}
      </div>

      {/* floating gap below */}
      <div style={{ height: "clamp(40px, 5vw, 80px)" }} />

    </div>

    {/* ════════════════════════════════════════════════════════════════
        FLOATING SECTIONS WRAPPER
        Same grayscale fixed background as each SideSection, so the
        gaps between sections show the same continuous photo.
    ════════════════════════════════════════════════════════════════ */}
    <div style={{ ...grayscaleBg, position: "relative", overflow: "hidden" }}>

      {/* gap — photo visible before first card */}
      <div style={{ height: "clamp(40px, 5vw, 80px)" }} />

      {/* ── Our Vision ── */}
      <SideSection label="Our Vision">
        <p style={txt}>
          We envision a society where individuals are not defined by past experiences or
          circumstances, but are empowered to make meaningful choices, develop their full
          potential, and live independently with dignity and self-worth.
        </p>
        <br />
        <p style={txt}>
          Our ambition is to be a trusted, forward-thinking provider delivering high-quality
          care across home-based and accommodation-based services, and a reliable partner to
          local authorities and professionals, known for quality, consistency, and positive
          outcomes.
        </p>
      </SideSection>

      {/* gap — photo visible between cards */}
      <div style={{ height: "clamp(32px, 4vw, 64px)" }} />

      {/* ── Our Mission ── */}
      <SideSection label="Our Mission">
        <p style={txt}>
          Our mission is to deliver safe, inclusive, and person-centred care that is
          responsive, well-managed, and outcomes-focused.
        </p>
        <br />
        <p style={txt}>
          Through domiciliary care, supported living, and supported accommodation, we provide
          emotional support, practical assistance, and structured guidance that help individuals
          maintain independence, build confidence, and achieve their personal goals.
        </p>
        <br />
        <p style={txt}>
          We work collaboratively with families, health professionals, and local authorities
          to ensure care is coordinated, proportionate, and focused on long-term wellbeing.
        </p>
      </SideSection>

      <div style={{ height: "clamp(32px, 4vw, 64px)" }} />

      {/* ── Our Approach ── */}
      <SideSection label="Our Approach">
        <p style={txt}>
          Our approach is rooted in person-centred practice. We recognise that every
          individual's situation is unique, whether support is provided in someone's own home
          or within supported accommodation.
        </p>
        <br />
        <p style={txt}>
          We place strong emphasis on safety, consistency, and respectful relationships.
          Our teams are trained to deliver care that supports daily living, promotes wellbeing,
          and encourages independence, while providing reassurance and structure where required.
        </p>
        <br />
        <p style={txt}>
          Support is regularly reviewed to ensure it remains appropriate, effective, and aligned
          with agreed outcomes, enabling individuals to progress at a pace that reflects their
          needs and aspirations.
        </p>
        <br />
        <p style={txt}>
          Where appropriate, we support pathways into education, employment, and greater
          independence, always guided by the individual's own goals and circumstances.
        </p>
      </SideSection>

      <div style={{ height: "clamp(32px, 4vw, 64px)" }} />

      {/* ── Our Commitments ── */}
      <SideSection label="Our Commitments">
        <p style={{ ...txt, fontWeight:700, marginBottom:20 }}>
          Our services are built around three core commitments:
        </p>
        {[
          { title:"You will be safe",             desc:"We prioritise physical, emotional, psychological, and cultural safety in all care settings." },
          { title:"You will be respected",        desc:"We value individuality, personal choice, background, and identity in every aspect of care." },
          { title:"You will be supported to grow",desc:"We actively support independence, confidence, and progress, whether care is short-term, ongoing, or transitional." },
        ].map((c) => (
          <p key={c.title} style={{ ...txt, marginBottom:16 }}>
            <strong style={{ fontWeight:800 }}>{c.title}</strong>{"   "}{c.desc}
          </p>
        ))}
      </SideSection>

      {/* gap — photo visible between cards */}
      <div style={{ height: "clamp(40px, 5.5vw, 88px)" }} />

      {/* ── Who We Work With — two stacked floating cards ── */}
      <div style={{ padding: "0 clamp(24px, 6%, 120px)" }}>
        <div className="www-about-layout">

          {/* Purple card — title */}
          <div className="www-about-purple" style={{
            flex:            "0 0 42%",
            backgroundColor: "#490652",
            borderRadius:    "28px",
            padding:         "clamp(48px,5.5vw,88px) clamp(36px,4vw,64px)",
            display:         "flex",
            flexDirection:   "column",
            justifyContent:  "center",
            position:        "relative",
            zIndex:          1,
          }}>
            <h2 style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 800,
              fontSize:   "clamp(30px, 4.8vw, 80px)",
              color:      "white",
              margin:     0,
              lineHeight: 1.05,
            }}>
              Who We<br />Work With
            </h2>
          </div>

          {/* Pink card — list, tilted clockwise over the purple card */}
          <div className="www-about-pink" style={{
            flex:            "0 0 63%",
            backgroundColor: "#b33874",
            borderRadius:    "28px",
            padding:         "clamp(40px,5vw,72px) clamp(36px,4.5vw,72px)",
            marginLeft:      "-28px",
            transform:       "rotate(4deg)",
            transformOrigin: "left center",
            zIndex:          2,
            boxShadow:       "0 24px 64px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.12)",
          }}>
            {/* counter-rotate content so text stays straight */}
            <div className="www-about-pink-inner">
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize:   "clamp(14px, 1.3vw, 22px)",
                color:      "white",
                margin:     "0 0 20px",
              }}>
                We work in partnership with:
              </p>
              {[
                "Local authorities and commissioners",
                "Social workers and care coordinators",
                "Health professionals",
                "Families and carers",
                "Charities and community organisations",
                "Individuals seeking support for themselves",
              ].map((item) => (
                <p key={item} style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        12,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize:   "clamp(13px, 1.2vw, 20px)",
                  color:      "rgba(255,255,255,0.9)",
                  margin:     "0 0 14px",
                  lineHeight: 1.5,
                }}>
                  <span style={{
                    width:           7,
                    height:          7,
                    borderRadius:    "50%",
                    backgroundColor: "rgba(255,255,255,0.55)",
                    flexShrink:      0,
                  }} />
                  {item}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* gap — photo visible after last card */}
      <div style={{ height: "200px" }} />

      {/* Wave into footer */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
          <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
        </svg>
      </div>

    </div>
    {/* end floating wrapper */}
  </>
);

export default AboutPage;
