import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const targetDir = 'e:\\Sai Industries\\Applications\\SaiIndustries_Website\\public\\products'

const files = fs.readdirSync(targetDir).filter(f => f.startsWith('ChatGPT Image'))

// Extract timestamp and sort
const sortedFiles = files.map(file => {
  // e.g., "ChatGPT Image Jun 13, 2026, 02_25_49 PM.png"
  const match = file.match(/Jun (\d+), (\d+), (\d+)_(\d+)_(\d+) (AM|PM)/)
  if (match) {
    let [ , day, year, hr, min, sec, ampm ] = match
    hr = parseInt(hr)
    if (ampm === 'PM' && hr < 12) hr += 12
    if (ampm === 'AM' && hr === 12) hr = 0
    const timeStr = `${year}-${day.padStart(2, '0')} ${String(hr).padStart(2, '0')}:${min}:${sec}`
    return { file, time: timeStr }
  }
  return { file, time: '' }
}).sort((a, b) => a.time.localeCompare(b.time))

const idsToMap = [
  'cs-02', 'cs-03', 'cs-04', 'cs-05', 'cs-06', 'cs-07', 'cs-08', 'cs-09', 'cs-10',
  'fs-01', 'fs-02', 'fs-03', 'fs-04', 'fs-05', 'fs-06', 'fs-07', 'fs-08'
]

async function processImages() {
  for (let i = 0; i < sortedFiles.length; i++) {
    const srcFile = path.join(targetDir, sortedFiles[i].file)
    const id = idsToMap[i]
    if (!id) break // Just in case
    
    const destFile = path.join(targetDir, `prod_${id.replace('-', '_')}.webp`)
    console.log(`Processing ${sortedFiles[i].file} -> prod_${id.replace('-', '_')}.webp`)
    
    await sharp(srcFile)
      .resize(600, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destFile)
      
    // Delete the original PNG to save space
    fs.unlinkSync(srcFile)
  }
  console.log('Finished processing and renaming 17 images.')
}

processImages().catch(console.error)
