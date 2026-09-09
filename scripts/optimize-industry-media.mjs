import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.resolve("public/industries");
const changes = [];
for (const name of await fs.readdir(directory)) {
  if (!name.endsWith("-hero.png")) continue;
  const input = path.join(directory, name);
  const output = input.replace(/\.png$/, ".webp");
  const before = (await fs.stat(input)).size;
  await sharp(input).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(output);
  const info = await sharp(output).metadata();
  changes.push({ source: `/industries/${name}`, output: `/industries/${path.basename(output)}`, before, after: (await fs.stat(output)).size, width: info.width, height: info.height });
}
async function updateReferences(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await updateReferences(file);
    else if (/\.(js|css)$/.test(file)) {
      const original = await fs.readFile(file, "utf8");
      let updated = original;
      for (const change of changes) updated = updated.replaceAll(change.source, change.output);
      if (updated !== original) await fs.writeFile(file, updated);
    }
  }
}
await updateReferences("app");
await fs.mkdir("reports", { recursive: true });
await fs.writeFile("reports/media-optimization.json", JSON.stringify(changes, null, 2));
console.log(JSON.stringify({ images: changes.length, beforeBytes: changes.reduce((n, v) => n + v.before, 0), afterBytes: changes.reduce((n, v) => n + v.after, 0) }));
