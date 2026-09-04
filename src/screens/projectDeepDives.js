const forkastImage = (filename, label, alt) => ({
  src: `assets/images/forkast/${filename}`,
  label,
  alt,
})

const projectImage = (project, filename, label, alt, preserveExtension = false) => ({
  src: `assets/images/${project}/${project === 'cura' || preserveExtension ? filename : filename.replace(/\.png$/, '.jpg')}`,
  label,
  alt,
})

const researchImage = (filename, label, alt, href, credit) => ({
  src: `assets/images/research/${filename}`,
  label,
  alt,
  href,
  credit,
})

export const projectDeepDives = {
  aurio: [
    {
      title: 'Understanding the real listening problem',
      copy: 'The project began with situational hearing difficulty rather than a diagnosis. Young adults described moments where conversation became tiring, especially outdoors, in motion, or inside layered background noise.',
      points: ['Noise makes speech harder to isolate', 'Wind and weather interfere with microphones', 'Movement changes where attention is needed', 'Listening fatigue can lead to withdrawal from the group'],
      visuals: [
        researchImage('aurio-social-listening.jpg', 'Social listening context', 'Young adults talking in a busy social setting', 'https://www.pexels.com/photo/people-having-a-conversation-at-the-cafeteria-8344699/', 'Henri Mathieu-Saint-Laurent on Pexels'),
      ],
    },
    {
      title: 'Market study and product benchmarking',
      layout: 'aurio-media-grid equal-height-benchmark-media',
      copy: 'Existing products split into two worlds. Hearing aids offered support but carried a clinical signal. Earbuds felt socially normal but were not designed around hearing difficulty. Many users moved between both depending on context.',
      points: ['Compared major hearing-aid form factors', 'Mapped products by visibility and lifestyle fit', 'Studied earbuds as the socially accepted reference', 'Identified outdoor use as a weak point across categories'],
      visuals: [
        projectImage('aurio', 'image 5.png', 'Hearing-aid form factors', 'Comparison chart of six common hearing-aid form factors'),
        projectImage('aurio', 'image 6.png', 'Aurio market benchmark', 'Market map comparing hearing aids, earbuds, and Aurio by lifestyle fit and hearing support'),
      ],
    },
    {
      title: 'Synthesis changed the design direction',
      layout: 'aurio-media-grid',
      copy: 'Affinity mapping grouped the research around comfort, control, expression, confidence, and connection. The pivotal insight was that visibility was not automatically a flaw. A recognizable device could help other people understand the wearer and respond more thoughtfully.',
      points: ['Social legibility', 'Expressive rather than medical form', 'Comfort for extended wear', 'Direct control without app dependence', 'Confidence during conversation'],
      visuals: [
        projectImage('aurio', 'Container.svg', 'Eight design criteria', 'Circular synthesis diagram connecting Aurio design criteria including visibility, comfort, expression, and confidence'),
      ],
    },
    {
      title: 'Sketching broadly before selecting a form',
      layout: 'aurio-media-grid aurio-sketch-grid',
      copy: 'The exploration covered roughly one hundred pages of concepts. Ring, loop, earbud, clip, and behind-ear directions were compared for how clearly they communicated support and how naturally they sat on the body.',
      points: ['Explored attachment and weight distribution', 'Tested how much of the product should remain visible', 'Separated battery, microphone, and interaction zones', 'Combined bold, comfortable, and communicative elements'],
      visuals: [
        projectImage('aurio', 'Slide 16_9 - 82.png', 'Concept sketch exploration one', 'First broad sheet of Aurio hearing-wearable concept sketches', true),
        projectImage('aurio', 'Slide 16_9 - 83.png', 'Concept sketch exploration two', 'Second broad sheet of Aurio hearing-wearable concept sketches', true),
        projectImage('aurio', 'Slide 16_9 - 84 2.png', 'Concept sketch exploration three', 'Third broad sheet of Aurio hearing-wearable concept sketches', true),
        projectImage('aurio', 'Slide 16_9 - 85 2.png', 'Concept sketch exploration four', 'Fourth broad sheet of Aurio hearing-wearable concept sketches', true),
      ],
    },
    {
      title: 'Form study and testing round one',
      layout: 'aurio-media-grid aurio-lead-grid',
      copy: 'Three foam directions were worn and compared. Feedback separated visual confidence from physical comfort, showing that the strongest silhouette still needed a softer relationship with the ear.',
      points: ['Form 1 tested visual boldness', 'Form 2 tested comfort and weight', 'Form 3 tested communication and recognizability', 'Feedback guided a combined direction'],
      visuals: [
        projectImage('aurio', 'image 4.png', 'Foam form family', 'Collection of white Aurio foam models exploring multiple ear-worn forms'),
        projectImage('aurio', 'image 7.png', 'Listening study participant', 'Participant wearing an early Aurio hearing-support form during a listening study'),
        projectImage('aurio', 'image 8.png', 'Early wear observation', 'Side view of a participant wearing an early white Aurio prototype'),
        projectImage('aurio', 'image 10.png', 'Situational wear study', 'Young adult wearing an Aurio prototype in a seated listening session'),
        projectImage('aurio', 'image 19.png', 'Fit observation', 'Participant testing how an Aurio form sits around the ear'),
      ],
    },
    {
      title: 'Iteration and testing round two',
      layout: 'aurio-media-grid aurio-lead-grid aurio-media-left',
      copy: 'The chosen concept became rounder, the loop grew for a clearer identity, and its position moved toward the center of the ear. The second test focused on balance, stability, and whether the device read as intentional personal hardware.',
      points: ['Rounder earpiece for comfort', 'Larger loop for identity', 'Centered position for balance', 'Refined contact points around the ear'],
      visuals: [
        projectImage('aurio', 'image 20.png', 'Prototype components', 'Separated Aurio prototype body, ring, and control components'),
        projectImage('aurio', 'image 23.png', 'Placement refinement', 'Participant wearing a refined white Aurio prototype during fit testing'),
        projectImage('aurio', 'image 24.png', 'Round-two wear test', 'Participant wearing a larger ring-form Aurio prototype in context'),
      ],
    },
    {
      title: 'Prototype build and wear validation',
      layout: 'aurio-media-grid aurio-process-grid',
      copy: 'A resolved prototype was built to check the assembled form, scale, interaction zones, and how it looked when worn in an everyday setting.',
      points: ['Built the ring and body as a complete assembly', 'Checked reach to the tap control', 'Observed the device from conversational distance', 'Used wear testing to verify the final proportions'],
      visuals: [
        projectImage('aurio', 'image 57.png', 'Prototype finishing', 'Designer hand-finishing a small Aurio prototype component'),
        projectImage('aurio', 'image 58.png', 'Prototype paint preparation', 'Designer spray-finishing Aurio prototype parts'),
        projectImage('aurio', 'image 59.png', 'Prototype surface finishing', 'Aurio prototype components being painted in a workshop booth'),
        projectImage('aurio', 'image 60.png', 'Control prototype', 'Blue 3D-printed Aurio tactile-control test piece'),
        projectImage('aurio', 'image 61.png', 'Button geometry test', 'Black Aurio control prototype testing two raised tactile buttons'),
        projectImage('aurio', 'image 62.png', 'Control mold study', 'Black dual-control prototype mounted for finishing'),
        projectImage('aurio', 'image 63.png', 'Control iteration', 'Refined dual-control prototype after surface finishing'),
        projectImage('aurio', 'image 64.png', 'Final control surface', 'Finished Aurio control surface with two circular tactile zones'),
      ],
    },
    {
      title: 'Final product system',
      layout: 'aurio-media-grid aurio-final-grid',
      copy: 'The final system combines a die-cast aluminium ring, a PC and ABS battery shell, an OLED behind frosted glass, tactile input, light and vibration feedback, six colorways, and a dedicated charging case.',
      points: ['Focus feedback through LED and vibration', 'Tap bar for immediate control', 'Wind and moisture resistance', 'Six personal color directions', 'Charging and storage case'],
      visuals: [
        projectImage('aurio', 'Untitled (1) 1.png', 'Final product pair', 'Two resolved Aurio hearing-support devices shown in a studio render'),
        projectImage('aurio', 'Untitled2 2.png', 'Final side profile', 'Side view render showing Aurio ring frame, body, and orange control accent'),
        projectImage('aurio', 'image 72.png', 'Final wear study one', 'Young adult wearing the resolved ring-form Aurio prototype'),
        projectImage('aurio', 'image 73.png', 'Final wear study two', 'Three-quarter view of a participant wearing the resolved Aurio prototype'),
        projectImage('aurio', 'image 74.png', 'Final wear study three', 'Side view showing the resolved Aurio prototype around the ear'),
      ],
    },
  ],
  bastion: [
    {
      title: 'Defining the fragmented-door problem',
      copy: 'Research showed a front door accumulating separate locks, cameras, bells, sensors, keys, and apps. Each product solved one task, but the complete entry experience became harder to understand and maintain.',
      points: ['Mapped the growing device stack', 'Reviewed common smart-entry frustrations', 'Separated resident, guest, and delivery needs', 'Protected a physical fallback from the beginning'],
      visuals: [
        projectImage('bastion', '33.png', 'The fragmented front door', 'Problem-framing board showing a front door crowded by separate lock, camera, bell, and sensor products'),
      ],
    },
    {
      title: 'Ideation around one familiar object',
      copy: 'Sketching focused on integrating technology without losing the recognizable door handle. The form was organized into three clear zones for sensing, access, and grip.',
      points: ['Explored vertical and horizontal proportions', 'Kept the handle visually dominant', 'Integrated camera and doorbell placement', 'Reduced the exterior to a clean three-part composition'],
      visuals: [
        projectImage('bastion', '31.png', 'Annotated handle ideation', 'Broad Bastion handle sketch sheet with selected concepts and annotations'),
        projectImage('bastion', '32.png', 'Handle form exploration', 'Bastion sketch sheet exploring vertical bodies, grips, and sensor placement'),
      ],
    },
    {
      title: 'Physical grip prototyping',
      layout: 'full-media equal-height-grip-media',
      copy: 'Handle shapes were tested at full scale to compare reach, leverage, clearance, and comfort. This step grounded the technology concept in the repeated physical action of opening a door.',
      points: ['Compared grip profiles', 'Checked hand clearance from the door', 'Tested lever length and rotation', 'Refined front and rear ergonomics together'],
      visuals: [
        projectImage('bastion', 'WhatsApp Image 2025-03-14 at 18.00.27_97664882 1.png', 'Grip prototype family', 'Row of full-scale black Bastion handle prototypes used to compare grip profiles'),
        projectImage('bastion', 'WhatsApp Image 2025-03-14 at 18.06.50_7a1c2941 1.png', 'Front housing prototype', 'Black Bastion front-housing prototype showing the camera and access-control zones'),
        projectImage('bastion', 'WhatsApp Image 2025-03-13 at 17.20.18_441121a4 1.png', 'Mounted handle prototype', 'Full-scale Bastion prototype mounted vertically for reach testing'),
        projectImage('bastion', 'WhatsApp Image 2025-04-28 at 23.23.31_24948770 1.png', 'Hand-clearance test', 'Participant gripping a Bastion handle prototype to check reach and hand clearance'),
        projectImage('bastion', 'WhatsApp Image 2025-05-05 at 20.08.02_f8660830 1.png', 'Lever grip test', 'Close view of a participant rotating the Bastion lever prototype'),
        projectImage('bastion', 'WhatsApp Image 2025-05-05 at 20.08.15_35839a96 1.png', 'Mounted use test', 'Participant testing the Bastion handle on a door'),
        projectImage('bastion', 'WhatsApp Image 2025-05-05 at 20.08.35_1c47a6c7 1.png', 'Full-hand grip study', 'Close view of a participant evaluating the Bastion handle grip'),
      ],
    },
    {
      title: 'Product architecture and feature integration',
      layout: 'equal-height-hardware-media',
      copy: 'The selected architecture brings the camera, 160-degree sensor, doorbell, smart lock, key cylinder, batteries, and handles into coordinated front and rear housings.',
      points: ['Camera and motion sensing at the top', 'Primary access controls at hand height', 'Rechargeable battery access from inside', 'Physical key retained for resilience'],
      visuals: [
        projectImage('bastion', '30.png', 'Annotated front and rear views', 'Front and rear Bastion handle renders with camera, sensor, key, and battery callouts'),
        projectImage('bastion', 'new 17 1.png', 'Resolved hardware form', 'Studio render of the resolved Bastion front and rear door hardware'),
      ],
    },
    {
      title: 'The companion mobile experience',
      copy: 'The app extends the hardware without becoming the only way to use it. Residents can manage wallet keys, monitor the doorway, review events, receive alerts, and issue temporary access.',
      points: ['Login and household access', 'Live monitoring and two-way audio', 'Past-event review', 'Temporary digital keys', 'Package and motion alerts'],
      layout: 'mobile-screens',
      visuals: [
        projectImage('bastion', 'mobile-lock-control.jpg', 'Front-door lock control', 'Bastion mobile home screen with a live camera preview, lock and unlock controls, and a temporary key card for the front door'),
        projectImage('bastion', 'mobile-event-feed.jpg', 'Event history feed', 'Bastion mobile event feed grouped by day, listing delivery, mail, and visitor clips with timestamps'),
        projectImage('bastion', 'mobile-wallet-card.jpg', 'Digital home key card', 'Bastion mobile card screen with a wallet-style home key and options to add it to Apple Wallet or Google Wallet'),
        projectImage('bastion', 'mobile-delivery-alert.jpg', 'Delivery alert and response', 'Bastion mobile alert showing a courier at the door with motion and sound detection, and Deny, leave-at-door, and talk actions'),
      ],
    },
    {
      title: 'Designing for the full doorway',
      copy: 'Camera coverage, handle reach, and installation were evaluated together. The handle sits near 39 inches while the camera is positioned near 48 inches to balance ergonomics with a head-to-toe view.',
      points: ['Head-to-toe HD coverage', 'Night vision and motion detection', 'Two-way audio and alarms', 'Package visibility', 'Keyless and physical entry'],
      layout: 'stacked-media',
      visuals: [
        projectImage('bastion', '25.png', 'Visitor monitoring scenario', 'Bastion installed on a front door while a resident views a visitor through the camera'),
        projectImage('bastion', '29.png', 'Installation-height study', 'Door elevation comparing standard handle and camera mounting heights'),
        projectImage('bastion', 'Group 133.png', 'Front-door interaction sequence', 'Five-step line drawing of a resident approaching the door, tapping an RFID key, turning the handle, pressing the doorbell, and the resolved handle and doorbell hardware'),
      ],
    },
    {
      title: 'Installation, assembly, and service',
      copy: 'The system uses screw-based mounting and rechargeable batteries. An exploded study resolved the sensor, PCB, covers, handles, key cylinder, housings, fasteners, and power components.',
      points: ['Straightforward screw installation', 'Accessible rechargeable batteries', 'Separated electronic and mechanical zones', 'Serviceable front and rear assemblies'],
      visuals: [
        projectImage('bastion', '28.png', 'Exploded assembly', 'Exploded Bastion front and rear assemblies with labeled electronic and mechanical components'),
      ],
    },
    {
      title: 'CMF, adoption, and final context',
      layout: 'full-media',
      copy: 'Material and finish options allow the handle to suit different doors. Mix-and-match bodies and handles support personalization, while the user journey preserves easy adoption and a familiar key fallback.',
      points: ['Multiple body and handle finishes', 'Mix-and-match CMF system', 'Simple first-use journey', 'Physical key reduces adoption anxiety'],
      visuals: [
        projectImage('bastion', '26.png', 'Mix-and-match finishes', 'Bastion body and handle finish combinations in black, bronze, white, and metallic tones'),
        projectImage('bastion', '27.png', 'CMF family', 'Bastion color, material, and finish family shown across front and side views'),
        projectImage('bastion', 'new 1.png', 'Final product portrait', 'Resolved Bastion front and rear door-handle system in a studio render'),
      ],
    },
  ],
  arc: [
    {
      title: 'Audience and cultural direction',
      layout: 'equal-height-context-media',
      copy: 'ARC was positioned for a design-conscious, Bourgeois Bohemian audience that values expressive objects and slower domestic rituals. The research translated that lifestyle into a softer, sculptural appliance language.',
      points: ['Defined the target user and home context', 'Studied artful but approachable objects', 'Balanced visual character with everyday familiarity', 'Used ritual as the emotional center'],
      visuals: [
        researchImage('arc-morning-ritual.jpg', 'Slow morning ritual', 'Hands holding a warm mug during a quiet morning routine at home', 'https://www.pexels.com/photo/morning-coffee-ritual-in-a-cozy-kitchen-30234702/', 'Lisa from Pexels'),
        researchImage('arc-sculptural-interior.jpg', 'Sculptural interior language', 'Contemporary café interior with expressive sculpted wall art and restrained furniture', 'https://www.pexels.com/photo/artistic-cafe-interior-with-sculpted-wall-art-30651692/', 'ebrar on Pexels'),
      ],
    },
    {
      title: 'Sketching the triangular identity',
      layout: 'full-media arc-sketch-gallery',
      copy: 'Early sketches explored how a rounded triangle could organize the reservoir, brewing head, controls, cup area, and drip tray while maintaining a compact footprint.',
      points: ['Explored front and side silhouettes', 'Tested open and enclosed cup zones', 'Studied control placement', 'Refined the triangle into softer continuous surfaces'],
      visuals: Array.from({ length: 20 }, (_, index) => {
        const number = String(index + 1).padStart(2, '0')
        return projectImage('arc', `arc-sketch-${number}.png`, `Concept sketch ${number}`, `ARC coffee-machine concept sketch ${index + 1} exploring form, proportions, and component layout`, true)
      }),
    },
    {
      title: 'Low-fidelity model one',
      layout: 'arc-model-one-gallery',
      copy: 'The first physical model tested overall volume and whether the triangular idea remained readable at appliance scale. It exposed questions around cup clearance and access to the water tank.',
      points: ['Checked countertop scale', 'Compared body width and height', 'Evaluated cup access', 'Identified areas needing softer transitions'],
      visuals: [
        projectImage('arc', 'arc-model-one-01.png', 'Cup-clearance test', 'First cardboard ARC model with a ceramic mug positioned inside the brewing opening', true),
        projectImage('arc', 'arc-model-one-02.png', 'Countertop scale study', 'First cardboard ARC model beside a ceramic mug for scale', true),
        projectImage('arc', 'arc-model-one-03.png', 'Cup fit study', 'Close view of a ceramic mug fitted inside the first cardboard ARC model', true),
        projectImage('arc', 'arc-model-one-04.png', 'Component-zone study', 'Rear view of the first cardboard ARC model with reservoir, top, side, and front zones marked', true),
      ],
    },
    {
      title: 'Model two refinement',
      layout: 'arc-model-two-gallery',
      copy: 'The second model refined the proportions and interaction zones before testing. The updated build clarified the cup opening, brewing head, front control, and removable side reservoir.',
      points: ['Improved cup and drip-tray access', 'Clarified button placement', 'Refined the brewing-head relationship', 'Made the side reservoir removable'],
      visuals: [
        projectImage('arc', 'arc-model-two-01.png', 'Refined prototype scale', 'Refined cardboard ARC prototype shown beside a paper cup for scale', true),
        projectImage('arc', 'arc-model-two-02.png', 'Cup placement', 'Paper cup positioned beneath the brewing head of the refined cardboard ARC prototype', true),
        projectImage('arc', 'arc-model-two-03.png', 'Side profile', 'Three-quarter side view of the refined cardboard ARC prototype', true),
        projectImage('arc', 'arc-model-two-04.png', 'Brewing clearance', 'Refined cardboard ARC prototype with a paper cup positioned in the brewing opening', true),
      ],
    },
    {
      title: 'User testing the refined model',
      layout: 'arc-user-test-gallery',
      copy: 'A participant tested the model through the main physical interactions. The study checked whether the removable parts, front control, cup opening, and side reservoir were understandable and reachable by hand.',
      points: ['Tested removable-part access', 'Checked control reach and visibility', 'Observed cup placement and removal', 'Evaluated reservoir removal'],
      visuals: [
        projectImage('arc', 'arc-model-two-05.png', 'Removable-part test', 'Participant removing a cardboard component from the front of the ARC prototype', true),
        projectImage('arc', 'arc-model-two-06.png', 'Control reach test', 'Participant pressing the marked control area on the ARC prototype', true),
        projectImage('arc', 'arc-model-two-07.png', 'Cup access test', 'Participant reaching into the ARC prototype to place or remove a cup', true),
        projectImage('arc', 'arc-model-two-08.png', 'Reservoir access test', 'Participant removing the side reservoir from the refined ARC prototype', true),
      ],
    },
    {
      title: 'Mapping the use journey',
      layout: 'arc-journey-gallery',
      copy: 'The final journey organized the machine around six repeated moments: unboxing, placing the cup, choosing with the buttons, accessing the drip tray, using the brewing head, and filling the water tank.',
      points: ['Kept primary actions visible', 'Separated wet and dry touchpoints', 'Made removable parts accessible', 'Reduced unnecessary interaction steps'],
      visuals: [
        projectImage('arc', 'arc-journey-01.png', 'Unboxing sequence', 'ARC journey sketch showing the machine being lifted from its packaging and placed on a counter', true),
        projectImage('arc', 'arc-journey-02.png', 'Cup setup and tray access', 'ARC journey sketch showing cup placement, cup-size selection, and drip-tray access', true),
        projectImage('arc', 'arc-journey-03.png', 'Water-tank access', 'ARC journey sketch showing the side water tank being removed and refilled', true),
        projectImage('arc', 'arc-journey-04.png', 'Front touchpoints', 'ARC interaction sketch showing the brewing head, front opening, and removable tray', true),
      ],
    },
    {
      title: 'CAD and internal packaging',
      copy: 'CAD studies resolved the exterior surfaces alongside the water tank, pump, brewing path, drip tray, controls, and internal structure. Section views verified that the sculptural shell could contain a workable layout.',
      points: ['Built internal and section views', 'Checked water and cable routing', 'Resolved component clearances', 'Maintained a consistent exterior silhouette'],
      visuals: [
        projectImage('arc', 'Slide 16_9 - 96.png', 'Orthographic drawing', 'ARC coffee-machine orthographic drawings showing front, side, and top geometry'),
        projectImage('arc', 'Slide 16_9 - 97.png', 'Exploded CAD study', 'Exploded ARC coffee-machine CAD assembly showing internal modules and outer shell'),
      ],
    },
    {
      title: 'CMF and final product family',
      layout: 'full-media equal-height-final-render-media',
      copy: 'Dark peach and muted green directions were rendered separately and together. Context images tested how the appliance behaved as an object within a kitchen rather than only on a studio background.',
      points: ['Dark peach product direction', 'Muted green product direction', 'Shared charcoal touchpoints', 'Kitchen and countertop context'],
      visuals: [
        projectImage('arc', 'COFFEE1.52.png', 'Two-color product family', 'Peach and green ARC coffee machines arranged together in a bright studio'),
        projectImage('arc', 'COFFEE1.57.png', 'Peach finish', 'Peach ARC coffee machine shown in a dramatic side-lit studio'),
        projectImage('arc', 'COFFEE1.59.png', 'Green countertop view', 'Green ARC coffee machine with a cup positioned beneath the brewing head'),
        projectImage('arc', 'COFFEE1.66 1.png', 'Transparent construction view', 'Transparent ARC render revealing internal brewing and water components'),
        projectImage('arc', 'untitled.46.png', 'Green front profile', 'Front studio render of the green ARC coffee machine'),
        projectImage('arc', 'untitled.47.png', 'Green three-quarter profile', 'Three-quarter studio render of the green ARC coffee machine'),
        projectImage('arc', 'untitled.49.1.png', 'Dark studio portrait', 'Green ARC coffee machine centered against a dark studio background'),
        projectImage('arc', 'Untitled.png', 'Kitchen context', 'Green ARC coffee machine placed on a dark residential kitchen counter'),
        projectImage('arc', 'WhatsApp Image 2025-11-12 at 00.06.58_3ccbb2c6 1.png', 'Warm interior context', 'Green ARC coffee machine lit warmly in an interior setting'),
      ],
    },
    {
      title: 'Parts, materials, and manufacturing',
      layout: 'arc-technical-docs',
      copy: 'A twelve-component exploded map and two material studies developed the product beyond styling. The manufacturing report considered wall thickness, draft, ribs, inserts, gaskets, fasteners, pump and cable access, service, durability, and cost.',
      points: ['Twelve-part architecture', 'Material assignments by function', 'Draft and wall-thickness strategy', 'Ribs, inserts, gaskets, and fasteners', 'Service and assembly access'],
      visuals: [
        projectImage('arc', 'arc-component-map.png', 'Twelve-component exploded view', 'Exploded ARC coffee-machine assembly identifying the body shell, buttons, back plate, water tank, heater, pump, brewing head, screen, drip tray, drip-tray cover, handle, and water-tank cap', true),
        projectImage('arc', 'arc-materials-finish-01.png', 'Materials and finish study, components 1–6', 'ARC materials and manufacturing table covering the buttons, body shell, back plate, water tank, heater housing, and water-pump housing', true),
        projectImage('arc', 'arc-materials-finish-02.png', 'Materials and finish study, components 7–13', 'ARC materials and manufacturing table covering internal piping, screen, drip tray, drip-tray cover, water-tank cap, and power cable and plug', true),
      ],
    },
    {
      title: 'Market position',
      layout: 'arc-market-position',
      copy: 'ARC was positioned at a conceptual price of $299 and compared with Nespresso, Keurig, SMEG, DeLonghi, and Breville to locate the balance between accessible function and expressive countertop presence.',
      points: ['Compared mainstream and design-led competitors', 'Balanced visual identity with attainable pricing', 'Positioned ARC at $299 between convenience and ritual'],
      visuals: [
        projectImage('arc', 'arc-price-positioning.png', 'Price and design-expression positioning', 'Competitive map positioning the $299 ARC coffee machine by price and design expression against Nespresso, Keurig, SMEG, DeLonghi, and Breville products', true),
      ],
    },
  ],
  cura: [
    {
      title: 'Problem definition and secondary research',
      copy: 'The project began by studying why medication plans break down in daily life. Forgetfulness was only one cause. Rigid schedules, changing routines, unclear instructions, alarm fatigue, and dependence on memory all contributed.',
      points: ['Reviewed adherence behavior and routine disruption', 'Separated intentional and unintentional non-adherence', 'Mapped the burden of repeated reminders', 'Identified caregiver uncertainty as a connected problem'],
      visuals: ['Problem framing', 'Secondary research findings'],
    },
    {
      title: 'Survey and interview research',
      copy: 'A survey established broad patterns while interviews revealed how people actually negotiate doses around meals, commuting, sleep, work, and changing energy levels.',
      points: ['Asked how reminders are currently managed', 'Compared exact-time and routine-based behavior', 'Captured reasons reminders are dismissed', 'Studied when caregiver involvement feels helpful or intrusive'],
      visuals: ['Survey findings', 'Interview themes and participant quotes'],
    },
    {
      title: 'Market and competitive analysis',
      copy: 'Existing medication tools were reviewed for setup, scheduling, reminder behavior, adherence history, caregiver support, and recovery after a late dose. Most treated the schedule as a set of exact alarm times.',
      points: ['Compared leading reminder products', 'Mapped feature coverage and gaps', 'Studied notification escalation', 'Identified rigid timing as the main design opportunity'],
      visuals: ['Market study', 'Competitive feature analysis'],
    },
    {
      title: 'Affinity mapping and design criteria',
      copy: 'Research was synthesized into themes around flexibility, clarity, emotional tone, recovery, and support. These became criteria for a system that guides without shaming and escalates only when attention is genuinely needed.',
      points: ['Fit medication into real routines', 'Make state and next action obvious', 'Allow recovery after a missed moment', 'Keep caregiver visibility proportional', 'Avoid alarm fatigue and guilt'],
      visuals: ['Affinity map', 'Final design criteria'],
    },
    {
      title: 'Personas, empathy, and journey',
      copy: 'Patient and caregiver perspectives were developed together. The journey map traced planning, taking, delaying, missing, checking, and supporting a dose to show where information and emotion changed across the day.',
      points: ['Patient needs autonomy and low friction', 'Caregiver needs meaningful exceptions', 'Both need one trusted dose state', 'The system must distinguish late from missed'],
      visuals: [
        projectImage('cura', 'iPhone 16 Pro - 61.png', 'Caregiver dashboard wireframe', 'Low-fidelity caregiver dashboard showing a member overview and medication activity'),
        projectImage('cura', 'iPhone 16 Pro - 62.png', 'Family support wireframe', 'Low-fidelity family-support screen with member status and invitation controls'),
      ],
    },
    {
      title: 'Opportunity and information architecture',
      copy: 'The central opportunity was a shared state model organized around flexible time windows. Information architecture connected medications, today’s schedule, reminders, adherence history, and caregiver access without duplicating the same dose in separate systems.',
      points: ['Defined the time-window concept', 'Mapped primary navigation', 'Connected patient and caregiver views', 'Created one source of truth for dose status'],
      visuals: [
        projectImage('cura', 'iPhone 16 Pro - 58.png', 'Schedule structure', 'Low-fidelity Cura schedule screen organizing medication around time windows'),
        projectImage('cura', 'iPhone 16 Pro - 59.png', 'Medication information structure', 'Low-fidelity add-medication screen showing the core information fields'),
      ],
    },
    {
      title: 'Iterations and wireframes',
      copy: 'Early flows tested how much information belonged on the home screen, how a time window should be communicated, and how users could recover after dismissing or delaying a reminder.',
      points: ['Iterated daily schedule hierarchy', 'Compared exact time with flexible range language', 'Tested add-medication sequence', 'Explored reminder actions and recovery paths'],
      visuals: [
        projectImage('cura', 'iPhone 16 Pro - 46.png', 'Early sign-in wireframe', 'Early Cura sign-in wireframe'),
        projectImage('cura', 'iPhone 16 Pro - 47.png', 'Early daily view', 'Low-fidelity daily medication schedule wireframe'),
        projectImage('cura', 'iPhone 16 Pro - 63.png', 'Missed-dose recovery', 'Low-fidelity missed-dose sheet with recovery actions'),
        projectImage('cura', 'iPhone 16 Pro - 64.png', 'Medication form iteration', 'Low-fidelity medication form with repeat-frequency options open'),
        projectImage('cura', 'iPhone 16 Pro - 65.png', 'Add-medication iteration', 'Low-fidelity add-medication screen with multiple entry options'),
      ],
    },
    {
      title: 'Design framework and state logic',
      copy: 'The final framework defined a dose as upcoming, due, late, taken, or missed. Every patient notification, daily card, history record, and caregiver update derives from this same progression.',
      points: ['Upcoming before the window opens', 'Due during the intended routine window', 'Late while action is still recoverable', 'Taken as a resolved success state', 'Missed only after the recovery period closes'],
      visuals: [
        projectImage('cura', 'Group 160.png', 'Reminder state one', 'Cura notification shown on an iPhone lock screen'),
        projectImage('cura', 'Group 161.png', 'Reminder state two', 'Second medication reminder state shown on an iPhone lock screen'),
        projectImage('cura', 'Group 162.png', 'Reminder state three', 'Escalated Cura medication notification on an iPhone lock screen'),
        projectImage('cura', 'Group 163.png', 'Reminder actions', 'Expanded Cura medication reminder with taken, snooze, and skip actions'),
        projectImage('cura', 'Group 164.png', 'Late-dose actions', 'Expanded late-dose Cura notification with recovery actions'),
        projectImage('cura', 'Notification 1.png', 'Notification anatomy', 'Isolated Cura notification showing medication details and direct actions'),
      ],
    },
    {
      title: 'Onboarding and medication setup',
      copy: 'Onboarding introduces the flexible model before asking for medication details. Adding a medication captures what is taken, how often, relevant instructions, and the routine window in which it should happen.',
      points: ['Explain the system in plain language', 'Collect medication details progressively', 'Choose a routine-based window', 'Review the schedule before saving'],
      visuals: [
        projectImage('cura', 'iPhone 16 Pro - 48.png', 'Time-window setup', 'Cura setup screen for defining flexible morning, afternoon, and evening time windows'),
        projectImage('cura', 'iPhone 16 Pro - 49.png', 'Notification preferences', 'Cura notification-preference screen with sound, vibration, and quiet-hours controls'),
        projectImage('cura', 'iPhone 16 Pro - 50.png', 'Add-medication entry', 'Cura add-medication screen offering scan, search, and manual entry'),
        projectImage('cura', 'iPhone 16 Pro - 51.png', 'Family-support setup', 'Cura family-support screen explaining optional caregiver visibility'),
      ],
    },
    {
      title: 'Daily experience and reminder states',
      copy: 'The daily view prioritizes what needs attention now. Reminder content changes with state so an upcoming dose, a due action, and a late recovery do not sound or behave the same.',
      points: ['Today view groups the active schedule', 'Due reminders offer a direct taken action', 'Late reminders support recovery without blame', 'History preserves the final state'],
      visuals: [
        projectImage('cura', 'Group 153.png', 'Morning schedule', 'Cura daily schedule showing upcoming morning medications'),
        projectImage('cura', 'Group 154.png', 'Taken medication state', 'Cura daily schedule with one medication marked taken'),
        projectImage('cura', 'Group 155.png', 'Completed morning state', 'Cura daily schedule showing completed morning doses'),
        projectImage('cura', 'Group 156.png', 'Updated daily state', 'Cura daily schedule with medication status updated'),
        projectImage('cura', 'Group 157.png', 'Upcoming medication state', 'Cura schedule with upcoming medications awaiting action'),
        projectImage('cura', 'Group 158.png', 'Multiple completed doses', 'Cura daily schedule with multiple medications marked taken'),
        projectImage('cura', 'Group 159.png', 'Daily overview', 'Cura daily medication overview showing the current schedule state'),
      ],
    },
    {
      title: 'Caregiver view and escalation',
      copy: 'Caregivers see the same dose state through a calmer support lens. Routine successes stay quiet while meaningful late or missed events can surface for follow-up.',
      points: ['Avoid constant surveillance', 'Share only relevant exceptions', 'Keep patient and caregiver status synchronized', 'Make support actions clear'],
      visuals: [
        projectImage('cura', 'Hand and iPhone 16 Pro-!.png', 'Cura launch experience', 'Hand holding a phone with the Cura capsule mark on a blue launch screen'),
        projectImage('cura', 'Hand and iPhone 16 Pro.png', 'Cura in use', 'Person using the Cura daily medication interface on a phone'),
      ],
    },
    {
      title: 'Testing, iteration, and limitations',
      copy: 'Testing focused on whether people understood time windows, reminder language, and the difference between late and missed. Iterations tightened hierarchy and reduced ambiguity. The concept still requires longitudinal study and clinical review.',
      points: ['Tested comprehension of the time-window model', 'Reviewed reminder tone and urgency', 'Refined state labels and transitions', 'Documented outcomes without claiming clinical efficacy'],
      visuals: [
        projectImage('cura', 'iPhone 16 Pro.png', 'Final reminder in context', 'Cura reminder shown on a phone in a dark environmental render'),
      ],
    },
  ],
  forkast: [
    {
      title: 'Framing the trust problem',
      copy: 'For a diner with a serious allergy, a menu is not enough. Safety depends on ingredients, preparation, cross-contact, and whether the right question reaches someone who can answer it.',
      points: ['Replace staff memory with shared evidence', 'Show why a dish is safe or risky', 'Connect the diner to the people preparing the food', 'Treat uncertainty honestly instead of hiding it'],
      visuals: [],
    },
    {
      title: 'Building the model before the interface',
      copy: 'Low-fidelity work tested the diner flow and staff dashboards before visual styling. The central design task was representing risk consistently across four roles.',
      points: ['Mapped the menu and dish-detail hierarchy', 'Placed substitutions beside risk information', 'Designed escalation as a working queue', 'Kept one safety model across phone and desktop'],
      visuals: [
        forkastImage('01-wireframe-menu.png', 'Low-fidelity diner menu', 'Wireframe of the Forkast diner menu'),
        forkastImage('02-wireframe-dish.png', 'Low-fidelity dish detail', 'Wireframe of the Forkast dish detail screen'),
      ],
    },
    {
      title: 'Set allergens once, then browse normally',
      copy: 'Onboarding captures the diner’s allergen profile. Every menu can then be checked against that profile, with conflicting dishes hidden and menu changes surfaced.',
      points: ['Search and add allergens once', 'Personalize every restaurant menu', 'Notify the diner when dish information changes', 'Keep Avoid items available only when intentionally revealed'],
      visuals: [],
    },
    {
      title: 'A verdict that shows its evidence',
      copy: 'Safe, Caution, and Avoid states are always paired with a Contain, May contain, and Cross-contact breakdown. The diner sees the reason before deciding whether to order.',
      points: ['Avoid a context-free safety badge', 'Separate ingredients from preparation risk', 'Offer substitution where risk can be reduced', 'Require review before the order action unlocks'],
      visuals: [],
    },
    {
      title: 'Designing the honest edge cases',
      copy: 'When a menu cannot safely serve the diner, the system says so directly. Questions move to restaurant staff instead of ending in a vague warning or relying on a server’s memory.',
      points: ['State when no safe option exists', 'Provide common and free-text questions', 'Show pending and answered requests', 'Allow follow-up without restarting the conversation'],
      visuals: [],
    },
    {
      title: 'Carrying risk through the restaurant',
      copy: 'Allergy information travels with the order. Servers see questions and upcoming covers, the line sees preparation protocols, and the head chef resolves escalations with station-level risk in view.',
      points: ['Server view prioritizes questions and table states', 'Line tickets call out surfaces, oil, and utensils', 'Chef can approve, substitute, or reject', 'Resolved answers can feed a shared answer bank'],
      visuals: [],
    },
    {
      title: 'One data layer, four points of view',
      copy: 'The diner profile, dish breakdown, cross-contact map, ticket state, and answer bank form one shared source of truth. Each role sees only the information needed to act.',
      points: ['Diner receives understandable evidence', 'Server manages communication', 'Line receives preparation instructions', 'Chef owns high-risk decisions', 'Future work should test governance and live-service adoption'],
      visuals: [],
    },
  ],
}
