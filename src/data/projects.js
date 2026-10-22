import galleryData from './gallery.json';

/**
 * Every project and its media (video preview first, then images), shown in the project
 * sheet. `id` is the i18n prefix `g.<id>.name` / `g.<id>.desc` / `g.<id>.detail`; the card
 * cover is public/images/projects/gallery/<id>/cover.webp.
 */
export const gallery = galleryData;

// The three decks: websites & web apps ('web'), electronics & robotics ('eng'),
// software & AI ('dev').
const HARDWARE = new Set(['p1', 'p2', 'p3', 'p8', 'p10']);
const WEB = new Set(['p4', 'p12', 'p14', 'p15', 'p16']);
export const categoryOf = id => (HARDWARE.has(id) ? 'eng' : WEB.has(id) ? 'web' : 'dev');
