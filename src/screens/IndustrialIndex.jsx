import { ArrowIcon } from '../design-system/index.js'
import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { routePath } from '../routes.js'

export function IndustrialIndexScreen({ go }) {
  return (
    <main className="screen id active" id="s-id-index">
      <header className="id-open"><h1>Things you can hold.</h1><p className="blurb">Four products carried from insight to CAD to materials. <b>The renders do the talking.</b> Each piece is shown like an object in a case, with its spec label beside it.</p></header>
      <div className="work-list">
        <a className="work-card aurio" href={routePath('id-aurio')} onClick={(event) => go('id-aurio', event)}><PortfolioImage className="work-bg" src="assets/images/aurio/Untitled6 (1) 1.jpg" loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Aurio</h2><p>Lifestyle hearing support worn as a signal, not hidden as a flaw.</p><div className="work-meta"><span>Hearing wearable</span><span>Sole designer</span><span>PC + ABS · aluminium · OLED</span></div><span className="work-state">View the product <ArrowIcon /></span></div></a>
        <a className="work-card arc" href={routePath('id-arc')} onClick={(event) => go('id-arc', event)}><PortfolioImage className="work-bg" src="assets/images/arc/COFFEE1.54.jpg" loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>ARC</h2><p>A sculptural coffee machine developed from ritual and form through CAD, CMF, and manufacturing.</p><div className="work-meta"><span>Countertop appliance</span><span>Form · CAD · CMF</span></div><span className="work-state">View the product <ArrowIcon /></span></div></a>
        <a className="work-card bastion" href={routePath('id-bastion')} onClick={(event) => go('id-bastion', event)}><PortfolioImage className="work-bg" src="assets/images/bastion/new6 1.jpg" loading="lazy" decoding="async" alt="" /><div className="work-in"><h2>Bastion</h2><p>A smart door system combining access, monitoring, communication, and a physical key.</p><div className="work-meta"><span>Smart hardware + app</span><span>Product · interface</span></div><span className="work-state">View the product <ArrowIcon /></span></div></a>
        <article className="work-card snap" aria-disabled="true"><div className="work-bg" /><div className="work-in"><h2>Snap / MOBI</h2><p>A portable modular locker that protects studio work in transit, supported by a full business case.</p><div className="work-meta"><span>Modular product</span><span>Brand · finances · GTM</span></div><span className="work-state">In progress</span></div></article>
      </div>
    </main>
  )
}
