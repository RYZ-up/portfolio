import galleryData from './gallery.json';

// Close-up electronics, stored locally so the carousel does not depend on
// Wikimedia's thumbnail endpoint at runtime. Credits: public/images/tech/CREDITS.txt.
export const galleryImages = [
  { src: '/images/tech/silicon-wafer-color.jpg', alt: 'Circuits microscopiques aux reflets multicolores sur un wafer de silicium' },
  { src: '/images/tech/oled-subpixels.jpg', alt: 'Sous-pixels rouges, verts et bleus d’un écran OLED vus de très près' },
  { src: '/images/tech/eprom-micrograph.jpg', alt: 'Micrographie détaillée des connexions internes d’une puce EPROM' },
  { src: '/images/tech/wafer-macro.jpg', alt: 'Gros plan des pistes dorées d’un circuit sur une tranche de silicium' }
];

/** Stacked photos card: the robotics projects' covers, the IoT box first,
 *  the others shuffled on every visit. */
const shuffle = list => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const stackImages = ['p1', ...shuffle(['p2', 'p3', 'p10'])].map(
  id => `/images/projects/gallery/${id}/cover.webp`
);


/** Focal point of the portrait crop in the stack, for landscape covers whose subject is off-center. */
export const stackFocus = {};

/**
 * Projects page: one carousel per project, holding all of that project's images
 * (hero first). `id` is the i18n prefix `g.<id>.name` / `g.<id>.desc`.
 */
export const gallery = galleryData;

// The three projects pages: software & AI ('dev'), websites & web apps ('web'),
// electronics & robotics ('eng').
const HARDWARE = new Set(['p1', 'p2', 'p3', 'p8', 'p10']);
const WEB = new Set(['p4', 'p12', 'p14', 'p15', 'p16']);
export const categoryOf = id => (HARDWARE.has(id) ? 'eng' : WEB.has(id) ? 'web' : 'dev');
