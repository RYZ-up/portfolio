import { useEffect, useState } from 'react';

// Visit counter (netlify/functions/visits.mjs). One POST per browser session,
// a plain GET afterwards; the request is shared module-wide so StrictMode's
// double effect and several components never count a visit twice.
const SESSION_KEY = 'visit-counted';
let request = null;

function load() {
  if (request) return request;
  let counted = false;
  try {
    counted = sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    /* storage blocked: count as a GET, never inflate */
    counted = true;
  }
  request = fetch('/api/visits', { method: counted ? 'GET' : 'POST' })
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(({ count }) => {
      if (!counted) {
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          /* ignore */
        }
      }
      return Number.isFinite(count) ? count : null;
    })
    .catch(() => null);
  return request;
}

export function useVisits() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let alive = true;
    load().then(c => alive && setCount(c));
    return () => {
      alive = false;
    };
  }, []);
  return count;
}
