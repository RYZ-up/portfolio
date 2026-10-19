// Rayane's public repositories pushed to most recently, with his commit count
// in each, for the folder card on the home page. Cached an hour at the CDN, so
// GitHub's anonymous rate limit (60 calls an hour) is never reached.
const LOGIN = 'RYZ-up';
const HEADERS = { 'User-Agent': 'portfolio-repos', Accept: 'application/vnd.github+json' };

const gh = path => fetch(`https://api.github.com${path}`, { headers: HEADERS });

// A warm function instance (and the local dev server) reuses its last answer
// for an hour instead of spending nine more GitHub calls.
let cached = null;

// Commits by Rayane in a repo: one commit per page, so the last page number
// in the Link header is the count.
async function commitCount(repo) {
  const res = await gh(`/repos/${LOGIN}/${repo}/commits?author=${LOGIN}&per_page=1`);
  if (res.status === 409) return 0; // empty repository
  if (!res.ok) throw new Error(String(res.status)); // rate limit: never cache zeros
  const last = res.headers.get('link')?.match(/[?&]page=(\d+)>; rel="last"/);
  if (last) return Number(last[1]);
  return (await res.json()).length;
}

export default async () => {
  if (cached && Date.now() - cached.at < 3600000) return respond(cached.body);
  try {
    const res = await gh(`/users/${LOGIN}/repos?sort=pushed&per_page=8&type=owner`);
    if (!res.ok) throw new Error(String(res.status));
    const repos = (await res.json()).filter(r => !r.fork);
    const counts = await Promise.all(repos.map(r => commitCount(r.name)));
    const list = repos.map((r, i) => ({
      name: r.name,
      url: r.html_url,
      desc: r.description,
      lang: r.language,
      pushedAt: r.pushed_at,
      commits: counts[i]
    }));
    const body = { recent: list.slice(0, 4) };
    cached = { at: Date.now(), body };
    return respond(body);
  } catch {
    if (cached) return respond(cached.body);
    return new Response(JSON.stringify({ error: 'unavailable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    });
  }
};

function respond(body) {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=900',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}

export const config = { path: '/api/repos' };
