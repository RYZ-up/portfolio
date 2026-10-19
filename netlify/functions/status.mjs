// API Status card data: per service, one entry per day (oldest first). AI and
// GitHub from their official status pages; the others from the hourly checks.
// Days the hourly checks have not covered yet are filled with a simulated,
// mostly-operational history, flagged `simulated` so the card labels it as
// such. Today always has a live check made now.
import { SERVICES, checkAll, readDays, pageIncidents, isoDay } from '../lib/status.mjs';

const DAYS = 30;

function incidentDay(date, list) {
  if (!list) return { date };
  const sum = status => Math.min(1440, list.filter(i => i.status === status).reduce((s, i) => s + i.minutes, 0));
  return { date, downtime: sum('down'), degraded: sum('degraded'), incidents: list.map(({ title, minutes }) => ({ title, minutes })) };
}

// Stable pseudo-random value in [0, 1) for a service and a date, so the
// simulated history does not change from one request to the next.
function noise(id, date) {
  let h = 2166136261;
  for (const c of `${id}:${date}`) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967296;
}

function simulatedDay(id, date) {
  const r = noise(id, date);
  if (r < 0.06) return { date, degraded: 20 + Math.round(r * 600), simulated: true };
  return { date, uptime: 100, status: 'up', simulated: true };
}

function checkedDay(date, tally) {
  if (!tally) return { date, status: 'none' };
  const uptime = 100 * (1 - tally.fails / tally.checks);
  return { date, uptime, status: tally.fails === 0 ? 'up' : uptime < 50 ? 'down' : 'degraded' };
}

export default async () => {
  const [now, days, ...pages] = await Promise.all([
    checkAll(),
    readDays(),
    ...SERVICES.map(s => (s.page ? pageIncidents(s.page) : null))
  ]);
  const dates = Array.from({ length: DAYS }, (_, i) => isoDay(Date.now() - (DAYS - 1 - i) * 86400000));
  const services = SERVICES.map(({ id, label, page }, k) => ({
    id,
    label,
    simulated: !page && dates.some(date => !days[date]?.[id]),
    online: now[id],
    days: dates.map((date, i) => {
      if (pages[k]) return incidentDay(date, pages[k][date]);
      // Today without an hourly check yet: the live check stands in.
      const tally = days[date]?.[id] ?? (i === DAYS - 1 ? { checks: 1, fails: now[id] ? 0 : 1 } : null);
      return tally ? checkedDay(date, tally) : simulatedDay(id, date);
    })
  }));
  return new Response(JSON.stringify({ services }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'
    }
  });
};

export const config = { path: '/api/status' };
