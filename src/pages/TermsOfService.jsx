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

const TermsOfService = () => (
  <>
    <section style={{ backgroundColor: "#490652", padding: "80px 40px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 64px)", color: "#fff5f3", margin: "0 0 20px", lineHeight: 1.1 }}>
        Terms of Service
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

        <Section title="1. Acceptance of Terms">
          <P>By accessing or using the Tender Living Residence website (the "Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the Site.</P>
          <P>These terms apply to all visitors, users, and anyone who accesses or uses the Site.</P>
        </Section>

        <Section title="2. About Tender Living Residence">
          <P>Tender Living Residence Ltd is a regulated care provider operating in the United Kingdom. This website is provided for informational purposes and to facilitate contact with our team. It does not constitute medical, legal, or professional advice.</P>
        </Section>

        <Section title="3. Use of the Site">
          <P>You agree to use this Site only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</P>
          <ul style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#444", lineHeight: 2, paddingLeft: "24px", margin: "0 0 12px" }}>
            <li>Use the Site in any way that violates applicable local, national, or international law</li>
            <li>Transmit unsolicited or unauthorised advertising or promotional material</li>
            <li>Attempt to gain unauthorised access to any part of the Site or its related systems</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site</li>
          </ul>
        </Section>

        <Section title="4. Intellectual Property">
          <P>All content on this Site, including text, images, graphics, logos, and design, is the property of Tender Living Residence Ltd or its content suppliers and is protected by applicable intellectual property laws.</P>
          <P>You may view and print pages from the Site for personal, non-commercial use only. You must not reproduce, distribute, or use any content without our express written permission.</P>
        </Section>

        <Section title="5. Disclaimer of Warranties">
          <P>The Site is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.</P>
          <P>While we take care to ensure the accuracy of information on the Site, we make no representations or warranties as to its completeness, accuracy, or timeliness.</P>
        </Section>

        <Section title="6. Limitation of Liability">
          <P>To the fullest extent permitted by law, Tender Living Residence Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its content.</P>
          <P>Our total liability to you for any claim arising from your use of this Site shall not exceed £100.</P>
        </Section>

        <Section title="7. External Links">
          <P>Our Site may contain links to third-party websites. These links are provided for convenience only. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</P>
        </Section>

        <Section title="8. Contact Form & Referrals">
          <P>Information submitted via our contact or referral form is used solely to respond to your enquiry and, where applicable, to initiate a care referral process. Submission of a form does not create a contractual obligation on either party.</P>
        </Section>

        <Section title="9. Governing Law">
          <P>These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
        </Section>

        <Section title="10. Changes to These Terms">
          <P>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the revised terms.</P>
          <P>If you have any questions about these Terms, please contact us at <a href="mailto:info@tlrs.co.uk" style={{ color: "#b33874" }}>info@tlrs.co.uk</a>.</P>
        </Section>

      </div>
    </section>
  </>
);

export default TermsOfService;
