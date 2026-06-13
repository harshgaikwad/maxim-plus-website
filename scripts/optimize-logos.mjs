import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimize() {
  console.log('Optimizing logos...');
  
  // 1. Maximplus.png (3.6MB) -> 400px width WebP
  if (fs.existsSync('public/Maximplus.png')) {
    await sharp('public/Maximplus.png')
      .resize(400)
      .webp({ quality: 85 })
      .toFile('public/Maximplus.webp');
    console.log('Optimized Maximplus.webp');
    fs.unlinkSync('public/Maximplus.png');
  }
  
  if (fs.existsSync('Maximplus.png')) {
      fs.unlinkSync('Maximplus.png'); // Duplicate in root
  }

  // 2. SaiLogo.png (3.7MB) -> 400px width WebP
  if (fs.existsSync('public/SaiLogo.png')) {
    await sharp('public/SaiLogo.png')
      .resize(400)
      .webp({ quality: 85 })
      .toFile('public/SaiLogo.webp');
    console.log('Optimized SaiLogo.webp');
    fs.unlinkSync('public/SaiLogo.png');
  }
  
  if (fs.existsSync('SaiLogo.png')) {
      fs.unlinkSync('SaiLogo.png'); // Duplicate in root
  }

  // 3. SaiCircular.png (2.1MB) -> 400px width WebP
  if (fs.existsSync('public/SaiCircular.png')) {
    await sharp('public/SaiCircular.png')
      .resize(400)
      .webp({ quality: 85 })
      .toFile('public/SaiCircular.webp');
    console.log('Optimized SaiCircular.webp');
    fs.unlinkSync('public/SaiCircular.png');
  }

  // 4. og-image.png (466KB) -> 1200x630 (standard OG size), slightly lower quality to save space
  if (fs.existsSync('public/og-image.png')) {
    await sharp('public/og-image.png')
      .resize(1200, 630)
      .png({ quality: 80, compressionLevel: 8 }) // PNG is better for OG usually, but optimize it
      .toFile('public/og-image-opt.png');
    fs.renameSync('public/og-image-opt.png', 'public/og-image.png');
    console.log('Optimized og-image.png');
  }
  
  // 5. Delete orphan 4.webp
  if (fs.existsSync('public/products/4.webp')) {
      fs.unlinkSync('public/products/4.webp');
      console.log('Deleted 4.webp');
  }

  console.log('Done!');
}

optimize().catch(console.error);
