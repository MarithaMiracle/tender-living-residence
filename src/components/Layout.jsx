import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const Layout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <Outlet />
    <Footer />
    {/* CQC Regulated Care Tag - stationary on all pages */}
    <a href="https://www.cqc.org.uk/location/1-23695436535" target="_blank" rel="noopener noreferrer" style={{
      position: "fixed",
      bottom: "80px",
      left: "20px",
      zIndex: 1000,
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 18px",
      borderRadius: "100px",
      background: "rgba(73, 6, 82, 0.95)",
      border: "1px solid rgba(240, 105, 67, 0.5)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      textDecoration: "none",
      cursor: "pointer"
    }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#f06943", flexShrink: 0 }} />
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(255,245,243,0.9)" }}>CQC Regulated Care</span>
    </a>
    
    <Chatbot />
  </>
);

export default Layout;
