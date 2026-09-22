import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim().replace(/^export\s+/, "");
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).split("#")[0].trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const { STATIC_SEO } = await import("../src/lib/seoRoutes.js");
const { serviceGroups } = await import("../src/data/services.js");
const {
  SITE,
  buildTitle,
  truncate,
  absoluteUrl,
  absoluteAssetUrl,
  serviceSchema,
  articleSchema,
  breadcrumbSchema,
} = await import("../src/lib/seo.js");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderSeoHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  jsonLd = [],
  article,
}) {
  const pageTitle =
    !title ? SITE.defaultTitle
    : (title.includes(SITE.name) || title.includes(" | ") ? title : buildTitle(title));
  const pageDescription = escapeHtml(truncate(description || SITE.defaultDescription));
  const canonical = escapeHtml(absoluteUrl(path));
  const ogImage = escapeHtml(absoluteAssetUrl(image || SITE.defaultOgImage));
  const safeTitle = escapeHtml(pageTitle);
  const gscVerification = process.env.VITE_GSC_VERIFICATION?.trim();

  const lines = [
    `<title>${safeTitle}</title>`,
    `<meta name="description" content="${pageDescription}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    noindex
      ? `<meta name="robots" content="noindex, nofollow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE.name)}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${safeTitle}" />`,
    `<meta property="og:description" content="${pageDescription}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:alt" content="${safeTitle}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="${escapeHtml(SITE.twitterHandle)}" />`,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    `<meta name="twitter:description" content="${pageDescription}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${safeTitle}" />`,
  ];

  if (article?.publishedTime) {
    lines.push(`<meta property="article:published_time" content="${escapeHtml(article.publishedTime)}" />`);
  }
  if (article?.modifiedTime) {
    lines.push(`<meta property="article:modified_time" content="${escapeHtml(article.modifiedTime)}" />`);
  }
  if (article?.author) {
    lines.push(`<meta property="article:author" content="${escapeHtml(article.author)}" />`);
  }
  if (article?.section) {
    lines.push(`<meta property="article:section" content="${escapeHtml(article.section)}" />`);
  }
  if (gscVerification) {
    lines.push(`<meta name="google-site-verification" content="${escapeHtml(gscVerification)}" />`);
  }

  for (const schema of jsonLd.filter(Boolean)) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
  }

  return lines.join("\n    ");
}

function injectIntoHtml(baseHtml, seoHead, bodyHtml = "") {
  const cleaned = baseHtml.replace(/\s*<title>[\s\S]*?<\/title>/i, "");
  const withLang = cleaned.replace(/<html[^>]*>/i, `<html lang="${SITE.language}">`);
  let html = withLang.replace("</head>", `    ${seoHead}\n</head>`);
  if (bodyHtml) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <main id="seo-static-content">${bodyHtml}</main>\n    <script>document.addEventListener("DOMContentLoaded",function(){var r=document.getElementById("root");var s=document.getElementById("seo-static-content");if(r&&s&&r.childElementCount>0){s.setAttribute("hidden","");}});</script>`,
    );
  }
  return html;
}

function routeToFile(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.slice(1)}.html`);
}

function buildServiceBodyHtml(group, service) {
  const parts = [];
  const h1 = escapeHtml(service.heroTitle || service.title);
  const intro = escapeHtml(service.figmaDescription || service.description || "");
  parts.push(`<h1>${h1}</h1>`);
  if (service.tagline) parts.push(`<p>${escapeHtml(service.tagline)}</p>`);
  for (const para of intro.split("\n\n").filter(Boolean)) {
    parts.push(`<p>${para}</p>`);
  }

  parts.push(`<nav aria-label="Internal links"><ul>
    <li><a href="/services">Our Services</a></li>
    <li><a href="/contact">Contact Us</a></li>
    <li><a href="/assessment">Care Needs Assessment</a></li>
    <li><a href="/cqc-regulated">CQC Regulated</a></li>
    <li><a href="/about">About Us</a></li>
  </ul></nav>`);

  for (const section of service.sections || []) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
    if (section.layout === "text" && section.text) {
      for (const para of section.text.split("\n\n").filter(Boolean)) {
        parts.push(`<p>${escapeHtml(para)}</p>`);
      }
    }
    if (section.layout === "bullets") {
      if (section.intro) parts.push(`<p>${escapeHtml(section.intro)}</p>`);
      parts.push("<ul>");
      for (const item of section.items || []) {
        parts.push(`<li>${escapeHtml(typeof item === "string" ? item : item.title)}</li>`);
      }
      parts.push("</ul>");
      if (section.outro) parts.push(`<p>${escapeHtml(section.outro)}</p>`);
    }
    if (section.layout === "process") {
      for (const step of section.steps || []) {
        parts.push(`<h3>${escapeHtml(step.title)}</h3>`);
        parts.push(`<p>${escapeHtml(step.body)}</p>`);
      }
    }
    if (section.layout === "grid3" || section.layout === "grid4" || section.layout === "grid2-icon-right") {
      parts.push("<ul>");
      for (const item of section.items || []) {
        parts.push(`<li><h3>${escapeHtml(item.title)}</h3></li>`);
      }
      parts.push("</ul>");
    }
    if (section.layout === "areas") {
      if (section.intro) parts.push(`<p>${escapeHtml(section.intro)}</p>`);
      parts.push("<ul>");
      for (const area of section.items || []) parts.push(`<li>${escapeHtml(area)}</li>`);
      parts.push("</ul>");
    }
    if (section.layout === "faq") {
      for (const faq of section.items || []) {
        parts.push(`<h3>${escapeHtml(faq.question)}</h3>`);
        parts.push(`<p>${escapeHtml(faq.answer)}</p>`);
      }
    }
    if (section.layout === "cta") {
      if (section.intro) parts.push(`<p>${escapeHtml(section.intro)}</p>`);
      parts.push(`<p><a href="/contact">Contact Us</a> · <a href="/assessment">Care Needs Assessment</a> · <a href="/services">All Services</a></p>`);
      if (section.outro) parts.push(`<p>${escapeHtml(section.outro)}</p>`);
    }
  }

  const related = (group.services || []).filter((s) => s.slug !== service.slug);
  if (related.length) {
    parts.push("<h2>Related Services</h2><ul>");
    for (const s of related) {
      parts.push(`<li><h3><a href="/services/${group.slug}/${s.slug}">${escapeHtml(s.title)}</a></h3><p>${escapeHtml(s.tagline || "")}</p></li>`);
    }
    parts.push("</ul>");
  }

  parts.push(`<h2>More Ways We Support</h2><ul>
    <li><a href="/services">Our Services</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/cqc-regulated">CQC Regulated Care</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>`);

  return parts.join("\n");
}

function getServiceSeoConfigs() {
  const configs = [];
  for (const group of serviceGroups) {
    for (const service of group.services) {
      const servicePath = `/services/${group.slug}/${service.slug}`;
      const pageDescription = truncate(
        service.metaDescription || service.tagline || service.figmaDescription || service.description,
      );
      const faqItems = (service.sections || []).find((s) => s.layout === "faq")?.items || [];
      configs.push({
        route: servicePath,
        bodyHtml: buildServiceBodyHtml(group, service),
        seo: {
          title: service.metaTitle || service.title,
          description: pageDescription,
          path: servicePath,
          image: service.heroPhoto || "/hero-bg.jpg",
          jsonLd: [
            serviceSchema({
              title: service.title,
              description: pageDescription,
              path: servicePath,
              image: service.heroPhoto,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Our Services", path: "/services" },
              { name: group.title, path: `/services#${group.slug}` },
              { name: service.title, path: servicePath },
            ]),
            faqItems.length
              ? {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqItems.map(({ question, answer }) => ({
                    "@type": "Question",
                    name: question,
                    acceptedAnswer: { "@type": "Answer", text: answer },
                  })),
                }
              : null,
          ],
        },
      });
    }
  }
  return configs;
}

async function getBlogSeoConfigs() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("posts")
    .select("title, slug, excerpt, content, cover_url, author, category, created_at, updated_at")
    .eq("published", true);

  if (error || !data) {
    console.warn("Could not fetch blog posts for SEO HTML:", error?.message);
    return [];
  }

  return data.map((post) => {
    const postPath = `/blog/${post.slug}`;
    const postDescription = truncate(post.excerpt || post.content?.slice(0, 160));
    return {
      route: postPath,
      seo: {
        title: post.title,
        description: postDescription,
        path: postPath,
        image: post.cover_url || "/hero-bg.jpg",
        type: "article",
        article: {
          publishedTime: post.created_at,
          modifiedTime: post.updated_at || post.created_at,
          author: post.author || SITE.name,
          section: post.category,
        },
        jsonLd: [
          articleSchema({
            title: post.title,
            description: postDescription,
            path: postPath,
            image: post.cover_url,
            author: post.author,
            datePublished: post.created_at,
            dateModified: post.updated_at || post.created_at,
            category: post.category,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: postPath },
          ]),
        ],
      },
    };
  });
}

async function main() {
  const indexPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("dist/index.html not found — run vite build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, "utf8");
  const pageConfigs = [
    ...Object.entries(STATIC_SEO).map(([route, seo]) => ({ route, seo })),
    ...getServiceSeoConfigs(),
    ...(await getBlogSeoConfigs()),
  ];

  for (const { route, seo, bodyHtml } of pageConfigs) {
    const html = injectIntoHtml(baseHtml, renderSeoHead(seo), bodyHtml);
    const outFile = routeToFile(route);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
  }

  console.log(`Injected SEO HTML for ${pageConfigs.length} routes → dist/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
