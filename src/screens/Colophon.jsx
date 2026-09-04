import { ArrowIcon } from '../design-system/index.js'
import { routePath } from '../routes.js'

const DETAILS = [
  ['Design direction', 'An open workbench: cool editorial surfaces, project-led imagery, direct typography, and a single luminous-blue interaction accent.'],
  ['Type', 'Bricolage Grotesque for display and Onest for reading and interface copy. Both families are self-hosted.'],
  ['Build', 'React and Vite with hand-written CSS. Navigation, motion, image behavior, and case-study structures are custom-built for this portfolio.'],
  ['Accessibility', 'Semantic landmarks, keyboard-operable controls, visible focus, descriptive image alternatives, and intentional reduced-motion states.'],
  ['Images', 'Project imagery and interface exports belong to Aditya’s work. Credited research-context photography links to its original source.'],
  ['Last updated', 'September 2026.'],
]

export function ColophonScreen({ go }) {
  return (
    <main className="screen colophon active" id="s-colophon">
      <div className="colophon-wrap">
        <header className="colophon-head">
          <h1>Made like the work.</h1>
          <p>This portfolio is designed as a working surface for industrial objects, digital systems, and the evidence behind both.</p>
        </header>
        <dl className="colophon-details">
          {DETAILS.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}
        </dl>
        <nav className="colophon-actions" aria-label="Continue exploring">
          <a href={routePath('id-index')} onClick={(event) => go('id-index', event)}>Industrial design <ArrowIcon /></a>
          <a href={routePath('ux-index')} onClick={(event) => go('ux-index', event)}>UX/UI work <ArrowIcon /></a>
        </nav>
      </div>
    </main>
  )
}

