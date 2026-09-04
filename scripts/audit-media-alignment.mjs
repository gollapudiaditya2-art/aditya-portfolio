import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROUTES } from '../src/routes.js'

const root = process.cwd()
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const profile = await mkdtemp(join(tmpdir(), 'portfolio-media-alignment-'))
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4176'], { cwd: root, stdio: 'ignore' })
const chrome = spawn(chromePath, [
  '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--use-angle=swiftshader',
  '--enable-unsafe-swiftshader', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9226', `--user-data-dir=${profile}`, '--window-size=1440,900',
], { stdio: 'ignore' })

const routes = [
  'fork', 'about', 'colophon', 'id-index', 'id-aurio', 'id-arc', 'id-bastion',
  'ux-index', 'ux-forkast-visual', 'ux-forkast-process', 'ux-forkast-testing',
  'ux-cura-visual', 'ux-cura-process', 'ux-cura-testing',
]
const viewports = [[1440, 900], [1024, 900], [390, 844]]
let ws
let nextId = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = async (expression) => {
  const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (response.result.exceptionDetails) throw new Error(response.result.exceptionDetails.text)
  return response.result.result.value
}

try {
  await wait(1800)
  let target
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch('http://127.0.0.1:9226/json').then((response) => response.json())
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
  const findings = []

  for (const [width, height] of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 })
    for (const route of routes) {
      await send('Page.navigate', { url: `http://127.0.0.1:4176${ROUTES[route]}?alignment=${width}-${route}` })
      await wait(220)
      const routeFindings = await evaluate(`(async () => {
        const shell = document.querySelector('#shell')
        const selectors = [
          '.case-detail-layout', '.case-chapter-visuals', '.visual-edit-sketch-grid',
          '.visual-edit-wear-grid', '.visual-edit-making-grid', '.visual-edit-resolution-grid',
          '.visual-edit-service-grid', '.personal-gallery'
        ]
        const rounded = (value) => Math.round(value * 10) / 10
        const output = []
        const containers = [...document.querySelectorAll(selectors.join(','))]
        for (const [containerIndex, container] of containers.entries()) {
          container.scrollIntoView({ block: 'center' })
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
          await Promise.all([...container.querySelectorAll('img')].map((image) => Promise.race([
            image.decode?.().catch(() => {}),
            new Promise((resolve) => setTimeout(resolve, 600)),
          ])))
          const items = [...container.children].map((child, index) => {
            const image = child.matches('img') ? child : child.querySelector('img')
            const surface = image || (child.matches('dl') ? child : null)
            if (!surface) return null
            const rect = surface.getBoundingClientRect()
            return { index, top: rect.top + shell.scrollTop, width: rect.width, height: rect.height, bottom: rect.bottom + shell.scrollTop }
          }).filter((item) => item && item.width > 1 && item.height > 1)
          const rows = []
          items.forEach((item) => {
            const row = rows.find((candidate) => Math.abs(candidate[0].top - item.top) <= 4)
            if (row) row.push(item); else rows.push([item])
          })
          rows.filter((row) => row.length > 1).forEach((row) => {
            const widths = row.map((item) => item.width)
            const heights = row.map((item) => item.height)
            const widthSpread = Math.max(...widths) - Math.min(...widths)
            const heightSpread = Math.max(...heights) - Math.min(...heights)
            const equalWidth = widthSpread <= Math.max(...widths) * .12
            const isDetail = container.matches('.case-detail-layout')
            if ((equalWidth || isDetail) && heightSpread > 8) {
              output.push({
                container: [...container.classList].join('.'), containerIndex,
                items: row.map((item) => ({ index: item.index, width: rounded(item.width), height: rounded(item.height) })),
                heightSpread: rounded(heightSpread), equalWidth,
              })
            }
          })
        }
        return output
      })()`)
      findings.push(...routeFindings.map((finding) => ({ route, viewport: `${width}x${height}`, ...finding })))
    }
  }

  console.log(JSON.stringify({ checkedRoutes: routes.length, checkedViewports: viewports.length, findings }, null, 2))
  if (findings.length) process.exitCode = 1
} finally {
  if (ws) ws.close()
  chrome.kill()
  vite.kill()
  await wait(150)
  await rm(profile, { recursive: true, force: true })
}
