import { spawn } from 'node:child_process'
import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import path from 'node:path'

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const defaultChrome = process.platform === 'win32'
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : 'google-chrome'

export async function browserSession({ width = 1440, height = 900 } = {}) {
  const temporaryRoot = path.resolve('.tmp')
  await mkdir(temporaryRoot, { recursive: true })
  const profile = await mkdtemp(path.join(temporaryRoot, 'browser-'))
  const baseUrl = 'http://127.0.0.1:4183'
  const vite = spawn(process.execPath, [
    'node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1',
    '--port', '4183', '--strictPort', '--outDir', process.env.PORTFOLIO_DIST || 'dist',
  ], { stdio: 'ignore' })
  const chrome = spawn(process.env.CHROME_PATH || defaultChrome, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    '--remote-debugging-port=9233', `--user-data-dir=${profile}`,
  ], { stdio: 'ignore' })
  let startupError
  for (const child of [vite, chrome]) {
    child.on('error', (error) => { startupError = error })
    child.on('exit', (code) => { startupError ??= Error(`Browser helper exited (${code})`) })
  }

  let ws
  let closed = false
  let nextId = 0
  const pending = new Map()
  const rejectPending = (error) => {
    for (const request of pending.values()) {
      clearTimeout(request.timer)
      request.reject(error)
    }
    pending.clear()
  }
  const close = async () => {
    if (closed) return
    closed = true
    rejectPending(Error('Browser session closed'))
    ws?.close()
    chrome.kill()
    vite.kill()
    await wait(200)
    // Only remove the profile created by this session, inside the workspace temp root.
    if (path.dirname(path.resolve(profile)) !== temporaryRoot) throw Error('Unexpected browser profile path')
    try {
      await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    } catch (error) {
      console.warn(`Browser profile cleanup deferred: ${error.code || error.message}`)
    }
  }

  try {
    let target
    for (let attempt = 0; attempt < 100; attempt++) {
      if (startupError) throw startupError
      try {
        const response = await fetch(baseUrl, { signal: AbortSignal.timeout(500) })
        if (!response.ok) throw Error('Preview unavailable')
        const targets = await fetch('http://127.0.0.1:9233/json', { signal: AbortSignal.timeout(500) }).then((r) => r.json())
        target = targets.find((entry) => entry.type === 'page')
        if (target) break
      } catch {}
      await wait(100)
    }
    if (!target) throw Error('Browser did not start')
    ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(Error('Browser connection timed out')), 10000)
      ws.onopen = () => { clearTimeout(timer); resolve() }
      ws.onerror = () => { clearTimeout(timer); reject(Error('Browser connection failed')) }
    })
    ws.onclose = () => rejectPending(Error('Browser disconnected'))
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data)
      const request = pending.get(message.id)
      if (!request) return
      pending.delete(message.id)
      clearTimeout(request.timer)
      if (message.error) request.reject(Error(message.error.message))
      else request.resolve(message.result)
    }
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++nextId
      const timer = setTimeout(() => {
        pending.delete(id)
        reject(Error(`Browser command timed out: ${method}`))
      }, 120000)
      pending.set(id, { resolve, reject, timer })
      ws.send(JSON.stringify({ id, method, params }))
    })
    const evaluate = async (expression) => {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
      if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails))
      return result.result.value
    }
    const waitFor = async (expression, timeout = 15000) => {
      const deadline = Date.now() + timeout
      while (Date.now() < deadline) {
        if (await evaluate(`Boolean(${expression})`)) return
        await wait(100)
      }
      throw Error(`Page readiness timed out: ${expression}`)
    }
    await send('Page.enable')
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
    return { send, evaluate, waitFor, close, baseUrl }
  } catch (error) {
    await close()
    throw error
  }
}
