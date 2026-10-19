import { useEffect, useMemo, useRef, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { CpuIcon } from '../../icons/index.js';
import { gallery, categoryOf } from '../../../data/projects.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ProjectsYearCard.css';

// Projects per year, stacked by field (gallery.json: year + field). Three
// series in a fixed order and a validated palette (blue, amber, pink on the
// dark surface), a legend, the year's total above each bar, a 2px gap
// between stacked segments, and a tooltip naming the segment's projects.
const SERIES = [
  { id: 'eng', color: '#2a9fd6' },
  { id: 'dev', color: '#b8860b' },
  { id: 'web', color: '#e0569f' }
];
const PAD = { top: 22, right: 8, bottom: 26, left: 26 };
const GAP = 2;

export default function ProjectsYearCard() {
  const { t } = useI18n();
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const years = useMemo(() => {
    const list = [...new Set(gallery.map(g => g.year))].sort();
    return list.map(year => ({
      year,
      parts: SERIES.map(s => ({ ...s, projects: gallery.filter(g => g.year === year && categoryOf(g.id) === s.id).map(g => g.id) }))
    }));
  }, []);

  const max = Math.max(...years.map(y => y.parts.reduce((n, p) => n + p.projects.length, 0)), 1);
  const top = Math.ceil(max / 2) * 2;
  const ticks = Array.from({ length: top / 2 + 1 }, (_, i) => i * 2);
  const iw = Math.max(0, size.w - PAD.left - PAD.right);
  const ih = Math.max(0, size.h - PAD.top - PAD.bottom);
  const band = iw / years.length;
  const bw = Math.min(56, band * 0.5);
  const y = v => PAD.top + ih - (v / top) * ih;

  return (
    <BentoCard className="cell-figures bars-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <CpuIcon size={16} /> {t('bars.title')}
          </span>
        </div>
        <div className="bars-card__head">
          <strong>{gallery.length}</strong>
          <span>{t('bars.sub')}</span>
        </div>
        <ul className="bars-card__legend">
          {SERIES.map(s => (
            <li key={s.id}>
              <i style={{ background: s.color }} /> {t(`nav.${s.id}`)}
            </li>
          ))}
        </ul>
        <div className="bars-card__plot" ref={boxRef} onPointerLeave={() => setHover(null)}>
          {size.w > 0 && (
            <svg width={size.w} height={size.h} role="img" aria-label={t('bars.aria')}>
              {ticks.map(v => (
                <g key={v}>
                  <line className="bars-card__grid" x1={PAD.left} x2={size.w - PAD.right} y1={y(v)} y2={y(v)} />
                  <text className="bars-card__tick" x={PAD.left - 8} y={y(v)} textAnchor="end" dominantBaseline="middle">
                    {v}
                  </text>
                </g>
              ))}
              {years.map((yr, i) => {
                const cx = PAD.left + band * i + band / 2;
                let acc = 0;
                const visible = yr.parts.filter(p => p.projects.length);
                const total = visible.reduce((n, p) => n + p.projects.length, 0);
                return (
                  <g key={yr.year}>
                    {visible.map((p, k) => {
                      const y0 = y(acc);
                      acc += p.projects.length;
                      const y1 = y(acc);
                      const last = k === visible.length - 1;
                      const h = Math.max(0, y0 - y1 - (k ? GAP : 0));
                      const on = hover && hover.year === yr.year && hover.id === p.id;
                      const r = last ? 4 : 0;
                      const x = cx - bw / 2;
                      const yy = y1;
                      // A bar with only its top corners rounded (data end), flat on the baseline.
                      const d = `M${x},${yy + h} V${yy + r} Q${x},${yy} ${x + r},${yy} H${x + bw - r} Q${x + bw},${yy} ${x + bw},${yy + r} V${yy + h} Z`;
                      return (
                        <path
                          key={p.id}
                          d={d}
                          fill={p.color}
                          className={`bars-card__seg${hover && !on ? ' is-dim' : ''}`}
                          onPointerEnter={() => setHover({ year: yr.year, id: p.id, projects: p.projects })}
                        />
                      );
                    })}
                    <text className="bars-card__total" x={cx} y={y(total) - 7} textAnchor="middle">
                      {total}
                    </text>
                    <text className="bars-card__tick bars-card__year" x={cx} y={size.h - 8} textAnchor="middle">
                      {yr.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
          {hover && (
            <div className="bars-card__tip" aria-hidden="true">
              <strong>
                {hover.year} · {t(`nav.${hover.id}`)} · {hover.projects.length}
              </strong>
              {hover.projects.map(id => t(`g.${id}.name`)).join(' · ')}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
