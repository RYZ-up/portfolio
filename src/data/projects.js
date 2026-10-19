import galleryData from './gallery.json';

// Advanced science labs (lasers, electron microscopy, accelerators, clean
// rooms), stored locally so the carousel does not depend on Wikimedia at
// runtime. Credits: public/images/tech/CREDITS.txt.
export const galleryImages = [
  { src: '/images/tech/quantum-ibm.webp', alt: 'Cryostat doré d’un ordinateur quantique IBM' },
  { src: '/images/tech/wafer.webp', alt: 'Wafer de silicium de 300 mm aux reflets irisés' },
  { src: '/images/tech/ion-trap.webp', alt: 'Puce de piège à ions pour le calcul quantique, au NIST' },
  { src: '/images/tech/rgb-led.webp', alt: 'LED RGB de 5 mm en gros plan' },
  { src: '/images/tech/cryostat.webp', alt: 'Étages dorés d’un cryostat à dilution sur fond noir' },
  { src: '/images/tech/laser-psyche.webp', alt: 'Faisceau laser envoyé vers la sonde Psyche depuis un observatoire de la NASA, la nuit' }
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
