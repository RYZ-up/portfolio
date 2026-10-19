import { useMemo, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import { CpuIcon } from '../../icons/index.js';
import { gallery } from '../../../data/projects.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import './SkillsRadarCard.css';

// Rayane's fields as a radar: each axis counts the projects (gallery.json)
// whose technologies belong to that field. One series, so no legend; each
// vertex is labelled with its field and count, and hovering a field lists
// its projects.
const FIELDS = [
  { key: 'embedded', tags: ['ESP32', 'ESP32-C3', 'Arduino Uno', 'Embarqué', 'IoT', 'L298E', 'Électronique', 'Contrôle Moteur', 'C++'] },
  { key: 'robotics', tags: ['Robotique', 'Cinématique', 'Conception Méca.', 'RC', 'Aérodynamique'] },
  { key: 'ai', tags: ['IA', 'LLM', 'Random Forest', 'Scikit-learn', 'Vision par Ordi.'] },
  { key: 'software', tags: ['Python', 'FastAPI', 'SQLite', 'SMTP', 'Tkinter'] },
  { key: 'web', tags: ['JavaScript', 'TypeScript', 'Firebase', 'Netlify Functions', 'Vite', 'Stripe', 'SEO local', 'Back-office', 'Cloudflare', 'SaaS', 'Chart.js'] },
  { key: '3d', tags: ['3D', 'Blender', 'Impression 3D', '3D Printing', 'Animation', 'Rendu'] }
];

const SIZE = 320;
const C = SIZE / 2;
const R = 112;

export default function SkillsRadarCard() {
  const { t } = useI18n();
  const [hover, setHover] = useState(null);

  const data = useMemo(
    () =>
      FIELDS.map(f => {
        const projects = gallery.filter(g => (g.tags ?? []).some(tag => f.tags.includes(tag)));
        return { ...f, count: projects.length, projects: projects.map(p => p.id) };
      }),
    []
  );
  const max = Math.max(...data.map(d => d.count), 1);
  const angle = i => -Math.PI / 2 + (i * 2 * Math.PI) / data.length;
  const at = (i, r) => [C + Math.cos(angle(i)) * r, C + Math.sin(angle(i)) * r];
  const ring = k => data.map((_, i) => at(i, (R * k) / 4).join(',')).join(' ');
  const shape = data.map((d, i) => at(i, (R * d.count) / max).join(',')).join(' ');

  return (
    <BentoCard className="cell-figures radar-card">
      <div className="bento-card-inner">
        <div className="card-header">
          <span className="card-header__label">
            <CpuIcon size={16} /> {t('radar.title')}
          </span>
        </div>
        <div className="radar-card__head">
          <strong>{data.length}</strong>
          <span>{t('radar.sub').replace('{n}', String(gallery.length))}</span>
        </div>
        <div className="radar-card__body">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={data.map(d => `${t(`radar.${d.key}`)} ${d.count}`).join(', ')}>
            {[1, 2, 3, 4].map(k => (
              <polygon key={k} className="radar-card__ring" points={ring(k)} />
            ))}
            {data.map((d, i) => {
              const [x, y] = at(i, R);
              return <line key={d.key} className="radar-card__spoke" x1={C} y1={C} x2={x} y2={y} />;
            })}
            <polygon className="radar-card__shape" points={shape} />
            {data.map((d, i) => {
              const [x, y] = at(i, (R * d.count) / max);
              const [lx, ly] = at(i, R + 26);
              const on = hover === i;
              return (
                <g key={d.key} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} className="radar-card__axis">
                  <circle className="radar-card__hit" cx={lx} cy={ly} r="26" />
                  <circle className={`radar-card__dot${on ? ' is-on' : ''}`} cx={x} cy={y} r={on ? 6 : 4.5} />
                  <text className={`radar-card__label${on ? ' is-on' : ''}`} x={lx} y={ly - 5} textAnchor="middle">
                    {t(`radar.${d.key}`)}
                  </text>
                  <text className="radar-card__count" x={lx} y={ly + 10} textAnchor="middle">
                    {d.count}
                  </text>
                </g>
              );
            })}
          </svg>
          {hover != null && (
            <div className="radar-card__tip" aria-hidden="true">
              <strong>
                {t(`radar.${data[hover].key}`)} · {data[hover].count}
              </strong>
              {data[hover].projects.map(id => t(`g.${id}.name`)).join(' · ')}
            </div>
          )}
        </div>
      </div>
    </BentoCard>
  );
}
