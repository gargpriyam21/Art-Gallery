# Sketchbook — Priyam Garg

My drawings as a spiral sketchbook you can flip through: https://gargpriyam21.github.io/Art-Gallery/

Pages turn over the spiral (tap, swipe, drag or use the arrow keys), and the pad turns sideways for portrait drawings. Every page has its own link, such as `#/goku-ssj3`.

## Run it

```sh
npm install
npm run dev       # local dev server
npm run build     # production build in dist/
```

## Add a drawing

1. Put the scan in `art-source/<slug>.jpg` (about 2400px on the longest side is plenty).
2. Run `npm run images`. This writes `public/art/<slug>-1600.webp` and `-640.webp`, and records the size and paper colour in `src/data/art-sizes.json`.
3. Add one line to `src/data/artworks.js` with the same slug, a title, the series and the medium (`pencil` or `colour`).

Pages appear in the order they are listed.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. In the repo's Settings → Pages, set **Source** to **GitHub Actions** once.

## Where things live

- `src/components/Sketchbook.jsx` — the book: page turning, dragging, rotation for portrait pages
- `src/components/CloseView.jsx` — the full-screen close-up
- `src/components/Ruler.jsx` — the ruler page index
- `src/styles.css` — all styling; colours and fonts are the custom properties at the top
- `DESIGN.md` — the design system
