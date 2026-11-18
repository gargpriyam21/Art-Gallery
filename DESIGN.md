---
name: PALS Art Gallery
description: A top-bound spiral sketchbook lying on a blue cutting mat, in a dark cobalt or a light drafting-blue theme; the pages turn, one drawing per sheet.
colors:
  mat: "#1c4c8a"
  mat-deep: "#163e72"
  mat-ink: "#f0f5fc"
  mat-ink-2: "#c8d9f0"
  mat-line: "rgb(200, 222, 250)"
  mat-shade: "rgb(3, 12, 30)"
  mat-grid: "rgba(200, 222, 250, 0.07)"
  mat-grid-hi: "rgba(200, 222, 250, 0.15)"
  accent-text: "#ffd766"
  scrim: "rgba(8, 22, 46, 0.95)"
  mat-light: "#dde8f5"
  mat-deep-light: "#cddcef"
  mat-ink-light: "#0f2440"
  mat-ink-2-light: "#344e70"
  mat-line-light: "rgb(28, 72, 132)"
  mat-shade-light: "rgb(20, 44, 80)"
  mat-grid-light: "rgba(28, 72, 132, 0.08)"
  mat-grid-hi-light: "rgba(28, 72, 132, 0.16)"
  accent-text-light: "#8a4f00"
  scrim-light: "rgba(221, 232, 245, 0.97)"
  pencil: "#f6c33b"
  pencil-hover: "#ffd457"
  pencil-ink: "#1d1a10"
  graphite: "#2b2d31"
  graphite-deep: "#111214"
  board: "#18191c"
  board-ink: "#f4f1e8"
  kraft: "#b8a785"
  sheet: "#f7f7f6"
  sheet-back: "#efeeea"
  gallery-mat: "#f6f5f1"
  label: "#fbfaf6"
  label-red: "#c62a35"
  label-blue: "#2b4fa6"
  label-ink: "#1b2a4a"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  headline:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.5rem, 1.1rem + 1.2vw, 2.125rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  title:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.14em"
  title-sub:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.06em"
  wall-title:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.35
    letterSpacing: "0.02em"
  hand:
    fontFamily: "'Kalam', 'Segoe Print', cursive"
    fontSize: "clamp(4rem, 2rem + 6vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "'Familjen Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "'Familjen Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'Familjen Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.35
  caption:
    fontFamily: "'Familjen Grotesk Variable', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.35
  button-stamp:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    letterSpacing: "0.05em"
rounded:
  sheet: "2px"
  board: "3px"
  chip: "3px"
  control: "4px"
  toggle: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  masthead: "64px"
  masthead-phone: "56px"
  control-gap: "8px"
  section: "clamp(72px, 12vh, 140px)"
  gallery-gap-row: "64px"
  gallery-gap-col: "48px"
  gallery-gap-row-phone: "44px"
  gallery-gap-col-phone: "24px"
  frame-mat: "clamp(10px, 1.6vw, 18px)"
  frame-rail: "clamp(5px, 0.6vw, 8px)"
  measure: "1200px"
  gallery-measure: "1320px"
components:
  button-pencil:
    backgroundColor: "{colors.pencil}"
    textColor: "{colors.pencil-ink}"
    typography: "{typography.button-stamp}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  button-pencil-hover:
    backgroundColor: "{colors.pencil-hover}"
    textColor: "{colors.pencil-ink}"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.mat-ink}"
    rounded: "{rounded.control}"
    size: "44px"
  button-dark:
    backgroundColor: "{colors.graphite}"
    textColor: "#f3efe6"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-dark-hover:
    backgroundColor: "{colors.graphite-deep}"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.mat-ink}"
    rounded: "{rounded.toggle}"
    size: "40px"
  ruler-mark-current:
    backgroundColor: "{colors.pencil}"
    textColor: "{colors.pencil-ink}"
    rounded: "{rounded.chip}"
  gallery-frame:
    backgroundColor: "{colors.gallery-mat}"
    padding: "{spacing.frame-mat}"
    rounded: "0px"
  wall-label:
    textColor: "{colors.mat-ink-2}"
    typography: "{typography.caption}"
  cover-label:
    backgroundColor: "{colors.label}"
    textColor: "{colors.label-ink}"
  cover-band:
    backgroundColor: "{colors.pencil}"
    textColor: "{colors.pencil-ink}"
---

# Design System: PALS Art Gallery

## Overview

**Creative North Star: "The Pad on the Cutting Mat"**

Every screen is a desk seen from above: a blue self-healing cutting mat with its printed grid and angle guides, and on it a black hardboard spiral pad whose pages are the scans themselves. The mat comes in two lights. Dark is a cobalt cutting mat; light is a pale blue drafting mat under daylight. Both are the same object, so every token below exists as a pair and every component reads its colours from the mat. Nothing on screen pretends to be an interface panel: the ruler along the mat's edge is the page index, the stuck-on name label and the pencil-yellow band make the cover, and the one accent is the yellow barrel of an HB pencil.

The drawings lead. On the pad they are plain near-white paper with no overlay; below the desk, in The Gallery, each drawing hangs like a museum print, in a thin black frame with a white mat and a small wall label beneath. Type is set like the stamped lettering on a pencil barrel: condensed, heavy, uppercase, short. Running text is a quiet grotesk in pale blue ink. The artist's name is the one handwritten thing, set in a marker-style hand on the cover label and in the About section.

Density is low on the first screen (one book, one caption line, one ruler) and moderate below it (the gallery wall, then a short About band). Motion is physical: pages swing about the spiral with an ease-out and no bounce, and the whole pad rotates a quarter-turn for portrait drawings. With reduced motion, turns become a short fade.

**Key Characteristics:**
- Blue cutting mat with a 24px / 120px printed grid as the ground of every screen, in a dark cobalt and a light drafting-blue theme
- Real objects as controls: spiral pad, name label, edge ruler, pencil-yellow buttons
- Pencil yellow as the single accent; red and blue appear only on the cover's name label
- Stamped condensed uppercase display type over a quiet grotesk body, with one handwritten name
- Gallery drawings hung in black frames with white mats and museum wall labels
- Paper-weight motion: ease-out turns about the top spiral, quarter-turn rotation for portrait pages

## Colors

A saturated blue ground (deep cobalt in dark, pale drafting blue in light) with matching ink, one warm yellow accent, and the neutral blacks, kraft and off-whites of a real pad.

### Primary
- **Pencil Barrel Yellow** (pencil): the one accent, identical in both themes. Pencil buttons, the current ruler mark and its number chip, the cover's "SKETCH BOOK" band, the cover's "Art Gallery · Vol. 01" line, text selection, focus outlines. It brightens to **Sharpened Yellow** (pencil-hover) on hover and always carries **Pencil Lead** (pencil-ink) text.
- **Pencil Text** (accent-text / accent-text-light): the pencil accent as small text on the mat: the "Art Gallery" half of the masthead stamp, wall-label page numbers, the handwritten name in About. A lighter yellow on the cobalt mat, a deep ochre on the drafting mat, so it stays legible in both.

### Tertiary
- **Label Red** (label-red), **Label Blue** (label-blue) and **Label Ink** (label-ink): the printed ring, border, field keys and handwritten values of the name label on the cover. They belong to that object only.

### Neutral
- **Cobalt Mat / Drafting Mat** (mat / mat-light): page background everywhere, and the browser theme colour for each theme.
- **Deep Mat** (mat-deep / mat-deep-light): recessed bands on the mat: the About section, the close-view caption bar, the scrollbar track.
- **Mat Ink** (mat-ink / mat-ink-light): primary text and icon strokes on the mat.
- **Faded Mat Ink** (mat-ink-2 / mat-ink-2-light): secondary text, captions, wall labels, nav links and ruler numbers at rest.
- **Mat Line** (mat-line / mat-line-light): the printed ink of the mat, used only through alpha: **Mat Grid** (mat-grid) for the 24px grid, **Mat Grid Heavy** (mat-grid-hi) for every fifth line at 120px and hairline section borders, plus ruler ticks (0.75), icon-button borders (0.4), the toggle border (0.35) and hover fills (0.12).
- **Mat Shade** (mat-shade / mat-shade-light): the colour of every shadow cast on the mat, used only through alpha.
- **Scrim** (scrim / scrim-light): the close-view backdrop, the mat at 95 to 97% opacity.
- **Hardboard Black** (board): the cover, with fractal-noise grain and a soft top-left sheen; also the black frame rail around gallery drawings. **Cover Chalk** (board-ink) is the "PALS" stamp and dimension line on it.
- **Kraft Board** (kraft): inside of the back cover, visible under the page block and as the end page.
- **Sketch Paper** (sheet) and **Paper Reverse** (sheet-back): the front and back of each page.
- **Gallery Mat White** (gallery-mat): the white mat inside each gallery frame.
- **Label Card** (label): the name label's card stock.
- **Graphite** (graphite) and **Graphite Deep** (graphite-deep): the dark buttons on the end page.

### Named Rules
**The One Pencil Rule.** Yellow is the only accent on the mat. It marks where you are (current page) and what to do next (one pencil button per bar). The cover band is the one large yellow fill, because it is printed on the object.

**The Paired Mat Rule.** Every colour that touches the mat is a theme pair driven by `html[data-theme]`. Objects (cover, paper, frames, label, pencil) are the same in both lights; only the mat, its ink, its printed lines, its shadows and Pencil Text change.

**The Label Owns Red and Blue Rule.** The name label's red and blue are an object's printed ink, not a palette. They do not appear on the mat, in buttons, or in text.

## Typography

**Display Font:** Big Shoulders Display, 700 and 800 (with Arial Narrow)
**Body Font:** Familjen Grotesk Variable (with Helvetica Neue, Arial)
**Hand Font:** Kalam 700 (with Segoe Print, cursive)

**Character:** Condensed industrial capitals stamped like the lettering on a pencil barrel, a calm grotesk that stays out of the drawings' way, and a single marker hand for the artist's name.

### Hierarchy
- **Display** (800, clamp 2.75rem to 5.5rem, 0.95): section headings on the mat ("The Gallery", "Drawn by a software engineer"). Uppercase, balanced wrap.
- **Headline** (800, clamp 1.5rem to 2.125rem, 1): the open page's title in the caption under the book; 1.5rem in the close-view bar. Uppercase.
- **Title** (800, 1.75rem, 0.14em): "PALS" in the masthead stamp, followed by a short rule and **Title Sub** (800, 1.375rem, 0.06em) "Art Gallery" in Pencil Text. Stacked and reduced to 1.0625rem on phones.
- **Wall Title** (800, 1.25rem, 0.02em, uppercase): the drawing's name on a gallery wall label.
- **Hand** (Kalam 700, clamp 4rem to 7.5rem, rotated -7deg): "Priyam" in the About section, in Pencil Text; 4.5rem and in the flow at 900px and below. On the cover label it scales with the pad (7.4cqh for the name, 3.6cqh for the subject).
- **Body** (400, 1.0625rem, 1.6): running text; secondary lines in Faded Mat Ink at 0.9375rem.
- **Body Lead** (400, clamp 1.125rem to 1.3125rem, 1.55): the About paragraphs, max 62ch.
- **Label** (600, 0.9375rem): buttons, nav (500), ruler numbers (0.875rem, tabular).
- **Caption** (400, 0.875rem, 1.35): wall-label series and medium lines, footer.
- **Button Stamp** (800, 1.125rem, 0.05em, uppercase): the pencil buttons only.

Inside the book, the cover type scales with the pad in container units: "PALS" at 19cqh with 0.1em tracking, the volume line at 3.6cqh, "SKETCH BOOK" at 15.5cqh, label keys in Label Red at 2.6cqh.

### Named Rules
**The Stamped Caps Rule.** The display face is always uppercase, heavy (700 to 800) and short: a title, a page name, a field key, a button verb. Paragraphs, captions and metadata are never set in it.

**The One Hand Rule.** The handwritten face sets only the artist's name and the label's handwritten values. It replaces the old signature image; it is never used for headings or UI.

**The Two-Digit Rule.** Page numbers are zero-padded with tabular figures ("page 01 of 13", "Page 07") so the index reads like a numbered pad.

## Layout

The first screen is a full-viewport desk below a 64px masthead (56px on phones): a three-row grid of the stage (the book, centred, as large as the viewport allows), the caption line (page title left, controls right) and the edge ruler. Content rows cap at 1200px and use a fluid gutter (16px to 48px). The pad keeps a fixed 1.4:1 landscape page shape; the spiral rises 4.5% of page height above its top edge. The masthead has the stamp left and Gallery, About, Portfolio and the theme toggle right, with no bar background.

Below the desk, sections use generous vertical padding (72px to 140px). The Gallery is a justified wall up to 1320px wide: a wrapping flex row where each frame's basis is its aspect ratio times 330px and its grow is its aspect ratio, so drawings keep their true shapes (row gap 64px, column gap 48px). At 560px and below each frame takes a full row (gaps 44px / 24px).

At 560px and below, the desk shrinks to the book's turned footprint instead of filling the viewport, the stamp stacks onto two lines, and the pencil button moves to the right end of its control row. At 360px the nav tightens and drops its external-link arrow.

## Elevation & Depth

Depth is physical, not interface elevation. Objects on the mat cast soft shadows tinted with Mat Shade; the pad shows its page-block thickness as a stack of thin paper-edge lines under the board; turning pages darken as they tip away from the light; gallery frames hang off the wall with a short contact shadow and a long soft drop.

### Shadow Vocabulary
- **Pad on the mat** (page-block lines, then `0 18px 30px -8px rgba(var(--shade), 0.55), 0 40px 70px -20px rgba(var(--shade), 0.5)`): the closed or open book.
- **Hung frame** (`0 0 0 clamp(5px, 0.6vw, 8px) var(--board), 0 2px 3px rgba(var(--shade), 0.5), 0 22px 36px -14px rgba(var(--shade), 0.8)`): the black rail plus its wall shadow; on hover the frame lifts 4px and the shadow deepens.
- **Name label** (`0 0.6cqh 1.4cqh rgba(0,0,0,0.5)`): the label stuck to the cover.
- **Close-up print** (`0 24px 60px -20px rgba(0,0,0,0.8)`): the drawing in the close view, over the Scrim.

### Named Rules
**The Mat Shade Rule.** Shadows on the mat use the theme's Mat Shade, never neutral grey, and are always soft and offset downward, as light falls on a desk. The page-block lines under the pad are the only zero-blur offsets, because they draw paper edges.

## Shapes

Paper and board are nearly square-cornered (2px pages, 3px board); gallery frames are square; controls are gently rounded (4px buttons, 3px ruler chip); the theme toggle is the one circle. The name label is the one soft shape: round-cornered card stock with a blue inner border and a red outer ring, set at 2deg. The cover is drawn with drafting geometry: a full-width band, a dimension line with end ticks reading "297 mm", and a vertical elastic strap near the right edge. Small rotations (the label, its handwritten name at -3deg, the About name at -7deg) carry the hand-placed feel; pages and frames are never tilted at rest.

## Components

### Buttons
- **Shape:** gently rounded (4px), 44px minimum height, 1.5px border slot.
- **Pencil (primary):** flat Pencil Barrel Yellow with Pencil Lead text in stamped uppercase, 18px side padding, optional 16px line icon. One per control bar ("Open the book", "Look closer", "Close", "See my portfolio").
- **Icon:** 44px square, transparent, Mat Ink arrow, Mat Line border at 40%; hover fills Mat Line at 12% and the border goes full Mat Ink. Disabled at 38% opacity.
- **Dark:** Graphite with warm off-white text, used only on the kraft end page; hover goes to Graphite Deep.
- **Hover / Focus / Active:** colour transitions at 160ms on the house ease; press nudges down 1px; focus is a 2px Pencil Barrel Yellow outline offset 3px (Graphite on the end page).

### Theme Toggle
A 40px circle (36px on phones) with a 1.5px Mat Line border at 35%, showing a sun in dark and a moon in light. Hover fills Mat Line at 12%. The choice is stored as `pals-theme`; before a choice, the theme follows the system's colour scheme.

### Navigation
- **Masthead:** stamp left ("PALS", a 22px rule, "Art Gallery" in Pencil Text); grotesk links right (Gallery, About, Portfolio with an up-right arrow) in Faded Mat Ink at 500, brightening to Mat Ink with an underline on hover.

### Edge Ruler (signature component)
The mat's edge ruler is the page index: a hairline-topped strip with fine minor ticks every 1/56 of its width and one button per page (C for cover, then 1 to 13). Each button is a 14px tick over a 0.875rem tabular number. Hover lengthens the tick to 18px; the current page gets a 20px, 2.5px-wide yellow tick and a yellow number chip. 48px tall hit area.

### Spiral Sketchbook (signature component)
A 1.4:1 landscape pad on a kraft back board, top-bound by silver wire loops (a four-stop grey-to-white gradient) through dark punched holes. Pages hinge about the top edge with 3D perspective; a turn takes 760ms with a cubic ease-out, multi-page jumps stagger 110ms per sheet, and drag or tap turns pages. Portrait drawings rotate the whole pad -90deg (720ms, after a 380ms delay) so the drawing reads upright. Each page's back shows a faint mirrored ghost of its drawing.

### Cover
Hardboard Black with grain. Top left: a large "PALS" stamp in Cover Chalk over "Art Gallery · Vol. 01" in yellow. Top right: the name label (Name: Priyam in the hand face, Subject: Anime sketches). Across the lower half: a full-width Pencil Barrel Yellow band with "SKETCH BOOK" and two right-aligned spec lines (A4 landscape; 120 gsm · page count). Along the bottom: a drafting dimension line reading "297 mm". A vertical black elastic strap runs top to bottom near the right edge.

### Gallery Frames (The Gallery)
Each drawing hangs in a thin Hardboard Black rail (5px to 8px) around a Gallery Mat White mat (10px to 18px), drawing uncropped at its own ratio. Hover lifts 4px with a deeper shadow; focus outline sits 12px off. Below, a museum wall label: title in Wall Title, "series · medium" in Caption, and "Page 07" in Pencil Text with tabular figures.

### Close View
A full-screen dialog: the drawing upright and fitted, click to zoom to actual size (up to 1600px wide), with a Deep Mat caption bar carrying the headline title, metadata and the icon/pencil button set. The image rises in over 420ms.

## Do's and Don'ts

### Do:
- **Do** put every surface on the cutting mat (mat with its 24px/120px grid); new sections are bands of the same mat, recessed with Deep Mat at most.
- **Do** define every mat-facing colour for both `data-theme="dark"` and `data-theme="light"`, and take shadows and lines from Mat Shade and Mat Line through alpha.
- **Do** make controls out of desk objects already in the world (ruler, label, pencil-yellow) before reaching for generic UI.
- **Do** keep one pencil button per control bar, with Pencil Lead text.
- **Do** show drawings at their true aspect ratio, uncropped, on plain paper in the book and in a black frame with a white mat on the gallery wall.
- **Do** turn pages about the top spiral with the house ease (cubic-bezier(0.22, 0.8, 0.26, 1)) and no overshoot; fade under reduced motion.
- **Do** zero-pad page numbers with tabular figures.

### Don't:
- **Don't** add overlays, gradients or hover captions on top of a drawing.
- **Don't** introduce a second accent; red and blue stay on the name label.
- **Don't** use neutral grey or hard-edged offset shadows on the mat; shadows are soft and Mat Shade tinted.
- **Don't** set paragraphs or metadata in the stamped display face, or set it in lowercase.
- **Don't** use the hand face for anything but the artist's name and the label's handwritten values.
- **Don't** add bounce or spring to page turns or the pad's rotation.
- **Don't** put pages or frames in rounded cards; paper corners stay at 2px or square.
