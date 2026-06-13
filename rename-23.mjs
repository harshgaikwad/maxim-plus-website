import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const targetDir = 'e:\\Sai Industries\\Applications\\SaiIndustries_Website\\public\\products'

const files = fs.readdirSync(targetDir).filter(f => f.startsWith('ChatGPT Image'))

const sortedFiles = files.map(file => {
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
  'fs-07', 'fs-12', 'fs-13', 'fs-15',
  'rs-01', 'rs-02', 'rs-03', 'rs-04', 'rs-05', 'rs-06',
  'cl-01', 'cl-02', 'cl-03', 'cl-04', 'cl-05', 'cl-06', 'cl-07', 'cl-08', 'cl-09', 'cl-10', 'cl-11', 'cl-12', 'cl-13'
]

async function processImages() {
  for (let i = 0; i < sortedFiles.length; i++) {
    const srcFile = path.join(targetDir, sortedFiles[i].file)
    const id = idsToMap[i]
    if (!id) break
    
    const destFile = path.join(targetDir, `prod_${id.replace('-', '_')}.webp`)
    console.log(`Processing ${sortedFiles[i].file} -> prod_${id.replace('-', '_')}.webp`)
    
    await sharp(srcFile)
      .resize(600, 600, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(destFile)
      
    fs.unlinkSync(srcFile)
  }
  console.log('Finished processing and renaming 23 images.')
}

processImages().catch(console.error)
