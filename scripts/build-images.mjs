// Builds the web images for every drawing in art-source/.
// Run `npm run images` after adding or replacing a file in art-source/.
//
// For each art-source/<slug>.jpg it writes:
//   public/art/<slug>-1600.webp   the page and close-up image
//   public/art/<slug>-1000.webp   phones and smaller screens
//   public/art/<slug>-640.webp    gallery thumbnails
// and records each drawing's pixel size in src/data/art-sizes.json,
// which the site uses to lay pages out before images load.

import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(root, 'art-source');
const outDir = path.join(root, 'public', 'art');
const widths = [1600, 1000, 640];

// The scan's paper colour, sampled from its outer edge, so the page around
// a drawing matches the paper it was drawn on.
async function paperColour(img) {
  const n = 24;
  const { data } = await img.clone().resize(n, n, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const edge = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (x === 0 || y === 0 || x === n - 1 || y === n - 1) {
      const i = (y * n + x) * 3;
      edge.push([data[i], data[i + 1], data[i + 2]]);
    }
  }
  // Median of the brightest half ignores dark marks that touch the edge.
  edge.sort((a, b) => b[0] + b[1] + b[2] - (a[0] + a[1] + a[2]));
  const [r, g, b] = edge[Math.floor(edge.length / 4)];
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

await mkdir(outDir, { recursive: true });
const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const sizes = {};

for (const file of files) {
  const slug = file.replace(/\.[^.]+$/, '');
  const input = sharp(path.join(srcDir, file)).rotate();
  const { width, height } = await input.metadata();
  sizes[slug] = { width, height, paper: await paperColour(input) };
  for (const w of widths) {
    await input
      .clone()
      .resize({ width: w, height: w, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: w > 1000 ? 78 : 76, effort: 6 })
      .toFile(path.join(outDir, `${slug}-${w}.webp`));
  }
  console.log(`${slug}: ${width}x${height}`);
}

await writeFile(path.join(root, 'src', 'data', 'art-sizes.json'), JSON.stringify(sizes, null, 2) + '\n');
console.log(`Built ${files.length} drawings into public/art/`);
