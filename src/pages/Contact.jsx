import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1.5px solid #e0d0e6",
    fontFamily: "Inter, sans-serif",
    fontSize: "15px",
    color: "#490652",
    backgroundColor: "white",
    outline: "none",
    boxSizing: "border-box",
  };

  const Wave = () => (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
      <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
        <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
      </svg>
    </div>
  );

  return (
    <>
      {sent && (
        <div style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 9999,
          backgroundColor: "#490652", color: "white",
          borderRadius: "16px", padding: "20px 28px",
          boxShadow: "0 8px 32px rgba(73,6,82,0.35)",
          display: "flex", alignItems: "center", gap: "14px",
          fontFamily: "Inter, sans-serif", maxWidth: "360px",
          animation: "slideInToast 0.3s ease",
        }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#b33874", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
            ✓
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "15px", margin: "0 0 3px" }}>Message sent!</p>
            <p style={{ fontSize: "13px", color: "rgba(255,245,243,0.8)", margin: 0, lineHeight: 1.5 }}>
              Thank you. We will be in touch with you shortly.
            </p>
          </div>
          <button onClick={() => setSent(false)} style={{ background: "none", border: "none", color: "rgba(255,245,243,0.6)", cursor: "pointer", fontSize: "18px", lineHeight: 1, marginLeft: "auto", padding: 0, flexShrink: 0 }}>
            ✕
          </button>
        </div>
      )}
      {/* Hero */}
      <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
          Contact Us
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(16px, 1.8vw, 22px)", color: "rgba(255,245,243,0.85)", margin: "0 auto", maxWidth: "600px", lineHeight: 1.6 }}>
          We'd love to hear from you. Get in touch to make a referral, ask a question, or learn more about our services.
        </p>
        <Wave />
      </section>

      {/* Contact content */}
      <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
          <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
            <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
          </svg>
        </div>
        <div className="contact-grid" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 32px)", color: "#490652", margin: "0 0 32px" }}>
              Get In Touch
            </h2>
            {[
              { label: "Phone", value: "0121 798 9039" },
              { label: "Email", value: "info@tenderliving.co.uk" },
              { label: "Address", value: "Tender Living Residence, United Kingdom" },
              { label: "Office Hours", value: "Monday – Friday: 9:00am – 5:00pm" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "24px" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "13px", color: "#b33874", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "16px", color: "#490652", margin: 0 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ backgroundColor: "white", borderRadius: "24px", padding: "40px", boxShadow: "0 2px 20px rgba(73,6,82,0.08)", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="contact-form-row">
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#490652", display: "block", marginBottom: "6px" }}>Full Name</label>
                <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#490652", display: "block", marginBottom: "6px" }}>Email</label>
                <input style={inputStyle} type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </div>
            <div className="contact-form-row">
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#490652", display: "block", marginBottom: "6px" }}>Phone (optional)</label>
                <input style={inputStyle} name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
              </div>
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#490652", display: "block", marginBottom: "6px" }}>Subject</label>
                <input style={inputStyle} name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" required />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#490652", display: "block", marginBottom: "6px" }}>Message</label>
              <textarea
                style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more about your enquiry…"
                required
              />
            </div>
            <button type="submit" style={{ backgroundColor: "#490652", color: "white", fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "16px", padding: "14px 32px", borderRadius: "40px", border: "none", cursor: "pointer", alignSelf: "flex-start" }}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
