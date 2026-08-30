import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const excluded = new Set(["node_modules", ".git", "dist", "tmp"]);
const rasterExtensions = new Set([".png", ".jpg", ".jpeg"]);
const textExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".css", ".json", ".html", ".md", ".txt", ".xml", ".mjs"]);
const isLosslessAsset = (relativePath) => /(?:^|\/)(?:brand-logos|partners|floating-icons)(?:\/|$)|(?:logo|icon|favicon|whatsapp|chatbot)/i.test(relativePath);

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (excluded.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const publicFiles = await walk(publicDir);
const sourceRasters = publicFiles.filter((file) => rasterExtensions.has(path.extname(file).toLowerCase()));
const mappings = [];
let sourceBytes = 0;
let convertedBytes = 0;

async function convertSource(source) {
  const relative = path.relative(publicDir, source).replaceAll("\\", "/");
  const destination = source.replace(/\.(?:png|jpe?g)$/i, ".webp");
  const publicSource = `/${relative}`;
  const publicDestination = `/${path.relative(publicDir, destination).replaceAll("\\", "/")}`;
  const sourceStat = await fs.stat(source);

  let destinationExists = true;
  try { await fs.access(destination); } catch { destinationExists = false; }
  if (!destinationExists) {
    const metadata = await sharp(source).metadata();
    const lossless = isLosslessAsset(relative);
    await sharp(source, { failOn: "none" })
      .rotate()
      .webp(lossless
        ? { lossless: true, effort: 4 }
        : { quality: 90, alphaQuality: metadata.hasAlpha ? 100 : undefined, smartSubsample: true, effort: 4 })
      .toFile(destination);
  }
  return { mapping: [publicSource, publicDestination, source], sourceBytes: sourceStat.size, convertedBytes: (await fs.stat(destination)).size };
}

for (let index = 0; index < sourceRasters.length; index += 6) {
  const results = await Promise.all(sourceRasters.slice(index, index + 6).map(convertSource));
  for (const result of results) {
    mappings.push(result.mapping);
    sourceBytes += result.sourceBytes;
    convertedBytes += result.convertedBytes;
  }
}

const textRoots = [path.join(root, "app"), path.join(root, "public"), path.join(root, "next.config.mjs")];
const textFiles = [];
for (const candidate of textRoots) {
  const stat = await fs.stat(candidate);
  if (stat.isDirectory()) textFiles.push(...(await walk(candidate)).filter((file) => textExtensions.has(path.extname(file).toLowerCase())));
  else textFiles.push(candidate);
}

let changedReferences = 0;
for (const file of textFiles) {
  let contents = await fs.readFile(file, "utf8");
  const original = contents;
  for (const [from, to] of mappings) contents = contents.split(from).join(to);
  if (contents !== original) {
    await fs.writeFile(file, contents, "utf8");
    changedReferences += 1;
  }
}

for (const [, , source] of mappings) await fs.unlink(source);

const refreshedPublicFiles = await walk(publicDir);
const webps = refreshedPublicFiles.filter((file) => path.extname(file).toLowerCase() === ".webp");
let optimizedExisting = 0;
async function optimizeWebp(source) {
  const relative = path.relative(publicDir, source).replaceAll("\\", "/");
  const before = await fs.stat(source);
  if (before.size < 256 * 1024) return false;
  const metadata = await sharp(source).metadata();
  const temporary = `${source}.opt-${process.pid}.webp`;
  const lossless = isLosslessAsset(relative);
  await sharp(source, { failOn: "none" })
    .webp(lossless
      ? { lossless: true, effort: 4 }
      : { quality: 90, alphaQuality: metadata.hasAlpha ? 100 : undefined, smartSubsample: true, effort: 4 })
    .toFile(temporary);
  const after = await fs.stat(temporary);
  if (after.size < before.size) {
    await fs.copyFile(temporary, source);
    await fs.unlink(temporary);
    return true;
  } else {
    await fs.unlink(temporary);
    return false;
  }
}

for (let index = 0; index < webps.length; index += 6) {
  const results = await Promise.all(webps.slice(index, index + 6).map(optimizeWebp));
  for (const optimized of results) {
    if (optimized) optimizedExisting += 1;
  }
}

console.log(JSON.stringify({
  convertedFiles: mappings.length,
  referenceFilesUpdated: changedReferences,
  optimizedExistingWebps: optimizedExisting,
  sourceMB: +(sourceBytes / 1048576).toFixed(1),
  initialWebpMB: +(convertedBytes / 1048576).toFixed(1),
}, null, 2));
