import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import { getStaticSEO } from "../lib/seoRoutes";

const ADMIN_PREFIX = "/blog/admin";
const DYNAMIC_BLOG = /^\/blog\/[^/]+$/;
const DYNAMIC_SERVICE = /^\/services\/[^/]+\/[^/]+$/;

export default function RouteSEO() {
  const { pathname } = useLocation();

  if (pathname.startsWith(ADMIN_PREFIX)) {
    return <SEO title="Admin" description="Private admin area." path={pathname} noindex />;
  }

  if (DYNAMIC_BLOG.test(pathname) && pathname !== "/blog") {
    return null;
  }

  if (DYNAMIC_SERVICE.test(pathname)) {
    return null;
  }

  const config = getStaticSEO(pathname);
  if (config) {
    return <SEO {...config} />;
  }

  return null;
}
