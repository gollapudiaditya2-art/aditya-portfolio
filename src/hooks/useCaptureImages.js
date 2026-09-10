import { useEffect } from 'react'

// Finish offscreen image requests after the opening frame, so native full-page
// capture and printing do not depend on manually scrolling through each image.
export function useCaptureImages(screen) {
  useEffect(() => {
    const load = () => document.querySelectorAll('#shell img[loading="lazy"]').forEach(image => { image.loading = 'eager' })
    const timer = window.setTimeout(load, 1000)
    window.addEventListener('beforeprint', load)
    return () => { clearTimeout(timer); window.removeEventListener('beforeprint', load) }
  }, [screen])
}
