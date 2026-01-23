// Image Conversion Script
// Run: node convert-images.js

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sizes = [
  { width: 160, suffix: '-160' },
  { width: 320, suffix: '-320' },
  { width: 1200, suffix: '-1200' }
];

const inputImage = path.join(__dirname, 'public', 'profile.jpg');

async function convertImages() {
  if (!fs.existsSync(inputImage)) {
    console.error('Error: public/profile.jpg not found');
    process.exit(1);
  }

  console.log('Converting images to WebP format...\n');

  for (const { width, suffix } of sizes) {
    const outputPath = path.join(__dirname, 'public', `profile${suffix}.webp`);

    try {
      await sharp(inputImage)
        .resize(width, width, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`✓ Created profile${suffix}.webp (${(stats.size / 1024).toFixed(2)} KB)`);
    } catch (error) {
      console.error(`✗ Failed to create profile${suffix}.webp:`, error.message);
    }
  }

  console.log('\nDone! WebP images created successfully.');
}

convertImages().catch(console.error);
