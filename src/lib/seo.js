export const SITE = {
  name: "Tender Living Residence",
  legalName: "Tender Living Residence",
  tagline: "Home Care & Supported Living UK",
  defaultTitle: "Tender Living Residence | Home Care & Supported Living UK",
  defaultDescription:
    "Tender Living Residence provides compassionate home care, supported living, and crisis support across the UK. CQC-regulated, person-centred care for adults and families.",
  url: (import.meta.env?.VITE_SITE_URL || process.env.VITE_SITE_URL || "https://www.tlrs.co.uk").replace(/\/$/, ""),
  email: "info@tlrs.co.uk",
  phone: "",
  locale: "en_GB",
  language: "en-GB",
  defaultOgImage: "/hero-bg.jpg",
  twitterHandle: "@tenderlivingresidence",
  address: {
    streetAddress: "11 St Paul's Square",
    addressLocality: "Birmingham",
    postalCode: "B3 1RB",
    addressCountry: "GB",
  },
  geo: {
    latitude: 52.4862,
    longitude: -1.9024,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/tender-living-residence/",
    instagram: "https://www.instagram.com/tenderlivingresidence",
    facebook: "https://www.facebook.com/tenderlivingresidence",
  },
  cqcUrl: "https://www.cqc.org.uk/location/1-23695436535",
};

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}

export function absoluteAssetUrl(path) {
  if (!path) return absoluteUrl(SITE.defaultOgImage);
  if (path.startsWith("http")) return path;
  return absoluteUrl(path.startsWith("/") ? path : `/${path}`);
}

export function buildTitle(pageTitle) {
  if (!pageTitle) return SITE.defaultTitle;
  return `${pageTitle} | ${SITE.name}`;
}

export function truncate(text, max = 160) {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeHealthCareService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteAssetUrl("/logo.png"),
    image: absoluteAssetUrl(SITE.defaultOgImage),
    description: SITE.defaultDescription,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      ...SITE.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    sameAs: Object.values(SITE.social),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "CQC Regulated",
      url: SITE.cqcUrl,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.defaultDescription,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({ title, description, path, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: truncate(description, 300),
    url: absoluteUrl(path),
    image: absoluteAssetUrl(image),
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: title,
  };
}

export function articleSchema({ title, description, path, image, author, datePublished, dateModified, category }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: truncate(description, 300),
    url: absoluteUrl(path),
    image: absoluteAssetUrl(image),
    author: {
      "@type": "Organization",
      name: author || SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteAssetUrl("/logo.png"),
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    articleSection: category,
    mainEntityOfPage: absoluteUrl(path),
  };
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
