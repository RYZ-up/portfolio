import { useEffect, useId, useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { animate, useReducedMotion } from 'motion/react';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { DOMAINS, projectDetails } from '../../../data/projectDetails.js';
import './ProjectDetails.css';

const TEXT = {
  fr: {
    title: 'Analyse technique',
    specs: 'Spécifications',
    profile: 'Profil technique',
    profileNote: 'Répartition des composants et technologies par domaine',
    more: 'Afficher l’analyse technique complète',
    less: 'Masquer l’analyse technique',
    components: 'Composants & technologies',
    component: 'Élément',
    domain: 'Domaine',
    role: 'Rôle',
    flow: 'Architecture / chaîne de traitement',
    feats: 'Fonctions & livrables',
    year: 'Année',
    status: 'Statut',
    techs: 'Technologies',
    domains: 'Domaines',
    media: 'Images',
    elec: 'Électronique',
    soft: 'Logiciel',
    mech: 'Mécanique / 3D',
    ai: 'IA & données',
    web: 'Web & cloud'
  },
  en: {
    title: 'Technical analysis',
    specs: 'Specifications',
    profile: 'Technical profile',
    profileNote: 'Components and technologies split by domain',
    more: 'Show the full technical analysis',
    less: 'Hide the technical analysis',
    components: 'Components & technologies',
    component: 'Item',
    domain: 'Domain',
    role: 'Role',
    flow: 'Architecture / signal chain',
    feats: 'Features & deliverables',
    year: 'Year',
    status: 'Status',
    techs: 'Technologies',
    domains: 'Domains',
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

/** Radar over the five domains, scaled to the project's strongest domain. */
function Radar({ counts, labels }) {
  const max = Math.max(...counts, 1);
  const ratios = counts.map(c => c / max);
  return (
    <svg className="pd__radar" viewBox="-28 0 296 208" role="img" aria-label={labels.map((l, i) => `${l} ${counts[i]}`).join(', ')}>
      {[0.25, 0.5, 0.75, 1].map(g => (
        <polygon key={g} points={poly(DOMAINS.map(() => g))} className="pd__ring" />
      ))}
      {DOMAINS.map((d, i) => {
        const [x, y] = point(i, 1);
        return <line key={d} x1={CX} y1={CY} x2={x} y2={y} className="pd__axis" />;
      })}
      <polygon points={poly(ratios)} className="pd__area" />
      {ratios.map((r, i) => {
        const [x, y] = point(i, r);
        return <circle key={i} cx={x} cy={y} r="3" className="pd__dot" />;
      })}
      {DOMAINS.map((d, i) => {
        const [x, y] = point(i, 1.2);
        const anchor = Math.abs(x - CX) < 6 ? 'middle' : x > CX ? 'start' : 'end';
        return (
          <text key={d} x={x} y={y + 3} textAnchor={anchor} className="pd__label">
            {labels[i]}
          </text>
        );
      })}
    </svg>
  );
}

/** Count-up (beUI "Number Animation" style) for plain integers, replayed each time the sheet opens. */
function CountUp({ value, active }) {
  const reduce = useReducedMotion();
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (target === null) return undefined;
    if (!active || reduce) {
      setN(target);
      return undefined;
    }
    setN(0);
    const controls = animate(0, target, { duration: 0.9, ease: [0.16, 1, 0.3, 1], onUpdate: v => setN(Math.round(v)) });
    return () => controls.stop();
  }, [active, target, reduce]);

  return target === null ? value : n;
}

/** Engineering sheet under a project: KPIs, spec table and radar up front, the rest folded away. */
export default function ProjectDetails({ project }) {
  const { lang, t } = useI18n();
  const L = TEXT[lang] ?? TEXT.fr;
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(null); // { key: 0 | 1 | 2, dir: 1 | -1 }
  const panelId = useId();
  const data = projectDetails[project.id];
  const at = v => (typeof v === 'string' ? v : (v?.[lang] ?? v?.fr));

  const rows = useMemo(() => {
    if (!data) return [];
    const list = [...data.stack];
    if (!sort) return list;
    const val = row => (sort.key === 2 ? at(row[2]) : sort.key === 1 ? L[row[1]] : row[0]);
    return list.sort((a, b) => sort.dir * String(val(a)).localeCompare(String(val(b)), lang, { numeric: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sort, lang]);

  if (!data) return null;
  const nextSort = key => setSort(s => (s?.key !== key ? { key, dir: 1 } : s.dir === 1 ? { key, dir: -1 } : null));
  const ariaSort = key => (sort?.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none');

  const counts = DOMAINS.map(d => data.stack.filter(row => row[1] === d).length);
  const total = counts.reduce((a, c) => a + c, 0) || 1;
  const kpis = [
    [project.year, L.year],
    [t(`g.${project.status}`), L.status],
    [String(data.stack.length), L.techs],
    [String(counts.filter(Boolean).length), L.domains],
    [String(project.media?.length ?? 0), L.media],
    ...data.kpis.map(([v, label]) => [v, at(label)])
  ];
  const domainLabels = DOMAINS.map(d => L[d]);

  return (
    <div className="pd">
      <button
        type="button"
        className="pd__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(o => !o)}
      >
        <span>{open ? L.less : L.more}</span>
        <FiChevronDown aria-hidden />
      </button>

      <div id={panelId} className={`pd__more${open ? ' is-open' : ''}`} inert={!open}>
        <div className="pd__more-inner">
          <h3 className="pd__title">{L.title}</h3>

          <ul className="pd__kpis">
            {kpis.map(([value, label]) => (
              <li key={label} className="pd__kpi">
                <b>
                  <CountUp value={value} active={open} />
                </b>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="pd__grid">
            <div className="pd__col">
              <section className="pd__panel">
                <h4>{L.specs}</h4>
                <table className="pd__table pd__table--specs">
                  <tbody>
                    {data.specs.map(([label, value]) => (
                      <tr key={at(label)}>
                        <th scope="row">{at(label)}</th>
                        <td>{at(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className="pd__panel">
                <h4>{L.feats}</h4>
                <ul className="pd__feats">
                  {data.feats.map((f, i) => (
                    <li key={i}>{at(f)}</li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="pd__panel">
              <h4>{L.profile}</h4>
              <Radar counts={counts} labels={domainLabels} />
              <ul className="pd__bars">
                {DOMAINS.map((d, i) => (
                  <li key={d} className={counts[i] ? '' : 'is-empty'}>
                    <span>{L[d]}</span>
                    <span className="pd__bar">
                      <i style={{ width: `${(counts[i] / total) * 100}%` }} />
                    </span>
                    <em>{counts[i]}</em>
                  </li>
                ))}
              </ul>
              <p className="pd__note">{L.profileNote}</p>
            </section>
          </div>

          <section className="pd__panel">
            <h4>{L.flow}</h4>
            <ol className="pd__flow">
              {data.flow.map((step, i) => (
                <li key={i}>
                  <span className="pd__step-n">{String(i + 1).padStart(2, '0')}</span>
                  {at(step)}
                </li>
              ))}
            </ol>
          </section>

          <section className="pd__panel">
            <h4>{L.components}</h4>
            <table className="pd__table pd__table--stack">
              <thead>
                <tr>
                  {[L.component, L.domain, L.role].map((label, key) => (
                    <th key={key} scope="col" aria-sort={ariaSort(key)}>
                      <button type="button" className="pd__sort" onClick={() => nextSort(key)}>
                        {label}
                        <span className={`pd__sort-ico${sort?.key === key ? ' is-on' : ''}`} aria-hidden>
                          <FiChevronUp style={{ transform: sort?.key === key && sort.dir === -1 ? 'rotate(180deg)' : undefined }} />
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, domain, role]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>
                      <span className={`pd__chip pd__chip--${domain}`}>{L[domain]}</span>
                    </td>
                    <td>{at(role)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}
