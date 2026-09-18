// Project cover images (public/images/projects/project-NN.jpg), split between
// the three places that show them.
const cover = n => `/images/projects/project-${String(n).padStart(2, '0')}.jpg`;

/** Sidebar carousel. */
export const galleryImages = [4, 5, 6, 7, 12, 13].map(cover);

/** Stacked photos card: every cover not used by the carousel. */
export const stackImages = [1, 2, 3, 8, 9, 10, 11].map(cover);

/** Folder card (the first covers, fanned out on hover). */
export const folderImages = [1, 2, 3].map(cover);

/** Focal point of the portrait crop in the stack, for landscape covers whose subject is off-center. */
export const stackFocus = { 9: '62% 50%' };
