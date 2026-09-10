import { execFileSync } from 'node:child_process'
import { readFile, stat } from 'node:fs/promises'
import { extname } from 'node:path'

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

// Scan the files that can be committed, honoring the repository's ignore rules.
const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
  .split('\0').filter(file => file && !ignoredExtensions.has(extname(file).toLowerCase()))
const findings = []
for (const file of files) {
  let info
  try { info = await stat(file) } catch (error) { if (error.code === 'ENOENT') continue; throw error }
  if (info.size > 2_000_000) continue
  const content = await readFile(file, 'utf8')
  for (const [rule, pattern] of rules) {
    pattern.lastIndex = 0
    if (pattern.test(content)) findings.push({ file, rule })
  }
}

if (findings.length) {
  console.error('Potential credentials found (values suppressed):')
  findings.forEach(({ file, rule }) => console.error(`- ${file}: ${rule}`))
  process.exitCode = 1
} else {
  console.log(`Secret scan passed (${files.length} text files checked; Git-ignored and binary files excluded).`)
}
