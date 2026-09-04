---
name: "Aditya Gollapudi Portfolio"
description: "An object-led portfolio system with cool editorial surfaces, rounded controls, and project-local evidence worlds."
colors:
  luminous-blue: "#3D4DFF"
  luminous-blue-on-dark: "#A7AEFF"
  cool-page-grey: "#E7E9ED"
  cool-report-paper: "#F2F4F7"
  surface-white: "#FFFFFF"
  primary-ink: "#17191F"
  secondary-slate: "#5D6572"
  inverse-grey: "#23252B"
  stack-olive: "#A7A386"
  forkast-green: "#1B6B48"
  forkast-deep-green: "#12382A"
  forkast-soft-sage: "#DCEADF"
  forkast-evidence-mint: "#8EDAB8"
  forkast-product-safe: "#1B5E3F"
  forkast-product-caution: "#D49118"
  forkast-product-avoid: "#A63B32"
  forkast-product-action: "#3FC6EF"
  cura-action-blue: "#315FC4"
  cura-deep-blue: "#1D3A80"
  cura-soft-blue: "#DCE9F8"
  cool-alternate-surface: "#DFE5ED"
  aurio-workshop-blush: "#E9DDD8"
typography:
  scale:
    story-9: "9px"
    story-10: "10px"
    story-11: "11px"
    story-13: "13px"
    story-14: "14px"
    story-15: "15px"
    story-17: "17px"
    story-18: "18px"
    story-19: "19px"
    story-21: "21px"
    story-22: "22px"
    story-23: "23px"
    story-24: "24px"
    story-25: "25px"
    story-26: "26px"
    story-32: "32px"
    story-34: "34px"
    story-36: "36px"
    story-38: "38px"
    story-40: "40px"
    story-42: "42px"
    story-44: "44px"
    story-48: "48px"
    story-50: "50px"
    story-54: "54px"
    story-58: "58px"
    story-62: "62px"
    story-64: "64px"
    story-76: "76px"
    story-84: "84px"
    story-86: "86px"
    story-88: "88px"
    story-96: "96px"
    story-124: "124px"
  display:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: "4.5rem"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: "2.8125rem"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  title:
    fontFamily: '"Bricolage Grotesque", system-ui, sans-serif'
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  body-large:
    fontFamily: '"Onest", system-ui, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body:
    fontFamily: '"Onest", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: '"Onest", system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  subtle: "8px"
  compact: "12px"
  panel: "20px"
  card: "28px"
  pill: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.25rem"
  "6": "1.5rem"
  "8": "2rem"
  "10": "2.5rem"
  "12": "3rem"
  "16": "4rem"
  "20": "5rem"
  "24": "6rem"
  "32": "8rem"
components:
  button-primary:
    backgroundColor: "{colors.luminous-blue}"
    textColor: "{colors.surface-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.primary-ink}"
    textColor: "{colors.surface-white}"
  button-secondary:
    textColor: "{colors.primary-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem"
    height: "44px"
  skill-tag:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.secondary-slate}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  surface:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.panel}"
    padding: "2rem"
  card:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.card}"
    padding: "2rem"
  forkast-metric-band:
    backgroundColor: "{colors.forkast-deep-green}"
    textColor: "{colors.surface-white}"
    padding: "clamp(1.625rem, 3vw, 2.625rem)"
  cura-evidence-band:
    backgroundColor: "{colors.cura-deep-blue}"
    textColor: "{colors.surface-white}"
    padding: "clamp(1.625rem, 3vw, 2.625rem)"
---

# Design System: Aditya Gollapudi Portfolio

## Overview

**Creative North Star: "The Open Workbench"**

The portfolio feels like finished work laid out on a generous studio surface: object-led, graphic, direct, and spacious enough for the artifact to lead. Cool neutral grounds, large soft-edged typography, full-width composition, and a restrained interaction blue connect industrial-design objects, digital interfaces, and personal narrative without forcing every project into one branded template.

Forkast extends that world with a route-specific **Two-Act Service Rehearsal**. Customer evidence appears first, the kitchen-side failure follows, and the redesigned waiter-first handoff resolves the break. Deep green, soft sage, mint evidence figures, ruled comparison structures, and dense tables belong to this case-study world; they demonstrate how a project may establish its own evidence language while retaining the portfolio's type, gutters, controls, media treatment, focus behavior, and responsive discipline.

Cura extends the same evidence-first report family through a route-specific **Two-Round Iteration**. Action blue, deep blue, and soft blue distinguish its report world; the first round's four observed failures sit directly against the second round's design responses, while the confirmed 0-of-4 to 4-of-4 interaction result is given the strongest visual weight. Before-and-after phone screens remain unboxed so the interface itself, not a decorative frame, carries the comparison.

**Key Characteristics:**

- Full-width, gutter-aligned compositions with no centered page-width shell.
- Bricolage Grotesque display type paired with calm Onest reading and interface copy.
- Cool paper, white, graphite, dark grey, and olive as the durable portfolio field.
- Luminous blue reserved for interaction, focus, transition, and navigation feedback.
- Rounded contained surfaces; unrounded full-bleed sections, structural rules, and project imagery.
- Project-local visual worlds that express the work without changing global semantics.
- Evidence reports that trace what was tested, what failed, what changed, what the record proves, and where that record ends.
- Responsive reading structures and reduced-motion behavior designed as first-class states.

## Colors

The base palette is cool and architectural; saturated color is deliberately assigned either to interaction or to a clearly bounded project story.

### Primary

- **Luminous Blue** (`luminous-blue`): the single action color on light surfaces, used for links, focus, navigation feedback, transitions, and interactive emphasis.
- **Light Luminous Blue** (`luminous-blue-on-dark`): the accessible counterpart for focus and action feedback on dark sections and the menu.

### Secondary

- **Forkast Green** (`forkast-green`): the report's local accent for evidence indices, arrows, disclosure emphasis, and the final close.
- **Forkast Deep Green** (`forkast-deep-green`): the report's dark evidence field for measured results, table headers, and operational screen stages.
- **Forkast Soft Sage** (`forkast-soft-sage`): the report's comparison and boundary field, distinguishing the second side of a paired argument without implying a generic success state.
- **Forkast Evidence Mint** (`forkast-evidence-mint`): high-contrast figures and short labels on the report's deep-green field.
- **Forkast Product Safe / Caution / Avoid / Action** (`forkast-product-safe`, `forkast-product-caution`, `forkast-product-avoid`, `forkast-product-action`): semantic colors shown inside the embedded Forkast interface and its design-system evidence board. They describe product states, not portfolio controls or report status.
- **Cura Action Blue** (`cura-action-blue`): Cura's route-local accent for evidence rules, compact labels, and the final report close.
- **Cura Deep Blue** (`cura-deep-blue`): Cura's dark evidence field for the round-to-round result band.
- **Cura Soft Blue** (`cura-soft-blue`): Cura's orientation field behind tested interface screens and second-round comparison surfaces.

### Tertiary

- **Stack Olive** (`stack-olive`): the middle card in the portfolio's established white / olive / dark capability rhythm.

### Neutral

- **Cool Page Grey** (`cool-page-grey`): the global portfolio ground.
- **Cool Report Paper** (`cool-report-paper`): the slightly lighter, route-local reading ground for visual case studies.
- **Surface White** (`surface-white`): contained cards, controls, table bodies, and light media stages.
- **Primary Ink** (`primary-ink`): primary text and the darkest light-surface graphic color.
- **Secondary Slate** (`secondary-slate`): supporting copy, captions, labels, and subdued metadata.
- **Inverse Grey** (`inverse-grey`): the global menu, footer, dark cards, and other inverse portfolio surfaces.
- **Cool Alternate Surface** (`cool-alternate-surface`): a local cool-grey alternative used by visual-story project navigation.
- **Aurio Workshop Blush** (`aurio-workshop-blush`): a project-local making-section field in the Aurio visual story.

### Named Rules

**The One Global Accent Rule.** Luminous blue owns portfolio interaction. A project's accent may narrate its own case study, but it does not replace focus, navigation, or shared control semantics.

**The Bounded Project World Rule.** Forkast green, deep green, sage, and mint stay inside Forkast surfaces; Cura action blue, deep blue, and soft blue stay inside Cura surfaces. Future projects may define their own local palette instead of inheriting either report world.

## Typography

**Display Font:** Bricolage Grotesque (with `system-ui, sans-serif`)

**Body Font:** Onest (with `system-ui, sans-serif`)

**Label/Meta Font:** Onest (with `system-ui, sans-serif`)

**Character:** Bricolage gives headings a soft, slightly playful industrial presence; Onest keeps long explanations, labels, and controls quiet and legible. The source still self-hosts Space Grotesk, Space Mono, Spectral, and Caveat for retained feature artwork or legacy use, but the active semantic type tokens resolve to Bricolage Grotesque and Onest.

### Hierarchy

- **Display** (semibold, `4.5rem`, `0.96`): major portfolio statements; project heroes may use a route-specific fluid scale when the composition requires it.
- **Headline** (semibold, `2.8125rem`, `0.96`): section-level statements and large editorial transitions.
- **Title** (semibold, `1.75rem`, `1.12`): card titles, finding titles, and compact section headings.
- **Body Large** (regular, `1.25rem`, `1.5`): lead explanations and major narrative copy.
- **Body** (regular, `1rem`, `1.6`): primary reading copy, normally constrained by the shared `68ch` measure rather than a rigid container.
- **Label** (medium, `0.75rem`, `0.08em`): metadata and compact system labels. Uppercase is allowed when the label is paired with a value or belongs to a diagram; it is not a heading kicker.

The frontmatter's `typography.scale` catalogs the fixed endpoints used by the shipped visual stories so tooling can distinguish intentional project typography from drift. Forkast locally scales hero and evidence figures more dramatically: its report introduction ranges from `2.75rem` to `5.25rem`, and confirmed metrics range from `2.5rem` to `4.75rem`. These story steps serve specific evidence compositions and do not replace the semantic global roles.

### Named Rules

**The Heading-Is-the-Entry Rule.** Start sections with the real heading. Do not place a small uppercase or monospaced eyebrow above it.

**The Readable Measure Rule.** Use balanced wrapping for headings, pretty wrapping for prose, and character measures for sustained reading; do not solve readability with a capped page shell.

## Layout

The portfolio uses a full-width twelve-column field with a `24px` default grid gap and `32px` wide-screen gap. Page gutters are `64px` on desktop, `40px` on tablet, and `20px` on phone, changing at `1024px` and `768px`. Sections remain visually connected to the viewport edges; readable text narrows by character measure, not by placing the entire page inside a max-width container. Spacing follows the documented 4px foundation from `4px` through `128px`, with section spacing fluidly scaling from `64px` to `128px`.

Case-study heroes commonly split copy and media, then collapse to a single column. The Forkast report uses a `0.72 / 1.28` split hero, a `1.25 / 0.75` report introduction, paired test and route comparisons, and a three-column metric band. At `900px` those structures become one column; at `700px` the wide findings table becomes labeled stacked rows; at `560px` its large panels lose fixed heights and use the page edge more aggressively. These ratios and breakpoints are evidence-report behavior, not mandatory templates for other routes.

The Cura report retains that shared desktop skeleton but changes the reading model to a two-round comparison. On phones at `620px` and below, the first viewport becomes a deliberate two-column evidence split: a compact `116px` before-state phone image sits beside a vertically stacked ownership / participants / study-design / evidence record, while the title and report premise remain full width above. The three-column findings matrix also becomes one vertical finding at a time; each stacked value repeats its `Observed`, `Changed`, or `Result` label so the decision trace survives without a header row.

Meaningful interface imagery is contained and viewport-capped so a complete screen can be understood in one view. Full bleed governs section width, not unlimited image height. Cropping is reserved for imagery that remains legible after crop; interface screens, diagrams, and research artifacts stay uncropped.

**The Gutter, Not Container Rule.** Align major content to the responsive page gutter and let layouts span the available width. Never introduce a generic centered max-width wrapper.

**The Reflow the Evidence Rule.** When a table cannot remain readable on a phone, preserve its labels and relationships in a stacked structure rather than shrinking the type or hiding columns.

## Elevation & Depth

The global system is flat by default and adds depth selectively. Tonal contrast, section boundaries, media scrims, and overlap do most of the spatial work. Shadows are reserved for controls and genuinely raised portfolio cards; both testing reports are intentionally flatter, using hairline rules and changes of field color to express comparison, sequence, and evidence status.

### Shadow Vocabulary

- **Control lift** (`0 2px 6px rgba(23,25,31,.22)`): small floating control details such as a toggle thumb.
- **Raised surface** (`0 12px 32px -20px rgba(23,25,31,.38)`): selected progress items and restrained elevated panels.
- **Floating portfolio card** (`0 44px 100px -55px rgba(0,0,0,.45)`): large capability and project cards that must separate from the page field.

### Named Rules

**The Flat Evidence Rule.** Evidence tables, metrics, route comparisons, and disclosure blocks use rules and tonal fields, not decorative card shadows.

## Shapes

Contained surfaces use a circular corner scale: subtle `8px` details, compact `12px` controls and media stages, `20px` panels, `28px` cards, and fully rounded pills. Insets preserve concentric corners: card-to-control `16px`, card-to-panel `8px`, panel-to-control `8px`, and panel-to-detail `12px`.

Full-bleed sections, structural grids, table cells, comparison rails, and unboxed project images remain square. In the Forkast report, route nodes are intentionally rectangular and rule-bound so they read as operational steps rather than generic chips. In the Cura report, the before-and-after phone screens sit complete and uncropped on soft-blue stages; the image elements receive no border, radius, or shadow.

**The Containment Earns Rounding Rule.** Round a boundary only when it encloses a discrete object. Do not add radius to a full-width band, a divider-led evidence structure, or an image itself.

## Components

### Buttons

- **Shape:** fully rounded pill with a `44px` minimum target.
- **Primary:** luminous blue with inverse text, semibold Onest label type, and `12px 20px` padding.
- **Hover / Focus:** hover changes to primary ink and lifts `2px`; focus uses a `2px` luminous-blue outline with `4px` offset; active presses down `1px` and scales to `0.98`.
- **Secondary:** transparent or white field with an inset ink hairline; hover inverts to ink and white.
- **Quiet:** blue text with only a light blue-tinted hover field.
- **Motion:** state transitions use the fast `160ms` ease-out token and are removed under reduced motion.

### Chips

- **Style:** skill and status tags use the pill radius, compact `8px 16px` padding, surface white, and an inset hairline.
- **State:** tags describe disciplines or status; they are not used as decorative eyebrow headings. Forkast route nodes are not chips and remain rectangular.

### Cards / Containers

- **Corner Style:** `20px` for panels and `28px` for cards.
- **Background:** white, olive, or inverse grey according to the established portfolio stack; project cards place a contrast scrim over full-card media.
- **Shadow Strategy:** cards are flat unless their placement genuinely floats above the page; large project and capability cards may use the floating shadow.
- **Border:** subtle hairlines organize metadata and quiet panels; borders do not box ordinary images.
- **Internal Padding:** usually `24px` to `32px`, responsive where the component becomes full-width.

### Inputs / Fields

- **Style:** white surface, `12px` radius, `44px` minimum height, `12px 16px` padding, and a default ink-alpha hairline.
- **Focus:** blue border plus a restrained translucent blue `2px` outline.
- **Error / Disabled:** error uses the semantic red pair; disabled uses the documented disabled grey background and text with no shadow.

### Navigation

The identity mark and Menu control remain fixed. The Menu control is a labeled pill on content and becomes a transparent inverse-outlined control over dark fields. The underlay menu is inverse grey with light text and light-blue interaction feedback. Long case studies may use a horizontally scrollable pill progress rail whose active item sits on a raised white indicator. All navigation targets retain `44px` minimum hit areas and visible keyboard focus.

### Media Frames

Images remain unboxed. A contained media stage may provide a neutral or project-local field and a `12px` corner when it is a true bounded panel, while the image itself stays free of borders, radius, and shadow. Captions use compact secondary text below the visual. Interface screens and diagrams use `object-fit: contain`; card photography may use `cover` with a legibility scrim.

### Forkast Evidence Metrics

The customer comparison is a dark-green, edge-to-edge three-column band with ruled separators, tabular numerals, mint figures, and short inverse descriptions. It collapses to one vertical sequence with horizontal rules. This is a Forkast report signature, not a generic dashboard-stat card.

### Forkast Findings Table

The report's observed / design response / why it matters structure uses a deep-green header, white body, fine ruled cells, green numeric indices, and compact readable copy. On narrow screens, the header becomes visually hidden and each cell repeats its label before stacking; the semantic relationships and keyboard-focusable overflow behavior are preserved.

### Forkast Route Comparison

Two side-by-side ruled panels stage the failed direct-to-chef route against the waiter-first response. Rectangular `44px` nodes and green arrows make responsibility visible. The comparison becomes vertical below `900px`, preserving sequence and labeling instead of turning the paths into decoration.

### Cura Evidence Band

The round comparison is a deep-blue, edge-to-edge three-column band with ruled separators and tabular figures. `0 of 4` and `4 of 4` carry the visual argument, followed by the eight-person total that establishes the two different groups. On narrow screens the band becomes one vertical sequence with horizontal rules; it remains a Cura report signature, not a generic statistics component.

### Cura Findings Matrix

Four findings pair the observed round-one behavior with the exact interface change and only the result the retained record supports. The desktop matrix uses three ruled columns headed `Observed`, `Changed`, and `Result`. At `620px` and below, each finding stacks vertically and repeats those labels in action blue; the header disappears, but no relationship or evidence qualifier does.

## Do's and Don'ts

### Do:

- **Do** use the global cool ground, blue interaction semantics, active typography, spacing, gutters, and focus behavior as the base for new work.
- **Do** let each project establish a bounded visual world when its artifacts and story support one.
- **Do** keep meaningful interface imagery complete, uncropped, and viewport-capped.
- **Do** use rules, tonal shifts, and explicit labels to make evidence relationships traceable.
- **Do** keep Cura's two rounds visually comparable and reserve its strongest metric treatment for the confirmed 0-of-4 to 4-of-4 behavior change.
- **Do** pair every animation or smooth scroll with a static reduced-motion state.
- **Do** keep keyboard targets at least `44px` and preserve visible focus on both light and dark fields.

### Don't:

- **Don't** promote Forkast's green / sage or Cura's blue report palette—and their metric, comparison, or findings compositions—into global defaults.
- **Don't** place eyebrow kickers above headings.
- **Don't** box, round, or shadow the image itself.
- **Don't** add a centered max-width page container or reserve a decorative layout rail.
- **Don't** round full-bleed section edges or divider-led evidence structures.
- **Don't** use project-local color to replace global focus and navigation semantics.
- **Don't** shrink dense evidence until it becomes unreadable; reflow it with its labels intact.
