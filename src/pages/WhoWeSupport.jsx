const supportGroups = [
  {
    title: "Care Leavers",
    desc: "Young people transitioning out of the care system who need ongoing support to establish independent lives, manage finances, and build social networks.",
    image: "/accommodation.jpg",
    flip: false,
  },
  {
    title: "Young People with Mental Health Needs",
    desc: "Individuals experiencing anxiety, depression, trauma, or other mental health challenges who benefit from structured, compassionate daily support.",
    image: "/home-care.jpg",
    flip: true,
  },
  {
    title: "Young People at Risk of Homelessness",
    desc: "Those facing housing instability or insecurity who need safe accommodation and the skills to sustain long-term tenancies.",
    image: "/accommodation.jpg",
    flip: false,
  },
  {
    title: "Young People with Learning Difficulties",
    desc: "Individuals who need additional support with daily tasks, communication, and navigating community services.",
    image: "/home-care.jpg",
    flip: true,
  },
  {
    title: "Young Offenders in Transition",
    desc: "Individuals moving from custodial settings who need structured support to reintegrate and avoid reoffending.",
    image: "/accommodation.jpg",
    flip: false,
  },
  {
    title: "Young Parents",
    desc: "Young mothers and fathers who need guidance and practical support to provide safe, nurturing environments for their children.",
    image: "/home-care.jpg",
    flip: true,
  },
  {
    title: "Unaccompanied Asylum Seeking Children",
    desc: "Young people who have arrived in the UK alone and need safe housing, consistent support, and help navigating unfamiliar systems.",
    image: "/accommodation.jpg",
    flip: false,
  },
  {
    title: "Young People Fleeing Domestic Abuse",
    desc: "Individuals escaping unsafe home environments who need urgent safety, stabilisation, and long-term recovery support.",
    image: "/home-care.jpg",
    flip: true,
  },
];

const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const WhoWeSupport = () => {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          Who We Support
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "680px", lineHeight: 1.6 }}>
          We work with young people aged 16–25 from a range of backgrounds and with varied support needs.
        </p>
        <Wave />
      </section>

      {/* Alternating rows */}
      <section style={{ backgroundColor: "#fff5f3", position: "relative", overflow: "hidden", paddingBottom: "100px" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        {supportGroups.map((group, i) => (
          <div key={i} className="wws-row" style={{ direction: group.flip ? "rtl" : "ltr" }}>
            <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/3", direction: "ltr" }}>
              <img src={group.image} alt={group.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ direction: "ltr" }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 36px)", color: "#490652", margin: "0 0 20px", lineHeight: 1.2 }}>
                {group.title}
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.3vw, 18px)", color: "#606060", lineHeight: 1.7, margin: 0 }}>
                {group.desc}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default WhoWeSupport;
