// Shared fetch of /api/repos (Active projects card and Top contributions):
// one request per page load, whichever card asks first.
// Kept for 30 minutes in sessionStorage, so browsing back to the home page
// does not ask again.
const CACHE_KEY = 'gh-repos-v1';
let pending = null;

function cachedRepos() {
  try {
    const hit = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    return hit && Date.now() - hit.at < 30 * 60 * 1000 ? hit.data : null;
  } catch {
    return null;
  }
}

export const loadRepos = () => {
  const hit = cachedRepos();
  if (hit) return Promise.resolve(hit);
  return (pending ??= fetch('/api/repos')
    .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then(data => {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
      } catch {
        /* storage unavailable */
      }
      return data;
    })
    .catch(error => {
      pending = null;
      throw error;
    }));
};

/** "6 hours ago" / "il y a 6 heures". */
export function timeAgo(iso, lang) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const s = (new Date(iso) - Date.now()) / 1000;
  for (const [unit, n] of [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]]) {
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
  }
  return rtf.format(0, 'minute');
}
