import { useEffect, useState } from 'react';

// Visit counter stored in Firebase Firestore (collection
// `portfolio_compteur`, doc `visits`, field `count`). Every page load adds 1 atomically (`increment`), so two visitors
// at the same time can never overwrite each other.
//
// Config comes from Vite env vars (.env, see .env.example).
//
// Last value read from Firestore. Only ever a real total: if the network
// fails, the badge shows this (or nothing), never a per-device count (that
// fallback used to show "3 visits" on phones where Firebase was slow).
const LAST_KEY = 'visit-count-remote';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
};

const isConfigured = Boolean(config.apiKey && config.projectId);

const readLast = () => {
  try {
    return parseInt(localStorage.getItem(LAST_KEY) || '', 10) || null;
  } catch {
    return null;
  }
};

const writeLast = value => {
  try {
    localStorage.setItem(LAST_KEY, String(value));
  } catch {
    /* storage unavailable */
  }
};

// The counter is decoration: start once the page has settled.
const whenIdle = () =>
  new Promise(resolve => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(resolve, { timeout: 2500 });
    else setTimeout(resolve, 1200);
  });

// One REST call instead of the Firebase SDK (≈100 KB of JS and a WebChannel
// connection that is slow to open on mobile networks): a commit with an
// atomic `increment` transform, whose response carries the new total.
async function incrementRemote() {
  const db = `projects/${config.projectId}/databases/(default)`;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/${db}/documents:commit?key=${config.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({
        writes: [
          {
            // Same shape as the SDK's setDoc({ count: increment(1) }, { merge: true }),
            // which is what the Firestore security rules accept.
            update: { name: `${db}/documents/portfolio_compteur/visits`, fields: {} },
            updateMask: { fieldPaths: [] },
            updateTransforms: [{ fieldPath: 'count', increment: { integerValue: '1' } }]
          }
        ]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const result = data.writeResults?.[0]?.transformResults?.[0];
    const value = Number(result?.integerValue ?? result?.doubleValue);
    if (!Number.isFinite(value)) throw new Error('bad counter value');
    return value;
  } finally {
    clearTimeout(timer);
  }
}

let pending = null; // one increment per page load, even under React StrictMode

function loadCount() {
  if (pending) return pending;
  pending = whenIdle()
    .then(() => (isConfigured ? incrementRemote() : Promise.reject(new Error('not configured'))))
    .then(value => {
      writeLast(value);
      return value;
    })
    .catch(() => readLast());
  return pending;
}

export default function useVisitCount() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let alive = true;
    loadCount().then(v => {
      if (alive) setCount(v);
    });
    return () => {
      alive = false;
    };
  }, []);
  return count;
}
