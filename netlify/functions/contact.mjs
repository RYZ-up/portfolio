// Contact postcard: validates a message and e-mails it to Rayane through Resend.
// The Resend key lives only in the server environment (resend_api_key), never in the browser.
// Nothing is stored: the card only exists as that e-mail.

const MOTIVES = new Set(['stage', 'alternance', 'projet', 'autre']);
const LIMITS = { name: 80, email: 254, message: 2000, messageMin: 10, body: 8000 };
const MIN_FILL_MS = 3000; // a human needs a few seconds to write a card
// Best-effort abuse limits. In-memory, so they are per warm function instance
// (they reset on a cold start), like the chat function. The daily cap stays well
// under Resend's free-plan quota and bounds spam in the inbox.
const RATE = { ipPer10Min: 3, ipPerDay: 8, globalPerDay: 50 };
const ALLOWED_ORIGINS = new Set(
  ['https://ryazid.fr', 'https://www.ryazid.fr', process.env.URL, process.env.DEPLOY_PRIME_URL].filter(Boolean)
);

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

const perIp = new Map(); // ip -> { recent: number[], day: string, count: number }
const global = { day: '', count: 0 };

function checkRate(ip) {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (global.day !== today) {
    global.day = today;
    global.count = 0;
    perIp.clear();
  }
  if (global.count >= RATE.globalPerDay) return { ok: false, retryAfter: 3600 };
  const entry = perIp.get(ip) ?? { recent: [], day: today, count: 0 };
  entry.recent = entry.recent.filter(t => now - t < 10 * 60_000);
  if (entry.count >= RATE.ipPerDay) return { ok: false, retryAfter: 3600 };
  if (entry.recent.length >= RATE.ipPer10Min) return { ok: false, retryAfter: Math.ceil((10 * 60_000 - (now - entry.recent[0])) / 1000) };
  entry.recent.push(now);
  entry.count += 1;
  global.count += 1;
  perIp.set(ip, entry);
  return { ok: true };
}

// Trims, drops control characters (keeps line breaks in the message) and checks the length.
const clean = (value, max, keepLines = false) => {
  if (typeof value !== 'string') return null;
  const text = value
    .replace(keepLines ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return text.length > 0 && text.length <= max ? text : null;
};
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export function validate(body) {
  if (!body || typeof body !== 'object') return { error: 'invalid' };
  if (typeof body.website === 'string' && body.website.trim() !== '') return { bot: true };
  if (typeof body.elapsed !== 'number' || body.elapsed < MIN_FILL_MS) return { bot: true };
  const name = clean(body.name, LIMITS.name);
  if (!name) return { error: 'invalid', field: 'name' };
  const email = clean(body.email, LIMITS.email);
  if (!email || !EMAIL.test(email)) return { error: 'invalid', field: 'email' };
  const motive = MOTIVES.has(body.motive) ? body.motive : null;
  if (!motive) return { error: 'invalid', field: 'motive' };
  const message = clean(body.message, LIMITS.message, true);
  if (!message || message.length < LIMITS.messageMin) return { error: 'invalid', field: 'message' };
  const lang = body.lang === 'en' ? 'en' : 'fr';
  return { data: { name, email: email.toLowerCase(), motive, message, lang } };
}

/* ---------- E-mail through Resend ---------- */

// Sent from Resend's shared domain, which only delivers to the address of the account
// that owns the key (any other recipient gets a 403): the card goes to the first one accepted.
const RECIPIENTS = ['rayane.yazid.pro@gmail.com', 'ryzd94@gmail.com'];
const MOTIVE_LABELS = { stage: 'Stage', alternance: 'Alternance', projet: 'Projet web', autre: 'Autre' };
const resendKey = () => process.env.RESEND_API_KEY || process.env.resend_api_key;

async function sendMail({ name, email, motive, message, lang }) {
  const mail = {
    from: 'Portfolio <onboarding@resend.dev>',
    reply_to: email,
    subject: `Portfolio · ${MOTIVE_LABELS[motive]} · ${name}`,
    // Plain text only: nothing the visitor types is ever rendered as HTML.
    text: `Nouvelle carte depuis ryazid.fr\n\nNom : ${name}\nE-mail : ${email}\nMotif : ${MOTIVE_LABELS[motive]}\nLangue : ${lang}\n\n${message}\n`
  };
  for (const to of RECIPIENTS) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...mail, to })
    });
    if (res.ok) return;
    if (res.status !== 403) throw new Error(`resend ${res.status}`);
  }
  throw new Error('resend 403');
}

export default async (req, context) => {
  if (req.method !== 'POST') return json({ error: 'method' }, 405, { Allow: 'POST' });
  const origin = req.headers.get('origin');
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return json({ error: 'origin' }, 403);
  if (!resendKey()) return json({ error: 'unavailable' }, 503);

  const raw = await req.text();
  if (raw.length > LIMITS.body) return json({ error: 'too_large' }, 413);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'invalid' }, 400);
  }

  const result = validate(body);
  // Bots get the same answer as people, so they learn nothing; nothing is stored.
  if (result.bot) return json({ ok: true });
  if (result.error) return json({ error: result.error, field: result.field }, 400);

  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rate = checkRate(ip);
  if (!rate.ok) return json({ error: 'rate' }, 429, { 'Retry-After': String(rate.retryAfter) });

  try {
    await sendMail(result.data);
  } catch (error) {
    // Status only: never log the visitor's message or address.
    console.error('contact: send failed', error.message);
    return json({ error: 'unavailable' }, 502);
  }
  return json({ ok: true });
};

export const config = { path: '/api/contact' };
