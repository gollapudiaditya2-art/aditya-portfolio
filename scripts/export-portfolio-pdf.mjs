import { mkdir, writeFile, copyFile } from 'node:fs/promises'
import { browserSession } from './browser-session.mjs'

const browser = await browserSession()
try {
  await browser.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await browser.send('Page.navigate', { url: browser.baseUrl + '/portfolio-print/' })
  const assets = await browser.evaluate(`(async () => {
    if (document.readyState !== 'complete') await new Promise(resolve => window.addEventListener('load', resolve, {once:true}));
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    return { pages: document.querySelectorAll('.portfolio-print-page').length, broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src) };
  })()`)
  if (assets.pages !== 14 || assets.broken.length) throw Error(JSON.stringify(assets))
  const siteUrl = process.env.SITE_URL || 'https://adityagollapudi.com'
  await browser.evaluate(`document.querySelectorAll('a[href^="/"]').forEach(a => a.href = new URL(a.getAttribute('href'), ${JSON.stringify(siteUrl)}).href)` )
  await browser.send('Emulation.setEmulatedMedia', { media: 'print' })
  const pdf = await browser.send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false })
  await mkdir('output/pdf', { recursive: true })
  await writeFile('output/pdf/aditya-portfolio.pdf', Buffer.from(pdf.data, 'base64'))
  await copyFile('output/pdf/aditya-portfolio.pdf', 'dist/portfolio.pdf')
  console.log(`Exported all ${assets.pages} portfolio routes to output/pdf/aditya-portfolio.pdf and dist/portfolio.pdf`)
} finally { await browser.close() }
