import { ArrowIcon } from '../design-system/index.js'
import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { routePath } from '../routes.js'

const responsiveCardImage = (name) => ({
  src: `assets/images/web-projects/responsive/${name}-1280.webp`,
  srcSet: [768, 1280, 1920].map((width) => `assets/images/web-projects/responsive/${name}-${width}.webp ${width}w`).join(', '),
  sizes: '(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 80px), calc(100vw - 128px)',
})

export function UxIndexScreen({ go }) {
  return (
    <main className="screen ux active" id="s-ux-index">
      <div className="wrap">
        <header className="ux-open"><h1>Systems you move through.</h1><p className="blurb">Platforms and flows, several shipped as working front-end products. Each opens with what I did and what changed, then shows the whole thing, screen by screen.</p></header>
        <div className="work-list">
          <a className="work-card forkast forkast-visual" href={routePath('ux-forkast-visual')} onClick={(event) => go('ux-forkast-visual', event)}><PortfolioImage className="work-bg" src="assets/images/forkast/showcase/forkast-allergy-hero.jpg" loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Forkast</h2><p>A restaurant allergy platform that carries one clear safety verdict from the diner&apos;s phone to the kitchen.</p><div className="work-meta"><span>UX research</span><span>Service system</span></div><span className="work-state">View the case study <ArrowIcon /></span></div></a>
          <a className="work-card cura cura-visual" href={routePath('ux-cura-visual')} onClick={(event) => go('ux-cura-visual', event)}><PortfolioImage className="work-bg" src="assets/images/cura/cura-device-hero.jpg" loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Cura</h2><p>A medication support system built around flexible routines, recoverable dose states, and caregiver visibility.</p><div className="work-meta"><span>UX research</span><span>Product design</span></div><span className="work-state">View the case study <ArrowIcon /></span></div></a>
          <article className="work-card sanatana" aria-disabled="true"><PortfolioImage className="work-bg" {...responsiveCardImage('sanathan-sethu-macbook')} loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Sanathan Sethu</h2><p>A verified, Telugu-first bridge between devotees and priests.</p><div className="work-meta"><span>Four-sided platform</span></div><span className="work-state">Coming soon</span></div></article>
          <a className="work-card seeker" href="https://seeker.social/" target="_blank" rel="noreferrer"><PortfolioImage className="work-bg" {...responsiveCardImage('seeker-social-macbook')} loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Seeker.social</h2><p>Nightlife mapped across 10,000+ venues. A live product.</p><div className="work-meta"><span>iOS · Android · Web</span></div><span className="work-state">Visit live website <ArrowIcon direction="external" /></span></div></a>
          <a className="work-card vaijayanthi" href="https://www.vaijayanthy.com/index.html" target="_blank" rel="noreferrer"><PortfolioImage className="work-bg" {...responsiveCardImage('vaijayanthy-macbook')} loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Vaijayanthy</h2><p>Logistics, made legible. Live site.</p><div className="work-meta"><span>Marketing site</span></div><span className="work-state">Visit live website <ArrowIcon direction="external" /></span></div></a>
          <a className="work-card worldclock" href="https://gollapudiadityaworldclock.netlify.app/" target="_blank" rel="noreferrer"><PortfolioImage className="work-bg" {...responsiveCardImage('world-clock-macbook')} loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>World Clock</h2><p>Time, spelled out. An illuminated letter-grid clock, prototyped and shipped as a live site.</p><div className="work-meta"><span>Interactive prototype</span></div><span className="work-state">Visit live website <ArrowIcon direction="external" /></span></div></a>
        </div>
      </div>
    </main>
  )
}
