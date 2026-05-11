const Wave = ({ fill }) => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill={fill} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const Hero = () => {
  return (
    <section id="home" style={{position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>

      <div style={{position: "absolute", inset: 0, backgroundColor: "#D9D9D9"}}>
        <img src="/hero-bg.jpg" alt="Hero background" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}} />
      </div>

      <div style={{position: "absolute", inset: 0, background: "linear-gradient(178deg, rgba(255, 112, 72, 0.45) 5%, rgba(58, 5, 65, 0.79) 53%)"}} />

      <div className="hero-content" style={{position: "relative", zIndex: 10, maxWidth: "1440px", width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center"}}>

        <h1 style={{fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, color: "white", textShadow: "0px 4px 10px rgba(0,0,0,0.52)", maxWidth: "760px", marginBottom: "32px"}}>
          WE ARE HERE FOR YOUR{" "}
          <span style={{color: "#FFD6E8"}}>CARE NEEDS</span>
        </h1>

        <div style={{background: "linear-gradient(90deg, rgba(255, 112, 109, 0.87) 0%, rgba(235, 43, 137, 0.87) 43%, rgba(179, 61, 195, 0.87) 100%)", padding: "32px 40px", maxWidth: "912px", width: "100%"}}>
          <p className="hero-text" style={{fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 20px)", lineHeight: "1.6", color: "white", margin: 0}}>
            Here at Tender Living Residence, we provide high-quality Home care and supported living services across UK. Our service allows us to build personal, one-to-one relationships with the people we support, while maintaining the highest standards of professional care. Our team has extensive experience in providing compassionate and person-centred care.
            <br /><br />
            We aim to become a trusted part of your life or your loved one's life, promoting independence, dignity, and confidence whether at home or in a supported living setting. At Tender Living Residence, we don't just perform tasks; we genuinely care. Research shows that most people prefer to remain in their own homes as they grow older or when they need extra support. We ensure they receive the care they need from reliable, skilled carers, allowing them to stay safe, comfortable, and valued in their own surroundings.
          </p>
        </div>

      </div>
      <Wave fill="#490652" />
    </section>
  );
};

export default Hero;