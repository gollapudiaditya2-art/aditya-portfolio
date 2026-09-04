import { useId } from 'react'

const HEADING_LEVELS = new Set([1,2,3,4,5,6])
const TEXT_SIZES = new Set(['body-lg','body','body-sm','meta'])
const HEADING_TAGS = new Set(['h1','h2','h3','h4','h5','h6','p','div'])

export function Heading({ level = 2, as, className = '', children, ...props }) {
  const safeLevel = HEADING_LEVELS.has(level) ? level : 2
  const Tag = HEADING_TAGS.has(as) ? as : `h${safeLevel}`
  return <Tag className={`type-heading type-heading-${safeLevel} ${className}`.trim()} {...props}>{children}</Tag>
}

export function Text({ size = 'body', className = '', children, ...props }) {
  const safeSize = TEXT_SIZES.has(size) ? size : 'body'
  return <p className={`type-${safeSize} ${className}`.trim()} {...props}>{children}</p>
}

export function Button({ variant = 'primary', loading = false, disabled = false, className = '', children, ...props }) {
  const safeVariant = ['primary','secondary','quiet'].includes(variant) ? variant : 'primary'
  return <button {...props} className={`ui-button ui-button--${safeVariant} ${className}`.trim()} type={props.type || 'button'} disabled={disabled || loading} aria-busy={loading || undefined}>{loading ? <><span className="ui-spinner" aria-hidden="true"></span>Loading…</> : children}</button>
}

export function Surface({ tone = 'default', raised = false, className = '', children, ...props }) {
  const toneClass = tone === 'default' ? '' : ` ui-surface--${tone}`
  const raisedClass = raised ? ' ui-surface--raised' : ''
  return <div className={`ui-surface${toneClass}${raisedClass} ${className}`.trim()} {...props}>{children}</div>
}

export function ArrowIcon({ direction = 'right', className = '' }) {
  const rotation = { right: 0, down: 90, left: 180, up: 270, external: 315 }[direction] ?? 0
  return (
    <svg className={`ui-icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" style={{ '--icon-rotation': `${rotation}deg` }}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

export function TextLink({ className = '', external = false, children, ...props }) {
  return <a className={`ui-link ${className}`.trim()} {...props}>{children}<ArrowIcon direction={external ? 'external' : 'right'} /></a>
}

export function IconButton({ label, children, className = '', ...props }) {
  return <button className={`ui-icon-button ${className}`.trim()} type="button" aria-label={label} {...props}>{children}</button>
}

export function Field({ label, hint, error, className = '', controlId, messageId, children }) {
  return (
    <div className={`ui-field${error ? ' ui-field--error' : ''} ${className}`.trim()}>
      <label className="ui-field-label" htmlFor={controlId}>{label}</label>
      {children}
      {error ? <span className="ui-field-message" id={messageId} role="alert">{error}</span> : hint ? <span className="ui-field-message" id={messageId}>{hint}</span> : null}
    </div>
  )
}

export function TextInput({ label, hint, error, className = '', ...props }) {
  const generatedId = useId()
  const controlId = props.id || generatedId
  const messageId = hint || error ? `${controlId}-message` : undefined
  return <Field label={label} hint={hint} error={error} className={className} controlId={controlId} messageId={messageId}><input {...props} id={controlId} className="ui-input" aria-invalid={error ? 'true' : undefined} aria-describedby={messageId} /></Field>
}

export function Textarea({ label, hint, error, className = '', ...props }) {
  const generatedId = useId()
  const controlId = props.id || generatedId
  const messageId = hint || error ? `${controlId}-message` : undefined
  return <Field label={label} hint={hint} error={error} className={className} controlId={controlId} messageId={messageId}><textarea {...props} id={controlId} className="ui-input ui-textarea" aria-invalid={error ? 'true' : undefined} aria-describedby={messageId} /></Field>
}

export function Select({ label, hint, error, className = '', children, ...props }) {
  const generatedId = useId()
  const controlId = props.id || generatedId
  const messageId = hint || error ? `${controlId}-message` : undefined
  return <Field label={label} hint={hint} error={error} className={className} controlId={controlId} messageId={messageId}><span className="ui-select-wrap"><select {...props} id={controlId} className="ui-input ui-select" aria-invalid={error ? 'true' : undefined} aria-describedby={messageId}>{children}</select><ArrowIcon direction="down" /></span></Field>
}

export function Choice({ type = 'checkbox', label, className = '', ...props }) {
  return <label className={`ui-choice ${className}`.trim()}><input type={type} {...props} /><span>{label}</span></label>
}

export function Toggle({ label, className = '', ...props }) {
  return <label className={`ui-toggle ${className}`.trim()}><input type="checkbox" {...props} /><span className="ui-toggle-track" aria-hidden="true"><i></i></span><span>{label}</span></label>
}

export function Tag({ tone = 'neutral', className = '', children }) {
  const safeTone = ['neutral','accent','success','warning','error'].includes(tone) ? tone : 'neutral'
  return <span className={`ui-tag ui-tag--${safeTone} ${className}`.trim()}>{children}</span>
}

export function Card({ tone = 'light', inset = 'default', className = '', children, ...props }) {
  const safeTone = ['light','olive','dark'].includes(tone) ? tone : 'light'
  const safeInset = ['default','control','panel'].includes(inset) ? inset : 'default'
  return <article className={`ui-card ui-card--${safeTone} ui-card--inset-${safeInset} ${className}`.trim()} {...props}>{children}</article>
}

export function MediaFrame({ mode = 'contained', className = '', children, ...props }) {
  const safeMode = mode === 'full-bleed' ? 'full-bleed' : 'contained'
  return <figure className={`ui-media ui-media--${safeMode} ${className}`.trim()} {...props}>{children}</figure>
}
