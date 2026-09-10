import { createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { ROUTES, SCREEN_META } from '../src/routes.js'

const root = process.cwd()
const outputDirectory = path.join(root, 'dist')
const entry = await readFile(path.join(outputDirectory, 'index.html'), 'utf8')
const siteUrl = process.env.SITE_URL?.replace(/\/$/, '')

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const replaceMeta = (html, screen) => {
  const [title, description, image, imageAlt] = SCREEN_META[screen]
  const route = ROUTES[screen]
  const pageUrl = siteUrl ? `${siteUrl}${route}` : route
  const encodedImage = encodeURI(image)
  const imageUrl = siteUrl ? `${siteUrl}${encodedImage}` : encodedImage
  const page = html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${escapeHtml(pageUrl)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(" \/>)/, `$1${escapeHtml(imageUrl)}$2`)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(" \/>)/, `$1${escapeHtml(imageAlt)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(" \/>)/, `$1${escapeHtml(imageUrl)}$2`)
    .replace('<body data-screen="fork">', `<body data-screen="${screen}">`)
  return siteUrl ? page.replace('</head>', `  <link rel="canonical" href="${escapeHtml(pageUrl)}" />\n  </head>`) : page
}

const vite = await createServer({
  server: { middlewareMode: true, watch: null },
  optimizeDeps: { noDiscovery: true, entries: [] },
  appType: 'custom',
})
try {
  const { renderPage } = await vite.ssrLoadModule('/src/renderPage.jsx')
  const printPages = []
  for (const [screen, route] of Object.entries(ROUTES)) {
    const markup = renderPage(screen)
    const html = replaceMeta(entry, screen).replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
    if (screen !== 'not-found') printPages.push(renderPage(screen, true))
    if (route === '/') {
      await writeFile(path.join(outputDirectory, 'index.html'), html)
      continue
    }
    const directory = path.join(outputDirectory, route.slice(1))
    await mkdir(directory, { recursive: true })
    await writeFile(path.join(directory, 'index.html'), html)
    // Serve the same pre-rendered content for clean URLs in Vite and static hosts.
    await writeFile(path.join(outputDirectory, `${route.slice(1)}.html`), html)
    if (screen === 'not-found') await writeFile(path.join(outputDirectory, '404.html'), html)
  }

  if (siteUrl) {
    const urls = Object.entries(ROUTES)
      .filter(([screen]) => screen !== 'not-found')
      .map(([, route]) => `  <url><loc>${escapeHtml(`${siteUrl}${route}`)}</loc></url>`)
      .join('\n')
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap)
  }

  console.log(`Generated ${Object.keys(ROUTES).length} crawlable route entries${siteUrl ? ' and sitemap.xml' : '; set SITE_URL to add absolute canonicals and sitemap.xml'}.`)

  const printHtml = entry.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace('<div id="root"></div>', () => `<main id="root" class="portfolio-print">${printPages.join('')}</main>`).replace('<title>Aditya Gollapudi', '<title>Complete portfolio | Aditya Gollapudi')
  await mkdir(path.join(outputDirectory, 'portfolio-print'), { recursive: true })
  await writeFile(path.join(outputDirectory, 'portfolio-print/index.html'), printHtml)
  await writeFile(path.join(outputDirectory, 'portfolio-print.html'), printHtml)
  const redirects = Object.values(ROUTES).filter(route => route !== '/').map(route => `${route} ${route}/index.html 200`).join('\n')
  await writeFile(path.join(outputDirectory, '_redirects'), `${redirects}\n/portfolio-print /portfolio-print/index.html 200\n/* /404.html 404\n`)
} finally { await vite.close() }
