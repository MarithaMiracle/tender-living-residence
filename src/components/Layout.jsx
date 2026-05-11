import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
  </>
);

export default Layout;
