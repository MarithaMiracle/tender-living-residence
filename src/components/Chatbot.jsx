import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the official AI assistant for Tender Living Residence. Your tone is compassionate, professional, and helpful. 
You help users understand our services and answer their questions.

Our Services:
1. Home-Based Care:
- Domiciliary Care: Scheduled visiting care for daily living. Link: /services/home-based-care/domiciliary-care
- Live-In Care: 24-hour dedicated support at home. Link: /services/home-based-care/live-in-care
- Complex Care: Clinical support (PEG, Tracheostomy, etc.). Link: /services/home-based-care/complex-care
- Companionship Care: Emotional support, social interaction, and reassurance. Link: /services/home-based-care/companionship-care
- Home-Based Respite: Planned relief for carers. Link: /services/home-based-care/home-based-respite

2. Accommodation-Based Support:
- Supported Living: Tenancy-focused support to build independence. Link: /services/accommodation-based-support/supported-living
- Supported Accommodation: Structured placements for stabilisation. Link: /services/accommodation-based-support/supported-accommodation

3. Crisis & Urgent Support:
- Emergency Crisis Placements: Short-notice cover for safety. Link: /services/crisis-and-urgent-support/emergency-crisis-placements
- Rapid Response: Fast deployment to prevent escalation. Link: /services/crisis-and-urgent-support/rapid-response

Core Values: Person-centred practice, safety, consistency, respectful relationships, and promoting independence.

Contact Info:
- Phone: 0121 798 9039
- Email: info@tlrs.co.uk
- Address: Tender Living Residence, United Kingdom
- Office Hours: Monday – Friday: 9:00am – 5:00pm

When users ask for contact details, provide them directly and clearly.

FORMAT RULES:
- Use simple line breaks for lists
- Do NOT use numbered references like [^1]
- Do NOT use footnotes
- Keep answers concise and easy to read
- Use bullet points (*) for lists
- Do NOT invent services we don't offer

When mentioning a specific service, you can include a link like this: [Service Name](/services/group/service-slug). Only include links when directly relevant.`;

const QUICK_REPLIES = [
  "What services do you offer?",
  "How do I get in touch?",
  "What's your contact number?",
  "Tell me about supported living",
  "I need urgent support"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am the Tender Living Residence assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tlr_chat_history");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save chat history to localStorage on change
  useEffect(() => {
    localStorage.setItem("tlr_chat_history", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const resetChat = () => {
    const newMessage = [{ role: "assistant", content: "Hello! I am the Tender Living Residence assistant. How can I help you today?" }];
    setMessages(newMessage);
    localStorage.setItem("tlr_chat_history", JSON.stringify(newMessage));
  };

  const handleQuickReply = async (text) => {
    setInput(text);
    const userMessage = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim();
      if (!apiKey) {
        throw new Error("API key is missing. Please add VITE_GROQ_API_KEY to your .env file.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
         throw new Error(data.error.message || "Failed to fetch response");
      }

      const assistantMessage = data.choices[0].message;
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY?.trim();
      if (!apiKey) {
        throw new Error("API key is missing. Please add VITE_GROQ_API_KEY to your .env file.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
         throw new Error(data.error.message || "Failed to fetch response");
      }

      const assistantMessage = data.choices[0].message;
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: "assistant", content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple markdown parser for links and basic formatting
  const renderMessage = (content) => {
    // First, handle line breaks
    const lines = content.split('\n');
    const result = [];

    lines.forEach((line, lineIndex) => {
      if (line.trim() === '') {
        result.push(<br key={`br-${lineIndex}`} />);
        return;
      }

      // Replace [text](url) with anchor tags within the line
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`link-${lineIndex}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#f06943", textDecoration: "underline", fontWeight: 600 }}
          >
            {match[1]}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      result.push(<div key={`line-${lineIndex}`}>{parts}</div>);
    });

    return result;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#490652",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(73, 6, 82, 0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div style={{
          position: "fixed",
          bottom: "100px",
          right: "24px",
          zIndex: 9999,
          width: "380px",
          height: "550px",
          maxHeight: "80vh",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid rgba(73, 6, 82, 0.1)"
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: "#490652",
            padding: "14px 16px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Avatar */}
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f06943", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                💬
              </div>
              <div>
                <h3 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600 }}>Tender Living Assistant</h3>
                <p style={{ margin: 0, fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Powered by AI</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={resetChat}
                title="Start Over"
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "4px" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "4px" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: "16px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            backgroundColor: "#FFF5F3"
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#b33874" : "white",
                color: msg.role === "user" ? "white" : "#490652",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "14px 14px 0 14px" : "14px 14px 14px 0",
                maxWidth: "85%",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.5,
              }}>
                {renderMessage(msg.content)}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", backgroundColor: "white", padding: "12px 16px", borderRadius: "14px 14px 14px 0", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#b33874", borderRadius: "50%", animation: "typing 1.4s infinite ease-in-out both" }}></div>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#b33874", borderRadius: "50%", animation: "typing 1.4s infinite ease-in-out both", animationDelay: "0.2s" }}></div>
                  <div style={{ width: "8px", height: "8px", backgroundColor: "#b33874", borderRadius: "50%", animation: "typing 1.4s infinite ease-in-out both", animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && !isLoading && (
            <div style={{
              padding: "8px 16px",
              backgroundColor: "white",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              borderTop: "1px solid rgba(73,6,82,0.05)"
            }}>
              {QUICK_REPLIES.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    border: "1px solid #b33874",
                    backgroundColor: "rgba(179, 56, 116, 0.05)",
                    color: "#490652",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(179, 56, 116, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(179, 56, 116, 0.05)";
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: "12px",
            backgroundColor: "white",
            borderTop: "1px solid rgba(73, 6, 82, 0.1)",
            display: "flex",
            gap: "8px"
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                backgroundColor: "#f06943",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                opacity: isLoading || !input.trim() ? 0.6 : 1
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Typing Animation CSS */}
      <style>{`
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Chatbot;