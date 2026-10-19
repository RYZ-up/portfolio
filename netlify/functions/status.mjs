// API Status card data: per service, one entry per day (oldest first). AI and
// GitHub from their official status pages; the others from the hourly checks
// (no data before they started). Today always has a live check made now.
import { SERVICES, checkAll, readDays, pageIncidents, isoDay } from '../lib/status.mjs';

const DAYS = 30;

function incidentDay(date, list) {
  if (!list) return { date };
  const sum = status => Math.min(1440, list.filter(i => i.status === status).reduce((s, i) => s + i.minutes, 0));
  return { date, downtime: sum('down'), degraded: sum('degraded'), incidents: list.map(({ title, minutes }) => ({ title, minutes })) };
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
  const services = SERVICES.map(({ id, label }, k) => ({
    id,
    label,
    online: now[id],
    days: dates.map((date, i) => {
      if (pages[k]) return incidentDay(date, pages[k][date]);
      // Today without an hourly check yet: the live check stands in.
      const tally = days[date]?.[id] ?? (i === DAYS - 1 ? { checks: 1, fails: now[id] ? 0 : 1 } : null);
      return checkedDay(date, tally);
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
