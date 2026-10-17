// GitHub contribution graph, read from github.com's own public calendar (the
// one shown on the profile, private contributions included once the profile
// setting allows it). Third-party APIs cache it for days; this is fresh within
// the hour. Same shape as the jogruber API: { total: { lastYear }, contributions }.
const LOGIN = 'RYZ-up';

export function parseCalendar(html) {
  const days = new Map();
  for (const m of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = m[0];
    const date = tag.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    if (!date || !id) continue;
    days.set(id, { date, level: Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0), count: 0 });
  }
  for (const m of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)/g)) {
    const day = days.get(m[1]);
    const n = m[2].match(/^\s*([\d,]+)\s+contribution/);
    if (day && n) day.count = Number(n[1].replace(/,/g, ''));
  }
  const contributions = [...days.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
  return { total: { lastYear: contributions.reduce((s, d) => s + d.count, 0) }, contributions };
}

export default async () => {
  try {
    const res = await fetch(`https://github.com/users/${LOGIN}/contributions`, {
      headers: { 'User-Agent': 'portfolio-contributions' }
    });
    if (!res.ok) throw new Error(String(res.status));
    const data = parseCalendar(await res.text());
    if (!data.contributions.length) throw new Error('empty calendar');
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
};

export const config = { path: '/api/github' };
