import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import { serviceGroups } from "../src/data/services.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");

function loadEnvFile() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const SITE_URL = (process.env.VITE_SITE_URL || "https://www.tlrs.co.uk").replace(/\/$/, "");

const STATIC_PATHS = [
  "/",
  "/about",
  "/our-values",
  "/who-we-support",
  "/how-we-support",
  "/when-we-support",
  "/services",
  "/contact",
  "/work-with-us",
  "/assessment",
  "/application-form",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
  "/cqc-regulated",
];

function getServicePaths() {
  const paths = [];
  for (const group of serviceGroups) {
    for (const service of group.services) {
      paths.push(`/services/${group.slug}/${service.slug}`);
    }
  }
  return paths;
}

async function getBlogPosts() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("Supabase env vars missing — sitemap will omit blog posts.");
    return [];
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("posts")
    .select("slug, updated_at, created_at")
    .eq("published", true);

  if (error) {
    console.warn("Could not fetch blog posts for sitemap:", error.message);
    return [];
  }

  return data || [];
}

function toLastmod(date) {
  if (!date) return new Date().toISOString().split("T")[0];
  return new Date(date).toISOString().split("T")[0];
}

function buildUrlEntry(loc, lastmod, changefreq, priority) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : "",
    priority ? `    <priority>${priority}</priority>` : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error("dist/ not found — run vite build first.");
    process.exit(1);
  }

  const blogPosts = await getBlogPosts();
  const today = new Date().toISOString().split("T")[0];
  const entries = [];

  for (const route of STATIC_PATHS) {
    entries.push(
      buildUrlEntry(
        `${SITE_URL}${route === "/" ? "/" : route}`,
        today,
        route === "/" ? "weekly" : "monthly",
        route === "/" ? "1.0" : "0.8",
      ),
    );
  }

  for (const route of getServicePaths()) {
    entries.push(buildUrlEntry(`${SITE_URL}${route}`, today, "monthly", "0.9"));
  }

  for (const post of blogPosts) {
    entries.push(
      buildUrlEntry(
        `${SITE_URL}/blog/${post.slug}`,
        toLastmod(post.updated_at || post.created_at),
        "weekly",
        "0.7",
      ),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
  fs.copyFileSync(path.join(root, "public", "robots.txt"), path.join(distDir, "robots.txt"));

  console.log(`Sitemap written with ${entries.length} URLs → dist/sitemap.xml`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
