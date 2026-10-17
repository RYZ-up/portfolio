// One real URL per page (Netlify rewrites them to index.html, see netlify.toml).
// A project opened on a projects page gets its own URL too: /developpement/p13.
export const PATHS = { home: '/', dev: '/logiciels', web: '/web', eng: '/electronique' };

// The three projects pages, in menu order.
export const SECTIONS = ['dev', 'web', 'eng'];

const parts = (path = window.location.pathname) => (path.replace(/\/+$/, '') || '/').split('/').filter(Boolean);

export const viewFromPath = path => {
  const [first] = parts(path);
  if (!first) return 'home';
  return Object.keys(PATHS).find(v => PATHS[v] === `/${first}`) ?? 'home';
};

/** The project id in the URL (`/developpement/p13` -> 'p13'), or null. */
export const projectFromPath = path => parts(path)[1] ?? null;

export const projectPath = (view, id) => `${PATHS[view]}/${id}`;
