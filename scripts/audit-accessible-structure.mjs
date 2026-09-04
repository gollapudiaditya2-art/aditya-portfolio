const chromeUrl = process.env.A11Y_CHROME_URL || 'http://127.0.0.1:9224'
const siteUrl = process.env.A11Y_SITE_URL || 'http://127.0.0.1:4173/'
const routes = [
  '', 'about', 'id-index', 'id-aurio', 'id-arc', 'id-bastion', 'ux-index',
  'ux-forkast-visual', 'ux-forkast-process', 'ux-forkast-testing',
  'ux-cura-visual', 'ux-cura-process', 'ux-cura-testing',
]

const target = await (await fetch(`${chromeUrl}/json/new?about:blank`, { method: 'PUT' })).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve, reject) => {
  socket.onopen = resolve
  socket.onerror = reject
})

let messageId = 0
const pending = new Map()
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data)
  if (!message.id || !pending.has(message.id)) return
  const [resolve, reject] = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) reject(message.error)
  else resolve(message.result)
}

const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++messageId
  pending.set(id, [resolve, reject])
  socket.send(JSON.stringify({ id, method, params }))
})
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function inspect(label) {
  const { nodes } = await send('Accessibility.getFullAXTree')
  const exposed = nodes.filter((node) => !node.ignored)
  const { result: domResult } = await send('Runtime.evaluate', {
    expression: `(() => {
      const isExposed = (element) => {
        if (element.closest('[inert], [aria-hidden="true"]')) return false
        const style = getComputedStyle(element)
        return style.display !== 'none' && style.visibility !== 'hidden'
      }
      return {
        headings: [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')]
          .filter(isExposed)
          .map((heading) => ({ level: Number(heading.tagName.slice(1)), name: heading.textContent.trim() })),
        mainCount: [...document.querySelectorAll('main')].filter(isExposed).length,
      }
    })()`,
    returnByValue: true,
  })
  const { headings, mainCount } = domResult.value
  const skips = headings.flatMap((heading, index) => (
    index && heading.level > headings[index - 1].level + 1
      ? [{ from: headings[index - 1], to: heading }]
      : []
  ))
  const namedRoles = new Set([
    'button', 'link', 'textbox', 'searchbox', 'combobox', 'checkbox', 'radio',
    'slider', 'spinbutton',
  ])
  const unnamed = exposed
    .filter((node) => namedRoles.has(node.role?.value) && !(node.name?.value || '').trim())
    .map((node) => node.role.value)

  return {
    label,
    headingCount: headings.length,
    h1Count: headings.filter(({ level }) => level === 1).length,
    headingSkips: skips,
    unnamedControls: unnamed,
    mainCount,
  }
}

const results = []
for (const route of routes) {
  await send('Page.navigate', { url: `${siteUrl}?a11y=${encodeURIComponent(route || 'home')}${route ? `#${route}` : ''}` })
  await wait(500)
  results.push(await inspect(route || 'home'))
}

await send('Runtime.evaluate', { expression: 'document.querySelector("#menubtn").click()' })
await wait(150)
const menu = await inspect('menu-open')
const { result: menuButton } = await send('Runtime.evaluate', {
  expression: `({
    name: document.querySelector('#menubtn').getAttribute('aria-label'),
    expanded: document.querySelector('#menubtn').getAttribute('aria-expanded'),
    current: [...document.querySelectorAll('#menu [aria-current="page"]')].map((element) => element.innerText.trim()),
  })`,
  returnByValue: true,
})

console.log(JSON.stringify({ routes: results, menu, menuButton: menuButton.value }, null, 2))
socket.close()
