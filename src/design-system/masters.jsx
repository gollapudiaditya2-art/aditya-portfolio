import { ArrowIcon, Card, Heading, Tag, Text } from './primitives.jsx'

const TONES = new Set(['light', 'olive', 'dark'])

function classes(...values) {
  return values.filter(Boolean).join(' ')
}

function Media({ media, className = '' }) {
  if (!media?.src) return null

  return (
    <figure className={classes('master-media', className)}>
      <img
        src={media.src}
        alt={media.alt || ''}
        width={media.width}
        height={media.height}
        loading={media.loading || 'lazy'}
        decoding={media.decoding || 'async'}
      />
      {media.caption ? <figcaption>{media.caption}</figcaption> : null}
    </figure>
  )
}

export function BackControl({ href, onClick, label = 'Back', className = '', ...props }) {
  const content = <><ArrowIcon direction="left" /><span>{label}</span></>

  if (href) {
    return <a className={classes('master-back-control', className)} href={href} onClick={onClick} {...props}>{content}</a>
  }

  return <button className={classes('master-back-control', className)} type="button" onClick={onClick} {...props}>{content}</button>
}

export function BackToTopControl({ onClick, label = 'Back to top', compact = false, className = '', ...props }) {
  return (
    <button
      className={classes('master-back-to-top', compact && 'is-compact', className)}
      type="button"
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      <span>{label}</span>
      <ArrowIcon direction="up" />
    </button>
  )
}

export function MetadataList({ items = [], columns = 4, className = '', ...props }) {
  if (!items.length) return null

  return (
    <dl className={classes('master-metadata', className)} style={{ '--metadata-columns': columns }} {...props}>
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ProgressNav({ items = [], activeId, onSelect, label = 'Page sections', className = '', ...props }) {
  if (!items.length) return null

  return (
    <nav className={classes('master-progress-nav', className)} aria-label={label} {...props}>
      <div>
        {items.map((item) => {
          const active = item.id === activeId
          const content = <>{item.number ? <span>{item.number}</span> : null}{item.label}</>

          return item.href ? (
            <a key={item.id} href={item.href} aria-current={active ? 'location' : undefined} onClick={(event) => onSelect?.(item, event)}>{content}</a>
          ) : (
            <button key={item.id} type="button" aria-current={active ? 'location' : undefined} onClick={(event) => onSelect?.(item, event)}>{content}</button>
          )
        })}
      </div>
    </nav>
  )
}

export function CapabilityCard({ number, title, items = [], tone = 'light', className = '', ...props }) {
  const safeTone = TONES.has(tone) ? tone : 'light'

  return (
    <Card tone={safeTone} className={classes('master-capability-card', className)} {...props}>
      {number ? <span className="master-capability-number">{number}</span> : null}
      <div>
        <Heading level={3}>{title}</Heading>
        {items.length ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
      </div>
    </Card>
  )
}

export function CapabilityGrid({ items = [], className = '', ...props }) {
  return (
    <div className={classes('master-capability-grid', className)} {...props}>
      {items.map((item) => <CapabilityCard key={item.title} {...item} />)}
    </div>
  )
}

export function ProjectCard({
  title,
  summary,
  media,
  href,
  onClick,
  discipline,
  status,
  actionLabel = 'View project',
  external = false,
  className = '',
  ...props
}) {
  const interactive = Boolean(href || onClick)
  const content = (
    <>
      <Media media={media} />
      <div className="master-project-card-copy">
        <div className="master-project-card-meta">
          {discipline ? <span>{discipline}</span> : null}
          {status ? <Tag>{status}</Tag> : null}
        </div>
        <Heading level={3}>{title}</Heading>
        {summary ? <Text>{summary}</Text> : null}
        {interactive ? <span className="master-project-card-action">{actionLabel}<ArrowIcon /></span> : null}
      </div>
    </>
  )

  return (
    <article className={classes('master-project-card', className)} {...props}>
      {href ? (
        <a href={href} onClick={onClick} aria-label={`${actionLabel}: ${title}`} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{content}</a>
      ) : onClick ? (
        <button type="button" onClick={onClick} aria-label={`${actionLabel}: ${title}`}>{content}</button>
      ) : <div className="master-project-card-static">{content}</div>}
    </article>
  )
}

export function OverviewGrid({ items = [], className = '', ...props }) {
  if (!items.length) return null

  return (
    <div className={classes('master-overview-grid', className)} {...props}>
      {items.map(({ title, description }) => (
        <article key={title}>
          <Heading level={3}>{title}</Heading>
          <Text size="body-sm">{description}</Text>
        </article>
      ))}
    </div>
  )
}

