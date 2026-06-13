import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const artifactDir = 'C:\\Users\\harsh\\.gemini\\antigravity-ide\\brain\\f73aedff-bc2e-4bd3-805d-cd45dcb34a1a';
const outputDir = 'e:\\Sai Industries\\Applications\\SaiIndustries_Website\\public\\products';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(artifactDir).filter(f => f.startsWith('cat_') && f.endsWith('.png'));

for (const file of files) {
  const inputPath = path.join(artifactDir, file);
  // Extract category name without timestamp (e.g. cat_wipes_123.png -> cat_wipes)
  const categoryMatch = file.match(/^(cat_[a-z]+)_[0-9]+\.png$/);
  if (categoryMatch) {
    const categoryName = categoryMatch[1];
    const outputPath = path.join(outputDir, `${categoryName}.webp`);
    
    console.log(`Processing ${file} -> ${categoryName}.webp`);
    
    sharp(inputPath)
      .resize(600, 600, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(info => console.log(`Finished ${categoryName}.webp:`, info))
      .catch(err => console.error(`Error processing ${file}:`, err));
  }
}
