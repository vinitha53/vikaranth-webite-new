import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = process.cwd();
const dist = path.join(root, "dist");
const outDir = path.join(root, "reports");
const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === "index.html" || entry.name.endsWith(".html")) htmlFiles.push(file);
  }
};
walk(dist);

const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
const count = (text, regex) => (text.match(regex) || []).length;
const textOnly = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] || "";
const localAssetBytes = (urls) => [...new Set(urls)].reduce((sum, url) => {
  const clean = url.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return sum;
  const file = path.join(dist, clean.replace(/^\//, ""));
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return sum;
  return sum + zlib.gzipSync(fs.readFileSync(file)).length;
}, 0);
const routeFor = (file) => {
  let rel = path.relative(dist, file).replaceAll("\\", "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -11)}/`;
  return `/${rel.replace(/\.html$/, "")}`;
};
const csv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

const rows = htmlFiles.map((file) => {
  const html = fs.readFileSync(file, "utf8");
  const bodyText = textOnly(html);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description = html.match(/<meta[^>]+name=["']description["'][^>]*>/i)?.[0] || "";
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || "";
  const h1Count = count(html, /<h1\b/gi);
  const h2Count = count(html, /<h2\b/gi);
  const links = count(html, /<a\b[^>]*href=/gi);
  const internalLinks = count(html, /<a\b[^>]*href=["']\//gi);
  const externalLinks = count(html, /<a\b[^>]*href=["']https?:\/\//gi);
  const images = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = images.filter((tag) => !/\balt=["']/i.test(tag)).length;
  const missingDimensions = images.filter((tag) => !(/\bwidth=["']/i.test(tag) && /\bheight=["']/i.test(tag))).length;
  const scripts = [...html.matchAll(/<script\b[^>]*src=["']([^"']+)["']/gi)].map((m) => m[1]);
  const styles = [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map((m) => m[1]);
  const preloads = count(html, /<link\b[^>]*rel=["']preload["']/gi);
  const domNodes = count(html, /<[a-z][^!/?][^>]*>/gi);
  const gzipHtml = zlib.gzipSync(Buffer.from(html)).length;
  const gzipJs = localAssetBytes(scripts);
  const gzipCss = localAssetBytes(styles);
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const schemaText = jsonLdBlocks.join(" ");
  const hasFaq = /FAQPage/i.test(schemaText);
  const hasBreadcrumb = /BreadcrumbList/i.test(schemaText);
  const hasEntity = /(Organization|LocalBusiness|Product|WebSite|CollectionPage|AboutPage|ContactPage)/i.test(schemaText);
  const hasPublisher = /(publisher|author)/i.test(schemaText);
  const questionSignals = count(bodyText, /\b(what|why|how|when|where|which|can|does|is|are)\b[^?.]{3,100}\?/gi);
  const listSignals = count(html, /<(ul|ol|table)\b/gi);
  const factSignals = count(bodyText, /\b\d+(?:\.\d+)?\s?(?:%|kg|g|mg|years?|days?|hours?|₹|INR|°C)\b/gi);
  const contactSignals = /(Chennai|India|GSTIN|telephone|phone|email|WhatsApp|address)/i.test(bodyText + schemaText);
  const dateSignals = /(datePublished|dateModified|updated|last reviewed)/i.test(html);

  let performance = 100;
  performance -= Math.min(25, Math.max(0, gzipHtml - 50_000) / 4_000);
  performance -= Math.min(25, Math.max(0, gzipJs - 210_000) / 8_000);
  performance -= Math.min(20, Math.max(0, gzipCss - 70_000) / 4_000);
  performance -= images.length ? Math.min(15, (missingDimensions / images.length) * 30) : 0;
  performance -= Math.min(10, Math.max(0, preloads - 1) * 2);
  performance -= Math.min(10, Math.max(0, domNodes - 1500) / 150);

  let technicalSeo = 0;
  technicalSeo += title.length >= 20 && title.length <= 65 ? 12 : title ? 6 : 0;
  technicalSeo += /content=["'][^"']{70,170}["']/i.test(description) ? 12 : description ? 6 : 0;
  technicalSeo += canonical ? 10 : 0;
  technicalSeo += /<html[^>]+lang=["']en/i.test(html) ? 5 : 0;
  technicalSeo += /name=["']viewport/i.test(html) ? 5 : 0;
  technicalSeo += h1Count === 1 ? 12 : h1Count ? 5 : 0;
  technicalSeo += /property=["']og:title/i.test(html) ? 7 : 0;
  technicalSeo += /name=["']robots/i.test(html) ? 7 : 0;
  technicalSeo += jsonLdBlocks.length ? 12 : 0;
  technicalSeo += hasBreadcrumb ? 6 : 0;
  technicalSeo += internalLinks >= 3 ? 7 : internalLinks ? 3 : 0;
  technicalSeo += missingAlt === 0 ? 5 : Math.max(0, 5 - missingAlt);

  let aeo = 0;
  aeo += hasFaq ? 25 : 0;
  aeo += questionSignals >= 3 ? 15 : questionSignals ? 8 : 0;
  aeo += hasEntity ? 12 : 0;
  aeo += hasBreadcrumb ? 10 : 0;
  aeo += h1Count === 1 ? 10 : 0;
  aeo += h2Count >= 2 ? 8 : h2Count ? 4 : 0;
  aeo += bodyText.length >= 1200 ? 10 : bodyText.length >= 500 ? 6 : 2;
  aeo += contactSignals ? 5 : 0;
  aeo += listSignals ? 5 : 0;

  let geo = 0;
  geo += hasEntity ? 20 : 0;
  geo += hasPublisher ? 10 : 0;
  geo += jsonLdBlocks.length >= 2 ? 10 : jsonLdBlocks.length ? 5 : 0;
  geo += factSignals >= 3 ? 12 : factSignals ? 6 : 0;
  geo += externalLinks >= 2 ? 10 : externalLinks ? 5 : 0;
  geo += bodyText.length >= 1800 ? 12 : bodyText.length >= 800 ? 7 : 3;
  geo += h2Count >= 3 ? 10 : h2Count ? 5 : 0;
  geo += hasFaq ? 10 : questionSignals ? 5 : 0;
  geo += contactSignals ? 6 : 0;
  geo += dateSignals ? 5 : 0;

  const notes = [];
  if (gzipHtml > 50_000) notes.push("HTML budget exceeded");
  if (gzipJs > 210_000) notes.push("JS budget exceeded");
  if (gzipCss > 70_000) notes.push("CSS budget exceeded");
  if (h1Count !== 1) notes.push(`${h1Count} H1 elements`);
  if (!hasFaq) notes.push("No FAQ schema");
  if (!hasPublisher) notes.push("No author/publisher signal");
  if (!dateSignals) notes.push("No freshness signal");

  return { route: routeFor(file), performance: clamp(performance), technicalSeo: clamp(technicalSeo), aeo: clamp(aeo), geo: clamp(geo), htmlGzipKb: +(gzipHtml / 1024).toFixed(1), jsGzipKb: +(gzipJs / 1024).toFixed(1), cssGzipKb: +(gzipCss / 1024).toFixed(1), domNodes, requests: 1 + scripts.length + styles.length + images.length, title, notes: notes.join("; ") };
}).sort((a, b) => a.route.localeCompare(b.route));

const metrics = ["performance", "technicalSeo", "aeo", "geo"];
const summary = Object.fromEntries(metrics.map((key) => [key, {
  average: +(rows.reduce((s, r) => s + r[key], 0) / rows.length).toFixed(1),
  minimum: Math.min(...rows.map((r) => r[key])),
  maximum: Math.max(...rows.map((r) => r[key])),
  below80: rows.filter((r) => r[key] < 80).length,
}]));
const headers = ["route", "performance_proxy", "technical_seo", "aeo", "geo", "html_gzip_kb", "js_gzip_kb", "css_gzip_kb", "dom_nodes", "estimated_requests", "title", "notes"];
const csvRows = rows.map((r) => [r.route, r.performance, r.technicalSeo, r.aeo, r.geo, r.htmlGzipKb, r.jsGzipKb, r.cssGzipKb, r.domNodes, r.requests, r.title, r.notes].map(csv).join(","));
fs.writeFileSync(path.join(outDir, "all-pages-scorecard.csv"), [headers.join(","), ...csvRows].join("\n"));
fs.writeFileSync(path.join(outDir, "all-pages-scorecard.json"), JSON.stringify({ generatedAt: new Date().toISOString(), methodology: "Static production-export audit. Performance is a budget-based proxy, not a Lighthouse score. AEO/GEO use the documented schema/content rubric in scripts/audit-all-pages.mjs.", pageCount: rows.length, summary, pages: rows }, null, 2));
const lowest = (key) => [...rows].sort((a, b) => a[key] - b[key]).slice(0, 15).map((r) => `| ${r.route} | ${r[key]} | ${r.notes || "—"} |`).join("\n");
const md = `# Vikranth complete website scorecard\n\nGenerated: ${new Date().toISOString()}\n\nPages audited: **${rows.length}**\n\n> Performance is a static, budget-based proxy for every page. It is not presented as Lighthouse. Technical SEO, AEO and GEO are repeatable rubric scores defined in the audit script.\n\n| Area | Average | Minimum | Maximum | Pages below 80 |\n|---|---:|---:|---:|---:|\n${metrics.map((k) => `| ${k} | ${summary[k].average} | ${summary[k].minimum} | ${summary[k].maximum} | ${summary[k].below80} |`).join("\n")}\n\n## Lowest performance proxy pages\n\n| Route | Score | Main flags |\n|---|---:|---|\n${lowest("performance")}\n\n## Lowest technical SEO pages\n\n| Route | Score | Main flags |\n|---|---:|---|\n${lowest("technicalSeo")}\n\n## Lowest AEO pages\n\n| Route | Score | Main flags |\n|---|---:|---|\n${lowest("aeo")}\n\n## Lowest GEO pages\n\n| Route | Score | Main flags |\n|---|---:|---|\n${lowest("geo")}\n`;
fs.writeFileSync(path.join(outDir, "all-pages-scorecard.md"), md);
console.log(JSON.stringify({ pageCount: rows.length, summary }, null, 2));