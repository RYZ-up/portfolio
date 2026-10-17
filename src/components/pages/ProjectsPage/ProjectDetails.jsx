import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { DOMAINS, projectDetails } from '../../../data/projectDetails.js';
import './ProjectDetails.css';

// Technical analysis of a project, as a bento grid (layout inspired by
// VengeanceUI "Research Bento Grid"): every panel is a visual on top and a
// short title + caption underneath. Always visible, no dropdowns, no tables.

const TEXT = {
  fr: {
    title: 'Analyse technique',
    figures: 'Chiffres clés',
    figuresNote: 'Le projet en quelques nombres.',
    flow: 'Fonctionnement',
    flowNote: 'Le chemin de l’information, étape par étape.',
    domains: 'Domaines',
    domainsNote: 'Répartition des composants et technologies.',
    stack: 'Stack',
    stackNote: 'Chaque outil et son rôle dans le projet.',
    feats: 'Fonctionnalités',
    featsNote: 'Ce que le projet fait concrètement.',
    specs: 'Fiche technique',
    specsNote: 'Les caractéristiques principales.',
    year: 'Année',
    status: 'Statut',
    techs: 'Technologies',
    domainsN: 'Domaines',
    media: 'Images',
    elec: 'Électronique',
    soft: 'Logiciel',
    mech: 'Mécanique / 3D',
    ai: 'IA & données',
    web: 'Web & cloud'
  },
  en: {
    title: 'Technical analysis',
    figures: 'Key figures',
    figuresNote: 'The project in a few numbers.',
    flow: 'How it works',
    flowNote: 'The path of the information, step by step.',
    domains: 'Domains',
    domainsNote: 'Components and technologies by domain.',
    stack: 'Stack',
    stackNote: 'Every tool and its role in the project.',
    feats: 'Features',
    featsNote: 'What the project actually does.',
    specs: 'Specifications',
    specsNote: 'The main characteristics.',
    year: 'Year',
    status: 'Status',
    techs: 'Technologies',
    domainsN: 'Domains',
    media: 'Images',
    elec: 'Electronics',
    soft: 'Software',
    mech: 'Mechanics / 3D',
    ai: 'AI & data',
    web: 'Web & cloud'
  }
};

const CX = 120;
const CY = 104;
const R = 70;
const point = (i, ratio) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / DOMAINS.length;
  return [CX + Math.cos(a) * R * ratio, CY + Math.sin(a) * R * ratio];
};
const poly = ratios => ratios.map((r, i) => point(i, r).map(n => n.toFixed(1)).join(',')).join(' ');

/** Radar over the five domains, scaled to the project's strongest domain; the area grows in when seen. */
function Radar({ counts, labels, seen }) {
  const max = Math.max(...counts, 1);
  const ratios = counts.map(c => c / max);
  return (
    <svg className="pb-radar" viewBox="-64 0 368 208" role="img" aria-label={labels.map((l, i) => `${l} ${counts[i]}`).join(', ')}>
      {[0.25, 0.5, 0.75, 1].map(g => (
        <polygon key={g} points={poly(DOMAINS.map(() => g))} className="pb-radar__ring" />
      ))}
      {DOMAINS.map((d, i) => {
        const [x, y] = point(i, 1);
        return <line key={d} x1={CX} y1={CY} x2={x} y2={y} className="pb-radar__axis" />;
      })}
      <g className={`pb-radar__shape${seen ? ' is-seen' : ''}`} style={{ transformOrigin: `${CX}px ${CY}px` }}>
        <polygon points={poly(ratios)} className="pb-radar__area" />
        {ratios.map((r, i) => {
          const [x, y] = point(i, r);
          return <circle key={i} cx={x} cy={y} r="3" className="pb-radar__dot" />;
        })}
      </g>
      {DOMAINS.map((d, i) => {
        const [x, y] = point(i, 1.22);
        const anchor = Math.abs(x - CX) < 6 ? 'middle' : x > CX ? 'start' : 'end';
        return (
          <text key={d} x={x} y={y + 3} textAnchor={anchor} className="pb-radar__label">
            {labels[i]} · {counts[i]}
          </text>
        );
      })}
    </svg>
  );
}

/** Integers count up the first time the figure is seen; anything else is shown as is. */
function Figure({ value, seen }) {
  const reduce = useReducedMotion();
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [n, setN] = useState(target === null ? value : reduce ? target : 0);
  useEffect(() => {
    if (target === null || !seen || reduce) return undefined;
    const c = animate(0, target, { duration: 1.1, ease: [0.16, 1, 0.3, 1], onUpdate: v => setN(Math.round(v)) });
    return () => c.stop();
  }, [seen, target, reduce]);
  return target === null ? value : n;
}

function Panel({ span, title, note, children, className = '' }) {
  return (
    <section className={`pb-panel pb-span-${span} ${className}`}>
      <div className="pb-panel__visual">{children}</div>
      <div className="pb-panel__copy">
        <h4>{title}</h4>
        <p>{note}</p>
      </div>
    </section>
  );
}

export default function ProjectDetails({ project }) {
  const { lang, t } = useI18n();
  const L = TEXT[lang] ?? TEXT.fr;
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.15 });
  const data = projectDetails[project.id];
  if (!data) return null;
  const at = v => (typeof v === 'string' ? v : (v?.[lang] ?? v?.fr));

  const counts = DOMAINS.map(d => data.stack.filter(row => row[1] === d).length);
  const figures = [
    [project.year, L.year],
    [String(data.stack.length), L.techs],
    [String(counts.filter(Boolean).length), L.domainsN],
    [String(project.media?.length ?? 0), L.media],
    ...data.kpis.map(([v, label]) => [v, at(label)])
  ];
  const domainLabels = DOMAINS.map(d => L[d]);

  return (
    <div className={`pb${seen ? ' is-seen' : ''}`} ref={ref}>
      <h3 className="pb__title">{L.title}</h3>
      <div className="pb__grid">
        <Panel span={12} title={L.figures} note={L.figuresNote} className="pb-figures">
          <ul className="pb-figures__list">
            {figures.map(([value, label], i) => (
              <li key={label} style={{ '--d': `${i * 60}ms` }}>
                <strong>
                  <Figure value={value} seen={seen} />
                </strong>
                <span>{label}</span>
              </li>
            ))}
            <li style={{ '--d': `${figures.length * 60}ms` }}>
              <strong className={`pb-status pb-status--${project.status}`}>{t(`g.${project.status}`)}</strong>
              <span>{L.status}</span>
            </li>
          </ul>
        </Panel>

        {data.flow?.length > 0 && (
          <Panel span={7} title={L.flow} note={L.flowNote} className="pb-flow">
            <ol className="pb-flow__list">
              {data.flow.map((step, i) => (
                <li key={i} style={{ '--d': `${i * 90}ms` }}>
                  <span className="pb-flow__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pb-flow__label">{at(step)}</span>
                </li>
              ))}
            </ol>
          </Panel>
        )}

        <Panel span={5} title={L.domains} note={L.domainsNote} className="pb-domains">
          <Radar counts={counts} labels={domainLabels} seen={seen} />
        </Panel>

        <Panel span={7} title={L.stack} note={L.stackNote} className="pb-stack">
          <ul className="pb-stack__list">
            {data.stack.map(([name, domain, role]) => (
              <li key={name}>
                <span className={`pb-dot pb-dot--${domain}`} aria-hidden />
                <span className="pb-stack__name">{name}</span>
                <span className="pb-stack__role">{at(role)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel span={5} title={L.feats} note={L.featsNote} className="pb-feats">
          <ul className="pb-feats__list">
            {data.feats.map((f, i) => (
              <li key={i}>{at(f)}</li>
            ))}
          </ul>
        </Panel>

        {data.specs?.length > 0 && (
          <Panel span={12} title={L.specs} note={L.specsNote} className="pb-specs">
            <dl className="pb-specs__list">
              {data.specs.map(([label, value], i) => (
                <div key={i}>
                  <dt>{at(label)}</dt>
                  <dd>{at(value)}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        )}
      </div>
    </div>
  );
}
