/**
 * Image Optimization Script
 * Optimizes images in public/images directory
 * - Converts to WebP format
 * - Reduces file size by ~70%
 * - Maintains quality at 75%
 */

const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  sourceDir: 'public/images',
  outputDir: 'public/images/optimized',
  quality: 75,
  formats: ['.jpg', '.jpeg', '.png', '.webp'],
};

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
  const files = [];

  async function scan(directory) {
    const items = await fs.readdir(directory, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        await scan(fullPath);
      } else {
        const ext = path.extname(item.name).toLowerCase();
        if (CONFIG.formats.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await scan(dir);
  return files;
}

/**
 * Optimize images with imagemin
 */
async function optimizeWithImagemin() {
  console.log('🎨 Starting imagemin optimization...\n');

  const patterns = CONFIG.formats.map(ext => `${CONFIG.sourceDir}/**/*${ext}`);

  const files = await imagemin(patterns, {
    destination: CONFIG.outputDir,
    plugins: [
      imageminWebp({
        quality: CONFIG.quality,
        method: 6, // Compression method (0-6, 6 is slowest but best)
      }),
      imageminMozjpeg({
        quality: CONFIG.quality + 5, // Slightly higher for JPEG
      }),
    ],
  });

  console.log(`✅ Optimized ${files.length} images with imagemin`);
  return files;
}

/**
 * Get file size in KB
 */
async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Compare sizes
 */
async function compareSizes(originalFiles) {
  console.log('\n📊 Size Comparison:\n');

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of originalFiles.slice(0, 5)) { // Show first 5 as sample
    try {
      const originalSize = await getFileSize(file);
      totalOriginal += parseFloat(originalSize);

      const relativePath = path.relative(CONFIG.sourceDir, file);
      const optimizedPath = path.join(CONFIG.outputDir, relativePath);

      // Check if optimized file exists
      try {
        await fs.access(optimizedPath);
        const optimizedSize = await getFileSize(optimizedPath);
        totalOptimized += parseFloat(optimizedSize);

        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

        console.log(`📄 ${path.basename(file)}`);
        console.log(`   Before: ${originalSize} KB`);
        console.log(`   After:  ${optimizedSize} KB (-${savings}%)\n`);
      } catch {
        // Optimized file doesn't exist yet
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  if (totalOptimized > 0) {
    const totalSavings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    console.log(`\n💾 Total savings (sample): -${totalSavings}%`);
  }
}

/**
 * Main optimization function
 */
async function main() {
  console.log('🚀 Image Optimization Started\n');
  console.log('Configuration:');
  console.log(`  Source: ${CONFIG.sourceDir}`);
  console.log(`  Output: ${CONFIG.outputDir}`);
  console.log(`  Quality: ${CONFIG.quality}%\n`);

  try {
    // Create output directory
    await fs.mkdir(CONFIG.outputDir, { recursive: true });

    // Get all images
    console.log('🔍 Scanning for images...');
    const images = await getImageFiles(CONFIG.sourceDir);
    console.log(`✅ Found ${images.length} images\n`);

    // Optimize with imagemin
    await optimizeWithImagemin();

    // Compare sizes
    await compareSizes(images);

    console.log('\n✨ Optimization complete!\n');
    console.log('📝 Next steps:');
    console.log('  1. Review optimized images in public/images/optimized/');
    console.log('  2. Update image paths in code to use optimized versions');
    console.log('  3. Delete original images if satisfied with quality\n');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run optimization
main();
