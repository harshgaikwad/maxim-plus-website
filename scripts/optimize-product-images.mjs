import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const srcDir = 'C:\\Users\\harsh\\.gemini\\antigravity-ide\\brain\\f73aedff-bc2e-4bd3-805d-cd45dcb34a1a'
const destDir = 'e:\\Sai Industries\\Applications\\SaiIndustries_Website\\public\\products'

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
}

const files = fs.readdirSync(srcDir)
const productImages = files.filter(f => f.startsWith('prod_') && f.endsWith('.png'))

console.log(`Found ${productImages.length} images to optimize.`)

async function processImages() {
  for (const file of productImages) {
    // Extract base name without timestamp, e.g., prod_ppe_01_1781335468037.png -> prod_ppe_01
    const match = file.match(/^(prod_[a-z]+_\d+)/)
    if (!match) continue
    
    const baseName = match[1]
    const destFile = path.join(destDir, `${baseName}.webp`)
    const srcFile = path.join(srcDir, file)
    
    console.log(`Optimizing ${file} -> ${baseName}.webp`)
    
    await sharp(srcFile)
      .resize(600, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destFile)
  }
  console.log('All images optimized successfully.')
}

processImages().catch(console.error)
