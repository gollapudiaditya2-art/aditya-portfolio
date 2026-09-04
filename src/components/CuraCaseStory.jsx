import { useState } from 'react'
import { PortfolioImage } from './PortfolioImage.jsx'

const researchMethods = [
  ['18', 'Survey responses', 'Medication habits, reminder use, and routine changes'],
  ['5', 'Interviews', 'Failure moments, coping behavior, and caregiver friction'],
  ['2', 'Testing rounds', 'Four participants in each moderated round'],
  ['4', 'Research lenses', 'Literature, survey, interviews, and market review'],
]

const surveyStats = [
  ['88.9%', '16 of 18 participants reported taking regular medication.'],
  ['72.2%', '13 of 18 did not use a reminder application.'],
  ['16.7%', '3 of 18 used only a pill organizer.'],
]

const affinityThemes = [
  ['Routine disruption', ['A new medication breaks an established habit', 'Travel changes the expected schedule', 'Doctor-led timing changes are easy to forget']],
  ['Mental load', ['Several medications are difficult to juggle', 'Older adults can lose track of what is current', 'Repeated decisions add effort']],
  ['Reminder fatigue', ['Too many alerts become background noise', 'Exact-time alarms do not match daily life', 'Dismissed reminders offer no recovery path']],
  ['Caregiver friction', ['Small delays can create unnecessary worry', 'Constant visibility can feel intrusive', 'Support needs clear boundaries']],
  ['Trust and visibility', ['People need to know whether a dose was logged', 'History should explain what happened', 'State changes must be visible']],
  ['Recovery after delay', ['Late-dose uncertainty causes anxiety', 'A missed action needs a clear next step', 'The interface should avoid guilt']],
  ['Setup friction', ['Too many fields appear at once', 'Medical language increases effort', 'Adding a changed prescription should be quick']],
]

const rawNotes = affinityThemes.flatMap(([theme, notes]) => notes.map((note) => ({ theme, note })))

const primaryPersona = {
  name: 'Ananya R.',
  descriptor: 'Independent routine manager · 34',
  about: 'Ananya manages recurring medication around a busy, changing day. Her established routine usually works, but a new prescription or unexpected schedule change makes it easy to lose track.',
  needs: ['A clear view of what is due now', 'Fast updates when medication changes', 'A recovery path after a late reminder'],
  wants: ['To stay independent', 'To avoid feeling judged by the interface', 'To reassure family without constant monitoring'],
  painPoints: ['Exact-time alarms conflict with real routines', 'New tablets interrupt established habits', 'Existing tools make changes feel complicated'],
  empathy: [
    ['Says', '“Adding a new tablet throws my whole morning off.”'],
    ['Does', 'Uses phone alarms and relies on an established daily sequence.'],
    ['Hears', 'Instructions from a doctor and occasional check-ins from family.'],
    ['Thinks', 'Did I already take this, and is it too late now?'],
    ['Sees', 'Several medicines, changing instructions, and alerts competing for attention.'],
  ],
}

const journey = [
  ['Wake up', 'Calm', 34],
  ['Morning dose', 'Confident', 18],
  ['Routine break', 'Confused', 56],
  ['Missed alarm', 'Frustrated', 78],
  ['Late dose?', 'Anxious', 90],
  ['Recovery', 'Unsure', 50],
  ['Caregiver alert', 'Embarrassed', 70],
  ['Evening dose', 'Relieved', 18],
]

const flowSteps = [
  ['Add medication', ['Choose input method', 'Enter medication details', 'Set routine and reminders', 'Review and save']],
  ['Complete a dose', ['See what is due', 'Open reminder', 'Taken, snooze, or skip', 'Confirm shared status']],
]

const iaColumns = [
  ['Home', ['Today', 'Time windows', 'Dose status']],
  ['Medications', ['Medication list', 'Add medication', 'Schedule']],
  ['Family', ['Consent', 'Members', 'Meaningful alerts']],
  ['Settings', ['Notifications', 'Quiet hours', 'Profile']],
]

const wireframes = [
  ['iPhone 16 Pro - 46.png', 'Onboarding'],
  ['iPhone 16 Pro - 58.png', 'Time-window settings'],
  ['iPhone 16 Pro - 65.png', 'Add entry'],
  ['iPhone 16 Pro - 59.png', 'Medication form'],
  ['iPhone 16 Pro - 64.png', 'Repeat logic'],
  ['iPhone 16 Pro - 47.png', 'Daily schedule'],
  ['iPhone 16 Pro - 63.png', 'Dose confirmation'],
  ['iPhone 16 Pro - 61.png', 'Caregiver concept'],
  ['iPhone 16 Pro - 62.png', 'Family view'],
]

const states = [
  ['Upcoming', 'Visible before the routine window'],
  ['Due', 'Direct action inside the intended window'],
  ['Late', 'Recovery remains possible'],
  ['Taken', 'Dose confirmed and resolved'],
  ['Missed', 'Recovery period closed'],
]

const stateDemo = {
  Upcoming: { file: 'Group 153.png', alt: 'Cura daily schedule showing morning medications not yet due', note: 'Nothing interrupts yet, the dose only shows up in the daily schedule.' },
  Due: { file: 'Group 163.png', alt: 'Cura reminder due now with Taken, Snooze, and Skip actions', note: '“Due now, 1hr 19m left.” Taken, Snooze, and Skip stay one tap away.' },
  Late: { file: 'Group 162.png', alt: 'Time-sensitive Cura reminder showing a dose is still pending but recoverable', note: '“Still pending. You can still take it before 12:00 PM.” Recovery is still open.' },
  Taken: { file: 'Group 154.png', alt: 'Cura daily schedule with two medications marked taken and one missed', note: 'Confirmed and resolved, marked directly in the same schedule.' },
  Missed: { file: 'Group 160.png', alt: 'Cura notification alerting a caregiver that a dose may have been missed', note: 'Recovery closes: only now does a caregiver hear about it.' },
}

const testingFindings = [
  ['Calendar progress bars were not understood without explanation.', 'Removed the bars and moved completion feedback beside each medication.', 'The final screen no longer asks people to decode an unexplained calendar signal.'],
  ['Nobody discovered swipe-to-complete without instruction.', 'Replaced the hidden swipe gesture with a visible tap control.', 'All four participants in the next round completed the interaction correctly.'],
  ['Morning, afternoon, and evening tabs were mistaken for filters.', 'Increased their size and contrast while preserving time windows.', 'The final control gives each time window stronger navigational emphasis.'],
  ['Separate Add and Scan actions created hesitation.', 'Kept one Add entry point and placed Scan inside the flow.', 'The entry point now asks for one decision before showing input methods.'],
]

function StoryHeading({ id, title, children }) {
  return <div className="cura-story-heading"><h3 id={id}>{title}</h3><p>{children}</p></div>
}

export function ResearchPlan() {
  return (
    <div className="cura-research-block cura-plan">
      <StoryHeading title="The plan followed behavior from context to validation.">
        The work moved from broad context into direct conversations, synthesis, structure, and two rounds of prototype testing.
      </StoryHeading>
      <div className="cura-plan-layout">
        <div className="cura-plan-counts">
          {researchMethods.map(([value, label, detail]) => <article key={label}><strong>{value}</strong><div><h4>{label}</h4><p>{detail}</p></div></article>)}
        </div>
        <div className="cura-plan-orbit" role="img" aria-label="Research moved inward from secondary research to survey, interviews, synthesis, and prototype testing">
          <div className="orbit orbit-4"><span>Context</span></div>
          <div className="orbit orbit-3"><span>Survey</span></div>
          <div className="orbit orbit-2"><span>Interviews</span></div>
          <div className="orbit orbit-1"><span>Synthesis</span></div>
          <div className="orbit-core">Test</div>
        </div>
      </div>
    </div>
  )
}

export function MainInsight() {
  return (
    <figure className="cura-main-insight">
      <PortfolioImage src="/assets/images/cura/iPhone 16 Pro.png" loading="lazy" decoding="async" alt="Cura medication experience shown in context on a phone" />
      <figcaption>
        <h3>Main insight from research</h3>
        <blockquote>Medication adherence breaks when routines change, not simply because people forget.</blockquote>
      </figcaption>
    </figure>
  )
}

export function RawEvidence() {
  return (
    <div className="cura-research-block cura-raw-evidence">
      <StoryHeading title="The raw evidence stayed visible behind the synthesis.">
        Survey patterns and interview fragments were kept separate before they were grouped into seven themes.
      </StoryHeading>
      <div className="cura-raw-wall">
        {rawNotes.map(({ theme, note }, index) => <article key={`${theme}-${note}`} className={index % 4 === 0 ? 'is-emphasis' : ''}><p>{note}</p><span>{theme}</span></article>)}
        <div className="cura-raw-summary"><strong>18 + 5</strong><span>survey responses and interviews</span><small>grouped into seven behavioral themes</small></div>
      </div>
      <div className="cura-survey-evidence" aria-label="Selected survey findings">
        {surveyStats.map(([value, finding]) => <article key={value}><strong>{value}</strong><p>{finding}</p></article>)}
      </div>
    </div>
  )
}

export function ConceptModel() {
  return (
    <div className="cura-research-block cura-concept">
      <StoryHeading title="The concept was remodeled around bounded support.">
        Research narrowed the system to one person maintaining a routine and one supporter who is involved only when the situation meaningfully changes.
      </StoryHeading>
      <div className="cura-concept-model">
        <article>
          <PortfolioImage src="/assets/images/cura/Hand and iPhone 16 Pro-!.png" loading="lazy" decoding="async" alt="Person using the Cura medication schedule" />
          <div><span>Primary user</span><h4>Independent routine</h4><p>Flexible time windows and clear recovery keep control with the person taking medication.</p></div>
        </article>
        <div className="cura-concept-bridge"><strong>Shared dose state</strong><span>Upcoming · Due · Late · Taken · Missed</span></div>
        <article>
          <PortfolioImage src="/assets/images/cura/iPhone 16 Pro - 51.png" loading="lazy" decoding="async" alt="Cura family-support setup screen" />
          <div><span>Support layer</span><h4>Meaningful exceptions</h4><p>Explicit consent and delayed escalation reduce monitoring pressure and notification fatigue.</p></div>
        </article>
      </div>
    </div>
  )
}

export function ProblemStatement() {
  return (
    <div className="cura-problem-statement">
      <h3>Post-research problem statement</h3>
      <p>How might we help people maintain medication routines through everyday change, recover confidently after a delay, and involve caregivers only when support is genuinely needed?</p>
    </div>
  )
}

export function Persona() {
  return (
    <div className="cura-research-block cura-persona">
      <StoryHeading title="One primary persona held the design decisions together.">
        Ananya is a composite archetype drawn from recurring research patterns, not a representation of one named participant.
      </StoryHeading>
      <div className="cura-persona-composition">
        <article className="cura-persona-profile">
          <header><div className="cura-persona-monogram" aria-hidden="true">AR</div><div><h4>{primaryPersona.name}</h4><p>{primaryPersona.descriptor}</p></div></header>
          <section><h5>About</h5><p>{primaryPersona.about}</p></section>
          <div className="cura-persona-columns">
            <section><h5>Needs</h5><ul>{primaryPersona.needs.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section><h5>Wants</h5><ul>{primaryPersona.wants.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
          <section><h5>Pain points</h5><ul>{primaryPersona.painPoints.map((item) => <li key={item}>{item}</li>)}</ul></section>
        </article>
        <div className="cura-empathy-map">
          {primaryPersona.empathy.map(([label, copy]) => <article key={label}><h5>{label}</h5><p>{copy}</p></article>)}
          <div className="cura-empathy-core"><span>Routine</span><strong>Trust</strong><span>Recovery</span></div>
        </div>
      </div>
    </div>
  )
}

export function Journey() {
  const points = journey.map(([, , value], index) => `${(index / (journey.length - 1)) * 100},${value}`).join(' ')
  return (
    <div className="cura-research-block cura-journey-native">
      <StoryHeading title="A routine break revealed the emotional cost of uncertainty.">
        The representative scenario maps where confidence falls after a dismissed alarm and rises only when the system offers a clear recovery path.
      </StoryHeading>
      <div className="cura-journey-plot">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="0" y1="54" x2="100" y2="54" /><polyline points={points} /></svg>
        <ol>{journey.map(([moment, emotion, value], index) => <li key={moment} style={{ '--journey-x': `${(index / (journey.length - 1)) * 100}%`, '--journey-y': `${value}%` }}><span></span><strong>{emotion}</strong><p>{moment}</p></li>)}</ol>
      </div>
    </div>
  )
}

function Research() {
  return (
    <section className="cura-story-section cura-research-chapter" id="cura-research" aria-label="Research">
      <ResearchPlan />
      <MainInsight />
      <RawEvidence />
      <ConceptModel />
      <ProblemStatement />
      <Persona />
      <Journey />
    </section>
  )
}

export function VisualStyle() {
  return (
    <div className="cura-development-block cura-visual-style">
      <StoryHeading title="The visual language is calm, direct, and reassuring.">
        Cura uses one strong blue for action, pale blue for orientation, generous white space, and plain language so medication status remains the focus.
      </StoryHeading>
      <div className="cura-style-board">
        <div className="cura-swatches" aria-label="Cura color palette">
          {[['Action blue', '#0759c7'], ['Soft blue', '#dce9f8'], ['Canvas', '#f3f7fd'], ['Ink', '#25292e']].map(([label, color]) => <div key={label}><span style={{ background: color }}></span><p>{label}<small>{color}</small></p></div>)}
        </div>
        <div className="cura-type-sample"><span>Space Grotesk</span><strong>Aa</strong><p>Clear hierarchy, open forms, and readable interface labels.</p></div>
        <div className="cura-style-principles">{['Routine first', 'One clear action', 'Visible status', 'Support without pressure'].map((item, index) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div>
      </div>
    </div>
  )
}

export function UserFlows() {
  return (
    <div className="cura-development-block cura-flows">
      <StoryHeading title="Two flows carry the core experience.">
        One sets up a medication without exposing the entire task at once. The other moves a dose from reminder to a shared, resolved status.
      </StoryHeading>
      <div className="cura-flow-list">
        {flowSteps.map(([title, steps]) => <article key={title}><h4>{title}</h4><ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></article>)}
      </div>
    </div>
  )
}

export function InformationArchitecture() {
  return (
    <div className="cura-development-block cura-ia">
      <StoryHeading title="The information architecture follows four familiar destinations.">
        Daily action stays in Home, medication management has its own space, family support remains bounded, and notification behavior stays in Settings.
      </StoryHeading>
      <div className="cura-ia-tree">
        <div className="cura-ia-root">Cura</div>
        <div className="cura-ia-branches">{iaColumns.map(([title, items]) => <article key={title}><h4>{title}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </div>
    </div>
  )
}

export function Wireframes() {
  return (
    <div className="cura-development-block cura-wireframes">
      <StoryHeading title="The full wireframe set connected setup, action, and support.">
        Low-fidelity screens established navigation, scheduling, dose actions, and family visibility before visual polish.
      </StoryHeading>
      <div className="cura-wireframe-grid">
        {wireframes.map(([file, label]) => <figure key={file}><PortfolioImage src={`/assets/images/cura/${file}`} loading="lazy" decoding="async" alt={`Cura wireframe for ${label.toLowerCase()}`} /><figcaption>{label}</figcaption></figure>)}
      </div>
    </div>
  )
}

export function StateModel() {
  const [active, setActive] = useState(states[0][0])
  const demo = stateDemo[active]
  return (
    <div className="cura-development-block cura-state-section">
      <StoryHeading title="Five states keep every screen consistent.">
        Click a state to see the real screen behind it. The daily schedule, reminders, history, and caregiver view all read from the same dose status.
      </StoryHeading>
      <ol className="cura-state-model">
        {states.map(([state, description], index) => (
          <li key={state} className={state === active ? 'is-active' : ''}>
            <button type="button" onClick={() => setActive(state)} aria-pressed={state === active}>
              <span>{index + 1}</span>
              <h4>{state}</h4>
              <p>{description}</p>
            </button>
          </li>
        ))}
      </ol>
      <figure className="cura-state-screens" key={demo.file}>
        <PortfolioImage src={`/assets/images/cura/${demo.file}`} loading="lazy" decoding="async" alt={demo.alt} />
        <figcaption>{demo.note}</figcaption>
      </figure>
    </div>
  )
}

function Development() {
  return (
    <section className="cura-story-section cura-development-chapter" id="cura-development" aria-label="Development">
      <VisualStyle />
      <UserFlows />
      <InformationArchitecture />
      <Wireframes />
      <StateModel />
    </section>
  )
}

export function Testing({ showIterations = true }) {
  return (
    <section className="cura-story-section cura-testing" id="cura-testing" aria-label="Testing">
      {showIterations ? <><div className="cura-before-after">
        <div className="cura-before-after-copy"><h3>The daily schedule became easier to read and act on.</h3><p>Progress bars were removed, the hidden swipe interaction became a visible tap control, and the time-window tabs gained stronger presence.</p></div>
        <figure><span>Before</span><PortfolioImage src="/assets/images/cura/Before.png" loading="lazy" decoding="async" alt="Cura daily schedule before usability-testing changes" /></figure>
        <figure><span>After</span><PortfolioImage src="/assets/images/cura/After.png" loading="lazy" decoding="async" alt="Cura daily schedule after usability-testing changes" /></figure>
      </div>
      <div className="cura-form-iteration">
        <div><h3>Medication entry changed from one long form to two focused forms.</h3><p>The task was divided so users no longer had to process all medication and scheduling fields at the same time.</p></div>
        <figure><PortfolioImage src="/assets/images/cura/iPhone 16 Pro - 59.png" loading="lazy" decoding="async" alt="Original Cura medication form with all fields combined" /><figcaption>Before · one continuous form</figcaption></figure>
        <ol><li><span>01</span><strong>Medication details</strong><p>Complete the first focused part of setup.</p></li><li><span>02</span><strong>Routine details</strong><p>Continue to the remaining schedule information.</p></li></ol>
      </div>
      </> : null}
      <table className="cura-testing-table" aria-label="Cura usability findings and design changes">
        <thead><tr><th scope="col">Observed</th><th scope="col">Changed</th><th scope="col">Result</th></tr></thead>
        <tbody>{testingFindings.map(([observation, change, result]) => <tr key={observation}><th scope="row" data-label="Observed">{observation}</th><td data-label="Changed">{change}</td><td data-label="Result">{result}</td></tr>)}</tbody>
      </table>
    </section>
  )
}

export function CuraCaseStory() {
  return <div className="cura-story"><Research /><Development /><Testing /></div>
}
