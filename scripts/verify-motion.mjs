import { spawn } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const root = process.cwd()
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const viewportWidth = Number(process.env.MOTION_WIDTH || 1440)
const viewportHeight = Number(process.env.MOTION_HEIGHT || 900)
const profile = `${root}\\.chrome-motion-profile-${viewportWidth}x${viewportHeight}`
const outDir = `${root}\\.motion-check\\${viewportWidth}x${viewportHeight}`
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

await mkdir(outDir, { recursive: true })
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4173'], { cwd: root, stdio: 'ignore' })
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9223', `--user-data-dir=${profile}`, `--window-size=${viewportWidth},${viewportHeight}`,
], { stdio: 'ignore' })

let ws
let nextId = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = (expression) => send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }).then((r) => r.result.result.value)
const screenshot = async (name) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await writeFile(`${outDir}\\${name}.png`, Buffer.from(result.result.data, 'base64'))
}

try {
  await wait(1000)
  let target
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch('http://127.0.0.1:9223/json').then((response) => response.json())
      target = targets.find((entry) => entry.type === 'page')
      if (target) break
    } catch {}
    await wait(100)
  }
  if (!target) throw new Error('Chrome DevTools target was not available')

  ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  ws.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (!message.id || !pending.has(message.id)) return
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message)); else resolve(message)
  })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: 'http://127.0.0.1:4173' })
  await wait(800)
  await evaluate("document.querySelector('.pcard.forkast').click()")
  await wait(750)
  await screenshot('transition-separated')
  const drawing = await evaluate("[...document.querySelectorAll('.page-transition path')].map(p=>({width:getComputedStyle(p).strokeWidth,dash:getComputedStyle(p).strokeDashoffset}))")
  await wait(1100)
  await screenshot('transition-covered')
  const covered = await evaluate("[...document.querySelectorAll('.page-transition path')].map(p=>({width:getComputedStyle(p).strokeWidth,dash:getComputedStyle(p).strokeDashoffset}))")
  await wait(1400)
  const processLinkFound = await evaluate("Boolean(document.querySelector('.visual-edit-actions a'))")
  if (!processLinkFound) throw new Error('Forkast process link was not found after the first transition')
  await evaluate("document.querySelector('.visual-edit-actions a').click()")
  await wait(2600)
  const contentsLinkFound = await evaluate("Boolean(document.querySelector('.case-contents a:nth-of-type(2)'))")
  if (!contentsLinkFound) throw new Error('Forkast case contents link was not found on the process page')
  await evaluate("document.querySelector('.case-contents a:nth-of-type(2)').click()")
  const navSamples = []
  for (const delay of [40, 180, 350, 650, 900]) {
    await wait(delay - (navSamples.at(-1)?.time ?? 0))
    navSamples.push({ time: delay, active: await evaluate("document.querySelector('.case-contents [aria-current=location]')?.textContent.trim()") })
  }
  await screenshot('role-settled')
  console.log(JSON.stringify({ drawing, covered, navSamples }, null, 2))
  if (!drawing.length || !covered.length || navSamples.some((sample) => !sample.active)) {
    throw new Error('Motion verification did not observe the transition or active chapter state')
  }
} finally {
  if (ws) ws.close()
  chrome.kill()
  vite.kill()
  await wait(150)
  try {
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch (error) {
    console.warn(`Temporary Chrome profile cleanup deferred: ${error.code || error.message}`)
  }
}
