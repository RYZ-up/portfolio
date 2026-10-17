import galleryData from './gallery.json';

// Project cover images (public/images/projects/project-NN.jpg), split between
// the three places that show them.
const cover = n => `/images/projects/project-${String(n).padStart(2, '0')}.webp`;

/** Sidebar carousel. */
export const galleryImages = [4, 5, 6, 7, 12].map(cover);

/** Stacked photos card: every cover not used by the carousel. */
export const stackImages = [1, 2, 3, 8, 9, 10, 11].map(cover);

/** Folder card (the first covers, fanned out on hover). */
export const folderImages = [1, 2, 3].map(cover);

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
