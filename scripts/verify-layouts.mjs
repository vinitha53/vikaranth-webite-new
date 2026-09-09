import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

// Isolated headless browser: never connects to a customer's browser profile.
const root = path.resolve("dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".mp4": "video/mp4", ".json": "application/json" };
const server = http.createServer(async (req, res) => {
  try {
    let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, "index.html");
    const data = await fs.readFile(file);
    const range = req.headers.range?.match(/bytes=(\d+)-(\d*)/);
    res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
    if (range) {
      const start = Number(range[1]); const end = range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
      res.writeHead(206, { "Content-Range": `bytes ${start}-${end}/${data.length}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 }); res.end(data.subarray(start, end + 1));
    } else res.end(data);
  } catch { res.writeHead(404).end("Not found"); }
});
await new Promise(resolve => server.listen(3101, "127.0.0.1", resolve));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", headless: true, args: ["--disable-gpu", "--no-first-run"] });
const report = [];
await fs.mkdir("reports/layouts", { recursive: true });
try {
  const page = await browser.newPage();
  const routes = ["/", "/products/", "/products/cake-gel/", "/industries/", "/industries/bakery-ingredients/", "/associates/", "/associates/delta-nutritives/", "/associates/delta-nutritives/mec3/granfrutta-range/", "/about/", "/contact/", "/faq/", "/brochure/", "/privacy/", "/terms/", "/site-map/"];
  for (const width of (process.argv.includes("--interactions-only") ? [] : [1440, 390])) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    for (const route of routes) {
      const errors = [];
      const onError = error => errors.push(error.message);
      page.on("pageerror", onError);
      await page.goto(`http://127.0.0.1:3101${route}`, { waitUntil: "networkidle2", timeout: 60000 });
      // Reveal lazy sections and images while retaining a bounded check duration.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 800) { window.scrollTo({top:y,behavior:"instant"}); await new Promise(resolve => setTimeout(resolve, 35)); }
        window.scrollTo({top:0,behavior:"instant"}); await new Promise(resolve => setTimeout(resolve, 200));
      });
      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelectorAll("h1").length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        brokenImages: [...document.images].filter(img => img.complete && !img.naturalWidth && img.getAttribute("src")).map(img => img.getAttribute("src")),
      }));
      const filename = `${width}-${route.replace(/[^a-z0-9]+/gi, "-") || "home"}.png`;
      await page.screenshot({ path: `reports/layouts/${filename}`, fullPage: true });
      report.push({ route, width, ...metrics, errors, screenshot: filename });
      page.off("pageerror", onError);
      console.log(JSON.stringify({ route, width, ...metrics, errors }));
    }
  }
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:3101/?search=cocoa%20powder%20supplier%20in%20chennai", { waitUntil: "networkidle2" });
  await page.waitForSelector('#product-cocoa-powder');
  const search = await page.evaluate(() => ({ cocoaResult: !!document.querySelector('#product-cocoa-powder') }));
  report.push({ test: "Ingredient search with local purchase intent", ...search });
  await page.goto("http://127.0.0.1:3101/contact/?buyer=Retail%2FSmall%20Quantity#enquiry", { waitUntil: "networkidle2" });
  report.push({ test: "Small-order contact preselection", selected: await page.$eval('#contact-subject', el => el.value) });
  await page.goto("http://127.0.0.1:3101/products/cake-gel/", { waitUntil: "networkidle2" });
  report.push({ test: "Company optional for personal orders", companyRequired: await page.$eval('input[name="company"]', el => el.required), buyerTypes: await page.$$eval('select[name="buyerType"] option', els => els.map(el => el.textContent)) });
  await page.goto("http://127.0.0.1:3101/", { waitUntil: "networkidle2" });
  await page.waitForSelector('.hero-video-control', { timeout: 15000 });
  await page.click('.hero-video-control');
  report.push({ test: "Background video pause", ...await page.$eval('.hero-video', video => ({ paused: video.paused, source: video.getAttribute('src'), width: video.videoWidth, height: video.videoHeight, duration: video.duration })) });
  await page.setViewport({ width: 390, height: 900 });
  await page.goto("http://127.0.0.1:3101/", { waitUntil: "networkidle2" });
  await page.waitForFunction(() => document.querySelector('.hero-video')?.videoWidth > 0, { timeout: 15000 });
  report.push({ test: "Mobile hero and video", ...await page.evaluate(() => {
    const title = document.querySelector('.hero-title').getBoundingClientRect();
    const hero = document.querySelector('.hero').getBoundingClientRect();
    const video = document.querySelector('.hero-video');
    return { headingInsideHero: title.top >= hero.top && title.bottom <= hero.bottom, summaryVisible: getComputedStyle(document.querySelector('.hero-copy>p')).display !== 'none', source: video.getAttribute('src'), width: video.videoWidth, height: video.videoHeight, duration: video.duration };
  }) });
  await page.screenshot({ path: 'reports/layouts/mobile-hero-final.png', fullPage: false });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto("http://127.0.0.1:3101/", { waitUntil: "networkidle2" });
  report.push({ test: "Reduced motion", videoDisabled: await page.evaluate(() => !document.querySelector('.hero-video')) });
} finally {
  await fs.writeFile(process.argv.includes("--interactions-only") ? "reports/interaction-verification.json" : "reports/layout-verification.json", JSON.stringify(report, null, 2));
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
