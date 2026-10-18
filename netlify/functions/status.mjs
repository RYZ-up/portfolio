// API Status card data: per service, one entry per day (oldest first) from
// its official status page, with a live check made now for today.
import { SERVICES, checkAll, pageIncidents, isoDay } from '../lib/status.mjs';

const DAYS = 30;

function incidentDay(date, list) {
  if (!list) return { date };
  const sum = status => Math.min(1440, list.filter(i => i.status === status).reduce((s, i) => s + i.minutes, 0));
  return { date, downtime: sum('down'), degraded: sum('degraded'), incidents: list.map(({ title, minutes }) => ({ title, minutes })) };
}

export default async () => {
  const [now, ...pages] = await Promise.all([checkAll(), ...SERVICES.map(s => pageIncidents(s.page))]);
  const dates = Array.from({ length: DAYS }, (_, i) => isoDay(Date.now() - (DAYS - 1 - i) * 86400000));
  const services = SERVICES.map(({ id, label }, k) => ({
    id,
    label,
    online: now[id],
    days: dates.map(date => incidentDay(date, pages[k][date]))
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
