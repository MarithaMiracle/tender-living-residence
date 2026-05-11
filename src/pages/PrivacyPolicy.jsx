const Wave = () => (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
    <svg viewBox="0 0 1440 80" fill="#fff5f3" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
      <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
    </svg>
  </div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "40px" }}>
    <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(18px, 2vw, 24px)", color: "#490652", margin: "0 0 14px" }}>{title}</h2>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "15px", color: "#444", lineHeight: 1.8, margin: "0 0 12px" }}>{children}</p>
);

const PrivacyPolicy = () => (
  <>
    <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
        Privacy Policy
      </h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,245,243,0.75)", margin: 0 }}>
        Last updated: April 2025
      </p>
      <Wave />
    </section>

    <section style={{ backgroundColor: "#fff5f3", padding: "80px 0 100px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" fill="#490652" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "80px", display: "block" }} preserveAspectRatio="none">
          <path d="M0,80 C320,24 720,72 1080,28 C1260,8 1380,48 1440,30 L1440,80 Z"/>
        </svg>
      </div>
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 40px" }}>

        <Section title="1. Who We Are">
          <P>Tender Living Residence Ltd ("we", "us", "our") is a registered care provider based in the United Kingdom. We are committed to protecting the privacy of everyone who interacts with our website and services.</P>
          <P>If you have any questions about how we handle your data, please contact us at <a href="mailto:info@tlrs.co.uk" style={{ color: "#b33874" }}>info@tlrs.co.uk</a> or call <a href="tel:01217989039" style={{ color: "#b33874" }}>0121 798 9039</a>.</P>
        </Section>

        <Section title="2. Information We Collect">
          <P>We may collect the following types of personal information:</P>
          <ul style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 2, paddingLeft: "24px", margin: "0 0 12px" }}>
            <li>Contact details (name, email address, phone number)</li>
            <li>Enquiry or referral information submitted via our contact form</li>
            <li>Technical data such as IP address, browser type, and pages visited (via cookies)</li>
            <li>Employment application information if you apply for a role with us</li>
          </ul>
          <P>We do not collect sensitive personal data (such as health information) through this website. Any care-related personal data is handled separately under our care service agreements and applicable legislation.</P>
        </Section>

        <Section title="3. How We Use Your Information">
          <P>We use the information we collect to:</P>
          <ul style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 2, paddingLeft: "24px", margin: "0 0 12px" }}>
            <li>Respond to enquiries and referral requests</li>
            <li>Provide and improve our services</li>
            <li>Process job applications</li>
            <li>Comply with our legal and regulatory obligations</li>
            <li>Send relevant service updates where you have given consent</li>
          </ul>
          <P>We will never sell, rent, or trade your personal information to third parties for marketing purposes.</P>
        </Section>

        <Section title="4. Legal Basis for Processing">
          <P>We process your personal data under the following lawful bases as defined by the UK GDPR:</P>
          <ul style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 2, paddingLeft: "24px", margin: "0 0 12px" }}>
            <li><strong>Consent</strong> – where you have actively provided information to us</li>
            <li><strong>Legitimate interests</strong> – to respond to enquiries and manage our business operations</li>
            <li><strong>Legal obligation</strong> – where processing is required by law or regulation</li>
          </ul>
        </Section>

        <Section title="5. Cookies">
          <P>Our website uses cookies to improve your experience. Cookies are small text files stored on your device that help us understand how visitors use our site.</P>
          <P>You can control cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.</P>
        </Section>

        <Section title="6. Data Retention">
          <P>We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Enquiry data is typically retained for 12 months. Application data is retained for 6 months if you are unsuccessful.</P>
        </Section>

        <Section title="7. Your Rights">
          <P>Under UK data protection law, you have the right to:</P>
          <ul style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 2, paddingLeft: "24px", margin: "0 0 12px" }}>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <P>To exercise any of these rights, contact us at <a href="mailto:info@tlrs.co.uk" style={{ color: "#b33874" }}>info@tlrs.co.uk</a>. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" style={{ color: "#b33874" }} target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</P>
        </Section>

        <Section title="8. Third-Party Links">
          <P>Our website may contain links to external websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</P>
        </Section>

        <Section title="9. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date. We encourage you to review this page periodically.</P>
        </Section>

      </div>
    </section>
  </>
);

export default PrivacyPolicy;
