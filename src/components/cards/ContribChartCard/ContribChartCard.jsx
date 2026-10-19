import { useEffect, useMemo, useRef, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { GaugeIcon } from '../../icons/index.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ContribChartCard.css';

// Rayane's GitHub contributions over the last year, summed per week, as one
// area line (one series, so no legend: the header names it). Data from
// /api/github (github.com's own calendar). Hover: a crosshair and a tooltip
// with the week and its count. The headline number is the year's total.
const PAD = { top: 12, right: 12, bottom: 22, left: 30 };

async function loadWeeks() {
  const res = await fetch('/api/github');
  if (!res.ok) throw new Error(String(res.status));
  const { contributions = [] } = await res.json();
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    const chunk = contributions.slice(i, i + 7);
    weeks.push({ start: chunk[0].date, count: chunk.reduce((s, d) => s + d.count, 0) });
  }
  return weeks;
}

// A smooth path through the points (monotone-ish cubic, never overshooting
// below zero by clamping control points to the baseline).
function smooth(pts, baseY) {
  if (!pts.length) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${Math.min(y0, baseY)} ${cx},${Math.min(y1, baseY)} ${x1},${y1}`;
  }
  return d;
}

export default function ContribChartCard() {
  const { t, lang } = useI18n();
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';
  const [weeks, setWeeks] = useState(null);
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState(null);
  const boxRef = useRef(null);

  useEffect(() => {
    let off = false;
    loadWeeks().then(
      w => !off && setWeeks(w),
      () => !off && setFailed(true)
    );
    return () => {
      off = true;
    };
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const chart = useMemo(() => {
    if (!weeks?.length || !size.w || !size.h) return null;
    const iw = size.w - PAD.left - PAD.right;
    const ih = size.h - PAD.top - PAD.bottom;
    const max = Math.max(...weeks.map(w => w.count), 1);
    // A "nice" top for the axis: 1, 2 or 5 × 10^n.
    const mag = 10 ** Math.floor(Math.log10(max));
    const top = [1, 2, 5, 10].map(m => m * mag).find(v => v >= max);
    const x = i => PAD.left + (i / (weeks.length - 1)) * iw;
    const y = v => PAD.top + ih - (v / top) * ih;
    const pts = weeks.map((w, i) => [x(i), y(w.count)]);
    const base = PAD.top + ih;
    const line = smooth(pts, base);
    const area = `${line} L${x(weeks.length - 1)},${base} L${x(0)},${base} Z`;
    const ticks = [0, top / 2, top];
    // One x label per month, at the first week starting in it.
    const months = [];
    weeks.forEach((w, i) => {
      const m = w.start.slice(0, 7);
      if (!months.length || months[months.length - 1].m !== m) months.push({ m, i });
    });
    return { iw, ih, x, y, line, area, ticks, months, base, pts };
  }, [weeks, size]);

  const total = weeks?.reduce((s, w) => s + w.count, 0);
  const monthFmt = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const dayFmt = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' });

  const onMove = e => {
    if (!chart) return;
    const r = boxRef.current.getBoundingClientRect();
    const px = e.clientX - r.left;
    const i = Math.round(((px - PAD.left) / chart.iw) * (weeks.length - 1));
    setHover(Math.max(0, Math.min(weeks.length - 1, i)));
  };

  const hw = hover != null && weeks ? weeks[hover] : null;

  return (
    <BentoCard className="cell-figures contrib-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <GaugeIcon size={16} /> {t('chart.title')}
          </span>
        </div>
        <div className="contrib-card__head">
          <strong>{total == null ? '–' : total.toLocaleString(locale)}</strong>
          <span>{failed ? t('gh.error') : t('chart.sub')}</span>
        </div>
        <div className="contrib-card__plot" ref={boxRef} onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
          {chart && (
            <svg width={size.w} height={size.h} role="img" aria-label={t('chart.aria').replace('{n}', String(total))}>
              <defs>
                <linearGradient id="contrib-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0569f" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#e0569f" stopOpacity="0" />
                </linearGradient>
              </defs>
              {chart.ticks.map(v => (
                <g key={v}>
                  <line className="contrib-card__grid" x1={PAD.left} x2={size.w - PAD.right} y1={chart.y(v)} y2={chart.y(v)} />
                  <text className="contrib-card__tick" x={PAD.left - 6} y={chart.y(v)} textAnchor="end" dominantBaseline="middle">
                    {v}
                  </text>
                </g>
              ))}
              {chart.months.filter((_, k) => k % 2 === 0).map(({ m, i }) => (
                <text key={m} className="contrib-card__tick" x={chart.x(i)} y={size.h - 6} textAnchor="middle">
                  {monthFmt.format(new Date(`${m}-01T00:00:00Z`))}
                </text>
              ))}
              <path className="contrib-card__area" d={chart.area} fill="url(#contrib-fill)" />
              <path className="contrib-card__line" d={chart.line} />
              {hw && (
                <g>
                  <line className="contrib-card__cross" x1={chart.pts[hover][0]} x2={chart.pts[hover][0]} y1={PAD.top} y2={chart.base} />
                  <circle className="contrib-card__dot" cx={chart.pts[hover][0]} cy={chart.pts[hover][1]} r="4.5" />
                </g>
              )}
            </svg>
          )}
          {hw && chart && (
            <div
              className="contrib-card__tip"
              style={{ left: chart.pts[hover][0], top: chart.pts[hover][1] }}
              aria-hidden="true"
            >
              <strong>{t(hw.count === 1 ? 'gh.one' : 'gh.many').replace('{n}', String(hw.count))}</strong>
              {t('chart.week').replace('{d}', dayFmt.format(new Date(`${hw.start}T00:00:00Z`)))}
            </div>
          )}
          {!weeks && !failed && <div className="contrib-card__loading" />}
        </div>
      </div>
    </BentoCard>
  );
}
