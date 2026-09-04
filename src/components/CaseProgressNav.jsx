import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export function CaseProgressNav({ label, items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const linkRefs = useRef([])
  const programmaticIndexRef = useRef(null)
  const settleTimerRef = useRef(0)
  const releaseProgrammaticRef = useRef(() => {})
  const sectionKey = items.map((item) => item.id).join('|')

  useEffect(() => {
    const shell = document.getElementById('shell')
    const sections = sectionKey.split('|').map((id) => document.getElementById(id)).filter(Boolean)
    if (!shell || sections.length === 0) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      if (programmaticIndexRef.current !== null) {
        setActiveIndex(programmaticIndexRef.current)
        return
      }

      const trigger = Math.min(shell.clientHeight * .32, 280)
      let nextIndex = 0

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= trigger) nextIndex = index
      })

      if (shell.scrollTop + shell.clientHeight >= shell.scrollHeight - 2) {
        nextIndex = sections.length - 1
      }

      setActiveIndex((current) => current === nextIndex ? current : nextIndex)
    }

    const releaseProgrammatic = () => {
      if (programmaticIndexRef.current === null) return
      programmaticIndexRef.current = null
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
      settleTimerRef.current = 0
      if (!frame) frame = requestAnimationFrame(update)
    }
    releaseProgrammaticRef.current = releaseProgrammatic

    const requestUpdate = () => {
      if (programmaticIndexRef.current !== null) {
        if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
        settleTimerRef.current = window.setTimeout(releaseProgrammatic, 160)
      }
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    shell.addEventListener('scroll', requestUpdate, { passive: true })
    shell.addEventListener('scrollend', releaseProgrammatic)
    window.addEventListener('resize', requestUpdate)

    return () => {
      shell.removeEventListener('scroll', requestUpdate)
      shell.removeEventListener('scrollend', releaseProgrammatic)
      window.removeEventListener('resize', requestUpdate)
      if (frame) cancelAnimationFrame(frame)
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
      releaseProgrammaticRef.current = () => {}
    }
  }, [sectionKey])

  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    const activeLink = linkRefs.current[activeIndex]
    if (!nav || !indicator || !activeLink) return undefined

    const updateIndicator = () => {
      indicator.style.width = `${activeLink.offsetWidth}px`
      indicator.style.transform = `translate3d(${activeLink.offsetLeft}px,0,0)`

      const targetLeft = activeLink.offsetLeft - (nav.clientWidth - activeLink.offsetWidth) / 2
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (nav.scrollWidth > nav.clientWidth + 1) {
        nav.scrollTo({ left: Math.max(0, targetLeft), behavior: reducedMotion ? 'auto' : 'smooth' })
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeIndex, sectionKey])

  const handleClick = (event, id, index) => {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    programmaticIndexRef.current = index
    if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
    setActiveIndex(index)
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
    settleTimerRef.current = window.setTimeout(
      () => releaseProgrammaticRef.current(),
      reducedMotion ? 0 : 180,
    )
  }

  return (
    <nav className="case-contents" ref={navRef} aria-label={label}>
      <div className="case-contents-track">
        <span className="case-contents-indicator" ref={indicatorRef} aria-hidden="true" />
        {items.map((item, index) => (
          <a
            key={item.id}
            ref={(node) => { linkRefs.current[index] = node }}
            href={`#${item.id}`}
            aria-current={index === activeIndex ? 'location' : undefined}
            onClick={(event) => handleClick(event, item.id, index)}
          >
            {index + 1}. {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
