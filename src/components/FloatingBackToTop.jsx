import { useEffect, useState } from 'react'

export function FloatingBackToTop({ shellRef, activeScreen, isMenuOpen }) {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      const next = shell.scrollTop > 24
      setHasScrolled((current) => current === next ? current : next)
    }
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    shell.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      shell.removeEventListener('scroll', handleScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [activeScreen, shellRef])

  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    shellRef.current?.scrollTo({ top: 0, behavior })
  }

  const isVisible = hasScrolled && !isMenuOpen

  return (
    <button
      className={`floating-back-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={scrollToTop}
    >
      <span>Back to top</span>
      <span aria-hidden="true">↑</span>
    </button>
  )
}
