import { browserSession, wait } from './browser-session.mjs'
import { mkdir, writeFile } from 'node:fs/promises'

const outDir = '.motion-check'
await mkdir(outDir, { recursive: true })

const browser = await browserSession()
const { send, evaluate } = browser
const screenshot = async (name) => {
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await writeFile(`${outDir}/${name}.png`, Buffer.from(result.data, 'base64'))
}

try {
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: 'http://127.0.0.1:4183' })
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
  await browser.waitFor("document.querySelector('.forkast-progress-rail button:nth-of-type(2)')")
  await browser.waitFor("!document.querySelector('.page-transition.is-active')")
  const contentsLinkFound = await evaluate("Boolean(document.querySelector('.forkast-progress-rail button:nth-of-type(2)'))")
  if (!contentsLinkFound) throw new Error('Forkast case contents link was not found on the process page')
  await evaluate("document.querySelector('.forkast-progress-rail button:nth-of-type(2)').click()")
  const navSamples = []
  for (const delay of [40, 180, 350, 650, 900]) {
    await wait(delay - (navSamples.at(-1)?.time ?? 0))
    navSamples.push({ time: delay, active: await evaluate("document.querySelector('.forkast-progress-rail [aria-current=true]')?.textContent.trim()") })
  }
  await screenshot('role-settled')
  console.log(JSON.stringify({ drawing, covered, navSamples }, null, 2))
  if (!drawing.length || !covered.length || navSamples.some((sample) => sample.active !== 'Research')) {
    throw new Error('Motion verification did not observe the transition or active chapter state')
  }
} finally {
  await browser.close()
}
