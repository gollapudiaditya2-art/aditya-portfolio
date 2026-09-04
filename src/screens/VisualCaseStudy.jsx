import { Fragment, useRef, useState } from 'react'
import { ArrowIcon } from '../design-system/index.js'
import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { routePath } from '../routes.js'
import {
  ForkastInformationArchitecture,
  ForkastRiskModel,
  ForkastUserFlows,
} from '../components/CaseStudyInfographics.jsx'
import {
  ForkastCompetitiveMatrix,
  ForkastCostMap,
  ForkastCustomerJourney,
  ForkastDirectionDecision,
  ForkastInsightClusters,
  ForkastLearningMap,
  ForkastOperationsMap,
  ForkastOpportunityMap,
  ForkastOutcomeEstimates,
  ForkastPersonaMap,
  ForkastResearchPivot,
  ForkastResearchRoadmap,
  ForkastRestaurantJourney,
  ForkastScaleGraphic,
  ForkastSuccessCriteria,
  ForkastSystemAtGlance,
  ForkastTestingFindings,
  ForkastTradeoffs,
  ForkastVoicesAndObservation,
} from '../components/ForkastVisualStory.jsx'
import {
  ConceptModel as CuraConceptModel,
  InformationArchitecture as CuraInformationArchitecture,
  Journey as CuraJourney,
  MainInsight as CuraMainInsight,
  Persona as CuraPersona,
  ProblemStatement as CuraProblemStatement,
  RawEvidence as CuraRawEvidence,
  ResearchPlan as CuraResearchPlan,
  StateModel as CuraStateModel,
  Testing as CuraTesting,
  UserFlows as CuraUserFlows,
  VisualStyle as CuraVisualStyle,
  Wireframes as CuraWireframes,
} from '../components/CuraCaseStory.jsx'

const F = '/assets/images/forkast/'
const FS = `${F}showcase/`
const C = '/assets/images/cura/'
const R = '/assets/images/research/'

function Back({ to, go }) {
  return <div className="case-project-nav"><a className="case-project-back" href={routePath(to)} onClick={(event) => go(to, event)}><span className="case-back-icon" aria-hidden="true"><ArrowIcon direction="left" /></span><span>Back</span></a></div>
}

function Visual({ src, alt, label, width, height, className = '', contained = false }) {
  const image = <PortfolioImage src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
  return <figure className={`visual-edit-media ${className}`}>{contained ? <div className="visual-edit-media-stage">{image}</div> : image}{label && <figcaption>{label}</figcaption>}</figure>
}

function ScrollGallery({ items, label, className = '', basePath = FS, projectLabel = 'Forkast' }) {
  const trackRef = useRef(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = (nextIndex) => {
    const track = trackRef.current
    if (!track) return
    const targetIndex = Math.min(items.length - 1, Math.max(0, nextIndex))
    const target = track.children[targetIndex]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const left = target ? track.scrollLeft + target.getBoundingClientRect().left - track.getBoundingClientRect().left : 0
    track.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })
    activeIndexRef.current = targetIndex
    setActiveIndex(targetIndex)
  }

  const updateActiveIndex = () => {
    const track = trackRef.current
    if (!track) return
    const children = Array.from(track.children)
    const trackLeft = track.getBoundingClientRect().left
    const nextIndex = children.reduce((closest, child, index) => Math.abs(child.getBoundingClientRect().left - trackLeft) < Math.abs(children[closest].getBoundingClientRect().left - trackLeft) ? index : closest, 0)
    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    }
  }

  return <div className={`visual-edit-scroll-gallery ${className}`}>
    <div className="visual-edit-scroll-controls"><span aria-live="polite">{activeIndex + 1} / {items.length}</span><div><button type="button" aria-label={`Previous image in ${label}`} disabled={activeIndex === 0} onClick={() => scrollToIndex(activeIndex - 1)}><ArrowIcon direction="left" /></button><button type="button" aria-label={`Next image in ${label}`} disabled={activeIndex === items.length - 1} onClick={() => scrollToIndex(activeIndex + 1)}><ArrowIcon /></button></div></div>
    <div className="visual-edit-scroll-track" ref={trackRef} onScroll={updateActiveIndex} tabIndex="0" role="region" aria-roledescription="carousel" aria-label={label}>{items.map(([file, title, copy]) => <Visual key={file} contained src={`${basePath}${file}`} alt={`${projectLabel} ${title.toLowerCase()} interface`} label={<><strong>{title}</strong>{copy ? <span>{copy}</span> : null}</>} />)}</div>
  </div>
}

function Hero({ title, subtitle, intro, src, alt, meta, theme, actions = [], skills = [], metaInHero = false, go }) {
  const metadata = <dl className="visual-edit-meta">{meta.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl>
  return <><header className={`visual-edit-hero visual-edit-hero--${theme}${metaInHero ? ' visual-edit-hero--with-meta' : ''}`}><div className="visual-edit-hero-copy"><div className="visual-edit-title-row"><h1>{title}</h1></div><p className="visual-edit-subtitle">{subtitle}</p><p>{intro}</p></div><PortfolioImage src={src} alt={alt} loading="eager" decoding="async" />{metaInHero ? metadata : null}</header>{metaInHero ? null : metadata}{skills.length > 0 ? <ul className="visual-edit-skills" aria-label={`${title} disciplines`}>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul> : null}{actions.length > 0 ? <nav className="visual-edit-actions" aria-label={`${title} project documents`}>{actions.map((action) => <a key={action.label} href={routePath(action.to)} onClick={(event) => go(action.to, event)}>{action.label}<ArrowIcon /></a>)}</nav> : null}</>
}

function Source({ href, children }) {
  return <a className="visual-edit-source" href={href} target="_blank" rel="noreferrer">{children} <ArrowIcon direction="external" /></a>
}

const Head = ({ title, copy, className = '' }) => <div className={`visual-edit-section-head ${className}`}><h2>{title}</h2><p>{copy}</p></div>

function PairedList({ contributions, learnings }) {
  return <section className="forkast-summary-pairs">
    <Head className="forkast-pairs-head forkast-pairs-head-contrib" title="Contributions" copy={contributions.copy} />
    <Head className="forkast-pairs-head forkast-pairs-head-learn" title="Learnings" copy={learnings.copy} />
    {contributions.items.map(([title, copy], index) => <Fragment key={title}>
      <article className="forkast-pair-item forkast-pair-contribution"><h3>{title}</h3><p>{copy}</p></article>
      <article className="forkast-pair-item forkast-pair-learning"><span>{String(index + 1).padStart(2, '0')}</span><h3>{learnings.items[index][0]}</h3><p>{learnings.items[index][1]}</p></article>
    </Fragment>)}
  </section>
}

function EvidenceGallery({ items, className = '' }) {
  return <div className={`infographic-evidence ${className}`}>{items.map((item) => <Visual key={item.src} {...item} />)}</div>
}

function SourcedEvidence({ src, alt, width, height }) {
  return <figure className="sourced-evidence"><PortfolioImage src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" /></figure>
}

const forkastRiskEvidence = [
  { src: `${FS}safe-dish.png`, alt: 'Forkast safe dish state with supporting evidence', label: 'Safe · evidence checked' },
  { src: `${FS}caution-dish.png`, alt: 'Forkast caution dish state with substitution information', label: 'Caution · review and substitute' },
  { src: `${FS}no-safe-options.png`, alt: 'Forkast no-safe-dishes state', label: 'No safe option · honest stop state' },
]

const forkastFlowEvidence = [
  { src: `${F}05-set-allergens.png`, alt: 'Forkast customer allergen setup screen', label: 'Customer · profile' },
  { src: `${F}06-menu-safe.png`, alt: 'Forkast personalized customer menu', label: 'Customer · filtered menu' },
  { src: `${F}12-server-section.png`, alt: 'Forkast waiter service dashboard', label: 'Waiter · service handoff' },
  { src: `${F}14-chef-escalations.png`, alt: 'Forkast chef escalation dashboard', label: 'Chef · decision queue' },
]

const forkastProofPoints = [
  ['Under 2 min', 'Time to find a suitable dish', 'All 11 participants succeeded in under 2 minutes.'],
  ['~50% less', 'Decision time vs. a traditional menu', 'The same group took twice as long on a traditional menu.'],
  ['10 of 11', 'Found full dish details unprompted', '1 of 11 needed guidance to find the rest of the dish info.'],
]

const forkastProblemSolutions = [
  ['Unclear menu claims', 'Show the evidence behind each safety state instead of asking diners to trust a label.', 'safe-dish.png', 'Forkast dish evidence screen showing why a dish is marked safe'],
  ['Broken staff handoffs', 'Carry one question and answer record from the diner to the waiter, chef, and line cook.', 'chef-escalations.png', 'Forkast chef escalation queue carrying the diner’s question'],
  ['Unsafe certainty', 'Use Safe, Caution, and Avoid states, including an honest stop when the kitchen cannot verify a dish.', 'customer-safety-composition.png', 'Forkast Safe, Caution, and Avoid states shown together with substitution guidance'],
]

const forkastPrototypeScreens = [
  ['safe-menu.png', 'Personalized menu', 'A scannable menu shows which dishes are safe before a diner opens the details.'],
  ['safe-dish.png', 'Safe with evidence', 'A verified state explains why the dish matches the diner’s allergy profile.'],
  ['caution-dish.png', 'Caution with context', 'Cross-contact risk remains visible instead of being collapsed into a vague warning.'],
  ['waiter-dashboard.png', 'Waiter dashboard', 'Questions, tables, and ready-to-run dishes stay visible during service.'],
  ['chef-escalations.png', 'Chef escalation queue', 'The chef sees the recipe evidence and cross-contact risk behind each question.'],
  ['device-composition.png', 'One coherent system', 'Three connected interfaces present Forkast as one mobile product, not four disconnected tools.'],
]

const forkastContributions = [
  ['Research and synthesis', 'Framed restaurant allergy safety as a connected service problem and translated the evidence into design criteria.'],
  ['System and flows', 'Defined the customer, waiter, chef, and line-cook relationships, including escalation and stop states.'],
  ['UX/UI and prototyping', 'Designed the role-specific interfaces, reusable states, wireframes, and interactive product direction.'],
]

const forkastLearnings = [
  ['Safety is a service-system problem.', 'A diner-facing filter cannot create confidence if the restaurant workflow cannot verify and execute the same decision.'],
  ['Uncertainty needs a designed state.', 'Showing Caution, Avoid, and no-safe-option states is more responsible than forcing every dish into a confident yes or no.'],
  ['One record can support different roles.', 'Customers, waiters, chefs, and line cooks need different levels of detail, but they should never work from different versions of the truth.'],
]

const forkastRetrospective = [
  ['The trade-offs', 'Routing every question through the waiter first, instead of letting diners message the chef directly, is slower in the best case, but it keeps the kitchen from being interrupted mid-service. Treating allergen severity as restaurant-owned evidence instead of a diner self-declaration adds friction to onboarding, in exchange for data a chef can actually act on. And letting a kitchen say a dish simply can’t be made safe, instead of forcing every request into a substitution, means the app sometimes has no good answer, which is more honest than pretending it does.'],
  ['The uncomfortable conversation', 'Presenting the first version to a real waiter and chef was uncomfortable before a single word of feedback came back. The look on their faces said the design had blown up a kitchen flow that already worked. The chef pushed harder than expected, asking directly why questions should route to them at all when the waiter already had the answers. There wasn’t a clean answer in the moment, and that discomfort is what forced the redesign: staff communication had to stay inside the kitchen’s existing flow, with the chef only pulled in when the waiter genuinely couldn’t answer.'],
  ['The wrong turn', 'An earlier direction routed customer questions straight to the chef, cutting the waiter out of the loop entirely. Tested with real waiters and kitchen staff in a mock restaurant setup, it broke down during a busy, regular-flow service: the kitchen got too busy, questions ended up going back through the waiter anyway, and the flow added time instead of saving it. That failure led to interviews with the waiter, chef, and junior chef, and shaped the current design: staff communication stays inside the kitchen’s existing flow instead of replacing it.'],
  ['What I’d do differently today', 'I’d design from the kitchen outward instead of from the diner in. The process started with the customer-facing menu and worked backward into restaurant operations, which is part of why the first kitchen-facing direction landed as a disruption. Starting with the system the kitchen already runs on (paper tickets and staff memory) would make the eventual customer experience something the kitchen absorbs instead of reacts to.'],
]

function ForkastVisualEdit({ go }) {
  return <section className="screen case-study visual-edit visual-edit--forkast visual-edit-summary active" id="s-ux-forkast-visual">
    <Back to="ux-index" go={go} />
    <Hero title="Forkast" subtitle="How can one allergy decision survive the trip from diner to kitchen?" intro="A two-sided restaurant system that keeps evidence, questions, and safety decisions connected across four service roles." src={`${FS}menu-in-hand-blue.png`} alt="A diner using Forkast’s personalized restaurant menu on a phone" theme="forkast" meta={[["Team", "Independent project"], ["Role", "UX research + UX/UI design"], ["Duration", "Six weeks"], ["Year", "2025"]]} skills={['UX Research', 'Information Architecture', 'User Flows', 'UI Design', 'Prototyping']} actions={[{ label: 'View Full Process', to: 'ux-forkast-process' }, { label: 'View Usability Test Report', to: 'ux-forkast-testing' }]} go={go} />
    <main className="visual-edit-summary-body">
      <section className="forkast-summary-goal-method">
        <div><span>Goal</span><p>Diners can’t trust a menu claim without asking, waiters and kitchens lose that question in the handoff, and every dish gets forced into an unsafe yes-or-no, even when the kitchen truly can’t verify it.</p></div>
        <div><span>Method</span><p>Forkast replaces that guesswork with <strong>one shared safety record</strong>, connecting the customer-facing decision to the restaurant workflow required to verify and execute it.</p></div>
      </section>
      <section className="visual-edit-section forkast-summary-stats" aria-labelledby="forkast-proof-title">
        <h2 id="forkast-proof-title">Key data: findings from 11 customers</h2>
        <div className="forkast-summary-stat-grid">
          <div className="forkast-summary-stat-pair">{forkastProofPoints.slice(0, 2).map(([value, label, detail]) => <article key={label}><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></article>)}</div>
          {forkastProofPoints.slice(2).map(([value, label, detail]) => <p className="forkast-summary-stat-wide" key={label}><strong>{value}</strong>: {label.toLowerCase()}.<span>{detail}</span></p>)}
        </div>
      </section>

      <section className="forkast-summary-problems"><Head title="Problem → solution overview" copy="Three research conclusions shaped the service system and its interface states." /><div className="forkast-problem-cards">{forkastProblemSolutions.map(([problem, solution, image, alt]) => <article key={problem}><h3>{problem}</h3><Visual contained src={`${FS}${image}`} alt={alt} /><p>{solution}</p></article>)}</div></section>

      <section className="visual-edit-section forkast-summary-showcase"><Head title="The final prototype." copy="One shared safety record, surfaced differently for the diner, the waiter, and the chef." /><Visual contained src={`${FS}customer-safety-composition.png`} alt="Forkast customer safety system composition showing Safe, Caution, Avoid, and substitution states" label="Customer safety system · final Figma composition" className="forkast-summary-collage" /><ScrollGallery items={forkastPrototypeScreens} label="Forkast final prototype screens" /></section>

      <PairedList
        contributions={{ copy: 'The work combined service research, system definition, interaction design, and interface resolution.', items: forkastContributions }}
        learnings={{ copy: 'Three lessons changed how the final system was framed and designed.', items: forkastLearnings }}
      />

      <section className="forkast-summary-more"><Head title="View more projects" copy="Continue to another UX/UI case study or return to the complete project index." /><div><a href={routePath('ux-cura-visual')} onClick={(event) => go('ux-cura-visual', event)}><PortfolioImage src="/assets/images/cura/Hand and iPhone 16 Pro.png" alt="Cura mobile health application shown in a hand-held phone mockup" loading="lazy" decoding="async" /><span><strong>Cura</strong><small>UX/UI case study</small><ArrowIcon /></span></a><a href={routePath('ux-index')} className="forkast-summary-all-projects" onClick={(event) => go('ux-index', event)}><span><strong>All UX/UI projects</strong><small>Return to the project index</small><ArrowIcon /></span></a></div></section>
    </main>
  </section>
}

function ForkastVisualProcess({ go }) {
  return <section className="screen case-study visual-edit visual-edit--forkast active" id="s-ux-forkast-process">
    <Back to="ux-forkast-visual" go={go} />
    <Hero title="Forkast" subtitle="A two-sided allergy verification system." intro="The original 30-page case study, rebuilt for the web in the same order, using project evidence, diagrams, interfaces, and shorter explanations." src={`${FS}device-composition.png`} alt="Forkast shown as one connected mobile product, from personalized menu to allergen setup" theme="forkast" meta={[["Role", "Independent UX/UI designer"], ["Research", "Six-week mixed-method study"], ["System", "Customer + restaurant"], ["Year", "2025"]]} />
    <main className="visual-edit-body forkast-pdf-story">
      <section className="infographic-section forkast-story-start"><Head title="The system, at a glance." copy="Four role-specific products read and update one allergy-and-dish record in real time." /><ForkastSystemAtGlance /></section>

      <section className="infographic-section forkast-research-scale"><Head title="The scale of the problem." copy="Restaurant allergy decisions affect millions, yet confidence and communication remain low." /><ForkastScaleGraphic /><p className="forkast-source-note">Research sources documented in the case study: FARE, JAMA Network Open, and FAACT.</p></section>
      <section className="infographic-section"><Head title="Eating out is a cost-benefit calculation." copy="Today, allergic diners choose between time-consuming verification and the risk of skipping it." /><ForkastCostMap /></section>
      <section className="infographic-section"><Head title="A layered research roadmap." copy="Six methods built on one another; observation, not another interview, produced the biggest shift." /><ForkastResearchRoadmap /></section>
      <section className="infographic-section"><Head title="What users said and what they actually did." copy="Interview confidence collapsed in an unplanned, hungry walk-in. That behavioral gap became the central design problem." /><ForkastVoicesAndObservation /></section>
      <section className="infographic-section"><Head title="Where existing apps break down." copy="Customer tools do not reach kitchens; restaurant tools do not reach diners. None preserve a shared live record." /><ForkastCompetitiveMatrix /></section>
      <section className="infographic-section"><Head title="An evening out with an allergy." copy="The customer journey shows the verification burden, the hunger-driven shortcut, and the uncertainty that survives the meal." /><ForkastCustomerJourney /><SourcedEvidence src={`${R}forkast-diner-waiter.jpg`} alt="Customers reviewing a menu with a waiter at a restaurant table" width="1800" height="1200" href="https://www.pexels.com/photo/waiter-taking-orders-from-customers-4921150/" credit="RDNE Stock project on Pexels" /></section>
      <section className="infographic-section"><Head title="How the restaurant actually handles allergies." copy="The waiter owns the conversation while the kitchen works through paper tickets, memory, and limited peak-service capacity." /><div className="infographic-composite infographic-composite--research"><ForkastOperationsMap /><SourcedEvidence src={`${R}forkast-kitchen-team.jpg`} alt="Professional chefs coordinating during restaurant service" width="1799" height="1200" href="https://www.pexels.com/photo/professional-chefs-working-in-restaurant-kitchen-30120987/" credit="Tranmautritam on Pexels" /></div></section>

      <section className="infographic-section"><Head title="Five insight clusters from research." copy="The evidence converged around verification cost, trust, time, stale information, and restaurant capacity." /><ForkastInsightClusters /></section>
      <section className="infographic-section"><Head title="Who the system is designed for." copy="Two customer patterns and two restaurant roles expose both sides of the same safety decision." /><ForkastPersonaMap /></section>
      <section className="infographic-section"><Head title="What the design must achieve." copy="Five criteria became the test for every later interface and service decision." /><ForkastSuccessCriteria /></section>
      <section className="infographic-section"><Head title="An allergy order through the restaurant." copy="The waiter’s confidence and the chef’s capacity rise and fall at different moments during the same order." /><ForkastRestaurantJourney /></section>

      <section className="infographic-section"><Head title="The real opportunity." copy="Connect what the customer already knows with what the restaurant can verify and safely execute." /><ForkastOpportunityMap /></section>
      <section className="infographic-section"><Head title="Three approaches considered. Two rejected." copy="The research ruled out customer-only discovery and restaurant-only compliance. The gap required a two-sided system." /><ForkastDirectionDecision /></section>
      <section className="infographic-section"><Head title="Three states, four roles, one shared truth." copy="Safe, Caution, and Avoid remain consistent while each role receives the level of detail needed to act." /><ForkastRiskModel /><EvidenceGallery items={forkastRiskEvidence} className="evidence-phone-grid" /><EvidenceGallery items={[{ src: `${FS}customer-safety-composition.png`, alt: 'Forkast Safe, Caution, and Avoid states shown together with substitution guidance', label: 'One safety record · four operational views' }]} className="evidence-system-overview" /></section>
      <section className="infographic-section"><Head title="What research changed about the design." copy="Question routing, reusable answers, and capacity profiles were added only after the restaurant workflow was understood." /><ForkastResearchPivot /></section>

      <section className="visual-edit-section forkast-wireframe-section"><Head title="From sketches to system." copy="Low-fidelity flows established allergen setup, menu evidence, staff questions, and kitchen escalation before visual styling." /><div className="forkast-wireframe-field"><Visual src={`${F}01-wireframe-menu.png`} alt="Low-fidelity Forkast customer menu" label="Customer menu" /><Visual src={`${F}02-wireframe-dish.png`} alt="Low-fidelity Forkast dish detail" label="Dish evidence" /><Visual src={`${F}03-wireframe-dashboard.png`} alt="Low-fidelity Forkast waiter dashboard" label="Waiter floor" /><Visual src={`${F}04-wireframe-dashboard-2.png`} alt="Low-fidelity Forkast chef dashboard" label="Chef escalation" /></div></section>
      <section className="visual-edit-section"><Head title="Design-system foundations." copy="Semantic safety colors, one component library, and role-aware density let the same decision travel across mobile, tablet, and kitchen displays." /><div className="forkast-design-evidence"><div className="forkast-component-catalog"><article><span className="is-safe">Safe</span><strong>Dish status</strong><p>Evidence checked against the diner’s allergy profile.</p></article><article><span className="is-caution">Caution</span><strong>Review required</strong><p>Cross-contact or substitution details need attention.</p></article><article><span className="is-avoid">Avoid</span><strong>Ordering locked</strong><p>The kitchen cannot verify a safe version of the dish.</p></article><article><span className="is-action">Ask</span><strong>Shared question</strong><p>One question record moves through the service team.</p></article><small>Reusable status and control catalog</small></div><div className="forkast-token-board"><div><span>Safe</span><i style={{ background: '#1b5e3f' }} /></div><div><span>Caution</span><i style={{ background: '#d49118' }} /></div><div><span>Avoid</span><i style={{ background: '#a63b32' }} /></div><div><span>Action</span><i style={{ background: '#3fc6ef' }} /></div><p>One semantic palette across customer, waiter, chef, and line views.</p></div></div></section>
      <section className="infographic-section"><Head title="Three user flows show how the system works." copy="The customer path, chef decision path, and customer → waiter → chef escalation preserve context from question to answer." /><ForkastUserFlows /><EvidenceGallery items={forkastFlowEvidence} className="evidence-flow-grid" /></section>
      <section className="visual-edit-section"><Head title="The customer experience." copy="Scan, set allergens, browse a filtered menu, inspect evidence, and order, or ask the kitchen." /><div className="visual-edit-phone-sequence">{['05-set-allergens.png', '06-menu-safe.png', '07-dish-safe.png', '08-dish-caution.png', '09-empty-state.png'].map((file, index) => <Visual key={file} src={`${F}${file}`} alt={`Forkast customer flow screen ${index + 1}`} label={['Profile', 'Menu', 'Safe', 'Caution', 'Ask / reroute'][index]} />)}</div></section>
      <section className="visual-edit-section"><Head title="The restaurant experience." copy="The floor, chef, and line views reveal different operational detail while reading from the same shared record." /><div className="visual-edit-service-grid"><Visual src={`${F}12-server-section.png`} alt="Forkast waiter floor dashboard" label="Waiter floor · questions and tables" /><Visual src={`${F}14-chef-escalations.png`} alt="Forkast chef escalation dashboard" label="Chef · edge-case decisions" /><Visual src={`${F}13-kitchen-line-display.png`} alt="Forkast kitchen line display" label="Line · allergen flags on every ticket" /></div></section>

      <section className="infographic-section"><Head title="What testing exposed." copy="Usability testing changed hierarchy, routing, state distinction, and the chef’s decision controls." /><ForkastTestingFindings /></section>
      <section className="infographic-section"><Head title="How the system is structured." copy="Customer and restaurant surfaces remain separate at the interface level and connected at the safety-data level." /><ForkastInformationArchitecture /></section>
      <section className="infographic-section"><Head title="Three decisions, three rejected alternatives." copy="The chosen system respects service roles, treats severity as evidence, and permits honest rejection when a kitchen cannot guarantee safety." /><ForkastTradeoffs /></section>
      <section className="infographic-section"><Head title="What success would look like." copy="These are transparent projections from the case-study model, not shipped metrics or measured outcomes." /><ForkastOutcomeEstimates /></section>
      <section className="infographic-section forkast-learning-section"><Head title="What the case study doesn’t usually show." copy="The trade-offs made, the conversation that forced a redesign, the direction that failed with real staff, and what a restart would change." /><div className="forkast-pair-standalone-list">{forkastRetrospective.map(([title, copy], index) => <article key={title} className="forkast-pair-item forkast-pair-learning"><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="infographic-section forkast-learning-section"><Head title="Learnings, reflection, and what comes next." copy="The project’s strongest lesson is about behavior and restaurant systems, not interface polish." /><ForkastLearningMap /></section>
      <section className="visual-edit-close"><h2>The project is the handoff.</h2><p>Forkast succeeds only when one evidence-backed decision survives the journey from the diner’s phone to the kitchen and returns without losing context.</p></section>
    </main>
  </section>
}

function ForkastTestingReport({ go }) {
  return <section className="screen case-study visual-edit visual-edit--forkast forkast-testing-report active" id="s-ux-forkast-testing">
    <Back to="ux-forkast-visual" go={go} />
    <Hero title="Forkast" subtitle="Usability test report." intro="Two connected studies tested whether diners could make a safer menu decision and whether that decision could survive the handoff into a working kitchen." src={`${FS}customer-safety-composition.png`} alt="Forkast customer safety screens showing Safe, Caution, Avoid, and substitution states" theme="forkast" meta={[["Ownership", "Independent, end to end"], ["Customer test", "11 participants"], ["Restaurant test", "3 participants"], ["Evidence", "Confirmed project record"]]} skills={['Comparative Testing', 'Service Prototyping', 'Usability Testing', 'Design Iteration']} metaInHero />
    <main className="forkast-report-body">
      <section className="forkast-report-intro">
        <div><h2>Testing had to work on both sides of the table.</h2><p>A customer-facing filter could look clear and still fail if the restaurant could not receive, verify, and act on the same allergy decision. I tested the two sides separately, then used the point of failure between them to reshape the service flow.</p></div>
        <p className="forkast-report-disclosure"><strong>About this report</strong>This is a concise reconstruction from the confirmed project record. The participant totals and customer results below are real. Formal session notes, recordings, SUS scores, exact scripts, and per-participant timing logs were not retained, so they are not recreated here.</p>
      </section>

      <section className="forkast-report-results">
        <Head title="The customer comparison." copy="Eleven people used Forkast and a traditional menu to find a suitable dish and inspect the information behind that decision." />
        <div className="forkast-report-metrics">
          <article><strong>Under 2 min</strong><p>All 11 participants found a suitable dish with Forkast.</p></article>
          <article><strong>About 2x longer</strong><p>The same participants took about twice as long with a traditional menu.</p></article>
          <article><strong>10 of 11</strong><p>Found the full dish details without guidance.</p></article>
        </div>
        <div className="forkast-report-customer-evidence">
          <Visual contained src={`${FS}safe-menu.png`} alt="Forkast personalized menu showing dishes marked safe for the diner's allergy profile" label="Find a suitable dish" />
          <Visual contained src={`${FS}safe-dish.png`} alt="Forkast safe dish detail showing the evidence behind its safety state" label="Inspect the evidence behind the decision" />
        </div>
      </section>

      <section className="forkast-report-method">
        <Head title="Two tests, one handoff." copy="The customer comparison measured clarity at the menu. The restaurant-side walkthrough tested whether the same decision fit the people and pressure behind the menu." />
        <div className="forkast-report-test-tracks">
          <article><h3>Customer-side comparison</h3><p><strong>11 customer participants</strong> worked through the decision in Forkast and in a traditional menu condition. The surviving results show what the study evaluated, not the wording of the original task script.</p><ul><li>Whether people could find a suitable dish.</li><li>How decision time compared with a traditional menu.</li><li>Whether people discovered full dish details without prompting.</li></ul></article>
          <article><h3>Restaurant-side first iteration</h3><p><strong>A waiter, chef, and junior chef</strong> tested the kitchen workflow in a simulated service flow. The retained account documents the behavior that was evaluated, not an exact facilitator script.</p><ul><li>Whether direct-to-chef routing fit existing service roles.</li><li>How allergy questions moved under service pressure.</li><li>Where responsibility returned when the first flow broke.</li></ul></article>
        </div>
      </section>

      <section className="forkast-report-kitchen">
        <Head title="The first kitchen flow broke under pressure." copy="The uncomfortable conversation at the end of the first test exposed a system problem: sending every diner question directly to the chef interrupted the kitchen and eventually pushed the question back through the waiter anyway." />
        <div className="forkast-report-routing">
          <article><h3>First iteration</h3><div className="forkast-report-route" aria-label="First iteration route from diner directly to chef, then back to waiter"><span>Diner</span><ArrowIcon /><span>Chef</span><ArrowIcon /><span>Waiter</span></div><p>Direct access looked faster on screen, but it bypassed the person already responsible for the table and added pressure to the kitchen.</p></article>
          <article><h3>Design response</h3><div className="forkast-report-route" aria-label="Revised route from diner to waiter, with chef escalation only when needed"><span>Diner</span><ArrowIcon /><span>Waiter</span><ArrowIcon /><span>Chef when needed</span></div><p>The waiter handles known answers first. Only unresolved safety questions reach the chef, and the answer returns through a visible shared record.</p></article>
        </div>
        <Visual contained src={`${FS}waiter-dashboard.png`} alt="Forkast waiter dashboard showing guest questions and table context" label="The revised service flow keeps question ownership visible before escalation" className="forkast-report-service-screen" />
      </section>

      <section className="forkast-report-findings" tabIndex="0" aria-label="Scrollable usability findings table">
        <Head title="What testing changed." copy="Each observed problem was translated into a specific interface or workflow response. These findings are retained in the original project record." />
        <ForkastTestingFindings />
      </section>

      <section className="forkast-report-boundaries">
        <Head title="What the evidence can support." copy="A useful case study is precise about both its findings and its limits." />
        <div>
          <article><h3>Confirmed and included</h3><ul><li>11 customer participants and three restaurant-side participants.</li><li>The three customer comparison results shown above.</li><li>The five observed usability issues and their design responses.</li><li>The failed direct-to-chef route and the waiter-first redesign.</li></ul></article>
          <article><h3>Not available, so not claimed</h3><ul><li>Participant demographics or individual profiles.</li><li>Verbatim participant quotations or session recordings.</li><li>Per-participant task times, error counts, or assistance levels.</li><li>A System Usability Scale score or statistical significance.</li></ul></article>
        </div>
      </section>

      <section className="forkast-report-next">
        <Head title="What I would validate next." copy="A future round would turn the surviving evidence into a repeatable study and test the redesigned handoff in a real restaurant environment." />
        <ol><li><strong>Write one task protocol.</strong><span>Use the same menu-finding, detail-checking, and question-routing prompts with every participant.</span></li><li><strong>Record behavior consistently.</strong><span>Capture completion, assistance, errors, time, and short post-task confidence ratings.</span></li><li><strong>Retest the handoff.</strong><span>Compare the waiter-first escalation model with the rejected direct-to-chef route during realistic service pressure.</span></li><li><strong>Run a live pilot.</strong><span>Validate answer ownership, kitchen capacity, and whether the shared safety record stays current across a shift.</span></li></ol>
      </section>

      <section className="visual-edit-close"><h2>Testing changed the system, not just the screens.</h2><p>The strongest result was the point where the first concept failed. Listening to the people inside the restaurant changed who owns the question, when the chef gets involved, and how one safety decision travels from table to kitchen.</p></section>
    </main>
  </section>
}

const curaProofPoints = [
  ['4 of 4', 'Completed the fixed interaction', 'After the hidden swipe gesture was replaced with a visible tap toggle, every participant in the next testing round completed it correctly.'],
  ['72.2%', 'Used no reminder app at all', '13 of 18 survey respondents managed medication without any dedicated reminder tool before this project.'],
  ['2 rounds', 'Moderated usability testing', 'Four participants each, covering setup, the daily schedule, and dose recovery.'],
]

const curaProblemSolutions = [
  ['Exact-time alarms fought real routines', 'Replace fixed alarm times with flexible time windows tied to when doses actually happen: around meals, sleep, and work.', 'iPhone 16 Pro - 48.png', 'Cura setup screen for defining flexible morning, afternoon, and evening time windows'],
  ['Late and missed felt like the same failure', 'Split the state model into upcoming, due, late, taken, and missed, so a recoverable moment does not trigger the same alarm as a missed one.', 'Group 164.png', 'Expanded late-dose Cura notification with recovery actions'],
  ['Caregiver visibility felt like surveillance', 'Show caregivers only meaningful exceptions instead of constant monitoring, with consent built into setup.', 'iPhone 16 Pro - 51.png', 'Cura family-support setup screen explaining optional caregiver visibility'],
]

const curaPrototypeScreens = [
  ['iPhone 16 Pro - 48.png', 'Onboarding', 'Setting flexible time windows before any medication is added.'],
  ['iPhone 16 Pro - 50.png', 'Medication setup', 'Scan, search, or enter a medication manually.'],
  ['Group 153.png', 'Today', 'The daily schedule organized around the current routine window.'],
  ['Group 154.png', 'Taken', 'Immediate confirmation once a dose is marked complete.'],
  ['Group 163.png', 'Due', 'A due reminder with direct taken, snooze, or skip actions.'],
  ['Group 164.png', 'Late', 'A recoverable state instead of an automatic miss.'],
  ['Group 159.png', 'History', 'Dose status preserved across the day.'],
  ['iPhone 16 Pro - 51.png', 'Caregiver', 'Optional visibility limited to meaningful exceptions.'],
]

const curaContributions = [
  ['Research and synthesis', 'Ran a survey and interviews, then synthesized adherence behavior into the flexible time-window concept.'],
  ['System and states', 'Defined the upcoming, due, late, taken, and missed dose states shared across every screen.'],
  ['UX/UI and testing', 'Designed the wireframes and visual interface, then ran two rounds of moderated usability testing.'],
]

const curaLearnings = [
  ['A hidden gesture is not a control.', 'Swipe-to-complete felt natural to design, but no participant discovered it without being told. Every meaningful action needs a visible, discoverable control.'],
  ['Timing should model behavior, not the clock.', 'Exact-time alarms fight how people actually take medication, which happens around meals, sleep, and work, not at a fixed minute.'],
  ['Recoverable and missed are not the same state.', 'Separating late from missed removes guilt from a moment that is still fixable, and only escalates to a caregiver when it truly matters.'],
]

const curaRetrospective = [
  ['The trade-offs', 'Choosing flexible time windows over exact clock-time alarms meant giving up precision: a window is a looser promise than a single minute, and that ambiguity had to be designed around rather than hidden. Limiting caregiver visibility to meaningful exceptions instead of full monitoring meant giving up constant caregiver oversight, in exchange for not turning every dose into a surveillance moment for the person taking it.'],
  ['The uncomfortable conversation', 'The hardest question wasn’t from a testing session: it was being asked directly why this needed to be its own app at all, instead of two features added to Apple Health or an existing medication tool. There wasn’t a defensive answer, because there wasn’t supposed to be a new app: building it standalone was the fastest way to find out whether flexible time windows and a shared dose state were actually worth having, or whether it was a feature I’d talked myself into caring about more than real users would.'],
  ['The wrong turn', 'An early version of the daily screen used small colored progress bars under each calendar date and a swipe gesture to mark a dose as taken. Both failed in testing: the progress bars looked fine but nobody checked them without being told what they meant, and no participant swiped without being told to. The swipe was replaced with a one-tap toggle, which every participant then completed correctly.'],
  ['What I’d do differently today', 'I’d pair the app with a physical product instead of shipping software alone: medication storage is its own real problem, separate from the reminder stress this project addressed, and a physical object would let the two solve different halves of the same routine instead of asking software to carry both. I’d also go back and solve an edge case testing never covered: the notification model works cleanly for one medication, proven in testing, but stacking two or more doses due at once is a case the current design doesn’t yet handle.'],
]

function CuraVisualEdit({ go }) {
  return <section className="screen case-study visual-edit visual-edit--cura visual-edit-summary active" id="s-ux-cura-visual">
    <Back to="ux-index" go={go} />
    <Hero title="Cura" subtitle="How do you remind someone without making them feel judged?" intro="A medication support system that replaces rigid, exact-time alarms with flexible time windows, recoverable dose states, and caregiver visibility that only appears when it actually matters." src={`${C}Hand and iPhone 16 Pro.png`} alt="Hands holding a phone displaying the Cura daily medication schedule" theme="cura" meta={[["Team", "Independent case study"], ["Role", "UX/UI designer and researcher"], ["Testing", "2 rounds · 4 participants each"], ["Scope", "Research through prototype"]]} skills={['Research Synthesis', 'Information Architecture', 'User Flows', 'Dose-State Logic', 'Prototyping', 'Usability Testing']} actions={[{ label: 'View Full Process', to: 'ux-cura-process' }, { label: 'View Usability Test Report', to: 'ux-cura-testing' }]} go={go} />
    <main className="visual-edit-summary-body">
      <section className="forkast-summary-goal-method">
        <div><span>Goal</span><p>Exact-time alarms assume medication fits a fixed schedule. In practice, doses get taken around meals, sleep, and work, and a single missed alarm can feel like a moral failure instead of a recoverable moment.</p></div>
        <div><span>Method</span><p>Cura replaces that fixed schedule with <strong>one shared dose-state model</strong> (upcoming, due, late, taken, or missed) so timing bends to the routine instead of the other way around.</p></div>
      </section>
      <section className="visual-edit-section forkast-summary-stats" aria-labelledby="cura-proof-title">
        <h2 id="cura-proof-title">Key data: research and testing findings</h2>
        <div className="forkast-summary-stat-grid">
          <div className="forkast-summary-stat-pair">{curaProofPoints.slice(0, 2).map(([value, label, detail]) => <article key={label}><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></article>)}</div>
          {curaProofPoints.slice(2).map(([value, label, detail]) => <p className="forkast-summary-stat-wide" key={label}><strong>{value}</strong>: {label.toLowerCase()}.<span>{detail}</span></p>)}
        </div>
      </section>

      <section className="forkast-summary-problems"><Head title="Problem → solution overview" copy="Three research conclusions shaped the state model and interface." /><div className="forkast-problem-cards">{curaProblemSolutions.map(([problem, solution, image, alt]) => <article key={problem}><h3>{problem}</h3><Visual contained src={`${C}${image}`} alt={alt} /><p>{solution}</p></article>)}</div></section>

      <section className="visual-edit-section forkast-summary-showcase"><Head title="The final prototype." copy="One shared dose state, surfaced differently for the person taking medication and the caregiver supporting them." /><Visual contained src={`${C}Slide 16_9 - 2.png`} alt="Cura system overview combining the daily schedule, reminders, adherence history, and caregiver information" label="Daily schedule, reminders, and caregiver view · final composition" className="forkast-summary-collage" /><ScrollGallery items={curaPrototypeScreens} label="Cura final prototype screens" basePath={C} projectLabel="Cura" /></section>

      <PairedList
        contributions={{ copy: 'The work combined behavioral research, state-model definition, interaction design, and usability testing.', items: curaContributions }}
        learnings={{ copy: 'Three lessons changed how the final system was framed and designed.', items: curaLearnings }}
      />

      <section className="forkast-summary-more"><Head title="View more projects" copy="Continue to another UX/UI case study or return to the complete project index." /><div><a href={routePath('ux-forkast-visual')} onClick={(event) => go('ux-forkast-visual', event)}><PortfolioImage src="/assets/images/forkast/06-menu-safe.png" alt="Forkast personalized restaurant menu shown on a phone" loading="lazy" decoding="async" /><span><strong>Forkast</strong><small>UX/UI case study</small><ArrowIcon /></span></a><a href={routePath('ux-index')} className="forkast-summary-all-projects" onClick={(event) => go('ux-index', event)}><span><strong>All UX/UI projects</strong><small>Return to the project index</small><ArrowIcon /></span></a></div></section>
    </main>
  </section>
}

function CuraVisualProcess({ go }) {
  return <section className="screen case-study visual-edit visual-edit--cura active" id="s-ux-cura-process">
    <Back to="ux-cura-visual" go={go} />
    <Hero title="Cura" subtitle="A flexible medication-support system." intro="The original case study, rebuilt for the web in the same order: research, synthesis, structure, testing, and the final design." src={`${C}iPhone 16 Pro.png`} alt="Cura reminder shown on a phone in a dark environmental render" theme="cura" meta={[["Role", "Independent UX/UI designer and researcher"], ["Research", "18 survey responses · 5 interviews"], ["Testing", "2 moderated rounds"], ["System", "Patient + caregiver"]]} />
    <main className="visual-edit-body forkast-pdf-story">
      <section className="infographic-section forkast-story-start"><Head title="Research had to explain routine breaks, not just forgetfulness." copy="Four research lenses moved from broad context into direct conversation, synthesis, and two rounds of prototype testing." /><CuraResearchPlan /></section>
      <section className="infographic-section"><Head title="The central insight reframed adherence as a routine problem." copy="One line captures why reminders fail: routines break, not memory." /><CuraMainInsight /></section>
      <section className="infographic-section"><Head title="Raw survey and interview evidence stayed visible." copy="Eighteen survey responses and five interviews were grouped into seven behavioral themes before any design decision." /><CuraRawEvidence /></section>
      <section className="infographic-section"><Head title="The concept narrowed to one person and one bounded supporter." copy="Research ruled out constant caregiver monitoring in favor of a shared dose state with consent-based visibility." /><CuraConceptModel /></section>
      <section className="infographic-section"><Head title="A problem statement anchored every later decision." copy="Every wireframe and interface choice traces back to this single question." /><CuraProblemStatement /></section>
      <section className="infographic-section"><Head title="One persona carried the design forward." copy="Ananya is a composite drawn from recurring patterns across participants, not one individual." /><CuraPersona /></section>
      <section className="infographic-section"><Head title="A routine break has an emotional cost." copy="The journey traces confidence from a calm morning dose through a missed alarm and back to recovery." /><CuraJourney /></section>

      <section className="infographic-section"><Head title="The visual language stays calm on purpose." copy="One action blue, generous white space, and plain language keep medication status the focus, not the styling." /><CuraVisualStyle /></section>
      <section className="infographic-section"><Head title="Two flows carry the entire experience." copy="Setting up a medication and completing a dose are the only two journeys that matter every day." /><CuraUserFlows /></section>
      <section className="infographic-section"><Head title="Four familiar destinations organize the app." copy="Daily action, medication management, family support, and settings stay separated instead of collapsing into one screen." /><CuraInformationArchitecture /></section>
      <section className="visual-edit-section forkast-wireframe-section"><Head title="Low-fidelity screens established the structure first." copy="Navigation, scheduling, dose actions, and family visibility were tested before visual polish began." /><CuraWireframes /></section>
      <section className="infographic-section"><Head title="Five states keep every screen consistent." copy="Upcoming, due, late, taken, and missed read the same way in the daily view, reminders, history, and caregiver view." /><CuraStateModel /></section>

      <section className="infographic-section cura-decision-section"><Head title="One approach was tested and rejected before this one." copy="Reminder timing was modeled two ways during early research." /><div className="cura-decision-compare"><article><span>Considered</span><h3>Exact clock-time alarms</h3><p>Precise, but it assumes medication fits a fixed schedule. Testing and interviews showed real routines move around meals, sleep, and work, not the clock.</p></article><article><span>Shipped</span><h3>Flexible time windows</h3><p>A dose belongs to a practical period of the day, so the reminder bends to the routine instead of demanding the routine bend to it.</p></article></div></section>

      <section className="infographic-section"><Head title="What testing exposed." copy="Two rounds of moderated testing changed the calendar signal, the primary gesture, the tab treatment, and the entry point." /><CuraTesting /></section>

      <section className="infographic-section forkast-learning-section"><Head title="What the case study doesn’t usually show." copy="The trade-offs made, the conversation that questioned the whole premise, the direction that failed in testing, and what a restart would change." /><div className="forkast-pair-standalone-list">{curaRetrospective.map(([title, copy], index) => <article key={title} className="forkast-pair-item forkast-pair-learning"><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="infographic-section forkast-learning-section"><Head title="Learnings, reflection, and what comes next." copy="The project's strongest lesson is about behavior and trust, not visual polish." /><div className="forkast-pair-standalone-list">{curaLearnings.map(([title, copy], index) => <article key={title} className="forkast-pair-item forkast-pair-learning"><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="visual-edit-close"><h2>The system is the reminder.</h2><p>Cura succeeds only when a dose's status (upcoming, due, late, taken, or missed) stays trustworthy across the phone and the caregiver view alike.</p></section>
    </main>
  </section>
}

function CuraTestingReport({ go }) {
  return <section className="screen case-study visual-edit visual-edit--cura cura-testing-report active" id="s-ux-cura-testing">
    <Back to="ux-cura-visual" go={go} />
    <Hero title="Cura" subtitle="Usability test report." intro="Two moderated rounds with eight different participants tested whether medication setup, daily dose actions, and late-dose recovery were clear without instruction." src={`${C}Before.png`} alt="Cura daily schedule before usability-testing changes" theme="cura" meta={[["Ownership", "Independent, end to end"], ["Participants", "8 total"], ["Study design", "2 rounds · 4 different people each"], ["Evidence", "Confirmed project record"]]} skills={['Moderated Testing', 'Prototype Testing', 'Interaction Design', 'Design Iteration']} metaInHero />
    <main className="forkast-report-body">
      <section className="forkast-report-intro cura-report-intro">
        <div><h2>The first round revealed what the interface was hiding.</h2><p>The daily schedule depended on people interpreting progress bars, discovering a swipe gesture, and recognizing time-window tabs without explanation. I changed those interactions, then tested the revised prototype with four different people.</p></div>
        <p className="forkast-report-disclosure"><strong>About this report</strong>This page uses the findings currently recorded in the Cura project. It does not add participant demographics, verbatim quotations, SUS scores, exact scripts, or per-task timing because those details are not present in the portfolio record.</p>
      </section>

      <section className="forkast-report-method cura-report-method">
        <Head title="Two rounds, two different groups." copy="Each moderated remote session covered the same core experience: medication setup, the daily schedule, marking a due dose as taken, and recovering from a late dose." />
        <div className="forkast-report-test-tracks">
          <article><h3>Round one exposed the friction</h3><p><strong>Four participants</strong> used the original interactive prototype. The interface relied on several signals that made sense only after they were explained.</p><ul><li>Calendar progress bars were not understood.</li><li>Nobody discovered swipe-to-complete without instruction.</li><li>Time-window tabs looked like filters.</li><li>Separate Add and Scan actions created hesitation.</li></ul></article>
          <article><h3>Round two tested the response</h3><p><strong>Four different participants</strong> used the revised prototype. The goal was to see whether visible controls and a clearer hierarchy removed the earlier dependence on explanation.</p><ul><li>Swipe became a visible tap control.</li><li>Completion feedback moved beside each medication.</li><li>Time-window tabs gained size and contrast.</li><li>Add became one entry point, with Scan inside.</li></ul></article>
        </div>
      </section>

      <section className="forkast-report-results cura-report-results">
        <Head title="One interaction produced the clearest before-and-after result." copy="The hidden swipe failed discovery in round one. After it became a visible tap control, every participant in the different second-round group completed it correctly." />
        <div className="forkast-report-metrics">
          <article><strong>0 of 4</strong><p>Discovered swipe-to-complete without instruction in round one.</p></article>
          <article><strong>4 of 4</strong><p>Completed the visible tap interaction correctly in round two.</p></article>
          <article><strong>8 people</strong><p>Participated across two rounds, with a different group in each round.</p></article>
        </div>
        <div className="forkast-report-customer-evidence cura-report-evidence">
          <Visual contained src={`${C}Before.png`} alt="Cura daily schedule before testing changes, using progress bars and a hidden swipe interaction" label="Round one · hidden gesture and unclear calendar signal" />
          <Visual contained src={`${C}After.png`} alt="Revised Cura daily schedule with a visible tap control and clearer time-window tabs" label="Round two · visible action and stronger hierarchy" />
        </div>
      </section>

      <section className="forkast-report-findings cura-report-findings">
        <Head title="What testing changed." copy="Every retained observation is paired with the design response it caused and the result the current project record can support." />
        <CuraTesting showIterations={false} />
      </section>

      <section className="forkast-report-boundaries cura-report-boundaries">
        <Head title="What the evidence can support." copy="The report is specific about what was observed and equally clear about what the current record does not contain." />
        <div>
          <article><h3>Confirmed and included</h3><ul><li>Two moderated remote rounds with four different people in each round.</li><li>Eight participants total, managing or expecting to manage recurring medication.</li><li>The setup, daily schedule, dose-completion, and late-recovery scenarios.</li><li>The four observed usability issues and their design responses.</li><li>The 0-of-4 to 4-of-4 result for the primary completion interaction.</li></ul></article>
          <article><h3>Not added to the record</h3><ul><li>Participant names, detailed demographics, or individual profiles.</li><li>Verbatim participant quotations or session transcripts.</li><li>Per-participant task times, error counts, or assistance logs.</li><li>A System Usability Scale score or statistical significance.</li><li>Claims that the other three changes achieved a measured completion rate.</li></ul></article>
        </div>
      </section>

      <section className="forkast-report-next cura-report-next">
        <Head title="What I would validate next." copy="A future round would preserve the same core scenarios while recording the behavior consistently and testing Cura in the routines where medication decisions actually happen." />
        <ol><li><strong>Use one task protocol.</strong><span>Give every participant the same setup, due-dose, and late-recovery scenarios.</span></li><li><strong>Capture assistance and errors.</strong><span>Record when someone pauses, chooses the wrong control, or needs an explanation.</span></li><li><strong>Test the full state model.</strong><span>Confirm that upcoming, due, late, taken, and missed remain distinct across the day.</span></li><li><strong>Run a longer pilot.</strong><span>Study whether the interface still feels clear when routines change over several days.</span></li></ol>
      </section>

      <section className="visual-edit-close"><h2>Testing made the action visible.</h2><p>The strongest result was not a preference score. It was a behavior change: nobody found the hidden gesture in the first round, and every participant in the different second-round group completed the visible replacement correctly.</p></section>
    </main>
  </section>
}

export { ForkastVisualEdit, ForkastVisualProcess, ForkastTestingReport, CuraVisualEdit, CuraVisualProcess, CuraTestingReport }
