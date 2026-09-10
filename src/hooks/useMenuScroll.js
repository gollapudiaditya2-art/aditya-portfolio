import { useLayoutEffect, useRef } from 'react'

export function useMenuScroll(shellRef, isOpen) {
  const timer = useRef(0)
  useLayoutEffect(() => {
    const shell = shellRef.current
    if (!shell) return
    clearTimeout(timer.current)
    if (isOpen) {
      if (!shell.classList.contains('shell-frozen')) {
        const top = window.scrollY
        document.body.style.setProperty('--frozen-page-height', `${document.documentElement.scrollHeight}px`)
        shell.classList.add('shell-frozen')
        document.body.classList.add('scroll-frozen')
        shell.scrollTop = top
        // Establish the untransformed viewport before starting the menu transition.
        shell.getBoundingClientRect()
      }
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
      const restore = () => {
        if (!shell.classList.contains('shell-frozen')) return
        const top = shell.scrollTop
        shell.classList.remove('shell-frozen')
        document.body.classList.remove('scroll-frozen')
        document.body.style.removeProperty('--frozen-page-height')
        window.scrollTo({ top, behavior: 'instant' })
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) restore()
      else timer.current = window.setTimeout(restore, 650)
    }
    return () => clearTimeout(timer.current)
  }, [isOpen, shellRef])
}
