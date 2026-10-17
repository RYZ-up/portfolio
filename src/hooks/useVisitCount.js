import { useEffect, useState } from 'react';

// Visit counter served by a Netlify function (netlify/functions/visits.mjs,
// stored in Netlify Blobs). Every page load adds 1 atomically and gets the new
// total back.
//
// Last value read from the server. Only ever a real total: if the network
// fails, the badge shows this (or a dash), never a per-device count.
const LAST_KEY = 'visit-count-remote';

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

async function incrementRemote() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch('/api/visits', { method: 'POST', signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const value = Number((await res.json()).count);
    if (!Number.isFinite(value) || value < 1) throw new Error('bad counter value');
    return value;
  } finally {
    clearTimeout(timer);
  }
}

let pending = null; // one increment per page load, even under React StrictMode

function loadCount() {
  if (pending) return pending;
  pending = whenIdle()
    .then(incrementRemote)
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
