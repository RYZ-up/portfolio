// Visit counter, stored in Netlify Blobs (no external database, nothing to
// configure). POST adds one visit and returns the new total; GET only reads it.
//
// Concurrent visits: the write is conditional on the ETag that was read
// (`onlyIfMatch`), so two visitors at the same instant can never overwrite
// each other; the loser simply re-reads and tries again.
import { getStore } from '@netlify/blobs';

const KEY = 'total';
const MAX_TRIES = 8;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });

async function read(store) {
  const entry = await store.getWithMetadata(KEY, { type: 'json', consistency: 'strong' });
  return { exists: Boolean(entry), count: Number(entry?.data?.count) || 0, etag: entry?.etag ?? null };
}

async function increment(store) {
  for (let i = 0; i < MAX_TRIES; i++) {
    const { exists, count, etag } = await read(store);
    const next = { count: count + 1 };
    // Conditional write when an ETag is available (production); otherwise
    // create-if-absent, or a plain write as a last resort (local test server).
    const opts = etag ? { onlyIfMatch: etag } : exists ? {} : { onlyIfNew: true };
    const res = await store.setJSON(KEY, next, opts);
    if (res?.modified !== false) return next.count;
    await new Promise(r => setTimeout(r, 20 + Math.random() * 60));
  }
  throw new Error('too much contention');
}

export default async function handler(req) {
  if (req.method !== 'GET' && req.method !== 'POST') return json({ error: 'method not allowed' }, 405);
  try {
    const store = getStore({ name: 'visits', consistency: 'strong' });
    if (req.method === 'GET') return json({ count: (await read(store)).count });
    return json({ count: await increment(store) });
  } catch {
    return json({ error: 'counter unavailable' }, 503);
  }
}

export const config = { path: '/api/visits' };
