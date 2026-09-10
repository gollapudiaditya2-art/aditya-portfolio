import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { App } from './App.jsx'
import { screens } from './screens/index.js'

export function renderPage(screen, print = false) {
  if (!print) return renderToString(<App screen={screen} />)
  const Screen = screens[screen]
  const markup = renderToStaticMarkup(<article className="portfolio-print-page"><Screen go={() => {}} /></article>)
  // Each route has its own ID namespace in the combined document.
  return markup.replace(/\bid="([^"]+)"/g, (_, id) => `id="${screen}-${id}"`)
    .replace(/\bhref="#([^"]+)"/g, (_, id) => `href="#${screen}-${id}"`)
    .replace(/\b(aria-labelledby|aria-describedby|aria-controls)="([^"]+)"/g, (_, attr, ids) => `${attr}="${ids.split(' ').map(id => `${screen}-${id}`).join(' ')}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${screen}-${id})`)
    .replace(/loading="lazy"/g, 'loading="eager"')
}
