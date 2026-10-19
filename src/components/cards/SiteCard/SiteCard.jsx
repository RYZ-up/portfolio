import { useEffect, useState } from 'react';
import { BentoCard } from '../../ui/BentoCard/BentoCard.jsx';
import StatsCounter from '../../ui/StatsCounter/StatsCounter.jsx';
import { socials } from '../../../data/socials.js';
import useVisitCount from '../../../hooks/useVisitCount.js';
import { useI18n } from '../../../i18n/I18nProvider.jsx';
import { setChoice, useCodeChoice } from '../../../lib/encodings.js';
import './SiteCard.css';

// The site's own data as a dataset preview (the way a CSV used to train a
// model is shown): row numbers, typed columns, monospace cells. Every value
// is real: the visit total (Netlify function + Blobs, see useVisitCount),
// this page's measured load time, the build date, and what the browser says
// about this very visit (never sent anywhere, only shown back). The language row is the
// language switch (French, English, or a notation the whole page can be read
// in); the link rows open GitHub and LinkedIn.
const OPTIONS = [
  { id: 'fr', label: 'fr', name: 'Français' },
  { id: 'en', label: 'en', name: 'English' },
  { id: 'morse', label: 'morse', name: 'Morse', code: true },
  { id: 'binary', label: 'bin', name: 'Binary', code: true }
];

export default function SiteCard() {
  const { lang, t, setLang } = useI18n();
  const visits = useVisitCount();
  const choice = useCodeChoice();
  const current = choice ?? lang;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  // Real page-load time of this visit (Navigation Timing), once it is known.
  const [loadMs, setLoadMs] = useState(null);
  useEffect(() => {
    const read = () => {
      const nav = performance.getEntriesByType?.('navigation')[0];
      if (nav?.loadEventEnd > 0) setLoadMs(nav.loadEventEnd);
    };
    if (document.readyState === 'complete') read();
    else window.addEventListener('load', () => setTimeout(read, 0), { once: true });
  }, []);

  const pick = o => {
    if (o.code) return setChoice(o.id);
    setChoice(null);
    setLang(o.id);
  };

  // This visit, as the browser reports it (read once, shown only here).
  const [env] = useState(() => ({
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    dpr: window.devicePixelRatio,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cores: navigator.hardwareConcurrency ?? null,
    net: navigator.connection?.effectiveType ?? null
  }));
  const nul = <span className="ds__null">null</span>;

  const rows = [
    { key: 'visits', type: 'int', value: visits == null ? <span className="ds__null">null</span> : <StatsCounter value={visits} duration={1.6} locale={locale} /> },
    { key: 'load_time_s', type: 'float', value: loadMs == null ? <span className="ds__null">null</span> : (loadMs / 1000).toFixed(2) },
    { key: 'updated', type: 'date', value: __BUILD_DATE__.slice(0, 10) },
    { key: 'viewport_px', type: 'str', value: env.viewport },
    { key: 'pixel_ratio', type: 'float', value: env.dpr },
    { key: 'browser_lang', type: 'str', value: env.lang },
    { key: 'timezone', type: 'str', value: env.tz },
    { key: 'cpu_threads', type: 'int', value: env.cores ?? nul },
    { key: 'network', type: 'str', value: env.net ?? nul },
    { key: 'built_with', type: 'str', value: 'React 19 · Vite 6' },
    { key: 'hosted_on', type: 'str', value: 'Netlify' },
    {
      key: 'language',
      type: 'enum',
      value: (
        <span className="ds__enum" role="radiogroup" aria-label={t('nav.switch')} data-enc-skip>
          {OPTIONS.map(o => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={current === o.id}
              className={current === o.id ? 'is-on' : undefined}
              title={o.name}
              onClick={() => pick(o)}
            >
              {o.label}
            </button>
          ))}
        </span>
      )
    },
    ...socials.map(s => ({
      key: s.label.toLowerCase(),
      type: 'url',
      value: (
        <a className="ds__link" href={s.href} target="_blank" rel="noopener noreferrer">
          {s.href.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '').replace('linkedin.com/in/', 'in/')}
        </a>
      )
    }))
  ];

  return (
    <BentoCard className="cell-site site-card">
      <div className="bento-card-inner ds">
        <div className="ds__bar">
          <span className="ds__file">site_stats.csv</span>
          <span className="ds__meta">
            {rows.length} rows × 3 cols
          </span>
        </div>
        <div className="ds__scroll">
          <table className="ds__table">
            <thead>
              <tr>
                <th className="ds__idx" aria-hidden="true" />
                <th>
                  feature <i>str</i>
                </th>
                <th>
                  value <i>any</i>
                </th>
                <th>
                  dtype <i>str</i>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.key}>
                  <td className="ds__idx">{i}</td>
                  <td className="ds__key">{r.key}</td>
                  <td className="ds__val">{r.value}</td>
                  <td className="ds__type">{r.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BentoCard>
  );
}
