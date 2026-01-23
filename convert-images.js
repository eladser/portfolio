// Image Conversion Script
// Run: node convert-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

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
