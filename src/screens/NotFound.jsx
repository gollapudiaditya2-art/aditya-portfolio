import { ArrowIcon } from '../design-system/index.js'
import { routePath } from '../routes.js'

export function NotFoundScreen({ go }) {
  return (
    <main className="screen not-found active" id="s-not-found">
      <div>
        <h1>This page isn’t on the workbench.</h1>
        <p>The link may be outdated, or the project may have moved.</p>
        <a href={routePath('fork')} onClick={(event) => go('fork', event)}>Return home <ArrowIcon /></a>
      </div>
    </main>
  )
}

