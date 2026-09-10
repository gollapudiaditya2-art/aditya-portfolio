import { browserSession, wait } from './browser-session.mjs'
import { ROUTES } from '../src/routes.js'

const browser = await browserSession()
const { send, baseUrl } = browser
const routes = Object.keys(ROUTES).filter(route => route !== 'not-found')

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

try {
  const results = []
  for (const route of routes) {
    await send('Page.navigate', { url: `${baseUrl}${ROUTES[route]}?a11y=${route}` })
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

  const violations = results.filter(result => result.h1Count !== 1 || result.headingSkips.length || result.unnamedControls.length)
  console.log(JSON.stringify({ routes: results, menu, menuButton: menuButton.value, violations }, null, 2))
  if (violations.length || menu.unnamedControls.length) process.exitCode = 1


} finally { await browser.close() }
