import { createHash } from 'node:crypto'
import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const root = process.cwd()
const update = process.argv.includes('--update')
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const baselineDirectory = join(root, 'tests', 'visual-baselines')
const currentDirectory = join(root, '.visual-current')
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'portfolio-visual-regression-'))
const routes = [
  ['home', ''],
  ['about', 'about'],
  ['industrial-index', 'industrial-design'],
  ['ux-index', 'ux-ui'],
  ['forkast-case-study', 'work/forkast'],
]

const run = (command, args) => new Promise((resolvePromise, rejectPromise) => {
  const child = spawn(command, args, { cwd: root, stdio: 'ignore' })
  child.once('error', rejectPromise)
  child.once('exit', (code) => code === 0 ? resolvePromise() : rejectPromise(new Error(`${command} exited with code ${code}`)))
})
const waitForPreview = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4179/')
      if (response.ok) return
    } catch {}
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 100))
  }
  throw new Error('Vite preview did not become available')
}
const digest = (value) => createHash('sha256').update(value).digest('hex')

await mkdir(baselineDirectory, { recursive: true })
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4179'], { cwd: root, stdio: 'ignore' })

try {
  await waitForPreview()
  const failures = []
  for (const [name, route] of routes) {
    console.log(`${update ? 'Capturing' : 'Checking'} ${name}...`)
    const screenshotPath = join(temporaryDirectory, `${name}.png`)
    const profilePath = join(temporaryDirectory, `${name}-profile`)
    await run(chromePath, [
      '--headless=new', '--disable-gpu', '--disable-crash-reporter', '--disable-breakpad',
      '--no-first-run', '--no-default-browser-check',
      '--force-prefers-reduced-motion', '--hide-scrollbars', '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=2500', '--window-size=1440,900', `--user-data-dir=${profilePath}`,
      `--screenshot=${screenshotPath}`, `http://127.0.0.1:4179/${route}?visual=${name}`,
    ])
    const actual = await readFile(screenshotPath)
    const baselinePath = join(baselineDirectory, `${name}.png`)
    if (update) {
      await writeFile(baselinePath, actual)
      continue
    }
    let expected
    try {
      expected = await readFile(baselinePath)
    } catch {
      failures.push(`${name}: baseline missing (run npm run test:visual:update after reviewing the page)`)
      continue
    }
    if (digest(actual) !== digest(expected)) {
      await mkdir(currentDirectory, { recursive: true })
      await writeFile(join(currentDirectory, `${name}.png`), actual)
      failures.push(`${name}: screenshot changed; current render saved in .visual-current/`)
    }
  }

  if (failures.length) {
    failures.forEach((failure) => console.error(`- ${failure}`))
    process.exitCode = 1
  } else {
    console.log(update ? `Updated ${routes.length} visual baselines.` : `${routes.length} visual regression checks passed.`)
  }
} finally {
  vite.kill()
  try {
    await rm(temporaryDirectory, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch (error) {
    console.warn(`Temporary Chrome profile cleanup deferred: ${error.code || error.message}`)
  }
}
