import galleryData from './gallery.json';

/** Sidebar carousel: landscape photos (Unsplash photos served by Lorem Picsum,
 *  free to use, no attribution required). */
export const galleryImages = [1, 2, 3, 4, 5, 6].map(n => `/images/landscapes/landscape-${n}.webp`);

/** Stacked photos card: the best image of each public project (its grid
 *  cover), shuffled on every visit. Client sites are left out. */
const shuffle = list => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const stackImages = shuffle(['p13', 'p16', 'p2', 'p3', 'p8', 'p1', 'p10', 'p9', 'p6', 'p7', 'p11']).map(
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
