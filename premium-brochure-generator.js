/**
 * premium-brochure-generator.js
 * ─────────────────────────────────────────────────────────────
 * PREMIUM WEBSITE BROCHURE GENERATOR
 * ─────────────────────────────────────────────────────────────
 * FEATURES
 * ✓ Premium cover pages
 * ✓ Desktop + mobile showcases
 * ✓ Automatic brand colour extraction
 * ✓ Table of contents
 * ✓ Section dividers
 * ✓ Device mockups
 * ✓ Editorial layouts
 * ✓ Sticky header removal
 * ✓ Animation disabling
 * ✓ Responsive screenshots
 * ✓ High quality PDF rendering
 * ✓ Generic reusable branding
 * ─────────────────────────────────────────────────────────────
 *
 * INSTALL:
 * npm install playwright pdf-lib node-vibrant
 * npx playwright install chromium
 *
 * RUN:
 * node premium-brochure-generator.js
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const Vibrant = require("node-vibrant");
const { PDFDocument } = require("pdf-lib");

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────

const CONFIG = {
    baseUrl: "http://localhost:5173",

    theme: "dark",

    output: {
        pdf: "brochure-premium.pdf",
        assetsDir: "preview-assets",
    },

    branding: {
        projectName: "Website Experience",
        website: "www.example.com",
        tagline: "Digital Experience Showcase",
    },

    capture: {
        desktop: {
            width: 1440,
            height: 900,
        },

        mobile: {
            width: 430,
            height: 932,
        },

        waitAfterNav: 1500,
        removeStickyElements: true,
        animationsDisabled: true,
    },

    pdf: {
        width: 1122,
        height: 793,
    },

    routes: [
        { path: "/", title: "Home" },
        { path: "/about", title: "About" },
        { path: "/services", title: "Services" },
        { path: "/contact", title: "Contact" },
    ],
};

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function titleSummary(title) {
    const summaries = {
        Home: "Landing experience and primary digital identity.",
        About: "Brand story and organizational positioning.",
        Services: "Core offerings and service presentation.",
        Contact: "Communication and engagement touchpoints.",
    };

    return summaries[title] || "Interface showcase and experience overview.";
}

async function extractBrandColor(imagePath) {
    try {
        const palette = await Vibrant.from(imagePath).getPalette();

        return (
            palette.Vibrant ? .hex ||
            palette.Muted ? .hex ||
            "#5b7fff"
        );
    } catch (err) {
        console.log("Brand colour extraction failed, using fallback.");
        return "#5b7fff";
    }
}

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────

function globalStyles(theme, accentColor) {
    const isDark = theme === "dark";

    return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 1122px;
      height: 793px;
      overflow: hidden;
      font-family: Inter, Arial, sans-serif;
      background: ${isDark ? "#09090f" : "#ffffff"};
      color: ${isDark ? "#ffffff" : "#111111"};
      position: relative;
    }

    .accent {
      color: ${accentColor};
    }
  `;
}

// ─────────────────────────────────────────────────────────────
// COVER PAGE
// ─────────────────────────────────────────────────────────────

function buildCoverPage(config, accentColor) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      ${globalStyles(config.theme, accentColor)}

      .wrap {
        width: 100%;
        height: 100%;
        padding: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
      }

      .eyebrow {
        font-size: 14px;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: ${accentColor};
        margin-bottom: 24px;
      }

      h1 {
        font-size: 72px;
        line-height: 1;
        margin-bottom: 24px;
        max-width: 700px;
      }

      .subtitle {
        font-size: 22px;
        line-height: 1.7;
        opacity: 0.7;
        max-width: 700px;
      }

      .meta {
        position: absolute;
        bottom: 80px;
        left: 80px;
        line-height: 2;
        font-size: 14px;
        opacity: 0.5;
      }

      .gradient {
        position: absolute;
        width: 500px;
        height: 500px;
        right: -120px;
        top: -120px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          ${accentColor}55,
          transparent 70%
        );
      }

      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);

        background-size: 40px 40px;
      }
    </style>
  </head>

  <body>
    <div class="grid"></div>
    <div class="gradient"></div>

    <div class="wrap">
      <div class="eyebrow">
        Interactive Digital Showcase
      </div>

      <h1>${config.branding.projectName}</h1>

      <div class="subtitle">
        A curated visual walkthrough of the website
        experience, layouts, interfaces, and user journeys.
      </div>

      <div class="meta">
        <div>${config.branding.website}</div>
        <div>${config.branding.tagline}</div>
        <div>${new Date().toDateString()}</div>
      </div>
    </div>
  </body>
  </html>
  `;
}

// ─────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────

function buildTOC(routes, config, accentColor) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      ${globalStyles(config.theme, accentColor)}

      body {
        padding: 70px;
      }

      h1 {
        font-size: 54px;
        margin-bottom: 50px;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 0;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        font-size: 20px;
      }

      .dots {
        flex: 1;
        border-bottom: 1px dashed rgba(255,255,255,0.15);
        margin: 0 16px;
      }
    </style>
  </head>

  <body>
    <h1>Contents</h1>

    ${routes
      .map(
        (route, i) => `
        <div class="item">
          <span>${route.title}</span>
          <span class="dots"></span>
          <span>${i + 3}</span>
        </div>
      `
      )
      .join("")}
  </body>
  </html>
  `;
}

// ─────────────────────────────────────────────────────────────
// DIVIDER PAGE
// ─────────────────────────────────────────────────────────────

function buildDividerPage(route, summary, config, accentColor) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      ${globalStyles(config.theme, accentColor)}

      body {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 100px;
      }

      .card {
        width: 100%;
        padding: 70px;
        border-radius: 32px;
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
      }

      .index {
        color: ${accentColor};
        font-size: 14px;
        letter-spacing: 4px;
        margin-bottom: 20px;
      }

      h1 {
        font-size: 60px;
        margin-bottom: 24px;
      }

      p {
        font-size: 22px;
        line-height: 1.7;
        max-width: 700px;
        opacity: 0.7;
      }
    </style>
  </head>

  <body>
    <div class="card">
      <div class="index">SECTION</div>

      <h1>${route.title}</h1>

      <p>${summary}</p>
    </div>
  </body>
  </html>
  `;
}

// ─────────────────────────────────────────────────────────────
// SHOWCASE PAGE
// ─────────────────────────────────────────────────────────────

function buildShowcasePage({
  route,
  desktopImage,
  mobileImage,
  pageNumber,
  totalPages,
  config,
  accentColor,
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      ${globalStyles(config.theme, accentColor)}

      body {
        padding: 30px;
      }

      .layout {
        display: grid;
        grid-template-columns: 1.4fr 0.6fr;
        gap: 28px;
        height: 100%;
      }

      .desktop {
        background: #111;
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.08);
      }

      .desktop img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background: #111;
      }

      .mobile-column {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .mobile-frame {
        flex: 1;
        border-radius: 40px;
        overflow: hidden;
        border: 8px solid #222;
        background: #000;
        padding: 8px;
      }

      .mobile-frame img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 30px;
      }

      .info {
        padding: 24px;
        border-radius: 24px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.06);
      }

      .route {
        font-size: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: ${accentColor};
        margin-bottom: 12px;
      }

      h2 {
        font-size: 32px;
        margin-bottom: 14px;
      }

      p {
        font-size: 15px;
        line-height: 1.7;
        opacity: 0.7;
      }

      .footer {
        position: absolute;
        bottom: 16px;
        left: 30px;
        right: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        opacity: 0.4;
      }
    </style>
  </head>

  <body>
    <div class="layout">

      <div class="desktop">
        <img src="data:image/png;base64,${desktopImage}" />
      </div>

      <div class="mobile-column">

        <div class="mobile-frame">
          <img src="data:image/png;base64,${mobileImage}" />
        </div>

        <div class="info">
          <div class="route">${route.path}</div>

          <h2>${route.title}</h2>

          <p>${titleSummary(route.title)}</p>
        </div>

      </div>
    </div>

    <div class="footer">
      <span>${config.branding.website}</span>
      <span>${pageNumber} / ${totalPages}</span>
    </div>
  </body>
  </html>
  `;
}

// ─────────────────────────────────────────────────────────────
// PDF HELPER
// ─────────────────────────────────────────────────────────────

async function htmlToPdf(browser, html) {
  const page = await browser.newPage();

  await page.setViewportSize({
    width: CONFIG.pdf.width,
    height: CONFIG.pdf.height,
  });

  await page.setContent(html, {
    waitUntil: "networkidle",
  });

  const pdf = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });

  await page.close();

  return pdf;
}

// ─────────────────────────────────────────────────────────────
// PAGE STABILIZATION
// ─────────────────────────────────────────────────────────────

async function stabilizePage(page) {
  await page.waitForLoadState("networkidle");

  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });

  if (CONFIG.capture.animationsDisabled) {
    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      `,
    });
  }

  if (CONFIG.capture.removeStickyElements) {
    await page.addStyleTag({
      content: `
        .sticky,
        .fixed,
        header,
        nav {
          position: static !important;
          top: auto !important;
        }
      `,
    });
  }

  await page.waitForTimeout(CONFIG.capture.waitAfterNav);
}

// ─────────────────────────────────────────────────────────────
// RESPONSIVE SCREENSHOTS
// ─────────────────────────────────────────────────────────────

async function captureResponsive(browser, url, slug) {
  // Desktop
  const desktopPage = await browser.newPage();

  await desktopPage.setViewportSize(CONFIG.capture.desktop);

  await desktopPage.goto(url, {
    waitUntil: "networkidle",
  });

  await stabilizePage(desktopPage);

  const desktopBuffer = await desktopPage.screenshot({
    fullPage: true,
    type: "png",
  });

  const desktopPath = path.join(
    CONFIG.output.assetsDir,
    `${slug}-desktop.png`
  );

  fs.writeFileSync(desktopPath, desktopBuffer);

  await desktopPage.close();

  // Mobile
  const mobilePage = await browser.newPage();

  await mobilePage.setViewportSize(CONFIG.capture.mobile);

  await mobilePage.goto(url, {
    waitUntil: "networkidle",
  });

  await stabilizePage(mobilePage);

  const mobileBuffer = await mobilePage.screenshot({
    fullPage: true,
    type: "png",
  });

  const mobilePath = path.join(
    CONFIG.output.assetsDir,
    `${slug}-mobile.png`
  );

  fs.writeFileSync(mobilePath, mobileBuffer);

  await mobilePage.close();

  return {
    desktopBase64: desktopBuffer.toString("base64"),
    mobileBase64: mobileBuffer.toString("base64"),
  };
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

(async () => {
  console.log("\n🚀 Premium Brochure Generator\n");

  ensureDir(CONFIG.output.assetsDir);

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const pdfBuffers = [];

    // Extract brand colour
    const tempPage = await browser.newPage();

    await tempPage.goto(CONFIG.baseUrl, {
      waitUntil: "networkidle",
    });

    const tempShot = path.join(
      CONFIG.output.assetsDir,
      "brand-source.png"
    );

    await tempPage.screenshot({
      path: tempShot,
    });

    await tempPage.close();

    const accentColor = await extractBrandColor(tempShot);

    console.log(`🎨 Brand colour: ${accentColor}`);

    // Cover
    pdfBuffers.push(
      await htmlToPdf(
        browser,
        buildCoverPage(CONFIG, accentColor)
      )
    );

    // TOC
    pdfBuffers.push(
      await htmlToPdf(
        browser,
        buildTOC(CONFIG.routes, CONFIG, accentColor)
      )
    );

    // Routes
    for (const route of CONFIG.routes) {
      const slug =
        route.path.replace(/\//g, "-").replace(/^-/, "") ||
        "home";

      const url = CONFIG.baseUrl + route.path;

      console.log(`📸 Capturing ${url}`);

      const captures = await captureResponsive(
        browser,
        url,
        slug
      );

      // Divider page
      pdfBuffers.push(
        await htmlToPdf(
          browser,
          buildDividerPage(
            route,
            titleSummary(route.title),
            CONFIG,
            accentColor
          )
        )
      );

      // Showcase page
      pdfBuffers.push(
        await htmlToPdf(
          browser,
          buildShowcasePage({
            route,
            desktopImage: captures.desktopBase64,
            mobileImage: captures.mobileBase64,
            pageNumber: pdfBuffers.length + 1,
            totalPages:
              CONFIG.routes.length * 2 + 2,
            config: CONFIG,
            accentColor,
          })
        )
      );
    }

    // Merge PDFs
    const finalPdf = await PDFDocument.create();

    for (const buffer of pdfBuffers) {
      const pdf = await PDFDocument.load(buffer);

      const pages = await finalPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((p) => finalPdf.addPage(p));
    }

    const finalBytes = await finalPdf.save();

    fs.writeFileSync(
      CONFIG.output.pdf,
      finalBytes
    );

    console.log("\n✅ Done!");
    console.log(`📘 PDF: ${CONFIG.output.pdf}`);
    console.log(
      `🖼 Assets: ${CONFIG.output.assetsDir}`
    );
    console.log(
      `📄 Pages Generated: ${pdfBuffers.length}`
    );
  } catch (err) {
    console.error("\n❌ ERROR\n");
    console.error(err);
  } finally {
    await browser.close();
  }
})();