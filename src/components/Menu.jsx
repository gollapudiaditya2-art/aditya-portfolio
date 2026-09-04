import { routePath } from '../routes.js'

export function Menu({ activeScreen, isOpen, onNavigate, onScrollHome }) {
  const activeKey = activeScreen.startsWith('ux')
    ? 'ux-index'
    : activeScreen.startsWith('id')
      ? 'id-index'
      : ['about', 'colophon'].includes(activeScreen)
        ? activeScreen
        : 'fork'

  const itemClass = (key) => (activeKey === key ? 'active' : undefined)
  const itemCurrent = (key) => (activeKey === key ? 'page' : undefined)
  const item = (key, number, label) => (
    <li><a href={routePath(key)} className={itemClass(key)} aria-current={itemCurrent(key)} onClick={(event) => onNavigate(key, event)}><span className="mn" aria-hidden="true">{number}</span><span className="ml">{label}</span></a></li>
  )

  return (
    <nav className="menu" id="menu" aria-hidden={!isOpen} inert={!isOpen}>
      <div className="inner">
        <ul className="m-nav">
          {item('fork', '01', 'Home')}
          {item('id-index', '02', 'Industrial Design')}
          {item('ux-index', '03', 'UX/UI')}
          {item('about', '04', 'About')}
          <li><a href="/#contact" onClick={(event) => { event.preventDefault(); onScrollHome('contact') }}><span className="mn" aria-hidden="true">05</span><span className="ml">Contact</span></a></li>
        </ul>
        <div className="m-meta">
          <div className="m-col"><p className="m-col-label">Elsewhere</p><a href="https://www.linkedin.com/in/gollapudiaditya/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.behance.net/adityag2" target="_blank" rel="noreferrer">Behance</a><a href="https://github.com/gollapudiaditya2-art" target="_blank" rel="noreferrer">GitHub</a></div>
          <div className="m-col"><p className="m-col-label">Info</p><a href="/assets/documents/aditya-gollapudi-resume.pdf" target="_blank" rel="noreferrer">Résumé</a><a href={routePath('colophon')} onClick={(event) => onNavigate('colophon', event)}>Colophon</a><span>© 2026</span></div>
        </div>
      </div>
    </nav>
  )
}
