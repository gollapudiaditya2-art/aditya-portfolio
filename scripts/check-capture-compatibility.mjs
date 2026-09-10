import { mkdir, writeFile, readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { browserSession, wait } from './browser-session.mjs'

const baseline = process.argv.includes('--baseline')
const directory = `.tmp/capture-${baseline ? 'before' : 'after'}`
await mkdir(directory, { recursive: true })
const browser = await browserSession()
try {
  const results = []
  for (const width of [1440, 390]) {
    await browser.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false })
    for (const route of ['/', '/about', '/work/aurio', '/work/forkast']) {
      await browser.send('Page.navigate', { url: browser.baseUrl + route })
      await wait(650)
      await browser.evaluate(`(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode().catch(()=>{})))})()`)
      const name = `${width}-${route.replaceAll('/', '_')}`
      const snapshots = []
      for (const top of [0, 1200, 2400]) {
        await browser.evaluate(`(() => { const s = document.querySelector('#shell'); const target = getComputedStyle(s).position === 'fixed' ? s : window; target.scrollTo({top:${top},behavior:'instant'}); })()`)
        await wait(300)
        const geometry = await browser.evaluate(`(() => ({
          documentHeight: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          headings: [...document.querySelectorAll('.screen h1,.screen h2')].map(el => {const r=el.getBoundingClientRect(); return [el.textContent,r.x,r.y,r.width,r.height]}),
          cards: [...document.querySelectorAll('.scard')].map(el=>el.style.transform),
          path: document.querySelector('.home-path-main')?.style.strokeDashoffset,
        }))()`)
        snapshots.push(geometry)
        if (!baseline) assert.equal(geometry.overflow, false, `${name} horizontal overflow`)
        const screenshot = await browser.send('Page.captureScreenshot')
        await writeFile(`${directory}/${name}-${top}.png`, Buffer.from(screenshot.data, 'base64'))
      }
      await browser.evaluate(`document.querySelector('#menubtn').click()`)
      await wait(750)
      const menu = await browser.send('Page.captureScreenshot')
      await writeFile(`${directory}/${name}-menu.png`, Buffer.from(menu.data, 'base64'))
      await browser.evaluate(`document.querySelector('#menubtn').click()`)
      await wait(750)
      if (!baseline) {
        const scroll = await browser.evaluate('window.scrollY')
        assert.equal(scroll, 2400, `${name} menu restores scroll`)
        assert.ok(snapshots[0].documentHeight > 900, `${name} native document height`)
        const before = JSON.parse(await readFile(`.tmp/capture-before/${name}.json`, 'utf8'))
        for (let i=0;i<snapshots.length;i++) {
          assert.deepEqual(snapshots[i].headings, before[i].headings, `${name} headings at ${i}`)
          assert.deepEqual(snapshots[i].cards, before[i].cards, `${name} card motion at ${i}`)
          assert.equal(snapshots[i].path, before[i].path, `${name} drawn path at ${i}`)
        }
      }
      await writeFile(`${directory}/${name}.json`, JSON.stringify(snapshots,null,2))
      results.push(`${width} ${route}`)
    }
  }
  console.log(`${baseline ? 'Captured baseline' : 'Passed geometry, animation, menu restoration and document scrolling'}: ${results.join(', ')}`)
} finally { await browser.close() }
