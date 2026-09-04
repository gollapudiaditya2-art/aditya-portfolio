import { PortfolioImage } from './PortfolioImage.jsx'
import { DiagramIcon } from './CaseStudyInfographics.jsx'

const F = '/assets/images/forkast/'

const roles = [
  ['user', 'Customer', 'Mobile', 'Scans QR, saves allergens, sees evidence', 'showcase/safe-menu.png'],
  ['waiter', 'Waiter', 'Floor tablet', 'Sees guest context and routes questions', 'showcase/waiter-dashboard.png'],
  ['chef', 'Chef', 'Escalation tablet', 'Resolves only the cases staff cannot answer', 'showcase/chef-escalations.png'],
  ['ticket', 'Line cook', 'Kitchen display', 'Receives an allergy flag on every prep ticket', 'showcase/kitchen-line.png'],
]

export function ForkastSystemAtGlance() {
  return <div className="forkast-glance" aria-label="Forkast four-role system at a glance">
    {roles.map(([icon, role, surface, copy, image]) => <article key={role}>
      <header><DiagramIcon name={icon} /><div><strong>{role}</strong><span>{surface}</span></div></header>
      <PortfolioImage src={`${F}${image}`} alt={`${role} interface in the Forkast system`} loading="lazy" decoding="async" />
      <p>{copy}</p>
    </article>)}
    <p className="forkast-glance-truth"><DiagramIcon name="database" /><span>Four views. One shared safety record.</span></p>
  </div>
}

const scale = [
  ['33M', 'Americans live with food allergies'],
  ['31%', 'of adult allergic reactions happen in restaurants'],
  ['70%', 'have experienced a reaction in a restaurant'],
  ['<15%', 'feel they can always communicate safely with staff'],
]

export function ForkastScaleGraphic() {
  return <div className="forkast-scale" aria-label="Scale of the restaurant allergy problem">
    {scale.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}
  </div>
}

export function ForkastCostMap() {
  const path = [
    ['30–60 min', 'Pre-visit research'],
    ['15 min', 'Allergy conversation'],
    ['94%', 'Staff lack adequate allergy knowledge'],
    ['50%+', 'Diners leave after an unsafe meal'],
  ]
  return <div className="forkast-cost-map" aria-label="Cost of verifying a restaurant meal">
    <div className="forkast-cost-path">{path.map(([value, label], index) => <article key={label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{value}</strong><p>{label}</p></article>)}</div>
    <div className="forkast-cost-breaks">
      <p><DiagramIcon name="search" /><span>Customers cannot verify safety fast enough to explore a menu.</span></p>
      <p><DiagramIcon name="waiter" /><span>Waiters become human translators during service.</span></p>
      <p><DiagramIcon name="ticket" /><span>Paper tickets go stale as ingredients and prep change.</span></p>
    </div>
  </div>
}

const researchSteps = [
  ['search', 'Secondary research', 'Find the scale and known failure points'],
  ['user', 'Customer interviews', 'Understand the cost of checking'],
  ['focus', 'Shadow observation', 'Compare reported and actual behavior'],
  ['menu', 'Competitive analysis', 'Map customer and restaurant gaps'],
  ['chef', 'Restaurant interviews', 'Pressure-test the service model'],
  ['database', 'Synthesis', 'Turn five clusters into criteria'],
]

export function ForkastResearchRoadmap() {
  return <ol className="forkast-roadmap" aria-label="Six-step Forkast research roadmap">
    {researchSteps.map(([icon, title, result], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><DiagramIcon name={icon} /><div><strong>{title}</strong><p>{result}</p></div>{index < researchSteps.length - 1 && <i aria-hidden="true">→</i>}</li>)}
  </ol>
}

export function ForkastVoicesAndObservation() {
  return <div className="forkast-voices">
    <div className="forkast-quote-pair" aria-label="Customer interview quotes">
      <blockquote>“Sometimes it is just not worth the hassle.”<cite>Customer interview · planned visits</cite></blockquote>
      <blockquote>“Sometimes I still feel anxious even after taking my medication.”<cite>Customer interview · daily allergy</cite></blockquote>
    </div>
    <div className="forkast-observation" aria-label="Shadow observation comparison">
      <div><span>What she said</span><strong>“I use my own knowledge and ask if I am unsure.”</strong></div>
      <i aria-hidden="true">≠</i>
      <div><span>What happened</span><strong>Planned visit: researched and controlled. Hungry walk-in: skipped checking and ate anyway.</strong></div>
      <p>The design problem is the hungry case, when verification feels harder than the risk feels immediate.</p>
    </div>
  </div>
}

const competitors = [
  ['Spokin', true, false, false],
  ['AllergyEats', true, false, false],
  ['EveryBite SmartMenu', true, 'Partial', false],
  ['Picknic', true, false, false],
  ['Toast / Square POS', false, true, false],
  ['Forkast', true, true, true],
]

export function ForkastCompetitiveMatrix() {
  return <table className="forkast-matrix" aria-label="Competitive landscape matrix">
    <thead><tr><th scope="col">Tool</th><th scope="col">Customer</th><th scope="col">Restaurant</th><th scope="col">Real-time sync</th></tr></thead>
    <tbody>{competitors.map(([name, customer, restaurant, sync]) => <tr className={name === 'Forkast' ? 'is-forkast' : undefined} key={name}>
      <th scope="row">{name}</th>{[customer, restaurant, sync].map((value, index) => <td key={index} aria-label={value === true ? 'Supported' : value || 'Not supported'}>{value === true ? '✓' : value || '×'}</td>)}
    </tr>)}</tbody>
  </table>
}

export function ForkastCustomerJourney() {
  const points = [[0,74],[14,48],[29,34],[39,112],[50,142],[61,118],[72,126],[84,92],[100,70]]
  return <div className="forkast-journey" role="img" aria-label="Customer emotional journey from restaurant search to leaving the meal">
    <svg viewBox="0 0 1000 210" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1="105" x2="1000" y2="105" />
      <polyline points={points.map(([x,y]) => `${x * 10},${y}`).join(' ')} />
      {points.map(([x,y], index) => <circle key={index} cx={x * 10} cy={y} r="5" />)}
    </svg>
    <div className="forkast-journey-labels"><span>Research</span><span>Arrive confident</span><span>Waiter verification</span><span>Anxiety</span><span>Medication workaround</span><span>Leave uncertain</span></div>
    <div className="forkast-journey-breaks"><p><strong>Break 01</strong> Information gap before the visit</p><p><strong>Break 02</strong> Hunger overrides verification</p><p><strong>Break 03</strong> Silent uncertainty after ordering</p></div>
  </div>
}

export function ForkastOperationsMap() {
  return <div className="forkast-operations" aria-label="Front and back of house allergy handling">
    <article><header><DiagramIcon name="waiter" /><div><strong>Front of house</strong><span>Waiter / manager</span></div></header><dl><div><dt>Reservation</dt><dd>Often no special instructions</dd></div><div><dt>Walk-in</dt><dd>Ask, verify, cross-contact at table</dd></div><div><dt>Cost</dt><dd>15 minutes per allergy conversation</dd></div></dl></article>
    <div className="forkast-operations-handoff"><span>Customer question</span><i>→</i><span>Verbal handoff</span><i>→</i><span>Kitchen answer</span></div>
    <article><header><DiagramIcon name="chef" /><div><strong>Back of house</strong><span>Kitchen / line</span></div></header><dl><div><dt>Volume</dt><dd>20–35 tickets during peak service</dd></div><div><dt>Format</dt><dd>Paper ticket and red bold allergen type</dd></div><div><dt>Failure</dt><dd>Chef changes create stale recipe knowledge</dd></div></dl></article>
  </div>
}

const clusters = [
  ['Verification cost', '30–60 minutes of research before eating'],
  ['Trust gap', 'Confidence changes with the person answering'],
  ['Time tax', 'Checking is slow enough to change behavior'],
  ['Information staleness', 'Paper tickets and memory cannot stay current'],
  ['Structural capacity', 'Small kitchens cannot absorb every escalation'],
]

export function ForkastInsightClusters() {
  return <div className="forkast-clusters" aria-label="Five research insight clusters">{clusters.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{copy}</p></article>)}</div>
}

const personas = [
  ['SM', 'Sarah', 'Independent diner', 'Customer', 'Fast, trustworthy answers without pre-visit research'],
  ['VK', 'Vanessa', 'Cautious diner', 'Customer', 'Clear Safe / Caution / Avoid evidence'],
  ['MT', 'Marcus', 'Shift manager', 'Restaurant', 'Resolve questions without leaving the floor'],
  ['MR', 'Morgan', 'Small-kitchen chef', 'Restaurant', 'Scannable allergen flags and honest capacity limits'],
]

export function ForkastPersonaMap() {
  return <div className="forkast-personas" aria-label="Four Forkast personas">{personas.map(([initials, name, type, side, need]) => <article key={name}><span>{initials}</span><div><strong>{name}</strong><small>{type} · {side}</small><p>{need}</p></div></article>)}</div>
}

const criteria = [
  ['Respect existing roles', 'Route through staff, not around them'],
  ['Reduce verification cost', 'Make checking faster than skipping'],
  ['Match kitchen reality', 'Use scannable signals during service'],
  ['Surface the right failure', 'Show when a safe answer is not possible'],
  ['Acknowledge limits', 'Never imply universal capacity'],
]

export function ForkastSuccessCriteria() {
  return <ol className="forkast-criteria" aria-label="Five Forkast design criteria">{criteria.map(([title, copy], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol>
}

export function ForkastRestaurantJourney() {
  const waiter = [[0,48],[18,28],[31,62],[45,78],[59,42],[74,38],[86,66],[100,43]]
  const chef = [[0,126],[22,124],[38,116],[52,92],[64,105],[77,130],[88,104],[100,112]]
  return <div className="forkast-restaurant-journey" role="img" aria-label="Waiter and chef journey during an allergy order">
    <svg viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
      <polyline className="waiter-line" points={waiter.map(([x,y]) => `${x * 10},${y}`).join(' ')} />
      <polyline className="chef-line" points={chef.map(([x,y]) => `${x * 10},${y}`).join(' ')} />
    </svg>
    <div className="forkast-journey-legend"><span>Waiter confidence</span><span>Chef capacity</span></div>
    <div className="forkast-journey-breaks"><p><strong>Pain point</strong> Modification approval is slow.</p><p><strong>Pain point</strong> Mid-service prep conflicts are hard to eliminate.</p><p><strong>System limit</strong> Small kitchens cannot promise every substitution.</p></div>
  </div>
}

export function ForkastOpportunityMap() {
  return <div className="forkast-opportunity" aria-label="Opportunity connecting customer and restaurant knowledge">
    <article><DiagramIcon name="user" /><strong>Customer’s phone</strong><p>What the diner knows is safe before walking in.</p></article>
    <div><span>Today</span><i>×</i><small>No connection</small><strong>Forkast</strong><i>↔</i><small>One shared data layer</small></div>
    <article><DiagramIcon name="chef" /><strong>Restaurant reality</strong><p>What the waiter, manager, line cook and chef know and can do.</p></article>
  </div>
}

const directions = [
  ['A', 'Customer-only allergy app', 'Rejected', 'Helpful discovery, but no restaurant integration or shared truth.'],
  ['B', 'Restaurant compliance tool', 'Rejected', 'Tracks allergens but leaves the customer outside the system.'],
  ['C', 'Two-sided system', 'Selected', 'Connects customer verification to live restaurant operations.'],
]

export function ForkastDirectionDecision() {
  return <div className="forkast-directions" aria-label="Three solution directions considered">{directions.map(([letter, title, status, copy]) => <article className={status === 'Selected' ? 'is-selected' : ''} key={letter}><span>{letter}</span><small>{status}</small><strong>{title}</strong><p>{copy}</p></article>)}</div>
}

const pivots = [
  ['Question routing', 'Direct diner-to-chef route', 'Waiter and manager first; chef only when needed'],
  ['Answer bank', 'Every question escalated', 'Approved answers become reusable service knowledge'],
  ['Capacity profile', 'One restaurant mode', 'Full-service, limited-substitution, or rejection-mode'],
]

export function ForkastResearchPivot() {
  return <div className="forkast-pivots" aria-label="What research changed in Forkast">{pivots.map(([title, before, after], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><div><small>Before</small><p>{before}</p><i>→</i><small>After</small><p>{after}</p></div></article>)}</div>
}

const findings = [
  ['Allergen labels felt detached from the dish', 'Move the allergen indicator onto the dish card', 'Faster confirmation'],
  ['“Ask the kitchen” felt like an end state', 'Turn it into a persistent pending action', 'Clear next step'],
  ['Question ownership was unclear', 'Show a visible waiter → chef route', 'Shared accountability'],
  ['Caution and Avoid looked too similar', 'Separate amber substitution from red rejection', 'Safer scanning'],
  ['Chef actions were hard to find', 'Prioritize approve, substitute, reject', 'Faster resolution'],
]

export function ForkastTestingFindings() {
  return <div className="forkast-testing-table" role="table" aria-label="Usability testing findings">
    <div className="forkast-testing-row forkast-testing-head" role="row"><span role="columnheader">Observed</span><span role="columnheader">Design response</span><span role="columnheader">Why it matters</span></div>
    {findings.map(([observed, response, impact], index) => <div className="forkast-testing-row" role="row" key={observed}><b aria-hidden="true">{String(index + 1).padStart(2, '0')}</b><p role="cell" data-label="Observed">{observed}</p><p role="cell" data-label="Design response">{response}</p><strong role="cell" data-label="Why it matters">{impact}</strong></div>)}
  </div>
}

const tradeoffs = [
  ['Chef routing', 'Route to waiter first; escalate only when needed', 'Direct diner-to-chef chat'],
  ['Allergen severity', 'Keep severity as restaurant-owned evidence', 'Customer-entered severity colors'],
  ['Honest rejection', 'Allow kitchens to say a dish cannot be made safe', 'Force every request into a substitution'],
]

export function ForkastTradeoffs() {
  return <div className="forkast-tradeoffs" aria-label="Forkast design trade-offs">{tradeoffs.map(([title, chosen, rejected], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><div><small>Chosen</small><p>{chosen}</p></div><div><small>Rejected</small><p>{rejected}</p></div></article>)}</div>
}

const outcomes = [
  ['2.5–4.5 hrs', 'Estimated waiter time recovered per shift'],
  ['Scenario 2 ↓', 'Hungry walk-in workaround reduced'],
  ['30 min → 90 sec', 'Estimated menu verification time'],
  ['−15–25%', 'Estimated reduction in reaction incidents'],
]

export function ForkastOutcomeEstimates() {
  return <div className="forkast-outcomes" aria-label="Projected Forkast outcomes">{outcomes.map(([value, label]) => <article key={value}><span>Projected</span><strong>{value}</strong><p>{label}</p></article>)}<p>Directional estimates from the case-study model, not measured product outcomes.</p></div>
}

export function ForkastLearningMap() {
  return <div className="forkast-learning">
    <div><h3>What I learned</h3><strong>Restaurant design is a systems problem before it is an interface problem.</strong><p>The most valuable finding came from watching one person do something she had not mentioned in an interview. Behavior changed the system more than another polished screen would have.</p></div>
    <ol><li><span>01</span><div><strong>Reservation-side capture</strong><p>Attach an allergen profile before arrival so the kitchen can prepare.</p></div></li><li><span>02</span><div><strong>Direct waiter calling</strong><p>Let a guest summon the floor team without bypassing service roles.</p></div></li><li><span>03</span><div><strong>Real restaurant pilot</strong><p>Validate adoption, saved-answer governance, and peak-service capacity.</p></div></li></ol>
  </div>
}
