import { DinoFooterGame } from './DinoFooterGame.jsx'
import { ArrowIcon } from '../design-system/index.js'
import { routePath } from '../routes.js'

const scrollToSection = (event, targetId) => {
  event.preventDefault()
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(targetId)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function ParallaxFooter({ go }) {
  return (
    <footer className="parallax-footer" id="contact" aria-labelledby="footer-heading">
      <div className="parallax-footer-inner">
        <div className="footer-lead">
          <div>
            <h2 id="footer-heading">Have something worth designing?</h2>
            <p>Product roles, freelance briefs, or a good problem to think through. The fastest way to reach me is email.</p>
          </div>
          <a className="footer-email" href="mailto:gollapudi.aditya71@gmail.com">
            <span>gollapudi.aditya71@gmail.com</span>
            <ArrowIcon direction="external" />
          </a>
        </div>

        <div className="footer-directory">
          <nav className="footer-group" aria-label="Footer navigation">
            <h3>Explore</h3>
            <a href="#home-top" onClick={(event) => scrollToSection(event, 'home-top')}>Home</a>
            <a href="#work" onClick={(event) => scrollToSection(event, 'work')}>Selected work</a>
            <a href={routePath('about')} onClick={(event) => go('about', event)}>About</a>
            <a href={routePath('id-index')} onClick={(event) => go('id-index', event)}>Industrial Design</a>
            <a href={routePath('ux-index')} onClick={(event) => go('ux-index', event)}>UX/UI</a>
            <a href={routePath('colophon')} onClick={(event) => go('colophon', event)}>Colophon</a>
          </nav>

          <nav className="footer-group" aria-label="External profiles">
            <h3>Elsewhere</h3>
            <a href="https://www.linkedin.com/in/gollapudiaditya/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/adityag2" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://github.com/gollapudiaditya2-art" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/assets/documents/aditya-gollapudi-resume.pdf" target="_blank" rel="noreferrer">Résumé</a>
          </nav>

          <div className="footer-group footer-contact">
            <h3>Contact</h3>
            <a href="mailto:gollapudi.aditya71@gmail.com">Email me</a>
            <p>Industrial and UX/UI designer working across physical objects and digital systems.</p>
          </div>
        </div>

        <div className="footer-game">
          <DinoFooterGame />
          <div className="footer-base">
            <span>© 2026 Aditya Gollapudi</span>
            <span>Industrial &amp; UX/UI Designer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
