import { browserSession, wait } from './browser-session.mjs'
import { ROUTES } from '../src/routes.js'

const routes = [
  'fork', 'about', 'colophon', 'id-index', 'id-aurio', 'id-arc', 'id-bastion',
  'ux-index', 'ux-forkast-visual', 'ux-forkast-process', 'ux-forkast-testing',
  'ux-cura-visual', 'ux-cura-process', 'ux-cura-testing',
]
const viewports = [[1440, 900], [1024, 900], [390, 844]]

const browser = await browserSession()
const { send, evaluate } = browser

try {
  await send('Page.enable')
  await send('Runtime.enable')
  const findings = []

  for (const [width, height] of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 })
    for (const route of routes) {
      await send('Page.navigate', { url: `http://127.0.0.1:4183${ROUTES[route]}?alignment=${width}-${route}` })
      await wait(220)
      const routeFindings = await evaluate(`(async () => {

        const selectors = [
          '.case-detail-layout', '.case-chapter-visuals', '.id-story-gallery', '.visual-edit-sketch-grid',
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
          // Industrial galleries intentionally preserve different source proportions.
          // Check for distortion and mismatched image/link bounds instead of equal heights.
          if (container.matches('.id-story-gallery')) {
            for (const image of container.querySelectorAll('img')) {
              const rect = image.getBoundingClientRect()
              const link = image.closest('a').getBoundingClientRect()
              const ratio = image.naturalWidth / image.naturalHeight
              if (!image.naturalWidth || Math.abs(rect.width / rect.height - ratio) > ratio * .01
                  || Math.abs(rect.width - link.width) > 1 || Math.abs(rect.height - link.height) > 1) {
                output.push({ container: container.className, source: image.getAttribute('src'), issue: 'Source proportions or link bounds changed' })
              }
            }
            continue
          }
          const items = [...container.children].map((child, index) => {
            const image = child.matches('img') ? child : child.querySelector('img')
            const surface = image || (child.matches('dl') ? child : null)
            if (!surface) return null
            const rect = surface.getBoundingClientRect()
            return { index, top: rect.top + window.scrollY, width: rect.width, height: rect.height, bottom: rect.bottom + window.scrollY }
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
  await browser.close()
}
