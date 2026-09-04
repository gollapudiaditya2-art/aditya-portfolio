import { projectDeepDives } from './projectDeepDives.js'
import { CaseProgressNav } from '../components/CaseProgressNav.jsx'
import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { routePath } from '../routes.js'
import { ArrowIcon } from '../design-system/index.js'

const projects = {
  aurio: {
    id: 'aurio', parent: 'id-index', parentLabel: 'Industrial Design', title: 'Aurio',
    subtitle: 'Lifestyle hearing support for young adults.',
    intro: 'A hearing wearable designed to feel expressive, socially legible, and easy to use when listening becomes difficult.',
    accent: '#b95636',
    heroVisual: { src: 'assets/images/aurio/Untitled (1) 1.jpg', label: 'Aurio final product system', alt: 'Two resolved Aurio hearing-support devices shown together in a studio render' },
    overviewVisual: { src: 'assets/images/aurio/Untitled6 (1) 1.jpg', label: 'Aurio color and form system', alt: 'Six Aurio hearing-support devices showing the final ring form and color options' },
    quick: [
      ['What', 'A lifestyle hearing-support wearable with direct controls, focus feedback, six colorways, and a charging case.'],
      ['Why', 'Young adults experience difficult listening situations but often reject hearing aids that feel clinical, hidden, or stigmatizing.'],
      ['Who', 'Young adults who struggle in noisy, outdoor, moving, or social environments and want support that fits their identity.'],
      ['How', 'Research and benchmarking led to broad sketch exploration, foam models, two testing rounds, CAD, prototyping, CMF, and material resolution.'],
    ],
    meta: [['Type', 'Hearing wearable'], ['Role', 'Sole designer'], ['Focus', 'Research to prototype'], ['Materials', 'PC + ABS · aluminium · OLED']],
    overview: [
      ['Problem', 'Young adults may need hearing support but reject products that feel clinical or stigmatizing.'],
      ['Insight', 'Visibility can communicate confidence and invite better social interaction.'],
      ['Solution', 'An open-worn hearing device with physical control, focus feedback, and six expressive finishes.'],
    ],
    evidenceTitle: 'Need was not the only barrier.',
    evidenceIntro: 'Research showed a gap between hearing difficulty and willingness to wear a conventional aid.',
    evidence: [['14.1%', 'of adults aged 20 to 69 experience speech-frequency hearing impairment.'], ['1 in 5', 'young adults show signs associated with noise-induced hearing loss.'], ['16%', 'of people who could benefit have ever used a hearing aid.']],
    insight: 'The device should not disappear. It should make support understandable, wearable, and socially comfortable.',
    processTitle: 'From many forms to one clear signal.',
    process: [['Concept exploration', 'Early hearing-device sketches'], ['Form studies', 'Foam models on ear'], ['Wear testing', 'Prototype fit and comfort'], ['Refinement', 'Final CAD development']],
    solutionTitle: 'Support that communicates.',
    features: [
      ['Ring frame', 'A recognizable form that reads more like personal audio than medical equipment.'],
      ['Focus mode', 'LED and vibration feedback help the wearer notice when someone begins speaking.'],
      ['Direct control', 'A tactile tap bar keeps important actions immediate and screen-free.'],
      ['Personal choice', 'Six colorways let the product fit the wearer instead of asking the wearer to hide it.'],
    ],
    flowTitle: 'One device, three everyday moments.',
    flow: [['Wear', 'Put it on as part of an everyday audio routine.'], ['Notice', 'Light and haptic feedback signal that attention is needed.'], ['Respond', 'Use the physical control to shift focus without reaching for a phone.']],
    detailTitle: 'Designed as a complete product system.',
    detailVisual: { src: 'assets/images/aurio/Untitled2 2.jpg', label: 'Aurio component profile', alt: 'Side render showing the Aurio aluminium ring, battery body, and orange tactile control' },
    details: [['Battery shell', 'Injection-molded PC + ABS'], ['Ring frame', 'Die-cast aluminium'], ['Display', 'OLED behind frosted glass'], ['Use context', 'Wind and moisture resistance']],
    closingTitle: 'What the project demonstrates',
    closing: 'Aurio reframes assistive hearing technology as confident lifestyle hardware. The next step is testing the acoustic package and long-duration comfort with more wearers.',
  },
  bastion: {
    id: 'bastion', parent: 'id-index', parentLabel: 'Industrial Design', title: 'Bastion',
    subtitle: 'One smart door system instead of a stack of devices.',
    intro: 'A connected door handle combining access, monitoring, communication, and a physical-key fallback in one familiar object.',
    accent: '#526050',
    heroVisual: { src: 'assets/images/bastion/new6 1.jpg', label: 'Bastion installed', alt: 'Bastion smart door handle installed on a dark wood interior door' },
    overviewVisual: { src: 'assets/images/bastion/new1 1.jpg', label: 'Complete front and rear system', alt: 'Front and rear Bastion smart door hardware displayed together on white plinths' },
    quick: [
      ['What', 'An integrated smart-door handle combining a camera, doorbell, motion sensing, smart lock, physical key, and companion app.'],
      ['Why', 'The front door has become a cluttered stack of separate security devices, batteries, keys, and disconnected applications.'],
      ['Who', 'Residents and shared households that want convenient smart access without losing a familiar handle or dependable physical key.'],
      ['How', 'Door research led to form sketching, full-scale grip prototypes, hardware architecture, app flows, installation studies, assembly design, and CMF.'],
    ],
    meta: [['Type', 'Smart hardware + app'], ['Scope', 'Product · interface · installation'], ['Focus', 'Safer, simpler entry'], ['Fallback', 'Physical key retained']],
    overview: [
      ['Problem', 'A modern front door can become a cluttered stack of cameras, bells, locks, sensors, and separate apps.'],
      ['Insight', 'People want smart access without losing the familiar handle, key, or a clear installation path.'],
      ['Solution', 'A single front-and-rear handle system supported by one mobile experience.'],
    ],
    evidenceTitle: 'The door had become a technology stack.',
    evidenceIntro: 'The opportunity was not another accessory. It was a coherent replacement for disconnected products.',
    evidence: [['5 functions', 'camera, doorbell, lock, motion detection, and physical key access.'], ['160°', 'sensor coverage designed to capture visitors and packages.'], ['2 views', 'front and rear hardware coordinated as one installation.']],
    insight: 'The smartest door should still make sense when the phone is absent, the battery is low, or a guest needs access.',
    processTitle: 'Built around the hand and the doorway.',
    process: [['Ideation', 'Handle and body sketches'], ['Grip testing', 'Physical handle prototypes'], ['Architecture', 'Front and rear component studies'], ['Installation', 'Door-height and mounting checks']],
    solutionTitle: 'A complete entry point.',
    features: [
      ['See the whole visitor', 'Head-to-toe HD coverage, motion detection, and night vision support doorstep awareness.'],
      ['Speak and respond', 'Two-way audio and alarms make the door useful before it is opened.'],
      ['Choose how to enter', 'Mobile keys, temporary access, keyless entry, and a physical key coexist.'],
      ['Review what happened', 'The companion app groups live monitoring, alerts, and past events in one place.'],
    ],
    flowTitle: 'Access without a fragile single point of failure.',
    flow: [['Detect', 'The system notices a visitor, movement, or package.'], ['Decide', 'The resident checks the event and speaks or grants access.'], ['Enter', 'A digital credential or physical key completes the action.']],
    detailTitle: 'Made to fit a real door.',
    detailVisual: { src: 'assets/images/bastion/28.jpg', label: 'Serviceable product architecture', alt: 'Exploded Bastion assembly showing the camera, sensor, batteries, key cylinder, handles, and fasteners' },
    details: [['Handle height', 'Approximately 39 inches'], ['Camera height', 'Approximately 48 inches'], ['Power', 'Rechargeable batteries'], ['Assembly', 'Screw-mounted, serviceable components']],
    closingTitle: 'What the project demonstrates',
    closing: 'Bastion turns separate smart-home accessories into one understandable threshold. Further work would validate installation across more door standards and test shared household access.',
  },
  arc: {
    id: 'arc', parent: 'id-index', parentLabel: 'Industrial Design', title: 'ARC',
    subtitle: 'A coffee machine designed for slow mornings.',
    intro: 'A sculptural countertop appliance bringing a calmer ritual, clear interaction, and serviceable construction into a compact triangular form.',
    accent: '#74795c',
    heroVisual: { src: 'assets/images/arc/COFFEE.51.1.jpg', label: 'ARC final product', alt: 'Green triangular ARC coffee machine in a dark studio render' },
    overviewVisual: { src: 'assets/images/arc/COFFEE1.54.jpg', label: 'ARC product family', alt: 'Green and peach ARC coffee machines displayed together on white plinths' },
    quick: [
      ['What', 'A sculptural rounded-triangle coffee machine organized around a clear morning preparation and brewing sequence.'],
      ['Why', 'Many coffee machines make a quiet daily ritual feel visually busy, mechanically complicated, and emotionally impersonal.'],
      ['Who', 'Design-conscious home users who value expressive countertop objects and a slower, more deliberate coffee ritual.'],
      ['How', 'Audience research and moodboarding led to sketches, two physical models, user testing, journey mapping, CAD, CMF, manufacturing, and market positioning.'],
    ],
    meta: [['Type', 'Countertop appliance'], ['Scope', 'Form · CAD · CMF · manufacture'], ['Audience', 'Design-conscious home users'], ['Position', '$299 concept price']],
    overview: [
      ['Problem', 'Many coffee machines make a quiet daily ritual feel visually busy and mechanically complicated.'],
      ['Insight', 'The object can slow the experience down through approachable form and an obvious sequence of use.'],
      ['Solution', 'A rounded triangular appliance with a focused control area and two expressive color directions.'],
    ],
    evidenceTitle: 'The ritual shaped the object.',
    evidenceIntro: 'The concept developed around the sequence people repeat each morning, not around adding more controls.',
    evidence: [['6 moments', 'unbox, place cup, choose, fill, brew, and clean.'], ['2 models', 'successive low-fidelity prototypes checked scale and access.'], ['12 parts', 'mapped in the final exploded product architecture.']],
    insight: 'A slower experience does not need more steps. It needs each step to feel obvious and considered.',
    processTitle: 'Form, use, then construction.',
    process: [['Mood and form', 'Style references and sketches'], ['Model one', 'First cardboard volume study'], ['Model two', 'Refined interaction prototype'], ['CAD', 'Internal layout and final surfaces']],
    solutionTitle: 'A small ritual with a strong silhouette.',
    features: [
      ['Rounded triangle', 'The three-sided body creates a recognizable form without wasting counter space.'],
      ['Clear touchpoints', 'Cup, controls, brewing head, drip tray, and water tank follow the use sequence.'],
      ['Two personalities', 'Peach and green CMF directions change the mood while preserving one product identity.'],
      ['Service-aware build', 'Fasteners, gaskets, pump routing, cables, drafts, and ribs were considered in CAD.'],
    ],
    flowTitle: 'A morning sequence with no detours.',
    flow: [['Prepare', 'Fill the tank and place the cup.'], ['Choose', 'Set the drink from the concentrated control area.'], ['Brew', 'The machine completes the cycle and leaves cleanup accessible.']],
    detailTitle: 'Resolved beyond the exterior.',
    detailVisual: { src: 'assets/images/arc/Slide 16_9 - 95.jpg', label: 'Internal product architecture', alt: 'Sectioned ARC coffee machine showing the water tank, brewing assembly, pump, controls, and drip tray' },
    details: [['Structure', 'Consistent wall thickness, ribs, and draft'], ['Sealing', 'Gaskets around water paths'], ['Joining', 'Serviceable fasteners and inserts'], ['Benchmark', 'Nespresso · Keurig · SMEG · Breville']],
    closingTitle: 'What the project demonstrates',
    closing: 'ARC carries one visual idea from moodboard and hand model through CAD, CMF, assembly, and market positioning. A working prototype would test heat, noise, cleaning, and brew performance.',
  },
}

function VisualPlaceholder({ label, variant = 'wide' }) {
  return <figure className={`case-placeholder ${variant}`}><div className="case-placeholder-mark" aria-hidden="true"><span></span><span></span></div><figcaption>{label}</figcaption></figure>
}

function CaseAsset({ visual, variant = 'wide' }) {
  const isHero = variant === 'hero'
  return <figure className={`case-asset ${variant}`}><PortfolioImage src={visual.src} loading={isHero ? 'eager' : 'lazy'} fetchPriority={isHero ? 'high' : 'auto'} decoding="async" alt={visual.alt} /><figcaption>{visual.label}{visual.href ? <> · <a href={visual.href} target="_blank" rel="noreferrer">{visual.credit}</a></> : null}</figcaption></figure>
}

function CaseVisual({ visual, label, variant }) {
  return visual ? <CaseAsset visual={visual} variant={variant} /> : <VisualPlaceholder label={label} variant={variant} />
}

function DeepDiveChapter({ chapter }) {
  return (
    <article className={`case-chapter${chapter.visuals.length ? '' : ' no-visuals'}${chapter.layout ? ` ${chapter.layout}` : ''}`}>
      <div className="case-chapter-copy">
        <h3>{chapter.title}</h3>
        <p>{chapter.copy}</p>
        <ul>{chapter.points.map((point) => <li key={point}>{point}</li>)}</ul>
      </div>
      <div className={`case-chapter-visuals visual-count-${chapter.visuals.length}${chapter.visuals.length > 2 ? ' has-featured' : ''}`}>
        {chapter.visuals.map((visual, index) => <CaseVisual key={visual.src ?? visual} visual={typeof visual === 'string' ? undefined : visual} label={typeof visual === 'string' ? visual : undefined} variant={index === 0 && chapter.visuals.length > 2 ? 'landscape' : 'square'} />)}
      </div>
    </article>
  )
}

function FeaturedScreens({ project }) {
  if (!project.featuredScreens) return null

  return (
    <section className="case-section case-featured" id={`${project.id}-key-screens`} aria-labelledby={`${project.id}-key-screens-title`}>
      <div className="case-heading">
        <h2 id={`${project.id}-key-screens-title`}>{project.featuredTitle}</h2>
        <p>{project.featuredIntro}</p>
      </div>
      <div className="case-featured-grid">
        {project.featuredScreens.map((screen) => (
          <CaseVisual
            key={screen.visual?.src ?? screen.label}
            visual={screen.visual}
            label={screen.label}
            variant={screen.variant}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCaseStudy({ project, go }) {
  const isIndustrial = project.parent === 'id-index'
  const isIndustrialPeer = project.id === 'arc' || project.id === 'bastion'
  const progressItems = [
    { id: `${project.id}-quick`, label: 'Overview' },
    ...(project.ownership ? [{ id: `${project.id}-context`, label: 'Role' }] : []),
    ...(project.featuredScreens ? [{ id: `${project.id}-key-screens`, label: 'Key screens' }] : []),
    { id: `${project.id}-full-case-study`, label: 'Full case study' },
  ]

  return (
    <section className={`screen case-study case-${project.id}${isIndustrial ? ' case-industrial' : ''}${isIndustrialPeer ? ' case-industrial-peer' : ''} active`} id={`s-${project.parent.startsWith('id') ? 'id' : 'ux'}-${project.id}`} style={{ '--case-accent': project.accent }}>
      <div className="case-project-nav">
        <a className="case-project-back" href={routePath(project.parent)} onClick={(event) => go(project.parent, event)}>
          <span className="case-back-icon" aria-hidden="true"><ArrowIcon direction="left" /></span>
          <span>Back</span>
        </a>
      </div>
      <header className="case-hero">
        <div className="case-hero-copy"><h1>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p><p className="case-intro">{project.intro}</p></div>
        <CaseVisual visual={project.heroVisual} label={project.heroLabel} variant="hero" />
      </header>
      <dl className="case-meta">{project.meta.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <CaseProgressNav label={`${project.title} case study sections`} items={progressItems} />
      <main className="case-body">
        <section className="case-quick" id={`${project.id}-quick`} aria-labelledby={`${project.id}-quick-title`}>
          <div className="case-mode-intro">
            <h2 id={`${project.id}-quick-title`}>The 30-second version.</h2>
            <p>Four questions explain the complete project before the detailed process begins.</p>
          </div>
          <div className="case-four-questions" aria-label="What, why, who, and how">
            {project.quick.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
          </div>
          <CaseVisual visual={project.overviewVisual} label="Final solution overview" variant="panorama" />
        </section>

        {project.ownership ? (
          <section className="case-section case-context" id={`${project.id}-context`} aria-labelledby={`${project.id}-context-title`}>
            <div className="case-heading">
              <h2 id={`${project.id}-context-title`}>Role, scope, and ownership.</h2>
              <div className="case-ownership-copy">{project.ownership.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
            <dl className="case-context-grid">{project.meta.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          </section>
        ) : null}

        <FeaturedScreens project={project} />

        <section className="case-deep" id={`${project.id}-full-case-study`} aria-labelledby={`${project.id}-full-title`}>
          <header className="case-deep-intro">
            <h2 id={`${project.id}-full-title`}>The full case study.</h2>
            <p>{project.fullIntro ?? 'Research, synthesis, sketches, prototypes, testing, iterations, final design, and technical resolution.'}</p>
          </header>
          <div className="case-chapters">{projectDeepDives[project.id].map((chapter) => <DeepDiveChapter key={chapter.title} chapter={chapter} />)}</div>
          <section className="case-section case-details">
            <div className="case-heading"><h2>{project.detailTitle}</h2></div>
            <div className="case-detail-layout"><CaseVisual visual={project.detailVisual} label="Final detail, exploded view, or interface states" variant="landscape" /><dl>{project.details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
          </section>
          <section className="case-closing">
            <h2>{project.closingTitle}</h2>
            <p>{project.closing}</p>
          </section>
        </section>
      </main>
    </section>
  )
}

export function AurioCaseStudy({ go }) { return <ProjectCaseStudy project={projects.aurio} go={go} /> }
export function BastionScreen({ go }) { return <ProjectCaseStudy project={projects.bastion} go={go} /> }
export function ArcScreen({ go }) { return <ProjectCaseStudy project={projects.arc} go={go} /> }
