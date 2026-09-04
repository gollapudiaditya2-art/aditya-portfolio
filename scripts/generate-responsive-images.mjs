import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const sourceDirectory = path.join(root, 'public', 'assets', 'images', 'web-projects')
const outputDirectory = path.join(sourceDirectory, 'responsive')
const projects = ['sanathan-sethu-macbook', 'seeker-social-macbook', 'vaijayanthy-macbook', 'world-clock-macbook']
const widths = [768, 1280, 1920]

await mkdir(outputDirectory, { recursive: true })

for (const project of projects) {
  const source = path.join(sourceDirectory, `${project}.png`)
  for (const width of widths) {
    const destination = path.join(outputDirectory, `${project}-${width}.webp`)
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(destination)
    console.log(path.relative(root, destination))
  }
}
