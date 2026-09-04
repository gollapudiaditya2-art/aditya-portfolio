import { spawn } from 'node:child_process'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const root = process.cwd()
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const profile = await mkdtemp(join(tmpdir(), 'portfolio-header-contrast-'))
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
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
const vite = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4175'], { cwd: root, stdio: 'ignore' })
const chrome = spawn(chromePath, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9225', `--user-data-dir=${profile}`, '--window-size=1440,900',
], { stdio: 'ignore' })

let ws
let nextId = 0
const pending = new Map()
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = async (expression) => {
  const response = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (response.result.exceptionDetails) throw new Error(response.result.exceptionDetails.text)
  return response.result.result.value
}

try {
  await wait(2000)
  let target
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const targets = await fetch('http://127.0.0.1:9225/json').then((response) => response.json())
      target = targets.find((entry) => entry.type === 'page')
      if (target) break
    } catch {}
    await wait(100)
  }
  if (!target) throw new Error('Chrome DevTools target was not available')

  ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true })
    ws.addEventListener('error', reject, { once: true })
  })
  ws.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (!message.id || !pending.has(message.id)) return
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message)); else resolve(message)
  })

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Page.navigate', { url: 'http://127.0.0.1:4175' })
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

  await send('Page.navigate', { url: 'http://127.0.0.1:4175/about?contrast=about' })
  await wait(800)
  const aboutPersonalStory = await evaluate(`(async () => {
    const shell = document.querySelector('#shell')
    const target = document.querySelector('.personal-story')
    shell.scrollTop += target.getBoundingClientRect().top - 20
    shell.dispatchEvent(new Event('scroll'))
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
  if (ws) ws.close()
  chrome.kill()
  vite.kill()
  await wait(150)
  try {
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
  } catch (error) {
    console.warn(`Temporary Chrome profile cleanup deferred: ${error.code || error.message}`)
  }
}
