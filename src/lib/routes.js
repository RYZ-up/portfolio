// One real URL per page (Netlify rewrites them to index.html, see netlify.toml).
export const PATHS = { home: '/', dev: '/developpement', eng: '/electronique' };

export const viewFromPath = (path = window.location.pathname) => {
  const clean = path.replace(/\/+$/, '') || '/';
  return Object.keys(PATHS).find(v => PATHS[v] === clean) ?? 'home';
};
