import { PortfolioImage } from '../components/PortfolioImage.jsx'
import { CaseProgressNav } from '../components/CaseProgressNav.jsx'
import { BackControl, Heading, MediaFrame, MetadataList, Text, TextLink } from '../design-system/index.js'
import { routePath } from '../routes.js'
import { projectDeepDives } from './projectDeepDives.js'

function Image({ visual, eager = false }) {
  return <MediaFrame mode="full-bleed" className="id-story-image"><a href={visual.src} target="_blank" rel="noreferrer" aria-label={`Open full image: ${visual.label}`}><PortfolioImage src={visual.src} alt={visual.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" /></a></MediaFrame>
}

function Gallery({ visuals, kind = '', eager = false }) {
  return <div className={`id-story-gallery ${kind}`}>{visuals.map((visual) => <Image key={visual.src} visual={visual} eager={eager} />)}</div>
}

function Chapter({ id, title, intro, children, kind = '' }) {
  return <section className={`id-story-chapter ${kind}`} id={id} aria-labelledby={`${id}-title`}><header className="id-story-heading"><Heading level={2} id={`${id}-title`}>{title}</Heading>{intro && <Text>{intro}</Text>}</header>{children}</section>
}

function ModelColumn({ title, copy, visuals }) {
  return <div className="id-model-column"><Heading level={3}>{title}</Heading><Text>{copy}</Text><Gallery visuals={visuals} kind="models" /></div>
}

function ArcStory() {
  const c = projectDeepDives.arc
  const sketches = c[1].visuals
  const final = c[7].visuals
  return <>
    <Chapter id="arc-form" title="Exploring the space around the cup." intro="The sketchbook moves through stacked cylinders, enclosed bodies, open frames, and triangular silhouettes. The drawings below are grouped by form so the alternatives can be compared.">
      <div className="id-sketch-family"><Heading level={3}>Rounded and stacked volumes</Heading><Gallery visuals={[1,2,3,6,8,9,10,11,12,15,19].map(n => sketches[n-1])} kind="sketches" /></div>
      <div className="id-sketch-family"><Heading level={3}>Enclosed bodies and projecting heads</Heading><Gallery visuals={[4,7,14,16,17,18,20].map(n => sketches[n-1])} kind="sketches" /></div>
      <div className="id-sketch-family selected"><div><Heading level={3}>The triangular direction</Heading><Text>I explored the triangular direction through form development, then carried it into cardboard to understand its volume as a physical object.</Text></div><Gallery visuals={[sketches[4], sketches[12]]} kind="pair" /></div>
    </Chapter>
    <Chapter id="arc-models" title="From understanding the form to arranging the parts." intro="The first model helped me understand the form. Building it made me realize that the next step was to work out the internal arrangement and test the individual parts. The second model moves that exploration into component placement and access.">
      <div className="id-model-comparison"><ModelColumn title="Model one · volume and scale" copy="I used the first cardboard model to understand the overall form. The mug provides a scale reference for the central opening." visuals={c[2].visuals} /><ModelColumn title="Model two · parts and access" copy="The next build explores how the parts fit into the form and how each one can be reached, moved, or removed." visuals={c[3].visuals} /></div>
      <div className="id-change-strip"><Text><strong>Opening</strong>Compare the frame and cup space across the two builds.</Text><Text><strong>Brewing head</strong>The second model brings the head into the cup opening.</Text><Text><strong>Reservoir</strong>A removable side component makes the refill action testable.</Text></div>
    </Chapter>
    <Chapter id="arc-use" title="Putting the touchpoints in someone’s hands." intro="The physical study covers component removal, control reach, cup access, and refilling. The photos document these tasks; they do not establish brewing performance or a measured usability improvement.">
      <Gallery visuals={c[4].visuals} kind="interaction" />
      <div className="id-story-subheading"><Heading level={3}>Carrying those actions into the use sequence.</Heading><Text>From unpacking to refilling, the interaction drawings explain how the parts are approached and moved.</Text></div><Gallery visuals={c[5].visuals} kind="pair drawings" />
    </Chapter>
    <Chapter id="arc-construction" title="A silhouette with an internal layout." intro="The CAD studies place the brewing assembly, pump, water tank, and controls inside the triangular envelope. They show a proposed package, with heat, sealing, and brew performance still requiring a working prototype.">
      <Gallery visuals={[final[3]]} kind="wide" />
      <Gallery visuals={c[6].visuals} kind="pair technical" />
      <div className="id-story-subheading"><Heading level={3}>Parts, materials, and assembly.</Heading><Text>The exploded component map and material studies connect the exterior to a proposed manufacturing approach.</Text></div><Gallery visuals={c[8].visuals} kind="technical-sheets" />
    </Chapter>
    <Chapter id="arc-result" title="One form, two material expressions." intro="Peach and muted green share the same triangular body and darker touchpoints. Studio views describe the surfaces; the kitchen views return the object to its intended setting." kind="result">
      <Gallery visuals={[final[0]]} kind="wide" />
      <Gallery visuals={[final[1], final[4], final[5], final[6]]} kind="pair" />
      <Gallery visuals={[final[2], final[7], final[8]]} kind="context-sequence" />
      <div className="id-market"><div><Heading level={3}>A proposed $299 position.</Heading><Text>The positioning study compares ARC with familiar coffee-machine brands. The price is a concept target, not a validated retail price or production quote.</Text></div><Gallery visuals={c[9].visuals} kind="wide" /></div>
    </Chapter>
  </>
}

function AurioStory() {
  const c = projectDeepDives.aurio
  return <>
    <Chapter id="aurio-form" title="Making support visible." intro="Ring, loop, clip, and behind-ear forms explore how the device attaches, where its weight sits, and how much of it is seen. These four sheets retain the full breadth of the exploration.">
      <div className="id-sketch-family"><Heading level={3}>The criteria behind the form</Heading><Text>Comfort, expression, control, and social visibility frame the design direction.</Text><Gallery visuals={c[2].visuals} kind="synthesis" /></div>
      <div className="id-sketch-family"><Heading level={3}>Exploring attachment, silhouette, and control</Heading><Gallery visuals={c[3].visuals} kind="pair drawings" /></div>
    </Chapter>
    <Chapter id="aurio-models" title="The form changes when it reaches the ear." intro="The early studies explore different attachment shapes. The next round develops the larger ring and its position around the ear. The models make the progression visible, while long-duration comfort still needs further validation.">
      <div className="id-model-comparison"><ModelColumn title="Early forms · attachment and silhouette" copy="Foam alternatives and on-body studies explore the relationship between the device and the ear." visuals={c[4].visuals} /><ModelColumn title="Ring refinement · placement and balance" copy="Separate components and later wear studies show the ring direction at a larger scale." visuals={c[5].visuals} /></div>
      <div className="id-change-strip"><Text><strong>Contact</strong>The earpiece becomes rounder in the later direction.</Text><Text><strong>Identity</strong>The larger loop makes the silhouette more recognizable.</Text><Text><strong>Placement</strong>Later studies examine the ring’s position around the ear.</Text></div>
    </Chapter>
    <Chapter id="aurio-use" title="From workshop finish to worn object." intro="Hand finishing, painting, and surface studies document the physical making process. The control studies are shown as development artifacts; they are not evidence of working hearing-support electronics.">
      <Gallery visuals={c[6].visuals.slice(0,3)} kind="workshop" />
      <div className="id-story-subheading"><Heading level={3}>Control geometry before the final finish.</Heading><Text>The first two studies show the recessed control features and their surrounding form.</Text></div><Gallery visuals={c[6].visuals.slice(3,5)} kind="pair" />
      <div className="id-story-subheading"><Heading level={3}>Preparing and finishing the surface.</Heading><Text>The remaining workshop views keep the intermediate stages visible alongside the finished surface study.</Text></div><Gallery visuals={c[6].visuals.slice(5)} kind="workshop" />
    </Chapter>
    <Chapter id="aurio-construction" title="A proposed wearable system." intro="The concept brings together a ring frame, body shell, and direct control. Light, haptic feedback, and hearing support are proposed functions; the physical studies establish appearance and placement.">
      <Gallery visuals={[c[7].visuals[1]]} kind="wide" />
      <div className="id-change-strip"><Text><strong>Ring frame</strong>The loop gives the wearable its visible outline.</Text><Text><strong>Body</strong>The side profile shows the shell in relation to the ring.</Text><Text><strong>Control</strong>The orange accent identifies the proposed direct input.</Text></div>
      <div className="id-story-subheading"><Heading level={3}>The resolved product pair.</Heading><Text>The studio view brings the separate forms together before the final on-body photographs.</Text></div><Gallery visuals={[c[7].visuals[0]]} kind="wide" />
    </Chapter>
    <Chapter id="aurio-result" title="Seen on the person who wears it." intro="The final wear photographs return the design to human scale. They show the ring, the body behind the ear, and how the object reads from conversational distance." kind="result">
      <Gallery visuals={c[7].visuals.slice(2)} kind="wear" />
    </Chapter>
  </>
}

function BastionStory() {
  const c = projectDeepDives.bastion
  return <>
    <Chapter id="bastion-form" title="Bringing the technology back to a handle." intro="The sketch exploration combines the sensing area, access controls, and grip into one recognizable object. The annotated sheet identifies directions within the broader exploration.">
      <div className="id-sketch-family"><Heading level={3}>Exploring the body and grip</Heading><Gallery visuals={[c[1].visuals[1]]} kind="wide drawings" /></div>
      <div className="id-sketch-family"><Heading level={3}>Reviewing the annotated directions</Heading><Gallery visuals={[c[1].visuals[0]]} kind="wide drawings" /></div>
    </Chapter>
    <Chapter id="bastion-models" title="The hand sets the scale." intro="The prototype family explores the housing and grip. Mounted and hand-held studies then bring clearance, reach, and the turning action into the design process.">
      <div className="id-model-comparison"><ModelColumn title="Form family · housing and grip" copy="Full-scale parts make the proportions and relationship between body and handle tangible." visuals={c[2].visuals.slice(0,3)} /><ModelColumn title="In the hand · clearance and rotation" copy="These photographs show grip and mounted-use studies. They document exploration rather than a quantified ergonomic result." visuals={c[2].visuals.slice(3)} /></div>
      <div className="id-change-strip"><Text><strong>Grip profile</strong>Compare the handle shapes in the prototype family.</Text><Text><strong>Clearance</strong>The hand studies show the space between the grip and mounting surface.</Text><Text><strong>Mounted use</strong>The door-mounted model brings reach and the turning action together.</Text></div>
    </Chapter>
    <Chapter id="bastion-use" title="One object, two working heights." intro="The handle and camera serve different physical needs. The installation study places the grip near 39 inches and the camera near 48 inches, making the relationship visible on a full door.">
      <Gallery visuals={[c[5].visuals[1], c[5].visuals[0]]} kind="pair" />
      <Gallery visuals={[c[5].visuals[2]]} kind="wide drawings" />
      <div className="id-story-subheading"><Heading level={3}>Access continues on the phone.</Heading><Text>The companion concept brings lock control, event history, a digital key, and visitor response together. A physical key remains part of the hardware proposal.</Text></div><Gallery visuals={c[4].visuals} kind="phones" />
    </Chapter>
    <Chapter id="bastion-construction" title="Coordinating the outside and inside." intro="The front and rear housings organize sensing, access, grip, and power. The exploded study makes the proposed mechanical and electronic arrangement inspectable.">
      <Gallery visuals={[c[3].visuals[1]]} kind="wide" />
      <div className="id-story-subheading"><Heading level={3}>Where each function lives.</Heading><Text>The annotated front and rear views locate the camera, sensing, access controls, key, and battery within the housings.</Text></div><Gallery visuals={[c[3].visuals[0]]} kind="wide technical" />
      <div className="id-story-subheading"><Heading level={3}>From housings to individual parts.</Heading><Text>The exploded view separates the covers, handles, electronics, power components, and fasteners to explain the proposed assembly.</Text></div><Gallery visuals={c[6].visuals} kind="wide technical" />
    </Chapter>
    <Chapter id="bastion-result" title="Different finishes. One family of parts." intro="Body and handle combinations explore how the system could sit alongside different door materials. The final studies show the range and the assembled object." kind="result">
      <Gallery visuals={c[7].visuals.slice(2)} kind="wide" />
      <div className="id-story-subheading"><Heading level={3}>Body and handle finish combinations.</Heading><Text>The same family of parts is shown across the proposed color and material options.</Text></div><Gallery visuals={c[7].visuals.slice(0,2)} kind="pair" />
    </Chapter>
  </>
}

const stories = { arc: ArcStory, aurio: AurioStory, bastion: BastionStory }
const introductions = {
  arc: ['A coffee ritual, shaped around a triangle.', 'A countertop coffee-machine concept developed through form exploration, two cardboard models, interaction studies, and internal CAD.'],
  aurio: ['Hearing support with a visible identity.', 'An ear-worn concept explored through sketches, foam forms, prototype finishing, and on-body studies.'],
  bastion: ['A front door with fewer separate devices.', 'A connected handle concept bringing access, sensing, communication, and a physical key into one front-and-rear system.'],
}

export function IndustrialProjectStory({ project, go }) {
  const { id, title } = project
  const Story = stories[id]
  const c = projectDeepDives[id]
  const context = id === 'aurio' ? [...c[0].visuals, ...c[1].visuals] : c[0].visuals
  const nextId = {arc: 'bastion', bastion: 'aurio', aurio: 'arc'}[id]
  const nav = [['brief','Brief'],['form','Form'],['models','Models'],['use','Use'],['construction','Construction'],['result','Final design']].map(([key,label]) => ({id:`${id}-${key}`,label}))
  return <main className={`screen active id-story id-story--${id}`} id={`s-id-${id}`}>
    <div className="id-story-back"><BackControl href={routePath('id-index')} onClick={event => go('id-index',event)} label="Industrial design" /></div>
    <header className="id-story-hero"><div><Heading level={1}>{title}</Heading><Text className="id-story-thesis">{introductions[id][0]}</Text><Text>{introductions[id][1]}</Text><TextLink className="id-story-start" href={`#${id}-models`}>Explore the physical models</TextLink></div><Image visual={project.heroVisual} eager /></header>
    <MetadataList className="id-story-meta" items={project.meta.map(([label,value]) => ({label,value}))} />
    <CaseProgressNav appearance="master" label={`${title} project chapters`} items={nav} />
    <div className="id-story-body">
      <Chapter id={`${id}-brief`} title="The starting point. My response." intro="The research brief was provided in class. My contribution is the interpretation and development shown here: sketches, physical models, interactions, CAD, and the final concept.">
        <div className="id-brief-split"><div><Heading level={3}>The brief</Heading><Text>{project.quick.find(([label]) => label === 'Who')[1]}</Text><Text>{project.quick.find(([label]) => label === 'Why')[1]}</Text></div><div><Heading level={3}>My design response</Heading><Text>{project.quick[0][1]}</Text><Text>{id === 'arc' ? 'The rounded triangle carries through the drawings, cardboard models, and final CAD.' : id === 'aurio' ? 'The ring form treats visibility as part of the product’s identity. Physical models explore its relationship with the ear.' : 'The design brings the camera, access controls, and grip into coordinated front and rear housings.'}</Text></div></div>
        <Gallery visuals={[project.overviewVisual]} kind="wide" />
        <div className="id-story-subheading"><Heading level={3}>{id === 'arc' ? 'Audience and visual context' : id === 'aurio' ? 'Listening context and product references' : 'The fragmented front door'}</Heading><Text>{id === 'arc' ? 'Lifestyle imagery frames the intended setting. Image credits identify the reference sources.' : id === 'aurio' ? 'The reference material frames everyday listening and the range of existing audio products.' : 'The framing board brings the separate devices into view before the integrated design proposal.'}</Text></div><Gallery visuals={context} kind={id === 'arc' ? 'context-pair' : id === 'aurio' ? 'reference-trio' : 'wide'} />
      </Chapter>
      <Story />
      <Chapter id={`${id}-details`} title={project.detailTitle} intro="Material and component choices describe the proposed construction of the concept.">
        <div className="id-story-detail"><Image visual={project.detailVisual} /><MetadataList columns={1} items={project.details.map(([label,value]) => ({label,value}))} /></div>
      </Chapter>
      <section className="id-story-close"><div><Heading level={2}>What this project carries forward.</Heading><Text>{project.closing}</Text></div><TextLink href={routePath(`id-${nextId}`)} onClick={event => go(`id-${nextId}`,event)}>Next project: {nextId === 'arc' ? 'ARC' : nextId === 'aurio' ? 'Aurio' : 'Bastion'}</TextLink></section>
    </div>
  </main>
}
