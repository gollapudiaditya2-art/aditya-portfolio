import { readdir, readFile, stat } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'

const root = process.cwd()
const ignoredDirectories = new Set([
  '.agents', '.claude', '.codex', '.git', 'node_modules',
  '.motion-check', '.tmp-a11y-review', '.visual-current',
])
const ignoredExtensions = new Set([
  '.avif', '.gif', '.ico', '.jpeg', '.jpg', '.pdf', '.png', '.webp',
  '.woff', '.woff2', '.zip',
])
const rules = [
  ['OpenAI-style API key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{16,}\b/g],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['private key material', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ['assigned credential', /\b(?:api[_-]?key|access[_-]?token|client[_-]?secret|password|passwd|secret)\b\s*[:=]\s*["'`](?!\s*(?:example|placeholder|replace|test|undefined|null)\b)[^"'`\r\n]{8,}["'`]/gi],
  ['authorization bearer token', /\bAuthorization\b\s*[:=]\s*["'`]Bearer\s+[A-Za-z0-9._~-]{12,}["'`]/gi],
]

const files = []
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && (
      ignoredDirectories.has(entry.name)
      || entry.name.startsWith('dist')
      || entry.name.startsWith('.chrome-')
      || entry.name.startsWith('.review-')
    )) continue
    const absolutePath = resolve(directory, entry.name)
    if (entry.isDirectory()) await walk(absolutePath)
    else if (entry.isFile() && !ignoredExtensions.has(extname(entry.name).toLowerCase())) files.push(absolutePath)
  }
}

await walk(root)
const findings = []
for (const file of files) {
  if ((await stat(file)).size > 2_000_000) continue
  const content = await readFile(file, 'utf8')
  for (const [rule, pattern] of rules) {
    pattern.lastIndex = 0
    if (pattern.test(content)) findings.push({ file: relative(root, file), rule })
  }
}

if (findings.length) {
  console.error('Potential credentials found (values suppressed):')
  findings.forEach(({ file, rule }) => console.error(`- ${file}: ${rule}`))
  process.exitCode = 1
} else {
  console.log(`Secret scan passed (${files.length} text files checked; generated, tool, and binary directories excluded).`)
}
