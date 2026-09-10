import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { ROUTES } from '../src/routes.js'
import { browserSession, wait } from './browser-session.mjs'

const browser = await browserSession()
try {
  const errors = []
  // CDP browser errors include hydration failures as well as uncaught exceptions.
  await browser.send('Runtime.enable')
  await browser.send('Page.addScriptToEvaluateOnNewDocument', { source: `window.__errors=[];window.addEventListener('error',e=>window.__errors.push(e.message));const original=console.error;console.error=(...args)=>{window.__errors.push(args.join(' '));original(...args)}` })
  for (const [screen, route] of Object.entries(ROUTES)) {
    const html = await fetch(browser.baseUrl + route).then(r=>r.text())
    assert.ok(html.includes(`data-screen="${screen}"`), `${screen}: correct route HTML`)
    assert.match(html, /<h1[ >]/, `${screen}: initial HTML heading`)
    assert.ok(html.includes('class="screen') && html.includes('<a '), `${screen}: initial HTML content and links`)
    await browser.send('Page.navigate', { url: browser.baseUrl + route })
    await browser.waitFor(`document.readyState === 'complete' && document.body.dataset.screen === '${screen}' && document.querySelectorAll('#shell img[loading="lazy"]').length === 0`)
    await browser.evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`)
    const state = await browser.evaluate(`({ errors: window.__errors, height: document.documentElement.scrollHeight, viewport: innerHeight, lazy: document.querySelectorAll('#shell img[loading="lazy"]').length })`)
    errors.push(...state.errors.map(error=>`${screen}: ${error}`))
    assert.equal(state.lazy,0, `${screen}: capture images eagerly requested`)
  }
  assert.deepEqual(errors, [])
  await browser.send('Emulation.setScriptExecutionDisabled', { value: true })
  await browser.send('Page.navigate', { url: browser.baseUrl + '/work/aurio' })
  await wait(350)
  const noJs = await browser.send('DOM.getDocument', { depth: -1 })
  assert.ok(JSON.stringify(noJs).includes('Aurio'))
  await browser.send('Emulation.setScriptExecutionDisabled', { value: false })
  await browser.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await browser.send('Page.navigate', { url: browser.baseUrl + '/' })
  await wait(1400)
  const metrics = await browser.send('Page.getLayoutMetrics')
  assert.ok(metrics.cssContentSize.height > 844)
  const screenshot = await browser.send('Page.captureScreenshot', { captureBeyondViewport: true, clip: {x:0,y:0,width:390,height:metrics.cssContentSize.height,scale:1} })
  await mkdir('.tmp/capture-after', {recursive:true})
  await writeFile('.tmp/capture-after/full-page-phone.png', Buffer.from(screenshot.data,'base64'))
  await browser.send('Emulation.setEmulatedMedia', { features: [{name:'prefers-reduced-motion',value:'reduce'}] })
  await browser.send('Page.reload')
  await wait(1400)
  assert.equal(await browser.evaluate(`document.querySelector('.home-path-main').style.strokeDashoffset`), '0')
  assert.ok(await browser.evaluate(`[...document.querySelectorAll('.scard')].every(el=>!el.style.transform)`))
  await browser.evaluate(`document.querySelector('#menubtn').click()`)
  await wait(100)
  await browser.send('Emulation.setEmulatedMedia', { media: 'print' })
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('#shell')).position`), 'static')
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector('.menu')).display`), 'none')
  await browser.send('Emulation.setEmulatedMedia', { media: 'screen' })
  console.log('PASS: 15 pre-rendered routes, no hydration/runtime errors, image capture readiness, JavaScript-disabled content, full-page phone capture, reduced motion and printing with the menu open.')
} finally { await browser.close() }
