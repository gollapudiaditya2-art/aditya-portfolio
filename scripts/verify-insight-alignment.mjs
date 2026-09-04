import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { ROUTES } from '../src/routes.js'

const root = process.cwd()
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const profile = await mkdtemp(join(tmpdir(), 'portfolio-insight-alignment-'))
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4178'], { cwd: root, stdio: 'ignore' })
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9228', `--user-data-dir=${profile}`, '--window-size=1440,900',
], { stdio: 'ignore' })

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
  await wait(800)
  let target
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch('http://127.0.0.1:9228/json').then((response) => response.json())
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

  const checks = []
  for (const [route, selector] of [['ux-forkast-process', '.fork-main-insight'], ['ux-cura-process', '.cura-main-insight']]) {
    await send('Page.navigate', { url: `http://127.0.0.1:4178${ROUTES[route]}?audit=${route}` })
    await wait(3000)
    checks.push(await evaluate(`(() => {
      const figure = document.querySelector('${selector}')
      const caption = figure?.querySelector('figcaption')
      const heading = caption?.querySelector('h3')
      const quote = caption?.querySelector('blockquote')
      if (!figure || !caption || !heading || !quote) return {
        route: '${route}',
        missing: true,
        hash: location.hash,
        title: document.title,
        readyState: document.readyState,
        rootHtml: document.querySelector('#root')?.innerHTML.slice(0, 240),
        resources: performance.getEntriesByType('resource').map((entry) => entry.name),
        screenClasses: [...document.querySelectorAll('.screen')].map((node) => node.className),
        bodyText: document.body.innerText.slice(0, 180),
      }
      const box = (node) => {
        const rect = node.getBoundingClientRect()
        return { left: Math.round(rect.left), width: Math.round(rect.width), center: Math.round(rect.left + rect.width / 2) }
      }
      const captionBox = box(caption)
      const headingBox = box(heading)
      const quoteBox = box(quote)
      return {
        route: '${route}',
        caption: captionBox,
        heading: headingBox,
        quote: quoteBox,
        headingOffset: headingBox.center - captionBox.center,
        quoteOffset: quoteBox.center - captionBox.center,
        headingMaxWidth: getComputedStyle(heading).maxWidth,
        headingTextAlign: getComputedStyle(heading).textAlign,
      }
    })()`))
  }

  const violations = checks.filter((check) => check.missing || Math.abs(check.headingOffset) > 2 || Math.abs(check.quoteOffset) > 2)
  const alignmentSweeps = []
  const routes = ['fork', 'about', 'colophon', 'id-index', 'id-aurio', 'id-arc', 'id-bastion', 'ux-index', 'ux-forkast-visual', 'ux-forkast-process', 'ux-forkast-testing', 'ux-cura-visual', 'ux-cura-process', 'ux-cura-testing']
  for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'tablet', width: 768, height: 1024 }, { name: 'mobile', width: 390, height: 844 }]) {
    await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.name === 'mobile' })
    for (const route of routes) {
      await send('Page.navigate', { url: `http://127.0.0.1:4178${ROUTES[route]}?sweep=${viewport.name}-${route}` })
      await wait(500)
      alignmentSweeps.push(await evaluate(`(() => {
        const visible = (node) => {
          const rect = node.getBoundingClientRect()
          const style = getComputedStyle(node)
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden'
        }
        const root = document.querySelector('.screen.active') || document
        const describe = (node) => node.tagName.toLowerCase() + (node.className ? '.' + String(node.className).trim().replace(/\\s+/g, '.') : '')
        const centeredOutliers = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6,blockquote,p')]
          .filter(visible)
          .filter((node) => getComputedStyle(node).textAlign === 'center')
          .map((node) => {
            const rect = node.getBoundingClientRect()
            const parent = node.parentElement.getBoundingClientRect()
            return {
              node: node.tagName.toLowerCase() + (node.className ? '.' + String(node.className).trim().replace(/\\s+/g, '.') : ''),
              text: node.textContent.trim().slice(0, 70),
              offset: Math.round((rect.left + rect.width / 2) - (parent.left + parent.width / 2)),
              width: Math.round(rect.width),
              parentWidth: Math.round(parent.width),
            }
          })
          .filter((item) => Math.abs(item.offset) > 4 && item.width < item.parentWidth * .98)
        const viewportOverflows = [...root.querySelectorAll('*')]
          .filter(visible)
          .filter((node) => {
            const rect = node.getBoundingClientRect()
            if (rect.left >= -2 && rect.right <= innerWidth + 2) return false
            let ancestor = node.parentElement
            while (ancestor) {
              const overflow = getComputedStyle(ancestor).overflowX
              if (overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden' || overflow === 'clip') return false
              ancestor = ancestor.parentElement
            }
            return true
          })
          .slice(0, 12)
          .map((node) => ({ node: describe(node), text: node.textContent.trim().slice(0, 50) }))
        const smallTargets = [...document.querySelectorAll('button,[role="button"],input,select,textarea')]
          .filter(visible)
          .map((node) => {
            const target = node.matches('input[type="checkbox"],input[type="radio"]') ? node.closest('label') || node : node
            return { node: describe(node), text: node.textContent.trim().slice(0, 45), width: Math.round(target.offsetWidth), height: Math.round(target.offsetHeight) }
          })
          .filter((item) => item.width < 44 || item.height < 44)
        const unlabeledIconButtons = [...document.querySelectorAll('button')]
          .filter(visible)
          .filter((node) => !node.textContent.trim() && !node.getAttribute('aria-label') && !node.getAttribute('aria-labelledby'))
          .map((node) => describe(node))
        const images = [...root.querySelectorAll('img')]
        const imagesWithoutDimensions = images
          .filter((node) => !node.hasAttribute('width') || !node.hasAttribute('height'))
          .slice(0, 20)
          .map((node) => ({ node: describe(node), src: node.getAttribute('src') }))
        const textOverflows = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,dd,figcaption,span,strong')]
          .filter(visible)
          .filter((node) => getComputedStyle(node).textOverflow !== 'ellipsis' && !node.querySelector('.ui-icon'))
          .filter((node) => node.scrollWidth > node.clientWidth + 2)
          .slice(0, 20)
          .map((node) => ({ node: describe(node), text: node.textContent.trim().slice(0, 60), overflow: node.scrollWidth - node.clientWidth }))
        const headingRanks = [...root.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((node) => ({ node: describe(node), rank: Number(node.tagName[1]), text: node.textContent.trim().slice(0, 60) }))
        const headingJumps = headingRanks.filter((item, index) => index && item.rank > headingRanks[index - 1].rank + 1).map((item, index) => ({ previous: headingRanks[headingRanks.indexOf(item) - 1], current: item }))
        const unsupportedIcons = [...root.querySelectorAll('.ui-icon')]
          .filter(visible)
          .map((node) => { const style = getComputedStyle(node); return { node: describe(node), width: Math.round(parseFloat(style.width)), height: Math.round(parseFloat(style.height)) } })
          .filter((item) => ![16,20,24].includes(item.width) || ![16,20,24].includes(item.height))
        const conceptModel = root.querySelector('.cura-concept-model')
        const conceptModelHeight = conceptModel ? Math.round(conceptModel.getBoundingClientRect().height) : null
        const problemStatement = root.querySelector('.cura-problem-statement')
        const problemStatementRadius = problemStatement ? getComputedStyle(problemStatement).borderRadius : null
        const roundedFullBleed = [...root.querySelectorAll('*')]
          .filter(visible)
          .filter((node) => {
            const rect = node.getBoundingClientRect()
            const radius = getComputedStyle(node).borderRadius
            return rect.left <= 1 && rect.right >= innerWidth - 1 && radius !== '0px'
          })
          .map((node) => ({
            node: describe(node),
            parent: node.parentElement ? describe(node.parentElement) : null,
            src: node.getAttribute('src'),
            radius: getComputedStyle(node).borderRadius,
          }))
        return {
          route: '${route}', viewport: '${viewport.name}', centeredOutliers, viewportOverflows,
          smallTargets: smallTargets.slice(0, 20), smallTargetCount: smallTargets.length,
          unlabeledIconButtons, imagesWithoutDimensions, imageCount: images.length,
          imagesWithoutDimensionsCount: images.filter((node) => !node.hasAttribute('width') || !node.hasAttribute('height')).length,
          textOverflows, headingJumps, unsupportedIcons, conceptModelHeight,
          conceptModelFitsViewport: conceptModelHeight === null ? null : conceptModelHeight <= innerHeight,
          problemStatementRadius,
          roundedFullBleed,
        }
      })()`))
    }
  }
  const sweepViolations = alignmentSweeps.filter((check) => check.centeredOutliers.length || check.viewportOverflows.length || check.smallTargetCount || check.unlabeledIconButtons.length || check.imagesWithoutDimensionsCount || check.textOverflows.length || check.headingJumps.length || check.unsupportedIcons.length || check.roundedFullBleed.length)
  const sweepSummary = sweepViolations.map((check) => ({
    route: check.route,
    viewport: check.viewport,
    centeredOutliers: check.centeredOutliers,
    viewportOverflows: check.viewportOverflows,
    smallTargetCount: check.smallTargetCount,
    smallTargets: check.smallTargets.slice(0, 8),
    unlabeledIconButtons: check.unlabeledIconButtons,
    imageCount: check.imageCount,
    imagesWithoutDimensionsCount: check.imagesWithoutDimensionsCount,
    textOverflows: check.textOverflows.slice(0, 8),
    headingJumps: check.headingJumps,
    unsupportedIcons: check.unsupportedIcons,
    roundedFullBleed: check.roundedFullBleed,
  }))
  const curaConceptChecks = alignmentSweeps
    .filter((check) => check.route === 'ux-cura')
    .map(({ viewport, conceptModelHeight, conceptModelFitsViewport, problemStatementRadius }) => ({
      viewport, conceptModelHeight, conceptModelFitsViewport, problemStatementRadius,
    }))
  console.log(JSON.stringify({ checks, violations, curaConceptChecks, sweepSummary }, null, 2))
  if (violations.length || sweepViolations.length) process.exitCode = 1
} finally {
  if (ws) ws.close()
  chrome.kill()
  vite.kill()
  await wait(150)
  await rm(profile, { recursive: true, force: true })
}
