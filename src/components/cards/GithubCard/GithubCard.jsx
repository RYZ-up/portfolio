import { useEffect, useMemo, useRef, useState } from 'react';
import { GithubIcon } from '../../icons/index.js';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './GithubCard.css';

// GitHub activity, kept to the bare minimum: the contribution graph of the
// last year (as many weeks as fit the card) and its total; hovering a day
// shows its date and count in a small tooltip. Data from github.com's public
// calendar (netlify/functions/github.mjs, jogruber API as backup), fetched
// only once the card is on screen, cached for an hour.
const LOGIN = 'RYZ-up';
const CACHE_KEY = 'gh-activity-v5';
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
  let cal = await getJson('/api/github');
  if (!cal) {
    fresh = false;
    cal = await getJson(`https://github-contributions-api.jogruber.de/v4/${LOGIN}?y=last`);
  }
  if (!cal?.contributions?.length) throw new Error('no data');
  const days = cal.contributions;
  // Columns are weeks: start on a Sunday so every column lines up.
  const start = days.findIndex(d => new Date(`${d.date}T00:00:00Z`).getUTCDay() === 0);
  const data = {
    days: days.slice(Math.max(0, start)).map(d => ({ date: d.date, count: d.count, level: Math.min(4, Math.max(0, d.level)) })),
    total: cal.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0)
  };
  // The backup API can lag by days: never keep its data, retry next time.
  if (fresh) try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable */
  }
  return data;
}

export default function GithubCard() {
  const { t, lang } = useI18n();
  const ref = useRef(null);
  const gridRef = useRef(null);
  const [data, setData] = useState(readCache);
  const [failed, setFailed] = useState(false);
  const [cols, setCols] = useState(20);
  const [tip, setTip] = useState(null);

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

  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const dateFmt = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }), [locale]);

  // One tooltip for the whole graph, placed over the hovered day.
  const show = (e, d) => {
    if (!d) return;
    const cell = e.currentTarget.getBoundingClientRect();
    const box = gridRef.current.getBoundingClientRect();
    setTip({ d, x: cell.left - box.left + cell.width / 2, y: cell.top - box.top });
  };

  return (
    <BentoCard className="cell-github gh-card">
      <div className="bento-card-inner" ref={ref}>
        <div className="card-header">
          <span className="card-header__label">
            <GithubIcon size={16} /> GitHub
          </span>
          <a className="gh-card__login" href={`https://github.com/${LOGIN}`} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={14} /> @{LOGIN}
          </a>
          <span className="gh-card__total">
            {failed ? t('gh.error') : t('gh.total').replace('{n}', data ? data.total.toLocaleString(locale) : '–')}
          </span>
        </div>

        <div
          className={`gh-card__grid${data ? '' : ' is-loading'}`}
          ref={gridRef}
          aria-label={t('gh.graph')}
          role="img"
          onMouseLeave={() => setTip(null)}
        >
          {(data ? weeks : Array.from({ length: cols }, () => Array(7).fill(null))).map((week, wi) => (
            <div className="gh-card__week" key={wi}>
              {week.map((d, di) => (
                <span key={di} className={`gh-card__day gh-l${d ? d.level : 0}`} onMouseEnter={e => show(e, d)} />
              ))}
            </div>
          ))}
          {tip && (
            <span className="gh-card__tip" style={{ left: tip.x, top: tip.y }} aria-hidden="true">
              <strong>{t(tip.d.count === 1 ? 'gh.one' : 'gh.many').replace('{n}', String(tip.d.count))}</strong>
              {dateFmt.format(new Date(`${tip.d.date}T00:00:00Z`))}
            </span>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
