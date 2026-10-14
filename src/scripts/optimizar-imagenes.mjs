
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const INPUT = './fotos';
const OUTPUT = './fotos-optimizadas';

const WIDTH = 1200;
const QUALITY = 82;

const EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp'
]);

async function optimizeImages() {
  await fs.mkdir(OUTPUT, { recursive: true });

  const files = (await fs.readdir(INPUT))
    .filter((file) =>
      EXTENSIONS.has(
        path.extname(file).toLowerCase()
      )
    )
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    );

  for (const file of files) {
    const filename = `${path.parse(file).name}.webp`;

    const inputPath = path.join(INPUT, file);
    const outputPath = path.join(OUTPUT, filename);

    await sharp(inputPath)
      .rotate()
      .resize({
        width: WIDTH,
        height: WIDTH,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: QUALITY,
        effort: 5,
      })
      .toFile(outputPath);

    const original = await fs.stat(inputPath);
    const optimized = await fs.stat(outputPath);

    const reduction =
      (1 - optimized.size / original.size) * 100;

    console.log(
      `${filename} - ${Math.round(reduction)}% menos`
    );
  }

  console.log('Optimización terminada.');
}

optimizeImages().catch(console.error);
