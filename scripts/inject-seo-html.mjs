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
  const pageTitle = title?.includes(SITE.name) ? title : buildTitle(title);
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

function injectIntoHtml(baseHtml, seoHead) {
  const cleaned = baseHtml.replace(/\s*<title>[\s\S]*?<\/title>/i, "");
  return cleaned.replace(
    "</head>",
    `    ${seoHead}\n</head>`,
  ).replace("<html", `<html lang="${SITE.language.split("-")[0]}"`);
}

function routeToFile(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.slice(1)}.html`);
}

function getServiceSeoConfigs() {
  const configs = [];
  for (const group of serviceGroups) {
    for (const service of group.services) {
      const servicePath = `/services/${group.slug}/${service.slug}`;
      const pageDescription = truncate(service.tagline || service.figmaDescription || service.description);
      configs.push({
        route: servicePath,
        seo: {
          title: service.title,
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

  for (const { route, seo } of pageConfigs) {
    const html = injectIntoHtml(baseHtml, renderSeoHead(seo));
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
