import galleryData from './gallery.json';

/**
 * Every project and its media (video preview first, then images), shown in the project
 * sheet. `id` is the i18n prefix `g.<id>.name` / `g.<id>.desc` / `g.<id>.detail`; the card
 * cover is public/images/projects/gallery/<id>/cover.webp.
 */
export const gallery = galleryData;

// The two decks: websites & web apps ('web'), electronics & robotics ('eng').
const HARDWARE = new Set(['p1', 'p2', 'p3', 'p8', 'p10']);
export const categoryOf = id => (HARDWARE.has(id) ? 'eng' : 'web');
