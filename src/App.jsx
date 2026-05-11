import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import OurValues from "./pages/OurValues";
import WhoWeSupport from "./pages/WhoWeSupport";
import HowWeSupport from "./pages/HowWeSupport";
import WhenWeSupport from "./pages/WhenWeSupport";
import ServiceGroupPage from "./pages/ServiceGroupPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Contact from "./pages/Contact";
import WorkWithUs from "./pages/WorkWithUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CQCRegulated from "./pages/CQCRegulated";
import ApplicationForm from "./pages/ApplicationForm";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import BlogEditor from "./pages/BlogEditor";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/",                                        element: <Home /> },
      { path: "/about",                                   element: <AboutPage /> },
      { path: "/our-values",                              element: <OurValues /> },
      { path: "/who-we-support",                          element: <WhoWeSupport /> },
      { path: "/how-we-support",                          element: <HowWeSupport /> },
      { path: "/when-we-support",                         element: <WhenWeSupport /> },
      { path: "/services",                                  element: <ServiceGroupPage /> },
      { path: "/services/:groupSlug/:serviceSlug",        element: <ServiceDetailPage /> },
      { path: "/contact",                                 element: <Contact /> },
      { path: "/work-with-us",                            element: <WorkWithUs /> },
      { path: "/privacy-policy",                          element: <PrivacyPolicy /> },
      { path: "/terms-of-service",                        element: <TermsOfService /> },
      { path: "/cqc-regulated",                           element: <CQCRegulated /> },
      { path: "/application-form",                        element: <ApplicationForm /> },
      { path: "/blog",                                    element: <Blog /> },
      { path: "/blog/admin",                              element: <BlogAdmin /> },
      { path: "/blog/admin/new",                          element: <BlogEditor /> },
      { path: "/blog/admin/edit/:id",                     element: <BlogEditor /> },
      { path: "/blog/:slug",                              element: <BlogPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
