import { useEffect, useState } from 'react';

// Visit counter stored in Firebase Firestore (collection
// `portfolio_compteur`, doc `visits`, field `count`). Every page load adds 1 atomically (`increment`), so two visitors
// at the same time can never overwrite each other.
//
// Config comes from Vite env vars (.env, see .env.example). If a key is
// missing, or Firebase/network fails, it falls back to a per-browser count so
// the badge never shows an error. Firebase is imported lazily so it stays out
// of the initial bundle.
const LOCAL_KEY = 'visit-count-local';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isConfigured = Boolean(config.apiKey && config.projectId && config.appId);

const readLocal = () => {
  try {
    return parseInt(localStorage.getItem(LOCAL_KEY) || '0', 10) || 0;
  } catch {
    return 0;
  }
};

const writeLocal = value => {
  try {
    localStorage.setItem(LOCAL_KEY, String(value));
  } catch {
    /* storage unavailable */
  }
};

// The counter is decoration: start the Firebase work once the page has settled
// instead of competing with first render for the network and the main thread.
const whenIdle = () =>
  new Promise(resolve => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(resolve, { timeout: 2500 });
    else setTimeout(resolve, 1200);
  });

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);
}

async function incrementRemote() {
  const [{ initializeApp, getApps }, { getFirestore, doc, setDoc, getDoc, increment }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore')
  ]);
  const app = getApps()[0] ?? initializeApp(config);
  const ref = doc(getFirestore(app), 'portfolio_compteur', 'visits');
  await setDoc(ref, { count: increment(1) }, { merge: true });
  const snap = await getDoc(ref);
  const value = snap.data()?.count;
  if (typeof value !== 'number') throw new Error('bad counter value');
  return value;
}

let pending = null; // one increment per page load, even under React StrictMode

function loadCount() {
  if (pending) return pending;
  pending = whenIdle()
    .then(() => (isConfigured ? withTimeout(incrementRemote(), 6000) : Promise.reject(new Error('not configured'))))
    .then(value => {
      writeLocal(value);
      return value;
    })
    .catch(() => {
      const next = readLocal() + 1;
      writeLocal(next);
      return next;
    });
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
