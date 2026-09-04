import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu } from './components/Menu.jsx'
import { PageTransition } from './components/PageTransition.jsx'
import { FloatingBackToTop } from './components/FloatingBackToTop.jsx'
import { useCardStack } from './hooks/useCardStack.js'
import { usePageEffects } from './hooks/usePageEffects.js'
import { HomeScreen } from './screens/Home.jsx'
import { AboutScreen } from './screens/About.jsx'
import { ColophonScreen } from './screens/Colophon.jsx'
import { NotFoundScreen } from './screens/NotFound.jsx'
import { IndustrialIndexScreen } from './screens/IndustrialIndex.jsx'
import { UxIndexScreen } from './screens/UxIndex.jsx'
import { CuraTestingReport, CuraVisualEdit, CuraVisualProcess, ForkastTestingReport, ForkastVisualEdit, ForkastVisualProcess } from './screens/VisualCaseStudy.jsx'
import { ArcScreen, AurioCaseStudy as AurioScreen, BastionScreen } from './screens/ProjectCaseStudy.jsx'
import { isUnmodifiedPrimaryClick, routePath, screenFromLocation, SCREEN_META } from './routes.js'

const screens = {
  fork: HomeScreen,
  about: AboutScreen,
  colophon: ColophonScreen,
  'id-index': IndustrialIndexScreen,
  'id-aurio': AurioScreen,
  'id-arc': ArcScreen,
  'id-bastion': BastionScreen,
  'ux-index': UxIndexScreen,
  'ux-forkast-visual': ForkastVisualEdit,
  'ux-forkast-process': ForkastVisualProcess,
  'ux-forkast-testing': ForkastTestingReport,
  'ux-cura-visual': CuraVisualEdit,
  'ux-cura-process': CuraVisualProcess,
  'ux-cura-testing': CuraTestingReport,
  'not-found': NotFoundScreen,
}

const initialScreen = screenFromLocation()

const updateMeta = (selector, attribute, value) => {
  const element = document.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

export function App() {
  const [activeScreen, setActiveScreen] = useState(initialScreen)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSkipLinkVisible, setIsSkipLinkVisible] = useState(false)
  const shellRef = useRef(null)
  const menuButtonRef = useRef(null)
  const activeScreenRef = useRef(initialScreen)
  const transitionOverlayRef = useRef(null)
  const transitionPathRef = useRef(null)
  const transitionPromiseRef = useRef(null)

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }, [])

  const commitScreen = useCallback((screenId, historyMode = 'push') => {
    activeScreenRef.current = screenId
    setActiveScreen(screenId)
    if (historyMode !== 'none') window.history[`${historyMode}State`](null, '', routePath(screenId))
    requestAnimationFrame(() => {
      const shell = shellRef.current
      shell?.scrollTo({ top: 0 })
      const heading = shell?.querySelector('.screen.active h1')
      if (heading) {
        heading.tabIndex = -1
        heading.focus({ preventScroll: true })
      }
    })
  }, [])

  const go = useCallback((screenId, event, historyMode = 'push') => {
    if (event && !isUnmodifiedPrimaryClick(event)) return Promise.resolve(false)
    event?.preventDefault()
    if (!screens[screenId]) return Promise.resolve(false)
    if (screenId === activeScreenRef.current) {
      shellRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      return Promise.resolve(false)
    }
    if (transitionPromiseRef.current) return transitionPromiseRef.current

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const overlay = transitionOverlayRef.current
    const path = transitionPathRef.current
    const logo = overlay?.querySelector('.page-transition-logo')
    if (reduceMotion || !overlay || !path || !logo || typeof path.animate !== 'function') {
      commitScreen(screenId, historyMode)
      return Promise.resolve(true)
    }

    const waitForPaint = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const run = async () => {
      overlay.hidden = false
      overlay.classList.add('is-active')
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.style.strokeWidth = '8%'
      logo.style.opacity = '0'
      const draw = path.animate([{ strokeDashoffset: length, strokeWidth: '8%' }, { strokeDashoffset: 0, strokeWidth: '31%' }], { duration: 800, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' })
      logo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, delay: 400, fill: 'forwards' })
      await draw.finished
      commitScreen(screenId, historyMode)
      await waitForPaint()
      const retract = path.animate([{ strokeDashoffset: 0, strokeWidth: '31%' }, { strokeDashoffset: -length, strokeWidth: '8%' }], { duration: 1500, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' })
      logo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, delay: 480, fill: 'forwards' })
      await retract.finished
      overlay.classList.remove('is-active')
      overlay.hidden = true
      path.removeAttribute('style')
      logo.removeAttribute('style')
      return true
    }
    transitionPromiseRef.current = run().finally(() => { transitionPromiseRef.current = null })
    return transitionPromiseRef.current
  }, [commitScreen])

  const navigateFromMenu = useCallback((screenId, event) => {
    closeMenu()
    return go(screenId, event)
  }, [closeMenu, go])

  const scrollHome = useCallback(async (targetId) => {
    closeMenu()
    if (activeScreenRef.current !== 'fork') await go('fork')
    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }))
  }, [closeMenu, go])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isMenuOpen])

  useEffect(() => {
    const [title, description, image] = SCREEN_META[activeScreen]
    const absoluteUrl = new URL(routePath(activeScreen), window.location.origin).href
    const absoluteImage = new URL(image, window.location.origin).href
    document.title = title
    updateMeta('meta[name="description"]', 'content', description)
    updateMeta('meta[property="og:title"]', 'content', title)
    updateMeta('meta[property="og:description"]', 'content', description)
    updateMeta('meta[property="og:url"]', 'content', absoluteUrl)
    updateMeta('meta[property="og:image"]', 'content', absoluteImage)
    updateMeta('meta[name="twitter:title"]', 'content', title)
    updateMeta('meta[name="twitter:description"]', 'content', description)
    updateMeta('meta[name="twitter:image"]', 'content', absoluteImage)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = absoluteUrl
    document.body.dataset.screen = activeScreen
  }, [activeScreen])

  useEffect(() => {
    if (window.location.hash && screens[window.location.hash.slice(1)]) {
      window.history.replaceState(null, '', routePath(initialScreen))
    }
    const handlePopState = () => {
      const nextScreen = screenFromLocation()
      if (nextScreen !== activeScreenRef.current) commitScreen(nextScreen, 'none')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [commitScreen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMenuOpen) closeMenu()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu, isMenuOpen])

  useCardStack(shellRef, activeScreen)
  usePageEffects(shellRef, activeScreen)
  const ActiveScreen = screens[activeScreen]

  const skipToContent = (event) => {
    event.preventDefault()
    const heading = shellRef.current?.querySelector('.screen.active h1')
    if (!heading) return
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
    heading.scrollIntoView({ block: 'start' })
  }

  return <>
    <a className={`skip-link${isSkipLinkVisible ? ' is-visible' : ''}`} href="#main-content" onFocus={() => setIsSkipLinkVisible(true)} onBlur={() => setIsSkipLinkVisible(false)} onClick={skipToContent}>Skip to main content</a>
    <header className="site-header">
      <a className="brand-home" href={routePath('fork')} aria-label="Go to home" onClick={(event) => go('fork', event)}><span className="brand-mark" aria-hidden="true" /></a>
      <button ref={menuButtonRef} className="menubtn" id="menubtn" type="button" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMenuOpen} aria-controls="menu" onClick={() => setIsMenuOpen((open) => !open)}><span className="mbtxt" aria-hidden="true"><span className="o">Menu</span><span className="c">Close</span></span><span className="mbars" aria-hidden="true"><i /><i /></span></button>
    </header>
    <Menu activeScreen={activeScreen} isOpen={isMenuOpen} onNavigate={navigateFromMenu} onScrollHome={scrollHome} />
    <PageTransition overlayRef={transitionOverlayRef} pathRef={transitionPathRef} />
    <div id="shell" ref={shellRef} onClick={isMenuOpen ? closeMenu : undefined}>
      <div id="main-content" className="page-content" inert={isMenuOpen ? '' : undefined}><ActiveScreen go={go} /></div>
    </div>
    <FloatingBackToTop key={activeScreen} shellRef={shellRef} activeScreen={activeScreen} isMenuOpen={isMenuOpen} />
  </>
}
