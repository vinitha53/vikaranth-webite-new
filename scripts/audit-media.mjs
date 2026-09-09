import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
sharp.cache(false);
sharp.concurrency(1);
const images = [], videos = [];
async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(file)) images.push(file);
    else if (/\.(mp4|webm)$/i.test(file)) videos.push(file);
  }
}
await walk("public");
const results = [];
for (let i = 0; i < images.length; i += 1) {
  results.push(...await Promise.all(images.slice(i, i + 1).map(async file => {
    try {
      const info = await sharp(file).metadata();
      await sharp(file).stats();
      return { file: file.replaceAll("\\", "/"), width: info.width, height: info.height, format: info.format, bytes: (await fs.stat(file)).size, decoded: true };
    } catch (error) { return { file, decoded: false, error: error.message }; }
  })));
  if (i % 200 === 0) console.log(`Validated ${Math.min(i + 1, images.length)} of ${images.length} images`);
}
const report = { images: results.length, failures: results.filter(item => !item.decoded), videos: await Promise.all(videos.map(async file => ({ file: file.replaceAll("\\", "/"), bytes: (await fs.stat(file)).size }))), assets: results };
await fs.mkdir("reports", { recursive: true });
await fs.writeFile("reports/media-audit.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({ images: report.images, failures: report.failures, videos: report.videos }, null, 2));
process.exitCode = report.failures.length ? 1 : 0;
