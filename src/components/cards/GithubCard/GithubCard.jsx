import { useEffect, useMemo, useRef, useState } from 'react';
import { GithubIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './GithubCard.css';

// GitHub activity (inspired by RareUI "GitHub Activity"): contribution graph
// of the last year (as many weeks as fit the card), plus a few figures. Data
// from github.com's public calendar (netlify/functions/github.mjs, jogruber
// API as backup) and the GitHub REST
// API; fetched only once the card is on screen, cached for an hour.
const LOGIN = 'RYZ-up';
const CACHE_KEY = 'gh-activity-v3';
const CELL = 11;
const GAP = 3;

function readCache() {
  try {
    const c = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    return c && Date.now() - c.at < 3600e3 ? c.data : null;
  } catch {
    return null;
  }
}

async function load() {
  const cached = readCache();
  if (cached) return cached;
  const getJson = url => fetch(url).then(r => (r.ok ? r.json() : null)).catch(() => null);
  // Our own function first (fresh, github.com's calendar); jogruber as backup.
  let fresh = true;
  const calendar = () =>
    getJson('/api/github').then(c => {
      if (c) return c;
      fresh = false;
      return getJson(`https://github-contributions-api.jogruber.de/v4/${LOGIN}?y=last`);
    });
  const [cal, user] = await Promise.all([
    calendar(),
    fetch(`https://api.github.com/users/${LOGIN}`).then(r => (r.ok ? r.json() : null))
  ]);
  if (!cal?.contributions?.length) throw new Error('no data');
  const days = cal.contributions;
  // Columns are weeks: start on a Sunday so every column lines up.
  const start = days.findIndex(d => new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0);
  const data = {
    days: days.slice(Math.max(0, start)).map(d => ({ date: d.date, count: d.count, level: Math.min(4, Math.max(0, d.level)) })),
    total: cal.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0),
    repos: user?.public_repos ?? null
  };
  // The backup API can lag by days: never keep its data, retry next time.
  if (fresh) try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable */
  }
  return data;
}

function streaks(days) {
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  // Current streak: today may still be empty, so count back from yesterday too.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  return { current, best };
}

export default function GithubCard() {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const gridRef = useRef(null);
  const [data, setData] = useState(readCache);
  const [failed, setFailed] = useState(false);
  const [cols, setCols] = useState(20);

  // Fetch once the card is near the screen.
  useEffect(() => {
    if (data) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      entries => {
        if (!entries.some(e => e.isIntersecting)) return;
        io.disconnect();
        load().then(setData, () => setFailed(true));
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [data]);

  // As many week columns as fit the width.
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setCols(Math.max(8, Math.floor((e.contentRect.width + GAP) / (CELL + GAP)))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const weeks = useMemo(() => {
    const days = data?.days ?? [];
    const all = [];
    for (let i = 0; i < days.length; i += 7) all.push(days.slice(i, i + 7));
    return all.slice(-cols);
  }, [data, cols]);

  const fmt = n => (n == null ? '–' : n.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB'));
  const s = data ? streaks(data.days) : null;
  const shownDays = weeks.flat();
  const shownTotal = shownDays.reduce((a, d) => a + d.count, 0);

  return (
    <BentoCard className="cell-github gh-card">
      <div className="bento-card-inner" ref={ref}>
        <div className="card-header">
          <span className="card-header__label">
            <GithubIcon size={16} /> GitHub
          </span>
          <a className="gh-card__login" href={`https://github.com/${LOGIN}`} target="_blank" rel="noopener noreferrer">
            @{LOGIN}
          </a>
        </div>

        <div className={`gh-card__grid${data ? '' : ' is-loading'}`} ref={gridRef} aria-label={t('gh.graph')} role="img">
          {(data ? weeks : Array.from({ length: cols }, () => Array(7).fill(null))).map((week, wi) => (
            <div className="gh-card__week" key={wi}>
              {week.map((d, di) => (
                <span
                  key={di}
                  className={`gh-card__day gh-l${d ? d.level : 0}`}
                  title={d ? `${d.date} : ${d.count} contribution${d.count > 1 ? 's' : ''}` : undefined}
                />
              ))}
            </div>
          ))}
        </div>

        {failed ? (
          <p className="gh-card__error">{t('gh.error')}</p>
        ) : (
          <dl className="gh-card__stats">
            <div>
              <dd>{fmt(data?.total)}</dd>
              <dt>{t('gh.year')}</dt>
            </div>
            <div>
              <dd>{fmt(data ? shownTotal : null)}</dd>
              <dt>{t('gh.shown').replace('{n}', String(weeks.length || cols))}</dt>
            </div>
            <div>
              <dd>{s ? s.current : '–'}</dd>
              <dt>{t('gh.streak')}</dt>
            </div>
            <div>
              <dd>{s ? s.best : '–'}</dd>
              <dt>{t('gh.best')}</dt>
            </div>
            <div>
              <dd>{fmt(data?.repos)}</dd>
              <dt>{t('gh.repos')}</dt>
            </div>
          </dl>
        )}
      </div>
    </BentoCard>
  );
}
