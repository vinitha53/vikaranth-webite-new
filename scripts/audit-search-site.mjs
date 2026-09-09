import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("dist");
const origin = "https://www.vikranthchemicalcorporation.com";
const files = [], cssFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file); else if (file.endsWith(".html")) files.push(file); else if (file.endsWith(".css")) cssFiles.push(file);
  }
}
walk(root);
const attr = (tag, key) => tag.match(new RegExp(`(?:\\s|^)${key}="([^"]*)"`, "i"))?.[1]?.replaceAll("&amp;", "&") || "";
const issues = []; const media = new Map(); const pages = []; const titles = new Map(); const descriptions = new Map();
const issue = (page, check, detail) => issues.push({ page, check, detail });
const existsCache = new Map();
function localFile(url, page = "/") {
  if (!url || /^(?:#|tel:|mailto:|data:)/.test(url)) return null;
  const parsed = new URL(url, origin + page);
  if (parsed.origin !== origin) return null;
  let file = path.join(root, decodeURIComponent(parsed.pathname));
  if (!path.extname(file)) file = path.join(file, "index.html");
  return file;
}
function exists(file) { if (!existsCache.has(file)) existsCache.set(file, fs.existsSync(file)); return existsCache.get(file); }
for (const file of files) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "404.html" || relative === "404/index.html" || relative.startsWith("_not-found")) continue;
  const route = "/" + relative.replace(/index\.html$/, "");
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] || "";
  const meta = Object.fromEntries((html.match(/<meta\b[^>]*>/g) || []).map(tag => [attr(tag, "name") || attr(tag, "property"), attr(tag, "content")]));
  const canonical = (html.match(/<link\b[^>]*>/g) || []).find(tag => attr(tag, "rel") === "canonical");
  pages.push(route);
  for (const [map, value] of [[titles, title], [descriptions, meta.description]]) { if (!map.has(value)) map.set(value, []); map.get(value).push(route); }
  if (!title) issue(route, "title", "Missing");
  if (!meta.description) issue(route, "description", "Missing");
  if ((html.match(/<h1\b/g) || []).length !== 1) issue(route, "h1", "Expected one primary heading");
  if (attr(canonical || "", "href") !== origin + route) issue(route, "canonical", attr(canonical || "", "href"));
  for (const name of ["og:title", "og:description", "og:image", "twitter:title", "twitter:image"]) if (!meta[name]) issue(route, "social", name);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
  if (!schemas.length) issue(route, "schema", "Missing structured data");
  for (const [, json] of schemas) { try { JSON.parse(json); } catch (error) { issue(route, "schema", error.message); } }
  const tags = html.match(/<(?:img|video|source|script)\b[^>]*>/g) || [];
  const assets = [meta["og:image"], meta["twitter:image"]];
  for (const tag of tags) {
    if (tag.startsWith("<img")) {
      if (!/\balt=/.test(tag)) issue(route, "image-alt", attr(tag, "src"));
      if ((!attr(tag, "width") || !attr(tag, "height")) && attr(tag, "data-nimg") !== "fill") issue(route, "image-dimensions", attr(tag, "src"));
    }
    assets.push(attr(tag, "src"), attr(tag, "poster"));
  }
  for (const url of assets.filter(Boolean)) {
    const asset = localFile(url, route);
    if (!asset) continue;
    if (!exists(asset)) issue(route, "missing-asset", url);
    if (/\.(?:webp|png|jpe?g|svg|mp4|webm)$/i.test(asset)) media.set(asset, (media.get(asset) || 0) + 1);
  }
  for (const tag of html.match(/<a\b[^>]*>/g) || []) {
    const href = attr(tag, "href"); const target = localFile(href, route);
    if (target && !exists(target)) issue(route, "broken-link", href);
  }
  if (pages.length % 100 === 0) console.log(`Checked ${pages.length} pages`);
}
for (const [check, map] of [["duplicate-title", titles], ["duplicate-description", descriptions]]) for (const [value, routes] of map) if (routes.length > 1) issue(routes.join(", "), check, value);
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
for (const route of pages) if (!urls.includes(origin + route)) issue(route, "sitemap", "Page missing");
for (const url of urls) if (!exists(localFile(url))) issue(url, "sitemap", "No exported page");
for (const file of cssFiles) {
  const cssUrl = "/" + path.relative(root, file).replaceAll("\\", "/");
  const css = fs.readFileSync(file, "utf8");
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (decodeURIComponent(match[1]).startsWith("#")) continue;
    const asset = localFile(match[1], cssUrl);
    if (!asset) continue;
    if (!exists(asset)) issue(cssUrl, "missing-css-asset", match[1]);
    if (/\.(?:webp|png|jpe?g|svg)$/i.test(asset)) media.set(asset, (media.get(asset) || 0) + 1);
  }
}
const mediaReport = [];
for (const [file, occurrences] of media) {
  const url = "/" + path.relative(root, file).replaceAll("\\", "/");
  const record = { url, occurrences, bytes: exists(file) ? fs.statSync(file).size : null };
  if (exists(file) && /\.(webp|png|jpe?g)$/i.test(file)) {
    try { const info = await sharp(file).metadata(); Object.assign(record, { width: info.width, height: info.height, decoded: true }); }
    catch (error) { issue(url, "media-decode", error.message); record.decoded = false; }
  }
  mediaReport.push(record);
}
const report = { pages: pages.length, sitemapUrls: urls.length, uniqueMedia: media.size, issues, media: mediaReport };
fs.mkdirSync("reports", { recursive: true });
fs.writeFileSync("reports/search-site-audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ pages: report.pages, sitemapUrls: report.sitemapUrls, uniqueMedia: report.uniqueMedia, issueCounts: issues.reduce((all, item) => ({ ...all, [item.check]: (all[item.check] || 0) + 1 }), {}) }, null, 2));
console.log(JSON.stringify(issues.slice(0, 12), null, 2));
process.exitCode = issues.length ? 1 : 0;
