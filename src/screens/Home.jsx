import { ParallaxFooter } from '../components/ParallaxFooter.jsx'
import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { ArrowIcon } from '../design-system/index.js'
import { routePath } from '../routes.js'

export function HomeScreen({ go }) {
  return (
    <main className="screen active" id="s-fork"><div className="home">
      <svg
        className="home-draw-path"
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="home-path-gradient" gradientUnits="userSpaceOnUse">
            <stop className="home-path-stop-origin" offset="0" />
            <stop className="home-path-stop-flare" offset="0.18" />
            <stop className="home-path-stop-core" offset="0.58" />
            <stop className="home-path-stop-depth" offset="1" />
          </linearGradient>
        </defs>
        <path className="home-path-main" />
        <circle className="home-path-head" />
      </svg>

      <section className="hero-card" id="home-top">
        <div className="hero-name-field">
          <div className="hero-name-motion">
            <div className="hero-identity">
              <p className="hero-greeting">Hi, I am</p>
              <h1 className="hero-wordmark" aria-label="Aditya Gollapudi">
                <PortfolioImage
                  className="hero-wordmark-art"
                  src="/assets/brand/aditya-gollapudi-wordmark-hero.svg"
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority="high"
                />
              </h1>
              <p className="hero-role">Industrial &amp; UX/UI Designer</p>
            </div>
          </div>
        </div>

        <div className="hero-grid" aria-hidden="true">
          <span className="hero-grid-v hero-grid-v1"></span>
          <span className="hero-grid-v hero-grid-v2"></span>
          <span className="hero-grid-v hero-grid-v3"></span>
          <span className="hero-grid-h hero-grid-h1"></span>
          <span className="hero-grid-h hero-grid-h2"></span>
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2, 3, 4].map((column) => (
              <span
                className="hero-grid-marker"
                key={`${row}-${column}`}
                style={{ "--grid-row": row, "--grid-column": column }}
              ></span>
            )),
          )}
        </div>
      </section>
    
      <section className="whatido" id="what-i-do">
        <div className="wi-head"><h2>What I do</h2></div>
        <div className="stack">
          <a className="scard c1" href={routePath('id-index')} onClick={(event) => go('id-index', event)} style={{ "--i": 0 }}>
            <div className="sc-no">1.</div>
            <div className="sc-body">
              <h3>Industrial Design</h3>
              <ul><li>Concept &amp; form</li><li>CAD</li><li>CMF</li><li>Renders</li><li>Foam models</li></ul>
              <span className="sc-action">View industrial projects <ArrowIcon /></span>
            </div>
          </a>
          <a className="scard c2" href={routePath('ux-index')} onClick={(event) => go('ux-index', event)} style={{ "--i": 1 }}>
            <div className="sc-no">2.</div>
            <div className="sc-body">
              <h3>UX/UI</h3>
              <ul><li>Research</li><li>IA &amp; flows</li><li>UI</li><li>Prototype</li><li>Handoff</li></ul>
              <span className="sc-action">View UX/UI projects <ArrowIcon /></span>
            </div>
          </a>
          <a className="scard c3" href={routePath('ux-index')} onClick={(event) => go('ux-index', event)} style={{ "--i": 2 }}>
            <div className="sc-no">3.</div>
            <div className="sc-body">
              <h3>Prototype &amp; Build</h3>
              <ul><li>Claude Code</li><li>Codex</li><li>Figma Make</li><li>Nano Banana</li><li>Lovable</li><li>Antigravity</li><li>Stitch</li></ul>
              <span className="sc-action">View digital projects <ArrowIcon /></span>
            </div>
          </a>
        </div>
      </section>
    
      <div className="proj-cards" id="work">
        <div className="pc-head"><h2>Selected work</h2></div>
        <a className="pcard aurio" href={routePath('id-aurio')} onClick={(event) => go('id-aurio', event)}>
          <PortfolioImage className="pc-bg" src="/assets/images/aurio/Untitled6 (1) 1.jpg" loading="lazy" decoding="async" alt="" />
          <div className="pc-in"><h3>Aurio</h3><p>A hearing-support wearable designed to be worn openly, like earbuds, not hidden like a medical aid.</p><span className="pc-go">View the product <ArrowIcon /></span></div>
        </a>
        <a className="pcard forkast" href={routePath('ux-forkast-visual')} onClick={(event) => go('ux-forkast-visual', event)}>
          <PortfolioImage className="pc-bg" src="/assets/images/forkast/showcase/forkast-allergy-hero.jpg" loading="lazy" decoding="async" alt="" />
          <div className="pc-in"><h3>Forkast</h3><p>A restaurant allergy platform that carries one clear safety verdict from the diner's phone all the way to the line cook.</p><span className="pc-go">Read the case study <ArrowIcon /></span></div>
        </a>
      </div>
    
      <ParallaxFooter go={go} />
    
    </div></main>
  )
}
