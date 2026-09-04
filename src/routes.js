export const ROUTES = {
  fork: '/',
  about: '/about',
  colophon: '/colophon',
  'id-index': '/industrial-design',
  'id-aurio': '/work/aurio',
  'id-arc': '/work/arc',
  'id-bastion': '/work/bastion',
  'ux-index': '/ux-ui',
  'ux-forkast-visual': '/work/forkast',
  'ux-forkast-process': '/work/forkast/process',
  'ux-forkast-testing': '/work/forkast/testing',
  'ux-cura-visual': '/work/cura',
  'ux-cura-process': '/work/cura/process',
  'ux-cura-testing': '/work/cura/testing',
  'not-found': '/404',
}

export const SCREEN_BY_PATH = Object.fromEntries(
  Object.entries(ROUTES).map(([screen, path]) => [path, screen]),
)

export const SCREEN_META = {
  fork: ['Aditya Gollapudi — Industrial & UX/UI Designer', 'Portfolio of Aditya Gollapudi, an industrial and UX/UI designer working across physical objects, digital systems, research, and prototypes.', '/assets/images/aurio/Untitled6 (1) 1.jpg', 'Aurio wearable hearing-support concept by Aditya Gollapudi'],
  about: ['About — Aditya Gollapudi', 'About Aditya Gollapudi: industrial design, UX/UI, front-end development, research, prototyping, experience, and education.', '/assets/images/personal/gallery/blender-blue-porsche-render.jpg', 'Rendered blue Porsche model by Aditya Gollapudi'],
  colophon: ['Colophon — Aditya Gollapudi', 'How Aditya Gollapudi’s portfolio was designed and built, including its typography, technology, accessibility, and image approach.', '/assets/brand/aditya-gollapudi-wordmark-hero.svg', 'Aditya Gollapudi wordmark'],
  'id-index': ['Industrial Design — Aditya Gollapudi', 'Industrial design work by Aditya Gollapudi, including Aurio, ARC, Bastion, and product development from research through prototype.', '/assets/images/aurio/Untitled6 (1) 1.jpg', 'Aurio wearable hearing-support concept by Aditya Gollapudi'],
  'id-aurio': ['Aurio — Aditya Gollapudi', 'Aurio is a hearing-support wearable designed by Aditya Gollapudi to be worn openly as expressive personal hardware.', '/assets/images/aurio/Untitled6 (1) 1.jpg', 'Aurio wearable hearing-support concept by Aditya Gollapudi'],
  'id-arc': ['ARC Coffee Machine — Aditya Gollapudi', 'ARC is a sculptural countertop coffee-machine concept developed through ritual research, sketching, physical models, CAD, CMF, and manufacturing studies.', '/assets/images/arc/COFFEE1.54.jpg', 'ARC sculptural countertop coffee-machine concept by Aditya Gollapudi'],
  'id-bastion': ['Bastion — Aditya Gollapudi', 'Bastion is a smart door system combining access, monitoring, communication, and a resilient physical-key fallback.', '/assets/images/bastion/new6 1.jpg', 'Bastion smart door system by Aditya Gollapudi'],
  'ux-index': ['UX/UI Design — Aditya Gollapudi', 'UX/UI case studies and shipped digital products by Aditya Gollapudi, spanning research, service systems, interface design, prototyping, and front-end implementation.', '/assets/images/forkast/showcase/forkast-allergy-hero.jpg', 'Forkast restaurant-allergy safety system by Aditya Gollapudi'],
  'ux-forkast-visual': ['Forkast Case Study — Aditya Gollapudi', 'Forkast is a two-sided restaurant-allergy safety system connecting diner decisions with waiter, chef, and kitchen workflows.', '/assets/images/forkast/showcase/forkast-allergy-hero.jpg', 'Forkast restaurant-allergy safety system by Aditya Gollapudi'],
  'ux-forkast-process': ['Forkast Full Process — Aditya Gollapudi', 'The complete Forkast research and design process, from allergy-safety research through a connected four-role restaurant workflow.', '/assets/images/forkast/showcase/device-composition.png', 'Forkast device composition across diner and kitchen roles'],
  'ux-forkast-testing': ['Forkast Usability Testing — Aditya Gollapudi', 'Forkast usability-testing evidence from customer and restaurant-side studies, including the workflow failure that changed the system.', '/assets/images/forkast/showcase/customer-safety-composition.png', 'Forkast customer safety usability-testing composition'],
  'ux-cura-visual': ['Cura Case Study — Aditya Gollapudi', 'Cura is a medication-support concept built around flexible routines, recoverable dose states, and bounded caregiver visibility.', '/assets/images/cura/cura-device-hero.jpg', 'Cura medication-support concept by Aditya Gollapudi'],
  'ux-cura-process': ['Cura Full Process — Aditya Gollapudi', 'The complete Cura research and design process, including synthesis, information architecture, interaction states, and prototype testing.', '/assets/images/cura/Hand and iPhone 16 Pro.png', 'Cura app shown on an iPhone held in hand'],
  'ux-cura-testing': ['Cura Usability Testing — Aditya Gollapudi', 'Two rounds of moderated Cura usability testing showing how hidden gestures and unclear states became visible, testable actions.', '/assets/images/cura/After.png', 'Cura interface after usability-testing revisions'],
  'not-found': ['Page Not Found — Aditya Gollapudi', 'The requested portfolio page could not be found.', '/assets/brand/aditya-gollapudi-wordmark-hero.svg', 'Aditya Gollapudi wordmark'],
}

const normalizePath = (path) => path && path !== '/' ? path.replace(/\/+$/, '') || '/' : '/'

export const routePath = (screen) => ROUTES[screen] || '/'

export function screenFromLocation(location = window.location) {
  const path = normalizePath(location.pathname)
  const legacyScreen = location.hash.slice(1)
  if (path === '/' && ROUTES[legacyScreen]) return legacyScreen
  const pathScreen = SCREEN_BY_PATH[path]
  if (pathScreen) return pathScreen
  return 'not-found'
}

export const isUnmodifiedPrimaryClick = (event) => !event || (
  event.button === 0
  && !event.metaKey
  && !event.ctrlKey
  && !event.shiftKey
  && !event.altKey
)
