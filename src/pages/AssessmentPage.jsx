import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Assumes you have a configured supabase client

const QUESTIONS = [
  {
    id: "q1",
    question: "Who are you looking for support for?",
    options: ["Myself", "A family member or loved one", "A client or patient"]
  },
  {
    id: "q2",
    question: "Where would the ideal care take place?",
    options: ["In their current own home", "In a new supported accommodation setting"]
  },
  {
    id: "q3",
    question: "What level of daily support is needed?",
    options: [
      "A few hours a week for companionship, outings, or errands",
      "Daily visits for personal care, meals, and medication",
      "24/7 continuous support and reassurance",
      "Crisis/Emergency immediate cover"
    ]
  },
  {
    id: "q4",
    question: "Are there any complex or clinical needs?",
    options: [
      "Yes, clinical needs (e.g., PEG, Tracheostomy, severe mobility)",
      "No, mainly personal care and daily living support",
      "Not sure, requires a professional assessment"
    ]
  }
];

const AssessmentPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [QUESTIONS[step].id]: option });
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1); // Move to email form
    }
  };

  const calculateResult = () => {
    if (answers.q2 === "In a new supported accommodation setting") return "Supported Living or Supported Accommodation";
    if (answers.q3 === "Crisis/Emergency immediate cover") return "Emergency Crisis Placements / Rapid Response";
    if (answers.q4 === "Yes, clinical needs (e.g., PEG, Tracheostomy, severe mobility)") return "Complex Care";
    if (answers.q3 === "24/7 continuous support") return "Live-In Care";
    if (answers.q3 === "A few hours a week for companionship, outings, or errands") return "Companionship Care";
    return "Domiciliary Care";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const recommendedService = calculateResult();
    setResult(recommendedService);

    try {
      // 1. Store in Supabase Database
      await supabase.from("assessments").insert([
        {
          name: userInfo.name,
          email: userInfo.email,
          answers: answers,
          recommended_service: recommendedService,
        }
      ]);

      // Note: Email sending logic (e.g., EmailJS or Supabase Edge Function with Resend) 
      // will be triggered here or via a Supabase database webhook.
      
    } catch (error) {
      console.error("Error saving assessment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFF5F3", minHeight: "80vh", padding: "80px 20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", borderRadius: "20px", padding: "40px", boxShadow: "0 10px 30px rgba(73,6,82,0.08)" }}>
        
        {/* Progress Bar */}
        {step < QUESTIONS.length && (
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontFamily: "Inter", fontSize: "14px", color: "#666" }}>
              <span>Question {step + 1} of {QUESTIONS.length}</span>
            </div>
            <div style={{ width: "100%", height: "6px", backgroundColor: "#f0f0f0", borderRadius: "10px" }}>
              <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, height: "100%", backgroundColor: "#f06943", borderRadius: "10px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        {step < QUESTIONS.length ? (
          <div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "24px", color: "#490652", marginBottom: "24px" }}>
              {QUESTIONS[step].question}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {QUESTIONS[step].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  style={{ textAlign: "left", padding: "16px 20px", borderRadius: "12px", border: "1px solid rgba(73,6,82,0.1)", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter", fontSize: "16px", color: "#333", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "#b33874"; e.target.style.backgroundColor = "rgba(179,56,116,0.05)"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "rgba(73,6,82,0.1)"; e.target.style.backgroundColor = "white"; }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : !result ? (
          /* Email Capture Form */
          <div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "24px", color: "#490652", marginBottom: "16px" }}>Almost there!</h2>
            <p style={{ fontFamily: "Inter", color: "#666", marginBottom: "24px" }}>Enter your details to see your recommended service and receive a copy via email.</p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <input required type="text" placeholder="Your Name" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd", fontFamily: "Inter", fontSize: "16px" }} />
              <input required type="email" placeholder="Your Email Address" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} style={{ padding: "14px", borderRadius: "8px", border: "1px solid #ddd", fontFamily: "Inter", fontSize: "16px" }} />
              <button type="submit" disabled={isSubmitting} style={{ backgroundColor: "#b33874", color: "white", padding: "16px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "8px" }}>
                {isSubmitting ? "Calculating..." : "See My Results"}
              </button>
            </form>
          </div>
        ) : (
          /* Result Screen */
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#e8f5e9", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <span style={{ fontSize: "32px" }}>✅</span>
            </div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "24px", color: "#490652", marginBottom: "16px" }}>Your Recommended Service</h2>
            <div style={{ backgroundColor: "rgba(240,105,67,0.1)", padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "Poppins", fontSize: "28px", color: "#f06943", margin: 0 }}>{result}</h3>
            </div>
            <p style={{ fontFamily: "Inter", color: "#666", marginBottom: "32px" }}>
              We've saved your preferences. Our team will reach out to the email provided ({userInfo.email}) with more information.
            </p>
            <Link to="/services" style={{ backgroundColor: "#490652", color: "white", padding: "14px 32px", borderRadius: "30px", textDecoration: "none", fontWeight: "bold", fontFamily: "Inter" }}>
              Explore All Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;