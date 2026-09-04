const ICON_PATHS = {
  user: <><circle cx="12" cy="8" r="3.25"/><path d="M5.5 20c.45-4 2.7-6 6.5-6s6.05 2 6.5 6"/></>,
  waiter: <><circle cx="12" cy="7" r="3"/><path d="M6 20v-2.5c0-3.1 2.2-5.5 6-5.5s6 2.4 6 5.5V20M8 5.5h8M9 3.5h6"/></>,
  chef: <><path d="M7.5 9.5A3.5 3.5 0 0 1 9 3a3.6 3.6 0 0 1 6 0 3.5 3.5 0 0 1 1.5 6.5V12h-9V9.5Z"/><path d="M7.5 12h9v3.5c0 3-1.8 5-4.5 5s-4.5-2-4.5-5V12ZM9.5 16.5h5"/></>,
  menu: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  search: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/></>,
  shield: <><path d="M12 2.5 20 6v5.5c0 5-3.2 8.2-8 10-4.8-1.8-8-5-8-10V6l8-3.5Z"/><path d="m8.5 12 2.25 2.25L16 9"/></>,
  alert: <><path d="M12 3 22 20H2L12 3Z"/><path d="M12 9v5M12 17.5v.1"/></>,
  question: <><circle cx="12" cy="12" r="9"/><path d="M9.7 9a2.5 2.5 0 0 1 4.8 1c0 2-2.5 2-2.5 4M12 17.5v.1"/></>,
  ticket: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
  database: <><ellipse cx="12" cy="5.5" rx="7" ry="3"/><path d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></>,
  ear: <><path d="M14 20c-1.8 1.5-5 .5-5-2.4 0-2.6 3-3.5 3-6.1 0-1.6-1-2.5-2.4-2.5-1.8 0-3 1.5-3 3.5M5 8.5C5 4.9 7.8 2.5 11.5 2.5c4.6 0 7.5 3.2 7.5 7.5 0 5.1-3.2 5.6-4.2 8"/><path d="M12 6.5c2.2 0 3.5 1.5 3.5 3.4 0 2.4-2.1 3.1-2.6 5.1"/></>,
  sound: <><path d="M4 10h4l5-4v12l-5-4H4v-4Z"/><path d="M16 9c1.4 1.5 1.4 4.5 0 6M19 6.5c3 3 3 8 0 11"/></>,
  focus: <><circle cx="12" cy="12" r="3"/><path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4"/></>,
  touch: <><path d="M9 12V6a2 2 0 1 1 4 0v5-2a2 2 0 1 1 4 0v5.5c0 4-2.4 6.5-6 6.5-2.8 0-4.7-1.6-6-4l-1.5-3a1.8 1.8 0 0 1 3.2-1.6L9 15"/></>,
  light: <><circle cx="12" cy="10" r="5"/><path d="M9 17h6M10 21h4M12 2V1M4.2 4.2l-.8-.8M19.8 4.2l.8-.8M4 10H2M22 10h-2"/></>,
  ring: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></>,
  battery: <><rect x="4" y="7" width="15" height="10" rx="2"/><path d="M19 10h2v4h-2M8 10v4M12 10v4M16 10v4"/></>,
  palette: <><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h3a6 6 0 0 0 6-6c0-2.2-3.8-4-9-4Z"/><circle cx="7.5" cy="8" r="1"/><circle cx="11" cy="6.5" r="1"/><circle cx="15" cy="7" r="1"/></>,
  prototype: <><path d="M4 20h16M6 20v-7l6-9 6 9v7M8 13h8M12 4v16"/></>,
}

export function DiagramIcon({ name, label }) {
  return <span className="diagram-icon" role={label ? 'img' : undefined} aria-label={label}><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICON_PATHS[name]}</svg></span>
}

const riskStates = [
  { state: 'Safe', tone: 'safe', icon: 'shield', signals: ['No profile conflict', 'Evidence checked', 'Order unlocked'] },
  { state: 'Caution', tone: 'caution', icon: 'alert', signals: ['Possible cross-contact', 'Substitution available', 'Review required'] },
  { state: 'Avoid', tone: 'avoid', icon: 'alert', signals: ['Known allergen', 'Unsafe preparation', 'Order blocked'] },
]

export function ForkastRiskModel() {
  return <div className="risk-model" aria-label="Forkast three-state safety model">{riskStates.map((item) => <article className={`risk-state risk-state--${item.tone}`} key={item.state}><header><DiagramIcon name={item.icon} /><h3>{item.state}</h3></header><ul>{item.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul></article>)}</div>
}

const IA_BRANCHES = [
  { role: 'Diner app', icon: 'user', groups: [['Profile', 'Allergens · saved profile'], ['Menu', 'Search · filters · categories'], ['Dish', 'Verdict · evidence · substitution'], ['Questions', 'Templates · custom · answer status'], ['Order', 'Review · confirm']] },
  { role: 'Server dashboard', icon: 'waiter', groups: [['Service', 'Tables · covers · alerts'], ['Guests', 'Profiles · order state'], ['Questions', 'Open · answered · follow-up'], ['Handoff', 'Send to chef · return answer']] },
  { role: 'Kitchen line', icon: 'ticket', groups: [['Tickets', 'Allergy flag · station'], ['Protocol', 'Surface · oil · utensils'], ['Preparation', 'Acknowledge · complete']] },
  { role: 'Chef console', icon: 'chef', groups: [['Escalations', 'Queue · urgency · table'], ['Evidence', 'Recipe · station · cross-contact'], ['Decision', 'Approve · substitute · reject'], ['Knowledge', 'Answer bank · decision log']] },
]

export function ForkastInformationArchitecture() {
  return <div className="ia-map" aria-label="Forkast information architecture">
    <div className="ia-root"><DiagramIcon name="database" /><div><strong>Shared safety layer</strong><span>Diner profile · dish matrix · answer bank · order state</span></div></div>
    <div className="ia-trunk" aria-hidden="true" />
    <div className="ia-branches">{IA_BRANCHES.map((branch) => <section key={branch.role}><header><DiagramIcon name={branch.icon} /><h3>{branch.role}</h3></header><div className="ia-group-list">{branch.groups.map(([title, items]) => <div key={title}><strong>{title}</strong><span>{items}</span></div>)}</div></section>)}</div>
  </div>
}

function Flow({ title, icon, steps, branch }) {
  return <article className="user-flow"><header><DiagramIcon name={icon} /><h3>{title}</h3></header><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong>{index < steps.length - 1 ? <i aria-hidden="true">→</i> : null}</li>)}</ol>{branch ? <p className="flow-branch"><DiagramIcon name="alert" /><span>{branch}</span></p> : null}</article>
}

export function ForkastUserFlows() {
  return <div className="flow-stack">
    <Flow title="Flow 1 · Customer finds and orders a safe dish" icon="user" steps={['Set allergy profile', 'Open restaurant menu', 'Filter by verdict', 'Review dish evidence', 'Confirm safe order']} branch="Caution routes to substitution or a question. Avoid keeps ordering locked." />
    <Flow title="Flow 2 · Chef resolves an allergy risk" icon="chef" steps={['Open escalation queue', 'Inspect recipe and station', 'Check cross-contact points', 'Approve, substitute, or reject', 'Publish decision to service']} branch="The decision also updates the kitchen ticket and reusable answer bank." />
    <EscalationFlow />
  </div>
}

function EscalationFlow() {
  const lanes = [['Customer', 'user'], ['Waiter', 'waiter'], ['Chef', 'chef']]
  const sequence = [
    ['Customer', 'Ask about shared preparation'],
    ['Waiter', 'Capture table, dish, and question'],
    ['Customer', 'See pending status'],
    ['Waiter', 'Escalate the full question'],
    ['Chef', 'Inspect recipe and station'],
    ['Chef', 'Set verdict and explanation'],
    ['Waiter', 'Relay answer without paraphrasing'],
    ['Customer', 'Receive evidence-backed answer'],
  ]
  return <article className="swimlane-flow"><header><DiagramIcon name="question" /><h3>Flow 3 · Customer question → waiter → chef → customer</h3><span className="swimlane-hint">Swipe →</span></header><div className="swimlane-timeline" role="region" aria-label="Scrollable customer, waiter, and chef flow" tabIndex={0}>{lanes.map(([role, icon]) => <section className="swim-lane" key={role}><h4><DiagramIcon name={icon} />{role}</h4><div className="swim-track">{sequence.map(([owner, step], index) => owner === role ? <div className="swim-event" key={step}><span>{index + 1}</span><strong>{step}</strong></div> : <i aria-hidden="true" key={`${role}-${index}`} />)}</div></section>)}</div><div className="swimlane-route" aria-hidden="true"><span>Question travels in full</span><i>→</i><span>Decision returns with evidence</span></div></article>
}

const AURIO_RESEARCH = [
  { icon: 'sound', situation: 'Noisy social space', friction: 'Speech competes with the room', response: 'Focused listening mode' },
  { icon: 'ear', situation: 'Visible assistance', friction: 'Clinical products invite concealment', response: 'Expressive open-worn form' },
  { icon: 'touch', situation: 'Attention shifts', friction: 'Phone controls interrupt conversation', response: 'Direct tactile control' },
]

export function AurioResearchGraphic() {
  return <div className="aurio-research-map" aria-label="Aurio research synthesis">{AURIO_RESEARCH.map((item) => <article key={item.situation}><DiagramIcon name={item.icon} /><div className="aurio-research-chain"><span>{item.situation}</span><i aria-hidden="true">→</i><strong>{item.friction}</strong><i aria-hidden="true">→</i><em>{item.response}</em></div></article>)}</div>
}

export function AurioBenchmarkMap() {
  return <div className="benchmark-map" role="img" aria-label="Market map positioning Aurio between hearing support and lifestyle expression">
    <span className="axis axis--top">Hearing support</span><span className="axis axis--bottom">General audio</span><span className="axis axis--left">Clinical</span><span className="axis axis--right">Lifestyle</span>
    <div className="benchmark-point benchmark-point--aid"><DiagramIcon name="ear" /><b>Hearing aids</b></div>
    <div className="benchmark-point benchmark-point--hearable"><DiagramIcon name="sound" /><b>Hearables</b></div>
    <div className="benchmark-point benchmark-point--earbud"><DiagramIcon name="sound" /><b>Earbuds</b></div>
    <div className="benchmark-point benchmark-point--aurio"><DiagramIcon name="ring" /><b>Aurio</b><span>Support + expression</span></div>
  </div>
}

const criteria = [
  ['ear', 'Comfort'], ['ring', 'Visibility'], ['palette', 'Expression'], ['focus', 'Attention'],
  ['touch', 'Control'], ['light', 'Feedback'], ['battery', 'Daily use'], ['shield', 'Confidence'],
]

export function AurioCriteriaGraphic() {
  return <div className="criteria-orbit" aria-label="Eight Aurio design criteria"><div className="criteria-core"><DiagramIcon name="ring" /><strong>Aurio</strong><span>Open-worn support</span></div>{criteria.map(([icon, label], index) => <div className={`criterion criterion--${index + 1}`} key={label}><DiagramIcon name={icon} /><span>{label}</span></div>)}</div>
}

export function AurioDevelopmentGraphic() {
  const phases = [
    ['prototype', 'Sketch field', 'Find distinct directions'],
    ['ring', 'Foam families', 'Test size and silhouette'],
    ['ear', 'Wear rounds', 'Check fit and social legibility'],
    ['touch', 'Control studies', 'Refine tactile certainty'],
    ['palette', 'CMF system', 'Build personal choice'],
    ['shield', 'Resolved product', 'Unify form, feedback, and use'],
  ]
  return <ol className="development-funnel">{phases.map(([icon, title, result], index) => <li key={title}><span className="development-index">{String(index + 1).padStart(2, '0')}</span><DiagramIcon name={icon} /><div><strong>{title}</strong><small>{result}</small></div>{index < phases.length - 1 ? <i aria-hidden="true">→</i> : null}</li>)}</ol>
}

export function AurioUseFlows() {
  return <div className="aurio-use-flows">
    <Flow title="Flow 1 · Put on and begin listening" icon="ear" steps={['Open charging case', 'Fit ring around ear', 'Power on', 'Receive ready feedback']} />
    <Flow title="Flow 2 · Focus during conversation" icon="focus" steps={['Speech begins', 'Light and haptic cue', 'Shift listening focus', 'Continue conversation']} />
    <Flow title="Flow 3 · Adjust without a phone" icon="touch" steps={['Find tactile control', 'Tap or press', 'Feel confirmation', 'Mode changes']} />
  </div>
}

const COMPONENTS = [
  ['ring', 'Ring frame', 'Die-cast aluminium · recognizable structure'],
  ['battery', 'Battery shell', 'Injection-molded PC + ABS · daily power'],
  ['light', 'OLED feedback', 'Frosted window · visible system state'],
  ['touch', 'Tactile control', 'Two direct zones · screen-free action'],
  ['palette', 'CMF family', 'Six finishes · personal choice'],
]

export function AurioProductArchitecture() {
  return <div className="product-architecture" aria-label="Aurio product architecture"><div className="product-architecture-core"><DiagramIcon name="ring" /><strong>Complete wearable</strong></div><div className="product-component-list">{COMPONENTS.map(([icon, title, detail]) => <article key={title}><DiagramIcon name={icon} /><div><strong>{title}</strong><span>{detail}</span></div></article>)}</div></div>
}
