import { serviceGroups } from "../data/services";
import { SITE, organizationSchema, websiteSchema, breadcrumbSchema } from "./seo";

const HOME_DESCRIPTION =
  "Compassionate home care and supported living across the UK. CQC-regulated services including domiciliary care, live-in care, supported accommodation, and crisis support.";

export const STATIC_SEO = {
  "/": {
    title: SITE.defaultTitle,
    description: HOME_DESCRIPTION,
    path: "/",
    jsonLd: [organizationSchema(), websiteSchema()],
  },
  "/about": {
    title: "About Us",
    description:
      "Learn about Tender Living Residence — our mission, values, and commitment to person-centred home care and supported living across the UK.",
    path: "/about",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
      ]),
    ],
  },
  "/our-values": {
    title: "Our Values",
    description:
      "Discover the core values that guide every aspect of care at Tender Living Residence — dignity, compassion, independence, and trust.",
    path: "/our-values",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Our Values", path: "/our-values" },
      ]),
    ],
  },
  "/who-we-support": {
    title: "Who We Support",
    description:
      "We support adults with mental health needs, learning disabilities, physical disabilities, and those transitioning from hospital or custodial settings.",
    path: "/who-we-support",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Who We Support", path: "/who-we-support" },
      ]),
    ],
  },
  "/how-we-support": {
    title: "How We Support",
    description:
      "Our person-centred approach covers daily living, emotional wellbeing, skills development, and coordinated care with families and professionals.",
    path: "/how-we-support",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "How We Support", path: "/how-we-support" },
      ]),
    ],
  },
  "/when-we-support": {
    title: "When We Support",
    description:
      "From first referral to sustained independence — understand our five-phase support journey at Tender Living Residence.",
    path: "/when-we-support",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "When We Support", path: "/when-we-support" },
      ]),
    ],
  },
  "/services": {
    title: "Our Services",
    description:
      "Explore home-based care, supported living, supported accommodation, and crisis support services from CQC-regulated Tender Living Residence.",
    path: "/services",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Our Services", path: "/services" },
      ]),
    ],
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Get in touch with Tender Living Residence. Email info@tlrs.co.uk or visit us at 11 St Paul's Square, Birmingham. We respond promptly.",
    path: "/contact",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact Us", path: "/contact" },
      ]),
    ],
  },
  "/work-with-us": {
    title: "Work With Us",
    description:
      "Join the Tender Living Residence team. Explore career opportunities in home care and supported living across the UK.",
    path: "/work-with-us",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Work With Us", path: "/work-with-us" },
      ]),
    ],
  },
  "/assessment": {
    title: "Care Needs Assessment",
    description:
      "Take our quick care needs assessment to find the right Tender Living Residence service — domiciliary care, live-in care, supported living, and more.",
    path: "/assessment",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Care Assessment", path: "/assessment" },
      ]),
    ],
  },
  "/application-form": {
    title: "Application Form",
    description:
      "Apply to join Tender Living Residence as a care professional. Submit your application online.",
    path: "/application-form",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Application Form", path: "/application-form" },
      ]),
    ],
  },
  "/blog": {
    title: "Blog & Insights",
    description:
      "Read articles on home care, supported living, wellbeing, and care guidance from the Tender Living Residence team.",
    path: "/blog",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "Privacy policy for Tender Living Residence — how we collect, use, and protect your personal data.",
    path: "/privacy-policy",
    noindex: false,
  },
  "/terms-of-service": {
    title: "Terms of Service",
    description: "Terms of service for using the Tender Living Residence website and services.",
    path: "/terms-of-service",
    noindex: false,
  },
  "/cqc-regulated": {
    title: "CQC Regulated Care",
    description:
      "Tender Living Residence is CQC-regulated. Learn about our compliance with Care Quality Commission standards for safe, effective, caring, responsive, and well-led services.",
    path: "/cqc-regulated",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "CQC Regulated", path: "/cqc-regulated" },
      ]),
    ],
  },
};

export function getStaticSEO(pathname) {
  return STATIC_SEO[pathname] || null;
}

export function getAllStaticPaths() {
  return Object.keys(STATIC_SEO);
}

export function getAllServicePaths() {
  const paths = [];
  for (const group of serviceGroups) {
    for (const service of group.services) {
      paths.push(`/services/${group.slug}/${service.slug}`);
    }
  }
  return paths;
}

export function getAllPublicPaths() {
  return [...getAllStaticPaths(), ...getAllServicePaths()];
}
