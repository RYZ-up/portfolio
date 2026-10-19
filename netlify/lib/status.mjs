// Services behind the API Status card. A scheduled function checks each one
// every hour and adds the result to the day's tally in Netlify Blobs; days
// before the checks started have no data. The AI (Groq) and GitHub have an
// official status page (Atlassian Statuspage API): their whole history comes
// from there.
import { getStore } from '@netlify/blobs';

const KEY = 'days';
const KEEP_DAYS = 90;
const TIMEOUT = 8000;

export const SERVICES = [
  {
    id: 'ai',
    label: 'AI',
    page: 'https://groqstatus.com',
    check: () =>
      fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } })
  },
  {
    id: 'weather',
    label: 'Weather',
    check: () => fetch(`https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=${process.env.VITE_OPENWEATHER_API_KEY}`)
  },
  { id: 'time', label: 'Time', check: () => fetch('https://timeapi.io/api/time/current/zone?timeZone=UTC') },
  {
    id: 'github',
    label: 'GitHub',
    page: 'https://www.githubstatus.com',
    check: () => fetch('https://api.github.com/zen', { headers: { 'User-Agent': 'portfolio-status' } })
  }
];

export const isoDay = time => new Date(time).toISOString().slice(0, 10);

async function probe(service) {
  let timer;
  try {
    const res = await Promise.race([
      service.check(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('timeout')), TIMEOUT);
      })
    ]);
    // Any answer below 500 means the service is up (a rate limit or a
    // refused key is not an outage); only timeouts and 5xx count as down.
    return res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Checks every service now: { ai: true, weather: false, ... }. */
export async function checkAll() {
  const results = await Promise.all(SERVICES.map(probe));
  return Object.fromEntries(SERVICES.map((s, i) => [s.id, results[i]]));
}

const store = () => getStore('status');

/** Adds one round of checks to today's tally and drops days older than 90. */
export async function record(results) {
  const s = store();
  const days = (await s.get(KEY, { type: 'json' })) ?? {};
  const day = (days[isoDay(Date.now())] ??= {});
  for (const [id, ok] of Object.entries(results)) {
    const tally = (day[id] ??= { checks: 0, fails: 0 });
    tally.checks += 1;
    if (!ok) tally.fails += 1;
  }
  const cutoff = isoDay(Date.now() - KEEP_DAYS * 86400000);
  for (const date of Object.keys(days)) if (date < cutoff) delete days[date];
  await s.setJSON(KEY, days);
}

export async function readDays() {
  try {
    return (await store().get(KEY, { type: 'json' })) ?? {};
  } catch {
    return {}; // no Blobs outside Netlify (local dev)
  }
}

/** A status page's incidents by day: { '2026-10-02': [{ title, minutes, status }] }. */
export async function pageIncidents(page) {
  try {
    const res = await fetch(`${page}/api/v2/incidents.json`);
    if (!res.ok) return {};
    const { incidents = [] } = await res.json();
    const byDay = {};
    for (const inc of incidents) {
      const start = new Date(inc.started_at ?? inc.created_at);
      const end = inc.resolved_at ? new Date(inc.resolved_at) : new Date();
      (byDay[isoDay(start)] ??= []).push({
        title: inc.name,
        minutes: Math.max(1, Math.round((end - start) / 60000)),
        status: inc.impact === 'major' || inc.impact === 'critical' ? 'down' : 'degraded'
      });
    }
    return byDay;
  } catch {
    return {};
  }
}
