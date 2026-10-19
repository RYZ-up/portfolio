import { useEffect, useMemo, useRef, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { CpuIcon } from '../../icons/index.js';
import { gallery, categoryOf } from '../../../data/projects.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './ProjectsYearCard.css';

const SERIES = [
  { id: 'eng', color: '#4bbde9' },
  { id: 'dev', color: '#e8b45c' },
  { id: 'web', color: '#eb74b5' }
];
const PAD = { top: 18, right: 18, bottom: 29, left: 18 };

// Monotone Hermite interpolation: smooth curves without artificial peaks
// between years (the original midpoint Béziers looked like stepped lines).
function curve(points) {
  if (!points.length) return '';
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;
  const slopes = points.slice(1).map((p, i) => (p.y - points[i].y) / (p.x - points[i].x));
  const tangents = points.map((_, i) => {
    if (i === 0) return slopes[0];
    if (i === points.length - 1) return slopes.at(-1);
    if (slopes[i - 1] * slopes[i] <= 0) return 0;
    return Math.sign(slopes[i]) * Math.min(Math.abs(slopes[i - 1]), Math.abs(slopes[i]));
  });
  return points.slice(1).reduce((path, p, i) => {
    const prev = points[i];
    const third = (p.x - prev.x) / 3;
    return `${path} C${prev.x + third},${prev.y + tangents[i] * third} ${p.x - third},${p.y - tangents[i + 1] * third} ${p.x},${p.y}`;
  }, `M${points[0].x},${points[0].y}`);
}

export default function ProjectsYearCard() {
  const { t } = useI18n();
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const years = useMemo(() => [...new Set(gallery.map(project => project.year))].sort().map(year => ({
    year,
    counts: Object.fromEntries(SERIES.map(series => [series.id, gallery.filter(project => project.year === year && categoryOf(project.id) === series.id).length]))
  })), []);

  const ceiling = Math.max(2, Math.ceil(Math.max(...years.flatMap(year => Object.values(year.counts))) / 2) * 2);
  const plotWidth = Math.max(0, size.w - PAD.left - PAD.right);
  const plotHeight = Math.max(0, size.h - PAD.top - PAD.bottom);
  const x = index => PAD.left + (years.length > 1 ? index * plotWidth / (years.length - 1) : plotWidth / 2);
  const y = count => PAD.top + plotHeight * (1 - count / ceiling);
  const pointsFor = id => years.map((year, index) => ({ x: x(index), y: y(year.counts[id]) }));
  const activeYear = hover === null ? null : years[hover];

  return (
    <BentoCard className="cell-figures bars-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label"><CpuIcon size={16} /> {t('bars.title')}</span>
        </div>
        <ul className="bars-card__legend">
          {SERIES.map(series => <li key={series.id}><i style={{ background: series.color }} />{t(`nav.${series.id}`)}</li>)}
        </ul>
        <div className="bars-card__plot" ref={boxRef} onPointerLeave={() => setHover(null)}>
          {size.w > 0 && size.h > 0 && (
            <svg width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="none" role="img" aria-label={t('bars.aria')}>
              <defs>
                {SERIES.map(series => (
                  <linearGradient key={series.id} id={`year-fill-${series.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={series.color} stopOpacity=".27" />
                    <stop offset="1" stopColor={series.color} stopOpacity="0" />
                  </linearGradient>
                ))}
              </defs>
              {[0, ceiling / 2, ceiling].map(level => (
                <line key={level} className="bars-card__grid" x1={PAD.left} x2={size.w - PAD.right} y1={y(level)} y2={y(level)} />
              ))}
              {SERIES.map(series => {
                const points = pointsFor(series.id);
                const line = curve(points);
                const area = `${line} L${points.at(-1).x},${y(0)} L${points[0].x},${y(0)} Z`;
                return (
                  <g key={series.id} className="bars-card__series" style={{ '--series-color': series.color }}>
                    <path d={area} className="bars-card__area" fill={`url(#year-fill-${series.id})`} />
                    <path d={line} className="bars-card__line-glow" />
                    <path d={line} className="bars-card__line" />
                    {points.map((point, index) => (
                      <circle key={years[index].year} cx={point.x} cy={point.y} r={hover === index ? 5 : 3.25} className="bars-card__point" />
                    ))}
                  </g>
                );
              })}
              {hover !== null && <line className="bars-card__cursor" x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={y(0)} />}
              {years.map((year, index) => <text key={year.year} className="bars-card__year" x={x(index)} y={size.h - 6} textAnchor="middle">{year.year}</text>)}
              {years.map((year, index) => {
                const left = index === 0 ? 0 : (x(index - 1) + x(index)) / 2;
                const right = index === years.length - 1 ? size.w : (x(index) + x(index + 1)) / 2;
                return <rect key={year.year} x={left} y="0" width={right - left} height={size.h} fill="transparent" onPointerEnter={() => setHover(index)} />;
              })}
            </svg>
          )}
          {activeYear && (
            <div className="bars-card__tip" style={{ left: Math.min(Math.max(x(hover), 62), size.w - 62) }} aria-hidden="true">
              {activeYear.year} <span>·</span> {Object.values(activeYear.counts).reduce((total, count) => total + count, 0)}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
