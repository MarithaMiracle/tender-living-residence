/**
 * generate-brochure.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Captures your local React dev site and compiles it into a polished
 * multi-page PDF brochure.
 *
 * SETUP (run once):
 *   npm install playwright
 *   npx playwright install chromium
 *
 * USAGE:
 *   node generate-brochure.js
 *
 * OUTPUT:
 *   brochure.pdf  ← in the same directory as this script
 * ─────────────────────────────────────────────────────────────────────────────
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const CONFIG = {
    // Your local dev server URL
    baseUrl: "http://localhost:5173",

    // List every route you want captured, in order.
    // Each entry becomes one page in the brochure.
    routes: [
        { path: "/", title: "Home" },
        { path: "/about", title: "About" },
        { path: "/our-values", title: "Our Values" },
        { path: "/who-we-support", title: "Who We Support" },
        { path: "/how-we-support", title: "How We Support" },
        { path: "/when-we-support", title: "When We Support" },
        { path: "/services", title: "Services" },

        // Home-Based Care
        { path: "/services/home-based-care/domiciliary-care", title: "Domiciliary Care" },
        { path: "/services/home-based-care/live-in-care", title: "Live-In Care" },
        { path: "/services/home-based-care/complex-care", title: "Complex Care" },
        { path: "/services/home-based-care/home-based-respite", title: "Home-Based Respite" },

        // Accommodation-Based Support
        { path: "/services/accommodation-based-support/supported-living", title: "Supported Living" },
        { path: "/services/accommodation-based-support/supported-accommodation", title: "Supported Accommodation" },

        // Crisis & Urgent Support
        { path: "/services/crisis-and-urgent-support/emergency-crisis-placements", title: "Emergency / Crisis Placements" },
        { path: "/services/crisis-and-urgent-support/rapid-response", title: "Rapid Response" },

        { path: "/contact", title: "Contact" },
        { path: "/work-with-us", title: "Work With Us" },
        { path: "/cqc-regulated", title: "CQC Regulated" },
        { path: "/blog", title: "Blog" },
    ],
    // Branding shown on the cover page and footer
    branding: {
        projectName: "My Project", // ← change this
        clientName: "Client Name", // ← change this
        preparedBy: "Lofty Bazaar Consult",
        website: "www.yoursite.com", // ← change this (shown in footer)
        primaryColor: "#1a1a2e", // cover page background colour
        accentColor: "#e94560", // cover page accent / highlight colour
    },

    // PDF page dimensions (A4 landscape for a brochure feel)
    pdf: {
        format: "A4",
        landscape: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" },
    },

    // Viewport used when capturing each page
    viewport: { width: 1440, height: 900 },

    // Output filename
    outputFile: "brochure.pdf",

    // How long to wait after navigation before capturing (ms)
    // Increase if your site has heavy animations or lazy-loaded content
    waitAfterNav: 2000,
};
// ─────────────────────────────────────────────────────────────────────────────

async function buildCoverPage(branding) {
    const { projectName, clientName, preparedBy, website, primaryColor, accentColor } = branding;
    const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1122px; height: 793px;
          background: ${primaryColor};
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 80px 100px;
          position: relative;
          overflow: hidden;
        }
        .accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background: ${accentColor};
        }
        .top-label {
          font-size: 13px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${accentColor};
          margin-bottom: 24px;
        }
        h1 {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .subtitle {
          font-size: 22px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 60px;
        }
        .meta {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 2;
        }
        .meta strong { color: rgba(255,255,255,0.85); }
        .circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .c1 { width: 500px; height: 500px; right: -120px; top: -120px; }
        .c2 { width: 350px; height: 350px; right: 80px; top: 60px; }
        .c3 { width: 200px; height: 200px; right: 160px; bottom: 60px; background: ${accentColor}22; }
        .website {
          position: absolute;
          bottom: 36px; right: 60px;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <div class="accent-bar"></div>
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
      <div class="top-label">Website Preview &mdash; ${today}</div>
      <h1>${projectName}</h1>
      <div class="subtitle">Prepared for ${clientName}</div>
      <div class="meta">
        <div><strong>Prepared by</strong> &nbsp; ${preparedBy}</div>
        <div><strong>Status</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Development Preview</div>
        <div><strong>Date</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${today}</div>
      </div>
      <div class="website">${website}</div>
    </body>
    </html>
  `;
}

async function buildSectionPage(screenshotBase64, route, index, total, branding) {
    const { projectName, accentColor, website } = branding;
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1122px; height: 793px;
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #0f0f1a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 40px;
          background: #0f0f1a;
          border-bottom: 2px solid ${accentColor};
          flex-shrink: 0;
        }
        .header-left {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .header-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
        }
        .header-right {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 1px;
        }
        .screenshot-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .screenshot-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 40px;
          background: #0f0f1a;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .footer-left {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
        }
        .footer-right {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
        }
      </style>
    </head>
    <body>
      <div class="header">
        <span class="header-left">${projectName} &mdash; Preview</span>
        <span class="header-title">${route.title}</span>
        <span class="header-right">${route.path}</span>
      </div>
      <div class="screenshot-wrap">
        <img src="data:image/png;base64,${screenshotBase64}" alt="${route.title}" />
      </div>
      <div class="footer">
        <span class="footer-left">${website}</span>
        <span class="footer-right">Page ${index + 1} of ${total}</span>
      </div>
    </body>
    </html>
  `;
}

async function htmlToPdfPage(browser, htmlContent, pdfOptions) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1122, height: 793 });
    await page.setContent(htmlContent, { waitUntil: "networkidle" });
    const pdfBuffer = await page.pdf({
        ...pdfOptions,
        width: "297mm",
        height: "210mm",
        printBackground: true,
    });
    await page.close();
    return pdfBuffer;
}

async function mergePdfBuffers(buffers) {
    // Simple binary merge using pdf-lib if available, otherwise use a manual approach
    try {
        const { PDFDocument } = require("pdf-lib");
        const mergedDoc = await PDFDocument.create();
        for (const buf of buffers) {
            const doc = await PDFDocument.load(buf);
            const pages = await mergedDoc.copyPages(doc, doc.getPageIndices());
            pages.forEach((p) => mergedDoc.addPage(p));
        }
        return Buffer.from(await mergedDoc.save());
    } catch {
        throw new Error(
            "pdf-lib is required to merge pages.\nRun: npm install pdf-lib"
        );
    }
}

(async() => {
    console.log("\n🚀  Website Brochure Generator");
    console.log("─".repeat(50));

    // ── 1. Check pdf-lib is installed ──────────────────────────────────────────
    try {
        require.resolve("pdf-lib");
    } catch {
        console.error("❌  Missing dependency: pdf-lib");
        console.error("    Run:  npm install pdf-lib\n");
        process.exit(1);
    }

    const browser = await chromium.launch({ headless: true });
    const pdfPages = [];

    try {
        // ── 2. Capture page screenshots ─────────────────────────────────────────
        const capturePage = await browser.newPage();
        await capturePage.setViewportSize(CONFIG.viewport);

        const screenshots = [];
        for (const route of CONFIG.routes) {
            const url = CONFIG.baseUrl + route.path;
            console.log(`📸  Capturing: ${route.title}  (${url})`);
            try {
                await capturePage.goto(url, { waitUntil: "networkidle", timeout: 30000 });
                await capturePage.waitForTimeout(CONFIG.waitAfterNav);
                const buf = await capturePage.screenshot({ fullPage: true, type: "png" });
                screenshots.push({ route, base64: buf.toString("base64") });
            } catch (err) {
                console.warn(`  ⚠️  Could not capture ${url}: ${err.message}`);
            }
        }
        await capturePage.close();

        if (screenshots.length === 0) {
            throw new Error(
                "No pages captured. Is your dev server running at " + CONFIG.baseUrl + "?"
            );
        }

        // ── 3. Build cover page PDF ──────────────────────────────────────────────
        console.log("\n📄  Building cover page...");
        const coverHtml = await buildCoverPage(CONFIG.branding);
        pdfPages.push(await htmlToPdfPage(browser, coverHtml, {}));

        // ── 4. Build one PDF page per screenshot ─────────────────────────────────
        for (let i = 0; i < screenshots.length; i++) {
            const { route, base64 } = screenshots[i];
            console.log(`📄  Composing page: ${route.title}`);
            const sectionHtml = await buildSectionPage(
                base64, route, i, screenshots.length, CONFIG.branding
            );
            pdfPages.push(await htmlToPdfPage(browser, sectionHtml, {}));
        }

        // ── 5. Merge all pages ───────────────────────────────────────────────────
        console.log("\n🔗  Merging pages...");
        const merged = await mergePdfBuffers(pdfPages);

        // ── 6. Write output ──────────────────────────────────────────────────────
        const outPath = path.resolve(CONFIG.outputFile);
        fs.writeFileSync(outPath, merged);
        console.log(`\n✅  Brochure saved to: ${outPath}`);
        console.log(`    Pages: ${pdfPages.length}  (1 cover + ${screenshots.length} sections)\n`);

    } finally {
        await browser.close();
    }
})();