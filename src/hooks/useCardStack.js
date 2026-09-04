import { useEffect } from 'react'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const easeOutBack = (value) => {
  const overshoot = 1.70158
  return 1 + (overshoot + 1) * Math.pow(value - 1, 3) + overshoot * Math.pow(value - 1, 2)
}

export function useCardStack(shellRef, activeScreen) {
  useEffect(() => {
    const shell = shellRef.current
    const cards = Array.from(shell?.querySelectorAll('.scard') ?? [])
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!shell || cards.length === 0 || reducedMotion.matches) return undefined

    let frame = 0
    let cardHeight = 1
    let stickyTops = []

    const measure = () => {
      cardHeight = cards[0].offsetHeight || 1
      stickyTops = cards.map((card) => parseFloat(getComputedStyle(card).top) || 0)
    }

    const update = () => {
      frame = 0
      const compact = window.matchMedia('(max-width: 860px)').matches
      const tilts = compact ? [-2.2, 2, -1.6] : [-4.5, 4, -3.2]
      const rects = cards.map((card) => card.getBoundingClientRect())
      const transforms = rects.map((rect, index) => {
        const stickyTop = stickyTops[index]
        const covered = index < cards.length - 1
          ? clamp(((stickyTop + cardHeight) - rects[index + 1].top) / cardHeight, 0, 1)
          : 0
        const range = Math.min(cardHeight, 440)
        const arrival = clamp(((stickyTop + range) - rect.top) / range, 0, 1)
        const bounce = arrival > 0 && arrival < 1
          ? (1 - easeOutBack(arrival)) * (compact ? 24 : 38)
          : 0
        const tilt = (tilts[index] || 0) * covered
        const scale = 1 - (compact ? 0.02 : 0.035) * covered
        const recession = -(compact ? 18 : 28) * covered
        return `translateY(${(recession + bounce).toFixed(1)}px) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      })

      cards.forEach((card, index) => {
        card.style.transform = transforms[index]
      })
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const handleResize = () => {
      measure()
      requestUpdate()
    }

    measure()
    update()
    shell.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      shell.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', handleResize)
      if (frame) cancelAnimationFrame(frame)
      cards.forEach((card) => { card.style.transform = '' })
    }
  }, [activeScreen, shellRef])
}
