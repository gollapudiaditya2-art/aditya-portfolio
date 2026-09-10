import { browserSession, wait } from './browser-session.mjs'

const parseRgb = (value) => (value.match(/[\d.]+/g) || []).slice(0, 3).map(Number)
const relativeLuminance = (value) => {
  const channels = parseRgb(value).map((channelValue) => {
    const channel = channelValue / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}
const contrastRatio = (foreground, background) => {
  const first = relativeLuminance(foreground)
  const second = relativeLuminance(background)
  return Number(((Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)).toFixed(2))
}

const browser = await browserSession()
const { send, evaluate } = browser

try {
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: 'http://127.0.0.1:4183' })
  await wait(800)

  const results = await evaluate(`(() => {
    const parse = (value) => (value.match(/[\\d.]+/g) || []).slice(0, 3).map(Number)
    const parseRgba = (value) => {
      if (/^#[0-9a-f]{8}$/i.test(value)) {
        return {
          rgb: [value.slice(1,3), value.slice(3,5), value.slice(5,7)].map((channel) => Number.parseInt(channel, 16)),
          alpha: Number.parseInt(value.slice(7,9), 16) / 255,
        }
      }
      const channels = (value.match(/[\\d.]+/g) || []).map(Number)
      return { rgb: channels.slice(0, 3), alpha: channels[3] ?? 1 }
    }
    const luminance = (rgb) => {
      const channels = rgb.map((value) => {
        const channel = value / 255
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
      })
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
    }
    const contrast = (foreground, background) => {
      const first = luminance(parse(foreground))
      const second = luminance(parse(background))
      return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
    }
    const composite = ({ rgb, alpha }, background = [255,255,255]) => rgb.map(
      (channel, index) => channel * alpha + background[index] * (1 - alpha),
    )
    const header = document.querySelector('.site-header')
    const sample = (name) => {
      const foreground = getComputedStyle(document.querySelector('.menubtn')).color
      const surface = getComputedStyle(header, '::before')
      const background = Number(surface.opacity) >= 0.9
        ? surface.backgroundColor
        : getComputedStyle(document.body).backgroundColor
      return { name, foreground, background, ratio: Number(contrast(foreground, background).toFixed(2)) }
    }

    header.classList.add('is-scrolled')
    const scrolled = sample('scrolled')
    document.body.classList.add('footer-in-view')
    const footerFlagOnLightSurface = sample('footer-flag-on-light-surface')
    document.body.classList.remove('footer-in-view')
    document.querySelector('.menubtn').style.transition = 'none'
    document.body.classList.add('menu-open')
    const menuOpen = (() => {
      const foreground = getComputedStyle(document.querySelector('.menubtn')).color
      const background = getComputedStyle(document.querySelector('.menu')).backgroundColor
      return { name: 'menu-open', foreground, background, ratio: Number(contrast(foreground, background).toFixed(2)) }
    })()
    document.body.classList.remove('menu-open')
    const brandOnLight = (() => {
      const control = document.querySelector('.brand-home')
      const foreground = getComputedStyle(control).color
      const background = getComputedStyle(document.body).backgroundColor
      return { name: 'brand-on-light', foreground, background, ratio: Number(contrast(foreground, background).toFixed(2)), minimum: 3 }
    })()
    const brandOnDark = (() => {
      document.querySelector('.brand-home').style.transition = 'none'
      document.body.classList.add('brand-on-dark')
      const control = document.querySelector('.brand-home')
      const foreground = getComputedStyle(control).color
      const background = getComputedStyle(document.querySelector('.menu')).backgroundColor
      document.body.classList.remove('brand-on-dark')
      return { name: 'brand-on-dark', foreground, background, ratio: Number(contrast(foreground, background).toFixed(2)), minimum: 3 }
    })()
    const scrim = getComputedStyle(document.documentElement).getPropertyValue('--color-media-contrast-scrim').trim()
    const worstCaseBackground = composite(parseRgba(scrim))
    const worstCaseBackgroundValue = 'rgb(' + worstCaseBackground.join(',') + ')'
    const mediaTextWorstCase = {
      name: 'media-text-over-brightest-image-pixel',
      foreground: 'rgb(255,255,255)',
      background: 'rgb(' + worstCaseBackground.map((value) => Math.round(value)).join(',') + ')',
      ratio: Number(contrast('rgb(255,255,255)', worstCaseBackgroundValue).toFixed(2)),
      minimum: 4.5,
      scrim,
    }
    return [scrolled, footerFlagOnLightSurface, menuOpen, brandOnLight, brandOnDark, mediaTextWorstCase]
  })()`)

  await send('Page.navigate', { url: 'http://127.0.0.1:4183/about?contrast=about' })
  await wait(800)
  const aboutPersonalStory = await evaluate(`(async () => {

    const target = document.querySelector('.personal-story')
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 20, behavior: 'instant' })
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const logo = document.querySelector('.brand-home')
    return {
      name: 'about-personal-story-logo-tone',
      foreground: getComputedStyle(logo).color,
      background: getComputedStyle(target).backgroundColor,
      switched: document.body.classList.contains('brand-on-dark'),
      minimum: 3,
    }
  })()`)
  aboutPersonalStory.ratio = contrastRatio(aboutPersonalStory.foreground, aboutPersonalStory.background)
  results.push(aboutPersonalStory)

  const violations = results.filter((result) => result.ratio < (result.minimum ?? 4.5) || result.switched === false)
  console.log(JSON.stringify({ rule: 'WCAG 1.4.3 Contrast (Minimum)', results, violations }, null, 2))
  if (violations.length) process.exitCode = 1
} finally {
  await browser.close()
}
