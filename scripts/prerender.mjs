import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";
import { serviceGroups } from "../src/data/services.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;

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

async function getBlogSlugs() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase.from("posts").select("slug").eq("published", true);
  return (data || []).map((p) => `/blog/${p.slug}`);
}

function routeToFile(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.slice(1)}.html`);
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", String(PORT), "--strictPort"], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
    });

    proc.on("error", reject);
    resolve(proc);
  });
}

async function waitForServer(maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return true;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function prerenderRoute(page, route) {
  await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 60000 });

  await page.waitForFunction(
    (expectedRoute) => window.location.pathname === expectedRoute,
    route,
    { timeout: 15000 },
  );

  await page.waitForSelector("h1", { timeout: 15000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1500));

  await page.evaluate(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
    if (ogTitle) {
      document.head.querySelectorAll("title").forEach((node) => node.remove());
      const titleEl = document.createElement("title");
      titleEl.textContent = ogTitle;
      document.head.appendChild(titleEl);
    }

    const keepLast = (selector) => {
      const nodes = [...document.head.querySelectorAll(selector)];
      nodes.slice(0, -1).forEach((node) => node.remove());
    };
    keepLast('meta[name="description"]');
    keepLast('meta[name="robots"]');
    keepLast('link[rel="canonical"]');
    [
      'meta[property="og:site_name"]',
      'meta[property="og:locale"]',
      'meta[property="og:type"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[property="og:image:alt"]',
      'meta[name="twitter:card"]',
      'meta[name="twitter:site"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:alt"]',
    ].forEach(keepLast);
  });

  const html = await page.evaluate(() => document.documentElement.outerHTML);
  const doc = `<!DOCTYPE html>\n${html}`;

  const outFile = routeToFile(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, doc);
}

async function main() {
  if (process.env.SKIP_PRERENDER === "1") {
    console.log("Skipping prerender (SKIP_PRERENDER=1).");
    return;
  }

  if (!fs.existsSync(distDir)) {
    console.error("dist/ not found — run vite build first.");
    process.exit(1);
  }

  const blogPaths = await getBlogSlugs();
  const routes = [
    ...STATIC_PATHS.filter((r) => r !== "/"),
    ...getServicePaths(),
    ...blogPaths,
    "/",
  ];

  console.log(`Prerendering ${routes.length} routes…`);

  let preview;
  try {
    preview = await startPreview();
    const ready = await waitForServer();
    if (!ready) throw new Error("Preview server failed to start");

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    for (const route of routes) {
      process.stdout.write(`  ${route}\n`);
      await prerenderRoute(page, route);
    }

    await browser.close();
    console.log(`Prerendered ${routes.length} routes into dist/`);
  } finally {
    if (preview) preview.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error("Prerender failed:", err.message);
  console.warn("Build will continue — pages still work as SPA with client-side SEO tags.");
  process.exit(0);
});
