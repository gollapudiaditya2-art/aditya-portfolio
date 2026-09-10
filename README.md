# Aditya Gollapudi portfolio

React 19 and Vite portfolio. The hand-written CSS, screen compositions, and scroll animations are intentional.

## Development

Use Node.js 22.12+ (Node.js 24 is recommended).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production build creates pre-rendered HTML for every route, clean-URL aliases, a sitemap when `SITE_URL` is set, and Netlify rewrites. React hydrates the same content in the browser.

## Project structure

- `src/screens/`: screen components and their shared route registry.
- `src/content/`: project content and intrinsic image dimensions.
- `src/components/` and `src/hooks/`: shared interactions and UI.
- `src/styles/` and `src/design-system/`: existing visual foundations and scoped page styles.
- `public/`: original images, fonts, documents, and crawler files.
- `scripts/`: build, export, and browser verification tools.
- `tests/visual-baselines/`: reviewed visual references.

Keep original asset names and source files: full-size image links depend on them. Generated output, browser profiles, local tooling, and credentials are excluded by `.gitignore`.

## Scrolling and capture

Normal browsing uses document scrolling. `scrollSurface()` keeps the animation hooks in viewport coordinates. The menu temporarily restores a fixed viewport shell for its existing transition, then returns to document scrolling. Print rules are isolated in `src/styles/capture.css`.

The script-free `/portfolio-print/` route combines all 14 portfolio pages. It can be printed using the browser's normal PDF controls. No export controls are added to the visible website.

```sh
npm run export:pdf
```

This rebuilds the site and creates `output/pdf/aditya-portfolio.pdf` and `dist/portfolio.pdf`. Run it after the final build if the PDF file should be deployed, since a normal build replaces `dist/`. Chrome is required; set `CHROME_PATH` if it is not at the default location. `SITE_URL` controls PDF links and absolute metadata.

## Verification

```sh
npm run test:secrets
npm run test:readable
npm run test:motion
npm run test:contrast
npm run test:structure
npm run test:alignment
```

Browser checks use a shared local Chrome runner and must run sequentially. They manage their own preview server and browser profile. `PORTFOLIO_DIST` can select an alternate build directory.

For a before/after design comparison, run `node scripts/check-capture-compatibility.mjs --baseline` against the original build, rebuild the changes, then run `npm run test:capture`. This compares geometry, card transforms, path drawing, menu restoration, and captures screenshots at desktop and phone widths. Both versions wait for images to load.

Native iPhone Safari full-page screenshots still require a real-device check. Screenshots freeze the current animation state; the print layout explicitly reveals scroll-dependent content.

## Deployment

The existing Netlify project uses `netlify.toml` and publishes `dist/` at `https://adityagollapudi.com`. Publish only the generated `dist/` contents, including `portfolio.pdf` when generated. Keep personal Netlify configuration and tokens outside the repository.
