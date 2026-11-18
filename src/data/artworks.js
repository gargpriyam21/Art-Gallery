// Every page of the sketchbook, in the order the pages turn.
//
// To add a drawing:
//   1. put the scan in art-source/<slug>.jpg (the longest side around 2400px is plenty)
//   2. run `npm run images`
//   3. add an entry below with the same slug
//
// medium: 'pencil' for graphite sketches, 'colour' for coloured drawings.

import sizes from './art-sizes.json';

// Ordered strongest first (rated Nov 2026); move a line to change its page.
const entries = [
  { slug: 'goku-and-vegeta', title: 'Goku & Vegeta', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'shinobu-kocho', title: 'Shinobu Kocho', series: 'Demon Slayer', medium: 'colour' },
  { slug: 'ken-kaneki', title: 'Ken Kaneki', series: 'Tokyo Ghoul', medium: 'pencil' },
  { slug: 'roy-mustang', title: 'Roy Mustang', series: 'Fullmetal Alchemist', medium: 'pencil' },
  { slug: 'cc', title: 'C.C.', series: 'Code Geass', medium: 'colour' },
  { slug: 'majin-vegeta', title: 'Majin Vegeta', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'gotenks-ssj3', title: 'Gotenks SSJ3', series: 'Dragon Ball Z', medium: 'colour' },
  { slug: 'future-trunks', title: 'Future Trunks', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'vegitto', title: 'Vegitto', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'gohan-ssj2', title: 'Gohan SSJ2', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'goku-ssj3', title: 'Goku SSJ3', series: 'Dragon Ball Z', medium: 'pencil' },
  { slug: 'l', title: 'L', series: 'Death Note', medium: 'pencil' },
  { slug: 'vegeta-sacrifice', title: 'Vegeta’s Sacrifice', series: 'Dragon Ball Z', medium: 'pencil' },
];

export const MEDIUM_LABEL = { pencil: 'Pencil sketch', colour: 'Colour drawing' };

const base = import.meta.env.BASE_URL;

export const artworks = entries.map((a, i) => {
  const size = sizes[a.slug];
  if (!size) throw new Error(`No image for "${a.slug}". Add art-source/${a.slug}.jpg and run npm run images.`);
  return {
    ...a,
    page: i + 1,
    width: size.width,
    height: size.height,
    paper: size.paper,
    portrait: size.height > size.width,
    src: `${base}art/${a.slug}-1600.webp`,
    thumb: `${base}art/${a.slug}-640.webp`,
    srcSet: `${base}art/${a.slug}-640.webp 640w, ${base}art/${a.slug}-1000.webp 1000w, ${base}art/${a.slug}-1600.webp 1600w`,
  };
});

export const ARTIST = {
  name: 'Priyam Garg',
  portfolio: 'https://gargpriyam21.github.io/Portfolio/',
  github: 'https://github.com/gargpriyam21',
  linkedin: 'https://www.linkedin.com/in/priyamgarg21/',
};
