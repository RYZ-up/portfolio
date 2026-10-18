// Services behind the API Status card. Each one has an official status page
// (Atlassian Statuspage API), so its last 30 days come from its real incident
// history; today is also checked live.
const TIMEOUT = 8000;

export const SERVICES = [
  {
    id: 'ai',
    label: 'AI (Groq)',
    page: 'https://groqstatus.com',
    check: () =>
      fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } })
  },
  {
    id: 'hosting',
    label: 'Hosting (Netlify)',
    page: 'https://www.netlifystatus.com',
    check: () => fetch('https://ryazid.fr/', { method: 'HEAD' })
  },
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
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/** Checks every service now: { ai: true, hosting: true, ... }. */
export async function checkAll() {
  const results = await Promise.all(SERVICES.map(probe));
  return Object.fromEntries(SERVICES.map((s, i) => [s.id, results[i]]));
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
