import { useEffect } from 'react'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const WORDMARK_VIEWBOX = { width: 971, height: 546 }
const G_TERMINAL = { x: 206.74, y: 364.91 }

const point = (x, y) => ({ x, y })
const formatPoint = ({ x, y }) => `${x.toFixed(2)} ${y.toFixed(2)}`

const findLengthAtProgress = (samples, targetProgress) => {
  let low = 0
  let high = samples.length - 1
  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (samples[middle].progress < targetProgress) low = middle + 1
    else high = middle
  }
  const after = samples[low]
  const before = samples[Math.max(0, low - 1)]
  if (!after || !before || after.progress === before.progress) return after?.length ?? 0
  const segmentProgress = clamp(
    (targetProgress - before.progress) / (after.progress - before.progress),
    0,
    1,
  )
  return before.length + (after.length - before.length) * segmentProgress
}

export function usePageEffects(shellRef, activeScreen) {
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const footer = activeScreen === 'fork' ? document.querySelector('.parallax-footer') : null
    const brandHome = document.querySelector('.brand-home')
    const home = activeScreen === 'fork' ? document.querySelector('.home') : null
    const wordmark = activeScreen === 'fork' ? document.querySelector('.hero-wordmark-art') : null
    const homePathSvg = activeScreen === 'fork' ? document.querySelector('.home-draw-path') : null
    const homePathMain = homePathSvg?.querySelector('.home-path-main') ?? null
    const homePathHead = homePathSvg?.querySelector('.home-path-head') ?? null
    const homePathGradient = homePathSvg?.querySelector('#home-path-gradient') ?? null
    const timelineSteps = activeScreen === 'about' ? Array.from(document.querySelectorAll('.tl-step')) : []
    const timelineFill = activeScreen === 'about' ? document.querySelector('.tl-line-fill') : null
    let frame = 0
    let pathMetrics = null
    let pathGeometryDirty = true
    let measuredWordmarkBox = null

    const updateBrandTone = () => {
      if (!brandHome) return
      const rect = brandHome.getBoundingClientRect()
      const underlying = document.elementsFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      ).find((element) => !element.closest('.site-header,.skip-link,.page-transition'))
      const isDark = Boolean(underlying?.closest(
        '.personal-story,.parallax-footer,.scard,.pcard,.work-card,.menu',
      ))
      document.body.classList.toggle('brand-on-dark', isDark)
    }

    const readWordmarkBox = () => {
      if (!home || !wordmark) return null
      const homeRect = home.getBoundingClientRect()
      const wordmarkRect = wordmark.getBoundingClientRect()
      return {
        left: wordmarkRect.left - homeRect.left,
        top: wordmarkRect.top - homeRect.top,
        width: wordmarkRect.width,
        height: wordmarkRect.height,
      }
    }

    const measureHomePath = () => {
      pathGeometryDirty = false
      if (!home || !wordmark || !homePathSvg || !homePathMain) return

      const homeRect = home.getBoundingClientRect()
      const wordmarkRect = wordmark.getBoundingClientRect()
      const width = home.clientWidth
      const height = home.scrollHeight
      if (!width || !height || !wordmarkRect.width || !wordmarkRect.height) return

      measuredWordmarkBox = {
        left: wordmarkRect.left - homeRect.left,
        top: wordmarkRect.top - homeRect.top,
        width: wordmarkRect.width,
        height: wordmarkRect.height,
      }

      const viewportHeight = shell.clientHeight
      const scaleX = wordmarkRect.width / WORDMARK_VIEWBOX.width
      const scaleY = wordmarkRect.height / WORDMARK_VIEWBOX.height
      const anchor = point(
        wordmarkRect.left - homeRect.left + G_TERMINAL.x * scaleX,
        wordmarkRect.top - homeRect.top + G_TERMINAL.y * scaleY,
      )

      const mainWidth = clamp(5 * scaleX, 3, 6)
      const continuationLength = clamp(width * 0.16, 126, 220)
      const exitDirection = point(0.46, -0.89)
      const pathStart = point(
        anchor.x - exitDirection.x * 3,
        anchor.y - exitDirection.y * 3,
      )
      const continuationControlOne = point(
        anchor.x + exitDirection.x * continuationLength * 0.36,
        anchor.y + exitDirection.y * continuationLength * 0.36,
      )
      const getSectionBounds = (selector, fallbackTop, fallbackHeight) => {
        const element = home.querySelector(selector)
        if (!element) return { top: fallbackTop, height: fallbackHeight }
        const rect = element.getBoundingClientRect()
        return { top: rect.top - homeRect.top, height: rect.height }
      }
      const capabilityBounds = getSectionBounds('.whatido', viewportHeight, height * 0.42)
      const projectBounds = getSectionBounds('.proj-cards', height * 0.58, height * 0.24)
      const footerBounds = getSectionBounds('.parallax-footer', height - viewportHeight, viewportHeight)
      const isPhone = width <= 560
      const heroLift = point(width * (isPhone ? 0.44 : 0.5), anchor.y - viewportHeight * (isPhone ? 0.06 : 0.12))
      const heroCrest = point(width * (isPhone ? 0.6 : 0.72), anchor.y - viewportHeight * (isPhone ? 0.025 : 0.06))
      const heroTurn = point(width * (isPhone ? 0.67 : 0.8), anchor.y + viewportHeight * (isPhone ? 0.14 : 0.24))
      const heroSweep = point(width * (isPhone ? 0.34 : 0.15), anchor.y + viewportHeight * (isPhone ? 0.27 : 0.34))
      const weaveRise = point(width * 0.28, anchor.y + viewportHeight * 0.5)
      const weaveCross = point(width * 0.57, anchor.y + viewportHeight * 0.68)
      const weaveOuter = point(width * 0.69, anchor.y + viewportHeight * 0.78)
      const weaveDrop = point(width * 0.54, anchor.y + viewportHeight * 0.9)
      const weaveReturn = point(width * 0.36, anchor.y + viewportHeight * 1.04)
      const heroExit = point(
        width * 0.64,
        Math.max(anchor.y + viewportHeight * 1.2, capabilityBounds.top + capabilityBounds.height * 0.24),
      )
      const capabilityBend = point(
        width * 0.76,
        Math.max(heroExit.y + viewportHeight * 0.6, capabilityBounds.top + capabilityBounds.height * 0.58),
      )
      const projectBend = point(
        width * 0.22,
        Math.max(capabilityBend.y + viewportHeight * 0.78, projectBounds.top + projectBounds.height * 0.42),
      )
      const footerApproach = point(
        width * 0.62,
        Math.max(projectBend.y + viewportHeight * 0.82, footerBounds.top - viewportHeight * 0.18),
      )
      const endY = Math.max(footerApproach.y + viewportHeight * 0.7, height - viewportHeight * 0.48)
      const pathEnd = point(width * 0.58, endY)
      const routePoints = isPhone
        ? [pathStart, heroLift, heroCrest, heroTurn, heroSweep, heroExit, capabilityBend, projectBend, footerApproach, pathEnd]
        : [pathStart, heroLift, heroCrest, heroTurn, heroSweep, weaveRise, weaveCross, weaveOuter, weaveDrop, weaveReturn, heroExit, capabilityBend, projectBend, footerApproach, pathEnd]
      const handleScale = width <= 560 ? 0.13 : 0.16
      const firstControlTwo = point(
        heroLift.x - (heroCrest.x - pathStart.x) * handleScale,
        heroLift.y - (heroCrest.y - pathStart.y) * handleScale,
      )
      const mainPath = [
        `M ${formatPoint(pathStart)}`,
        `C ${formatPoint(continuationControlOne)}, ${formatPoint(firstControlTwo)}, ${formatPoint(heroLift)}`,
      ]
      for (let index = 1; index < routePoints.length - 1; index += 1) {
        const previous = routePoints[index - 1]
        const current = routePoints[index]
        const next = routePoints[index + 1]
        const afterNext = routePoints[index + 2] ?? next
        const controlOne = point(
          current.x + (next.x - previous.x) * handleScale,
          current.y + (next.y - previous.y) * handleScale,
        )
        const controlTwo = point(
          next.x - (afterNext.x - current.x) * handleScale,
          next.y - (afterNext.y - current.y) * handleScale,
        )
        mainPath.push(
          `C ${formatPoint(controlOne)}, ${formatPoint(controlTwo)}, ${formatPoint(next)}`,
        )
      }
      const mainPathData = mainPath.join(' ')

      homePathSvg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      homePathMain.setAttribute('d', mainPathData)
      homePathMain.setAttribute('stroke-width', mainWidth.toFixed(2))
      homePathGradient?.setAttribute('x1', pathStart.x.toFixed(2))
      homePathGradient?.setAttribute('y1', pathStart.y.toFixed(2))
      homePathGradient?.setAttribute('x2', pathEnd.x.toFixed(2))
      homePathGradient?.setAttribute('y2', pathEnd.y.toFixed(2))
      if (homePathHead) {
        homePathHead.setAttribute('r', (mainWidth * 0.5).toFixed(2))
        homePathHead.setAttribute('cx', pathStart.x.toFixed(2))
        homePathHead.setAttribute('cy', pathStart.y.toFixed(2))
      }

      const totalLength = homePathMain.getTotalLength()
      const sampleCount = 640
      const samples = []
      let deepest = pathStart.y
      for (let index = 0; index <= sampleCount; index += 1) {
        const length = totalLength * index / sampleCount
        const sample = homePathMain.getPointAtLength(length)
        deepest = Math.max(deepest, sample.y)
        samples.push({ depth: deepest, length })
      }
      const depthRange = Math.max(1, deepest - pathStart.y)
      samples.forEach((sample) => {
        const depthProgress = clamp((sample.depth - pathStart.y) / depthRange, 0, 1)
        const lengthProgress = sample.length / totalLength
        sample.progress = depthProgress * 0.92 + lengthProgress * 0.08
      })

      const capPadding = mainWidth / 2 + 2
      homePathMain.style.strokeDasharray = `${totalLength} ${totalLength * 2}`
      pathMetrics = { totalLength, capPadding, samples, anchorDepth: pathStart.y, endDepth: deepest }
    }

    const update = () => {
      frame = 0
      if (!pathGeometryDirty && measuredWordmarkBox) {
        const currentWordmarkBox = readWordmarkBox()
        if (currentWordmarkBox && Object.keys(measuredWordmarkBox).some(
          (key) => Math.abs(currentWordmarkBox[key] - measuredWordmarkBox[key]) > 0.5,
        )) pathGeometryDirty = true
      }
      if (pathGeometryDirty) measureHomePath()
      const viewportHeight = shell.clientHeight
      const scrollTop = shell.scrollTop
      updateBrandTone()

      if (activeScreen === 'fork') {
        if (homePathMain && pathMetrics) {
          if (reducedMotion) {
            homePathMain.style.strokeDashoffset = '0'
            if (homePathHead) homePathHead.style.opacity = '0'
          } else {
            const targetDepth = scrollTop + viewportHeight * 0.56
            const targetProgress = clamp(
              (targetDepth - pathMetrics.anchorDepth) / Math.max(1, pathMetrics.endDepth - pathMetrics.anchorDepth),
              0,
              1,
            )
            const visibleLength = scrollTop <= 1 || targetDepth <= pathMetrics.anchorDepth
              ? 0
              : findLengthAtProgress(pathMetrics.samples, targetProgress)
            const reachedPageEnd = scrollTop + viewportHeight >= shell.scrollHeight - 2
            const revealed = reachedPageEnd
              ? pathMetrics.totalLength + pathMetrics.capPadding
              : visibleLength
            homePathMain.style.strokeDashoffset = `${Math.max(
              0,
              pathMetrics.totalLength + pathMetrics.capPadding - revealed,
            ).toFixed(2)}`
            if (homePathHead) {
              const isDrawing = visibleLength > 0 && !reachedPageEnd
              if (isDrawing) {
                const headPoint = homePathMain.getPointAtLength(
                  clamp(visibleLength, 0, pathMetrics.totalLength),
                )
                homePathHead.setAttribute('cx', headPoint.x.toFixed(2))
                homePathHead.setAttribute('cy', headPoint.y.toFixed(2))
              }
              homePathHead.style.opacity = isDrawing ? '1' : '0'
            }
          }
        }

        if (footer) {
          const footerRect = footer.getBoundingClientRect()
          const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 70
          document.body.classList.toggle(
            'footer-in-view',
            footerRect.top <= headerHeight && footerRect.bottom > 0,
          )

          if (reducedMotion) {
            footer.style.setProperty('--footer-parallax', '0px')
            footer.style.setProperty('--footer-dim', '0')
          } else {
            const footerProgress = clamp((viewportHeight - footerRect.top) / viewportHeight, 0, 1)
            footer.style.setProperty(
              '--footer-parallax',
              `${(-viewportHeight * 0.12 * (1 - footerProgress)).toFixed(1)}px`,
            )
            footer.style.setProperty('--footer-dim', (0.38 * (1 - footerProgress)).toFixed(3))
          }
        }
      }

      if (activeScreen === 'about' && timelineSteps.length) {
        if (reducedMotion) {
          timelineSteps.forEach((step) => step.classList.add('on'))
          if (timelineFill) timelineFill.style.transform = 'scaleY(1)'
          return
        }
        const trigger = viewportHeight * 0.5
        const stepTops = timelineSteps.map((step) => step.getBoundingClientRect().top)
        let activeIndex = 0
        stepTops.forEach((top, index) => {
          if (top <= trigger) activeIndex = index
        })

        const reachedPageEnd = scrollTop + viewportHeight >= shell.scrollHeight - 2
        if (reachedPageEnd) activeIndex = timelineSteps.length - 1

        timelineSteps.forEach((step, index) => step.classList.toggle('on', index <= activeIndex))
        if (timelineFill) timelineFill.style.transform = `scaleY(${((activeIndex + 1) / timelineSteps.length).toFixed(3)})`
      }

    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    shell.addEventListener('scroll', requestUpdate, { passive: true })
    const markGeometryDirty = () => {
      pathGeometryDirty = true
      requestUpdate()
    }
    window.addEventListener('resize', markGeometryDirty)
    wordmark?.addEventListener('load', markGeometryDirty)
    const resizeObserver = typeof ResizeObserver === 'function' && home && wordmark
      ? new ResizeObserver(markGeometryDirty)
      : null
    resizeObserver?.observe(home)
    resizeObserver?.observe(wordmark)

    return () => {
      shell.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', markGeometryDirty)
      wordmark?.removeEventListener('load', markGeometryDirty)
      resizeObserver?.disconnect()
      if (frame) cancelAnimationFrame(frame)
      if (footer) {
        footer.style.removeProperty('--footer-parallax')
        footer.style.removeProperty('--footer-dim')
      }
      document.body.classList.remove('footer-in-view')
      document.body.classList.remove('brand-on-dark')
      if (homePathMain) {
        homePathMain.style.removeProperty('stroke-dasharray')
        homePathMain.style.removeProperty('stroke-dashoffset')
      }
      homePathHead?.style.removeProperty('opacity')
    }
  }, [activeScreen, shellRef])
}
