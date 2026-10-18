// API Status card data: per service, one entry per day (oldest first) from
// the hourly checks, plus a live check made now. Days before the checks
// started have no data ("none"); GitHub's days come from its incident history.
import { SERVICES, checkAll, readDays, githubIncidents, isoDay } from '../lib/status.mjs';

const DAYS = 30;

function githubDay(date, list) {
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
  const [now, days, incidents] = await Promise.all([checkAll(), readDays(), githubIncidents()]);
  const dates = Array.from({ length: DAYS }, (_, i) => isoDay(Date.now() - (DAYS - 1 - i) * 86400000));
  const services = SERVICES.map(({ id, label }) => ({
    id,
    label,
    online: now[id],
    days: dates.map((date, i) => {
      if (id === 'github') return githubDay(date, incidents[date]);
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
